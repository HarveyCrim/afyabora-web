app.controller('afyaDoctor', function(factory, $scope, $timeout, $routeParams, $http) {
    var currentLatLng;
    var socket =io.connect('http://localhost:8000');
    var markerList = [];
    socket.on('doctorConnected', function(doctor) {
        var markerPosition = new google.maps.Marker({
            position: { lat: doctor.lat, lng: doctor.lng },
            map: $scope.map,
            title: doctor.Location.nameDoctor,
            animation: google.maps.Animation.DROP,
            icon: 'assets/img/overlays/doctor.png',
            idSocket: doctor.idSocket
        });
        markerPosition.id = doctor.id;
        markerList.push(markerPosition);
        markerPosition.addListener('click', function() {
            // 
            currentLatLng = { lat: doctor.lat, lng: doctor.lng };
            var btn = document.createElement('button');
            btn.innerHTML = "OK";
            var infoBubble = new InfoBubble({

                map: $scope.map,
                content: $scope.drawCard(doctor.Location.nameDoctor, doctor.Location.phoneDoctor, doctor.Location.speciality, doctor.Location.avatar),
                position: new google.maps.LatLng(doctor.lat + 0.013, doctor.lng + 0.005),
                shadowStyle: 1,
                padding: 0,
                backgroundColor: 'white',
                borderRadius: 4,
                arrowSize: 10,
                borderWidth: 1,
                borderColor: '#fffff',
                disableAutoPan: true,
                hideCloseButton: false,
                arrowPosition: 30,
                backgroundClassName: 'phoney',
                arrowStyle: 2,
                marginTop: 20


            });
            if (currentLatLng == undefined) {
                console.log(currentLatLng)
                infoBubble.open($scope.map);
                currentLatLng = { lat: doctor.lat, lng: doctor.lng };
                isOpenIB = true;

            } else {
                if (currentLatLng == { lat: doctor.lat, lng: doctor.lng }) {
                    if (!isOpenIB) {
                        infoBubble.open($scope.map);
                        isOpenIB = true;
                    }
                } else {
                    currentLatLng = { lat: doctor.lat, lng: doctor.lng };
                    infoBubble.open($scope.map);
                    isOpenIB = true;
                }
            }

            google.maps.event.addListener(infoBubble, 'closeclick', function() {
                isOpenIB = false;
            });

        });
        console.log(doctor);
    });

    socket.on('removeDoctor', function(doctor) {
        markerList.forEach(function(marker) {
            if (marker.idSocket == doctor.idSocket) {
                marker.setMap(null);
            }
        })
        console.log('Doctor removed:', doctor);
    })






    $scope.isStreet = true;


    $scope.compareCircle = null;
    $scope.fillTableHospital = function(listHospital, hospital) {


        $scope.template = document.createElement('template');
        $scope.template.innerHTML = '<button>OKAY</button>';

    }
    $scope.searchStreet = function() {

        if ($scope.fieldStreets.toString().trim().length >= 3) {
            $scope.listStreets.forEach(function(elt, key) {
                if (elt.name.includes($scope.fieldStreets.toString().trim())) {
                    if ($scope.compareCircle != null) {
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
    }


    factory.getHospitals('Kinshasa').then(function(data) {
        var test = JSON.stringify(data.data);
        //console.log(data.data[0].Coordonates.length);

        socket.on('userWeb', function(arrayList) {
            console.log('Doctor List :', arrayList.length);
            $scope.LoadMap(data.data, arrayList);
            console.log(data.data.Coordonates.length)
        })

    }, function(error) {
        console.log(error);
    })

    $scope.LoadMap = function(coordsTab, arrayList) {

        document.querySelector('#blockstreet').style = "width:auto;z-index:9999;position:absolute;top:4.7em;display:block;";
        document.querySelector('#blockprogress').style = "display:normal;";
        $scope.globalArea = coordsTab;
        var mapDiv = document.getElementById('map');
        var myLatLng = coordsTab.Position;
        var tab = coordsTab.Coordonates;
        $scope.listStreets = coordsTab.AreaDPS;

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
            var gps = tab[x];
            var latlng = { lat: gps[1], lng: gps[0] };
            tabPolylines.push(latlng);
        }
        var bermudaTriangle = new google.maps.Polygon({
            paths: tabPolylines,
            strokeColor: '#008080',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000080',
            fillOpacity: 0.35
        });
        bermudaTriangle.setMap($scope.map);


        var tabLatLng = [];
        var isOpenIB = false;
        var currentLatLng;
        for (var index = 0; index < arrayList.length; index++) {
            var element = arrayList[index];
            var latlng = {
                lat: 0.0,
                lng: 0.0
            }
            latlng.lat = element.lat;
            latlng.lng = element.lng;
            tabLatLng.push(latlng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: $scope.map,
                title: element.Location.nameDoctor,
                animation: google.maps.Animation.DROP,
                icon: 'assets/img/overlays/doctor.png',
                idSocket: element.idSocket
            });
            marker.id = "marker_" + index;
            markerList.push(marker);

            marker.addListener('click', function() {
                // 
                let rank = this.id.split('_')[1];
                let doctorSelected = arrayList[rank];



                var btn = document.createElement('button');
                btn.innerHTML = "OK";
                var infoBubble = new InfoBubble({

                    map: $scope.map,
                    content: $scope.drawCard(doctorSelected.Location.nameDoctor, doctorSelected.Location.phoneDoctor, doctorSelected.Location.speciality, doctorSelected.Location.avatar),
                    position: new google.maps.LatLng(tabLatLng[rank].lat + 0.013, tabLatLng[rank].lng + 0.005),
                    shadowStyle: 1,
                    padding: 0,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    arrowSize: 10,
                    borderWidth: 1,
                    borderColor: '#fffff',
                    disableAutoPan: true,
                    hideCloseButton: false,
                    arrowPosition: 30,
                    backgroundClassName: 'phoney',
                    arrowStyle: 2,
                    marginTop: 20


                });
                if (currentLatLng == undefined) {
                    console.log(currentLatLng)
                    infoBubble.open($scope.map);
                    currentLatLng = tabLatLng[rank];
                    isOpenIB = true;

                } else {
                    if (currentLatLng == tabLatLng[rank]) {
                        if (!isOpenIB) {
                            infoBubble.open($scope.map);
                            isOpenIB = true;
                        }
                    } else {
                        currentLatLng = tabLatLng[rank];
                        infoBubble.open($scope.map);
                        isOpenIB = true;
                    }
                }

                google.maps.event.addListener(infoBubble, 'closeclick', function() {
                    isOpenIB = false;
                });

            });

        }


        /*
        
        
         // alert(tabPolylines.length);
       

        */
    }
    $scope.drawCard = function(name, phone, speciality, image) {
        let container = document.createElement('div');
        container.className = "container";
        container.style = "width:500px;height:300px;margin:0;padding:0;text-align:center;background-image:url(assets/imgages/background.jpg);background-size:cover;overflow:none";
        let backgrounImage = document.createElement('div');
        backgrounImage.style = "width:100%;height:100px;background-image:url(assets/imgages/background.jpg);background-size:cover;overflow:none;";
        container.appendChild(backgrounImage);
        let titleCard = document.createElement('h4');
        titleCard.innerHTML = 'Afya Card';
        titleCard.style = 'color:#008080;position:absolute;top:0;padding:1em;width:100%;text-align:center';
        container.appendChild(titleCard);
        let containerRounded = document.createElement('div');
        containerRounded.style = "width:120px;height:120px;border-radius:50%;border:3px solid #008080;position:relative;top:-3em;padding:5;display:inline-block;";
        container.appendChild(containerRounded);


        let img = document.createElement('img');
        img.src = image;
        img.style = "width:100px;height:100px;";
        img.className = "rounded-circle";
        containerRounded.appendChild(img);
        let nameDoctor = document.createElement('h4');
        nameDoctor.innerHTML = 'Dr. ' + name;
        nameDoctor.style = "position:relative;top:-1em;color:black;";
        let categorie = document.createElement('p');
        categorie.innerHTML = speciality;
        categorie.style = "position:relative;top:-2em;color:black;width:100%";
        container.appendChild(nameDoctor);
        container.appendChild(categorie);
        let phoneNumber = document.createElement('p');
        phoneNumber.style = "position:relative;top:-3em;color:black;width:100%";
        phoneNumber.innerHTML = phone;
        container.appendChild(phoneNumber);
        return container;
    }


})