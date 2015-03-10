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
     * A helper class that deals with dates.
     *
     * @class DateUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var DateUtil = (function () {
        function DateUtil() {
            throw new Error('[DateUtil] Do not instantiate the DateUtil class because it is a static class.');
        }
        /**
         * Returns the suffix of a given day.
         *
         * @method getDaySuffix
         * @param today {number}
         * @returns {string}
         * @public
         * @static
         * @example
         *      DateUtil.getDaySuffix(1);
         *      // 'st'
         *
         *      DateUtil.getDaySuffix(2);
         *      // 'nd'
         *
         *      DateUtil.getDaySuffix(3);
         *      // 'rd'
         *
         *      DateUtil.getDaySuffix(4);
         *      // 'th'
         */
        DateUtil.getDaySuffix = function (today) {
            var day = today % 100;
            return ((Math.floor(day / 10) === 1) ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10]);
        };
        /**
         * A list of day names.
         *
         * @property LONG_DAY_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        DateUtil.LONG_DAY_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        /**
         * TODO: YUIDoc_comment
         *
         * @property SHORT_DAY_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        DateUtil.SHORT_DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        /**
         * A list of month names.
         *
         * @property LONG_MONTH_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        DateUtil.LONG_MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        /**
         * TODO: YUIDoc_comment
         *
         * @property SHORT_MONTH_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        DateUtil.SHORT_MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return DateUtil;
    })();

    return DateUtil;
}));