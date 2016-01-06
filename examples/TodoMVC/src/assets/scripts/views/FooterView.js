import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
class FooterView extends DOMElement {

    /**
     * @property _$itemsCompleteText
     * @type {jQuery}
     * @private
     */
    _$itemsCompleteText = null;

    /**
     * @property _$itemsRemainingText
     * @type {jQuery}
     * @private
     */
    _$itemsRemainingText = null;

    /**
     * @property _$clearCompleteButton
     * @type {jQuery}
     * @private
     */
    _$clearCompleteButton = null;

    /**
     * @property _$navLinks
     * @type {jQuery}
     * @private
     */
    _$navLinks = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$itemsCompleteText = this.$element.find('.js-itemsComplete');
        this._$itemsRemainingText = this.$element.find('.js-itemsRemaining');
        this._$clearCompleteButton = this.$element.find('.js-clearCompleteButton');
        this._$navLinks = this.$element.find('#filters li a');
    }

    /**
     * @overridden DOMElement.onEnabled
     */
    onEnabled() {
        this._$clearCompleteButton.addEventListener('click', this._onClear, this);
    }

    /**
     * @overridden DOMElement.onDisabled
     */
    onDisabled() {
        this._$clearCompleteButton.removeEventListener('click', this._onClear, this);
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * This method will update the footer display count for both completed and remaining items.
     *
     * @method updateCounts
     * @public
     */
    updateCounts(completedCount, remainingCount) {
        this._$itemsCompleteText.text(completedCount);
        this._$itemsRemainingText.text(remainingCount);
    }

    /**
     * This will remove the "selected" style class on all nav links and then add the
     * "selected" style class what ever matches the passed in string value.
     *
     * @method updateNav
     * @public
     */
    updateNav(hashName) {
        this._$navLinks
            .removeClass('selected')
            .filter('[href="#/' + (hashName || '') + '"]')
            .addClass('selected');
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * When the user clicks the "clear completed" button this method will be called and will dispatch an event
     * to tell the parent class that we want to remove all the completed items.
     *
     * @method _onClear
     * @param event {jQueryEventObject}
     * @private
     */
    _onClear(event) {
        // Take note this is not dispatching a BaseEvent object but just the string value constant. The only time you need to dispatch
        // an BaseEvent object or a custom event that extends BaseEvent is when you want to use event bubbling or have custom properties
        // on the event that you want to set.
        this.dispatchEvent(BaseEvent.CLEAR);
    }

}

export default FooterView;
