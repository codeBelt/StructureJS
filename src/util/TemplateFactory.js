/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/StringUtil', 'handlebars', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/StringUtil'), require('handlebars'), require('jquery'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.TemplateFactory = factory(root.structurejs.StringUtil, root.Handlebars, root.jQuery);
    }
}(this, function(StringUtil, Handlebars, jQuery) {
    'use strict';

    /**
     * TODO: YUIDoc_comment
     *
     * @class TemplateFactory
     * @module StructureJS
     * @submodule util
     * @constructor
     * @requires StringUtil
     * @requires Handlebars
     * @requires jQuery
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var TemplateFactory = (function () {

        function TemplateFactory() {
            throw new Error('[TemplateFactory] Do not instantiation the TemplateFactory class because it is a static class.');
        }
        /**
         * Creates a template.
         *
         * @method create
         * @param templatePath {any}
         * @param data {any}
         * @returns {*}
         */
        TemplateFactory.create = function (templatePath, data) {
            if (data === void 0) { data = null; }
            //Checks the first character to see if it is a '.' or '#'.
            var regex = /^([.#])(.+)/;
            var template = null;
            var isFunctionTemplate = typeof templatePath === 'function';
            var isClassOrIdName = regex.test(templatePath);
            if (isFunctionTemplate) {
                template = templatePath(data);
            }
            else if (isClassOrIdName) {
                var htmlString = jQuery(templatePath).html();
                htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);
                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    // Underscore Template:
                    var templateMethod = _.template(htmlString);
                    template = templateMethod(data);
                }
                else {
                    // Handlebars Template
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            }
            else {
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
        /**
         * TODO: YUIDoc_comment
         *
         * @property UNDERSCORE
         * @type {string}
         * @public
         * @final
         * @static
         */
        TemplateFactory.UNDERSCORE = 'underscore';
        /**
         * TODO: YUIDoc_comment
         *
         * @property HANDLEBARS
         * @type {string}
         * @public
         * @final
         * @static
         */
        TemplateFactory.HANDLEBARS = 'handlebars';
        /**
         * TODO: YUIDoc_comment
         *
         * @property templateEngine
         * @type {string}
         * @default TemplateFactory.HANDLEBARS
         * @public
         * @static
         */
        TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
        /**
         * TODO: templateNamespace
         *
         * @property templateNamespace
         * @type {string}
         * @default 'JST'
         * @public
         * @static
         */
        TemplateFactory.templateNamespace = 'JST';
        return TemplateFactory;
    })();

    return TemplateFactory;
}));