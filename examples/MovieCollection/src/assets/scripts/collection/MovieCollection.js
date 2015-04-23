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

        function MovieCollection(valueObjectType) {
            _super.call(this, valueObjectType);
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
        MovieCollection.prototype._removeMoviesWithNoScore = function(movieVO) {
            return movieVO.ratings.criticsScore > 0 && movieVO.ratings.audienceScore > 0;
        };

        /*proto.filter = function() {
         console.log(this.movies.length);
         this.movies = this.movies.filter(function(movie) {
         return movie.ratings.criticsScore > 0 &&
         movie.ratings.audienceScore > 0 &&
         movie.ratings.criticsScore > 0;
         });
         console.log(this.movies.length);
         };

         proto.sort = function(sortBy, limit) {
         if (sortBy === 'critic' || sortBy === 'critic-desc') {
         // remove movies with invalid critic scores
         this.movies = this.movies.filter(function(movie) {
         return movie.ratings.criticsScore > 0;
         });

         // sort scores ascending
         this.movies = this.movies.sort(function(a, b) {
         return b.ratings.criticsScore - a.ratings.criticsScore;
         });

         if (sortBy === 'critic-desc') {
         this.movies.reverse();
         }


         }

         if (sortBy === 'audience-desc') {
         // remove movies with invalid audience and critic scores


         // sort scores descending
         this.movies = this.movies.sort(function(a, b) {
         return a.ratings.audienceScore - b.ratings.audienceScore;
         });
         }

         if (sortBy === 'audience-asc') {
         // remove movies with invalid audience and critic scores


         // sort scores descending
         this.movies = this.movies.sort(function(a, b) {
         return b.ratings.audienceScore - a.ratings.audienceScore;
         });
         }

         if (sortBy === 'theater-asc') {
         // sort release date descending
         this.movies = this.movies.sort(function(a, b) {
         if (a.releaseDates.theater > b.releaseDates.theater) {
         return -1;
         }

         if (a.releaseDates.theater < b.releaseDates.theater) {
         return 1;
         }

         return 0;
         });
         }

         if (sortBy === 'theater-desc') {
         // sort release date ascending
         this.movies = this.movies.sort(function(a, b) {
         if (a.releaseDates.theater > b.releaseDates.theater) {
         return 1;
         }

         if (a.releaseDates.theater < b.releaseDates.theater) {
         return -1;
         }

         return 0;
         });
         }*/

        return MovieCollection;
    })();

    module.exports = MovieCollection;

});