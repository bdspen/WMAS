var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'AuthService',
    'MessageService',
    'MapService',
    'HomeCtrl'
]);

app.config(function($stateProvider, $locationProvider){
    $stateProvider.state('home', {
        url: '',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
});
