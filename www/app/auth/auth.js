(function () {
    'use strict';
    angular.module('auth', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/auth/login.html',
                    controller: 'LoginCtrl as vm',
                    data: {
                        noRequiresLogin: true
                    }
                })
                .state('registro', {
                    url: '/registro',
                    templateUrl: 'app/auth/registro.html',
                    controller: 'RegistroCtrl as vm',
                    data: {
                        noRequiresLogin: true
                    }
                })
        });
})();