define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    /**
     * The StringUtil...
     *
     * @class StringUtil
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @static
     **/
    var StringUtil = (function () {

        function StringUtil() {
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
        StringUtil.getExtension = function (filename) {
            return filename.slice(filename.lastIndexOf(".") + 1, filename.length);
        };

        /**
         * YUIDoc_comment
         *
         * @method hyphenToCamelCase
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         */
        StringUtil.hyphenToCamelCase = function (str) {
            str = str.toLowerCase();

            return str.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
            });
        };

        /**
         * YUIDoc_comment
         *
         * @method hyphenToPascalCase
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         */
        StringUtil.hyphenToPascalCase = function (str) {
            str = str.toLowerCase();

            // This is causing an issue with TS 0.9.5 so committing it out for now.
            /*            return str.replace(/(\-|^)([a-z])/gi, function (match, delimiter, hyphenated)
             {
             return hyphenated.toUpperCase();
             });*/
            return null;
        };

        /**
         * YUIDoc_comment
         *
         * @method camelCaseToHyphen
         * @param str {string}
         * @returns {string}
         * @public
         * @static
         */
        StringUtil.camelCaseToHyphen = function (str) {
            return str.replace(/([a-z][A-Z])/g, function (g) {
                return g[0] + '-' + g[1].toLowerCase();
            });
        };

        /**
         * YUIDoc_comment
         *
         * @method createUUID
         * @returns {string}
         * @public
         * @static
         */
        StringUtil.createUUID = function () {
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = (c == 'x') ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });

            return uuid;
        };

        /**
         * YUIDoc_comment
         *
         * @method queryStringToObject
         * @param queryString {string}
         * @returns {any}
         * @public
         * @static
         */
        StringUtil.queryStringToObject = function (queryString) {
            var params = {};
            var temp = null;

            // Split into key/value pairs
            var queries = queryString.substring(1).split("&");

            // Convert the array of strings into an object
            var len = queries.length;
            for (var i = 0; i < len; i++) {
                temp = queries[i].split('=');
                params[temp[0]] = temp[1];
            }

            return params;
        };

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
        StringUtil.removeAllWhitespace = function (str) {
            return str.replace(/\s+/g, '');
        };

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
        StringUtil.removeLeadingTrailingWhitespace = function (str) {
            return str.replace(/(^\s+|\s+$)/g, '');
        };

        /**
         *
         * @method truncate
         * @param text {string}
         * @param length {int}
         * @returns {string}
         * @public
         * @static
         */
        StringUtil.truncate = function (text, length) {
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + "...";
            }
        };

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
        StringUtil.format = function (str) {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                rest[_i] = arguments[_i + 1];
            }
            var length = rest.length;
            for (var i = 0; i < length; i++) {
                var reg = new RegExp("\\{" + i + "\\}", "gm");
                str = str.replace(reg, rest[i]);
            }

            return str;
        };
        return StringUtil;
    })();

    module.exports = StringUtil;

});