///<reference path='../display/DOMElement.ts'/>

/**
 * A helper class to create multiple instances of the same Component Class.
 *
 * @class ComponentFactory
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
module StructureTS
{
    export class ComponentFactory
    {
        constructor()
        {
        }

        /**
         * Takes in one or more jQuery objects and creates a component for each one.
         *
         * @method create
         * @param $element {jQuery} One or more jQuery referenced DOM elements.
         * @param ComponentClass {DOMElement} The class that you want instantiated.
         * @param scope {Object} The base DOMElement needs a scope (parent object) to instantiate the component/view.
         * @return {Array.<DOMElement>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
         * @public
         * @static
         */
        public static create = function ($elements:JQuery, ComponentClass:DOMElement, scope:any)
        {
            var list:DOMElement[] = [];
            var length:number = $elements.length;

            for (var i = 0; i < length; i++)
            {
                var component = new (<any>ComponentClass)($elements.eq(i));
                scope.addChild(component);
                list.push(component);
            }

            return list;
        }
    }
}