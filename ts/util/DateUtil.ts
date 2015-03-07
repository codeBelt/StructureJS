
/**
 * A helper class that deals with dates.
 *
 * @class DateUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureTS
{
    export class DateUtil
    {
        /**
         * A list of day names.
         *
         * @property LONG_DAY_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        public static LONG_DAY_LABELS:any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        /**
         * TODO: YUIDoc_comment
         *
         * @property SHORT_DAY_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        public static SHORT_DAY_LABELS:any[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        /**
         * A list of month names.
         *
         * @property LONG_MONTH_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        public static LONG_MONTH_LABELS:any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        /**
         * TODO: YUIDoc_comment
         *
         * @property SHORT_MONTH_LABELS
         * @type {Array}
         * @public
         * @static
         * @final
         */
        public static SHORT_MONTH_LABELS:any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        constructor()
        {
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
        public static getDaySuffix(today:number):string
        {
            var day:number = today % 100;
            return (( Math.floor(day / 10) === 1) ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10]);
        }
    }
}