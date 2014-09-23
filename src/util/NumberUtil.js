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
        root.structurejs.NumberUtil = factory();
    }
}(this, function() {
    'use strict';

    /**
    * The NumberUtil...
    *
    * @class NumberUtil
    * @module StructureJS
    * @submodule util
    * @constructor
    * @author Robert S. (www.codeBelt.com)
    */
    var NumberUtil = (function () {
        function NumberUtil() {
        }
        /**
        * YUIDoc_comment
        *
        * @method bytesToMegabytes
        * @param bytes {number}
        * @returns {number}
        */
        NumberUtil.bytesToMegabytes = function (bytes) {
            return bytes / 1048576;
        };

        /**
        * YUIDoc_comment
        *
        * @method centimeterToInch
        * @param cm {number}
        * @returns {number}
        */
        NumberUtil.centimeterToInch = function (cm) {
            return cm * 0.39370;
        };

        /**
        * YUIDoc_comment
        *
        * @method inchToCentimeter
        * @param inch {number}
        * @returns {number}
        */
        NumberUtil.inchToCentimeter = function (inch) {
            return inch * 2.54;
        };

        /**
        * YUIDoc_comment
        *
        * @method feetToMeter
        * @param feet {number}
        * @returns {number}
        */
        NumberUtil.feetToMeter = function (feet) {
            return feet / 3.2808;
        };

        /**
        * YUIDoc_comment
        *
        * @method convertToHHMMSS
        * @param seconds {number}
        * @returns {string}
        */
        NumberUtil.convertToHHMMSS = function (seconds) {
            var sec = isNaN(seconds) ? 0 : seconds;

            var s = sec % 60;
            var m = Math.floor((sec % 3600) / 60);
            var h = Math.floor(sec / (60 * 60));

            var hourStr = (h == 0) ? "" : NumberUtil.doubleDigitFormat(h) + ":";
            var minuteStr = NumberUtil.doubleDigitFormat(m) + ":";
            var secondsStr = NumberUtil.doubleDigitFormat(s);

            return hourStr + minuteStr + secondsStr;
        };

        /**
        * YUIDoc_comment
        *
        * @method doubleDigitFormat
        * @param num {number}
        * @returns {string}
        */
        NumberUtil.doubleDigitFormat = function (num) {
            if (num < 10) {
                return ("0" + num);
            }
            return String(num);
        };

        NumberUtil.unformatUnit = function (value) {
            // Removes all characters and spaces except the period (.), comma (,) and the negative symbol (-).
            var withoutSpecialCharacters = value.replace(/[^\d.,-]/g, "");

            // Gets the index where the decimal placement is located.
            var decimalIndex = withoutSpecialCharacters.length - 3;
            var decimalSeparator = withoutSpecialCharacters.charAt(decimalIndex);
            if (decimalSeparator === '.') {
                // Removes all comma (,) characters and leaves the period (.) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d.-]/g, "");
            } else {
                // Removes all period (.) characters and leaves the comma (,) and the negative symbol (-).
                withoutSpecialCharacters = value.replace(/[^\d,-]/g, "");
                decimalIndex = withoutSpecialCharacters.length - 3;

                //Replaces the comma (,) to a period (.).
                withoutSpecialCharacters = withoutSpecialCharacters.replace(",", ".");
            }
            return parseFloat(withoutSpecialCharacters);
        };

        //        public static formatUnit(number:number, decimalPlacement:number = 2, decimalSeparator:string = '.', thousandsSeparator:string = ','):number
        NumberUtil.formatUnit = function (value, decimalPlacement, decimalSeparator, thousandsSeparator, currencySymbol, currencySymbolPlacement) {
            if (typeof decimalPlacement === "undefined") { decimalPlacement = 2; }
            if (typeof decimalSeparator === "undefined") { decimalSeparator = '.'; }
            if (typeof thousandsSeparator === "undefined") { thousandsSeparator = ','; }
            if (typeof currencySymbol === "undefined") { currencySymbol = ""; }
            if (typeof currencySymbolPlacement === "undefined") { currencySymbolPlacement = 0; }
            var str = String(Number(value).toFixed(decimalPlacement));
            var result = '';
            if (decimalPlacement != 0) {
                result = str.slice(-1 - decimalPlacement);
                str = str.slice(0, str.length - 1 - decimalPlacement);
            }
            while (str.length > 3) {
                result = thousandsSeparator + str.slice(-3) + result;
                str = str.slice(0, str.length - 3);
            }
            if (str.length > 0) {
                if (currencySymbolPlacement === 0) {
                    result = currencySymbol + str + result;
                } else if (currencySymbolPlacement === 1) {
                    result = str + result + currencySymbol;
                } else {
                    result = str + result;
                }
            }
            return result;
        };
        return NumberUtil;
    })();

    return NumberUtil;
}));