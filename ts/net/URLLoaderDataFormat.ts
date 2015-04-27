'use strict';
/*
 UMD Stuff
 @export URLLoaderDataFormat
 */

/**
 * The URLLoaderDataFormat...
 *
 * @class URLLoaderDataFormat
 * @module StructureJS
 * @submodule net
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class URLLoaderDataFormat
{
    public static XML:string = "xml";
    public static HTML:string = "html";
    public static SCRIPT:string = "script";
    public static JSON:string = "json";
    public static JSONP:string = "jsonp";
    public static TEXT:string = "text";
}

export = URLLoaderDataFormat;