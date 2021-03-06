var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./DisplayObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DisplayObject_1 = require("./DisplayObject");
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            var _this = _super.call(this) || this;
            _this.text = '';
            _this.style = 'normal';
            _this.font = 'Verdana';
            _this.size = '14px';
            _this.color = '#000000';
            _this.lineHeight = 14;
            return _this;
        }
        TextField.prototype.create = function () {
            _super.prototype.create.call(this);
        };
        TextField.prototype.layout = function () {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x, this.y);
            this.ctx.font = [this.style, this.size, this.font].join(' ');
            this.ctx.fillStyle = this.color;
            this.ctx.textBaseline = 'top'; //http://www.ckollars.org/canvas-text-centering.html
            if (this.text.indexOf('\n') !== -1) {
                this._wrapTextOnLineBreak(this.ctx, this.text, 0, 0, this.lineHeight);
            }
            else if (this.width > 0) {
                this._wrapTextByWidth(this.ctx, this.text, 0, 0, this.width, this.lineHeight);
            }
            else {
                this.ctx.fillText(this.text, 0, 0);
            }
        };
        TextField.prototype._wrapTextByWidth = function (context, text, x, y, maxWidth, lineHeight) {
            var wordList = text.split(' ');
            var line = '';
            var testLine;
            var metrics;
            var testWidth;
            var length = wordList.length;
            for (var i = 0; i < length; i++) {
                testLine = line + wordList[i] + ' ';
                metrics = context.measureText(testLine);
                testWidth = metrics.width;
                if (testWidth > maxWidth && i > 0) {
                    context.fillText(line, x, y);
                    line = wordList[i] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        };
        TextField.prototype._wrapTextOnLineBreak = function (context, text, x, y, lineHeight) {
            var wordList = text.split('\n');
            var length = wordList.length;
            for (var i = 0; i < length; i++) {
                context.fillText(wordList[i], x, y);
                y += lineHeight;
            }
        };
        return TextField;
    }(DisplayObject_1.default));
    exports.default = TextField;
});
