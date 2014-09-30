///<reference path='../ObjectManager.ts'/>
///<reference path='BaseEvent.ts'/>

/**
 * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
 * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 *
 * @class EventDispatcher
 * @extends ObjectManager
 * @module StructureJS
 * @submodule event
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class EventDispatcher extends ObjectManager
    {
        /**
         * Holds a reference to added listeners.
         *
         * @property _listeners
         * @type {Array}
         * @private
         */
        private _listeners:any[] = null;

        /**
         * Indicates the object that contains child object. Use the parent property
         * to specify a relative path to display objects that are above the current display object in the display
         * list hierarchy.
         *
         * @property parent
         * @type {any}
         * @public
         */
        public parent:any = null;

        constructor()
        {
            super();

            this._listeners = [];
        }

        /**
         * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
         * @example
         instance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
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
        public addEventListener(type:string, callback:Function, scope:any, priority:number = 0):EventDispatcher
        {
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list == null)
            {
                // If a list of event listener(s) do not exist for the type value passed in then create a new empty array.
                this._listeners[type] = list = [];
            }
            var index:number = 0;
            var listener;
            var i:number = list.length;
            while (--i > -1)
            {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope)
                {
                    // If same callback and scope is found then remove it. Then add the current one below.
                    list.splice(i, 1);
                }
                else if (index === 0 && listener.priority < priority)
                {
                    index = i + 1;
                }
            }
            // Add the event listener to the list array at the index value.
            list.splice(index, 0, {callback: callback, scope: scope, priority: priority});

            return this;
        }

        /**
         * Removes a specified listener from the EventDispatcher object.
         * @example
         instance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
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
        public removeEventListener(type:string, callback:Function, scope:any):EventDispatcher
        {
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list)
            {
                var i = list.length;
                while (--i > -1)
                {
                    // If the callback and the scope are the same then remove the event listener.
                    if (list[i].callback === callback && list[i].scope === scope)
                    {
                        list.splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        }

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
        public dispatchEvent(type:any, data:any = null):EventDispatcher
        {
            var event = type;

            if (typeof event === 'string')
            {
                event = new BaseEvent(type, false, true, data);
            }

            // If target is null then set it to the object that dispatched the event.
            if (event.target == null)
            {
                event.target = this;
                event.currentTarget = this;
            }

            // Get the list of event listener(s) by the associated type value.
            var list = this._listeners[event.type];
            if (list)
            {
                var i:number = list.length;
                var listener:any;
                while (--i > -1)
                {
                    // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                    if (event.cancelable && event.isImmediatePropagationStopped)
                    {
                        break;
                    }

                    listener = list[i];
                    listener.callback.call(listener.scope, event);
                }
            }

            //Dispatches up the chain of classes that have a parent.
            if (this.parent && event.bubble)
            {
                // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
                if (event.cancelable && event.isPropagationStopped)
                {
                    return this;
                }

                /*
                 // Clone the event because this EventDispatcher class modifies the currentTarget property when bubbling.
                 // We need to set the target to the previous target so we can keep track of the original origin of where
                 // the event was dispatched for the first time.
                 var previousTarget:string = event.target;
                 event = event.clone();
                 event.target = previousTarget;
                 */

                // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
                event.currentTarget = this;

                // Pass the event to the parent (event bubbling).
                this.parent.dispatchEvent(event);
            }

            return this;
        }

        /**
         * @overridden BaseObject.destroy
         */
        public destroy():void
        {
            super.disable();

            super.destroy();
        }

        /**
         * Meant for debugging purposes; returns an array dictionary of the different event listener(s) on the object.
         *
         * @method getEventListeners
         * @return {array} Returns an array dictionary of the different event listener(s) on the object.
         * @public
         */
        public getEventListeners():any[]
        {
            return this._listeners;
        }
    }
}