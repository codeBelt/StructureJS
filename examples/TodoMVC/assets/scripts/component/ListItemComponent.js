define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var ListItemTemplate = require('hbs!templates/ListItemTemplate');
    var Key = require('constant/Key');

    /**
     * YUIDoc_comment
     *
     * @class ListItemComponent
     * @extends DOMElement
     * @constructor
     **/
    var ListItemComponent = (function () {

        var _super = Extend(ListItemComponent, DOMElement);

        function ListItemComponent(vo) {
            _super.call(this);

            /**
             * Holds onto the model for this view.
             *
             * @property vo
             * @type {ListItemVO}
             * @private
             */
            this.vo = vo;

            /**
             * @property _$itemInput
             * @type {jQuery}
             * @private
             */
            this._$itemInput = null;

            /**
             * @property _$itemLabel
             * @type {jQuery}
             * @private
             */
            this._$itemLabel = null;

            /**
             * YUIDoc_comment
             *
             * @property _$markCompleteCheckbox
             * @type {jQuery}
             * @private
             */
            this._$markCompleteCheckbox = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ListItemComponent.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, ListItemTemplate, this.vo);

            this._$itemInput = this.$element.find('.js-itemText');
            this._$itemLabel = this.$element.find('.js-editTodo');
            this._$markCompleteCheckbox = this.$element.find('.js-markComplete');
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        ListItemComponent.prototype.layoutChildren = function () {
            this.$element.toggleClass('completed', this.vo.isComplete);

            this._$markCompleteCheckbox.prop('checked', this.vo.isComplete);

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ListItemComponent.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            this.$element.addEventListener('click', '.js-markComplete', this.onItemToggleComplete, this);
            this.$element.addEventListener('click', '.js-removeTodo', this.onItemRemove, this);
            this.$element.addEventListener('dblclick', '.js-editTodo', this.onItemEdit, this);

            this.$element.addEventListener('keydown', this.onEscapeKey, this);
            this.$element.addEventListener('keypress', this.onEnterKey, this);
            this._$itemInput.addEventListener('blur', this.onInputBlur, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ListItemComponent.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            this.$element.removeEventListener('click', '.js-markComplete', this.onItemToggleComplete, this);
            this.$element.removeEventListener('click', '.js-removeTodo', this.onItemRemove, this);
            this.$element.removeEventListener('dblclick', '.js-editTodo', this.onItemEdit, this);

            this.$element.removeEventListener('keydown', this.onEscapeKey, this);
            this.$element.removeEventListener('keypress', this.onEnterKey, this);
            this._$itemInput.removeEventListener('blur', this.onInputBlur, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        ListItemComponent.prototype.destroy = function () {
            // Destroy the child objects and references in this parent class to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        /**
         * YUIDoc_comment
         *
         * @method setCompleted
         * @public
         */
        ListItemComponent.prototype.setCompleted = function() {
            this.vo.isComplete = true;

            this.layoutChildren();
            this.saveItemText();
        };

        /**
         * YUIDoc_comment
         *
         * @method setUnCompleted
         * @public
         */
        ListItemComponent.prototype.setUnCompleted = function() {
            this.vo.isComplete = false;

            this.layoutChildren();
            this.saveItemText();
        };

        /**
         * YUIDoc_comment
         *
         * @method hide
         * @public
         */
        ListItemComponent.prototype.hide = function() {
            this.$element.hide();
        };

        /**
         * YUIDoc_comment
         *
         * @method show
         * @public
         */
        ListItemComponent.prototype.show = function() {
            this.$element.show();
        };

        /**
         * YUIDoc_comment
         *
         * @method onItemToggleComplete
         * @private
         */
        ListItemComponent.prototype.onItemToggleComplete = function(event) {
            var isChecked = $(event.target).prop('checked');

            this.vo.isComplete = isChecked;

            this.layoutChildren();
            this.saveItemText();
        };

        /**
         * YUIDoc_comment
         *
         * @method onItemEdit
         * @private
         */
        ListItemComponent.prototype.onItemEdit = function(event) {
            this.$element.addClass('editing');

            this._$itemInput.focus();
            this._$itemInput.select();
        };

        /**
         * YUIDoc_comment
         *
         * @method onEscapeKey
         * @private
         */
        ListItemComponent.prototype.onEscapeKey = function(event) {
            if (event.which === Key.ESC) {
                this.resetItemText();
            }
        };

        /**
         * YUIDoc_comment
         *
         * @method onEscapeKey
         * @private
         */
        ListItemComponent.prototype.onInputBlur = function(event) {
            var todoText = this._$itemInput.val().trim();

            if (todoText != '') {
                this.vo.text = todoText;
                this.resetItemText();
                this.saveItemText();
            } else {
                this.resetItemText();
            }
        };

        /**
         * YUIDoc_comment
         *
         * @method resetItemText
         * @private
         */
        ListItemComponent.prototype.resetItemText = function() {
            this.$element.removeClass('editing');

            // We need to reset the hidden input back to the original value.
            this._$itemInput.val(this.vo.text);
            this._$itemLabel.text(this.vo.text);
        };

        /**
         * YUIDoc_comment
         *
         * @method saveItemText
         * @private
         */
        ListItemComponent.prototype.saveItemText = function() {
            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, this.vo));
        };

        /**
         * YUIDoc_comment
         *
         * @method onItemRemove
         * @private
         */
        ListItemComponent.prototype.onItemRemove = function(event) {
            this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED, true));
        };

        /**
         * YUIDoc_comment
         *
         * @method onEnterKey
         * @private
         */
        ListItemComponent.prototype.onEnterKey = function(event) {
            var todoText = this._$itemInput.val().trim();

            if (event.which === Key.ENTER) {
                if (todoText != '') {
                    this.vo.text = todoText;
                    this.resetItemText();
                    this.saveItemText();
                } else {
                    this.resetItemText();
                }
            }
        };

        return ListItemComponent;
    })();

    module.exports = ListItemComponent;

});
