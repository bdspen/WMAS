angular.module('UserService', []).factory('UserService', ['$q', '$firebaseArray', function($q, $firebaseArray) {
    var userObj = {};
    var ref = new Firebase("https://worldmessage.firebaseio.com");

    userObj.getUsers = function(){
        return ref.child('users').once('value', function(userSnapshot) {//get all user
            if (typeof userSnapshot === 'object') {
                var users = userSnapshot.val();
                return users;
            }else{
                return $q.reject(userSnapshot.val());
            }
        });
    }
    return userObj;
}]);
