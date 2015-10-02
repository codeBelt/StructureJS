define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');
    var NumberUtil = require('structurejs/util/NumberUtil');

    /**
     * YUIDoc_comment
     *
     * @class ReleaseDateModel
     * @extends BaseModel
     * @constructor
     **/
    var ReleaseDateModel = (function () {

        var _super = Extend(ReleaseDateModel, BaseModel);

        function ReleaseDateModel(data) {
            _super.call(this);

            this.theater = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden BaseModel.update
         */
        ReleaseDateModel.prototype.update = function (data) {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
            //var formatDate = this.theater.replace(/-/g, ' ');
            //this.theater = new Date(formatDate);
        };

        /**
         * @overridden BaseModel.toJSON
         */
        ReleaseDateModel.prototype.toJSON = function() {
            var json = _super.prototype.toJSON.call(this);

            var year = this.theater.getFullYear();
            var month = this.theater.getMonth() + 1;
            var day =  this.theater.getDate();

            month = NumberUtil.doubleDigitFormat(month);
            day = NumberUtil.doubleDigitFormat(day);

            json.theater = year + '-' + month + '-' + day;

            return json;
        };

        return ReleaseDateModel;
    })();

    module.exports = ReleaseDateModel;

});
