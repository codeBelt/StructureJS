import IDataStore from '../interface/IDataStore';
import EventDispatcher from '../event/EventDispatcher';
import LoaderEvent from '../event/LoaderEvent';
import BulkLoaderEvent from '../event/BulkLoaderEvent';
import Collection from '../model/Collection';

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
    /**
     * TODO: YUIDoc_comment
     *
     * @property _dataStores
     * @type {Collection}
     * @protected
     */
    protected _dataStores:Collection = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _totalComplete
     * @type {number}
     * @protected
     */
    protected _totalComplete:number = 0;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _queue
     * @type {Array<{key:any, value:any}>}
     * @protected
     */
    protected _queue:Array<{key:any, value:any}> = [];

    /**
     * TODO: YUIDoc_comment
     *
     * @property maxConnections
     * @type {number}
     * @public
     */
    public maxConnections:number = 3;

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

        const model = {
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
        const model:{key:any, value:any} = this._dataStores.findBy({key: key})[0];
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
        const imageLoader:IDataStore = this.getFile(key);

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
     * TODO: YUIDoc_comment
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
     * TODO: YUIDoc_comment
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
        } else {
            this._onLoadComplete();
        }
    }

    /**
     * TODO: YUIDoc_comment
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
            dataStoreList.push(model.value);
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
