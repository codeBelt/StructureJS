(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * A MerchantUtility class that has several static methods to assist in development.
     *
     * @class MerchantUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var MerchantUtil = (function () {
        function MerchantUtil() {
            throw new Error('[MerchantUtil] Do not instantiate the MerchantUtil class because it is a static class.');
        }
        /**
         * Encode a credit card number as a string and encode all digits except the last <code>digitsShown</code>.
         *
         * @method encodeCreditCardNumber
         * @param strNumber {string} The credit card number as string.
         * @param [digitsShown=4] {number} Display this many digits at the end of the card number for security purposes.
         * @param [encodeChar=*] {string} Optional encoding character to use instead of default '*'.
         * @returns {string}
         * @public
         * @static
         * @example
         *      MerchantUtil.encodeCreditCardNumber('4556106734384949');
         *      // ************4949
         *
         *      MerchantUtil.encodeCreditCardNumber('4556106734384949', 5, 'x');
         *      // xxxxxxxxxxx84949
         */
        MerchantUtil.encodeCreditCardNumber = function (strNumber, digitsShown, encodeChar) {
            if (digitsShown === void 0) { digitsShown = 4; }
            if (encodeChar === void 0) { encodeChar = '*'; }
            var encoded = '';
            for (var i = 0; i < strNumber.length - digitsShown; i++) {
                encoded += encodeChar;
            }
            encoded += strNumber.slice(-digitsShown);
            return encoded;
        };
        /**
         * Returns a credit card provider name from the credit card number passed in.
         *
         * @method getCreditCardProvider
         * @param cardNumber {string|number}
         * @returns {string}
         * @example
         *      MerchantUtil.getCreditCardProvider("4");
         *      MerchantUtil.getCreditCardProvider("4556106734384949");
         *      // visa
         *
         *      MerchantUtil.getCreditCardProvider("5428070016026573");
         *      // mastercard
         */
        MerchantUtil.getCreditCardProvider = function (cardNumber) {
            // Remove all non-numeric chars.
            var stringNumber = String(cardNumber).replace(/[^0-9]/g, '');
            for (var _i = 0, _a = MerchantUtil.CARD_TYPES; _i < _a.length; _i++) {
                var cardType = _a[_i];
                for (var _b = 0, _c = cardType.range; _b < _c.length; _b++) {
                    var num = _c[_b];
                    var regex = new RegExp("^" + num + "+");
                    if (regex.test(stringNumber) === true) {
                        return cardType.name;
                    }
                }
            }
            return null;
        };
        /**
         * Validate a credit card's expiration date.
         *
         * @method isValidExpirationDate
         * @param month {number}
         * @param year {number}
         * @returns {boolean}
         * @example
         *      MerchantUtil.isValidExDate(11, 2010);
         *      // false
         */
        MerchantUtil.isValidExpirationDate = function (month, year) {
            var d = new Date();
            var currentMonth = d.getMonth() + 1;
            var currentYear = d.getFullYear();
            if ((year > currentYear) || (year == currentYear && month >= currentMonth)) {
                return true;
            }
            return false;
        };
        /**
         * Determines if credit card is valid
         *
         * @method isCreditCard
         * @param cardNumber {string|number} The credit card number.
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      MerchantUtil.isCreditCard('4556106734384949');
         *      // true
         */
        MerchantUtil.isCreditCard = function (cardNumber) {
            if (this._validateCreditCard(cardNumber) === true) {
                return this._validateStructure(cardNumber);
            }
            return false;
        };
        /**
         * https://davidwalsh.name/validate-credit-cards
         *
         * @method _validateStructure
         * @param cardNumber {string|number}
         * @return {boolean}
         */
        MerchantUtil._validateStructure = function (cardNumber) {
            // Remove all non-numeric chars.
            var stringNumber = String(cardNumber).replace(/[^0-9]/g, '');
            var results = [];
            for (var _i = 0, _a = MerchantUtil.CARD_TYPES; _i < _a.length; _i++) {
                var cardType = _a[_i];
                if (stringNumber.match('^' + cardType.regex + '$')) {
                    results.push(cardType.name);
                }
            }
            return results.length ? true : false;
        };
        /**
         * Determines if credit card is valid using the Luhn formula.
         * https://gist.github.com/ShirtlessKirk/2134376
         *
         * @method _validateCreditCard
         * @param cardNumber {string|number}
         * @return {boolean}
         */
        MerchantUtil._validateCreditCard = function (cardNumber) {
            // Remove all non-numeric chars.
            var stringNumber = String(cardNumber).replace(/[^0-9]/g, '');
            var prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];
            var len = stringNumber.length;
            var mul = 0;
            var sum = 0;
            while (len--) {
                sum += prodArr[mul][parseInt(stringNumber.charAt(len), 10)];
                mul ^= 1;
            }
            return sum % 10 === 0 && sum > 0;
        };
        /**
         * @method _updateRanges
         * @protected
         */
        MerchantUtil._updateRanges = function () {
            MerchantUtil
                .CARD_TYPES
                .forEach(function (cardType) {
                cardType.range = cardType.range.reduce(function (previous, current) {
                    if (current.indexOf('-') >= 0) {
                        var rangeArray = current.split('-');
                        for (var i = rangeArray[0]; i <= rangeArray[1]; i++) {
                            previous.push(String(i));
                        }
                    }
                    else {
                        previous.push(current);
                    }
                    return previous;
                }, []);
            });
        };
        return MerchantUtil;
    }());
    // https://davidwalsh.name/validate-credit-cards
    // http://www.freeformatter.com/credit-card-number-generator-validator.html
    // http://www.validcreditcardnumber.com/
    MerchantUtil.CARD_TYPES = [
        {
            name: 'American Express',
            range: ['34', '37'],
            validLength: [15],
            regex: '3[47][0-9]{13}',
        },
        {
            name: 'Diners Club - Carte Blanche',
            range: ['300-305'],
            validLength: [14],
            regex: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
        },
        {
            name: 'Diners Club - International',
            range: ['36'],
            validLength: [14],
            regex: '3(?:0[0-5][0-9]{11}|[68][0-9]{12})',
        },
        {
            name: 'JCB',
            range: ['3528-3589'],
            validLength: [16],
            regex: '(?:3[0-9]{15}|(2131|1800)[0-9]{11})',
        },
        {
            name: 'Visa Electron',
            range: ['4026', '417500', '4508', '4844', '4913', '4917'],
            validLength: [16],
            regex: '4(?:[0-9]{12}|[0-9]{15})',
        },
        {
            name: 'Visa',
            range: ['4'],
            validLength: [13, 14, 15, 16, 17, 18, 19],
            regex: '4(?:[0-9]{12}|[0-9]{15})',
        },
        {
            name: 'MasterCard',
            range: ['51-55', '2221-2720'],
            validLength: [16],
            regex: '5[1-5][0-9]{14}',
        },
        {
            name: 'Discover',
            range: ['6011', '622126-622925', '644-649', '65'],
            validLength: [16],
            regex: '6011[0-9]{12}',
        },
    ];
    MerchantUtil._updateRanges();
    exports.default = MerchantUtil;
});
