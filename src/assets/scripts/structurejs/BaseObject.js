define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Util = require('structurejs/util/Util');

    var BaseObject = (function () {
        /**
         * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all  classes.
         *
         * @class BaseObject
         * @module StructureJS
         * @submodule core
         * @constructor
         * @version 0.1.0
         **/
        function BaseObject() {
            /**
             * The fully qualified class name of the object. Use {{#crossLink "BaseObject/getQualifiedClassName:method"}}{{/crossLink}} method to retrieve the class name of a  object.
             *
             * @property CLASS_NAME
             * @type {string}
             * @final
             * @protected
             */
            this.CLASS_NAME = 'BaseObject';
            /**
             * The cid or client id is a unique identifier automatically assigned to most  objects upon instantiation.
             *
             * @property cid
             * @type {int}
             * @default null
             * @writeOnce
             * @public
             */
            this.cid = null;
            this.cid = Util.uniqueId();
        }
        /**
         * Returns the fully qualified class name of an object.
         *
         * @example
         instance.getQualifiedClassName();
         * @method getQualifiedClassName
         * @returns {string} Returns the class name.
         * @public
         */
        BaseObject.prototype.getQualifiedClassName = function () {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(this.constructor.toString());
            return (results && results.length > 1) ? results[1] : '';
        };

        /**
         * The purpose of the destroy method is to make an object ready for garbage collection. This
         * should be thought of as a one way function. Once destroy is called no further methods should be
         * called on the object or properties accessed. It is the responsibility of those who implement this
         * function to stop all running Timers, all running Sounds, remove any event
         * listeners and take any other steps necessary to make an object eligible for garbage collection.
         * It is critical that all subclasses call the super for this function in their overridden methods.
         *
         * Note: super.destroy(); should be called first before you clean up any other objects/items in the current classs.
         * The {{#crossLink "BaseObject/destroy:method"}}{{/crossLink}} method also calls the
         * {{#crossLink "EventDispatcher/disable:method"}}{{/crossLink}} method on all classes that extend
         * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
         * @example
        ClassName.prototype.destroy() {
            _super.prototype.destroy.call(this);

            this._childInstance.destroy();
            this._childInstance = null;
        }
         * @method destroy
         * @return {void}
         * @public
         */
        BaseObject.prototype.destroy = function () {
        };
        return BaseObject;
    })();

    module.exports = BaseObject;

});

