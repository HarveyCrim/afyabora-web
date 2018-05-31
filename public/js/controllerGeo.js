app.controller('afyaGeo', function(factory, $scope, $timeout, $routeParams) {
    alert('Hornel Lama'); 
    factory.getHospitals('Kinshasa').then(function(data) {
        var test = JSON.stringify(data.data);
        //console.log(data.data[0].Coordonates.length);
        $scope.LoadMap(data.data);
        console.log(data.data.Coordonates.length)
    }, function(error) {
        console.log(error);
    })

    $scope.LoadMap = function(coords) {

        var mapDiv = document.getElementById('map');


        var myLatLng = { lat: -4.44193, lng: 15.2663 };
        var tab = coords.Coordonates;
        var map = new google.maps.Map(mapDiv, {
            center: myLatLng,
            zoom: 10,
            styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]


        });
        /*
        var tabPolylines = [];

        for (var x = 0; x < tab.length; x++) {
            var position = tab[x];
            var latlng = { lat: position[1], lng: position[0] };
            tabPolylines.push(latlng);
        }
        // alert(tabPolylines.length);
        var bermudaTriangle = new google.maps.Polygon({
            paths: tabPolylines,
            strokeColor: '#3CB371',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3CB371',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap(map);
        for (var index = 0; index < coords.AreaDPS.length; index++) {
            var element = coords.AreaDPS[index];
            var latlngMarker = {
                lat: coords.AreaDPS[index].lat,
                lng: coords.AreaDPS[index].lng,
            }


        }

        for (var index = 0; index < coords.AreaDPS.length; index++) {
            var element = coords.AreaDPS[index];
            var latlng = {
                lat: 0.0,
                lng: 0.0
            }
            latlng.lat = element.Coordonates.lat;
            latlng.lng = element.Coordonates.lng;

            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: element.name
            });


        }
*/

    }

    function getGoogleMaps() {

    }
})