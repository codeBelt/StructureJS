/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import EventDispatcher = require('EventDispatcher')
import BaseEvent = require('BaseEvent')

/**
 * EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications.
 * Loosely coupled event handling, the subscriber does not know the publisher. Both of them only need to know the event type.
 *
 * @class EventBroker
 * @module StructureJS
 * @submodule event
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
class EventBroker
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
        throw new Error('[EventBroker] Do not instantiation the EventBroker class because it is a static class.');
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
     *          console.log(event.target + " sent the event.");
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
     *      EventBroker.dispatchEvent(event);
     */
    public static dispatchEvent(type:any, data:any = null):void
    {
        var event:any = type;

        if (typeof event === 'string') {
            event = new BaseEvent(type, false, false, data);
        }

        event.target = EventBroker;
        event.currentTarget = EventBroker;

        EventBroker._eventDispatcher.dispatchEvent(event);
    }

}
export = EventBroker;