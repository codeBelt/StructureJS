import IObjectManager from './IObjectManager' ;

/**
 * TODO: YUIDoc_comment
 *
 * @class IEventDispatcher
 * @extends IObjectManager
 * @module StructureJS
 * @submodule interface
 * @interface
 */
interface IEventDispatcher extends IObjectManager
{
    /**
     * @property parent
     */
    parent: any;

    /**
     * @method addEventListener
     */
    addEventListener(type: string, callback: Function, scope: any, priority?: number): any;

    /**
     * @method addEventListenerOnce
     */
    addEventListenerOnce(type: string, callback: Function, scope: any, priority?: number): any;

    /**
     * @method removeEventListener
     */
    removeEventListener(type: string, callback: Function, scope: any): any;

    /**
     * @method dispatchEvent
     */
    dispatchEvent(type: any, data?: any): any;

    /**
     * @method hasEventListener
     */
    hasEventListener(type: string, callback: Function, scope: any): boolean;

    /**
     * @method getEventListeners
     */
    getEventListeners(): string;

}

export default IEventDispatcher;
