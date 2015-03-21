define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var VehicleVO = require('./VehicleVO');

    /**
     * TODO: YUIDoc_comment
     *
     * @class CarVO
     * @extends VehicleVO
     * @constructor
     **/
    var CarVO = (function ()
    {
        var _super = Extend(CarVO, VehicleVO);

        function CarVO(data)
        {
            _super.call(this);

            this.model = null;
            this.year = null;
            this.allWheel = false; // Set a default value.

            if (data)
            {
                this.update(data);
            }
        }

        /**
         * @overridden VehicleVO.update
         */
        CarVO.prototype.update = function (data)
        {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return CarVO;
    })();

    module.exports = CarVO;

});