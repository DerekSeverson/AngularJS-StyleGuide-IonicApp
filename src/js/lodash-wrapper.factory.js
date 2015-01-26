/*
;(function(){
    angular
        .module('app')
        .factory('_', lodashFactory);

    lodashFactory.$inject = ['$window'];

    function lodashFactory($window){

        // save private lodash for factory
        var lodash = $window._;

        // delete from global namespace
        delete($window._);

        // Customize my lodash

        lodash.mixin({
            existy: existy,
            truthy: truthy,
            falsey: falsey
        });

        function existy(obj){
            return obj != null;//jshint ignore:line
        }

        function truthy(obj){
            return (obj !== false) && existy(obj);
        }

        function falsey(obj){
            return !truthy(obj);
        }

        // share lodash as a factory/service
        return lodash;
    }
}());
*/