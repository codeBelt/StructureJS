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

import DOMElement = require("../display/DOMElement");

/**
 * A helper class to create multiple instances of the same Component Class.
 *
 * @class ComponentFactory
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class ComponentFactory
{
    constructor()
    {
    }

    /**
     * Takes in one or more jQuery objects and creates a component for each one.
     *
     * @method create
     * @param $element {jQuery} One or more jQuery referenced DOM elements.
     * @param ComponentClass {DOMElement} The class that you want instantiated.
     * @param scope {Object} The base DOMElement needs a scope (parent object) to instantiate the component/view.
     * @return {Array.<DOMElement>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
     * @public
     * @static
     */
    public static create = function ($elements:JQuery, ComponentClass:DOMElement, scope:any) {
        var list:DOMElement[] = [];
        var length:number = $elements.length;

        for (var i = 0; i < length; i++) {
            var component = new (<any>ComponentClass)($elements.eq(i));
            scope.addChild(component);
            list.push(component);
        }

        return list;
    };

}

export = ComponentFactory;