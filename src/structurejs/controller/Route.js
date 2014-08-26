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

    /**
     * YUIDoc_comment
     *
     * @class Route
     * @constructor
     * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''
     * @param callback {Function} The function that should be executed when a request matches the routePattern.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     // Example of adding a route listener and the function callback below.
     *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
     *
     *     // The above route listener would match the below url:
     *     // www.site.com/#/games/asteroids/2/
     *
     *     // Notice the three parameters. This is because we have two patterns above.
     *     // The `{}` means it is required and `::` means it is optional for a route match.
     *     // The third parameter is the routeEvent and that is always last parameter.
     *     ClassName.prototype.onRouteHandler = function (gameName, level, routeEvent) {
    *         // gameName value would be 'asteroids'.
    *         // level value would be 2.
    *         // routeEvent value would be a RouteEvent object.
    *     }
     *
     * Route Pattern Options:
     * ----------------------
     * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
     *
     *     Router.add('/contact/:name:/', this.method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/contact/
     *     // www.site.com/#/contact/heather/
     *     // www.site.com/#/contact/john/
     *
     *
     * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
     *
     *     Router.add('/product/{productName}/', this.method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/product/shoes/
     *     // www.site.com/#/product/jackets/
     *
     *
     * **\*** The asterix character means it will match all or part of part the hash url.
     *
     *     Router.add('*', this.method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/anything/
     *     // www.site.com/#/matches/any/hash/url/
     *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
     *
     *
     * **?** The question mark character means it will match a query string for the hash url. One thing to point out is when a query string is matched it will **NOT** be passed as a parameter to the callback function. It will be converted to an
     *
     *     Router.add('?', this.method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/?one=1&two=2&three=3
     *     // www.site.com/#?one=1&two=2&three=3
     *
     *
     * **''** The empty string means it will match when there are no hash url.
     *
     *     Router.add('', this.method, this);
     *     Router.add('/', this.method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/
     *     // www.site.com/#/
     *
     *
     * Other possible combinations but not limited too:
     *
     *     Router.add('/games/{gameName}/:level:/', this.method1, this);
     *     Router.add('/{category}/blog/', this.method2, this);
     *     Router.add('/home/?', this.method3, this);
     *     Router.add('/about/*', this.method4, this);
     *
     */
    var Route = (function () {
        function Route(routePattern, callback, scope) {
            /**
             * The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, "". See below for examples.
             *
             * @property routePattern
             * @type String
             * @public
             */
            this.routePattern = '';
            /**
             * The regex representation for the routePattern that was passed into the constructor.
             *
             * @property regex
             * @type RegExp
             * @public
             * @readOnly
             */
            this.regex = null;
            /**
             * The function that should be executed when a request matches the routePattern. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callback
             * @type {Function}
             * @public
             */
            this.callback = null;
            /**
             * The scope of the callback function that should be executed. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callbackScope
             * @type {any}
             * @public
             */
            this.callbackScope = null;
            this.routePattern = routePattern;
            this.regex = this.routePatternToRegexp(routePattern);
            this.callback = callback;
            this.callbackScope = scope;
        }
        /**
         * Converts the routePattern that was passed into the constructor to a regexp object.
         *
         * @method routePatternToRegexp
         * @param {String} routePattern
         * @returns {RegExp}
         * @private
         */
        Route.prototype.routePatternToRegexp = function (routePattern) {
            var findFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g');
            var findOptionalColons = new RegExp(':([^:]*):', 'g');
            var findRequiredBrackets = new RegExp('{([^}]+)}', 'g');
            var optionalFirstCharSlash = '^/?';
            var optionalLastCharSlash = '/?$';

            // Remove first and last forward slash.
            routePattern = routePattern.replace(findFirstOrLastForwardSlash, '');

            // Convert the wild card * be a regex .* to select all.
            routePattern = routePattern.replace('*', '(.*)');

            // Matches and query strings.
            routePattern = routePattern.replace('?', '(\\?.*)');

            // Make any :alphanumeric: optional but not query string
            routePattern = routePattern.replace(findOptionalColons, '?([^/?]*)');

            // Make any {alphanumeric} required but not query string
            routePattern = routePattern.replace(findRequiredBrackets, '([^/?]+)');

            return new RegExp(optionalFirstCharSlash + routePattern + optionalLastCharSlash, 'i');
        };

        /**
         * Determine if a route matches a routePattern.
         *
         * @method match
         * @param route {String} The route or path to match against the routePattern that was passed into the constructor.
         * @returns {Array}
         * @example
         *     var route = new Route('/games/{gameName}/:level:/', this.method, this);
         *     console.log( route.match(/games/asteroids/2/) );
         */
        Route.prototype.match = function (route) {
            return route.match(this.regex);
        };
        return Route;
    })();

    module.exports = Route;

});
