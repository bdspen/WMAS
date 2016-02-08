var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'AuthService',
    'UserService',
    'MessageService',
    'MapService',
    'LogInCtrl',
    'HomeCtrl'
]);

app.config(function($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    }).state('logIn', {
        url: '/',
        templateUrl: 'views/logIn.html',
        controller: 'LogInCtrl'
    });
});
