
/**
 * TODO: YUIDoc_comment
 *
 * @class IValueObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureTS
{
    export interface IValueObject
    {
        /**
         * @method clone
         */
        clone():Object;

        /**
         * @method toJSON
         */
        toJSON():any;

        /**
         * @method toJSONString
         */
        toJSONString():string

        /**
         * @method fromJSON
         */
        fromJSON(json:Object):any;

        /**
         * @method destroy
         */
        destroy():void;
    }
}