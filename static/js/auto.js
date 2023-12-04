function initMap3() {
  var mapElement = document.getElementById('map-container');
  var mapOptions = {
    center: { lat: 35.682839, lng: 139.759455 }, // マップの初期中心座標（例）
    zoom: 15
  };
  var map = new google.maps.Map(mapElement, mapOptions);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: '現在地'
      });

      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      var addWaypointsButton = document.getElementById('add-waypoints-button');

      addWaypointsButton.addEventListener('click', function() {
        // 目的地を現在地に設定
        var destination = userLocation;

        // 経由地を自動的に検索して追加
        var placesService = new google.maps.places.PlacesService(map);

        // 経由地1を検索して追加
        placesService.nearbySearch({
          location: userLocation,
          radius: 2000, // 2キロ以内の範囲
          keyword: '公園'
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var waypoint1 = results[0].geometry.location;

            // 経由地2を検索して追加
            placesService.nearbySearch({
              location: userLocation,
              radius: 2000, // 2キロ以内の範囲
              keyword: '川'
            }, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var waypoint2 = results[0].geometry.location;

                // 経由地3を検索して追加
                placesService.nearbySearch({
                  location: userLocation,
                  radius: 2000, // 2キロ以内の範囲
                  keyword: 'コンビニ'
                }, function(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var waypoint3 = results[0].geometry.location;

                    var request = {
                      origin: userLocation,
                      destination: destination,
                      waypoints: [
                        { location: waypoint1, stopover: true },
                        { location: waypoint2, stopover: true },
                        { location: waypoint3, stopover: true }
                      ],
                      travelMode: 'WALKING'
                    };

                    directionsService.route(request, function(result, status) {
                      if (status === 'OK') {
                        directionsRenderer.setDirections(result);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      });
    });
  }
}
initMap3();