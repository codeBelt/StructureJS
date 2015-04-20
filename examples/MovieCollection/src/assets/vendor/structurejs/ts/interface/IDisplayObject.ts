///<reference path='IEventDispatcher.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class IDisplayObject
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureTS
{
    export interface IDisplayObject extends IEventDispatcher
    {

        /**
         * @property isCreated
         */
        isCreated:boolean;

        /**
         * @property numChildren
         */
        numChildren:number;

        /**
         * @property children
         */
        children:IDisplayObject[];

        /**
         * @method createChildren
         */
        createChildren():any;

        /**
         * @method addChild
         */
        addChild(child:IDisplayObject):any;

        /**
         * @method removeChild
         */
        removeChild(child:IDisplayObject):any;

        /**
         * @method removeChildren
         */
        removeChildren():any;

        /**
         * @method layoutChildren
         */
        layoutChildren():any;

        /**
         * @method addChildAt
         */
        addChildAt(child:IDisplayObject, index:number):any;

        /**
         * @method getChildAt
         */
        getChildAt(index:number):IDisplayObject;

        /**
         * @method getChildIndex
         */
        getChildIndex(child:IDisplayObject):number;

        /**
         * @method swapChildren
         */
        swapChildren(child1:IDisplayObject, child2:IDisplayObject):any

        /**
         * @method swapChildrenAt
         */
        swapChildrenAt(index1:number, index2:number):any;
    }
}