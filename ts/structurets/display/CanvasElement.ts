///<reference path='DisplayObjectContainer.ts'/>
///<reference path='Canvas.ts'/>

/**
 * The CanvasElement...
 *
 * @class CanvasElement
 * @extends DisplayObjectContainer
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class CanvasElement extends DisplayObjectContainer
    {
        public stage:Canvas = null;
        public context:CanvasRenderingContext2D = null;
        public x:number = 0;
        public y:number = 0;
        public scaleX:number = 1;
        public scaleY:number = 1;
        public rotation:number = 0;
        public alpha:number = 1;
        public visible:boolean = true;

        constructor()
        {
            super();
            TweenLite.ticker.addEventListener("tick", this.layoutChildren, this);
        }

        public createChildren():any
        {
            //Meant to be overridden.
            return this;
        }

        public render():any
        {
            //Meant to be overridden.
            return this;
        }

        private readerStart():any
        {
            this.context.save();
            return this;
        }

        public layoutChildren():any
        {
            if (this.context == null || this.alpha <= 0 || this.visible === false)
            {
                return this;
            }

            this.readerStart();
            this.context.globalAlpha = this.alpha;
            this.render();
            this.renderEnd();

            return this;
        }

        private renderEnd():any
        {
            this.context.restore();
            return this;
        }

        public addChild(child:CanvasElement):any
        {
            //TODO: Add to children array with super DisplayObjectContainer.
            child.parent = this;
            child.stage = this.stage;
            child.context = this.context;
            child.createChildren();

            return this;
        }

        public removeChild(child:CanvasElement):any
        {
            //TODO: Remove children from array with super DisplayObjectContainer.
            child.stage = null;
            child.context = null;

            return this;
        }
    }
}