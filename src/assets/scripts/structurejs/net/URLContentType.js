define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports

    /**
     * YUIDoc_comment
     *
     * @class URLContentType
     * @module StructureJS
     * @submodule net
     * @constructor
     **/
    var URLContentType = (function () {

        function URLContentType() {
        }

        URLContentType.DEFAULT = "application/x-www-form-urlencoded";
        URLContentType.ATOM = "application/atom+xml";
        URLContentType.JSON = "application/json";
        URLContentType.PDF = "application/pdf";
        URLContentType.RDF = "application/rdf+xml";
        URLContentType.RSS = "application/rss+xml";
        URLContentType.SOAP = "application/soap+xml";
        URLContentType.FONT_WOFF = "application/font-woff";
        URLContentType.XML = "application/xml";
        URLContentType.XHTML = "application/xhtml+xml";
        URLContentType.ZIP = "application/zip";
        URLContentType.GZIP = "application/gzip";

        URLContentType.BASIC = "audio/basic";
        URLContentType.L24 = "audio/L24";
        URLContentType.MP4 = "audio/mp4";
        URLContentType.MP3 = "audio/mpeg";
        URLContentType.MPEG = "audio/mpeg";
        URLContentType.OGG = "audio/ogg";
        URLContentType.VORBIS = "audio/vorbis";
        URLContentType.REAL_AUDIO = "audio/vnd.rn-realaudio";
        URLContentType.WAV = "audio/vnd.wave";
        URLContentType.WEBM = "audio/webm";

        return URLContentType;
    })();

    module.exports = URLContentType;

});