import BaseModel from '../vendor/structurejs/ts/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @param [data] {any} Provide a way to update the  Base Model upon initialization.
 * @extends BaseModel
 * @constructor
 **/
class ${NAME} extends BaseModel {

    constructor(data:any = null) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    public update(data:any):void {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export default ${NAME};