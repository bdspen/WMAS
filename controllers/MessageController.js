angular.module("MessageCtrl", []).controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl',
    function($scope, $state, $rootScope, resources, fbUrl) {

        var ref = new Firebase(fbUrl);
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        $scope.AuthObj = resources.AuthService; //contains functions for messaging

        $scope.uid = resources.channelRef.uid;
        $scope.selectedUser = resources.channelRef.selectedUser;
        $scope.uid = resources.channelRef.uid;
        $scope.messages = $scope.messageObj.get($scope.uid, $scope.selectedUser);
    }
]);
