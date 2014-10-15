/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.BrowserUtil = factory();
    }
}(this, function() {
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
}));