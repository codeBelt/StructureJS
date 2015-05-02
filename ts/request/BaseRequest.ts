'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../net/URLRequest as URLRequest
 @import ../net/URLLoader as URLLoader
 @import ../event/EventDispatcher as EventDispatcher
 @import ../event/RequestEvent as RequestEvent
 @import ../event/LoaderEvent as LoaderEvent
 @export BaseRequest
 */
import URLRequest = require('../net/URLRequest');
import URLLoader = require('../net/URLLoader');
import EventDispatcher = require('../event/EventDispatcher');
import RequestEvent = require('../event/RequestEvent');
import LoaderEvent = require('../event/LoaderEvent');
import IDataStore = require('../interface/IDataStore');

/**
 * The BaseRequest...
 *
 * @class BaseRequest
 * @module StructureJS
 * @submodule net
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BaseRequest extends EventDispatcher implements IDataStore
{
    /**
     * TODO: YUIDoc_comment
     *
     * @property _baseUrl
     * @type {string}
     * @protected
     */
    public _baseUrl:string = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _endpoint
     * @type {string}
     * @protected
     */
    public _endpoint:string = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _request
     * @type {URLRequest}
     * @protected
     */
    public _request:URLRequest = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _loader
     * @type {URLLoader}
     * @readonly
     * @protected
     */
    public _loader:URLLoader = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property data
     * @type {any}
     * @public
     */
    public data:any = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property complete
     * @type {boolean}
     * @default false
     * @public
     */
    public complete:boolean = false;

    /**
     * TODO: YUIDoc_comment
     *
     * @property src
     * @type {string}
     * @public
     */
    public src:string = null;

    constructor(baseUrl:string, endpoint:string = '')
    {
        super();

        this._baseUrl = baseUrl;
        this._endpoint = endpoint;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getloader
     * @public
     */
    public getloader():URLLoader
    {
        return this._loader;
    }

    /* ---------------------------------------------------------------------
     Protected Methods
     ------------------------------------------------------------------------ */
    /**
     * TODO: YUIDoc_comment
     *
     * @method configureRequest
     * @return {URLRequest}
     * @protected
     */
    public configureRequest():URLRequest
    {
        this.src = this._baseUrl + this._endpoint;
        this._request = new URLRequest(this.src);
        return this._request;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method load
     * @protected
     */
    public load():void
    {
        this.complete = false;

        this._loader = new URLLoader();
        this._loader.addEventListener(LoaderEvent.COMPLETE, this.onDataLoadComplete, this);
        this._loader.addEventListener(LoaderEvent.ERROR, this.onDataLoadError, this);

        if (this._request)
        {
            this._loader.load(this._request);
        }
        else
        {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: No request object created for proxy. Override configureRequest');
        }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method parseData
     * @protected
     */
    public parseData():void
    {
        this.data = this._loader.data;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method cleanupListeners
     * @protected
     */
    public cleanupListeners():void
    {
        this._loader.removeEventListener(LoaderEvent.COMPLETE, this.onDataLoadComplete, this);
        this._loader.removeEventListener(LoaderEvent.ERROR, this.onDataLoadError, this);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method onDataLoadComplete
     * @param event {LoaderEvent}
     * @protected
     */
    public onDataLoadComplete(event:LoaderEvent):void
    {
        this.parseData();
        this.complete = true;
        this.cleanupListeners();
        this.dispatchEvent(new RequestEvent(RequestEvent.SUCCESS, false, false, this.data));
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method onDataLoadComplete
     * @param event {LoaderEvent}
     * @protected
     */
    public onDataLoadError(event:LoaderEvent):void
    {
        this.cleanupListeners();
        this.dispatchEvent(new RequestEvent(RequestEvent.ERROR, false, false, this.data));
    }

    /**
     * @overridden EventDispatcher.destroy
     */
    public destroy():void
    {
        this._loader.destroy();

        super.destroy();
    }
}

export = BaseRequest;