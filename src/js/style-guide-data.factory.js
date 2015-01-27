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
