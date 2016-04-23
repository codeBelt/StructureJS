(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * A ValidationUtility class that has several static methods to assist in development.
     *
     * @class ValidationUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var ValidationUtil = (function () {
        function ValidationUtil() {
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
        ValidationUtil.isEmpty = function (value) {
            if (value != null) {
                return value.length < 1;
            }
            return true;
        };
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
        ValidationUtil.isMatch = function (value1, value2) {
            return value1 === value2;
        };
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
        ValidationUtil.isValidEmailAddress = function (email) {
            var expression = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            return expression.test(email);
        };
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
        ValidationUtil.isValidPhoneNumber = function (phoneNumber) {
            var expression = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/;
            return expression.test(phoneNumber);
        };
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
        ValidationUtil.isZipCode = function (zipCode) {
            var expression = /^([0-9]{5})(?:[-\s]*([0-9]{4}))?$/;
            return expression.test(zipCode);
        };
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
        ValidationUtil.isPostalCode = function (postalCode) {
            var expression = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/i;
            return expression.test(postalCode);
        };
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
        ValidationUtil.isSocialSecurityNumber = function (ssn) {
            var expression = /^\d{3}-?\d{2}-?\d{4}$/;
            return expression.test(ssn);
        };
        return ValidationUtil;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ValidationUtil;
});
