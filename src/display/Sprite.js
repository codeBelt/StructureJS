/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DisplayObjectContainer'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DisplayObjectContainer'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Sprite = factory(root.StructureJS.Extend, root.StructureJS.DisplayObjectContainer);
    }
}(this, function(Extend, DisplayObjectContainer) {

    'use strict';

    var Sprite = (function() {

        var _super = Extend(Sprite, DisplayObjectContainer);

        function Sprite() {
            _super.call(this);
        }
        Sprite.prototype.create = function() {
            _super.prototype.create.call(this);
            this.useHandCursor = true;
            this.mouseEnabled = true;
        };
        Sprite.prototype.update = function() {
            var isRendable = _super.prototype.update.call(this);
            if (isRendable === false)
                return;
            var newWidth;
            var newHeight;
            var child;
            for (var i = 0; i < this.numChildren; i++) {
                child = this.children[i];
                child.update();
                newWidth = child.x + child.width;
                newHeight = child.y + child.height;
                this.width = (newWidth > this.width) ? newWidth : this.width;
                this.height = (newHeight > this.height) ? newHeight : this.height;
            }
        };
        Sprite.prototype.addChild = function(child) {
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
        Sprite.prototype.removeChild = function(child, destroy) {
            if (destroy === void 0) {
                destroy = true;
            }
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }
            this.numChildren = this.children.length;
            if (destroy === true) {
                child.destroy();
            } else {
                child.disable();
            }
            child.ctx = null;
            child.stage = null;
            child.parent = null;
            return this;
        };
        return Sprite;
    })();

    return Sprite;
}));