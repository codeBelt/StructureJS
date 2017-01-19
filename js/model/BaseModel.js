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
             * @readonly
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
                    var currentData = _this[propertyName];
                    var newData = data[propertyName];
                    var propertyData = (newData !== void 0) ? newData : currentData;
                    _this._updatePropertyWithNewData(propertyName, propertyData);
                }
            });
            return this;
        };
        /**
         * Add the newData to the property
         *
         * @method _updatePropertyWithNewData
         * @param propertyName
         * @param newData
         * @protected
         */
        BaseModel.prototype._updatePropertyWithNewData = function (propertyName, newData) {
            var _this = this;
            // If the current property on the model is an array and the newData is an array.
            if ((this[propertyName] instanceof Array === true) && (newData instanceof Array === true)) {
                var isCurrentValueAnUninstantiatedBaseModel = (typeof this[propertyName][0] === 'function' && this[propertyName][0].IS_BASE_MODEL === true);
                var isNewValueAnUninstantiatedBaseModel = (typeof newData[0] === 'function' && newData[0].IS_BASE_MODEL === true);
                // If the current data and the new data are both uninstantiated BaseModel we don't want to continue.
                if ((isCurrentValueAnUninstantiatedBaseModel === true && isNewValueAnUninstantiatedBaseModel === true) === false) {
                    var baseModelOrUndefined_1 = this[propertyName][0];
                    this[propertyName] = newData.map(function (data) { return _this._updateData(baseModelOrUndefined_1, data); });
                }
                else {
                    this[propertyName] = [];
                }
            }
            else {
                this[propertyName] = this._updateData(this[propertyName], newData);
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateData
         * @param keyValue
         * @param newData
         * @protected
         */
        BaseModel.prototype._updateData = function (keyValue, newData) {
            if (this.sjsOptions.expand === false && typeof newData === 'function' && newData.IS_BASE_MODEL === true) {
                // If newData is a function and has an IS_BASE_MODEL static property then it must be a child model and we need to return null
                // so it cleans up the BaseModel functions on the property.
                // To create empty model(s) pass { expand: true } for the options.
                return null;
            }
            if (typeof keyValue === 'function' && keyValue.IS_BASE_MODEL === true) {
                // If the property is an instance of a BaseModel class and has not been created yet.
                // Instantiate it and pass in the newData to the constructor.
                keyValue = new keyValue(newData, this.sjsOptions);
            }
            else if ((keyValue instanceof BaseModel) === true) {
                // If property is an instance of a BaseModel class and has already been created.
                // Call the update method and pass in the newData.
                keyValue.update(newData);
            }
            else {
                // Else just assign the newData to the property.
                keyValue = newData;
            }
            return keyValue;
        };
        /**
         * Converts the Base Model data into a JSON object and deletes the sjsId property.
         *
         * @method toJSON
         * @returns {any}
         * @public
         * @example
         *     let obj = carModel.toJSON();
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
         *     let str = carModel.toJSONString();
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
         *      let str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      let carModel = new CarModel();
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
         *     let clone = carModel.clone();
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
