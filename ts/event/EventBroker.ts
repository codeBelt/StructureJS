///<reference path='EventDispatcher.ts'/>
///<reference path='BaseEvent.ts'/>
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
module StructureJS
{
    export class EventBroker
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

        constructor()
        {
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
         *     EventBroker.addEventListener('change', this.handlerMethod, this);
         *     // Example of using a constant event type.
         *     EventBroker.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *
         *     // The event passed to the method will always be a BaseEvent object.
         *     ClassName.prototype.handlerMethod = function (event) {
         *          console.log(event.data);
         *     }
         */
        public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void
        {
            EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
        }

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
         *     EventBroker.removeEventListener('change', this.handlerMethod, this);
         *
         *     EventBroker.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         */
        public static removeEventListener(type:string, callback:Function, scope:any):void
        {
            EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
        }

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
         *      // Example with sending data with the event.
         *      EventBroker.dispatchEvent('change', {some: 'data'});
         *
         *      // Example of sending a BaseEvent or custom event object.
         *      var event = new BaseEvent(BaseEvent.CHANGE);
         *      event.data = {some: 'data'};
         *      EventBroker.dispatchEvent(event);
         */
        public static dispatchEvent(type:any, data:any = null):void
        {
            var event:any = type;

            if (typeof event === 'string')
            {
                event = new BaseEvent(type, false, false, data);
            }

            event.target = EventBroker;
            event.currentTarget = EventBroker;

            EventBroker._eventDispatcher.dispatchEvent(event);
        }

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
         *      EventBroker.hasEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         */
        public static hasEventListener(type:string, callback:Function, scope:any):boolean
        {
            return EventBroker._eventDispatcher.hasEventListener(type, callback, scope);
        }

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
        public static getEventListeners():string
        {
            return EventBroker._eventDispatcher.getEventListeners();
        }

    }
}