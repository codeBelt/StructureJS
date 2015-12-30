import BaseEvent from './BaseEvent';

/**
 * The NetworkMonitorEvent...
 *
 * @class NetworkMonitorEvent
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
class NetworkMonitorEvent extends BaseEvent
{
    /**
     * TODO: YUIDoc_comment
     *
     * @event STATUS
     * @type {string}
     * @static
     */
    public static STATUS:string = "NetworkMonitorEvent.status";

    /**
     * TODO: YUIDoc_comment
     *
     * @event ONLINE
     * @type {string}
     * @static
     */
    public static ONLINE:string = "NetworkMonitorEvent.online";

    /**
     * TODO: YUIDoc_comment
     *
     * @event OFFLINE
     * @type {string}
     * @static
     */
    public static OFFLINE:string = "NetworkMonitorEvent.offline";

    /**
     * TODO: YUIDoc_comment
     *
     * @property status
     * @type {string}
     * @public
     */
    public status:string = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property connected
     * @type {boolean}
     * @public
     */
    public connected:boolean = false;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, status:string = null, connected:boolean = null, data:any = null)
    {
        super(type, bubbles, cancelable, data);

        this.status = status;
        this.connected = connected;
    }

}

export default NetworkMonitorEvent;