///<reference path='../../../../../../../ts//display/DOMElement.ts'/>
///<reference path='../../../../../../../ts//event/native/MouseEvents.ts'/>

module codeBelt
{
    import DOMElement = StructureTS.DOMElement;
    import MouseEvents = StructureTS.MouseEvents;
    import BaseEvent = StructureTS.BaseEvent;

    /**
     * TODO: YUIDoc_comment
     *
     * @class ChildView
     * @extends DOMElement
     * @module codeBelt
     * @constructor
     **/
    export class ChildView extends DOMElement
    {
        private _panelContainer:DOMElement = null;
        private _dispatchButton:DOMElement = null;
        private _sonMessage:DOMElement = null;

        constructor()
        {
            super();
        }

        /**
         * @overridden DOMElement.create
         */
        public create():void
        {
            super.create('#containerTemplate', {title: this.getQualifiedClassName()});

            this._panelContainer = this.getChild('.js-panelContent');

            this._dispatchButton = new DOMElement('button', {'class': 'button_dispatch', text: 'Dispatch Event'});
            this._panelContainer.addChild(this._dispatchButton);

            this._sonMessage = this.getChild('.js-message');
        }

        /**
         * @overridden DOMElement.layout
         */
        public layout():void
        {
            this._sonMessage.$element.css('opacity', 0);
        }

        /**
         * @overridden DOMElement.enable
         */
        public enable():void
        {
            if (this.isEnabled === true) return;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.addEventListener(MouseEvents.CLICK, this.onButtonClick, this);

            super.enable();
        }

        /**
         * @overridden DOMElement.disable
         */
        public disable():void
        {
            if (this.isEnabled === false) return;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._dispatchButton.$element.removeEventListener(MouseEvents.CLICK, this.onButtonClick, this);

            super.disable();
        }

        /**
         * @overridden DOMElement.destroy
         */
        public destroy():void
        {
            super.destroy();

            this._dispatchButton.destroy();
            this._dispatchButton = null;

            this._panelContainer.destroy();
            this._panelContainer = null;
        }

        private onButtonClick(event:JQueryEventObject):void
        {
            event.preventDefault();

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
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

            this._sonMessage.$element.css('opacity', 1);
        }

    }
}