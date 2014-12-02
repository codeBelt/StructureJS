define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var Router = require('structurejs/controller/Router');
    var FooterTemplate = require('hbs!templates/footer/FooterTemplate');

    /**
     * TODO: YUIDoc_comment
     *
     * @class FooterView
     * @extends DOMElement
     * @constructor
     **/
    var FooterView = (function () {

        var _super = Extend(FooterView, DOMElement);

        function FooterView() {
            _super.call(this);

            /**
             * TODO: YUIDoc_comment
             *
             * @property _$footerLinks
             * @type {jQuery}
             * @private
             */
            this._$footerLinks = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        FooterView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, FooterTemplate);

            this._$footerLinks = this.$element.find('.js-href');
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        FooterView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        FooterView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            this._$footerLinks.addEventListener('click', this._onClick, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        FooterView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            this._$footerLinks.removeEventListener('click', this._onClick, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        FooterView.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onClick
         * @param event {jQueryEventObject}
         * @private
         */
        FooterView.prototype._onClick = function(event) {
            event.preventDefault();

            // This changes the application to not use the browser hash change event.
            Router.useDeepLinking = false;
            //Router.allowManualDeepLinking = false;

            var $target = $(event.target);

            Router.navigateTo($target.attr('href'));
        };

        return FooterView;
    })();

    module.exports = FooterView;

});
