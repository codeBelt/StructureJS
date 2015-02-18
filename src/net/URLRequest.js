/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../net/URLRequestMethod', '../net/URLContentType'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../BaseObject'), require('../net/URLRequestMethod'), require('../net/URLContentType'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.URLRequest = factory(root.structurejs.Extend, root.structurejs.BaseObject, root.structurejs.URLRequestMethod, root.structurejs.URLContentType);
    }
}(this, function(Extend, BaseObject, URLRequestMethod, URLContentType) {
    'use strict';

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
    var URLRequest = (function () {

        var _super = Extend(URLRequest, BaseObject);

        function URLRequest(url) {
            if (url === void 0) { url = null; }
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

    return URLRequest;
}));