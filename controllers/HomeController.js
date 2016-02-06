angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$firebaseObject', 'AuthService', 'MessageService', '$firebaseArray', function($scope, $firebaseObject, AuthService, MessageService, $firebaseArray) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    // ------------users data-----------------
    // get users list
    $scope.AuthObj = AuthService; //contains user's data from AuthService
    $scope.messageObj = MessageService;//contains functions for messaging
    ref.child('users').on('value', function(userSnapshot) {
        $scope.users = userSnapshot.val();
    });
    // -------------messages-----------------
    $scope.addMessage = function(newMessageText){
        MessageService.addMessage(newMessageText, $scope.AuthObj.user.uid, $scope.selectedUser);//newMessageText, uid, userTwoUid
        $scope.getMessages($scope.AuthObj.user.uid, $scope.selectedUser);
    }
    $scope.getMessages = function(){
        MessageService.getMessages($scope.AuthObj.user.uid, $scope.selectedUser);
        $scope.messages = MessageService.messages;
    }
    $scope.displayName = AuthService.displayName; //logged on user's name

    var myMessages = $firebaseObject(ref.child("users"));
    myMessages.$bindTo($scope, "data");


    // var theirMessagesRef = fbutil.ref('users').child(selectedUserId).child('messages').child($rootScope.profile.$id);
    // $scope.myMessages = $firebaseArray(myMessagesRef);
    // $scope.theirMessages = $firebaseArray(theirMessagesRef);

}]);
