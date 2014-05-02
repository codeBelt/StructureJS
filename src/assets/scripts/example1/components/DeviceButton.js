define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var DeviceButtonTemplate = require('hbs!templates/DeviceButtonTemplate');
    var GameVO = require('example1/model/GameVO');

    /**
     * YUIDoc_comment
     *
     * @class DeviceButton
     * @extends DOMElement
     * @constructor
     **/
    var DeviceButton = (function () {

        var _super = Extend(DeviceButton, DOMElement);

        function DeviceButton(color, index) {
            _super.call(this, DeviceButtonTemplate, {buttonColor: color});

            /**
             * YUIDoc_comment
             *
             * @property indexId
             * @type {number}
             * @public
             */
            this.indexId = index;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        DeviceButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        DeviceButton.prototype.layoutChildren = function () {

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        DeviceButton.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this.$element.addEventListener('click', this.onClick, this);
            this.$element.css('cursor','pointer');

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        DeviceButton.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.$element.removeEventListener('click', this.onClick, this);
            this.$element.css('cursor','none');

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        DeviceButton.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

        };

        /**
         * YUIDoc_comment
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
         * YUIDoc_comment
         *
         * @method onClick
         * @private
         */
        DeviceButton.prototype.onClick = function (event) {
            this.animate();

            var gameVO = new GameVO();
            gameVO.buttonIndex = this.indexId;

            this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, gameVO));
        };

        return DeviceButton;
    })();

    module.exports = DeviceButton;

});
