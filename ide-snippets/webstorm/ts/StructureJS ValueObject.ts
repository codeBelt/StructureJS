import ValueObject = require('../vendor/structurejs/ts/model/ValueObject');

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @param [data] {any} Provide a way to update the value object upon initialization.
 * @extends ValueObject
 * @constructor
 **/
class ${NAME} extends ValueObject {

    constructor(data:any = null) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    public update(data:any):void {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export = ${NAME};