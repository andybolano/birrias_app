//lib/calendario.js

 var calendario = {


   calendario: function()
   {
   	var datos_meses = new Array();
   	var meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
 	var f = new Date();
	var mesActual = (f.getMonth() +1);
	var anioActual = f.getFullYear();
	var diaActual  = f.getDate(); 

	for(var i=mesActual; i<=12; i++)
	{
		var ultimo_dia = calendario.ultimoDia(i, anioActual);
		var mes = {"id" : i, "nombre" : meses[i], "dias":ultimo_dia, "hoy":diaActual};
	    datos_meses.push(mes);	
	}

	return datos_meses;

 	},

 	calendario_completo: function()
   {
   	var datos_meses = new Array();
   	var meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
 	var f = new Date();
	var mesActual = (f.getMonth() +1);
	var anioActual = f.getFullYear();
	var diaActual  = f.getDate(); 

	for(var i=1; i<=12; i++)
	{
		var ultimo_dia = calendario.ultimoDia(i, anioActual);
		var mes = {"id" : i, "nombre" : meses[i], "dias":ultimo_dia, "hoy":diaActual};
	    datos_meses.push(mes);	
	}

	return datos_meses;

 	},

 	ultimoDia:function (mes,ano)
 	{ 
	  var ultimo_dia=28; 
	   while (checkdate(mes,ultimo_dia + 1,ano)){ 
	      ultimo_dia++; 
	   } 
	   return ultimo_dia; 
	},



	

	/*cargar_dias:function(mes)
	{
		var f = new Date();
        var diaActual = (f.getDate());
        var anioActual = (f.getFullYear());
        var mesActual = (f.getMonth() +1);
        var estado_boton = "enabled";
        var clase = "dia";
        var vacio = 1;

     

		var dia=""
 	    var cont=0;
		var datos_meses = new Array();
		var datos_meses = calendario.calendario();
	


		 document.getElementById("listaDias").innerHTML="";

		 	var dia_dela_semana = dia_semana(1+"/"+mes+"/"+anioActual);  

		for (var i = 0; i < datos_meses.length; i++) 
		{
				if(datos_meses[i].id == mes)
				{

					   for(var y = 1; y <= datos_meses[i].dias;  y++)
					   {
						   	//desabilitar dias pasados	
						   	if(y<diaActual && mes == mesActual){
						   		estado_boton="disabled";
						   		clase ="dia-disabled"
						   	}else{
						   		estado_boton="enabled";
						   		clase = "dia";
						   	}
						   	/////////////////////
						   

					   		if(cont == 0)
					   		{
						          dia +="<tr>";
						          cont = cont+1;
						          y=y-1;
						    }else if(cont <= 7){
						    	
							    if(vacio < dia_dela_semana){
							    	for(vacio = 1; vacio < dia_dela_semana; vacio++)
							    	{
										dia +="<td width='14%'></td>";
								        cont = cont +1;
								        
								    }
								}			


							          dia +="<td width='14%' height='46px'><button class='btn-reset "+clase+"' id="+mes+""+y+" "+estado_boton+" onclick='reservas.consultar_agenda_del_dia("+mes+","+y+")'>" +y+ "</button></td> ";
							          cont = cont +1;
						      	
						      	

						        }else if(cont > 7){
						          dia +="</tr> ";
						          cont = 0;
						           y=y-1;
						        }
						           $('#listaDias').append(dia);

						          
						           dia = "";
					   }

					var d = new Date();
        			document.getElementById(d.getMonth()+1+""+d.getDate()).classList.add('hoy');
        			reservas.consultar_agenda_del_dia(mes,d.getDate())

				}
		}
      

	},*/

	anio_actual:function(){
	var f = new Date();
        var anioActual = (f.getFullYear());
        return anioActual;
	},
	mes_actual:function(){
		var f = new Date();
        var mesActual = (f.getMonth()+1);
        return mesActual;
	},
	dia_actual:function(){
		var f = new Date();
        var diaActual = (f.getDate());
        return diaActual;
	}

}


function checkdate ( m, d, y ) {
   return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}


function dia_semana(fecha){   
    fecha=fecha.split('/');  
    if(fecha.length!=3){  
            return null;  
    }  
    //Vector para calcular día de la semana de un año regular.  
    var regular =[0,3,3,6,1,4,6,2,5,0,3,5];   
    //Vector para calcular día de la semana de un año bisiesto.  
    var bisiesto=[0,3,4,0,2,5,0,3,6,1,4,6];   
    //Vector para hacer la traducción de resultado en día de la semana.  
    var semana=[1,2,3,4,5,6,7];  
    //Día especificado en la fecha recibida por parametro.  
    var dia=fecha[0];  
    //Módulo acumulado del mes especificado en la fecha recibida por parametro.  
    var mes=fecha[1]-1;  
    //Año especificado por la fecha recibida por parametros.  
    var anno=fecha[2];  
    //Comparación para saber si el año recibido es bisiesto.  
    if((anno % 4 == 0) && !(anno % 100 == 0 && anno % 400 != 0))  
        mes=bisiesto[mes];  
    else  
        mes=regular[mes];  
    //Se retorna el resultado del calculo del día de la semana.  
    return semana[Math.ceil(Math.ceil(Math.ceil((anno-1)%7)+Math.ceil((Math.floor((anno-1)/4)-Math.floor((3*(Math.floor((anno-1)/100)+1))/4))%7)+mes+dia%7)%7)];  
} 



