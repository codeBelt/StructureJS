define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * YUIDoc_comment
     *
     * @class GameVO
     * @extends ValueObject
     * @constructor
     **/
    var GameVO = (function () {

        var _super = Extend(GameVO, ValueObject);

        function GameVO(data) {
            _super.call(this);

            /**
             * YUIDoc_comment
             *
             * @property buttonIndex
             * @type {int}
             * @public
             */
            this.buttonIndex = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        GameVO.prototype.update = function (data) {
            this.buttonIndex = data.buttonIndex;
        };

        /**
         * @overridden ValueObject.copy
         */
        GameVO.prototype.copy = function () {
            var data = _super.prototype.copy();
            return new GameVO(data);
        };

        return GameVO;
    })();

    module.exports = GameVO;

});
