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