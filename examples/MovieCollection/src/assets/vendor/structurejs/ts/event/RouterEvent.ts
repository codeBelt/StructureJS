import BaseEvent from './BaseEvent';

/**
 * The RouterEvent is used in the {{#crossLink "Router"}}{{/crossLink}} class and gets passed to the callback in the {{#crossLink "Route"}}{{/crossLink}} class.
 *
 * @class RouterEvent
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
class RouterEvent extends BaseEvent
{
    /**
     * The RouterEvent.CHANGE constant defines the value of the type property of an change route event object.
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = 'RouterEvent.change';

    /**
     * The route that was matched against {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
     *
     * @property route
     * @type {string}
     * @public
     */
    public route:string = null;

    /**
     * The new URL to which the window is navigating.
     *
     * @property newURL
     * @type {string}
     * @public
     */
    public newURL:string = null;

    /**
     * The previous URL from which the window was navigated.
     *
     * @property oldURL
     * @type {string}
     * @public
     */
    public oldURL:string = null;

    /**
     * The route pattern that matched the {{#crossLink "RouterEvent/route:property"}}{{/crossLink}} property.
     *
     * @property routePattern
     * @type {string}
     * @public
     */
    public routePattern:string = null;

    /**
     * An array containing the parameters captured from the Route.{{#crossLink "Route/match:method"}}{{/crossLink}}
     * being called with the {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
     *
     * @property params
     * @type {Array.<string>}
     * @public
     */
    public params:Array<string> = [];

    /**
     * A query object the represents the query string in the hash url.
     *
     * @property query
     * @type {any}
     * @public
     */
    public query:any = null;

    constructor(type:string = RouterEvent.CHANGE, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);
    }

}

export default RouterEvent;