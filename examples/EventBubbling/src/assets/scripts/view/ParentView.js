// Imports
var Extend = window.StructureJS.Extend;
var DOMElement = window.StructureJS.DOMElement;
var BaseEvent = window.StructureJS.BaseEvent;

var ChildView = window.ChildView;

/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
var ParentView = (function () {

    var _super = Extend(ParentView, DOMElement);

    function ParentView($element) {
        _super.call(this, $element);

        this._childView = null;
        this._$parentMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.create
     */
    ParentView.prototype.create = function () {
        _super.prototype.create.call(this);

        this._childView = new ChildView(this.$element.find('.js-childContent'));
        this.addChild(this._childView);

        this._$parentMessage = this.$element.find('.js-parentMessage');

        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };

    /**
     * @overridden DOMElement.layout
     */
    ParentView.prototype.layout = function () {
        this._$parentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._childView.layout();

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    ParentView.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._childView.enable();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    ParentView.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);

        this._childView.disable();

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    ParentView.prototype.destroy = function () {
        this._childView.destroy();

        _super.prototype.destroy.call(this);
    };

    ParentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox === true) {
            baseEvent.stopPropagation();
        }

        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

        this._$parentMessage.html(text);
    };

    return ParentView;
})();