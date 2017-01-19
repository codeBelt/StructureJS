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
declare class EventBroker {
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    private static _eventDispatcher;
    /**
     * A list of wait for objects.
     *
     * @property _waitForList
     * @type {Array<{eventTypes:Array<string>, callback:Function, callbackScope:any, events:Array<any>, once:boolean}>}
     * @private
     * @static
     */
    private static _waitForList;
    constructor();
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
     *     _handlerMethod(event) {
     *          console.log(event.data);
     *     }
     */
    static addEventListener(type: string, callback: Function, scope: any, priority?: number): void;
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
     *     _handlerMethod(event) {
     *          console.log(event.data);
     *     }
     */
    static addEventListenerOnce(type: string, callback: Function, scope: any, priority?: number): void;
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
    static removeEventListener(type: string, callback: Function, scope: any): void;
    /**
     * A way to listen for multiple events.
     *
     * If only listening for one event use {{#crossLink "EventBroker/addEventListener:method"}}{{/crossLink}}.
     *
     * @method waitFor
     * @param eventTypes {Array<string>} A list of event types you are waiting for.
     * @param callback {Function} The callback function that will be triggered when all event types are
     * @param scope {any} The scope of the callback function.
     * @static
     * @public
     * @example
     *     EventBroker.waitFor(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
     *
     *     _handlerMethod(events) {
     *          // An array of the event objects you waited for.
     *     }
     */
    static waitFor(eventTypes: Array<string>, callback: Function, scope: any): void;
    /**
     * A way to listen for multiple events. Once all events all are triggered this listener will be removed.
     *
     * If only listening for one event use {{#crossLink "EventBroker/addEventListenerOnce:method"}}{{/crossLink}}.
     *
     * @method waitForOnce
     * @param eventTypes {Array<string>} A list of event types you are waiting for.
     * @param callback {Function} The callback function that will be triggered when all event types are
     * @param scope {any} The scope of the callback function.
     * @static
     * @public
     * @example
     *     EventBroker.waitForOnce(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
     *
     *     _handlerMethod(events) {
     *          // An array of the event objects you waited for.
     *     }
     */
    static waitForOnce(eventTypes: Array<string>, callback: Function, scope: any): void;
    /**
     * A way to listen for multiple events. Once all events all are triggered it will no longer
     *
     * @method removeWaitFor
     * @param eventTypes {Array<string>} A list of event types you are waiting for.
     * @param callback {Function} The callback function that will be triggered when all event types are
     * @param scope {any} The scope of the callback function.
     * @static
     * @public
     * @example
     *     EventBroker.removeWaitFor(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
     */
    static removeWaitFor(eventTypes: Array<string>, callback: Function, scope: any): void;
    /**
     * Dispatches an event within the EventBroker object.
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @param [scope=null] {any} You can optionally pass in the target of the object that dispatched the global event. Since {{#crossLink "EventBroker"}}{{/crossLink}}
     * @static
     * @public
     * @example
     *      EventBroker.dispatchEvent('change');
     *
     *      // Example: Sending data with the event.
     *      EventBroker.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: Sending a BaseEvent or custom event object.
     *      let event = new BaseEvent(BaseEvent.CHANGE);
     *      event.data = {some: 'data'};
     *      EventBroker.dispatchEvent(event);
     */
    static dispatchEvent(type: any, data?: any, scope?: any): void;
    /**
     * Helper method to dispatch events on the waitForObject objects.
     *
     * @method _dispatchWaitFor
     * @static
     * @private
     */
    private static _dispatchWaitFor(event);
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
    static hasEventListener(type: string, callback: Function, scope: any): boolean;
    /**
     * Returns and array of all current event types and there current listeners.
     *
     * @method getEventListeners
     * @return {Array<any>}
     * @static
     * @public
     * @example
     *      const listenerList = this.getEventListeners();
     */
    static getEventListeners(): Array<any>;
    /**
     * Prints out each event listener in the console.log
     *
     * @method print
     * @return {string}
     * @static
     * @public
     * @example
     *      this.printEventListeners();
     *
     *      // [ClassName] is listening for the 'BaseEvent.change' event.
     *      // [AnotherClassName] is listening for the 'BaseEvent.refresh' event.
     */
    static printEventListeners(): void;
}
export default EventBroker;
