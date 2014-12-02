define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var MenuTemplate = require('hbs!templates/menu/MenuTemplate');

    /**
     * TODO: YUIDoc_comment
     *
     * @class MenuView
     * @extends DOMElement
     * @constructor
     **/
    var MenuView = (function () {

        var _super = Extend(MenuView, DOMElement);

        function MenuView() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        MenuView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, MenuTemplate);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        MenuView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        MenuView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        MenuView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        MenuView.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return MenuView;
    })();

    module.exports = MenuView;

});
