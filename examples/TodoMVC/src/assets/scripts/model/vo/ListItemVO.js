var Extend = require('structurejs/util/Extend');
var BaseModel = require('structurejs/model/BaseModel');

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemVO
 * @extends BaseModel
 * @constructor
 **/
var ListItemVO = (function () {

    var _super = Extend(ListItemVO, BaseModel);

    function ListItemVO(data) {
        _super.call(this);

        /**
         * @property id
         * @type {string}
         * @public
         */
        this.id = null;

        /**
         * @property text
         * @type {string}
         * @public
         */
        this.text = '';

        /**
         * @property isComplete
         * @type {boolean}
         * @public
         */
        this.isComplete = false;

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    ListItemVO.prototype.update = function (data) {
        _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
    };

    return ListItemVO;
})();

module.exports = ListItemVO;
