import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';

import ChildView from './ChildView';

/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
class ParentView extends DOMElement {

    _childView = null;
    _$parentMessage = null;
    _$checkbox = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._childView = new ChildView(this.$element.find('.js-childView'));
        this.addChild(this._childView);

        this._$parentMessage = this.$element.find('.js-parentView-message');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    }

    /**
     * @overridden DOMElement.onEnabled
     */
    onEnabled() {
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
    }

    /**
     * @overridden DOMElement.onDisabled
     */
    onDisabled() {
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this._$parentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._childView.layout();
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._childView.destroy();

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    _onBubbled(baseEvent) {
        let checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox === true) {
            baseEvent.stopPropagation();
        }

        let text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$parentMessage.html(text);
    }

}

export default ParentView;
