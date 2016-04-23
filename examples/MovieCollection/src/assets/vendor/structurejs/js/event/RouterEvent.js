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
    var RouterEvent = (function (_super) {
        __extends(RouterEvent, _super);
        function RouterEvent(type, bubbles, cancelable, data) {
            if (type === void 0) { type = RouterEvent.CHANGE; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            /**
             * The route that was matched against {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
             *
             * @property route
             * @type {string}
             * @public
             */
            this.route = null;
            /**
             * The new URL to which the window is navigating.
             *
             * @property newURL
             * @type {string}
             * @public
             */
            this.newURL = null;
            /**
             * The previous URL from which the window was navigated.
             *
             * @property oldURL
             * @type {string}
             * @public
             */
            this.oldURL = null;
            /**
             * The route pattern that matched the {{#crossLink "RouterEvent/route:property"}}{{/crossLink}} property.
             *
             * @property routePattern
             * @type {string}
             * @public
             */
            this.routePattern = null;
            /**
             * An array containing the parameters captured from the Route.{{#crossLink "Route/match:method"}}{{/crossLink}}
             * being called with the {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
             *
             * @property params
             * @type {Array.<string>}
             * @public
             */
            this.params = [];
            /**
             * A query object the represents the query string in the hash url.
             *
             * @property query
             * @type {any}
             * @public
             */
            this.query = null;
        }
        /**
         * The RouterEvent.CHANGE constant defines the value of the type property of an change route event object.
         *
         * @event CHANGE
         * @type {string}
         * @static
         */
        RouterEvent.CHANGE = 'RouterEvent.change';
        return RouterEvent;
    }(BaseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = RouterEvent;
});
