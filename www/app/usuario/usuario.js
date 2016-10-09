(function () {
    'use strict';
    angular.module('usuario', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.usuario', {
                    url: '/perfil',
                    templateUrl: 'app/usuario/perfil.html',
                    controller: 'usuarioCtrl'
                })
        });

})();