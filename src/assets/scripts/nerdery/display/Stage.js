define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Extend = require('nerdery/util/Extend');
    var DOMElement = require('nerdery/display/DOMElement');

    var Stage = (function () {

        var _super = Extend(Stage, DOMElement);

        /**
         * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
         * @example
          //This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.

               class MainClass extends Stage {

              constructor() {
                  super();
              }

              public createChildren():void {
                  super.createChildren();
                  // Add children classes.
              }

               public enable():void {
                  if (this.isEnabled === true) return;
                  // Add listeners and/or enable children.
                  super.enable();
               }

               public disable():void {
                  if (this.isEnabled === false) return;
                  // Remove listeners and/or disable children.
                  super.disable();
               }

               public destroy():void {
                  super.destroy();
                  // Add items to clean up.
               }

          }

          //<b>Instantiation Example</b><br>
          //This example illustrates how to instantiation your main or root class.

               var app = new MainClass();
               app.appendTo('body');

         * @class Stage
         * @extends DOMElement
         * @module StructureTS
         * @submodule view
         * @constructor
         * @version 0.1.0
         **/
        function Stage() {
            _super.call(this);

            /**
             * @overridden DOMElement.CLASS_NAME
             */
            this.CLASS_NAME = 'Stage';
        }

        /**
         * The selected HTML element where all the child elements will be created. This method also starts the lifecycle of the application.
         *
         * @method appendTo
         * @param type {string} A string value that you want the your code appended too. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
         * @param [enabled=true] {boolean} Sets the enabled state of the object.
         * @chainable
         */
        Stage.prototype.appendTo = function (type, enabled) {
            if (typeof enabled === "undefined") { enabled = true; }
            this.$element = jQuery(type);
            this.$element.attr('data-cid', this.cid);

            if (!this.isCreated) {
                this.createChildren();
                this.isCreated = true;
                this.layoutChildren();
            }

            if (enabled) {
                this.enable();
            }

            return this;
        };

        return Stage;
    })();

    module.exports = Stage;

});
