define(function(require, exports, module) {
    'use strict';

    var $ = require('jquery');
    var Handlebars = require('Handlebars');
    var StringUtil = require('nerdery/util/StringUtil');
    var DOMElement = require('nerdery/display/DOMElement');

    /**
     * YUIDoc_comment
     *
     * @class TemplateFactory
     * @module Nerdery
     * @submodule util
     * @constructor
     * @version 0.1.0
     **/
    var TemplateFactory = (function () {

        TemplateFactory.CLASS_NAME = 'TemplateFactory';

        TemplateFactory.UNDERSCORE = 'underscore';
        TemplateFactory.HANDLEBARS = 'handlebars';

        TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
        TemplateFactory.templateNamespace = 'JST';

        function TemplateFactory() {
        }

        TemplateFactory.createTemplate = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            return TemplateFactory.create(templatePath, data);
        };

        TemplateFactory.createView = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            var template = TemplateFactory.create(templatePath, data);

            var view = new DOMElement();
            view.$element = jQuery(template);
            return view;
        };

        TemplateFactory.create = function (templatePath, data) {
            if (typeof data === "undefined") { data = null; }
            //Checks the first charactor to see if it is a "." or "#".
            var regex = /^([.#])(.+)/;
            var template = null;
            var isRequirePlugin = typeof templatePath === 'function';
            var isClassOrIdName = regex.test(templatePath);

            if(isRequirePlugin) {
                template = templatePath(data);
            } else if (isClassOrIdName) {
                var htmlString = jQuery(templatePath).html();
                htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);

                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    // Underscore Template:
                    var templateMethod = _.template(htmlString);
                    template = templateMethod(data);
                } else {
                    // Handlebars Template
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            } else {
                var templateObj = window[TemplateFactory.templateNamespace];
                if (!templateObj) {
                    // Returns null because the template namespace is not found.
                    return null;
                }

                var templateFunction = templateObj[templatePath];
                if (templateFunction) {
                    // The templatePath gets a function storage in the associative array.
                    // We call the function by passing in the data as the argument.
                    template = templateFunction(data);
                }
            }

            return template;
        };

        return TemplateFactory;
    })();

    module.exports = TemplateFactory;

});