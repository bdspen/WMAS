angular.module('WM').factory('AuthService', ['$firebaseAuth', 'geolocation', 'UserService', '$rootScope', '$state', 'fbUrl', 'ReverseGeocodeService', 'FirebaseService', function($firebaseAuth, geolocation, UserService, $rootScope, $state, fbUrl, ReverseGeocodeService, FirebaseService) {
    var ref = FirebaseService;
    var AuthObj = {};
    var auth = $firebaseAuth(ref);

    AuthObj.connect = function(authData){
        var userRef = ref.child('users').child(authData.uid);
        var connectedRef = ref.child('.info').child('connected');
        connectedRef.on('value', function(snap) {
            if (snap.val() === true) {
                //disable next line to allow users to persist.
                userRef.onDisconnect().remove();
            }
        });
    }

    AuthObj.anon = function() {
        ref.authAnonymously(function(error, authData) {
            if (error) {
                alert("Login Failed!, please refresh");
            } else {
                // console.log("Authenticated successfully with payload:", authData);
                AuthObj.saveUser(authData);
                AuthObj.connect(authData);
            }
        }, {
            remember: "sessionOnly"
        });
    }
    AuthObj.saveUser = function(authData){
        var userRef = ref.child('users').child(authData.uid);
        var uid = authData.uid;
        $rootScope.user = authData;
        geolocation.getLocation().then(function(data){
            AuthObj.coords = {lat:parseFloat(data.coords.latitude.toFixed(3)), long:parseFloat(data.coords.longitude.toFixed(3))}; // Set the latitude and longitude equal to the HTML5 coordinates
            $rootScope.user.coords = AuthObj.coords;
            ReverseGeocodeService.numberOfLocations(AuthObj.coords.lat, AuthObj.coords.long).then(function(address){
                $rootScope.user.address = address;
                userRef.set({uid: uid, lat: AuthObj.coords.lat , lng: AuthObj.coords.long, address: address });
            });
        });
        AuthObj.authData = authData;
    }

    return AuthObj;
}]);
