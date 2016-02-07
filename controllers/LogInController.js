angular.module("LogInCtrl", []).controller('LogInCtrl', ['$scope', 'AuthService', 'UserService', function($scope, AuthService, UserService) {
    var ref = new Firebase("https://worldmessage.firebaseio.com");
    $scope.AuthObj = AuthService; //contains user's data from AuthService
}]);
