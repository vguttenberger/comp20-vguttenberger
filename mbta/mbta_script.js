function initMap()
	{
		var station_array_1 = [
		 	alewife = new google.maps.LatLng(42.395428, -71.142483),
		 	davis = new google.maps.LatLng(42.39674, -71.121815),
		 	porter_square = new google.maps.LatLng(42.3884, -71.11914899999999),
		 	harvard_square = new google.maps.LatLng(42.373362, -71.118956),
		 	central_square = new google.maps.LatLng(42.365486, -71.103802),
		 	kendall_mit = new google.maps.LatLng(42.36249079, -71.08617653),
		 	charles_mgh = new google.maps.LatLng(42.361166, -71.070628),
		 	park_street = new google.maps.LatLng(42.35639457, -71.0624242),
		 	downtown_crossing = new google.maps.LatLng(42.355518, -71.060225),
			south_station = new google.maps.LatLng(42.352271, -71.05524200000001),
			broadway = new google.maps.LatLng(42.342622, -71.056967),
			andrew = new google.maps.LatLng(42.330154, -71.057655),
			jfk_umass = new google.maps.LatLng (42.320685, - 71.052391)]

		var station_array_2 = [
			jfk_umass = new google.maps.LatLng (42.320685, - 71.052391),
			savin_hill = new google.maps.LatLng(42.31129, -71.053331),
			fields_corner = new google.maps.LatLng(42.300093, -71.061667),
			shawmut = new google.maps.LatLng(42.29312583, -71.06573796000001),
			ashmont = new google.maps.LatLng(42.284652, -71.06448899999999)]

		var station_array_3 = [
			jfk_umass = new google.maps.LatLng (42.320685, - 71.052391),
			north_quincy = new google.maps.LatLng(42.275275, -71.029583),
			wollaston = new google.maps.LatLng(42.2665139, -71.0203369),
			quincy_center = new google.maps.LatLng(42.251809, -71.005409),
			quincy_adams = new google.maps.LatLng(42.233391, -71.007153),
			braintree = new google.maps.LatLng(42.2078543, -71.0011385)]	
	
		var marker_array = [
			{position: alewife, title: "Alewife"},
			{position: davis, title: "Davis"},
			{position: porter_square, title: "Porter Square"},
			{position: harvard_square, title: "Harvard Square"},
			{position: central_square, title: "Central Square"},
			{position: kendall_mit, title: "Kendall/MIT"},
			{position: charles_mgh, title: "Charles/MGH"},
			{position: park_street, title: "Park Street"},
			{position: downtown_crossing, title: "Downtown Crossing"},
			{position:south_station, title: "South Station"},
			{position: broadway, title: "Broadway"},
			{position: andrew, title:"Andrew"},
			{position: jfk_umass, title: "JFK/UMass"},
			{position: savin_hill, title: "Savin Hill"},
			{position: fields_corner, title: "Fields Corner"},
			{position: shawmut, title: "Shawmut"},
			{position: ashmont, title: "Ashmont"},
			{position: north_quincy, title: "North Quincy"},
			{position: wollaston, title: "Wollaston"},
			{position: quincy_center, title: "Quincy Center"},
			{position: quincy_adams, title: "Quincy Adams"},
			{position: braintree, title: "Braintree"}
		];

		// Set up map
		var myOptions = {
			zoom: 13, // The larger the zoom number, the bigger the zoom
			center: south_station,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		// Create the map in the "map_canvas" <div>
		var map = new google.maps.Map(document.getElementById("map"), myOptions);

		// Create markers
		var image = {
			url: 'red_line_marker.png',
			scaledSize: new google.maps.Size(40, 40)
		};

		red_line();
		my_location();
		//schedule();

		function red_line(){
				for ( i = 0; i < marker_array.length; i++){
					var marker = new google.maps.Marker({
						position: marker_array[i].position,
						title: marker_array[i].title,
						icon: image
					});
					marker.setMap(map);

					google.maps.event.addListener(marker, 'click', function(){
						schedule(this);
					});
				}

				//render polylines
				var trainPath_1 = new google.maps.Polyline({
					path: station_array_1,
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 4
				});

				trainPath_1.setMap(map);

				var trainPath_2 = new google.maps.Polyline({
					path: station_array_2,
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 4
				});

				trainPath_2.setMap(map);

				var trainPath_3 = new google.maps.Polyline({
					path: station_array_3,
					geodesic: true,
					strokeColor: '#FF0000',
					strokeOpacity: 1.0,
					strokeWeight: 4
				});

				trainPath_3.setMap(map);
		}

		function my_location(){
			var lat = 0;
			var lng = 0;

			navigator.geolocation.getCurrentPosition(function(pos){
				lat = pos.coords.latitude;
				lng = pos.coords.longitude;

				//set marker
				var me = new google.maps.LatLng(lat, lng);
				map.panTo(me);

				//calculate distance
				distance_min = google.maps.geometry.spherical.computeDistanceBetween(marker_array[0].position, me);
				var station_title = marker_array[0].title;
				var station_location = marker_array[0].position;
				
				for ( i = 0; i < marker_array.length; i++){
					distance = google.maps.geometry.spherical.computeDistanceBetween(marker_array[i].position, me);
					if (distance < distance_min){
						distance_min = distance;
						var station_title = marker_array[i].title;
						var station_location = marker_array[i].position;
					}
				}

				var miles_away = distance_min*(0.000621371);
				//set marker
				var me_marker = new google.maps.Marker({
					position: me,
					title: "The closest Red Line Station is <h4>" + station_title + "</h4> <br> which is <h3>" + miles_away + 
								"</h3> miles away."
				});

				me_marker.setMap(map);

				//infowindow for marker
				var infoWindow = new google.maps.InfoWindow();
				google.maps.event.addListener(me_marker, 'click', function(){
					infoWindow.setContent(this.title);
					infoWindow.open(map, this);
				});

				//render polyline
				var my_path = [
				me, station_location
				];

				var my_line= new google.maps.Polyline({
					path: my_path,
					geodesic: true,
					strokeColor: '#4B0082',
					strokeOpacity: 1.0,
					strokeWeight: 4
				});

				my_line.setMap(map);
			});
		}

		function schedule(current_stop){
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.open("GET", "https://morning-lowlands-15587.herokuapp.com/redline.json", true)

			xmlhttp.onreadystatechange = function(){
				var infoWindow = new google.maps.InfoWindow();
				var string = "";
				if (this.readyState == 4 && this.status == 200){
					var data = JSON.parse(this.responseText);
					var trips = data.TripList.Trips;

					for (i = 0; i < trips.length; i++){
						var predictions = trips[i].Predictions;

						for (j = 0; j < predictions.length; j++){

							if (predictions[j].Stop == current_stop.title){
								var mins = predictions[j].Seconds*(0.0166667);
								string += trips[j].Destination + " in " + mins + " mins" + "<br>";
							}

						}
					}
					infoWindow.setContent(string);
					infoWindow.open(map, current_stop);
				}
			
			};
			xmlhttp.send();
		}
	}

