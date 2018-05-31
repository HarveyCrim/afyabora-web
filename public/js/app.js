    var app = angular.module('afyaApp', ['ngRoute']);
    app.run(function() {
        console.log('Angular Running');
    })
    app.factory('factory', function($http, $q, $httpParamSerializerJQLike) {

        var data = {
            getHospitals: function(town) {
                var url = "/geo/" + town;
                return $http.get(url);

            }
        }
        return data;

    })