// Imports
var Extend = window.structurejs.Extend;
var DOMElement = window.structurejs.DOMElement;
var BaseEvent = window.structurejs.BaseEvent;

/**
 * YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
var ParentView = (function () {

    var _super = Extend(ParentView, DOMElement);

    function ParentView() {
        _super.call(this);

        this._panelContainer = null;
        this._childView = null;
        this._parentMessage = null;
    }

    /**
     * @overridden DOMElement.createChildren
     */
    ParentView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

        this._panelContainer = this.getChild('.js-panelContent');

        this._childView = new ChildView();
        this._panelContainer.addChild(this._childView);

        this._parentMessage = this.getChild('.js-message');
    };

    /**
     * @overridden DOMElement.layoutChildren
     */
    ParentView.prototype.layoutChildren = function () {
        this._parentMessage.$element.css('opacity', 0);
        this._childView.layoutChildren();

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
        this._panelContainer.destroy();

        _super.prototype.destroy.call(this);
    };

    ParentView.prototype._onBubbled = function (event) {
        var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox == true) {
            event.stopPropagation();
        }

        this._parentMessage.$element.css('opacity', 1);
    };

    return ParentView;
})();