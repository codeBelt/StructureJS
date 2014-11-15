///<reference path='BaseTransition.ts'/>
///<reference path='../../interface/ITransition.ts'/>
///<reference path='../../display/DisplayObjectContainer.ts'/>
///<reference path='../../display/DOMElement.ts'/>

module StructureTS
{
    export class TransitionNone extends BaseTransition
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @class TransitionNone
         * @extends BaseTransition
         * @module StructureJS
         * @submodule controller
         * @constructor
         * @author Robert S. (www.codeBelt.com)
         * @version 0.1.0¥
         */
        constructor()
        {
            super();
        }

        /**
         * @overridden BaseTransition.createTransition
         */
        public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0):ITransition
        {
            // Needs a setTimeout because the events would fire before the addEventListener had time to be setup on the Transition object.
            setTimeout(() =>
            {
                // Calls all event methods right way so the current view can be removed and the next view will added. This transition is just a swap of views.
                this.onTweenStart();
                this.onTweenUpdate();
                this.onTweenComplete();
            }, 100);

            return this;
        }

        /**
         * @overridden BaseTransition.destroy
         */
        public destroy():void
        {
            super.destroy();
        }
    }
}