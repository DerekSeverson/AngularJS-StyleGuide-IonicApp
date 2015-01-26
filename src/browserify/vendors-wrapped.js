;(function(){
    'use strict';

    angular
        .module('app')
        .factory('marked', marked);

    //marked.$inject = ['pygmentize'];
    marked.$inject = ['highlight'];

    function marked(highlight){
        var markd = require('marked');

        markd.setOptions({
            highlight: function (code) {
                return highlight.highlight('javascript', code).value;
            }
        })

        //markd.setOptions({
        //    highlight: function (code, lang, callback) {
        //        pygmentize(
        //            {lang: lang, format: 'html'},
        //            code,
        //            function (err, result) {
        //                callback(err, result.toString());
        //        });
        //    },
        //    gfm: true
        //});

        return markd;
    }
}());

/*
;(function(){
    'use strict';

    angular
        .module('app')
        .factory('pygmentize', pygmentize);

    function pygmentize(){
        var pyg = require('pygmentize-bundled');

        return pyg;
    }

}());
*/
;(function(){
    'use strict';

    angular
        .module('app')
        .factory('highlight', highlight);

    function highlight() {
        var highlite = require('highlight-redux');

        //highlite.initHighlightingOnLoad();

        return highlite;
    }
}());

;(function(){
    'use strict';

    angular
        .module('app')
        .factory('_', lodash);

    function lodash(){
        var _lodash = require('lodash');

        _lodash.mixin({
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

        return _lodash;
    }
}());