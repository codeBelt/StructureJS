import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class PosterModel
 * @extends BaseModel
 * @constructor
 **/
class PosterModel extends BaseModel {

    thumbnail = null;
    profile = null;
    detailed = null;
    original = null;

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

        // Override any values after the default super update method has set the values.
    }

}

export default PosterModel;
