define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class PosterModel
     * @extends BaseModel
     * @constructor
     **/
    var PosterModel = (function () {

        var _super = Extend(PosterModel, BaseModel);

        function PosterModel(data) {
            _super.call(this);

            this.thumbnail = null;
            this.profile = null;
            this.detailed = null;
            this.original = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden BaseModel.update
         */
        PosterModel.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return PosterModel;
    })();

    module.exports = PosterModel;

});
