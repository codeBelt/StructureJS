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

import BaseTransition = require('BaseTransition')
import ITransition = require('../../interface/ITransition')
import DisplayObjectContainer = require('../../display/DisplayObjectContainer')
import DOMElement = require('../../display/DOMElement')

class TransitionPushLeft extends BaseTransition
{
    /**
     * YUIDoc_comment
     *
     * @class TransitionPushLeft
     * @extends BaseTransition
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

    public createTransition(transitionType:string, viewContainer:DisplayObjectContainer, currentView:DOMElement, nextView:DOMElement, duration:number = 0.75):ITransition
    {
        // Immediately places the next view out of display bounds.
        TweenMax.to(nextView.$element, 0, {x: viewContainer.unscaledWidth});

        var varsObject = {
            onStart: this.onTweenStart,
            onStartScope: this,
            onUpdate: this.onTweenUpdate,
            onUpdateScope: this,
            onComplete: this.onTweenComplete,
            onCompleteScope: this
        }
        this.transition = new TimelineMax(varsObject);
        this.transition.add(new TweenMax(currentView.$element, duration, {x: -viewContainer.unscaledWidth, ease: Expo.easeInOut}), 0);
        this.transition.add(new TweenMax(nextView.$element, duration, {x: 0, ease: Expo.easeInOut}), 0);

        return this;
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        super.destroy();
    }

}
export = TransitionPushLeft;