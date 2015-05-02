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
 @export BrowserUtil
 */
import EventDispatcher = require('../event/EventDispatcher');
import LoaderEvent = require('../event/LoaderEvent');
import URLRequest = require('../net/URLRequest');
import URLLoader = require('../net/URLLoader');
import URLRequestMethod = require('../net/URLRequestMethod');
import URLLoaderDataFormat = require('../net/URLLoaderDataFormat');
import IDataStore = require('../interface/IDataStore');

/**
 * The ImageLoader...
 *
 * @class ImageLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class ImageLoader extends EventDispatcher implements IDataStore
{
    private _image:HTMLImageElement = null;

    public data:any;
    public src:string;
    public complete:boolean = false;

    constructor(path:string)
    {
        super();

        this.src = path;

        var self = this;
        this._image = new Image();
        this._image.onload = function ()
        {
            self.onImageLoad();
        }
    }

    public load():void
    {
        if (this.complete)
        {
            return;
        }

        this._image.src = this.src;
    }

    private onImageLoad():void
    {
        this.complete = true;
        this.data = this._image;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
    }
}

export = ImageLoader;