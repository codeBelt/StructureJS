/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DisplayObject', '../util/MathUtil'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DisplayObject'), require('../util/MathUtil'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Bitmap = factory(root.StructureJS.Extend, root.StructureJS.DisplayObject, root.StructureJS.MathUtil);
    }
}(this, function(Extend, DisplayObject, MathUtil) {

    'use strict';


    var Bitmap = (function() {

        var _super = Extend(Bitmap, DisplayObject);

        function Bitmap(image) {
            _super.call(this);
            this.ready = false;
            this._image = image;
            this.width = this._image.width;
            this.height = this._image.height;
        }
        Bitmap.prototype.create = function() {
            _super.prototype.create.call(this);
        };
        Bitmap.prototype.layout = function() {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
            this.ctx.scale(this.parent.scaleX, this.parent.scaleY);
            this.ctx.scale(this.scaleX, this.scaleY);
            this.ctx.rotate(MathUtil.degreesToRadians(this.parent.rotation));
            this.ctx.rotate(MathUtil.degreesToRadians(this.rotation));
            this.ctx.translate(-(this.width * 0.5), -(this.height * 0.5));
            this.ctx.drawImage(this._image, 0, 0);
        };
        return Bitmap;
    })();

    return Bitmap;
}));
