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
define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Route = (function () {
        function Route(path, callback, scope) {
            /**
             * @property path
             * @type String
             */
            this.path = '';
            /**
             * @property regex
             * @type RegExp
             */
            this.regex = null;
            /**
             * YUIDoc_comment
             *
             * @property callback
             * @type {Function}
             * @public
             */
            this.callback = null;
            /**
             * YUIDoc_comment
             *
             * @property callbackScope
             * @type {any}
             * @public
             */
            this.callbackScope = null;
            this.path = path;
            this.regex = this.pathToRegexp(path);
            this.callback = callback;
            this.callbackScope = scope;
        }
        /**
         * Convert path to regexp
         *
         * @type Function
         * @param {String} path
         * @returns {RegExp}
         * @private
         */
        Route.prototype.pathToRegexp = function (path) {
            var findFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g');
            var findOptionalColons = new RegExp(':([^:]*):', 'g');
            var findRequiredBrackets = new RegExp('{([^}]+)}', 'g');
            var optionalFirstCharSlash = '^/?';
            var optionalLastCharSlash = '/?$';

            // Remove first and last forward slash.
            path = path.replace(findFirstOrLastForwardSlash, '');

            // Convert the wild card * be a regex .* to select all.
            path = path.replace('*', '(.*)');

            // Matches and query strings.
            path = path.replace('?', '(\\?.*)');

            // Make any :alphanumeric: optional but not query string
            path = path.replace(findOptionalColons, '?([^/?]*)');

            // Make any {alphanumeric} required but not query string
            path = path.replace(findRequiredBrackets, '([^/?]+)');

            return new RegExp(optionalFirstCharSlash + path + optionalLastCharSlash, 'i');
        };

        /**
         * Determine if route matches `path`
         *
         * @method match
         * @param {String} path
         * @returns {Boolean}
         */
        Route.prototype.match = function (path) {
            return path.match(this.regex);
        };
        return Route;
    })();

    module.exports = Route;

});
