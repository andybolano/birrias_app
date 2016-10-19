(function() {
    'use strict';

    angular
        .module('usuario')
        .controller('usuarioCtrl', usuarioCtrl);

    /* @ngInject */
    function usuarioCtrl($scope,$http, API_URL,$state, usuarioService,$ionicModal) {
        $scope.$on('$ionicView.loaded',function(){
            $scope.usuario = [];
            $scope.amigos = [];
            $scope.proximosPartidos = [];
            $scope.Usuarios = [];
            loadPerfil();

             $ionicModal.fromTemplateUrl('nuevo.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal;
              })

        });

        function loadPerfil(){  
        localStorage.setItem('data_sitios', "");        
            $scope.usuario = usuarioService.getUsuario();
            $scope.cargarPerfil();
        }

         $scope.cargarPerfil = function(){
        
                    $http.get(API_URL+'usuario/perfil/'+$scope.usuario._id).success(function (data) {
                         localStorage.setItem('data_usuario', JSON.stringify(data.datos));
                            $scope.getProximosPartidos();
                             $scope.cargarAmigos();
                           
                        
                    });
        };   

        $scope.cargarAmigos = function(){
             var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));
              $scope.amigos = data_usuario.amigos.misAmigos;   
               $scope.getMiNomina();
        }

          $scope.getProximosPartidos = function(){
       var data = JSON.parse(localStorage.getItem('data_usuario'));
        $http.get("/retos/proximos/"+data._id).success(function (data) {
                     $scope.proximosPartidos = data.data;
                   
                 if($scope.proximosPartidos.length > 0){  
                     setTimeout(function(){
                         $('.reloj').cuentaAtras();
                     },1000);
                     
                      setInterval(hora, 1000);
                   }
                    
        });
    }

     $scope.getMiNomina = function(){
            var data = JSON.parse(localStorage.getItem('data_usuario'));
            
        $http.get(API_URL+"nomina/usuario/"+data._id).success(function (data) {
                    if(data.respuesta == 'KO'){
                         localStorage.setItem('miNomina','KO');
                    }else{
                         localStorage.setItem('miNomina',JSON.stringify(data));
                    }     
            
        });
    }

     $scope.buscarAmigos = function(){

            $scope.openModal();       
        };
        

         $scope.openModal = function() {
                    $scope.modal.show();
                    $scope.getUsuarios();
                  };

                  $scope.getUsuarios = function(){
            var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));
          
                         $http.get(API_URL+'usuario/lista/'+data_usuario._id).success(function (data) {
        
                    $scope.Usuarios = data;  
             });  
        };



    }
})();