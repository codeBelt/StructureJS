import ICore = require('./ICore');
import BaseEvent = require('../event/BaseEvent');

/**
 * TODO: YUIDoc_comment
 *
 * @class IBaseModel
 * @extends ICore
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IEventDispatcher extends ICore
{
    /**
     * @property parent
     */
    parent:any;

    /**
     * @method addEventListener
     */
    addEventListener(type:string, func:Function, scope:any, priority?:number):any;

    /**
     * @method addEventListenerOnce
     */
    addEventListenerOnce(type:string, func:Function, scope:any, priority?:number):any;

    /**
     * @method removeEventListener
     */
    removeEventListener(type:string, func:Function, scope:any):any;

    /**
     * @method hasEventListener
     */
    hasEventListener(type:string, callback:Function, scope:any):any;

    /**
     * @method dispatchEvent
     */
    dispatchEvent(event:BaseEvent):any;

    /**
     * @method getEventListeners
     */
    getEventListeners():string;

}

export = IEventDispatcher;
