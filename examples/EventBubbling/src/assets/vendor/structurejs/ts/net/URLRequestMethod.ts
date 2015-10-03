'use strict';
/*
 UMD Stuff
 @export URLRequestMethod
 */

/**
 * The URLRequestMethod...
 *
 * @class URLRequestMethod
 * @module StructureJS
 * @submodule net
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class URLRequestMethod
{
    public static DELETE:string = "DELETE";
    public static GET:string = "GET";
    public static POST:string = "POST";
    public static PUT:string = "PUT";
    public static HEAD:string = "HEAD";
    public static OPTIONS:string = "OPTIONS";
}

export = URLRequestMethod;