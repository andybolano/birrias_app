(function() {
    'use strict';

    angular
        .module('ranking')
        .controller('rankingCtrl',  rankingCtrl);

    /* @ngInject */
    function rankingCtrl($scope,$http, API_URL,$state,$ionicModal,$ionicPopup) {
        $scope.$on('$ionicView.loaded',function(){
          //declarar escopes y funciones iniciales
            $scope.Nominas = [];
     $scope.Usuario = [];
        
			 $scope.getRankingNominas();
			$scope.getRankingJugadores();
        });


         
  
    
    $scope.getRankingNominas = function(){
      	$http.get(API_URL+"nomina/ranking").success(function (data) {
           $scope.Nominas = data.respuesta;

        });
        $scope.getRankingJugadores ();
        
    }
    $scope.getRankingJugadores = function(){
        	$http.get(API_URL+"usuarios/ranking").success(function (data) {
         $scope.Usuarios = data.respuesta;
        });
    }


      }
})();