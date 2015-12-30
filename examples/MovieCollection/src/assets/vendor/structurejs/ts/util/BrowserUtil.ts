import EventDispatcher from '../event/EventDispatcher';
import BaseEvent from '../event/BaseEvent';
import Util from '../util/Util';

/**
 * A helper class to detect OS and browsers.
 *
 * @class BrowserUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class BrowserUtil
{
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    private static _eventDispatcher:EventDispatcher = new EventDispatcher();

    /**
     * A reference to the browser window object.
     *
     * @property _window
     * @type {Window}
     * @private
     * @static
     */
    private static _window:Window = window;

    /**
     * A reference to the getComputedStyle method.
     *
     * @property _styleDeclaration
     * @type {any}
     * @private
     * @static
     */
    private static _styleDeclaration:any = window.getComputedStyle(document.querySelector('body'), ':after');

    /**
     * TODO: YUIDoc_comment
     *
     * @property _onBreakpointChangeHandler
     * @type {any}
     * @private
     * @static
     */
    private static _onBreakpointChangeHandler:any = null;

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
    public static debounceDelay:number = 250;

    /**
     * The isEnabled property is used to keep track of the enabled state of listening for Breakpoint changes.
     *
     * @property isEnabled
     * @type {boolean}
     * @public
     * @static
     */
    public static isEnabled:boolean = false;

    constructor()
    {
        throw new Error('[BrowserUtil] Do not instantiate the BrowserUtil class because it is a static class.');
    }

    /**
     * Dispatches a breakpoint event.
     *
     * @method enable
     * @public
     * @static
     */
    public static enable():void
    {
        if (BrowserUtil.isEnabled === true)
        {
            return;
        }

        BrowserUtil._onBreakpointChangeHandler = Util.debounce(BrowserUtil._onBreakpointChange, BrowserUtil.debounceDelay, false, BrowserUtil);
        BrowserUtil._window.addEventListener('resize', BrowserUtil._onBreakpointChangeHandler);

        BrowserUtil.isEnabled = true;
    }

    /**
     * @overridden EventDispatcher.disable
     */
    public static disable():void
    {
        if (BrowserUtil.isEnabled === false)
        {
            return;
        }

        BrowserUtil._window.removeEventListener('resize', BrowserUtil._onBreakpointChangeHandler);

        BrowserUtil.isEnabled = false;
    }

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
    public static browserName():string
    {
        return BrowserUtil.getBrowser()[0];
    }

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
    public static browserVersion(majorVersion:boolean = true):any
    {
        const version:string = BrowserUtil.getBrowser()[1];

        if (majorVersion === true)
        {
            return parseInt(version, 10);
        }
        else
        {
            return version;
        }
    }

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
    public static getBrowser():Array<string>
    {
        const N = navigator.appName;
        const ua = navigator.userAgent;
        const tem = ua.match(/version\/([\.\d]+)/i);
        let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

        if (M && tem != null)
        {
            M[2] = tem[1];
        }

        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];

        return M;
    }

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
    public static isAndroid():boolean
    {
        return !!navigator.userAgent.match(/Android/i);
    }

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
    public static isBlackBerry():boolean
    {
        return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
    }

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
    public static isIOS():boolean
    {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

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
    public static isOperaMini():boolean
    {
        return !!navigator.userAgent.match(/Opera Mini/i);
    }

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
    public static isIEMobile():boolean
    {
        return !!navigator.userAgent.match(/IEMobile/i);
    }

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
    public static isMobile():boolean
    {
        return (BrowserUtil.isAndroid() || BrowserUtil.isBlackBerry() || BrowserUtil.isIOS() || BrowserUtil.isOperaMini() || BrowserUtil.isIEMobile());
    }

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
    public static hasBrowserHistory():boolean
    {
        return !!(window.history && history.pushState);
    }

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
    public static hasLocalStorage():boolean
    {
        try
        {
            return ('localStorage' in window) && window.localStorage !== null;
        }
        catch (error)
        {
            return false;
        }
    }

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
    public static hasSessionStorage():boolean
    {
        try
        {
            return ('sessionStorage' in window) && window.sessionStorage !== null;
        }
        catch (error)
        {
            return false;
        }
    }

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
    public static getBreakpoint()
    {
        return BrowserUtil._styleDeclaration.getPropertyValue('content').replace(/["']/g, '');
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method addEventListener
     * @public
     * @static
     */
    public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void
    {
        BrowserUtil._eventDispatcher.addEventListener(type, callback, scope, priority);
        BrowserUtil.enable();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method removeEventListener
     * @public
     * @static
     */
    public static removeEventListener(type:string, callback:Function, scope:any):void
    {
        BrowserUtil._eventDispatcher.removeEventListener(type, callback, scope);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method dispatchEvent
     * @public
     * @static
     */
    public static dispatchEvent(type:any, data:any = null):void
    {
        let event:any = type;

        if (typeof event === 'string')
        {
            event = new BaseEvent(type, false, false, data);
        }

        event.target = BrowserUtil;
        event.currentTarget = BrowserUtil;

        BrowserUtil._eventDispatcher.dispatchEvent(event);
    }

    /**
     * Dispatches a breakpoint event.
     *
     * @method _onBreakpointChange
     * @private
     * @static
     */
    private static _onBreakpointChange(event)
    {
        BrowserUtil.dispatchEvent(new BaseEvent(BaseEvent.RESIZE, true, false, BrowserUtil.getBreakpoint()));
    }

}

export default BrowserUtil;
