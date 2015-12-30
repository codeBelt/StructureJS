import DisplayObject from './DisplayObject';
import DisplayObjectContainer from './DisplayObjectContainer';

class Sprite extends DisplayObjectContainer
{

    constructor()
    {
        super();
    }

    public create():void
    {
        super.create();

        this.useHandCursor = true;
        this.mouseEnabled = true;
    }

    public renderCanvas():any
    {
        const isRendable:boolean = super.renderCanvas();

        if (isRendable === false) return;

        let newWidth:number;
        let newHeight:number;
        let child:DisplayObject;
        for (let i:number = 0; i < this.numChildren; i++)
        {
            child = this.children[i];
            child.renderCanvas();

            newWidth = child.x + child.width;
            newHeight = child.y + child.height;
            this.width = (newWidth > this.width) ? newWidth : this.width;
            this.height = (newHeight > this.height) ? newHeight : this.height;
        }
    }

    public addChild(child:any):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child, false);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.ctx = this.ctx;
        child.stage = this.stage;
        child.parent = this;

        if (child.isCreated === false)
        {
            child.create();
            child.isCreated = true;
        }

        child.enable();

        return this;
    }

    public removeChild(child:any, destroy:boolean = true):any
    {
        const index = this.getChildIndex(child);
        if (index !== -1)
        {
            // Removes the child object from the parent.
            this.children.splice(index, 1);
        }

        this.numChildren = this.children.length;

        if (destroy === true)
        {
            child.destroy();
        }
        else
        {
            child.disable();
        }

        child.ctx = null;
        child.stage = null;
        child.parent = null;

        return this;
    }

}

export default Sprite;
