define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Extend = require('structurejs/util/Extend');
    var BaseEvent = require('structurejs/event/BaseEvent');

    /**
     * The TimerEvent...
     *
     * @class TimerEvent
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
    var TimerEvent = (function () {

        var _super = Extend(TimerEvent, BaseEvent);

        function TimerEvent(type, bubbles, cancelable, data) {
            _super.call(this, type, bubbles, cancelable, data);
        }
        /**
         * @overridden BaseEvent.clone
         */
        TimerEvent.prototype.clone = function () {
            return new TimerEvent(this.type, this.bubble, this.cancelable, this.data);
        };
        TimerEvent.TIMER = 'TimerEvent.timer';

        TimerEvent.TIMER_COMPLETE = 'TimerEvent.timerComplete';
        return TimerEvent;
    })();

    module.exports = TimerEvent;

});