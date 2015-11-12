angular.module('breezy.main', [])

.controller('MainController', function($scope, $timeout, Maps) {

})


//Google Maps API
var poly;
var map;
function initMap() {
  //Create a new map and set center to Hack Reactor
  //Set zoom at lvl 18.  Change higher number to zoom in, lower number to zoom out
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.784029, lng: -122.408933},
    zoom: 18
  });

  poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  poly.setMap(map);

  // Add a listener for the click event
  map.addListener('click', addLatLng);

  // Note: This example requires that you consent to location sharing when
  // prompted by your browser. If you see the error "The Geolocation service
  // failed.", it means you probably did not give permission for the browser to
  // locate you.
  var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  var marker = new google.maps.Marker({
    position: event.latLng,
    title: '#' + path.getLength(),
    map: map
  });
}



