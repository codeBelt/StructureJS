define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports

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

    module.exports = URLLoaderDataFormat;

});
