angular.module('breezy.dashboard', [])

.controller('DashboardController', ['$scope', 'Users', '$http', function ($scope, Users, $http) {
  $scope.signout = function() {
    Users.signout();
  };
  $scope.maps = [];

  $scope.polylines = {};

  $http.get('/paths').then(function(maps) {
    $scope.maps = maps.data;
  });

  $scope.populate = function (index) {
    if (!$scope.polylines[index]){
      $scope.polylines[index] = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      $scope.polylines[index].setPath($scope.maps[index].path.map(function (tuple) {
        return {lat: tuple[0], lng: tuple[1]};
      }));

      var mapDiv = document.getElementById(index);
      var mapInfo = $scope.maps[index];
      var map = new google.maps.Map(mapDiv, { 
        center: {lat: +mapInfo['center'][0], lng: +mapInfo['center'][1]},
        zoom: mapInfo['zoom'],
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      $scope.polylines[index].setMap(map);
    }
  };
}]);
