///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/handlebars.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/log.d.ts'/>
'use strict';
/*
 UMD Stuff
 @import ./util/Util as Util
 @export BaseObject
 */
import Util = require('./util/Util');

/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 * @class BaseObject
 * @module StructureJS
 * @submodule core
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BaseObject
{
    /**
     * The cid (client-side id) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
     *
     * @property cid
     * @type {int}
     * @default null
     * @writeOnce
     * @readOnly
     * @public
     */
    public cid:number = null;

    constructor()
    {
        this.cid = Util.uniqueId();
    }

    /**
     * Returns the fully qualified class name of an object.
     *
     * @method getQualifiedClassName
     * @returns {string} Returns the class name.
     * @public
     * @example
     *     instance.getQualifiedClassName();
     */
    public getQualifiedClassName():string
    {
        return Util.getClassName(this);
    }

    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
     * object eligible for garbage collection.
     *
     * By default the destroy method will null out all properties of the class automatically. You should call destroy
     * on other objects before calling the super.
     *
     * @method destroy
     * @return {void}
     * @public
     * @example
     *     ClassName.prototype.destroy = function() {
     *          this._childInstance.destroy();
     *
     *          _super.prototype.destroy.call(this);
     *     }
     */
    public destroy():void
    {
        for (var key in this)
        {
            if (this.hasOwnProperty(key))
            {
                this[key] = null;
            }
        }
    }
}

export = BaseObject;