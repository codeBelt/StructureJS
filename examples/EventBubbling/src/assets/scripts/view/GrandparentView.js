// Imports
var Extend = window.structurejs.Extend;
var DOMElement = window.structurejs.DOMElement;
var BaseEvent = window.structurejs.BaseEvent;

/**
 * YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
var GrandparentView = (function () {

    var _super = Extend(GrandparentView, DOMElement);

    function GrandparentView() {
        _super.call(this);

        this._panelContainer = null;
        this._parentView = null;
        this._grandparentMessage = null;
    }

    /**
     * @overridden DOMElement.createChildren
     */
    GrandparentView.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this, '#containerTemplate', { title: this.getQualifiedClassName() });

        this._panelContainer = this.getChild('.js-panelContent');

        this._parentView = new ParentView();
        this._panelContainer.addChild(this._parentView);

        this._grandparentMessage = this.getChild('.js-message');
    };

    /**
     * @overridden DOMElement.layoutChildren
     */
    GrandparentView.prototype.layoutChildren = function () {
        this._grandparentMessage.$element.css('opacity', 0);
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
        this._panelContainer.destroy();

        _super.prototype.destroy.call(this);
    };

    GrandparentView.prototype._onBubbled = function (event) {
        var checkbox = this._panelContainer.$element.find('[type=checkbox]').first().prop('checked');

        if (checkbox == true) {
            event.stopPropagation();
        }

        this._grandparentMessage.$element.css('opacity', 1);
    };

    return GrandparentView;
})();