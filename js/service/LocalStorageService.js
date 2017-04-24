var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../event/LocalStorageEvent", "../event/EventDispatcher", "../model/BaseModel"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LocalStorageEvent_1 = require("../event/LocalStorageEvent");
    var EventDispatcher_1 = require("../event/EventDispatcher");
    var BaseModel_1 = require("../model/BaseModel");
    var LocalStorageFallback = (function () {
        function LocalStorageFallback() {
            this._data = null;
            window['StructureJS_localStorageFallback'] = window['StructureJS_localStorageFallback'] || {};
            this._data = window['StructureJS_localStorageFallback'];
            console.warn("window.localStorage is not working. StructureJS LocalStorageService will use an in memory version.");
        }
        LocalStorageFallback.prototype.setItem = function (key, value) {
            return this._data[key] = String(value);
        };
        LocalStorageFallback.prototype.getItem = function (key) {
            return (this._data.hasOwnProperty(key) === true) ? this._data[key] : null;
        };
        LocalStorageFallback.prototype.removeItem = function (key) {
            return delete this._data[key];
        };
        LocalStorageFallback.prototype.clear = function () {
            return this._data = {};
        };
        LocalStorageFallback.prototype.key = function (index) {
            return Object.keys(this._data)[index];
        };
        Object.defineProperty(LocalStorageFallback.prototype, "length", {
            get: function () {
                return Object.keys(this._data).length;
            },
            enumerable: true,
            configurable: true
        });
        return LocalStorageFallback;
    }());
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
    var LocalStorageService = (function (_super) {
        __extends(LocalStorageService, _super);
        function LocalStorageService(namespace) {
            if (namespace === void 0) { namespace = ''; }
            var _this = _super.call(this) || this;
            /**
             * Current user namespace. The namespace is optional.
             *
             * @property _namespace
             * @type {string}
             * @default defaultNamespace
             * @optional
             * @protected
             */
            _this._namespace = '';
            /**
             * A reference to window.localStorage for faster access.
             *
             * @property _localStorage
             * @type {Storage}
             * @protected
             */
            _this._localStorage = null;
            _this._namespace = namespace;
            try {
                _this._localStorage = window.localStorage;
                var test = 'isLocalStorageSupported';
                _this._localStorage.setItem(test, test);
                _this._localStorage.removeItem(test);
            }
            catch (error) {
                _this._localStorage = new LocalStorageFallback();
            }
            window.addEventListener('storage', _this._onLocalStorageEvent.bind(_this));
            return _this;
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
        LocalStorageService.prototype.setNamespace = function (namespace) {
            this._namespace = namespace;
        };
        /**
         * Get storage namespace
         *
         * @method getNamespace
         * @returns {string}
         * @example
         *     const currentSetNamespace = this._localStorageController.getNamespace();
         */
        LocalStorageService.prototype.getNamespace = function () {
            return this._namespace;
        };
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
        LocalStorageService.prototype.set = function (key, data, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            if (data instanceof BaseModel_1.default) {
                data = data.toJSON();
            }
            data = JSON.stringify(data);
            try {
                this._localStorage.setItem(key, data);
                return true;
            }
            catch (error) {
                return false;
            }
        };
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
        LocalStorageService.prototype.get = function (key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            var value = this._localStorage.getItem(key);
            if (value) {
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    // We are assuming the error is because value being parsed is a plain string with spaces.
                    value = value;
                }
            }
            return value;
        };
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
        LocalStorageService.prototype.getAll = function (namespace) {
            if (namespace === void 0) { namespace = null; }
            var list = [];
            var length = this.getLength();
            for (var i = 0; i < length; i++) {
                var key = this._localStorage.key(i);
                var value = this.get(key);
                list.push({
                    key: key,
                    value: value
                });
            }
            if (namespace != null) {
                list = list.filter(function (obj) { return obj.key.indexOf(namespace) >= 0; });
            }
            return list;
        };
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
        LocalStorageService.prototype.remove = function (key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            try {
                this._localStorage.removeItem(key);
                return true;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * Returns the number of items storage in local storage.
         *
         * @method getLength
         * @returns {number}
         * @example
         *     const numberOfItemsInLocalStorage = this._localStorageController.getLength();
         */
        LocalStorageService.prototype.getLength = function () {
            return this._localStorage.length;
        };
        /**
         * Returns the size of the Local Storage.
         *
         * @method getSize
         * @returns {number}
         * @example
         *     const sizeOfLocalStorage = this._localStorageController.getSize();
         */
        LocalStorageService.prototype.getSize = function () {
            return encodeURIComponent(JSON.stringify(this._localStorage)).length;
        };
        /**
         * Removes all key/value pairs from the Local Storage area.
         *
         * @method removeAll
         * @param [namespace=null] {string}
         * @example
         *     this._localStorageController.removeAll();
         *     this._localStorageController.removeAll('myNamespace~');
         */
        LocalStorageService.prototype.removeAll = function (namespace) {
            if (namespace === void 0) { namespace = null; }
            if (namespace == null) {
                this._localStorage.clear();
            }
            else {
                this._removeItemsWithNamespace(namespace);
            }
        };
        /**
         * @method _onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @protected
         */
        LocalStorageService.prototype._onLocalStorageEvent = function (event) {
            this.dispatchEvent(new LocalStorageEvent_1.default(LocalStorageEvent_1.default.STORAGE, false, false, event));
        };
        /**
         * Deletes all key/value pairs with a certain namespace.
         *
         * @method removeItemsWithNamespace
         * @param namespace {string}
         * @protected
         */
        LocalStorageService.prototype._removeItemsWithNamespace = function (namespace) {
            var _this = this;
            if (namespace === void 0) { namespace = this._namespace; }
            var items = this.getAll(namespace);
            items.forEach(function (data) {
                var key = data.key;
                _this.remove(key, false); // False because key already has the namespace in it.
            });
        };
        return LocalStorageService;
    }(EventDispatcher_1.default));
    exports.default = LocalStorageService;
});
