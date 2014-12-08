///<reference path='../display/DOMElement.ts'/>
///<reference path='../display/DisplayObjectContainer.ts'/>

/**
 * A helper class to create multiple instances of the same Component Class.
 *
 * @class ComponentFactory
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
module StructureTS
{
    export class ComponentFactory
    {
        constructor()
        {
            throw new Error('[ComponentFactory] Do not instantiation the Router class because it is a static class.');
        }

        /**
         * Takes in one or more jQuery objects and creates a component for each one.
         *
         * @method create
         * @param $element {jQuery} One or more jQuery referenced DOM elements.
         * @param ComponentClass {any} The class that you want instantiated.
         * @param [scope=null] {DisplayObjectContainer} This scope (parent object) is needed to instantiate the component/view with the use of the {{#crossLink "DisplayObjectContainer/addChild:method"}}{{/crossLink}} method.
         * @return {Array.<any>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
         * @public
         * @static
         */
        public static create = function ($elements:JQuery, ComponentClass:any, scope:DisplayObjectContainer = null):any[]
        {
            var list:DisplayObjectContainer[] = [];
            var length:number = $elements.length;

            for (var i = 0; i < length; i++)
            {
                var component = new (<any>ComponentClass)($elements.eq(i));

                // If the class object has the getQualifiedClassName method then I am assuming it is an instance of the DisplayObjectContainer class.
                if (scope !== null && typeof component.getQualifiedClassName === 'function') {
                    scope.addChild(component);
                }

                list.push(component);
            }

            return list;
        }
    }
}