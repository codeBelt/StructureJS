/**
 * A ValidationUtility class that has several static methods to assist in development.
 *
 * @class ValidationUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class ValidationUtil
{
    constructor()
    {
        throw new Error('[ValidationUtil] Do not instantiate the ValidationUtil class because it is a static class.');
    }

    /**
     * Determines if the String passed has a length.
     *
     * @method isEmpty
     * @param value {string}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      ValidationUtil.isEmpty('sometext');
     *      // false
     */
    public static isEmpty(value:string):boolean
    {
        if (value != null) {
            return value.length < 1;
        }
        return true;
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
     * @example
     *      ValidationUtil.isMatch('one@email.com', 'two@email.com');
     *      // false
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
     * @example
     *      ValidationUtil.isValidEmailAddress('someemail@address.com');
     *      // true
     */
    public static isValidEmailAddress(email:string):boolean
    {
        const expression:RegExp = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
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
     * @example
     *      ValidationUtil.isValidPhoneNumber('123 456 7899');
     *      // true
     */
    public static isValidPhoneNumber(phoneNumber:string):boolean
    {
        const expression:RegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
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
     * @example
     *      ValidationUtil.isZipCode('55067 4434');
     *      // true
     */
    public static isZipCode(zipCode:string):boolean
    {
        const expression:RegExp = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
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
     * @example
     *      ValidationUtil.isPostalCode('p8n3h3');
     *      // true
     */
    public static isPostalCode(postalCode:string):boolean
    {
        const expression:RegExp = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/i;
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
     * @example
     *      ValidationUtil.isSocialSecurityNumber('178051120');
     *      // true
     */
    public static isSocialSecurityNumber(ssn:string):boolean
    {
        const expression:RegExp = /^\d{3}-?\d{2}-?\d{4}$/;
        return expression.test(ssn);
    }
}

export default ValidationUtil;