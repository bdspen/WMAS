angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope) {
        var ref = new Firebase("https://worldmessage.firebaseio.com");
        var selectedUser = 'Everyone';
        var messages = $firebaseArray(ref.child('messages').child(selectedUser));

        var Message = {
            all: messages,
            create: function(message) {
                return messages.$add(message);
            },
            get: function(messageId) {
                return $firebase(ref.child('messages').child(messageId)).$asObject();
            },
            delete: function(message) {
                return messages.$remove(message);
            }
        };
        return Message;
    }
]);
