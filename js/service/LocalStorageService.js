var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../event/LocalStorageEvent', '../event/EventDispatcher', '../model/BaseModel'], factory);
    }
})(function (require, exports) {
    "use strict";
    var LocalStorageEvent_1 = require('../event/LocalStorageEvent');
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var BaseModel_1 = require('../model/BaseModel');
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
     *     this._localStorageController.addItem('someName', { value: 'something'});
     */
    var LocalStorageService = (function (_super) {
        __extends(LocalStorageService, _super);
        function LocalStorageService(namespace) {
            if (namespace === void 0) { namespace = ''; }
            _super.call(this);
            /**
             * Current user namespace. The namespace is optional.
             *
             * @property _namespace
             * @type {string}
             * @default defaultNamespace
             * @optional
             * @protected
             */
            this._namespace = '';
            /**
             * A reference to window.localStorage for faster access.
             *
             * @property _localStorage
             * @type {Storage}
             * @protected
             */
            this._localStorage = null;
            this._namespace = namespace;
            this._localStorage = window.localStorage;
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
         * @method addItem
         * @param key {string}
         * @param data {Object}
         * @param useNamespace {boolean}
         * @return {boolean}
         * @example
         *     this._localStorageController.addItem('someName', { value: 'something'});
         *
         *     // If you set a namespace you would pass 'true' into the third parameter.
         *     this._localStorageController.addItem('someName', { value: 'something'}, true);
         */
        LocalStorageService.prototype.addItem = function (key, data, useNamespace) {
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
         * @method getItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @returns {any}
         * @example
         *     this._localStorageController.setNamespace('myNamespace~');
         */
        LocalStorageService.prototype.getItem = function (key, useNamespace) {
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
         * Returns all items in local storage as an Object with key and value properties that has a certain namespace.
         *
         * @method getItemsWithNamespace
         * @param namespace {string} The namespace that is used to items. If a namespace is not passed in then the current set namespace will be used.
         * @return {Array}
         * @example
         *     this._localStorageController.getItemsWithNamespace('myNamespace~');
         */
        LocalStorageService.prototype.getItemsWithNamespace = function (namespace) {
            if (namespace === void 0) { namespace = this._namespace; }
            var list = [];
            var length = this.getLength();
            for (var i = 0; i < length; i++) {
                var key = this._localStorage.key(i);
                if (key.indexOf(namespace) > -1) {
                    var value = this.getItem(key);
                    var obj = {
                        key: key,
                        value: value
                    };
                    list.push(obj);
                }
            }
            return list;
        };
        /**
         * Returns all items in local storage as an Object with key and value properties.
         *
         * @method getAllItems
         * @return {Array}
         * @example
         *     this._localStorageController.getAllItems();
         */
        LocalStorageService.prototype.getAllItems = function () {
            var list = [];
            var length = this.getLength();
            for (var i = 0; i < length; i++) {
                var key = this._localStorage.key(i);
                var value = this.getItem(key);
                var obj = {
                    key: key,
                    value: value
                };
                list.push(obj);
            }
            return list;
        };
        /**
         * Deletes a key/value pair from the Local Storage collection.
         *
         * @method removeItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @return {boolean}
         * @example
         *     this._localStorageController.removeItem('someName');
         *
         *     // If you set a namespace you would pass 'true' into the second parameter.
         *     this._localStorageController.removeItem('someName', true);
         */
        LocalStorageService.prototype.removeItem = function (key, useNamespace) {
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
         * Deletes all key/value pairs with a certain namespace.
         *
         * @method removeItemsWithNamespace
         * @param namespace {string}
         * @public
         * @example
         *     this._localStorageController.removeItemsWithNamespace('myNamespace~');
         */
        LocalStorageService.prototype.removeItemsWithNamespace = function (namespace) {
            var _this = this;
            if (namespace === void 0) { namespace = this._namespace; }
            var items = this.getItemsWithNamespace(namespace);
            items.forEach(function (data) {
                var key = data.key;
                _this.removeItem(key, false); // False because key already has the namespace in it.
            });
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
         * @method clear
         * @example
         *     this._localStorageController.clear();
         */
        LocalStorageService.prototype.clear = function () {
            this._localStorage.clear();
        };
        /**
         *
         *
         * @method _onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @protected
         */
        LocalStorageService.prototype._onLocalStorageEvent = function (event) {
            this.dispatchEvent(new LocalStorageEvent_1.default(LocalStorageEvent_1.default.STORAGE, false, false, event));
        };
        return LocalStorageService;
    }(EventDispatcher_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = LocalStorageService;
});
