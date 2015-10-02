define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class GameVO
     * @extends BaseModel
     * @constructor
     **/
    var GameVO = (function () {

        var _super = Extend(GameVO, BaseModel);

        function GameVO(data) {
            _super.call(this);

            /**
             * TODO: YUIDoc_comment
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
         * @overridden BaseModel.update
         */
        GameVO.prototype.update = function (data) {
            this.buttonIndex = data.buttonIndex;
        };

        /**
         * @overridden BaseModel.copy
         */
        GameVO.prototype.copy = function () {
            var data = _super.prototype.copy();
            return new GameVO(data);
        };

        return GameVO;
    })();

    module.exports = GameVO;

});
