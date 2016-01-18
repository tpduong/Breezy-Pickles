angular.module('breezy.dashboard', [])

.controller('DashboardController', ['$scope', 'Users', '$http', '$location', function ($scope, Users, $http, $location) {
  $scope.createMap = function () {
    $location.path('/create');
  };
  $scope.signout = function() {
    Users.signout();
  };
  $scope.maps = [];
  $scope.searchTerm = "";
  $scope.polylines = {};

  var allMaps = [];
  var userMaps = [];



  $scope.populate = function (index) {

    console.log("index", index);
    if (!$scope.polylines[index]){    // avoid re-rendering maps
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

  // $scope.search = function() {

  // };

  // $scope.renderMaps = function() {
  //   for (var i = 0; i < $scope.maps.length; i++) {
  //     $scope.populate(0);

  //   }
  // };

  $scope.displayMyMaps = function() {
    console.log('pushed one');
    $scope.maps.push(userMaps[0]);
    // $scope.renderMaps();

  };

  $scope.displayAllMaps = function() {
    console.log('all maps======')
    console.dir(allMaps);
    console.log('=========');
    $scope.maps.push(allMaps[2]);
    console.dir($scope.maps);
  };


  $http.get('/paths').then(function(maps) {
    allMaps = maps.data.reverse();

    for (var i = 0; i < allMaps.length; i++) {
      if(allMaps[i].createdBy === localStorage.currentUser) {
        userMaps.push(allMaps[i]);
      }
    }
    $scope.displayMyMaps();

  });

}]);

