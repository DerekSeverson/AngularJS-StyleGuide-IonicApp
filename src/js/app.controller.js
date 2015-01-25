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