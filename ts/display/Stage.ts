import DOMElement = require('./DOMElement');

/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main application or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @requires Extend
 * @requires DOMElement
 * @requires jQuery
 * @example
 *     // This example illustrates how to setup your main application or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 *         class MainClass extends Stage {
 *
 *             constructor() {
 *                 super();
 *             }
 *
 *             create() {
 *                 super.create();
 *
 *                 // Create and add your child objects to this parent class.
 *             }
 *
 *             layout() {
 *                 // Layout or update the child objects in this parent class.
 *
 *                 return this;
 *             }
 *
 *             enable() {
 *                 if (this.isEnabled === true) { return this };
 *
 *                 // Enable the child objects and add any event listeners.
 *
 *                 return super.enable();
 *             }
 *
 *             disable() {
 *                 if (this.isEnabled === false) { return this };
 *
 *                 // Disable the child objects and remove any event listeners.
 *
 *                 return super.disable();
 *             }
 *
 *             destroy() {
 *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *                 super.destroy();
 *             }
 *
 *         }
 *
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiate your main application or root class.
 *
 *      let app = new MainClass();
 *      app.appendTo('body');
 *
 */
class Stage extends DOMElement
{
    constructor()
    {
        super();
    }

    /**
     * The selected HTML element where the child elements will be created. This method starts the lifecycle of the application.
     *
     * @method appendTo
     * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
     * @param [enabled=true] {boolean} Sets the enabled state of the object.
     * @chainable
     */
    public appendTo(type:any, enabled:boolean = true):any
    {
        this.$element = (type instanceof jQuery) ? type : jQuery(type);

        this.addClientSideId(this);

        if (this.isCreated === false)
        {
            this.create();
            this.isCreated = true;

            if (enabled === false)
            {
                this.disable();
            }
            else
            {
                this.enable();
            }

            this.layout();
        }

        return this;
    }
}

export = Stage;
