import ApplicationCacheEvent from '../event/ApplicationCacheEvent';
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
declare class ApplicationCacheService {
    /**
     * A reference to the applicationCache property on the window object.
     *
     * @property _appCache
     * @type {ApplicationCache}
     * @private
     * @static
     */
    private static _appCache;
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
     * The isEnabled property is used to keep track of the enabled state.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @public
     * @static
     */
    static isEnabled: boolean;
    constructor();
    /**
     * @overridden BaseObject.enable
     */
    static enable(): void;
    /**
     * @overridden BaseObject.disable
     */
    static disable(): void;
    static update(): void;
    static getStatus(): string;
    /**
     * The resources listed in the manifest have been fully downloaded, and the application is
     * now cached locally.
     *
     * @method _onCached
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onCached(event);
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
    private static _onChecking(event);
    /**
     * The browser has started to download the cache manifest, either for the
     * first time or because changes have been detected.
     *
     * @method _onDownloading
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onDownloading(event);
    /**
     * An error occurred at some point - this could be caused by a number of things. This will
     * always be the last event in the sequence.
     *
     * @method _onError
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onError(event);
    /**
     * The cache manifest hadn't changed.
     *
     * @method _onNoUpdate
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onNoUpdate(event);
    /**
     * The cache manifest file could not be found, indicating that the cache is no longer needed.
     * The application cache is being deleted.
     *
     * @method _onObsolete
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onObsolete(event);
    /**
     * The browser had downloaded and cached an asset. This is fired once for
     * every file that is downloaded (including the current page which is cached implicitly).
     *
     * @method _onProgress
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onProgress(event);
    /**
     * The resources listed in the manifest have been newly re-downloaded, and the script can
     * use swapCache() to switch to the new cache.
     *
     * @method _onUpdateReady
     * @param event {DOMApplicationCacheEvent} The native browser event from the DOMApplicationCache.
     * @private
     * @static
     */
    private static _onUpdateReady(event);
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
    static addEventListener(type: string, callback: Function, scope: any, priority?: number): any;
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
    static removeEventListener(type: string, callback: Function, scope: any): any;
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
    static dispatchEvent(event: ApplicationCacheEvent): any;
}
export default ApplicationCacheService;
