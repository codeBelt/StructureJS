/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DisplayObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DisplayObject'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.TextField = factory(root.StructureJS.Extend, root.StructureJS.DisplayObject);
    }
}(this, function(Extend, DisplayObject) {

    'use strict';

    var TextField = (function() {

        var _super = Extend(TextField, DisplayObject);

        function TextField() {
            _super.call(this);
            this.text = '';
            this.style = 'normal';
            this.font = 'Verdana';
            this.size = '14px';
            this.color = '#000000';
            this.lineHeight = 14;
        }
        TextField.prototype.create = function() {
            _super.prototype.create.call(this);
        };
        TextField.prototype.layout = function() {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x, this.y);
            this.ctx.font = [this.style, this.size, this.font].join(' ');
            this.ctx.fillStyle = this.color;
            this.ctx.textBaseline = 'top'; //http://www.ckollars.org/canvas-text-centering.html
            if (this.text.indexOf('\n') !== -1) {
                this.wrapTextOnLineBreak(this.ctx, this.text, 0, 0, this.lineHeight);
            } else if (this.width > 0) {
                this.wrapTextByWidth(this.ctx, this.text, 0, 0, this.width, this.lineHeight);
            } else {
                this.ctx.fillText(this.text, 0, 0);
            }
        };
        TextField.prototype.wrapTextByWidth = function(context, text, x, y, maxWidth, lineHeight) {
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
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        };
        TextField.prototype.wrapTextOnLineBreak = function(context, text, x, y, lineHeight) {
            var wordList = text.split('\n');
            var length = wordList.length;
            for (var i = 0; i < length; i++) {
                context.fillText(wordList[i], x, y);
                y += lineHeight;
            }
        };
        return TextField;
    })();

    return TextField;
}));
