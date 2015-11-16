angular.module('breezy.dashboard', [])

.controller('DashboardController', function ($scope, $timeout, Maps, $location, Users) {
  $scope.signout = function () {
    Users.signout();
  };

  $scope.createMap = function () {
    $location.path('/create');
  };
});
