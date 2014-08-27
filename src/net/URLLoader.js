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
     * @module StructureJS
     * @submodule net
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     **/
    var URLLoader = (function () {

        var _super = Extend(URLLoader, EventDispatcher);

        function URLLoader(request) {
            if (typeof request === "undefined") { request = null; }
            _super.call(this);
            /**
             *
             * @property dataFormat
             * @type {string}
             * @default URLLoaderDataFormat.TEXT
             */
            this.dataFormat = URLLoaderDataFormat.TEXT;
            /**
             *
             * @property data
             * @type {any}
             * @default null
             */
            this.data = null;
            /**
             *
             * @property ready
             * @type {boolean}
             * @default false
             */
            this.ready = false;
            /**
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
        URLLoader.prototype.load = function (request) {
            this.ready = false;
            var self = this;

            this._xhr = jQuery.ajax({
                type: request.method,
                url: request.url,
                data: request.data,
                contentType: request.contentType,
                dataType: self.dataFormat,
                beforeSend: self.onBeforeSend.bind(this),
                success: self.onLoadSuccess.bind(this),
                error: self.onLoadError.bind(this),
                complete: self.onComplete.bind(this)
            });
        };

        URLLoader.prototype.onLoadSuccess = function () {
            //console.log("onLoadSuccess", arguments);
        };

        URLLoader.prototype.onBeforeSend = function () {
            //console.log("onBeforeSend", arguments);
        };

        URLLoader.prototype.onLoadError = function () {
            //console.log("[URLLoader] - onLoadError", arguments);
            this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
        };

        URLLoader.prototype.onComplete = function (data) {
            this.ready = true;

            //console.log('[' + this.getQualifiedClassName() + ']', 'onComplete', data);
            this.data = data.responseText;
            this.ready = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, true, this.data));
        };

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
        return URLLoader;
    })();

    module.exports = URLLoader;

});