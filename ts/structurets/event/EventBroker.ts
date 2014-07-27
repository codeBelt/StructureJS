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
 * Loosely coupled event handling, the subscriber does not have to know the publisher. Both of them only need to know the event type.
 *
 * @class EventBroker
 * @module StructureJS
 * @submodule event
 * @static
 **/
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
    public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void
    {
        EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
    }

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
    public static removeEventListener(type:string, callback:Function, scope:any):void
    {
        EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
    }

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
    public static dispatchEvent(event:BaseEvent):void
    {
        event.target = EventBroker;
        event.currentTarget = EventBroker;

        EventBroker._eventDispatcher.dispatchEvent(event);
    }

}
export = EventBroker;