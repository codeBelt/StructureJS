// Imports
var Extend = window.structurejs.Extend;
var DOMElement = window.structurejs.DOMElement;
var BaseEvent = window.structurejs.BaseEvent;

var ParentView = window.ParentView;

/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
var GrandparentView = (function () {

    var _super = Extend(GrandparentView, DOMElement);

    function GrandparentView($element) {
        _super.call(this, $element);

        this._parentView = null;
        this._$grandparentMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.createChildren
     */
    GrandparentView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._parentView = new ParentView(this.$element.find('.js-parentContent'));
        this.addChild(this._parentView);

        this._$grandparentMessage = this.$element.find('.js-grandparentMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };

    /**
     * @overridden DOMElement.layoutChildren
     */
    GrandparentView.prototype.layoutChildren = function () {
        this._$grandparentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._parentView.layoutChildren();

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    GrandparentView.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._parentView.enable();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    GrandparentView.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._parentView.disable();

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    GrandparentView.prototype.destroy = function () {
        this._parentView.destroy();

        _super.prototype.destroy.call(this);
    };

    GrandparentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox === true) {
            baseEvent.stopPropagation();
        }

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$grandparentMessage.html(text);
    };

    return GrandparentView;
})();