angular.module('AuthService', []).factory('AuthService', ['$firebaseAuth', 'geolocation', 'UserService', '$rootScope', '$state', 'fbUrl', function($firebaseAuth, geolocation, UserService, $rootScope, $state, fbUrl) {
    var ref = new Firebase(fbUrl);
    var AuthObj = {};
    var auth = $firebaseAuth(ref);

    AuthObj.connect = function(authData){
        var userRef = ref.child('users').child(authData.uid);
        var connectedRef = ref.child('.info').child('connected');
        connectedRef.on('value', function(snap) {
            if (snap.val() === true) {
                console.log('were connected');
                userRef.onDisconnect().remove();
            } else {
                console.log('were Disconnected');
            }
        });
    }

    AuthObj.anon = function() {
        ref.authAnonymously(function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
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
            AuthObj.coords = {lat:data.coords.latitude.toFixed(3), long:data.coords.longitude.toFixed(3)}; // Set the latitude and longitude equal to the HTML5 coordinates
            userRef.set({uid: uid, lat: AuthObj.coords.lat , lng: AuthObj.coords.long });
        });
        AuthObj.authData = authData;
    }

    return AuthObj;
}]);
