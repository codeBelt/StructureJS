import IEventDispatcher from './IEventDispatcher' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IDisplayObject
 * @extends IEventDispatcher
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IDisplayObject extends IEventDispatcher
{
    /**
     * @property stage
     */
    stage: any;

    /**
     * @property ctx
     */
    ctx: CanvasRenderingContext2D;

    /**
     * @property x
     */
    x: number;

    /**
     * @property y
     */
    y: number;

    /**
     * @property width
     */
    width: number;

    /**
     * @property height
     */
    height: number;

    /**
     * @property unscaledWidth
     */
    unscaledWidth: number;

    /**
     * @property unscaledHeight
     */
    unscaledHeight: number;

    /**
     * @property scaleX
     */
    scaleX: number;

    /**
     * @property scaleY
     */
    scaleY: number;

    /**
     * @property rotation
     */
    rotation: number;

    /**
     * @property alpha
     */
    alpha: number;

    /**
     * @property visible
     */
    visible: boolean;

    /**
     * @property mouseEnabled
     */
    mouseEnabled: boolean;

    /**
     * @property useHandCursor
     */
    useHandCursor: boolean;

    /**
     * @property isCreated
     */
    isCreated: boolean;

    /**
     * @property name
     */
    name: string;

    /**
     * @method create
     */
    create(): any;

    /**
     * @method layout
     */
    layout(): any;

    /**
     * @method setSize
     */
    setSize(unscaledWidth: number, unscaledHeight: number): any;

    /**
     * @method renderCanvas
     */
    renderCanvas(): boolean;

}

export default IDisplayObject;
