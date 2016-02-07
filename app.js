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

app.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            console.log('AUTH_REQUIRED')
            $state.go("/");
        }
    });
}]);

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
