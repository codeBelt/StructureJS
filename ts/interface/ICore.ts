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
     * @property cid
     * @readOnly
     */
    cid:number;

    /**
     * @method getQualifiedClassName
     */
    getQualifiedClassName():string;

    /**
     * @method destroy
     */
    destroy():void
}

export = ICore;