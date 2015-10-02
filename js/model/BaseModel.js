/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../BaseObject'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.BaseModel = factory(root.StructureJS.Extend, root.StructureJS.BaseObject, root.StructureJS.Util);
    }
}(this, function(Extend, BaseObject, Util) {

    'use strict';

    /**
     *  Base Model (VO) is a design pattern used to transfer data between software application subsystems.
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
     *     var data = {
     *          make: 'Tesla',
     *          model: 'Model S',
     *          YeAr: 2014,
     *          feature: {
     *              abs: true,
     *              airbags: true
     *          }
     *     }
     *     var carVO = new CarVO(data);
     *
     *
     *     // Example how to extend the BaseModel class.
     *      var CarVO = (function () {
     *          var _super = Extend(CarVO, BaseModel);
     *          function CarVO(data) {
     *              _super.call(this);
     *
     *              // You need to have properties so the data will get assigned.
     *              // If not the data will not get assigned to the vo.
     *              this.make = null;
     *              this.model = null;
     *              this.year = null;
     *              this.allWheel = false; // Set a default value.
     *
     *              // You can assign BaseModel to a property which will
     *              // automatically created it and pass the data to it.
     *              this.feature = FeatureVO;
     *
     *              // If you have an array of data and want them assign to a BaseModel.
     *              this.feature = [FeatureVO];
     *
     *              if (data) {
     *                  this.update(data);
     *              }
     *          }
     *
     *          // @overridden BaseModel.update
     *          CarVO.prototype.update = function (data) {
     *              _super.prototype.update.call(this, data);
     *
     *              // If the data doesn't match the property name.
     *             // You can set the value(s) manually after the update super method has been called.
     *              this.year = data.YeAr;
     *          };
     *
     *          return CarVO;
     *      })();
     */
    var BaseModel = (function() {

        var _super = Extend(BaseModel, BaseObject);

        function BaseModel() {
            _super.call(this);
        }
        /**
         * Provide a way to update the  Base Model.
         *
         * @method update
         * @param data {any}
         * @public
         * @example
         *     // Example of updating some of the data:
         *     carVO.update({ year: 2015, allWheel: true});
         *
         *     // Of course you can also do it the following way:
         *     carVO.year = 2015;
         *     carVO.allWheel = false;
         */
        BaseModel.prototype.update = function(data) {
            var propertyData;
            for (var propertyKey in this) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the sjsId data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(propertyKey) && propertyKey !== 'sjsId') {
                    // If the data passed in does not have a property that matches a property on the  Base Model then
                    // use the default value/data that was assigned to the property.
                    // Else use the data that was passed in.
                    propertyData = (data[propertyKey] === void 0) ? this[propertyKey] : data[propertyKey];
                    this._setData(propertyKey, propertyData);
                }
            }
            return this;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _setData
         * @param key
         * @param data
         * @private
         */
        BaseModel.prototype._setData = function(key, data) {
            // If the data is an array and if the property its being assigned to is an array.
            if (data instanceof Array && this[key] instanceof Array) {
                var temp = [];
                var len = data.length;
                if ((this[key][0] instanceof BaseModel.constructor && data[0] instanceof BaseModel.constructor) === false) {
                    var baseModelOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                    for (var i = 0; i < len; i++) {
                        temp[i] = this._updateData(baseModelOrOther, data[i]);
                    }
                }
                this[key] = temp;
            } else {
                this[key] = this._updateData(this[key], data);
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateData
         * @param keyValue
         * @param data
         * @private
         */
        BaseModel.prototype._updateData = function(keyValue, data) {
            if (keyValue instanceof BaseModel.constructor) {
                // If the property is an instance of a BaseModel class and has not been created yet.
                // Then instantiate it and pass in the data to the constructor.
                keyValue = new keyValue(data);
            } else if (keyValue instanceof BaseModel) {
                // If property is an instance of a BaseModel class and has already been created.
                // Then call the update method and pass in the data.
                keyValue.update(data);
            } else {
                // Else just assign the data to the property.
                keyValue = data;
            }
            return keyValue;
        };
        /**
         * Converts the  Base Model data into a JSON object and deletes the sjsId property.
         *
         * @method toJSON
         * @returns {BaseModel}
         * @public
         * @example
         *     var obj = carVO.toJSON();
         */
        BaseModel.prototype.toJSON = function() {
            var clone = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['sjsId']);
        };
        /**
         * Converts a  Base Model to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = carVO.toJSONString();
         */
        BaseModel.prototype.toJSONString = function() {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      var str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      var carVO = new CarVO();
         *      carVO.fromJSON(str);
         */
        BaseModel.prototype.fromJSON = function(json) {
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
         *     var clone = carVO.clone();
         */
        BaseModel.prototype.clone = function() {
            var clonedBaseModel = new this.constructor(this);
            return clonedBaseModel;
        };
        return BaseModel;
    })();

    return BaseModel;
}));
