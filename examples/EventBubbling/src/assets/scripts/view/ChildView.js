// Imports
var Extend = window.structurejs.Extend;
var DOMElement = window.structurejs.DOMElement;
var BaseEvent = window.structurejs.BaseEvent;
var EventBroker = window.structurejs.EventBroker;

/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/
var ChildView = (function () {

    var _super = Extend(ChildView, DOMElement);

    function ChildView($element) {
        _super.call(this, $element);

        this._$dispatchButton = null;
        this._$sonMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.createChildren
     */
    ChildView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._$dispatchButton = this.$element.find('.js-dispatchButton');

        this._$sonMessage = this.$element.find('.js-childMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };

    /**
     * @overridden DOMElement.layoutChildren
     */
    ChildView.prototype.layoutChildren = function () {
        this._$sonMessage.text('');
        this._$checkbox.prop('checked', false);

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    ChildView.prototype.enable = function () {
        if (this.isEnabled === true) return;

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$dispatchButton.addEventListener('click', this._onButtonClick, this);

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    ChildView.prototype.disable = function () {
        if (this.isEnabled === false) return;

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    ChildView.prototype.destroy = function () {

        _super.prototype.destroy.call(this);
    };

    ChildView.prototype._onButtonClick = function (event) {
        event.preventDefault();

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
    };

    ChildView.prototype._onBubbled = function (baseEvent) {
        if (this._$checkbox.prop('checked') === true) {
            baseEvent.stopPropagation();
        }

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$sonMessage.html(text);
    };

    return ChildView;
})();