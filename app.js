var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'HomeCtrl',
    'AuthService',
    'UserService',
    'MessageService',
    'MapService',
]);

app.constant('fbUrl', "https://worldmessage.firebaseio.com");


app.config(function($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            // A function value resolves to the return value of the function
            resources: function(AuthService, UserService, MessageService, $rootScope) {
                AuthService.anon();
                UserService().then(function(data){
                    $rootScope.users = data;
                });
                var resources = {AuthService: AuthService, MessageService: MessageService}
                return resources;
            },
        }
    });
});
