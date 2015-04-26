///<reference path='../interface/IDataStore.ts'/>
///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../net/URLRequest.ts'/>
///<reference path='../net/URLLoader.ts'/>
///<reference path='../net/URLRequestMethod.ts'/>
///<reference path='../net/URLLoaderDataFormat.ts'/>

/**
 * The HtmlLoader...
 *
 * @class HtmlLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class HtmlLoader extends EventDispatcher implements IDataStore
    {
        private _urlLoader:URLLoader = null;

        public data:any;
        public src:string;
        public complete:boolean = false;

        constructor(path:string)
        {
            super();

            this.src = path;

            this._urlLoader = new URLLoader();
            this._urlLoader.addEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
            this._urlLoader.dataFormat = URLLoaderDataFormat.HTML;
        }

        public load():void
        {
            if (this.complete) { return; }

            var request:URLRequest = new URLRequest(this.src);
            request.method = URLRequestMethod.GET;

            this._urlLoader.load(request);
        }

        private onLoaderComplete(event:LoaderEvent):void
        {
            this.complete = true;
            this.data = this._urlLoader.data;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));

            this._urlLoader.removeEventListener(LoaderEvent.COMPLETE, this.onLoaderComplete, this);
            this._urlLoader = null;
        }
    }
}