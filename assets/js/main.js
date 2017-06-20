function initMap(){
	var map = new google.maps.Map(document.getElementById("map"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.getElementById("encuentrame").addEventListener("click", buscar);
	var latitud,longitud;

	
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat: latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});

		map.setZoom(17);
		map.setCenter({lat: latitud,lng: longitud});
	}

	var funcionError = function (error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}
	/*Funcion para autocomplete*/
	var inputL = (document.getElementById('origen'));
	var autocomplete = new google.maps.places.Autocomplete(inputL);
        autocomplete.bindTo('bounds', map);

    var inputR = (document.getElementById('destino'));
	var autocomplete = new google.maps.places.Autocomplete(inputR);
        autocomplete.bindTo('bounds', map);

    /*trazar ruta*/
    var directionsDisplay = new google.maps.DirectionsRenderer();/*nos dará las herramientas necesarias para que visualicemos en el navegador toda la información obtenida*/
    var directionsService = new google.maps.DirectionsService();/*es el servicio que buscará en las bases de datos de Google Maps tanto los puntos como la(s) rutas existentes*/
 
function getDirections(){
	var start = $('#origen').val();
	var end = $('#destino').val();
	if(!start || !end){
		alert("Start and End addresses are required");
		return;
	}
		//Declaramos una variable con las opciones con las que se va a solicitar la información al objeto DirectionsServices
	var request = {	/*lo siguiente son parámetros para hacer la búsqueda de acuerdo a los datos introducidos*/
		 //A origin se le asigna el valor de  la caja de texto origen estableciendo el punto de partida de la ruta.
	    origin: start,
	 	 //A destination se le asigna el valor de la caja de texto destino con el que se especifica el punto final de la ruta.
	    destination: end,
	}
	//hace la solicitud a la API con los datos que previamente establecimos (request), creamos una una función interna, que recibe los parámetros de respuesta (response) que es donde vendrían contenidos los datos y un estatus (status) que indica si fue exitosa la solicitud
	directionsService.route(request, function(response, status) {
		//Si el estatus es OK procedemos, si no, mandamos un mensaje de error diciendo que no se pudo encontrar ruta entre ambos puntos	
        if (status == google.maps.DirectionsStatus.OK) {
           //hace la magia, imprime en el mapa la ruta y escribe las indicaciones de acuerdo a las 2 instrucciones anteriores.
            directionsDisplay.setDirections(response);
        } else {
            alert("There is no directions available between these two points");
        }
    });
}
$('#ruta').on('click', function(){ getDirections(); });

}	
	
	


	