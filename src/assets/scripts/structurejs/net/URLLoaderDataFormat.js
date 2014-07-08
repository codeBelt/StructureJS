define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports

    /**
     * YUIDoc_comment
     *
     * @class URLLoaderDataFormat
     * @module StructureTS
     * @submodule net
     * @constructor
     **/
    var URLLoaderDataFormat = (function () {

        URLLoaderDataFormat.XML = "xml";
        URLLoaderDataFormat.HTML = "html";
        URLLoaderDataFormat.SCRIPT = "script";
        URLLoaderDataFormat.JSON = "json";
        URLLoaderDataFormat.JSONP = "jsonp";
        URLLoaderDataFormat.TEXT = "text";

        function URLLoaderDataFormat() {
        }

        return URLLoaderDataFormat;
    })();

    module.exports = URLLoaderDataFormat;

});
