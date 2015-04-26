///<reference path='../BaseObject.ts'/>
///<reference path='../display/DisplayObjectContainer.ts'/>
///<reference path='../display/DOMElement.ts'/>
///<reference path='../interface/ITransition.ts'/>
///<reference path='../constant/TransitionType.ts'/>
///<reference path='../controller/transition/TransitionNone.ts'/>
///<reference path='../controller/transition/TransitionPushLeft.ts'/>
///<reference path='../controller/transition/TransitionPushRight.ts'/>
///<reference path='../controller/transition/TransitionPushUp.ts'/>
///<reference path='../controller/transition/TransitionPushDown.ts'/>
///<reference path='../controller/transition/TransitionCrossFade.ts'/>
///<reference path='../controller/transition/TransitionFadeOutAndIn.ts'/>

/**
 * TODO: YUIDoc_comment
 *
 * @class TransitionFactory
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class TransitionFactory extends BaseObject
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
}