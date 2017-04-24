var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./BaseEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseEvent_1 = require("./BaseEvent");
    /**
     * The LocalStorageEvent ....
     * Note: the event only dispatches in other browser windows and does not show up in the window where you made a change to the local storage.
     *
     * @class LocalStorageEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param nativeEvent {StorageEvent} The native browser event for localStorage.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LocalStorageEvent = (function (_super) {
        __extends(LocalStorageEvent, _super);
        function LocalStorageEvent(type, bubbles, cancelable, nativeEvent) {
            var _this = _super.call(this, type, bubbles, cancelable, nativeEvent) || this;
            /**
             * TODO: YUIDoc_comment
             *
             * @property originalEvent
             * @type {any}
             * @public
             */
            _this.originalEvent = null;
            if (nativeEvent) {
                _this.key = nativeEvent.key;
                _this.oldValue = nativeEvent.oldValue;
                _this.newValue = nativeEvent.newValue;
                _this.url = nativeEvent.url;
            }
            _this.originalEvent = nativeEvent;
            return _this;
        }
        return LocalStorageEvent;
    }(BaseEvent_1.default));
    /**
     * The storage event is fired on a Document's Window object when a storage area changes.
     *
     * @event STORAGE
     * @type {string}
     * @static
     */
    LocalStorageEvent.STORAGE = 'storage';
    exports.default = LocalStorageEvent;
});
