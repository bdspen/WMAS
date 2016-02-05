var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'AuthService',
    'HomeCtrl'
]);

app.config(function($stateProvider, $locationProvider){
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
});
