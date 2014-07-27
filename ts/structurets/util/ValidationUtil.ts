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

class ValidationUtil
{
    /**
     * A ValidationUtility class that has several static methods to assist in development.
     *
     * @class ValidationUtil
     * @module StructureJS
     * @submodule util
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
        //http://msdn.microsoft.com/en-us/library/ff650303.aspx
    }

    /**
     * Determines if the String passed has a length.
     *
     * @method isEmpty
     * @param text {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isEmpty(text:string):boolean
    {
        return text.length < 1;
    }

    /**
     * Determines if the two values passed in are the same.
     *
     * @method isMatch
     * @param value1 {any}
     * @param value2 {any}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isMatch(value1:any, value2:any):boolean
    {
        return value1 === value2;
    }

    /**
     * Determines if the String passed in is a valid email address.
     *
     * @method isValidEmailAddress
     * @param email {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isValidEmailAddress(email:string):boolean
    {
        var expression:RegExp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return expression.test(email);
    }

    /**
     * Determines if the String passed in is a phone number.
     *
     * @method isValidPhoneNumber
     * @param phoneNumber {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isValidPhoneNumber(phoneNumber:string):boolean
    {
        var expression:RegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        return expression.test(phoneNumber);
    }

    /**
     * Determines if the String passed in is a zip code.
     *
     * @method isZipCode
     * @param zipCode {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isZipCode(zipCode:string):boolean
    {
        var expression:RegExp = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
        return expression.test(zipCode);
    }

    /**
     * Determines if the String passed in is a postal code.
     *
     * @method isPostalCode
     * @param postalCode {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isPostalCode(postalCode:string):boolean
    {
        var expression:RegExp = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
        return expression.test(postalCode);
    }

    /**
     * Determines if the String passed in is a Social Security Number.
     *
     * @method isSocialSecurityNumber
     * @param ssn {string}
     * @returns {boolean}
     * @public
     * @static
     */
    public static isSocialSecurityNumber(ssn:string):boolean
    {
        var expression:RegExp = /^\d{3}-?\d{2}-?\d{4}$/;
        return expression.test(ssn);
    }

}

export = ValidationUtil;