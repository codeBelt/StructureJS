import DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
import BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
import EventBroker = require('../../vendor/structurejs/ts/event/EventBroker');

/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/
class ChildView extends DOMElement {

    protected _$dispatchButton:JQuery = null;
    protected _$sonMessage:JQuery = null;
    protected _$checkbox:JQuery = null;

    constructor($element:JQuery) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    public create() {
        super.create();

        this._$dispatchButton = this.$element.find('.js-dispatchButton');

        this._$sonMessage = this.$element.find('.js-childMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    }

    /**
     * @overridden DOMElement.layout
     */
    public layout() {
        this._$sonMessage.text('');
        this._$checkbox.prop('checked', false);

        return this;
    }

    /**
     * @overridden DOMElement.enable
     */
    public enable() {
        if (this.isEnabled === true) return;

        this._$dispatchButton.addEventListener('click', this._onButtonClick, this);

        return super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    public disable() {
        if (this.isEnabled === false) return;

        this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);

        return super.disable();
    }

    /**
     * @overridden DOMElement.destroy
     */
    public destroy() {

        super.destroy();
    }

    public _onButtonClick(event) {
        event.preventDefault();

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> sent the event.';

        this._$sonMessage.html(text);

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
    }

}

export = ChildView;
