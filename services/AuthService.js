angular.module('AuthService', []).factory('AuthService', ['$firebaseAuth', 'geolocation', 'UserService', '$rootScope', '$state', function($firebaseAuth, geolocation, UserService, $rootScope, $state) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var AuthObj = {};
    var auth = $firebaseAuth(ref);

    $rootScope.users = UserService.getUsers();
    console.log($rootScope.users);


    geolocation.getLocation().then(function(data){
        AuthObj.coords = {lat:data.coords.latitude, long:data.coords.longitude}; // Set the latitude and longitude equal to the HTML5 coordinates
    });

    AuthObj.logOut = function(){
        ref.unauth();
        console.log("Logged Out")
    }
    $rootScope.logOut = AuthObj.logOut;

    AuthObj.github = function() {
        auth.$authWithOAuthPopup("github").then(function(authData) {
            console.log("Logged in as:", authData.uid);
            AuthObj.displayName = authData[authData.provider].displayName;
            AuthObj.saveUser(authData.auth.uid, AuthObj.displayName, authData);
        }).catch(function(error) {
            console.log("Authentication failed:", error);
        }, {
            remember: "sessionOnly"
        });
    }
    AuthObj.anon = function() {
        ref.authAnonymously(function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                AuthObj.saveUser(authData.auth.uid, 'anon', authData);
            }
        }, {
            remember: "sessionOnly"
        });
    }
    AuthObj.saveUser = function(uid, name, authData){
        var userRef = ref.child('users').child(uid);
        userRef.set({uid: uid, name: name, lat: AuthObj.coords.lat , lng: AuthObj.coords.long });
        $rootScope.user = authData;
        $state.go('home');
    }

    return AuthObj;
}]);
