define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var HomeTemplates = require('hbs!templates/home/HomeTemplate');

    /**
     * TODO: YUIDoc_comment
     *
     * @class HomeView
     * @extends DOMElement
     * @constructor
     **/
    var HomeView = (function () {

        var _super = Extend(HomeView, DOMElement);

        function HomeView() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.create
         */
        HomeView.prototype.create = function () {
            _super.prototype.create.call(this, HomeTemplates);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layout
         */
        HomeView.prototype.layout = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        HomeView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        HomeView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        HomeView.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return HomeView;
    })();

    module.exports = HomeView;

});
