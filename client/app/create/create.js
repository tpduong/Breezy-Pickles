angular.module('breezy.create', [])

.controller('CreateController', ['$scope', '$http', function ($scope, $http) {
  $scope.map;
  $scope.path = null;
  $scope.poly = new google.maps.Polyline({
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3
  });

  //================ DEFINE INITAUTOCOMPLETE ================\\
  $scope.initAutocomplete = function initAutocomplete() {

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    $scope.map = map;
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
      console.log('markers is ', markers);
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
  
  $scope.poly.setMap(map);

  // Add a listener for the click event
  map.addListener('click', $scope.addLatLng);
  }

$scope.addLatLng = function addLatLng(event) {
  console.dir($scope.poly);
  $scope.path = $scope.poly.getPath(); // returns array of latLng objects
  console.log('*******',event.latLng);
  // Because $scope.path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  $scope.path.push(event.latLng);
  console.log("lat:", event.latLng.lat());
  console.log("long: ", event.latLng.lng());

  }
  //================ END INITAUTOCOMPLETE DEFINITION ================\\
  $scope.savePath = function () {
    var center = [ $scope.map.getCenter().lat(), $scope.map.getCenter().lng() ], // tuple of form [lat, lng]
      pathArr = $scope.poly.getPath().j,   // google maps api gives the actual array of latLng objects the prop-name of "j". Not my idea!
      zoom = $scope.map.getZoom(),
      path = [];
    pathArr.forEach(function(latlng){
      path.push( [latlng.lat(), latlng.lng()] ); // push tuple of [lat, lng] to path
    });
    var mapInfo = {
      identifiers: {title: $scope.title},
      center: center,
      path: path,
      zoom: zoom
    };
    console.log(JSON.stringify(mapInfo));
    $http.post('/paths', JSON.stringify(mapInfo));
  }
  $scope.initAutocomplete();
}]);

// Handles click events on a map, and adds a new point to the Polyline.

  // if(makeNote === true) {
  //   Add a new marker at the new plotted point on the polyline.
  //   var marker = new google.maps.Marker({
  //     position: event.latLng,
  //     title: '#' + $scope.path.getLength(),
  //     map: map
  //   });
  // }
