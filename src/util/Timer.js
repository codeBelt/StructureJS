define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Extend = require('structurejs/util/Extend');
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var TimerEvent = require('structurejs/event/TimerEvent');

    /**
     * Constructs a new Timer object with the specified delay and repeatCount states.
     *
     * @class Timer
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     **/
    var Timer = (function () {

        var _super = Extend(Timer, EventDispatcher);

        function Timer(delay, repeatCount) {
            if (typeof repeatCount === "undefined") { repeatCount = 0; }
            _super.call(this);
            /**
             * A reference to the setInterval object.
             *
             * @property _timer
             * @type {Function}
             * @private
             */
            this._timer = null;
            /**
             * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
             *
             * @property currentCount
             * @type {int}
             * @private
             */
            this._currentCount = 0;
            /**
             * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
             * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
             *
             * @property delay
             * @type {number}
             * @private
             */
            this._delay = null;
            /**
             * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
             *
             * @property repeatCount
             * @type {int}
             * @private
             */
            this._repeatCount = 0;
            /**
             * The timer's current state; true if the timer is running, otherwise false.
             *
             * @property running
             * @type {boolean}
             * @readOnly
             */
            this.running = false;

            this._delay = delay;
            this._repeatCount = repeatCount;
            this._currentCount = repeatCount;
        }
        /**
         * Returns the total number of times the timer has fired since it started at zero.
         *
         * @method getCurrentCount
         * @returns {number} The total number of times the timer has fired since it started at zero.
         */
        Timer.prototype.getCurrentCount = function () {
            return this._currentCount;
        };

        /**
         * Returns the delay time in milliseconds.
         *
         * @method getDelay
         * @returns {number} Returns the delay time in milliseconds.
         */
        Timer.prototype.getDelay = function () {
            return this._delay;
        };

        /**
         * Sets the delay, in milliseconds, between timer events.
         *
         * @method setDelay
         * @param value {number}
         */
        Timer.prototype.setDelay = function (value) {
            this.stop();
            this._delay = value;
            this.start();

            return this;
        };

        /**
         * Returns the total number of times the timer is set to run.
         *
         * @method getRepeatCount
         * @returns {number} Returns the total number of times the timer is set to run.
         */
        Timer.prototype.getRepeatCount = function () {
            return this._repeatCount;
        };

        /**
         * Set the total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
         *
         * @method setRepeatCount
         * @param value {number}
         */
        Timer.prototype.setRepeatCount = function (value) {
            this.stop();
            this._repeatCount = value;
            this._currentCount = value;
            this.start();

            return this;
        };

        /**
         * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
         *
         * @method reset
         */
        Timer.prototype.reset = function () {
            this.stop();
            this._currentCount = this._repeatCount;
            this.start();

            return this;
        };

        /**
         * Starts the timer, if it is not already running.
         *
         * @method start
         */
        Timer.prototype.start = function () {
            var _this = this;
            if (this.running) {
                return this;
            }

            this._timer = setInterval(function () {
                _this.decrementCounter();
            }, this._delay);

            this.running = true;

            return this;
        };

        /**
         * Stops the timer.
         *
         * @method stop
         */
        Timer.prototype.stop = function () {
            clearInterval(this._timer);
            this.running = false;

            return this;
        };

        /**
         *
         * @method decrementCounter
         * @private
         */
        Timer.prototype.decrementCounter = function () {
            if (this._currentCount > 0) {
                this._currentCount--;
            }

            if (this._delay && this._currentCount > 0 || this._repeatCount === 0) {
                this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
            } else {
                this.stop();
                this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
                this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
            }
        };

        /**
         * @overridden EventDispatcher.destroy
         */
        Timer.prototype.destroy = function () {
            this.stop();

            _super.prototype.destroy.call(this);
        };
        return Timer;
    })();

    module.exports = Timer;

});