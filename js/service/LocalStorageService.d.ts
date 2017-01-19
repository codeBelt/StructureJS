import EventDispatcher from '../event/EventDispatcher';
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
declare class LocalStorageService extends EventDispatcher {
    /**
     * Current user namespace. The namespace is optional.
     *
     * @property _namespace
     * @type {string}
     * @default defaultNamespace
     * @optional
     * @protected
     */
    protected _namespace: string;
    /**
     * A reference to window.localStorage for faster access.
     *
     * @property _localStorage
     * @type {Storage}
     * @protected
     */
    protected _localStorage: Storage;
    constructor(namespace?: string);
    /**
     * Set storage namespace
     *
     * @method setNamespace
     * @param namespace
     * @returns {string}
     * @example
     *     this._localStorageController.setNamespace('myNamespace~');
     */
    setNamespace(namespace: string): void;
    /**
     * Get storage namespace
     *
     * @method getNamespace
     * @returns {string}
     * @example
     *     const currentSetNamespace = this._localStorageController.getNamespace();
     */
    getNamespace(): string;
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
    set(key: string, data: any, useNamespace?: boolean): boolean;
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
    get(key: string, useNamespace?: boolean): any;
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
    getAll(namespace?: string): Array<any>;
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
    remove(key: string, useNamespace?: boolean): boolean;
    /**
     * Returns the number of items storage in local storage.
     *
     * @method getLength
     * @returns {number}
     * @example
     *     const numberOfItemsInLocalStorage = this._localStorageController.getLength();
     */
    getLength(): number;
    /**
     * Returns the size of the Local Storage.
     *
     * @method getSize
     * @returns {number}
     * @example
     *     const sizeOfLocalStorage = this._localStorageController.getSize();
     */
    getSize(): number;
    /**
     * Removes all key/value pairs from the Local Storage area.
     *
     * @method removeAll
     * @param [namespace=null] {string}
     * @example
     *     this._localStorageController.removeAll();
     *     this._localStorageController.removeAll('myNamespace~');
     */
    removeAll(namespace?: string): void;
    /**
     * @method _onLocalStorageEvent
     * @param event {StorageEvent} The native browser event for Web Storage.
     * @protected
     */
    protected _onLocalStorageEvent(event: StorageEvent): void;
    /**
     * Deletes all key/value pairs with a certain namespace.
     *
     * @method removeItemsWithNamespace
     * @param namespace {string}
     * @protected
     */
    protected _removeItemsWithNamespace(namespace?: string): void;
}
export default LocalStorageService;
