angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$rootScope', '$firebaseObject', 'AuthService', 'UserService', 'MessageService', 'MapService', '$firebaseArray', '$timeout',
    function($scope, $rootScope, $firebaseObject, AuthService, UserService, MessageService, MapService, $firebaseArray, $timeout) {

        var ref = new Firebase("https://worldmessage.firebaseio.com");
        $scope.AuthObj = AuthService; //contains user's data from AuthService
        $scope.messageObj = MessageService; //contains functions for messaging
        $scope.displayName = AuthService.displayName; //logged on user's name

        var messageRef = ref.child('users').child(uid).child('messages').child(userTwoUid);
        messageRef.on('value', function(userSnapshot) {
            $rootScope.messages = userSnapshot.val();
        });

    }
]);
