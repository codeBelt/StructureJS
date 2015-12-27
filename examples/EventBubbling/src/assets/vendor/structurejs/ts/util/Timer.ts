import EventDispatcher from '../event/EventDispatcher';
import TimerEvent from '../event/TimerEvent';

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
class Timer extends EventDispatcher
{
    /**
     * A reference to the setInterval object.
     *
     * @property _timer
     * @type {Function}
     * @protected
     */
    protected _timer:any = null;

    /**
     * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
     *
     * @property currentCount
     * @type {int}
     * @protected
     */
    protected _currentCount:number = 0;

    /**
     * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
     * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
     *
     * @property delay
     * @type {number}
     * @protected
     */
    protected _delay:number = null;

    /**
     * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
     *
     * @property repeatCount
     * @type {int}
     * @protected
     */
    protected _repeatCount:number = 0;

    /**
     * The timer's current state; true if the timer is running, otherwise false.
     *
     * @property running
     * @type {boolean}
     * @readOnly
     */
    public running:boolean = false;

    constructor(delay:number, repeatCount:number = 0)
    {
        super();

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
    public getCurrentCount():number
    {
        return this._currentCount;
    }

    /**
     * Returns the delay time in milliseconds.
     *
     * @method getDelay
     * @returns {number} Returns the delay time in milliseconds.
     */
    public getDelay():number
    {
        return this._delay;
    }

    /**
     * Sets the delay, in milliseconds, between timer events.
     *
     * @method setDelay
     * @param value {number}
     */
    public setDelay(value:number):any
    {
        this.stop();
        this._delay = value;
        this.start();

        return this;
    }

    /**
     * Returns the total number of times the timer is set to run.
     *
     * @method getRepeatCount
     * @returns {number} Returns the total number of times the timer is set to run.
     */
    public getRepeatCount():number
    {
        return this._repeatCount;
    }

    /**
     * Set the total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
     *
     * @method setRepeatCount
     * @param value {number}
     */
    public setRepeatCount(value:number):any
    {
        this.stop();
        this._repeatCount = value;
        this._currentCount = value;
        this.start();

        return this;
    }

    /**
     * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
     *
     * @method reset
     */
    public reset():any
    {
        this.stop();
        this._currentCount = this._repeatCount;

        return this;
    }

    /**
     * Starts the timer, if it is not already running.
     *
     * @method start
     */
    public start():any
    {
        if (this.running)
        {
            return this;
        }

        this._timer = setInterval(() =>
        {
            this._decrementCounter();
        }, this._delay);

        this.running = true;

        return this;
    }

    /**
     * Stops the timer.
     *
     * @method stop
     */
    public stop():any
    {
        clearInterval(this._timer);
        this.running = false;

        return this;
    }

    /**
     *
     * @method _decrementCounter
     * @protected
     */
    protected _decrementCounter()
    {
        if (this._currentCount > 0)
        {
            this._currentCount--;
        }

        if (this._delay && this._currentCount > 0 || this._repeatCount === 0)
        {
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
        }
        else
        {
            this.stop();
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER));
            this.dispatchEvent(new TimerEvent(TimerEvent.TIMER_COMPLETE));
        }
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        this.stop();

        super.destroy();
    }
}

export default Timer;