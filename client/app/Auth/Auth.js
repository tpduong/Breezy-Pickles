angular.module('breezy.auth', [])

.controller('AuthController', function ($scope, $location, Users) {
  $scope.show = false;

  $scope.toggle = function () {
    $scope.show = !$scope.show;
  };

  $scope.reroute = function () { 
    $location.path('/users/signup');
  }

  $scope.signup = function () {
    Users.signup( $scope.user )
    .then( function (user) {
      console.log(user);
      $location.path('/');
    });
  };

  $scope.signin = function () {
    Users.signin($scope.user)
    .then( function (user) {
      $location.path('/dashboard');
      //need to set current username in global variable to username
    });
  };


});
