define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports

    /**
     * YUIDoc_comment
     *
     * @class URLLoaderDataFormat
     * @module StructureJS
     * @submodule net
     * @constructor
     **/
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
