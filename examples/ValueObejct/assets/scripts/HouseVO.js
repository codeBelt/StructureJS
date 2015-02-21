define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class HouseVO
     * @extends ValueObject
     * @constructor
     **/
    var HouseVO = (function ()
    {

        var _super = Extend(HouseVO, ValueObject);

        function HouseVO(data)
        {
            _super.call(this);

            this.address = null;
            this.numOfBathrooms = null;
            this.numOfBedRooms = null;

            if (data)
            {
                this.update(data);
            }
        }

        /**
         * @overridden ValueObject.update
         */
        HouseVO.prototype.update = function (data)
        {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        /**
         * @overridden ValueObject.copy
         */
        HouseVO.prototype.copy = function ()
        {
            var data = _super.prototype.copy();
            return new HouseVO(data);
        };

        return HouseVO;
    })();

    module.exports = HouseVO;

});