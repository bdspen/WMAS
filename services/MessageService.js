angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope) {
        var globalRef = new Firebase("https://worldmessage.firebaseio.com");

        var Message = {
            create: function(message, uid, selectedUser) {
                myMessagesRef = $firebaseArray(globalRef.child('users').child(uid).child('messages').child(selectedUser));
                theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUser).child('messages').child(uid));
                myMessagesRef.$add({message:message, uid:uid});
                theirMessagesRef.$add({message:message, uid:uid});

            },
            createPing: function(uid, selectedUser) {
                theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUser).child('messages').child(uid));
                theirMessagesRef.$add(uid);
            },
            get: function(uid, selectedUser) {
                var getRef = globalRef.child('users').child(uid).child('messages').child(selectedUser);
                return $firebaseArray(getRef).$loaded();
            },
            delete: function(message) {
                return messages.$remove(message);
            }
        };
        return Message;
    }
]);
