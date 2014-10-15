// Imports
var Extend = window.structurejs.Extend;
var Stage = window.structurejs.Stage;
var BaseEvent = window.structurejs.BaseEvent;
var EventBroker = window.structurejs.EventBroker;
var Router = window.structurejs.Router;

//var GrandparentView = window.GrandparentView;

/**
 * YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
var EventBubblingApp = (function () {

    var _super = Extend(EventBubblingApp, Stage);

    function EventBubblingApp() {
        _super.call(this);

        this._grandpaView = null;
        this._clearButton = null;
        this._$stageMessage = null;
    }

    /**
     * @overridden EventBubblingApp.createChildren
     */
    EventBubblingApp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._grandpaView = new GrandparentView();
        this.addChild(this._grandpaView);

        this._clearButton = this.getChild('#js-clearButton');
        this._$stageMessage = this.$element.find('.js-message');
    };

    /**
     * @overridden Stage.layoutChildren
     */
    EventBubblingApp.prototype.layoutChildren = function () {
        this._$stageMessage.css('opacity', 0);
        this._grandpaView.layoutChildren();

        return this;
    };

    /**
     * @overridden Stage.enable
     */
    EventBubblingApp.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);
        //EventBroker.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._clearButton.$element.addEventListener('click', this.onClearClick, this);
        this._grandpaView.enable();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden Stage.disable
     */
    EventBubblingApp.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

        this._clearButton.$element.removeEventListener('click', this.onClearClick, this);
        this._grandpaView.disable();

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden Stage.destroy
     */
    EventBubblingApp.prototype.destroy = function () {
        this._grandpaView.destroy();
        this._clearButton.destroy();

        _super.prototype.destroy.call(this);
    };

    EventBubblingApp.prototype.onClearClick = function (event) {
        this.layoutChildren();
    };

    EventBubblingApp.prototype.onBubbled = function (event) {
        this._$stageMessage.css('opacity', 1);
    };

    return EventBubblingApp;
})();