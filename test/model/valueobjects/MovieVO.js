'use strict';

// Imports
var Extend = require('../../../js/util/Extend');
var ValueObject = require('../../../js/model/ValueObject');
var RatingsVO = require('./RatingsVO');
var PosterVO = require('./PosterVO');
var CastVO = require('./CastVO');
var ReleaseDateVO = require('./ReleaseDateVO');

/**
 * TODO: YUIDoc_comment
 *
 * @class MovieVO
 * @extends ValueObject
 * @constructor
 **/
var MovieVO = (function () {

    var _super = Extend(MovieVO, ValueObject);

    function MovieVO(data) {
        _super.call(this);

        this.id = null;
        this.title = null;
        this.year = null;
        this.mpaaRating = null;
        this.runtime = null;
        this.ratings = RatingsVO;
        this.synopsis = null;
        this.posters = PosterVO;
        this.releaseDates = ReleaseDateVO;
        this.abridgedCast = [CastVO];

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    MovieVO.prototype.update = function (data) {
        _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
        this.runtime = parseInt(data.runtime);
    };

    return MovieVO;
})();

module.exports = MovieVO;
