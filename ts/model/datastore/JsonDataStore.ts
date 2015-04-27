'use strict';
/*
 UMD Stuff
 @import ../../util/Extend as Extend
 @import ../../net/URLRequest as URLRequest
 @import ../../net/URLLoader as URLLoader
 @import ../../net/URLRequestMethod as URLRequestMethod
 @import ../../net/URLLoaderDataFormat as URLLoaderDataFormat
 @import ../../net/URLContentType as URLContentType
 @import ../../event/LoaderEvent as LoaderEvent
 @export JsonDataStore
 */
import DataStoreAbstract = require('./DataStoreAbstract');
import URLRequest = require('../../net/URLRequest');
import URLLoader = require('../../net/URLLoader');
import URLRequestMethod = require('../../net/URLRequestMethod');
import URLLoaderDataFormat = require('../../net/URLLoaderDataFormat');
import URLContentType = require('../../net/URLContentType');
import LoaderEvent = require('../../event/LoaderEvent');
import IDataStore = require('../../interface/IDataStore');

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
class JsonDataStore extends DataStoreAbstract
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @property _urlLoader
         * @type {URLLoader}
         * @private
         */
        private _urlLoader:URLLoader = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property _isJsonP
         * @type {boolean}
         * @default false
         * @private
         */
        private _isJsonP:boolean = false;

        constructor(path:string, jsonp:boolean = false)
        {
            super(path);

            this._isJsonP = jsonp;
        }

        /**
         *
         * @method load
         * @public
         * @chainable
         */
        public load():any
        {
            var request:URLRequest = new URLRequest(this.src);
            request.method = URLRequestMethod.GET;
            request.contentType = URLContentType.JSON;

            if (this._isJsonP === true)
            {
                request.data = {format: 'json'};
            }

            this._urlLoader = new URLLoader();
            this._urlLoader.addEventListener(LoaderEvent.COMPLETE, this._onLoaderComplete, this);
            this._urlLoader.dataFormat = URLLoaderDataFormat.JSONP;
            this._urlLoader.load(request);

            return this;
        }

        /**
         * @overridden DataStoreAbstract._onLoaderComplete
         */
        public _onLoaderComplete(event:LoaderEvent):void
        {
            this.data = this._urlLoader.data;

            this._urlLoader.removeEventListener(LoaderEvent.COMPLETE, this._onLoaderComplete, this);

            super._onLoaderComplete();
        }
}

export = JsonDataStore;