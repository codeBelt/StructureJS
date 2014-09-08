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
     * The DataStoreAbstract...
     *
     * @class DataStoreAbstract
     * @module StructureJS
     * @submodule model
     * @constructor
     * @param path {string}
     * @author Robert S. (www.codeBelt.com)
     */
    var DataStoreAbstract = (function () {

        var _super = Extend(DataStoreAbstract, EventDispatcher);

        function DataStoreAbstract(path) {
            _super.call(this);
            /**
             * YUIDoc_comment
             *
             * @property data
             * @type {any}
             * @public
             */
            this.data = null;
            /**
             * YUIDoc_comment
             *
             * @property src
             * @type {string}
             * @public
             */
            this.src = null;
            /**
             * YUIDoc_comment
             *
             * @property complete
             * @type {boolean}
             * @public
             */
            this.complete = false;

            this.src = path;
        }
        /**
         * YUIDoc_comment
         *
         * @method load
         * @protected
         */
        DataStoreAbstract.prototype.load = function () {
        };

        /**
         * YUIDoc_comment
         *
         * @method _onLoaderComplete
         * @protected
         */
        DataStoreAbstract.prototype._onLoaderComplete = function () {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                rest[_i] = arguments[_i + 0];
            }
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this));
        };

        return DataStoreAbstract;
    })();

    module.exports = DataStoreAbstract;

});