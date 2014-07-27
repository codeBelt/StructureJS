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
import NumberUtil = require('../util/NumberUtil')

class MovieClip extends CanvasElement
{
    private _image:HTMLImageElement = null;

    public currentFrame:number = 0;
    public totalFrames:number = null;

    constructor(image:HTMLImageElement)
    {
        super();

        this._image = image;
        this.width = this._image.width;
        this.height = this._image.height;
    }

    public createChildren():void
    {
        super.createChildren();
    }

    public render():void
    {
        if (this.currentFrame >= this.totalFrames)
        {
            this.currentFrame = 0;
        }
        else
        {
            this.currentFrame++;
        }
    }

}
export = MovieClip;


///**
// *
// */
//var RunningCat = new Class({
//    /** @extends {MovieClip} */
//    Extends: MovieClip,
//    /** @type {String} */
//    name: "RunningCat",
//
//    /** @type {int} */
//    currentFrame: null,
//    /** @type {int} */
//    totalFrames: null,
//
//    /**
//     * @constructor
//     */
//    initialize: function (numberOfFrames)
//    {
//        this.parent(numberOfFrames);
//    },
//
//    createChildren: function ()
//    {
//        this.parent();
//
//        this.img = new Image();
//        this.img.src = 'http://moot-point.com/presentations/canvas-part1/img/cat_sprite.png';
//        this.imageSource = document.getElementById('cat-sprite');
//    },
//
//    layoutChildren: function()
//    {
//        this.parent();
//        this.mainElement.save();
//
//
//        var source_y = this.height * this.currentFrame;
//        var self = this;
//        this.mainElement.drawImage(
//            self.img,   //image
//            0,              //source x
//            source_y,       //source y
//            self.width,   //source width
//            self.height,  //source height
//            self.x,            //dest x
//            self.y,            //dest y
//            self.width,            //dest width
//            self.height             //dest height
//        );
//
//
//        this.mainElement.restore();
//    }
//
//});