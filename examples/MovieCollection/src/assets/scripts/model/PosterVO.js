define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class PosterVO
     * @extends ValueObject
     * @constructor
     **/
    var PosterVO = (function () {

        var _super = Extend(PosterVO, ValueObject);

        function PosterVO(data) {
            _super.call(this);

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        PosterVO.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return PosterVO;
    })();

    module.exports = PosterVO;

});
