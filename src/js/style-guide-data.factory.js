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
                    section.subsections.push({
                        subtitle: subsectiontitle,
                        content: marked(subrulecontent.content) // markdown processing of content.
                    });
                });
                _styleGuideData.push(section);
            });
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
