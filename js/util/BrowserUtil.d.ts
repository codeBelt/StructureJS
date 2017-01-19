/**
 * A helper class to detect OS and browsers.
 *
 * @class BrowserUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class BrowserUtil {
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    private static _eventDispatcher;
    /**
     * A reference to the browser window object.
     *
     * @property _window
     * @type {Window}
     * @private
     * @static
     */
    private static _window;
    /**
     * A reference to the getComputedStyle method.
     *
     * @property _styleDeclaration
     * @type {any}
     * @private
     * @static
     */
    private static _styleDeclaration;
    /**
     * TODO: YUIDoc_comment
     *
     * @property _onBreakpointChangeHandler
     * @type {any}
     * @private
     * @static
     */
    private static _onBreakpointChangeHandler;
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
    static debounceDelay: number;
    /**
     * The isEnabled property is used to keep track of the enabled state of listening for Breakpoint changes.
     *
     * @property isEnabled
     * @type {boolean}
     * @public
     * @static
     */
    static isEnabled: boolean;
    constructor();
    /**
     * Dispatches a breakpoint event.
     *
     * @method enable
     * @public
     * @static
     */
    static enable(): void;
    /**
     * @overridden EventDispatcher.disable
     */
    static disable(): void;
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
    static browserName(): string;
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
    static browserVersion(majorVersion?: boolean): any;
    /**
     * Gets the browser name a user agent.
     *
     * @method getBrowser
     * @public
     * @return {Array.<string>}
     * @static
     * @example
     *      BrowserUtil.getBrowser();
     *      // ["Chrome", "39.0.2171.99"]
     */
    static getBrowser(): Array<string>;
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
    static isAndroid(): boolean;
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
    static isBlackBerry(): boolean;
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
    static isIOS(): boolean;
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
    static isOperaMini(): boolean;
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
    static isIEMobile(): boolean;
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
    static isMobile(): boolean;
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
    static hasBrowserHistory(): boolean;
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
    static hasLocalStorage(): boolean;
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
    static hasSessionStorage(): boolean;
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
     *      body:after {
     *          content: 'screen_lg';  width: 1px; height: 1px; padding: 0; margin: -1px; border: 0; position: absolute; clip: rect(0 0 0 0); overflow: hidden;
     *      }
     *      // screen_sm.css
     *      body:after {
     *          content: 'screen_sm';  width: 1px; height: 1px; padding: 0; margin: -1px; border: 0; position: absolute; clip: rect(0 0 0 0); overflow: hidden;
     *      }
     *
     *      BrowserUtil.getBreakpoint();
     *      // 'screen_lg'
     *
     *      // Add a listener to get notified when the browser is resized:
     *      BrowserUtil.addEventListener(BaseEvent.RESIZE, this._onBreakpointChange, this);
     *      ...
     *      _onBreakpointChange(baseEvent) {
     *          console.log(baseEvent.data);
     *          // 'screen_sm'
     *      }
     */
    static getBreakpoint(): any;
    /**
     * TODO: YUIDoc_comment
     *
     * @method addEventListener
     * @public
     * @static
     */
    static addEventListener(type: string, callback: Function, scope: any, priority?: number): void;
    /**
     * TODO: YUIDoc_comment
     *
     * @method removeEventListener
     * @public
     * @static
     */
    static removeEventListener(type: string, callback: Function, scope: any): void;
    /**
     * TODO: YUIDoc_comment
     *
     * @method dispatchEvent
     * @public
     * @static
     */
    static dispatchEvent(type: any, data?: any): void;
    /**
     * Dispatches a breakpoint event.
     *
     * @method _onBreakpointChange
     * @private
     * @static
     */
    private static _onBreakpointChange(event);
}
export default BrowserUtil;
