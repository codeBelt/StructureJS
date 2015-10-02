define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');
    var RatingsModel = require('model/RatingsModel');
    var PosterModel = require('model/PosterModel');
    var CastModel = require('model/CastModel');
    var ReleaseDateModel = require('model/ReleaseDateModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class MovieModel
     * @extends BaseModel
     * @constructor
     **/
    var MovieModel = (function () {

        var _super = Extend(MovieModel, BaseModel);

        function MovieModel(data) {
            _super.call(this);

            this.id = null;
            this.title = null;
            this.year = null;
            this.mpaaRating = null;
            this.runtime = null;
            this.ratings = RatingsModel;
            this.synopsis = null;
            this.posters = PosterModel;
            this.releaseDates = ReleaseDateModel;
            this.abridgedCast = [CastModel];

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden BaseModel.update
         */
        MovieModel.prototype.update = function (data) {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
            this.runtime = parseInt(data.runtime);
        };

        return MovieModel;
    })();

    module.exports = MovieModel;

});
