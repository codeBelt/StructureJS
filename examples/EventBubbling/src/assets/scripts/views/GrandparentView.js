import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';

import ParentView from './ParentView';

/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
class GrandparentView extends DOMElement {

    _parentView = null;
    _$grandparentMessage = null;
    _$checkbox = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._parentView = new ParentView(this.$element.find('.js-parentView'));
        this.addChild(this._parentView);

        this._$grandparentMessage = this.$element.find('.js-grandparentView-message');

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
        this._$grandparentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._parentView.layout();
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._parentView.destroy();

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

        this._$grandparentMessage.html(text);
    }

}

export default GrandparentView;
