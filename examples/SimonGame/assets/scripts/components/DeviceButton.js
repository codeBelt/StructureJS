define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var BaseEvent = require('structurejs/event/BaseEvent');

    var DeviceButtonTemplate = require('hbs!templates/DeviceButtonTemplate');
    var GameVO = require('model/GameVO');

    /**
     * A generic button class to be used to create the four different colored buttons.
     *
     * @class DeviceButton
     * @extends DOMElement
     * @constructor
     **/
    var DeviceButton = (function () {

        var _super = Extend(DeviceButton, DOMElement);

        function DeviceButton(color, index) {
            _super.call(this);

            /**
             * @property _color
             * @type {string}
             * @private
             */
            this._color = color;

            /**
             * @property _indexId
             * @type {number}
             * @public
             */
            this._indexId = index;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        DeviceButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, DeviceButtonTemplate, {buttonColor: this._color});// Example of passing a template in.

        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        DeviceButton.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        DeviceButton.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            this.$element.addEventListener('click', this._onClick, this);
            this.$element.css('cursor','pointer');

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        DeviceButton.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            this.$element.removeEventListener('click', this._onClick, this);
            this.$element.css('cursor','default');

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        DeviceButton.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

        };

        /**
         * A helper method to trigger the CSS transitions.
         *
         * @method animate
         * @public
         */
        DeviceButton.prototype.animate = function () {
            this.$element.addClass('active');

            setTimeout(function() {
                this.$element.removeClass('active');
            }.bind(this), 250);
        };

        /**
         * On click of the button it will animate itself and dispatch an event so the SimonApp
         * can respond to the CHANGE event. Probably should of create and dispatched a custom event.
         *
         * @method _onClick
         * @param event {jQueryEventObject}
         * @private
         */
        DeviceButton.prototype._onClick = function (event) {
            event.preventDefault();

            this.animate();

            var gameVO = new GameVO();
            gameVO.buttonIndex = this._indexId;

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, gameVO));
        };

        return DeviceButton;
    })();

    module.exports = DeviceButton;

});
