define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');
    var NumberUtil = require('structurejs/util/NumberUtil');

    /**
     * YUIDoc_comment
     *
     * @class ReleaseDateVO
     * @extends ValueObject
     * @constructor
     **/
    var ReleaseDateVO = (function () {

        var _super = Extend(ReleaseDateVO, ValueObject);

        function ReleaseDateVO(data) {
            _super.call(this);

            this.theater = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        ReleaseDateVO.prototype.update = function (data) {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
            //var formatDate = this.theater.replace(/-/g, ' ');
            //this.theater = new Date(formatDate);
        };

        /**
         * @overridden ValueObject.toJSON
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

});
