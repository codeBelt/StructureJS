/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../event/ApplicationCacheEvent', '../event/EventDispatcher'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../event/ApplicationCacheEvent'), require('../event/EventDispatcher'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.ApplicationCacheController = factory(root.structurejs.ApplicationCacheEvent, root.structurejs.EventDispatcher);
    }
}(this, function(ApplicationCacheEvent, EventDispatcher) {
    'use strict';

    /**
     * The ApplicationCacheController...
     *
     * @class ApplicationCacheController
     * @module StructureJS
     * @submodule controller
     * @requires ApplicationCacheEvent
     * @requires EventDispatcher
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var ApplicationCacheController = (function () {
        function ApplicationCacheController() {
            throw new Error('[ApplicationCacheController] Do not instantiate the ApplicationCacheController class because it is a static class.');
        }
        /**
         * @overridden BaseObject.enable
         */
        ApplicationCacheController.enable = function () {
            if (ApplicationCacheController._appCache == null || ApplicationCacheController.isEnabled === true) {
                return;
            }
            // Native Browser Event Listener
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.CACHED, this.onCached.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.CHECKING, this.onChecking.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.DOWNLOADING, this.onDownloading.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.NO_UPDATE, this.onNoUpdate.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.OBSOLETE, this.onObsolete.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.PROGRESS, this.onProgress.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.UPDATE_READY, this.onUpdateReady.bind(this), false);
            ApplicationCacheController._appCache.addEventListener(ApplicationCacheEvent.ERROR, this.onError.bind(this), false);
            ApplicationCacheController.isEnabled = true;
        };
        /**
         * @overridden BaseObject.disable
         */
        ApplicationCacheController.disable = function () {
            if (ApplicationCacheController._appCache == null || ApplicationCacheController.isEnabled === false) {
                return;
            }
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.CACHED, ApplicationCacheController.onCached.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.CHECKING, ApplicationCacheController.onChecking.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.DOWNLOADING, ApplicationCacheController.onDownloading.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.NO_UPDATE, ApplicationCacheController.onNoUpdate.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.OBSOLETE, ApplicationCacheController.onObsolete.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.PROGRESS, ApplicationCacheController.onProgress.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.UPDATE_READY, ApplicationCacheController.onUpdateReady.bind(this), false);
            ApplicationCacheController._appCache.removeEventListener(ApplicationCacheEvent.ERROR, ApplicationCacheController.onError.bind(this), false);
            ApplicationCacheController.isEnabled = true;
        };
        ApplicationCacheController.update = function () {
            ApplicationCacheController._appCache.update();
        };
        ApplicationCacheController.getStatus = function () {
            switch (ApplicationCacheController._appCache.status) {
                case ApplicationCacheController._appCache.UNCACHED:
                    return 'UNCACHED';
                    break;
                case ApplicationCacheController._appCache.IDLE:
                    return 'IDLE';
                    break;
                case ApplicationCacheController._appCache.CHECKING:
                    return 'CHECKING';
                    break;
                case ApplicationCacheController._appCache.DOWNLOADING:
                    return 'DOWNLOADING';
                    break;
                case ApplicationCacheController._appCache.UPDATEREADY:
                    return 'UPDATEREADY';
                    break;
                case ApplicationCacheController._appCache.OBSOLETE:
                    return 'OBSOLETE';
                    break;
                default:
                    return 'UKNOWN CACHE STATUS';
                    break;
            }
        };
        /**
         * The resources listed in the manifest have been fully downloaded, and the application is
         * now cached locally.
         *
         * @method onCached
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onCached = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CACHED, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.CACHED, false, false, event));
        };
        /**
         * The browser is checking for an update, or is attempting to download
         * the cache manifest for the first time. This is always the first event
         * in the sequence.
         *
         * @method onChecking
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onChecking = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CHECKING, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.CHECKING, false, false, event));
        };
        /**
         * The browser has started to download the cache manifest, either for the
         * first time or because changes have been detected.
         *
         * @method onDownloading
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onDownloading = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.DOWNLOADING, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.DOWNLOADING, false, false, event));
        };
        /**
         * An error occurred at some point - this could be caused by a number of things. This will
         * always be the last event in the sequence.
         *
         * @method onError
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onError = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.ERROR, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.ERROR, false, false, event));
        };
        /**
         * The cache manifest hadn't changed.
         *
         * @method onNoUpdate
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onNoUpdate = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.NO_UPDATE, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.NO_UPDATE, false, false, event));
        };
        /**
         * The cache manifest file could not be found, indicating that the cache is no longer needed.
         * The application cache is being deleted.
         *
         * @method onObsolete
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onObsolete = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.OBSOLETE, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.OBSOLETE, false, false, event));
        };
        /**
         * The browser had downloaded and cached an asset. This is fired once for
         * every file that is downloaded (including the current page which is cached implicitly).
         *
         * @method onProgress
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onProgress = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.PROGRESS, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.PROGRESS, false, false, event));
        };
        /**
         * The resources listed in the manifest have been newly re-downloaded, and the script can
         * use swapCache() to switch to the new cache.
         *
         * @method onUpdateReady
         * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
         * @private
         * @static
         */
        ApplicationCacheController.onUpdateReady = function (event) {
            //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.UPDATE_READY, event);
            ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY, false, false, event));
        };
        /**
         * Registers an event listener object with an ApplicationCacheController object so that the listener receives notification of an event.
         * @example
         ApplicationCacheController.addEventListener(ApplicationCacheEvent.UPDATE_READY, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function(event) {
               console.log(event.target + " sent the event.");
           }
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         */
        ApplicationCacheController.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            ApplicationCacheController._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
        /**
         * Removes a specified listener from the ApplicationCacheController object.
         * @example
         ApplicationCacheController.removeEventListener(ApplicationCacheEvent.UPDATE_READY, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function(event) {
               console.log(event.target + " sent the event.");
           }
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed. This was added because it was need for the {{#crossLink "ApplicationCacheController"}}{{/crossLink}} class.
         * To keep things consistent this parameter is required.
         * @static
         */
        ApplicationCacheController.removeEventListener = function (type, callback, scope) {
            ApplicationCacheController._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * <p>Dispatches an event within the ApplicationCacheController object.</p>
         * @example
         var event:ApplicationCacheEvent = new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY);
         ApplicationCacheController.dispatchEvent(event);

         // Here is a common inline event being dispatched
         ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY));
         * @method dispatchEvent
         * @param event {ApplicationCacheEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "ApplicationCacheEvent"}}{{/crossLink}}.
         * @static
         */
        ApplicationCacheController.dispatchEvent = function (event) {
            ApplicationCacheController._eventDispatcher.dispatchEvent(event);
        };
        /**
         *
         * @property _appCache
         * @type {ApplicationCache}
         * @private
         * @static
         */
        ApplicationCacheController._appCache = window.applicationCache;
        /**
         *
         * @property _eventDispatcher
         * @type {EventDispatcher}
         * @private
         * @static
         */
        ApplicationCacheController._eventDispatcher = new EventDispatcher();
        /**
         * The isEnabled property is used to keep track of the enabled state.
         *
         * @property isEnabled
         * @type {boolean}
         * @default false
         * @private
         * @static
         */
        ApplicationCacheController.isEnabled = false;
        return ApplicationCacheController;
    })();

    return ApplicationCacheController;
}));