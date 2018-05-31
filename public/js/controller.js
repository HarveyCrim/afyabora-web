app.controller('afyaGeo', function(factory, $scope, $timeout, $routeParams, $http) {
    $scope.isStreet = false;
    $scope.compareCircle = null;
    $scope.fillTableHospital = function(listHospital, hospital) {
        $scope.contentString = '<div id="content">' +
            '<div id="siteNotice"><h4 style="color:black">' + hospital + '</h4></div>' +
            '<div class="md-form">' +
            '<input type="text" id="form1" class="form-control">' +
            '<label for="form1" class="">Nom du centre</label>' +
            '</div>' +

            '<table class="table">' +
            '<thead>' +
            '<tr>' +
            '<th>#</th>' +
            '<th><i class="fa fa-home"></i> Desgnation</th>' +
            '<th><i class="fa fa-phone"></i> Téléphone</th>' +
            '<th><i class="fa fa-road"></i> Distance (Km)</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr ng-repeat=hosto in listHospitals>' +
            '<th scope="row">1</th>' +
            '<td>{{hosto.name}}</td>' +
            '<td>0998301251</td>' +
            '<td>12.89</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>' +
            '<button style="cursor:pointer" class="btn btn-primary"><img src="assets/img/svg/arrow_left.svg" style="width:20px;height:20px"/></button>' +
            '<button style="cursor:pointer" class="btn btn-primary"><img src="assets/img/svg/arrow_right.svg" style="width:20px;height:20px"/></button>'

        $scope.template = document.createElement('template');
        $scope.template.innerHTML = '<button>OKAY</button>';

    }
    $scope.searchStreet = function(dataCheck) {

        var dataCheck = dataCheck.toString().trim();
        $scope.listStreets.forEach(function(elt, key) {
            if (elt.name.includes(dataCheck)) {
                if ($scope.compareCircle !== null) {
                    if ($scope.compareCircle != elt.name) {
                        $scope.cityCircle.setMap(null);
                        $scope.compareCircle = elt;
                        $scope.cityCircle = new google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            center: elt.Coordonates,
                            radius: Math.sqrt(100) * 100
                        });
                        $scope.cityCircle.setMap($scope.map);
                        $scope.infowindow = new google.maps.InfoWindow({
                            //content: $scope.contentString,
                            position: elt.Coordonates
                        });
                        var btn = document.createElement('input');
                        btn.type = "button";
                        btn.value = "OK";
                        $scope.infowindow.setContent(btn);
                    }
                } else {
                    // alert('Second request')

                    /*  var url = "https://maps.googleapis.com/maps/api/distancematrix/json?units&origins=-4.3394767,15.2867776&destinations=-4.319353,15.2984842&key=AIzaSyCP9uC59trgnnth3AJiMrJk29KR-JcqWRw";
                      $http.get(url)
                          .then(function(response) {
                              console.log(JSON.stringify(response.data));
                          }, function(error) {
                              console.error(error);
                          })
                          */
                    $scope.cityCircle = new google.maps.Circle({
                        strokeColor: '#FF0000',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: '#FF0000',
                        fillOpacity: 0.35,
                        center: elt.Coordonates,
                        radius: Math.sqrt(100) * 100
                    });
                    $scope.testList = elt.Hospitals;
                    $scope.fillTableHospital(elt.Hospitals, elt.name);
                    $scope.cityCircle.setMap($scope.map);
                    $scope.compareCircle = elt;
                    $scope.infowindow = new google.maps.InfoWindow({
                        //content: $scope.contentString,
                        position: elt.Coordonates
                    });
                    let html = $scope.contentString;
                    $scope.labelHospital = elt.name;

                    let fragment = document.createRange().createContextualFragment(html);
                    //  document.body.appendChild(fragment);
                    var table = document.querySelector('#tabHospital');
                    table.style = "display:normal";
                    $scope.infowindow.setContent(table);
                    $scope.infowindow.open($scope.map);
                }

            }
        })
    }

    factory.getHospitals('Kinshasa').then(function(data) {
        var test = JSON.stringify(data.data);
        //console.log(data.data[0].Coordonates.length);
        $scope.LoadMap(data.data);
        console.log(data.data.Coordonates.length)
    }, function(error) {
        console.log(error);
    })

    $scope.LoadMap = function(coords) {
       try{
        $scope.isStreet = true;
        // console.log(JSON.stringify(response.data));
        $scope.globalArea = coords;
        var mapDiv = document.getElementById('map');
        var myLatLng = coords.Position;
        var tab = coords.Coordonates;
        $scope.listStreets = coords.AreaDPS;
        $scope.map = new google.maps.Map(mapDiv, {
            center: myLatLng,
            zoom: 12,

            styles: [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#87CEFA"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#87CEFA"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#87CEFA"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#DEB887"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "on"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#008080"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#008080"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ]

        });

        var tabPolylines = [];
        var isInfowindow = false;
        for (var x = 0; x < tab.length; x++) {
            var position = tab[x];
            var latlng = { lat: position[1], lng: position[0] };
            tabPolylines.push(latlng);
        }
        // alert(tabPolylines.length);
        var bermudaTriangle = new google.maps.Polygon({
            paths: tabPolylines,
            strokeColor: '#008080',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000080',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap($scope.map);

        for (var index = 0; index < coords.AreaDPS.length; index++) {
            var element = coords.AreaDPS[index];
            var latlngMarker = {
                lat: coords.AreaDPS[index].lat,
                lng: coords.AreaDPS[index].lng,
            }


        }

        var tabLatLng = [];

        for (var index = 0; index < coords.AreaDPS.length; index++) {
            var element = coords.AreaDPS[index];
            var latlng = {
                lat: 0.0,
                lng: 0.0
            }
            latlng.lat = element.Coordonates.lat;
            latlng.lng = element.Coordonates.lng;
            tabLatLng.push(latlng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: $scope.map,
                title: element.name,
                animation: google.maps.Animation.DROP,
                icon: 'assets/img/overlays/hospital.png'
            });
            marker.id = "marker_" + index;

            marker.addListener('click', function() {
                // 
                let rank = this.id.split('_')[1];
                $scope.contentString = '<div id="content">' +
                    '<div id="siteNotice"><h4 style="color:black">' + coords.AreaDPS[rank].name + '</h4></div>' +
                    '<div class="md-form">' +
                    '<input type="text" id="form1" class="form-control">' +
                    '<label for="form1" class="">Nom du centre</label>' +
                    '</div>' +

                    '<table class="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th>#</th>' +
                    '<th><i class="fa fa-home"></i> Desgnation</th>' +
                    '<th><i class="fa fa-phone"></i> Téléphone</th>' +
                    '<th><i class="fa fa-road"></i> Distance (Km)</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>' +
                    '<tr>' +
                    '<th scope="row">1</th>' +
                    '<td>Lumiere Centre de Santé</td>' +
                    '<td>0998301251</td>' +
                    '<td>12.89</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th scope="row">2</th>' +
                    '<td>Lemba Hopital General de Reference</td>' +
                    '<td>0994601031</td>' +
                    '<td>200</td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '<button style="cursor:pointer" class="btn btn-primary"><img src="assets/img/svg/arrow_left.svg" style="width:20px;height:20px"/></button>' +
                    '<button style="cursor:pointer" class="btn btn-primary"><img src="assets/img/svg/arrow_right.svg" style="width:20px;height:20px"/></button>'


                $scope.infowindow = new google.maps.InfoWindow({
                    content: $scope.contentString,
                    position: tabLatLng[rank]
                });
                $scope.infowindow.open($scope.map);

            });

        }
        document.querySelector('#streetListControl').style.display = 'block';



       }catch(e){
        document.querySelector('#hLoader').innerHTML="Please check your connection"
        document.querySelector('#bar-progress').style.display="none;"
       }
    }


})