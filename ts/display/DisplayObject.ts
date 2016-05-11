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
class DisplayObject extends EventDispatcher
{

    /**
     * The Stage of the display object.
     *
     * @property stage
     * @type {any}
     * @public
     */
    public stage:any = null;

    /**
     * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
     * This property is only used with the canvas specific display objects.
     *
     * @property ctx
     * @type {CanvasRenderingContext2D}
     * @public
     */
    public ctx:CanvasRenderingContext2D = null;

    /**
     * A property providing access to the x position.
     *
     * @property x
     * @type {number}
     * @default 0
     * @public
     */
    public x:number = 0;

    /**
     * A property providing access to the y position.
     *
     * @property y
     * @type {number}
     * @default 0
     * @public
     */
    public y:number = 0;

    /**
     * Indicates the width of the display object, in pixels.
     *
     * @property width
     * @type {number}
     * @default 0
     * @public
     */
    public width:number = 0;

    /**
     * Indicates the height of the display object, in pixels.
     *
     * @property height
     * @type {number}
     * @default 0
     * @public
     */
    public height:number = 0;

    /**
     * A property providing access to the unscaledWidth.
     *
     * @property unscaledWidth
     * @type {number}
     * @default 100
     * @public
     */
    public unscaledWidth:number = 100;

    /**
     * A property providing access to the unscaledHeight.
     *
     * @property unscaledHeight
     * @type {number}
     * @default 100
     * @public
     */
    public unscaledHeight:number = 100;

    /**
     * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
     *
     * @property scaleX
     * @type {number}
     * @public
     */
    public scaleX:number = 1;

    /**
     * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
     *
     * @property scaleY
     * @type {number}
     * @public
     */
    public scaleY:number = 1;

    /**
     * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
     *
     * @property rotation
     * @type {number}
     * @public
     */
    public rotation:number = 0;

    /**
     * Indicates the alpha transparency value of the object specified.
     *
     * @property alpha
     * @type {number}
     * @public
     */
    public alpha:number = 1;

    /**
     * Whether or not the display object is visible.
     *
     * @property visible
     * @type {boolean}
     * @public
     */
    public visible:boolean = true;

    /**
     * Specifies whether this object receives mouse
     *
     * @property mouseEnabled
     * @type {boolean}
     * @public
     */
    public mouseEnabled:boolean = false;

    /**
     * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
     *
     * @property useHandCursor
     * @type {boolean}
     * @public
     */
    public useHandCursor:boolean = false;

    /**
     * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
     *
     * @property isCreated
     * @type {boolean}
     * @default false
     * @public
     */
    public isCreated:boolean = false;

    /**
     * Indicates the instance name of the DisplayObject.
     *
     * @property name
     * @type {string}
     * @public
     */
    public name:string = null;

    constructor()
    {
        super();
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
    public create():any
    {
        this.isCreated = true;

        return this;
    }

    /**
     * The layout method provides a common function to handle updating objects in the view.
     *
     * @method layout
     * @param ...rest {Array<any>}
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    public layout(...rest:Array<any>):any
    {
        return this;
    }

    /**
     * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    public setSize(unscaledWidth:number, unscaledHeight:number):any
    {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;

        return this;
    }

    protected _readerStart():void
    {
        this.ctx.save();
    }

    public renderCanvas():boolean
    {
        if (this.ctx === null || this.alpha <= 0 || this.visible === false) return false;

        this._readerStart();
        this.ctx.globalAlpha = this.alpha;
        this.layout();
        this._renderEnd();
    }

    protected _renderEnd():void
    {
        this.ctx.restore();
    }

}

export default DisplayObject;
