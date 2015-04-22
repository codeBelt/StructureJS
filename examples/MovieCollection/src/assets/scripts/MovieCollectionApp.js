define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var Collection = require('structurejs/model/Collection');
    var PageControlView = require('view/PageControlView');
    var ListView = require('view/ListView');
    var ModalView = require('view/ModalView');
    var RequestService = require('service/RequestService');
    var MovieVO = require('model/MovieVO');
    require('templates');
    require('utils/HandlebarsHelpers');

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

            /**
             * TODO: YUIDoc_comment
             *
             * @property _movieCollection
             * @type {Collection}
             * @private
             */
            this._movieCollection = null;
        }

        /**
         * @overridden Stage.createChildren
         */
        MovieCollectionApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._pageControls = new PageControlView(this.$element.find('.js-pageControls'));
            this.addChild(this._pageControls);
            this._pageControls.disable();// Disable right away because by default the view is enabled once passed to the addChild method.

            this._listContainer = new ListView(this.$element.find('.js-listOutput'));
            this.addChild(this._listContainer);

//            var modal = new ModalView();
//            this.addChildAt(modal, 0);

            RequestService.get('assets/data/movies.json')
                .done(this._onMovieRequestComplete.bind(this));
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

            this._pageControls.addEventListener('update', this._onUpdate, this);

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden Stage.disable
         */
        MovieCollectionApp.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            this._pageControls.removeEventListener('update', this._onUpdate, this);

            return _super.prototype.disable.call(this);
        };

       /**
        * TODO: YUIDoc_comment
        *
        * @method _onMovieRequestComplete
        * @private
        */
       MovieCollectionApp.prototype._onMovieRequestComplete = function(data) {
           this._movieCollection = new Collection(MovieVO);
           this._movieCollection.add(data.movies);

           console.log("this._movieCollection.models", this._movieCollection.models);

           this._listContainer.updateList(this._movieCollection.models);

           this._pageControls.enable();
       };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onUpdate
         * @param event {BaseEvent}
         * @private
         */
        MovieCollectionApp.prototype._onUpdate = function(event) {
            var sortType = this._pageControls.sortType;
            var displayLimit = this._pageControls.displayLimit;

            console.log("sortType", sortType);
            console.log("displayLimit", displayLimit);
            console.log("event", event);

            //this._listContainer.updateList(collection.models);
        };

        return MovieCollectionApp;
    })();

    module.exports = MovieCollectionApp;

});
