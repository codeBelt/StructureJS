define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Extend = require('structurejs/util/Extend');
    var BaseEvent = require('structurejs/event/BaseEvent');

    /**
     * The LoaderEvent...
     *
     * @class LoaderEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param [data=null] {any} Use to pass any type of data with the event.
     * @module StructureJS
     * @submodule event
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LoaderEvent = (function () {

        var _super = Extend(LoaderEvent, BaseEvent);

        function LoaderEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
        }
        /**
         * @overridden BaseEvent.clone
         */
        LoaderEvent.prototype.clone = function () {
            return new LoaderEvent(this.type, this.bubble, this.cancelable, this.data);
        };
        /**
         * The LoaderEvent.COMPLETE constant defines the value of the type property of an loader event object.
         *
         * @event COMPLETE
         * @type {string}
         * @static
         */
        LoaderEvent.COMPLETE = "LoaderEvent.complete";
        /**
         * The LoaderEvent.LOAD_COMPLETE constant defines the value of the type property of an loader event object.
         *
         * @event LOAD_COMPLETE
         * @type {string}
         * @static
         */
        LoaderEvent.LOAD_COMPLETE = "LoaderEvent.loadComplete";
        /**
         * The LoaderEvent.ERROR constant defines the value of the type property of an loader event object.
         *
         * @event ERROR
         * @type {string}
         * @static
         */
        LoaderEvent.ERROR = "LoaderEvent.error";
        return LoaderEvent;
    })();

    module.exports = LoaderEvent;

});