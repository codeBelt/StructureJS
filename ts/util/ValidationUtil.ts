
/**
 * A ValidationUtility class that has several static methods to assist in development.
 *
 * @class ValidationUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class ValidationUtil
    {
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
}