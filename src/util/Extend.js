/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Extend = factory();
    }
}(this, function() {
    'use strict';

    /**
     * A helper method to extend classes.
     *
     * @class Extend
     * @module StructureJS
     * @submodule util
     * @param inheritorClass
     * @param baseClass
     * @returns {*}
     * @constructor
     * @example
     *     var AnotherClass = (function () {
     *
     *         var _super = Extend(AnotherClass, BaseClass);
     *
     *         function AnotherClass() {
     *             _super.call(this);
     *         }
     *
     *         return AnotherClass;
     *     })();
     */
    var Extend = function(inheritorClass, baseClass) {
        for (var p in baseClass) {
            if (baseClass.hasOwnProperty(p)) {
                // Add any static properties from the baseClass to the inheritorClass.
                inheritorClass[p] = baseClass[p];
            }
        }

        // Creates an anonymous Class and sets the constructor as the inheritorClass.
        function __() {
            this.constructor = inheritorClass;
        }

        // Sets the anonymous Class prototype to the baseClass prototype.
        __.prototype = baseClass.prototype;

        // Sets the inheritorClass prototype as the baseClass and sets the constructor as the inheritorClass.
        inheritorClass.prototype = new __();

        return baseClass;
    };

    return Extend;
}));
