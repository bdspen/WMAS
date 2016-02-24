angular.module('MapService', []).factory('MapService', ['geolocation', '$rootScope', '$firebaseObject', '$firebaseArray', 'MessageService', 'UserService', '$state', function(geolocation, $rootScope, $firebaseObject, $firebaseArray, MessageService, UserService, $state) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var MapObj = {markers:{}};//sets mapobj(the factory obj) with markers, hich will be all user's markers
    var locations = [];//locations will hold all user locations
    var coords = {};//coords will be object that will hold your coordinates
    var selectedLat = 39.50;//default lat
    var selectedLong = -98.35;//default lng

    MapObj.refresh = function(latitude, longitude) {
        // Clears the array of locations
        locations = [];
        // Set the selected lat and long equal to the ones provided on the refresh() call
        selectedLat = latitude;
        selectedLong = longitude;
        locations = MapObj.convertToMapPoints($rootScope.users); // Convert the results into Google Map Format
        MapObj.initialize(latitude, longitude); // Then initialize the map.
    };

    MapObj.convertToMapPoints = function(users) {
        if (users) {
            var locations = [];// Clear the locations holder
            for (var i = 0; i < users.length; i++) {// Loop through all of the user locations provided in the response
                var user = users[i];
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.lat, user.lng),
                    id: user.$id,
                });
            }
            // location is now an array populated with records in Google Maps format
            return locations;
        }
    };

    // Initializes the map
    MapObj.initialize = function(latitude, longitude) {
        var myLatLng = {// Uses the selected lat, long as starting point
            lat: latitude,
            lng: longitude
        };
        if (!map) {// If no map
            var map = new google.maps.Map(document.getElementById('map'), { // Create a new map
                zoom:8,
                center: myLatLng
            });
        }
        if(locations){
            locations.forEach(function(n, i) { // Loop through each location in the array and place a marker

                var marker = new google.maps.Marker({ //creates a new marker object
                    position: n.latlon,
                    map: map,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });
                MapObj.markers[n.id] = marker;//adds the marker to mapobject

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function() {
                    // When clicked, run code below
                    currentSelectedMarker = n;
                    infoWindow.close();//closes any open infowindow
                    $rootScope.selectedUser = {//selected user will be who you are chatting with
                        uid: n.id,
                        coords:{
                            lat:n.latlon.lat(),
                             lng:n.latlon.lng()
                         }
                    };
                    // create polyline between two users
                    var line = new google.maps.Polyline({
                        path: [
                            new google.maps.LatLng(n.latlon.lat(), n.latlon.lng()),
                            new google.maps.LatLng(selectedLat, selectedLong)
                        ],
                        strokeColor: "#1919ff",
                        geodesic: true,
                        strokeOpacity: .6,
                        strokeWeight: 5,
                        map: map
                    });
                    line.setMap(map);

                    // set the map bounds so the map zooms to midpoint between two users
                    var sw = new google.maps.LatLng($rootScope.selectedUser.coords.lat, $rootScope.selectedUser.coords.lng);
                    var ne = new google.maps.LatLng(selectedLat, selectedLong);
                    var bounds = new google.maps.LatLngBounds(sw, ne);
                    map.fitBounds(bounds);

                    // go to chat state to start chat
                    $state.go('chat', {selectedUid: $rootScope.selectedUser.uid, uid: $rootScope.user.uid});
                });
            });
        }
        // Set initial location as a bouncing red marker
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var infoWindow = new google.maps.InfoWindow({//instructions infowindow shown at start
            content: "<h5>This is you! Click on any blue marker: <img src='http://maps.google.com/mapfiles/ms/icons/blue-dot.png'/> to start a chat.</h5>",
            maxWidth: 300 //size of infowindow
        });
        var marker = new google.maps.Marker({ //creates new marker at this location
            position: initialLocation,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            infoWindow: infoWindow
        });
        MapObj.lastMarker = marker;
        // Function for moving to a selected location
        map.panTo(new google.maps.LatLng(latitude, longitude));//moves map to this location
        infoWindow.open(map, marker);
    };//end initialize function

    return MapObj;
}]);
