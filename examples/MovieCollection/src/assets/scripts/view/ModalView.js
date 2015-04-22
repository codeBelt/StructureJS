define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    /**
     * YUIDoc_comment
     *
     * @class ModalView
     * @extends DOMElement
     * @constructor
     **/
    var ModalView = (function () {

        var _super = Extend(ModalView, DOMElement);

        function ModalView() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ModalView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, 'templates/ModalTemplate', {error: 'Robert is cool'});

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        ModalView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ModalView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ModalView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        ModalView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            // Destroy the child objects and references in this parent class to prevent memory leaks.
        };

        return ModalView;
    })();

    module.exports = ModalView;

});