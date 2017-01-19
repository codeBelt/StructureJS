/**
 * A MerchantUtility class that has several static methods to assist in development.
 *
 * @class MerchantUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class MerchantUtil {
    static CARD_TYPES: any;
    constructor();
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
    static encodeCreditCardNumber(strNumber: string, digitsShown?: number, encodeChar?: string): string;
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
    static getCreditCardProvider(cardNumber: string | number): string;
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
    static isValidExpirationDate(month: number, year: number): boolean;
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
    static isCreditCard(cardNumber: string | number): boolean;
    /**
     * https://davidwalsh.name/validate-credit-cards
     *
     * @method _validateStructure
     * @param cardNumber {string|number}
     * @return {boolean}
     */
    private static _validateStructure(cardNumber);
    /**
     * Determines if credit card is valid using the Luhn formula.
     * https://gist.github.com/ShirtlessKirk/2134376
     *
     * @method _validateCreditCard
     * @param cardNumber {string|number}
     * @return {boolean}
     */
    private static _validateCreditCard(cardNumber);
    /**
     * @method _updateRanges
     * @protected
     */
    static _updateRanges(): void;
}
export default MerchantUtil;
