(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './EventDispatcher', './BaseEvent'], function (require, exports) {
    var EventDispatcher = require('./EventDispatcher');
    var BaseEvent = require('./BaseEvent');
    /**
     * EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications.
     * Loosely coupled event handling, the subscriber does not know the publisher. Both of them only need to know the event type.
     *
     * @class EventBroker
     * @module StructureJS
     * @submodule event
     * @requires EventDispatcher
     * @requires BaseEvent
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var EventBroker = (function () {
        function EventBroker() {
            throw new Error('[EventBroker] Do not instantiate the EventBroker class because it is a static class.');
        }
        /**
         * Registers an event listener object with an EventBroker object so that the listener receives notification of an event.
         *
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. The callback function will receive a {{#crossLink "BaseEvent"}}{{/crossLink}} object or custom event that extends the {{#crossLink "BaseEvent"}}{{/crossLink}} class.
         * @param scope {any} The scope of the callback function.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         * @public
         * @example
         *     EventBroker.addEventListener('change', this._handlerMethod, this);
         *     // Example of using a constant event type.
         *     EventBroker.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *     // The event passed to the method will always be a BaseEvent object.
         *     ClassName.prototype._handlerMethod = function (event) {
         *          console.log(event.data);
         *     };
         */
        EventBroker.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
        /**
         * Registers an event listener object once with an EventDispatcher object so the listener will receive the notification of an event.
         *
         * @method addEventListenerOnce
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. The callback function will receive a {{#crossLink "BaseEvent"}}{{/crossLink}} object or custom event that extends the {{#crossLink "BaseEvent"}}{{/crossLink}} class.
         * @param scope {any} The scope of the callback function.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @static
         * @public
         * @example
         *     EventBroker.addEventListenerOnce('change', this._handlerMethod, this);
         *     // Example of using a constant event type.
         *     EventBroker.addEventListenerOnce(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *     // The event passed to the method will always be a BaseEvent object.
         *     ClassName.prototype._handlerMethod = function (event) {
         *          console.log(event.data);
         *     };
         */
        EventBroker.addEventListenerOnce = function (type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            EventBroker._eventDispatcher.addEventListenerOnce(type, callback, scope, priority);
        };
        /**
         * Removes a specified listener from the EventBroker object.
         *
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The callback function to be removed.
         * @param scope {any} The scope of the callback function to be removed.
         * @static
         * @public
         * @example
         *     EventBroker.removeEventListener('change', this._handlerMethod, this);
         *
         *     EventBroker.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         */
        EventBroker.removeEventListener = function (type, callback, scope) {
            EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
        };
        /**
         * Dispatches an event within the EventBroker object.
         *
         * @method dispatchEvent
         * @param event {string|BaseEvent} The Event object or event type string you want to dispatch.
         * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @static
         * @public
         * @example
         *      EventBroker.dispatchEvent('change');
         *
         *      // Example: Sending data with the event.
         *      EventBroker.dispatchEvent('change', {some: 'data'});
         *
         *      // Example: Sending a BaseEvent or custom event object.
         *      var event = new BaseEvent(BaseEvent.CHANGE);
         *      event.data = {some: 'data'};
         *      EventBroker.dispatchEvent(event);
         */
        EventBroker.dispatchEvent = function (type, data) {
            if (data === void 0) { data = null; }
            var event = type;
            if (typeof event === 'string') {
                event = new BaseEvent(type, false, false, data);
            }
            event.target = EventBroker;
            event.currentTarget = EventBroker;
            EventBroker._eventDispatcher.dispatchEvent(event);
        };
        /**
         * Check if EventBroker has a specific event listener already added.
         *
         * @method hasEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener method to call.
         * @param scope {any} The scope of the listener object.
         * @return {boolean}
         * @static
         * @public
         * @example
         *      EventBroker.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         */
        EventBroker.hasEventListener = function (type, callback, scope) {
            return EventBroker._eventDispatcher.hasEventListener(type, callback, scope);
        };
        /**
         * Generates a string output of event listeners for a given object.
         *
         * @method getEventListeners
         * @return {string}
         * @static
         * @public
         * @example
         *      EventBroker.getEventListeners();
         *
         *      // [ClassName] is listen for 'BaseEvent.change' event.
         */
        EventBroker.getEventListeners = function () {
            return EventBroker._eventDispatcher.getEventListeners();
        };
        /**
         * A reference to the EventDispatcher object.
         *
         * @property _eventDispatcher
         * @type {EventDispatcher}
         * @private
         * @static
         */
        EventBroker._eventDispatcher = new EventDispatcher();
        return EventBroker;
    })();
    return EventBroker;
});
