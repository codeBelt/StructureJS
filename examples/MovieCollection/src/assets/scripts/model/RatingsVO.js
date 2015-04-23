define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class RatingsVO
     * @extends ValueObject
     * @constructor
     **/
    var RatingsVO = (function () {

        var _super = Extend(RatingsVO, ValueObject);

        function RatingsVO(data) {
            _super.call(this);

            this.criticsRating = null;
            this.criticsScore = null;
            this.audienceRating = null;
            this.audienceScore = null;

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        RatingsVO.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
            this.criticsScore = parseInt(data.criticsScore);
            this.audienceScore = parseInt(data.audienceScore);
        };

        return RatingsVO;
    })();

    module.exports = RatingsVO;

});
