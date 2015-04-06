/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../BaseObject'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.ValueObject = factory(root.structurejs.Extend, root.structurejs.BaseObject, root.structurejs.Util);
    }
}(this, function(Extend, BaseObject, Util) {
    'use strict';

    /**
     * Value Object (VO) is a design pattern used to transfer data between software application subsystems.
     *
     * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
     *  Also in the class you inherit ValueObject from you can override the update method to handle the data how you want.
     *
     * @class ValueObject
     * @extends BaseObject
     * @param [data] {any} Provide a way to update the value object upon initialization.
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
     *          year: 2014,
     *          feature: {
     *              abs: true,
     *              airbags: true
     *          }
     *     }
     *     var carVO = new CarVO(data);
     *
     *
     *     // Example how to extend the ValueObject class.
     *      var CarVO = (function () {
     *          var _super = Extend(CarVO, ValueObject);
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
     *              // You can assign another ValueObject to a property which will
     *              // automatically created it and pass the data to it.
     *              this.feature = FeatureVO;
     *
     *              if (data) {
     *                  this.update(data);
     *              }
     *          }
     *
     *          // @overridden ValueObject.update
     *          CarVO.prototype.update = function (data) {
     *              _super.prototype.update.call(this, data);
     *
     *              // Override any values after the default super update method has set the values.
     *
     *              // If the data doesn't match the property names you can set the values
     *              // manually after update super method has been called.
     *              // Also in the class you inherit ValueObject from you can override the
     *              // update method to handle the data how you want.
     *              this.allWheel = data.AllWheel;
     *          };
     *
     *          return CarVO;
     *      })();
     */
    var ValueObject = (function () {

        var _super = Extend(ValueObject, BaseObject);

        function ValueObject() {
            _super.call(this);
        }
        /**
         * Provide a way to update the value object.
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
        ValueObject.prototype.update = function (data) {
            var propertyData;
            for (var propertyKey in this) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the cid data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(propertyKey) && propertyKey !== 'cid') {
                    // If the data passed in does not have a property that matches a property on the value object then
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
        ValueObject.prototype._setData = function (key, data) {
            if (data instanceof Array) {
                var temp = [];
                var len = data.length;
                if ((this[key][0] instanceof ValueObject.constructor && data[0] instanceof ValueObject.constructor) === false) {
                    var valueObjectOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                    for (var i = 0; i < len; i++) {
                        temp[i] = this._updateData(valueObjectOrOther, data[i]);
                    }
                }
                this[key] = temp;
            }
            else {
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
        ValueObject.prototype._updateData = function (keyValue, data) {
            if (keyValue instanceof ValueObject.constructor) {
                // If property is an instance of a ValueObject class and has not been created yet.
                // Than instantiate it and pass in the data to the constructor.
                keyValue = new keyValue(data);
            }
            else if (keyValue instanceof ValueObject) {
                // If property is an instance of a ValueObject class and has already been created.
                // Than call the update method and pass in the data.
                keyValue.update(data);
            }
            else {
                // Else just assign the data to the property.
                keyValue = data;
            }
            return keyValue;
        };
        /**
         * Converts the value object data into a JSON object and deletes the cid property.
         *
         * @method toJSON
         * @returns {ValueObject}
         * @public
         * @example
         *     var obj = carVO.toJSON();
         */
        ValueObject.prototype.toJSON = function () {
            var clone = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['cid']);
        };
        /**
         * Converts a value object to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = carVO.toJSONString();
         */
        ValueObject.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      var str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      var carVO = new CarVO();
         *      carVO.fromJSON(str);
         */
        ValueObject.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);
            return this;
        };
        /**
         * Create a clone/copy of the value object.
         *
         * @method clone
         * @returns {ValueObject}
         * @public
         * @example
         *     var clone = carVO.clone();
         */
        ValueObject.prototype.clone = function () {
            var clonedValueObject = new this.constructor(this);
            return clonedValueObject;
        };
        return ValueObject;
    })();

    return ValueObject;
}));