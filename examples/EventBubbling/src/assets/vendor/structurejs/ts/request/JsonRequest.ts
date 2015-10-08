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