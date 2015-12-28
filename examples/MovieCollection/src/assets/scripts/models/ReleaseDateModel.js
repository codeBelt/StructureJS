import BaseModel from 'structurejs/model/BaseModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class ReleaseDateModel
 * @extends BaseModel
 * @constructor
 **/
class ReleaseDateModel extends BaseModel {

    theater = null;

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
        //this.theater = new Date(formatDate);
    }

    /**
     * @overridden BaseModel.toJSON
     */
    toJSON() {
        let json = super.toJSON();

        let year = this.theater.getFullYear();
        let month = this.theater.getMonth() + 1;
        let day =  this.theater.getDate();

        month = NumberUtil.doubleDigitFormat(month);
        day = NumberUtil.doubleDigitFormat(day);

        json.theater = year + '-' + month + '-' + day;

        return json;
    }

}

export default ReleaseDateModel;
