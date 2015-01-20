/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher', '../event/BaseEvent', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'), require('../event/BaseEvent'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.BrowserUtil = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.BaseEvent, root.structurejs.Util);
    }
}(this, function(Extend, EventDispatcher, BaseEvent, Util) {
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

        var _super = Extend(BrowserUtil, EventDispatcher);

        function BrowserUtil() {
            _super.call(this);
            /**
             * The delay in milliseconds for the Util.{{#crossLink "Util/debounce:method"}}{{/crossLink}} method that dispatches
             * the BaseEvent.RESIZE event to get the your browser breakpoints. See {{#crossLink "BrowserUtil/getBreakpoint:method"}}{{/crossLink}}.
             *
             * @property debounceDelay
             * @type {number}
             * @default 250
             * @public
             */
            this.debounceDelay = 250;
            /**
             * A reference to the browser window object.
             *
             * @property _window
             * @type {Window}
             * @private
             */
            this._window = window;
            /**
             * TODO: YUIDoc_comment
             *
             * @property _onBreakpointChangeHandler
             * @type {any}
             * @private
             */
            this._onBreakpointChangeHandler = null;
            this.enable();
        }
        /**
         * @overridden EventDispatcher.enable
         */
        BrowserUtil.prototype.enable = function () {
            if (this.isEnabled === true)
                return;
            this._onBreakpointChangeHandler = Util.debounce(this.onBreakpointChange, this.debounceDelay, false, this);
            this._window.addEventListener('resize', this._onBreakpointChangeHandler);
            _super.prototype.enable.call(this);
        };
        /**
         * @overridden EventDispatcher.disable
         */
        BrowserUtil.prototype.disable = function () {
            if (this.isEnabled === false)
                return;
            this._window.removeEventListener('resize', this._onBreakpointChangeHandler);
            _super.prototype.disable.call(this);
        };
        /**
         * Returns the name of the browser.
         *
         * @method browserName
         * @return {string}
         * @public
         * @static
         * @example
         *      BrowserUtil.browserName();
         *      // 'Chrome'
         */
        BrowserUtil.prototype.browserName = function () {
            return this.getBrowser()[0];
        };
        /**
         * Returns the version of the browser.
         *
         * @method browserVersion
         * @param [majorVersion=true] {boolean}
         * @return {number|string}
         * @public
         * @static
         * @example
         *      BrowserUtil.browserVersion();
         *      // 39
         *
         *      BrowserUtil.browserVersion(false);
         *      // '39.0.2171.99'
         */
        BrowserUtil.prototype.browserVersion = function (majorVersion) {
            if (majorVersion === void 0) { majorVersion = true; }
            var version = this.getBrowser()[1];
            if (majorVersion === true) {
                return parseInt(version, 10);
            }
            else {
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
         * @example
         *      BrowserUtil.getBrowser();
         *      // ["Chrome", "39.0.2171.99"]
         */
        BrowserUtil.prototype.getBrowser = function () {
            var N = navigator.appName;
            var ua = navigator.userAgent;
            var tem = ua.match(/version\/([\.\d]+)/i);
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            if (M && tem != null) {
                M[2] = tem[1];
            }
            else {
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
         * @example
         *      BrowserUtil.isAndroid();
         *      // false
         */
        BrowserUtil.prototype.isAndroid = function () {
            return !!navigator.userAgent.match(/Android/i);
        };
        /**
         * Determines if the device OS is Android.
         *
         * @method isBlackBerry
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.isBlackBerry();
         *      // false
         */
        BrowserUtil.prototype.isBlackBerry = function () {
            return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
        };
        /**
         * Determines if the device OS is IOS.
         *
         * @method isIOS
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.isIOS();
         *      // false
         */
        BrowserUtil.prototype.isIOS = function () {
            return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
        };
        /**
         * Determines if the device OS is Opera Mini.
         *
         * @method isOperaMini
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.isOperaMini();
         *      // false
         */
        BrowserUtil.prototype.isOperaMini = function () {
            return !!navigator.userAgent.match(/Opera Mini/i);
        };
        /**
         * Determines if the device OS is IE Mobile.
         *
         * @method isIEMobile
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.isIEMobile();
         *      // false
         */
        BrowserUtil.prototype.isIEMobile = function () {
            return !!navigator.userAgent.match(/IEMobile/i);
        };
        /**
         * Determines if the it is run on a mobile or desktop device.
         *
         * @method isMobile
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.isMobile();
         *      // false
         */
        BrowserUtil.prototype.isMobile = function () {
            return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOperaMini() || this.isIEMobile());
        };
        /**
         * Determines if the browser can you Browser History push states.
         *
         * @method hasBrowserHistory
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.hasBrowserHistory();
         *      // true
         */
        BrowserUtil.prototype.hasBrowserHistory = function () {
            return !!(window.history && history.pushState);
        };
        /**
         * Determines if the browser can you Local Storage.
         *
         * @method hasLocalStorage
         * @returns {boolean}
         * @public
         * @static
         * @example
         *      BrowserUtil.hasLocalStorage();
         *      // true
         */
        BrowserUtil.prototype.hasLocalStorage = function () {
            try {
                return ('localStorage' in window) && window.localStorage !== null;
            }
            catch (error) {
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
         * @example
         *      BrowserUtil.hasSessionStorage();
         *      // true
         */
        BrowserUtil.prototype.hasSessionStorage = function () {
            try {
                return ('sessionStorage' in window) && window.sessionStorage !== null;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * Get the current breakpoint from the style sheets. You must add a body:after property with a specific content
         * in each of your style sheets for this functionality to work.
         *
         * @method getBreakpoint
         * @returns {string} The string value of the current style sheet.
         * @public
         * @static
         * @example
         *      // For each of your different style sheets add something like below:
         *      // screen_lg.css
         *      body:after { content: 'screen_lg'; }
         *      // screen_sm.css
         *      body:after { content: 'screen_sm'; }
         *
         *      BrowserUtil.getBreakpoint();
         *      // 'screen_lg'
         *
         *      // Add a listener to get notified when the browser is resized:
         *      BrowserUtil.addEventListener(BaseEvent.RESIZE, this._onBreakpointChange, this);
         *      ...
         *      ClassName.prototype._onBreakpointChange = function (baseEvent) {
         *          console.log(baseEvent.data);
         *          // 'screen_sm'
         *      };
         */
        BrowserUtil.prototype.getBreakpoint = function () {
            return this._window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/"/g, '');
        };
        /**
         * Dispatches a breakpoint event.
         *
         * @method _onBreakpointChange
         * @private
         */
        BrowserUtil.prototype.onBreakpointChange = function (event) {
            this.dispatchEvent(new BaseEvent(BaseEvent.RESIZE, true, false, this.getBreakpoint()));
        };
        return BrowserUtil;
    })();

    return new BrowserUtil();
}));