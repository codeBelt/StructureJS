/*
* Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
*/
define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseEvent = require('structurejs/event/BaseEvent');

    /**
     * The RouteEvent is used in the {{#crossLink "Router"}}{{/crossLink}} class and gets passed to the callback in the {{#crossLink "Route"}}{{/crossLink}} class.
     *
     * @class RouteEvent
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
    var RouteEvent = (function () {

        var _super = Extend(RouteEvent, BaseEvent);

        function RouteEvent(type, bubbles, cancelable, data) {
            if (typeof type === "undefined") { type = RouteEvent.CHANGE; }
            if (typeof bubbles === "undefined") { bubbles = false; }
            if (typeof cancelable === "undefined") { cancelable = false; }
            if (typeof data === "undefined") { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            /**
             * The route that was matched against {{#crossLink "RouteEvent/routePattern:property"}}{{/crossLink}} property.
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
             * The route pattern that matched the {{#crossLink "RouteEvent/route:property"}}{{/crossLink}} property.
             *
             * @property routePattern
             * @type {string}
             * @public
             */
            this.routePattern = null;
            /**
             * An array containing the parameters captured from the Route.{{#crossLink "Route/match:method"}}{{/crossLink}}
             * being called with the {{#crossLink "RouteEvent/routePattern:property"}}{{/crossLink}} property.
             *
             * @property params
             * @type {string}
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
         * @overridden BaseEvent.clone
         */
        RouteEvent.prototype.clone = function () {
            var event = new RouteEvent(this.type, this.bubble, this.cancelable, this.data);
            event.route = this.route;
            event.newURL = this.newURL;
            event.oldURL = this.oldURL;
            event.routePattern = this.routePattern;
            event.query = this.query;
            return event;
        };
        /**
         * The RouteEvent.CHANGE constant defines the value of the type property of an change route event object.
         *
         * @event CHANGE
         * @type {string}
         * @static
         */
        RouteEvent.CHANGE = 'RouteEvent.change';
        return RouteEvent;
    })();

    module.exports = RouteEvent;

});