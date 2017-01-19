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
declare class BaseEvent extends BaseObject {
    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event ACTIVATE
     * @type {string}
     * @public
     * @static
     */
    static ACTIVATE: string;
    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event ADDED
     * @type {string}
     * @public
     * @static
     */
    static ADDED: string;
    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event ADDED_TO_STAGE
     * @type {string}
     * @public
     * @static
     */
    static ADDED_TO_STAGE: string;
    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event CANCEL
     * @type {string}
     * @public
     * @static
     */
    static CANCEL: string;
    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event CHANGE
     * @type {string}
     * @public
     * @static
     */
    static CHANGE: string;
    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event CLEAR
     * @type {string}
     * @public
     * @static
     */
    static CLEAR: string;
    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event CLOSE
     * @type {string}
     * @public
     * @static
     */
    static CLOSE: string;
    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event CLOSING
     * @type {string}
     * @public
     * @static
     */
    static CLOSING: string;
    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event COMPLETE
     * @type {string}
     * @public
     * @static
     */
    static COMPLETE: string;
    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event CONNECT
     * @type {string}
     * @public
     * @static
     */
    static CONNECT: string;
    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event COPY
     * @type {string}
     * @public
     * @static
     */
    static COPY: string;
    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event CUT
     * @type {string}
     * @public
     * @static
     */
    static CUT: string;
    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event DEACTIVATE
     * @type {string}
     * @public
     * @static
     */
    static DEACTIVATE: string;
    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event DISPLAYING
     * @type {string}
     * @public
     * @static
     */
    static DISPLAYING: string;
    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event ENTER_FRAME
     * @type {string}
     * @public
     * @static
     */
    static ENTER_FRAME: string;
    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event EXIT_FRAME
     * @type {string}
     * @public
     * @static
     */
    static EXIT_FRAME: string;
    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event EXITING
     * @type {string}
     * @public
     * @static
     */
    static EXITING: string;
    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event FULLSCREEN
     * @type {string}
     * @public
     * @static
     */
    static FULLSCREEN: string;
    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event INIT
     * @type {string}
     * @public
     * @static
     */
    static INIT: string;
    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event NETWORK_CHANGE
     * @type {string}
     * @public
     * @static
     */
    static NETWORK_CHANGE: string;
    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event OPEN
     * @type {string}
     * @public
     * @static
     */
    static OPEN: string;
    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event PASTE
     * @type {string}
     * @public
     * @static
     */
    static PASTE: string;
    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event PREPARING
     * @type {string}
     * @public
     * @static
     */
    static PREPARING: string;
    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event REMOVED
     * @type {string}
     * @public
     * @static
     */
    static REMOVED: string;
    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event RENDER
     * @type {string}
     * @public
     * @static
     */
    static RENDER: string;
    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event RESIZE
     * @type {string}
     * @public
     * @static
     */
    static RESIZE: string;
    /**
     * The BaseEvent.SELECTED constant defines the value of the type property of a selected event object.
     *
     * @event SELECTED
     * @type {string}
     * @public
     * @static
     */
    static SELECTED: string;
    /**
     * The type of event.
     *
     * @property type
     * @type {string}
     * @default null
     * @public
     * @readOnly
     */
    type: string;
    /**
     * A reference to the object that originally dispatched the event.
     *
     * @property target
     * @type {any}
     * @default null
     * @public
     * @readOnly
     */
    target: any;
    /**
     * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
     *
     * @property currentTarget
     * @type {any}
     * @default null
     * @public
     * @readOnly
     */
    currentTarget: any;
    /**
     * Used to pass any type of data with the event.
     *
     * @property data
     * @type {any}
     * @public
     * @default null
     */
    data: any;
    /**
     * Indicates whether an event is a bubbling event.
     *
     * @property bubbles
     * @type {boolean}
     * @public
     * @default false
     */
    bubbles: boolean;
    /**
     * Indicates whether the behavior associated with the event can be prevented.
     *
     * @property cancelable
     * @type {boolean}
     * @public
     * @default false
     */
    cancelable: boolean;
    /**
     * Indicates if the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} was called on the event object.
     *
     * @property isPropagationStopped
     * @type {boolean}
     * @default false
     * @public
     * @readOnly
     */
    isPropagationStopped: boolean;
    /**
     * Indicates if the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} was called on the event object.
     *
     * @property isImmediatePropagationStopped
     * @type {boolean}
     * @default false
     * @public
     * @readOnly
     */
    isImmediatePropagationStopped: boolean;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any);
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
    stopPropagation(): void;
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
    stopImmediatePropagation(): void;
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
    clone(): BaseEvent;
}
export default BaseEvent;
