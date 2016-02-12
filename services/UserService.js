angular.module('UserService', []).factory('UserService', ['$firebaseArray', function($firebaseArray) {
    return function() {
        var ref = new Firebase("https://worldmessage.firebaseio.com/users");
        return $firebaseArray(ref).$loaded();
    }
}]);
