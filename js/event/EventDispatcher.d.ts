import ObjectManager from '../ObjectManager';
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
declare class EventDispatcher extends ObjectManager {
    /**
     * Holds a reference to added listeners.
     *
     * @property _listeners
     * @type {any}
     * @protected
     */
    protected _listeners: any;
    /**
     * Indicates the object that contains a child object. Uses the parent property
     * to specify a relative path to display objects that are above the current display object in the display
     * list hierarchy and helps facilitate event bubbling.
     *
     * @property parent
     * @type {any}
     * @public
     */
    parent: any;
    constructor();
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
    addEventListener(type: string, callback: Function, scope: any, priority?: number): EventDispatcher;
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
    addEventListenerOnce(type: string, callback: Function, scope: any, priority?: number): EventDispatcher;
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
    removeEventListener(type: string, callback: Function, scope: any): EventDispatcher;
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
    dispatchEvent(type: any, data?: any): EventDispatcher;
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
    hasEventListener(type: string, callback: Function, scope: any): boolean;
    /**
     * Returns and array of all current event types and there current listeners.
     *
     * @method getEventListeners
     * @return {Array<any>}
     * @public
     * @example
     *      this.getEventListeners();
     */
    getEventListeners(): Array<any>;
    /**
     * Prints out each event listener in the console.log
     *
     * @method print
     * @return {string}
     * @public
     * @example
     *      this.printEventListeners();
     *
     *      // [ClassName] is listening for the 'BaseEvent.change' event.
     *      // [AnotherClassName] is listening for the 'BaseEvent.refresh' event.
     */
    printEventListeners(): void;
    /**
     * @overridden BaseObject.destroy
     */
    destroy(): void;
}
export default EventDispatcher;
