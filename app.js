var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'angularReverseGeocode',
    'ngAnimate',
    'HomeCtrl',
    'MessageCtrl',
    'AuthService',
    'UserService',
    'MessageService',
    'MapService',
]);

app.constant('fbUrl', "https://worldmessage.firebaseio.com");

app.run(function($state, $rootScope) { //allows for statechange errors to be shown in console
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error("Something went wrong!", error);
        console.error("$stateChangeError: ", toState, error);
    });
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClasses = toState.containerClasses;
    });
    $state.go('home'); //go home on start
    $rootScope.$state = $state;
});

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        containerClasses: ["col-md-8", "col-md-4"],
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
        containerClasses: ["col-md-5", "col-md-7"],
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {
                    selectedUserId: $stateParams.selectedUid,
                    uid: $stateParams.uid
                };
                MessageService.createPing(channelRef.uid, channelRef.selectedUserId); //send ping to trigger.once()function in homectrl
                MessageService.get(channelRef.uid, channelRef.selectedUserId).then(function(data) {
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
    }).state('chatrequest', {
        url: '/chatrequest/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        containerClasses: ["col-md-5", "col-md-7"],
        resolve: {
            resources: function(AuthService, MessageService, $rootScope, $stateParams, $firebaseArray, fbUrl) {
                var ref = new Firebase(fbUrl);
                var channelRef = {
                    selectedUserId: $stateParams.selectedUid,
                    uid: $stateParams.uid
                };
                MessageService.get(channelRef.uid, channelRef.selectedUserId).then(function(data) {
                    $rootScope.messages = data;
                });

                var resources = {
                    channelRef: channelRef,
                    AuthService: AuthService,
                    MessageService: MessageService
                }
                return resources;
            },
        }
    });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode({
        enabled:true,
        requireBase: false
    });
});
