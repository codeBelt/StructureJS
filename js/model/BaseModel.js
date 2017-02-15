var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../BaseObject", "../util/Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var BaseObject_1 = require("../BaseObject");
    var Util_1 = require("../util/Util");
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
    var BaseModel = (function (_super) {
        __extends(BaseModel, _super);
        function BaseModel(opts) {
            if (opts === void 0) { opts = {}; }
            var _this = _super.call(this) || this;
            /**
             * @property sjsOptions
             * @type {IBaseModelOptions}}
             * @public
             */
            _this.sjsOptions = {
                expand: false,
            };
            _this.sjsOptions.expand = opts.expand === true;
            return _this;
        }
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
        BaseModel.prototype.update = function (data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            Object
                .keys(this)
                .forEach(function (propertyName) {
                // Ignore the sjsId property because it is set in the BaseObject constructor and we don't want to update it.
                if (propertyName !== 'sjsId') {
                    var propertyData = _this[propertyName];
                    var updateData = data[propertyName];
                    var dataToUse = (updateData !== void 0) ? updateData : propertyData;
                    _this._updatePropertyWithDataPassedIn(propertyName, dataToUse);
                }
            });
            return this;
        };
        /**
         * Adds the updateData to the property
         *
         * @method _updatePropertyWithDataPassedIn
         * @param propertyName
         * @param updateData
         * @protected
         */
        BaseModel.prototype._updatePropertyWithDataPassedIn = function (propertyName, updateData) {
            var _this = this;
            // If the current property on the model is an array and the updateData is an array.
            if ((this[propertyName] instanceof Array === true) && (updateData instanceof Array === true)) {
                var isPropertyDataValueAnUninstantiatedBaseModel = (typeof this[propertyName][0] === 'function' && this[propertyName][0].IS_BASE_MODEL === true);
                var isUpdateDataValueAnUninstantiatedBaseModel = (typeof updateData[0] === 'function' && updateData[0].IS_BASE_MODEL === true);
                if (isPropertyDataValueAnUninstantiatedBaseModel === false) {
                    this[propertyName] = updateData.map(function (data) { return _this._updateData(null, data); });
                }
                else if (isPropertyDataValueAnUninstantiatedBaseModel === true && isUpdateDataValueAnUninstantiatedBaseModel === false) {
                    // If the property data is an uninstantiated BaseModel then we assume the update data passed in
                    // needs to be create as that BaseModel Class.
                    var baseModel_1 = this[propertyName][0];
                    this[propertyName] = updateData.map(function (data) { return _this._updateData(baseModel_1, data); });
                }
                else {
                    this[propertyName] = [];
                }
            }
            else {
                this[propertyName] = this._updateData(this[propertyName], updateData);
            }
        };
        /**
         * @method _updateData
         * @param propertyData
         * @param updateData
         * @protected
         */
        BaseModel.prototype._updateData = function (propertyData, updateData) {
            var returnData = null;
            if (this.sjsOptions.expand === false && typeof updateData === 'function' && updateData.IS_BASE_MODEL === true) {
                // If updateData is a function and has an IS_BASE_MODEL static property then it must be a child model and we need to return null
                // so it cleans up the BaseModel functions on the property.
                // To create empty model(s) pass { expand: true } for the options.
                return null;
            }
            if (typeof propertyData === 'function' && propertyData.IS_BASE_MODEL === true && updateData) {
                // If the propertyData is an instance of a BaseModel class and has not been created yet.
                // Instantiate it and pass in the updateData to the constructor.
                returnData = new propertyData(updateData, this.sjsOptions);
            }
            else if ((propertyData instanceof BaseModel) === true) {
                // If propertyData is an instance of a BaseModel class and has already been created.
                // Call the update method and pass in the updateData.
                propertyData.update(updateData);
                returnData = propertyData;
            }
            else {
                // Else just return the updateData to the property.
                returnData = updateData;
            }
            return returnData;
        };
        /**
         * Converts the Base Model data into a JSON object and deletes the sjsId property.
         *
         * @method toJSON
         * @returns {any}
         * @public
         * @example
         *     const obj = carModel.toJSON();
         */
        BaseModel.prototype.toJSON = function () {
            var clone = Util_1.default.clone(this);
            return Util_1.default.deletePropertyFromObject(clone, ['sjsId', 'sjsOptions']);
        };
        /**
         * Converts a  Base Model to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     const str = carModel.toJSONString();
         */
        BaseModel.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      const str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      const carModel = new CarModel();
         *      carModel.fromJSON(str);
         */
        BaseModel.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);
            return this;
        };
        /**
         * Create a clone/copy of the  Base Model.
         *
         * @method clone
         * @returns {BaseModel}
         * @public
         * @example
         *     const clone = carModel.clone();
         */
        BaseModel.prototype.clone = function () {
            var clonedBaseModel = new this.constructor(this);
            return clonedBaseModel;
        };
        return BaseModel;
    }(BaseObject_1.default));
    /**
     * This property helps distinguish a BaseModel from other functions.
     *
     * @property IS_BASE_MODEL
     * @type {boolean}
     * @public
     * @static
     * @readonly
     */
    BaseModel.IS_BASE_MODEL = true;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BaseModel;
});
