/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import IValueObject = require('../interface/IValueObject')
import BaseObject = require('../BaseObject')
import Util = require('../util/Util')

/**
 * Value Object (VO) is a design pattern used to transfer data between software application subsystems.
 *
 * @class ValueObject
 * @extends BaseObject
 * @param [data] {any} Provide a way to update the value object upon initialization.
 * @module StructureJS
 * @submodule model
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class ValueObject extends BaseObject implements IValueObject
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
        for (var key in data) {
            if (this.hasOwnProperty(key)) {
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
        var copy:Object = new Object();

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
export = ValueObject;