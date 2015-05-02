'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../event/EventDispatcher as EventDispatcher
 @import ../event/LoaderEvent as LoaderEvent
 @import ../net/URLRequest as URLRequest
 @import ../net/URLLoader as URLLoader
 @import ../net/URLRequestMethod as URLRequestMethod
 @import ../net/URLLoaderDataFormat as URLLoaderDataFormat
 @export HtmlLoader
 */
import EventDispatcher = require('../event/EventDispatcher');
import LoaderEvent = require('../event/LoaderEvent');
import URLRequest = require('../net/URLRequest');
import URLLoader = require('../net/URLLoader');
import URLRequestMethod = require('../net/URLRequestMethod');
import URLLoaderDataFormat = require('../net/URLLoaderDataFormat');
import IDataStore = require('../interface/IDataStore');

/**
 * The HtmlLoader...
 *
 * @class HtmlLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class HtmlLoader extends EventDispatcher implements IDataStore
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
        if (this.complete)
        {
            return;
        }

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

export = HtmlLoader;