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

import DOMElement = require("display/DOMElement");

class Stage extends DOMElement
{
    /**
     * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
     * @example
     This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.

     class MainClass extends Stage {

           constructor() {
               super();
           }

           public createChildren():void {
               super.createChildren();
               // Add children classes.
           }

            public enable():void {
               if (this.isEnabled === true) return;
               // Add listeners and/or enable children.
               super.enable();
            }

            public disable():void {
               if (this.isEnabled === false) return;
               // Remove listeners and/or disable children.
               super.disable();
            }

            public destroy():void {
               super.destroy();
               // Add items to clean up.
            }

       }
     *
     * <b>Instantiation Example</b><br>
     * This example illustrates how to instantiation your main or root class.
     *
     *      var app = new MainClass();
     *      app.appendTo('body');
     *
     * @class Stage
     * @extends DOMElement
     * @module StructureJS
     * @submodule view
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
        super();
    }

    /**
     * The selected HTML element where all the child elements will be created. This method also starts the lifecycle of the application.
     *
     * @method appendTo
     * @param type {string} A string value that you want the your code appended too. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
     * @param [enabled=true] {boolean} Sets the enabled state of the object.
     * @chainable
     */
    public appendTo(type:string, enabled:boolean = true):any
    {
        this.$element = jQuery(type);
        this.$element.attr('data-cid', this.cid);

        if (this.isCreated == false)
        {
            this.createChildren();
            this.isCreated = true;
            this.layoutChildren();
        }

        if (enabled === false)
        {
            this.disable();
        }
        else
        {
            this.enable();
        }

        return this;
    }

}

export = Stage;