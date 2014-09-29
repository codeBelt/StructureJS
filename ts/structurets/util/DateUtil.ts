
/**
 * The DateUtil...
 *
 * @class DateUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class DateUtil
    {
        /**
         * YUIDoc_comment
         *
         * @property LONG_DAY_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        public static LONG_DAY_LABELS:any[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        /**
         * YUIDoc_comment
         *
         * @property SHORT_DAY_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        public static SHORT_DAY_LABELS:any[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        /**
         * YUIDoc_comment
         *
         * @property LONG_MONTH_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        public static LONG_MONTH_LABELS:any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        /**
         * YUIDoc_comment
         *
         * @property SHORT_MONTH_LABELS
         * @type {array}
         * @public
         * @static
         * @final
         */
        public static SHORT_MONTH_LABELS:any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        constructor()
        {
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
        public static getDaySuffix(today:number):string
        {
            var day:number = today % 100;
            return (( Math.floor(day / 10) === 1) ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10]);
        }
    }
}