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
    // https://davidwalsh.name/validate-credit-cards
    // http://www.freeformatter.com/credit-card-number-generator-validator.html
    // http://www.validcreditcardnumber.com/
    public static CARD_TYPES:any = [
        {
            name: 'American Express',
            range: ['34', '37'],
            validLength: [15 ],
            regex: '3[47][0-9]{13}',
        },
        {
            name: 'Diners Club - Carte Blanche',
            range: ['300-305'],
            validLength: [14 ],
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

    constructor()
    {
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
    public static getCreditCardProvider(cardNumber:string|number):string
    {
        // Remove all non-numeric chars.
        const stringNumber = String(cardNumber).replace(/[^0-9]/g, '');

        for (let cardType of MerchantUtil.CARD_TYPES)
        {
            for (let num of cardType.range)
            {
                const regex = new RegExp(`^${num}+`);

                if (regex.test(stringNumber) === true)
                {
                    return cardType.name;
                }
            }
        }

        return null;
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
    public static isCreditCard(cardNumber:string|number)
    {
        if(this._validateCreditCard(cardNumber) === true)
        {
            return this._validateStructure(cardNumber);
        }

        return false;
    }

    /**
     * https://davidwalsh.name/validate-credit-cards
     *
     * @method _validateStructure
     * @param cardNumber {string|number}
     * @return {boolean}
     */
    private static _validateStructure(cardNumber:string|number):boolean
    {
        // Remove all non-numeric chars.
        const stringNumber = String(cardNumber).replace(/[^0-9]/g, '');
        const results  = [];

        for(var cardType of MerchantUtil.CARD_TYPES)
        {
            if(stringNumber.match('^' + cardType.regex + '$'))
            {
                results.push(cardType.name);
            }
        }

        return results.length ? true : false;
    }

    /**
     * Determines if credit card is valid using the Luhn formula.
     * https://gist.github.com/ShirtlessKirk/2134376
     *
     * @method _validateCreditCard
     * @param cardNumber {string|number}
     * @return {boolean}
     */
    private static _validateCreditCard(cardNumber:string|number):boolean
    {
        // Remove all non-numeric chars.
        const stringNumber = String(cardNumber).replace(/[^0-9]/g, '');

        const prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];
        let len = stringNumber.length;
        let mul = 0;
        let sum = 0;

        while (len--) {
            sum += prodArr[mul][parseInt(stringNumber.charAt(len), 10)];
            mul ^= 1;
        }

        return sum % 10 === 0 && sum > 0;
    }

    /**
     * @method _updateRanges
     * @protected
     */
    public static _updateRanges():void {
        MerchantUtil
            .CARD_TYPES
            .forEach(cardType =>
            {
                cardType.range = cardType.range.reduce((previous, current) =>
                {
                    if (current.indexOf('-') >= 0)
                    {
                        const rangeArray = current.split('-');

                        for (let i = rangeArray[0]; i <= rangeArray[1]; i++)
                        {
                            previous.push(String(i));
                        }
                    }
                    else
                    {
                        previous.push(current);
                    }

                    return previous;
                }, []);
            });
    }

}

MerchantUtil._updateRanges();

export default MerchantUtil;
