 (function() {
        'use strict';

        angular
            .module('app')
            .run(appRun);

        /* @ngInject */
        function appRun($ionicPlatform, $state, authService, $ionicLoading, HOME) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }

              autenticate();
            });

            //solicitusPendiente();

            function autenticate(){

               if(!authService.currentUser()) {

                   authService.autologin().then(function (res) {
                       hideSplash();
                       if (res) {
                           //solicitusPendiente();
                       }else{
                        
                           $state.go('login');
                       }
                   })
               }
            }
            
           /* function solicitusPendiente() {
                solicitudesService.getLast().then(function (s) {
                    $ionicLoading.hide();
                    // sino esta finalizada (f) o cancelada (c)
                    if(s.data && (['f', 'c', 'r'].indexOf(s.data.estado) === -1)){
                        Solicitud.data = s.data;
                        Solicitud.estado = s.data.estado;
                        var t = s.data.created_at.split(/[- :]/);
                        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                        var min = Math.ceil((new Date - d) / (1000*60))
                        Solicitud.tTranscurrido = min;
                        $state.go('app.espera_servicio');
                    }else{
                        $state.go(HOME);
                    }
                });
            }*/

            function hideSplash() {
                if(navigator.splashscreen){
                    setTimeout(function () {
                        navigator.splashscreen.hide();
                    }, 100);
                }
            }
        }
         })();