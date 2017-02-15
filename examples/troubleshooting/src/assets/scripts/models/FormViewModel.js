"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var FormInputModel_1 = require("./FormInputModel");
var FormViewModel = (function (_super) {
    __extends(FormViewModel, _super);
    function FormViewModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isValid = true;
        _this.generalError = null;
        _this.isSubmittingForm = false;
        return _this;
    }
    FormViewModel.prototype.validate = function () {
        var _this = this;
        var validationList = [];
        Object
            .keys(this)
            .forEach(function (propertyName) {
            var property = _this[propertyName];
            if (property instanceof FormInputModel_1["default"] === true && property.ignoreValidation === false) {
                var formInputModel = property;
                formInputModel.validate();
                validationList.push(formInputModel.isValid);
            }
        });
        this.isValid = validationList.every(function (value) { return value === true; });
        this.generalError = null;
    };
    FormViewModel.prototype.reset = function () {
        var _this = this;
        Object
            .keys(this)
            .forEach(function (propertyName) {
            var property = _this[propertyName];
            if (property instanceof FormInputModel_1["default"] === true && property.ignoreValidation === false) {
                var formInputModel = property;
                formInputModel.value = null;
                formInputModel.isValid = true;
            }
        });
        this.isValid = true;
        this.generalError = null;
    };
    return FormViewModel;
}(BaseModel_1["default"]));
exports.__esModule = true;
exports["default"] = FormViewModel;
//# sourceMappingURL=FormViewModel.js.map