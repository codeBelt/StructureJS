///<reference path='CanvasElement.ts'/>
///<reference path='../util/NumberUtil.ts'/>

module StructureTS
{
    export class MovieClip extends CanvasElement
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
}


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