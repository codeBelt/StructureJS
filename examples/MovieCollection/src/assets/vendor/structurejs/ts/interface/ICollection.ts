///<reference path='IValueObject.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class ICollection
 * @module StructureJS
 * @submodule interface
 * @interface
 */
module StructureTS
{
    export interface ICollection
    {
        /**
         * @method destroy
         */
        destroy():void;

//    /**
//     * @method clone
//     */
//    clone():void;

        /**
         * @method copy
         */
        copy():void;

        /**
         * @method addItem
         */
        addItem(item:IValueObject):any;

        /**
         * @method addItems
         */
        addItems(items:IValueObject[]):any

        /**
         * @method removeItem
         */
        removeItem(item:IValueObject):any

        /**
         * @method removeItems
         */
        removeItems(items:IValueObject[]):any

        /**
         * @method hasItem
         */
        hasItem(item:IValueObject):boolean

        /**
         * @method getIndexOfItem
         */
        getIndexOfItem(item:IValueObject):number

        /**
         * @method getItemByIndex
         */
        getItemByIndex(index:number):IValueObject;

        /**
         * @method find
         */
        find(properties:any):IValueObject[]
    }
}