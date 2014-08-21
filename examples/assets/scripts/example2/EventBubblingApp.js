define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var EventBroker = require('structurejs/event/EventBroker');
    var GrandparentView = require('example2/view/GrandparentView');
    var Router = require('structurejs/controller/Router');

    /**
     * YUIDoc_comment
     *
     * @class EventBubblingApp
     * @extends Stage
     * @constructor
     **/
    var EventBubblingApp = (function () {

        var _super = Extend(EventBubblingApp, Stage);

        function EventBubblingApp() {
            _super.call(this);

            this._grandpaView = null;
            this._clearButton = null;
            this._$stageMessage = null;

            Router.useDeepLinking = true;
            Router.allowManualDeepLinking = true;

            Router.add('', function () {
                console.log("''", arguments);
            }, this);
            Router.add('/', function () {
                console.log("/", arguments);
            }, this);
            Router.add(':optional:', function () {
                console.log(":optional:", arguments);
            }, this);
            Router.add('/home/', function () {
                console.log("/home/", arguments);
            }, this);
            Router.add('/home/:optional:', function () {
                console.log("/home/:optional:", arguments);
            }, this);
            Router.add('/home/:optional:/:optional:/', function () {
                console.log("/home/:optional:/:optional:/", arguments);
            }, this);
            Router.add('/{required}/', function () {
                console.log("/{required}/", arguments);
            }, this);
            Router.add('/{required}/another/', function () {
                console.log("/{required}/another/", arguments);
            }, this);
            Router.add('/contact/{page}/another/:asdf:/', function () {
                console.log("/contact/{page}/another/:asdf:/", arguments);
            }, this);
            Router.add('*', function () {
                console.log("*", arguments);
            }, this);
            Router.add('/home/*', function () {
                console.log("/home/*", arguments);
            }, this);
            Router.add('?', function () {
                console.log("?", arguments);
            }, this);
            Router.add('/home/?', function () {
                console.log("/home/?", arguments);
            }, this);
            Router.add('/:any:/?', function () {
                console.log("/:any:/?", arguments);
            }, this);
            Router.addDefault(this.default, this);

            Router.start();

            $('.js-route').on('click', function(event){
                event.preventDefault();
                var $target = $(event.target);
                Router.navigateTo($target.attr('href'));
            }.bind(this));
        }

        /**
         * YUIDoc_comment
         *
         * @method default
         * @private
         */
        EventBubblingApp.prototype.default = function() {
            console.log("default", arguments);
        };
        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.onHome = function(param) {
            console.log("onHome", arguments);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.about = function(param) {
            console.log("about", arguments);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.blog = function(param) {
            console.log("blog", arguments);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.contact = function(param) {
            console.log("contact", arguments);
        };

        /**
         * YUIDoc_comment
         *
         * @method query
         * @priavte
         */
        EventBubblingApp.prototype.query = function(param) {
            console.log("query", arguments);
        };


        /**
         * @overridden EventBubblingApp.createChildren
         */
        EventBubblingApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._grandpaView = new GrandparentView();
            this.addChild(this._grandpaView);

            this._clearButton = this.getChild('#js-clearButton');
            this._$stageMessage = this.$element.find('.js-message');
        };

        /**
         * @overridden Stage.layoutChildren
         */
        EventBubblingApp.prototype.layoutChildren = function () {
            this._$stageMessage.css('opacity', 0);
            this._grandpaView.layoutChildren();

            return this;
        };

        /**
         * @overridden Stage.enable
         */
        EventBubblingApp.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);
            //EventBroker.addEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.addEventListener('click', this.onClearClick, this);
            this._grandpaView.enable();

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden Stage.disable
         */
        EventBubblingApp.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this.removeEventListener(BaseEvent.CHANGE, this.onBubbled, this);

            this._clearButton.$element.removeEventListener('click', this.onClearClick, this);
            this._grandpaView.disable();

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden Stage.destroy
         */
        EventBubblingApp.prototype.destroy = function () {
            _super.prototype.destroy();

            this._grandpaView.destroy();
            this._grandpaView = null;

            this._clearButton.destroy();
            this._clearButton = null;

            this._$stageMessage = null;
        };

        EventBubblingApp.prototype.onClearClick = function (event) {
            this.layoutChildren();
        };

        EventBubblingApp.prototype.onBubbled = function (event) {
            this._$stageMessage.css('opacity', 1);
        };

        return EventBubblingApp;
    })();

    module.exports = EventBubblingApp;

});
