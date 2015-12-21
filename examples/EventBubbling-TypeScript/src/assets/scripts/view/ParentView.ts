import DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
import BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
import ChildView = require('./ChildView');

/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
class ParentView extends DOMElement {

    protected _childView:ChildView = null;
    protected _$parentMessage:JQuery = null;
    protected _$checkbox:JQuery = null;

    constructor($element:JQuery) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    public create() {
        super.create();

        this._childView = new ChildView(this.$element.find('.js-childContent'));
        this.addChild(this._childView);

        this._$parentMessage = this.$element.find('.js-parentMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    }

    /**
     * @overridden DOMElement.layout
     */
    public layout() {
        this._$parentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._childView.layout();

        return this;
    }

    /**
     * @overridden DOMElement.enable
     */
    public enable() {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._childView.enable();

        return super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    public disable() {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._childView.disable();

        return super.disable();
    }

    /**
     * @overridden DOMElement.destroy
     */
    public destroy() {
        this._childView.destroy();

        super.destroy();
    }

    public _onBubbled(baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox === true) {
            baseEvent.stopPropagation();
        }

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$parentMessage.html(text);
    }

}

export = ParentView;
