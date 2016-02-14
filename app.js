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

app.run(function($state,$rootScope) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error("Something went wrong!", error);
        console.error("$stateChangeError: ", toState, error);
    });
    $rootScope.$state = $state;
});
app.config(function($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '',
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
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {selectedUser: $stateParams.selectedUid, uid: $stateParams.uid};
                var message = channelRef.uid + ' Started a Chat!';//I started the chat
                MessageService.create(message, channelRef.uid , channelRef.selectedUser);
                var messages = $firebaseArray(ref.child('users').child(channelRef.uid).child('messages').child(channelRef.selectedUser)).$loaded();
                var resources = {
                    channelRef: channelRef,
                    AuthService: AuthService,
                    messages: messages,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    }).state('chatrequest', {
        url: '/chat/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {selectedUser: $stateParams.selectedUid, uid: $stateParams.uid};
                var messages = $firebaseArray(ref.child('users').child(channelRef.uid).child('messages').child(channelRef.selectedUser)).$loaded();
                var resources = {
                    channelRef: channelRef,
                    AuthService: AuthService,
                    messages: messages,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    });
});
