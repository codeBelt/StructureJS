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
     * @method enable
     */
    addChild(child: any): any;

    /**
     * @method enable
     */
    addChildAt(child: any, index: number): any;

    /**
     * @method enable
     */
    removeChild(child: any): any;

    /**
     * @method enable
     */
    removeChildren(): any;

    /**
     * @method enable
     */
    swapChildren(child1: any, child2: any): any;

    /**
     * @method enable
     */
    swapChildrenAt(index1: number, index2: number): any;

    /**
     * @method enable
     */
    getChildIndex(child: any): number;

    /**
     * @method enable
     */
    contains(child: any): boolean;

    /**
     * @method enable
     */
    getChildAt(index: number): any;

    /**
     * @method enable
     */
    getChildByCid(sjsId: number): any;

}

export default IDisplayObjectContainer;
