/**
 * TODO: YUIDoc_comment
 *
 * @class ICore
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface ICore
{
    /**
     * @property sjsId
     * @readOnly
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

export default ICore;