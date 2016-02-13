angular.module("MessageCtrl", []).controller('MessageCtrl', ['$scope', '$state', '$rootScope', 'resources', 'fbUrl',
    function($scope, $state, $rootScope, resources, fbUrl) {

        var ref = new Firebase(fbUrl);
        $scope.channelRef = resources.channelRef;
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        $scope.messages = $scope.messageObj.get($scope.channelRef);
    }
]);
