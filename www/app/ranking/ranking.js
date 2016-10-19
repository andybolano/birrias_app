(function () {
    'use strict';
    angular.module('ranking', [])

        .config(function ($stateProvider) {
            $stateProvider
                .state('app.ranking', {
                    url: '/ranking',
                    templateUrl: 'app/ranking/ranking.html',
                    controller: 'rankingCtrl'
                })
        });

})();