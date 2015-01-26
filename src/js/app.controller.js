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