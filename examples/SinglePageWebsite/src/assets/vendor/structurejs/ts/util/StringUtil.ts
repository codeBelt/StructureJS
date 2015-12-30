/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class StringUtil
{
    constructor()
    {
        throw new Error('[StringUtil] Do not instantiate the StringUtil class because it is a static class.');
    }

    /**
     * Gets the extension name off the string being passed in.
     *
     * @method getExtension
     * @param filename {string}
     * @param withDot {boolean} If you want the period to be included in the extension name.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.getExtension('file.exe');
     *      // 'exe'
     *
     *      StringUtil.getExtension('file.exe', true);
     *      // '.exe'
     */
    public static getExtension(filename:string, withDot:boolean = false):string
    {
        const num:number = (withDot === true) ? 0 : 1;
        return filename.slice(filename.lastIndexOf('.') + num, filename.length);
    }

    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentence
     * @param str {string}
     * @param [separator] {string} Can be any string you want to use as a separator.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '/');
     *      // 'live/down/by/the/river'
     */
    public static toSentence(str:string, separator:string = ' '):string
    {
        return String(str)
            // Add a space after any digits.
            .replace(/(\d)/g, '$1 ')
            // Add a space before any upper case characters.
            .replace(/([a-z](?=[A-Z]))/g, '$1 ')
            // Remove all non-word characters and replace with a single space.
            .replace(/[^a-zA-Z0-9 ]/g, ' ')
            // Replace multiple Spaces with a single space.
            .replace(/\s{2,}/g, ' ')
            // Trim whitespace around the string.
            .replace(/^ | $/g, '')
            // Lower case the entire string.
            .toLowerCase()
            // If a separator is passed in then replace the space with it.
            .replace(/\s+/g, separator);
    }

    /**
     * Converts a string to a camel case string.
     *
     * @method toCamelCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toCamelCase("liveDown_by-the.River");
     *      // 'liveDownByTheRiver'
     */
    public static toCamelCase(str:string):string
    {
        return StringUtil.toSentence(str)
            // Replace spaces between words with a string upper cased character.
            .replace(/ (\w)/g, function (_, $1)
            {
                return $1.toUpperCase();
            });
    }

    /**
     * Converts a hyphen string to a pascal case string.
     *
     * @method toPascalCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toPascalCase("liveDown_by-the.River");
     *      // 'LiveDownByTheRiver'
     */
    public static toPascalCase(str:string):string
    {
        return StringUtil.toCamelCase(str)
            // Make first character uppercase.
            .replace(/^[a-zA-Z]/, function (a, b, c)
            {
                return a.toUpperCase();
            });
    }


    /**
     * Converts a string to a constant case string.
     *
     * @method toConstantCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toConstantCase("liveDown_by-the.River");
     *      // 'LIVE_DOWN_BY_THE_RIVER'
     */
    public static toConstantCase(str:string):string
    {
        return StringUtil.toSentence(str, '_')
            .toUpperCase();
    }

    /**
     * Creates a universally unique identifier.
     *
     * @method createUUID
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.createUUID();
     *      // 'a95d7134-3342-4001-bcea-cc0371b70dec'
     */
    public static createUUID():string
    {
        const uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c)
        {
            let r = Math.random() * 16 | 0;
            let v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return uuid;
    }

    /**
     * Converts a query string to an object.
     *
     * @method queryStringToObject
     * @param queryString {string}
     * @param [useParseFloat=false] {boolean} If true converts strings to numbers.
     * @returns {Object|Null}
     * @public
     * @static
     * @example
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
     *      // {name: 'Robert', age: '23', gender: 'male'}
     *
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', true);
     *      // {name: 'Robert', age: 23, gender: 'male'}
     */
    public static queryStringToObject(queryString:string, useParseFloat:boolean = false):any
    {
        let params:any = {};
        let temp:any = null;

        const str:string = queryString.substring(queryString.indexOf('?') + 1);

        if (str === '')
        {
            return null;
        }

        // Split into key/value pairs
        const queries = str.split('&');

        // Convert the array of strings into an object
        const len:number = queries.length;
        for (let i = 0; i < len; i++)
        {
            temp = queries[i].split('=');
            params[temp[0]] = (useParseFloat === true && isNaN(parseFloat(temp[1])) === false) ? parseFloat(temp[1]) : temp[1];
        }

        return params;
    }

    /**
     * Remove all whitespace from the string passed in.
     *
     * @method removeAllWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      let str = '   a b    c d e f g ';
     *      StringUtil.removeAllWhitespace(str);
     *      // 'abcdefg'
     */
    public static removeAllWhitespace(str:string):string
    {
        return str.replace(/\s+/g, '');
    }

    /**
     * Remove leading and trailing whitespace.
     *
     * @method removeLeadingTrailingWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      let str = '   a b    c d e f g ';
     *      StringUtil.removeLeadingTrailingWhitespace(str);
     *      // 'a b    c d e f g'
     */
    public static removeLeadingTrailingWhitespace(str:string):string
    {
        return str.replace(/(^\s+|\s+$)/g, '');
    }

    /**
     *
     * @method truncate
     * @param text {string}
     * @param length {int}
     * @param indicator {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
     *      // 'Robert is cool...'
     *
     *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14, '!!!'));
     *      // 'Robert is cool!!!'
     */
    public static truncate(text:string, length:number, indicator:string = '...'):string
    {
        if (text.length <= length)
        {
            return text;
        }
        else
        {
            return text.substr(0, length) + indicator;
        }
    }

    /**
     * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
     *
     * @method format
     * @returns {string}
     * @param str {string}
     * @param ...rest {Array.<any>}
     * @public
     * @static
     * @example
     *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
     *      // 'Robert is cool. Very cool and smart!'
     */
    public static format(str:string, ...rest:Array<any>):string
    {
        const length = rest.length;
        let value:string = str;
        for (let i:number = 0; i < length; i++)
        {
            let reg = new RegExp('\\{' + i + '\\}', 'gm');
            value = value.replace(reg, rest[i]);
        }

        return value;
    }

    /**
     * Updates a value in the query string by its key name.
     *
     * @method paramReplace
     * @param queryString
     * @param name
     * @param value
     * @returns {string|void}
     * @example
     *      StringUtil.paramReplace('?name=Robert&age=23&gender=male', 'gender', 'female');
     *      // '?name=Robert&age=23&gender=female'
     */
    public static paramReplace(queryString, name, value)
    {
        // Find the param with regex
        // Grab the first character in the returned string (should be ? or &)
        // Replace our href string with our new value, passing on the name and delimiter
        const re = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const delimiter = re.exec(queryString)[0].charAt(0);
        return queryString.replace(re, delimiter + name + '=' + value);
    }
}

export default StringUtil;