///<reference path='CanvasElement.ts'/>

/**
 * The Canvas...
 *
 * @class Canvas
 * @extends CanvasElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class Canvas extends CanvasElement
    {
        public element:any = null;

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

            if (this.isCreated === false)
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
}