angular.module('WM').factory('UserService', ['$firebaseArray', 'FirebaseService', function($firebaseArray, FirebaseService) {
    return function() {
        var ref = FirebaseService;
        return $firebaseArray(ref);
    }
}]);
