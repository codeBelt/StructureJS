/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../event/EventDispatcher', '../event/LocalStorageEvent', '../model/ValueObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'), require('../event/LocalStorageEvent'), require('../model/ValueObject'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.LocalStorageController = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LocalStorageEvent, root.structurejs.ValueObject);
    }
}(this, function(Extend, EventDispatcher, LocalStorageEvent, ValueObject) {
    'use strict';

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
    var LocalStorageController = (function () {

        var _super = Extend(LocalStorageController, EventDispatcher);

        function LocalStorageController() {
            _super.call(this);
            /**
             * Current user namespace. The namespace is optional.
             *
             * @property _namespace
             * @type {string}
             * @default defaultNamespace
             * @optional
             * @private
             */
            this._namespace = 'defaultNamespace';
            /**
             * A reference to window.localStorage for faster access.
             *
             * @property _localStorage
             * @type {Storage}
             * @private
             */
            this._localStorage = null;
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
        LocalStorageController.prototype.setNamespace = function (namespace) {
            this._namespace = namespace;
        };
        /**
         * Get storage namespace
         *
         * @method getNamespace
         * @returns {string}
         */
        LocalStorageController.prototype.getNamespace = function () {
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
         */
        LocalStorageController.prototype.addItem = function (key, data, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            if (data instanceof ValueObject) {
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
         */
        LocalStorageController.prototype.getItem = function (key, useNamespace) {
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
         * @return {Array.<Object>}
         */
        LocalStorageController.prototype.getItemsWithNamespace = function (namespace) {
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
         * @return {Array.<Object>}
         */
        LocalStorageController.prototype.getAllItems = function () {
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
         */
        LocalStorageController.prototype.removeItem = function (key, useNamespace) {
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
         */
        LocalStorageController.prototype.getLength = function () {
            return this._localStorage.length;
        };
        /**
         * Returns the size of the Local Storage.
         *
         * @method getSize
         * @returns {number}
         */
        LocalStorageController.prototype.getSize = function () {
            return encodeURIComponent(JSON.stringify(this._localStorage)).length;
        };
        /**
         * Removes all key/value pairs from the Local Storage area.
         *
         * @method clear
         */
        LocalStorageController.prototype.clear = function () {
            this._localStorage.clear();
        };
        /**
         * @overridden BaseController.destroy
         */
        LocalStorageController.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        /**
         *
         *
         * @method onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @private
         */
        LocalStorageController.prototype.onLocalStorageEvent = function (event) {
            this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
        };
        return LocalStorageController;
    })();

    return LocalStorageController;
}));