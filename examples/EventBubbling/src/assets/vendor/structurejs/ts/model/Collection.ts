import BaseModel from '../model/BaseModel';
import EventDispatcher from '../event/EventDispatcher';
import BaseEvent from '../event/BaseEvent';
import Util from '../util/Util';

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
class Collection extends EventDispatcher
{
    /**
     * The list of models in the collection.
     *
     * @property models
     * @type {Array.<any>}
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
     * A reference to a BaseModel type that will be used in the collection.
     *
     * @property _modelType
     * @type {any}
     * @protected
     */
    protected _modelType:any = null;

    constructor(baseModelType:any = null)
    {
        super();

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
    public add(model:any, silent:boolean = false):any
    {
        if (model == null)
        {
            return;
        }

        // If the model passed in is not an array then make it.
        const models:any = (model instanceof Array) ? model : [model];

        const len:number = models.length;
        for (let i:number = 0; i < len; i++)
        {
            // Only add the model if it does not exist in the the collection.
            if (this.has(models[i]) === false)
            {
                if (this._modelType !== null && (models[i] instanceof this._modelType) === false)
                {
                    // If the modelType is set and the data is not already a instance of the modelType
                    // then instantiate it and pass the data into the constructor.
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
     *      collection.remove(model);
     *
     *      collection.remove([model, model, model, model]);
     *
     *      collection.remove(model, true);
     */
    public remove(model:any, silent:boolean = false):any
    {
        // If the model passed in is not an array then make it.
        const models:any = (model instanceof Array) ? model : [model];

        for (let i:number = models.length - 1; i >= 0; i--)
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
     *      collection.has(model);
     */
    public has(model:any):boolean
    {
        return this.indexOf(model) > -1;
    }

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
    public indexOf(model:any):number
    {
        return this.models.indexOf(model);
    }

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
    public get(index:number):any
    {
        return this.models[index] || null;
    }

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
    public findBy(arg:any):Array<any>
    {
        // If properties is not an array then make it an array object.
        const list:Array<any> = (arg instanceof Array) ? arg : [arg];
        let foundItems:Array<any> = [];
        const len:number = list.length;
        let prop:any;

        for (let i:number = 0; i < len; i++)
        {
            prop = list[i];
            // Adds found  Base Model to the foundItems array.
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
        return Util.unique(foundItems);
    }

    /**
     * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
     *
     * @method _where
     * @param propList {Object|Array}
     * @return {Array.<any>} Returns a list of found object's.
     * @protected
     */
    protected _where(propList:any):Array<any>
    {
        // If properties is not an array then make it an array object.
        const list:Array<any> = (propList instanceof Array) ? propList : [propList];
        const foundItems:Array<any> = [];
        const itemsLength:number = this.models.length;
        const itemsToFindLength:number = list.length;
        let hasMatchingProperty:boolean = false;
        let doesModelMatch:boolean = false;
        let model:any;
        let obj:any;
        let key:any;
        let j:number;

        for (let i:number = 0; i < itemsToFindLength; i++)
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
     * @return {Array.<any>} Returns a list of found object's.
     * @protected
     */
    protected _findPropertyValue(arg):Array<any>
    {
        // If properties is not an array then make it an array object.
        const list = (arg instanceof Array) ? arg : [arg];
        const foundItems:Array<any> = [];
        const itemsLength:number = this.models.length;
        const itemsToFindLength:number = list.length;
        let propertyValue:any;
        let value:any;
        let model:any;
        let key:any;
        let j:any;

        for (let i:number = 0; i < itemsLength; i++)
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

                        // If the  Base Model property equals the string value then keep a reference to that  Base Model.
                        if (propertyValue === value)
                        {
                            // Add found  Base Model to the foundItems array.
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
    public clear(silent:boolean = false):any
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
     *     let clone = collection.clone();
     */
    public clone():Collection
    {
        const clonedBaseModel:Collection = new (<any>this).constructor(this._modelType);
        clonedBaseModel.add(this.models.slice(0));

        return clonedBaseModel;
    }

    /**
     * Creates a JSON object of the collection.
     *
     * @method toJSON
     * @returns {Array.<any>}
     * @public
     * @example
     *     let arrayOfObjects = collection.toJSON();
     */
    public toJSON():Array<any>
    {
        if (this._modelType !== null)
        {
            const list:Array<any> = [];
            const len:number = this.length;

            for (let i:number = 0; i < len; i++)
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
     *     let str = collection.toJSONString();
     */
    public toJSONString():string
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
    public fromJSON(json):any
    {
        const parsedData:any = JSON.parse(json);

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
     * @return {Array<any>} Returns the list of models in the collection.
     * @example
     *      collection.sortOn('name');
     *      collection.sortOn('name', false);
     */
    public sortOn(propertyName:string, sortAscending:boolean = true):Array<any>
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
     * @return {Array.<any>} Returns the list of models in the collection.
     * @example
     *      let sortByDate = function(a, b){
     *          return new Date(a.date) - new Date(b.date)
     *      }
     *
     *      collection.sort(sortByDate);
     */
    public sort(sortFunction = null):Array<any>
    {
        this.models.sort(sortFunction);

        return this.models;
    }

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
    public filter(callback:any, callbackScope:any = null):Array<any>
    {
        return this.models.filter(callback, callbackScope);
    }

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
    public pluck(propertyName:string, unique:boolean = false):Array<any>
    {
        let list:Array<any> = [];

        for (let i = 0; i < this.length; i++) {
            if (this.models[i].hasOwnProperty(propertyName) === true) {
                list[i] = this.models[i][propertyName];
            }
        }

        if (unique === true) {
            list = Util.unique(list);
        }

        return list;
    }

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
    public groupBy(propertyName):any
    {
        let model:any;
        let groupName:string;
        let groupList:any = {};

        // Loop through all the models in this collection.
        for (let i:number = 0; i < this.length; i++) {
            model = this.models[i];
            // Get the value from the property name passed in and uses that as the group name.
            groupName = model[propertyName];

            if (groupList[groupName] == null) {
                groupList[groupName] = [];
            }
            groupList[groupName].push(model);
        }
        return groupList;
    }

    /**
     * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
     *
     * @method reverse
     * @public
     * @return {Array.<any>} Returns the list of models in the collection.
     * @example
     *      collection.reverse();
     */
    public reverse():Array<any>
    {
        return this.models.reverse();
    }

}

export default Collection;
