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
import BaseEvent = require('../event/BaseEvent')
import MouseEvents = require('../event/native/MouseEvents')
import DOMElement = require('../display/DOMElement')

/**
 * YUIDoc_comment
 *
 * @class TabComponent
 * @extends EventDispatcher
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 **/
class TabComponent extends EventDispatcher
{
    /**
     * YUIDoc_comment
     *
     * @property _$container
     * @type {JQuery}
     * @private
     */
    private _$container:JQuery = null;

    /**
     * YUIDoc_comment
     *
     * @property _tabButtonAttributeName
     * @type {string}
     * @private
     */
    private _tabButtonAttributeName:string = null;

    /**
     * YUIDoc_comment
     *
     * @property _$tabButtons
     * @type {JQuery}
     * @private
     */
    private _$tabButtons:JQuery = null;

    /**
     * YUIDoc_comment
     *
     * @property _tabContentAttributeName
     * @type {string}
     * @private
     */
    private _tabContentAttributeName:string = null;

    /**
     * YUIDoc_comment
     *
     * @property _$tabContent
     * @type {JQuery}
     * @private
     */
    private _$tabContent:JQuery = null;

    /**
     * YUIDoc_comment
     *
     * @property activeClassName
     * @type {string}
     * @public
     */
    public activeClassName:string = 'active';

    constructor($container:JQuery, tabName:string = 'tabbutton', tabContent:string = 'tabcontent')
    {
        super();

        this._tabButtonAttributeName = tabName;
        this._tabContentAttributeName = tabContent;

        this._$container = $container;
        this._$tabButtons = this._$container.find('[data-' + this._tabButtonAttributeName + ']');
        this._$tabContent = this._$container.find('[data-' + this._tabContentAttributeName + ']');
    }

    /**
     * @overridden BaseObject.enable
     */
    public enable():void
    {
        if (this.isEnabled === true) return;

        this._$tabButtons.addEventListener(MouseEvents.TAP, this.onTabClick, this);

        super.enable();
    }

    /**
     * @overridden BaseObject.disable
     */
    public disable():void
    {
        if (this.isEnabled === false) return;

        this._$tabButtons.removeEventListener(MouseEvents.TAP, this.onTabClick, this);

        super.disable();
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        super.destroy();

        this._$container = null;
        this._$tabButtons = null;
        this._$tabContent = null;
    }

    public changeTabByIndex(index:number):void
    {
        this.changeTab(index);
        this.showContent(index);
    }

    private onTabClick(event:JQueryEventObject):void
    {
        event.preventDefault();

        var $currentTarget = jQuery(event.currentTarget);
        var tabIndex:number = $currentTarget.data(this._tabButtonAttributeName);
        this.changeTab(tabIndex);
        this.showContent(tabIndex);
    }

    private changeTab(index:number):void
    {
        this._$tabButtons.removeClass(this.activeClassName);

        var $tabButton = this._$tabButtons.siblings('[data-' + this._tabButtonAttributeName + '=' + index + ']');
        $tabButton.addClass(this.activeClassName);
    }

    private showContent(index:number):void
    {
        this._$tabContent.hide();

        var $contentForTabButton = this._$tabContent.siblings('[data-' + this._tabContentAttributeName + '=' + index + ']');
        $contentForTabButton.show();

        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
    }

}
export = TabComponent;