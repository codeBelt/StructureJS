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
 * The BulkLoader...
 *
 * @class BulkLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BulkLoader extends EventDispatcher
{
    public _dataStores:IDataStore[] = [];

    constructor()
    {
        super();
    }

    public addFile(dataStore:IDataStore, key:string):any
    {
        this._dataStores[key] = dataStore;
        return this;
    }

    public getFile(key:string):IDataStore
    {
        return this._dataStores[key];
    }

    public getData(key:string):HTMLImageElement
    {
        return this._dataStores[key].data;
    }

    public load():any
    {
        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];

            // Don't re-load data store's if they are completed.
            if (dataStore.complete === false) {
                dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
                dataStore.load();
            }
        }

        return this;
    }

    private onLoadComplete(event:LoaderEvent):void
    {
        event.target.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);

        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, event.target));

        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];
            if (dataStore.complete === false)
            {
                // If any data store items are not complete then exit and don't let the LoaderEvent.LOAD_COMPLETE event to dispatch.
                return;
            }
        }

        this.dispatchEvent(new LoaderEvent(LoaderEvent.LOAD_COMPLETE, false, false, this._dataStores));
    }
}
export = BulkLoader;