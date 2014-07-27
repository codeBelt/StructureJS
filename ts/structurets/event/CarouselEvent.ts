import BaseEvent = require('BaseEvent')

class CarouselEvent extends BaseEvent
{
    /**
     * YUIDoc_comment
     *
     * @event START
     * @type {string}
     * @static
     */
    public static START:string = "CarouselEvent.start";

    /**
     * YUIDoc_comment
     *
     * @event BEGIN
     * @type {string}
     * @static
     */
    public static BEGIN:string = "CarouselEvent.begin";

    /**
     * YUIDoc_comment
     *
     * @event END
     * @type {string}
     * @static
     */
    public static END:string = "CarouselEvent.end";

    /**
     * YUIDoc_comment
     *
     * @event NEXT
     * @type {string}
     * @static
     */
    public static NEXT:string = "CarouselEvent.next";

    /**
     * YUIDoc_comment
     *
     * @event PREVIOUS
     * @type {string}
     * @static
     */
    public static PREVIOUS:string = "CarouselEvent.previous";

    /**
     * YUIDoc_comment
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = "CarouselEvent.change";

    /**
     * YUIDoc_comment
     *
     * @event PROGRESS
     * @type {string}
     * @static
     */
    public static PROGRESS:string = "CarouselEvent.progress";

    /**
     * YUIDoc_comment
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = "CarouselEvent.complete";

    /**
     * YUIDoc_comment
     *
     * @class CarouselEvent
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
     * @version 0.1.0
     **/
    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

    /**
     * @overridden BaseEvent.clone
     */
    public clone():CarouselEvent
    {
        return new CarouselEvent(this.type, this.bubble, this.cancelable, this.data);
    }

}
export = CarouselEvent;