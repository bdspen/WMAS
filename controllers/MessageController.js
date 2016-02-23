angular.module("MessageCtrl", []).controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl', '$firebaseArray', '$firebaseObject',
    function($scope, $state, $rootScope, resources, fbUrl, $firebaseArray, $firebaseObject) {

        var ref = new Firebase(fbUrl);
        $scope.uid = resources.channelRef.uid;
        $rootScope.selectedUser = resources.channelRef.selectedUser;
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        var getRef = ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser.uid);
        $scope.messages = $firebaseArray(getRef);

        ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser.uid).on('child_added', function(){
            // console.log("New Message");
        });
        // ref.child('users').child($rootScope.selectedUser.uid).on("value",function(){
        //     $state.go("home");
        // });

    }
]);
