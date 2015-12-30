/**
 * TODO: YUIDoc_comment
 *
 * @class IBaseObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IBaseObject
{
    /**
     * @property sjsId
     */
    sjsId:number;

    /**
     * @method getQualifiedClassName
     */
    getQualifiedClassName():string;

    /**
     * @method destroy
     */
    destroy():void

}

export default IBaseObject;
