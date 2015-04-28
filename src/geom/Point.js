/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Point = factory();
    }
}(this, function() {

    'use strict';

    /**
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
     *
     * @class Point
     * @module StructureJS
     * @submodule geom
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var Point = (function() {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            /**
             * The horizontal coordinate of the point.
             *
             * @property x
             * @type {number}
             * @public
             */
            this.x = 0;
            /**
             * The vertical coordinate of the point.
             *
             * @property y
             * @type {number}
             * @public
             */
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        return Point;
    })();

    return Point;
}));