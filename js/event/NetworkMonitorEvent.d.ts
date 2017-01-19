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
declare class NetworkMonitorEvent extends BaseEvent {
    /**
     * TODO: YUIDoc_comment
     *
     * @event STATUS
     * @type {string}
     * @static
     */
    static STATUS: string;
    /**
     * TODO: YUIDoc_comment
     *
     * @event ONLINE
     * @type {string}
     * @static
     */
    static ONLINE: string;
    /**
     * TODO: YUIDoc_comment
     *
     * @event OFFLINE
     * @type {string}
     * @static
     */
    static OFFLINE: string;
    /**
     * TODO: YUIDoc_comment
     *
     * @property status
     * @type {string}
     * @public
     */
    status: string;
    /**
     * TODO: YUIDoc_comment
     *
     * @property connected
     * @type {boolean}
     * @public
     */
    connected: boolean;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean, status?: string, connected?: boolean, data?: any);
}
export default NetworkMonitorEvent;
