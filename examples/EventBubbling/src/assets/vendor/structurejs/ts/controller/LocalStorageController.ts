import LocalStorageEvent from '../event/LocalStorageEvent';
import EventDispatcher from '../event/EventDispatcher';
import BaseModel from '../model/BaseModel';

/**
 * The LocalStorageController...
 *
 * @class LocalStorageController
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule controller
 * @requires Extend
 * @requires EventDispatcher
 * @requires LocalStorageEvent
 * @requires BaseModel
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
class LocalStorageController extends EventDispatcher
{
    /**
     * Current user namespace. The namespace is optional.
     *
     * @property _namespace
     * @type {string}
     * @default defaultNamespace
     * @optional
     * @protected
     */
    protected _namespace:string = 'defaultNamespace';

    /**
     * A reference to window.localStorage for faster access.
     *
     * @property _localStorage
     * @type {Storage}
     * @protected
     */
    protected _localStorage:Storage = null;

    constructor()
    {
        super();

        this._localStorage = window.localStorage;

        window.addEventListener('storage', this._onLocalStorageEvent.bind(this));
    }

    /**
     * Set storage namespace
     *
     * @method setNamespace
     * @param namespace
     * @returns {string}
     */
    public setNamespace(namespace:string):void
    {
        this._namespace = namespace;
    }

    /**
     * Get storage namespace
     *
     * @method getNamespace
     * @returns {string}
     */
    public getNamespace():string
    {
        return this._namespace;
    }

    /**
     * Add a key/value pair to localStorage.
     *
     * @method addItem
     * @param key {string}
     * @param data {Object}
     * @param useNamespace {boolean}
     * @return {boolean}
     */
    public addItem(key:string, data:any, useNamespace:boolean = false):boolean
    {
        if (useNamespace)
        {
            key = this.getNamespace() + key;
        }

        if (data instanceof BaseModel)
        {
            data = <BaseModel>data.toJSON();
        }

        data = JSON.stringify(data);

        try
        {
            this._localStorage.setItem(key, data);
            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    /**
     * Retrieves the current value associated with the Local Storage key.
     *
     * @method getItem
     * @param key {string}
     * @param [useNamespace=false] {string}
     * @returns {any}
     */
    public getItem(key:string, useNamespace:boolean = false):any
    {
        if (useNamespace)
        {
            key = this.getNamespace() + key;
        }

        let value = this._localStorage.getItem(key);
        if (value)
        {
            try
            {
                value = JSON.parse(value);
            }
            catch (error)
            {
                // We are assuming the error is because value being parsed is a plain string with spaces.
                value = value;
            }
        }

        return value;
    }

    /**
     * Returns all items in local storage as an Object with key and value properties that has a certain namespace.
     *
     * @method getItemsWithNamespace
     * @param namespace {string} The namespace that is used to items. If a namespace is not passed in then the current set namespace will be used.
     * @return {Array}
     */
    public getItemsWithNamespace(namespace:string = this._namespace):Array<any>
    {
        const list:Array<any> = [];
        const length:number = this.getLength();
        for (let i:number = 0; i < length; i++)
        {
            let key:string = this._localStorage.key(i);
            if (key.indexOf(namespace) > -1)
            {
                let value:any = this.getItem(key);
                let obj:any = {
                    key: key,
                    value: value
                }

                list.push(obj);
            }
        }
        return list;
    }

    /**
     * Returns all items in local storage as an Object with key and value properties.
     *
     * @method getAllItems
     * @return {Array}
     */
    public getAllItems():Array<any>
    {
        const list:Array<any> = [];
        const length:number = this.getLength();
        for (let i:number = 0; i < length; i++)
        {
            let key:string = this._localStorage.key(i);
            let value:any = this.getItem(key);
            let obj:any = {
                key: key,
                value: value
            };

            list.push(obj);
        }
        return list;
    }

    /**
     * Deletes a key/value pair from the Local Storage collection.
     *
     * @method removeItem
     * @param key {string}
     * @param [useNamespace=false] {string}
     * @return {boolean}
     */
    public removeItem(key:string, useNamespace:boolean = false):boolean
    {
        if (useNamespace)
        {
            key = this.getNamespace() + key;
        }

        try
        {
            this._localStorage.removeItem(key);
            return true;
        }
        catch (error)
        {
            return false;
        }
    }

    /**
     * Returns the number of items storage in local storage.
     *
     * @method getLength
     * @returns {number}
     */
    public getLength():number
    {
        return this._localStorage.length;
    }

    /**
     * Returns the size of the Local Storage.
     *
     * @method getSize
     * @returns {number}
     */
    public getSize():number
    {
        return encodeURIComponent(JSON.stringify(this._localStorage)).length;
    }

    /**
     * Removes all key/value pairs from the Local Storage area.
     *
     * @method clear
     */
    public clear():void
    {
        this._localStorage.clear();
    }

    /**
     *
     *
     * @method _onLocalStorageEvent
     * @param event {StorageEvent} The native browser event for Web Storage.
     * @protected
     */
    protected _onLocalStorageEvent(event:StorageEvent)
    {
        this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
    }
}

export default LocalStorageController;