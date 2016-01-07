import IDisplayObject from './IDisplayObject' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IDisplayObjectContainer
 * @extends IBaseObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IDisplayObjectContainer extends IDisplayObject
{
    /**
     * @property numChildren
     */
    numChildren: number;

    /**
     * @property children
     */
    children: Array<any>;

    /**
     * @property mouseChildren
     */
    mouseChildren: boolean;

    /**
     * @method addChild
     */
    addChild(child: any): any;

    /**
     * @method addChildAt
     */
    addChildAt(child: any, index: number): any;

    /**
     * @method removeChild
     */
    removeChild(child: any): any;

    /**
     * @method removeChildren
     */
    removeChildren(): any;

    /**
     * @method swapChildren
     */
    swapChildren(child1: any, child2: any): any;

    /**
     * @method swapChildrenAt
     */
    swapChildrenAt(index1: number, index2: number): any;

    /**
     * @method getChildIndex
     */
    getChildIndex(child: any): number;

    /**
     * @method contains
     */
    contains(child: any): boolean;

    /**
     * @method getChildAt
     */
    getChildAt(index: number): any;

    /**
     * @method getChildByCid
     */
    getChildByCid(sjsId: number): any;

}

export default IDisplayObjectContainer;
