(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DisplayObjectContainer = require('../../../../../src/display/DisplayObjectContainer');

var display = new DisplayObjectContainer();
console.log("display", display);
},{"../../../../../src/display/DisplayObjectContainer":4}],2:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('./util/Util'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.BaseObject = factory(root.structurejs.Util);
    }
}(this, function(Util) {
    'use strict';

    /**
     * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
     *
     * @class BaseObject
     * @module StructureJS
     * @submodule core
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var BaseObject = (function () {

        function BaseObject() {
            /**
             * The cid (client-side id) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
             *
             * @property cid
             * @type {int}
             * @default null
             * @writeOnce
             * @readOnly
             * @public
             */
            this.cid = null;
            this.cid = Util.uniqueId();
        }
        /**
         * Returns the fully qualified class name of an object.
         *
         * @method getQualifiedClassName
         * @returns {string} Returns the class name.
         * @public
         * @example
         *     instance.getQualifiedClassName();
         */
        BaseObject.prototype.getQualifiedClassName = function () {
            return Util.getClassName(this);
        };

        /**
         * The purpose of the destroy method is to make an object ready for garbage collection. This
         * should be thought of as a one way function. Once destroy is called no further methods should be
         * called on the object or properties accessed. It is the responsibility of those who implement this
         * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
         * object eligible for garbage collection.
         *
         * By default the destroy method will null out all properties of the class automatically. You should call destroy
         * on other objects before calling the super.
         *
         * @method destroy
         * @return {void}
         * @public
         * @example
         *     ClassName.prototype.destroy = function() {
         *          this._childInstance.destroy();
         *
         *          _super.prototype.destroy.call(this);
         *     }
         */
        BaseObject.prototype.destroy = function () {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        };
        return BaseObject;
    })();

    return BaseObject;
}));
},{"./util/Util":7}],3:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./util/Extend', './BaseObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('./util/Extend'), require('./BaseObject'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.ObjectManager = factory(root.structurejs.Extend, root.structurejs.BaseObject);
    }
}(this, function(Extend, BaseObject) {
    'use strict';

    /**
     * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
     *
     * @class ObjectManager
     * @module StructureJS
     * @extends BaseObject
     * @submodule core
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var ObjectManager = (function () {

        var _super = Extend(ObjectManager, BaseObject);

        function ObjectManager() {
            _super.call(this);
            /**
             * The isEnabled property is used to keep track of the enabled state of the object.
             *
             * @property isEnabled
             * @type {boolean}
             * @default false
             * @protected
             */
            this.isEnabled = false;
        }
        /**
         * The enable method is responsible for enabling event listeners and/or children of the containing objects.
         *
         * @method enable
         * @public
         * @chainable
         * @example
         *     ClassName.prototype.enable = function() {
        *          if (this.isEnabled === true) { return this; }
        *
        *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
        *          this._childInstance.enable();
        *
        *          return _super.prototype.enable.call(this);
        *     }
         */
        ObjectManager.prototype.enable = function () {
            if (this.isEnabled === true) {
                return this;
            }

            this.isEnabled = true;
            return this;
        };

        /**
         * The disable method is responsible for disabling event listeners and/or children of the containing objects.
         *
         * @method disable
         * @public
         * @chainable
         * @example
         *     ClassName.prototype.disable = function() {
        *          if (this.isEnabled === false) { return this; }
        *
        *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
        *          this._childInstance.disable();
        *
        *          return _super.prototype.disable.call(this);
        *     }
         */
        ObjectManager.prototype.disable = function () {
            if (this.isEnabled === false) {
                return this;
            }

            this.isEnabled = false;
            return this;
        };
        return ObjectManager;
    })();

    return ObjectManager;
}));


},{"./BaseObject":2,"./util/Extend":6}],4:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher'], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'));
    } else {
        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.DisplayObjectContainer = factory(root.structurejs.Extend, root.structurejs.EventDispatcher);
    }
}(this, function(Extend, EventDispatcher) {
    'use strict';

    /**
     * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
     *
     * @class DisplayObjectContainer
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule view
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var DisplayObjectContainer = (function () {

        var _super = Extend(DisplayObjectContainer, EventDispatcher);

        function DisplayObjectContainer() {
            _super.call(this);
            /**
             * The isCreated property is used to keep track if it is the first time this DisplayObjectContainer is created.
             *
             * @property isCreated
             * @type {boolean}
             * @default false
             * @protected
             */
            this.isCreated = false;
            /**
             * Returns the number of children of this object.
             *
             * @property numChildren
             * @type {init}
             * @default 0
             * @readOnly
             * @public
             */
            this.numChildren = 0;
            /**
             * A reference to the child DisplayObjectContainer instances to this parent object instance.
             *
             * @property children
             * @type {array}
             * @readOnly
             * @public
             */
            this.children = [];
            /**
             * A property providing access to the x position.
             *
             * @property x
             * @type {number}
             * @default 0
             * @public
             */
            this.x = 0;
            /**
             * A property providing access to the y position.
             *
             * @property y
             * @type {number}
             * @default 0
             * @public
             */
            this.y = 0;
            /**
             * A property providing access to the width.
             *
             * @property width
             * @type {number}
             * @default 0
             * @public
             */
            this.width = 0;
            /**
             * A property providing access to the height.
             *
             * @property height
             * @type {number}
             * @default 0
             * @public
             */
            this.height = 0;
            /**
             * A property providing access to the unscaledWidth.
             *
             * @property unscaledWidth
             * @type {number}
             * @default 100
             * @public
             */
            this.unscaledWidth = 100;
            /**
             * A property providing access to the unscaledHeight.
             *
             * @property unscaledHeight
             * @type {number}
             * @default 100
             * @public
             */
            this.unscaledHeight = 100;
        }
        /**
         * The createChildren function is intended to provide a consistent place for the creation and adding
         * of children to the view. It will automatically be called the first time that the view is added
         * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
         * their overridden methods.
         *
         * @method createChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.createChildren = function () {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: The createChildren method is meant to be overridden.');
        };

        /**
         * Adds a child DisplayObjectContainer instance to this parent object instance. The child is added to the front (top) of all other
         * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
         *
         * If you add a child object that already has a different parent, the object is removed from the child
         * list of the other parent object.
         *
         * @method addChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this DisplayObjectContainerContainer instance.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChild = function (child) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }

            this.children.push(child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        /**
         * Adds a child DisplayObjectContainer instance to this DisplayObjectContainerContainer instance.
         * The child is added at the index position specified. An index of 0 represents the back
         * (bottom) of the display list for this DisplayObjectContainerContainer object.
         *
         * @method addChildAt
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to add as a child of this object instance.
         * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            //If the child being passed in already has a parent then remove the reference from there.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }

            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;

            child.parent = this;

            return this;
        };

        /**
         * Removes the specified child object instance from the child list of the parent object instance.
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to remove.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChild = function (child, destroy) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }

            if (destroy === true) {
                child.destroy();
            } else {
                child.disable();
            }

            child.parent = null;

            this.numChildren = this.children.length;

            return this;
        };

        /**
         * Removes all child DisplayObjectContainer instances from the child list of the DisplayObjectContainerContainer instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if
         * no other references to the children exist.
         *
         * @method removeChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.removeChildren = function (destroy) {
            while (this.children.length > 0) {
                this.removeChild(this.children.pop(), destroy);
            }

            return this;
        };

        /**
         * Swaps two DisplayObjectContainer's with each other.
         *
         * @method swapChildren
         * @param child1 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @param child2 {DisplayObjectContainer} The DisplayObjectContainer instance to be swap.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
            throw new Error('[' + this.getQualifiedClassName() + '] Error: The swapChildren method is meant to be overridden.');
        };

        /**
         * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
         *
         * @method swapChildren
         * @param index1 {int} The index position of the first child object.
         * @param index2 {int} The index position of the second child object.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
            if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
            }

            var child1 = this.getChildAt(index1);
            var child2 = this.getChildAt(index2);

            this.swapChildren(child1, child2);

            return this;
        };

        /**
         * Returns the index position of a child DisplayObjectContainer instance.
         *
         * @method getChildIndex
         * @param child {DisplayObjectContainer} The DisplayObjectContainer instance to identify.
         * @returns {int} The index position of the child display object to identify.
         * @public
         */
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this.children.indexOf(child);
        };

        /**
         * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself. The search includes the entire display list including this DisplayObjectContainer instance.
         *
         * @method contains
         * @param child {DisplayObjectContainer} The child object to test.
         * @returns {boolean}  true if the child object is a child of the DisplayObjectContainer or the container itself; otherwise false.
         * @public
         */
        DisplayObjectContainer.prototype.contains = function (child) {
            return this.children.indexOf(child) >= 0;
        };

        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @method getChildAt
         * @param index {int} The index position of the child object.
         * @returns {DisplayObjectContainer} The child display object at the specified index position.
         */
        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this.children[index];
        };

        /**
         * Gets a DisplayObjectContainer by its cid.
         *
         * @method getChildByCid
         * @param cid {number}
         * @returns {DisplayObjectContainer}
         * @override
         * @public
         */
        DisplayObjectContainer.prototype.getChildByCid = function (cid) {
            var children = this.children.filter(function (child) {
                return child.cid == cid;
            });

            return children[0] || null;
        };

        /**
         * The setSize method sets the bounds within which the containing DisplayObjectContainer would
         * like that component to lay itself out. It is expected that calling setSize will automatically
         * call {{#crossLink "DisplayObjectContainer/layoutChildren:method"}}{{/crossLink}}.
         *
         * @param unscaledWidth {number} The width within which the component should lay itself out.
         * @param unscaledHeight {number} The height within which the component should lay itself out.
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.setSize = function (unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            if (this.isCreated) {
                this.layoutChildren();
            }

            return this;
        };

        /**
         * The layoutComponent method provides a common function to handle updating child objects.
         *
         * @method layoutChildren
         * @returns {DisplayObjectContainer} Returns an instance of itself.
         * @public
         * @chainable
         */
        DisplayObjectContainer.prototype.layoutChildren = function () {
            return this;
        };

        /**
         * @overridden EventDispatcher.destroy
         */
        DisplayObjectContainer.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return DisplayObjectContainer;
    })();

    return DisplayObjectContainer;
}));
},{"../event/EventDispatcher":5,"../util/Extend":6}],5:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    // Imports
    var Extend;
    var ObjectManager;
    var BaseEvent;

    if (typeof define === 'function' && define.amd) {
        Extend = '../util/Extend';
        ObjectManager = '../ObjectManager';
        BaseEvent = '../ObjectManager';

        define([Extend, ObjectManager, BaseEvent], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        Extend = require('../util/Extend');
        ObjectManager = require('../ObjectManager');
        BaseEvent = require('../ObjectManager');

        module.exports = factory(Extend, ObjectManager, BaseEvent);
    } else {
        Extend = root.structurejs.Extend;
        ObjectManager = root.structurejs.ObjectManager;
        BaseEvent = root.structurejs.BaseEvent;

        /*jshint sub:true */
        root.structurejs = root.structurejs || {};
        root.structurejs.EventDispatcher = factory(Extend, ObjectManager, BaseEvent);
    }
}(this, function(Extend, ObjectManager, BaseEvent) {
    'use strict';

    /**
     * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
     * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
     *
     * @class EventDispatcher
     * @extends ObjectManager
     * @module StructureJS
     * @submodule event
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var EventDispatcher = (function () {

        var _super = Extend(EventDispatcher, ObjectManager);

        function EventDispatcher() {
            _super.call(this);
            /**
             * Holds a reference to added listeners.
             *
             * @property _listeners
             * @type {Array}
             * @private
             */
            this._listeners = null;
            /**
             * Indicates the object that contains child object. Use the parent property
             * to specify a relative path to display objects that are above the current display object in the display
             * list hierarchy.
             *
             * @property parent
             * @type {any}
             * @public
             */
            this.parent = null;

            this._listeners = [];
        }
        /**
         * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
         * @example
         instance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
        console.log(event.target + " sent the event.");
        }
         * @method addEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
         * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
         * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (typeof priority === "undefined") { priority = 0; }
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list == null) {
                // If a list of event listener(s) do not exist for the type value passed in then create a new empty array.
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope) {
                    // If same callback and scope is found then remove it. Then add the current one below.
                    list.splice(i, 1);
                } else if (index === 0 && listener.priority < priority) {
                    index = i + 1;
                }
            }

            // Add the event listener to the list array at the index value.
            list.splice(index, 0, { callback: callback, scope: scope, priority: priority });

            return this;
        };

        /**
         * Removes a specified listener from the EventDispatcher object.
         * @example
         instance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         ClassName.prototype.handlerMethod = function (event) {
        console.log(event.target + " sent the event.");
        }
         * @method removeEventListener
         * @param type {String} The type of event.
         * @param callback {Function} The listener object to remove.
         * @param scope {any} The scope of the listener object to be removed.
         * @hide This was added because it was need for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list) {
                var i = list.length;
                while (--i > -1) {
                    // If the callback and the scope are the same then remove the event listener.
                    if (list[i].callback === callback && list[i].scope === scope) {
                        list.splice(i, 1);
                        break;
                    }
                }
            }

            return this;
        };

        /**
         * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
         * @example
         var event = new BaseEvent(BaseEvent.CHANGE);
         instance.dispatchEvent(event);

         // Here is a common inline event being dispatched
         instance.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         * @method dispatchEvent
         * @param event {BaseEvent} The Event object that is dispatched into the event flow. You can create custom events, the only requirement is all events must
         * extend the {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @public
         * @chainable
         */
        EventDispatcher.prototype.dispatchEvent = function (type, data) {
            if (typeof data === "undefined") { data = null; }
            var event = type;

            if (typeof event == 'string') {
                event = new BaseEvent(type, false, true, data);
            }

            // If target is null then set it to the object that dispatched the event.
            if (event.target == null) {
                event.target = this;
                event.currentTarget = this;
            }

            // Get the list of event listener(s) by the associated type value.
            var list = this._listeners[event.type];
            if (list) {
                var i = list.length;
                var listener;
                while (--i > -1) {
                    // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                    if (event.cancelable && event.isImmediatePropagationStopped) {
                        break;
                    }

                    listener = list[i];
                    listener.callback.call(listener.scope, event);
                }
            }

            //Dispatches up the chain of classes that have a parent.
            if (this.parent && event.bubble) {
                // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
                if (event.cancelable && event.isPropagationStopped) {
                    return this;
                }

                /*
                 // Clone the event because this EventDispatcher class modifies the currentTarget property when bubbling.
                 // We need to set the target to the previous target so we can keep track of the original origin of where
                 // the event was dispatched for the first time.
                 var previousTarget:string = event.target;
                 event = event.clone();
                 event.target = previousTarget;
                 */
                // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
                event.currentTarget = this;

                // Pass the event to the parent (event bubbling).
                this.parent.dispatchEvent(event);
            }

            return this;
        };

        /**
         * @overridden BaseObject.destroy
         */
        EventDispatcher.prototype.destroy = function () {
            _super.prototype.disable.call(this);

            _super.prototype.destroy.call(this);
        };

        /**
         * Meant for debugging purposes; returns an array dictionary of the different event listener(s) on the object.
         *
         * @method getEventListeners
         * @return {array} Returns an array dictionary of the different event listener(s) on the object.
         * @public
         */
        EventDispatcher.prototype.getEventListeners = function () {
            return this._listeners;
        };
        return EventDispatcher;
    })();

    return EventDispatcher;
}));
},{"../ObjectManager":3,"../util/Extend":6}],6:[function(require,module,exports){
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
        root.structurejs.Extend = factory();
    }
}(this, function() {
    'use strict';

    /**
     * Snippet from TypeScript compiler.
     */
    var Extend = function (inheritorClass, baseClass)
    {
        for (var p in baseClass)
        {
            if (baseClass.hasOwnProperty(p))
            {
                // Add any static properties from the baseClass to the inheritorClass.
                inheritorClass[p] = baseClass[p];
            }
        }

        // Creates an anonymous Class and sets the constructor as the inheritorClass.
        function __()
        {
            this.constructor = inheritorClass;
        }

        // Sets the anonymous Class prototype to the baseClass prototype.
        __.prototype = baseClass.prototype;

        // Sets the inheritorClass prototype as the baseClass and sets the constructor as the inheritorClass.
        inheritorClass.prototype = new __();

        return baseClass;
    };

    return Extend;
}));
},{}],7:[function(require,module,exports){
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
        root.structurejs.Util = factory();
    }
}(this, function() {
    'use strict';

    /**
     * A Utility class that has several static methods to assist in development.
     *
     * @class Util
     * @module StructureJS
     * @submodule util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var Util = (function () {

        function Util() {
        }
        /**
         * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
         * @example
         var property:number = Util.uniqueId();
         // 1

         var property:string = Util.uniqueId('yomama_');
         // yomama_1
         * @method uniqueId
         * @param [prefix] {string} The string value used for the prefix.
         * @returns {init|string} Returns the unique identifier.
         * @public
         * @static
         */
        Util.uniqueId = function (prefix) {
            if (typeof prefix === "undefined") { prefix = null; }
            var id = ++Util._idCounter;

            if (prefix != null) {
                return String(prefix + id);
            } else {
                return id;
            }
        };

        /**
         * @method deletePropertyFromObject
         * @param object {Object} The object you want to remove properties from.
         * @param list {array} A list of property names you want to remove from the object.
         * @returns {any} Returns the object passed in without the removed the properties.
         * @public
         * @static
         */
        Util.deletePropertyFromObject = function (object, list) {
            for (var key in object) {
                // If the key is a property and not function.
                if (object.hasOwnProperty(key)) {
                    var value = object[key];

                    // If the property is an Array.
                    if (value instanceof Array) {
                        // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                        var array = value;
                        for (var index in array) {
                            // Recursive function call.
                            Util.deletePropertyFromObject(array[index], list);
                        }
                    } else {
                        for (var listIndex in list) {
                            // If the key(property name) equals the property name in the list array.
                            if (key === list[listIndex]) {
                                // Delete the property from the object.
                                delete object[key];
                            }
                        }
                    }
                }
            }

            return object;
        };

        /**
         * @method renamePropertyOnObject
         * @param object {Object} The object you want to rename properties from.
         * @param oldName {string}
         * @param newName {string}
         * @returns {any} Returns the object passed in renamed properties.
         * @public
         * @static
         */
        Util.renamePropertyOnObject = function (object, oldName, newName) {
            // Check for the old property name to avoid a ReferenceError in strict mode.
            if (object.hasOwnProperty(oldName)) {
                object[newName] = object[oldName];
                delete object[oldName];
            }

            return object;
        };

        /**
         * @method clone
         * @param obj {Object} The object you to clone.
         * @returns {any} Returns a clone object of the one passed in.
         * @public
         * @static
         */
        Util.clone = function (obj) {
            //other scripts: http://davidwalsh.name/javascript-clone
            //http://oranlooney.com/functional-javascript/
            //http://oranlooney.com/deep-copy-javascript/
            // Handle the 3 simple types, and null or undefined
            if (null == obj || 'object' != typeof obj) {
                return obj;
            }

            // Handle Date
            if (obj instanceof Date) {
                var date = new Date();
                date.setTime(obj.getTime());
                return date;
            }

            // Handle Array
            if (obj instanceof Array) {
                var array = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    array[i] = Util.clone(obj[i]);
                }
                return array;
            }

            // Handle Object
            if (obj instanceof Object) {
                var copy = {};
                for (var attr in obj) {
                    if (obj.hasOwnProperty(attr)) {
                        copy[attr] = Util.clone(obj[attr]);
                    }
                }
                return copy;
            }

            throw new Error("[Util] Unable to copy obj! Its type isn't supported.");
        };

        /**
         * YUIDoc_comment
         *
         * @method toBoolean
         * @param strNum {string|number}
         * @returns {boolean}
         * @public
         * @static
         */
        Util.toBoolean = function (strNum) {
            strNum = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;

            return (strNum == '1' || strNum == 'true');
        };

        /**
         * Returns the name of the class object passed in.
         *
         * @method getClassName
         * @param classObject {Object}
         * @returns {string} Returns the name of the class object passed in.
         * @public
         * @static
         */
        Util.getClassName = function (classObject) {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec(classObject.constructor.toString());

            return (results && results.length > 1) ? results[1] : '';
        };
        Util._idCounter = 0;
        return Util;
    })();

    return Util;
}));
},{}]},{},[1]);
