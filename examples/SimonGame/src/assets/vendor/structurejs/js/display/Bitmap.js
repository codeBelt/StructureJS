var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DisplayObject', '../util/MathUtil'], factory);
    }
})(function (require, exports) {
    "use strict";
    var DisplayObject_1 = require('./DisplayObject');
    var MathUtil_1 = require('../util/MathUtil');
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(image) {
            _super.call(this);
            this.ready = false;
            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
            this.setSize(this.width, this.height);
        }
        Bitmap.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        Bitmap.prototype.layout = function () {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.ctx.scale(this.parent.scaleX, this.parent.scaleY);
            this.ctx.scale(this.scaleX, this.scaleY);
            this.ctx.rotate(MathUtil_1.default.degreesToRadians(this.parent.rotation));
            this.ctx.rotate(MathUtil_1.default.degreesToRadians(this.rotation));
            this.ctx.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.ctx.drawImage(this._image, 0, 0);
        };
        return Bitmap;
    }(DisplayObject_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Bitmap;
});
