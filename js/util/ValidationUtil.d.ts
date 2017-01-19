/**
 * A ValidationUtility class that has several static methods to assist in development.
 *
 * @class ValidationUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class ValidationUtil {
    constructor();
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
    static isEmpty(value: string): boolean;
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
    static isMatch(value1: any, value2: any): boolean;
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
    static isValidEmailAddress(email: string): boolean;
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
    static isValidPhoneNumber(phoneNumber: string): boolean;
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
    static isZipCode(zipCode: string): boolean;
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
    static isPostalCode(postalCode: string): boolean;
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
    static isSocialSecurityNumber(ssn: string): boolean;
}
export default ValidationUtil;
