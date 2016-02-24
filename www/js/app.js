// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('serviceDeskApp', ['ionic', 'utils'])

.run(function($ionicPlatform, $rootScope, $state, UserService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
       if (toState.data && toState.data.authenticate && !UserService.isAuthenticated){
           $state.transitionTo('login');
           event.preventDefault();
       } 
    });
    
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: 'templates/tabs.html',
        data: {
            authenticate: true
        }
    })
    .state('tab.active', {
        url: "/active",
        views: {
            'active-tab': {
                templateUrl: "templates/activeTickets.html",
                controller: "ActiveTicketsController"
            }
        }
    })
    .state('tab.closed', {
        url: "/closed",
        views: {
            'closed-tab': {
                templateUrl: "templates/closedTickets.html",
                controller: "ClosedTicketsController"
            }
        }
    })
    .state('tab.about', {
        url: "/about",
        views: {
            'about-tab': {
                templateUrl: "templates/about.html",
                controller: "AboutController"
            }
        }
    })
    .state('tab.settings', {
        url: "/settings",
        views: {
            'settings-tab': {
                templateUrl: "templates/settings.html",
                controller: "SettingsController"
            }
        }
    })
    .state('ticket', {
        url: '/ticket',
        abstract: true,
        template: '<ui-view/>',
        data: {
            authenticate: true
        }
    })
    .state('ticket.new', {
        url: '/new',
        templateUrl: "templates/ticketNew.html"
    })
    .state('ticket.details', {
        url: '/details',
        templateUrl: "templates/ticketDetails.html"
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: "LoginController"
    });
    
    $urlRouterProvider.otherwise("/tab/active");
})
