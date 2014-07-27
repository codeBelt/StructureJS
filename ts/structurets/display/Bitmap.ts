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
import MathUtil = require('../util/MathUtil')

class Bitmap extends CanvasElement
{
    private _image:HTMLImageElement = null;

    public ready:boolean = false;

    /**
     * The Bitmap...
     *
     * @class Bitmap
     * @extends CanvasElement
     * @module StructureJS
     * @submodule view
     * @constructor
     * @version 0.1.0
     **/
    constructor(image:HTMLImageElement)
    {
        super();

        this._image = image;
        this.width = this._image.width;
        this.height = this._image.height;
    }

    public createChildren():any
    {
        super.createChildren();

        return this;
    }

    public render():any
    {
        this.context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
        this.context.scale(this.scaleX, this.scaleY);
        this.context.rotate(MathUtil.degreesToRadians(this.rotation));
        this.context.translate(-this.width * 0.5, -this.height * 0.5);

        this.context.drawImage(this._image, 0, 0);

        return this;
    }

}
export = Bitmap;