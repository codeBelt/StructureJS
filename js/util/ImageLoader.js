var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", '../event/EventDispatcher', '../event/LoaderEvent'], function (require, exports) {
    var EventDispatcher = require('../event/EventDispatcher');
    var LoaderEvent = require('../event/LoaderEvent');
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
            this.init();
        }
        ImageLoader.prototype.init = function () {
            var _this = this;
            this._image = new Image();
            this._image.onload = function (event) {
                _this.onImageLoad();
            };
        };
        ImageLoader.prototype.load = function () {
            this._image.src = this.src;
        };
        ImageLoader.prototype.onImageLoad = function () {
            this.data = this._image;
            this.complete = true;
            this.dispatchEvent(LoaderEvent.COMPLETE);
        };
        return ImageLoader;
    })(EventDispatcher);
    return ImageLoader;
});
