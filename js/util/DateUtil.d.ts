/**
 * A helper class that deals with dates.
 *
 * @class DateUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class DateUtil {
    /**
     * A list of day names.
     *
     * @property LONG_DAY_LABELS
     * @type [Array=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']]
     * @public
     * @static
     * @final
     * @example
     *      DateUtil.LONG_DAY_LABELS[1];
     *      // 'Monday'
     */
    static LONG_DAY_LABELS: Array<string>;
    /**
     * A list of short day names
     *
     * @property SHORT_DAY_LABELS
     * @type [Array=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']]
     * @public
     * @static
     * @final
     * @example
     *      DateUtil.SHORT_DAY_LABELS[1];
     *      // 'Mon'
     */
    static SHORT_DAY_LABELS: Array<string>;
    /**
     * A list of month names.
     *
     * @property LONG_MONTH_LABELS
     * @type [Array=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']]
     * @public
     * @static
     * @final
     * @example
     *      DateUtil.LONG_MONTH_LABELS[1];
     *      // 'February'
     */
    static LONG_MONTH_LABELS: Array<string>;
    /**
     * A list of short month names.
     *
     * @property SHORT_MONTH_LABELS
     * @type [Array=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']]
     * @public
     * @final
     * @example
     *      DateUtil.SHORT_MONTH_LABELS[1];
     *      // 'Feb'
     */
    static SHORT_MONTH_LABELS: Array<string>;
    constructor();
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
    static getDaySuffix(today: number): string;
}
export default DateUtil;
