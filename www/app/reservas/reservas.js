(function () {
    'use strict';
    angular.module('reservas', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.reservas', {
                    url: '/reservas',
                    templateUrl: 'app/reservas/reservas.html',
                    controller: 'reservasCtrl'
                })
        });

})();