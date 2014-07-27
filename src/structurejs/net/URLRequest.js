define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var jQuery = require('jquery');
    var Extend = require('structurejs/util/Extend');
    var EventDispatcher = require('structurejs/event/EventDispatcher');
    var URLRequestMethod = require('structurejs/net/URLRequestMethod');
    var URLContentType = require('structurejs/net/URLContentType');

    /**
     * YUIDoc_comment
     *
     * @class URLContentType
     * @module StructureJS
     * @extends EventDispatcher
     * @submodule net
     * @constructor
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
            this.url = url;

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
        }

        return URLRequest;
    })();

    module.exports = URLRequest;

});
