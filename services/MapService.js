angular.module('MapService', []).factory('MapService', ['geolocation', '$rootScope', '$firebaseObject', '$firebaseArray', 'MessageService', 'UserService', function(geolocation, $rootScope, $firebaseObject, $firebaseArray, MessageService, UserService) {
    var MapObj = {};
    var locations = [];
    var coords = {};
    var selectedLat = 39.50;
    var selectedLong = -98.35;
    var ref = new Firebase("https://worldmessage.firebaseio.com");


    geolocation.getLocation().then(function(data){
        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        MapObj.refresh(coords.lat, coords.long);
    });

    // Refresh the Map with new data.
    MapObj.refresh = function(latitude, longitude) {
        // Clears the holding array of locations
        locations = [];
        // Set the selected lat and long equal to the ones provided on the refresh() call
        selectedLat = latitude;
        selectedLong = longitude;

        locations = MapObj.convertToMapPoints($rootScope.users); // Convert the results into Google Map Format
        MapObj.initialize(latitude, longitude); // Then initialize the map.
    };
    MapObj.convertToMapPoints = function(users) {
        if (users) {
            // Clear the locations holder
            var locations = [];
            // Loop through all of the user locations provided in the response
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                // Create popup windows for each record
                var contentString =
                    '<h4>' + user.name + '</h4>';
                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(user.lat, user.lng),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320 //size of infowindow
                    }),
                    username: user.name,
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
        if (!map) {// If map has not been created already...
            var map = new google.maps.Map(document.getElementById('map'), { // Create a new map
                zoom:8,
                center: myLatLng
            });
        }
        if(locations){
            locations.forEach(function(n, i) { // Loop through each location in the array and place a marker
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map,
                    title: "Big Map",
                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });
                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e) {
                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map, marker);
                    $rootScope.$apply(function() {
                        var selectedUser = n.id;
                        $rootScope.selectedUser = selectedUser;
                    });
                });
            });
        }
        // Set initial location as a bouncing red marker
        var initialLocation = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({ //marker is a function to create a new marker

            position: initialLocation,
            animation: google.maps.Animation.BOUNCE,
            map: map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        MapObj.lastMarker = marker;
        // Function for moving to a selected location
        map.panTo(new google.maps.LatLng(latitude, longitude));
    };
    // Refresh the page upon window load. Use the initial latitude and longitude
    google.maps.event.addDomListener(window, 'load',
        MapObj.refresh(selectedLat, selectedLong));

    return MapObj;
}]);
