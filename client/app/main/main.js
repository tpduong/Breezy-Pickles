angular.module('breezy.main',[])
  .controller('MainController', function ($scope, $timeout, $location, $window, Maps, Users) {
    $scope.show = false;

    $scope.toggle = function () {
      $scope.show = !$scope.show;
    };

    $scope.signup = function () {
      $location.path('/users/signup');
    };

    $scope.signin = function () {
      Users.signin($scope.user)
      .then( function (user) {
        $window.currentUser = user;

        console.log($window.currentUser);
        $location.path('/dashboard');
        //need to set current username in global variable to username
      });
    };
  });


$(document).ready(function() {
    document.getElementById("path").addEventListener("click", function(){
      console.log("drawLine is currently:", drawLine);
      if(drawLine === false) drawLine = true;
      else if (drawLine === true) drawLine = false;
      console.log("drawLine is now:", drawLine)
    });


    document.getElementById("note").addEventListener("click", function(){
      console.log("makeNote is currently:", makeNote);
      if(makeNote === false) makeNote = true;
      else if (makeNote === true) makeNote = false;
      console.log("makeNote is now:", makeNote)

    });
});

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.
var poly;

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.784029, lng: -122.408933},
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });


  //Create polylines
  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  // console.log(poly);
  poly.setMap(map);

  // Add a listener for the click event
  map.addListener('click', addLatLng);
}





// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  // if(drawLine === true) {
  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  console.log("lat:", event.latLng.lat());
  console.log("long: ", event.latLng.lng());

  // }

  // if(makeNote === true) {
    // Add a new marker at the new plotted point on the polyline.
    // var marker = new google.maps.Marker({
    //   position: event.latLng,
    //   title: '#' + path.getLength(),
    //   map: map
    // });
  // }
}




//---------------Address Box---------------------









