angular.module('WM').controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl', '$firebaseArray', '$firebaseObject', 'FirebaseService',
    function($scope, $state, $rootScope, resources, fbUrl, $firebaseArray, $firebaseObject, FirebaseService) {

        var ref = FirebaseService;
        $scope.uid = resources.uid;//your uid resolved from stateParams
        $rootScope.selectedUser = resources.selectedUser;//bind the selected user from resolve to rootscope.
        //messaging related code
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        var getRef = ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser.uid);
        $scope.messages = $firebaseArray(getRef);

        // ref.child('users').child($scope.uid).child('messages').child($scope.selectedUser.uid).on('child_added', function(){
        // });
        // ref.child('users').child($rootScope.selectedUser.uid).on("value",function(){
        //     $state.go("home");
        // });
    }
]);
