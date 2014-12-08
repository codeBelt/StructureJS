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
     * A helper class to detect OS and browsers.
     *
     * @class BrowserUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var BrowserUtil = (function () {
        function BrowserUtil() {
            throw new Error('[BrowserUtil] Do not instantiation the BrowserUtil class because it is a static class.');
        }
        /**
         * Returns the name of the browser.
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
         * Returns the version of the browser.
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
         * Gets the browser name a user agent.
         *
         * @method getBrowser
         * @private
         * @return {Array.<string>}
         * @static
         */
        BrowserUtil.getBrowser = function () {
            var N = navigator.appName;
            var ua = navigator.userAgent;
            var tem = ua.match(/version\/([\.\d]+)/i);
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

            if (M && tem != null) {
                M[2] = tem[1];
            } else {
                M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
            }

            return M;
        };

        /**
         * Determines if the device OS is Android.
         *
         * @method isAndroid
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isAndroid = function () {
            return !!navigator.userAgent.match(/Android/i);
        };

        /**
         * Determines if the device OS is Android.
         *
         * @method isBlackBerry
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isBlackBerry = function () {
            return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
        };

        /**
         * Determines if the device OS is IOS.
         *
         * @method isIOS
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isIOS = function () {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        };

        /**
         * Determines if the device OS is Opera Mini.
         *
         * @method isOperaMini
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isOperaMini = function () {
            return !!navigator.userAgent.match(/Opera Mini/i);
        };

        /**
         * Determines if the device OS is IE Mobile.
         *
         * @method isIEMobile
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isIEMobile = function () {
            return !!navigator.userAgent.match(/IEMobile/i);
        };

        /**
         * Determines if the it is run on a mobile or desktop device.
         *
         * @method isMobile
         * @returns {boolean}
         * @public
         * @static
         */
        BrowserUtil.isMobile = function () {
            return (BrowserUtil.isAndroid() || BrowserUtil.isBlackBerry() || BrowserUtil.isIOS() || BrowserUtil.isOperaMini() || BrowserUtil.isIEMobile());
        };

        /**
         * Determines if the browser can you Browser History push states.
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
         * Determines if the browser can you Local Storage.
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
         * Determines if the browser can you Session Storage.
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