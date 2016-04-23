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
     * The ApplicationCacheEvent ....
     *
     * @class ApplicationCacheEvent
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
    var ApplicationCacheEvent = (function (_super) {
        __extends(ApplicationCacheEvent, _super);
        function ApplicationCacheEvent(type, bubbles, cancelable, data) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
        }
        /**
         * The browser is checking for an update, or is attempting to download
         * the cache manifest for the first time. This is always the first event
         * in the sequence.
         *
         * @event CHECKING
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.CHECKING = 'checking';
        /**
         * The cache manifest hadn't changed.
         *
         * @event NO_UPDATE
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.NO_UPDATE = 'noupdate';
        /**
         * The browser has started to download the cache manifest, either for the
         * first time or because changes have been detected.
         *
         * @event DOWNLOADING
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.DOWNLOADING = 'downloading';
        /**
         * The browser had downloaded and cached an asset. This is fired once for
         * every file that is downloaded (including the current page which is cached implicitly).
         *
         * @event PROGRESS
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.PROGRESS = 'progress';
        /**
         * The resources listed in the manifest have been fully downloaded, and the application is
         * now cached locally.
         *
         * @event CACHED
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.CACHED = 'cached';
        /**
         * The resources listed in the manifest have been newly re-downloaded, and the script can
         * use swapCache() to switch to the new cache.
         *
         * @event UPDATE_READY
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.UPDATE_READY = 'updateready';
        /**
         * The cache manifest file could not be found, indicating that the cache is no longer needed.
         * The application cache is being deleted.
         *
         * @event OBSOLETE
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.OBSOLETE = 'obsolete';
        /**
         * An error occurred at some point - this could be caused by a number of things. This will
         * always be the last event in the sequence.
         *
         * @event ERROR
         * @type {string}
         * @static
         */
        ApplicationCacheEvent.ERROR = 'error';
        return ApplicationCacheEvent;
    }(BaseEvent_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ApplicationCacheEvent;
});
