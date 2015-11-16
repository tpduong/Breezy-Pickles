angular.module('breezy.dashboard', [])

.controller('DashboardController', ['$scope', 'Users', '$http', function ($scope, Users, $http) {
  $scope.signout = function() {
    Users.signout();
  };
  $scope.paths = [];

  $http.get('/paths').then(function(paths) {
    $scope.paths = paths;
    console.log('Successfully populated');
  });
  $scope.populate = function (index) {
    console.log(index);
    console.log(document.getElementById(index));
  };
}]);
