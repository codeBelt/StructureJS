define(function(require, exports, module) {
    'use strict';

    var Extend = require('nerdery/util/Extend');
    var BaseObject = require('nerdery/BaseObject');

    /**
     * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
     * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
     *
     * @class EventDispatcher
     * @extends BaseObject
     * @module Nerdery
     * @submodule event
     * @constructor
     * @version 0.1.0
     **/
    var EventDispatcher = (function () {

        var _super = Extend(EventDispatcher, BaseObject);

        function EventDispatcher() {
            _super.call(this);

            /**
             * @overridden BaseObject.CLASS_NAME
             */
            this.CLASS_NAME = 'EventDispatcher';
            /**
             * Holds a reference to added listeners.
             *
             * @property _listeners
             * @type {array}
             * @private
             */
            this._listeners = null;
            /**
             * Indicates the object that contains child object. Use the parent property
             * to specify a relative path to display objects that are above the current display object in the display
             * list hierarchy.
             *
             * @property parent
             * @type {any}
             * @public
             */
            this.parent = null;
            /**
             * The isEnabled property is used to keep track of the enabled state of the object.
             *
             * @property isEnabled
             * @type {boolean}
             * @default false
             * @protected
             */
            this.isEnabled = false;

            this._listeners = [];
        }

        /**
         * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
         * @example
        instance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);

        ClassName.prototype.handlerMethod(event):void {
            console.log(event.target + " sent the event.");
        }
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list == null) {
                // If a list of event listener(s) do not exist for the type value passed in then create a new empty array.
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope) {
                    // If same callback and scope is found then remove it. Then add the current one below.
                    list.splice(i, 1);
                } else if (index === 0 && listener.priority < priority) {
                    index = i + 1;
                }
            }

            // Add the event listener to the list array at the index value.
            list.splice(index, 0, { callback: callback, scope: scope, priority: priority });

            return this;
        };

        /**
         * Removes a specified listener from the EventDispatcher object.
         * @example
        instance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);

        ClassName.prototype.handlerMethod(event):void {
            console.log(event.target + " sent the event.");
        }
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed.
         * @hide This was added because it was need for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list) {
                var i = list.length;
                while (--i > -1) {
                    // If the callback and the scope are the same then remove the event listener.
                    if (list[i].callback === callback && list[i].scope === scope) {
                        list.splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        };

        /**
         * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
         * @example
        var event = new BaseEvent(BaseEvent.CHANGE);
        instance.dispatchEvent(event);

        // Here is a common inline event being dispatched
        instance.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         * @method dispatchEvent
         * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.dispatchEvent = function (event) {
            // If target is null then set it to the object that dispatched the event.
            if (event.target == null) {
                event.target = this;
            }

            // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
            event.currentTarget = this;

            // Get the list of event listener(s) by the associated type value.
            var list = this._listeners[event.type];
            if (list) {
                var i = list.length;
                var listener;
                while (--i > -1) {
                    // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                    if (event.cancelable && event.isImmediatePropagationStopped) {
                        break;
                    }

                    listener = list[i];
                    listener.callback.call(listener.scope, event);
                }
            }

            //Dispatches up the chain of classes that have a parent.
            if (this.parent && event.bubble) {
                // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
                if (event.cancelable && event.isPropagationStopped) {
                    return this;
                }

                // Pass the event to the parent (event bubbling).
                this.parent.dispatchEvent(event);
            }

            return this;
        };

        /**
         * @overridden BaseObject.destroy
         */
        EventDispatcher.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.disable();

            this.parent = null;
            this._listeners = null;
        };

        /**
         * The enable method is responsible for enabling event listeners and/or children of the containing objects.
         * @example
        ClassName.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
            this._childInstance.enable();

            return _super.prototype.enable.call(this);
        }
         * @method enable
         * @public
         * @chainable
         */
        EventDispatcher.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this.isEnabled = true;
            return this;
        };

        /**
         * The disable method is responsible for disabling event listeners and/or children of the containing objects.
         * @example
        ClassName.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
            this._childInstance.disable();

            return _super.prototype.disable.call(this);
        }
         * @method disable
         * @public
         * @chainable
         */
        EventDispatcher.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.isEnabled = false;
            return this;
        };

        /**
         * Meant for debugging purposes; returns an array dictionary of the different event listener(s) on the object.
         *
         * @method getEventListeners
         * @return {array} Returns an array dictionary of the different event listener(s) on the object.
         * @public
         */
        EventDispatcher.prototype.getEventListeners = function () {
            return this._listeners;
        };

        return EventDispatcher;
    })();

    module.exports = EventDispatcher;

});