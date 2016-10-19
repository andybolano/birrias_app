(function() {
    "use strict";
  var app =  angular.module("app", [
            'ionic',
            'ngSanitize',
           
            'auth',
            'usuario',
            'nomina',
            'reservas',
            'retos',
            'ranking',
            'torneos',
        ]);

app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})


})();
