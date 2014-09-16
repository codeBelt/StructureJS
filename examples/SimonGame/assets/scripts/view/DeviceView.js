define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');

    var DeviceButton = require('components/DeviceButton');

    /**
     * The parent view that holds onto the colored buttons.
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
             * @property _redButton
             * @type {DeviceButton}
             * @private
             */
            this._redButton = null;

            /**
             * @property _greenButton
             * @type {DeviceButton}
             * @private
             */
            this._greenButton = null;

            /**
             * @property _yellowButton
             * @type {DeviceButton}
             * @private
             */
            this._yellowButton = null;

            /**
             * @property _blueButton
             * @type {DeviceButton}
             * @private
             */
            this._blueButton = null;

            /**
             * A list of the buttons so we can get the correct one by this index
             * number being passed into animateButton method.
             *
             * @property _buttonList
             * @type {DeviceButton[]}
             * @private
             */
            this._buttonList = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        DeviceView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._buttonList = [];

            this._blueButton = new DeviceButton('blue', 0);
            this.addChild(this._blueButton);

            this._redButton = new DeviceButton('red', 1);
            this.addChildAt(this._redButton, 0);// Example of the addChildAt method.

            this._greenButton = new DeviceButton('green', 2);
            this.addChild(this._greenButton);

            this._yellowButton = new DeviceButton('yellow', 3);
            this.addChild(this._yellowButton);

            this.swapChildren(this._blueButton, this._greenButton);// Example of the swapChildren method.

            // Hold on to the colored buttons in the same order as there index id.
            this._buttonList.push(this._blueButton);
            this._buttonList.push(this._redButton);
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
         * This method accepts a index position for the _buttonList array and will
         * call the animate method on that button.
         *
         * @method animateButton
         * @param buttonIndex {int}
         * @public
         */
        DeviceView.prototype.animateButton = function (buttonIndex) {
            var deviceButton = this._buttonList[buttonIndex];
            deviceButton.animate();
        };

        return DeviceView;
    })();

    module.exports = DeviceView;

});
