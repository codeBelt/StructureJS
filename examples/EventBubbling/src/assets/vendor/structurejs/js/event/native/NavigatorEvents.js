/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.NavigatorEvents = factory();
    }
}(this, function() {

    'use strict';

    var NavigatorEvents = (function() {
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
