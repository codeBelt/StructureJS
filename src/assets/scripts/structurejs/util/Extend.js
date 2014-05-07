define(function (require, exports, module)
{
    'use strict';

    // Snippet From TypeScript Compiler
    var Extend = function (inheritorClass, baseClass)
    {
        for (var p in baseClass)
        {
            if (baseClass.hasOwnProperty(p))
            {
                // Add any static properties from the baseClass to the inheritorClass.
                inheritorClass[p] = baseClass[p];
            }
        }

        function __()
        {
            this.constructor = inheritorClass;
        }

        __.prototype = baseClass.prototype;
        inheritorClass.prototype = new __();

        return baseClass;
    };

    module.exports = Extend;

});