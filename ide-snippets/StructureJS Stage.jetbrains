define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');

    /**
     * TODO: YUIDoc_comment
     *
     * @class ${NAME}
     * @extends Stage
     * @constructor
     **/
    var ${NAME} = (function () {

        var _super = Extend(${NAME}, Stage);

        function ${NAME}() {
            _super.call(this);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        ${NAME}.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        ${NAME}.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        ${NAME}.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        ${NAME}.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        ${NAME}.prototype.destroy = function () {
            // Call destroy on any child objects that is need. 
            // This super method will also null out all properties automatically to prevent memory leaks.
            
            _super.prototype.destroy.call(this);
        };

        return ${NAME};
    })();

    module.exports = ${NAME};

});