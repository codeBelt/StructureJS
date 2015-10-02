'use strict';

// Imports
var Extend = require('../../../js/util/Extend');
var BaseModel = require('../../../js/model/BaseModel');
var NumberUtil = require('../../../js/util/NumberUtil');

/**
 * YUIDoc_comment
 *
 * @class ReleaseDateVO
 * @extends BaseModel
 * @constructor
 **/
var ReleaseDateVO = (function () {

    var _super = Extend(ReleaseDateVO, BaseModel);

    function ReleaseDateVO(data) {
        _super.call(this);

        this.theater = null;

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    ReleaseDateVO.prototype.update = function (data) {
        _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
        //var formatDate = this.theater.replace(/-/g, ' ');
        //this.theater = new Date(formatDate);
    };

    /**
     * @overridden BaseModel.toJSON
     */
    ReleaseDateVO.prototype.toJSON = function() {
        var json = _super.prototype.toJSON.call(this);

        var year = this.theater.getFullYear();
        var month = this.theater.getMonth() + 1;
        var day =  this.theater.getDate();

        month = NumberUtil.doubleDigitFormat(month);
        day = NumberUtil.doubleDigitFormat(day);

        json.theater = year + '-' + month + '-' + day;

        return json;
    };

    return ReleaseDateVO;
})();

module.exports = ReleaseDateVO;

