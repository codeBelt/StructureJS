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
        define(["require", "exports", '../event/EventDispatcher', '../event/LoaderEvent'], factory);
    }
})(function (require, exports) {
    "use strict";
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var LoaderEvent_1 = require('../event/LoaderEvent');
    /**
     * The ImageLoader...
     *
     * @class ImageLoader
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader(path) {
            _super.call(this);
            this.complete = false;
            this.src = path;
            this._init();
        }
        ImageLoader.prototype._init = function () {
            var _this = this;
            this._image = new Image();
            this._image.onload = function (event) {
                _this._onImageLoad();
            };
        };
        ImageLoader.prototype.load = function () {
            this._image.src = this.src;
        };
        ImageLoader.prototype._onImageLoad = function () {
            this.data = this._image;
            this.complete = true;
            this.dispatchEvent(LoaderEvent_1.default.COMPLETE);
        };
        return ImageLoader;
    }(EventDispatcher_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ImageLoader;
});
