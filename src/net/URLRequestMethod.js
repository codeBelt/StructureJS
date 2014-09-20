define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports

    /**
     * The URLRequestMethod...
     *
     * @class URLRequestMethod
     * @module StructureJS
     * @submodule net
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var URLRequestMethod = (function () {

        function URLRequestMethod() {
        }
        URLRequestMethod.DELETE = "DELETE";
        URLRequestMethod.GET = "GET";
        URLRequestMethod.POST = "POST";
        URLRequestMethod.PUT = "PUT";
        URLRequestMethod.HEAD = "HEAD";
        URLRequestMethod.OPTIONS = "OPTIONS";
        return URLRequestMethod;
    })();

    module.exports = URLRequestMethod;

});