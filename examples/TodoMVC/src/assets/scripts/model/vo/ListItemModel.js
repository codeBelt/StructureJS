var Extend = require('structurejs/util/Extend');
var BaseModel = require('structurejs/model/BaseModel');

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemModel
 * @extends BaseModel
 * @constructor
 **/
var ListItemModel = (function () {

    var _super = Extend(ListItemModel, BaseModel);

    function ListItemModel(data) {
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
    ListItemModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
    };

    return ListItemModel;
})();

module.exports = ListItemModel;
