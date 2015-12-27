import DisplayObjectContainer from './DisplayObjectContainer';
import DOMElement from './DOMElement';
import DisplayObject from './DisplayObject';
import Point from '../geom/Point';

class CanvasElement extends DOMElement
{

    public $canvas:JQuery = null;

    public canvas:HTMLCanvasElement = null;

    // Notice the capital W and H. That sets the attributes not the styles.
    constructor(type:any = 'canvas', params:any = {Width: 100, Height: 100})
    {
        super(type, params);
    }

    /**
     * @overridden CanvasElement.create
     */
    public create():void
    {
        super.create();

        this.$canvas = this.$element;
        this.canvas = <HTMLCanvasElement>this.element;
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * @overridden CanvasElement.enable
     */
    public enable():void
    {
        if (this.isEnabled === true)
        {
            return;
        }

        // Add mouse event listeners to $canvas element
        this.$canvas.addEventListener('mousedown', this._onPointerDown, this);
        this.$canvas.addEventListener('mousemove', this._onPointerMove, this);
        this.$canvas.addEventListener('mouseup', this._onPointerUp, this);
        this.$canvas.addEventListener('mouseout', this._onPointerOut, this);

        // Add touch event listeners to $canvas element
        this.$canvas.addEventListener('touchstart', this._onPointerDown, this);
        this.$canvas.addEventListener('touchmove', this._onPointerMove, this);
        this.$canvas.addEventListener('touchend', this._onPointerUp, this);
        this.$canvas.addEventListener('touchcancel', this._onPointerOut, this);

        super.enable();
    }

    /**
     * @overridden CanvasElement.disable
     */
    public disable():void
    {
        if (this.isEnabled === false)
        {
            return;
        }

        // Remove mouse event listeners on $canvas element
        this.$canvas.removeEventListener('mousedown', this._onPointerDown, this);
        this.$canvas.removeEventListener('mousemove', this._onPointerMove, this);
        this.$canvas.removeEventListener('mouseup', this._onPointerUp, this);
        this.$canvas.removeEventListener('mouseout', this._onPointerOut, this);

        // Remove touch event listeners on $canvas element
        this.$canvas.removeEventListener('touchstart', this._onPointerDown, this);
        this.$canvas.removeEventListener('touchmove', this._onPointerMove, this);
        this.$canvas.removeEventListener('touchend', this._onPointerUp, this);
        this.$canvas.removeEventListener('touchcancel', this._onPointerOut, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.addChild
     */
    public addChild(child:DisplayObject):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child, false);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.ctx = this.ctx;
        child.stage = this;
        child.parent = this;

        if (child.isCreated === false)
        {
            child.create();
            child.isCreated = true;
        }

        child.enable();

        return this;
    }

    /**
     * @overridden DOMElement.addChildAt
     */
    public addChildAt(child:DisplayObject, index:number):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child, false);
        }

        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;

        child.ctx = this.ctx;
        child.stage = this;
        child.parent = this;

        if (child.isCreated === false)
        {
            child.create();
            child.isCreated = true;
        }

        child.enable();

        return this;
    }

    /**
     * @overridden DOMElement.swapChildren
     */
    public swapChildren(child1:DisplayObject, child2:DisplayObject):any
    {
        const child1Index = this.children.indexOf(child1);
        const child2Index = this.children.indexOf(child2);

        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);

        return this;
    }

    /**
     * @overridden DOMElement.getChildAt
     */
    public getChildAt(index:number):any
    {
        return <any>super.getChildAt(index);
    }

    /**
     * @overridden DOMElement.removeChild
     */
    public removeChild(child:DisplayObject, destroy:boolean = true):any
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

    /**
     * @overridden DOMElement.removeChildAt
     */
    public removeChildAt(index:number, destroy:boolean = true):any
    {
        this.removeChild(this.getChildAt(index), destroy);

        return this;
    }

    /**
     * @overridden DOMElement.removeChildren
     */
    public removeChildren(destroy:boolean = true):any
    {
        while (this.children.length > 0)
        {
            this.removeChild(this.children.pop(), destroy);
        }

        return this;
    }

    public renderCanvas():any
    {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let i:number = 0; i < this.numChildren; i++)
        {
            this.children[i].renderCanvas();
        }
    }

    public getMousePos(event:MouseEvent|JQueryEventObject):Point
    {
        const rect = this.canvas.getBoundingClientRect();

        return new Point(event.clientX - rect.left, event.clientY - rect.top);
    }

    public getObjectUnderPoint(x:number, y:number):DisplayObject
    {
        let foundItem:DisplayObject = null;
        let sprite:DisplayObject;

        for (let i = this.numChildren - 1; i >= 0; i--)
        {
            sprite = this.children[i];
            if (sprite.visible === true && sprite.mouseEnabled === true)
            {
                if (this.hitTest(sprite, x, y))
                {
                    foundItem = sprite;
                    break;
                }
            }
        }

        return foundItem;
    }

    public getObjectsUnderPoint(x:number, y:number):Array<DisplayObject>
    {
        const list:Array<DisplayObject> = [];
        let sprite:DisplayObject;

        for (let i = this.numChildren - 1; i >= 0; i--)
        {
            sprite = this.children[i];
            if (this.hitTest(sprite, x, y))
            {
                list.push(sprite);
            }
        }
        return list;
    }

    public hitTest(sprite:DisplayObject, mouseX:number, mouseY:number):boolean
    {
        if (mouseX >= sprite.x && mouseX <= sprite.x + sprite.width && mouseY >= sprite.y && mouseY <= sprite.y + sprite.height)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    protected _onPointerDown(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }

    protected _onPointerUp(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }

    protected _onPointerMove(event:MouseEvent|JQueryEventObject):void
    {
        const displayObject:DisplayObject = this._sendEvent(event);

        if (displayObject != null && displayObject.useHandCursor === true && displayObject.visible === true)
        {
            document.body.style.cursor = 'pointer';
        }
        else
        {
            document.body.style.cursor = 'default';
        }
    }

    protected _onPointerOut(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }


    protected _sendEvent(event:MouseEvent|JQueryEventObject):DisplayObject
    {
        const mousePos:Point = this.getMousePos(event);
        let displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

        if (displayObject === null)
        {
            event.bubbles = true;
            event.target = <any>this;
            event.currentTarget = <any>this;
            this.dispatchEvent(event);
        }
        else if (displayObject !== null && displayObject instanceof DisplayObjectContainer && (<DisplayObjectContainer>displayObject).mouseChildren === true)
        {
            event.currentTarget = <any>displayObject;

            displayObject = this._getActualClickedOnChild(<DisplayObjectContainer>displayObject, mousePos.x, mousePos.y);
            event.bubbles = true;
            event.target = <any>displayObject;

            displayObject.dispatchEvent(event);
        }
        else
        {
            event.bubbles = true;
            event.target = <any>displayObject;
            event.currentTarget = <any>this;

            displayObject.dispatchEvent(event);
        }

        return displayObject;
    }

    protected _getActualClickedOnChild(displayObject:DisplayObjectContainer, x:number, y:number):any
    {
        let item;
        let newX:number;
        let newY:number;
        if (displayObject.numChildren > 0)
        {
            for (let i = displayObject.numChildren - 1; i >= 0; i--)
            {
                item = displayObject.children[i];
                if (item.visible === true)
                {
                    newX = x - item.parent.x;
                    newY = y - item.parent.y;
                    if (this.hitTest(item, newX, newY))
                    {
                        return this._getActualClickedOnChild(item, newX, newY);
                    }
                }
            }
        }
        else
        {
            return displayObject;
        }
    }

}

export default CanvasElement;
