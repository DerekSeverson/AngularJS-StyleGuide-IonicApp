
;(function() {
    'use strict';

    angular
        .module('app', [/*'ionic', 'AppController'*/])
        .run(Run)
        .config(Configuration);


    // Run
    Run.$inject = ['ionic', '_'];

    function Run ($ionicPlatform, _ ) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

    // Configuration
    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                templateUrl: "templates/content.html",
                controller: 'AppController'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');
    }

}());