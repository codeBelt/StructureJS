///<reference path='../event/EventDispatcher.ts'/>
///<reference path='../event/LocalStorageEvent.ts'/>
///<reference path='../model/ValueObject.ts'/>

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
 * @requires ValueObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureJS
{
    export class LocalStorageController extends EventDispatcher
    {
        /**
         * Current user namespace. The namespace is optional.
         *
         * @property _namespace
         * @type {string}
         * @default defaultNamespace
         * @optional
         * @private
         */
        private _namespace:string = 'defaultNamespace';

        /**
         * A reference to window.localStorage for faster access.
         *
         * @property _localStorage
         * @type {Storage}
         * @private
         */
        private _localStorage:Storage = null;

        constructor()
        {
            super();

            this._localStorage = window.localStorage;

            window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
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

            if (data instanceof ValueObject)
            {
                data = <ValueObject>data.toJSON();
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

            var value = this._localStorage.getItem(key);
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
         * @return {Array.<Object>}
         */
        public getItemsWithNamespace(namespace:string = this._namespace):any[]
        {
            var list:any[] = [];
            var length:number = this.getLength();
            for (var i:number = 0; i < length; i++)
            {
                var key:string = this._localStorage.key(i);
                if (key.indexOf(namespace) > -1)
                {
                    var value:any = this.getItem(key);
                    var obj:any = {
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
         * @return {Array.<Object>}
         */
        public getAllItems():any[]
        {
            var list:any[] = [];
            var length:number = this.getLength();
            for (var i:number = 0; i < length; i++)
            {
                var key:string = this._localStorage.key(i);
                var value:any = this.getItem(key);
                var obj:any = {
                    key: key,
                    value: value
                }

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
         * @overridden BaseController.destroy
         */
        public destroy():void
        {
            super.destroy();
        }

        /**
         *
         *
         * @method onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @private
         */
        private onLocalStorageEvent(event:StorageEvent)
        {
            this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
        }
    }
}