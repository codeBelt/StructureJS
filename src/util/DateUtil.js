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
        root.structurejs = root.structurejs || {};
        root.structurejs.DateUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
    * The DateUtil...
    *
    * @class DateUtil
    * @module StructureJS
    * @submodule util
    * @constructor
    * @author Robert S. (www.codeBelt.com)
    */
    var DateUtil = (function () {
        function DateUtil() {
        }
        /**
        * YUIDoc_comment
        *
        * @method getDaySuffix
        * @param today {number}
        * @returns {string}
        * @public
        * @static
        */
        DateUtil.getDaySuffix = function (today) {
            var day = today % 100;
            return ((Math.floor(day / 10) == 1) ? "th" : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][day % 10]);
        };

        /**
         * YUIDoc_comment
         *
         * @property LONG_DAY_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        DateUtil.LONG_DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        /**
         * YUIDoc_comment
         *
         * @property SHORT_DAY_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        DateUtil.SHORT_DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        /**
         * YUIDoc_comment
         *
         * @property LONG_MONTH_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        DateUtil.LONG_MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        /**
         * YUIDoc_comment
         *
         * @property SHORT_MONTH_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        DateUtil.SHORT_MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return DateUtil;
    })();

    return DateUtil;
}));