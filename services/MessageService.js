angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', function($firebaseArray) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var messageObj = {};

    messageObj.addMessage = function(newMessageText, uid, userTwoUid) {
        var messageRef = ref.child(uid).child('messages').child(userTwoUid);
        messageRef.push({user: uid, text: newMessageText });
    };

    messageObj.getMessages = function(uid, userTwoUid) {
        var messageRef = ref.child(uid).child('messages').child(userTwoUid);
        messageRef.on('value', function(userSnapshot) {
            messageObj.messages = userSnapshot.val();
        });
    }
    return messageObj;
}]);
