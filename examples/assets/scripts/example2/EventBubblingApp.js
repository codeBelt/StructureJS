define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var BaseEvent = require('structurejs/event/BaseEvent');
    var EventBroker = require('structurejs/event/EventBroker');
    var GrandparentView = require('example2/view/GrandparentView');
    var Router = require('../../../../ts/structurets/controller/Router');
    var RouterManager = require('../../../../ts/structurets/controller/RouterManager');

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

            this._router = new RouterManager();
            this._router.createRoute('home', 'home');
            this._router.start();

            console.log(" this._router",  this._router);

            Router.add('/home/', this.onHome, this);
            Router.add('/home/:id:/', this.onHome, this);
            Router.add('/contact/:dd:/:ee:/', this.onHome, this);

            // Regex Helpers
//var optionalForwardSlash = new RegExp('(\/)?');
            var findForwardSlashes = new RegExp('\/', 'g');
            var selectFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g');
            var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
            var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons :

//https://github.com/codeBelt/StructureTS/blob/master/src/com/millermedeiros/crossroads/PatternLexer.ts

// Example Paths
            var path1 = '/home/';
            var path2 = '/home/:id:/';
            var path3 = '/home/:id:/:id:/';
            var path4 = '/home/:id:/another/:asdf:/';
            var path5 = '/blog/{page}';
            var path6 = '/blog/{page}/cool/{page}/{page}/';
            var path7 = '/blog/{page}/another/:asdf:/';

            var obj1 = {
                route: '/home/',
                passRoute: '/home/',
                failRoute: ''
            };

            var obj2 = {
                route: '/home/:id:/',
                passRoute: '/home/123/',
                failRoute: '/home/123/123'
            };

            var obj3 = {
                route: '/home/:id:/:id:/',
                passRoute: '/home/123/323/',
                passRoute2: '/home/123/',
                failRoute: '/home/123/123/123'
            };

            var obj4 = {
                route: '/home/:id:/another/:asdf:/',
                passRoute: '/home/123/another/',
                passRoute2: '/home/123/another/4356/',
                failRoute: '/home/123/'
            };

            var obj5 = {
                route: '/blog/{page}/',
                passRoute: '/blog/another/',
                failRoute: '/blog/'
            };

            var obj6 = {
                route: '/blog/{page}/cool/{page}/{page}/',
                passRoute: '/blog/one/cool/two/three/',
                failRoute: '/blog/one/cool/'
            };

            var obj7 = {
                route: '/blog/{page}/another/:asdf:/',
                passRoute: '/blog/123/another/',
                passRoute2: '/blog/123/another/4356/',
                failRoute: '/blog/123/'
            };

            var route = obj5.route;
            var testRoute = obj5.passRoute;

            console.log("--------------------------------------------------------------");
            console.log("Original: " + route);

// Remove first and last forward slash.
            route = route.replace(selectFirstOrLastForwardSlash, '');
            console.log("Remove first and last forward slash: " + route);

// Escape the forward slashes ( / ) so it will look like "\/"
            route = route.replace(findForwardSlashes, '\\/');
            console.log("Escape the forward slashes: " +  route);

// Make any :word: optional
            route = route.replace(findOptionalColons,'(\\w*)');
            console.log("Add optional regex", route);

// Make any {word} optional
            route = route.replace(findRequiredBrackets,'(\\w+)');
            console.log("Add requried regex", route);

            var routeRegex = new RegExp('^/?' + route + '/?$', 'i');

            console.log("Match: " + testRoute.match(routeRegex));
            console.log("--------------------------------------------------------------");
        }

        /**
         * YUIDoc_comment
         *
         * @method onHome
         * @priavte
         */
        EventBubblingApp.prototype.onHome = function() {
            console.log("home", arguments);
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
