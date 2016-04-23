var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/EventDispatcher', '../event/TimerEvent'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var TimerEvent_1 = require('../event/TimerEvent');
    /**
     * Constructs a new Timer object with the specified delay and repeatCount states.
     *
     * @class Timer
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @requires Extend
     * @requires EventDispatcher
     * @requires TimerEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            _super.call(this);
            /**
             * A reference to the setInterval object.
             *
             * @property _timer
             * @type {Function}
             * @protected
             */
            this._timer = null;
            /**
             * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
             *
             * @property currentCount
             * @type {int}
             * @protected
             */
            this._currentCount = 0;
            /**
             * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
             * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
             *
             * @property delay
             * @type {number}
             * @protected
             */
            this._delay = null;
            /**
             * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
             *
             * @property repeatCount
             * @type {int}
             * @protected
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
                _this._decrementCounter();
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
         * @method _decrementCounter
         * @protected
         */
        Timer.prototype._decrementCounter = function () {
            if (this._currentCount > 0) {
                this._currentCount--;
            }
            if (this._delay && this._currentCount > 0 || this._repeatCount === 0) {
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER));
            }
            else {
                this.stop();
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER));
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER_COMPLETE));
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
    }(EventDispatcher_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Timer;
});
