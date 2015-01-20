///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/BaseEvent.ts'/>
///<reference path='../util/Util.ts'/>

/**
 * A helper class to detect OS and browsers.
 *
 * @class BrowserUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureTS
{
    export class BrowserUtil extends EventDispatcher
    {
        /**
         * The delay in milliseconds for the Util.{{#crossLink "Util/debounce:method"}}{{/crossLink}} method that dispatches
         * the BaseEvent.RESIZE event to get the your browser breakpoints. See {{#crossLink "BrowserUtil/getBreakpoint:method"}}{{/crossLink}}.
         *
         * @property debounceDelay
         * @type {number}
         * @default 250
         * @public
         */
        public debounceDelay:number = 250;

        /**
         * A reference to the browser window object.
         *
         * @property _window
         * @type {Window}
         * @private
         */
        private _window:Window = window;

        /**
         * TODO: YUIDoc_comment
         *
         * @property _onBreakpointChangeHandler
         * @type {any}
         * @private
         */
        private _onBreakpointChangeHandler:any = null;

        constructor()
        {
            super();

            this.enable();
        }

        /**
         * @overridden EventDispatcher.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this._onBreakpointChangeHandler = Util.debounce(this.onBreakpointChange, this.debounceDelay, false, this);
            this._window.addEventListener('resize', this._onBreakpointChangeHandler);

            super.enable();
        }

        /**
         * @overridden EventDispatcher.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this._window.removeEventListener('resize', this._onBreakpointChangeHandler);

            super.disable();
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
        public browserName():string
        {
            return this.getBrowser()[0];
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
        public browserVersion(majorVersion:boolean = true):any
        {
            var version:string = this.getBrowser()[1];

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
         * @private
         * @return {Array.<string>}
         * @static
         * @example
         *      BrowserUtil.getBrowser();
         *      // ["Chrome", "39.0.2171.99"]
         */
        private getBrowser():string[]
        {
            var N = navigator.appName;
            var ua = navigator.userAgent;
            var tem = ua.match(/version\/([\.\d]+)/i);
            var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);

            if (M && tem != null)
            {
                M[2] = tem[1];
            }
            else {
                M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
            }

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
        public isAndroid():boolean
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
        public isBlackBerry():boolean
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
        public isIOS():boolean
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
        public isOperaMini():boolean
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
        public isIEMobile():boolean
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
        public isMobile():boolean
        {
            return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOperaMini() || this.isIEMobile());
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
        public hasBrowserHistory():boolean
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
        public hasLocalStorage():boolean
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
        public hasSessionStorage():boolean
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
        public getBreakpoint()
        {
            return this._window.getComputedStyle(
                document.querySelector('body'), ':after'
            ).getPropertyValue('content').replace(/"/g, '');
        }

        /**
         * Dispatches a breakpoint event.
         *
         * @method _onBreakpointChange
         * @private
         */
        private onBreakpointChange(event)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.RESIZE, true, false, this.getBreakpoint()));
        }

    }
}