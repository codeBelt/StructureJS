define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var DOMElement = require('structurejs/display/DOMElement');
    var Timer = require('structurejs/util/Timer');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var TimerEvent = require('structurejs/event/TimerEvent');
    var DeviceView = require('example1/view/DeviceView');
    var GameVO = require('example1/model/GameVO');

    /**
     * YUIDoc_comment
     *
     * @class SimonApp
     * @extends Stage
     * @constructor
     **/
    var SimonApp = (function () {

        var _super = Extend(SimonApp, Stage);

        function SimonApp() {
            _super.call(this);

            /**
             * YUIDoc_comment
             *
             * @property _deviceView
             * @type {DeviceView}
             * @private
             */
            this._deviceView = null;

            /**
             * YUIDoc_comment
             *
             * @property _centerDisplay
             * @type {DOMElement}
             * @private
             */
            this._centerDisplay = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        SimonApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            var $device = this.$element.find('.js-simonApp-device');

            this._deviceView = new DeviceView($device);
            this.addChild(this._deviceView);

            this._centerDisplay = new DOMElement('div', {'class': 'display'});
            this._deviceView.addChild(this._centerDisplay);
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        SimonApp.prototype.layoutChildren = function () {
            if (this._deviceView.isEnabled === true) {
                this._centerDisplay.$element.text('Go!');
            } else {
                this._centerDisplay.$element.text('Start!');
            }

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        SimonApp.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this._deviceView.addEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.addEventListener('click', this.onClick, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        SimonApp.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this._deviceView.removeEventListener(BaseEvent.CHANGE, this.onColorButtonClick, this);

            this._centerDisplay.$element.removeEventListener('click', this.onClick, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        SimonApp.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            // Destroy the child objects and references in this parent class to prevent memory leaks.
        };

        /**
         * YUIDoc_comment
         *
         * @method onTimer
         * @private
         */
        SimonApp.prototype.onTimer = function(event) {
            var timer = event.target;

            var currentIndex = (this._memoryOrder.length - 1) - timer.getCurrentCount();
            var showItem = this._memoryOrder[currentIndex];
            this._deviceView.animateButton(showItem);
        };

        /**
         * YUIDoc_comment
         *
         * @method onTimerComplete
         * @private
         */
        SimonApp.prototype.onTimerComplete = function(event) {
            this._timer.destroy();

            this._deviceView.enable();
            this.layoutChildren();
        };

        /**
         * YUIDoc_comment
         *
         * @method onColorButtonClick
         * @param event {BaseEvent}
         * @private
         */
        SimonApp.prototype.onColorButtonClick = function(event) {
            var gameVO = event.data;
            this._userSequence.push(gameVO.buttonIndex);

            if (this._userSequence.length === this._memoryOrder.length) {
                var isMatch = this._userSequence.toString() === this._memoryOrder.toString();
                if (isMatch) {
                    alert('You did it!');
                } else {
                    alert('Nope, you did not get it.');
                }
                this._userSequence = [];
                this._deviceView.disable();
                this.layoutChildren();
            }
        };

        /**
         * YUIDoc_comment
         *
         * @method onClick
         * @private
         */
        SimonApp.prototype.onClick = function(event) {
            this._centerDisplay.$element.text('');

            this._memoryOrder = [0,2,3,1,2,2];
            this._userSequence = [];

            this._timer =  new Timer(1500, this._memoryOrder.length);
            this._timer.addEventListener(TimerEvent.TIMER, this.onTimer, this);
            this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this._timer.start();
        };

        return SimonApp;
    })();

    module.exports = SimonApp;

});