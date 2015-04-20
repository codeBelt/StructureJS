///<reference path='../BaseObject.ts'/>
///<reference path='URLRequestMethod.ts'/>
///<reference path='URLContentType.ts'/>

/**
 * The URLRequest class captures all of the information in a single HTTP request.
 * URLRequest objects are passed to the load() methods of the {{#crossLink "URLLoader"}}{{/crossLink}} classes.
 *
 * @class URLRequest
 * @extends BaseObject
 * @param url [string=null] The URL to be requested. You can set the URL later by using the url property.
 * @module StructureJS
 * @submodule net
 * @requires Extend
 * @requires BaseObject
 * @requires URLRequestMethod
 * @requires URLContentType
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class URLRequest extends BaseObject
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
}