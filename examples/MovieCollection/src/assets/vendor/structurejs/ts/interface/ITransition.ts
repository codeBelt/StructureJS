///<reference path='./IEventDispatcher.ts'/>
///<reference path='../display/DisplayObjectContainer.ts'/>
///<reference path='../display/DOMElement.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class ITransition
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export interface ITransition extends IEventDispatcher
    {
        createTransition(transitionType:string, sectionStage:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration?:number):ITransition;
        complete():any;
    }
}