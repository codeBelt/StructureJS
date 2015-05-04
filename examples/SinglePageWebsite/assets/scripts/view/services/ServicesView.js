define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var ServiceTemplate = require('hbs!templates/services/ServicesTemplate');

    /**
     * TODO: YUIDoc_comment
     *
     * @class ServicesView
     * @extends DOMElement
     * @constructor
     **/
    var ServicesView = (function () {

        var _super = Extend(ServicesView, DOMElement);

        function ServicesView() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.create
         */
        ServicesView.prototype.create = function () {
            _super.prototype.create.call(this, ServiceTemplate);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layout
         */
        ServicesView.prototype.layout = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ServicesView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ServicesView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        ServicesView.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return ServicesView;
    })();

    module.exports = ServicesView;

});
