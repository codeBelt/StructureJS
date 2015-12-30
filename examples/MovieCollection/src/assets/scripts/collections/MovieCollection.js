import Collection from 'structurejs/model/Collection';

/**
 * TODO: YUIDoc_comment
 *
 * @class MovieCollection
 * @extends Collection
 * @constructor
 **/
class MovieCollection extends Collection {

    constructor() {
        super();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method sortByCriticsScore
     * @param [sortAscending=true] {boolean}
     * @public
     */
    sortByCriticsScore(sortAscending = true) {
        let models = this.getMoviesWithValidScores();

        models = models.sort(function(a, b) {
            return b.ratings.criticsScore - a.ratings.criticsScore;
        });

        if (sortAscending === false) {
            models.reverse();
        }
        return models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method sortByAudienceScore
     * @param [sortAscending=true] {boolean}
     * @public
     */
    sortByAudienceScore(sortAscending = true) {
        let models = this.getMoviesWithValidScores();

        models = models.sort(function(a, b) {
            return b.ratings.audienceScore - a.ratings.audienceScore;
        });

        if (sortAscending === false) {
            models.reverse();
        }
        return models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method sortByTheaterReleaseDate
     * @param [sortAscending=true] {boolean}
     * @public
     */
    sortByTheaterReleaseDate(sortAscending = true) {
        let models = this.getMoviesWithValidScores();

        models = models.sort(function(a, b){
            // Subtract the dates to get a value that is either negative, positive, or zero.
            return new Date(b.releaseDates.theater) - new Date(a.releaseDates.theater)
        });

        if (sortAscending === false) {
            models.reverse();
        }
        return models;
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method getMoviesWithValidScores
     * @public
     */
    getMoviesWithValidScores() {
        return this.filter(this._removeMoviesWithNoScore);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _removeMoviesWithNoScore
     * @private
     */
    _removeMoviesWithNoScore(movieModel) {
        return movieModel.ratings.criticsScore > 0 && movieModel.ratings.audienceScore > 0;
    }
}

export default MovieCollection;
