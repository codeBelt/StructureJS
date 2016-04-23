(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var NavigatorEvents = (function () {
        function NavigatorEvents() {
        }
        /**
         * TODO: YUIDoc_comment
         *
         * @event ONLINE
         * @type {string}
         * @static
         */
        NavigatorEvents.ONLINE = "online";
        /**
         * TODO: YUIDoc_comment
         *
         * @event OFFLINE
         * @type {string}
         * @static
         */
        NavigatorEvents.OFFLINE = "offline";
        return NavigatorEvents;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = NavigatorEvents;
});
