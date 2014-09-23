/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher', '../event/LoaderEvent', '../net/URLLoaderDataFormat', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'), require('../event/LoaderEvent'), require('../net/URLLoaderDataFormat'), require('jquery'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.URLLoader = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LoaderEvent, root.structurejs.URLLoaderDataFormat, jQuery);
    }
}(this, function(Extend, EventDispatcher, LoaderEvent, URLLoaderDataFormat, jQuery) {
    'use strict';

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

    return URLLoader;
}));