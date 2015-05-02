'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../BaseObject as BaseObject
 @import ../display/DisplayObjectContainer as DisplayObjectContainer
 @import ../display/DOMElement as DOMElement
 @import ../interface/ITransition as ITransition
 @import ../constant/TransitionType as TransitionType
 @import ../controller/transition/TransitionNone as TransitionNone
 @import ../controller/transition/TransitionPushLeft as TransitionPushLeft
 @import ../controller/transition/TransitionPushRight as TransitionPushRight
 @import ../controller/transition/TransitionPushUp as TransitionPushUp
 @import ../controller/transition/TransitionPushDown as TransitionPushDown
 @import ../controller/transition/TransitionCrossFade as TransitionCrossFade
 @import ../controller/transition/TransitionFadeOutAndIn as TransitionFadeOutAndIn
 @export TransitionFactory
*/

import BaseObject = require('../BaseObject');
import DisplayObjectContainer = require('../display/DisplayObjectContainer');
import DOMElement = require('../display/DOMElement');
import ITransition = require('../interface/ITransition');
import TransitionType = require('../constant/TransitionType');
import TransitionNone = require('../controller/transition/TransitionNone');
import TransitionPushLeft = require('../controller/transition/TransitionPushLeft');
import TransitionPushRight = require('../controller/transition/TransitionPushRight');
import TransitionPushUp = require('../controller/transition/TransitionPushUp');
import TransitionPushDown = require('../controller/transition/TransitionPushDown');
import TransitionCrossFade = require('../controller/transition/TransitionCrossFade');
import TransitionFadeOutAndIn = require('../controller/transition/TransitionFadeOutAndIn');

/**
 * TODO: YUIDoc_comment
 *
 * @class TransitionFactory
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class TransitionFactory extends BaseObject
{
    /**
     * TODO: YUIDoc_comment
     *
     * @property _transitions
     * @type {Object}
     * @private
     */
    private _transitions:Object = {};

    constructor()
    {
        super();

        this.registerTransition(TransitionType.NONE, new TransitionNone());
        this.registerTransition(TransitionType.PUSH_LEFT, new TransitionPushLeft());
        this.registerTransition(TransitionType.PUSH_RIGHT, new TransitionPushRight());
        this.registerTransition(TransitionType.PUSH_UP, new TransitionPushUp());
        this.registerTransition(TransitionType.PUSH_DOWN, new TransitionPushDown());
        this.registerTransition(TransitionType.CROSSFADE, new TransitionCrossFade());
        this.registerTransition(TransitionType.FADE_OUT_AND_IN, new TransitionFadeOutAndIn());
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @param transitionType {string}
     * @param sectionStage {DisplayObjectContainer}
     * @param currentView {DOMElement}
     * @param nextView {DOMElement}
     * @param duration {number}
     * @returns {ITransition}
     */
    public createTransition(transitionType:string, sectionStage:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = -1):ITransition
    {
        var concreteFactory:ITransition = this._transitions[transitionType];
        if (concreteFactory == null)
        {
            throw new Error('[' + this.getQualifiedClassName() + '] Not found factory for type: ' + transitionType);
        }

        if (duration >= 0)
        {
            return concreteFactory.createTransition(transitionType, sectionStage, currentView, nextView, duration);
        }
        else
        {
            return concreteFactory.createTransition(transitionType, sectionStage, currentView, nextView);
        }
    }

    /**
     * The registerTransition method allows you to add custom transitions to the {{#crossLink "TransitionFactory"}}{{/crossLink}}.
     *
     * @method registerTransition
     * @param key {string} The key value for the transition being passed in.
     * @param transitionFactory{ITransition} A transition that implements {{#crossLink "ITransition"}}{{/crossLink}}.
     * @chainable
     * @public
     */
    public registerTransition(key:string, transitionFactory:ITransition):any
    {
        if (this._transitions.hasOwnProperty(key))
        {
            throw new Error('[' + this.getQualifiedClassName() + '] A transition with that key has already been registered.');
        }

        this._transitions[key] = transitionFactory;

        return this;
    }

    /**
     * @overridden BaseObject.destroy
     */
    public destroy():void
    {
        super.destroy();
    }
}

export = TransitionFactory;