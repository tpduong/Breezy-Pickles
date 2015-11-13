angular.module('breezy.auth', [])

.controller('AuthController', function ($scope, $location, Users) {
  $scope.signup = function () {
    Users.signup( $scope.user )
    .then( function (user) {
      console.log(user);
      $location.path('/');
    });
  };
});
