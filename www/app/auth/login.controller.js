(function() {
    'use strict';

    angular
        .module('auth')
        .controller('LoginCtrl', LoginCtrl);

    /* @ngInject */
    function LoginCtrl(authService, $state, HOME, $ionicLoading) {
        var vm = this;
        vm.usuario = {};
        vm.matenerSesion = true;

        vm.iniciarSesion = iniciarSesion;

        function iniciarSesion(){
           $ionicLoading.show();

           authService.login(vm.usuario, vm.matenerSesion).then(success, error);
            function success(user) {
                if(user){
            $ionicLoading.hide();
                     $state.go(HOME);
                  
                }else{
                 alert("Datos incorrectos")
                $ionicLoading.hide(); 
                }
                   
                
            }
            function error(error) {
                $ionicLoading.hide();
                alert("Error login "+error.status,"Error al logear verifique que los datos ingresados sean correctos");
            }
        }

        function autologin(){
            vm.usuario = authService.local.getCredenciales();
            if(vm.usuario){
                iniciarSesion();
            }else{
                $ionicLoading.hide();
            }
        }

    }
})();