/**
 * A helper class that deals with dates.
 *
 * @class DateUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class DateUtil
{
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
    public static LONG_DAY_LABELS:Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
    public static SHORT_DAY_LABELS:Array<string> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
    public static LONG_MONTH_LABELS:Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
    public static SHORT_MONTH_LABELS:Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        const day:number = today % 100;
        return (( Math.floor(day / 10) === 1) ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][day % 10]);
    }
}

export default DateUtil;
