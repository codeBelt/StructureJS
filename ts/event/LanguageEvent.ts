///<reference path='BaseEvent.ts'/>

/**
 * The LanguageEvent...
 *
 * @class LanguageEvent
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
    export class LanguageEvent extends BaseEvent
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @event CONFIG_LOADED
         * @type {string}
         * @static
         */
        public static CONFIG_LOADED:string = "LanguageEvent.configLoaded";

        /**
         * TODO: YUIDoc_comment
         *
         * @event LOAD_COMPLETE
         * @type {string}
         * @static
         */
        public static LANGUAGE_LOADED:string = "LanguageEvent.languageLoaded";

        /**
         * TODO: YUIDoc_comment
         *
         * @event LANGUAGE_CHANGE
         * @type {string}
         * @static
         */
        public static LANGUAGE_CHANGE:string = "LanguageEvent.languageChange";

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
        {
            super(type, bubbles, cancelable, data);
        }

        /**
         * @overridden BaseEvent.clone
         */
        public clone():LanguageEvent
        {
            return new LanguageEvent(this.type, this.bubble, this.cancelable, this.data);
        }
    }
}