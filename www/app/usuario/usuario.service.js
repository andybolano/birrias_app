(function () {
    'use strict';

    angular
        .module('usuario')
        .service('usuarioService', usuarioService);

    /* @ngInject */
    function usuarioService($http, API_URL) {


        this.getUsuario = function (){
            return JSON.parse(sessionStorage.getItem('usuario'));
        }

    }
})();