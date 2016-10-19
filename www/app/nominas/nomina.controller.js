(function() {
    'use strict';

    angular
        .module('nomina')
        .controller('nominaCtrl',  nominaCtrl);

    /* @ngInject */
    function nominaCtrl($scope,$http, API_URL,$state,$ionicModal,$ionicPopup) {
        $scope.$on('$ionicView.loaded',function(){
          //declarar escopes y funciones iniciales
            $scope.Nomina ={};
               $scope.NominaPertenezco = {};
               $scope.Amigos = [];
               $scope.miNomina = {};
               $scope.IntegrantesMiNomina =[];
               $scope.NominasPertenezco = [];
               $scope.IntegrantesNominaPertenezco = [];
               $scope.getMiNomina();


          

          $ionicModal.fromTemplateUrl('nuevo.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
                 animation: 'slide-left-right'
              });

        });


 angular.element(document).ready(function () {

                         /* angular.element('#nominaGanados').animateNumber({ number:$scope.miNomina.nomina.historial.ganados});
                          angular.element('#nominaEmpatados').animateNumber({ number:$scope.miNomina.nomina.historial.empatados});
                          angular.element('#nominaPerdidos').animateNumber({ numbe:$scope.miNomina.nomina.historial.perdidos});
                          angular.element('#puntosNomina').animateNumber({number:$scope.miNomina.nomina.puntos});*/
      });
        

    $scope.getMiNomina = function(){
            var data = JSON.parse(localStorage.getItem('data_usuario'));
            
            var nomina = localStorage.getItem('miNomina');
                    if(nomina == 'KO'){
                        $scope.miNomina.length = 0;
                        setTimeout(function(){
                            var el = document.getElementById('files');
                           if(el){
                              el.addEventListener('change', archivo, false);
                           }  
                        },900);
                    }else{
                      
                        $scope.miNomina = JSON.parse(nomina);
                        $scope.miNomina.length = 1;
                       $scope.integrantes($scope.miNomina.nomina._id);
                    }

                  $scope.getNominaPertenezco();

    }

     $scope.getNominaPertenezco = function(){
          var data = JSON.parse(localStorage.getItem('data_usuario'));     
        $http.get(API_URL+"nomina/pertenezo/"+data._id).success(function (data) {
                    $scope.NominasPertenezco = data.data;

        });
    }

    $scope.integrantes = function(idNomina){
        $http.get(API_URL+"nomina/integrantes/" + idNomina).success(function (data) {
            if (!Array.isArray(data)){
                data.data = [data]
            }
                      
            $scope.IntegrantesMiNomina = data.integrantes;
               
      
        });
    }

    $scope.getAmigosNomina = function(){
            var data = JSON.parse(localStorage.getItem('data_usuario'));

               if (data.amigos.misAmigos.length === 0) {
                   $scope.tieneAmigos = false;
               }else{
                    $scope.tieneAmigos = true;
                    $scope.Amigos = data.amigos.misAmigos;
                 
      
               };
          
        }

         $scope.cargarAmigos = function(){


                 $scope.getAmigosNomina();

      
                              $scope.openModal();
                           
          }

$scope.openModal = function() {
                              $scope.modal.show();
                            };

          $scope.closeModal = function() {
                              $scope.modal.hide();
                            };

        $scope.agregar = function(usuario){


 var confirmPopup = $ionicPopup.confirm({
         title: 'Agregar Nuevo integrante',
         template: "Esta seguro que deseas agregar a "+usuario.nombres+" a tu nomina?", 
      });

      confirmPopup.then(function(res) {
         if(res) {

           var miNomina = JSON.parse(localStorage.getItem('miNomina'));
              $http.post(API_URL+"nomina/agregarIntegrante",{
                    idNomina: miNomina.capitan._id,
                    usuarioNuevo: usuario._id
                }).success(function (data) {
                      $scope.integrantes(miNomina.capitan._id);
                     var alertPopup = $ionicPopup.alert({
                 title: 'Agregado',
                 template:  "Ahora "+usuario.nombres+" pertenece a tu nomina"


               });

                      $scope.closeModal();

            });

          } else {


            
         }

        
        });

      }
        
    $scope.eliminar = function(usuario){
      
      var confirmPopup = $ionicPopup.confirm({
         title: 'Agregar Nuevo integrante',
         template: "Esta seguro que deseas agregar a "+usuario.nombres+" a tu nomina?", 
      });

      confirmPopup.then(function(res) {
         if(res) {


               var miNomina = JSON.parse(localStorage.getItem('miNomina'));
              $http.post(API_URL+"nomina/delete/integrante",{
                    idNomina: miNomina.capitan._id,
                    usuario: usuario._id,
                    nombres:usuario.nombres
                }).success(function (data) {
                  if(data.res == 'OK'){

                     var alertPopup = $ionicPopup.alert({
                 title: 'Eliminado',
                 template:  "Ahora "+data.msg


               });

               
                  $scope.closeModal();
                 $scope.integrantes(miNomina.capitan._id);
               }else{
                 
                  var alertPopup = $ionicPopup.alert({
                 title: 'Error',
                 template:  data.msg


               });

                 $scope.closeModal();
               }
            });
          
            } else {


            
         }

    });
        
    }
    
       $scope.verNomina = function(capitan){
      
           $http.get("/nomina/usuario/"+capitan).success(function (data) {
                 $scope.NominaPertenezco = data.nomina; 
                $("#verNomina").modal();
            $scope.integrantesNominaPertenezo($scope.NominaPertenezco._id);    

            });
         }
         
         
         
         $scope.integrantesNominaPertenezo = function(idNomina){
        $http.get("/nomina/integrantes/" + idNomina).success(function (data) {
        
            if (!Array.isArray(data)){
                data.data = [data]
            }
                      
            $scope.IntegrantesNominaPertenezco = data.integrantes;
          
            
        });
    }
    
        

    }
})();