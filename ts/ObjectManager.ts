import BaseObject from './BaseObject';

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
     *     enable() {
     *          if (this.isEnabled === true) { return; }
     *
     *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.enable();
     *
     *          super.enable();
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
     *      disable() {
     *          if (this.isEnabled === false) { return; }
     *
     *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.disable();
     *
     *          super.disable();
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

export default ObjectManager;