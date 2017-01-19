import IBaseModel from '../interface/IBaseModel';
import IBaseModelOptions from '../interface/IBaseModelOptions';
import BaseObject from '../BaseObject';
/**
 *  Base Model is a design pattern used to transfer data between software application subsystems.
 *
 * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
 *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
 *
 * @class BaseModel
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the base model upon initialization.
 * @param [opts] {{ expand:boolean }} Options for the base model.
 * @module StructureJS
 * @submodule model
 * @requires Extend
 * @requires BaseObject
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Example how to extend the BaseModel class.
 *      let data = {
 *              make: 'Tesla',
 *              model: 'Model S',
 *              YeAr: 2014,
 *              feature: {
 *                  abs: true,
 *                  airbags: true
 *              }
 *      }
 *      let carModel = new CarModel(data);
 *
 *
 *      // Example how to extend the BaseModel class.
 *      class CarModel extends BaseModel {
 *
 *          // You need to have properties so the data will get assigned.
 *          // If not the data will not get assigned to the model.
 *          make = null;
 *          model = null;
 *          year = null;
 *          allWheel = false; // Set a default value
 *
 *          // You can assign BaseModel to a property which will
 *          // automatically created it and pass the data to it.
 *          feature = FeatureModel
 *
 *          // If you have an array of data and want them assign to a BaseModel.
 *          feature = [FeatureModel];
 *
 *          constructor(data = {}, opts = {}) {
 *              super(opts);
 *
 *              if (data) {
 *                  this.update(data);
 *              }
 *          }
 *
 *          // @overridden BaseModel.update
 *          update(data) {
 *              super.update(data);
 *
 *              // If the data doesn't match the property name.
 *              // You can set the value(s) manually after the update super method has been called.
 *              this.year = data.YeAr;
 *          }
 *      }
 */
declare class BaseModel extends BaseObject implements IBaseModel {
    /**
     * This property helps distinguish a BaseModel from other functions.
     *
     * @property IS_BASE_MODEL
     * @type {boolean}
     * @public
     * @static
     * @readonly
     */
    static IS_BASE_MODEL: boolean;
    /**
     * @property sjsOptions
     * @type {IBaseModelOptions}}
     * @readonly
     * @public
     */
    protected sjsOptions: IBaseModelOptions;
    constructor(opts?: IBaseModelOptions);
    /**
     * Provide a way to update the  Base Model.
     *
     * @method update
     * @param [data={}] {any}
     * @public
     * @example
     *     // Example of updating some of the data:
     *     carModel.update({ year: 2015, allWheel: true});
     *
     *     // Of course you can also do it the following way:
     *     carModel.year = 2015;
     *     carModel.allWheel = false;
     */
    update(data?: any): any;
    /**
     * Add the newData to the property
     *
     * @method _updatePropertyWithNewData
     * @param propertyName
     * @param newData
     * @protected
     */
    protected _updatePropertyWithNewData(propertyName: any, newData: any): void;
    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateData
     * @param keyValue
     * @param newData
     * @protected
     */
    protected _updateData(keyValue: any, newData: any): any;
    /**
     * Converts the Base Model data into a JSON object and deletes the sjsId property.
     *
     * @method toJSON
     * @returns {any}
     * @public
     * @example
     *     let obj = carModel.toJSON();
     */
    toJSON(): any;
    /**
     * Converts a  Base Model to a JSON string,
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     let str = carModel.toJSONString();
     */
    toJSONString(): string;
    /**
     * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
     *
     * @method fromJSON
     * @param json {string}
     * @public
     * @example
     *      let str = '{"make":"Tesla","model":"Model S","year":2014}'
     *      let carModel = new CarModel();
     *      carModel.fromJSON(str);
     */
    fromJSON(json: string): any;
    /**
     * Create a clone/copy of the  Base Model.
     *
     * @method clone
     * @returns {BaseModel}
     * @public
     * @example
     *     let clone = carModel.clone();
     */
    clone(): BaseModel;
}
export default BaseModel;
