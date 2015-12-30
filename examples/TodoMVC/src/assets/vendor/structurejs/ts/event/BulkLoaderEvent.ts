import BaseEvent from './BaseEvent';

/**
 * The BulkLoaderEvent...
 *
 * @class BulkLoaderEvent
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
class BulkLoaderEvent extends BaseEvent
{
    /**
     * The BulkLoaderEvent.COMPLETE constant defines the value of the type property of an loader event object.
     *
     * @event COMPLETE
     * @type {string}
     * @static
     */
    public static COMPLETE:string = 'BulkLoaderEvent.complete';

    /**
     * The BulkLoaderEvent.LOAD_COMPLETE constant defines the value of the type property of an loader event object.
     *
     * @event LOAD_COMPLETE
     * @type {string}
     * @static
     */
    public static LOAD_COMPLETE:string = 'BulkLoaderEvent.loadComplete';

    /**
     * The BulkLoaderEvent.ERROR constant defines the value of the type property of an loader event object.
     *
     * @event ERROR
     * @type {string}
     * @static
     */
    public static ERROR:string = 'BulkLoaderEvent.error';

    /**
     * TODO: YUIDoc_comment
     *
     * @property total
     * @type {number}
     * @public
     */
    public total:number = 0;

    /**
     * TODO: YUIDoc_comment
     *
     * @property totalComplete
     * @type {number}
     * @public
     */
    public totalComplete:number = 0;

    /**
     * TODO: YUIDoc_comment
     *
     * @property percentComplete
     * @type {number}
     * @public
     */
    public percentComplete:number = 0;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}

export default BulkLoaderEvent;
