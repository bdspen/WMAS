angular.module('UserService', []).factory('UserService', ['$q', '$firebaseArray', function($q, $firebaseArray) {
    var userObj = {};
    var ref = new Firebase("https://worldmessage.firebaseio.com");

    userObj.getUsers = function(){
        var defer = $q.defer();
        ref.child('users').once('value', function(userSnapshot) {//get all user
            var users = $q.when(userSnapshot.val());
            defer.resolve(users);
        });
        return defer.promise;
    }
    return userObj;
}]);
