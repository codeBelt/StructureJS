"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FormViewModel_1 = require("./FormViewModel");
var ValidateService_1 = require("../services/ValidateService");
var FormInputModel_1 = require("./FormInputModel");
var GuestViewModel = (function (_super) {
    __extends(GuestViewModel, _super);
    function GuestViewModel(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        _this.firstName = new FormInputModel_1["default"]({
            validators: [
                ValidateService_1["default"].isNotEmpty,
            ],
            errorMessage: 'Please enter a first name.'
        });
        _this.lastName = new FormInputModel_1["default"]({
            validators: [
                ValidateService_1["default"].isNotEmpty,
            ],
            errorMessage: 'Please enter a last name.'
        });
        _this.email = new FormInputModel_1["default"]({
            validators: [
                ValidateService_1["default"].isValidEmail,
                ValidateService_1["default"].maxLength(100),
            ],
            errorMessage: 'Please enter a valid email address'
        });
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    GuestViewModel.prototype.update = function (data) {
        return _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return GuestViewModel;
}(FormViewModel_1["default"]));
exports.__esModule = true;
exports["default"] = GuestViewModel;
//# sourceMappingURL=GuestViewModel.js.map