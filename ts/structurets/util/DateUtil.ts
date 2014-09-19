/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The DateUtil...
 *
 * @class DateUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class DateUtil
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

export = DateUtil;