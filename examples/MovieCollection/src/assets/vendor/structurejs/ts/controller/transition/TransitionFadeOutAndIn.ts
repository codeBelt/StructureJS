///<reference path='BaseTransition.ts'/>
///<reference path='../../interface/ITransition.ts'/>
///<reference path='../../display/DisplayObjectContainer.ts'/>
///<reference path='../../display/DOMElement.ts'/>

module StructureTS
{
    export class TransitionFadeOutAndIn extends BaseTransition
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @class TransitionFadeOutAndIn
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

        public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.5):ITransition
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
            this.transition.add(TweenMax.from(nextView.$element, duration, {opacity: 0, ease: Expo.easeInOut}));

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
}