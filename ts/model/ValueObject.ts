///<reference path='../interface/IValueObject.ts'/>
///<reference path='../BaseObject.ts'/>
///<reference path='../util/Util.ts'/>

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
module StructureTS
{
    export class ValueObject extends BaseObject implements IValueObject
    {
        constructor()
        {
            super();
        }

        /**
         * Provide a way to update the value object.
         *
         * @method update
         * @param data {any}
         * @public
         */
        public update(data:any):any
        {
            for (var key in data)
            {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the cid data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(key) && key !== 'cid')
                {
                    if (this[key] instanceof ValueObject.constructor)
                    {
                        // If property is an instance of a ValueObject class and has not been created yet.
                        // Than instantiate it and pass in the data to the constructor.
                        this[key] = new this[key](data[key]);
                    }
                    else if (this[key] instanceof ValueObject)
                    {
                        // If property is an instance of a ValueObject class and has already been created.
                        // Than call the update method and pass in the data.
                        this[key].update(data[key]);
                    }
                    else
                    {
                        // Else just assign the data to the property.
                        this[key] = data[key];
                    }
                }
            }
            return this;
        }

        /**
         * ...
         *
         * @method toJSON
         * @returns {ValueObject}
         * @public
         */
        public toJSON():ValueObject
        {
            var clone:any = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['cid']);
        }

        /**
         * ...
         *
         * @method toJSONString
         * @returns {string}
         * @public
         */
        public toJSONString():string
        {
            return JSON.stringify(this.toJSON());
        }

        /**
         * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         */
        public fromJSON(json:string):any
        {
            var parsedData:any = JSON.parse(json);
            this.update(parsedData);

            return this;
        }

        /**
         *
         *
         * @method Object
         * @returns {any}
         * @public
         */
        public clone():Object
        {
            var clonedValueObject = new (<any>this).constructor(this);
            return clonedValueObject;
        }
    }
}