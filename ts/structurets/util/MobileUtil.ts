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

/**
 * The MobileUtil...
 *
 * @class MobileUtil
 * @module StructureJS
 * @submodule util
 * @constructor
 **/
class MobileUtil
{
    constructor()
    {
    }

    public static isAndroid():boolean
    {
        return !!navigator.userAgent.match(/Android/i);
    }

    public static isBlackBerry():boolean
    {
        return Boolean(!!navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/BB10; Touch/));
    }

    public static isiOS():boolean
    {
        return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }

    public static isOpera():boolean
    {
        return !!navigator.userAgent.match(/Opera Mini/i);
    }

    public static isWindows():boolean
    {
        return !!navigator.userAgent.match(/IEMobile/i);
    }

    public static isMobile():boolean
    {
        return (MobileUtil.isAndroid() || MobileUtil.isBlackBerry() || MobileUtil.isiOS() || MobileUtil.isOpera() || MobileUtil.isWindows());
    }

}

export = MobileUtil;