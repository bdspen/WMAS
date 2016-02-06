angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', function($firebaseArray) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var messageObj = {};

    messageObj.addMessage = function(newMessageText, uid, userTwoUid) {
        var messageRef = ref.child(uid).child('messages').child(userTwoUid);
        messageRef.set({text: newMessageText });
    };

    // messageObj.getMessages = function() {
    //   var selectedUserId = $rootScope.profile.selectedUser.$id;
    //   fbutil.ref('users').child($rootScope.profile.$id).child('messages').child(selectedUserId).once('value', (function(dataSnapshot) {
    //       if(dataSnapshot.val() === 'undefined'){
    //           $rootScope.messages = [];
    //       }
    //       var messages = dataSnapshot.val();
    //       return messages;
    //   }));
    // }
    return messageObj;
}]);
