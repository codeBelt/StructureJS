var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './BaseEvent'], factory);
    }
})(function (require, exports) {
    "use strict";
    var BaseEvent_1 = require('./BaseEvent');
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
    var BulkLoaderEvent = (function (_super) {
        __extends(BulkLoaderEvent, _super);
        function BulkLoaderEvent(type, bubbles, cancelable, data) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            /**
             * TODO: YUIDoc_comment
             *
             * @property total
             * @type {number}
             * @public
             */
            this.total = 0;
            /**
             * TODO: YUIDoc_comment
             *
             * @property totalComplete
             * @type {number}
             * @public
             */
            this.totalComplete = 0;
            /**
             * TODO: YUIDoc_comment
             *
             * @property percentComplete
             * @type {number}
             * @public
             */
            this.percentComplete = 0;
        }
        /**
         * The BulkLoaderEvent.COMPLETE constant defines the value of the type property of an loader event object.
         *
         * @event COMPLETE
         * @type {string}
         * @static
         */
        BulkLoaderEvent.COMPLETE = 'BulkLoaderEvent.complete';
        /**
         * The BulkLoaderEvent.LOAD_COMPLETE constant defines the value of the type property of an loader event object.
         *
         * @event LOAD_COMPLETE
         * @type {string}
         * @static
         */
        BulkLoaderEvent.LOAD_COMPLETE = 'BulkLoaderEvent.loadComplete';
        /**
         * The BulkLoaderEvent.ERROR constant defines the value of the type property of an loader event object.
         *
         * @event ERROR
         * @type {string}
         * @static
         */
        BulkLoaderEvent.ERROR = 'BulkLoaderEvent.error';
        return BulkLoaderEvent;
    }(BaseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BulkLoaderEvent;
});
