
;(function() {
    'use strict';

    angular
        .module('app', ['ionic'])
        .run(Run)
        .config(Configuration);


    // Run
    function Run ($ionicPlatform) {
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
    //Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Configuration ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract:true,
                templateUrl: "templates/menu.html",
                controller: 'AppController',
                view: {
                    "mainContent":{
                        templateUrl: "templates/main-content.html",
                        controller: "MainContentController"
                    }
                }
            })
            .state('app.rule', {
                url: "/rule/:titleurl",
                views: {
                    "mainContent":{
                        templateUrl: "templates/main-content.html",
                        controller: "MainContentController"
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.when('/app', '/app/rule/Single_Responsibility');
        $urlRouterProvider.otherwise('/app/rule/');

    }

}());