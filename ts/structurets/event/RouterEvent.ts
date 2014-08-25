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

import BaseEvent = require('BaseEvent')

/**
 * The RouterEvent...
 *
 * @class RouterEvent
 * @extends BaseEvent
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: Bubbling will only work with DisplayObjectContainer classes throw the display list hierarchy. Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [url=null] {string}
 * @param [silent=false] {boolean} Indicates whether setting hash value should dispatching changed event within the {{#crossLink "RouterController"}}{{/crossLink}}.
 * @param [data=null] {any}
 * @module StructureJS
 * @submodule event
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class RouterEvent extends BaseEvent
{
    /**
     * YUIDoc_comment
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    public static CHANGE:string = 'RouterEvent.change';

    /**
     * YUIDoc_comment
     *
     * @property url
     * @type {string}
     * @public
     */
    public url:string = null;

    /**
     * YUIDoc_comment
     *
     * @property silent
     * @type {boolean}
     * @public
     */
    public silent:boolean = null;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, url:string = null, silent:boolean = false, data:any = null)
    {
        super(type, bubbles, cancelable, data);

        this.url = url;
        this.silent = silent;
    }

    /**
     * @overridden BaseEvent.clone
     */
    public clone():RouterEvent
    {
        return new RouterEvent(this.type, this.bubble, this.cancelable, this.url, this.silent, this.data);
    }

}
export = RouterEvent;