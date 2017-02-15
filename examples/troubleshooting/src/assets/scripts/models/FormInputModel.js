"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var FormInputModel = (function (_super) {
    __extends(FormInputModel, _super);
    function FormInputModel(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        _this.value = null;
        _this.errorMessage = '';
        _this.isValid = true;
        _this.validators = [];
        _this.ignoreValidation = false;
        _this.update(data);
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    FormInputModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    FormInputModel.prototype.validate = function () {
        var _this = this;
        this.isValid = this
            .validators
            .map(function (validationFunction) { return validationFunction(_this.value); })
            .every(function (value) { return value === true; });
    };
    return FormInputModel;
}(BaseModel_1["default"]));
exports.__esModule = true;
exports["default"] = FormInputModel;
//# sourceMappingURL=FormInputModel.js.map