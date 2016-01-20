import IDisplayObjectContainer from './IDisplayObjectContainer' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IDOMElement
 * @extends IDisplayObjectContainer
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IDOMElement
{
    /**
     * @property checkCount
     */
    checkCount: number;

    /**
     * @property element
     */
    element: HTMLElement;

    /**
     * @property $element
     */
    $element: JQuery;

    /**
     * @property isReference
     */
    isReference: boolean;

    /**
     * @method getChild
     */
    getChild(selector: string): any;

    /**
     * @method getChildren
     */
    getChildren(selector?: string): Array<any>;

    /**
     * @method removeChildAt
     */
    removeChildAt(index: number, destroy?: boolean): any;

    /**
     * @method createComponents
     */
    createComponents(componentList: Array<any>): Array<any>;

}

export default IDOMElement;
