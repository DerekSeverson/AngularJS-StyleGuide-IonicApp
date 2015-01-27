
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
;(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '_', 'marked', 'styleGuideDataFactory'];

    function AppController($scope, _, marked, styleGuide) {

        $scope.sections = [];

        getStyleGuideData();

        /*
        $scope
            .sections[
                {
                    title : 'title here'
                    titleUrl: 'title_here"
                    subsections:[
                        subtitle: 'subtitle',
                        content: 'content'
                    }
                },
                { ... },
                { ... }
            ];

         */

        function setSections(data){
            $scope.sections = data;
        }

        function getStyleGuideData(){
            styleGuide.getStyleGuideData(setSections);
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
        .controller('MainContentController', MainContentController);

    MainContentController.$inject = ['$scope', '$stateParams', '_', 'styleGuideDataFactory'];

    function MainContentController($scope, $stateParams, _, styleGuideData) {
        $scope.section = {};

        getStyleGuideSectionByTitle($stateParams.titleurl);

        function getStyleGuideSectionByTitle(title){
            if(!_.existy(title) || title === ''){
                styleGuideData.getStyleGuideData(function(data){
                    $scope.section = _.first(data);
                });
                return;
            }
            styleGuideData.getStyleGuideData(function(data) {
                $scope.section = _.find(data, function (section) {
                    return section.titleurl === title;
                });
            });
        }
    }
}());
;(function(){
    'use strict';

    angular
        .module('app')
        .factory('styleGuideDataFactory', styleGuideDataFactory);

    styleGuideDataFactory.$inject = ['_', '$http', '$log', 'marked'];

    function styleGuideDataFactory(_, $http, $log, marked) {

        var _styleGuideData;

        return {
            getStyleGuideData: getStyleGuideData//,
            //processStyleGuide: processStyleGuide
        };

        // Service Methods

        function getStyleGuideData(callback){
            if(!_.existy(_styleGuideData)) {
                $http.get('data/styleguide.json')
                    .success(getStyleGuideComplete)
                    .error(getStyleGuideFailed);
            }else {
                callback(_styleGuideData);
            }

            function getStyleGuideComplete(data) {
                processStyleGuideData(data);
                callback(_styleGuideData);
            }

            function getStyleGuideFailed(error) {
                console.log(error);
                //$log.error('XHR Failed for getStyleGuide.' + error.data);
            }
        }

        function processStyleGuideData(data) {
            _styleGuideData = [];
            _.each(data, function(val, key){
                var section = {
                    title: key,
                    titleurl: key.split(' ').join('_'),
                    subsections:[]
                };
                _.each(val, function(subrulecontent, subsectiontitle){
                    if(subsectiontitle === 'order')
                    {
                        section.order = parseInt(subrulecontent);
                        return;
                    }
                    else {
                        section.subsections.push({
                            subtitle: subsectiontitle,
                            content: marked(subrulecontent.content), // markdown processing of content.
                            order: parseInt(subrulecontent.order)
                        });
                    }
                });
                section.subsections = _.sortBy(section.subsections, byOrder);
                _styleGuideData.push(section);
            });
            _styleGuideData = _.sortBy(_styleGuideData, byOrder);
        }

        function byOrder(section){
            return section.order;
        }

        function customize(html)
        {
            return _.compose(addCustomAvoidCommentClasses,
                             addCustomRecommendedCommentClasses)(html);
        }

        function addCustomAvoidCommentClasses(html){
            var avoidCommentString = '<span class="hljs-comment">/* avoid */</span>';
            var newAvoidCommentString = '<span class="assertive hljs-comment">/* avoid */</span>';
            return replaceAll(html, avoidCommentString, newAvoidCommentString);
        }
        function addCustomRecommendedCommentClasses(html){
            var recommendedCommentString = '<span class="hljs-comment">/* recommended */</span>';
            var newRecommendedCommentString = '<span class="positive hljs-comment">/* recommended */</span>';
            return replaceAll(html, recommendedCommentString, newRecommendedCommentString);
        }

        function escapeRegExp(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        function replaceAll(str, find, replaceWith) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replaceWith);
        }



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

    }
}());
