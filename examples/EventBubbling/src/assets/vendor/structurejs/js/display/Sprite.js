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
        define(["require", "exports", './DisplayObjectContainer'], factory);
    }
})(function (require, exports) {
    "use strict";
    var DisplayObjectContainer_1 = require('./DisplayObjectContainer');
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
        }
        Sprite.prototype.create = function () {
            _super.prototype.create.call(this);
            this.useHandCursor = true;
            this.mouseEnabled = true;
        };
        Sprite.prototype.renderCanvas = function () {
            var isRendable = _super.prototype.renderCanvas.call(this);
            if (isRendable === false)
                return;
            var newWidth;
            var newHeight;
            var child;
            for (var i = 0; i < this.numChildren; i++) {
                child = this.children[i];
                child.renderCanvas();
                newWidth = child.x + child.width;
                newHeight = child.y + child.height;
                this.width = (newWidth > this.width) ? newWidth : this.width;
                this.height = (newHeight > this.height) ? newHeight : this.height;
            }
        };
        Sprite.prototype.addChild = function (child) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.push(child);
            this.numChildren = this.children.length;
            child.ctx = this.ctx;
            child.stage = this.stage;
            child.parent = this;
            if (child.isCreated === false) {
                child.create();
                child.isCreated = true;
            }
            child.enable();
            return this;
        };
        Sprite.prototype.removeChild = function (child, destroy) {
            if (destroy === void 0) { destroy = true; }
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }
            this.numChildren = this.children.length;
            if (destroy === true) {
                child.destroy();
            }
            else {
                child.disable();
            }
            child.ctx = null;
            child.stage = null;
            child.parent = null;
            return this;
        };
        return Sprite;
    }(DisplayObjectContainer_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Sprite;
});
