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

import CanvasElement = require('CanvasElement')

class Canvas extends CanvasElement
{
    public element:any = null;

    /**
     * The Canvas...
     *
     * @class Canvas
     * @extends CanvasElement
     * @module StructureJS
     * @submodule view
     * @constructor
     * @version 0.1.0
     **/
    constructor()
    {
        super();

        this.stage = this;
    }

    //TODO: need to fix if it is a class name or body tag. Currently only accepts an id name with out the '#'.
    public appendTo(type:string, enabled:boolean = true):any
    {
//        this.element = canvas.element[0];
        this.element = document.getElementById(type);
        this.context = this.element.getContext("2d");

        this.width = this.element.width;
        this.height = this.element.height;

        if (this.isCreated == false)
        {
            this.createChildren();
            this.isCreated = true;
        }

        if (enabled)
        {
            this.enable();
        }

        return this;
    }

    /**
     * @override
     */
    public addChild(child:CanvasElement):any
    {
        child.parent = this.stage;
        child.stage = this.stage;
        child.context = this.context;
        child.createChildren();

        return this;
    }

    public removeChild(child:CanvasElement):any
    {
        child.stage = null;
        child.context = null;

        return this;
    }

    public render():any
    {
        this.context.clearRect(0, 0, this.width, this.height);

        return this;
    }

}
export = Canvas;