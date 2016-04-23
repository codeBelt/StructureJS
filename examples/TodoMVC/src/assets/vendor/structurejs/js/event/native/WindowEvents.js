(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var WindowEvents = (function () {
        function WindowEvents() {
        }
        /**
         * TODO: YUIDoc_comment
         *
         * @property CHANGE
         * @type {string}
         * @static
         */
        WindowEvents.CHANGE = "change";
        return WindowEvents;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WindowEvents;
});
