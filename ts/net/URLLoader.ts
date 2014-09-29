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
 * @constructor
 * @param [request=null] {URLRequest}
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class URLLoader extends EventDispatcher
    {
        /**
         * YUIDoc_comment
         *
         * @property dataFormat
         * @type {string}
         * @default URLLoaderDataFormat.TEXT
         */
        public dataFormat:string = URLLoaderDataFormat.TEXT;

        /**
         * YUIDoc_comment
         *
         * @property data
         * @type {any}
         * @default null
         */
        public data:any = null;

        /**
         * YUIDoc_comment
         *
         * @property complete
         * @type {boolean}
         * @default false
         */
        public complete:boolean = false;

        /**
         * YUIDoc_comment
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
         * YUIDoc_comment
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
                jsonp: 'callback',
                beforeSend: self.onBeforeSend.bind(this),
                success: self.onLoadSuccess.bind(this),
                error: self.onLoadError.bind(this),
                complete: self.onComplete.bind(this)
            });
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
         * YUIDoc_comment
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
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        private onLoadSuccess(data):void
        {
            this.data = data;
        }

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        private onBeforeSend():void
        {
            //console.log("onBeforeSend", arguments);
        }

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        private onLoadError():void
        {
            console.log("[URLLoader] - onLoadError", arguments);
            this.dispatchEvent(new LoaderEvent(LoaderEvent.ERROR));
        }

        /**
         * YUIDoc_comment
         *
         * @method abort
         * @private
         */
        private onComplete(data):void
        {
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this.data));
        }
    }
}