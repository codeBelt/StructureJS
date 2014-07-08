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
     **/
    var URLRequestMethod = (function () {

        URLRequestMethod.CLASS_NAME = 'URLRequestMethod';

        URLRequestMethod.DELETE = "DELETE";
        URLRequestMethod.GET = "GET";
        URLRequestMethod.POST = "POST";
        URLRequestMethod.PUT = "PUT";
        URLRequestMethod.HEAD = "HEAD";
        URLRequestMethod.OPTIONS = "OPTIONS";

        function URLRequestMethod() {
        }

        return URLRequestMethod;
    })();

    module.exports = URLRequestMethod;

});