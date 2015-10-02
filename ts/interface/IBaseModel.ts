/**
 * TODO: YUIDoc_comment
 *
 * @class IBaseModel
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IBaseModel
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

export = IBaseModel;