/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/BaseEvent'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.LocalStorageEvent = factory(root.structurejs.Extend, root.structurejs.BaseEvent);
    }
}(this, function(Extend, BaseEvent) {
    'use strict';

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
    var LocalStorageEvent = (function () {

        var _super = Extend(LocalStorageEvent, BaseEvent);

        function LocalStorageEvent(type, bubbles, cancelable, nativeEvent) {
            _super.call(this, type, bubbles, cancelable, nativeEvent);
            /**
             * TODO: YUIDoc_comment
             *
             * @property _nativeEvent
             * @type {any}
             * @private
             */
            this._nativeEvent = null;
            if (nativeEvent) {
                this.key = nativeEvent.key;
                this.oldValue = nativeEvent.oldValue;
                this.newValue = nativeEvent.newValue;
                this.url = nativeEvent.url;
            }
            this._nativeEvent = nativeEvent;
        }
        /**
         * @overridden BaseEvent.clone
         */
        LocalStorageEvent.prototype.clone = function () {
            return new LocalStorageEvent(this.type, this.bubble, this.cancelable, this._nativeEvent);
        };
        /**
         * The storage event is fired on a Document's Window object when a storage area changes.
         *
         * @event STORAGE
         * @type {string}
         * @static
         */
        LocalStorageEvent.STORAGE = 'storage';
        return LocalStorageEvent;
    })();

    return LocalStorageEvent;
}));