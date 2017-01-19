import IDataStore from '../interface/IDataStore';
import EventDispatcher from '../event/EventDispatcher';
import LoaderEvent from '../event/LoaderEvent';
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
declare class BulkLoader extends EventDispatcher {
    /**
     * A collection to store all the IDataStore's.
     *
     * @property _dataStores
     * @type {Collection}
     * @protected
     */
    protected _dataStores: Collection;
    /**
     * The total number of items that have been loaded.
     *
     * @property _totalComplete
     * @type {number}
     * @protected
     */
    protected _totalComplete: number;
    /**
     * A queue of IDataStore's that need to be loaded still.
     *
     * @property _queue
     * @type {Array<{key:any, value:any}>}
     * @protected
     */
    protected _queue: Array<{
        key: any;
        value: any;
    }>;
    /**
     * Set the maximum number of simultaneous connections (default is 3).
     *
     * @property maxConnections
     * @type [number=3]
     * @public
     */
    maxConnections: number;
    constructor();
    /**
     * Helper method to add IDataStore's.
     *
     * @method addFile
     * @param dataStore {IDataStore}
     * @param key [string=null]
     * @public
     */
    addFile(dataStore: IDataStore, key?: string): void;
    /**
     * Helper method to get IDataStore's.
     *
     * @method getFile
     * @param key {string}
     * @public
     */
    getFile(key: string): IDataStore;
    /**
     * Helper method to start the loading process.
     *
     * @method start
     * @public
     */
    start(): any;
    /**
     * Helper method to stop/clear the loader.
     *
     * @method clear
     * @public
     */
    clear(): void;
    /**
     * Event handler method called every time a IDataStore's is completely loaded.
     *
     * @method _onComplete
     * @param event {LoaderEvent}
     * @protected
     */
    protected _onComplete(event: LoaderEvent): void;
    /**
     * Event handler method called once all IDataStore's are completely loaded.
     *
     * @method _onLoadComplete
     * @protected
     */
    protected _onLoadComplete(): void;
}
export default BulkLoader;
