(function(deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", '../event/EventDispatcher', '../event/LoaderEvent'], function(require, exports) {
    var EventDispatcher = require('../event/EventDispatcher');
    var LoaderEvent = require('../event/LoaderEvent');
    /**
     * The BulkLoader...
     *
     * @class BulkLoader
     * @module StructureJS
     * @submodule util
     * @requires Extend
     * @requires EventDispatcher
     * @requires LoaderEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var BulkLoader = (function() {
        function BulkLoader() {
            throw new Error('[BulkLoader] Do not instantiate the BulkLoader class because it is a static class.');
        }
        BulkLoader.addFile = function(dataStore, key) {
            BulkLoader._dataStores[key] = dataStore;
        };
        BulkLoader.getFile = function(key) {
            return BulkLoader._dataStores[key] || null;
        };
        BulkLoader.getImage = function(key) {
            var imageLoader = BulkLoader.getFile(key);
            return (imageLoader !== null) ? imageLoader.data : null;
        };
        BulkLoader.load = function() {
            for (var key in BulkLoader._dataStores) {
                var dataStore = BulkLoader._dataStores[key];
                dataStore.addEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);
                dataStore.load();
            }
        };
        BulkLoader.addEventListener = function(type, callback, scope, priority) {
            if (priority === void 0) {
                priority = 0;
            }
            BulkLoader._eventDispatcher.addEventListener(type, callback, scope, priority);
        };
        BulkLoader.removeEventListener = function(type, callback, scope) {
            BulkLoader._eventDispatcher.removeEventListener(type, callback, scope);
        };
        BulkLoader.dispatchEvent = function(type, data) {
            if (data === void 0) {
                data = null;
            }
            var event = type;
            if (typeof event === 'string') {
                event = new LoaderEvent(type, data);
            }
            event.target = BulkLoader;
            event.currentTarget = BulkLoader;
            BulkLoader._eventDispatcher.dispatchEvent(event);
        };
        BulkLoader.onLoadComplete = function(event) {
            event.target.removeEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);
            for (var key in BulkLoader._dataStores) {
                var dataStore = BulkLoader._dataStores[key];
                if (dataStore.complete === false) {
                    return;
                }
            }
            BulkLoader._eventDispatcher.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE));
        };
        BulkLoader._dataStores = [];
        BulkLoader._eventDispatcher = new EventDispatcher();
        return BulkLoader;
    })();
    return BulkLoader;
});
