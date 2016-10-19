(function() {
    'use strict';

    angular
        .module('reservas')
        .controller('reservasCtrl',  reservasCtrl);

    /* @ngInject */
    function reservasCtrl($scope,$http, API_URL,$state,$ionicModal,$sce,$ionicPopup) {

    	 $scope.$on('$ionicView.loaded',function(){
          //declarar escopes y funciones iniciales
       
          // $scope.getMisReservasActivas();
           //$scope.misEstadisticas();

        $scope.sitios = {};
        $scope.canchas = {};
        $scope.Sitio = {};
        $scope.Cancha = {};
        $scope.Meses = {};
        $scope.sapo = false;
        $scope.MesSeleccionado = {};
        $scope.ReservasPendientes = [];
        $scope.estadisticas = [];
        $scope.Historial = [];
        $scope.agenda = "";
        $scope.calendar = "";

        $scope.listaSitios = true;
        $scope.canchaView = false;
        $scope.sitioView = false;
        $scope.listaCanchas = false;
        $scope.calendario = false;

        $scope.tabSitios = "activo";
        $scope.tabCanchas = "";
        $scope.tabReservas = "";

   		 $scope.getSitios();
         $scope.getMisReservasActivas();
           $scope.historial();
           $scope.misEstadisticas();
        });

    	  
  
        $scope.getMisReservasActivas = function () {
            var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));
            $http.get(API_URL+'reservasPendientes/' + data_usuario._id).success(function (data) {
                $scope.ReservasPendientes = data.respuesta;
            });
        }

        $scope.misEstadisticas = function () {
            var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));
            $http.get(API_URL+'usuario/' + data_usuario._id + '/estadisticas').success(function (data) {
                $scope.estadisticas = data.respuesta[0];
                
               
                     
     
            });
        }

        $scope.getSitios = function () {
            if (localStorage.data_sitios.length === 0) {
                $http.get(API_URL+"sitios").success(function (data) {
                    localStorage.setItem('data_sitios', JSON.stringify(data.respuesta));
                    $scope.showSitios();
                });
            } else {
                $scope.showSitios();
            }
        }

        $scope.showSitios = function () {
         
            $scope.listaSitios = true;
            $scope.canchaView = false;
            $scope.sitioView = false;
            $scope.listaCanchas = false;
            $scope.calendario = false;
           $scope.horas= false;

           $scope.sapo = false;
           $scope.tabSitios = "activo";
           $scope.tabCanchas = "";
           $scope.tabReservas = "";
    
           
            $scope.sitios = JSON.parse(localStorage.getItem('data_sitios'));
   
        }

        $scope.getCanchasBySitio = function (sitio) {

            if (sitio == 0 && $scope.sapo == false) {

            } else {

                if ($scope.sapo == false) {
                    $scope.Sitio = sitio;
                }
                $scope.sapo = false;


              $scope.listaSitios = false;
            $scope.canchaView = false;
            $scope.sitioView = true;
            $scope.listaCanchas = true;
            $scope.calendario = false;
             $scope.horas= false;

                $http.get(API_URL+"canchas/" + $scope.Sitio._id).success(function (data) {
                    $scope.canchas = data.respuesta;
			           $scope.tabSitios = "";
			           $scope.tabCanchas = "activo";
			           $scope.tabReservas = "";

                });
            }
        }

        $scope.cargarMeses = function (cancha) {


            $scope.sapo = true;
            $scope.Cancha = cancha;
            $scope.Meses = calendario.calendario();

            $scope.calendario = true;
            $scope.listaCanchas = false;
             $scope.canchaView = true;
             $scope.calendario = true;
              $scope.horas= false;

            $scope.tabSitios = "";
			$scope.tabCanchas = "";
		    $scope.tabReservas = "activo";

            var f = new Date();
            $scope.cargarDias((f.getMonth() + 1));

        }

        $scope.cargarDias = function (mes) {

            var f = new Date();
            

         var diaActual = (f.getDate());
            var anioActual = (f.getFullYear());
            var mesActual = (f.getMonth() + 1);
            var estado_boton = "enabled";
            var clase = "dia";
            var vacio = 1;



            var dia = ""
            var cont = 0;
            var datos_meses = new Array();
            var datos_meses = calendario.calendario();

             var d = new Date();

    
         	var id1 = d.getMonth() + 1 + "" + d.getDate();

            var dia_dela_semana = dia_semana(1 + "/" + mes + "/" + anioActual);

            for (var i = 0; i < datos_meses.length; i++)
            {
                if (datos_meses[i].id == mes)
                {

                    for (var y = 1; y <= datos_meses[i].dias; y++)
                    {
                        //desabilitar dias pasados	
                        if (y < diaActual && mes == mesActual) {
                            estado_boton = "disabled";
                            clase = "dia-disabled"
                        } else {
                            estado_boton = "enabled";
                            clase = "dia";
                        }
                        /////////////////////


                        if (cont == 0)
                        {
                            dia += "<tr>";
                            cont = cont + 1;
                            y = y - 1;
                        } else if (cont <= 7) {

                            if (vacio < dia_dela_semana) {
                                for (vacio = 1; vacio < dia_dela_semana; vacio++)
                                {
                                    dia += "<td width='14%'></td>";
                                    cont = cont + 1;

                                }
                            }

                            var id2 =  mes + "" + y;
                            if(id1 == id2){
								clase += " hoy";
                            }

                            dia += "<td width='14%' height='46px'><button class='btn-reset " +   clase + "' id=" + mes + "" + y + "  " + estado_boton + " onclick='angular.element(this).scope().getAgendaDiaByCancha(" + mes + "," + y + ")'>" + y + "</button></td> ";
                            cont = cont + 1;



                        } else if (cont > 7) {
                            dia += "</tr> ";
                            cont = 0;
                            y = y - 1;
                        }
                      


                        
                       
                        
                    }
                    
                    $scope.calendar =  $sce.trustAsHtml(dia);
                
                  
                $scope.getAgendaDiaByCancha(mes, d.getDate())

               }
            }
        }


        $scope.getAgendaDiaByCancha = function (mes, dia) {




            var horaReservas = "";
             $scope.horas= true;
           

            for (var h = 0; h <= 23; h++)
            {

                horaReservas += "<tr><td width='10px'   valign='top' style='font-size:14px;'>" + h + ":00</td><td><button id='" + h + ":00' class='hora btn-reset' onclick='angular.element(this).scope().reservar_cancha(" + h + "," + dia + "," + mes + ")'>RESERVAR</button></td></tr>"
               
            }


             $scope.agenda =  $sce.trustAsHtml(horaReservas);

            var mesString = mes.toString();
            var diaString = dia.toString();

            if (mesString.length === 1) {

                mesString = "0" + mesString;
            }

            if (diaString.length === 1) {

                diaString = "0" + diaString;
            }

            var anio = calendario.anio_actual();
            var fecha = anio + "-" + mesString + "-" + diaString;

            $http.get(API_URL+'reservas/' + $scope.Cancha._id + '/' + fecha).success(function (data) {
                var listaAgenda = data.respuesta;

                if (listaAgenda.length > 0)
                {
                    for (var i = 0; i < listaAgenda.length; i++)
                    {

                        document.getElementById(listaAgenda[i].hora.desde).innerHTML = "RESERVADO";
                        document.getElementById(listaAgenda[i].hora.desde).style.background = "#E53935";
                        document.getElementById(listaAgenda[i].hora.desde).disabled = true;
                        //dia y hora actual si es menor a la actual no se puede reservar
                    }
                }

              

            });


        }

        $scope.reservar_cancha = function (hora, dia, mes) {
            var d = new Date();
            var di = new Date();
            if (d.getHours() >= hora && di.getDate() == dia) {

                var alertPopup = $ionicPopup.alert({
                 title: 'Oops!',
                 template: 'Imposible devolver el tiempo!'
               });

               
            } else {

                var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));


 var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmar Reserva',
         template: "Esta seguro que desea reservar la cancha a las " + hora + ":00, el dia: " + dia + " del mes: " + mes
      });

      confirmPopup.then(function(res) {
         if(res) {
            mes = mes.toString();
                        dia = dia.toString();
                        if (mes.length === 1) {
                            mes = "0" + mes;
                        }
                        if (dia.length === 1) {
                            dia = "0" + dia;
                        }
                        var anio = calendario.anio_actual();



                        var obj = {
                            "sitio": $scope.Sitio._id,
                            "cancha": $scope.Cancha._id,
                            "usuario": data_usuario._id,
                            "fecha": {
                                "anio": anio,
                                "mes": mes,
                                "dia": dia
                            },
                            "hora": {
                                "desde": hora + ":00",
                                "hasta": hora + ":59",
                            },
                            "estado": 'esperandoRevision',
                            "via": 'remota',
                             tipo:'NORMAL',
                        };

                      
                            $http.post(API_URL+'reservas', obj).success(function (data) {
                          
                                if (data.res === true) {
                                    $scope.getMisReservasActivas();

                                      var alertPopup = $ionicPopup.alert({
                                         title: "Excelente",
                                         template:  data.msg
                                       });

                                    
                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                         title: "Oops",
                                         template:  data.msg
                                       });

                                  
                                }
                            });
           
         } else {
            var alertPopup = $ionicPopup.alert({
                 title: "Cancelado",
                 template:  'Has cancelado el proceso de reserva :('
               });

          
         }
      });
        

              
            }
        }

        $scope.informacionEstado = function (estado) {
            switch (estado)
            {
                case 'esperandoRevision':


                var alertPopup = $ionicPopup.alert({
                 title: 'Esperando revisión',
                 template:  'Deberás esperar a que el sitio donde has hecho la reserva  revise tu solicitud, está atento pronto enviarán respuesta.'
               });

                    break;
                case 'esperandoConfirmacion':

                 var alertPopup = $ionicPopup.alert({
                 title: "Esperando confirmación",
                 template:  'El sitio esta esperando que confirmes tu reserva.'
               });

               
                    break;
                case 'confirmadaSinAbono':

                 var alertPopup = $ionicPopup.alert({
                 title: "Confirmado sin abono",
                 template:  'Haz confirmado tu reserva, pero a un no se registra ningún abono. Si hay un abono requerido deberás acercarte al sitio y cancelar el abono, de lo contrario pueden cancelar tu reserva.'
               });

                    break;
                case 'confirmadaConAbono':

                 var alertPopup = $ionicPopup.alert({
                 title: "Confirmado con abono",
                 template:  'Haz confirmado tu reserva y te haz acercado a abonar, ahora tu reserva está segura. Te esperamos en la fecha y hora acordada.'
               });

                   
                    break;
                case 'cumplida':

                var alertPopup = $ionicPopup.alert({
                 title: "Cumplida",
                 template:  'Muy bien, haz cumplido con tu reserva.'
               });

                
                    break;
                case 'incumplida':

                 var alertPopup = $ionicPopup.alert({
                 title: "Incumplida",
                 template:  'Muy mal, haz incumplido con tu reserva, esto bajara tu creebilidad y te bajara puntos.'
               });

                   
                    break;
                case 'cancelada':
                    var alertPopup = $ionicPopup.alert({
                 title: "Cancelada",
                 template:  'Tu reserva ha sido cancelada.'
               });
                    break;
            }
        }
        
        $scope.historial = function(){
            $scope.getHistorial();  
        }
        
        $scope.getHistorial = function(){

         var data_usuario = JSON.parse(localStorage.getItem('data_usuario'));
           $http.get(API_URL+'reservas/' + data_usuario._id).success(function (data) {
                $scope.Historial = data.respuesta;
                
            });
        }
        
        
        $scope.actualizar_estado = function(idreserva,nuevoEstado){
        
            
		
	        switch (nuevoEstado) 
	        {
	        	case 2: nuevoEstado = "esperandoConfirmacion"; break;	
	        	case 3: nuevoEstado = "confirmadaConAbono"; break;
	        	case 4: nuevoEstado = "confirmadaSinAbono"; break;
	        	case 5: nuevoEstado = "cancelada"; break;
	        	case 6: nuevoEstado = "incumplida"; break;
	        	case 7: nuevoEstado = "cumplida"; break; 
	        }

var object = {
   idReserva:idreserva,
   estado:nuevoEstado
}

if(nuevoEstado=="cancelada"){	 
        swal({
            title: "Está seguro que desea cancelar la reserva!",   
            text: "Esto será negativo para su historial!",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Si, cancelarla!",   
            cancelButtonText: "No, no quiero cancelarla!",   
            closeOnConfirm: false,   
            closeOnCancel: false 
        },
        function(isConfirm){   
            if (isConfirm) {    
                $http.put(API_URL+'reserva',object).success(function (data) {
                swal("Cancelada!", "La reserva ha sido cancelada con exito", "success"); 
                $scope.getMisReservasActivas();
            });
                
                  
            } else {     
                 
            } 
        });
}else{
   $http.put(API_URL+'reserva',object).success(function (data) {

    var alertPopup = $ionicPopup.alert({
                 title: "Confirmada",
                 template:  'La reserva ha sido confirmada con exito.'
               });
                $scope.getMisReservasActivas();
            }); 
}
		
 }


      }
})();