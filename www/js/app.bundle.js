
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
                templateUrl: "templates/content.html",
                controller: 'AppController'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');
    }

}());
;(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '_', 'marked', 'styleGuideDataFactory'];

    function AppController($scope, _, marked, styleGuide) {

        //vm.guidelines = getGuidelines();
        getGuidelines();

        /*
        $scope
            .sections[
                {
                    title : 'title'
                    subsections:[
                        subtitle: 'subtitle',
                        content: 'content'
                    }
                },
                { ... },
                { ... }
            ];

         */


        // Private Methods

        function getStyleGuideContent(){
            return styleGuide.getStyleGuideContent();
        }

        function processStyleGuide(styleGuideContent) {
            $scope.sections = [];
            _.each(styleGuideContent, function(val, key){
                /*  key="Modules",
                    value={
                        "Avoid Naming Collisions":{
                            content: "str",
                            rule: "str",
                            code: "str",
                            why: "str"
                        },
                        "Definitions": {
                            content: "str",
                            rule: "str"
                            ...
                        }
                    }
                 */
                var section = {title: key, subsections:[]};
                _.each(val, function(subrulecontent, subsectiontitle){
                    section.subsections.push({
                        subtitle: subsectiontitle,
                        content: marked(subrulecontent.content) // markdown processing of content.
                    });
                });
                $scope.sections.push(section);
            });
        }

        function getGuidelines(){
            var contentPromise = getStyleGuideContent();

            contentPromise.success(function(data){
                processStyleGuide(data);
            });
        }

    }
}());
/*
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
            return obj != null;//jshint ignore:line
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
*/
;(function(){
    'use strict';

    angular
        .module('app')
        .factory('styleGuideDataFactory', styleGuideDataFactory);

    styleGuideDataFactory.$inject = ['_', '$http', '$log', 'marked'];

    function styleGuideDataFactory(_, $http, $log, marked) {

        return {
            getStyleGuideContent: getStyleGuideContent//,
            //processStyleGuide: processStyleGuide
        };

        // Service Methods

        function getStyleGuideContent(){
            return $http.get('data/styleguide.json')
                .success(getStyleGuideComplete)
                .error(getStyleGuideFailed);

            function getStyleGuideComplete(data) {
                console.log(data);
            }

            function getStyleGuideFailed(error) {
                console.log(error);
                //$log.error('XHR Failed for getStyleGuide.' + error.data);
            }
        }

        /*
        function processStyleGuide(styleGuideContent) {
            var guidelineIDs = getStyleGuidelinesIDs();
            var processedStyleGuide = {};

            _.each(guidelineIDs, function(styleguide){
                var regexPattern = createRegExForStyleGuideSection(styleguide);
                var guideRegex = new RegExp(regexPattern);
                var regexMatch = guideRegex.exec(styleGuideContent);
                if(_.isArray(regexMatch) && regexMatch.length > 1) {
                    var guideContent = regexMatch[1];
                    var markedGuide = marked(guideContent, function(err, content){
                        if(err) console.log(err);
                        processedStyleGuide[styleguide] = content;
                    });
                } else {
                    console.log(regexMatch);
                }

            });

            return processedStyleGuide;
        }
        */

        function getStyleGuidelinesIDs(){
            return [
                "Single Responsibility",
                "IIFE",
                "Modules"
                //"Controllers",
                //"Services",
                //"Factories",
                //"Data Services",
                //"Directives"
            ];
        }

        /*function createRegExForStyleGuideSection(sectionID){
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
        }*/

    }
}());


;(function(){
    'use strict';

    angular
        .module('app')
        .controller('StyleRuleController', StyleRuleController);

    StyleRuleController.$inject = ['$scope'];

    function StyleRuleController($scope) {
        $scope.title = 'My Cool Rule';
        $scope.desc = 'You should do it like this.';
        $scope.why = 'Here is why you should follow this rule.';
        $scope.code = 'javascript here';



    }
}());