define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var PageControlView = require('view/PageControlView');
    var RequestService = require('service/RequestService');
    require('handlebars');

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

            /**
             * TODO: YUIDoc_comment
             *
             * @property _pageControls
             * @type {PageControlView}
             * @private
             */
            this._pageControls = null;
        }

        /**
         * @overridden Stage.createChildren
         */
        MovieCollectionApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._pageControls = new PageControlView(this.$element.find('.js-pageControls'));
            this.addChild(this._pageControls);

            RequestService.get('assets/data/movies.json')
                .done(this._onMovieRequestComplete.bind());
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

            this._pageControls

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
        * TODO: YUIDoc_comment
        *
        * @method _onMovieRequestComplete
        * @private
        */
       MovieCollectionApp.prototype._onMovieRequestComplete = function(data) {
           console.log("_onMovieRequestComplete", data);

       };

        return MovieCollectionApp;
    })();

    module.exports = MovieCollectionApp;

});
