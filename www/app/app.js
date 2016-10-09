(function() {
    "use strict";
  var app =  angular.module("app", [
            'ionic',
            'ngSanitize',
            'ngCountup',
            'auth',
            'usuario',
            'nomina',
            'reservas',
        ]);

app.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})


})();
