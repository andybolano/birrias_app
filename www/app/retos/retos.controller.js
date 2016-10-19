(function() {
    'use strict';

    angular
        .module('retos')
        .controller('retosCtrl',  retosCtrl);

    /* @ngInject */
    function retosCtrl($scope,$http, API_URL,$state,$ionicModal,$ionicPopup,$filter) {
        $scope.$on('$ionicView.loaded',function(){
          //declarar escopes y funciones iniciales
            $scope.Nominas =  [];
            $scope.Reto = {};
            $scope.canchasDisponibles=[];
          $scope.getAllNominas();
          $scope.getRetos();

          $ionicModal.fromTemplateUrl('nuevo.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
              });


        });



         $scope.getAllNominas = function () {
            var data = JSON.parse(localStorage.getItem('data_usuario'));
            $http.get(API_URL+"nominas/" + data._id).success(function (data) {
                $scope.Nominas = data.respuesta;
            });
        }
        
        $scope.getRetos = function(){
             var miNomina = JSON.parse(localStorage.getItem('miNomina'));
             $scope.miNomina = miNomina.capitan._id;
         $http.get(API_URL+"retos/pendientes/"+$scope.miNomina).success(function (res) {
    
                    if(res.status == 500){

                      var alertPopup = $ionicPopup.alert({
                 title: 'Oops...',
                 template: res.msg.message
               });

                       
                    }else{
                       $scope.RetosPendientes = res.data;
                    }
                });
         }

         $scope.initReto = function (item) {
         
          if($scope.RetosPendientes.length >0 ){
             var alertPopup = $ionicPopup.alert({
                 title: 'Lo sentimos!',
                 template: 'Ya tienes un reto pendiente'
               });
          }else{
            localStorage.setItem('nomina_retada', JSON.stringify(item));
            $scope.openModal();
          }
        }
         

               $scope.openModal = function() {
                    $scope.modal.show();
                    $scope.nuevoReto();
                  };
                  $scope.closeModal = function() {
                    $scope.modal.hide();
                  };


         $scope.nuevoReto = function () {
            var data = JSON.parse(localStorage.getItem('data_usuario'));
            $scope.Reto.nominaRetada = JSON.parse(localStorage.getItem('nomina_retada'));
            $http.get(API_URL+"nomina/usuario/" + data._id).success(function (data) {

                $scope.Reto.nominaRetadora = data;
               
            });

        }

        $scope.buscarDisponibilidad = function () {
          var alertPopup = $ionicPopup.alert({
                 title: 'Revisa la disponibilidad de canchas!',
                 template: 'En el tab derecho inferior'
               });


            if ($scope.Reto.fecha == undefined || $scope.Reto.hora == undefined) {

              var alertPopup = $ionicPopup.alert({
                 title: 'Oops...',
                 template: 'Es necesario ingresar la fecha y la hora'
               });

             
            } else {

                $http.get(API_URL+"reservas/disponibles/" + $scope.Reto.fecha + "/" + $scope.Reto.hora).success(function (data) {
                    $scope.canchasDisponibles = data.respuesta;
                    
                });
            }
        }

        $scope.seleccionarCancha = function (item) {
            $scope.Reto.lugar = item;
            var alertPopup = $ionicPopup.alert({
                 title: 'Cancha seleccionada!',
                 template: 'Continua con el proceso de tu reto'
               });
           
        }

        $scope.guardarReto = function () {

           $scope.Reto.fecha = $filter('date')($scope.Reto.fecha, "yyyy-MM-dd");

          
         if($scope.Reto.hora == undefined){
          
        }else{
          var string = $scope.Reto.hora + '';
       
            var substring = string.split(" ");
            var hora = substring[4].split(":");
            $scope.Reto.hora = substring[4];
        }
          
            if ($scope.Reto.lugar == undefined) {

              var alertPopup = $ionicPopup.alert({
                 title: 'Oops!',
                 template: 'No has escogido el lugar del reto!'
               });

             
            } else if ($scope.Reto.fecha == undefined || $scope.Reto.hora == undefined) {

               var alertPopup = $ionicPopup.alert({
                 title: 'Oops!',
                 template: 'Es necesario indicar el dia y la hora del reto!'
               });

                
                  
            }else if(hora[1]>0){

              var alertPopup = $ionicPopup.alert({
                 title: 'Oops!',
                 template: "No es posible hacer una reserva a las hora " +hora
               });

             
            } else if ($scope.Reto.modalidad == undefined) {

              var alertPopup = $ionicPopup.alert({
                 title: 'Oops!',
                 template: "Debes escoger la modalidad del reto, Ej: 'Pierde y Paga'"
               });

              


            } else if ($scope.Reto.range > $scope.Reto.nominaRetada.puntos) {

               var alertPopup = $ionicPopup.alert({
                 title: 'Lo sentimos...',
                 template: "La nomina retada no tendra como pagarte los puntos!"
               });

               
            } else {
             
                $http.post(API_URL+"reto", $scope.Reto).success(function (data) {
                    if(data.status == 200){

                      var alertPopup = $ionicPopup.alert({
                     title: 'Buen trabajo',
                     template: data.msg
                   });

       
                        window.location.href ='#/retos';
                    }else{

                          var alertPopup = $ionicPopup.alert({
                           title: 'Oops.!',
                           template: data.msg
                         });
                    }
                });
            }
        }



         


      }
})();