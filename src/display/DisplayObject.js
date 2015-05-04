/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.DisplayObject = factory(root.StructureJS.Extend, root.StructureJS.EventDispatcher);
    }
}(this, function(Extend, EventDispatcher) {

    'use strict';

    /**
     * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
     *
     * @class DisplayObject
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule view
     * @requires Extend
     * @requires EventDispatcher
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var DisplayObject = (function() {

        var _super = Extend(DisplayObject, EventDispatcher);

        function DisplayObject() {
                _super.call(this);
                /**
                 * The Stage of the display object.
                 *
                 * @property stage
                 * @type {any}
                 * @public
                 */
                this.stage = null;
                /**
                 * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
                 * This property is only used with the canvas specific display objects.
                 *
                 * @property ctx
                 * @type {CanvasRenderingContext2D}
                 * @public
                 */
                this.ctx = null;
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
                 * Indicates the width of the display object, in pixels.
                 *
                 * @property width
                 * @type {number}
                 * @default 0
                 * @public
                 */
                this.width = 0;
                /**
                 * Indicates the height of the display object, in pixels.
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
                /**
                 * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
                 *
                 * @property scaleX
                 * @type {number}
                 * @public
                 */
                this.scaleX = 1;
                /**
                 * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
                 *
                 * @property scaleY
                 * @type {number}
                 * @public
                 */
                this.scaleY = 1;
                /**
                 * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
                 *
                 * @property rotation
                 * @type {number}
                 * @public
                 */
                this.rotation = 0;
                /**
                 * Indicates the alpha transparency value of the object specified.
                 *
                 * @property alpha
                 * @type {number}
                 * @public
                 */
                this.alpha = 1;
                /**
                 * Whether or not the display object is visible.
                 *
                 * @property visible
                 * @type {boolean}
                 * @public
                 */
                this.visible = true;
                /**
                 * Specifies whether this object receives mouse
                 *
                 * @property mouseEnabled
                 * @type {boolean}
                 * @public
                 */
                this.mouseEnabled = false;
                /**
                 * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
                 *
                 * @property useHandCursor
                 * @type {boolean}
                 * @public
                 */
                this.useHandCursor = false;
                /**
                 * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
                 *
                 * @property isCreated
                 * @type {boolean}
                 * @default false
                 * @protected
                 */
                this.isCreated = false;
                /**
                 * Indicates the instance name of the DisplayObject.
                 *
                 * @property name
                 * @type {string}
                 * @public
                 */
                this.name = null;
            }
            /**
             * The create function is intended to provide a consistent place for the creation or initializing the view.
             * It will automatically be called the first time that the view is added to a DisplayObjectContainer.
             * It is critical that all subclasses call the super for this function in their overridden methods.
             *
             * @method create
             * @returns {DisplayObject} Returns an instance of itself.
             * @public
             * @chainable
             */
        DisplayObject.prototype.create = function() {
            this.isCreated = true;
            return this;
        };
        /**
         * The layout method provides a common function to handle updating objects in the view.
         *
         * @method layout
         * @returns {DisplayObject} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObject.prototype.layout = function() {
            return this;
        };
        /**
         * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
         *
         * @param unscaledWidth {number} The width within which the component should lay itself out.
         * @param unscaledHeight {number} The height within which the component should lay itself out.
         * @returns {DisplayObject} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObject.prototype.setSize = function(unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            return this;
        };
        DisplayObject.prototype.readerStart = function() {
            this.ctx.save();
        };
        DisplayObject.prototype.update = function() {
            if (this.ctx === null || this.alpha <= 0 || this.visible === false)
                return false;
            this.readerStart();
            this.ctx.globalAlpha = this.alpha;
            this.layout();
            this.renderEnd();
        };
        DisplayObject.prototype.renderEnd = function() {
            this.ctx.restore();
        };
        return DisplayObject;
    })();

    return DisplayObject;
}));
