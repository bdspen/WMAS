angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$state', '$rootScope', 'resources', 'MapService', 'fbUrl',
    function($scope, $state, $rootScope, resources, MapService, fbUrl) {

        var ref = new Firebase(fbUrl);
        $scope.auth = resources.AuthService; //contains user's data from AuthService
        $scope.clickMap = function(userId){
            google.maps.event.trigger($scope.MapObj.markers[userId], 'click');
        }
        $scope.$watch('auth.coords', function() {
            if($scope.auth.coords){
                $scope.MapObj = MapService;
                $scope.MapObj.refresh($scope.auth.coords.lat, $scope.auth.coords.long);
            }
        });
        $scope.$watch('auth.authData', function() {
            if($scope.auth.authData){
                //watch users/messages for new child, if there is a new child, go to the chat state with the new child id as selectedUser
                var uid = $scope.auth.authData.uid
                ref.child('users').child(uid).child('messages').once('child_added', function(data){
                    if($state.is('home')){
                        $scope.requester = data.val();
                        var properties = Object.getOwnPropertyNames($scope.requester);
                        $scope.requester = $scope.requester[properties[0]];
                        $state.go('chatrequest', { selectedUid: $scope.requester, uid: uid });
                    }
                });
            }
        });
    }
]);
