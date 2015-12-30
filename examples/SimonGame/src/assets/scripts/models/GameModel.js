import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class GameModel
 * @extends BaseModel
 * @constructor
 **/
class GameModel extends BaseModel {

    /**
     * TODO: YUIDoc_comment
     *
     * @property buttonIndex
     * @type {number}
     * @public
     */
    buttonIndex = null;

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

export default GameModel;
