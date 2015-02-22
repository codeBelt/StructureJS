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
         */
        ValueObject.prototype.update = function (data) {
            for (var key in data) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the cid data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(key) && key !== 'cid') {
                    if (this[key] instanceof ValueObject.constructor) {
                        // If property is an instance of a ValueObject class and has not been created yet.
                        // Than instantiate it and pass in the data to the constructor.
                        this[key] = new this[key](data[key]);
                    }
                    else if (this[key] instanceof ValueObject) {
                        // If property is an instance of a ValueObject class and has already been created.
                        // Than call the update method and pass in the data.
                        this[key].update(data[key]);
                    }
                    else {
                        // Else just assign the data to the property.
                        this[key] = data[key];
                    }
                }
            }
            return this;
        };
        /**
         * ...
         *
         * @method toJSON
         * @returns {ValueObject}
         * @public
         */
        ValueObject.prototype.toJSON = function () {
            var clone = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['cid']);
        };
        /**
         * ...
         *
         * @method toJSONString
         * @returns {string}
         * @public
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
         */
        ValueObject.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);
            return this;
        };
        /**
         *
         *
         * @method Object
         * @returns {any}
         * @public
         */
        ValueObject.prototype.clone = function () {
            var clonedValueObject = new this.constructor(this);
            return clonedValueObject;
        };
        return ValueObject;
    })();

    return ValueObject;
}));