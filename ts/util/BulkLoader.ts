import IDataStore from '../interface/IDataStore';
import EventDispatcher from '../event/EventDispatcher';
import LoaderEvent from '../event/LoaderEvent';
import BulkLoaderEvent from '../event/BulkLoaderEvent';
import Collection from '../model/Collection';

/**
 * A class to help with loading IDataStore's.
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
    /**
     * A collection to store all the IDataStore's.
     *
     * @property _dataStores
     * @type {Collection}
     * @protected
     */
    protected _dataStores:Collection = null;

    /**
     * The total number of items that have been loaded.
     *
     * @property _totalComplete
     * @type {number}
     * @protected
     */
    protected _totalComplete:number = 0;

    /**
     * A queue of IDataStore's that need to be loaded still.
     *
     * @property _queue
     * @type {Array<{key:any, value:any}>}
     * @protected
     */
    protected _queue:Array<{key:any, value:any}> = [];

    /**
     * Set the maximum number of simultaneous connections (default is 3).
     *
     * @property maxConnections
     * @type [number=3]
     * @public
     */
    public maxConnections:number = 3;

    constructor()
    {
        super();

        this._dataStores = new Collection();
    }

    /**
     * Helper method to add IDataStore's.
     *
     * @method addFile
     * @param dataStore {IDataStore}
     * @param key [string=null]
     * @public
     */
    public addFile(dataStore:IDataStore, key:string = null):void
    {
        if (key === null)
        {
            key = String(dataStore.sjsId);
        }

        const model = {
            key: key,
            value: dataStore
        };

        this._dataStores.add(model);
    }

    /**
     * Helper method to get IDataStore's.
     *
     * @method getFile
     * @param key {string}
     * @public
     */
    public getFile(key:string):IDataStore
    {
        const model:{key:any, value:any} = this._dataStores.findBy({key: key})[0];
        return model.value;
    }

    /**
     * Helper method to start the loading process.
     *
     * @method start
     * @public
     */
    public start():any
    {
        let dataStore:IDataStore;

        this._queue = this._dataStores.models.slice(0);

        const length:number = (this.maxConnections > this._queue.length) ? this._queue.length : this.maxConnections;

        for (let i:number = 0; i < length; i++)
        {
            dataStore = this._queue.shift().value;
            dataStore.addEventListenerOnce(LoaderEvent.COMPLETE, this._onComplete, this);
            dataStore.load();
        }

        return this;
    }

    /**
     * Helper method to stop/clear the loader.
     *
     * @method clear
     * @public
     */
    public clear():void
    {
        this._queue = [];

        let dataStore:IDataStore;

        for (let i:number = 0; i < this._dataStores.length; i++)
        {
            dataStore = this._dataStores.get(i).value;
            dataStore.removeEventListener(LoaderEvent.COMPLETE, this._onComplete, this);
        }

        this._totalComplete = 0;
        this._dataStores = new Collection();
    }

    /**
     * Event handler method called every time a IDataStore's is completely loaded.
     *
     * @method _onComplete
     * @param event {LoaderEvent}
     * @protected
     */
    protected _onComplete(event:LoaderEvent):void
    {
        let dataStore:IDataStore = event.target;

        this._totalComplete++;

        const bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.COMPLETE);
        bulkLoaderEvent.total = this._dataStores.length;
        bulkLoaderEvent.totalComplete = this._totalComplete;
        bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
        bulkLoaderEvent.data = dataStore;

        // Dispatch the IDataStore that was just completed.
        this.dispatchEvent(bulkLoaderEvent);

        if (this._queue.length !== 0) {
            const dataStore = this._queue.shift().value;
            dataStore.addEventListenerOnce(LoaderEvent.COMPLETE, this._onComplete, this);
            dataStore.load();
        }

        if (this._totalComplete === this._dataStores.length) {
            this._onLoadComplete();
        }
    }

    /**
     * Event handler method called once all IDataStore's are completely loaded.
     *
     * @method _onLoadComplete
     * @protected
     */
    protected _onLoadComplete():void {
        let model;
        const dataStoreList = [];
        for (let i:number = 0; i < this._dataStores.length; i++)
        {
            model = this._dataStores.get(i);
            dataStoreList[i] = model.value;
        }

        // Add the whole list because all are completed.
        const bulkLoaderEvent = new BulkLoaderEvent(BulkLoaderEvent.LOAD_COMPLETE);
        bulkLoaderEvent.total = this._dataStores.length;
        bulkLoaderEvent.totalComplete = this._totalComplete;
        bulkLoaderEvent.percentComplete = (this._totalComplete / this._dataStores.length) * 100;
        bulkLoaderEvent.data = dataStoreList;

        // Only dispatch when all the IDataStore are load complete.
        this.dispatchEvent(bulkLoaderEvent);
    }

}

export default BulkLoader;
