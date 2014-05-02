define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var DeviceButton = require('example1/components/DeviceButton');

    /**
     * YUIDoc_comment
     *
     * @class DeviceView
     * @extends DOMElement
     * @constructor
     **/
    var DeviceView = (function () {

        var _super = Extend(DeviceView, DOMElement);

        function DeviceView($element) {
            _super.call(this, $element);

            /**
             * YUIDoc_comment
             *
             * @property _redButton
             * @type {DeviceButton}
             * @private
             */
            this._redButton = null;

            /**
             * YUIDoc_comment
             *
             * @property _greenButton
             * @type {DeviceButton}
             * @private
             */
            this._greenButton = null;

            /**
             * YUIDoc_comment
             *
             * @property _yellowButton
             * @type {DeviceButton}
             * @private
             */
            this._yellowButton = null;

            /**
             * YUIDoc_comment
             *
             * @property _blueButton
             * @type {DeviceButton}
             * @private
             */
            this._blueButton = null;

            /**
             * YUIDoc_comment
             *
             * @property buttonList
             * @type {DeviceButton[]}
             * @private
             */
            this.buttonList = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        DeviceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._buttonList = [];

            this._blueButton = new DeviceButton('blue', 0);
            this.addChildAt(this._blueButton, 0);

            this._redButton = new DeviceButton('red', 1);
            this.addChildAt(this._redButton, 0);

            this._greenButton = new DeviceButton('green', 2);
            this.addChild(this._greenButton);

            this._yellowButton = new DeviceButton('yellow', 3);
            this.addChild(this._yellowButton);

            this.swapChildren(this._blueButton, this._greenButton);

            this._buttonList.push(this._blueButton);
            this._buttonList.push(this._redButton)
            this._buttonList.push(this._greenButton);
            this._buttonList.push(this._yellowButton);
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        DeviceView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        DeviceView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this._redButton.enable();
            this._greenButton.enable();
            this._blueButton.enable();
            this._yellowButton.enable();

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        DeviceView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this._redButton.disable();
            this._greenButton.disable();
            this._blueButton.disable();
            this._yellowButton.disable();

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        DeviceView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._redButton.destroy();
            this._redButton = null;

            this._greenButton.destroy();
            this._greenButton = null;

            this._blueButton.destroy();
            this._blueButton = null;

            this._yellowButton.destroy();
            this._yellowButton = null;
        };


        /**
         * YUIDoc_comment
         *
         * @method animateButton
         * @param buttonIndex {number}
         * @private
         */
        DeviceView.prototype.animateButton = function (buttonIndex) {
            var deviceButton = this._buttonList[buttonIndex];
            deviceButton.animate();
        };

        return DeviceView;
    })();

    module.exports = DeviceView;

});
