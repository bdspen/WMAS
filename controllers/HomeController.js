angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$rootScope', 'resources', 'MapService', 'fbUrl',
    function($scope, $rootScope, resources, MapService, fbUrl) {

        var ref = new Firebase(fbUrl);
        $scope.auth = resources.AuthService; //contains user's data from AuthService
        $scope.messageObj = resources.MessageService; //contains functions for messaging
        $scope.$watch('auth.coords', function() {
            if($scope.auth.coords){
                MapService.refresh($scope.auth.coords.lat, $scope.auth.coords.long);        
            }
        });
    }
]);
