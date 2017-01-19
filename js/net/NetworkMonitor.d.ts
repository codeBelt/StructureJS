/**
 * A helper class to detect network changes.
 *
 * @class NetworkMonitor
 * @constructor
 * @requires EventDispatcher
 * @requires NavigatorEvents
 * @requires NetworkMonitorEvent
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class NetworkMonitor {
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
     * A flag to determine if this class has already been initialized.
     *
     * @property _initialized
     * @type {boolean}
     * @private
     */
    private static _initialized;
    constructor();
    /**
     * Returns the online status of the browser. The property returns a boolean value, with true for being online and false for being offline.
     * @example
     *      NetworkMonitor.connected();
     * @method connected
     * @returns {boolean}
     * @static
     * @public
     */
    static connected(): boolean;
    /**
     * Returns if the status type ('online' or 'offline') if computer or device is connected to the internet.
     * @example
     *      NetworkMonitor.getStatus();
     * @method getStatus
     * @returns {string} Returns 'online' or 'offline'.
     * @public
     * @static
     */
    static getStatus(): string;
    /**
     * Registers an event listener object with an NetworkMonitor object so that the listener receives notification of an event.
     * @example
     *      NetworkMonitor.addEventListener(NetworkMonitorEvent.STATUS, this._handlerMethod, this);
     *      _handlerMethod(event) {
     *          console.log(event.status, event.connected);
     *      }
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows.
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @static
     * @public
     */
    static addEventListener(type: string, callback: Function, scope: any, priority?: number): void;
    /**
     * Removes a specified listener from the NetworkMonitor object.
     * @example
     *      NetworkMonitor.removeEventListener(NetworkMonitorEvent.STATUS, this._handlerMethod, this);
     *      _handlerMethod(event) {
     *          console.log(event.status, event.connected);
     *      }
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * To keep things consistent this parameter is required.
     * @static
     * @public
     */
    static removeEventListener(type: string, callback: Function, scope: any): void;
    /**
     * Adds the necessary event listeners to listen for the 'online' and 'offline' events.
     *
     * @method _start
     * @static
     * @private
     */
    private static _start();
    /**
     * An event handler method when the native Window 'online' and 'offline' events are triggered.
     *
     * @method _onNetworkMonitorEvent
     * @param event
     * @private
     * @static
     */
    private static _onNetworkMonitorEvent(event);
    /**
     * <p>Dispatches an event within the NetworkMonitorEvent object.</p>
     * @method _dispatchEvent
     * @param event {NetworkMonitorEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}}.
     * @static
     * @private
     */
    private static _dispatchEvent(event);
}
export default NetworkMonitor;
