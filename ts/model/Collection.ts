///<reference path='../interface/ICollection.ts'/>
///<reference path='../model/ValueObject.ts'/>
///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/BaseEvent.ts'/>

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
 * @requires Lodash
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class Collection extends EventDispatcher
    {
        /**
         * The list of models in the collection.
         *
         * @property models
         * @type {Array}
         * @readOnly
         */
        public models:any[] = [];

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
        public _modelType:ValueObject = null;

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
         * @example
         *      collection.add(vo);
         *      collection.add(vo, true);
         */
        public add(model:any, silent:boolean = false):any
        {
            // If the model passed in is not an array then make it.
            var models:any[] = (model instanceof Array) ? model : [model];

            var len = models.length;
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

            if (silent === false) {
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
         * @example
         *      collection.remove(vo);
         *
         *      collection.remove(vo, true);
         */
        public remove(model:any, silent:boolean = false):any
        {
            // If the model passed in is not an array then make it.
            var models:any[] = (model instanceof Array) ? model : [model];

            for (var i:number = models.length - 1; i >= 0; i--)
            {
                // Only remove the model if it exists in the the collection.
                if (this.has(models[i]) === true)
                {
                    this.models.splice(this.indexOf(models[i]), 1);
                    this.length = this.models.length;
                }
            }

            if (silent === false) {
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
         * @return {boolean}
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
        public get(index:number):any
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
         * @method find
         * @param arg {Object|Array}
         * @return {Array} Returns a list of found object's.
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
        public find(arg:any):any[]
        {
            // If properties is not an array then make it an array object.
            var list:any[] = (arg instanceof Array) ? arg : [arg];
            var foundItems:any[] = [];
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
                    foundItems = foundItems.concat(_.where(this.models, prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return _.uniq(foundItems);
        }


        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {Array} Returns a list of found object's.
         * @private
         */
        private _findPropertyValue(arg:any):any[]
        {
            // If properties is not an array then make it an array object.
            var list:any[] = (arg instanceof Array) ? arg : [arg];
            var foundItems:any[] = [];
            var itemsLength:number = this.models.length;
            var itemsToFindLength:number = list.length;

            for (var i = 0; i < itemsLength; i++)
            {
                var obj = this.models[i];
                for (var key in obj)
                {
                    // Check if the key value is a property.
                    if (obj.hasOwnProperty(key))
                    {
                        var propertyValue = obj[key];
                        for (var j = 0; j < itemsToFindLength; j++)
                        {
                            var value = list[j];
                            // If the value object property equals the string value then keep a reference to that value object.
                            if (propertyValue === value)
                            {
                                // Add found value object to the foundItems array.
                                foundItems.push(obj);
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
         * @method Object
         * @returns {any}
         * @public
         * @example
         *     var clone = collection.clone();
         */
        public clone():Collection
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
        public toJSON():any
        {
            if (this._modelType !== null)
            {
                var list = [];

                for (var i = 0; i < this.length; i++)
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
         * @example
         *      collection.fromJSON(str);
         */
        public fromJSON(json):any
        {
            var parsedData:any = JSON.parse(json);
            this.add(parsedData);

            return this;
        }

    }
}