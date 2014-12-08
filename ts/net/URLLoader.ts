///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/LoaderEvent.ts'/>
///<reference path='URLRequest.ts'/>
///<reference path='URLLoaderDataFormat.ts'/>

/**
 * The URLLoader...
 *
 * @class URLLoader
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule net
 * @param [request=null] {URLRequest}
 * @requires Extend
 * @requires EventDispatcher
 * @requires LoaderEvent
 * @requires URLLoaderDataFormat
 * @requires jQuery
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class URLLoader extends EventDispatcher
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @property dataFormat
         * @type {string}
         * @default URLLoaderDataFormat.TEXT
         */
        public dataFormat:string = URLLoaderDataFormat.TEXT;

        /**
         * TODO: YUIDoc_comment
         *
         * @property data
         * @type {any}
         * @default null
         */
        public data:any = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property complete
         * @type {boolean}
         * @default false
         */
        public complete:boolean = false;

        /**
         * TODO: YUIDoc_comment
         *
         * @property _xhr
         * @type {JQueryXHR}
         * @default null
         * @private
         */
        private _xhr:JQueryXHR = null;

        constructor(request:URLRequest = null)
        {
            super();

            if (request)
            {
                this.load(request);
            }
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method load
         * @param request {URLRequest}
         * @public
         */
        public load(request:URLRequest):void
        {
            this.complete = false;
            var self:URLLoader = this;

            this._xhr = jQuery.ajax({
                url: request.url,
                type: request.method,
                data: request.data,
                contentType: request.contentType,
                dataType: self.dataFormat,
                jsonp: 'callback'
            });
            this._xhr.done(self.onSuccess.bind(this));
            this._xhr.fail(self.onError.bind(this));
        }


        /**
         * @overridden EventDispatcher.destroy
         */
        public destroy():void
        {
            this.abort();

            super.destroy();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method abort
         * @public
         */
        public abort():void
        {
            if (this._xhr != null)
            {
                this._xhr.abort();
            }
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method onError
         * @private
         */
        private onError():void
        {
            console.log("[URLLoader] - onError", arguments);
            this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method onSuccess
         * @private
         */
        private onSuccess(data):void
        {
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this.data));
        }
    }
}