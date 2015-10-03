'use strict';
/*
 UMD Stuff
 @import ../util/StringUtil as StringUtil
 @import jquery as jQuery
 @import handlebars as Handlebars
 @export TemplateFactory
 */
import StringUtil = require('./StringUtil');

/**
 * A helper class to provide a convenient and consistent way to render templates.
 *
 * @class TemplateFactory
 * @module StructureJS
 * @submodule util
 * @requires StringUtil
 * @requires Handlebars
 * @requires jQuery
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class TemplateFactory
{
    /**
     * A constant value for using Underscore or Lodash templates.
     *
     * @property UNDERSCORE
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static UNDERSCORE:string = 'underscore';

    /**
     * A constant value for using Handlebars templates. This is the default template engine.
     *
     * @property HANDLEBARS
     * @type {string}
     * @public
     * @final
     * @static
     */
    public static HANDLEBARS:string = 'handlebars';

    /**
     * Sets the template engine type for this TemplateFactory class. The default is TemplateFactory.HANDLEBARS
     *
     * @property templateEngine
     * @type {string}
     * @default TemplateFactory.HANDLEBARS
     * @public
     * @static
     */
    public static templateEngine:string = TemplateFactory.HANDLEBARS;

    /**
     * The global namespace for pre-compiled templates.
     *
     * @property templateNamespace
     * @type {string}
     * @default 'JST'
     * @public
     * @static
     */
    public static templateNamespace:string = 'JST';

    constructor()
    {
        throw new Error('[TemplateFactory] Do not instantiate the TemplateFactory class because it is a static class.');
    }

    /**
     * Creates a template.
     *
     * @method create
     * @param templatePath {any}
     * @param [data=any]
     * @returns {string}
     * @public
     * @static
     * @example
     *      TemplateFactory.create('templateName', {some: 'data'});
     */
    public static create(templatePath:any, data:any = null):string
    {
        //Checks the first character to see if it is a '.' or '#'.
        var regex = /^([.#])(.+)/;
        var template:string = null;
        var isFunctionTemplate = typeof templatePath === 'function';
        var isClassOrIdName:boolean = regex.test(templatePath);

        if (isFunctionTemplate)
        {
            template = templatePath(data);
        }
        else if (isClassOrIdName)
        {
            var htmlString:string = jQuery(templatePath).html();
            htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);

            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE)
            {
                // Underscore Template:
                var templateMethod:Function = window['_'].template(htmlString);
                template = templateMethod(data);
            }
            else
            {
                // Handlebars Template
                var templateMethod:Function = Handlebars.compile(htmlString);
                template = templateMethod(data);
            }
        }
        else
        {
            var templateObj:Object = window[TemplateFactory.templateNamespace];
            if (!templateObj)
            {
                // Returns null because the template namespace is not found.
                return null;
            }

            var templateFunction:Function = templateObj[templatePath];
            if (templateFunction)
            {
                // The templatePath gets a function storage in the associative array.
                // We call the function by passing in the data as the argument.
                template = templateFunction(data);
            }
        }

        return template;
    }
}

export = TemplateFactory;