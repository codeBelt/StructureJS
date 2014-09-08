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

import DataStoreAbstract = require('DataStoreAbstract')
import IDataStore = require('../../interface/IDataStore')
import LoaderEvent = require('../../event/LoaderEvent')
import URLRequest = require('../../net/URLRequest')
import URLLoader = require('../../net/URLLoader')
import URLRequestMethod = require('../../net/URLRequestMethod')
import URLLoaderDataFormat = require('../../net/URLLoaderDataFormat')
import URLContentType = require('../../net/URLContentType')

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
     * YUIDoc_comment
     *
     * @property _urlLoader
     * @type {URLLoader}
     * @private
     */
    private _urlLoader:URLLoader = null;

    /**
     * YUIDoc_comment
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

        if (this._isJsonP === true) {
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
export = JsonDataStore;