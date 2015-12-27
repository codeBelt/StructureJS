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
        }

        /**
         * @overridden DOMElement.create
         */
        DropdownView.prototype.create = function () {
            _super.prototype.create.call(this, '#dropdownView-inlineTemplate');

            // Create or setup objects in this parent class.
        };

        /**
         * @overridden DOMElement.enable
         */
        DropdownView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and/or add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        DropdownView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and/or remove any event listeners.

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

        return DropdownView;
    })();

    module.exports = DropdownView;

});
