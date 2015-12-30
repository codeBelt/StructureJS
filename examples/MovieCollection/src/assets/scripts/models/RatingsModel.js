import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class RatingsModel
 * @extends BaseModel
 * @constructor
 **/
class RatingsModel extends BaseModel {

    criticsRating = null;
    criticsScore = null;
    audienceRating = null;
    audienceScore = null;

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

        this.criticsScore = parseInt(data.criticsScore);
        this.audienceScore = parseInt(data.audienceScore);
    }

}

export default RatingsModel;
