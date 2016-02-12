angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope', function($firebaseArray, $rootScope) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    var messageObj = {};

    messageObj.addMessage = function(newMessageText, uid, userTwoUid) {
        $rootScope.theirMessageRef = ref.child('users').child(userTwoUid).child('messages').child(uid);
        $rootScope.myMessageRef.push({user: uid, text: newMessageText });
        $rootScope.theirMessageRef.push({user: uid, text: newMessageText });
        messageObj.getMessages(uid, userTwoUid);
    };

    messageObj.getMessages = function(uid, userTwoUid) {
        $rootScope.myMessageRef = ref.child('users').child(uid).child('messages').child(userTwoUid);
        $rootScope.myMessageRef.on('value', function(userSnapshot) {
            $rootScope.messages = userSnapshot.val();
        });
    }
    return messageObj;
}]);
