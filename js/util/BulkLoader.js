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
        define(["require", "exports", '../event/EventDispatcher', '../event/LoaderEvent', '../event/BulkLoaderEvent', '../model/Collection'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var LoaderEvent_1 = require('../event/LoaderEvent');
    var BulkLoaderEvent_1 = require('../event/BulkLoaderEvent');
    var Collection_1 = require('../model/Collection');
    /**
     * A class to help with loading IDataStore's.
     *
     * @class BulkLoader
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @requires Extend
     * @requires LoaderEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var BulkLoader = (function (_super) {
        __extends(BulkLoader, _super);
        function BulkLoader() {
            _super.call(this);
            /**
             * A collection to store all the IDataStore's.
             *
             * @property _dataStores
             * @type {Collection}
             * @protected
             */
            this._dataStores = null;
            /**
             * The total number of items that have been loaded.
             *
             * @property _totalComplete
             * @type {number}
             * @protected
             */
            this._totalComplete = 0;
            /**
             * A queue of IDataStore's that need to be loaded still.
             *
             * @property _queue
             * @type {Array<{key:any, value:any}>}
             * @protected
             */
            this._queue = [];
            /**
             * Set the maximum number of simultaneous connections (default is 3).
             *
             * @property maxConnections
             * @type [number=3]
             * @public
             */
            this.maxConnections = 3;
            this._dataStores = new Collection_1.default();
        }
        /**
         * Helper method to add IDataStore's.
         *
         * @method addFile
         * @param dataStore {IDataStore}
         * @param key [string=null]
         * @public
         */
        BulkLoader.prototype.addFile = function (dataStore, key) {
            if (key === void 0) { key = null; }
            if (key === null) {
                key = String(dataStore.sjsId);
            }
            var model = {
                key: key,
                value: dataStore
            };
            this._dataStores.add(model);
        };
        /**
         * Helper method to get IDataStore's.
         *
         * @method getFile
         * @param key {string}
         * @public
         */
        BulkLoader.prototype.getFile = function (key) {
            var model = this._dataStores.findBy({ key: key })[0];
            return model.value;
        };
        /**
         * Helper method to start the loading process.
         *
         * @method start
         * @public
         */
        BulkLoader.prototype.start = function () {
            var dataStore;
            this._queue = this._dataStores.models.slice(0);
            var length = (this.maxConnections > this._queue.length) ? this._queue.length : this.maxConnections;
            for (var i = 0; i < length; i++) {
                dataStore = this._queue.shift().value;
                dataStore.addEventListenerOnce(LoaderEvent_1.default.COMPLETE, this._onComplete, this);
                dataStore.load();
            }
            return this;
        };
        /**
         * Helper method to stop/clear the loader.
         *
         * @method clear
         * @public
         */
        BulkLoader.prototype.clear = function () {
            this._queue = [];
            var dataStore;
            for (var i = 0; i < this._dataStores.length; i++) {
                dataStore = this._dataStores.get(i).value;
                dataStore.removeEventListener(LoaderEvent_1.default.COMPLETE, this._onComplete, this);
            }
            this._totalComplete = 0;
            this._dataStores = new Collection_1.default();
        };
        /**
         * Event handler method called every time a IDataStore's is completely loaded.
         *
         * @method _onComplete
         * @param event {LoaderEvent}
         * @protected
         */
        BulkLoader.prototype._onComplete = function (event) {
            var dataStore = event.target;
            this._totalComplete++;
            var bulkLoaderEvent = new BulkLoaderEvent_1.default(BulkLoaderEvent_1.default.COMPLETE);
            bulkLoaderEvent.total = this._dataStores.length;
            bulkLoaderEvent.totalComplete = this._totalComplete;
            bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
            bulkLoaderEvent.data = dataStore;
            // Dispatch the IDataStore that was just completed.
            this.dispatchEvent(bulkLoaderEvent);
            if (this._queue.length !== 0) {
                var dataStore_1 = this._queue.shift().value;
                dataStore_1.addEventListenerOnce(LoaderEvent_1.default.COMPLETE, this._onComplete, this);
                dataStore_1.load();
            }
            if (this._totalComplete === this._dataStores.length) {
                this._onLoadComplete();
            }
        };
        /**
         * Event handler method called once all IDataStore's are completely loaded.
         *
         * @method _onLoadComplete
         * @protected
         */
        BulkLoader.prototype._onLoadComplete = function () {
            var model;
            var dataStoreList = [];
            for (var i = 0; i < this._dataStores.length; i++) {
                model = this._dataStores.get(i);
                dataStoreList[i] = model.value;
            }
            // Add the whole list because all are completed.
            var bulkLoaderEvent = new BulkLoaderEvent_1.default(BulkLoaderEvent_1.default.LOAD_COMPLETE);
            bulkLoaderEvent.total = this._dataStores.length;
            bulkLoaderEvent.totalComplete = this._totalComplete;
            bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
            bulkLoaderEvent.data = dataStoreList;
            // Only dispatch when all the IDataStore are load complete.
            this.dispatchEvent(bulkLoaderEvent);
        };
        return BulkLoader;
    }(EventDispatcher_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BulkLoader;
});
