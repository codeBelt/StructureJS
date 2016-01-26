import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class PageControlView
 * @extends DOMElement
 * @constructor
 **/
class PageControlView extends DOMElement {

    /**
     * @property sortType
     * @type {string}
     * @public
     */
    sortType = null;

    /**
     * @property displayLimit
     * @type {int}
     * @public
     */
    displayLimit = null;

    /**
     * @property _$listSort
     * @type {jQuery}
     * @private
     */
    _$listSort = null;

    /**
     * @property _$listLimit
     * @type {jQuery}
     * @private
     */
    _$listLimit = null;

    /**
     * @property _$listUpdate
     * @type {jQuery}
     * @private
     */
    _$listUpdate = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$listSort = this.$element.find('.js-pageControlView-listSort');
        this._$listLimit = this.$element.find('.js-pageControlView-listLimit');
        this._$listUpdate = this.$element.find('.js-pageControlView-listUpdate');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$listSort.prop('disabled', false);
        this._$listLimit.prop('disabled', false);
        this._$listUpdate.prop('disabled', false);

        this._$listSort.addEventListener('change', this._onSortChange, this);
        this._$listLimit.addEventListener('change', this._onLimitChange, this);
        this._$listUpdate.addEventListener('click', this._onUpdateClick, this);


        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$listSort.prop('disabled', true);
        this._$listLimit.prop('disabled', true);
        this._$listUpdate.prop('disabled', true);

        this._$listSort.removeEventListener('change', this._onSortChange, this);
        this._$listLimit.removeEventListener('change', this._onLimitChange, this);
        this._$listUpdate.removeEventListener('click', this._onUpdateClick, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this.sortType = this._$listSort.val();
        this.displayLimit = parseInt(this._$listLimit.val());
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
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onSortChange
     * @param event {jQueryEventObject}
     * @private
     */
    _onSortChange(event) {
        event.preventDefault();

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLimitChange
     * @param event {jQueryEventObject}
     * @private
     */
    _onLimitChange(event) {
        event.preventDefault();

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdateClick
     * @param event {jQueryEventObject}
     * @private
     */
    _onUpdateClick(event) {
        event.preventDefault();

        this.dispatchEvent('update', {sortType: this.sortType, displayLimit: this.displayLimit});
    }

}

export default PageControlView;
