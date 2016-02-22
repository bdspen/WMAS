angular.module("MessageCtrl", []).controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl', '$firebaseArray',
    function($scope, $state, $rootScope, resources, fbUrl, $firebaseArray) {

        var ref = new Firebase(fbUrl);

        $scope.uid = resources.channelRef.uid;
        $scope.selectedUserId = resources.channelRef.selectedUserId;
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        $scope.AuthObj = resources.AuthService; //contains functions for messaging

        var getRef = ref.child('users').child($scope.uid).child('messages').child($scope.selectedUserId);
        $scope.messages = $firebaseArray(getRef);

        ref.child('users').child($scope.uid).child('messages').child($scope.selectedUserId).on('child_added', function(){
            // console.log("New Message");
        });
        ref.child('users').child($rootScope.selectedUser).on("value",function(){
            $state.go("home");
        });


    }
]);
