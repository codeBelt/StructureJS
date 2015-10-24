(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports"], function (require, exports) {
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
    })();
    return WindowEvents;
});
