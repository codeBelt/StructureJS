define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    /**
     * A ValidationUtility class that has several static methods to assist in development.
     *
     * @class ValidationUtil
     * @module StructureTS
     * @submodule util
     * @constructor
     * @version 0.1.0
     */
    var ValidationUtil = (function () {
        function ValidationUtil() {
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
        ValidationUtil.isEmpty = function (text) {
            return text.length < 1;
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
         */
        ValidationUtil.isValidPhoneNumber = function (phoneNumber) {
            var expression = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
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
         */
        ValidationUtil.isPostalCode = function (postalCode) {
            var expression = /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/;
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
         */
        ValidationUtil.isSocialSecurityNumber = function (ssn) {
            var expression = /^\d{3}-?\d{2}-?\d{4}$/;
            return expression.test(ssn);
        };
        return ValidationUtil;
    })();

    module.exports = ValidationUtil;

});