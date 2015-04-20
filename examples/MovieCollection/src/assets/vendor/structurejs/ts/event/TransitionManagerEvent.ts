///<reference path='BaseEvent.ts'/>

/**
 * The TransitionManagerEvent...
 *
 * @class TransitionManagerEvent
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
module StructureTS
{
    export class TransitionManagerEvent extends BaseEvent
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @event TRANSITION
         * @type {string}
         * @static
         */
        public static TRANSITION:string = 'TransitionManagerEvent.transition';

        /**
         * TODO: YUIDoc_comment
         *
         * @event TRANSITION_START
         * @type {string}
         * @static
         */
        public static TRANSITION_START:string = 'TransitionManagerEvent.transitionStart';

        /**
         * TODO: YUIDoc_comment
         *
         * @event TRANSITION_COMPLETE
         * @type {string}
         * @static
         */
        public static TRANSITION_COMPLETE:string = 'TransitionManagerEvent.transitionComplete';

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
        {
            super(type, bubbles, cancelable, data);
        }

        /**
         * @overridden BaseEvent.clone
         */
        public clone():TransitionManagerEvent
        {
            return new TransitionManagerEvent(this.type, this.bubble, this.cancelable, this.data);
        }
    }
}