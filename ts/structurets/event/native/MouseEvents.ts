/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
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

export class MouseEvents
{
    /**
     * The event occurs when the user clicks on an element.
     *
     * @property CLICK
     * @type {string}
     * @static
     */
    public static CLICK:string = 'click';

    /**
     * The event occurs when the user double-clicks on an element.
     *
     * @property DBL_CLICK
     * @type {string}
     * @static
     */
    public static DBL_CLICK:string = 'dblclick';

    /**
     * The event occurs when a user presses a mouse button over an element.
     *
     * @property MOUSE_DOWN
     * @type {string}
     * @static
     */
    public static MOUSE_DOWN:string = 'mousedown';

    /**
     * The event occurs when the pointer is moving while it is over an element.
     *
     * @property MOUSE_MOVE
     * @type {string}
     * @static
     */
    public static MOUSE_MOVE:string = 'mousemove';

    /**
     * The event occurs when the pointer is moved onto an element.
     *
     * @property MOUSE_OVER
     * @type {string}
     * @static
     */
    public static MOUSE_OVER:string = 'mouseover';

    /**
     * The event occurs when a user moves the mouse pointer out of an element.
     *
     * @property MOUSE_OUT
     * @type {string}
     * @static
     */
    public static MOUSE_OUT:string = 'mouseout';

    /**
     * The event occurs when a user releases a mouse button over an element
     *
     * @property MOUSE_UP
     * @type {string}
     * @static
     */
    public static MOUSE_UP:string = 'mouseup';

    /**
     *
     *
     * @property TAP
     * @type {string}
     * @static
     */
    public static TAP:string = 'tap';

}
export = MouseEvents;