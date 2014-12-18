
/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureTS
{
    export class StringUtil
    {
        constructor()
        {
            throw new Error('[StringUtil] Do not instantiation the StringUtil class because it is a static class.');
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
            var num:number = (withDot === true) ? 0 : 1;
            return filename.slice(filename.lastIndexOf('.') + num, filename.length);
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
         *      StringUtil.toCamelCase("TO-camel-CASE");
         *      // 'toCamelCase'
         */
        public static toCamelCase(str:string):string
        {
            // Replace special characters with a space
            str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
            // put a space before an uppercase letter
            str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
            // Lower case first character and some other stuff
            str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
            // uppercase characters preceded by a space or number
            str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function(a,b,c) {
                return b.trim() + c.toUpperCase();
            });
            return str;
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
         *      StringUtil.toPascalCase("to-pascal_case");
         *      // 'toPascalCase'
         */
        public static toPascalCase(str:string):string
        {
            // Replace special characters with a space
            str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
            // put a space before an uppercase letter
            str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
            // Lower case first character and some other stuff
            str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
            // uppercase characters preceded by a space or number
            str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
                return b.trim() + c.toUpperCase();
            });
            // Make first character uppercase.
            str = str.replace(/^[a-zA-Z]/, function (a, b, c) {
                return a.toUpperCase();
            });
            return str;
        }

        /**
         * Converts a string to a hyphen case string.
         *
         * @method toHyphen
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.toHyphen("hyphenToCamelCase");
         *      // 'hyphen-to-camel-case'
         */
        public static toHyphen(str:string):string
        {
            // Replace special characters with a space
            str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
            // Remove leading and trailing whitespace.
            str = str.replace(/(^\s+|\s+$)/g, '');
            // put a space before an uppercase letter
            str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
            // Replace spacing with hyphen and make all characters lowercase.
            str = str.replace(/\s+/g, '-').toLowerCase();
            return str;
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
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c)
            {
                var r = Math.random() * 16 | 0;
                var v = (c == 'x') ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            return uuid;
        }

        /**
         * Converts a query string to an object.
         *
         * @method queryStringToObject
         * @param queryString {string}
         * @param [useParseFloat=true] {boolean}
         * @returns {Object|Null}
         * @public
         * @static
         * @example
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
         *      // {name: 'Robert', age: 23, gender: 'male'}
         *
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', false);
         *      // {name: 'Robert', age: '23', gender: 'male'}
         */
        public static queryStringToObject(queryString:string, useParseFloat:boolean = true):any
        {
            var params:any = {};
            var temp:any = null;

            var str:string = queryString.substring(queryString.indexOf('?') + 1);

            if (str === '')
            {
                return null;
            }

            // Split into key/value pairs
            var queries = str.split('&');

            // Convert the array of strings into an object
            var len:number = queries.length;
            for (var i = 0; i < len; i++)
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
         *      var str = '   a b    c d e f g ';
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
         *      var str = '   a b    c d e f g ';
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
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
         *      // 'Robert is cool...'
         */
        public static truncate(text:string, length:number):string
        {
            if (text.length <= length)
            {
                return text;
            }
            else
            {
                return text.substr(0, length) + '...';
            }
        }

        /**
         * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.

         * @method format
         * @returns {string}
         * @param str {string}
         * @param ...rest {Array}
         * @public
         * @static
         * @example
         *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
         *      // 'Robert is cool. Very cool and smart!'
         */
        public static format(str:string, ...rest:any[]):string
        {
            var length = rest.length;
            var value:string = str;
            for (var i:number = 0; i < length; i++)
            {
                var reg = new RegExp('\\{' + i + '\\}', 'gm');
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
            var re = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var delimiter = re.exec(queryString)[0].charAt(0);
            return queryString.replace(re, delimiter + name + '=' + value);
        }
    }
}