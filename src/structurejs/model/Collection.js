define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * YUIDoc_comment
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     **/
    var Collection = (function () {

        var _super = Extend(Collection, EventDispatcher);

        function Collection() {
            _super.call(this);
            /**
             * YUIDoc_comment
             *
             * @property items
             * @type {array}
             * @readOnly
             */
            this.items = [];
            /**
             * YUIDoc_comment
             *
             * @property length
             * @type {init}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
        }
        /**
         * Add an item to the current collection
         * Requires that the item must be an instance of {{#crossLink "IValueObject"}}{{/crossLink}} or extends the {{#crossLink "ValueObject"}}{{/crossLink}} class.
         *
         * @method addItem
         * @param item {IValueObject} The item or {{#crossLink "ValueObject"}}{{/crossLink}} to add.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         */
        Collection.prototype.addItem = function (item, silent) {
            if (typeof silent === "undefined") { silent = false; }
            if ((item instanceof ValueObject) == false) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] Item must be of the IValueObject type');
            }

            if (this.hasItem(item) == false) {
                this.items.push(item);
                this.length = this.items.length;
            }

            if (silent == false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
        };

        /**
         * Removes an item from the collection, maintaining its current sort
         * If the collection doesn't have the item, it throws an error
         *
         * @method removeItem
         * @param item {IValueObject} Item to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         */
        Collection.prototype.removeItem = function (item, silent) {
            if (typeof silent === "undefined") { silent = false; }
            if ((item instanceof ValueObject) == false) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] Item must be of the IValueObject type');
            }

            if (this.hasItem(item) == false) {
                throw new Error('[' + this.getQualifiedClassName() + '] Collection does not have item ' + item);
            }

            this.items.splice(this.getIndexOfItem(item), 1);
            this.length = this.items.length;

            if (silent == false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
        };

        /**
         * Removes an array of items from the collection
         *
         * @method removeItems
         * @param items {IValueObject[]} List of items to add to the current collection
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         */
        Collection.prototype.removeItems = function (items, silent) {
            if (typeof silent === "undefined") { silent = false; }
            var len = items.length;
            for (var i = 0; i < len; i++) {
                this.removeItem(items[i]);
            }

            if (silent == false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
        };

        /**
         * Checks if a collection has an item.
         *
         * @method hasItem
         * @param item {IValueObject} Item to check
         * @return {boolean}
         * @public
         */
        Collection.prototype.hasItem = function (item) {
            return this.getIndexOfItem(item) > -1;
        };

        /**
         * Returns the array index position of the value object.
         *
         * @method getIndexOfItem
         * @param item {IValueObject} IValueObject get the index of.
         * @return {boolean}
         * @public
         */
        Collection.prototype.getIndexOfItem = function (item) {
            return this.items.indexOf(item);
        };

        /**
         * Adds an array of items to the collection
         *
         * @method addItems
         * @param items {IValueObject[]} List of items to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         */
        Collection.prototype.addItems = function (items, silent) {
            if (typeof silent === "undefined") { silent = false; }
            var len = items.length;
            for (var i = 0; i < len; i++) {
                this.addItem(items[i]);
            }

            if (silent == false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
        };

        /**
         * Finds an object by an index value.
         * If the index is out of bounds, the collection will clamp it.
         *
         * @method getItemByIndex
         * @param index {init} The index integer of the item to get
         * @return {IValueObject} item to find
         * @public
         *
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
         * @example
         // Finds all value object that has 'Robert' in it.
         this._collection.find("Robert");
         // Finds any value object that has 'Robert' or 'Heater' or 23 in it.
         this._collection.find(["Robert", "Heather", 32]);

         // Finds all value objects that same key and value you are searching for.
         this._collection.find({ name: 'apple', organic: false, type: 'fruit' });
         this._collection.find([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         * @method find
         * @param arg {Object|Array}
         * @return {array} Returns a list of found IValueObject's.
         * @public
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
                    foundItems = foundItems.concat(this.findPropertyValue(prop));
                } else {
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
         * @method findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {array} Returns a list of found IValueObject's.
         * @private
         */
        Collection.prototype.findPropertyValue = function (arg) {
            // If properties is not an array then make it an array object.
            arg = (arg instanceof Array) ? arg : [arg];

            var foundItems = [];
            var itemsLength = this.items.length;
            var itemsToFindLength = arg.length;

            for (var i = 0; i < itemsLength; i++) {
                var valueObject = this.items[i];

                for (var key in valueObject) {
                    // Check if the key value is a property.
                    if (valueObject.hasOwnProperty(key)) {
                        var propertyValue = valueObject[key];

                        for (var j = 0; j < itemsToFindLength; j++) {
                            var value = arg[j];

                            // If the value object property equals the string value then keep a reference to that value object.
                            if (propertyValue === value) {
                                // Add found value object to the foundItems array.
                                foundItems.push(valueObject);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };

        /**
         * YUIDoc_comment
         *
         * @method copy
         * @public
         */
        Collection.prototype.copy = function () {
            var collection = new Collection();
            collection.addItems(this.items.slice(0));
            return collection;
        };

        /**
         * YUIDoc_comment
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         */
        Collection.prototype.clear = function (silent) {
            if (typeof silent === "undefined") { silent = false; }
            this.items = [];
            this.length = 0;

            if (silent == false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
            }
        };

        /**
         * @overridden BaseObject.destroy
         */
        Collection.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this.items = null;
            this.length = null;
        };
        return Collection;
    })();

    module.exports = Collection;

});