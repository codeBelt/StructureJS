define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var Router = require('structurejs/controller/Router');
    var HomeView = require('view/home/HomeView');
    var ServicesView = require('view/services/ServicesView');
    var AboutView = require('view/about/AboutView');
    var ContactView = require('view/contact/ContactView');
    var MenuView = require('view/menu/MenuView');
    var FooterView = require('view/footer/FooterView');
    var HeaderView = require('view/header/HeaderView');

    /**
     * YUIDoc_comment
     *
     * @class RootView
     * @extends DOMElement
     * @constructor
     **/
    var RootView = (function () {

        var _super = Extend(RootView, DOMElement);

        function RootView() {
            _super.call(this);

            /**
             * @property _headerView
             * @type {HeaderView}
             * @private
             */
            this._headerView = null;

            /**
             * @property _footerView
             * @type {FooterView}
             * @private
             */
            this._footerView = null;

            /**
             * @property _currentView
             * @type {DOMElement}
             * @private
             */
            this._currentView = null;
        }

        /**
         * @overridden DOMElement.createChildren
         */
        RootView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this, 'div', {'id': 'pageWrapper'});

            this._headerView = new HeaderView();
            this.addChild(this._headerView);

            this._footerView = new FooterView();
            this.addChild(this._footerView);

            Router.add('', this.homeRouterHandler, this);
            Router.add('about', this.aboutRouterHandler, this);
            Router.add('contact', this.contactRouterHandler, this);
            Router.add('services', this.servicesRouterHandler, this);
            Router.add('menu', this.menuRouterHandler, this);
            Router.add(':all:', this._allRouterHandler, this);
            Router.start();
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        RootView.prototype.layoutChildren = function () {
            if (this._currentView) {
                this._currentView.layoutChildren();
            }

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        RootView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            if (this._currentView) {
                this._currentView.enable();
            }

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        RootView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            if (this._currentView) {
                this._currentView.disable();
            }

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        RootView.prototype.destroy = function () {
            if (this._currentView) {
                this._currentView.destroy();
            }

            _super.prototype.destroy.call(this);
        };

        RootView.prototype.homeRouterHandler = function (routerEvent) {
            if (!(this._currentView instanceof HomeView)) {
                var view = new HomeView();
                this.changeView(view);
            }
        };

        RootView.prototype.aboutRouterHandler = function (routerEvent) {
            if (!(this._currentView instanceof AboutView)) {
                var view = new AboutView();
                this.changeView(view);
            }
        };

        RootView.prototype.contactRouterHandler = function (routerEvent) {
            if (!(this._currentView instanceof ContactView)) {
                var view = new ContactView();
                this.changeView(view);
            }
        };

        RootView.prototype.servicesRouterHandler = function (routerEvent) {
            if (!(this._currentView instanceof ServicesView)) {
                var view = new ServicesView();
                this.changeView(view);
            }
        };

        RootView.prototype.menuRouterHandler = function (routerEvent) {
            if (!(this._currentView instanceof MenuView)) {
                var view = new MenuView();
                this.changeView(view);
            }
        };

        RootView.prototype.changeView = function (view) {
            if (this._currentView) {
                this.removeChild(this._currentView);
            }

            this._currentView = view;
            this.addChildAt(this._currentView, 1);
        };


        /**
         * YUIDoc_comment
         *
         * @method _allRouterHandler
         * @param routerEvent {RouteEvent}
         * @private
         */
        RootView.prototype._allRouterHandler = function(routerEvent) {
            this._headerView.updateNavigation(routerEvent.params[0]);
        };


        return RootView;
    })();

    module.exports = RootView;

});
