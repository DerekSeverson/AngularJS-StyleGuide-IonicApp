;(function(){
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '_', 'styleGuideDataFactory'];

    function AppController($scope, _, styleGuide) {

        //vm.guidelines = getGuidelines();
        getGuidelines();



        // Private Methods

        function getStyleGuideContent(){
            return styleGuide.getStyleGuideContent();
        }

        function processStyleGuide(styleGuideContent) {
            return styleGuide.processStyleGuide(styleGuideContent);
        }

        function getGuidelines(){
            var contentPromise = getStyleGuideContent();

            contentPromise.success(function(data){
                var styleguides = processStyleGuide(data.styleguide);
                $scope.guidelines = _.values(styleguides)
            });
            //$scope.$apply();
        }

    }
}());