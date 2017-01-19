import EventDispatcher from '../event/EventDispatcher';
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
declare class Timer extends EventDispatcher {
    /**
     * A reference to the setInterval object.
     *
     * @property _timer
     * @type {Function}
     * @protected
     */
    protected _timer: any;
    /**
     * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
     *
     * @property currentCount
     * @type {int}
     * @protected
     */
    protected _currentCount: number;
    /**
     * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
     * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
     *
     * @property delay
     * @type {number}
     * @protected
     */
    protected _delay: number;
    /**
     * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
     *
     * @property repeatCount
     * @type {int}
     * @protected
     */
    protected _repeatCount: number;
    /**
     * The timer's current state; true if the timer is running, otherwise false.
     *
     * @property running
     * @type {boolean}
     * @readOnly
     */
    running: boolean;
    constructor(delay: number, repeatCount?: number);
    /**
     * Returns the total number of times the timer has fired since it started at zero.
     *
     * @method getCurrentCount
     * @returns {number} The total number of times the timer has fired since it started at zero.
     */
    getCurrentCount(): number;
    /**
     * Returns the delay time in milliseconds.
     *
     * @method getDelay
     * @returns {number} Returns the delay time in milliseconds.
     */
    getDelay(): number;
    /**
     * Sets the delay, in milliseconds, between timer events.
     *
     * @method setDelay
     * @param value {number}
     */
    setDelay(value: number): any;
    /**
     * Returns the total number of times the timer is set to run.
     *
     * @method getRepeatCount
     * @returns {number} Returns the total number of times the timer is set to run.
     */
    getRepeatCount(): number;
    /**
     * Set the total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
     *
     * @method setRepeatCount
     * @param value {number}
     */
    setRepeatCount(value: number): any;
    /**
     * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
     *
     * @method reset
     */
    reset(): any;
    /**
     * Starts the timer, if it is not already running.
     *
     * @method start
     */
    start(): any;
    /**
     * Stops the timer.
     *
     * @method stop
     */
    stop(): any;
    /**
     *
     * @method _decrementCounter
     * @protected
     */
    protected _decrementCounter(): void;
    /**
     * @overridden EventDispatcher.destroy
     */
    destroy(): void;
}
export default Timer;
