define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    /**
     * TODO: YUIDoc_comment
     *
     * @class PageControlView
     * @extends DOMElement
     * @constructor
     **/
    var PageControlView = (function () {

        var _super = Extend(PageControlView, DOMElement);

        function PageControlView($element) {
            _super.call(this, $element);

            /**
             * TODO: YUIDoc_comment
             *
             * @property sortType
             * @type {string}
             * @public
             */
            this.sortType = null;

            /**
             * TODO: YUIDoc_comment
             *
             * @property displayLimit
             * @type {int}
             * @public
             */
            this.displayLimit = null;

            /**
             * TODO: YUIDoc_comment
             *
             * @property _$listSort
             * @type {jQuery}
             * @private
             */
            this._$listSort = null;

            /**
             * TODO: YUIDoc_comment
             *
             * @property _$listLimit
             * @type {jQuery}
             * @private
             */
            this._$listLimit = null;

            /**
             * TODO: YUIDoc_comment
             *
             * @property _$listUpdate
             * @type {jQuery}
             * @private
             */
            this._$listUpdate = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        PageControlView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            // Create and add your child objects to this parent class.
            this._$listSort = this.$element.find('.js-listSort');
            this._$listLimit = this.$element.find('.js-listLimit');
            this._$listUpdate = this.$element.find('.js-listUpdate');
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        PageControlView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            this.sortType = this._$listSort.val();
            this.displayLimit = parseInt(this._$listLimit.val());

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        PageControlView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.
            this._$listSort.prop('disabled', false);
            this._$listLimit.prop('disabled', false);
            this._$listUpdate.prop('disabled', false);

            this._$listSort.addEventListener('change', this._onSortChange, this);
            this._$listLimit.addEventListener('change', this._onLimitChange, this);
            this._$listUpdate.addEventListener('click', this._onUpdateClick, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        PageControlView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.
            this._$listSort.prop('disabled', true);
            this._$listLimit.prop('disabled', true);
            this._$listUpdate.prop('disabled', true);

            this._$listSort.removeEventListener('change', this._onSortChange, this);
            this._$listLimit.removeEventListener('change', this._onLimitChange, this);
            this._$listUpdate.removeEventListener('click', this._onUpdateClick, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onSortChange
         * @param event {jQueryEventObject}
         * @private
         */
        PageControlView.prototype._onSortChange = function(event) {
            event.preventDefault();

            this.layoutChildren();
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onLimitChange
         * @param event {jQueryEventObject}
         * @private
         */
        PageControlView.prototype._onLimitChange = function(event) {
            event.preventDefault();

            this.layoutChildren();
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onUpdateClick
         * @param event {jQueryEventObject}
         * @private
         */
        PageControlView.prototype._onUpdateClick = function(event) {
            event.preventDefault();

            console.log("_onUpdateClick", this.sortType, this.displayLimit);
            this.dispatchEvent('update', {sortType: this.sortType, displayLimit: this.displayLimit});
        };

        return PageControlView;
    })();

    module.exports = PageControlView;

});
