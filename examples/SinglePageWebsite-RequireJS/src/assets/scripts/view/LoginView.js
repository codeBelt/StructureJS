define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    /**
     * TODO: YUIDoc_comment
     *
     * @class DropdownView
     * @extends DOMElement
     * @constructor
     **/
    var DropdownView = (function () {

        var _super = Extend(DropdownView, DOMElement); // jshint ignore:line

        function DropdownView() { // jshint ignore:line
            _super.call(this);

            /**
             * TODO: YUIDoc_comment
             *
             * @property TITLE_TEXT
             * @type {string}
             * @constant
             */
            this.TITLE_TEXT = 'StructureJS Boilerplate (RequireJS)';

            /**
             * TODO: YUIDoc_comment
             *
             * @property _$loginBtn
             * @type {jQuery}
             * @private
             */
            this._$loginBtn = null;
        }

        /**
         * @overridden DOMElement.create
         */
        DropdownView.prototype.create = function () {
            _super.prototype.create.call(this, 'templates/precompile/login/LoginTemplate', {title: this.TITLE_TEXT});

            // Create or setup objects in this parent class.

            this._$loginBtn = this.$element.find('.js-loginBtn');
        };

        /**
         * @overridden DOMElement.enable
         */
        DropdownView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and/or add any event listeners.

            this._$loginBtn.addEventListener('click', this._onClick, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        DropdownView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and/or remove any event listeners.

            this._$loginBtn.removeEventListener('click', this._onClick, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.layout
         */
        DropdownView.prototype.layout = function () {
            // Layout or update the objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.destroy
         */
        DropdownView.prototype.destroy = function () {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _super.prototype.destroy.call(this);
        };

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onClick
         * @private
         */
        DropdownView.prototype._onClick = function(event) {
            event.preventDefault();

            alert('Sign In Button Clicked')
        };

        return DropdownView;
    })();

    module.exports = DropdownView;

});
