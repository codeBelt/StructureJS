/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.URLRequestMethod = factory();
    }
}(this, function() {
    'use strict';

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

    return URLRequestMethod;
}));