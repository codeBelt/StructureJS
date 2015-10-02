define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class GameModel
     * @extends BaseModel
     * @constructor
     **/
    var GameModel = (function () {

        var _super = Extend(GameModel, BaseModel);

        function GameModel(data) {
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
        GameModel.prototype.update = function (data) {
            this.buttonIndex = data.buttonIndex;
        };

        /**
         * @overridden BaseModel.copy
         */
        GameModel.prototype.copy = function () {
            var data = _super.prototype.copy();
            return new GameModel(data);
        };

        return GameModel;
    })();

    module.exports = GameModel;

});
