'use strict';
/*
 UMD Stuff
 @import ./util/Extend as Extend
 @import ./BaseObject as BaseObject
 @export ObjectManager
 */
import BaseObject = require('./BaseObject');

/**
 * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
 *
 * @class ObjectManager
 * @module StructureJS
 * @extends BaseObject
 * @submodule core
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class ObjectManager extends BaseObject
{
    /**
     * The isEnabled property is used to keep track of the enabled state of the object.
     *
     * @property isEnabled
     * @type {boolean}
     * @default false
     * @public
     */
    public isEnabled:boolean = false;

    constructor()
    {
        super();
    }

    /**
     * The enable method is responsible for enabling event listeners and/or children of the containing objects.
     *
     * @method enable
     * @public
     * @chainable
     * @example
     *     ClassName.prototype.enable = function() {
     *          if (this.isEnabled === true) { return this; }
     *
     *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.enable();
     *
     *          return _super.prototype.enable.call(this);
     *     }
     */
    public enable():any
    {
        if (this.isEnabled === true)
        {
            return this;
        }

        this.isEnabled = true;
        return this;
    }

    /**
     * The disable method is responsible for disabling event listeners and/or children of the containing objects.
     *
     * @method disable
     * @public
     * @chainable
     * @example
     *      ClassName.prototype.disable = function() {
     *          if (this.isEnabled === false) { return this; }
     *
     *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.disable();
     *
     *          return _super.prototype.disable.call(this);
     *      }
     */
    public disable():any
    {
        if (this.isEnabled === false)
        {
            return this;
        }

        this.isEnabled = false;
        return this;
    }
}

export = ObjectManager;