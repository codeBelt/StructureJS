import Stage = require('../vendor/structurejs/ts/display/Stage');
import BaseEvent = require('../vendor/structurejs/ts/event/BaseEvent');
import EventBroker = require('../vendor/structurejs/ts/event/EventBroker');
import GrandparentView = require('./view/GrandparentView');

/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
class EventBubblingApp extends Stage {

    protected _grandpaView:GrandparentView = null;
    protected _$clearButton:JQuery = null;
    protected _$stageMessage:JQuery = null;

    constructor() {
        super();
    }

    /**
     * @overridden EventBubblingApp.create
     */
    public create() {
        super.create();

        this._grandpaView = new GrandparentView(this.$element.find('.js-grandParentContent'));
        this.addChild(this._grandpaView);

        this._$clearButton = this.$element.find('.js-clearButton');
        this._$stageMessage = this.$element.find('.js-stageMessage');
    }

    /**
     * @overridden Stage.layout
     */
    public layout() {
        this._$stageMessage.text('');
        this._grandpaView.layout();

        return this;
    }

    /**
     * @overridden Stage.enable
     */
    public enable() {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        EventBroker.addEventListener(BaseEvent.CHANGE, this._onGlobalEvent, this);

        this._$clearButton.addEventListener('click', this._onClearClick, this);

        this._grandpaView.enable();

        return super.enable();
    }

    /**
     * @overridden Stage.disable
     */
    public disable() {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$clearButton.removeEventListener('click', this._onClearClick, this);

        this._grandpaView.disable();

        return super.disable();
    }

    /**
     * @overridden Stage.destroy
     */
    public destroy() {
        this._grandpaView.destroy();

        super.destroy();
    }

    protected _onClearClick(event) {
        this.layout();
    }

    protected _onBubbled(baseEvent) {
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$stageMessage.html(text);
    }

    protected _onGlobalEvent = function(baseEvent) {
        console.log("Global event dispatched", baseEvent);
    }

}

export = EventBubblingApp;
