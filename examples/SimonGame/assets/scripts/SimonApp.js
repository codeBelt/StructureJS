define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var DOMElement = require('structurejs/display/DOMElement');
    var Timer = require('structurejs/util/Timer');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var TimerEvent = require('structurejs/event/TimerEvent');

    var DeviceView = require('view/DeviceView');
    var GameVO = require('model/GameVO');

    /**
     * Application code for a memory skill game.
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
             * A view that contains the color buttons.
             *
             * @property _deviceView
             * @type {DeviceView}
             * @private
             */
            this._deviceView = null;

            /**
             * The white center button for the game to start the game.
             *
             * @property _centerDisplay
             * @type {DOMElement}
             * @private
             */
            this._centerDisplay = null;

            /**
             * Timer to play the sequence the user needs to remember.
             *
             * @property _timer
             * @type {Timer}
             * @private
             */
            this._timer = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        SimonApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            var $device = this.$element.find('.js-simonApp-device');

            this._deviceView = new DeviceView($device);
            this.addChild(this._deviceView);
            this._deviceView.disable();

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

            this.addEventListener(BaseEvent.CHANGE, this._onColorButt_onClick, this);

            this._centerDisplay.$element.addEventListener('click', this._onClick, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        SimonApp.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.removeEventListener(BaseEvent.CHANGE, this._onColorButt_onClick, this);

            this._centerDisplay.$element.removeEventListener('click', this._onClick, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        SimonApp.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            this._deviceView.destroy();
            this._deviceView = null;

            this._centerDisplay.destroy();
            this._centerDisplay = null;

            this._timer.destroy();
            this._timer = null;
        };

        /**
         * Each time the timer ticks this method is called and animates one of the colored buttons.
         *
         * @method _onTimer
         * @param event {TimerEvent}
         * @private
         */
        SimonApp.prototype._onTimer = function(event) {
            var timer = event.target;
            var sequenceSteps = this._memoryOrder.length - 1;
            var currentIndex = sequenceSteps - timer.getCurrentCount();
            var showItem = this._memoryOrder[currentIndex];

            this._deviceView.animateButton(showItem);
        };

        /**
         * When the memory sequence completes this method will enable the color buttons and
         * will update the white button text by calling the layoutChildren method.
         *
         * @method _onTimerComplete
         * @param event {TimerEvent}
         * @private
         */
        SimonApp.prototype._onTimerComplete = function(event) {
            this._timer.destroy();

            this._deviceView.enable();
            this.layoutChildren();
        };

        /**
         * For every CHANGE event that is dispatched by the DeviceButton's this method will help keep
         * track of the buttons clicked and then will determine if the user click the colored buttons
         * in the correct sequence.
         *
         * @method _onColorButt_onClick
         * @param event {BaseEvent}
         * @private
         */
        SimonApp.prototype._onColorButt_onClick = function(event) {
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
         * When the white center button is clicked this will set the memory sequence and start a timer
         * which will play the sequence for the user to remember.
         *
         * @method _onClick
         * @param event {jQueryEventObject}
         * @private
         */
        SimonApp.prototype._onClick = function(event) {
            event.preventDefault();

            this._centerDisplay.$element.text('');

            this._memoryOrder = [0,2,3,1,2,2];
            this._userSequence = [];

            this._timer =  new Timer(1500, this._memoryOrder.length);
            this._timer.addEventListener(TimerEvent.TIMER, this._onTimer, this);
            this._timer.addEventListener(TimerEvent.TIMER_COMPLETE, this._onTimerComplete, this);
            this._timer.start();
        };

        return SimonApp;
    })();

    module.exports = SimonApp;

});