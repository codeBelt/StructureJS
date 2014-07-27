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

import BaseObject = require('../BaseObject')
import URLRequestMethod = require('URLRequestMethod')
import URLContentType = require('URLContentType')

/**
 * The URLRequest class captures all of the information in a single HTTP request.
 * URLRequest objects are passed to the load() methods of the {{#crossLink "URLLoader"}}{{/crossLink}} classes.
 *
 * @class URLRequest
 * @extends BaseObject
 * @param url [string=null] The URL to be requested. You can set the URL later by using the url property.
 * @module StructureJS
 * @submodule net
 * @constructor
 **/
class URLRequest extends BaseObject
{
    /**
     * The URL to be requested.
     *
     * @property url
     * @type {string}
     * @public
     */
    public url:string = null;

    /**
     * Controls the HTTP form submission method ({{#crossLink "URLRequestMethod"}}{{/crossLink}}).
     *
     * @property method
     * @type {string}
     * @default URLRequestMethod.GET
     * @public
     */
    public method:string = URLRequestMethod.GET;

    /**
     * The MIME content type of the content in the the data property ({{#crossLink "URLContentType"}}{{/crossLink}}).
     *
     * @property method
     * @type {string}
     * @default application/x-www-form-urlencoded
     * @public
     */
    public contentType:string = URLContentType.DEFAULT;

    /**
     * An object containing data to be transmitted with the URL request.
     *
     * @property data
     * @type {any}
     * @public
     */
    public data:any = null;

    constructor(url:string = null)
    {
        super();
        this.url = url;
    }
}
export = URLRequest;