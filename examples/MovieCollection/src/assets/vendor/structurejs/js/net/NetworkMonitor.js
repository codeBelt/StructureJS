(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/EventDispatcher', '../event/NetworkMonitorEvent', '../event/native/NavigatorEvents'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var NetworkMonitorEvent_1 = require('../event/NetworkMonitorEvent');
    var NavigatorEvents_1 = require('../event/native/NavigatorEvents');
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
    var NetworkMonitor = (function () {
        function NetworkMonitor() {
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
        NetworkMonitor.connected = function () {
            NetworkMonitor._start();
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
            NetworkMonitor._start();
            return (this.connected()) ? NavigatorEvents_1.default.ONLINE : NavigatorEvents_1.default.OFFLINE;
        };
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
        NetworkMonitor.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            NetworkMonitor._start();
            NetworkMonitor._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
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
        NetworkMonitor.removeEventListener = function (type, callback, scope) {
            NetworkMonitor._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * Adds the necessary event listeners to listen for the 'online' and 'offline' events.
         *
         * @method _start
         * @static
         * @private
         */
        NetworkMonitor._start = function () {
            if (NetworkMonitor._initialized === true) {
                return;
            }
            else {
                NetworkMonitor._initialized = true;
            }
            window.addEventListener(NavigatorEvents_1.default.ONLINE, NetworkMonitor._onNetworkMonitorEvent, false);
            window.addEventListener(NavigatorEvents_1.default.OFFLINE, NetworkMonitor._onNetworkMonitorEvent, false);
        };
        /**
         * An event handler method when the native Window 'online' and 'offline' events are triggered.
         *
         * @method _onNetworkMonitorEvent
         * @param event
         * @private
         * @static
         */
        NetworkMonitor._onNetworkMonitorEvent = function (event) {
            var type = (event) ? event.type : NetworkMonitor.getStatus();
            var networkMonitorEvent = new NetworkMonitorEvent_1.default(NetworkMonitorEvent_1.default.STATUS, false, false, type, NetworkMonitor.connected(), event);
            NetworkMonitor._dispatchEvent(networkMonitorEvent);
        };
        /**
         * <p>Dispatches an event within the NetworkMonitorEvent object.</p>
         * @method _dispatchEvent
         * @param event {NetworkMonitorEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "NetworkMonitorEvent"}}{{/crossLink}}.
         * @static
         * @private
         */
        NetworkMonitor._dispatchEvent = function (event) {
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
        NetworkMonitor._eventDispatcher = new EventDispatcher_1.default();
        /**
         * A flag to determine if this class has already been initialized.
         *
         * @property _initialized
         * @type {boolean}
         * @private
         */
        NetworkMonitor._initialized = false;
        return NetworkMonitor;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NetworkMonitor;
});
