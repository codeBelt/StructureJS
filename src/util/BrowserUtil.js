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
    * The BrowserUtil...
    *
    * @class BrowserUtil
    * @module StructureJS
    * @submodule util
    * @constructor
    * @author Robert S. (www.codeBelt.com)
    */
    var BrowserUtil = (function () {
        function BrowserUtil() {
        }
        /**
        * YUIDoc_comment
        *
        * @method browserName
        * @return {string}
        * @public
        * @static
        */
        BrowserUtil.browserName = function () {
            return BrowserUtil.getBrowser()[0];
        };

        /**
        * YUIDoc_comment
        *
        * @method browserVersion
        * @param [majorVersion=true0 {boolean}
        * @return {number|string}
        * @public
        * @static
        */
        BrowserUtil.browserVersion = function (majorVersion) {
            if (typeof majorVersion === "undefined") { majorVersion = true; }
            var version = BrowserUtil.getBrowser()[1];

            if (majorVersion === true) {
                return parseInt(version, 10);
            } else {
                return version;
            }
        };

        /**
        * YUIDoc_comment
        *
        * @method getBrowser
        * @private
        * @return {Array.<string>}
        * @static
        */
        BrowserUtil.getBrowser = function () {
            var N = navigator.appName, ua = navigator.userAgent, tem;
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null)
                M[2] = tem[1];
            M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

            return M;
        };

        /**
        * YUIDoc_comment
        *
        * @method hasBrowserHistory
        * @returns {boolean}
        * @public
        * @static
        */
        BrowserUtil.hasBrowserHistory = function () {
            return !!(window.history && history.pushState);
        };

        /**
        * YUIDoc_comment
        *
        * @method hasLocalStorage
        * @returns {boolean}
        * @public
        * @static
        */
        BrowserUtil.hasLocalStorage = function () {
            try  {
                return ('localStorage' in window) && window.localStorage !== null;
            } catch (error) {
                return false;
            }
        };

        /**
        * YUIDoc_comment
        *
        * @method hasSessionStorage
        * @returns {boolean}
        * @public
        * @static
        */
        BrowserUtil.hasSessionStorage = function () {
            try  {
                return ('sessionStorage' in window) && window.sessionStorage !== null;
            } catch (error) {
                return false;
            }
        };
        return BrowserUtil;
    })();

    
    return BrowserUtil;
});
