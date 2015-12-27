import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';
import EventBroker from 'structurejs/event/EventBroker';

/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/
class ChildView extends DOMElement {

    _$dispatchButton = null;
    _$sonMessage = null;
    _$checkbox = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$dispatchButton = this.$element.find('.js-dispatchButton');

        this._$sonMessage = this.$element.find('.js-childMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) return;

        this._$dispatchButton.addEventListener('click', this._onButtonClick, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) return;

        this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this._$sonMessage.text('');
        this._$checkbox.prop('checked', false);
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    _onButtonClick(event) {
        event.preventDefault();

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> sent the event.';

        this._$sonMessage.html(text);

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
    }

}

export default ChildView;
