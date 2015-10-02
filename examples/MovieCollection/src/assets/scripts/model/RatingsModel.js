define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class RatingsModel
     * @extends BaseModel
     * @constructor
     **/
    var RatingsModel = (function () {

        var _super = Extend(RatingsModel, BaseModel);

        function RatingsModel(data) {
            _super.call(this);

            this.criticsRating = null;
            this.criticsScore = null;
            this.audienceRating = null;
            this.audienceScore = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden BaseModel.update
         */
        RatingsModel.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
            this.criticsScore = parseInt(data.criticsScore);
            this.audienceScore = parseInt(data.audienceScore);
        };

        return RatingsModel;
    })();

    module.exports = RatingsModel;

});
