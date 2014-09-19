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

/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
 * @example
 // This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 define(function (require, exports, module) {
            'use strict';

            var Extend = require('structurejs/util/Extend');
            var Stage = require('replace/path/Stage');

            var MainClass = (function () {

            var _super = Extend(MainClass, Stage);

                function MainClass() {
                    _super.call(this);
                }

                MainClass.prototype.createChildren = function () {
                    _super.prototype.createChildren.call(this);

                    // Create and add your child objects to this parent class.
                }

                MainClass.prototype.layoutChildren = function () {
                    // Layout or update the child objects in this parent class.

                    return this;
                }

                MainClass.prototype.enable = function () {
                    if (this.isEnabled === true) { return this; }

                    // Enable the child objects and add any event listeners.

                    return _super.prototype.enable.call(this);
                }

                MainClass.prototype.disable = function () {
                    if (this.isEnabled === false) { return this; }

                    // Disable the child objects and remove any event listeners.

                    return _super.prototype.disable.call(this);
                }

                MainClass.prototype.destroy = function () {
                    _super.prototype.destroy.call(this);

                    // Destroy the child objects and references in this parent class to prevent memory leaks.
                }

                return MainClass;
            })();

            module.exports = MainClass;
        });
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
 * @author Robert S. (www.codeBelt.com)
 */
class Stage extends DOMElement
{
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

        if (this.isCreated === false)
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