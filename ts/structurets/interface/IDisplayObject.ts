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

import IEventDispatcher = require('IEventDispatcher')

/**
 * YUIDoc_comment
 *
 * @class IDisplayObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IDisplayObject extends IEventDispatcher
{

    /**
     * @property isCreated
     */
    isCreated:boolean;

    /**
     * @property numChildren
     */
    numChildren:number;

    /**
     * @property children
     */
    children:IDisplayObject[];

    /**
     * @method createChildren
     */
    createChildren():any;

    /**
     * @method addChild
     */
    addChild(child:IDisplayObject):any;

    /**
     * @method removeChild
     */
    removeChild(child:IDisplayObject):any;

    /**
     * @method removeChildren
     */
    removeChildren():any;

    /**
     * @method layoutChildren
     */
    layoutChildren():any;

    /**
     * @method addChildAt
     */
    addChildAt(child:IDisplayObject, index:number):any;

    /**
     * @method getChildAt
     */
    getChildAt(index:number):IDisplayObject;

    /**
     * @method getChildIndex
     */
    getChildIndex(child:IDisplayObject):number;

    /**
     * @method swapChildren
     */
    swapChildren(child1:IDisplayObject, child2:IDisplayObject):any

    /**
     * @method swapChildrenAt
     */
    swapChildrenAt(index1:number, index2:number):any;
}
export = IDisplayObject;