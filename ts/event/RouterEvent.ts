///<reference path='BaseEvent.ts'/>

/**
 * The RouterEvent...
 *
 * @class RouterEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: Bubbling will only work with DisplayObjectContainer classes throw the display list hierarchy. Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [url=null] {string}
 * @param [silent=false] {boolean} Indicates whether setting hash value should dispatching changed event within the {{#crossLink "RouterController"}}{{/crossLink}}.
 * @param [data=null] {any}
 * @module StructureJS
 * @submodule event
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class RouterEvent extends BaseEvent
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @event CHANGE
         * @type {string}
         * @static
         */
        public static CHANGE:string = 'RouterEvent.change';

        /**
         * TODO: YUIDoc_comment
         *
         * @property url
         * @type {string}
         * @public
         */
        public url:string = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property silent
         * @type {boolean}
         * @public
         */
        public silent:boolean = null;

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, url:string = null, silent:boolean = false, data:any = null)
        {
            super(type, bubbles, cancelable, data);

            this.url = url;
            this.silent = silent;
        }

        /**
         * @overridden BaseEvent.clone
         */
        public clone():RouterEvent
        {
            return new RouterEvent(this.type, this.bubble, this.cancelable, this.url, this.silent, this.data);
        }
    }
}