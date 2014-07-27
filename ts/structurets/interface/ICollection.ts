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

import IValueObject = require('IValueObject')


/**
 * YUIDoc_comment
 *
 * @class ICollection
 * @module StructureJS
 * @submodule interface
 * @interface
 **/
interface ICollection
{
    /**
     * @method destroy
     */
    destroy():void;

//    /**
//     * @method clone
//     */
//    clone():void;

    /**
     * @method copy
     */
    copy():void;

    /**
     * @method addItem
     */
    addItem(item:IValueObject):any;

    /**
     * @method addItems
     */
    addItems(items:IValueObject[]):any

    /**
     * @method removeItem
     */
    removeItem(item:IValueObject):any

    /**
     * @method removeItems
     */
    removeItems(items:IValueObject[]):any

    /**
     * @method hasItem
     */
    hasItem(item:IValueObject):boolean

    /**
     * @method getIndexOfItem
     */
    getIndexOfItem(item:IValueObject):number

    /**
     * @method getItemByIndex
     */
    getItemByIndex(index:number):IValueObject;

    /**
     * @method find
     */
    find(properties:any):IValueObject[]

}
export = ICollection;