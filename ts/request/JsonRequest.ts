'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./BaseRequest as BaseRequest
 @import ../net/URLRequest as URLRequest
 @import ../net/URLContentType as URLContentType
 @export JsonRequest
 */
import BaseRequest = require('./BaseRequest');
import URLRequest = require('../net/URLRequest');
import URLContentType = require('../net/URLContentType');

class JsonRequest extends BaseRequest
{
    constructor(baseUrl:string)
    {
        super(baseUrl);

        this.configureRequest();
    }

    /**
     * @overridden BaseRequest.parseData
     */
    public parseData():void
    {
        super.parseData();

        this.data = JSON.parse(this.data);
    }

    /**
     * @overridden BaseRequest.configureRequest
     */
    public configureRequest():URLRequest
    {
        var urlRequest:URLRequest = super.configureRequest();
        urlRequest.contentType = URLContentType.JSON;

        return urlRequest;
    }
}

export = JsonRequest;