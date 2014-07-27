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

class NumberUtil
{
    /**
     * The NumberUtil...
     *
     * @class NumberUtil
     * @module StructureJS
     * @submodule util
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
    }

    /**
     * YUIDoc_comment
     *
     * @method bytesToMegabytes
     * @param bytes {number}
     * @returns {number}
     */
    public static bytesToMegabytes(bytes:number):number
    {
        return bytes / 1048576;
    }

    /**
     * YUIDoc_comment
     *
     * @method centimeterToInch
     * @param cm {number}
     * @returns {number}
     */
    public static centimeterToInch(cm:number):number
    {
        return cm * 0.39370;
    }

    /**
     * YUIDoc_comment
     *
     * @method inchToCentimeter
     * @param inch {number}
     * @returns {number}
     */
    public static inchToCentimeter(inch:number):number
    {
        return inch * 2.54;
    }

    /**
     * YUIDoc_comment
     *
     * @method feetToMeter
     * @param feet {number}
     * @returns {number}
     */
    public static feetToMeter(feet:number):number
    {
        return feet / 3.2808;
    }

    /**
     * YUIDoc_comment
     *
     * @method convertToHHMMSS
     * @param seconds {number}
     * @returns {string}
     */
    public static convertToHHMMSS(seconds:number):string
    {
        var sec:number = isNaN(seconds) ? 0 : seconds;//Changes NaN to 0

        var s:number = sec % 60;
        var m:number = Math.floor((sec % 3600 ) / 60);
        var h:number = Math.floor(sec / (60 * 60));

        var hourStr:string = (h == 0) ? "" : NumberUtil.doubleDigitFormat(h) + ":";
        var minuteStr:string = NumberUtil.doubleDigitFormat(m) + ":";
        var secondsStr:string = NumberUtil.doubleDigitFormat(s);

        return hourStr + minuteStr + secondsStr;
    }

    /**
     * YUIDoc_comment
     *
     * @method doubleDigitFormat
     * @param num {number}
     * @returns {string}
     */
    public static doubleDigitFormat(num:number):string
    {
        if (num < 10)
        {
            return ("0" + num);
        }
        return String(num);
    }


    public static unformatUnit(value:string):number
    {
        // Removes all characters and spaces except the period (.), comma (,) and the negative symbol (-).
        var withoutSpecialCharacters:string = value.replace(/[^\d.,-]/g, "");

        // Gets the index where the decimal placement is located.
        var decimalIndex:number = withoutSpecialCharacters.length - 3;
        var decimalSeparator:string = withoutSpecialCharacters.charAt(decimalIndex);
        if (decimalSeparator === '.')
        {
            // Removes all comma (,) characters and leaves the period (.) and the negative symbol (-).
            withoutSpecialCharacters = value.replace(/[^\d.-]/g, "");
        }
        else
        {
            // Removes all period (.) characters and leaves the comma (,) and the negative symbol (-).
            withoutSpecialCharacters = value.replace(/[^\d,-]/g, "");
            decimalIndex = withoutSpecialCharacters.length - 3;
            //Replaces the comma (,) to a period (.).
            withoutSpecialCharacters = withoutSpecialCharacters.replace(",", ".");
        }
        return parseFloat(withoutSpecialCharacters);
    }

    //        public static formatUnit(number:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ','):number
    public static formatUnit(value:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ',', currencySymbol:string = "", currencySymbolPlacement:number = 0):string
    {
        var str:string = String(Number(value).toFixed(decimalPlacement));
        var result:string = '';
        if (decimalPlacement != 0)
        {
            result = str.slice(-1 - decimalPlacement);
            str = str.slice(0, str.length - 1 - decimalPlacement);
        }
        while (str.length > 3)
        {
            result = thousandsSeparator + str.slice(-3) + result;
            str = str.slice(0, str.length - 3);
        }
        if (str.length > 0)
        {
            if (currencySymbolPlacement === 0)
            {
                result = currencySymbol + str + result;
            }
            else if (currencySymbolPlacement === 1)
            {
                result = str + result + currencySymbol;
            }
            else
            {
                result = str + result;
            }
        }
        return result;
    }

}

export = NumberUtil;