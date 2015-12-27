import IBaseObject from './IBaseObject' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IObjectManager
 * @extends IBaseObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IObjectManager extends IBaseObject
{
    /**
     * @property isEnabled
     */
    isEnabled: boolean;

    /**
     * @method enable
     */
    enable(): any;

    /**
     * @method disable
     */
    disable(): any;

}

export default IObjectManager;
