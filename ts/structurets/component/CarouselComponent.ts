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

import EventDispatcher = require("../event/EventDispatcher");
import CarouselEvent = require("../event/CarouselEvent");
import DOMElement = require("../display/DOMElement");

class CarouselComponent extends EventDispatcher
{
    public static DIRECTION_LEFT:string = 'directionLeft';
    public static DIRECTION_RIGHT:string = 'directionRight';

    private _numberOfItems:number = -1;
    private _widthOfItem:number = -1;
    private _heightOfItem:number = -1;
    private _itemsVisible:number = -1;

    private _container:DOMElement;

    private _leftOffset:number = 0;

    private _currentIndex:number = 0;
    private _maxIndex:number = 0;
    private _isMoving:boolean = false;
    private _direction:string = null;

    public timelineMax:TimelineMax = null;

    public loop:boolean = false;
    public crazy:boolean = false;

    /**
     * YUIDoc_comment
     *
     * @class CarouselComponent
     * @extends EventDispatcher
     * @constructor
     * @version 0.1.0
     **/
    constructor(itemWidth, itemHeight, totalItemsVisible, container)
    {
        super();

        this._widthOfItem = itemWidth;
        this._heightOfItem = itemHeight;
        this._itemsVisible = totalItemsVisible;
        this._container = container;

        this.update();
    }

    /**
     * YUIDoc_comment
     *
     * @method update
     */
    public update()
    {
        this._container.getChildren();
        this._numberOfItems = this._container.numChildren;
        this._maxIndex = Math.floor((this._numberOfItems - 1) / this._itemsVisible);
        this._container.$element.width(this._numberOfItems * this._widthOfItem);
    }

    /**
     *
     * @method transitionTo
     * @private
     */
    private transitionTo(index):void
    {
        this._currentIndex = index;
        this.transition();

        if (this._currentIndex == 0)
        {
            this.dispatchEvent(new CarouselEvent(CarouselEvent.BEGIN));
            //console.log('CarouselEvent.BEGIN');
        }
        if (this._currentIndex == this._maxIndex)
        {
            this.dispatchEvent(new CarouselEvent(CarouselEvent.END));
            //console.log('CarouselEvent.END');
        }
    }

    /**
     *
     * @method transition
     * @protected
     */
    public transition():void
    {
        var position:number;

        this._isMoving = true;

        if (this.loop)
        {
            var slideWidth:number = this._widthOfItem * this._itemsVisible;
            if (this._direction == CarouselComponent.DIRECTION_RIGHT)
            {
                (<HTMLScriptElement>this._container.element).style.left = -slideWidth + 'px';
                for (var i:number = 0; i < this._itemsVisible; i++)
                {
                    this._container.addChildAt(this._container.getChildAt(this._container.numChildren - 1), 0);
                }
                position = 0;
            }
            else
            {
                position = -(slideWidth);
            }
        }
        else
        {
            var numberOfFullTransitions:number = Math.floor(this._numberOfItems / this._itemsVisible);
            var itemsLeftOver:number = this._numberOfItems - (numberOfFullTransitions * this._itemsVisible);
            var numOfSlidesLeft:number = this._maxIndex - this._currentIndex;
            var slideWidth:number = this._widthOfItem * this._itemsVisible;
            var removeAmount:number = (numOfSlidesLeft === 0) ? slideWidth - (this._widthOfItem * itemsLeftOver) : 0;
            position = -(slideWidth * this._currentIndex - removeAmount);
        }

        var varsObject = {
            onStart: this.onTweenStart,
            onStartScope: this,
            onUpdate: this.onTweenProgress,
            onUpdateScope: this,
            onComplete: this.onTweenComplete,
            onCompleteScope: this
        }
        this.timelineMax = new TimelineMax(varsObject);
        this.timelineMax.to(this._container.$element, 0.6, {left: position, ease: Cubic.easeOut});

        this.dispatchEvent(new CarouselEvent(CarouselEvent.CHANGE));
        //console.log('CarouselEvent.CHANGE');
    }

    /**
     *
     * @method transitionTo
     * @private
     */
    private moveNext():void
    {
        var totalMoves = Math.floor(this._numberOfItems / this._itemsVisible);

        if (this.crazy == false)
        {
            if (this._currentIndex == totalMoves && this.loop == false || this._isMoving && this.loop)
            {
                return;
            }
        }

        this._currentIndex++;
        if (this._currentIndex > totalMoves)
        {
            this._currentIndex = 0;
        }

        this._direction = CarouselComponent.DIRECTION_LEFT;
        this.transitionTo(this._currentIndex);
        this.dispatchEvent(new CarouselEvent(CarouselEvent.NEXT));
        //console.log('CarouselEvent.NEXT');
    }

    /**
     *
     * @method transitionTo
     * @private
     */
    private movePrevious():void
    {
        if (this.crazy == false)
        {
            if (this._currentIndex == 0 && this.loop == false || this._isMoving && this.loop)
            {
                return;
            }
        }

        this._currentIndex--;
        if (this._currentIndex < 0)
        {
            this._currentIndex = this._maxIndex;
        }

        this._direction = CarouselComponent.DIRECTION_RIGHT;
        this.transitionTo(this._currentIndex);
        this.dispatchEvent(new CarouselEvent(CarouselEvent.PREVIOUS));
        //console.log('CarouselEvent.PREVIOUS');
    }

    /**
     *
     * @method transitionTo
     * @private
     */
    private onTweenStart():void
    {
//        this.tweenProgressTimer = this.onTweenProgress.periodical(10, this);
//        this.dispatchEvent(new CarouselEvent(CarouselEvent.START));
//        //console.log('CarouselEvent.START');

    }

    /**
     *
     * @method transitionTo
     * @private
     */
    private onTweenComplete():void
    {
//        clearInterval(this.tweenProgressTimer);
//
        this._isMoving = false;

        if (this.loop && this._direction == CarouselComponent.DIRECTION_LEFT)
        {
            (<HTMLScriptElement>this._container.element).style.left = '0';
            for (var i:number = 0; i < this._itemsVisible; i++)
            {
                this._container.addChild(this._container.getChildAt(0));
            }
        }

        //console.log('CarouselEvent.COMPLETE');
        this.dispatchEvent(new CarouselEvent(CarouselEvent.COMPLETE));
    }

    /**
     *
     * @method onTweenProgress
     * @private
     */
    private onTweenProgress():void
    {
        this.dispatchEvent(new CarouselEvent(CarouselEvent.PROGRESS, false, false, this.getPercent()));
    }

    /**
     *
     * @method prev
     */
    public prev():any
    {
        this.stop();
        this.movePrevious();

        return this;
    }

    /**
     *
     * @method next
     */
    public next():any
    {
        this.stop();
        this.moveNext();

        return this;
    }

    /**
     *
     * @method moveTo
     * @params index {number}
     */
    public moveTo(index:number):any
    {
        this.stop();
        this.transitionTo(index);

        return this;
    }

    /**
     *
     * @method play
     */
    public play():any
    {
        this.stop();
//        this.autoSlideTimer = this.moveNext.periodical(this.options.speed, this);
        return this;
    }

    /**
     *
     * @method transitionTo
     */
    public stop():any
    {
//        clearInterval(this.autoSlideTimer);
        return this;
    }

    public setPercent(value):any
    {
//        this.movedPercent = value;
//
//        var maskWidth = this.width();
//        var distance = (this.movedPercent / 100) * (maskWidth - this.carouselWidth);
//        this.carouselWrapper.style("left", distance);

        return this;
    }

    getPercent()
    {
//        var maskX = this.mainElement.getPosition("left").x;
//        var maskWidth = this.width();
//        var leftMargin = 80;
//        var carouselX = (this.carouselWrapper.getPosition("left").x - leftMargin) - maskX;
//        this.movedPercent = (carouselX / (maskWidth - this.carouselWidth)) * 100;
//
//        return Math.round(this.movedPercent);
    }

    getDropTargets()
    {
//        return this.getChild("ul").getChildren(".drop-target")
    }

}

export = CarouselComponent;