/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../event/EventDispatcher', '../event/BaseEvent', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../event/EventDispatcher'), require('../event/BaseEvent'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.BrowserUtil = factory(root.structurejs.EventDispatcher, root.structurejs.BaseEvent, root.structurejs.Util);
    }
}(this, function(EventDispatcher, BaseEvent, Util) {
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
            throw new Error('[BrowserUtil] Do not instantiate the BrowserUtil class because it is a static class.');
        }
        /**
         * Dispatches a breakpoint event.
         *
         * @method enable
         * @public
         * @static
         */
        BrowserUtil.enable = function () {
            if (BrowserUtil.isEnabled === true) {
                return;
            }
            BrowserUtil._onBreakpointChangeHandler = Util.debounce(BrowserUtil._onBreakpointChange, BrowserUtil.debounceDelay, false, BrowserUtil);
            BrowserUtil._window.addEventListener('resize', BrowserUtil._onBreakpointChangeHandler);
            BrowserUtil.isEnabled = true;
        };
        /**
         * @overridden EventDispatcher.disable
         */
        BrowserUtil.disable = function () {
            if (BrowserUtil.isEnabled === false) {
                return;
            }
            BrowserUtil._window.removeEventListener('resize', BrowserUtil._onBreakpointChangeHandler);
            BrowserUtil.isEnabled = false;
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
        BrowserUtil.browserName = function () {
            return BrowserUtil.getBrowser()[0];
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
        BrowserUtil.browserVersion = function (majorVersion) {
            if (majorVersion === void 0) { majorVersion = true; }
            var version = BrowserUtil.getBrowser()[1];
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
        BrowserUtil.getBrowser = function () {
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
         * @example
         *      BrowserUtil.isBlackBerry();
         *      // false
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
         * @example
         *      BrowserUtil.isIOS();
         *      // false
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
         * @example
         *      BrowserUtil.isOperaMini();
         *      // false
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
         * @example
         *      BrowserUtil.isIEMobile();
         *      // false
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
         * @example
         *      BrowserUtil.isMobile();
         *      // false
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
         * @example
         *      BrowserUtil.hasBrowserHistory();
         *      // true
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
         * @example
         *      BrowserUtil.hasLocalStorage();
         *      // true
         */
        BrowserUtil.hasLocalStorage = function () {
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
        BrowserUtil.hasSessionStorage = function () {
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
        BrowserUtil.getBreakpoint = function () {
            return BrowserUtil._window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/"/g, '');
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method addEventListener
         * @public
         * @static
         */
        BrowserUtil.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            BrowserUtil._eventDispatcher.addEventListener(type, callback, scope, priority);
            BrowserUtil.enable();
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method removeEventListener
         * @public
         * @static
         */
        BrowserUtil.removeEventListener = function (type, callback, scope) {
            BrowserUtil._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method dispatchEvent
         * @public
         * @static
         */
        BrowserUtil.dispatchEvent = function (type, data) {
            if (data === void 0) { data = null; }
            var event = type;
            if (typeof event === 'string') {
                event = new BaseEvent(type, false, false, data);
            }
            event.target = BrowserUtil;
            event.currentTarget = BrowserUtil;
            BrowserUtil._eventDispatcher.dispatchEvent(event);
        };
        /**
         * Dispatches a breakpoint event.
         *
         * @method _onBreakpointChange
         * @private
         * @static
         */
        BrowserUtil._onBreakpointChange = function (event) {
            BrowserUtil.dispatchEvent(new BaseEvent(BaseEvent.RESIZE, true, false, BrowserUtil.getBreakpoint()));
        };
        /**
         * A reference to the EventDispatcher object.
         *
         * @property _eventDispatcher
         * @type {EventDispatcher}
         * @private
         * @static
         */
        BrowserUtil._eventDispatcher = new EventDispatcher();
        /**
         * A reference to the browser window object.
         *
         * @property _window
         * @type {Window}
         * @private
         * @static
         */
        BrowserUtil._window = window;
        /**
         * TODO: YUIDoc_comment
         *
         * @property _onBreakpointChangeHandler
         * @type {any}
         * @private
         * @static
         */
        BrowserUtil._onBreakpointChangeHandler = null;
        /**
         * The delay in milliseconds for the Util.{{#crossLink "Util/debounce:method"}}{{/crossLink}} method that dispatches
         * the BaseEvent.RESIZE event to get the your browser breakpoints. See {{#crossLink "BrowserUtil/getBreakpoint:method"}}{{/crossLink}}.
         *
         * @property debounceDelay
         * @type {number}
         * @default 250
         * @public
         * @static
         */
        BrowserUtil.debounceDelay = 250;
        /**
         * TODO: YUIDoc_comment
         *
         * @property isEnabled
         * @type {boolean}
         * @public
         * @static
         */
        BrowserUtil.isEnabled = false;
        return BrowserUtil;
    })();

    return BrowserUtil;
}));