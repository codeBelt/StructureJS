///<reference path='../../interface/IDataStore.ts'/>
///<reference path='../../event/LoaderEvent.ts'/>
///<reference path='../../event/EventDispatcher.ts'/>

/**
 * The DataStoreAbstract...
 *
 * @class DataStoreAbstract
 * @module StructureJS
 * @submodule model
 * @constructor
 * @param path {string}
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class DataStoreAbstract extends EventDispatcher implements IDataStore
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @property data
         * @type {any}
         * @public
         */
        public data:any = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property src
         * @type {string}
         * @public
         */
        public src:string = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property complete
         * @type {boolean}
         * @public
         */
        public complete:boolean = false;

        constructor(path:string)
        {
            super();

            this.src = path;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method load
         * @protected
         */
        public load():void
        {
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onLoaderComplete
         * @protected
         */
        public _onLoaderComplete(...rest):void
        {
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this));
        }
    }
}