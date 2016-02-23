angular.module('ReverseGeocodeService', []).factory('ReverseGeocodeService', ['$q', function($q) {
    return {
        numberOfLocations: function(lat, lng) {
            var geocoder = new google.maps.Geocoder();
            var deferred = $q.defer();
            var myLatLng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({
                latLng: myLatLng
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    return deferred.resolve(results[1].formatted_address);
                }
                return deferred.reject();
            });
            return deferred.promise;
        }
    };
}]);
