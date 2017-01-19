/**
 * The NumberUtil class has many helper methods to work with number data.
 *
 * @class NumberUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class NumberUtil {
    constructor();
    /**
     * Converts bytes into megabytes.
     *
     * @method bytesToMegabytes
     * @param bytes {number}
     * @returns {number}
     * @public
     * @static
     * @example
     *
     */
    static bytesToMegabytes(bytes: number): number;
    /**
     * Converts centimeters into inches.
     *
     * @method centimeterToInch
     * @param cm {number}
     * @public
     * @static
     * @returns {number}
     * @example
     *     NumberUtil.centimeterToInch(1);
     *     // 0.3937
     */
    static centimeterToInch(cm: number): number;
    /**
     * Converts inches into centimeters.
     *
     * @method inchToCentimeter
     * @param inch {number}
     * @public
     * @static
     * @returns {number}
     * @example
     *     NumberUtil.inchToCentimeter(1);
     *     // 2.54
     */
    static inchToCentimeter(inch: number): number;
    /**
     * Converts feet into meters.
     *
     * @method feetToMeter
     * @param feet {number}
     * @public
     * @static
     * @returns {number}
     * @example
     *     NumberUtil.feetToMeter(1);
     *     // 0.3048
     *
     */
    static feetToMeter(feet: number): number;
    /**
     * Converts seconds into hour, minutes, seconds.
     *
     * @method convertToHHMMSS
     * @param seconds {number}
     * @param showHours [boolean=true] By default if the time does not pass one hour it will show 00:05:34. Pass false to display the time as 05:34 until it gets pass one hour and then it will show 01:00:00
     * @returns {string}
     * @public
     * @static
     * @example
     *     NumberUtil.convertToHHMMSS(33333);
     *     // '09:15:33'
     */
    static convertToHHMMSS(seconds: number, showHours?: boolean): string;
    /**
     * Formats a number from 0-9 to display with 2 digits.
     *
     * @method doubleDigitFormat
     * @param num {number}
     * @returns {string}
     * @public
     * @static
     * @example
     *     NumberUtil.doubleDigitFormat(0);
     *     // '00'
     *
     *     NumberUtil.doubleDigitFormat(5);
     *     // '05'
     *
     *     NumberUtil.doubleDigitFormat(9);
     *     // '09'
     */
    static doubleDigitFormat(num: number): string;
    /**
     * Formats a currency string as a number.
     *
     * @method unformatUnit
     * @param value {string} The string currency that you want converted into a number.
     * @returns {number} Returns the number value of the currency string.
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
    static unformatUnit(value: string): number;
    /**
     * Formats a number as a currency string.
     *
     * @method formatUnit
     * @param value {number} The number value you want formatted.
     * @param [decimalPlacement=2] {number} How many decimal placements you want to show.
     * @param [decimalSeparator='.'] {string} The character you want to use as the thousands separator.
     * @param [thousandsSeparator=','] {string} The character you want to use as the thousands separator.
     * @param [currencySymbol=''] {string} The symbol you would like to add.
     * @param [currencySymbolPlacement=0] {number} The placement of the symbol. Use 0 to place in front or 1 to place at the end.
     * @returns {string} Returns the formatted currency.
     * @public
     * @static
     * @example
     *     NumberUtil.formatUnit(1234567.89, 2, ".", ",", "$", 0);
     *     // '$1,234,567.89'
     *
     *     NumberUtil.formatUnit(12341234.56, 2, "*", ",", " €", 1);
     *     // '12,341,234*56 €'
     *
     *     NumberUtil.formatUnit(-1900.24, 1);
     *     // '-1,900.2'
     */
    static formatUnit(value: number, decimalPlacement?: number, decimalSeparator?: string, thousandsSeparator?: string, currencySymbol?: string, currencySymbolPlacement?: number): string;
    /**
     * Convert Fahrenheit to Celsius.
     *
     * @method fahrenheitToCelsius
     * @param fahrenheit {number} The fahrenheit value.
     * @param decimals {number} The number of decimals.
     * @return {number}
     * @example
     *      MathUtil.fahrenheitToCelsius(32);
     *      // 0
     *
     *      MathUtil.fahrenheitToCelsius(212);
     *      // 100
     */
    static fahrenheitToCelsius(fahrenheit: number, decimals?: number): number;
    /**
     * Convert Celsius to Fahrenheit.
     *
     * @method celsiusToFahrenheit
     * @param celsius {number} The celsius value.
     * @param decimals {number} The number of decimals.
     * @return {number}
     * @example
     *      MathUtil.celsiusToFahrenheit(0);
     *      // 32
     *
     *      MathUtil.celsiusToFahrenheit(100);
     *      // 212
     */
    static celsiusToFahrenheit(celsius: number, decimals?: number): number;
}
export default NumberUtil;
