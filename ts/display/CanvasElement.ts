'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./DOMElement as DOMElement
 @import ../geom/Point as Point
 @export CanvasElement
 */
import DisplayObjectContainer = require('./DisplayObjectContainer');
import DOMElement = require('./DOMElement');
import DisplayObject = require('./DisplayObject');
import Point = require('../geom/Point');

class CanvasElement extends DOMElement
{

    /**
     * A cached jQuery object for the canvas element. This has the exact same reference as **{{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property**.
     *
     * @type {JQuery}
     * @public
     */
    public $canvas:JQuery = null;

    /**
     * A reference to the canvas element. This has the exact same reference as **{{#crossLink "DOMElement/element:property"}}{{/crossLink}} property**.
     *
     * @type {HTMLCanvasElement}
     * @public
     */
    public canvas:HTMLCanvasElement = null;

    constructor($element:JQuery)
    {
        super($element);
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
        this.$canvas.addEventListener('mousedown', this.onPointerDown, this);
        this.$canvas.addEventListener('mousemove', this.onPointerMove, this);
        this.$canvas.addEventListener('mouseup', this.onPointerUp, this);
        this.$canvas.addEventListener('mouseout', this.onPointerOut, this);

        // Add touch event listeners to $canvas element
        this.$canvas.addEventListener('touchstart', this.onPointerDown, this);
        this.$canvas.addEventListener('touchmove', this.onPointerMove, this);
        this.$canvas.addEventListener('touchend', this.onPointerUp, this);
        this.$canvas.addEventListener('touchcancel', this.onPointerOut, this);

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
        this.$canvas.removeEventListener('mousedown', this.onPointerDown, this);
        this.$canvas.removeEventListener('mousemove', this.onPointerMove, this);
        this.$canvas.removeEventListener('mouseup', this.onPointerUp, this);
        this.$canvas.removeEventListener('mouseout', this.onPointerOut, this);

        // Remove touch event listeners on $canvas element
        this.$canvas.removeEventListener('touchstart', this.onPointerDown, this);
        this.$canvas.removeEventListener('touchmove', this.onPointerMove, this);
        this.$canvas.removeEventListener('touchend', this.onPointerUp, this);
        this.$canvas.removeEventListener('touchcancel', this.onPointerOut, this);

        super.disable();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method addChild
     * @param child {DisplayObject}
     * @returns {CanvasElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
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
        var child1Index = this.children.indexOf(child1);
        var child2Index = this.children.indexOf(child2);

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
     * TODO: YUIDoc_comment
     *
     * @method removeChild
     * @param child {DisplayObject}
     * @returns {CanvasElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    public removeChild(child:DisplayObject, destroy:boolean = true):any
    {
        var index = this.getChildIndex(child);
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
     * Removes the child display object instance that exists at the specified index.
     *
     * @method removeChildAt
     * @param index {int} The index position of the child object.
     * @public
     * @chainable
     */
    public removeChildAt(index:number, destroy:boolean = true):any
    {
        this.removeChild(this.getChildAt(index), destroy);

        return this;
    }

    /**
     * Removes all child object instances from the child list of the parent object instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if no other
     * references to the children exist.
     *
     * @method removeChildren
     * @returns {CanvasElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    public removeChildren(destroy:boolean = true):any
    {
        while (this.children.length > 0)
        {
            this.removeChild(this.children.pop(), destroy);
        }

        return this;
    }

    public update():any
    {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (var i:number = 0; i < this.numChildren; i++)
        {
            this.children[i].update();
        }
    }

    public getMousePos(event:MouseEvent|JQueryEventObject):Point
    {
        var rect = this.canvas.getBoundingClientRect();

        return new Point(event.clientX - rect.left, event.clientY - rect.top);
    }

    public getObjectUnderPoint(x:number, y:number):DisplayObject
    {
        var foundItem:DisplayObject = null;
        var sprite:DisplayObject;

        for (var i = this.numChildren - 1; i >= 0; i--)
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
        var list:Array<DisplayObject> = [];
        var sprite:DisplayObject;

        for (var i = this.numChildren - 1; i >= 0; i--)
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

    protected onPointerDown(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }

    protected onPointerUp(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }

    protected onPointerMove(event:MouseEvent|JQueryEventObject):void
    {
        var displayObject:DisplayObject = this._sendEvent(event);

        if (displayObject != null && displayObject.useHandCursor === true && displayObject.visible === true)
        {
            document.body.style.cursor = 'pointer';
        }
        else
        {
            document.body.style.cursor = 'default';
        }
    }

    protected onPointerOut(event:MouseEvent|JQueryEventObject):void
    {
        this._sendEvent(event);
    }


    protected _sendEvent(event:MouseEvent|JQueryEventObject):DisplayObject
    {
        var mousePos:Point = this.getMousePos(event);
        var displayObject:DisplayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);

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

            displayObject = this.getActualClickedOnChild(<DisplayObjectContainer>displayObject, mousePos.x, mousePos.y);
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

    protected getActualClickedOnChild(displayObject:DisplayObjectContainer, x:number, y:number):any
    {
        var item;
        var newX:number;
        var newY:number;
        if (displayObject.numChildren > 0)
        {
            for (var i = displayObject.numChildren - 1; i >= 0; i--)
            {
                item = displayObject.children[i];
                if (item.visible === true)
                {
                    newX = x - item.parent.x;
                    newY = y - item.parent.y;
                    if (this.hitTest(item, newX, newY))
                    {
                        return this.getActualClickedOnChild(item, newX, newY);
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

export = CanvasElement;