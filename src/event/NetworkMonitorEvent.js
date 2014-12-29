/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/BaseEvent'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.LocalStorageEvent = factory(root.structurejs.Extend, root.structurejs.BaseEvent);
    }
}(this, function(Extend, BaseEvent) {
    'use strict';

    /**
     * The NetworkMonitorEvent...
     *
     * @class NetworkMonitorEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param [data=null] {any} Use to pass any type of data with the event.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var NetworkMonitorEvent = (function () {

        var _super = Extend(NetworkMonitorEvent, BaseEvent);

        function NetworkMonitorEvent(type, bubbles, cancelable, status, connected, data) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (status === void 0) { status = null; }
            if (connected === void 0) { connected = null; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            /**
             * TODO: YUIDoc_comment
             *
             * @property status
             * @type {string}
             * @public
             */
            this.status = null;
            /**
             * TODO: YUIDoc_comment
             *
             * @property connected
             * @type {boolean}
             * @public
             */
            this.connected = false;
            this.status = status;
            this.connected = connected;
        }
        /**
         * @overridden BaseEvent.clone
         */
        NetworkMonitorEvent.prototype.clone = function () {
            return new NetworkMonitorEvent(this.type, this.bubble, this.cancelable, this.status, this.connected, this.data);
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @event STATUS
         * @type {string}
         * @static
         */
        NetworkMonitorEvent.STATUS = "NetworkMonitorEvent.status";
        /**
         * TODO: YUIDoc_comment
         *
         * @event ONLINE
         * @type {string}
         * @static
         */
        NetworkMonitorEvent.ONLINE = "NetworkMonitorEvent.online";
        /**
         * TODO: YUIDoc_comment
         *
         * @event OFFLINE
         * @type {string}
         * @static
         */
        NetworkMonitorEvent.OFFLINE = "NetworkMonitorEvent.offline";
        return NetworkMonitorEvent;
    })();

    return NetworkMonitorEvent;
}));