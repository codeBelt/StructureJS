/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import IDataStore = require('../interface/IDataStore')
import LoaderEvent = require('../event/LoaderEvent')
import EventDispatcher = require('../event/EventDispatcher')
import URLRequest = require('../net/URLRequest')
import URLLoader = require('../net/URLLoader')
import URLRequestMethod = require('../net/URLRequestMethod')
import URLLoaderDataFormat = require('../net/URLLoaderDataFormat')

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
        if (this.complete) return;

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