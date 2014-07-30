/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureJS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

import EventDispatcher = require('../event/EventDispatcher')
import TimerEvent = require('../event/TimerEvent')

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
class Timer extends EventDispatcher
{
    /**
     * A reference to the setInterval object.
     *
     * @property _timer
     * @type {Function}
     * @private
     */
    private _timer:any = null;

    /**
     * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
     *
     * @property currentCount
     * @type {int}
     * @private
     */
    private _currentCount:number = 0;

    /**
     * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
     * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
     *
     * @property delay
     * @type {number}
     * @private
     */
    private _delay:number = null;

    /**
     * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
     *
     * @property repeatCount
     * @type {int}
     * @private
     */
    private _repeatCount:number = 0;

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
        this.start();

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
            this.decrementCounter();
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
     * @method decrementCounter
     * @private
     */
    private decrementCounter()
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
export = Timer;