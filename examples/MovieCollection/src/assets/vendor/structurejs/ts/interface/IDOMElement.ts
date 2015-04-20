///<reference path='IEventDispatcher.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class IDOMElement
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureTS
{
    export interface IDOMElement extends IDisplayObject
    {

        /**
         * @property element
         */
        element:Element;

        /**
         * @property $element
         */
        $element:JQuery;

        /**
         * @method getChild
         */
        getChild(child:any):IDOMElement;
    }
}