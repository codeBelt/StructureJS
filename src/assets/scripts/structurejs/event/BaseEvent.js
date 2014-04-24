define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Extend = require('structurejs/util/Extend');
    var BaseObject = require('structurejs/BaseObject');

    /**
     * <p>The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.</p>
     *
     * <p>The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
     * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
     * detailed information.</p>
     * @class BaseEvent
     * @extends BaseObject
     * @example
     // Example: how to create a custom event by extending BaseEvent.
        var Extend = require('structurejs/util/Extend');
        var BaseEvent = require('structurejs/event/BaseEvent');

        var CountryEvent = (function () {

            var _super = Extend(CountryEvent, BaseEvent);

            CountryEvent.CHANGE_COUNTRY = "CountryEvent.changeCountry";

            function CountryEvent(type, bubbles, cancelable, data) {
                _super.call(this, type, bubbles, cancelable, data);

                this.CLASS_NAME = 'CountryEvent';
                this.countryName = null;
            }

            return CountryEvent;
        })();
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param [data=null] {any} Use to pass any type of data with the event.
     * @module StructureJS
     * @submodule event
     * @constructor
     * @version 0.1.0
     **/
    var BaseEvent = (function () {

        var _super = Extend(BaseEvent, BaseObject);

        BaseEvent.ACTIVATE = 'BaseEvent.activate';

        BaseEvent.ADDED = 'BaseEvent.added';

        BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';

        BaseEvent.CANCEL = 'BaseEvent.cancel';

        BaseEvent.CHANGE = 'BaseEvent.change';

        BaseEvent.CLEAR = 'BaseEvent.clear';

        BaseEvent.CLOSE = 'BaseEvent.close';

        BaseEvent.CLOSING = 'BaseEvent.closing';

        BaseEvent.COMPLETE = 'BaseEvent.complete';

        BaseEvent.CONNECT = 'BaseEvent.connect';

        BaseEvent.COPY = 'BaseEvent.copy';

        BaseEvent.CUT = 'BaseEvent.cut';

        BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';

        BaseEvent.DISPLAYING = 'BaseEvent.displaying';

        BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';

        BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';

        BaseEvent.EXITING = 'BaseEvent.exiting';

        BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';

        BaseEvent.INIT = 'BaseEvent.init';

        BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';

        BaseEvent.OPEN = 'BaseEvent.open';

        BaseEvent.PASTE = 'BaseEvent.paste';

        BaseEvent.PREPARING = 'BaseEvent.preparing';

        BaseEvent.REMOVED = 'BaseEvent.removed';

        BaseEvent.RENDER = 'BaseEvent.render';

        BaseEvent.RESIZE = 'BaseEvent.resize';

        function BaseEvent(type, bubbles, cancelable, data) {
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this);

            /**
             * @overridden BaseObject.CLASS_NAME
             */
            this.CLASS_NAME = 'BaseEvent';

            /**
             * The type of event.
             *
             * @property type
             * @type {string}
             * @default null
             * @readOnly
             */
            this.type = null;

            /**
             * A reference to the object that originally dispatched the event.
             *
             * @property target
             * @type {any}
             * @default null
             * @readOnly
             */
            this.target = null;

            /**
             * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
             *
             * @property currentTarget
             * @type {any}
             * @default null
             * @readOnly
             */
            this.currentTarget = null;

            /**
             * Use to pass any type of data with the event.
             *
             * @property data
             * @type {any}
             * @default null
             */
            this.data = null;

            /**
             * Indicates whether an event is a bubbling event.
             *
             * @property bubble
             * @type {boolean}
             * @default false
             */
            this.bubble = false;

            /**
             * Indicates whether the behavior associated with the event can be prevented.
             *
             * @property cancelable
             * @type {boolean}
             * @default false
             */
            this.cancelable = false;

            /**
             *
             * @property isPropagationStopped
             * @type {boolean}
             * @default false
             * @readOnly
             */
            this.isPropagationStopped = false;

            /**
             *
             * @property isImmediatePropagationStopped
             * @type {boolean}
             * @default false
             * @readOnly
             */
            this.isImmediatePropagationStopped = false;

            this.type = type;
            this.bubble = bubbles;
            this.cancelable = cancelable;
            this.data = data;
        }

        /**
         * Duplicates an instance of an BaseEvent subclass.
         *
         * Returns a new BaseEvent object that is a copy of the original instance of the BaseEvent object.
         * You do not normally call clone(); the EventDispatcher class calls it automatically when you redispatch
         * an event—that is, when you call dispatchEvent(event) from a handler that is handling event.
         *
         * The new Event object includes all the properties of the original.
         *
         * When creating your own custom Event class, you must override the inherited Event.clone() method in order for it
         * to duplicate the properties of your custom class. If you do not set all the properties that you add in your event
         * subclass, those properties will not have the correct values when listeners handle the redispatched event.
         *
         * @method clone
         * @returns {BaseEvent}
         * @public
         */
        BaseEvent.prototype.clone = function () {
            return new BaseEvent(this.type, this.bubble, this.cancelable, this.data);
        };

        /**
         * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
         * This method does not affect any event listeners in the current node (currentTarget). In contrast, the stopImmediatePropagation()
         * method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
         * This method can be called in any phase of
         *
         * @method stopPropagation
         * @public
         */
        BaseEvent.prototype.stopPropagation = function () {
            this.isPropagationStopped = true;
        };

        /**
         * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
         * This method takes effect immediately, and it affects event listeners in the current node. In contrast, the stopPropagation()
         * method doesn't take effect until all the event listeners in the current node finish processing.
         *
         * @method stopImmediatePropagation
         * @public
         */
        BaseEvent.prototype.stopImmediatePropagation = function () {
            this.stopPropagation();
            this.isImmediatePropagationStopped = true;
        };

        return BaseEvent;
    })();

    module.exports = BaseEvent;

});