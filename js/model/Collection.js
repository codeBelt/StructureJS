var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/EventDispatcher', '../event/BaseEvent', '../util/Util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var BaseEvent_1 = require('../event/BaseEvent');
    var Util_1 = require('../util/Util');
    /**
     * The Collection class provides a way for you to manage your models.
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires EventDispatcher
     * @requires BaseEvent
     * @constructor
     * @param baseModelType {BaseModel} Pass a class that extends BaseModel and the data added to the collection will be created as that type.
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     let data = [{ make: 'Tesla', model: 'Model S', year: 2014 }, { make: 'Tesla', model: 'Model X', year: 2016 }];
     *
     *     // Example of adding data to a collection
     *     let collection = new Collection();
     *     collection.add(data);
     *
     *     // Example of adding data to a collection that will create a CarModel model for each data object passed in.
     *     let collection = new Collection(CarModel);
     *     collection.add(data);
     */
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(baseModelType) {
            if (baseModelType === void 0) { baseModelType = null; }
            _super.call(this);
            /**
             * The list of models in the collection.
             *
             * @property models
             * @type {Array.<any>}
             * @readOnly
             */
            this.models = [];
            /**
             * The count of how many models are in the collection.
             *
             * @property length
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
            /**
             * A reference to a BaseModel type that will be used in the collection.
             *
             * @property _modelType
             * @type {any}
             * @protected
             */
            this._modelType = null;
            this._modelType = baseModelType;
        }
        /**
         * Adds model or an array of models to the collection.
         *
         * @method add
         * @param model {Any|Array} Single or an array of models to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.add(model);
         *
         *      collection.add([model, model, model, model]);
         *
         *      collection.add(model, true);
         */
        Collection.prototype.add = function (model, silent) {
            if (silent === void 0) { silent = false; }
            if (model == null) {
                return;
            }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            var len = models.length;
            for (var i = 0; i < len; i++) {
                // Only add the model if it does not exist in the the collection.
                if (this.has(models[i]) === false) {
                    if (this._modelType !== null && (models[i] instanceof this._modelType) === false) {
                        // If the modelType is set and the data is not already a instance of the modelType
                        // then instantiate it and pass the data into the constructor.
                        this.models.push(new this._modelType(models[i]));
                    }
                    else {
                        // Pass the data object to the array.
                        this.models.push(models[i]);
                    }
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.ADDED));
            }
            return this;
        };
        /**
         * Removes a model or an array of models from the collection.
         *
         * @method remove
         * @param model {Object|Array} Model(s) to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.remove(model);
         *
         *      collection.remove([model, model, model, model]);
         *
         *      collection.remove(model, true);
         */
        Collection.prototype.remove = function (model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            for (var i = models.length - 1; i >= 0; i--) {
                // Only remove the model if it exists in the the collection.
                if (this.has(models[i]) === true) {
                    this.models.splice(this.indexOf(models[i]), 1);
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.REMOVED));
            }
            return this;
        };
        /**
         * Checks if a collection has an model.
         *
         * @method has
         * @param model {Object} Item to check
         * @return {boolean}
         * @public
         * @example
         *      collection.has(model);
         */
        Collection.prototype.has = function (model) {
            return this.indexOf(model) > -1;
        };
        /**
         * Returns the array index position of the  Base Model.
         *
         * @method indexOf
         * @param model {Object} get the index of.
         * @return {int}
         * @public
         * @example
         *      collection.indexOf(model);
         */
        Collection.prototype.indexOf = function (model) {
            return this.models.indexOf(model);
        };
        /**
         * Finds an object by an index value.
         *
         * @method get
         * @param index {int} The index integer of the model to get
         * @return {Object} the model
         * @public
         * @example
         *      let model = collection.get(1);
         */
        Collection.prototype.get = function (index) {
            return this.models[index] || null;
        };
        /**
         * Examines each element in a collection, returning an array of all elements that have the given properties.
         * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
         * @method findBy
         * @param arg {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @public
         * @example
         *      // Finds all  Base Model that has 'Robert' in it.
         *      collection.findBy("Robert");
         *      // Finds any  Base Model that has 'Robert' or 'Heater' or 23 in it.
         *      collection.findBy(["Robert", "Heather", 32]);
         *
         *      // Finds all  Base Models that same key and value you are searching for.
         *      collection.findBy({ name: 'apple', organic: false, type: 'fruit' });
         *      collection.findBy([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         */
        Collection.prototype.findBy = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var len = list.length;
            var prop;
            for (var i = 0; i < len; i++) {
                prop = list[i];
                // Adds found  Base Model to the foundItems array.
                if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                    // If the model is not an object.
                    foundItems = foundItems.concat(this._findPropertyValue(prop));
                }
                else {
                    // If the model is an object.
                    foundItems = foundItems.concat(this._where(prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return Util_1.default.unique(foundItems);
        };
        /**
         * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
         *
         * @method _where
         * @param propList {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._where = function (propList) {
            // If properties is not an array then make it an array object.
            var list = (propList instanceof Array) ? propList : [propList];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var hasMatchingProperty = false;
            var doesModelMatch = false;
            var model;
            var obj;
            var key;
            var j;
            for (var i = 0; i < itemsToFindLength; i++) {
                obj = list[i];
                for (j = 0; j < itemsLength; j++) {
                    hasMatchingProperty = false;
                    doesModelMatch = true;
                    model = this.models[j];
                    for (key in obj) {
                        // Check if the key value is a property.
                        if (obj.hasOwnProperty(key) && model.hasOwnProperty(key)) {
                            hasMatchingProperty = true;
                            if (obj[key] !== model[key]) {
                                doesModelMatch = false;
                                break;
                            }
                        }
                    }
                    if (doesModelMatch === true && hasMatchingProperty === true) {
                        foundItems.push(model);
                    }
                }
            }
            return foundItems;
        };
        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._findPropertyValue = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var propertyValue;
            var value;
            var model;
            var key;
            var j;
            for (var i = 0; i < itemsLength; i++) {
                model = this.models[i];
                for (key in model) {
                    // Check if the key value is a property.
                    if (model.hasOwnProperty(key)) {
                        propertyValue = model[key];
                        for (j = 0; j < itemsToFindLength; j++) {
                            value = list[j];
                            // If the  Base Model property equals the string value then keep a reference to that  Base Model.
                            if (propertyValue === value) {
                                // Add found  Base Model to the foundItems array.
                                foundItems.push(model);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };
        /**
         * Clears or remove all the models from the collection.
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.clear();
         */
        Collection.prototype.clear = function (silent) {
            if (silent === void 0) { silent = false; }
            this.models = [];
            this.length = 0;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.CLEAR));
            }
            return this;
        };
        /**
         * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
         *
         * @method clone
         * @returns {Collection}
         * @public
         * @example
         *     let clone = collection.clone();
         */
        Collection.prototype.clone = function () {
            var clonedBaseModel = new this.constructor(this._modelType);
            clonedBaseModel.add(this.models.slice(0));
            return clonedBaseModel;
        };
        /**
         * Creates a JSON object of the collection.
         *
         * @method toJSON
         * @returns {Array.<any>}
         * @public
         * @example
         *     let arrayOfObjects = collection.toJSON();
         */
        Collection.prototype.toJSON = function () {
            if (this._modelType !== null) {
                var list = [];
                var len = this.length;
                for (var i = 0; i < len; i++) {
                    list[i] = this.models[i].toJSON();
                }
                return list;
            }
            else {
                return Util_1.default.clone(this.models);
            }
        };
        /**
         * Creates a JSON string of the collection.
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     let str = collection.toJSONString();
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
         * @chainable
         * @example
         *      collection.fromJSON(str);
         */
        Collection.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.add(parsedData);
            return this;
        };
        /**
         * Allows you to sort models that have one or more common properties, specifying the property or properties to use as the sort keys
         *
         * @method sortOn
         * @param propertyName {string}
         * @param [sortAscending=true] {boolean}
         * @public
         * @return {Array<any>} Returns the list of models in the collection.
         * @example
         *      collection.sortOn('name');
         *      collection.sortOn('name', false);
         */
        Collection.prototype.sortOn = function (propertyName, sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }
            if (sortAscending === false) {
                return this.sort(function (a, b) {
                    if (a[propertyName] < b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] > b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                return this.sort(function (a, b) {
                    if (a[propertyName] > b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] < b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
        };
        /**
         * Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code
         * point value, according to the string conversion of each element.
         *
         * @method sort
         * @param [sortFunction=null] {Function}
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let sortByDate = function(a, b){
         *          return new Date(a.date) - new Date(b.date)
         *      }
         *
         *      collection.sort(sortByDate);
         */
        Collection.prototype.sort = function (sortFunction) {
            if (sortFunction === void 0) { sortFunction = null; }
            this.models.sort(sortFunction);
            return this.models;
        };
        /**
         * The filter method creates a new array with all elements that pass the test implemented by the provided function.
         *
         * @method filter
         * @param callback {Function} Function to test each element of the array. Invoked with arguments (element, index, array). Return true to keep the element, false otherwise.
         * @param [callbackScope=null] Optional. Value to use as this when executing callback.
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let isOldEnough = function(model){
         *          return model.age >= 21;
         *      }
         *
         *      let list = collection.filter(isOldEnough);
         */
        Collection.prototype.filter = function (callback, callbackScope) {
            if (callbackScope === void 0) { callbackScope = null; }
            return this.models.filter(callback, callbackScope);
        };
        /**
         * Convenient way to get a list of property values.
         *
         * @method pluck
         * @param propertyName {string} The property name you want the values from.
         * @param [unique=false] {string} Pass in true to remove duplicates.
         * @return {Array.<any>}
         * @public
         * @example
         *      collection.add([{name: 'Robert'}, {name: 'Robert'}, {name: 'Chris'}]);
         *
         *      let list = collection.pluck('name');
         *      // ['Robert', 'Robert', 'Chris']
         *
         *      let list = collection.pluck('name', true);
         *      // ['Robert', 'Chris']
         */
        Collection.prototype.pluck = function (propertyName, unique) {
            if (unique === void 0) { unique = false; }
            var list = [];
            for (var i = 0; i < this.length; i++) {
                if (this.models[i].hasOwnProperty(propertyName) === true) {
                    list[i] = this.models[i][propertyName];
                }
            }
            if (unique === true) {
                list = Util_1.default.unique(list);
            }
            return list;
        };
        /**
         * Convenient way to group models into categories/groups by a property name.
         *
         * @method groupBy
         * @param propertyName {string} The string value of the property you want to group with.
         * @return {any} Returns an object that is categorized by the property name.
         * @public
         * @example
         *      collection.add([{name: 'Robert', id: 0}, {name: 'Robert', id: 1}, {name: 'Chris', id: 2}]);
         *
         *      let list = collection.groupBy('name');
         *
         *      // {
         *      //    Robert: [{name: 'Robert', id: 0}, {name: 'Robert', id: 1}]
         *      //    Chris: [{name: 'Chris', id: 2}]
         *      // }
         */
        Collection.prototype.groupBy = function (propertyName) {
            var model;
            var groupName;
            var groupList = {};
            // Loop through all the models in this collection.
            for (var i = 0; i < this.length; i++) {
                model = this.models[i];
                // Get the value from the property name passed in and uses that as the group name.
                groupName = model[propertyName];
                if (groupList[groupName] == null) {
                    groupList[groupName] = [];
                }
                groupList[groupName].push(model);
            }
            return groupList;
        };
        /**
         * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
         *
         * @method reverse
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      collection.reverse();
         */
        Collection.prototype.reverse = function () {
            return this.models.reverse();
        };
        return Collection;
    }(EventDispatcher_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Collection;
});
