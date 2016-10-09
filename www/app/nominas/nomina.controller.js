(function() {
    'use strict';

    angular
        .module('nomina')
        .controller('nominaCtrl',  nominaCtrl);

    /* @ngInject */
    function nominaCtrl($scope,$http, API_URL,$state,$ionicModal) {
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
                  // $scope.getAmigosNomina();
                  /* $ionicModal.fromTemplateUrl('modalAmigos.html', {

                             scope: $scope,
                            animation: 'slide-in-up'
                            }).then(function(modal) {

                              $scope.modal = $ionicModal.fromTemplate('<div class="modal"><header class="bar bar-header bar-positive"> <h1 class="title">I\'m A Modal</h1><div class="button button-clear" ng-click="modal2.hide()"><span class="icon ion-close"></span></div></header><content has-header="true" padding="true"><p>This is a modal</p></content></div>', {
      scope: $scope,
      animation: 'slide-left-right'
    });

                            });
                            $scope.openModal = function() {
                              $scope.modal.show();
                            };
                            $scope.closeModal = function() {
                              $scope.modal.hide();
                            };
                            // Cleanup the modal when we're done with it!
                            $scope.$on('$destroy', function() {
                              $scope.modal.remove();
                            });
                            // Execute action on hide modal
                            $scope.$on('modal.hidden', function() {
                              // Execute action
                            });
                            // Execute action on remove modal
                            $scope.$on('modal.removed', function() {
                              // Execute action
                            });*/
                
  
          }

        $scope.agregar = function(usuario){

          swal({title: "Estas seguro?",    
               text: "Esta seguro que deseas agregar a "+usuario.nombres+" a tu nomina?",    
              type: "warning",   
              showCancelButton: true,   
              confirmButtonColor: "#DD6B55",   
               confirmButtonText: "Si, agregar!",     
              closeOnConfirm: false 
          }, function(){  
               var miNomina = JSON.parse(localStorage.getItem('miNomina'));
              $http.post("/nomina/agregarIntegrante",{
                    idNomina: miNomina.capitan._id,
                    usuarioNuevo: usuario._id
                }).success(function (data) {
                      $scope.integrantes(miNomina.capitan._id);
                    //$scope.buscarPorNomina();
                  swal("Agregado!", "Ahora "+usuario.nombres+" pertenece a tu nomina", "success");
            });
          
    });
      }
        
    $scope.eliminar = function(usuario){
      
      swal({title: "Estas seguro?",    
               text: "Esta seguro que deseas eliminar a "+usuario.nombres+" a tu nomina?",    
              type: "warning",   
              showCancelButton: true,   
              confirmButtonColor: "#DD6B55",   
               confirmButtonText: "Si, eliminar!",     
              closeOnConfirm: false 
          }, function(){  
               var miNomina = JSON.parse(localStorage.getItem('miNomina'));
              $http.post("/nomina/delete/integrante",{
                    idNomina: miNomina.capitan._id,
                    usuario: usuario._id,
                    nombres:usuario.nombres
                }).success(function (data) {
                  if(data.res == 'OK'){
                  swal("Eliminado!",data.msg, "success");
                 $scope.integrantes(miNomina.capitan._id);
               }else{
                 sweetAlert("Error!",data.msg, "error");
               }
            });
          
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