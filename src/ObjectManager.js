define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Extend = require('structurejs/util/Extend');
    var BaseObject = require('structurejs/BaseObject');

    /**
     * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
     *
     * @class ObjectManager
     * @module StructureJS
     * @extends BaseObject
     * @submodule core
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ObjectManager = (function () {

        var _super = Extend(ObjectManager, BaseObject);

        function ObjectManager() {
            _super.call(this);
            /**
             * The isEnabled property is used to keep track of the enabled state of the object.
             *
             * @property isEnabled
             * @type {boolean}
             * @default false
             * @protected
             */
            this.isEnabled = false;
        }
        /**
         * The enable method is responsible for enabling event listeners and/or children of the containing objects.
         *
         * @method enable
         * @public
         * @chainable
         * @example
         *     ClassName.prototype.enable = function() {
        *          if (this.isEnabled === true) return this;
        *
        *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
        *          this._childInstance.enable();
        *
        *          return _super.prototype.enable.call(this);
        *     }
         */
        ObjectManager.prototype.enable = function () {
            if (this.isEnabled === true)
                return this;

            this.isEnabled = true;
            return this;
        };

        /**
         * The disable method is responsible for disabling event listeners and/or children of the containing objects.
         *
         * @method disable
         * @public
         * @chainable
         * @example
         *     ClassName.prototype.disable = function() {
        *          if (this.isEnabled === false) return this;
        *
        *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
        *          this._childInstance.disable();
        *
        *          return _super.prototype.disable.call(this);
        *     }
         */
        ObjectManager.prototype.disable = function () {
            if (this.isEnabled === false)
                return this;

            this.isEnabled = false;
            return this;
        };
        return ObjectManager;
    })();

    module.exports = ObjectManager;

});

