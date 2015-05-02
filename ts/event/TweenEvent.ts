'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./BaseEvent as BaseEvent
 @export TweenEvent
 */
import BaseEvent = require('./BaseEvent');

/**
 * TODO: YUIDoc_comment
 *
 * @class TweenEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any} Use to pass any type of data with the event.
 * @module StructureJS
 * @submodule event
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class TweenEvent extends BaseEvent
{
    /**
     * TODO: YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static START:string = "TweenEvent.start";

    /**
     * TODO: YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static UPDATE:string = "TweenEvent.update";

    /**
     * TODO: YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = "TweenEvent.complete";

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, tweenObject:any = null)
    {
        super(type, bubbles, cancelable, tweenObject);
    }

}

export = TweenEvent;