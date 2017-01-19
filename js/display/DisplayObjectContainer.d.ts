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
declare class DisplayObjectContainer extends DisplayObject {
    /**
     * Returns the number of children of this object.
     *
     * @property numChildren
     * @type {int}
     * @default 0
     * @readOnly
     * @public
     */
    numChildren: number;
    /**
     * A reference to the child DisplayObject instances to this parent object instance.
     *
     * @property children
     * @type {Array.<DisplayObject>}
     * @readOnly
     * @public
     */
    children: Array<DisplayObject>;
    /**
     * Determines whether or not the children of the object are mouse enabled.
     *
     * @property mouseChildren
     * @type {boolean}
     * @public
     */
    mouseChildren: boolean;
    constructor();
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
    addChild(child: DisplayObject): any;
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
    addChildAt(child: DisplayObject, index: number): any;
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
    removeChild(child: DisplayObject): any;
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
    removeChildren(): any;
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
    swapChildren(child1: DisplayObject, child2: DisplayObject): any;
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
    swapChildrenAt(index1: number, index2: number): any;
    /**
     * Returns the index position of a child DisplayObject instance.
     *
     * @method getChildIndex
     * @param child {DisplayObject} The DisplayObject instance to identify.
     * @returns {int} The index position of the child display object to identify.
     * @public
     */
    getChildIndex(child: DisplayObject): number;
    /**
     * Determines whether the specified display object is a child of the DisplayObject instance or the instance itself. The search includes the entire display list including this DisplayObject instance.
     *
     * @method contains
     * @param child {DisplayObject} The child object to test.
     * @returns {boolean}  true if the child object is a child of the DisplayObject or the container itself; otherwise false.
     * @public
     */
    contains(child: DisplayObject): boolean;
    /**
     * Returns the child display object instance that exists at the specified index.
     *
     * @method getChildAt
     * @param index {int} The index position of the child object.
     * @returns {DisplayObject} The child display object at the specified index position.
     */
    getChildAt(index: number): DisplayObject;
    /**
     * Gets a DisplayObject by its sjsId.
     *
     * @method getChildByCid
     * @param sjsId {number}
     * @returns {DisplayObject|null}
     * @override
     * @public
     */
    getChildByCid(sjsId: number): DisplayObject;
}
export default DisplayObjectContainer;
