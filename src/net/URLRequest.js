define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var jQuery = require('jquery');
    var Extend = require('structurejs/util/Extend');
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var URLRequestMethod = require('structurejs/net/URLRequestMethod');
    var URLContentType = require('structurejs/net/URLContentType');

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
     * @author Robert S. (www.codeBelt.com)
     **/
    var URLRequest = (function () {

        var _super = Extend(URLRequest, EventDispatcher);

        function URLRequest(url) {
            if (typeof url === "undefined") { url = null; }
            _super.call(this);
            /**
             * The URL to be requested.
             *
             * @property url
             * @type {string}
             * @public
             */
            this.url = null;
            /**
             * Controls the HTTP form submission method ({{#crossLink "URLRequestMethod"}}{{/crossLink}}).
             *
             * @property method
             * @type {string}
             * @default URLRequestMethod.GET
             * @public
             */
            this.method = URLRequestMethod.GET;
            /**
             * The MIME content type of the content in the the data property ({{#crossLink "URLContentType"}}{{/crossLink}}).
             *
             * @property method
             * @type {string}
             * @default application/x-www-form-urlencoded
             * @public
             */
            this.contentType = URLContentType.DEFAULT;
            /**
             * An object containing data to be transmitted with the URL request.
             *
             * @property data
             * @type {any}
             * @public
             */
            this.data = null;
            this.url = url;
        }
        return URLRequest;
    })();

    module.exports = URLRequest;

});
