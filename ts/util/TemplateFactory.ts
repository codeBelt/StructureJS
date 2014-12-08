///<reference path='../util/StringUtil.ts'/>

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
module StructureTS
{
    export class TemplateFactory
    {
        /**
         * TODO: YUIDoc_comment
         *
         * @property UNDERSCORE
         * @type {string}
         * @public
         * @final
         * @static
         */
        public static UNDERSCORE:string = 'underscore';

        /**
         * TODO: YUIDoc_comment
         *
         * @property HANDLEBARS
         * @type {string}
         * @public
         * @final
         * @static
         */
        public static HANDLEBARS:string = 'handlebars';

        /**
         * TODO: YUIDoc_comment
         *
         * @property templateEngine
         * @type {string}
         * @default TemplateFactory.HANDLEBARS
         * @public
         * @static
         */
        public static templateEngine:string = TemplateFactory.HANDLEBARS;

        /**
         * TODO: templateNamespace
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
                    var templateMethod:Function = _.template(htmlString);
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
}