angular.module('WM').factory('UserService', ['$firebaseArray', 'FirebaseService', function($firebaseArray, FirebaseService) {
    return function() {
        var usersRef = FirebaseService.child('users');
        return $firebaseArray(usersRef);
    }
}]);
