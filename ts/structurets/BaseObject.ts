/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
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

///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/handlebars.d.ts'/>
///<reference path='_declare/lodash.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/log.d.ts'/>

import Util = require("util/Util");

class BaseObject
{
    /**
     * The cid or client id is a unique identifier automatically assigned to most StructureTS objects upon instantiation.
     *
     * @property cid
     * @type {int}
     * @default null
     * @writeOnce
     * @public
     */
    public cid:number = null;

    /**
     * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureTS classes.
     *
     * @class BaseObject
     * @module StructureTS
     * @submodule core
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
        this.cid = Util.uniqueId();
    }

    /**
     * Returns the fully qualified class name of an object.
     *
     * @example
     instance.getQualifiedClassName();
     * @method getQualifiedClassName
     * @returns {string} Returns the class name.
     * @public
     */
    public getQualifiedClassName():string
    {
        return Util.getClassName(this);
    }

    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, remove any event
     * listeners and take any other steps necessary to make an object eligible for garbage collection.
     * It is critical that all subclasses call the super for this function in their overridden methods.
     *
     * Note: super.destroy(); should be called first before you clean up any other objects/items in the current classs.
     * The {{#crossLink "BaseObject/destroy:method"}}{{/crossLink}} method also calls the
     * {{#crossLink "EventDispatcher/disable:method"}}{{/crossLink}} method on all classes that extend
     * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
     * @example
     public destroy():void {
            super.destroy();

            this._childInstance.destroy();
            this._childInstance = null;
        }
     * @method destroy
     * @return {void}
     * @public
     */
    public destroy():void
    {
    }

}

export = BaseObject;