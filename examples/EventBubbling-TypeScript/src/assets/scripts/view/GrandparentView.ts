import DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
import BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
import ParentView = require('./ParentView');

/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
class GrandparentView extends DOMElement {

    protected _parentView:ParentView = null;
    protected _$grandparentMessage:JQuery = null;
    protected _$checkbox:JQuery = null;

    constructor($element:JQuery) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    public create() {
        super.create();

        this._parentView = new ParentView(this.$element.find('.js-parentContent'));
        this.addChild(this._parentView);

        this._$grandparentMessage = this.$element.find('.js-grandparentMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    }

    /**
     * @overridden DOMElement.layout
     */
    public layout() {
        this._$grandparentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._parentView.layout();

        return this;
    }

    /**
     * @overridden DOMElement.enable
     */
    public enable() {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._parentView.enable();

        return super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    public disable() {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._parentView.disable();

        return super.disable();
    }

    /**
     * @overridden DOMElement.destroy
     */
    public destroy() {
        this._parentView.destroy();

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

        this._$grandparentMessage.html(text);
    }

}

export = GrandparentView;
