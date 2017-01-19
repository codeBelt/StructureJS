(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../event/ApplicationCacheEvent", "../event/EventDispatcher"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ApplicationCacheEvent_1 = require("../event/ApplicationCacheEvent");
    var EventDispatcher_1 = require("../event/EventDispatcher");
    /**
     * The ApplicationCacheService is a static class works with the window applicationCache object.
     *
     * @class ApplicationCacheService
     * @module StructureJS
     * @submodule controller
     * @requires ApplicationCacheEvent
     * @requires EventDispatcher
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var ApplicationCacheService = (function () {
        function ApplicationCacheService() {
            throw new Error('[ApplicationCacheService] Do not instantiate the ApplicationCacheService class because it is a static class.');
        }
        /**
         * @overridden BaseObject.enable
         */
        ApplicationCacheService.enable = function () {
            if (ApplicationCacheService._appCache == null || ApplicationCacheService.isEnabled === true) {
                return;
            }
            // Native Browser Event Listener
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.CACHED, this._onCached.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.CHECKING, this._onChecking.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.DOWNLOADING, this._onDownloading.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.NO_UPDATE, this._onNoUpdate.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.OBSOLETE, this._onObsolete.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.PROGRESS, this._onProgress.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.UPDATE_READY, this._onUpdateReady.bind(this), false);
            ApplicationCacheService._appCache.addEventListener(ApplicationCacheEvent_1.default.ERROR, this._onError.bind(this), false);
            ApplicationCacheService.isEnabled = true;
        };
        /**
         * @overridden BaseObject.disable
         */
        ApplicationCacheService.disable = function () {
            if (ApplicationCacheService._appCache == null || ApplicationCacheService.isEnabled === false) {
                return;
            }
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.CACHED, ApplicationCacheService._onCached.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.CHECKING, ApplicationCacheService._onChecking.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.DOWNLOADING, ApplicationCacheService._onDownloading.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.NO_UPDATE, ApplicationCacheService._onNoUpdate.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.OBSOLETE, ApplicationCacheService._onObsolete.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.PROGRESS, ApplicationCacheService._onProgress.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.UPDATE_READY, ApplicationCacheService._onUpdateReady.bind(this), false);
            ApplicationCacheService._appCache.removeEventListener(ApplicationCacheEvent_1.default.ERROR, ApplicationCacheService._onError.bind(this), false);
            ApplicationCacheService.isEnabled = true;
        };
        ApplicationCacheService.update = function () {
            ApplicationCacheService._appCache.update();
        };
        ApplicationCacheService.getStatus = function () {
            switch (ApplicationCacheService._appCache.status) {
                case ApplicationCacheService._appCache.UNCACHED:
                    return 'UNCACHED';
                case ApplicationCacheService._appCache.IDLE:
                    return 'IDLE';
                case ApplicationCacheService._appCache.CHECKING:
                    return 'CHECKING';
                case ApplicationCacheService._appCache.DOWNLOADING:
                    return 'DOWNLOADING';
                case ApplicationCacheService._appCache.UPDATEREADY:
                    return 'UPDATEREADY';
                case ApplicationCacheService._appCache.OBSOLETE:
                    return 'OBSOLETE';
                default:
                    return 'UKNOWN CACHE STATUS';
            }
        };
        /**
         * The resources listed in the manifest have been fully downloaded, and the application is
         * now cached locally.
         *
         * @method _onCached
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onCached = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CACHED, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.CACHED, false, false, event));
        };
        /**
         * The browser is checking for an update, or is attempting to download
         * the cache manifest for the first time. This is always the first event
         * in the sequence.
         *
         * @method _onChecking
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onChecking = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CHECKING, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.CHECKING, false, false, event));
        };
        /**
         * The browser has started to download the cache manifest, either for the
         * first time or because changes have been detected.
         *
         * @method _onDownloading
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onDownloading = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.DOWNLOADING, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.DOWNLOADING, false, false, event));
        };
        /**
         * An error occurred at some point - this could be caused by a number of things. This will
         * always be the last event in the sequence.
         *
         * @method _onError
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onError = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.ERROR, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.ERROR, false, false, event));
        };
        /**
         * The cache manifest hadn't changed.
         *
         * @method _onNoUpdate
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onNoUpdate = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.NO_UPDATE, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.NO_UPDATE, false, false, event));
        };
        /**
         * The cache manifest file could not be found, indicating that the cache is no longer needed.
         * The application cache is being deleted.
         *
         * @method _onObsolete
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onObsolete = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.OBSOLETE, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.OBSOLETE, false, false, event));
        };
        /**
         * The browser had downloaded and cached an asset. This is fired once for
         * every file that is downloaded (including the current page which is cached implicitly).
         *
         * @method _onProgress
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onProgress = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.PROGRESS, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.PROGRESS, false, false, event));
        };
        /**
         * The resources listed in the manifest have been newly re-downloaded, and the script can
         * use swapCache() to switch to the new cache.
         *
         * @method _onUpdateReady
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheService._onUpdateReady = function (event) {
            //console.log('[ApplicationCacheService]', 'ApplicationCacheEvent:',ApplicationCacheEvent.UPDATE_READY, event);
            ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent_1.default(ApplicationCacheEvent_1.default.UPDATE_READY, false, false, event));
        };
        /**
         * Registers an event listener object with an ApplicationCacheService object so that the listener receives notification of an event.
         *
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         * @example
         *      ApplicationCacheService.addEventListener(ApplicationCacheEvent.UPDATE_READY, this._handlerMethod, this);
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *      }
         */
        ApplicationCacheService.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            ApplicationCacheService._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
        /**
         * Removes a specified listener from the ApplicationCacheService object.
         *
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed. This was added because it was need for the {{#crossLink "ApplicationCacheService"}}{{/crossLink}} class.
         * To keep things consistent this parameter is required.
         * @static
         * @example
         *      ApplicationCacheService.removeEventListener(ApplicationCacheEvent.UPDATE_READY, this._handlerMethod, this);
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *      }
         */
        ApplicationCacheService.removeEventListener = function (type, callback, scope) {
            ApplicationCacheService._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * <p>Dispatches an event within the ApplicationCacheService object.</p>
         *
         * @method dispatchEvent
         * @param event {ApplicationCacheEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "ApplicationCacheEvent"}}{{/crossLink}}.
         * @static
         * @example
         *      let event = new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY);
         *      ApplicationCacheService.dispatchEvent(event);
         *
         *      // Here is a common inline event being dispatched
         *      ApplicationCacheService.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY));
         */
        ApplicationCacheService.dispatchEvent = function (event) {
            ApplicationCacheService._eventDispatcher.dispatchEvent(event);
        };
        return ApplicationCacheService;
    }());
    /**
     * A reference to the applicationCache property on the window object.
     *
     * @property _appCache
     * @type {ApplicationCache}
     * @private
     * @static
     */
    ApplicationCacheService._appCache = window.applicationCache;
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    ApplicationCacheService._eventDispatcher = new EventDispatcher_1.default();
    /**
     * The isEnabled property is used to keep track of the enabled state.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @public
     * @static
     */
    ApplicationCacheService.isEnabled = false;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ApplicationCacheService;
});
