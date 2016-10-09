(function() {
    'use strict';

    angular
        .module('app')
        .config(config)
        .constant('API_URL', 'http://localhost:3000/');


    /* @ngInject */
    function config(API_URL, $httpProvider  ) {
       /* jwtInterceptorProvider.tokenGetter = tokenGetter;

        $httpProvider.interceptors.push('jwtInterceptor');

        function tokenGetter(config, jwtHelper, $http) {
            var jwt = sessionStorage.getItem('jwt');
            if(jwt && config.url.indexOf(API_URL) === 0){
                if(jwtHelper.isTokenExpired(jwt)){
                    return $http({
                        url : API_URL+'/new_token',
                        skipAuthorization : true,
                        method: 'GET',
                        headers : {Authorization : 'Bearer '+ jwt}
                    }).then(
                        function(response){
                            sessionStorage.setItem('jwt',response.data.token);
                            return response.data.token;
                        },
                        function(response){
                            //sessionStorage.removeItem('jwt');
                        }
                    );
                }else{
                    return jwt;
                }
            }
        }*/
    }
})();