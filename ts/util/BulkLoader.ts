
/**
 * The BulkLoader...
 *
 * @class BulkLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class BulkLoader extends EventDispatcher
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
                if (dataStore.complete === false)
                {
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
}