/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class StringUtil
{
    constructor()
    {
    }

    /**
     * YUIDoc_comment
     *
     * @method getExtension
     * @param filename {string}
     * @returns {string}
     * @public
     * @static
     */
    public static getExtension(filename:string):string
    {
        return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
    }

    /**
     * YUIDoc_comment
     *
     * @method hyphenToCamelCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     */
    public static hyphenToCamelCase(str:string):string
    {
        str = str.toLowerCase();

        return str.replace(/-([a-z])/g, function (g)
        {
            return g[1].toUpperCase();
        });
    }

    /**
     * YUIDoc_comment
     *
     * @method hyphenToPascalCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     */
    public static hyphenToPascalCase(str:string):string
    {
        str = str.toLowerCase();

        // This is causing an issue with TS 0.9.5 so committing it out for now.
        /*            return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated)
         {
         return hyphenated.toUpperCase();
         });*/

        return null;
    }

    /**
     * YUIDoc_comment
     *
     * @method camelCaseToHyphen
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     */
    public static camelCaseToHyphen(str:string):string
    {
        return str.replace(/([a-z][A-Z])/g, function (g)
        {
            return g[0] + '-' + g[1].toLowerCase()
        });
    }

    /**
     * YUIDoc_comment
     *
     * @method createUUID
     * @returns {string}
     * @public
     * @static
     */
    public static createUUID():string
    {
        var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c)
        {
            var r = Math.random() * 16 | 0;
            var v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return uuid;
    }

    /**
     * YUIDoc_comment
     *
     * @method queryStringToObject
     * @param queryString {string}
     * @returns {Object|Null}
     * @public
     * @static
     */
    public static queryStringToObject(queryString:string):any
    {
        var params:any = {};
        var temp:any = null;

        queryString = queryString.substring( queryString.indexOf('?') + 1 );

        if (queryString === '') {
            return null;
        }

        // Split into key/value pairs
        var queries = queryString.split("&");

        // Convert the array of strings into an object
        var len:number = queries.length;
        for (var i = 0; i < len; i++)
        {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    }

    /**
     * Remove all whitespace from the string passed in.
     * @example
     var str = "   a b    c d e f g ";
     StringUtil.removeAllWhitespace(str);
     // "abcdefg"
     * @method removeAllWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     */
    public static removeAllWhitespace(str:string):string
    {
        return str.replace(/\s+/g, '');
    }

    /**
     * Remove leading and trailing whitespace.
     * @example
     *      var str = "   a b    c d e f g ";
     *      StringUtil.removeLeadingTrailingWhitespace(str);
     *      // "a b    c d e f g"
     *
     * @method removeLeadingTrailingWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
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
     * @returns {string}
     * @public
     * @static
     */
    public static truncate(text:string, length:number):string
    {
        if (text.length <= length)
        {
            return text;
        }
        else
        {
            return text.substr(0, length) + "...";
        }
    }

    /**
     * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
     * @example
     *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
     *      // 'Robert is cool. Very cool and smart!'
     *
     * @method format
     * @returns {string}
     * @param str {string}
     * @param ...rest {Array}
     * @public
     * @static
     */
    public static format(str:string, ...rest:any[]):string
    {
        var length = rest.length;
        for (var i:number = 0; i < length; i++)
        {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, rest[i]);
        }

        return str;
    }

    // Update the appropriate href query string parameter //TODO:test
    public static paramReplace(queryString, name, value) {
        // Find the param with regex
        // Grab the first character in the returned string (should be ? or &)
        // Replace our href string with our new value, passing on the name and delimiter
        var re = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var delimiter = re.exec(queryString)[0].charAt(0);
        return queryString.replace(re, delimiter + name + "=" + value);
    }

}

export = StringUtil;