angular.module('ReverseGeocodeService', []).factory('ReverseGeocodeService', [
    function() {
        return function(lat,lng){
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(lat,lng);
            geocoder.geocode({
                'latLng': latlng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        return results[1].formatted_address;
                    } else {
                        console.log('Location not found');
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        }
    }
]);
