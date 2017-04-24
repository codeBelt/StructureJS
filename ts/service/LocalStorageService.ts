import LocalStorageEvent from '../event/LocalStorageEvent';
import EventDispatcher from '../event/EventDispatcher';
import BaseModel from '../model/BaseModel';

class LocalStorageFallback {

    private _data:any = {};

    constructor() {
        console.warn(`window.localStorage is not working. StructureJS LocalStorageService will use an in memory version.`);
    }

    public setItem(key:string, value:string):any {
        return this._data[key] = String(value);
    }

    public getItem(key:string):any {
        return (this._data.hasOwnProperty(key) === true) ? this._data[key] : null;
    }

    public removeItem(key:string):any {
        return delete this._data[key];
    }

    public clear():any {
        return this._data = {};
    }

    public key(index:number):any {
        return Object.keys(this._data)[index];
    }

    public get length() {
        return Object.keys(this._data).length;
    }

}

/**
 * The LocalStorageService...
 *
 * @class LocalStorageService
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule controller
 * @requires Extend
 * @requires EventDispatcher
 * @requires LocalStorageEvent
 * @requires BaseModel
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     this._localStorageController = new LocalStorageService();
 *     this._localStorageController.set('someName', { value: 'something'});
 */
class LocalStorageService extends EventDispatcher
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
    protected _namespace:string = '';

    /**
     * A reference to window.localStorage for faster access.
     *
     * @property _localStorage
     * @type {Storage}
     * @protected
     */
    protected _localStorage:Storage = null;

    constructor(namespace:string = '')
    {
        super();

        this._namespace = namespace;

        try {
            this._localStorage = window.localStorage;
        } catch (error) {
            window['StructureJS_localStorageServiceFallback'] = window['StructureJS_localStorageServiceFallback'] || new LocalStorageFallback();

            this._localStorage = window['StructureJS_localStorageServiceFallback'];
        }

        window.addEventListener('storage', this._onLocalStorageEvent.bind(this));
    }

    /**
     * Set storage namespace
     *
     * @method setNamespace
     * @param namespace
     * @returns {string}
     * @example
     *     this._localStorageController.setNamespace('myNamespace~');
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
     * @example
     *     const currentSetNamespace = this._localStorageController.getNamespace();
     */
    public getNamespace():string
    {
        return this._namespace;
    }

    /**
     * Add a key/value pair to localStorage.
     *
     * @method set
     * @param key {string}
     * @param data {Object}
     * @param [useNamespace=false] {boolean}
     * @return {boolean}
     * @example
     *     this._localStorageController.set('someName', { value: 'something'});
     *
     *     // If you set a namespace you would pass 'true' into the third parameter.
     *     this._localStorageController.set('someName', { value: 'something'}, true);
     */
    public set(key:string, data:any, useNamespace:boolean = false):boolean
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
     * @method get
     * @param key {string}
     * @param [useNamespace=false] {string}
     * @returns {any}
     * @example
     *     this._localStorageController.setNamespace('myNamespace~');
     */
    public get(key:string, useNamespace:boolean = false):any
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
     * Returns all items in local storage as an Object with key and value properties or
     * returns all items with a certain namespace.
     *
     * @method getAll
     * @param [namespace=null] {string} The namespace that is used to items.
     * @return {Array}
     * @example
     *     this._localStorageController.getAll();
     *     this._localStorageController.getAll('myNamespace~');
     */
    public getAll(namespace:string = null):Array<any>
    {
        let list:Array<{ key:string, value:any }> = [];
        const length:number = this.getLength();
        for (let i:number = 0; i < length; i++)
        {
            let key:string = this._localStorage.key(i);
            let value:any = this.get(key);

            list.push({
                key: key,
                value: value
            });
        }

        if (namespace != null) {
            list = list.filter(obj => obj.key.indexOf(namespace) >= 0);
        }

        return list;
    }

    /**
     * Deletes a key/value pair from the Local Storage collection.
     *
     * @method remove
     * @param key {string}
     * @param [useNamespace=false] {string}
     * @return {boolean}
     * @example
     *     this._localStorageController.remove('someName');
     *
     *     // If you set a namespace you would pass 'true' into the second parameter.
     *     this._localStorageController.remove('someName', true);
     */
    public remove(key:string, useNamespace:boolean = false):boolean
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
     * @example
     *     const numberOfItemsInLocalStorage = this._localStorageController.getLength();
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
     * @example
     *     const sizeOfLocalStorage = this._localStorageController.getSize();
     */
    public getSize():number
    {
        return encodeURIComponent(JSON.stringify(this._localStorage)).length;
    }

    /**
     * Removes all key/value pairs from the Local Storage area.
     *
     * @method removeAll
     * @param [namespace=null] {string}
     * @example
     *     this._localStorageController.removeAll();
     *     this._localStorageController.removeAll('myNamespace~');
     */
    public removeAll(namespace:string = null):void
    {
        if (namespace == null) {
            this._localStorage.clear();
        } else {
            this._removeItemsWithNamespace(namespace);
        }
    }

    /**
     * @method _onLocalStorageEvent
     * @param event {StorageEvent} The native browser event for Web Storage.
     * @protected
     */
    protected _onLocalStorageEvent(event:StorageEvent)
    {
        this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
    }

    /**
     * Deletes all key/value pairs with a certain namespace.
     *
     * @method removeItemsWithNamespace
     * @param namespace {string}
     * @protected
     */
    protected _removeItemsWithNamespace(namespace:string = this._namespace):void
    {
        const items = this.getAll(namespace);

        items.forEach(data => {
            const { key } = data;

            this.remove(key, false); // False because key already has the namespace in it.
        });
    }

}

export default LocalStorageService;
