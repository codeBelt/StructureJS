define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var HeaderTemplate = require('hbs!templates/header/HeaderTemplate');

    /**
     * YUIDoc_comment
     *
     * @class HeaderView
     * @extends DOMElement
     * @constructor
     **/
    var HeaderView = (function () {

        var _super = Extend(HeaderView, DOMElement);

        function HeaderView() {
            _super.call(this);

            /**
             * @property _$navLinks
             * @type {jQuery}
             * @private
             */
            this._$navLinks = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        HeaderView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, HeaderTemplate);

            this._$navLinks = this.$element.find('#js-nav li');
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        HeaderView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        HeaderView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        HeaderView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        HeaderView.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        /**
         * YUIDoc_comment
         *
         * @method updateNavigation
         * @public
         */
        HeaderView.prototype.updateNavigation = function(pageId) {
            var $navItem = this._$navLinks.find('a[href*="' + pageId + '"]');

            // Make all nav item not active.
            this._$navLinks.removeClass('active');

            if ($navItem.length != 0) {
                // Make the found nav item active that matches the route.
                $navItem.parent()
                        .addClass('active');
            } else {
                // If there was no match then make the first nav item active.
                this._$navLinks.first()
                               .addClass('active');
            }
        };

        return HeaderView;
    })();

    module.exports = HeaderView;

});
