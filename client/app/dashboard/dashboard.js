angular.module('breezy.dashboard', [])

.controller('DashboardController', function ($scope, $timeout, Maps, Users) {
  $scope.signout = function() {
    Users.signout();
  };
});
