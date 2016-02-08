angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$rootScope', '$firebaseObject', 'AuthService', 'UserService', 'MessageService', 'MapService', '$firebaseArray', 'auth',
    function($scope, $rootScope, $firebaseObject, AuthService, UserService, MessageService, MapService, $firebaseArray, auth) {

        var ref = new Firebase("https://worldmessage.firebaseio.com");
        $scope.AuthObj = auth; //contains user's data from AuthService
        $scope.messageObj = MessageService; //contains functions for messaging
        $scope.displayName = AuthService.displayName; //logged on user's name

        $rootScope.messageRef = ref.child('users');
        $rootScope.messageRef.on('value', function(userSnapshot) {
            $rootScope.messages = userSnapshot.val();
        });
    }
]);
