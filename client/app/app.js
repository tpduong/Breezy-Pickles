var app = angular.module('breezy', [
  "breezy.dashboard",
  "breezy.auth",
  "breezy.create",
  "breezy.archive",
  "breezy.main",
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
      controller: "DashboardController",
      authenticate: true
    })
    .when('/users/signup', {
      templateUrl: "app/Auth/signup.html",
      controller: "AuthController"
    })
    .when('/create', {
      templateUrl: "app/create/create.html",
      controller: "CreateController",
      // authenticate: true
    })
    .when('/archive', {
      templateUrl: "app/archive/archive.html",
      controller: "ArchiveController",
      authenticate: true
    })

});


///////////////////// Factories //////////////////////////
app.factory('Maps', function($http) {
  return {};
});


// factory for services related to the user

app.factory('Users', function ($http, $window, $location) {
  var signup = function (user) {
    console.log("sending a request to http ", user);
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
    .then( function (resp) {
      console.log('signing up', resp);
      var user = resp.data;
      $window.localStorage.setItem('currentUser', user);
      return user;
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
      console.log('signing in', resp.data);
      var user = resp.data;
      var userId = user._id;
      $window.localStorage.setItem('currentUser', userId);
      return user
    }, function (err) {
      console.log(err);
    });
  };

  var signout = function () {
    $window.localStorage.removeItem('currentUser');
    $location.path('/');
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('currentUser');
  };


  return {
    signup: signup,
    signin: signin,
    signout: signout,
    isAuth: isAuth
  };

});

// check to see if there is a logged in user before change pages
app.run(function ($rootScope, $location, Users) {
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Users.isAuth()) {
      $location.path('/');
    }
  });
});
