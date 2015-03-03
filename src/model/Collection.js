/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../util/Util', '../event/EventDispatcher', '../event/BaseEvent', 'lodash'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../util/Util'), require('../event/EventDispatcher'), require('../event/BaseEvent'), require('lodash'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.Collection = factory(root.structurejs.Extend, root.structurejs.Util, root.structurejs.EventDispatcher, root.structurejs.BaseEvent, _);
    }
}(this, function(Extend, Util, EventDispatcher, BaseEvent, _) {
    'use strict';

    /**
     * TODO: YUIDoc_comment
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires EventDispatcher
     * @requires BaseEvent
     * @requires Lodash
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var Collection = (function () {

        var _super = Extend(Collection, EventDispatcher);

        function Collection(valueObjectType) {
            if (valueObjectType === void 0) { valueObjectType = null; }
            _super.call(this);
            /**
             * The list of items in the collection.
             *
             * @property items
             * @type {array}
             * @readOnly
             */
            this.items = [];
            /**
             * The count of how many items are in the collection.
             *
             * @property length
             * @type {init}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
            /**
             * A reference to a ValueObject that was passed into the constructor.
             *
             * @property _valueObjectType
             * @type {ValueObject}
             * @private
             */
            this._valueObjectType = valueObjectType;
        }
        /**
         * Adds item or an array of items to the collection.
         *
         * @method addItem
         * @param item {Any|Array} Single or an array of items to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @example
         *      //TODO
         *      collection.addItem();
         */
        Collection.prototype.addItem = function (item, silent) {
            if (silent === void 0) { silent = false; }

            var items = (item instanceof Array) ? item : [item];

            var len = items.length;
            for (var i = 0; i < len; i++) {
                if (this.hasItem(items[i]) === false) {
                    if (this._valueObjectType !== null) {
                        this.items.push(new this._valueObjectType(item[i]));
                    } else {
                        this.items.push(item[i]);
                    }
                    this.length = this.items.length;
                }
            }

            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
        };
        /**
         * Removes an item from the collection, maintaining its current sort
         * If the collection doesn't have the item, it throws an error
         *
         * @method removeItem
         * @param item {Object} Item to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @example
         *      collection.removeItem(vo);
         *
         *      collection.removeItem(vo, true);
         */
        Collection.prototype.removeItem = function (item, silent) {
            if (silent === void 0) { silent = false; }
            if (this.hasItem(item) === false) {
                throw new Error('[' + this.getQualifiedClassName() + '] Collection does not have item ' + item);
            }
            this.items.splice(this.getIndexOfItem(item), 1);
            this.length = this.items.length;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
        };
        /**
         * Removes an array of items from the collection
         *
         * @method removeItems
         * @param items {Object[]} List of items to add to the current collection
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @example
         *      collection.removeItems(vo);
         *
         *      collection.removeItems(vo, true);
         */
        Collection.prototype.removeItems = function (items, silent) {
            if (silent === void 0) { silent = false; }
            var len = items.length;
            for (var i = 0; i < len; i++) {
                this.removeItem(items[i]);
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
        };
        /**
         * Checks if a collection has an item.
         *
         * @method hasItem
         * @param item {Object} Item to check
         * @return {boolean}
         * @public
         * @example
         *      collection.hasItem(vo);
         */
        Collection.prototype.hasItem = function (item) {
            return this.getIndexOfItem(item) > -1;
        };
        /**
         * Returns the array index position of the value object.
         *
         * @method getIndexOfItem
         * @param item {Object} get the index of.
         * @return {boolean}
         * @public
         * @example
         *      collection.getIndexOfItem(vo);
         */
        Collection.prototype.getIndexOfItem = function (item) {
            return this.items.indexOf(item);
        };
        /**
         * Finds an object by an index value.
         * If the index is out of bounds, the collection will clamp it.
         *
         * @method getItemByIndex
         * @param index {init} The index integer of the item to get
         * @return {Object} item to find
         * @public
         * @example
         *      collection.getItemByIndex(1);
         */
        Collection.prototype.getItemByIndex = function (index) {
            if (index < 0) {
                index = 0;
            }
            if (index >= this.items.length) {
                index = this.items.length - 1;
            }
            // Return the item by the index. It will return null if the array is empty.
            return this.items[index] || null;
        };
        /**
         * Examines each element in a collection, returning an array of all elements that have the given properties.
         * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
         * @method find
         * @param arg {Object|Array}
         * @return {array} Returns a list of found object's.
         * @public
         * @example
         *      // Finds all value object that has 'Robert' in it.
         *      this._collection.find("Robert");
         *      // Finds any value object that has 'Robert' or 'Heater' or 23 in it.
         *      this._collection.find(["Robert", "Heather", 32]);
         *
         *      // Finds all value objects that same key and value you are searching for.
         *      this._collection.find({ name: 'apple', organic: false, type: 'fruit' });
         *      this._collection.find([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         */
        Collection.prototype.find = function (arg) {
            // If properties is not an array then make it an array object.
            arg = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var len = arg.length;
            var prop;
            for (var i = 0; i < len; i++) {
                prop = arg[i];
                // Adds found value object to the foundItems array.
                if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                    // If the item is not an object.
                    foundItems = foundItems.concat(this._findPropertyValue(prop));
                }
                else {
                    // If the item is an object.
                    foundItems = foundItems.concat(_.where(this.items, prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return _.uniq(foundItems);
        };
        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {array} Returns a list of found object's.
         * @private
         */
        Collection.prototype._findPropertyValue = function (arg) {
            // If properties is not an array then make it an array object.
            arg = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var itemsLength = this.items.length;
            var itemsToFindLength = arg.length;
            for (var i = 0; i < itemsLength; i++) {
                var obj = this.items[i];
                for (var key in obj) {
                    // Check if the key value is a property.
                    if (obj.hasOwnProperty(key)) {
                        var propertyValue = obj[key];
                        for (var j = 0; j < itemsToFindLength; j++) {
                            var value = arg[j];
                            // If the value object property equals the string value then keep a reference to that value object.
                            if (propertyValue === value) {
                                // Add found value object to the foundItems array.
                                foundItems.push(obj);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };
        /**
         * Clears or remove all the items from the collection.
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @example
         *      collection.clear();
         */
        Collection.prototype.clear = function (silent) {
            if (silent === void 0) { silent = false; }
            this.items = [];
            this.length = 0;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
            }
        };
        /**
         * Creates and returns a new collection object that contains a reference to the items in the collection cloned from.
         *
         * @method Object
         * @returns {any}
         * @public
         * @example
         *     var clone = collection.clone();
         */
        Collection.prototype.clone = function () {
            var clonedValueObject = new this.constructor(this._valueObjectType);
            clonedValueObject.addItem(this.items.slice(0));
            return clonedValueObject;
        };
        /**
         * Creates a JSON object of the collection.
         *
         * @method toJSON
         * @returns {Array}
         * @public
         * @example
         *     var arrayOfObjects = collection.toJSON();
         */
        Collection.prototype.toJSON = function () {
            if (this._valueObjectType !== null) {
                var list = [];
                var len = this.length;
                for (var i = 0; i < len; i++) {
                    list[i] = this.items[i].toJSON();
                }
                return list;
            } else {
                return Util.clone(this.items);
            }
        };
        /**
         * Creates a JSON string of the collection.
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = collection.toJSONString();
         */
        Collection.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Objects and calls the {{#crossLink "Collection/add:method"}}{{/crossLink}} method to add the objects to the collection.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      collection.fromJSON(str);
         */
        Collection.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.addItem(parsedData);
            return this;
        };
        return Collection;
    })();

    return Collection;
}));