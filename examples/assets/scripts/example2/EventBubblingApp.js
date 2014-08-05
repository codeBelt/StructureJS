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

           /* var optionalForwardSlash = new RegExp('(\/)?');
            var findForwardSlashes = new RegExp('\/', 'g');
            var selectFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g');
            var findRequiredBrackets = new RegExp('\{([^}]+)\}', 'g'); // Finds the brackets { }
            var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons :

            var str = '/blog/:id:/';
            str = str.replace(selectFirstOrLastForwardSlash, '');// Remove first and last forward slash.
            console.log(str);
            str = str.replace(findForwardSlashes, '\\/');// Escape the forward slashes ( / ) so it will look like "\/" so that it will be used a literal forward slash.
            console.log(str);
            str = str.replace(findOptionalColons,'(\\w*)');
            str = optionalForwardSlash.source + str + optionalForwardSlash.source;
            console.log(str);
            var s = '/blog/';
            console.log(s.match(str));*/
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
