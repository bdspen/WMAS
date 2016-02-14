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
    });
    $stateProvider.state('chat', {
        url: '/chat/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {selectedUser: $stateParams.selectedUid, uid: $stateParams.uid};
                MessageService.createPing(channelRef.uid, channelRef.selectedUser);//send ping to trigger.once()function in homectrl
                MessageService.get(channelRef.uid, channelRef.selectedUser).then(function(data){
                    $rootScope.messages = data;
                });
                var resources = {
                    channelRef: channelRef,
                    // messages: messages,
                    AuthService: AuthService,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    });
    $stateProvider.state('chatrequest', {
        url: '/chatrequest/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {selectedUser: $stateParams.selectedUid, uid: $stateParams.uid};
                // var messages = $firebaseArray(ref.child('users').child(channelRef.uid).child('messages').child(channelRef.selectedUser)).$loaded(function(data){
                //     $rootScope.messages = data;
                // });
                MessageService.get(channelRef.uid, channelRef.selectedUser).then(function(data){
                    $rootScope.messages = data;
                });

                var resources = {
                    channelRef: channelRef,
                    // messages: messages,
                    AuthService: AuthService,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    });
});
