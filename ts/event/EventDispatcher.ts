import ObjectManager from '../ObjectManager';
import BaseEvent from './BaseEvent';

/**
 * EventDispatcher is the base class for all classes that dispatch events. It is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
 * EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 *
 * @class EventDispatcher
 * @extends ObjectManager
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires ObjectManager
 * @requires BaseEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Another way to use the EventDispatcher.
 *      let eventDispatcher = new EventDispatcher();
 *      eventDispatcher.addEventListener('change', this._handlerMethod, this);
 *      eventDispatcher.dispatchEvent('change');
 */
class EventDispatcher extends ObjectManager
{
    /**
     * Holds a reference to added listeners.
     *
     * @property _listeners
     * @type {Array.<any>}
     * @protected
     */
    protected _listeners:Array<any> = null;

    /**
     * Indicates the object that contains a child object. Uses the parent property
     * to specify a relative path to display objects that are above the current display object in the display
     * list hierarchy and helps facilitate event bubbling.
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
     * Registers an event listener object with an EventDispatcher object so the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @public
     * @chainable
     * @example
     *      this.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *      _handlerMethod(event) {
     *          console.log(event.target + " sent the event.");
     *          console.log(event.type, event.data);
     *      }
     */
    public addEventListener(type:string, callback:Function, scope:any, priority:number = 0):EventDispatcher
    {
        // Get the list of event listeners by the associated type value that is passed in.
        let list = this._listeners[type];
        if (list == null)
        {
            // If a list of event listeners do not exist for the type value passed in then create a new empty array.
            this._listeners[type] = list = [];
        }
        let index:number = 0;
        let listener;
        let i:number = list.length;
        while (--i > -1)
        {
            listener = list[i];
            if (listener.callback === callback && listener.scope === scope)
            {
                // If the same callback and scope are found then remove it and add the current one below.
                list.splice(i, 1);
            }
            else if (index === 0 && listener.priority < priority)
            {
                index = i + 1;
            }
        }
        // Add the event listener to the list array at the index value.
        list.splice(index, 0, {callback: callback, scope: scope, priority: priority, once: false});

        return this;
    }

    /**
     * Registers an event listener object once with an EventDispatcher object so the listener will receive the notification of an event.
     *
     * @method addEventListenerOnce
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @public
     * @chainable
     * @example
     *      this.addEventListenerOnce(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *      _handlerMethod(event) {
     *          console.log(event.target + " sent the event.");
     *          console.log(event.type, event.data);
     *      }
     */
    public addEventListenerOnce(type:string, callback:Function, scope:any, priority:number = 0):EventDispatcher
    {
        // Add the event listener the normal way.
        this.addEventListener(type, callback, scope, priority);

        // Get the event listeners we just added.
        const list = this._listeners[type];
        const listener = list[0];

        // Change the value to true so it will be remove after dispatchEvent is called.
        listener.once = true;

        return this;
    }

    /**
     * Removes a specified listener from the EventDispatcher object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * @hide This was added because it was needed for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
     * @public
     * @chainable
     * @example
     *      this.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    public removeEventListener(type:string, callback:Function, scope:any):EventDispatcher
    {
        // Get the list of event listeners by the associated type value that is passed in.
        const list:Array<any> = this._listeners[type];
        if (list !== void 0)
        {
            let i = list.length;
            while (--i > -1)
            {
                // If the callback and scope are the same then remove the event listener.
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
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch. You can create custom events, the only requirement is all events must extend {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @public
     * @chainable
     * @example
     *      this.dispatchEvent('change');
     *
     *      // Example: Sending data with the event:
     *      this.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: With an event object
     *      // (event type, bubbling set to true, cancelable set to true and passing data) :
     *      let event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
     *      this.dispatchEvent(event);
     *
     *      // Here is a common inline event object being dispatched:
     *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
     */
    public dispatchEvent(type:any, data:any = null):EventDispatcher
    {
        let event = type;

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

        // Get the list of event listener by the associated type value.
        const list:Array<any> = this._listeners[event.type];
        if (list !== void 0)
        {
            let i:number = list.length;
            let listener:any;
            while (--i > -1)
            {
                // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                if (event.cancelable === true && event.isImmediatePropagationStopped === true)
                {
                    break;
                }

                listener = list[i];
                listener.callback.call(listener.scope, event);

                // If the once value is true we want to remove the listener right after this callback was called.
                if (listener.once === true)
                {
                    this.removeEventListener(event.type, listener.callback, listener.scope);
                }
            }
        }

        //Dispatches up the chain of classes that have a parent.
        if (this.parent != null && event.bubbles === true)
        {
            // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
            if (event.cancelable === true && event.isPropagationStopped === true)
            {
                return this;
            }

            // Assign the current object that is currently processing the event (i.e. event bubbling at).
            event.currentTarget = this;

            // Pass the event to the parent (event bubbling).
            this.parent.dispatchEvent(event);
        }

        return this;
    }

    /**
     * Check if an object has a specific event listener already added.
     *
     * @method hasEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener method to call.
     * @param scope {any} The scope of the listener object.
     * @return {boolean}
     * @public
     * @example
     *      this.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    public hasEventListener(type:string, callback:Function, scope:any):boolean
    {
        if (this._listeners[type] !== void 0)
        {
            let listener:any;
            const numOfCallbacks:number = this._listeners[type].length;
            for (let i:number = 0; i < numOfCallbacks; i++)
            {
                listener = this._listeners[type][i];
                if (listener.callback === callback && listener.scope === scope)
                {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Generates a string output of event listeners for a given object.
     *
     * @method getEventListeners
     * @return {string}
     * @public
     * @example
     *      this.getEventListeners();
     *
     *      // [ClassName] is listening for the 'BaseEvent.change' event.
     */
    public getEventListeners():string
    {
        let str:string = '';
        let numOfCallbacks:number;
        let listener:any;

        for (let type in this._listeners)
        {
            numOfCallbacks = this._listeners[type].length;
            for (let i:number = 0; i < numOfCallbacks; i++)
            {
                listener = this._listeners[type][i];

                if (listener.scope && (typeof listener.scope.getQualifiedClassName === 'function'))
                {
                    str += '[' + listener.scope.getQualifiedClassName() + ']';
                }
                else
                {
                    str += '[Unknown]';
                }

                str += " is listen for '" + type + "' event.\n";
            }
        }

        return str;
    }

    /**
     * @overridden BaseObject.destroy
     */
    public destroy():void
    {
        this.disable();

        super.destroy();
    }

}

export default EventDispatcher;
