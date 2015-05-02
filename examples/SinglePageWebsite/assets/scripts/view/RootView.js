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
     * TODO: YUIDoc_comment
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
         * @overridden DOMElement.create
         */
        RootView.prototype.create = function () {
            _super.prototype.create.call(this, 'div', {'id': 'pageWrapper'});

            this._headerView = new HeaderView();
            this.addChild(this._headerView);

            this._footerView = new FooterView();
            this.addChild(this._footerView);

            Router.add('/', this._homeRouterHandler, this);
            Router.add('/menu/', this._menuRouterHandler, this);
            Router.add('/about/', this._aboutRouterHandler, this);
            Router.add('/services/', this._servicesRouterHandler, this);
            Router.add('contact', this._contactRouterHandler, this);
            Router.add('*', this._allRouterHandler, this);
            Router.start();
        };

        /**
         * @overridden DOMElement.layout
         */
        RootView.prototype.layout = function () {
            if (this._currentView) {
                this._currentView.layout();
            }

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        RootView.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            if (this._currentView) {
                this._currentView.enable();
            }

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        RootView.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

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

        RootView.prototype._homeRouterHandler = function (routerEvent) {
            console.log("_homeRouterHandler", routerEvent);

            if ((this._currentView instanceof HomeView) === false) {
                var view = new HomeView();
                this.changeView(view);
            }
        };

        RootView.prototype._aboutRouterHandler = function (routerEvent) {
            console.log("_aboutRouterHandler", routerEvent);

            if ((this._currentView instanceof AboutView) === false) {
                var view = new AboutView();
                this.changeView(view);
            }
        };

        RootView.prototype._contactRouterHandler = function (routerEvent) {
            console.log("_contactRouterHandler", routerEvent);

            if ((this._currentView instanceof ContactView) === false) {
                var view = new ContactView(routerEvent);
                this.changeView(view);
            }
        };

        RootView.prototype._servicesRouterHandler = function (routerEvent) {
            console.log("_servicesRouterHandler", routerEvent);

            if ((this._currentView instanceof ServicesView) === false) {
                var view = new ServicesView();
                this.changeView(view);
            }
        };

        RootView.prototype._menuRouterHandler = function (routerEvent) {
            console.log("_menuRouterHandler", routerEvent);

            if ((this._currentView instanceof MenuView) === false) {
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
         * TODO: YUIDoc_comment
         *
         * @method _allRouterHandler
         * @param routerEvent {RouterEvent}
         * @private
         */
        RootView.prototype._allRouterHandler = function(routerEvent) {
            var pageId = routerEvent.params[0];
            this._headerView.updateNavigation(pageId);
        };


        return RootView;
    })();

    module.exports = RootView;

});
