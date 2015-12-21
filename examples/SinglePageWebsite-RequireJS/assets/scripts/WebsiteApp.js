define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var NetworkMonitorEvent = require('structurejs/event/NetworkMonitorEvent');
    var NetworkMonitor = require('structurejs/net/NetworkMonitor');
    var RootView = require('view/RootView');

    /**
     * TODO: YUIDoc_comment
     *
     * @class WebsiteApp
     * @extends Stage
     * @constructor
     **/
    var WebsiteApp = (function () {

        var _super = Extend(WebsiteApp, Stage);

        function WebsiteApp() {
            _super.call(this);

            /**
             * The root view controls the main display area for this app.
             *
             * @property _rootView
             * @type {RootView}
             * @private
             */
            this._rootView = null;
        }

        /**
         * @overridden DOMElement.create
         */
        WebsiteApp.prototype.create = function () {
            _super.prototype.create.call(this);

            this._rootView = new RootView();
            this.addChild(this._rootView);
        };

        /**
         * @overridden DOMElement.layout
         */
        WebsiteApp.prototype.layout = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        WebsiteApp.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            NetworkMonitor.addEventListener(NetworkMonitorEvent.STATUS, this._onNetworkChange, this);
            NetworkMonitor.start();

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        WebsiteApp.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            NetworkMonitor.removeEventListener(NetworkMonitorEvent.STATUS, this._onNetworkChange, this);

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        WebsiteApp.prototype.destroy = function () {
            this._rootView.destroy();

            _super.prototype.destroy.call(this);
        };

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onNetworkChange
         * @param event {NetworkMonitorEvent}
         * @private
         */
        WebsiteApp.prototype._onNetworkChange = function(event) {
            console.log("NetworkMonitorEvent.STATUS", event.status);
        };

        return WebsiteApp;
    })();

    module.exports = WebsiteApp;

});
