import DisplayObjectContainer = require('../display/DisplayObjectContainer');
import DOMElement = require('../display/DOMElement');
import IEventDispatcher = require('../interface/IEventDispatcher');

/**
 * TODO: YUIDoc_comment
 *
 * @class ITransition
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
interface ITransition extends IEventDispatcher
{
    createTransition(transitionType:string, sectionStage:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration?:number):ITransition;
    complete():any;
}

export = ITransition;