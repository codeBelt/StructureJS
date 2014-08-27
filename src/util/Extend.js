define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    /**
     * Snippet from TypeScript compiler.
     */
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

        // Creates an anonymous Class and sets the constructor as the inheritorClass.
        function __()
        {
            this.constructor = inheritorClass;
        }

        // Sets the anonymous Class prototype to the baseClass prototype.
        __.prototype = baseClass.prototype;

        // Sets the inheritorClass prototype as the baseClass and sets the constructor as the inheritorClass.
        inheritorClass.prototype = new __();

        return baseClass;
    };

    module.exports = Extend;

});