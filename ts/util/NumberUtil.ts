
/**
 * The NumberUtil...
 *
 * @class NumberUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class NumberUtil
    {
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

            var hourStr:string = (h == 0) ? '' : NumberUtil.doubleDigitFormat(h) + ':';
            var minuteStr:string = NumberUtil.doubleDigitFormat(m) + ':';
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
                return ('0' + num);
            }
            return String(num);
        }

        /**
         * YUIDoc_comment
         *
         * @method unformatUnit
         * @param value {string}
         * @returns {number}
         * @public
         * @static
         * @example
         *     NumberUtil.unformatUnit('$1,234,567.89');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('1.234.567,89 €');
         *     // 1234567.89
         *
         *     NumberUtil.unformatUnit('$-123,456,789.99');
         *     // -123456789.99
         */
        public static unformatUnit(value:string):number
        {
            // Removes all characters and spaces except the period (.), comma (,) and the negative symbol (-).
            var withoutSpecialCharacters:string = value.replace(/[^\d.,-]/g, '');

            // Gets the index where the decimal placement is located.
            var decimalIndex:number = withoutSpecialCharacters.length - 3;
            var decimalSeparator:string = withoutSpecialCharacters.charAt(decimalIndex);
            if (decimalSeparator === '.')
            {
                // Removes all comma (,) characters and leaves the period (.) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d.-]/g, '');
            }
            else
            {
                // Removes all period (.) characters and leaves the comma (,) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d,-]/g, '');
                decimalIndex = withoutSpecialCharacters.length - 3;
                //Replaces the comma (,) to a period (.).
                withoutSpecialCharacters = withoutSpecialCharacters.replace(',', '.');
            }
            return parseFloat(withoutSpecialCharacters);
        }

        /**
         * YUIDoc_comment
         *
         * @method formatUnit
         * @param value {number}
         * @param [decimalPlacement=2] {number}
         * @param [decimalSeparator='.'] {string}
         * @param [thousandsSeparator=','] {string}
         * @param [currencySymbol=''] {string}
         * @param [currencySymbolPlacement=0] {number}
         * @returns {string}
         * @public
         * @static
         * @example
         *     NumberUtil.formatUnit(1234567.89, 2, "*", ",", "$", 0);
         *     // '$1,234,567.89'
         *
         *     NumberUtil.formatUnit(12341234.56, 2, "*", ",", " €", 1);
         *     // '12,341,234.56 €'
         *
         *     NumberUtil.formatUnit(-1900.24, 1);
         *     // '-1,900.2'
         */
        public static formatUnit(value:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ',', currencySymbol:string = '', currencySymbolPlacement:number = 0):string
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
}