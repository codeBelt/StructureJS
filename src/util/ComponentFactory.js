/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.ComponentFactory = factory();
    }
}(this, function() {
    'use strict';

    /**
     * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
     *
     * @class ComponentFactory
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var ComponentFactory = (function () {

        function ComponentFactory() {
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
         *      ComponentFactory.create($('.js-list'), SomeClass);
         */
        ComponentFactory.create = function ($elements, ComponentClass, scope) {
            if (scope === void 0) { scope = null; }
            var list = [];
            var length = $elements.length;
            for (var i = 0; i < length; i++) {
                var component = new ComponentClass($elements.eq(i));
                // If the class object has the getQualifiedClassName method then I am assuming it is an instance of the DisplayObjectContainer class.
                if (scope !== null && typeof component.getQualifiedClassName === 'function') {
                    scope.addChild(component);
                }
                list.push(component);
            }
            return list;
        };
        return ComponentFactory;
    })();

    return ComponentFactory;
}));