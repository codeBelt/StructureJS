var Extend = require('../../vendor/structurejs/src/util/Extend');
var DOMElement = require('../../vendor/structurejs/src/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/src/event/BaseEvent');

/**
 * This class is responsible for hand the display and interactions for the footer HTML.
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
var FooterView = (function () {

    var _super = Extend(FooterView, DOMElement);

    function FooterView($element) {
        _super.call(this, $element);

        /**
         * @property _$itemsCompleteText
         * @type {jQuery}
         * @private
         */
        this._$itemsCompleteText = null;

        /**
         * @property _$itemsRemainingText
         * @type {jQuery}
         * @private
         */
        this._$itemsRemainingText = null;

        /**
         * @property _$clearCompleteButton
         * @type {jQuery}
         * @private
         */
        this._$clearCompleteButton = null;

        /**
         * @property _$navLinks
         * @type {jQuery}
         * @private
         */
        this._$navLinks = null;
    }

    /**
     * @overridden DOMElement.create
     */
    FooterView.prototype.create = function () {
        _super.prototype.create.call(this);

        this._$itemsCompleteText = this.$element.find('.js-itemsComplete');
        this._$itemsRemainingText = this.$element.find('.js-itemsRemaining');
        this._$clearCompleteButton = this.$element.find('.js-clearCompleteButton');
        this._$navLinks = this.$element.find('#filters li a');
    };

    /**
     * @overridden DOMElement.enable
     */
    FooterView.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this._$clearCompleteButton.addEventListener('click', this._onClear, this);

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    FooterView.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this._$clearCompleteButton.removeEventListener('click', this._onClear, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    FooterView.prototype.destroy = function () {
        // Destroy the child objects and references in this parent class to prevent memory leaks.

        _super.prototype.destroy.call(this);
    };

    /**
     * This method will update the footer display count for both completed and remaining items.
     *
     * @method updateCounts
     * @public
     */
    FooterView.prototype.updateCounts = function(completedCount, remainingCount) {
        this._$itemsCompleteText.text(completedCount);
        this._$itemsRemainingText.text(remainingCount);
    };

    /**
     * This will remove the "selected" style class on all nav links and then add the
     * "selected" style class what ever matches the passed in string value.
     *
     * @method updateNav
     * @public
     */
    FooterView.prototype.updateNav = function(hashName) {
        this._$navLinks.removeClass('selected')
            .filter('[href="#/' + (hashName || '') + '"]')
            .addClass('selected');
    };

    /**
     * When the user clicks the "clear completed" button this method will be called and will dispatch an event
     * to tell the parent class that we want to remove all the completed items.
     *
     * @method _onClear
     * @param event {jQueryEventObject}
     * @private
     */
    FooterView.prototype._onClear = function(event) {
        // Take note this is not dispatching a BaseEvent object but just the string value constant. The only time you need to dispatch
        // an BaseEvent object or a custom event that extends BaseEvent is when you want to use event bubbling or have custom properties
        // on the event that you want to set.
        this.dispatchEvent(BaseEvent.CLEAR);
    };

    return FooterView;
})();

module.exports = FooterView;