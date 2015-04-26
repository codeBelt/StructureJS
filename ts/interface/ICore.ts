
/**
 * TODO: YUIDoc_comment
 *
 * @class ICore
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureJS
{
    export interface ICore
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
}