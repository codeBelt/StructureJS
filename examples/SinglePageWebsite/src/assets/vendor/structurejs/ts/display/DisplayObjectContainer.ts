import DisplayObject from './DisplayObject';

/**
 * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObjectContainer
 * @extends DisplayObject
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class DisplayObjectContainer extends DisplayObject
{
    /**
     * Returns the number of children of this object.
     *
     * @property numChildren
     * @type {int}
     * @default 0
     * @readOnly
     * @public
     */
    public numChildren:number = 0;

    /**
     * A reference to the child DisplayObject instances to this parent object instance.
     *
     * @property children
     * @type {Array.<DisplayObject>}
     * @readOnly
     * @public
     */
    public children:Array<DisplayObject> = [];

    /**
     * Determines whether or not the children of the object are mouse enabled.
     *
     * @property mouseChildren
     * @type {boolean}
     * @public
     */
    public mouseChildren:boolean = false;

    constructor()
    {
        super();
    }

    /**
     * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
     * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
     *
     * If you add a child object that already has a different parent, the object is removed from the child
     * list of the other parent object.
     *
     * @method addChild
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public addChild(child:DisplayObject):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child);
        }

        this.children.push(child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    }

    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainerContainer instance.
     * The child is added at the index position specified. An index of 0 represents the back
     * (bottom) of the display list for this DisplayObjectContainerContainer object.
     *
     * @method addChildAt
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this object instance.
     * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public addChildAt(child:DisplayObject, index:number):any
    {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent)
        {
            child.parent.removeChild(child);
        }

        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;

        child.parent = this;

        return this;
    }

    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null , and the object is garbage collected if no other references
     * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DisplayObject} The DisplayObject instance to remove.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public removeChild(child:DisplayObject):any
    {
        const index = this.getChildIndex(child);
        if (index !== -1)
        {
            // Removes the child object from the parent.
            this.children.splice(index, 1);
        }

        this.numChildren = this.children.length;

        child.parent = null;

        return this;
    }

    /**
     * Removes all child DisplayObject instances from the child list of the DisplayObjectContainerContainer instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if
     * no other references to the children exist.
     *
     * @method removeChildren
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public removeChildren():any
    {
        while (this.children.length > 0)
        {
            this.removeChild(this.children.pop());
        }

        return this;
    }

    /**
     * Swaps two DisplayObject's with each other.
     *
     * @method swapChildren
     * @param child1 {DisplayObject} The DisplayObject instance to be swap.
     * @param child2 {DisplayObject} The DisplayObject instance to be swap.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public swapChildren(child1:DisplayObject, child2:DisplayObject):any
    {
        const child1Index = this.getChildIndex(child1);
        const child2Index = this.getChildIndex(child2);

        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);
    }

    /**
     * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
     *
     * @method swapChildrenAt
     * @param index1 {int} The index position of the first child object.
     * @param index2 {int} The index position of the second child object.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    public swapChildrenAt(index1:number, index2:number):any
    {
        if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren)
        {
            throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
        }

        const child1:DisplayObject = this.getChildAt(index1);
        const child2:DisplayObject = this.getChildAt(index2);

        this.swapChildren(child1, child2);

        return this;
    }

    /**
     * Returns the index position of a child DisplayObject instance.
     *
     * @method getChildIndex
     * @param child {DisplayObject} The DisplayObject instance to identify.
     * @returns {int} The index position of the child display object to identify.
     * @public
     */
    public getChildIndex(child:DisplayObject):number
    {
        return this.children.indexOf(child);
    }

    /**
     * Determines whether the specified display object is a child of the DisplayObject instance or the instance itself. The search includes the entire display list including this DisplayObject instance.
     *
     * @method contains
     * @param child {DisplayObject} The child object to test.
     * @returns {boolean}  true if the child object is a child of the DisplayObject or the container itself; otherwise false.
     * @public
     */
    public contains(child:DisplayObject):boolean
    {
        return this.children.indexOf(child) >= 0;
    }

    /**
     * Returns the child display object instance that exists at the specified index.
     *
     * @method getChildAt
     * @param index {int} The index position of the child object.
     * @returns {DisplayObject} The child display object at the specified index position.
     */
    public getChildAt(index:number):DisplayObject
    {
        return this.children[index];
    }

    /**
     * Gets a DisplayObject by its sjsId.
     *
     * @method getChildByCid
     * @param sjsId {number}
     * @returns {DisplayObject|null}
     * @override
     * @public
     */
    public getChildByCid(sjsId:number):DisplayObject
    {
        let child:DisplayObject = null;

        for (let i:number = this.numChildren - 1; i >= 0; i--)
        {
            if (this.children[i].sjsId == sjsId)
            {
                child = this.children[i];
                break;
            }
        }

        return child;
    }

}

export default DisplayObjectContainer;
