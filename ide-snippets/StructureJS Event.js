define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseEvent = require('structurejs/event/BaseEvent');

    /**
     * TODO_YUIDoc_comment
     *
     * @class ${NAME}
     * @extends BaseEvent
     * @constructor
     **/
    var ${NAME} = (function () {

        /**
         * This is an example of an event type.
         * Go ahead and rename or remove this.
         *
         * @event EXAMPLE
         * @type {string}
         * @static
         */
        ${NAME}.EXAMPLE = '${NAME}.example';

        var _super = Extend(${NAME}, BaseEvent);

        function ${NAME}(type, bubbles, cancelable, data) {
            _super.call(this, type, bubbles, cancelable, data);
        }

        return ${NAME};
    })();

    module.exports = ${NAME};

});