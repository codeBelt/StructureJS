define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var BaseModel = require('structurejs/model/BaseModel');

    /**
     * TODO: YUIDoc_comment
     *
     * @class CastModel
     * @extends BaseModel
     * @constructor
     **/
    var CastModel = (function () {

        var _super = Extend(CastModel, BaseModel);

        function CastModel(data) {
            _super.call(this);

            this.id = null;
            this.name = null;
            this.characters = [];

            if (data) {
                this.update(data);
            }
        }

        /**
         * @overridden BaseModel.update
         */
        CastModel.prototype.update = function (data) {
             _super.prototype.update.call(this, data);

            // Override any values after the default super update method has set the values.
        };

        return CastModel;
    })();

    module.exports = CastModel;

});
