///<reference path='../interface/IDataStore.ts'/>
///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/LoaderEvent.ts'/>

/**
 * The ImageLoader...
 *
 * @class ImageLoader
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class ImageLoader extends EventDispatcher implements IDataStore
    {
        private _image:HTMLImageElement = null;

        public data:any;
        public src:string;
        public complete:boolean = false;

        constructor(path:string)
        {
            super();

            this.src = path;

            var self = this;
            this._image = new Image();
            this._image.onload = function ()
            {
                self.onImageLoad();
            }
        }

        public load():void
        {
            if (this.complete)
            {
                return;
            }

            this._image.src = this.src;
        }

        private onImageLoad():void
        {
            this.complete = true;
            this.data = this._image;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE));
        }
    }
}