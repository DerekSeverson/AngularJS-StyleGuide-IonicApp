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
