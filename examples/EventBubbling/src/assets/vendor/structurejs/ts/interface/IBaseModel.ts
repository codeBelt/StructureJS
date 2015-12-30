import IBaseObject from './IBaseObject' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IBaseModel
 * @extends IBaseObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IBaseModel extends IBaseObject
{
    /**
     * @method update
     */
    update(data: any): any;

    /**
     * @method toJSON
     */
    toJSON(): any;

    /**
     * @method toJSONString
     */
    toJSONString(): string;

    /**
     * @method fromJSON
     */
    fromJSON(json: string): any;

    /**
     * @method clone
     */
    clone(): IBaseModel;

}

export default IBaseModel;