/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher', '../event/LoaderEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'), require('../event/LoaderEvent'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.BulkLoader = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LoaderEvent);
    }
}(this, function(Extend, EventDispatcher, LoaderEvent) {
    'use strict';

    /**
     * The BulkLoader...
     *
     * @class BulkLoader
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var BulkLoader = (function () {

        var _super = Extend(BulkLoader, EventDispatcher);

        function BulkLoader() {
            _super.call(this);
            this._dataStores = [];
        }
        BulkLoader.prototype.addFile = function (dataStore, key) {
            this._dataStores[key] = dataStore;
            return this;
        };

        BulkLoader.prototype.getFile = function (key) {
            return this._dataStores[key];
        };

        BulkLoader.prototype.getData = function (key) {
            return this._dataStores[key].data;
        };

        BulkLoader.prototype.load = function () {
            for (var key in this._dataStores) {
                var dataStore = this._dataStores[key];

                // Don't re-load data store's if they are completed.
                if (dataStore.complete === false) {
                    dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
                    dataStore.load();
                }
            }

            return this;
        };

        BulkLoader.prototype.onLoadComplete = function (event) {
            event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);

            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, event.target));

            for (var key in this._dataStores) {
                var dataStore = this._dataStores[key];
                if (dataStore.complete === false) {
                    // If any data store items are not complete then exit and don't let the LoaderEvent.LOAD_COMPLETE event to dispatch.
                    return;
                }
            }

            this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE, false, false, this._dataStores));
        };
        return BulkLoader;
    })();

    return BulkLoader;
}));