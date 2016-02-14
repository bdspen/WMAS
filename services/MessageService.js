angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope) {
        var globalRef = new Firebase("https://worldmessage.firebaseio.com");

        var Message = {
            create: function(message, uid, selectedUser) {
                myMessagesRef = $firebaseArray(globalRef.child('users').child(uid).child('messages').child(selectedUser));
                theirMessagesRef = $firebaseArray(globalRef.child('users').child(selectedUser).child('messages').child(uid));
                myMessagesRef.$add(message);
                theirMessagesRef.$add(message);

            },
            get: function(uid, selectedUser) {
                return $firebaseArray(globalRef.child('users').child(uid).child('messages').child(selectedUser));
            },
            delete: function(message) {
                return messages.$remove(message);
            }
        };
        return Message;
    }
]);
