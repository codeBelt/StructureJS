import IEventDispatcher from './IEventDispatcher' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IDataStore
 * @extends IEventDispatcher
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IDataStore extends IEventDispatcher
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

export default IDataStore;
