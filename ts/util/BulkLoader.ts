import IDataStore = require('../interface/IDataStore');
import EventDispatcher = require('../event/EventDispatcher');
import LoaderEvent = require('../event/LoaderEvent');
import BulkLoaderEvent = require('../event/BulkLoaderEvent');
import Collection = require('../model/Collection');

/**
 * TODO: YUIDoc_comment
 *
 * @class BulkLoader
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule util
 * @requires Extend
 * @requires LoaderEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BulkLoader extends EventDispatcher
{
    protected _dataStores:Collection = null;
    protected _totalComplete:number = 0;

    constructor()
    {
        super();

        this._dataStores = new Collection();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method addFile
     * @param dataStore {IDataStore}
     * @param key {string}
     * @public
     */
    public addFile(dataStore:IDataStore, key:string = null):void
    {
        if (key === null)
        {
            key = String(dataStore.sjsId);
        }

        var model = {
            key: key,
            value: dataStore
        };

        this._dataStores.add(model);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getFile
     * @param key {string}
     * @public
     */
    public getFile(key:string):IDataStore
    {
        var model = this._dataStores.findBy({key: key})[0];
        return model.value;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getImage
     * @param key {string}
     * @return {Image}
     * @public
     */
    public getImage(key:string):HTMLImageElement
    {
        var imageLoader:IDataStore = this.getFile(key);
        return (imageLoader !== null) ? imageLoader.data : null;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method start
     * @public
     */
    public start():any
    {
        var dataStore:IDataStore;

        for (var i:number = 0; i < this._dataStores.length; i++)
        {
            dataStore = this._dataStores.get(i).value;
            dataStore.addEventListenerOnce(LoaderEvent.COMPLETE, this.onLoadComplete, this);
            dataStore.load();
        }

        return this;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method clear
     * @public
     */
    public clear():void
    {
        var dataStore:IDataStore;

        for (var i:number = 0; i < this._dataStores.length; i++)
        {
            dataStore = this._dataStores.get(i).value;
            dataStore.removeEventListener(LoaderEvent.COMPLETE, this.onLoadComplete, this);
        }

        this._totalComplete = 0;

        this._dataStores = new Collection();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method onLoadComplete
     * @param event {LoaderEvent}
     * @protected
     */
    protected onLoadComplete(event:LoaderEvent):void
    {
        var dataStore:IDataStore = event.target;

        this._totalComplete++;

        var bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.COMPLETE);
        bulkLoaderEvent.total = this._dataStores.length;
        bulkLoaderEvent.totalComplete = this._totalComplete;
        bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
        bulkLoaderEvent.data = dataStore;

        // Dispatch the IDataStore that was just completed.
        this.dispatchEvent(bulkLoaderEvent);

        // Loop through and check if all IDataStore have been loaded.
        for (var i:number = 0; i < this._dataStores.length; i++)
        {
            dataStore = this._dataStores.get(i).value;

            if (dataStore.complete === false)
            {
                return;
            }
        }

        var model;
        var dataStoreList = [];
        for (var i:number = 0; i < this._dataStores.length; i++)
        {
            model = this._dataStores.get(i);
            dataStoreList.push(model.value);
        }

        // Add the whole list because all are completed.
        bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.LOAD_COMPLETE);
        bulkLoaderEvent.total = this._dataStores.length;
        bulkLoaderEvent.totalComplete = this._totalComplete;
        bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
        bulkLoaderEvent.data = dataStoreList;
        
        // Only dispatch when all the IDataStore are load complete.
        this.dispatchEvent(bulkLoaderEvent);
    }

}

export = BulkLoader;
