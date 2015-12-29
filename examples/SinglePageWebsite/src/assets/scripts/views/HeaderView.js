import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class HeaderView
 * @extends DOMElement
 * @constructor
 **/
class HeaderView extends DOMElement {

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

        this._$navLinks = this.$element.find('#js-nav li');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the child objects in this parent class.
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects that is need.
        // This super method will also null out all properties automatically to prevent memory leaks.

        super.destroy();
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////
    /**
     * TODO: YUIDoc_comment
     *
     * @method updateNavigation
     * @public
     */
    updateNavigation(pageId) {
        var $navItem = this._$navLinks.find('a[href*="' + pageId + '"]');

        // Make all nav item not active.
        this._$navLinks.removeClass('active');

        if ($navItem.length !== 0) {
            // Make the found nav item active that matches the route.
            $navItem
                .parent()
                .addClass('active');
        } else {
            // If there was no match then make the first nav item active.
            this._$navLinks
                .first()
                .addClass('active');
        }
    }

}

export default HeaderView;
