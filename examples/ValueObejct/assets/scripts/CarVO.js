define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');

    /**
     * TODO: YUIDoc_comment
     *
     * @class CarVO
     * @extends ValueObject
     * @constructor
     **/
    var CarVO = (function ()
    {

        var _super = Extend(CarVO, ValueObject);

        function CarVO(data)
        {
            _super.call(this);

            this.make = null;
            this.model = null;
            this.year = null;
            this.allWheel = false; // Set a default value.

            this.update(data);
        }

        /**
         * @overridden ValueObject.update
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