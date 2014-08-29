define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var RootView = require('view/RootView');

    /**
     * YUIDoc_comment
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
         * @overridden DOMElement.createChildren
         */
        WebsiteApp.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            this._rootView = new RootView();
            this.addChild(this._rootView);
        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        WebsiteApp.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        WebsiteApp.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            this._rootView.enable();

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        WebsiteApp.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            this._rootView.disable();

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        WebsiteApp.prototype.destroy = function () {
            this._rootView.destroy();

            _super.prototype.destroy.call(this);
        };

        return WebsiteApp;
    })();

    module.exports = WebsiteApp;

});
