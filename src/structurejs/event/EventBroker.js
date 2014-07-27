define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var BaseEvent = require('structurejs/event/BaseEvent');

    /**
     * EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications.
     * Loosely coupled event handling, the subscriber does not have to know the publisher. Both of them only need to know the event type.
     *
     * @class EventBroker
     * @module StructureJS
     * @submodule event
     * @static
     * @author Robert S. (www.codeBelt.com)
     **/
    var EventBroker = (function () {

        function EventBroker() {
            throw new Error('[EventBroker] Do instantiation the EventBroker class because it is a static class.');
        }
        /**
         * Registers an event listener object with an EventBroker object so that the listener receives notification of an event.
         * @example
         EventBroker.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
        console.log(event.target + " sent the event.");
        }
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         * @public
         */
        EventBroker.addEventListener = function (type, callback, scope, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
        };

        /**
         * Removes a specified listener from the EventBroker object.
         * @example
         EventBroker.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
        console.log(event.target + " sent the event.");
        }
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed.
         * To keep things consistent this parameter is required.
         * @static
         * @public
         */
        EventBroker.removeEventListener = function (type, callback, scope) {
            EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
        };

        /**
         * <p>Dispatches an event within the EventBroker object.</p>
         * @example
         var event:BaseEvent = new BaseEvent(BaseEvent.CHANGE);
         EventBroker.dispatchEvent(event);

         // Here is a common inline event being dispatched
         EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         * @method dispatchEvent
         * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @static
         * @public
         */
        EventBroker.dispatchEvent = function (type, data) {
            if (typeof data === "undefined") { data = null; }
            var event = type;

            if (typeof event == 'string') {
                event = new BaseEvent(type, false, false, data);
            }

            event.target = EventBroker;
            event.currentTarget = EventBroker;

            EventBroker._eventDispatcher.dispatchEvent(event);
        };
        EventBroker._eventDispatcher = new EventDispatcher();
        return EventBroker;
    })();

    module.exports = EventBroker;

});