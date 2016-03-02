'use strict';
var app = angular.module("WM", [
    'ui.router',
    'firebase',
    'geolocation',
    'ReverseGeocodeService',
    'ngAnimate',
    'HomeCtrl',
    'MessageCtrl',
    'AuthService',
    'UserService',
    'MessageService',
    'MapService',
]);

app.constant('fbUrl', "https://worldmessage.firebaseio.com");

app.run(['$state', '$rootScope', function($state, $rootScope) { //allows for statechange errors to be shown in console
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.error("Something went wrong!", error);
        console.error("$stateChangeError: ", toState, error);
    });
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClasses = toState.containerClasses;
    });
    $state.go('home'); //go home on start
    $rootScope.$state = $state;
}]);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'views/home.html',
        containerClasses: ["col-md-8", "col-md-4"],
        resolve: {
            resources: function(AuthService, UserService, MessageService, $rootScope) {
                if(!AuthService.authData){
                    AuthService.anon();
                }
                $rootScope.users = UserService();
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
            resources: function(MessageService, $rootScope, $stateParams, $firebaseObject, fbUrl) {
                var selectedUserRef = new Firebase(fbUrl).child('users').child($stateParams.selectedUid);
                var resources = {
                    uid: $stateParams.uid,
                    selectedUser: {},
                    MessageService: MessageService
                }
                $firebaseObject(selectedUserRef).$loaded().then(function(data){
                    resources.selectedUser = data;
                });

                MessageService.createPing($stateParams.uid, $stateParams.selectedUid); //send ping to trigger.once()function in homectrl
                MessageService.get($stateParams.uid, $stateParams.selectedUid).then(function(data) {
                    $rootScope.messages = data;
                });


                return resources;
            },
        }
    }).state('chatrequest', {
        url: '/chatrequest/:selectedUid/:uid',
        controller: 'MessageCtrl',
        templateUrl: 'views/home.html',
        containerClasses: ["col-md-5", "col-md-7"],
        resolve: {
            resources: function(MessageService, $rootScope, $stateParams, $firebaseObject, fbUrl) {

                var selectedUserRef = new Firebase(fbUrl).child('users').child($stateParams.selectedUid);
                var resources = {
                    uid: $stateParams.uid,
                    selectedUser: {},
                    MessageService: MessageService
                }
                $firebaseObject(selectedUserRef).$loaded().then(function(data){
                    resources.selectedUser = data;
                });
                MessageService.get($stateParams.uid, $stateParams.selectedUid).then(function(data) {
                    $rootScope.messages = data;
                });

                return resources;
            },
        }
    });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode({
        enabled:true,
        requireBase: false
    });
}]);
