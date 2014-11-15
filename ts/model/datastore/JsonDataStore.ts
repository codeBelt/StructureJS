///<reference path='DataStoreAbstract.ts'/>
///<reference path='../../interface/IDataStore.ts'/>
///<reference path='../../event/LoaderEvent.ts'/>
///<reference path='../../net/URLRequest.ts'/>
///<reference path='../../net/URLLoader.ts'/>
///<reference path='../../net/URLRequestMethod.ts'/>
///<reference path='../../net/URLLoaderDataFormat.ts'/>
///<reference path='../../net/URLContentType.ts'/>

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
module StructureTS
{
    export class JsonDataStore extends DataStoreAbstract
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
                request.data = { format: 'json' };
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
}