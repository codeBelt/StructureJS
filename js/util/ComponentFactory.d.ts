import DisplayObjectContainer from '../display/DisplayObjectContainer';
/**
 * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
 *
 * @class ComponentFactory
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
declare class ComponentFactory {
    constructor();
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
    static create($elements: JQuery, ComponentClass: any, scope?: DisplayObjectContainer): Array<any>;
    /**
     * Helper method to create the component.
     *
     * @method _createComponent
     * @private
     */
    private static _createComponent($element, ComponentClass, scope);
}
export default ComponentFactory;
