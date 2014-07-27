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

import BaseObject = require('../../BaseObject')
import EventDispatcher = require('../../event/EventDispatcher')
import ITransition = require('../../interface/ITransition')
import DisplayObjectContainer = require('../../display/DisplayObjectContainer')
import DOMElement = require('../../display/DOMElement')
import TweenEvent = require('../../event/TweenEvent')

class BaseTransition extends EventDispatcher implements ITransition
{
    /**
     * Property of the TimelineMax object.
     *
     * @property transition
     * @type {TimelineMax}
     * @readOnly
     */
    public transition:TimelineMax = null;

    /**
     * YUIDoc_comment
     *
     * @class BaseTransition
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule controller
     * @constructor
 * @author Robert S. (www.codeBelt.com)
     * @version 0.1.0
     **/
    constructor()
    {
        super();
    }

    /**
     * Creates and starts the transition for the specific transition type.
     *
     * @method createTransition
     * @param transitionType {string)
     * @param viewContainer {DisplayObjectContainer)
     * @param currentView {DOMElement)
     * @param nextView {DOMElement)
     * @param [duration=0.75] {number)
     * @returns {ITransition}
     */
    public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.75):ITransition
    {
        return this;
    }

    /**
     * Gets called by the TimelineMax object when the transition starts. Dispatches the TweenEvent.START event. The data value of the TweenEvent event is set to the TimelineMax object.
     *
     * @method onTweenStart
     * @returns {BaseTransition}
     * @protected
     * @chainable
     */
    public onTweenStart():any
    {
        this.dispatchEvent(new TweenEvent(TweenEvent.START, false, false, this.transition));

        return this;
    }

    /**
     * Gets called by the TimelineMax object every time the timeline updates (on every frame while the timeline is active). Dispatches the TweenEvent.START event. The data value of the TweenEvent event is set to the TimelineMax object.
     *
     * @method onTweenUpdate
     * @returns {BaseTransition}
     * @protected
     * @chainable
     */
    public onTweenUpdate():any
    {
        this.dispatchEvent(new TweenEvent(TweenEvent.UPDATE, false, false, this.transition));

        return this;
    }

    /**
     * Gets called by the TimelineMax object when the transition completes. Dispatches the TweenEvent.COMPLETE event. The data value of the TweenEvent event is set to the TimelineMax object.
     *
     * @method onTweenComplete
     * @returns {BaseTransition}
     * @protected
     * @chainable
     */
    public onTweenComplete():any
    {
        this.dispatchEvent(new TweenEvent(TweenEvent.COMPLETE, false, false, this.transition));

        return this;
    }

    /**
     * Tells TimelineMax to finishes/complete the transition right away.
     *
     * @method complete
     * @returns {BaseTransition}
     * @chainable
     */
    public complete():any
    {
        this.transition.progress(1);

        return this;
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        super.destroy();

        this.complete();
        this.transition = null;
    }

}
export = BaseTransition;