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
            Router.allowMultipleMatches = true;

            Router.add('', function (routeEvent) {
                console.log("''", routeEvent);
            }, this);
            Router.add('/', function (routeEvent) {
                console.log("/", routeEvent);
            }, this);
            Router.add(':optional:', function (routeEvent) {
                console.log(":optional:", routeEvent);
            }, this);
            Router.add('/home/', function (routeEvent) {
                console.log("/home/", routeEvent);
            }, this);
            Router.add('/home/:optional:', function (routeEvent) {
                console.log("/home/:optional:", routeEvent);
            }, this);
            Router.add('/home/:optional:/:optional:/', function (routeEvent) {
                console.log("/home/:optional:/:optional:/", routeEvent);
            }, this);
            Router.add('/{required}/', function (routeEvent) {
                console.log("/{required}/", routeEvent);
            }, this);
            Router.add('/{required}/another/', function (routeEvent) {
                console.log("/{required}/another/", routeEvent);
            }, this);
            Router.add('/contact/{page}/another/:asdf:/', function (routeEvent) {
                console.log("/contact/{page}/another/:asdf:/", routeEvent);
            }, this);
            Router.add('*', function (routeEvent) {
                console.log("*", routeEvent);
            }, this);
            Router.add('/home/*', function (routeEvent) {
                console.log("/home/*", routeEvent);
            }, this);
            Router.add('?', function (routeEvent) {
                console.log("?", routeEvent);
            }, this);
            Router.add('/home/?', function (routeEvent) {
                console.log("/home/?", routeEvent);
            }, this);
            Router.add('/:any:/?', function (routeEvent) {
                console.log("/:any:/?", routeEvent);
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
        EventBubblingApp.prototype.default = function(routeEvent) {
            console.log("default", routeEvent);
        };
        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.onHome = function(routeEvent) {
            console.log("onHome", routeEvent);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.about = function(routeEvent) {
            console.log("about", routeEvent);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.blog = function(routeEvent) {
            console.log("blog", routeEvent);
        };

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.contact = function(routeEvent) {
            console.log("contact", routeEvent);
        };

        /**
         * YUIDoc_comment
         *
         * @method query
         * @priavte
         */
        EventBubblingApp.prototype.query = function(routeEvent) {
            console.log("query", routeEvent);
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
