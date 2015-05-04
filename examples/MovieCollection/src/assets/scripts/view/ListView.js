define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    // Imports
    var Extend = require('structurejs/util/Extend');
    var DOMElement = require('structurejs/display/DOMElement');
    var TemplateFactory = require('structurejs/util/TemplateFactory');

    /**
     * YUIDoc_comment
     *
     * @class ListView
     * @extends DOMElement
     * @constructor
     **/
    var ListView = (function () {

        var _super = Extend(ListView, DOMElement);

        function ListView($element) {
            _super.call(this, $element);
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method updateList
         * @public
         */
        ListView.prototype.updateList = function(movieModels) {
            var templateHtml = TemplateFactory.create('templates/ItemTemplate', movieModels);

            this.$element.html(templateHtml);
        };

        return ListView;
    })();

    module.exports = ListView;

});