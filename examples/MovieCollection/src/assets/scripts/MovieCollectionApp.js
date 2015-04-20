define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');

    /**
     * TODO: YUIDoc_comment
     *
     * @class MovieCollectionApp
     * @extends Stage
     * @constructor
     **/
    var MovieCollectionApp = (function () {

        var _super = Extend(MovieCollectionApp, Stage);

        function MovieCollectionApp() {
            _super.call(this);

        }

        /**
         * @overridden Stage.createChildren
         */
        MovieCollectionApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // Create and add your child objects to this parent class.
        };

        /**
         * @overridden Stage.layoutChildren
         */
        MovieCollectionApp.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden Stage.enable
         */
        MovieCollectionApp.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden Stage.disable
         */
        MovieCollectionApp.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden Stage.destroy
         */
        MovieCollectionApp.prototype.destroy = function () {
            // Call destroy on any child objects that is need.
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return MovieCollectionApp;
    })();

    module.exports = MovieCollectionApp;

});
