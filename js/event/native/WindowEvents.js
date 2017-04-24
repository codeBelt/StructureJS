(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WindowEvents = (function () {
        function WindowEvents() {
        }
        return WindowEvents;
    }());
    /**
     * TODO: YUIDoc_comment
     *
     * @property CHANGE
     * @type {string}
     * @static
     */
    WindowEvents.CHANGE = "change";
    exports.default = WindowEvents;
});
