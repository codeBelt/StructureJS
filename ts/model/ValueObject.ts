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
                if (this.hasOwnProperty(key))
                {
                    this[key] = data[key];
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
            var clone:ValueObject = <ValueObject>this.clone();
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
            return Util.clone(this);
        }

        /**
         *
         *
         * @method copy
         * @returns {IValueObject}
         * @public
         */
        public copy():IValueObject
        {
            var copy:Object = {};

            for (var key in this)
            {
                if (this.hasOwnProperty(key))
                {
                    copy[key] = this[key];
                }
            }

            return <IValueObject>copy;
        }
    }
}