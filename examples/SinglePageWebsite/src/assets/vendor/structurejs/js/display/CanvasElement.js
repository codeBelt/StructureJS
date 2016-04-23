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
        define(["require", "exports", './DisplayObjectContainer', './DOMElement', '../geom/Point'], factory);
    }
})(function (require, exports) {
    "use strict";
    var DisplayObjectContainer_1 = require('./DisplayObjectContainer');
    var DOMElement_1 = require('./DOMElement');
    var Point_1 = require('../geom/Point');
    var CanvasElement = (function (_super) {
        __extends(CanvasElement, _super);
        // Notice the capital W and H. That sets the attributes not the styles.
        function CanvasElement(type, params) {
            if (type === void 0) { type = 'canvas'; }
            if (params === void 0) { params = { Width: 100, Height: 100 }; }
            _super.call(this, type, params);
            this.$canvas = null;
            this.canvas = null;
        }
        /**
         * @overridden CanvasElement.create
         */
        CanvasElement.prototype.create = function () {
            _super.prototype.create.call(this);
            this.$canvas = this.$element;
            this.canvas = this.element;
            this.ctx = this.canvas.getContext('2d');
        };
        /**
         * @overridden CanvasElement.enable
         */
        CanvasElement.prototype.enable = function () {
            if (this.isEnabled === true) {
                return;
            }
            // Add mouse event listeners to $canvas element
            this.$canvas.addEventListener('mousedown', this._onPointerDown, this);
            this.$canvas.addEventListener('mousemove', this._onPointerMove, this);
            this.$canvas.addEventListener('mouseup', this._onPointerUp, this);
            this.$canvas.addEventListener('mouseout', this._onPointerOut, this);
            // Add touch event listeners to $canvas element
            this.$canvas.addEventListener('touchstart', this._onPointerDown, this);
            this.$canvas.addEventListener('touchmove', this._onPointerMove, this);
            this.$canvas.addEventListener('touchend', this._onPointerUp, this);
            this.$canvas.addEventListener('touchcancel', this._onPointerOut, this);
            _super.prototype.enable.call(this);
        };
        /**
         * @overridden CanvasElement.disable
         */
        CanvasElement.prototype.disable = function () {
            if (this.isEnabled === false) {
                return;
            }
            // Remove mouse event listeners on $canvas element
            this.$canvas.removeEventListener('mousedown', this._onPointerDown, this);
            this.$canvas.removeEventListener('mousemove', this._onPointerMove, this);
            this.$canvas.removeEventListener('mouseup', this._onPointerUp, this);
            this.$canvas.removeEventListener('mouseout', this._onPointerOut, this);
            // Remove touch event listeners on $canvas element
            this.$canvas.removeEventListener('touchstart', this._onPointerDown, this);
            this.$canvas.removeEventListener('touchmove', this._onPointerMove, this);
            this.$canvas.removeEventListener('touchend', this._onPointerUp, this);
            this.$canvas.removeEventListener('touchcancel', this._onPointerOut, this);
            _super.prototype.disable.call(this);
        };
        /**
         * @overridden DOMElement.addChild
         */
        CanvasElement.prototype.addChild = function (child) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.push(child);
            this.numChildren = this.children.length;
            child.ctx = this.ctx;
            child.stage = this;
            child.parent = this;
            if (child.isCreated === false) {
                child.create();
                child.isCreated = true;
            }
            child.enable();
            return this;
        };
        /**
         * @overridden DOMElement.addChildAt
         */
        CanvasElement.prototype.addChildAt = function (child, index) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.ctx = this.ctx;
            child.stage = this;
            child.parent = this;
            if (child.isCreated === false) {
                child.create();
                child.isCreated = true;
            }
            child.enable();
            return this;
        };
        /**
         * @overridden DOMElement.swapChildren
         */
        CanvasElement.prototype.swapChildren = function (child1, child2) {
            var child1Index = this.children.indexOf(child1);
            var child2Index = this.children.indexOf(child2);
            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);
            return this;
        };
        /**
         * @overridden DOMElement.getChildAt
         */
        CanvasElement.prototype.getChildAt = function (index) {
            return _super.prototype.getChildAt.call(this, index);
        };
        /**
         * @overridden DOMElement.removeChild
         */
        CanvasElement.prototype.removeChild = function (child, destroy) {
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
        /**
         * @overridden DOMElement.removeChildAt
         */
        CanvasElement.prototype.removeChildAt = function (index, destroy) {
            if (destroy === void 0) { destroy = true; }
            this.removeChild(this.getChildAt(index), destroy);
            return this;
        };
        /**
         * @overridden DOMElement.removeChildren
         */
        CanvasElement.prototype.removeChildren = function (destroy) {
            if (destroy === void 0) { destroy = true; }
            while (this.children.length > 0) {
                this.removeChild(this.children.pop(), destroy);
            }
            return this;
        };
        CanvasElement.prototype.renderCanvas = function () {
            this.ctx.clearRect(0, 0, this.width, this.height);
            for (var i = 0; i < this.numChildren; i++) {
                this.children[i].renderCanvas();
            }
        };
        CanvasElement.prototype.getMousePos = function (event) {
            var rect = this.canvas.getBoundingClientRect();
            return new Point_1.default(event.clientX - rect.left, event.clientY - rect.top);
        };
        CanvasElement.prototype.getObjectUnderPoint = function (x, y) {
            var foundItem = null;
            var sprite;
            for (var i = this.numChildren - 1; i >= 0; i--) {
                sprite = this.children[i];
                if (sprite.visible === true && sprite.mouseEnabled === true) {
                    if (this.hitTest(sprite, x, y)) {
                        foundItem = sprite;
                        break;
                    }
                }
            }
            return foundItem;
        };
        CanvasElement.prototype.getObjectsUnderPoint = function (x, y) {
            var list = [];
            var sprite;
            for (var i = this.numChildren - 1; i >= 0; i--) {
                sprite = this.children[i];
                if (this.hitTest(sprite, x, y)) {
                    list.push(sprite);
                }
            }
            return list;
        };
        CanvasElement.prototype.hitTest = function (sprite, mouseX, mouseY) {
            if (mouseX >= sprite.x && mouseX <= sprite.x + sprite.width && mouseY >= sprite.y && mouseY <= sprite.y + sprite.height) {
                return true;
            }
            else {
                return false;
            }
        };
        CanvasElement.prototype._onPointerDown = function (event) {
            this._sendEvent(event);
        };
        CanvasElement.prototype._onPointerUp = function (event) {
            this._sendEvent(event);
        };
        CanvasElement.prototype._onPointerMove = function (event) {
            var displayObject = this._sendEvent(event);
            if (displayObject != null && displayObject.useHandCursor === true && displayObject.visible === true) {
                document.body.style.cursor = 'pointer';
            }
            else {
                document.body.style.cursor = 'default';
            }
        };
        CanvasElement.prototype._onPointerOut = function (event) {
            this._sendEvent(event);
        };
        CanvasElement.prototype._sendEvent = function (event) {
            var mousePos = this.getMousePos(event);
            var displayObject = this.getObjectUnderPoint(mousePos.x, mousePos.y);
            if (displayObject === null) {
                event.bubbles = true;
                event.target = this;
                event.currentTarget = this;
                this.dispatchEvent(event);
            }
            else if (displayObject !== null && displayObject instanceof DisplayObjectContainer_1.default && displayObject.mouseChildren === true) {
                event.currentTarget = displayObject;
                displayObject = this._getActualClickedOnChild(displayObject, mousePos.x, mousePos.y);
                event.bubbles = true;
                event.target = displayObject;
                displayObject.dispatchEvent(event);
            }
            else {
                event.bubbles = true;
                event.target = displayObject;
                event.currentTarget = this;
                displayObject.dispatchEvent(event);
            }
            return displayObject;
        };
        CanvasElement.prototype._getActualClickedOnChild = function (displayObject, x, y) {
            var item;
            var newX;
            var newY;
            if (displayObject.numChildren > 0) {
                for (var i = displayObject.numChildren - 1; i >= 0; i--) {
                    item = displayObject.children[i];
                    if (item.visible === true) {
                        newX = x - item.parent.x;
                        newY = y - item.parent.y;
                        if (this.hitTest(item, newX, newY)) {
                            return this._getActualClickedOnChild(item, newX, newY);
                        }
                    }
                }
            }
            else {
                return displayObject;
            }
        };
        return CanvasElement;
    }(DOMElement_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CanvasElement;
});
