import IBaseModel from '../interface/IBaseModel';
import BaseObject from '../BaseObject';
import Util from '../util/Util';

/**
 *  Base Model is a design pattern used to transfer data between software application subsystems.
 *
 * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
 *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
 *
 * @class BaseModel
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the  Base Model upon initialization.
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
 *          constructor(data) {
 *              super();
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
class BaseModel extends BaseObject implements IBaseModel
{
    constructor()
    {
        super();
    }

    /**
     * Provide a way to update the  Base Model.
     *
     * @method update
     * @param data {any}
     * @public
     * @example
     *     // Example of updating some of the data:
     *     carModel.update({ year: 2015, allWheel: true});
     *
     *     // Of course you can also do it the following way:
     *     carModel.year = 2015;
     *     carModel.allWheel = false;
     */
    public update(data:any):any
    {
        let propertyData:any;

        for (let propertyKey in this)
        {
            // If this class has a property that matches a property on the data being passed in then set it.
            // Also don't set the sjsId data value because it is automatically set in the constructor and
            // we do want it to be overridden when the clone method has been called.
            if (this.hasOwnProperty(propertyKey) && propertyKey !== 'sjsId')
            {
                // If the data passed in does not have a property that matches a property on the  Base Model then
                // use the default value/data that was assigned to the property.
                // Else use the data that was passed in.
                propertyData = (data[propertyKey] === void 0) ? this[propertyKey] : data[propertyKey];

                this._setData(propertyKey, propertyData);
            }
        }

        return this;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _setData
     * @param key
     * @param data
     * @protected
     */
    protected _setData(key:any, data:any):void
    {
        // If the data is an array and if the property its being assigned to is an array.
        if (data instanceof Array && this[key] instanceof Array)
        {
            const temp:Array<any> = [];
            const len:number = data.length;

            if ((this[key][0] instanceof BaseModel.constructor && data[0] instanceof BaseModel.constructor) === false)
            {
                const baseModelOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                for (let i:number = 0; i < len; i++)
                {
                    temp[i] = this._updateData(baseModelOrOther, data[i]);
                }
            }

            this[key] = temp;
        }
        else
        {
            this[key] = this._updateData(this[key], data);
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateData
     * @param keyValue
     * @param data
     * @protected
     */
    protected _updateData(keyValue:any, data:any):any
    {
        if (keyValue instanceof BaseModel.constructor)
        {
            // If the property is an instance of a BaseModel class and has not been created yet.
            // Then instantiate it and pass in the data to the constructor.
            keyValue = new keyValue(data);
        }
        else if (keyValue instanceof BaseModel)
        {
            // If property is an instance of a BaseModel class and has already been created.
            // Then call the update method and pass in the data.
            keyValue.update(data);
        }
        else
        {
            // Else just assign the data to the property.
            keyValue = data;
        }

        return keyValue;
    }

    /**
     * Converts the Base Model data into a JSON object and deletes the sjsId property.
     *
     * @method toJSON
     * @returns {any}
     * @public
     * @example
     *     let obj = carModel.toJSON();
     */
    public toJSON():any
    {
        const clone:any = Util.clone(this);
        return Util.deletePropertyFromObject(clone, ['sjsId']);
    }

    /**
     * Converts a  Base Model to a JSON string,
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     let str = carModel.toJSONString();
     */
    public toJSONString():string
    {
        return JSON.stringify(this.toJSON());
    }

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
    public fromJSON(json:string):any
    {
        const parsedData:any = JSON.parse(json);

        this.update(parsedData);

        return this;
    }

    /**
     * Create a clone/copy of the  Base Model.
     *
     * @method clone
     * @returns {BaseModel}
     * @public
     * @example
     *     let clone = carModel.clone();
     */
    public clone():BaseModel
    {
        const clonedBaseModel:BaseModel = new (<any>this).constructor(this);

        return clonedBaseModel;
    }
}

export default BaseModel;