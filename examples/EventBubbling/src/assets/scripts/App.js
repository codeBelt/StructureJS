import Stage from 'structurejs/display/Stage';
import BaseEvent from 'structurejs/event/BaseEvent';
import EventBroker from 'structurejs/event/EventBroker';

import GrandparentView from './views/GrandparentView';

/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

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
     * @overridden Stage.enable
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
     * @overridden Stage.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$clearButton.removeEventListener('click', this._onClearClick, this);

        this._grandpaView.disable();

        super.disable();
    }

    /**
     * @overridden Stage.layout
     */
    layout() {
        this._$stageMessage.text('');
        this._grandpaView.layout();
    }

    /**
     * @overridden Stage.destroy
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
