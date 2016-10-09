(function () {
    'use strict';

    angular
        .module('auth')
        .service('authService', authService);

    /* @ngInject */
    function authService($http, API_URL, $state, $window, $q, $ionicHistory) {
        var local = {
            setCredenciales: setCredenciales,
            getCredenciales: getCredenciales,
            destroyCredenciales: destroyCredenciales
        };

        var service = {
            login: login,
            logout: logout,
            autologin: autologin,
            updateRegId: updateRegId,
            register: register,
            updatePassword: updatePassword,
            currentUser: currentUser,
            local: local
        };
        return service;

        function login(usuario, matenerSesion){
            matenerSesion || (matenerSesion = false);
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(API_URL+'usuario/autenticar', usuario).then(success, error);
            return promise;

            function success(p) {
                if(matenerSesion == true){
                    setCredenciales(usuario);
                }
                storeUser(p.data.respuesta);
                // pushService.register();
                defered.resolve(currentUser());
            }
            function error(error) {
                destroyCredenciales();
                defered.reject(error)
            }
        };

        function autologin() {
       
            var defered = $q.defer();
            var promise = defered.promise;
            var usuario = getCredenciales();
            if(usuario){
                login(usuario).then(function (u) {
                    defered.resolve(u);
                });
            }else{
                defered.resolve(false);
            }
            return promise;
        }

        function updateRegId(regid){
            sessionStorage.setItem('regid', regid);
            var usuario_id = JSON.parse(sessionStorage.getItem('usuario')).id;
            return $http.put(API_URL+'/usuarios/'+usuario_id+'/reg_id/'+regid);
        };

        function logout(){
            var usuario_id = JSON.parse(sessionStorage.getItem('usuario')).id;
            return $http.put(API_URL+'/usuarios/'+usuario_id+'/reg_id/undefined').then(function () {
                sessionStorage.clear();
                $ionicHistory.clearHistory();
                $window.localStorage.removeItem('credenciales');
                $state.go('login');
            });
        };

        function register(usuario){
            return $http.post(API_URL+'usuario/nuevo', usuario);
        };

        function updatePassword(usuario, contrasenas){
            return $http.post(API_URL+'/usuarios/'+usuario.id+'/change_pass',
                contrasenas,
                {headers:  {'Authorization': 'Bearer '+sessionStorage.getItem('jwt')}}
            );
        };


    function storeUser(usuario) {
            sessionStorage.setItem('usuario',JSON.stringify(usuario));
        };
        function currentUser(){
            return JSON.parse(sessionStorage.getItem('usuario'));
        };

        function setCredenciales(credenciales) {
            $window.localStorage['credenciales'] = JSON.stringify(credenciales);
        }
        function getCredenciales() {
            return JSON.parse($window.localStorage['credenciales'] || false);
        }
        function destroyCredenciales() {
            $window.localStorage.removeItem('credenciales');
        }

    }
})();