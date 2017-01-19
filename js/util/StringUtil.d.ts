/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class StringUtil {
    constructor();
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
    static getExtension(filename: string, withDot?: boolean): string;
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
    static toSentence(str: string, separator?: string): string;
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
    static toCamelCase(str: string): string;
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
    static toPascalCase(str: string): string;
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
    static toConstantCase(str: string): string;
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
    static createUUID(): string;
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
    static queryStringToObject(queryString: string, useParseFloat?: boolean): any;
    /**
     * Converts a query string to an object.
     *
     * @method toQueryString
     * @param obj {Object}
     * @public
     * @static
     * @example
     *      StringUtil.toQueryString({name: 'Robert', age: '23', gender: 'male'});
     *      // name=Robert&age=23&gender=male'
     */
    static toQueryString(obj: any): string;
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
    static removeAllWhitespace(str: string): string;
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
    static removeLeadingTrailingWhitespace(str: string): string;
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
    static truncate(text: string, length: number, indicator?: string): string;
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
    static format(str: string, ...rest: Array<any>): string;
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
    static paramReplace(queryString: any, name: any, value: any): any;
}
export default StringUtil;
