(function () {
    'use strict';
    angular.module('retos', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.retos', {
                    url: '/retos',
                    templateUrl: 'app/retos/retos.html',
                    controller: 'retosCtrl'
                })
        });

})();