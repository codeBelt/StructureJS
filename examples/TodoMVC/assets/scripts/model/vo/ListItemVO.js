define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * YUIDoc_comment
     *
     * @class ListItemVO
     * @extends ValueObject
     * @constructor
     **/
    var ListItemVO = (function () {

        var _super = Extend(ListItemVO, ValueObject);

        function ListItemVO(data) {
            _super.call(this);

            /**
             * @property id
             * @type {string}
             * @public
             */
            this.id = null;

            /**
             * @property text
             * @type {string}
             * @public
             */
            this.text = '';

            /**
             * @property isComplete
             * @type {boolean}
             * @public
             */
            this.isComplete = false;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        ListItemVO.prototype.update = function (data) {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        /**
         * @overridden ValueObject.copy
         */
        ListItemVO.prototype.copy = function () {
            var data = _super.prototype.copy();
            return new ListItemVO(data);
        };

        return ListItemVO;
    })();

    module.exports = ListItemVO;

});
