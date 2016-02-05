angular.module('AuthService', []).factory('AuthService', ['$firebaseAuth', function($firebaseAuth) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var AuthObj = {};
    var auth = $firebaseAuth(ref);
    AuthObj.github = function() {
        auth.$authWithOAuthPopup("github").then(function(authData) {
            console.log("Logged in as:", authData.uid);
            AuthObj.displayName = authData[authData.provider].displayName;
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
            }
        }, {
            remember: "sessionOnly"
        });
    }
    return AuthObj;
}]);