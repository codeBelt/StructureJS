import EventDispatcher from '../event/EventDispatcher';
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
declare class DisplayObject extends EventDispatcher {
    /**
     * The Stage of the display object.
     *
     * @property stage
     * @type {any}
     * @public
     */
    stage: any;
    /**
     * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
     * This property is only used with the canvas specific display objects.
     *
     * @property ctx
     * @type {CanvasRenderingContext2D}
     * @public
     */
    ctx: CanvasRenderingContext2D;
    /**
     * A property providing access to the x position.
     *
     * @property x
     * @type {number}
     * @default 0
     * @public
     */
    x: number;
    /**
     * A property providing access to the y position.
     *
     * @property y
     * @type {number}
     * @default 0
     * @public
     */
    y: number;
    /**
     * Indicates the width of the display object, in pixels.
     *
     * @property width
     * @type {number}
     * @default 0
     * @public
     */
    width: number;
    /**
     * Indicates the height of the display object, in pixels.
     *
     * @property height
     * @type {number}
     * @default 0
     * @public
     */
    height: number;
    /**
     * A property providing access to the unscaledWidth.
     *
     * @property unscaledWidth
     * @type {number}
     * @default 100
     * @public
     */
    unscaledWidth: number;
    /**
     * A property providing access to the unscaledHeight.
     *
     * @property unscaledHeight
     * @type {number}
     * @default 100
     * @public
     */
    unscaledHeight: number;
    /**
     * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
     *
     * @property scaleX
     * @type {number}
     * @public
     */
    scaleX: number;
    /**
     * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
     *
     * @property scaleY
     * @type {number}
     * @public
     */
    scaleY: number;
    /**
     * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
     *
     * @property rotation
     * @type {number}
     * @public
     */
    rotation: number;
    /**
     * Indicates the alpha transparency value of the object specified.
     *
     * @property alpha
     * @type {number}
     * @public
     */
    alpha: number;
    /**
     * Whether or not the display object is visible.
     *
     * @property visible
     * @type {boolean}
     * @public
     */
    visible: boolean;
    /**
     * Specifies whether this object receives mouse
     *
     * @property mouseEnabled
     * @type {boolean}
     * @public
     */
    mouseEnabled: boolean;
    /**
     * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
     *
     * @property useHandCursor
     * @type {boolean}
     * @public
     */
    useHandCursor: boolean;
    /**
     * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
     *
     * @property isCreated
     * @type {boolean}
     * @default false
     * @public
     */
    isCreated: boolean;
    /**
     * Indicates the instance name of the DisplayObject.
     *
     * @property name
     * @type {string}
     * @public
     */
    name: string;
    constructor();
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
    create(): any;
    /**
     * The layout method provides a common function to handle updating objects in the view.
     *
     * @method layout
     * @param ...rest {Array<any>}
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    layout(...rest: Array<any>): any;
    /**
     * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    setSize(unscaledWidth: number, unscaledHeight: number): any;
    protected _readerStart(): void;
    renderCanvas(): boolean;
    protected _renderEnd(): void;
}
export default DisplayObject;
