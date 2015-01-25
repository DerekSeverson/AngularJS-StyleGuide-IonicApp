
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
    //Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

    function Configuration ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                templateUrl: "templates/content.html",
                controller: 'AppController'
            });
            /*
            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })
            .state('app.browse', {
                url: "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })
            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            });
            */
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');
    }

}());
;(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['_', 'styleGuideDataFactory'];

    function AppController(_, styleGuide) {
        var vm = this;

        vm.guidelines = getGuidelines();



        // Private Methods

        function getStyleGuideContent(){
            return styleGuide.getStyleGuideContent();
        }

        function processStyleGuide(styleGuideContent) {
            return styleGuide.processStyleGuide(styleGuideContent);
        }

        function getGuidelines(){
            var content = getStyleGuideContent();
            var styleguides = processStyleGuide(content);
            // todo: Add Markdown processing here.
            return _.values(styleguides);
        }

    }
}());
;(function(){
    angular
        .module('app')
        .factory('_', lodashFactory);

    lodashFactory.$inject = ['$window'];

    function lodashFactory($window){

        // save private lodash for factory
        var lodash = $window._;

        // delete from global namespace
        delete($window._);

        // Customize my lodash

        lodash.mixin({
            existy: existy,
            truthy: truthy,
            falsey: falsey
        });

        function existy(obj){
            return obj != null;
        }

        function truthy(obj){
            return (obj !== false) && existy(obj);
        }

        function falsey(obj){
            return !truthy(obj);
        }

        // share lodash as a factory/service
        return lodash;
    }
}());
;(function(){
    'use strict';

    angular
        .module('app')
        .factory('styleGuideDataFactory', styleGuideDataFactory);

    styleGuideDataFactory.$inject = ['_', '$http', '$log'];

    function styleGuideDataFactory(_, $http, $log) {

        return {
            getStyleGuideContent: getStyleGuideContent,
            processStyleGuide: processStyleGuide
        };

        // Service Methods

        function getStyleGuideContent(){
            return $http.get('./data/styleguide.txt')
                .then(getStyleGuideComplete)
                .catch(getStyleGuideFailed);

            function getStyleGuideComplete(response) {
                return response.data.results;
            }

            function getStyleGuideFailed(error) {
                $log.error('XHR Failed for getStyleGuide.' + error.data);
            }
        }

        function processStyleGuide(styleGuideContent) {
            var guidelineIDs = getStyleGuidelinesIDs();
            var processedStyleGuide = {};

            _.each(guidelines, function(styleguide){
                var regexPattern = createRegExForStyleGuideSection(styleguide);
                var guideRegex = new RegExp(regexPattern);
                var regexMatch = guideRegex.exec(styleGuideContent);
                var guideContent = regexMatch[1];

                processedStyleGuide[styleguide] = guideContent;
            });

            return processedStyleGuide;
        }


        function getStyleGuidelinesIDs(){
            return [
                "SingleResponsibility",
                "IIFE",
                "Modules",
                "Controllers",
                "Services",
                "Factories",
                "DataServices",
                "Directives"
            ];
        }

        function createRegExForStyleGuideSection(sectionID){
            var regStrBuilder = [
                '{{{',
                sectionID,
                '}}}',
                '([\\s\\S]*)',
                '{{{',
                sectionID,
                '}}}'
            ];
            var regStr = regStrBuilder.join('');
            return regStr;
        }

    }
}());


;(function(){
    'use strict';

    angular
        .module('app')
        .controller('StyleRule', StyleRule);

    StyleRule.$inject = [];

    function StyleRule() {
        /*jshint validthis: true */
        var vm = this;

        // Public Interface


        // Implementation of Members

    }
}());