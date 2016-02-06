angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$firebaseObject', 'AuthService', 'UserService', 'MessageService', 'MapService', '$firebaseArray', function($scope, $firebaseObject, AuthService, UserService, MessageService, MapService, $firebaseArray) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    // ------------users data-----------------
    // get users list
    $scope.AuthObj = AuthService; //contains user's data from AuthService
    $scope.messageObj = MessageService;//contains functions for messaging
    $scope.displayName = AuthService.displayName; //logged on user's name
    $scope.users = UserService;
    // -------------messages-----------------
    $scope.addMessage = function(newMessageText){
        MessageService.addMessage(newMessageText, $scope.AuthObj.user.uid, $scope.selectedUser);//newMessageText, uid, userTwoUid
        $scope.getMessages($scope.AuthObj.user.uid, $scope.selectedUser);
    }
    $scope.getMessages = function(){
        MessageService.getMessages($scope.AuthObj.user.uid, $scope.selectedUser);
        $scope.messages = MessageService.messages;
    }

}]);
