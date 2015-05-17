'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../event/EventDispatcher as EventDispatcher
 @import ../event/LoaderEvent as LoaderEvent
 @import ../interface/IDataStore as IDataStore
 @export BulkLoader
 */
import EventDispatcher = require('../event/EventDispatcher');
import LoaderEvent = require('../event/LoaderEvent');
import IDataStore = require('../interface/IDataStore');

/**
 * The BulkLoader...
 *
 * @class BulkLoader
 * @module StructureJS
 * @submodule util
 * @requires Extend
 * @requires EventDispatcher
 * @requires LoaderEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BulkLoader extends EventDispatcher
{
    public _dataStores:Array<IDataStore> = [];

    constructor()
    {
        super();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method addFile
     * @param dataStore {IDataStore}
     * @param key {string}
     * @returns {BulkLoader}
     */
    public addFile(dataStore:IDataStore, key:string):any
    {
        this._dataStores[key] = dataStore;
        return this;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getFile
     * @param key {string}
     * @returns {IDataStore}
     */
    public getFile(key:string):IDataStore
    {
        return this._dataStores[key];
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getData
     * @param key
     * @returns {any}
     */
    public getData(key:string):any
    {
        return this._dataStores[key].data;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method load
     * @returns {BulkLoader}
     */
    public load():any
    {
        for (var key in this._dataStores)
        {
            var dataStore:IDataStore = this._dataStores[key];

            // Don't re-load data store's if they are completed.
            if (dataStore.complete === false)
            {
                dataStore.addEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
                dataStore.load();
            }
        }

        return this;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method onLoadComplete
     * @param event {LoaderEvent}
     */
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