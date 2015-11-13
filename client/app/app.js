var app = angular.module('breezy', [
  "breezy.main",
  "breezy.dashboard",
  "breezy.auth",
  "breezy.create",
  "ngRoute"
]);

////////////////////// Routes //////////////////////////
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "app/main/main.html",
      controller: 'MainController'
    })
    .when('/dashboard', {
      templateUrl: "app/dashboard/dashboard.html",
      controller: "DashboardController"
    })
    .when('/users/signup', {
      templateUrl: "app/Auth/signup.html",
      controller: "AuthController"
    })
    .when('/create', {
      templateUrl: "app/create/create.html",
      contoller: "CreateController"
    })

});


///////////////////// Factories //////////////////////////
app.factory('Maps', function($http) {
  return {};
});


// factory for services related to the user 
app.factory('Users', function ($http) {
  var signup = function (user) {
    console.log("sending a request to http ", user);
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
    .then( function (resp) {
      console.log('signing up', resp);
      return resp.data;
    }, function (err) {
      console.log(err);

    });
  };

  var signin = function (user) {
    return $http({
      method:'POST',
      url: '/users/signin',
      data: user
    })
    .then( function (resp) {
      console.log('signing in', resp);
      return resp.data;
    }, function (err) {
      console.log(err);
    });
  };

  return {
    signup: signup,
    signin: signin
  };

});
