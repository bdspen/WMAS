angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope) {
        var globalRef = new Firebase("https://worldmessage.firebaseio.com");

        var Message = {
            create: function(message, uid, selectedUserUid) {
                var myMessagesRef = $firebaseArray(globalRef.child('users').child(uid).child('messages').child(selectedUserUid));
                var theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUserUid).child('messages').child(uid));
                myMessagesRef.$add({message:message, uid:uid});
                theirMessagesRef.$add({message:message, uid:uid});

            },
            createPing: function(uid, selectedUserUid) {
                var theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUserUid).child('messages').child(uid));
                theirMessagesRef.$add(uid);
            },
            removePing: function(uid, selectedUserUid) {
                var theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUserUid).child('messages').child(uid));
                globalRef.child('users').child(selectedUserUid).child('messages').child(uid).remove();
            },
            get: function(uid, selectedUserUid) {
                var getRef = globalRef.child('users').child(uid).child('messages').child(selectedUserUid);
                return $firebaseArray(getRef).$loaded();
            },
            delete: function(message) {
                return messages.$remove(message);
            }
        };
        return Message;
    }
]);
