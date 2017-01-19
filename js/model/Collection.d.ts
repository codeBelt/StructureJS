import EventDispatcher from '../event/EventDispatcher';
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
declare class Collection extends EventDispatcher {
    /**
     * The list of models in the collection.
     *
     * @property models
     * @type {Array.<any>}
     * @readOnly
     */
    models: Array<any>;
    /**
     * The count of how many models are in the collection.
     *
     * @property length
     * @type {int}
     * @default 0
     * @readOnly
     * @public
     */
    length: number;
    /**
     * A reference to a BaseModel type that will be used in the collection.
     *
     * @property _modelType
     * @type {any}
     * @protected
     */
    protected _modelType: any;
    constructor(baseModelType?: any);
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
    add(model: any, silent?: boolean): any;
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
    remove(model: any, silent?: boolean): any;
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
    has(model: any): boolean;
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
    indexOf(model: any): number;
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
    get(index: number): any;
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
    findBy(arg: any): Array<any>;
    /**
     * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
     *
     * @method _where
     * @param propList {Object|Array}
     * @return {Array.<any>} Returns a list of found object's.
     * @protected
     */
    protected _where(propList: any): Array<any>;
    /**
     * Loops through all properties of an object and check to see if the value matches the argument passed in.
     *
     * @method _findPropertyValue
     * @param arg {String|Number|Boolean>}
     * @return {Array.<any>} Returns a list of found object's.
     * @protected
     */
    protected _findPropertyValue(arg: any): Array<any>;
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
    clear(silent?: boolean): any;
    /**
     * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
     *
     * @method clone
     * @returns {Collection}
     * @public
     * @example
     *     let clone = collection.clone();
     */
    clone(): Collection;
    /**
     * Creates a JSON object of the collection.
     *
     * @method toJSON
     * @returns {Array.<any>}
     * @public
     * @example
     *     let arrayOfObjects = collection.toJSON();
     */
    toJSON(): Array<any>;
    /**
     * Creates a JSON string of the collection.
     *
     * @method toJSONString
     * @returns {string}
     * @public
     * @example
     *     let str = collection.toJSONString();
     */
    toJSONString(): string;
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
    fromJSON(json: any): any;
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
    sortOn(propertyName: string, sortAscending?: boolean): Array<any>;
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
    sort(sortFunction?: any): Array<any>;
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
    filter(callback: any, callbackScope?: any): Array<any>;
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
    pluck(propertyName: string, unique?: boolean): Array<any>;
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
    groupBy(propertyName: any): any;
    /**
     * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
     *
     * @method reverse
     * @public
     * @return {Array.<any>} Returns the list of models in the collection.
     * @example
     *      collection.reverse();
     */
    reverse(): Array<any>;
}
export default Collection;
