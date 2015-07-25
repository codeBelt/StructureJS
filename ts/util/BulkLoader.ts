'use strict';
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../event/EventDispatcher as EventDispatcher
 @import ../event/LoaderEvent as LoaderEvent
 @import ../event/BaseEvent as BaseEvent
 @export BulkLoader
 */
import IDataStore = require('../interfaces/IDataStore');
import EventDispatcher = require('../../vendor/structurejs/ts/event/EventDispatcher');
import LoaderEvent = require('../../vendor/structurejs/ts/event/LoaderEvent');
import BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');

/**
 * The BulkLoader...
 *
 * @class BulkLoader
 * @module StructureJS
 * @submodule util
 * @requires Extend
 * @requires EventDispatcher
 * @requires LoaderEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class BulkLoader {

    private static _dataStores:Array<IDataStore> = [];
    private static _eventDispatcher:EventDispatcher = new EventDispatcher();

    public static addFile(dataStore:IDataStore, key:string):void
    {
        BulkLoader._dataStores[key] = dataStore;
    }

    public static getFile(key:string):IDataStore
    {
        return BulkLoader._dataStores[key] || null;
    }

    public static getImage(key:string):HTMLImageElement
    {
        var imageLoader:IDataStore = BulkLoader.getFile(key);
        return (imageLoader !== null) ? imageLoader.data : null;
    }

    public static load():void
    {
        for (var key in BulkLoader._dataStores)
        {
            var dataStore:IDataStore = BulkLoader._dataStores[key];
            dataStore.addEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);
            dataStore.load();
        }
    }

    public static addEventListener(type:string, callback:Function, scope:any, priority:number = 0):void {
        BulkLoader._eventDispatcher.addEventListener(type, callback, scope, priority);
    }

    public static removeEventListener(type:string, callback:Function, scope:any):void
    {
        BulkLoader._eventDispatcher.removeEventListener(type, callback, scope);
    }

    public static dispatchEvent(type:any, data:any = null):void
    {
        var event:any = type;

        if (typeof event === 'string')
        {
            event = new BaseEvent(type, data);
        }

        event.target = BulkLoader;
        event.currentTarget = BulkLoader;

        BulkLoader._eventDispatcher.dispatchEvent(event);
    }

    private static onLoadComplete(event:LoaderEvent):void
    {
        event.target.removeEventListener(LoaderEvent.COMPLETE, BulkLoader.onLoadComplete, BulkLoader);

        for (var key in BulkLoader._dataStores)
        {
            var dataStore:IDataStore = BulkLoader._dataStores[key];
            if (dataStore.complete === false)
            {
                return;
            }
        }

        BulkLoader._eventDispatcher.dispatchEvent(LoaderEvent.LOAD_COMPLETE);
    }

}

export = BulkLoader;
