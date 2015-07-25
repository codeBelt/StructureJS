/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./Extend', '../event/EventDispatcher', '../event/LoaderEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('./Extend'), require('../event/EventDispatcher'), require('../event/LoaderEvent'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.ImageLoader = factory(root.StructureJS.Extend, root.StructureJS.EventDispatcher, root.StructureJS.EventDispatcher);
    }
}(this, function(Extend, EventDispatcher, LoaderEvent) {

    'use strict';

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
    var ImageLoader = (function() {

        var _super = Extend(ImageLoader, EventDispatcher);

        function ImageLoader(path) {
            _super.call(this);
            this.complete = false;
            this.src = path;
            this.init();
        }
        ImageLoader.prototype.init = function() {
            var _this = this;
            this._image = new Image();
            this._image.onload = function(event) {
                _this.onImageLoad();
            };
        };
        ImageLoader.prototype.load = function() {
            this._image.src = this.src;
        };
        ImageLoader.prototype.onImageLoad = function() {
            this.data = this._image;
            this.complete = true;
            this.dispatchEvent(LoaderEvent.COMPLETE);
        };
        return ImageLoader;
    })();

    return ImageLoader;
}));
