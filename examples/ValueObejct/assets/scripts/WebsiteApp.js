define(function (require, exports, module)
{ // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var Stage = require('structurejs/display/Stage');
    var TestVO = require('./TestVO');

    /**
     * TODO: YUIDoc_comment
     *
     * @class WebsiteApp
     * @extends Stage
     * @constructor
     **/
    var WebsiteApp = (function ()
    {

        var _super = Extend(WebsiteApp, Stage);

        function WebsiteApp()
        {

            _super.call(this);
        }

        /**
         * @overridden DOMElement.createChildren
         */
        WebsiteApp.prototype.createChildren = function ()
        {
            _super.prototype.createChildren.call(this);
            var data = {
                name: "robert",
                age: 37,
                house: {
                    address: '12443 Street',
                    numOfBathrooms: 2,
                    numOfBedRooms: 4
                }
            };


            var vo = new TestVO(data);

            console.log("TestVO", vo);

            data = {
                name: "krista",
                age: 25,
                house: {
                    address: '3 Street',
                    numOfBathrooms: 1,
                    numOfBedRooms: 1
                }
            };

            vo.update(data);

        };

        /**
         * @overridden DOMElement.layoutChildren
         */
        WebsiteApp.prototype.layoutChildren = function ()
        {
            // Layout or update the child objects in this parent class.

            return this;
        };

        /**
         * @overridden DOMElement.enable
         */
        WebsiteApp.prototype.enable = function ()
        {
            if (this.isEnabled === true)
            {
                return this;
            }

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        };

        /**
         * @overridden DOMElement.disable
         */
        WebsiteApp.prototype.disable = function ()
        {
            if (this.isEnabled === false)
            {
                return this;
            }

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        };

        /**
         * @overridden DOMElement.destroy
         */
        WebsiteApp.prototype.destroy = function ()
        {
            // Call destroy on any child objects that is need. 
            // This super method will also null out all properties automatically to prevent memory leaks.

            _super.prototype.destroy.call(this);
        };

        return WebsiteApp;
    })();

    module.exports = WebsiteApp;

});