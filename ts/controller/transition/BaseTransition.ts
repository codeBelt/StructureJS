///<reference path='../../BaseObject.ts'/>
///<reference path='../../event/EventDispatcher.ts'/>
///<reference path='../../interface/ITransition.ts'/>
///<reference path='../../display/DisplayObjectContainer.ts'/>
///<reference path='../../display/DOMElement.ts'/>
///<reference path='../../event/TweenEvent.ts'/>

module StructureTS
{
    export class BaseTransition extends EventDispatcher implements ITransition
    {
        /**
         * Property of the TimelineMax object.
         *
         * @property transition
         * @type {TimelineMax}
         * @readOnly
         */
        public transition:TimelineMax = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @class BaseTransition
         * @extends EventDispatcher
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
         * Creates and starts the transition for the specific transition type.
         *
         * @method createTransition
         * @param transitionType {string)
     * @param viewContainer {DisplayObjectContainer)
     * @param currentView {DOMElement)
     * @param nextView {DOMElement)
     * @param [duration=0.75] {number)
     * @returns {ITransition}
         */
        public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.75):ITransition
        {
            return this;
        }

        /**
         * Gets called by the TimelineMax object when the transition starts. Dispatches the TweenEvent.START event. The data value of the TweenEvent event is set to the TimelineMax object.
         *
         * @method onTweenStart
         * @returns {BaseTransition}
         * @protected
         * @chainable
         */
        public onTweenStart():any
        {
            this.dispatchEvent(new TweenEvent(TweenEvent.START, false, false, this.transition));

            return this;
        }

        /**
         * Gets called by the TimelineMax object every time the timeline updates (on every frame while the timeline is active). Dispatches the TweenEvent.START event. The data value of the TweenEvent event is set to the TimelineMax object.
         *
         * @method onTweenUpdate
         * @returns {BaseTransition}
         * @protected
         * @chainable
         */
        public onTweenUpdate():any
        {
            this.dispatchEvent(new TweenEvent(TweenEvent.UPDATE, false, false, this.transition));

            return this;
        }

        /**
         * Gets called by the TimelineMax object when the transition completes. Dispatches the TweenEvent.COMPLETE event. The data value of the TweenEvent event is set to the TimelineMax object.
         *
         * @method onTweenComplete
         * @returns {BaseTransition}
         * @protected
         * @chainable
         */
        public onTweenComplete():any
        {
            this.dispatchEvent(new TweenEvent(TweenEvent.COMPLETE, false, false, this.transition));

            return this;
        }

        /**
         * Tells TimelineMax to finishes/complete the transition right away.
         *
         * @method complete
         * @returns {BaseTransition}
         * @chainable
         */
        public complete():any
        {
            this.transition.progress(1);

            return this;
        }

        /**
         * @overridden EventDispatcher.destroy
         */
        public destroy():void
        {
            this.complete();

            super.destroy();
        }
    }
}