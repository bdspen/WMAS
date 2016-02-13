var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'HomeCtrl',
    'MessageCtrl',
    'AuthService',
    'UserService',
    'MessageService',
    'MapService',
]);

app.constant('fbUrl', "https://worldmessage.firebaseio.com");

app.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error("Something went wrong!", error);
        console.error("$stateChangeError: ", toState, error);
    });
});
app.config(function($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            resources: function(AuthService, UserService, MessageService, $rootScope) {
                AuthService.anon();
                UserService().then(function(data) {
                    $rootScope.users = data;
                });
                var resources = {
                    AuthService: AuthService,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    }).state('chat', {
        url: '/chat/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams) {
                var channelRef = $stateParams.selectedUid + '_' + $stateParams.uid;
                // var messageRef = ref.child('messages').child($stateParams.selectedUser).child($stateParams.uid);
                var resources = {
                    channelRef: channelRef,
                    AuthService: AuthService,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    });
});
