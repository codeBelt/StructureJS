import DisplayObjectContainer from '../display/DisplayObjectContainer';
import DisplayObject from '../display/DisplayObject';
import Util from '../util/Util';


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
    public static create ($elements:JQuery, ComponentClass:any, scope:DisplayObjectContainer = null):Array<any>
    {
        const list:Array<DisplayObject> = [];
        let component:DisplayObject;
        let $element:JQuery;
        const length:number = $elements.length;
        let types:any;
        let componentName:string;

        for (let i:number = 0; i < length; i++)
        {
            $element = $elements.eq(i);
            types = $element.attr('data-sjs-type');

            if (types === void 0)
            {
                // Create the component if there is not a 'data-sjs-type' attribute on the element.
                component = ComponentFactory._createComponent($element, ComponentClass, scope);
                list.push(component);
            }
            else
            {
                // Else if there is already a 'data-sjs-type' attribute then get the type(s).
                types = types.split(',');
                componentName = Util.getName(ComponentClass);

                // Only create the component if the component type does not already exist.
                if (types.indexOf(componentName) === -1)
                {
                    component = ComponentFactory._createComponent($element, ComponentClass, scope);
                    list.push(component);
                }
            }
        }

        return list;
    }

    /**
     * Helper method to create the component.
     *
     * @method _createComponent
     * @private
     */
    private static _createComponent($element:JQuery, ComponentClass:any, scope:DisplayObjectContainer):any {
        const component = new ComponentClass($element);

        // If the class object has the sjsId property then I am assuming it is an instance of the DisplayObject class.
        if (scope !== null && component.hasOwnProperty('sjsId') === true)
        {
            scope.addChild(component);
        }

        return component;
    }

}

export default ComponentFactory;