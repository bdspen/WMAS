angular.module('MessageService', []).factory('MessageService', ['$firebaseArray', '$rootScope',
    function($firebaseArray, $rootScope) {
        var globalRef = new Firebase("https://worldmessage.firebaseio.com");

        var Message = {
            create: function(message, ref) {
                $rootScope.messages = $firebaseArray(globalRef.child('messages').child(ref));
                return $rootScope.messages.$add(message);
            },
            get: function(channelRef) {
                return $firebaseArray(globalRef.child('messages').child(channelRef));
            },
            delete: function(message) {
                return messages.$remove(message);
            }
        };
        return Message;
    }
]);
