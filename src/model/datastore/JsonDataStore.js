/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../../util/Extend', '../../event/EventDispatcher', '../../event/LoaderEvent', '../../net/URLLoader', '../../net/URLRequest', '../../net/URLRequestMethod', '../../net/URLContentType', '../../net/URLLoaderDataFormat'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../../event/EventDispatcher'), require('../../event/LoaderEvent'), require('../../net/URLLoader'), require('../../net/URLRequest'), require('../../net/URLRequestMethod'), require('../../net/URLContentType'), require('../../net/URLLoaderDataFormat'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.JsonDataStore = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LoaderEvent, root.structurejs.URLLoader, root.structurejs.URLRequest, root.structurejs.URLRequestMethod, root.structurejs.URLContentType, root.structurejs.URLLoaderDataFormat);
    }
}(this, function(Extend, DataStoreAbstract, LoaderEvent, URLLoader, URLRequest, URLRequestMethod, URLContentType, URLLoaderDataFormat) {
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DataStoreAbstract = require('structurejs/model/datastore/DataStoreAbstract');
    var LoaderEvent = require('structurejs/event/LoaderEvent');
    var URLLoader = require('structurejs/net/URLLoader');
    var URLRequest = require('structurejs/net/URLRequest');
    var URLRequestMethod = require('structurejs/net/URLRequestMethod');
    var URLContentType = require('structurejs/net/URLContentType');
    var URLLoaderDataFormat = require('structurejs/net/URLLoaderDataFormat');

    /**
     * The JsonDataStore...
     *
     * @class JsonDataStore
     * @module StructureJS
     * @submodule model
     * @constructor
     * @param path {string}
     * @param jsonp {boolean}
     * @author Robert S. (www.codeBelt.com)
     */
    var JsonDataStore = (function () {

        var _super = Extend(JsonDataStore, DataStoreAbstract);

        function JsonDataStore(path, jsonp) {
            if (typeof jsonp === "undefined") { jsonp = false; }
            _super.call(this, path);
            /**
             * YUIDoc_comment
             *
             * @property _urlLoader
             * @type {URLLoader}
             * @private
             */
            this._urlLoader = null;
            /**
             * YUIDoc_comment
             *
             * @property _isJsonP
             * @type {boolean}
             * @default false
             * @private
             */
            this._isJsonP = false;

            this._isJsonP = jsonp;
        }
        /**
         *
         * @method load
         * @public
         * @chainable
         */
        JsonDataStore.prototype.load = function () {
            var request = new URLRequest(this.src);
            request.method = URLRequestMethod.GET;
            request.contentType = URLContentType.JSON;

            if (this._isJsonP === true) {
                request.data = { format: 'json' };
            }

            this._urlLoader = new URLLoader();
            this._urlLoader.addEventListener(LoaderEvent.COMPLETE, this._onLoaderComplete, this);
            this._urlLoader.dataFormat = URLLoaderDataFormat.JSONP;
            this._urlLoader.load(request);

            return this;
        };

        /**
         * @overridden DataStoreAbstract._onLoaderComplete
         */
        JsonDataStore.prototype._onLoaderComplete = function (event) {
            this.data = this._urlLoader.data;

            this._urlLoader.removeEventListener(LoaderEvent.COMPLETE, this._onLoaderComplete, this);

            _super.prototype._onLoaderComplete.call(this);
        };
        return JsonDataStore;
    })();

    return JsonDataStore;
}));