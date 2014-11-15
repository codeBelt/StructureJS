///<reference path='BaseTransition.ts'/>
///<reference path='../../interface/ITransition.ts'/>
///<reference path='../../display/DisplayObjectContainer.ts'/>
///<reference path='../../display/DOMElement.ts'/>

module StructureTS
{
    export class TransitionPushRight extends BaseTransition
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @class TransitionPushRight
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

        public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.75):ITransition
        {
            // Immediately places the next view out of display bounds.
            TweenMax.to(nextView.$element, 0, {x: -viewContainer.unscaledWidth});

            var varsObject = {
                onStart: this.onTweenStart,
                onStartScope: this,
                onUpdate: this.onTweenUpdate,
                onUpdateScope: this,
                onComplete: this.onTweenComplete,
                onCompleteScope: this
            }
            this.transition = new TimelineMax(varsObject);
            this.transition.add(new TweenMax(currentView.$element, duration, {x: viewContainer.unscaledWidth, ease: Expo.easeInOut}), 0);
            this.transition.add(new TweenMax(nextView.$element, duration, {x: 0, ease: Expo.easeInOut}), 0);

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