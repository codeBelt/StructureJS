define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var jQuery = require('jquery');
    var Extend = require('structurejs/util/Extend');
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var LoaderEvent = require('structurejs/event/LoaderEvent');
    var URLLoaderDataFormat = require('structurejs/net/URLLoaderDataFormat');

    /**
     * The URLLoader...
     *
     * @class URLLoader
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule net
     * @constructor
     * @param [request=null] {URLRequest}
     * @author Robert S. (www.codeBelt.com)
     */
    var URLLoader = (function () {

        var _super = Extend(URLLoader, EventDispatcher);

        function URLLoader(request) {
            if (typeof request === "undefined") { request = null; }
            _super.call(this);
            /**
             * YUIDoc_comment
             *
             * @property dataFormat
             * @type {string}
             * @default URLLoaderDataFormat.TEXT
             */
            this.dataFormat = URLLoaderDataFormat.TEXT;
            /**
             * YUIDoc_comment
             *
             * @property data
             * @type {any}
             * @default null
             */
            this.data = null;
            /**
             * YUIDoc_comment
             *
             * @property complete
             * @type {boolean}
             * @default false
             */
            this.complete = false;
            /**
             * YUIDoc_comment
             *
             * @property _xhr
             * @type {JQueryXHR}
             * @default null
             * @private
             */
            this._xhr = null;

            if (request) {
                this.load(request);
            }
        }
        /**
         * YUIDoc_comment
         *
         * @method load
         * @param request {URLRequest}
         * @public
         */
        URLLoader.prototype.load = function (request) {
            this.complete = false;
            var self = this;

            this._xhr = jQuery.ajax({
                url: request.url,
                type: request.method,
                data: request.data,
                contentType: request.contentType,
                dataType: self.dataFormat,
                jsonp: 'callback',
                beforeSend: self.onBeforeSend.bind(this),
                success: self.onLoadSuccess.bind(this),
                error: self.onLoadError.bind(this),
                complete: self.onComplete.bind(this)
            });
        };

        /**
         * @overridden EventDispatcher.destroy
         */
        URLLoader.prototype.destroy = function () {
            this.abort();

            _super.prototype.destroy.call(this);
        };

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @public
         */
        URLLoader.prototype.abort = function () {
            if (this._xhr != null) {
                this._xhr.abort();
            }
        };

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        URLLoader.prototype.onLoadSuccess = function (data) {
            this.data = data;
        };

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        URLLoader.prototype.onBeforeSend = function () {
            //console.log("onBeforeSend", arguments);
        };

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        URLLoader.prototype.onLoadError = function () {
            console.log("[URLLoader] - onLoadError", arguments);
            this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
        };

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        URLLoader.prototype.onComplete = function () {
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this.data));
        };
        return URLLoader;
    })();

    module.exports = URLLoader;

});