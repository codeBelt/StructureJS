///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/native/NavigatorEvents.ts'/>
///<reference path='../event/NetworkMonitorEvent.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class NetworkMonitor
 * @constructor
 * @requires EventDispatcher
 * @requires NavigatorEvents
 * @requires NetworkMonitorEvent
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureJS
{
    export class NetworkMonitor
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
         * TODO: YUIDoc_comment
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
         * Adds the necessary event listeners to listen for the 'online' and 'offline' events.
         * Also dispatches a {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}} right away with the status of the network connection.
         * It is recommended you call NetworkMonitor.start(); when your application starts up.
         * @example
         *      NetworkMonitor.start();
         * @method start
         * @static
         * @public
         */
        public static start():void
        {
            if (NetworkMonitor._initialized === true)
            {
                return;
            }
            else
            {
                NetworkMonitor._initialized = true;
            }

            window.addEventListener(NavigatorEvents.ONLINE, NetworkMonitor.onNetworkMonitorEvent, false);
            window.addEventListener(NavigatorEvents.OFFLINE, NetworkMonitor.onNetworkMonitorEvent, false);

            NetworkMonitor.onNetworkMonitorEvent(null);
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
            // Calling start as a backup if the developer forgets to call NetworkMonitor.start() at the startup of the application.
            NetworkMonitor.start();
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
            // Calling start as a backup if the developer forgets to call NetworkMonitor.start() at the startup of the application.
            NetworkMonitor.start();
            return (this.connected()) ? NavigatorEvents.ONLINE : NavigatorEvents.OFFLINE;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method onNetworkMonitorEvent
         * @param event
         * @private
         * @static
         */
        private static onNetworkMonitorEvent(event):void
        {
            var type:string = (event) ? event.type : NetworkMonitor.getStatus();
            var networkMonitorEvent:NetworkMonitorEvent = new NetworkMonitorEvent(NetworkMonitorEvent.STATUS, false, false, type, NetworkMonitor.connected(), event);
            NetworkMonitor.dispatchEvent(networkMonitorEvent);
        }

        /**
         * Registers an event listener object with an NetworkMonitor object so that the listener receives notification of an event.
         * @example
         *      NetworkMonitor.addEventListener(NetworkMonitorEvent.STATUS, this.handlerMethod, this);
         *      ClassName.prototype.handlerMethod = function (event) {
     *          console.log(event.status, event.connected);
     *      }
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         * @public
         */
        public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void
        {
            NetworkMonitor._eventDispatcher.addEventListener(type, callback, scope, priority);
        }

        /**
         * Removes a specified listener from the NetworkMonitor object.
         * @example
         *      NetworkMonitor.removeEventListener(NetworkMonitorEvent.STATUS, this.handlerMethod, this);
         *      private handlerMethod(event:NetworkMonitorEvent):void {
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
         * <p>Dispatches an event within the NetworkMonitorEvent object.</p>
         * @method dispatchEvent
         * @param event {NetworkMonitorEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}}.
         * @static
         * @private
         */
        private static dispatchEvent(event:NetworkMonitorEvent):void
        {
            NetworkMonitor._eventDispatcher.dispatchEvent(event);
        }
    }
}