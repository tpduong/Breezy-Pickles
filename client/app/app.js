var app = angular.module('breezy', [
  "breezy.main",
  "breezy.dashboard",
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
});


///////////////////// Factory //////////////////////////
app.factory('Maps', function($http) {

});
