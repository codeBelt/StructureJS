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
import EventDispatcher = require('../event/EventDispatcher')
import LoaderEvent = require('../event/LoaderEvent')

/**
 * The ImageLoader...
 *
 * @class ImageLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 **/
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