import BaseObject from '../BaseObject';

/**
 * The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 *
 * The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 *
 * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
 * detailed information.
 * @class BaseEvent
 * @extends BaseObject
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any} Use to pass any type of data with the event.
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: how to create a custom event by extending BaseEvent.
 *
 *     class CountryEvent extends BaseEvent {
 *
 *          CHANGE_COUNTRY = 'CountryEvent.changeCountry';
 *
 *          constructor(type, bubbles = false, cancelable = false, data = null) {
 *              super(type, bubbles, cancelable, data);
 *
 *              this.countryName = null;
 *          }
 *      }
 *
 *     // Example: how to use the custom event.
 *     let event = new CountryEvent(CountryEvent.CHANGE_COUNTRY);
 *     event.countryName = 'Canada';
 *     this.dispatchEvent(event);
 */
class BaseEvent extends BaseObject
{
    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event ACTIVATE
     * @type {string}
     * @public
     * @static
     */
    public static ACTIVATE:string = 'BaseEvent.activate';

    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event ADDED
     * @type {string}
     * @public
     * @static
     */
    public static ADDED:string = 'BaseEvent.added';

    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event ADDED_TO_STAGE
     * @type {string}
     * @public
     * @static
     */
    public static ADDED_TO_STAGE:string = 'BaseEvent.addedToStage';

    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event CANCEL
     * @type {string}
     * @public
     * @static
     */
    public static CANCEL:string = 'BaseEvent.cancel';

    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event CHANGE
     * @type {string}
     * @public
     * @static
     */
    public static CHANGE:string = 'BaseEvent.change';

    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event CLEAR
     * @type {string}
     * @public
     * @static
     */
    public static CLEAR:string = 'BaseEvent.clear';

    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event CLOSE
     * @type {string}
     * @public
     * @static
     */
    public static CLOSE:string = 'BaseEvent.close';

    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event CLOSING
     * @type {string}
     * @public
     * @static
     */
    public static CLOSING:string = 'BaseEvent.closing';

    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event COMPLETE
     * @type {string}
     * @public
     * @static
     */
    public static COMPLETE:string = 'BaseEvent.complete';

    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event CONNECT
     * @type {string}
     * @public
     * @static
     */
    public static CONNECT:string = 'BaseEvent.connect';

    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event COPY
     * @type {string}
     * @public
     * @static
     */
    public static COPY:string = 'BaseEvent.copy';

    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event CUT
     * @type {string}
     * @public
     * @static
     */
    public static CUT:string = 'BaseEvent.cut';

    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event DEACTIVATE
     * @type {string}
     * @public
     * @static
     */
    public static DEACTIVATE:string = 'BaseEvent.deactivate';

    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event DISPLAYING
     * @type {string}
     * @public
     * @static
     */
    public static DISPLAYING:string = 'BaseEvent.displaying';

    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event ENTER_FRAME
     * @type {string}
     * @public
     * @static
     */
    public static ENTER_FRAME:string = 'BaseEvent.enterFrame';

    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event EXIT_FRAME
     * @type {string}
     * @public
     * @static
     */
    public static EXIT_FRAME:string = 'BaseEvent.exitFrame';

    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event EXITING
     * @type {string}
     * @public
     * @static
     */
    public static EXITING:string = 'BaseEvent.exiting';

    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event FULLSCREEN
     * @type {string}
     * @public
     * @static
     */
    public static FULLSCREEN:string = 'BaseEvent.fullScreen';

    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event INIT
     * @type {string}
     * @public
     * @static
     */
    public static INIT:string = 'BaseEvent.init';

    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event NETWORK_CHANGE
     * @type {string}
     * @public
     * @static
     */
    public static NETWORK_CHANGE:string = 'BaseEvent.networkChange';

    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event OPEN
     * @type {string}
     * @public
     * @static
     */
    public static OPEN:string = 'BaseEvent.open';

    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event PASTE
     * @type {string}
     * @public
     * @static
     */
    public static PASTE:string = 'BaseEvent.paste';

    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event PREPARING
     * @type {string}
     * @public
     * @static
     */
    public static PREPARING:string = 'BaseEvent.preparing';

    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event REMOVED
     * @type {string}
     * @public
     * @static
     */
    public static REMOVED:string = 'BaseEvent.removed';

    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event RENDER
     * @type {string}
     * @public
     * @static
     */
    public static RENDER:string = 'BaseEvent.render';

    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event RESIZE
     * @type {string}
     * @public
     * @static
     */
    public static RESIZE:string = 'BaseEvent.resize';

    /**
     * The BaseEvent.SELECTED constant defines the value of the type property of a selected event object.
     *
     * @event SELECTED
     * @type {string}
     * @public
     * @static
     */
    public static SELECTED:string = 'BaseEvent.selected';

    /**
     * The type of event.
     *
     * @property type
     * @type {string}
     * @default null
     * @public
     * @readOnly
     */
    public type:string = null;

    /**
     * A reference to the object that originally dispatched the event.
     *
     * @property target
     * @type {any}
     * @default null
     * @public
     * @readOnly
     */
    public target:any = null;

    /**
     * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
     *
     * @property currentTarget
     * @type {any}
     * @default null
     * @public
     * @readOnly
     */
    public currentTarget:any = null;

    /**
     * Used to pass any type of data with the event.
     *
     * @property data
     * @type {any}
     * @public
     * @default null
     */
    public data:any = null;

    /**
     * Indicates whether an event is a bubbling event.
     *
     * @property bubbles
     * @type {boolean}
     * @public
     * @default false
     */
    public bubbles:boolean = false;

    /**
     * Indicates whether the behavior associated with the event can be prevented.
     *
     * @property cancelable
     * @type {boolean}
     * @public
     * @default false
     */
    public cancelable:boolean = false;

    /**
     * Indicates if the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} was called on the event object.
     *
     * @property isPropagationStopped
     * @type {boolean}
     * @default false
     * @public
     * @readOnly
     */
    public isPropagationStopped:boolean = false;

    /**
     * Indicates if the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} was called on the event object.
     *
     * @property isImmediatePropagationStopped
     * @type {boolean}
     * @default false
     * @public
     * @readOnly
     */
    public isImmediatePropagationStopped:boolean = false;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super();

        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.data = data;
    }

    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     * This method does not affect any event listeners in the current node (currentTarget). In contrast,
     * the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} method prevents processing
     * of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
     *
     * @method stopPropagation
     * @public
     * @example
     *     event.stopPropagation();
     */
    public stopPropagation():void
    {
        this.isPropagationStopped = true;
    }

    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     * This method takes effect immediately, and it affects event listeners in the current node. In contrast,
     * the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} method doesn't take effect until
     * all the event listeners in the current node finish processing.
     *
     * @method stopImmediatePropagation
     * @public
     * @example
     *     event.stopImmediatePropagation();
     */
    public stopImmediatePropagation():void
    {
        this.stopPropagation();
        this.isImmediatePropagationStopped = true;
    }

    /**
     * Duplicates an instance of an BaseEvent subclass.
     *
     * Returns a new BaseEvent object that is a copy of the original instance of the BaseEvent object.
     *
     * The new BaseEvent object includes all the properties of the original.
     *
     * @method clone
     * @returns {BaseEvent}
     * @public
     * @example
     *     let cloneOfEvent = event.clone();
     */
    public clone():BaseEvent
    {
        const clonedBaseModel:BaseEvent = new (<any>this).constructor(this.type, this.bubbles, this.cancelable, this.data);

        for (let key in this)
        {
            if (this.hasOwnProperty(key))
            {
                clonedBaseModel[key] = this[key];
            }
        }

        return clonedBaseModel;
    }

}

export default BaseEvent;