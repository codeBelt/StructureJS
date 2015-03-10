/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../event/EventDispatcher', '../event/native/NavigatorEvents', '../event/NetworkMonitorEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../event/EventDispatcher'), require('../event/native/NavigatorEvents'), require('../event/NetworkMonitorEvent'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.NetworkMonitor = factory(root.structurejs.EventDispatcher, root.structurejs.NavigatorEvents, root.structurejs.NetworkMonitorEvent);
    }
}(this, function(EventDispatcher, NavigatorEvents, NetworkMonitorEvent) {
    'use strict';

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
    var NetworkMonitor = (function () {

        function NetworkMonitor() {
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
        NetworkMonitor.start = function () {
            if (NetworkMonitor._initialized === true) {
                return;
            }
            else {
                NetworkMonitor._initialized = true;
            }
            window.addEventListener(NavigatorEvents.ONLINE, NetworkMonitor.onNetworkMonitorEvent, false);
            window.addEventListener(NavigatorEvents.OFFLINE, NetworkMonitor.onNetworkMonitorEvent, false);
            NetworkMonitor.onNetworkMonitorEvent(null);
        };
        /**
         * Returns the online status of the browser. The property returns a boolean value, with true for being online and false for being offline.
         * @example
         *      NetworkMonitor.connected();
         * @method connected
         * @returns {boolean}
         * @static
         * @public
         */
        NetworkMonitor.connected = function () {
            // Calling start as a backup if the developer forgets to call NetworkMonitor.start() at the startup of the application.
            NetworkMonitor.start();
            return window.navigator.onLine;
        };
        /**
         * Returns if the status type ('online' or 'offline') if computer or device is connected to the internet.
         * @example
         *      NetworkMonitor.getStatus();
         * @method getStatus
         * @returns {string} Returns 'online' or 'offline'.
         * @public
         * @static
         */
        NetworkMonitor.getStatus = function () {
            // Calling start as a backup if the developer forgets to call NetworkMonitor.start() at the startup of the application.
            NetworkMonitor.start();
            return (this.connected()) ? NavigatorEvents.ONLINE : NavigatorEvents.OFFLINE;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method onNetworkMonitorEvent
         * @param event
         * @private
         * @static
         */
        NetworkMonitor.onNetworkMonitorEvent = function (event) {
            var type = (event) ? event.type : NetworkMonitor.getStatus();
            var networkMonitorEvent = new NetworkMonitorEvent(NetworkMonitorEvent.STATUS, false, false, type, NetworkMonitor.connected(), event);
            NetworkMonitor.dispatchEvent(networkMonitorEvent);
        };
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
        NetworkMonitor.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            NetworkMonitor._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
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
        NetworkMonitor.removeEventListener = function (type, callback, scope) {
            NetworkMonitor._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * <p>Dispatches an event within the NetworkMonitorEvent object.</p>
         * @method dispatchEvent
         * @param event {NetworkMonitorEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}}.
         * @static
         * @private
         */
        NetworkMonitor.dispatchEvent = function (event) {
            NetworkMonitor._eventDispatcher.dispatchEvent(event);
        };
        /**
         * A reference to the EventDispatcher object.
         *
         * @property _eventDispatcher
         * @type {EventDispatcher}
         * @private
         * @static
         */
        NetworkMonitor._eventDispatcher = new EventDispatcher();
        /**
         * TODO: YUIDoc_comment
         *
         * @property _initialized
         * @type {boolean}
         * @private
         */
        NetworkMonitor._initialized = false;
        return NetworkMonitor;
    })();

    return NetworkMonitor;
}));