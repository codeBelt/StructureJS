define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Util = require('structurejs/util/Util');

    /**
     * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
     *
     * @class BaseObject
     * @module StructureJS
     * @submodule core
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     **/
    var BaseObject = (function () {

        function BaseObject() {
            /**
             * The cid or client id is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
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
            return Util.getClassName(this);
        };

        /**
         * The purpose of the destroy method is to make an object ready for garbage collection. This
         * should be thought of as a one way function. Once destroy is called no further methods should be
         * called on the object or properties accessed. It is the responsibility of those who implement this
         * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
         * object eligible for garbage collection.
         *
         * By default the destroy method will null out all properties of the class automatically. You should call destroy
         * on other objects before calling the super.
         *
         * @example
         * ClassName.prototype.destroy = function() {
         *      this._childInstance.destroy();
         *
         *      _super.prototype.destroy.call(this);
         * }
         * @method destroy
         * @return {void}
         * @public
         */
        BaseObject.prototype.destroy = function () {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        };
        return BaseObject;
    })();

    module.exports = BaseObject;

});

