'use strict';

// Imports
var Extend = require('../../../js/util/Extend');
var BaseModel = require('../../../js/model/BaseModel');

/**
 * TODO: YUIDoc_comment
 *
 * @class PosterVO
 * @extends BaseModel
 * @constructor
 **/
var PosterVO = (function () {

    var _super = Extend(PosterVO, BaseModel);

    function PosterVO(data) {
        _super.call(this);

        this.thumbnail = null;
        this.profile = null;
        this.detailed = null;
        this.original = null;

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    PosterVO.prototype.update = function (data) {
         _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
    };

    return PosterVO;
})();

module.exports = PosterVO;
