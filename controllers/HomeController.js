angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$state', '$rootScope', 'resources', 'MapService', 'fbUrl',
    function($scope, $state, $rootScope, resources, MapService, fbUrl) {

        var ref = new Firebase(fbUrl);
        $scope.auth = resources.AuthService; //contains user's data from AuthService
        $scope.$watch('auth', function() {
            if($scope.auth.coords){
                MapService.refresh($scope.auth.coords.lat, $scope.auth.coords.long);
            }
            if($scope.auth){
            }
        });
    }
]);
