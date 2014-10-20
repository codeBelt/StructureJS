define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class ${NAME}
     * @extends ValueObject
     * @constructor
     **/
    var ${NAME} = (function () {

        var _super = Extend(${NAME}, ValueObject);

        function ${NAME}(data) {
            _super.call(this);

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        ${NAME}.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        /**
         * @overridden ValueObject.copy
         */
        ${NAME}.prototype.copy = function () {
            var data =  _super.prototype.copy();
            return new ${NAME}(data);
        };

        return ${NAME};
    })();

    module.exports = ${NAME};

});