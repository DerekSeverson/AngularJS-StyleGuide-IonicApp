
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