import DOMElement from 'structurejs/display/DOMElement';
import Router from 'structurejs/controller/Router';

/**
 * TODO: YUIDoc_comment
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
class FooterView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$footerLinks
     * @type {jQuery}
     * @private
     */
    _$footerLinks = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$footerLinks = this.$element.find('.js-href');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$footerLinks.addEventListener('click', this._onClick, this);

        return super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$footerLinks.removeEventListener('click', this._onClick, this);

        return super.disable();
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
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClick
     * @param event {jQueryEventObject}
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        // This changes the application to not use the browser hash change event.
        Router.useDeepLinking = false;
        //Router.allowManualDeepLinking = false;

        var $target = $(event.target);

        Router.navigateTo($target.attr('href'));
    }

}

export default FooterView;
