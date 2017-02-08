import BaseModel from '../../../../../../../ts/model/BaseModel';

/**
 * @class InputModel
 * @extends BaseModel
 * @constructor
 **/
class InputModel extends BaseModel {

    /**
     * @property id
     * @type {string}
     * @public
     */
    id = null;

    constructor(data={}, opts = {}) {
        super(opts);

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

export default InputModel;
