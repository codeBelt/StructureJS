(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var MouseEvents = (function () {
        function MouseEvents() {
        }
        /**
         * The event occurs when the user clicks on an element.
         *
         * @property CLICK
         * @type {string}
         * @static
         */
        MouseEvents.CLICK = 'click';
        /**
         * The event occurs when the user double-clicks on an element.
         *
         * @property DBL_CLICK
         * @type {string}
         * @static
         */
        MouseEvents.DBL_CLICK = 'dblclick';
        /**
         * The event occurs when a user presses a mouse button over an element.
         *
         * @property MOUSE_DOWN
         * @type {string}
         * @static
         */
        MouseEvents.MOUSE_DOWN = 'mousedown';
        /**
         * The event occurs when the pointer is moving while it is over an element.
         *
         * @property MOUSE_MOVE
         * @type {string}
         * @static
         */
        MouseEvents.MOUSE_MOVE = 'mousemove';
        /**
         * The event occurs when the pointer is moved onto an element.
         *
         * @property MOUSE_OVER
         * @type {string}
         * @static
         */
        MouseEvents.MOUSE_OVER = 'mouseover';
        /**
         * The event occurs when a user moves the mouse pointer out of an element.
         *
         * @property MOUSE_OUT
         * @type {string}
         * @static
         */
        MouseEvents.MOUSE_OUT = 'mouseout';
        /**
         * The event occurs when a user releases a mouse button over an element
         *
         * @property MOUSE_UP
         * @type {string}
         * @static
         */
        MouseEvents.MOUSE_UP = 'mouseup';
        /**
         *
         *
         * @property TAP
         * @type {string}
         * @static
         */
        MouseEvents.TAP = 'tap';
        return MouseEvents;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = MouseEvents;
});
