angular.module('WM').factory('FirebaseService', ['fbUrl',
    function(fbUrl) {
        var ref = {};
        var ref = new Firebase(fbUrl);
        return ref;
    }
]);
