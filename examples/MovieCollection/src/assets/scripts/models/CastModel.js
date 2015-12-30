import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class CastModel
 * @extends BaseModel
 * @constructor
 **/
class CastModel extends BaseModel {

    id = null;
    name = null;
    characters = [];

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

export default CastModel;
