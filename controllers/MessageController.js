angular.module("MessageCtrl", []).controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl', '$firebaseArray',
    function($scope, $state, $rootScope, resources, fbUrl, $firebaseArray) {

        var ref = new Firebase(fbUrl);
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        $scope.AuthObj = resources.AuthService; //contains functions for messaging

        $scope.uid = resources.channelRef.uid;
        $scope.selectedUser = resources.channelRef.selectedUser;
        $scope.uid = resources.channelRef.uid;

        var getRef = ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser);
        $scope.messages = $firebaseArray(getRef);

        ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser).on('child_added', function(){
            console.log("VALUE CHAGED!!!");
        });


    }
]);
