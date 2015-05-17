'use strict';
/*
 UMD Stuff
 @import ../event/ApplicationCacheEvent as ApplicationCacheEvent
 @import ../event/EventDispatcher as EventDispatcher
 @export ApplicationCacheController
 */
import ApplicationCacheEvent = require('../event/ApplicationCacheEvent');
import EventDispatcher = require('../event/EventDispatcher');

/**
 * The ApplicationCacheController is a static class works with the window applicationCache object.
 *
 * @class ApplicationCacheController
 * @module StructureJS
 * @submodule controller
 * @requires ApplicationCacheEvent
 * @requires EventDispatcher
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
class ApplicationCacheController
{
    /**
     * A reference to the applicationCache property on the window object.
     *
     * @property _appCache
     * @type {ApplicationCache}
     * @private
     * @static
     */
    private static _appCache:ApplicationCache = window.applicationCache;

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
     * The isEnabled property is used to keep track of the enabled state.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @public
     * @static
     */
    public static isEnabled:boolean = false;

    constructor()
    {
        throw new Error('[ApplicationCacheController] Do not instantiate the ApplicationCacheController class because it is a static class.');
    }

    /**
     * @overridden BaseObject.enable
     */
    public static enable():void
    {
        if (ApplicationCacheController._appCache == null || ApplicationCacheController.isEnabled === true)
        {
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
    }

    /**
     * @overridden BaseObject.disable
     */
    public static disable():void
    {
        if (ApplicationCacheController._appCache == null || ApplicationCacheController.isEnabled === false)
        {
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
    }

    public static update()
    {
        ApplicationCacheController._appCache.update();
    }

    public static getStatus():string
    {
        switch (ApplicationCacheController._appCache.status)
        {
            case ApplicationCacheController._appCache.UNCACHED:    // UNCACHED === 0
                return 'UNCACHED';
                break;
            case ApplicationCacheController._appCache.IDLE:        // IDLE === 1
                return 'IDLE';
                break;
            case ApplicationCacheController._appCache.CHECKING:    // CHECKING === 2
                return 'CHECKING';
                break;
            case ApplicationCacheController._appCache.DOWNLOADING: // DOWNLOADING === 3
                return 'DOWNLOADING';
                break;
            case ApplicationCacheController._appCache.UPDATEREADY: // UPDATEREADY === 4
                return 'UPDATEREADY';
                break;
            case ApplicationCacheController._appCache.OBSOLETE:    // OBSOLETE === 5
                return 'OBSOLETE';
                break;
            default:
                return 'UKNOWN CACHE STATUS';
                break;
        }
    }

    /**
     * The resources listed in the manifest have been fully downloaded, and the application is
     * now cached locally.
     *
     * @method onCached
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onCached(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CACHED, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.CACHED, false, false, event));
    }

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
    private static onChecking(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.CHECKING, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.CHECKING, false, false, event));
    }

    /**
     * The browser has started to download the cache manifest, either for the
     * first time or because changes have been detected.
     *
     * @method onDownloading
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onDownloading(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.DOWNLOADING, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.DOWNLOADING, false, false, event));
    }

    /**
     * An error occurred at some point - this could be caused by a number of things. This will
     * always be the last event in the sequence.
     *
     * @method onError
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onError(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.ERROR, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.ERROR, false, false, event));
    }

    /**
     * The cache manifest hadn't changed.
     *
     * @method onNoUpdate
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onNoUpdate(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.NO_UPDATE, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.NO_UPDATE, false, false, event));
    }

    /**
     * The cache manifest file could not be found, indicating that the cache is no longer needed.
     * The application cache is being deleted.
     *
     * @method onObsolete
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onObsolete(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.OBSOLETE, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.OBSOLETE, false, false, event));
    }

    /**
     * The browser had downloaded and cached an asset. This is fired once for
     * every file that is downloaded (including the current page which is cached implicitly).
     *
     * @method onProgress
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onProgress(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.PROGRESS, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.PROGRESS, false, false, event));
    }

    /**
     * The resources listed in the manifest have been newly re-downloaded, and the script can
     * use swapCache() to switch to the new cache.
     *
     * @method onUpdateReady
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static onUpdateReady(event)
    {
        //console.log('[ApplicationCacheController]', 'ApplicationCacheEvent:',ApplicationCacheEvent.UPDATE_READY, event);
        ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY, false, false, event));
    }

    /**
     * Registers an event listener object with an ApplicationCacheController object so that the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @static
     * @example
     *      ApplicationCacheController.addEventListener(ApplicationCacheEvent.UPDATE_READY, this.handlerMethod, this);
     *      ClassName.prototype.handlerMethod = function(event) {
     *          console.log(event.target + " sent the event.");
     *      }
     */
    public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):any
    {
        ApplicationCacheController._eventDispatcher.addEventListener(type, callback, scope, priority);
    }

    /**
     * Removes a specified listener from the ApplicationCacheController object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed. This was added because it was need for the {{#crossLink "ApplicationCacheController"}}{{/crossLink}} class.
     * To keep things consistent this parameter is required.
     * @static
     * @example
     *      ApplicationCacheController.removeEventListener(ApplicationCacheEvent.UPDATE_READY, this.handlerMethod, this);
     *      ClassName.prototype.handlerMethod = function(event) {
     *          console.log(event.target + " sent the event.");
     *      }
     */
    public static removeEventListener(type:string, callback:Function, scope:any):any
    {
        ApplicationCacheController._eventDispatcher.removeEventListener(type, callback, scope);
    }

    /**
     * <p>Dispatches an event within the ApplicationCacheController object.</p>
     *
     * @method dispatchEvent
     * @param event {ApplicationCacheEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "ApplicationCacheEvent"}}{{/crossLink}}.
     * @static
     * @example
     *      var event:ApplicationCacheEvent = new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY);
     *      ApplicationCacheController.dispatchEvent(event);
     *
     *      // Here is a common inline event being dispatched
     *      ApplicationCacheController.dispatchEvent(new ApplicationCacheEvent(ApplicationCacheEvent.UPDATE_READY));
     */
    public static dispatchEvent(event:ApplicationCacheEvent):any
    {
        ApplicationCacheController._eventDispatcher.dispatchEvent(event);
    }
}

export = ApplicationCacheController;