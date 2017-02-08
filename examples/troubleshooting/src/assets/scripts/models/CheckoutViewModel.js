"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../ts/model/BaseModel");
var InputModel_1 = require("./form/InputModel");
/**
 * @class CheckoutViewModel
 * @extends ApiBaseModel
 * @constructor
 **/
var CheckoutViewModel = (function (_super) {
    __extends(CheckoutViewModel, _super);
    function CheckoutViewModel(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * @property pickHowOptions
         * @type {Array<{}>}
         * @public
         */
        _this.pickHowOptions = [
            new InputModel_1["default"]({
                id: 'one'
            }),
            new InputModel_1["default"]({
                id: 'two'
            }),
        ];
        _this.test = InputModel_1["default"];
        _this.testArray = [InputModel_1["default"]];
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden ApiBaseModel.update
     */
    CheckoutViewModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return CheckoutViewModel;
}(BaseModel_1["default"]));
exports.__esModule = true;
exports["default"] = CheckoutViewModel;
//# sourceMappingURL=CheckoutViewModel.js.map