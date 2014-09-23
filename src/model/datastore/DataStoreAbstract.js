/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../../util/Extend', '../../event/EventDispatcher', '../../event/LoaderEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../../util/Extend'), require('../../event/EventDispatcher'), require('../../event/LoaderEvent'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.DataStoreAbstract = factory(root.structurejs.Extend, root.structurejs.EventDispatcher, root.structurejs.LoaderEvent);
    }
}(this, function(Extend, EventDispatcher, LoaderEvent) {
    'use strict';

    /**
     * The DataStoreAbstract...
     *
     * @class DataStoreAbstract
     * @module StructureJS
     * @submodule model
     * @constructor
     * @param path {string}
     * @author Robert S. (www.codeBelt.com)
     */
    var DataStoreAbstract = (function () {

        var _super = Extend(DataStoreAbstract, EventDispatcher);

        function DataStoreAbstract(path) {
            _super.call(this);
            /**
             * YUIDoc_comment
             *
             * @property data
             * @type {any}
             * @public
             */
            this.data = null;
            /**
             * YUIDoc_comment
             *
             * @property src
             * @type {string}
             * @public
             */
            this.src = null;
            /**
             * YUIDoc_comment
             *
             * @property complete
             * @type {boolean}
             * @public
             */
            this.complete = false;

            this.src = path;
        }
        /**
         * YUIDoc_comment
         *
         * @method load
         * @protected
         */
        DataStoreAbstract.prototype.load = function () {
        };

        /**
         * YUIDoc_comment
         *
         * @method _onLoaderComplete
         * @protected
         */
        DataStoreAbstract.prototype._onLoaderComplete = function () {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                rest[_i] = arguments[_i + 0];
            }
            this.complete = true;
            this.dispatchEvent(new LoaderEvent(LoaderEvent.COMPLETE, false, false, this));
        };

        return DataStoreAbstract;
    })();

    return DataStoreAbstract;
}));