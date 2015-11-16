angular.module('breezy.dashboard', [])

.controller('DashboardController', ['$scope', 'Users', '$http', function ($scope, Users, $http) {
  $scope.signout = function() {
    Users.signout();
  };
  $scope.paths = [];

  $http.get('/paths').then(function(paths) {
    $scope.paths = paths.data;
  });
  $scope.populate = function (index) {
    var mapDiv = document.getElementById(index);
    var mapInfo = $scope.paths[index];
    var map = new google.maps.Map(mapDiv, { 
      center: {lat: +mapInfo['center'][0], lng: +mapInfo['center'][1]},
      zoom: mapInfo['zoom'],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  };
}]);
