import BaseEvent from './BaseEvent';

/**
 * The TimerEvent...
 *
 * @class TimerEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any} Use to pass any type of data with the event.
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires BaseEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class TimerEvent extends BaseEvent
{
    /**
     * Dispatched whenever a Timer object reaches an interval specified according to the Timer.delay property.
     *
     * @event TIMER
     * @type {string}
     * @static
     */
    public static TIMER:string = 'TimerEvent.timer';

    /**
     * Dispatched whenever it has completed the number of requests set by Timer.repeatCount.
     *
     * @event TIMER_COMPLETE
     * @type {string}
     * @static
     */
    public static TIMER_COMPLETE:string = 'TimerEvent.timerComplete';

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}

export default TimerEvent;