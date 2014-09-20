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

import EventDispatcher = require('../event/EventDispatcher')
import LoaderEvent = require('../event/LoaderEvent')
import URLRequest = require('URLRequest')
import URLLoaderDataFormat = require('URLLoaderDataFormat')

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
class URLLoader extends EventDispatcher
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
    public abort():void {
        if (this._xhr != null) {
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
export = URLLoader;