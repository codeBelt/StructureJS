define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var NavigationView = require('./view/NavigationView');
    var LoginView = require('./view/LoginView');
    require('templates'); // jshint ignore:line

    /**
     * TODO: YUIDoc_comment
     *
     * @class TestApp
     * @extends Stage
     * @constructor
     **/
    var TestApp = (function () {

        var _super = Extend(TestApp, Stage); // jshint ignore:line

        function TestApp() { // jshint ignore:line
            _super.call(this);

            /**
             * TODO: YUIDoc_comment
             *
             * @property _navigationView
             * @type {NavigationView}
             * @private
             */
            this._navigationView = null;

            /**
             * TODO: YUIDoc_comment
             *
             * @property _loginView
             * @type {LoginView}
             * @private
             */
            this._loginView = null;
        }

        /**
         * @overridden Stage.create
         */
        TestApp.prototype.create = function () {
            _super.prototype.create.call(this);

            // Create or setup objects in this parent class.

            this._navigationView = new NavigationView(this.$element.find('.js-navigationView'));
            this.addChild(this._navigationView);

            this._loginView = new LoginView();
            this.addChild(this._loginView);
        };

        /**
         * @overridden Stage.enable
         */
        TestApp.prototype.enable = function () {
            if (this.isEnabled === true) { return this; }

            // Enable the child objects and/or add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden Stage.disable
         */
        TestApp.prototype.disable = function () {
            if (this.isEnabled === false) { return this; }

            // Disable the child objects and/or remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden Stage.layout
         */
        TestApp.prototype.layout = function () {
            // Layout or update the objects in this parent class.

            return this;
        };

        /**
         * @overridden Stage.destroy
         */
        TestApp.prototype.destroy = function () {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _super.prototype.destroy.call(this);
        };

        return TestApp;
    })();

    module.exports = TestApp;

});
