define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var ValueObject = require('structurejs/model/ValueObject');
    var HouseVO = require('./HouseVO');
    var CarVO = require('./CarVO');

    /**
     * TODO: YUIDoc_comment
     *
     * @class TestVO
     * @extends ValueObject
     * @constructor
     **/
    var TestVO = (function ()
    {

        var _super = Extend(TestVO, ValueObject);

        function TestVO(data)
        {
            _super.call(this);

            this.age = 0;
            this.name = null;
            this.arrayTest = [];
            this.house = HouseVO;
            this.cars = [CarVO];

            this.update(data);
        }

        /**
         * @overridden ValueObject.update
         */
        TestVO.prototype.update = function (data)
        {
            _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return TestVO;
    })();

    module.exports = TestVO;

});