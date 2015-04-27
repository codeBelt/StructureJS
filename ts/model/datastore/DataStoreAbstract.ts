'use strict';
/*
 UMD Stuff
 @import ../../util/Extend as Extend
 @import ../../event/EventDispatcher as EventDispatcher
 @import ../../event/LoaderEvent as LoaderEvent
 @export DataStoreAbstract
 */
import EventDispatcher = require('../../event/EventDispatcher');
import LoaderEvent = require('../../event/LoaderEvent');
import IDataStore = require('../../interface/IDataStore');

/**
 * The DataStoreAbstract...
 *
 * @class DataStoreAbstract
 * @module StructureJS
 * @submodule model
 * @constructor
 * @param path {string}
 * @author Robert S. (www.codeBelt.com)
 */
class DataStoreAbstract extends EventDispatcher implements IDataStore
{
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
     * @property src
     * @type {string}
     * @public
     */
    public src:string = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property complete
     * @type {boolean}
     * @public
     */
    public complete:boolean = false;

    constructor(path:string)
    {
        super();

        this.src = path;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method load
     * @protected
     */
    public load():void
    {
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoaderComplete
     * @protected
     */
    public _onLoaderComplete(...rest):void
    {
        this.complete = true;
        this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this));
    }
}

export = DataStoreAbstract;