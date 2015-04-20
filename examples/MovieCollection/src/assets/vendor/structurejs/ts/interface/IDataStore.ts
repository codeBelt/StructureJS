///<reference path='IEventDispatcher.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class IDataStore
 * @extends IEventDispatcher
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureTS
{
    export interface IDataStore extends IEventDispatcher
    {

        /**
         * @property data
         */
        data:any;

        /**
         * @property src
         */
        src:string;

        /**
         * @property complete
         */
        complete:boolean;

        /**
         * @method load
         */
        load():any;
    }
}