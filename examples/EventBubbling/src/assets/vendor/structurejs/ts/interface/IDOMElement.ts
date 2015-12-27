import IDisplayObjectContainer = require('./IDisplayObjectContainer');

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
     * @method enable
     */
    getChild(selector: string): any;

    /**
     * @method enable
     */
    getChildren(selector?: string): Array<any>;

    /**
     * @method enable
     */
    removeChildAt(index: number, destroy?: boolean): any;

    /**
     * @method enable
     */
    createComponents(componentList: Array<any>): Array<any>;

}

export = IDOMElement;
