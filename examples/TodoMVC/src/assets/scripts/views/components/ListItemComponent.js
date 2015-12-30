import DOMElement from 'structurejs/display/DOMElement';
import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemComponent
 * @extends DOMElement
 * @constructor
 **/
class ListItemComponent extends DOMElement {

    /**
     * Holds onto the model for this view.
     *
     * @property model
     * @type {ListItemModel}
     * @public
     */
    model = null;

    /**
     * @property _$itemInput
     * @type {jQuery}
     * @private
     */
    _$itemInput = null;

    /**
     * @property _$itemLabel
     * @type {jQuery}
     * @private
     */
    _$itemLabel = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$markCompleteCheckbox
     * @type {jQuery}
     * @private
     */
    _$markCompleteCheckbox = null;

    constructor(model) {
        super();

        this.model = model;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('#listItemTemplate', this.model);

        this._$itemInput = this.$element.find('.js-itemText');
        this._$itemLabel = this.$element.find('.js-editTodo');
        this._$markCompleteCheckbox = this.$element.find('.js-markComplete');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.$element.addEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
        this.$element.addEventListener('click', '.js-removeTodo', this._onItemRemove, this);
        this.$element.addEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

        this.$element.addEventListener('keydown', this._onEscapeKey, this);
        this.$element.addEventListener('keypress', this._onEnterKey, this);
        this._$itemInput.addEventListener('blur', this._onInputBlur, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.$element.removeEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
        this.$element.removeEventListener('click', '.js-removeTodo', this._onItemRemove, this);
        this.$element.removeEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

        this.$element.removeEventListener('keydown', this._onEscapeKey, this);
        this.$element.removeEventListener('keypress', this._onEnterKey, this);
        this._$itemInput.removeEventListener('blur', this._onInputBlur, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        this.$element.toggleClass('completed', this.model.isComplete);

        this._$markCompleteCheckbox.prop('checked', this.model.isComplete);
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
     * TODO: YUIDoc_comment
     *
     * @method setCompleted
     * @public
     */
    setCompleted() {
        this.model.isComplete = true;

        this.layout();
        this._saveItemText();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method setUnCompleted
     * @public
     */
    setUnCompleted() {
        this.model.isComplete = false;

        this.layout();
        this._saveItemText();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method isComplete
     * @public
     */
    isComplete() {
        return this.model.isComplete;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method hide
     * @public
     */
    hide() {
        this.$element.hide();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method show
     * @public
     */
    show() {
        this.$element.show();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemToggleComplete
     * @private
     */
    _onItemToggleComplete(event) {
        let isChecked = $(event.target).prop('checked');

        this.model.isComplete = isChecked;

        this.layout();
        this._saveItemText();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemEdit
     * @private
     */
    _onItemEdit(event) {
        this.$element.addClass('editing');

        this._$itemInput.focus();
        this._$itemInput.select();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEscapeKey
     * @private
     */
    _onEscapeKey(event) {
        if (event.which === Key.ESC) {
            this._resetItemText();
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEscapeKey
     * @private
     */
    _onInputBlur(event) {
        let todoText = this._$itemInput.val().trim();

        if (todoText != '') {
            this.model.text = todoText;
            this._resetItemText();
            this._saveItemText();
        } else {
            this._resetItemText();
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _resetItemText
     * @private
     */
    _resetItemText() {
        this.$element.removeClass('editing');

        // We need to reset the hidden input back to the original value.
        this._$itemInput.val(this.model.text);
        this._$itemLabel.text(this.model.text);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _saveItemText
     * @private
     */
    _saveItemText() {
        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, this.model));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemRemove
     * @private
     */
    _onItemRemove(event) {
        this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED, true));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEnterKey
     * @private
     */
    _onEnterKey(event) {
        let todoText = this._$itemInput.val().trim();

        if (event.which === Key.ENTER) {
            if (todoText != '') {
                this.model.text = todoText;
                this._resetItemText();
                this._saveItemText();
            } else {
                this._resetItemText();
            }
        }
    }

}

export default ListItemComponent;
