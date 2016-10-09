(function () {
    'use strict';
    angular.module('nomina', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.nomina', {
                    url: '/nomina',
                    templateUrl: 'app/nominas/index.html',
                    controller: 'nominaCtrl'
                })
        });

})();