(function() {
    'use strict';

    angular
        .module('app')
        .controller('MenuCtrl', MenuCtrl);

    /* @ngInject */
    function MenuCtrl(authService) {
        var vm = this;
        vm.menuList_b = [
            {nombre: 'Perfil',
                statego : 'app.perfil',
                
            },
            {nombre: 'Mis Reservas',
                statego : 'app.reservas',
            
            },
            {nombre: 'Mis Nominas',
                statego : 'app.nomina',
            
            },
            {nombre: 'Retos',
                statego : 'app.retos',
            
            },
            {nombre: 'Ranking',
                statego : 'app.ranking',
            
            },
            {nombre: 'Torneos',
                statego : 'app.torneos',
            
            },
            {nombre: 'Sitios',
                statego : 'app.sitios',
            
            }
 
          
        ];

        vm.menuList_g = [

            {nombre: 'Mecanica',
                statego : 'app.mecanica',
            
            },
            {nombre: 'Premios',
                statego : 'app.ranking',
            
            },
            {nombre: 'Ganadores',
                statego : 'app.ganadores',
            
            }
        ];



        vm.logout = authService.logout;
    }
})();