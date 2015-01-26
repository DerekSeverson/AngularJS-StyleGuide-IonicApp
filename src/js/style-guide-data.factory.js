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
