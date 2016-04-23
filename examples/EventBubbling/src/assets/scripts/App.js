import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';
import EventBroker from 'structurejs/event/EventBroker';

import GrandparentView from './views/GrandparentView';

/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends DOMElement
 * @constructor
 **/
class EventBubblingApp extends DOMElement {

    _grandpaView = null;
    _$clearButton = null;
    _$stageMessage = null;

    constructor() {
        super();
    }

    /**
     * @overridden EventBubblingApp.create
     */
    create() {
        super.create();

        this._grandpaView = new GrandparentView(this.$element.find('.js-grandparentView'));
        this.addChild(this._grandpaView);

        this._$clearButton = this.$element.find('.js-clearButton');
        this._$stageMessage = this.$element.find('.js-stageMessage');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        EventBroker.addEventListener(BaseEvent.CHANGE, this._onGlobalEvent, this);

        this._$clearButton.addEventListener('click', this._onClearClick, this);

        this._grandpaView.enable();

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$clearButton.removeEventListener('click', this._onClearClick, this);

        this._grandpaView.disable();

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this._$stageMessage.text('');
        this._grandpaView.layout();
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._grandpaView.destroy();

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    _onClearClick(event) {
        this.layout();
    }

    _onBubbled(baseEvent) {
        let text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$stageMessage.html(text);
    }

    _onGlobalEvent(baseEvent) {
        console.log("Global event dispatched", baseEvent);
    }

}

export default EventBubblingApp;
