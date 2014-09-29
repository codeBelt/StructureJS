///<reference path='../display/DOMElement.ts'/>
///<reference path='../util/StringUtil.ts'/>

/**
 * YUIDoc_comment
 *
 * @class TemplateFactory
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class TemplateFactory
    {
        public static UNDERSCORE:string = 'underscore';
        public static HANDLEBARS:string = 'handlebars';

        public static templateEngine:string = TemplateFactory.HANDLEBARS;
        public static templateNamespace:string = 'JST';

        constructor()
        {
        }

        public static createTemplate(templatePath:any, data:Object = null):string
        {
            return TemplateFactory.create(templatePath, data);
        }

        private static create(templatePath:any, data:Object = null):string
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