/**
 * A MerchantUtility class that has several static methods to assist in development.
 *
 * @class MerchantUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class MerchantUtil
{
    constructor()
    {
        throw new Error('[MerchantUtil] Do not instantiate the MerchantUtil class because it is a static class.');
    }

    /**
     * Determines if credit card is valid using the Luhn formula.
     *
     * @method isCreditCard
     * @param cardNumber {string} The credit card number.
     * @returns {boolean} <code>true</code> if String is a valid credit card number; otherwise <code>false</code>.
     * @public
     * @static
     * @example
     *      MerchantUtil.isCreditCard('4556106734384949');
     *      // true
     */
    public static isCreditCard(cardNumber:string):boolean
    {
        if (cardNumber.length < 7 || cardNumber.length > 19 || Number(cardNumber) < 1000000)
        {
            return false;
        }

        let pre:number;
        let sum:number = 0;
        let alt:boolean = true;
        let i:number = cardNumber.length;
        while (--i > -1)
        {
            if (alt)
            {
                sum += Number(cardNumber.substr(i, 1));
            }
            else
            {
                pre = Number(cardNumber.substr(i, 1)) * 2;
                sum += (pre > 8) ? pre -= 9 : pre;
            }

            alt = !alt;
        }

        return sum % 10 == 0;
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
    public static encodeCreditCardNumber(strNumber:string, digitsShown:number = 4, encodeChar:string = '*'):string
    {
        let encoded:string = '';
        for (let i:number = 0; i < strNumber.length - digitsShown; i++)
        {
            encoded += encodeChar;
        }
        encoded += strNumber.slice(-digitsShown);
        return encoded;
    }

    /**
     * Returns a credit card provider name from the credit card number passed in.
     *
     * @method getCreditCardProvider
     * @param cardNumber {string}
     * @returns {string}
     * @example
     *      MerchantUtil.getCreditCardProvider("4556106734384949");
     *      // visa
     *
     *      MerchantUtil.getCreditCardProvider("5428070016026573");
     *      // mastercard
     */
    public static getCreditCardProvider(cardNumber:string):string
    {
        if (MerchantUtil.isCreditCard(cardNumber) == false)
        {
            return 'invalid';
        }


        if (cardNumber.length == 13 || cardNumber.length == 16 && cardNumber.indexOf('4') == 0)
        {
            return 'visa';
        }
        else if (cardNumber.indexOf('51') == 0 || cardNumber.indexOf('52') == 0 || cardNumber.indexOf('53') == 0 || cardNumber.indexOf('54') == 0 || cardNumber.indexOf('55') == 0 && cardNumber.length == 16)
        {
            return 'mastercard';
        }
        else if (cardNumber.length == 16 && cardNumber.indexOf('6011') == 0)
        {
            return 'discover';
        }
        else if (cardNumber.indexOf('34') == 0 || cardNumber.indexOf('37') == 0 && cardNumber.length == 15)
        {
            return 'amex';
        }
        else if (cardNumber.indexOf('300') == 0 || cardNumber.indexOf('301') == 0 || cardNumber.indexOf('302') == 0 || cardNumber.indexOf('303') == 0 || cardNumber.indexOf('304') == 0 || cardNumber.indexOf('305') == 0 || cardNumber.indexOf('36') == 0 || cardNumber.indexOf('38') == 0 && cardNumber.length == 14)
        {
            return 'diners';
        }
        else
        {
            return 'other';
        }
    }

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
    public static isValidExpirationDate(month:number, year:number):boolean
    {
        const d:Date = new Date();
        const currentMonth:number = d.getMonth() + 1;
        const currentYear:number = d.getFullYear();
        if ((year > currentYear) || (year == currentYear && month >= currentMonth))
        {
            return true;
        }
        return false;
    }
}

export default MerchantUtil;