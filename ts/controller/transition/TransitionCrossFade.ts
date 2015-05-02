'use strict';
/*
 UMD Stuff
 @import ../util/Extend');
 @import BaseTransition
 @import ../../display/DisplayObjectContainer as DisplayObjectContainer
 @import ../../display/DOMElement as DOMElement
 @export TransitionCrossFade
*/
import BaseTransition = require('BaseTransition');
import ITransition = require('../../interface/ITransition');
import DisplayObjectContainer = require('../../display/DisplayObjectContainer');
import DOMElement = require('../../display/DOMElement');

class TransitionCrossFade extends BaseTransition
{
    /**
     * TODO: YUIDoc_comment
     *
     * @class TransitionCrossFade
     * @extends BaseTransition
     * @module StructureJS
     * @submodule controller
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @version 0.1.0
     */
    constructor()
    {
        super();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method createTransition
     * @param transitionType
     * @param viewContainer
     * @param currentView
     * @param nextView
     * @param duration
     * @returns {TransitionCrossFade}
     */
    public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.75):ITransition
    {
        var varsObject = {
            onStart: this.onTweenStart,
            onStartScope: this,
            onUpdate: this.onTweenUpdate,
            onUpdateScope: this,
            onComplete: this.onTweenComplete,
            onCompleteScope: this
        }
        this.transition = new TimelineMax(varsObject);
        this.transition.add(TweenMax.to(currentView.$element, duration, {opacity: 0, ease: Expo.easeInOut}));
        this.transition.add(TweenMax.from(nextView.$element, duration, {opacity: 0, ease: Expo.easeInOut}), 0);

        return this;
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        super.destroy();
    }
}

export = TransitionCrossFade;