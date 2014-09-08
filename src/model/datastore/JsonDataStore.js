/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */
define(function (require, exports, module) { // jshint ignore:line
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

    module.exports = JsonDataStore;

});