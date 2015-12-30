import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class MovieModel
 * @extends BaseModel
 * @constructor
 **/
class MovieModel extends BaseModel {

    id = null;
    title = null;
    year = null;
    mpaaRating = null;
    runtime = null;
    ratings = RatingsModel;
    synopsis = null;
    posters = PosterModel;
    releaseDates = ReleaseDateModel;
    abridgedCast = [CastModel];

    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        this.runtime = parseInt(data.runtime);
    }

}

export default MovieModel;
