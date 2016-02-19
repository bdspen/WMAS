angular.module('reverseGeocode', [])
.directive('reverseGeocode', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(attrs.lat, attrs.lng);
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        console.log(results);
                        element.text(results[1].formatted_address);
                    } else {
                        element.text('Location not found');
                    }
                } else {
                    element.text('No location given');
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        },
        replace: true
    }
});