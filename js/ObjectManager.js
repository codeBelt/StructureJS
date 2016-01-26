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
        define(["require", "exports", './BaseObject'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('./BaseObject');
    /**
     * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
     *
     * @class ObjectManager
     * @module StructureJS
     * @extends BaseObject
     * @submodule core
     * @requires Extend
     * @requires BaseObject
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ObjectManager = (function (_super) {
        __extends(ObjectManager, _super);
        function ObjectManager() {
            _super.call(this);
            /**
             * The isEnabled property is used to keep track of the enabled state of the object.
             *
             * @property isEnabled
             * @type {boolean}
             * @default false
             * @public
             */
            this.isEnabled = false;
        }
        /**
         * The enable method is responsible for enabling object.
         * After this method is called it will trigger the {{#crossLink "ObjectManager/onEnabled:method"}}{{/crossLink}} method.
         *
         * @method enable
         * @public
         * @chainable
         * @example
         *     enable() {
         *          if (this.isEnabled === true) { return; }
         *
         *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.enable();
         *
         *          super.enable();
         *     }
         *
         *      // Example on how to enable a view.
         *      this._childInstance.enable();
         */
        ObjectManager.prototype.enable = function () {
            if (this.isEnabled === true) {
                return this;
            }
            this.isEnabled = true;
            this.onEnabled();
            return this;
        };
        /**
         * This method is automatically called after the enable method is called on the object.
         * The enable method is responsible for enabling event listeners and/or children of the containing objects.
         *
         * @method onEnabled
         * @public
         * @chainable
         * @example
         *     onEnabled() {
         *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.enable();
         *     }
         */
        ObjectManager.prototype.onEnabled = function () {
            return this;
        };
        /**
         * The disable method is responsible for disabling the object.
         * After this method is called it will trigger the {{#crossLink "ObjectManager/onDisabled:method"}}{{/crossLink}} method.
         *
         * @method disable
         * @public
         * @chainable
         * @example
         *      disable() {
         *          if (this.isEnabled === false) { return; }
         *
         *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.disable();
         *
         *          super.disable();
         *      }
         *
         *      // Example on how to disable a view.
         *      this._childInstance.disable();
         */
        ObjectManager.prototype.disable = function () {
            if (this.isEnabled === false) {
                return this;
            }
            this.isEnabled = false;
            this.onDisabled();
            return this;
        };
        /**
         * This method is automatically called after the disable method is called on the object.
         * The onDisabled method is responsible for disabling event listeners and/or children of the containing objects.
         *
         * @method onDisabled
         * @public
         * @chainable
         * @example
         *     onDisabled() {
         *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.disable();
         *     }
         */
        ObjectManager.prototype.onDisabled = function () {
            return this;
        };
        return ObjectManager;
    })(BaseObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ObjectManager;
});
