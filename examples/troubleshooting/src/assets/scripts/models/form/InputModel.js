"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseModel_1 = require("../../../../../../../ts/model/BaseModel");
/**
 * @class InputModel
 * @extends BaseModel
 * @constructor
 **/
var InputModel = (function (_super) {
    __extends(InputModel, _super);
    function InputModel(data, opts) {
        if (data === void 0) { data = {}; }
        if (opts === void 0) { opts = {}; }
        var _this = _super.call(this, opts) || this;
        /**
         * @property id
         * @type {string}
         * @public
         */
        _this.id = null;
        if (data) {
            _this.update(data);
        }
        return _this;
    }
    /**
     * @overridden BaseModel.update
     */
    InputModel.prototype.update = function (data) {
        _super.prototype.update.call(this, data);
        // Override any values after the default super update method has set the values.
    };
    return InputModel;
}(BaseModel_1["default"]));
exports.__esModule = true;
exports["default"] = InputModel;
//# sourceMappingURL=InputModel.js.map