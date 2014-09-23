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
        root.structurejs.URLLoaderDataFormat = factory();
    }
}(this, function() {
    'use strict';

    /**
     * The URLLoaderDataFormat...
     *
     * @class URLLoaderDataFormat
     * @module StructureJS
     * @submodule net
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var URLLoaderDataFormat = (function () {

        function URLLoaderDataFormat() {
        }
        URLLoaderDataFormat.XML = "xml";
        URLLoaderDataFormat.HTML = "html";
        URLLoaderDataFormat.SCRIPT = "script";
        URLLoaderDataFormat.JSON = "json";
        URLLoaderDataFormat.JSONP = "jsonp";
        URLLoaderDataFormat.TEXT = "text";
        return URLLoaderDataFormat;
    })();

    return URLLoaderDataFormat;
}));