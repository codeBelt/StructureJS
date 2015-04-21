define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var TemplateFactory = require('structurejs/util/TemplateFactory');

    /**
     * YUIDoc_comment
     *
     * @class ListView
     * @extends DOMElement
     * @constructor
     **/
    var ListView = (function () {

        var _super = Extend(ListView, DOMElement);

        function ListView($element) {
            _super.call(this, $element);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ListView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        ListView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ListView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ListView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method updateList
         * @public
         */
        ListView.prototype.updateList = function(movieModels) {
            var templateHtml = TemplateFactory.create('templates/ItemTemplate', movieModels);

            this.$element.html(templateHtml);
        };

        return ListView;
    })();

    module.exports = ListView;

});