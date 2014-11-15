/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.NavigatorEvents = factory();
    }
}(this, function() {
    'use strict';

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
    })();

    return NavigatorEvents;
}));