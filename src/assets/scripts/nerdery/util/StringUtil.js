define(function(require, exports, module) {
    'use strict';

    var StringUtil = (function () {

        /**
         * The fully qualified class name of the object.
         *
         * @property CLASS_NAME
         * @type {string}
         * @final
         * @static
         */
        StringUtil.CLASS_NAME = 'StringUtil';

        /**
         * The StringUtil...
         *
         * @class StringUtil
         * @module StructureTS
         * @submodule util
         * @constructor
         * @static
         * @version 0.1.0
         **/
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
         * @returns {Object}
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
         *      var str = "   a b    c d e f g ";
         *      StringUtil.removeAllWhitespace(str);
         *      // "abcdefg"
         *
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

        return StringUtil;
    })();

    module.exports = StringUtil;

});