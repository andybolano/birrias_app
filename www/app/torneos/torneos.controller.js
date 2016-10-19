(function() {
    'use strict';

    angular
        .module('torneos')
        .controller('torneosCtrl',  torneosCtrl);

    /* @ngInject */
    function torneosCtrl($scope,$http, API_URL,$state,$ionicModal,$ionicPopup) {
        $scope.$on('$ionicView.loaded',function(){
         $scope.Torneos = [];
          $scope.torneosInscritos = [];
        $scope.getCampeonatos();

     $scope.miNomina = {};
       var nomina = JSON.parse(localStorage.getItem('miNomina'));
       $scope.miNomina = nomina.nomina._id;

        });


  $scope.getCampeonatos = function (){
        $http.get(API_URL+'campeonatos').success(function (data) {
              $scope.Torneos = data.respuesta; 
              $scope.getCampeonatosInscrito();
        });
      }

       $scope.getCampeonatosInscrito = function(){
          $http.get(API_URL+'campeonatos/nomina/'+$scope.miNomina).success(function (data) {
             $scope.torneosInscritos = data.res;
             if($scope.torneosInscritos.length > 0){  
                     setTimeout(function(){
                         //$('.reloj').cuentaAtras();
                     },1000);
                 }
        });
      }

       $scope.inscrito = function(campeonato){
          for(var i=0; i < $scope.torneosInscritos.length; i++){
              if($scope.torneosInscritos[i]._id == campeonato){
                  return true;
                  break;
              }
          }
      }
      
      $scope.fecha = function(fecha){
         var f = fecha.split('-');
         
         var anio = f[0];
         var mes = f[1];
         var dia = f[2].substr(0,2)
         
         return mes+"/"+dia+"/"+anio+" "+"0:00";
      }
      
      $scope.normalFecha = function(fecha){
         var f = fecha.split('-');
         
         var anio = f[0];
         var mes = f[1];
         var dia = f[2].substr(0,2)
         
         return dia+"/"+mes+"/"+anio;
      }
      


      }
})();