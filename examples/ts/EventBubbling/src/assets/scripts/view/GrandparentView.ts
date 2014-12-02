///<reference path='../../../../../../../ts//display/DOMElement.ts'/>
///<reference path='../../../../../../../ts//event/BaseEvent.ts'/>

///<reference path='ParentView.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * TODO: YUIDoc_comment
     *
     * @class GrandparentView
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class GrandparentView extends DOMElement
    {
        private _panelContainer:DOMElement = null;
        private _parentView:ParentView = null;
        private _grandparentMessage:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DOMElement.createChildren
         */
        public createChildren():void
        {
            super.createChildren('#containerTemplate', {title: this.getQualifiedClassName()});

            this._panelContainer = this.getChild('.js-panelContent');

            this._parentView = new ParentView();
            this._panelContainer.addChild(this._parentView);

            this._grandparentMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        public layoutChildren():void
        {
            this._grandparentMessage.$element.css('opacity', 0);
            this._parentView.layoutChildren();
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.enable();

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._parentView.disable();

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._parentView.destroy();
            this._parentView = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        }

        private onBubbled(event:BaseEvent):void
        {
            var checkbox:boolean = this._panelContainer.$element.find('[type=checkbox]')
                                                                .first()
                                                                .prop('checked');

            if (checkbox == true)
            {
                event.stopPropagation();
            }

            this._grandparentMessage.$element.css('opacity', 1);
        }

    }
}