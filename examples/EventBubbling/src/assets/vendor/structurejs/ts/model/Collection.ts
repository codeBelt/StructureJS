'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../model/ValueObject as ValueObject
 @import ../event/EventDispatcher as EventDispatcher
 @import ../event/BaseEvent as BaseEvent
 @import ../util/Util as Util
 @export LoaderEvent
 */
import ValueObject = require('../model/ValueObject');
import EventDispatcher = require('../event/EventDispatcher');
import BaseEvent = require('../event/BaseEvent');
import Util = require('../util/Util');

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
 * @param valueObjectType {ValueObject} Pass a class that extends ValueObject and the data added to the collection will be created as that type.
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     var data = [{ make: 'Tesla', model: 'Model S', year: 2014 }, { make: 'Tesla', model: 'Model X', year: 2016 }];
 *
 *     // Example of adding data to a collection
 *     var collection = new Collection();
 *     collection.add(data);
 *
 *     // Example of adding data to a collection that will create a CarVO model for each data object passed in.
 *     var collection = new Collection(CarVO);
 *     collection.add(data);
 */
class Collection extends EventDispatcher
{
    /**
     * The list of models in the collection.
     *
     * @property models
     * @type {Array}
     * @readOnly
     */
    public models:Array<any> = [];

    /**
     * The count of how many models are in the collection.
     *
     * @property length
     * @type {int}
     * @default 0
     * @readOnly
     * @public
     */
    public length:number = 0;

    /**
     * A reference to a ValueObject that will be used in the collection.
     *
     * @property _modelType
     * @type {ValueObject}
     * @private
     */
    private _modelType:ValueObject = null;

    constructor(valueObjectType:ValueObject = null)
    {
        super();

        this._modelType = valueObjectType;
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
     *      collection.add(vo);
     *      collection.add(vo, true);
     */
    public add(model:any, silent:boolean = false):any
    {
        // If the model passed in is not an array then make it.
        var models:any = (model instanceof Array) ? model : [model];

        var len:number = models.length;
        for (var i:number = 0; i < len; i++)
        {
            // Only add the model if it does not exist in the the collection.
            if (this.has(models[i]) === false)
            {
                if (this._modelType !== null)
                {
                    // If the modeType is set then instantiate it and pass the data into the constructor.
                    this.models.push(new (<any>this)._modelType(models[i]));
                }
                else
                {
                    // Pass the data object to the array.
                    this.models.push(models[i]);
                }

                this.length = this.models.length;
            }
        }

        if (silent === false)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
        }

        return this;
    }

    /**
     * Removes a model or an array of models from the collection.
     *
     * @method remove
     * @param model {Object|Array} Model(s) to remove
     * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
     * @public
     * @chainable
     * @example
     *      collection.remove(vo);
     *
     *      collection.remove(vo, true);
     */
    public remove(model:any, silent:boolean = false):any
    {
        // If the model passed in is not an array then make it.
        var models:any = (model instanceof Array) ? model : [model];

        for (var i:number = models.length - 1; i >= 0; i--)
        {
            // Only remove the model if it exists in the the collection.
            if (this.has(models[i]) === true)
            {
                this.models.splice(this.indexOf(models[i]), 1);
                this.length = this.models.length;
            }
        }

        if (silent === false)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
        }

        return this;
    }

    /**
     * Checks if a collection has an model.
     *
     * @method has
     * @param model {Object} Item to check
     * @return {boolean}
     * @public
     * @example
     *      collection.has(vo);
     */
    public has(model:any):boolean
    {
        return this.indexOf(model) > -1;
    }

    /**
     * Returns the array index position of the value object.
     *
     * @method indexOf
     * @param model {Object} get the index of.
     * @return {int}
     * @public
     * @example
     *      collection.indexOf(vo);
     */
    public indexOf(model:any):number
    {
        return this.models.indexOf(model);
    }

    /**
     * Finds an object by an index value.
     * If the index is out of bounds, the collection will clamp it.
     *
     * @method get
     * @param index {int} The index integer of the model to get
     * @return {Object} model to find
     * @public
     * @example
     *      collection.get(1);
     */
    private get(index:number):any
    {
        if (index < 0)
        {
            index = 0;
        }

        if (index >= this.models.length)
        {
            index = this.models.length - 1;
        }

        // Return the model by the index. It will return null if the array is empty.
        return this.models[index] || null;
    }

    /**
     * Examines each element in a collection, returning an array of all elements that have the given properties.
     * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
     * @method findBy
     * @param arg {Object|Array}
     * @return {Array} Returns a list of found object's.
     * @public
     * @example
     *      // Finds all value object that has 'Robert' in it.
     *      this._collection.findBy("Robert");
     *      // Finds any value object that has 'Robert' or 'Heater' or 23 in it.
     *      this._collection.findBy(["Robert", "Heather", 32]);
     *
     *      // Finds all value objects that same key and value you are searching for.
     *      this._collection.findBy({ name: 'apple', organic: false, type: 'fruit' });
     *      this._collection.findBy([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
     */
    private findBy(arg:any):Array<any>
    {
        // If properties is not an array then make it an array object.
        var list:Array<any> = (arg instanceof Array) ? arg : [arg];
        var foundItems:Array<any> = [];
        var len:number = list.length;
        var prop:any;

        for (var i:number = 0; i < len; i++)
        {
            prop = list[i];
            // Adds found value object to the foundItems array.
            if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean'))
            {
                // If the model is not an object.
                foundItems = foundItems.concat(this._findPropertyValue(prop));
            }
            else
            {
                // If the model is an object.
                foundItems = foundItems.concat(this._where(prop));
            }
        }

        // Removes all duplicated objects found in the temp array.
        return this._unique(foundItems);
    }

    /**
     * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
     *
     * @method _where
     * @param propList {Object|Array}
     * @return {Array} Returns a list of found object's.
     * @private
     */
    private _where(propList:any):Array<any>
    {
        // If properties is not an array then make it an array object.
        var list:Array<any> = (propList instanceof Array) ? propList : [propList];
        var foundItems:Array<any> = [];
        var itemsLength:number = this.models.length;
        var itemsToFindLength:number = list.length;
        var hasMatchingProperty:boolean = false;
        var doesModelMatch:boolean = false;
        var model:any;
        var obj:any;
        var key:any;
        var j:number;

        for (var i:number = 0; i < itemsToFindLength; i++)
        {
            obj = list[i];

            for (j = 0; j < itemsLength; j++)
            {
                hasMatchingProperty = false;
                doesModelMatch = true;
                model = this.models[j];

                for (key in obj)
                {
                    // Check if the key value is a property.
                    if (obj.hasOwnProperty(key) && model.hasOwnProperty(key))
                    {
                        hasMatchingProperty = true;

                        if (obj[key] !== model[key])
                        {
                            doesModelMatch = false;
                            break;
                        }
                    }
                }

                if (doesModelMatch === true && hasMatchingProperty === true)
                {
                    foundItems.push(model);
                }
            }
        }

        return foundItems;
    }

    /**
     * Loops through all properties of an object and check to see if the value matches the argument passed in.
     *
     * @method _findPropertyValue
     * @param arg {String|Number|Boolean>}
     * @return {Array} Returns a list of found object's.
     * @private
     */
    private _findPropertyValue(arg):Array<any>
    {
        // If properties is not an array then make it an array object.
        var list = (arg instanceof Array) ? arg : [arg];
        var foundItems:Array<any> = [];
        var itemsLength:number = this.models.length;
        var itemsToFindLength:number = list.length;
        var propertyValue:any;
        var value:any;
        var model:any;
        var key:any;
        var j:any;

        for (var i:number = 0; i < itemsLength; i++)
        {
            model = this.models[i];

            for (key in model)
            {
                // Check if the key value is a property.
                if (model.hasOwnProperty(key))
                {
                    propertyValue = model[key];

                    for (j = 0; j < itemsToFindLength; j++)
                    {
                        value = list[j];

                        // If the value object property equals the string value then keep a reference to that value object.
                        if (propertyValue === value)
                        {
                            // Add found value object to the foundItems array.
                            foundItems.push(model);
                            break;
                        }
                    }
                }
            }
        }

        return foundItems;
    }

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
    private clear(silent:boolean = false):any
    {
        this.models = [];
        this.length = 0;

        if (silent === false)
        {
            this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
        }

        return this;
    }

    /**
     * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
     *
     * @method clone
     * @returns {Collection}
     * @public
     * @example
     *     var clone = collection.clone();
     */
    private clone():Collection
    {
        var clonedValueObject:Collection = new (<any>this).constructor(this._modelType);
        clonedValueObject.add(this.models.slice(0));

        return clonedValueObject;
    }

    /**
     * Creates a JSON object of the collection.
     *
     * @method toJSON
     * @returns {Array}
     * @public
     * @example
     *     var arrayOfObjects = collection.toJSON();
     */
    private toJSON():Array<any>
    {
        if (this._modelType !== null)
        {
            var list:Array<any> = [];
            var len:number = this.length;

            for (var i:number = 0; i < len; i++)
            {
                list[i] = this.models[i].toJSON();
            }

            return list;
        }
        else
        {
            return Util.clone(this.models);
        }
    }

    /**
     * Creates a JSON string of the collection.
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     var str = collection.toJSONString();
     */
    private toJSONString():string
    {
        return JSON.stringify(this.toJSON());
    }

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
    private fromJSON(json):any
    {
        var parsedData:any = JSON.parse(json);

        this.add(parsedData);

        return this;
    }

    /**
     * Allows you to sort models that have one or more common properties, specifying the property or properties to use as the sort keys
     *
     * @method sortOn
     * @param propertyName {string}
     * @param [sortAscending=true] {boolean}
     * @public
     * @return {Array} Returns the list of models in the collection.
     * @example
     *      collection.sortOn('name');
     *      collection.sortOn('name', false);
     */
    private sortOn(propertyName:string, sortAscending:boolean = true)
    {
        if (sortAscending === false)
        {
            return this.sort(function (a, b)
            {
                if (a[propertyName] < b[propertyName])
                {
                    return 1;
                }

                if (a[propertyName] > b[propertyName])
                {
                    return -1;
                }

                return 0;
            });
        }
        else
        {
            return this.sort(function (a, b)
            {
                if (a[propertyName] > b[propertyName])
                {
                    return 1;
                }

                if (a[propertyName] < b[propertyName])
                {
                    return -1;
                }

                return 0;
            });
        }
    }

    /**
     * Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code
     * point value, according to the string conversion of each element.
     *
     * @method sort
     * @param [sortFunction=null] {Function}
     * @public
     * @return {Array} Returns the list of models in the collection.
     * @example
     *      var sortByDate = function(a, b){
     *          return new Date(a.date) - new Date(b.date)
     *      }
     *
     *      collection.sort(sortByDate);
     */
    private sort(sortFunction = null):Array<any>
    {
        this.models.sort(sortFunction);

        return this.models;
    }

    /**
     * The filter method creates a new array with all elements that pass the test implemented by the provided function.
     *
     * @method filter
     * @param filterFunction {Function} Function to test each element of the array. Invoked with arguments (element, index, array). Return true to keep the element, false otherwise.
     * @public
     * @return {Array} Returns the list of models in the collection.
     * @example
     *      var isOldEnough = function(model){
     *          return model.age >= 21;
     *      }
     *
     *      var list = collection.filter(isOldEnough);
     */
    public filter(filterFunction:any):Array<any>
    {
        return this.models.filter(filterFunction);
    }

    /**
     * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
     *
     * @method reverse
     * @public
     * @return {Array} Returns the list of models in the collection.
     * @example
     *      collection.reverse();
     */
    private reverse():Array<any>
    {
        return this.models.reverse();
    }

    /**
     * Returns a new array of models with duplicates removed.
     *
     * @method _unique
     * @param list {Array} The array you want to use to generate the unique array.
     * @return {Array} Returns a new array list of models in the collection with duplicates removed.
     * @private
     */
    private _unique(list):Array<any>
    {
        var unique:Array<any> = list.reduce(function (previousValue:any, currentValue:any)
        {
            if (previousValue.indexOf(currentValue) === -1)
            {
                previousValue.push(currentValue);
            }

            return previousValue;
        }, []);

        return unique;
    }
}

export = Collection;