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
     * A helper class to create multiple instances of the same Component Class.
     *
     * @class ComponentFactory
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ComponentFactory = (function () {

        function ComponentFactory() {
            throw new Error('[ComponentFactory] Do not instantiation the Router class because it is a static class.');
        }
        /**
         * Takes in one or more jQuery objects and creates a component for each one.
         *
         * @method create
         * @param $element {jQuery} One or more jQuery referenced DOM elements.
         * @param ComponentClass {DisplayObjectContainer} The class that you want instantiated.
         * @param scope {any} The base DOMElement needs a scope (parent object) to instantiate the component/view.
         * @return {Array.<DisplayObjectContainer>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
         * @public
         * @static
         */
        ComponentFactory.create = function ($elements, ComponentClass, scope) {
            var list = [];
            var length = $elements.length;

            for (var i = 0; i < length; i++) {
                var component = new ComponentClass($elements.eq(i));

                // If the class object has the getQualifiedClassName method then I am assuming it is an instance of the DisplayObjectContainer class.
                if (typeof component.getQualifiedClassName === 'function') {
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