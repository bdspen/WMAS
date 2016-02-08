angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope', function($firebaseArray, $rootScope) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var messageObj = {};

    messageObj.addMessage = function(newMessageText, uid, userTwoUid) {
        var messageRef = ref.child('users').child(uid).child('messages').child(userTwoUid);
        messageRef.push({user: uid, text: newMessageText });
    };

    var messageRef = ref.child('users').child(uid).child('messages').child(userTwoUid);
    messageRef.on('value', function(userSnapshot) {
        $rootScope.messages = userSnapshot.val();
    });

    return messageObj;
}]);
