angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$state', '$rootScope', 'resources', 'MapService', 'fbUrl', '$timeout',
    function($scope, $state, $rootScope, resources, MapService, fbUrl, $timeout) {

        var ref = new Firebase(fbUrl);
        var anyNewItems = false;
        $scope.newRequests = [];
        $scope.newUsers = [];
        $scope.auth = resources.AuthService; //contains user's data from AuthService
        $scope.clickMap = function(userId){
            google.maps.event.trigger(MapService.markers[userId], 'click');
        }
        $scope.$watch('auth.coords', function() {
            if($scope.auth.coords){
                ref.child('users').on('child_added', function(val) {
                    if (!anyNewItems)return;
                        var newUser = val.val();
                        $scope.newUsers.push(newUser);
                        // MapService.createMarker(newUser);
                });
                ref.child('users').once('value', function(messages) {
                    anyNewItems = true;
                });
                MapService.refresh($scope.auth.coords.lat, $scope.auth.coords.long);
            }
        });
        $scope.refresh = function(){
            MapService.refresh($scope.auth.coords.lat, $scope.auth.coords.long);
            $scope.newUsers = [];
        }

        $scope.$watch('auth.authData', function() {
            if($scope.auth.authData){
                //watch users/messages for new child, if there is a new child, go to the chat state with the new child id as selectedUser
                var uid = $scope.auth.authData.uid;
                ref.child('users').child(uid).child('messages').on('child_added', function(data){
                    if($state.is('home')){
                        $scope.requester = data.val();
                        var properties = Object.getOwnPropertyNames($scope.requester);
                        $scope.requester = $scope.requester[properties[0]];
                        for(var i = 0; i < $rootScope.users.length; i++){
                            if($scope.requester == $rootScope.users[i].uid){
                                $scope.newRequests.push($rootScope.users[i]);
                            }
                        }
                    }
                });
            }
        });
        $scope.requestAccept = function(user){
            var uid = $scope.auth.authData.uid
            $rootScope.selectedUser = user;
            $state.go('chatrequest', { selectedUid: $scope.requester, uid: uid });
        }
    }
]);
