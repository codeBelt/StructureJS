define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');
    var RatingsVO = require('model/RatingsVO');
    var PosterVO = require('model/PosterVO');
    var CastVO = require('model/CastVO');

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
            this.posters = PosterVO;
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
        };

        return MovieVO;
    })();

    module.exports = MovieVO;

});
