import EventDispatcher from '../event/EventDispatcher';
import NetworkMonitorEvent from '../event/NetworkMonitorEvent';
import NavigatorEvents from '../event/native/NavigatorEvents';

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
class NetworkMonitor
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
     * A flag to determine if this class has already been initialized.
     *
     * @property _initialized
     * @type {boolean}
     * @private
     */
    private static _initialized:boolean = false;

    constructor()
    {
        throw new Error('[NetworkMonitor] Do not instantiate the NetworkMonitor class because it is a static class.');
    }

    /**
     * Returns the online status of the browser. The property returns a boolean value, with true for being online and false for being offline.
     * @example
     *      NetworkMonitor.connected();
     * @method connected
     * @returns {boolean}
     * @static
     * @public
     */
    public static connected():boolean
    {
        NetworkMonitor._start();

        return window.navigator.onLine;
    }

    /**
     * Returns if the status type ('online' or 'offline') if computer or device is connected to the internet.
     * @example
     *      NetworkMonitor.getStatus();
     * @method getStatus
     * @returns {string} Returns 'online' or 'offline'.
     * @public
     * @static
     */
    public static getStatus():string
    {
        NetworkMonitor._start();

        return (this.connected()) ? NavigatorEvents.ONLINE : NavigatorEvents.OFFLINE;
    }

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
    public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void
    {
        NetworkMonitor._start();

        NetworkMonitor._eventDispatcher.addEventListener(type, callback, scope, priority);
    }

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
    public static removeEventListener(type:string, callback:Function, scope:any):void
    {
        NetworkMonitor._eventDispatcher.removeEventListener(type, callback, scope);
    }

    /**
     * Adds the necessary event listeners to listen for the 'online' and 'offline' events.
     *
     * @method _start
     * @static
     * @private
     */
    private static _start():void
    {
        if (NetworkMonitor._initialized === true)
        {
            return;
        }
        else
        {
            NetworkMonitor._initialized = true;
        }

        window.addEventListener(NavigatorEvents.ONLINE, NetworkMonitor._onNetworkMonitorEvent, false);
        window.addEventListener(NavigatorEvents.OFFLINE, NetworkMonitor._onNetworkMonitorEvent, false);
    }

    /**
     * An event handler method when the native Window 'online' and 'offline' events are triggered.
     *
     * @method _onNetworkMonitorEvent
     * @param event
     * @private
     * @static
     */
    private static _onNetworkMonitorEvent(event):void
    {
        const type:string = (event) ? event.type : NetworkMonitor.getStatus();
        const networkMonitorEvent:NetworkMonitorEvent = new NetworkMonitorEvent(NetworkMonitorEvent.STATUS, false, false, type, NetworkMonitor.connected(), event);

        NetworkMonitor._dispatchEvent(networkMonitorEvent);
    }

    /**
     * <p>Dispatches an event within the NetworkMonitorEvent object.</p>
     * @method _dispatchEvent
     * @param event {NetworkMonitorEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
     * extend the {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}}.
     * @static
     * @private
     */
    private static _dispatchEvent(event:NetworkMonitorEvent):void
    {
        NetworkMonitor._eventDispatcher.dispatchEvent(event);
    }
}

export default NetworkMonitor;