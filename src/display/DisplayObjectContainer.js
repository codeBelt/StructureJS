/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.DisplayObjectContainer = factory(root.structurejs.Extend, root.structurejs.EventDispatcher);
    }
}(this, function(Extend, EventDispatcher) {
    'use strict';

    /**
     * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
     *
     * @class DisplayObjectContainer
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule view
     * @requires Extend
     * @requires EventDispatcher
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var DisplayObjectContainer = (function () {

        var _super = Extend(DisplayObjectContainer, EventDispatcher);

        function DisplayObjectContainer() {
            _super.call(this);
            /**
             * The isCreated property is used to keep track if it is the first time this DisplayObjectContainer is created.
             *
             * @property isCreated
             * @type {boolean}
             * @default false
             * @protected
             */
            this.isCreated = false;
            /**
             * Returns the number of children of this object.
             *
             * @property numChildren
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.numChildren = 0;
            /**
             * A reference to the child DisplayObjectContainer instances to this parent object instance.
             *
             * @property children
             * @type {Array}
             * @readOnly
             * @public
             */
            this.children = [];
            /**
             * A property providing access to the x position.
             *
             * @property x
             * @type {number}
             * @default 0
             * @public
             */
            this.x = 0;
            /**
             * A property providing access to the y position.
             *
             * @property y
             * @type {number}
             * @default 0
             * @public
             */
            this.y = 0;
            /**
             * A property providing access to the width.
             *
             * @property width
             * @type {number}
             * @default 0
             * @public
             */
            this.width = 0;
            /**
             * A property providing access to the height.
             *
             * @property height
             * @type {number}
             * @default 0
             * @public
             */
            this.height = 0;
            /**
             * A property providing access to the unscaledWidth.
             *
             * @property unscaledWidth
             * @type {number}
             * @default 100
             * @public
             */
            this.unscaledWidth = 100;
            /**
             * A property providing access to the unscaledHeight.
             *
             * @property unscaledHeight
             * @type {number}
             * @default 100
             * @public
             */
            this.unscaledHeight = 100;
        }
        /**
         * The createChildren function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * @method createChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.createChildren = function () {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: The createChildren method is meant to be overridden.');
        };
        /**
         * Adds a child DisplayObjectContainer instance to this parent object instance. The child is added to the front (top) of all other
         * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
         *
         * If you add a child object that already has a different parent, the object is removed from the child
         * list of the other parent object.
         *
         * @method addChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this DisplayObjectContainerContainer instance.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChild = function (child) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.push(child);
            this.numChildren = this.children.length;
            child.parent = this;
            return this;
        };
        /**
         * Adds a child DisplayObjectContainer instance to this DisplayObjectContainerContainer instance.
         * The child is added at the index position specified. An index of 0 represents the back
         * (bottom) of the display list for this DisplayObjectContainerContainer object.
         *
         * @method addChildAt
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this object instance.
         * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.parent = this;
            return this;
        };
        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to remove.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChild = function (child, destroy) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }
            this.numChildren = this.children.length;
            if (destroy === true) {
                child.destroy();
            }
            else {
                child.disable();
            }
            child.parent = null;
            return this;
        };
        /**
         * Removes all child DisplayObjectContainer instances from the child list of the DisplayObjectContainerContainer instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if
         * no other references to the children exist.
         *
         * @method removeChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChildren = function (destroy) {
            while (this.children.length > 0) {
                this.removeChild(this.children.pop(), destroy);
            }
            return this;
        };
        /**
         * Swaps two DisplayObjectContainer's with each other.
         *
         * @method swapChildren
         * @param child1 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @param child2 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: The swapChildren method is meant to be overridden.');
        };
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
        DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }
            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);
            this.swapChildren(child1, child2);
            return this;
        };
        /**
         * Returns the index position of a child DisplayObjectContainer instance.
         *
         * @method getChildIndex
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to identify.
         * @returns {int} The index position of the child display object to identify.
         * @public
         */
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.children.indexOf(child);
        };
        /**
         * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself. The search includes the entire display list including this DisplayObjectContainer instance.
         *
         * @method contains
         * @param child {DisplayObjectContainer} The child object to test.
         * @returns {boolean}  true if the child object is a child of the DisplayObjectContainer or the container itself; otherwise false.
         * @public
         */
        DisplayObjectContainer.prototype.contains = function (child) {
            return this.children.indexOf(child) >= 0;
        };
        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @method getChildAt
         * @param index {int} The index position of the child object.
         * @returns {DisplayObjectContainer} The child display object at the specified index position.
         */
        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this.children[index];
        };
        /**
         * Gets a DisplayObjectContainer by its cid.
         *
         * @method getChildByCid
         * @param cid {number}
         * @returns {DisplayObjectContainer}
         * @override
         * @public
         */
        DisplayObjectContainer.prototype.getChildByCid = function (cid) {
            var children = this.children.filter(function (child) {
                return child.cid == cid;
            });
            return children[0] || null;
        };
        /**
         * The setSize method sets the bounds within which the containing DisplayObjectContainer would
         * like that component to lay itself out. It is expected that calling setSize will automatically
         * call {{#crossLink "DisplayObjectContainer/layoutChildren:method"}}{{/crossLink}}.
         *
         * @param unscaledWidth {number} The width within which the component should lay itself out.
         * @param unscaledHeight {number} The height within which the component should lay itself out.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.setSize = function (unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            if (this.isCreated) {
                this.layoutChildren();
            }
            return this;
        };
        /**
         * The layoutComponent method provides a common function to handle updating child objects.
         *
         * @method layoutChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.layoutChildren = function () {
            return this;
        };
        /**
         * @overridden EventDispatcher.destroy
         */
        DisplayObjectContainer.prototype.destroy = function () {
            // TODO: if you call destroy on an object should it remove itself from the parent children array?
            _super.prototype.destroy.call(this);
        };
        return DisplayObjectContainer;
    })();

    return DisplayObjectContainer;
}));