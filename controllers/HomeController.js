angular.module("HomeCtrl", []).controller('HomeCtrl', ['$scope', '$firebaseObject', 'AuthService', '$firebaseArray', function($scope, $firebaseObject, AuthService, $firebaseArray) {
var ref = new Firebase("https://worldmessage.firebaseio.com");

  $scope.displayName = AuthService.displayName;
  $scope.AuthObj = AuthService;

  // download the data into a local object
  $scope.data = $firebaseObject(ref);

  var syncObject = $firebaseObject(ref);
  syncObject.$bindTo($scope, "data");

  $scope.messages = $firebaseArray(ref);

  $scope.addMessage = function() {
      $scope.messages.$add({
          text: $scope.newMessageText
      });
  };

}]);
