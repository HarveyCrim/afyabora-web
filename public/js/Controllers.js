app.controller('Ctrl', function(factory, $scope) {

    $scope.add = function() {
        alert('Hornel Lama')
    }
    $scope.log = function() {
        alert($scope.email);
    }
})