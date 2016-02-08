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
        resolve: {
            // A string value resolves to a service
            AuthService: 'AuthService',

            // A function value resolves to the return
            // value of the function
            auth: function(AuthService) {
                return AuthService;
            }
        },
        controller: 'HomeCtrl'
    }).state('logIn', {
        url: '/',
        templateUrl: 'views/logIn.html',
        controller: 'LogInCtrl'
    });
});
