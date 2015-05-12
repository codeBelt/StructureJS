/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DOMElement', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DOMElement'), require('jquery'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Stage = factory(root.StructureJS.Extend, root.StructureJS.DOMElement, root.jQuery);
    }
}(this, function(Extend, DOMElement, jQuery) {

    'use strict';

    /**
     * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main application or root class.
     *
     * @class Stage
     * @extends DOMElement
     * @module StructureJS
     * @submodule view
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @requires Extend
     * @requires DOMElement
     * @requires jQuery
     * @example
     *     // This example illustrates how to setup your main application or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
     *     define(function (require, exports, module) {
     *         'use strict';
     *
     *         var Extend = require('structurejs/util/Extend');
     *         var Stage = require('replace/path/Stage');
     *
     *         var MainClass = (function () {
     *
     *         var _super = Extend(MainClass, Stage);
     *
     *             function MainClass() {
     *                 _super.call(this);
     *             }
     *
     *             MainClass.prototype.create = function () {
     *                 _super.prototype.create.call(this);
     *
     *                 // Create and add your child objects to this parent class.
     *             }
     *
     *             MainClass.prototype.layout = function () {
     *                 // Layout or update the child objects in this parent class.
     *
     *                 return this;
     *             }
     *
     *             MainClass.prototype.enable = function () {
     *                 if (this.isEnabled === true) { return this };
     *
     *                 // Enable the child objects and add any event listeners.
     *
     *                 return _super.prototype.enable.call(this);
     *             }
     *
     *             MainClass.prototype.disable = function () {
     *                 if (this.isEnabled === false) { return this };
     *
     *                 // Disable the child objects and remove any event listeners.
     *
     *                 return _super.prototype.disable.call(this);
     *             }
     *
     *             MainClass.prototype.destroy = function () {
     *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
     *
     *                 _super.prototype.destroy.call(this);
     *             }
     *
     *             return MainClass;
     *         })();
     *
     *         module.exports = MainClass;
     *     });
     *
     * <b>Instantiation Example</b><br>
     * This example illustrates how to instantiate your main application or root class.
     *
     *      var app = new MainClass();
     *      app.appendTo('body');
     *
     */
    var Stage = (function() {

        var _super = Extend(Stage, DOMElement);

        function Stage() {
            _super.call(this);
        }
        /**
         * The selected HTML element where the child elements will be created. This method starts the lifecycle of the application.
         *
         * @method appendTo
         * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
         * @param [enabled=true] {boolean} Sets the enabled state of the object.
         * @chainable
         */
        Stage.prototype.appendTo = function(type, enabled) {
            if (enabled === void 0) { enabled = true; }
            this.$element = (type instanceof jQuery) ? type : jQuery(type);
            this.$element.attr('data-cid', this.cid);
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                if (enabled === false) {
                    this.disable();
                } else {
                    this.enable();
                }
                this.layout();
            }
            return this;
        };
        return Stage;
    })();

    return Stage;
}));
