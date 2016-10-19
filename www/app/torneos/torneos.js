(function () {
    'use strict';
    angular.module('torneos', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.torneos', {
                    url: '/torneos',
                    templateUrl: 'app/torneos/torneos.html',
                    controller: 'torneosCtrl'
                })
        });

})();