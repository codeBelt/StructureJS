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

import ValueObject = require('../ValueObject')

class LanguageConfigVO extends ValueObject
{
    public id:string;
    public lang:string;
    public text:string;
    public path:string;

    /**
     * YUIDoc_comment
     *
     * @class LanguageConfigVO
     * @param [data] {any} Provide a way to update the value object upon initialization.
     * @constructor
     * @module StructureTS
     * @version 0.1.0
     **/
    constructor(data:any = null)
    {
        super();

        if (data)
        {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    public update(data:any):any
    {
        this.id = data.id;
        this.lang = data.lang;
        this.text = data.text;
        this.path = data.path;

        return this;
    }

    /**
     * @overridden ValueObject.copy
     */
    public copy():LanguageConfigVO
    {
        var data:IValueObject = super.copy();
        return new LanguageConfigVO(data);
    }

}
export = LanguageConfigVO;