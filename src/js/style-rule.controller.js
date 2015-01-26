
;(function(){
    'use strict';

    angular
        .module('app')
        .controller('StyleRuleController', StyleRuleController);

    StyleRuleController.$inject = ['$scope'];

    function StyleRuleController($scope) {
        $scope.title = 'My Cool Rule';
        $scope.desc = 'You should do it like this.';
        $scope.why = 'Here is why you should follow this rule.';
        $scope.code = 'javascript here';



    }
}());