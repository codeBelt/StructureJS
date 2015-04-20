define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    /**
     * TODO: YUIDoc_comment
     *
     * @class ItemTemplate
     * @extends DOMElement
     * @constructor
     **/
    var ItemTemplate = (function () {

        var _super = Extend(ItemTemplate, DOMElement);

        function ItemTemplate() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ItemTemplate.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        ItemTemplate.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ItemTemplate.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ItemTemplate.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        ItemTemplate.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return ItemTemplate;
    })();

    module.exports = ItemTemplate;

});
