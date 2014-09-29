///<reference path='CanvasElement.ts'/>
///<reference path='../util/MathUtil.ts'/>

/**
 * The Bitmap...
 *
 * @class Bitmap
 * @extends CanvasElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class Bitmap extends CanvasElement
    {
        private _image:HTMLImageElement = null;

        public complete:boolean = false;

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
}