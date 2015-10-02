define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Collection = require('structurejs/model/Collection');

    /**
     * YUIDoc_comment
     *
     * @class MovieCollection
     * @extends Collection
     * @constructor
     **/
    var MovieCollection = (function () {

        var _super = Extend(MovieCollection, Collection);

        function MovieCollection(baseModelType) {
            _super.call(this, baseModelType);
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method sortByCriticsScore
         * @param [sortAscending=true] {boolean}
         * @public
         */
        MovieCollection.prototype.sortByCriticsScore = function(sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }

            var models = this.getMoviesWithValidScores();

            models = models.sort(function(a, b) {
                return b.ratings.criticsScore - a.ratings.criticsScore;
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method sortByAudienceScore
         * @param [sortAscending=true] {boolean}
         * @public
         */
        MovieCollection.prototype.sortByAudienceScore = function(sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }

            var models = this.getMoviesWithValidScores();

            models = models.sort(function(a, b) {
                return b.ratings.audienceScore - a.ratings.audienceScore;
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method sortByTheaterReleaseDate
         * @param [sortAscending=true] {boolean}
         * @public
         */
        MovieCollection.prototype.sortByTheaterReleaseDate = function(sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }

            var models = this.getMoviesWithValidScores();

            models = models.sort(function(a, b){
                // Subtract the dates to get a value that is either negative, positive, or zero.
                return new Date(b.releaseDates.theater) - new Date(a.releaseDates.theater)
            });

            if (sortAscending === false) {
                models.reverse();
            }
            return models;
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method getMoviesWithValidScores
         * @public
         */
        MovieCollection.prototype.getMoviesWithValidScores = function() {
            return this.filter(this._removeMoviesWithNoScore);
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _removeMoviesWithNoScore
         * @private
         */
        MovieCollection.prototype._removeMoviesWithNoScore = function(movieModel) {
            return movieModel.ratings.criticsScore > 0 && movieModel.ratings.audienceScore > 0;
        };

        return MovieCollection;
    })();

    module.exports = MovieCollection;

});
