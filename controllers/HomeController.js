angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$rootScope', '$firebaseObject', 'AuthService', 'UserService', 'MessageService', 'MapService', '$firebaseArray', '$timeout',
    function($scope, $rootScope, $firebaseObject, AuthService, UserService, MessageService, MapService, $firebaseArray, $timeout) {

        var ref = new Firebase("https://worldmessage.firebaseio.com");
        $scope.AuthObj = AuthService; //contains user's data from AuthService
        $scope.messageObj = MessageService; //contains functions for messaging
        $scope.displayName = AuthService.displayName; //logged on user's name

        // angular.element(document).ready(function() {
        //     $timeout( function(){
        //         $rootScope.disconnectRef = new Firebase('https://worldmessage.firebaseio.com').child($rootScope.user.uid);
        //         $rootScope.disconnectedRef.onDisconnect().remove(); // removes user when disconnected
        //     }, 5000)
        // });

    }
]);
