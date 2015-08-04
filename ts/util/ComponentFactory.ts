'use strict';
/*
 UMD Stuff
 @export ComponentFactory
 */
import DisplayObjectContainer = require('../display/DisplayObjectContainer');
import DisplayObject = require('../display/DisplayObject');

/**
 * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
 *
 * @class ComponentFactory
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
class ComponentFactory
{
    constructor()
    {
        throw new Error('[ComponentFactory] Do not instantiate the ComponentFactory class because it is a static class.');
    }

    /**
     * Takes a jQuery object that has one or more elements in it and passes a single jQuery element into the constructor of the class that is also being passed in.
     *
     * @method create
     * @param $element {jQuery} One or more jQuery referenced DOM elements.
     * @param ComponentClass {any} The class that you want instantiated.
     * @param [scope=null] {DisplayObjectContainer} This scope (parent object) is needed to instantiate the component/view with the use of the {{#crossLink "DisplayObjectContainer/addChild:method"}}{{/crossLink}} method.
     * @return {Array.<any>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
     * @public
     * @static
     * @example
     *      ComponentFactory.create($('.js-list'), SomeClass, this);
     */
    public static create = function ($elements:JQuery, ComponentClass:any, scope:DisplayObjectContainer = null):Array<any>
    {
        var list:Array<DisplayObject> = [];
        var component:DisplayObject;
        var $element:JQuery;
        var length:number = $elements.length;

        for (var i = 0; i < length; i++)
        {
            $element = $elements.eq(i);

            // If the element doesn't have a sjs-id attribute set already. This way you can call this method on the same page and it won't overwrite components already created.
            if ($element.data('sjs-id') === void 0)
            {
                component = new (<any>ComponentClass)($element);
                // If the class object has the getQualifiedClassName method then I am assuming it is an instance of the DisplayObject class.
                if (scope !== null && typeof component.getQualifiedClassName === 'function')
                {
                    scope.addChild(component);
                }
                list.push(component);
            }
        }
        return list;
    }
}

export = ComponentFactory;