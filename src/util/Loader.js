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
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var LoaderEvent = require('structurejs/event/LoaderEvent');

    /**
    * The Loader...
    *
    * @class Loader
    * @module StructureJS
    * @submodule util
    * @constructor
    * @author Robert S. (www.codeBelt.com)
    */
    var Loader = (function () {

        var _super = Extend(Loader, EventDispatcher);

        function Loader() {
            _super.call(this);
            this._dataStores = [];
        }
        Loader.prototype.addFile = function (dataStore, key) {
            this._dataStores[key] = dataStore;
            return this;
        };

        Loader.prototype.getFile = function (key) {
            return this._dataStores[key];
        };

        Loader.prototype.getData = function (key) {
            return this._dataStores[key].data;
        };

        Loader.prototype.load = function () {
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

        Loader.prototype.onLoadComplete = function (event) {
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
        return Loader;
    })();

    module.exports = Loader;

});