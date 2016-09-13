'use strict';

// Imports
var Extend = require('../../../js/util/Extend');
var BaseModel = require('../../../js/model/BaseModel');
var StringUtil = require('../../../js/util/StringUtil');

/**
 * TODO: YUIDoc_comment
 *
 * @class DotNetAbstractModel
 * @extends BaseModel
 * @constructor
 **/
var DotNetAbstractModel = (function () {

    var _super = Extend(DotNetAbstractModel, BaseModel);

    function DotNetAbstractModel(data) {
        _super.call(this);

        this.name = null;
        this.age = null;
        this.dateOfBirth = null;

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    DotNetAbstractModel.prototype.update = function (data) {
        var camelCaseVersion;

        for (var key in data)
        {
            camelCaseVersion = StringUtil.toCamelCase(key);

            this._setData(camelCaseVersion, data[key]);
        }

        this.dateOfBirth = new Date(data.DateOfBirth);

        return this;
    };

    /**
     * YUIDoc_comment
     *
     * @method toPascalCaseJSON
     * @public
     */
    DotNetAbstractModel.prototype.toPascalCaseJSON = function() {
        return this._toPascalCase(this.toJSON());
    };

    /**
     * YUIDoc_comment
     *
     * @method _toPascalCase
     * @private
     */
    DotNetAbstractModel.prototype._toPascalCase = function(obj) {
        var newObj = {};
        var pascalCaseVersion;

        for (var key in obj)
        {
            pascalCaseVersion = StringUtil.toPascalCase(key);

            if (obj.hasOwnProperty(key))
            {
                if (obj[key] instanceof Object) {
                    newObj[pascalCaseVersion] = this._toPascalCase(obj[key]);
                } else {
                    newObj[pascalCaseVersion] = obj[key];
                }
            }
        }

        return newObj;
    };

    return DotNetAbstractModel;
})();

module.exports = DotNetAbstractModel;
