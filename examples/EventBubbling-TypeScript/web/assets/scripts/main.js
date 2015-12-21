(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Stage = require('../vendor/structurejs/ts/display/Stage');
var BaseEvent = require('../vendor/structurejs/ts/event/BaseEvent');
var EventBroker = require('../vendor/structurejs/ts/event/EventBroker');
var GrandparentView = require('./view/GrandparentView');
/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
var EventBubblingApp = (function (_super) {
    __extends(EventBubblingApp, _super);
    function EventBubblingApp() {
        _super.call(this);
        this._grandpaView = null;
        this._$clearButton = null;
        this._$stageMessage = null;
        this._onGlobalEvent = function (baseEvent) {
            console.log("Global event dispatched", baseEvent);
        };
    }
    /**
     * @overridden EventBubblingApp.create
     */
    EventBubblingApp.prototype.create = function () {
        _super.prototype.create.call(this);
        this._grandpaView = new GrandparentView(this.$element.find('.js-grandParentContent'));
        this.addChild(this._grandpaView);
        this._$clearButton = this.$element.find('.js-clearButton');
        this._$stageMessage = this.$element.find('.js-stageMessage');
    };
    /**
     * @overridden Stage.layout
     */
    EventBubblingApp.prototype.layout = function () {
        this._$stageMessage.text('');
        this._grandpaView.layout();
        return this;
    };
    /**
     * @overridden Stage.enable
     */
    EventBubblingApp.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        EventBroker.addEventListener(BaseEvent.CHANGE, this._onGlobalEvent, this);
        this._$clearButton.addEventListener('click', this._onClearClick, this);
        this._grandpaView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden Stage.disable
     */
    EventBubblingApp.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._$clearButton.removeEventListener('click', this._onClearClick, this);
        this._grandpaView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden Stage.destroy
     */
    EventBubblingApp.prototype.destroy = function () {
        this._grandpaView.destroy();
        _super.prototype.destroy.call(this);
    };
    EventBubblingApp.prototype._onClearClick = function (event) {
        this.layout();
    };
    EventBubblingApp.prototype._onBubbled = function (baseEvent) {
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$stageMessage.html(text);
    };
    return EventBubblingApp;
})(Stage);
module.exports = EventBubblingApp;

},{"../vendor/structurejs/ts/display/Stage":11,"../vendor/structurejs/ts/event/BaseEvent":12,"../vendor/structurejs/ts/event/EventBroker":13,"./view/GrandparentView":4}],2:[function(require,module,exports){
(function (global){
// Imports
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var EventBubblingApp = require('./EventBubblingApp');
$(document).ready(function () {
    var app = new EventBubblingApp();
    app.appendTo('body'); // Need to specify what area our code has control over.
    // The EventBubblingApp.js class extends Stage which has the appendTo method.
    // Note: On typical website you may want to set it as 'body' do you have control over the whole page.
    window['app'] = app;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./EventBubblingApp":1}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var EventBroker = require('../../vendor/structurejs/ts/event/EventBroker');
/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/
var ChildView = (function (_super) {
    __extends(ChildView, _super);
    function ChildView($element) {
        _super.call(this, $element);
        this._$dispatchButton = null;
        this._$sonMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    ChildView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._$dispatchButton = this.$element.find('.js-dispatchButton');
        this._$sonMessage = this.$element.find('.js-childMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    ChildView.prototype.layout = function () {
        this._$sonMessage.text('');
        this._$checkbox.prop('checked', false);
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    ChildView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;
        this._$dispatchButton.addEventListener('click', this._onButtonClick, this);
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    ChildView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;
        this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    ChildView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    ChildView.prototype._onButtonClick = function (event) {
        event.preventDefault();
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> sent the event.';
        this._$sonMessage.html(text);
        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
    };
    return ChildView;
})(DOMElement);
module.exports = ChildView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"../../vendor/structurejs/ts/event/EventBroker":13}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var ParentView = require('./ParentView');
/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
var GrandparentView = (function (_super) {
    __extends(GrandparentView, _super);
    function GrandparentView($element) {
        _super.call(this, $element);
        this._parentView = null;
        this._$grandparentMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    GrandparentView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._parentView = new ParentView(this.$element.find('.js-parentContent'));
        this.addChild(this._parentView);
        this._$grandparentMessage = this.$element.find('.js-grandparentMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    GrandparentView.prototype.layout = function () {
        this._$grandparentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._parentView.layout();
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    GrandparentView.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._parentView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    GrandparentView.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._parentView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    GrandparentView.prototype.destroy = function () {
        this._parentView.destroy();
        _super.prototype.destroy.call(this);
    };
    GrandparentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');
        if (checkbox === true) {
            baseEvent.stopPropagation();
        }
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$grandparentMessage.html(text);
    };
    return GrandparentView;
})(DOMElement);
module.exports = GrandparentView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"./ParentView":5}],5:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var ChildView = require('./ChildView');
/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
var ParentView = (function (_super) {
    __extends(ParentView, _super);
    function ParentView($element) {
        _super.call(this, $element);
        this._childView = null;
        this._$parentMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    ParentView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._childView = new ChildView(this.$element.find('.js-childContent'));
        this.addChild(this._childView);
        this._$parentMessage = this.$element.find('.js-parentMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    ParentView.prototype.layout = function () {
        this._$parentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._childView.layout();
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    ParentView.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._childView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    ParentView.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._childView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    ParentView.prototype.destroy = function () {
        this._childView.destroy();
        _super.prototype.destroy.call(this);
    };
    ParentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');
        if (checkbox === true) {
            baseEvent.stopPropagation();
        }
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$parentMessage.html(text);
    };
    return ParentView;
})(DOMElement);
module.exports = ParentView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"./ChildView":3}],6:[function(require,module,exports){
///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/handlebars.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/log.d.ts'/>
var Util = require('./util/Util');
/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 * @class BaseObject
 * @module StructureJS
 * @submodule core
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var BaseObject = (function () {
    function BaseObject() {
        /**
         * The sjsId (StructureJS ID) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
         *
         * @property sjsId
         * @type {int}
         * @default null
         * @writeOnce
         * @readOnly
         * @public
         */
        this.sjsId = null;
        this.sjsId = Util.uniqueId();
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
        return Util.getName(this);
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
module.exports = BaseObject;

},{"./util/Util":19}],7:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseObject = require('./BaseObject');
/**
 * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
 *
 * @class ObjectManager
 * @module StructureJS
 * @extends BaseObject
 * @submodule core
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var ObjectManager = (function (_super) {
    __extends(ObjectManager, _super);
    function ObjectManager() {
        _super.call(this);
        /**
         * The isEnabled property is used to keep track of the enabled state of the object.
         *
         * @property isEnabled
         * @type {boolean}
         * @default false
         * @public
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
     *      ClassName.prototype.disable = function() {
     *          if (this.isEnabled === false) { return this; }
     *
     *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.disable();
     *
     *          return _super.prototype.disable.call(this);
     *      }
     */
    ObjectManager.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.isEnabled = false;
        return this;
    };
    return ObjectManager;
})(BaseObject);
module.exports = ObjectManager;

},{"./BaseObject":6}],8:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObjectContainer = require('./DisplayObjectContainer');
var BaseEvent = require('../event/BaseEvent');
var TemplateFactory = require('../util/TemplateFactory');
var ComponentFactory = require('../util/ComponentFactory');
var jQuery = require('../plugin/jquery.eventListener');
/**
 * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
 *
 * @class DOMElement
 * @param type [any=null] Either a jQuery object or JavaScript template string reference you want to use as the view. Check out the examples below.
 * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
 * @extends DisplayObjectContainer
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObjectContainer
 * @requires BaseEvent
 * @requires TemplateFactory
 * @requires ComponentFactory
 * @requires jQuery
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: Using DOMElement without extending it.
 *     var aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
 *     this.addChild(aLink);
 *
 *     // Example: A view passing in a jQuery object.
 *     var view = new CustomView($('.selector'));
 *     this.addChild(view);
 *
 *     // Example: A view extending DOMElement while passing in a jQuery object.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName($element) {
 *              _super.call(this, $element);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this);
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prevent memory leaks.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 *
 *     // Example: A view extending DOMElement with a JavaScript template reference passed in.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *     var HomeTemplate = require('hbs!templates/home/homeTemplate');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName() {
 *              _super.call(this);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this, HomeTemplate, {data: 'some data'});
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 */
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(type, params) {
        if (type === void 0) { type = null; }
        if (params === void 0) { params = null; }
        _super.call(this);
        /**
         * Tracks number of times an element's width has been checked
         * in order to determine if the element has been added
         * to the DOM.
         *
         * @property checkCount
         * @type {number}
         * @public
         */
        this.checkCount = 0;
        /**
         * A cached reference to the DOM Element
         *
         * @property element
         * @type {HTMLElement}
         * @default null
         * @public
         */
        this.element = null;
        /**
         * A cached reference to the jQuery DOM element
         *
         * @property $element
         * @type {JQuery}
         * @default null
         * @public
         */
        this.$element = null;
        /**
         * If a jQuery object was passed into the constructor this will be set as true and
         * this class will not try to add the view to the DOM since it already exists.
         *
         * @property _isReference
         * @type {boolean}
         * @protected
         */
        this._isReference = false;
        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _type
         * @type {string}
         * @default null
         * @protected
         */
        this._type = null;
        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _params
         * @type {any}
         * @default null
         * @protected
         */
        this._params = null;
        if (type instanceof jQuery) {
            this.$element = type;
            this.element = this.$element[0];
            this._isReference = true;
        }
        else if (type) {
            this._type = type;
            this._params = params;
        }
    }
    /**
     * The create function is intended to provide a consistent place for the creation and adding
     * of children to the view. It will automatically be called the first time that the view is added
     * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
     * their overridden methods.
     *
     * This method gets called once when the child view is added to another view. If the child view is removed
     * and added to another view the create method will not be called again.
     *
     * @method create
     * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @returns {DOMElement} Returns an instance of itself.
     * @public
     * @chainable
     * @example
     *     // EXAMPLE 1: By default your view class will be a div element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this._childInstance = new DOMElement();
     *          this.addChild(this._childInstance);
     *     }
     *
     *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul');
     *     }
     *
     *     // Then you could nest other elements inside this base view/element.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul', {id: 'myId', 'class': 'myClass anotherClass'});
     *
     *          var li = new DOMElement('li', {text: 'Robert is cool'});
     *          this.addChild(li);
     *     }
     *
     *     // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below
     *     // inline Handlebar template in your html file.
     *     <script id="todoTemplate" type="text/template">
     *          <div id="htmlTemplate" class="js-todo">
     *              <div id="input-wrapper">
     *                  <input type="text" class="list-input" placeholder="{{ data.text }}">
     *                  <input type="button" class="list-item-submit" value="Add">
     *              </div>
     *          </div>
     *     </script>
     *
     *     // You would just pass in the id or class selector of the template which in this case is "#todoTemplate".
     *     // There is a second optional argument where you can pass data for the Handlebar template to use.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, '#todoTemplate', { data: this.viewData });
     *
     *     }
     *
     *     // EXAMPLE 4: Let's say you wanted to use the Handlebar plugin within RequireJS. You can pass the template into create.
     *     var HomeTemplate = require('hbs!templates/HomeTemplate');
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, HomeTemplate, {data: "some data"});
     *
     *     }
     *
     *     // EXAMPLE 5: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
     *     require('templates'); // templates.js
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'templates/HomeTemplate', {data: "some data"});
     *
     *     }
     */
    DOMElement.prototype.create = function (type, params) {
        if (type === void 0) { type = 'div'; }
        if (params === void 0) { params = null; }
        // Use the data passed into the constructor first else use the arguments from create.
        type = this._type || type;
        params = this._params || params;
        if (this.isCreated === true) {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot call the create method manually. It is only called once automatically during the view lifecycle and should only be called once.');
        }
        if (this.$element == null) {
            var html = TemplateFactory.create(type, params);
            if (html) {
                this.$element = jQuery(html);
            }
            else {
                this.$element = jQuery("<" + type + "/>", params);
            }
        }
        this.element = this.$element[0];
        this.width = this.$element.width();
        this.height = this.$element.height();
        this.setSize(this.width, this.height);
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.addChild
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {DOMElement} Returns an instance of itself.
     * @chainable
     * @example
     *     container.addChild(domElementInstance);
     */
    DOMElement.prototype.addChild = function (child) {
        if (this.$element == null) {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
        }
        _super.prototype.addChild.call(this, child);
        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0) {
            return this;
        }
        if (child.isCreated === false) {
            child.create(); // Render the item before adding to the DOM
            child.isCreated = true;
        }
        // If the child object is not a reference of a jQuery object in the DOM then append it.
        if (child._isReference === false) {
            this.$element.append(child.$element);
        }
        this.onAddedToDom(child);
        return this;
    };
    /**
     * Adds the sjsId to the DOM element so we can know what what Class object the HTMLElement belongs too.
     *
     * @method addClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     */
    DOMElement.prototype.addClientSideId = function (child) {
        var type = child.$element.attr('data-sjs-type');
        var id = child.$element.attr('data-sjs-id');
        if (type === void 0) {
            // Make them array's so the join method will work.
            type = [child.getQualifiedClassName()];
            id = [child.sjsId];
        }
        else {
            // Split them so we can push/add the new values.
            type = type.split(',');
            id = id.split(',');
            type.push(child.getQualifiedClassName());
            id.push(child.sjsId);
        }
        // Updated list of id's and types
        child.$element.attr('data-sjs-id', id.join(','));
        child.$element.attr('data-sjs-type', type.join(','));
    };
    /**
     * Removes the sjsId and class type from the HTMLElement.
     *
     * @method removeClientSideId
     * @param child {DOMElement} The DOMElement instance to add the sjsId too.
     * @protected
     * @return {boolean}
     */
    DOMElement.prototype.removeClientSideId = function (child) {
        var type = child.$element.attr('data-sjs-type');
        var id = child.$element.attr('data-sjs-id');
        // Split them so we can remove the child sjsId and type.
        var typeList = type.split(',');
        var idList = id.split(',').map(Number); // Convert each item into a number.
        var index = idList.indexOf(child.sjsId);
        if (index > -1) {
            // Remove the id and type from the array.
            typeList.splice(index, 1);
            idList.splice(index, 1);
            // Updated list of id's and types
            child.$element.attr('data-sjs-type', typeList.join(','));
            child.$element.attr('data-sjs-id', idList.join(','));
        }
        return idList.length === 0;
    };
    /**
     * Called when the child object is added to the DOM.
     * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
     *
     * @method onDomAdded
     * @protected
     */
    DOMElement.prototype.onAddedToDom = function (child) {
        var _this = this;
        child.checkCount++;
        if (child.$element.width() === 0 && child.checkCount < 5) {
            setTimeout(function () {
                _this.onAddedToDom(child);
            }, 100);
            return;
        }
        this.addClientSideId(child);
        child.width = child.$element.width();
        child.height = child.$element.height();
        child.setSize(child.width, child.height);
        child.enable();
        child.layout();
        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED_TO_STAGE));
    };
    /**
     * @overridden DisplayObjectContainer.addChildAt
     */
    DOMElement.prototype.addChildAt = function (child, index) {
        var children = this.$element.children();
        var length = children.length;
        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0) {
            return this;
        }
        if (index < 0 || index >= length) {
            // If the index passed in is less than 0 and greater than the total number of children then place the item at the end.
            this.addChild(child);
        }
        else {
            // Else get the child in the children array by the index passed in and place the item before that child.
            if (child.isCreated === false) {
                child.create(); // Render the item before adding to the DOM
                child.isCreated = true;
            }
            // Adds the child at a specific index but also will remove the child from another parent object if one exists.
            if (child.parent) {
                child.parent.removeChild(child, false);
            }
            this.children.splice(index, 0, child);
            this.numChildren = this.children.length;
            child.parent = this;
            // Adds the child before any child already added in the DOM.
            jQuery(children.get(index)).before(child.$element);
            this.onAddedToDom(child);
        }
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.swapChildren
     */
    DOMElement.prototype.swapChildren = function (child1, child2) {
        var child1Index = child1.$element.index();
        var child2Index = child2.$element.index();
        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.getChildAt
     */
    DOMElement.prototype.getChildAt = function (index) {
        return _super.prototype.getChildAt.call(this, index);
    };
    /**
     * Returns a DOMElement object with the first found DOM element by the passed in selector.
     *
     * @method getChild
     * @param selector {string} DOM id name, DOM class name or a DOM tag name.
     * @returns {DOMElement}
     * @public
     */
    DOMElement.prototype.getChild = function (selector) {
        // Get the first match from the selector passed in.
        var jQueryElement = this.$element.find(selector).first();
        if (jQueryElement.length === 0) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
        }
        // Check to see if the element has a sjsId value and is a child of this parent object.
        var sjsId = parseInt(jQueryElement.attr('data-sjs-id'));
        var domElement = this.getChildByCid(sjsId);
        // Creates a DOMElement from the jQueryElement.
        if (domElement == null) {
            // Create a new DOMElement and assign the jQuery element to it.
            domElement = new DOMElement();
            domElement.$element = jQueryElement;
            this.addClientSideId(domElement);
            domElement.element = jQueryElement[0];
            domElement.isCreated = true;
            // Added to the super addChild method because we don't need to append the element to the DOM.
            // At this point it already exists and we are just getting a reference to the DOM element.
            _super.prototype.addChild.call(this, domElement);
        }
        return domElement;
    };
    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
     * @returns {Array.<DOMElement>} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-sjs-id' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
     * @public
     */
    DOMElement.prototype.getChildren = function (selector) {
        if (selector === void 0) { selector = ''; }
        //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
        var $child;
        var domElement;
        var $list = this.$element.children(selector);
        var listLength = $list.length;
        for (var i = 0; i < listLength; i++) {
            $child = $list.eq(i);
            // If the jQuery element already has sjsId data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
            if ($child.attr('data-sjs-id') === void 0) {
                domElement = new DOMElement();
                domElement.$element = $child;
                this.addClientSideId(domElement);
                domElement.element = $child.get(0);
                domElement.isCreated = true;
                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                _super.prototype.addChild.call(this, domElement);
            }
        }
        return this.children;
    };
    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null and the object is garbage collected if there are no other references
     * to the child. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DOMElement} The DisplayObjectContainer instance to remove.
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChild = function (child, destroy) {
        if (destroy === void 0) { destroy = true; }
        var remove = this.removeClientSideId(child);
        child.disable();
        // Checks if destroy was called before removeChild so it doesn't error.
        if (remove === true && child.$element != null) {
            child.$element.unbind();
            child.$element.remove();
        }
        if (destroy === true) {
            child.destroy();
        }
        _super.prototype.removeChild.call(this, child);
        return this;
    };
    /**
     * Removes the child display object instance that exists at the specified index.
     *
     * @method removeChildAt
     * @param index {int} The index position of the child object.
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChildAt = function (index, destroy) {
        if (destroy === void 0) { destroy = true; }
        this.removeChild(this.getChildAt(index), destroy);
        return this;
    };
    /**
     * Removes all child object instances from the child list of the parent object instance.
     * The parent property of the removed children is set to null and the objects are garbage collected if no other
     * references to the children exist.
     *
     * @method removeChildren
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChildren = function (destroy) {
        if (destroy === void 0) { destroy = true; }
        while (this.children.length > 0) {
            this.removeChild(this.children.pop(), destroy);
        }
        this.$element.empty();
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.destroy
     */
    DOMElement.prototype.destroy = function () {
        // Note: we can't just call destroy to remove the HTMLElement because there could be other views managing the same HTMLElement.
        /*if (this.$element != null) {
             this.$element.unbind();
             this.$element.remove();
         }*/
        _super.prototype.destroy.call(this);
    };
    /**
     * A way to instantiate view classes by found html selectors.
     *
     * Example: It will find all children elements of the {{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property with the 'js-shareEmail' selector.
     * If any selectors are found the EmailShareComponent class will be instantiated and pass the found jQuery element into the contructor.
     *
     * @method createComponents
     * @param componentList (Array.<{ selector: string; component: DOMElement }>
     * @return {Array.<DOMElement>} Returns all the items created from this createComponents method.
     * @public
     * @chainable
     * @example
     *      ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this.createComponents([
     *              {selector: '.js-shareEmail', component: EmailShareComponent},
     *              {selector: '.js-pagination', component: PaginationComponent},
     *              {selector: '.js-carousel', component: CarouselComponent}
     *          ]);
     *      };
     */
    DOMElement.prototype.createComponents = function (componentList) {
        var list;
        var createdChildren = [];
        var length = componentList.length;
        var obj;
        for (var i = 0; i < length; i++) {
            obj = componentList[i];
            list = ComponentFactory.create(this.$element.find(obj.selector), obj.component, this);
            createdChildren = createdChildren.concat(list);
        }
        return createdChildren;
    };
    return DOMElement;
})(DisplayObjectContainer);
module.exports = DOMElement;

},{"../event/BaseEvent":12,"../plugin/jquery.eventListener":15,"../util/ComponentFactory":16,"../util/TemplateFactory":18,"./DisplayObjectContainer":10}],9:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher = require('../event/EventDispatcher');
/**
 * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObject
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires EventDispatcher
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        /**
         * The Stage of the display object.
         *
         * @property stage
         * @type {any}
         * @public
         */
        this.stage = null;
        /**
         * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
         * This property is only used with the canvas specific display objects.
         *
         * @property ctx
         * @type {CanvasRenderingContext2D}
         * @public
         */
        this.ctx = null;
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
         * Indicates the width of the display object, in pixels.
         *
         * @property width
         * @type {number}
         * @default 0
         * @public
         */
        this.width = 0;
        /**
         * Indicates the height of the display object, in pixels.
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
        /**
         * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
         *
         * @property scaleX
         * @type {number}
         * @public
         */
        this.scaleX = 1;
        /**
         * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
         *
         * @property scaleY
         * @type {number}
         * @public
         */
        this.scaleY = 1;
        /**
         * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
         *
         * @property rotation
         * @type {number}
         * @public
         */
        this.rotation = 0;
        /**
         * Indicates the alpha transparency value of the object specified.
         *
         * @property alpha
         * @type {number}
         * @public
         */
        this.alpha = 1;
        /**
         * Whether or not the display object is visible.
         *
         * @property visible
         * @type {boolean}
         * @public
         */
        this.visible = true;
        /**
         * Specifies whether this object receives mouse
         *
         * @property mouseEnabled
         * @type {boolean}
         * @public
         */
        this.mouseEnabled = false;
        /**
         * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
         *
         * @property useHandCursor
         * @type {boolean}
         * @public
         */
        this.useHandCursor = false;
        /**
         * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
         *
         * @property isCreated
         * @type {boolean}
         * @default false
         * @public
         */
        this.isCreated = false;
        /**
         * Indicates the instance name of the DisplayObject.
         *
         * @property name
         * @type {string}
         * @public
         */
        this.name = null;
    }
    /**
     * The create function is intended to provide a consistent place for the creation or initializing the view.
     * It will automatically be called the first time that the view is added to a DisplayObjectContainer.
     * It is critical that all subclasses call the super for this function in their overridden methods.
     *
     * @method create
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.create = function () {
        this.isCreated = true;
        return this;
    };
    /**
     * The layout method provides a common function to handle updating objects in the view.
     *
     * @method layout
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.layout = function () {
        return this;
    };
    /**
     * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.setSize = function (unscaledWidth, unscaledHeight) {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        return this;
    };
    DisplayObject.prototype.readerStart = function () {
        this.ctx.save();
    };
    DisplayObject.prototype.update = function () {
        if (this.ctx === null || this.alpha <= 0 || this.visible === false)
            return false;
        this.readerStart();
        this.ctx.globalAlpha = this.alpha;
        this.layout();
        this.renderEnd();
    };
    DisplayObject.prototype.renderEnd = function () {
        this.ctx.restore();
    };
    return DisplayObject;
})(EventDispatcher);
module.exports = DisplayObject;

},{"../event/EventDispatcher":14}],10:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = require('./DisplayObject');
/**
 * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObjectContainer
 * @extends DisplayObject
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.call(this);
        /**
         * Returns the number of children of this object.
         *
         * @property numChildren
         * @type {int}
         * @default 0
         * @readOnly
         * @public
         */
        this.numChildren = 0;
        /**
         * A reference to the child DisplayObject instances to this parent object instance.
         *
         * @property children
         * @type {Array.<DisplayObject>}
         * @readOnly
         * @public
         */
        this.children = [];
        /**
         * Determines whether or not the children of the object are mouse enabled.
         *
         * @property mouseChildren
         * @type {boolean}
         * @public
         */
        this.mouseChildren = false;
    }
    /**
     * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
     * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
     *
     * If you add a child object that already has a different parent, the object is removed from the child
     * list of the other parent object.
     *
     * @method addChild
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.addChild = function (child) {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent) {
            child.parent.removeChild(child);
        }
        this.children.push(child);
        this.numChildren = this.children.length;
        child.parent = this;
        return this;
    };
    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainerContainer instance.
     * The child is added at the index position specified. An index of 0 represents the back
     * (bottom) of the display list for this DisplayObjectContainerContainer object.
     *
     * @method addChildAt
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this object instance.
     * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.addChildAt = function (child, index) {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent) {
            child.parent.removeChild(child);
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
     * @param child {DisplayObject} The DisplayObject instance to remove.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.removeChild = function (child) {
        var index = this.getChildIndex(child);
        if (index !== -1) {
            // Removes the child object from the parent.
            this.children.splice(index, 1);
        }
        this.numChildren = this.children.length;
        child.parent = null;
        return this;
    };
    /**
     * Removes all child DisplayObject instances from the child list of the DisplayObjectContainerContainer instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if
     * no other references to the children exist.
     *
     * @method removeChildren
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.removeChildren = function () {
        while (this.children.length > 0) {
            this.removeChild(this.children.pop());
        }
        return this;
    };
    /**
     * Swaps two DisplayObject's with each other.
     *
     * @method swapChildren
     * @param child1 {DisplayObject} The DisplayObject instance to be swap.
     * @param child2 {DisplayObject} The DisplayObject instance to be swap.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        var child1Index = this.getChildIndex(child1);
        var child2Index = this.getChildIndex(child2);
        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);
    };
    /**
     * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
     *
     * @method swapChildrenAt
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
     * Returns the index position of a child DisplayObject instance.
     *
     * @method getChildIndex
     * @param child {DisplayObject} The DisplayObject instance to identify.
     * @returns {int} The index position of the child display object to identify.
     * @public
     */
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        return this.children.indexOf(child);
    };
    /**
     * Determines whether the specified display object is a child of the DisplayObject instance or the instance itself. The search includes the entire display list including this DisplayObject instance.
     *
     * @method contains
     * @param child {DisplayObject} The child object to test.
     * @returns {boolean}  true if the child object is a child of the DisplayObject or the container itself; otherwise false.
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
     * @returns {DisplayObject} The child display object at the specified index position.
     */
    DisplayObjectContainer.prototype.getChildAt = function (index) {
        return this.children[index];
    };
    /**
     * Gets a DisplayObject by its sjsId.
     *
     * @method getChildByCid
     * @param sjsId {number}
     * @returns {DisplayObject|null}
     * @override
     * @public
     */
    DisplayObjectContainer.prototype.getChildByCid = function (sjsId) {
        var child = null;
        for (var i = this.numChildren - 1; i >= 0; i--) {
            if (this.children[i].sjsId == sjsId) {
                child = this.children[i];
                break;
            }
        }
        return child;
    };
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;

},{"./DisplayObject":9}],11:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DOMElement = require('./DOMElement');
/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main application or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @requires Extend
 * @requires DOMElement
 * @requires jQuery
 * @example
 *     // This example illustrates how to setup your main application or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 *     define(function (require, exports, module) {
 *         'use strict';
 *
 *         var Extend = require('structurejs/util/Extend');
 *         var Stage = require('replace/path/Stage');
 *
 *         var MainClass = (function () {
 *
 *         var _super = Extend(MainClass, Stage);
 *
 *             function MainClass() {
 *                 _super.call(this);
 *             }
 *
 *             MainClass.prototype.create = function () {
 *                 _super.prototype.create.call(this);
 *
 *                 // Create and add your child objects to this parent class.
 *             }
 *
 *             MainClass.prototype.layout = function () {
 *                 // Layout or update the child objects in this parent class.
 *
 *                 return this;
 *             }
 *
 *             MainClass.prototype.enable = function () {
 *                 if (this.isEnabled === true) { return this };
 *
 *                 // Enable the child objects and add any event listeners.
 *
 *                 return _super.prototype.enable.call(this);
 *             }
 *
 *             MainClass.prototype.disable = function () {
 *                 if (this.isEnabled === false) { return this };
 *
 *                 // Disable the child objects and remove any event listeners.
 *
 *                 return _super.prototype.disable.call(this);
 *             }
 *
 *             MainClass.prototype.destroy = function () {
 *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *                 _super.prototype.destroy.call(this);
 *             }
 *
 *             return MainClass;
 *         })();
 *
 *         module.exports = MainClass;
 *     });
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiate your main application or root class.
 *
 *      var app = new MainClass();
 *      app.appendTo('body');
 *
 */
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.call(this);
    }
    /**
     * The selected HTML element where the child elements will be created. This method starts the lifecycle of the application.
     *
     * @method appendTo
     * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
     * @param [enabled=true] {boolean} Sets the enabled state of the object.
     * @chainable
     */
    Stage.prototype.appendTo = function (type, enabled) {
        if (enabled === void 0) { enabled = true; }
        this.$element = (type instanceof jQuery) ? type : jQuery(type);
        this.addClientSideId(this);
        if (this.isCreated === false) {
            this.create();
            this.isCreated = true;
            if (enabled === false) {
                this.disable();
            }
            else {
                this.enable();
            }
            this.layout();
        }
        return this;
    };
    return Stage;
})(DOMElement);
module.exports = Stage;

},{"./DOMElement":8}],12:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseObject = require('../BaseObject');
/**
 * The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 *
 * The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 *
 * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
 * detailed information.
 * @class BaseEvent
 * @extends BaseObject
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any} Use to pass any type of data with the event.
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: how to create a custom event by extending BaseEvent.
 *     var Extend = require('structurejs/util/Extend');
 *     var BaseEvent = require('structurejs/event/BaseEvent');
 *
 *     var CountryEvent = (function () {
 *
 *          var _super = Extend(CountryEvent, BaseEvent);
 *
 *          CountryEvent.CHANGE_COUNTRY = "CountryEvent.changeCountry";
 *
 *          function CountryEvent(type, bubbles, cancelable, data) {
 *              _super.call(this, type, bubbles, cancelable, data);
 *
 *              this.countryName = null;
 *          }
 *
 *           return CountryEvent;
 *      })();
 *
 *     // Example: how to use the custom event.
 *     var event = new CountryEvent(CountryEvent.CHANGE_COUNTRY);
 *     event.countryName = 'Canada';
 *     this.dispatchEvent(event);
 */
var BaseEvent = (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(type, bubbles, cancelable, data) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (data === void 0) { data = null; }
        _super.call(this);
        /**
         * The type of event.
         *
         * @property type
         * @type {string}
         * @default null
         * @public
         * @readOnly
         */
        this.type = null;
        /**
         * A reference to the object that originally dispatched the event.
         *
         * @property target
         * @type {any}
         * @default null
         * @public
         * @readOnly
         */
        this.target = null;
        /**
         * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
         *
         * @property currentTarget
         * @type {any}
         * @default null
         * @public
         * @readOnly
         */
        this.currentTarget = null;
        /**
         * Used to pass any type of data with the event.
         *
         * @property data
         * @type {any}
         * @public
         * @default null
         */
        this.data = null;
        /**
         * Indicates whether an event is a bubbling event.
         *
         * @property bubbles
         * @type {boolean}
         * @public
         * @default false
         */
        this.bubbles = false;
        /**
         * Indicates whether the behavior associated with the event can be prevented.
         *
         * @property cancelable
         * @type {boolean}
         * @public
         * @default false
         */
        this.cancelable = false;
        /**
         * Indicates if the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} was called on the event object.
         *
         * @property isPropagationStopped
         * @type {boolean}
         * @default false
         * @public
         * @readOnly
         */
        this.isPropagationStopped = false;
        /**
         * Indicates if the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} was called on the event object.
         *
         * @property isImmediatePropagationStopped
         * @type {boolean}
         * @default false
         * @public
         * @readOnly
         */
        this.isImmediatePropagationStopped = false;
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.data = data;
    }
    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     * This method does not affect any event listeners in the current node (currentTarget). In contrast,
     * the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} method prevents processing
     * of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
     *
     * @method stopPropagation
     * @public
     * @example
     *     event.stopPropagation();
     */
    BaseEvent.prototype.stopPropagation = function () {
        this.isPropagationStopped = true;
    };
    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     * This method takes effect immediately, and it affects event listeners in the current node. In contrast,
     * the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} method doesn't take effect until
     * all the event listeners in the current node finish processing.
     *
     * @method stopImmediatePropagation
     * @public
     * @example
     *     event.stopImmediatePropagation();
     */
    BaseEvent.prototype.stopImmediatePropagation = function () {
        this.stopPropagation();
        this.isImmediatePropagationStopped = true;
    };
    /**
     * Duplicates an instance of an BaseEvent subclass.
     *
     * Returns a new BaseEvent object that is a copy of the original instance of the BaseEvent object.
     *
     * The new BaseEvent object includes all the properties of the original.
     *
     * @method clone
     * @returns {BaseEvent}
     * @public
     * @example
     *     var cloneOfEvent = event.clone();
     */
    BaseEvent.prototype.clone = function () {
        var clonedBaseModel = new this.constructor(this.type, this.bubbles, this.cancelable, this.data);
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                clonedBaseModel[key] = this[key];
            }
        }
        return clonedBaseModel;
    };
    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event ACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ACTIVATE = 'BaseEvent.activate';
    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event ADDED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED = 'BaseEvent.added';
    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event ADDED_TO_STAGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';
    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event CANCEL
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CANCEL = 'BaseEvent.cancel';
    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CHANGE = 'BaseEvent.change';
    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event CLEAR
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLEAR = 'BaseEvent.clear';
    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event CLOSE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSE = 'BaseEvent.close';
    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event CLOSING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSING = 'BaseEvent.closing';
    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event COMPLETE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COMPLETE = 'BaseEvent.complete';
    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event CONNECT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CONNECT = 'BaseEvent.connect';
    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event COPY
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COPY = 'BaseEvent.copy';
    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event CUT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CUT = 'BaseEvent.cut';
    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event DEACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';
    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event DISPLAYING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DISPLAYING = 'BaseEvent.displaying';
    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event ENTER_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';
    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event EXIT_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';
    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event EXITING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXITING = 'BaseEvent.exiting';
    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event FULLSCREEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';
    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event INIT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.INIT = 'BaseEvent.init';
    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event NETWORK_CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';
    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event OPEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.OPEN = 'BaseEvent.open';
    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event PASTE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PASTE = 'BaseEvent.paste';
    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event PREPARING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PREPARING = 'BaseEvent.preparing';
    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event REMOVED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.REMOVED = 'BaseEvent.removed';
    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event RENDER
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RENDER = 'BaseEvent.render';
    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event RESIZE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RESIZE = 'BaseEvent.resize';
    /**
     * The BaseEvent.SELECTED constant defines the value of the type property of a selected event object.
     *
     * @event SELECTED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.SELECTED = 'BaseEvent.selected';
    return BaseEvent;
})(BaseObject);
module.exports = BaseEvent;

},{"../BaseObject":6}],13:[function(require,module,exports){
var EventDispatcher = require('./EventDispatcher');
var BaseEvent = require('./BaseEvent');
/**
 * EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications.
 * Loosely coupled event handling, the subscriber does not know the publisher. Both of them only need to know the event type.
 *
 * @class EventBroker
 * @module StructureJS
 * @submodule event
 * @requires EventDispatcher
 * @requires BaseEvent
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
var EventBroker = (function () {
    function EventBroker() {
        throw new Error('[EventBroker] Do not instantiate the EventBroker class because it is a static class.');
    }
    /**
     * Registers an event listener object with an EventBroker object so that the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. The callback function will receive a {{#crossLink "BaseEvent"}}{{/crossLink}} object or custom event that extends the {{#crossLink "BaseEvent"}}{{/crossLink}} class.
     * @param scope {any} The scope of the callback function.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @static
     * @public
     * @example
     *     EventBroker.addEventListener('change', this._handlerMethod, this);
     *     // Example of using a constant event type.
     *     EventBroker.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *     // The event passed to the method will always be a BaseEvent object.
     *     ClassName.prototype._handlerMethod = function (event) {
     *          console.log(event.data);
     *     };
     */
    EventBroker.addEventListener = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
    };
    /**
     * Registers an event listener object once with an EventDispatcher object so the listener will receive the notification of an event.
     *
     * @method addEventListenerOnce
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. The callback function will receive a {{#crossLink "BaseEvent"}}{{/crossLink}} object or custom event that extends the {{#crossLink "BaseEvent"}}{{/crossLink}} class.
     * @param scope {any} The scope of the callback function.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @static
     * @public
     * @example
     *     EventBroker.addEventListenerOnce('change', this._handlerMethod, this);
     *     // Example of using a constant event type.
     *     EventBroker.addEventListenerOnce(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *     // The event passed to the method will always be a BaseEvent object.
     *     ClassName.prototype._handlerMethod = function (event) {
     *          console.log(event.data);
     *     };
     */
    EventBroker.addEventListenerOnce = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        EventBroker._eventDispatcher.addEventListenerOnce(type, callback, scope, priority);
    };
    /**
     * Removes a specified listener from the EventBroker object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The callback function to be removed.
     * @param scope {any} The scope of the callback function to be removed.
     * @static
     * @public
     * @example
     *     EventBroker.removeEventListener('change', this._handlerMethod, this);
     *
     *     EventBroker.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    EventBroker.removeEventListener = function (type, callback, scope) {
        EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
    };
    /**
     * Dispatches an event within the EventBroker object.
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @static
     * @public
     * @example
     *      EventBroker.dispatchEvent('change');
     *
     *      // Example: Sending data with the event.
     *      EventBroker.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: Sending a BaseEvent or custom event object.
     *      var event = new BaseEvent(BaseEvent.CHANGE);
     *      event.data = {some: 'data'};
     *      EventBroker.dispatchEvent(event);
     */
    EventBroker.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var event = type;
        if (typeof event === 'string') {
            event = new BaseEvent(type, false, false, data);
        }
        event.target = EventBroker;
        event.currentTarget = EventBroker;
        EventBroker._eventDispatcher.dispatchEvent(event);
    };
    /**
     * Check if EventBroker has a specific event listener already added.
     *
     * @method hasEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener method to call.
     * @param scope {any} The scope of the listener object.
     * @return {boolean}
     * @static
     * @public
     * @example
     *      EventBroker.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    EventBroker.hasEventListener = function (type, callback, scope) {
        return EventBroker._eventDispatcher.hasEventListener(type, callback, scope);
    };
    /**
     * Generates a string output of event listeners for a given object.
     *
     * @method getEventListeners
     * @return {string}
     * @static
     * @public
     * @example
     *      EventBroker.getEventListeners();
     *
     *      // [ClassName] is listen for 'BaseEvent.change' event.
     */
    EventBroker.getEventListeners = function () {
        return EventBroker._eventDispatcher.getEventListeners();
    };
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    EventBroker._eventDispatcher = new EventDispatcher();
    return EventBroker;
})();
module.exports = EventBroker;

},{"./BaseEvent":12,"./EventDispatcher":14}],14:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectManager = require('../ObjectManager');
var BaseEvent = require('./BaseEvent');
/**
 * EventDispatcher is the base class for all classes that dispatch events. It is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
 * EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 *
 * @class EventDispatcher
 * @extends ObjectManager
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires ObjectManager
 * @requires BaseEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Extending EventDispatcher. See DisplayObjectContainer as an example that extends EventDispatcher.
 *      var _super = Extend(ClassExtendingEventDispatcher, EventDispatcher);
 *
 *      // Another way to use the EventDispatcher.
 *      var eventDispatcher = new EventDispatcher();
 *      eventDispatcher.addEventListener('change', this.handlerMethod, this);
 *      eventDispatcher.dispatchEvent('change');
 */
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
        /**
         * Holds a reference to added listeners.
         *
         * @property _listeners
         * @type {Array.<any>}
         * @protected
         */
        this._listeners = null;
        /**
         * Indicates the object that contains a child object. Uses the parent property
         * to specify a relative path to display objects that are above the current display object in the display
         * list hierarchy and helps facilitate event bubbling.
         *
         * @property parent
         * @type {any}
         * @public
         */
        this.parent = null;
        this._listeners = [];
    }
    /**
     * Registers an event listener object with an EventDispatcher object so the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @public
     * @chainable
     * @example
     *      this.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *
     *      ClassName.prototype.handlerMethod = function (event) {
     *          console.log(event.target + " sent the event.");
     *          console.log(event.type, event.data);
     *      }
     */
    EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        // Get the list of event listeners by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list == null) {
            // If a list of event listeners do not exist for the type value passed in then create a new empty array.
            this._listeners[type] = list = [];
        }
        var index = 0;
        var listener;
        var i = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.callback === callback && listener.scope === scope) {
                // If the same callback and scope are found then remove it and add the current one below.
                list.splice(i, 1);
            }
            else if (index === 0 && listener.priority < priority) {
                index = i + 1;
            }
        }
        // Add the event listener to the list array at the index value.
        list.splice(index, 0, { callback: callback, scope: scope, priority: priority, once: false });
        return this;
    };
    /**
     * Registers an event listener object once with an EventDispatcher object so the listener will receive the notification of an event.
     *
     * @method addEventListenerOnce
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @public
     * @chainable
     * @example
     *      this.addEventListenerOnce(BaseEvent.CHANGE, this.handlerMethod, this);
     *
     *      ClassName.prototype.handlerMethod = function (event) {
     *          console.log(event.target + " sent the event.");
     *          console.log(event.type, event.data);
     *      }
     */
    EventDispatcher.prototype.addEventListenerOnce = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        // Add the event listener the normal way.
        this.addEventListener(type, callback, scope, priority);
        // Get the event listeners we just added.
        var list = this._listeners[type];
        var listener = list[0];
        // Change the value to true so it will be remove after dispatchEvent is called.
        listener.once = true;
        return this;
    };
    /**
     * Removes a specified listener from the EventDispatcher object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * @hide This was added because it was needed for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
     * @public
     * @chainable
     * @example
     *      this.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *      ClassName.prototype._handlerMethod = function (event) {
     *      };
     */
    EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
        // Get the list of event listeners by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list !== void 0) {
            var i = list.length;
            while (--i > -1) {
                // If the callback and scope are the same then remove the event listener.
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
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch. You can create custom events, the only requirement is all events must extend {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @public
     * @chainable
     * @example
     *      this.dispatchEvent('change');
     *
     *      // Example: Sending data with the event:
     *      this.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: With an event object
     *      // (event type, bubbling set to true, cancelable set to true and passing data) :
     *      var event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
     *      this.dispatchEvent(event);
     *
     *      // Here is a common inline event object being dispatched:
     *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
     */
    EventDispatcher.prototype.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var event = type;
        if (typeof event === 'string') {
            event = new BaseEvent(type, false, true, data);
        }
        // If target is null then set it to the object that dispatched the event.
        if (event.target == null) {
            event.target = this;
            event.currentTarget = this;
        }
        // Get the list of event listener by the associated type value.
        var list = this._listeners[event.type];
        if (list !== void 0) {
            var i = list.length;
            var listener;
            while (--i > -1) {
                // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                if (event.cancelable === true && event.isImmediatePropagationStopped === true) {
                    break;
                }
                listener = list[i];
                listener.callback.call(listener.scope, event);
                // If the once value is true we want to remove the listener right after this callback was called.
                if (listener.once === true) {
                    this.removeEventListener(event.type, listener.callback, listener.scope);
                }
            }
        }
        //Dispatches up the chain of classes that have a parent.
        if (this.parent != null && event.bubbles === true) {
            // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
            if (event.cancelable === true && event.isPropagationStopped === true) {
                return this;
            }
            // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
            event.currentTarget = this;
            // Pass the event to the parent (event bubbling).
            this.parent.dispatchEvent(event);
        }
        return this;
    };
    /**
     * Check if an object has a specific event listener already added.
     *
     * @method hasEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener method to call.
     * @param scope {any} The scope of the listener object.
     * @return {boolean}
     * @public
     * @example
     *      this.hasEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     */
    EventDispatcher.prototype.hasEventListener = function (type, callback, scope) {
        if (this._listeners[type] !== void 0) {
            var listener;
            var numOfCallbacks = this._listeners[type].length;
            for (var i = 0; i < numOfCallbacks; i++) {
                listener = this._listeners[type][i];
                if (listener.callback === callback && listener.scope === scope) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Generates a string output of event listeners for a given object.
     *
     * @method getEventListeners
     * @return {string}
     * @public
     * @example
     *      this.getEventListeners();
     *
     *      // [ClassName] is listening for the 'BaseEvent.change' event.
     */
    EventDispatcher.prototype.getEventListeners = function () {
        var str = '';
        var numOfCallbacks;
        var listener;
        for (var type in this._listeners) {
            numOfCallbacks = this._listeners[type].length;
            for (var i = 0; i < numOfCallbacks; i++) {
                listener = this._listeners[type][i];
                if (listener.scope && (typeof listener.scope.getQualifiedClassName === 'function')) {
                    str += '[' + listener.scope.getQualifiedClassName() + ']';
                }
                else {
                    str += '[Unknown]';
                }
                str += " is listen for '" + type + "' event.\n";
            }
        }
        return str;
    };
    /**
     * @overridden BaseObject.destroy
     */
    EventDispatcher.prototype.destroy = function () {
        this.disable();
        _super.prototype.destroy.call(this);
    };
    return EventDispatcher;
})(ObjectManager);
module.exports = EventDispatcher;

},{"../ObjectManager":7,"./BaseEvent":12}],15:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var $eventListener = $;
/**
 * A bind polyfill for browsers that don't support the bind method.
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {
        }, fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
/**
 * Generates a hash string from the string being passed in. In this case it is a function that is casted as string value.
 *
 * @param str
 * @returns {String}
 */
var hashCode = function (str) {
    str = String(str);
    // http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
    var character;
    var hash = null;
    var strLength = str.length;
    if (strLength == 0)
        return hash;
    for (var i = 0; i < strLength; i++) {
        character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return String(Math.abs(hash));
};
/**
 * The jQuery addEventListener plugin
 */
$eventListener.fn.addEventListener = function (type, selector, data, callback, scope) {
    var _callback;
    var _scope;
    var _handler;
    switch (arguments.length) {
        case 3:
            _callback = selector;
            _scope = data;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, _handler);
            break;
        case 4:
            _callback = data;
            _scope = callback;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, selector, _handler);
            break;
        case 5:
            _callback = callback;
            _scope = scope;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, selector, data, _handler);
            break;
        default:
            throw new Error('jQuery addEventListener plugin requires at least 3 arguments.');
    }
    return this;
};
/**
 * The jQuery removeEventListener plugin
 */
$eventListener.fn.removeEventListener = function (type, selector, callback, scope) {
    var _callback;
    var _scope;
    var _handler;
    switch (arguments.length) {
        case 3:
            _callback = selector;
            _scope = callback;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)];
            this.off(type, _handler);
            _scope._handlerMap[hashCode(_callback)] = null;
            break;
        case 4:
            _callback = callback;
            _scope = scope;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)];
            this.off(type, selector, _handler);
            _scope._handlerMap[hashCode(_callback)] = null;
            break;
        default:
            throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.');
    }
    return this;
};
module.exports = $eventListener;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
var Util = require('../util/Util');
/**
 * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
 *
 * @class ComponentFactory
 * @module StructureJS
 * @submodule util
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
     *      ComponentFactory.create($('.js-list'), SomeClass, this);
     */
    ComponentFactory.create = function ($elements, ComponentClass, scope) {
        if (scope === void 0) { scope = null; }
        var list = [];
        var component;
        var $element;
        var length = $elements.length;
        var types;
        var componentName;
        for (var i = 0; i < length; i++) {
            $element = $elements.eq(i);
            types = $element.attr('data-sjs-type');
            if (types === void 0) {
                // Create the component if there is not a 'data-sjs-type' attribute on the element.
                component = ComponentFactory._createComponent($element, ComponentClass, scope);
                list.push(component);
            }
            else {
                // Else if there is already a 'data-sjs-type' attribute then get the type(s).
                types = types.split(',');
                componentName = Util.getName(ComponentClass);
                // Only create the component if the component type does not already exist.
                if (types.indexOf(componentName) === -1) {
                    component = ComponentFactory._createComponent($element, ComponentClass, scope);
                    list.push(component);
                }
            }
        }
        return list;
    };
    /**
     * Helper method to create the component.
     *
     * @method _createComponent
     * @private
     */
    ComponentFactory._createComponent = function ($element, ComponentClass, scope) {
        var component = new ComponentClass($element);
        // If the class object has the sjsId property then I am assuming it is an instance of the DisplayObject class.
        if (scope !== null && component.hasOwnProperty('sjsId') === true) {
            scope.addChild(component);
        }
        return component;
    };
    return ComponentFactory;
})();
module.exports = ComponentFactory;

},{"../util/Util":19}],17:[function(require,module,exports){
/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var StringUtil = (function () {
    function StringUtil() {
        throw new Error('[StringUtil] Do not instantiate the StringUtil class because it is a static class.');
    }
    /**
     * Gets the extension name off the string being passed in.
     *
     * @method getExtension
     * @param filename {string}
     * @param withDot {boolean} If you want the period to be included in the extension name.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.getExtension('file.exe');
     *      // 'exe'
     *
     *      StringUtil.getExtension('file.exe', true);
     *      // '.exe'
     */
    StringUtil.getExtension = function (filename, withDot) {
        if (withDot === void 0) { withDot = false; }
        var num = (withDot === true) ? 0 : 1;
        return filename.slice(filename.lastIndexOf('.') + num, filename.length);
    };
    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentence
     * @param str {string}
     * @param [separator] {string} Can be any string you want to use as a separator.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '/');
     *      // 'live/down/by/the/river'
     */
    StringUtil.toSentence = function (str, separator) {
        if (separator === void 0) { separator = ' '; }
        return String(str)
            .replace(/(\d)/g, '$1 ')
            .replace(/([a-z](?=[A-Z]))/g, '$1 ')
            .replace(/[^a-zA-Z0-9 ]/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .replace(/^ | $/g, '')
            .toLowerCase()
            .replace(/\s+/g, separator);
    };
    /**
     * Converts a string to a camel case string.
     *
     * @method toCamelCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toCamelCase("liveDown_by-the.River");
     *      // 'liveDownByTheRiver'
     */
    StringUtil.toCamelCase = function (str) {
        return StringUtil.toSentence(str)
            .replace(/ (\w)/g, function (_, $1) {
            return $1.toUpperCase();
        });
    };
    /**
     * Converts a hyphen string to a pascal case string.
     *
     * @method toPascalCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toPascalCase("liveDown_by-the.River");
     *      // 'LiveDownByTheRiver'
     */
    StringUtil.toPascalCase = function (str) {
        return StringUtil.toCamelCase(str)
            .replace(/^[a-zA-Z]/, function (a, b, c) {
            return a.toUpperCase();
        });
    };
    /**
     * Converts a string to a constant case string.
     *
     * @method toConstantCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toConstantCase("liveDown_by-the.River");
     *      // 'LIVE_DOWN_BY_THE_RIVER'
     */
    StringUtil.toConstantCase = function (str) {
        return StringUtil.toSentence(str, '_')
            .toUpperCase();
    };
    /**
     * Creates a universally unique identifier.
     *
     * @method createUUID
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.createUUID();
     *      // 'a95d7134-3342-4001-bcea-cc0371b70dec'
     */
    StringUtil.createUUID = function () {
        var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return uuid;
    };
    /**
     * Converts a query string to an object.
     *
     * @method queryStringToObject
     * @param queryString {string}
     * @param [useParseFloat=true] {boolean}
     * @returns {Object|Null}
     * @public
     * @static
     * @example
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
     *      // {name: 'Robert', age: 23, gender: 'male'}
     *
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', false);
     *      // {name: 'Robert', age: '23', gender: 'male'}
     */
    StringUtil.queryStringToObject = function (queryString, useParseFloat) {
        if (useParseFloat === void 0) { useParseFloat = true; }
        var params = {};
        var temp = null;
        var str = queryString.substring(queryString.indexOf('?') + 1);
        if (str === '') {
            return null;
        }
        // Split into key/value pairs
        var queries = str.split('&');
        // Convert the array of strings into an object
        var len = queries.length;
        for (var i = 0; i < len; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = (useParseFloat === true && isNaN(parseFloat(temp[1])) === false) ? parseFloat(temp[1]) : temp[1];
        }
        return params;
    };
    /**
     * Remove all whitespace from the string passed in.
     *
     * @method removeAllWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      var str = '   a b    c d e f g ';
     *      StringUtil.removeAllWhitespace(str);
     *      // 'abcdefg'
     */
    StringUtil.removeAllWhitespace = function (str) {
        return str.replace(/\s+/g, '');
    };
    /**
     * Remove leading and trailing whitespace.
     *
     * @method removeLeadingTrailingWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      var str = '   a b    c d e f g ';
     *      StringUtil.removeLeadingTrailingWhitespace(str);
     *      // 'a b    c d e f g'
     */
    StringUtil.removeLeadingTrailingWhitespace = function (str) {
        return str.replace(/(^\s+|\s+$)/g, '');
    };
    /**
     *
     * @method truncate
     * @param text {string}
     * @param length {int}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
     *      // 'Robert is cool...'
     */
    StringUtil.truncate = function (text, length) {
        if (text.length <= length) {
            return text;
        }
        else {
            return text.substr(0, length) + '...';
        }
    };
    /**
     * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
     *
     * @method format
     * @returns {string}
     * @param str {string}
     * @param ...rest {Array.<any>}
     * @public
     * @static
     * @example
     *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
     *      // 'Robert is cool. Very cool and smart!'
     */
    StringUtil.format = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var length = rest.length;
        var value = str;
        for (var i = 0; i < length; i++) {
            var reg = new RegExp('\\{' + i + '\\}', 'gm');
            value = value.replace(reg, rest[i]);
        }
        return value;
    };
    /**
     * Updates a value in the query string by its key name.
     *
     * @method paramReplace
     * @param queryString
     * @param name
     * @param value
     * @returns {string|void}
     * @example
     *      StringUtil.paramReplace('?name=Robert&age=23&gender=male', 'gender', 'female');
     *      // '?name=Robert&age=23&gender=female'
     */
    StringUtil.paramReplace = function (queryString, name, value) {
        // Find the param with regex
        // Grab the first character in the returned string (should be ? or &)
        // Replace our href string with our new value, passing on the name and delimiter
        var re = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var delimiter = re.exec(queryString)[0].charAt(0);
        return queryString.replace(re, delimiter + name + '=' + value);
    };
    return StringUtil;
})();
module.exports = StringUtil;

},{}],18:[function(require,module,exports){
var StringUtil = require('./StringUtil');
/**
 * A helper class to provide a convenient and consistent way to render templates.
 *
 * @class TemplateFactory
 * @module StructureJS
 * @submodule util
 * @requires StringUtil
 * @requires Handlebars
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var TemplateFactory = (function () {
    function TemplateFactory() {
        throw new Error('[TemplateFactory] Do not instantiate the TemplateFactory class because it is a static class.');
    }
    /**
     * Creates a template.
     *
     * @method create
     * @param templatePath {any}
     * @param [data=any]
     * @returns {string}
     * @public
     * @static
     * @example
     *      TemplateFactory.create('templateName', {some: 'data'});
     */
    TemplateFactory.create = function (templatePath, data) {
        if (data === void 0) { data = null; }
        //Checks the first character to see if it is a '.' or '#'.
        var regex = /^([.#])(.+)/;
        var template = null;
        var isFunctionTemplate = typeof templatePath === 'function';
        var isClassOrIdName = regex.test(templatePath);
        if (isFunctionTemplate) {
            template = templatePath(data);
        }
        else if (isClassOrIdName) {
            // Remove pound sign from the id name.
            templatePath = templatePath.substring(1);
            var htmlString = document.getElementById(templatePath).innerHTML;
            htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);
            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                // Underscore Template:
                var templateMethod = window['_'].template(htmlString);
                template = templateMethod(data);
            }
            else {
                // Handlebars Template
                var templateMethod = Handlebars.compile(htmlString);
                template = templateMethod(data);
            }
        }
        else {
            var templateObj = window[TemplateFactory.templateNamespace];
            if (!templateObj) {
                // Returns null because the template namespace is not found.
                return null;
            }
            var templateFunction = templateObj[templatePath];
            if (templateFunction) {
                // The templatePath gets a function storage in the associative array.
                // We call the function by passing in the data as the argument.
                template = templateFunction(data);
            }
        }
        return template;
    };
    /**
     * A constant value for using Underscore or Lodash templates.
     *
     * @property UNDERSCORE
     * @type {string}
     * @public
     * @final
     * @static
     */
    TemplateFactory.UNDERSCORE = 'underscore';
    /**
     * A constant value for using Handlebars templates. This is the default template engine.
     *
     * @property HANDLEBARS
     * @type {string}
     * @public
     * @final
     * @static
     */
    TemplateFactory.HANDLEBARS = 'handlebars';
    /**
     * Sets the template engine type for this TemplateFactory class. The default is TemplateFactory.HANDLEBARS
     *
     * @property templateEngine
     * @type {string}
     * @default TemplateFactory.HANDLEBARS
     * @public
     * @static
     */
    TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
    /**
     * The global namespace for pre-compiled templates.
     *
     * @property templateNamespace
     * @type {string}
     * @default 'JST'
     * @public
     * @static
     */
    TemplateFactory.templateNamespace = 'JST';
    return TemplateFactory;
})();
module.exports = TemplateFactory;

},{"./StringUtil":17}],19:[function(require,module,exports){
/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var Util = (function () {
    function Util() {
        throw new Error('[Util] Do not instantiate the Util class because it is a static class.');
    }
    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     *
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     * @example
     *      var property = Util.uniqueId();
     *      // 1
     *
     *      var property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    Util.uniqueId = function (prefix) {
        if (prefix === void 0) { prefix = null; }
        var id = ++Util._idCounter;
        if (prefix != null) {
            return String(prefix + id);
        }
        else {
            return id;
        }
    };
    /**
     * Removes a list of properties from an object.
     *
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param value {string|Array.<string>} A property name or an array of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    Util.deletePropertyFromObject = function (object, value) {
        // If properties is not an array then make it an array object.
        var list = (value instanceof Array) ? value : [value];
        // Loop through the object properties.
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
                }
                else if (value instanceof Object) {
                    Util.deletePropertyFromObject(value, list);
                }
                else {
                    // Loop through the list of property name.
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
     * Renames a property name on an object.
     *
     * @method renamePropertyOnObject
     * @param object {Object} The object you want to rename properties from.
     * @param oldName {string}
     * @param newName {string}
     * @returns {any} Returns the object passed in renamed properties.
     * @public
     * @static
     * @example
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.renamePropertyOnObject(obj, 'gender', 'sex');
     *
     *      // { name: 'Robert', sex: 'male', phone: '555-555-5555' }
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
     * Makes a clone of an object.
     *
     * @method clone
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      var cloneOfObject = Util.clone(obj);
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
     * Converts a string or number to a boolean.
     *
     * @method toBoolean
     * @param strNum {string|number}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      Util.toBoolean("TRUE");
     *      // true
     *
     *      Util.toBoolean(0);
     *      // false
     *
     *      Util.toBoolean(undefined);
     *      // false
     */
    Util.toBoolean = function (strNum) {
        var value = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;
        return (value > 0 || value == 'true' || value == 'yes');
    };
    /**
     * Returns the name of the function/object passed in.
     *
     * @method getName
     * @param classObject {any}
     * @returns {string} Returns the name of the function or object.
     * @static
     * @example
     *      var someClass = new SomeClass();
     *      Util.getName(someClass);            // 'SomeClass'
     *
     *      Util.getName(function Test(){});    // 'Test'
     *      Util.getName(function (){});        // 'anonymous'
     */
    Util.getName = function (classObject) {
        var type = typeof classObject;
        var value;
        var funcNameRegex = /function ([^\(]+)/;
        if (type === 'object') {
            // Gets the name of the object.
            var results = classObject.constructor.toString().match(funcNameRegex);
            value = results[1];
        }
        else {
            // This else code is mainly for Internet Explore.
            var isFunction = (type === 'function');
            // TODO: figure out how to explain this
            var name = isFunction && ((classObject.name && ['', classObject.name]) || classObject.toString().match(funcNameRegex));
            if (isFunction === false) {
                value = type;
            }
            else if (name && name[1]) {
                value = name[1];
            }
            else {
                value = 'anonymous';
            }
        }
        return value;
    };
    /**
     * Creates and returns a new debounced version of the passed function which will postpone its execution until after
     * wait milliseconds have elapsed since the last time it was invoked.
     *
     * @method debounce
     * @param callback {Function} The function that should be executed.
     * @param wait {number} Milliseconds to elapsed before invoking the callback.
     * @param immediate {boolean} Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @public
     * @static
     * @example
     *      Util.debounce(this._onBreakpointChange, 250, false, this);
     */
    Util.debounce = function (callback, wait, immediate, callbackScope) {
        var timeout;
        var result;
        var debounced = function () {
            var args = arguments;
            function delayed() {
                if (immediate == false) {
                    result = callback.apply(callbackScope, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            else if (immediate === true) {
                result = callback.apply(callbackScope, args);
            }
            timeout = setTimeout(delayed, wait);
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
        };
        return debounced;
    };
    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {int}
     * @private
     * @static
     */
    Util._idCounter = 0;
    return Util;
})();
module.exports = Util;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL3NjcmlwdHMvRXZlbnRCdWJibGluZ0FwcC50cyIsInNyYy9hc3NldHMvc2NyaXB0cy9tYWluLnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXcvQ2hpbGRWaWV3LnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXcvR3JhbmRwYXJlbnRWaWV3LnRzIiwic3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXcvUGFyZW50Vmlldy50cyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL3RzL0Jhc2VPYmplY3QudHMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy9PYmplY3RNYW5hZ2VyLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZGlzcGxheS9ET01FbGVtZW50LnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZGlzcGxheS9EaXNwbGF5T2JqZWN0LnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZGlzcGxheS9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZGlzcGxheS9TdGFnZS50cyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL3RzL2V2ZW50L0Jhc2VFdmVudC50cyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL3RzL2V2ZW50L0V2ZW50QnJva2VyLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZXZlbnQvRXZlbnREaXNwYXRjaGVyLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvdXRpbC9Db21wb25lbnRGYWN0b3J5LnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvdXRpbC9TdHJpbmdVdGlsLnRzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvdHMvdXRpbC9UZW1wbGF0ZUZhY3RvcnkudHMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBLElBQU8sS0FBSyxXQUFXLHdDQUF3QyxDQUFDLENBQUM7QUFDakUsSUFBTyxTQUFTLFdBQVcsMENBQTBDLENBQUMsQ0FBQztBQUN2RSxJQUFPLFdBQVcsV0FBVyw0Q0FBNEMsQ0FBQyxDQUFDO0FBQzNFLElBQU8sZUFBZSxXQUFXLHdCQUF3QixDQUFDLENBQUM7QUFFM0Q7Ozs7OztJQU1JO0FBQ0o7SUFBK0Isb0NBQUs7SUFNaEM7UUFDSSxpQkFBTyxDQUFDO1FBTEYsaUJBQVksR0FBbUIsSUFBSSxDQUFDO1FBQ3BDLGtCQUFhLEdBQVUsSUFBSSxDQUFDO1FBQzVCLG1CQUFjLEdBQVUsSUFBSSxDQUFDO1FBa0Y3QixtQkFBYyxHQUFHLFVBQVMsU0FBUztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQTtJQWhGRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQ0FBTSxHQUFiO1FBQ0ksZ0JBQUssQ0FBQyxNQUFNLFdBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMzRCxJQUFJLENB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QUFPLFNBQVMsQ0FBQztZQUV6QjtnQkFFSSxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLENBQ3ZCLENBQUM7b0JBQ0csTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUNELE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNaLENBQUM7Z0JBQ0csWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUM1QixDQUFDO2dCQUNHLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqRCxDQUFDO1lBRUQsT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUM7UUFFRixTQUFTLENBQUMsTUFBTSxHQUFHO1lBRWYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQTVURDs7Ozs7OztPQU9HO0lBQ1ksZUFBVSxHQUFVLENBQUMsQ0FBQztJQXFUekMsV0FBQztBQUFELENBL1RBLEFBK1RDLElBQUE7QUFFRCxpQkFBUyxJQUFJLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFN0YWdlID0gcmVxdWlyZSgnLi4vdmVuZG9yL3N0cnVjdHVyZWpzL3RzL2Rpc3BsYXkvU3RhZ2UnKTtcbmltcG9ydCBCYXNlRXZlbnQgPSByZXF1aXJlKCcuLi92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZXZlbnQvQmFzZUV2ZW50Jyk7XG5pbXBvcnQgRXZlbnRCcm9rZXIgPSByZXF1aXJlKCcuLi92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZXZlbnQvRXZlbnRCcm9rZXInKTtcbmltcG9ydCBHcmFuZHBhcmVudFZpZXcgPSByZXF1aXJlKCcuL3ZpZXcvR3JhbmRwYXJlbnRWaWV3Jyk7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgRXZlbnRCdWJibGluZ0FwcFxuICogQGV4dGVuZHMgU3RhZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgRXZlbnRCdWJibGluZ0FwcCBleHRlbmRzIFN0YWdlIHtcblxuICAgIHByb3RlY3RlZCBfZ3JhbmRwYVZpZXc6R3JhbmRwYXJlbnRWaWV3ID0gbnVsbDtcbiAgICBwcm90ZWN0ZWQgXyRjbGVhckJ1dHRvbjpKUXVlcnkgPSBudWxsO1xuICAgIHByb3RlY3RlZCBfJHN0YWdlTWVzc2FnZTpKUXVlcnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRXZlbnRCdWJibGluZ0FwcC5jcmVhdGVcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKCkge1xuICAgICAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLl9ncmFuZHBhVmlldyA9IG5ldyBHcmFuZHBhcmVudFZpZXcodGhpcy4kZWxlbWVudC5maW5kKCcuanMtZ3JhbmRQYXJlbnRDb250ZW50JykpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2dyYW5kcGFWaWV3KTtcblxuICAgICAgICB0aGlzLl8kY2xlYXJCdXR0b24gPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1jbGVhckJ1dHRvbicpO1xuICAgICAgICB0aGlzLl8kc3RhZ2VNZXNzYWdlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtc3RhZ2VNZXNzYWdlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gU3RhZ2UubGF5b3V0XG4gICAgICovXG4gICAgcHVibGljIGxheW91dCgpIHtcbiAgICAgICAgdGhpcy5fJHN0YWdlTWVzc2FnZS50ZXh0KCcnKTtcbiAgICAgICAgdGhpcy5fZ3JhbmRwYVZpZXcubGF5b3V0KCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gU3RhZ2UuZW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX29uQnViYmxlZCwgdGhpcyk7XG5cbiAgICAgICAgRXZlbnRCcm9rZXIuYWRkRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkdsb2JhbEV2ZW50LCB0aGlzKTtcblxuICAgICAgICB0aGlzLl8kY2xlYXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsZWFyQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2dyYW5kcGFWaWV3LmVuYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBTdGFnZS5kaXNhYmxlXG4gICAgICovXG4gICAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl8kY2xlYXJCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkNsZWFyQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2dyYW5kcGFWaWV3LmRpc2FibGUoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIFN0YWdlLmRlc3Ryb3lcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fZ3JhbmRwYVZpZXcuZGVzdHJveSgpO1xuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uQ2xlYXJDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25CdWJibGVkKGJhc2VFdmVudCkge1xuICAgICAgICB2YXIgdGV4dCA9ICc8c3Ryb25nPicgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiByZWNldmllZCBhIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC5jdXJyZW50VGFyZ2V0LmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiBsYXN0IHRvdWNoZWQgdGhlIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC50YXJnZXQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHNlbnQgdGhlIGV2ZW50Lic7XG5cbiAgICAgICAgdGhpcy5fJHN0YWdlTWVzc2FnZS5odG1sKHRleHQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25HbG9iYWxFdmVudCA9IGZ1bmN0aW9uKGJhc2VFdmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkdsb2JhbCBldmVudCBkaXNwYXRjaGVkXCIsIGJhc2VFdmVudCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IEV2ZW50QnViYmxpbmdBcHA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuaW1wb3J0IEV2ZW50QnViYmxpbmdBcHAgPSByZXF1aXJlKCcuL0V2ZW50QnViYmxpbmdBcHAnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcCA9IG5ldyBFdmVudEJ1YmJsaW5nQXBwKCk7XG4gICAgYXBwLmFwcGVuZFRvKCdib2R5Jyk7ICAgLy8gTmVlZCB0byBzcGVjaWZ5IHdoYXQgYXJlYSBvdXIgY29kZSBoYXMgY29udHJvbCBvdmVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBFdmVudEJ1YmJsaW5nQXBwLmpzIGNsYXNzIGV4dGVuZHMgU3RhZ2Ugd2hpY2ggaGFzIHRoZSBhcHBlbmRUbyBtZXRob2QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90ZTogT24gdHlwaWNhbCB3ZWJzaXRlIHlvdSBtYXkgd2FudCB0byBzZXQgaXQgYXMgJ2JvZHknIGRvIHlvdSBoYXZlIGNvbnRyb2wgb3ZlciB0aGUgd2hvbGUgcGFnZS5cblxuICAgIHdpbmRvd1snYXBwJ10gPSBhcHA7XG59KTtcbiIsImltcG9ydCBET01FbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vdmVuZG9yL3N0cnVjdHVyZWpzL3RzL2Rpc3BsYXkvRE9NRWxlbWVudCcpO1xuaW1wb3J0IEJhc2VFdmVudCA9IHJlcXVpcmUoJy4uLy4uL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy9ldmVudC9CYXNlRXZlbnQnKTtcbmltcG9ydCBFdmVudEJyb2tlciA9IHJlcXVpcmUoJy4uLy4uL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy9ldmVudC9FdmVudEJyb2tlcicpO1xuXG4vKipcbiAqIFRPRE86IFlVSURvY19jb21tZW50XG4gKlxuICogQGNsYXNzIENoaWxkVmlld1xuICogQGV4dGVuZHMgRE9NRWxlbWVudFxuICogQGNvbnN0cnVjdG9yXG4gKiovXG5jbGFzcyBDaGlsZFZpZXcgZXh0ZW5kcyBET01FbGVtZW50IHtcblxuICAgIHByb3RlY3RlZCBfJGRpc3BhdGNoQnV0dG9uOkpRdWVyeSA9IG51bGw7XG4gICAgcHJvdGVjdGVkIF8kc29uTWVzc2FnZTpKUXVlcnkgPSBudWxsO1xuICAgIHByb3RlY3RlZCBfJGNoZWNrYm94OkpRdWVyeSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudDpKUXVlcnkpIHtcbiAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fJGRpc3BhdGNoQnV0dG9uID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtZGlzcGF0Y2hCdXR0b24nKTtcblxuICAgICAgICB0aGlzLl8kc29uTWVzc2FnZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWNoaWxkTWVzc2FnZScpO1xuXG4gICAgICAgIHRoaXMuXyRjaGVja2JveCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW3R5cGU9Y2hlY2tib3hdJykuZmlyc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmxheW91dFxuICAgICAqL1xuICAgIHB1YmxpYyBsYXlvdXQoKSB7XG4gICAgICAgIHRoaXMuXyRzb25NZXNzYWdlLnRleHQoJycpO1xuICAgICAgICB0aGlzLl8kY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmVuYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuXyRkaXNwYXRjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQnV0dG9uQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRpc2FibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuXyRkaXNwYXRjaEJ1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQnV0dG9uQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBfb25CdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gJzxzdHJvbmc+JyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHNlbnQgdGhlIGV2ZW50Lic7XG5cbiAgICAgICAgdGhpcy5fJHNvbk1lc3NhZ2UuaHRtbCh0ZXh0KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFLCB0cnVlLCB0cnVlKSk7XG4gICAgICAgIEV2ZW50QnJva2VyLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IENoaWxkVmlldztcbiIsImltcG9ydCBET01FbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vdmVuZG9yL3N0cnVjdHVyZWpzL3RzL2Rpc3BsYXkvRE9NRWxlbWVudCcpO1xuaW1wb3J0IEJhc2VFdmVudCA9IHJlcXVpcmUoJy4uLy4uL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy9ldmVudC9CYXNlRXZlbnQnKTtcbmltcG9ydCBQYXJlbnRWaWV3ID0gcmVxdWlyZSgnLi9QYXJlbnRWaWV3Jyk7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgR3JhbmRwYXJlbnRWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEdyYW5kcGFyZW50VmlldyBleHRlbmRzIERPTUVsZW1lbnQge1xuXG4gICAgcHJvdGVjdGVkIF9wYXJlbnRWaWV3OlBhcmVudFZpZXcgPSBudWxsO1xuICAgIHByb3RlY3RlZCBfJGdyYW5kcGFyZW50TWVzc2FnZTpKUXVlcnkgPSBudWxsO1xuICAgIHByb3RlY3RlZCBfJGNoZWNrYm94OkpRdWVyeSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudDpKUXVlcnkpIHtcbiAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fcGFyZW50VmlldyA9IG5ldyBQYXJlbnRWaWV3KHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXBhcmVudENvbnRlbnQnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fcGFyZW50Vmlldyk7XG5cbiAgICAgICAgdGhpcy5fJGdyYW5kcGFyZW50TWVzc2FnZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWdyYW5kcGFyZW50TWVzc2FnZScpO1xuXG4gICAgICAgIHRoaXMuXyRjaGVja2JveCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW3R5cGU9Y2hlY2tib3hdJykuZmlyc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmxheW91dFxuICAgICAqL1xuICAgIHB1YmxpYyBsYXlvdXQoKSB7XG4gICAgICAgIHRoaXMuXyRncmFuZHBhcmVudE1lc3NhZ2UudGV4dCgnJyk7XG4gICAgICAgIHRoaXMuXyRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLl9wYXJlbnRWaWV3LmxheW91dCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIGVuYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX29uQnViYmxlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fcGFyZW50Vmlldy5lbmFibGUoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9wYXJlbnRWaWV3LmRpc2FibGUoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGVzdHJveVxuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLl9wYXJlbnRWaWV3LmRlc3Ryb3koKTtcblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHVibGljIF9vbkJ1YmJsZWQoYmFzZUV2ZW50KSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW3R5cGU9Y2hlY2tib3hdJykuZmlyc3QoKS5wcm9wKCdjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKGNoZWNrYm94ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBiYXNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGV4dCA9ICc8c3Ryb25nPicgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiByZWNldmllZCBhIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC5jdXJyZW50VGFyZ2V0LmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiBsYXN0IHRvdWNoZWQgdGhlIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC50YXJnZXQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHNlbnQgdGhlIGV2ZW50Lic7XG5cbiAgICAgICAgdGhpcy5fJGdyYW5kcGFyZW50TWVzc2FnZS5odG1sKHRleHQpO1xuICAgIH1cblxufVxuXG5leHBvcnQgPSBHcmFuZHBhcmVudFZpZXc7XG4iLCJpbXBvcnQgRE9NRWxlbWVudCA9IHJlcXVpcmUoJy4uLy4uL3ZlbmRvci9zdHJ1Y3R1cmVqcy90cy9kaXNwbGF5L0RPTUVsZW1lbnQnKTtcbmltcG9ydCBCYXNlRXZlbnQgPSByZXF1aXJlKCcuLi8uLi92ZW5kb3Ivc3RydWN0dXJlanMvdHMvZXZlbnQvQmFzZUV2ZW50Jyk7XG5pbXBvcnQgQ2hpbGRWaWV3ID0gcmVxdWlyZSgnLi9DaGlsZFZpZXcnKTtcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBQYXJlbnRWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIFBhcmVudFZpZXcgZXh0ZW5kcyBET01FbGVtZW50IHtcblxuICAgIHByb3RlY3RlZCBfY2hpbGRWaWV3OkNoaWxkVmlldyA9IG51bGw7XG4gICAgcHJvdGVjdGVkIF8kcGFyZW50TWVzc2FnZTpKUXVlcnkgPSBudWxsO1xuICAgIHByb3RlY3RlZCBfJGNoZWNrYm94OkpRdWVyeSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudDpKUXVlcnkpIHtcbiAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fY2hpbGRWaWV3ID0gbmV3IENoaWxkVmlldyh0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1jaGlsZENvbnRlbnQnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fY2hpbGRWaWV3KTtcblxuICAgICAgICB0aGlzLl8kcGFyZW50TWVzc2FnZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXBhcmVudE1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLl8kY2hlY2tib3ggPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1t0eXBlPWNoZWNrYm94XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBwdWJsaWMgbGF5b3V0KCkge1xuICAgICAgICB0aGlzLl8kcGFyZW50TWVzc2FnZS50ZXh0KCcnKTtcbiAgICAgICAgdGhpcy5fJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX2NoaWxkVmlldy5sYXlvdXQoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmVuYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkJ1YmJsZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2NoaWxkVmlldy5lbmFibGUoKTtcblxuICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9jaGlsZFZpZXcuZGlzYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgcHVibGljIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkVmlldy5kZXN0cm95KCk7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBfb25CdWJibGVkKGJhc2VFdmVudCkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1t0eXBlPWNoZWNrYm94XScpLmZpcnN0KCkucHJvcCgnY2hlY2tlZCcpO1xuXG4gICAgICAgIGlmIChjaGVja2JveCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYmFzZUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRleHQgPSAnPHN0cm9uZz4nICsgdGhpcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICc8L3N0cm9uZz4gcmVjZXZpZWQgYSBldmVudC48YnIvID4nO1xuICAgICAgICB0ZXh0ICs9ICc8c3Ryb25nPicgKyBiYXNlRXZlbnQuY3VycmVudFRhcmdldC5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICc8L3N0cm9uZz4gbGFzdCB0b3VjaGVkIHRoZSBldmVudC48YnIvID4nO1xuICAgICAgICB0ZXh0ICs9ICc8c3Ryb25nPicgKyBiYXNlRXZlbnQudGFyZ2V0LmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiBzZW50IHRoZSBldmVudC4nO1xuXG4gICAgICAgIHRoaXMuXyRwYXJlbnRNZXNzYWdlLmh0bWwodGV4dCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IFBhcmVudFZpZXc7XG4iLCIvLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2pxdWVyeS5kLnRzJy8+XG4vLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2hhbmRsZWJhcnMuZC50cycvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9ncmVlbnNvY2suZC50cycvPlxuLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9qcXVlcnkuZXZlbnRMaXN0ZW5lci5kLnRzJy8+XG4vLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2xvZy5kLnRzJy8+XG5pbXBvcnQgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9VdGlsJyk7XG5cbi8qKlxuICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VPYmplY3RcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgYW4gYWJzdHJhY3QgY2xhc3MgdGhhdCBwcm92aWRlcyBjb21tb24gcHJvcGVydGllcyBhbmQgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gKlxuICogQGNsYXNzIEJhc2VPYmplY3RcbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgY29yZVxuICogQHJlcXVpcmVzIFV0aWxcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKi9cbmNsYXNzIEJhc2VPYmplY3RcbntcbiAgICAvKipcbiAgICAgKiBUaGUgc2pzSWQgKFN0cnVjdHVyZUpTIElEKSBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gbW9zdCBTdHJ1Y3R1cmVKUyBvYmplY3RzIHVwb24gaW5zdGFudGlhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBzanNJZFxuICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEB3cml0ZU9uY2VcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIHNqc0lkOm51bWJlciA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLnNqc0lkID0gVXRpbC51bmlxdWVJZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGZ1bGx5IHF1YWxpZmllZCBjbGFzcyBuYW1lIG9mIGFuIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lXG4gICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY2xhc3MgbmFtZS5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgaW5zdGFuY2UuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCk7XG4gICAgICovXG4gICAgcHVibGljIGdldFF1YWxpZmllZENsYXNzTmFtZSgpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIFV0aWwuZ2V0TmFtZSh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcHVycG9zZSBvZiB0aGUgZGVzdHJveSBtZXRob2QgaXMgdG8gbWFrZSBhbiBvYmplY3QgcmVhZHkgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi4gVGhpc1xuICAgICAqIHNob3VsZCBiZSB0aG91Z2h0IG9mIGFzIGEgb25lIHdheSBmdW5jdGlvbi4gT25jZSBkZXN0cm95IGlzIGNhbGxlZCBubyBmdXJ0aGVyIG1ldGhvZHMgc2hvdWxkIGJlXG4gICAgICogY2FsbGVkIG9uIHRoZSBvYmplY3Qgb3IgcHJvcGVydGllcyBhY2Nlc3NlZC4gSXQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRob3NlIHdobyBpbXBsZW1lbnQgdGhpc1xuICAgICAqIGZ1bmN0aW9uIHRvIHN0b3AgYWxsIHJ1bm5pbmcgVGltZXJzLCBhbGwgcnVubmluZyBTb3VuZHMsIGFuZCB0YWtlIGFueSBvdGhlciBzdGVwcyBuZWNlc3NhcnkgdG8gbWFrZSBhblxuICAgICAqIG9iamVjdCBlbGlnaWJsZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAqXG4gICAgICogQnkgZGVmYXVsdCB0aGUgZGVzdHJveSBtZXRob2Qgd2lsbCBudWxsIG91dCBhbGwgcHJvcGVydGllcyBvZiB0aGUgY2xhc3MgYXV0b21hdGljYWxseS4gWW91IHNob3VsZCBjYWxsIGRlc3Ryb3lcbiAgICAgKiBvbiBvdGhlciBvYmplY3RzIGJlZm9yZSBjYWxsaW5nIHRoZSBzdXBlci5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzdHJveSgpOnZvaWRcbiAgICB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCA9IEJhc2VPYmplY3Q7IiwiaW1wb3J0IEJhc2VPYmplY3QgPSByZXF1aXJlKCcuL0Jhc2VPYmplY3QnKTtcblxuLyoqXG4gKiBUaGUge3sjY3Jvc3NMaW5rIFwiT2JqZWN0TWFuYWdlclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIGVuYWJsaW5nIGFuZCBkaXNhYmxpbmcgZnVuY3Rpb25hbGl0eSBmb3IgbW9zdCBTdHJ1Y3R1cmVKUyBjbGFzc2VzLlxuICpcbiAqIEBjbGFzcyBPYmplY3RNYW5hZ2VyXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gKiBAc3VibW9kdWxlIGNvcmVcbiAqIEByZXF1aXJlcyBFeHRlbmRcbiAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gKiBAY29uc3RydWN0b3JcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICovXG5jbGFzcyBPYmplY3RNYW5hZ2VyIGV4dGVuZHMgQmFzZU9iamVjdFxue1xuICAgIC8qKlxuICAgICAqIFRoZSBpc0VuYWJsZWQgcHJvcGVydHkgaXMgdXNlZCB0byBrZWVwIHRyYWNrIG9mIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNFbmFibGVkXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIGlzRW5hYmxlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBlbmFibGUgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIGZvciBlbmFibGluZyBldmVudCBsaXN0ZW5lcnMgYW5kL29yIGNoaWxkcmVuIG9mIHRoZSBjb250YWluaW5nIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGVuYWJsZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLmhhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZW5hYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKTtcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIHB1YmxpYyBlbmFibGUoKTphbnlcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBkaXNhYmxlIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgZGlzYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGlzYWJsZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLmhhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuZGlzYWJsZS5jYWxsKHRoaXMpO1xuICAgICAqICAgICAgfVxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNhYmxlKCk6YW55XG4gICAge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0ID0gT2JqZWN0TWFuYWdlcjsiLCJpbXBvcnQgRGlzcGxheU9iamVjdENvbnRhaW5lciA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdENvbnRhaW5lcicpO1xuaW1wb3J0IEJhc2VFdmVudCA9IHJlcXVpcmUoJy4uL2V2ZW50L0Jhc2VFdmVudCcpO1xuaW1wb3J0IFRlbXBsYXRlRmFjdG9yeSA9IHJlcXVpcmUoJy4uL3V0aWwvVGVtcGxhdGVGYWN0b3J5Jyk7XG5pbXBvcnQgQ29tcG9uZW50RmFjdG9yeSA9IHJlcXVpcmUoJy4uL3V0aWwvQ29tcG9uZW50RmFjdG9yeScpO1xuaW1wb3J0IGpRdWVyeSA9IHJlcXVpcmUoJy4uL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lcicpO1xuXG4vKipcbiAqIFRoZSB7eyNjcm9zc0xpbmsgXCJET01FbGVtZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHRoZSBiYXNlIHZpZXcgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIHBsYWNlZCBpbnRvIHRoZSBIVE1MIERPTS5cbiAqXG4gKiBAY2xhc3MgRE9NRWxlbWVudFxuICogQHBhcmFtIHR5cGUgW2FueT1udWxsXSBFaXRoZXIgYSBqUXVlcnkgb2JqZWN0IG9yIEphdmFTY3JpcHQgdGVtcGxhdGUgc3RyaW5nIHJlZmVyZW5jZSB5b3Ugd2FudCB0byB1c2UgYXMgdGhlIHZpZXcuIENoZWNrIG91dCB0aGUgZXhhbXBsZXMgYmVsb3cuXG4gKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gKiBAZXh0ZW5kcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHZpZXdcbiAqIEByZXF1aXJlcyBFeHRlbmRcbiAqIEByZXF1aXJlcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG4gKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gKiBAcmVxdWlyZXMgVGVtcGxhdGVGYWN0b3J5XG4gKiBAcmVxdWlyZXMgQ29tcG9uZW50RmFjdG9yeVxuICogQHJlcXVpcmVzIGpRdWVyeVxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBleGFtcGxlXG4gKiAgICAgLy8gRXhhbXBsZTogVXNpbmcgRE9NRWxlbWVudCB3aXRob3V0IGV4dGVuZGluZyBpdC5cbiAqICAgICB2YXIgYUxpbmsgPSBuZXcgRE9NRWxlbWVudCgnYScsIHt0ZXh0OiAnR29vZ2xlJywgaHJlZjogJ2h0dHA6Ly93d3cuZ29vZ2xlLmNvbScsICdjbGFzcyc6ICdleHRlcm5hbExpbmsnfSk7XG4gKiAgICAgdGhpcy5hZGRDaGlsZChhTGluayk7XG4gKlxuICogICAgIC8vIEV4YW1wbGU6IEEgdmlldyBwYXNzaW5nIGluIGEgalF1ZXJ5IG9iamVjdC5cbiAqICAgICB2YXIgdmlldyA9IG5ldyBDdXN0b21WaWV3KCQoJy5zZWxlY3RvcicpKTtcbiAqICAgICB0aGlzLmFkZENoaWxkKHZpZXcpO1xuICpcbiAqICAgICAvLyBFeGFtcGxlOiBBIHZpZXcgZXh0ZW5kaW5nIERPTUVsZW1lbnQgd2hpbGUgcGFzc2luZyBpbiBhIGpRdWVyeSBvYmplY3QuXG4gKiAgICAgdmFyIEV4dGVuZCA9IHJlcXVpcmUoJ3N0cnVjdHVyZWpzL3V0aWwvRXh0ZW5kJyk7XG4gKiAgICAgdmFyIERPTUVsZW1lbnQgPSByZXF1aXJlKCdzdHJ1Y3R1cmVqcy9kaXNwbGF5L0RPTUVsZW1lbnQnKTtcbiAqXG4gKiAgICAgdmFyIENsYXNzTmFtZSA9IChmdW5jdGlvbiAoKSB7XG4gKlxuICogICAgICAgICAgdmFyIF9zdXBlciA9IEV4dGVuZChDbGFzc05hbWUsIERPTUVsZW1lbnQpO1xuICpcbiAqICAgICAgICAgIGZ1bmN0aW9uIENsYXNzTmFtZSgkZWxlbWVudCkge1xuICogICAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsICRlbGVtZW50KTtcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICBDbGFzc05hbWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMpO1xuICpcbiAqICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gKiAgICAgICAgICB9O1xuICpcbiAqICAgICAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICpcbiAqICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgIH07XG4gKlxuICogICAgICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAqXG4gKiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogICAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgIH07XG4gKlxuICogICAgICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgICAgICAgLy8gTGF5b3V0IG9yIHVwZGF0ZSB0aGUgY2hpbGQgb2JqZWN0cyBpbiB0aGlzIHBhcmVudCBjbGFzcy5cbiAqXG4gKiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gKiAgICAgICAgICB9O1xuICpcbiAqICAgICAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZWZlcmVuY2VzIGluIHRoaXMgcGFyZW50IGNsYXNzIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlxuICpcbiAqICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgIH07XG4gKlxuICogICAgICAgICAgcmV0dXJuIENsYXNzTmFtZTtcbiAqICAgICB9KSgpO1xuICpcbiAqICAgICAvLyBFeGFtcGxlOiBBIHZpZXcgZXh0ZW5kaW5nIERPTUVsZW1lbnQgd2l0aCBhIEphdmFTY3JpcHQgdGVtcGxhdGUgcmVmZXJlbmNlIHBhc3NlZCBpbi5cbiAqICAgICB2YXIgRXh0ZW5kID0gcmVxdWlyZSgnc3RydWN0dXJlanMvdXRpbC9FeHRlbmQnKTtcbiAqICAgICB2YXIgRE9NRWxlbWVudCA9IHJlcXVpcmUoJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvRE9NRWxlbWVudCcpO1xuICogICAgIHZhciBIb21lVGVtcGxhdGUgPSByZXF1aXJlKCdoYnMhdGVtcGxhdGVzL2hvbWUvaG9tZVRlbXBsYXRlJyk7XG4gKlxuICogICAgIHZhciBDbGFzc05hbWUgPSAoZnVuY3Rpb24gKCkge1xuICpcbiAqICAgICAgICAgIHZhciBfc3VwZXIgPSBFeHRlbmQoQ2xhc3NOYW1lLCBET01FbGVtZW50KTtcbiAqXG4gKiAgICAgICAgICBmdW5jdGlvbiBDbGFzc05hbWUoKSB7XG4gKiAgICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gKiAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5jcmVhdGUuY2FsbCh0aGlzLCBIb21lVGVtcGxhdGUsIHtkYXRhOiAnc29tZSBkYXRhJ30pO1xuICpcbiAqICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gKiAgICAgICAgICB9O1xuICpcbiAqICAgICAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICpcbiAqICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqICAgICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5lbmFibGUuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgIH07XG4gKlxuICogICAgICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAqXG4gKiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogICAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgIH07XG4gKlxuICogICAgICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgICAgICAgLy8gTGF5b3V0IG9yIHVwZGF0ZSB0aGUgY2hpbGQgb2JqZWN0cyBpbiB0aGlzIHBhcmVudCBjbGFzcy5cbiAqXG4gKiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gKiAgICAgICAgICB9O1xuICpcbiAqICAgICAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZWZlcmVuY2VzIGluIHRoaXMgcGFyZW50IGNsYXNzIHRvIHByZXBhcmUgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAqXG4gKiAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gKiAgICAgICAgICB9O1xuICpcbiAqICAgICAgICAgIHJldHVybiBDbGFzc05hbWU7XG4gKiAgICAgfSkoKTtcbiAqL1xuY2xhc3MgRE9NRWxlbWVudCBleHRlbmRzIERpc3BsYXlPYmplY3RDb250YWluZXJcbntcbiAgICAvKipcbiAgICAgKiBUcmFja3MgbnVtYmVyIG9mIHRpbWVzIGFuIGVsZW1lbnQncyB3aWR0aCBoYXMgYmVlbiBjaGVja2VkXG4gICAgICogaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIGFkZGVkXG4gICAgICogdG8gdGhlIERPTS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjaGVja0NvdW50XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIGNoZWNrQ291bnQ6bnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEEgY2FjaGVkIHJlZmVyZW5jZSB0byB0aGUgRE9NIEVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBlbGVtZW50XG4gICAgICogQHR5cGUge0hUTUxFbGVtZW50fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIGVsZW1lbnQ6SFRNTEVsZW1lbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWNoZWQgcmVmZXJlbmNlIHRvIHRoZSBqUXVlcnkgRE9NIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSAkZWxlbWVudFxuICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgJGVsZW1lbnQ6SlF1ZXJ5ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIElmIGEgalF1ZXJ5IG9iamVjdCB3YXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIHRoaXMgd2lsbCBiZSBzZXQgYXMgdHJ1ZSBhbmRcbiAgICAgKiB0aGlzIGNsYXNzIHdpbGwgbm90IHRyeSB0byBhZGQgdGhlIHZpZXcgdG8gdGhlIERPTSBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBfaXNSZWZlcmVuY2VcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF9pc1JlZmVyZW5jZTpib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBIb2xkcyBvbnRvIHRoZSB2YWx1ZSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgX3R5cGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIF90eXBlOnN0cmluZyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBIb2xkcyBvbnRvIHRoZSB2YWx1ZSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgX3BhcmFtc1xuICAgICAqIEB0eXBlIHthbnl9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgX3BhcmFtczphbnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTphbnkgPSBudWxsLCBwYXJhbXM6YW55ID0gbnVsbClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKHR5cGUgaW5zdGFuY2VvZiBqUXVlcnkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVmZXJlbmNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjcmVhdGUgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSBhIGNvbnNpc3RlbnQgcGxhY2UgZm9yIHRoZSBjcmVhdGlvbiBhbmQgYWRkaW5nXG4gICAgICogb2YgY2hpbGRyZW4gdG8gdGhlIHZpZXcuIEl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBjYWxsZWQgdGhlIGZpcnN0IHRpbWUgdGhhdCB0aGUgdmlldyBpcyBhZGRlZFxuICAgICAqIHRvIGFub3RoZXIgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSXQgaXMgY3JpdGljYWwgdGhhdCBhbGwgc3ViY2xhc3NlcyBjYWxsIHRoZSBzdXBlciBmb3IgdGhpcyBmdW5jdGlvbiBpblxuICAgICAqIHRoZWlyIG92ZXJyaWRkZW4gbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIG9uY2Ugd2hlbiB0aGUgY2hpbGQgdmlldyBpcyBhZGRlZCB0byBhbm90aGVyIHZpZXcuIElmIHRoZSBjaGlsZCB2aWV3IGlzIHJlbW92ZWRcbiAgICAgKiBhbmQgYWRkZWQgdG8gYW5vdGhlciB2aWV3IHRoZSBjcmVhdGUgbWV0aG9kIHdpbGwgbm90IGJlIGNhbGxlZCBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHR5cGUgW3N0cmluZz1kaXZdIFRoZSBIVE1MIHRhZyB5b3Ugd2FudCB0byBjcmVhdGUgb3IgdGhlIGlkL2NsYXNzIHNlbGVjdG9yIG9mIHRoZSB0ZW1wbGF0ZSBvciB0aGUgcHJlLWNvbXBpbGVkIHBhdGggdG8gYSB0ZW1wbGF0ZS5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gRVhBTVBMRSAxOiBCeSBkZWZhdWx0IHlvdXIgdmlldyBjbGFzcyB3aWxsIGJlIGEgZGl2IGVsZW1lbnQ6XG4gICAgICogICAgIENsYXNzTmFtZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY3JlYXRlLmNhbGwodGhpcyk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgKiAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2NoaWxkSW5zdGFuY2UpO1xuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRVhBTVBMRSAyOiBCdXQgbGV0cyBzYXkgeW91IHdhbnRlZCB0aGUgdmlldyB0byBiZSBhIHVsIGVsZW1lbnQ6XG4gICAgICogICAgIENsYXNzTmFtZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY3JlYXRlLmNhbGwodGhpcywgJ3VsJyk7XG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqICAgICAvLyBUaGVuIHlvdSBjb3VsZCBuZXN0IG90aGVyIGVsZW1lbnRzIGluc2lkZSB0aGlzIGJhc2Ugdmlldy9lbGVtZW50LlxuICAgICAqICAgICBDbGFzc05hbWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMsICd1bCcsIHtpZDogJ215SWQnLCAnY2xhc3MnOiAnbXlDbGFzcyBhbm90aGVyQ2xhc3MnfSk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICB2YXIgbGkgPSBuZXcgRE9NRWxlbWVudCgnbGknLCB7dGV4dDogJ1JvYmVydCBpcyBjb29sJ30pO1xuICAgICAqICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobGkpO1xuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRVhBTVBMRSAzOiBTbyB0aGF0J3MgY29vbCBidXQgd2hhdCBpZiB5b3Ugd2FudGVkIGEgYmxvY2sgb2YgaHRtbCB0byBiZSB5b3VyIHZpZXcuIExldCdzIHNheSB5b3UgaGFkIHRoZSBiZWxvd1xuICAgICAqICAgICAvLyBpbmxpbmUgSGFuZGxlYmFyIHRlbXBsYXRlIGluIHlvdXIgaHRtbCBmaWxlLlxuICAgICAqICAgICA8c2NyaXB0IGlkPVwidG9kb1RlbXBsYXRlXCIgdHlwZT1cInRleHQvdGVtcGxhdGVcIj5cbiAgICAgKiAgICAgICAgICA8ZGl2IGlkPVwiaHRtbFRlbXBsYXRlXCIgY2xhc3M9XCJqcy10b2RvXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC13cmFwcGVyXCI+XG4gICAgICogICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxpc3QtaW5wdXRcIiBwbGFjZWhvbGRlcj1cInt7IGRhdGEudGV4dCB9fVwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImxpc3QtaXRlbS1zdWJtaXRcIiB2YWx1ZT1cIkFkZFwiPlxuICAgICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgPC9zY3JpcHQ+XG4gICAgICpcbiAgICAgKiAgICAgLy8gWW91IHdvdWxkIGp1c3QgcGFzcyBpbiB0aGUgaWQgb3IgY2xhc3Mgc2VsZWN0b3Igb2YgdGhlIHRlbXBsYXRlIHdoaWNoIGluIHRoaXMgY2FzZSBpcyBcIiN0b2RvVGVtcGxhdGVcIi5cbiAgICAgKiAgICAgLy8gVGhlcmUgaXMgYSBzZWNvbmQgb3B0aW9uYWwgYXJndW1lbnQgd2hlcmUgeW91IGNhbiBwYXNzIGRhdGEgZm9yIHRoZSBIYW5kbGViYXIgdGVtcGxhdGUgdG8gdXNlLlxuICAgICAqICAgICBDbGFzc05hbWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMsICcjdG9kb1RlbXBsYXRlJywgeyBkYXRhOiB0aGlzLnZpZXdEYXRhIH0pO1xuICAgICAqXG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqICAgICAvLyBFWEFNUExFIDQ6IExldCdzIHNheSB5b3Ugd2FudGVkIHRvIHVzZSB0aGUgSGFuZGxlYmFyIHBsdWdpbiB3aXRoaW4gUmVxdWlyZUpTLiBZb3UgY2FuIHBhc3MgdGhlIHRlbXBsYXRlIGludG8gY3JlYXRlLlxuICAgICAqICAgICB2YXIgSG9tZVRlbXBsYXRlID0gcmVxdWlyZSgnaGJzIXRlbXBsYXRlcy9Ib21lVGVtcGxhdGUnKTtcbiAgICAgKlxuICAgICAqICAgICBDbGFzc05hbWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmNyZWF0ZS5jYWxsKHRoaXMsIEhvbWVUZW1wbGF0ZSwge2RhdGE6IFwic29tZSBkYXRhXCJ9KTtcbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRVhBTVBMRSA1OiBPciBtYXliZSB5b3UncmUgdXNpbmcgZ3J1bnQtY29udHJpYi1oYW5kbGViYXJzLCBvciBzaW1pbGFyLCB0byBwcmVjb21waWxlIGhicyB0ZW1wbGF0ZXNcbiAgICAgKiAgICAgcmVxdWlyZSgndGVtcGxhdGVzJyk7IC8vIHRlbXBsYXRlcy5qc1xuICAgICAqXG4gICAgICogICAgIENsYXNzTmFtZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY3JlYXRlLmNhbGwodGhpcywgJ3RlbXBsYXRlcy9Ib21lVGVtcGxhdGUnLCB7ZGF0YTogXCJzb21lIGRhdGFcIn0pO1xuICAgICAqXG4gICAgICogICAgIH1cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlKHR5cGU6c3RyaW5nID0gJ2RpdicsIHBhcmFtczphbnkgPSBudWxsKTphbnlcbiAgICB7XG4gICAgICAgIC8vIFVzZSB0aGUgZGF0YSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgZmlyc3QgZWxzZSB1c2UgdGhlIGFyZ3VtZW50cyBmcm9tIGNyZWF0ZS5cbiAgICAgICAgdHlwZSA9IHRoaXMuX3R5cGUgfHwgdHlwZTtcbiAgICAgICAgcGFyYW1zID0gdGhpcy5fcGFyYW1zIHx8IHBhcmFtcztcblxuICAgICAgICBpZiAodGhpcy5pc0NyZWF0ZWQgPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gWW91IGNhbm5vdCBjYWxsIHRoZSBjcmVhdGUgbWV0aG9kIG1hbnVhbGx5LiBJdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGF1dG9tYXRpY2FsbHkgZHVyaW5nIHRoZSB2aWV3IGxpZmVjeWNsZSBhbmQgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaHRtbDpzdHJpbmcgPSBUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlKHR5cGUsIHBhcmFtcyk7XG4gICAgICAgICAgICBpZiAoaHRtbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0galF1ZXJ5KGh0bWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBqUXVlcnkoXCI8XCIgKyB0eXBlICsgXCIvPlwiLCBwYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcblxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy4kZWxlbWVudC53aWR0aCgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuc2V0U2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZFxuICAgICAqIEBtZXRob2QgYWRkQ2hpbGRcbiAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXMgb2JqZWN0IGluc3RhbmNlLlxuICAgICAqIEByZXR1cm5zIHtET01FbGVtZW50fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgY29udGFpbmVyLmFkZENoaWxkKGRvbUVsZW1lbnRJbnN0YW5jZSk7XG4gICAgICovXG4gICAgcHVibGljIGFkZENoaWxkKGNoaWxkOkRPTUVsZW1lbnQpOmFueVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQgPT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBZb3UgY2Fubm90IHVzZSB0aGUgYWRkQ2hpbGQgbWV0aG9kIGlmIHRoZSBwYXJlbnQgb2JqZWN0IGlzIG5vdCBhZGRlZCB0byB0aGUgRE9NLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuYWRkQ2hpbGQoY2hpbGQpO1xuXG4gICAgICAgIC8vIElmIGFuIGVtcHR5IGpRdWVyeSBvYmplY3QgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIHRoZW4gZG9uJ3QgcnVuIHRoZSBjb2RlIGJlbG93LlxuICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50Lmxlbmd0aCA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGQuaXNDcmVhdGVkID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgY2hpbGQuY3JlYXRlKCk7Ly8gUmVuZGVyIHRoZSBpdGVtIGJlZm9yZSBhZGRpbmcgdG8gdGhlIERPTVxuICAgICAgICAgICAgY2hpbGQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBjaGlsZCBvYmplY3QgaXMgbm90IGEgcmVmZXJlbmNlIG9mIGEgalF1ZXJ5IG9iamVjdCBpbiB0aGUgRE9NIHRoZW4gYXBwZW5kIGl0LlxuICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2hpbGQuJGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkFkZGVkVG9Eb20oY2hpbGQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIHNqc0lkIHRvIHRoZSBET00gZWxlbWVudCBzbyB3ZSBjYW4ga25vdyB3aGF0IHdoYXQgQ2xhc3Mgb2JqZWN0IHRoZSBIVE1MRWxlbWVudCBiZWxvbmdzIHRvby5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgYWRkQ2xpZW50U2lkZUlkXG4gICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRE9NRWxlbWVudCBpbnN0YW5jZSB0byBhZGQgdGhlIHNqc0lkIHRvby5cbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcHJvdGVjdGVkIGFkZENsaWVudFNpZGVJZChjaGlsZDpET01FbGVtZW50KTp2b2lkXG4gICAge1xuICAgICAgICB2YXIgdHlwZTphbnkgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJyk7XG4gICAgICAgIHZhciBpZDphbnkgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIC8vIE1ha2UgdGhlbSBhcnJheSdzIHNvIHRoZSBqb2luIG1ldGhvZCB3aWxsIHdvcmsuXG4gICAgICAgICAgICB0eXBlID0gW2NoaWxkLmdldFF1YWxpZmllZENsYXNzTmFtZSgpXTtcbiAgICAgICAgICAgIGlkID0gW2NoaWxkLnNqc0lkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNwbGl0IHRoZW0gc28gd2UgY2FuIHB1c2gvYWRkIHRoZSBuZXcgdmFsdWVzLlxuICAgICAgICAgICAgdHlwZSA9IHR5cGUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlkID0gaWQuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgdHlwZS5wdXNoKGNoaWxkLmdldFF1YWxpZmllZENsYXNzTmFtZSgpKTtcbiAgICAgICAgICAgIGlkLnB1c2goY2hpbGQuc2pzSWQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZWQgbGlzdCBvZiBpZCdzIGFuZCB0eXBlc1xuICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcsIGlkLmpvaW4oJywnKSk7XG4gICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnLCB0eXBlLmpvaW4oJywnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc2pzSWQgYW5kIGNsYXNzIHR5cGUgZnJvbSB0aGUgSFRNTEVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNsaWVudFNpZGVJZFxuICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERPTUVsZW1lbnQgaW5zdGFuY2UgdG8gYWRkIHRoZSBzanNJZCB0b28uXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHJvdGVjdGVkIHJlbW92ZUNsaWVudFNpZGVJZChjaGlsZCk6Ym9vbGVhblxuICAgIHtcbiAgICAgICAgdmFyIHR5cGU6c3RyaW5nID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScpO1xuICAgICAgICB2YXIgaWQ6c3RyaW5nID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtaWQnKTtcblxuICAgICAgICAvLyBTcGxpdCB0aGVtIHNvIHdlIGNhbiByZW1vdmUgdGhlIGNoaWxkIHNqc0lkIGFuZCB0eXBlLlxuICAgICAgICB2YXIgdHlwZUxpc3Q6QXJyYXk8c3RyaW5nPiA9IHR5cGUuc3BsaXQoJywnKTtcbiAgICAgICAgdmFyIGlkTGlzdDpBcnJheTxudW1iZXI+ID0gaWQuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTsvLyBDb252ZXJ0IGVhY2ggaXRlbSBpbnRvIGEgbnVtYmVyLlxuICAgICAgICB2YXIgaW5kZXg6bnVtYmVyID0gaWRMaXN0LmluZGV4T2YoY2hpbGQuc2pzSWQpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGlkIGFuZCB0eXBlIGZyb20gdGhlIGFycmF5LlxuICAgICAgICAgICAgdHlwZUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGlkTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgLy8gVXBkYXRlZCBsaXN0IG9mIGlkJ3MgYW5kIHR5cGVzXG4gICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJywgdHlwZUxpc3Quam9pbignLCcpKTtcbiAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJywgaWRMaXN0LmpvaW4oJywnKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWRMaXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY2hpbGQgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICogVGhlIG1ldGhvZCB3aWxsIGNhbGwge3sjY3Jvc3NMaW5rIFwiRE9NRWxlbWVudC9sYXlvdXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGFuZCBkaXNwYXRjaCB0aGUgQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBvbkRvbUFkZGVkXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBvbkFkZGVkVG9Eb20oY2hpbGQ6RE9NRWxlbWVudClcbiAgICB7XG4gICAgICAgIGNoaWxkLmNoZWNrQ291bnQrKztcblxuICAgICAgICBpZiAoY2hpbGQuJGVsZW1lbnQud2lkdGgoKSA9PT0gMCAmJiBjaGlsZC5jaGVja0NvdW50IDwgNSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMub25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFkZENsaWVudFNpZGVJZChjaGlsZCk7XG5cbiAgICAgICAgY2hpbGQud2lkdGggPSBjaGlsZC4kZWxlbWVudC53aWR0aCgpO1xuICAgICAgICBjaGlsZC5oZWlnaHQgPSBjaGlsZC4kZWxlbWVudC5oZWlnaHQoKTtcbiAgICAgICAgY2hpbGQuc2V0U2l6ZShjaGlsZC53aWR0aCwgY2hpbGQuaGVpZ2h0KTtcbiAgICAgICAgY2hpbGQuZW5hYmxlKCk7XG4gICAgICAgIGNoaWxkLmxheW91dCgpO1xuICAgICAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0XG4gICAgICovXG4gICAgcHVibGljIGFkZENoaWxkQXQoY2hpbGQ6RE9NRWxlbWVudCwgaW5kZXg6bnVtYmVyKTphbnlcbiAgICB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICAvLyBJZiBhbiBlbXB0eSBqUXVlcnkgb2JqZWN0IGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGVuIGRvbid0IHJ1biB0aGUgY29kZSBiZWxvdy5cbiAgICAgICAgaWYgKGNoaWxkLl9pc1JlZmVyZW5jZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudC5sZW5ndGggPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gbGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgaW5kZXggcGFzc2VkIGluIGlzIGxlc3MgdGhhbiAwIGFuZCBncmVhdGVyIHRoYW4gdGhlIHRvdGFsIG51bWJlciBvZiBjaGlsZHJlbiB0aGVuIHBsYWNlIHRoZSBpdGVtIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEVsc2UgZ2V0IHRoZSBjaGlsZCBpbiB0aGUgY2hpbGRyZW4gYXJyYXkgYnkgdGhlIGluZGV4IHBhc3NlZCBpbiBhbmQgcGxhY2UgdGhlIGl0ZW0gYmVmb3JlIHRoYXQgY2hpbGQuXG5cbiAgICAgICAgICAgIGlmIChjaGlsZC5pc0NyZWF0ZWQgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOy8vIFJlbmRlciB0aGUgaXRlbSBiZWZvcmUgYWRkaW5nIHRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBjaGlsZC5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBZGRzIHRoZSBjaGlsZCBhdCBhIHNwZWNpZmljIGluZGV4IGJ1dCBhbHNvIHdpbGwgcmVtb3ZlIHRoZSBjaGlsZCBmcm9tIGFub3RoZXIgcGFyZW50IG9iamVjdCBpZiBvbmUgZXhpc3RzLlxuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIEFkZHMgdGhlIGNoaWxkIGJlZm9yZSBhbnkgY2hpbGQgYWxyZWFkeSBhZGRlZCBpbiB0aGUgRE9NLlxuICAgICAgICAgICAgalF1ZXJ5KGNoaWxkcmVuLmdldChpbmRleCkpLmJlZm9yZShjaGlsZC4kZWxlbWVudCk7XG5cbiAgICAgICAgICAgIHRoaXMub25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERpc3BsYXlPYmplY3RDb250YWluZXIuc3dhcENoaWxkcmVuXG4gICAgICovXG4gICAgcHVibGljIHN3YXBDaGlsZHJlbihjaGlsZDE6RE9NRWxlbWVudCwgY2hpbGQyOkRPTUVsZW1lbnQpOmFueVxuICAgIHtcbiAgICAgICAgdmFyIGNoaWxkMUluZGV4ID0gY2hpbGQxLiRlbGVtZW50LmluZGV4KCk7XG4gICAgICAgIHZhciBjaGlsZDJJbmRleCA9IGNoaWxkMi4kZWxlbWVudC5pbmRleCgpO1xuXG4gICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDEsIGNoaWxkMkluZGV4KTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMiwgY2hpbGQxSW5kZXgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERpc3BsYXlPYmplY3RDb250YWluZXIuZ2V0Q2hpbGRBdFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDaGlsZEF0KGluZGV4Om51bWJlcik6RE9NRWxlbWVudFxuICAgIHtcbiAgICAgICAgcmV0dXJuIDxET01FbGVtZW50PnN1cGVyLmdldENoaWxkQXQoaW5kZXgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBET01FbGVtZW50IG9iamVjdCB3aXRoIHRoZSBmaXJzdCBmb3VuZCBET00gZWxlbWVudCBieSB0aGUgcGFzc2VkIGluIHNlbGVjdG9yLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRDaGlsZFxuICAgICAqIEBwYXJhbSBzZWxlY3RvciB7c3RyaW5nfSBET00gaWQgbmFtZSwgRE9NIGNsYXNzIG5hbWUgb3IgYSBET00gdGFnIG5hbWUuXG4gICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDaGlsZChzZWxlY3RvcjpzdHJpbmcpOkRPTUVsZW1lbnRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgZmlyc3QgbWF0Y2ggZnJvbSB0aGUgc2VsZWN0b3IgcGFzc2VkIGluLlxuICAgICAgICB2YXIgalF1ZXJ5RWxlbWVudDpKUXVlcnkgPSB0aGlzLiRlbGVtZW50LmZpbmQoc2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgIGlmIChqUXVlcnlFbGVtZW50Lmxlbmd0aCA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gZ2V0Q2hpbGQoJyArIHNlbGVjdG9yICsgJykgQ2Fubm90IGZpbmQgRE9NICRlbGVtZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGVsZW1lbnQgaGFzIGEgc2pzSWQgdmFsdWUgYW5kIGlzIGEgY2hpbGQgb2YgdGhpcyBwYXJlbnQgb2JqZWN0LlxuICAgICAgICB2YXIgc2pzSWQ6bnVtYmVyID0gcGFyc2VJbnQoalF1ZXJ5RWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcpKTtcbiAgICAgICAgdmFyIGRvbUVsZW1lbnQ6RE9NRWxlbWVudCA9IDxET01FbGVtZW50PnRoaXMuZ2V0Q2hpbGRCeUNpZChzanNJZCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlcyBhIERPTUVsZW1lbnQgZnJvbSB0aGUgalF1ZXJ5RWxlbWVudC5cbiAgICAgICAgaWYgKGRvbUVsZW1lbnQgPT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IERPTUVsZW1lbnQgYW5kIGFzc2lnbiB0aGUgalF1ZXJ5IGVsZW1lbnQgdG8gaXQuXG4gICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGRvbUVsZW1lbnQuJGVsZW1lbnQgPSBqUXVlcnlFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICBkb21FbGVtZW50LmVsZW1lbnQgPSBqUXVlcnlFbGVtZW50WzBdO1xuICAgICAgICAgICAgZG9tRWxlbWVudC5pc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBBZGRlZCB0byB0aGUgc3VwZXIgYWRkQ2hpbGQgbWV0aG9kIGJlY2F1c2Ugd2UgZG9uJ3QgbmVlZCB0byBhcHBlbmQgdGhlIGVsZW1lbnQgdG8gdGhlIERPTS5cbiAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgc3VwZXIuYWRkQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFsbCB0aGUgSFRNTCBlbGVtZW50cyBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRyZW5cbiAgICAgKiBAcGFyYW0gW3NlbGVjdG9yXSB7c3RyaW5nfSBZb3UgY2FuIHBhc3MgaW4gYW55IHR5cGUgb2YgalF1ZXJ5IHNlbGVjdG9yLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RvciBwYXNzZWQgaW4gaXQgd2lsbCBnZXQgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIHBhcmVudCBlbGVtZW50LlxuICAgICAqIEByZXR1cm5zIHtBcnJheS48RE9NRWxlbWVudD59IFJldHVybnMgYSBsaXN0IG9mIERPTUVsZW1lbnQncy4gSXQgd2lsbCBncmFiIGFsbCBjaGlsZHJlbiBIVE1MIERPTSBlbGVtZW50cyBvZiB0aGlzIG9iamVjdCBhbmQgd2lsbCBjcmVhdGUgYSBET01FbGVtZW50IGZvciBlYWNoIERPTSBjaGlsZC5cbiAgICAgKiBJZiB0aGUgJ2RhdGEtc2pzLWlkJyBwcm9wZXJ0eSBleGlzdHMgaXMgb24gYW4gSFRNTCBlbGVtZW50IGEgRE9NRWxlbWVudCB3aWxsIG5vdCBiZSBjcmVhdGVkIGZvciB0aGF0IGVsZW1lbnQgYmVjYXVzZSBpdCB3aWxsIGJlIGFzc3VtZWQgaXQgYWxyZWFkeSBleGlzdHMgYXMgYSBET01FbGVtZW50LlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Q2hpbGRyZW4oc2VsZWN0b3I6c3RyaW5nID0gJycpOkFycmF5PERPTUVsZW1lbnQ+XG4gICAge1xuICAgICAgICAvL1RPRE86IE1ha2Ugc3VyZSB0aGUgaW5kZXggb2YgdGhlIGNoaWxkcmVuIGFkZGVkIGlzIHRoZSBzYW1lIGFzIHRoZSB3aGF0IGlzIGluIHRoZSBhY3R1YWwgRE9NLlxuICAgICAgICB2YXIgJGNoaWxkOkpRdWVyeTtcbiAgICAgICAgdmFyIGRvbUVsZW1lbnQ6RE9NRWxlbWVudDtcbiAgICAgICAgdmFyICRsaXN0OkpRdWVyeSA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oc2VsZWN0b3IpO1xuXG4gICAgICAgIHZhciBsaXN0TGVuZ3RoOm51bWJlciA9ICRsaXN0Lmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGlzdExlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICAkY2hpbGQgPSAkbGlzdC5lcShpKTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBqUXVlcnkgZWxlbWVudCBhbHJlYWR5IGhhcyBzanNJZCBkYXRhIHByb3BlcnR5IHRoZW4gaXQgbXVzdCBiZSBhbiBleGlzdGluZyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIChET01FbGVtZW50KSBpbiB0aGUgY2hpbGRyZW4gYXJyYXkuXG4gICAgICAgICAgICBpZiAoJGNoaWxkLmF0dHIoJ2RhdGEtc2pzLWlkJykgPT09IHZvaWQgMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0gJGNoaWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xpZW50U2lkZUlkKGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuZWxlbWVudCA9ICRjaGlsZC5nZXQoMCk7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIEFkZGVkIHRvIHRoZSBzdXBlciBhZGRDaGlsZCBtZXRob2QgYmVjYXVzZSB3ZSBkb24ndCBuZWVkIHRvIGFwcGVuZCB0aGUgZWxlbWVudCB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgICAgIHN1cGVyLmFkZENoaWxkKGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxBcnJheTxET01FbGVtZW50Pj50aGlzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjaGlsZCBvYmplY3QgaW5zdGFuY2UgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0byBudWxsIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIHRoZXJlIGFyZSBubyBvdGhlciByZWZlcmVuY2VzXG4gICAgICogdG8gdGhlIGNoaWxkLiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOkRPTUVsZW1lbnQsIGRlc3Ryb3k6Ym9vbGVhbiA9IHRydWUpOmFueVxuICAgIHtcbiAgICAgICAgdmFyIHJlbW92ZTpib29sZWFuID0gdGhpcy5yZW1vdmVDbGllbnRTaWRlSWQoY2hpbGQpO1xuXG4gICAgICAgIGNoaWxkLmRpc2FibGUoKTtcblxuICAgICAgICAvLyBDaGVja3MgaWYgZGVzdHJveSB3YXMgY2FsbGVkIGJlZm9yZSByZW1vdmVDaGlsZCBzbyBpdCBkb2Vzbid0IGVycm9yLlxuICAgICAgICBpZiAocmVtb3ZlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LnVuYmluZCgpO1xuICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVzdHJveSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkQXRcbiAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRBdChpbmRleDpudW1iZXIsIGRlc3Ryb3k6Ym9vbGVhbiA9IHRydWUpOmFueVxuICAgIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpLCBkZXN0cm95KTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZCBvYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZHJlbiBpcyBzZXQgdG8gbnVsbCBhbmQgdGhlIG9iamVjdHMgYXJlIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyXG4gICAgICogcmVmZXJlbmNlcyB0byB0aGUgY2hpbGRyZW4gZXhpc3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkcmVuXG4gICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBvdmVycmlkZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUNoaWxkcmVuKGRlc3Ryb3k6Ym9vbGVhbiA9IHRydWUpOmFueVxuICAgIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCg8RE9NRWxlbWVudD50aGlzLmNoaWxkcmVuLnBvcCgpLCBkZXN0cm95KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuZW1wdHkoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmRlc3Ryb3lcbiAgICAgKi9cbiAgICBwdWJsaWMgZGVzdHJveSgpOnZvaWRcbiAgICB7XG4gICAgICAgIC8vIE5vdGU6IHdlIGNhbid0IGp1c3QgY2FsbCBkZXN0cm95IHRvIHJlbW92ZSB0aGUgSFRNTEVsZW1lbnQgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlciB2aWV3cyBtYW5hZ2luZyB0aGUgc2FtZSBIVE1MRWxlbWVudC5cbiAgICAgICAgLyppZiAodGhpcy4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgdGhpcy4kZWxlbWVudC51bmJpbmQoKTtcbiAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgfSovXG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEEgd2F5IHRvIGluc3RhbnRpYXRlIHZpZXcgY2xhc3NlcyBieSBmb3VuZCBodG1sIHNlbGVjdG9ycy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6IEl0IHdpbGwgZmluZCBhbGwgY2hpbGRyZW4gZWxlbWVudHMgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnQvJGVsZW1lbnQ6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gcHJvcGVydHkgd2l0aCB0aGUgJ2pzLXNoYXJlRW1haWwnIHNlbGVjdG9yLlxuICAgICAqIElmIGFueSBzZWxlY3RvcnMgYXJlIGZvdW5kIHRoZSBFbWFpbFNoYXJlQ29tcG9uZW50IGNsYXNzIHdpbGwgYmUgaW5zdGFudGlhdGVkIGFuZCBwYXNzIHRoZSBmb3VuZCBqUXVlcnkgZWxlbWVudCBpbnRvIHRoZSBjb250cnVjdG9yLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjcmVhdGVDb21wb25lbnRzXG4gICAgICogQHBhcmFtIGNvbXBvbmVudExpc3QgKEFycmF5Ljx7IHNlbGVjdG9yOiBzdHJpbmc7IGNvbXBvbmVudDogRE9NRWxlbWVudCB9PlxuICAgICAqIEByZXR1cm4ge0FycmF5LjxET01FbGVtZW50Pn0gUmV0dXJucyBhbGwgdGhlIGl0ZW1zIGNyZWF0ZWQgZnJvbSB0aGlzIGNyZWF0ZUNvbXBvbmVudHMgbWV0aG9kLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIENsYXNzTmFtZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY3JlYXRlLmNhbGwodGhpcyk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICB0aGlzLmNyZWF0ZUNvbXBvbmVudHMoW1xuICAgICAqICAgICAgICAgICAgICB7c2VsZWN0b3I6ICcuanMtc2hhcmVFbWFpbCcsIGNvbXBvbmVudDogRW1haWxTaGFyZUNvbXBvbmVudH0sXG4gICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1wYWdpbmF0aW9uJywgY29tcG9uZW50OiBQYWdpbmF0aW9uQ29tcG9uZW50fSxcbiAgICAgKiAgICAgICAgICAgICAge3NlbGVjdG9yOiAnLmpzLWNhcm91c2VsJywgY29tcG9uZW50OiBDYXJvdXNlbENvbXBvbmVudH1cbiAgICAgKiAgICAgICAgICBdKTtcbiAgICAgKiAgICAgIH07XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUNvbXBvbmVudHMoY29tcG9uZW50TGlzdDpBcnJheTxhbnk+KTpBcnJheTxET01FbGVtZW50PlxuICAgIHtcbiAgICAgICAgdmFyIGxpc3Q6QXJyYXk8RE9NRWxlbWVudD47XG4gICAgICAgIHZhciBjcmVhdGVkQ2hpbGRyZW46QXJyYXk8RE9NRWxlbWVudD4gPSBbXTtcbiAgICAgICAgdmFyIGxlbmd0aDpudW1iZXIgPSBjb21wb25lbnRMaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIG9iajphbnk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9iaiA9IGNvbXBvbmVudExpc3RbaV07XG4gICAgICAgICAgICBsaXN0ID0gPEFycmF5PERPTUVsZW1lbnQ+PkNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuJGVsZW1lbnQuZmluZChvYmouc2VsZWN0b3IpLCBvYmouY29tcG9uZW50LCB0aGlzKTtcbiAgICAgICAgICAgIGNyZWF0ZWRDaGlsZHJlbiA9IGNyZWF0ZWRDaGlsZHJlbi5jb25jYXQobGlzdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3JlYXRlZENoaWxkcmVuO1xuICAgIH1cbn1cblxuZXhwb3J0ID0gRE9NRWxlbWVudDtcbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInKTtcblxuLyoqXG4gKiBUaGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuXG4gKlxuICogQGNsYXNzIERpc3BsYXlPYmplY3RcbiAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSB2aWV3XG4gKiBAcmVxdWlyZXMgRXh0ZW5kXG4gKiBAcmVxdWlyZXMgRXZlbnREaXNwYXRjaGVyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICovXG5jbGFzcyBEaXNwbGF5T2JqZWN0IGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cbiAgICAvKipcbiAgICAgKiBUaGUgU3RhZ2Ugb2YgdGhlIGRpc3BsYXkgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHN0YWdlXG4gICAgICogQHR5cGUge2FueX1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIHN0YWdlOmFueSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGludGVyZmFjZSBwcm92aWRlcyB0aGUgMkQgcmVuZGVyaW5nIGNvbnRleHQgZm9yIHRoZSBkcmF3aW5nIHN1cmZhY2Ugb2YgYSBjYW52YXMgZWxlbWVudC5cbiAgICAgKiBUaGlzIHByb3BlcnR5IGlzIG9ubHkgdXNlZCB3aXRoIHRoZSBjYW52YXMgc3BlY2lmaWMgZGlzcGxheSBvYmplY3RzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGN0eFxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBjdHg6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgeCBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB4XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyB4Om51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHkgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgeVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgeTpudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgd2lkdGg6bnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGhlaWdodFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgaGVpZ2h0Om51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHVuc2NhbGVkV2lkdGguXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdW5zY2FsZWRXaWR0aFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyB1bnNjYWxlZFdpZHRoOm51bWJlciA9IDEwMDtcblxuICAgIC8qKlxuICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgdW5zY2FsZWRIZWlnaHQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdW5zY2FsZWRIZWlnaHRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgdW5zY2FsZWRIZWlnaHQ6bnVtYmVyID0gMTAwO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlIChwZXJjZW50YWdlKSBvZiB0aGUgb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIHBvaW50LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHNjYWxlWFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzY2FsZVg6bnVtYmVyID0gMTtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUgKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHNjYWxlWVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzY2FsZVk6bnVtYmVyID0gMTtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIHJvdGF0aW9uOm51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBhbHBoYVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBhbHBoYTpudW1iZXIgPSAxO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdmlzaWJsZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwdWJsaWMgdmlzaWJsZTpib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgb2JqZWN0IHJlY2VpdmVzIG1vdXNlXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbW91c2VFbmFibGVkXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBtb3VzZUVuYWJsZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvaW50aW5nIGhhbmQgKGhhbmQgY3Vyc29yKSBhcHBlYXJzIHdoZW4gdGhlIHBvaW50ZXIgcm9sbHMgb3ZlciBhIGRpc3BsYXkgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHVzZUhhbmRDdXJzb3JcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIHVzZUhhbmRDdXJzb3I6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGlzQ3JlYXRlZCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgaWYgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhpcyBEaXNwbGF5T2JqZWN0IGlzIGNyZWF0ZWQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNDcmVhdGVkXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIGlzQ3JlYXRlZDpib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbmFtZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBuYW1lOnN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjcmVhdGUgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSBhIGNvbnNpc3RlbnQgcGxhY2UgZm9yIHRoZSBjcmVhdGlvbiBvciBpbml0aWFsaXppbmcgdGhlIHZpZXcuXG4gICAgICogSXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSB2aWV3IGlzIGFkZGVkIHRvIGEgRGlzcGxheU9iamVjdENvbnRhaW5lci5cbiAgICAgKiBJdCBpcyBjcml0aWNhbCB0aGF0IGFsbCBzdWJjbGFzc2VzIGNhbGwgdGhlIHN1cGVyIGZvciB0aGlzIGZ1bmN0aW9uIGluIHRoZWlyIG92ZXJyaWRkZW4gbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZSgpOmFueVxuICAgIHtcbiAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBsYXlvdXQgbWV0aG9kIHByb3ZpZGVzIGEgY29tbW9uIGZ1bmN0aW9uIHRvIGhhbmRsZSB1cGRhdGluZyBvYmplY3RzIGluIHRoZSB2aWV3LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBsYXlvdXRcbiAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgbGF5b3V0KCk6YW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2V0U2l6ZSBtZXRob2Qgc2V0cyB0aGUgYm91bmRzIHdpdGhpbiB3aGljaCB0aGUgY29udGFpbmluZyBEaXNwbGF5T2JqZWN0IHdvdWxkIGxpa2UgdGhhdCBjb21wb25lbnQgdG8gbGF5IGl0c2VsZiBvdXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdW5zY2FsZWRXaWR0aCB7bnVtYmVyfSBUaGUgd2lkdGggd2l0aGluIHdoaWNoIHRoZSBjb21wb25lbnQgc2hvdWxkIGxheSBpdHNlbGYgb3V0LlxuICAgICAqIEBwYXJhbSB1bnNjYWxlZEhlaWdodCB7bnVtYmVyfSBUaGUgaGVpZ2h0IHdpdGhpbiB3aGljaCB0aGUgY29tcG9uZW50IHNob3VsZCBsYXkgaXRzZWxmIG91dC5cbiAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U2l6ZSh1bnNjYWxlZFdpZHRoOm51bWJlciwgdW5zY2FsZWRIZWlnaHQ6bnVtYmVyKTphbnlcbiAgICB7XG4gICAgICAgIHRoaXMudW5zY2FsZWRXaWR0aCA9IHVuc2NhbGVkV2lkdGg7XG4gICAgICAgIHRoaXMudW5zY2FsZWRIZWlnaHQgPSB1bnNjYWxlZEhlaWdodDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZGVyU3RhcnQoKTp2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZSgpOmJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLmN0eCA9PT0gbnVsbCB8fCB0aGlzLmFscGhhIDw9IDAgfHwgdGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHRoaXMucmVhZGVyU3RhcnQoKTtcbiAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmFscGhhO1xuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB0aGlzLnJlbmRlckVuZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW5kZXJFbmQoKTp2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IERpc3BsYXlPYmplY3Q7IiwiaW1wb3J0IERpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKTtcblxuLyoqXG4gKiBUaGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuXG4gKlxuICogQGNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAqIEBleHRlbmRzIERpc3BsYXlPYmplY3RcbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgdmlld1xuICogQHJlcXVpcmVzIEV4dGVuZFxuICogQHJlcXVpcmVzIERpc3BsYXlPYmplY3RcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKi9cbmNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXIgZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG57XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoaXMgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IG51bUNoaWxkcmVuXG4gICAgICogQHR5cGUge2ludH1cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBudW1DaGlsZHJlbjpudW1iZXIgPSAwO1xuXG4gICAgLyoqXG4gICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIHRvIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjaGlsZHJlblxuICAgICAqIEB0eXBlIHtBcnJheS48RGlzcGxheU9iamVjdD59XG4gICAgICogQHJlYWRPbmx5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBjaGlsZHJlbjpBcnJheTxEaXNwbGF5T2JqZWN0PiA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdCBhcmUgbW91c2UgZW5hYmxlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBtb3VzZUNoaWxkcmVuXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBtb3VzZUNoaWxkcmVuOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLiBUaGUgY2hpbGQgaXMgYWRkZWQgdG8gdGhlIGZyb250ICh0b3ApIG9mIGFsbCBvdGhlclxuICAgICAqIGNoaWxkcmVuIGluIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS4gKFRvIGFkZCBhIGNoaWxkIHRvIGEgc3BlY2lmaWMgaW5kZXggcG9zaXRpb24sIHVzZSB0aGUgYWRkQ2hpbGRBdCgpIG1ldGhvZC4pXG4gICAgICpcbiAgICAgKiBJZiB5b3UgYWRkIGEgY2hpbGQgb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgYSBkaWZmZXJlbnQgcGFyZW50LCB0aGUgb2JqZWN0IGlzIHJlbW92ZWQgZnJvbSB0aGUgY2hpbGRcbiAgICAgKiBsaXN0IG9mIHRoZSBvdGhlciBwYXJlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhZGRDaGlsZFxuICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLlxuICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDpEaXNwbGF5T2JqZWN0KTphbnlcbiAgICB7XG4gICAgICAgIC8vSWYgdGhlIGNoaWxkIGJlaW5nIHBhc3NlZCBpbiBhbHJlYWR5IGhhcyBhIHBhcmVudCB0aGVuIHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlcmUuXG4gICAgICAgIGlmIChjaGlsZC5wYXJlbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICogVGhlIGNoaWxkIGlzIGFkZGVkIGF0IHRoZSBpbmRleCBwb3NpdGlvbiBzcGVjaWZpZWQuIEFuIGluZGV4IG9mIDAgcmVwcmVzZW50cyB0aGUgYmFja1xuICAgICAqIChib3R0b20pIG9mIHRoZSBkaXNwbGF5IGxpc3QgZm9yIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lckNvbnRhaW5lciBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFkZENoaWxkQXRcbiAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXMgb2JqZWN0IGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSBpbmRleCB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gdG8gd2hpY2ggdGhlIGNoaWxkIGlzIGFkZGVkLiBJZiB5b3Ugc3BlY2lmeSBhIGN1cnJlbnRseSBvY2N1cGllZCBpbmRleCBwb3NpdGlvbiwgdGhlIGNoaWxkIG9iamVjdCB0aGF0IGV4aXN0cyBhdCB0aGF0IHBvc2l0aW9uIGFuZCBhbGwgaGlnaGVyIHBvc2l0aW9ucyBhcmUgbW92ZWQgdXAgb25lIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0LlxuICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRDaGlsZEF0KGNoaWxkOkRpc3BsYXlPYmplY3QsIGluZGV4Om51bWJlcik6YW55XG4gICAge1xuICAgICAgICAvL0lmIHRoZSBjaGlsZCBiZWluZyBwYXNzZWQgaW4gYWxyZWFkeSBoYXMgYSBwYXJlbnQgdGhlbiByZW1vdmUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZXJlLlxuICAgICAgICBpZiAoY2hpbGQucGFyZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGNoaWxkIG9iamVjdCBpbnN0YW5jZSBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIG51bGwgLCBhbmQgdGhlIG9iamVjdCBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzXG4gICAgICogdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUNoaWxkKGNoaWxkOkRpc3BsYXlPYmplY3QpOmFueVxuICAgIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSlcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmVtb3ZlcyB0aGUgY2hpbGQgb2JqZWN0IGZyb20gdGhlIHBhcmVudC5cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcblxuICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZHJlbiBpcyBzZXQgdG8gbnVsbCAsIGFuZCB0aGUgb2JqZWN0cyBhcmUgZ2FyYmFnZSBjb2xsZWN0ZWQgaWZcbiAgICAgKiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZHJlbiBleGlzdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRyZW5cbiAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlQ2hpbGRyZW4oKTphbnlcbiAgICB7XG4gICAgICAgIHdoaWxlICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jaGlsZHJlbi5wb3AoKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2FwcyB0d28gRGlzcGxheU9iamVjdCdzIHdpdGggZWFjaCBvdGhlci5cbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc3dhcENoaWxkcmVuXG4gICAgICogQHBhcmFtIGNoaWxkMSB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYmUgc3dhcC5cbiAgICAgKiBAcGFyYW0gY2hpbGQyIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBiZSBzd2FwLlxuICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHB1YmxpYyBzd2FwQ2hpbGRyZW4oY2hpbGQxOkRpc3BsYXlPYmplY3QsIGNoaWxkMjpEaXNwbGF5T2JqZWN0KTphbnlcbiAgICB7XG4gICAgICAgIHZhciBjaGlsZDFJbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDEpO1xuICAgICAgICB2YXIgY2hpbGQySW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcblxuICAgICAgICB0aGlzLmFkZENoaWxkQXQoY2hpbGQxLCBjaGlsZDJJbmRleCk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDIsIGNoaWxkMUluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2FwcyBjaGlsZCBvYmplY3RzIGF0IHRoZSB0d28gc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9ucyBpbiB0aGUgY2hpbGQgbGlzdC4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW4gdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBzd2FwQ2hpbGRyZW5BdFxuICAgICAqIEBwYXJhbSBpbmRleDEge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGlsZCBvYmplY3QuXG4gICAgICogQHBhcmFtIGluZGV4MiB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIHNlY29uZCBjaGlsZCBvYmplY3QuXG4gICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcHVibGljIHN3YXBDaGlsZHJlbkF0KGluZGV4MTpudW1iZXIsIGluZGV4MjpudW1iZXIpOmFueVxuICAgIHtcbiAgICAgICAgaWYgKGluZGV4MSA8IDAgfHwgaW5kZXgxIDwgMCB8fCBpbmRleDEgPj0gdGhpcy5udW1DaGlsZHJlbiB8fCBpbmRleDIgPj0gdGhpcy5udW1DaGlsZHJlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gaW5kZXggdmFsdWUocykgY2Fubm90IGJlIG91dCBvZiBib3VuZHMuIGluZGV4MSB2YWx1ZSBpcyAnICsgaW5kZXgxICsgJyBpbmRleDIgdmFsdWUgaXMgJyArIGluZGV4Mik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hpbGQxOkRpc3BsYXlPYmplY3QgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgxKTtcbiAgICAgICAgdmFyIGNoaWxkMjpEaXNwbGF5T2JqZWN0ID0gdGhpcy5nZXRDaGlsZEF0KGluZGV4Mik7XG5cbiAgICAgICAgdGhpcy5zd2FwQ2hpbGRyZW4oY2hpbGQxLCBjaGlsZDIpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGluZGV4IHBvc2l0aW9uIG9mIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRJbmRleFxuICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gaWRlbnRpZnkuXG4gICAgICogQHJldHVybnMge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB0byBpZGVudGlmeS5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIGdldENoaWxkSW5kZXgoY2hpbGQ6RGlzcGxheU9iamVjdCk6bnVtYmVyXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBkaXNwbGF5IG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIG9yIHRoZSBpbnN0YW5jZSBpdHNlbGYuIFRoZSBzZWFyY2ggaW5jbHVkZXMgdGhlIGVudGlyZSBkaXNwbGF5IGxpc3QgaW5jbHVkaW5nIHRoaXMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY29udGFpbnNcbiAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBjaGlsZCBvYmplY3QgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gIHRydWUgaWYgdGhlIGNoaWxkIG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZSBEaXNwbGF5T2JqZWN0IG9yIHRoZSBjb250YWluZXIgaXRzZWxmOyBvdGhlcndpc2UgZmFsc2UuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBjb250YWlucyhjaGlsZDpEaXNwbGF5T2JqZWN0KTpib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA+PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldENoaWxkQXRcbiAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDaGlsZEF0KGluZGV4Om51bWJlcik6RGlzcGxheU9iamVjdFxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBEaXNwbGF5T2JqZWN0IGJ5IGl0cyBzanNJZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRCeUNpZFxuICAgICAqIEBwYXJhbSBzanNJZCB7bnVtYmVyfVxuICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fG51bGx9XG4gICAgICogQG92ZXJyaWRlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRDaGlsZEJ5Q2lkKHNqc0lkOm51bWJlcik6RGlzcGxheU9iamVjdFxuICAgIHtcbiAgICAgICAgdmFyIGNoaWxkOkRpc3BsYXlPYmplY3QgPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGk6bnVtYmVyID0gdGhpcy5udW1DaGlsZHJlbiAtIDE7IGkgPj0gMDsgaS0tKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpXS5zanNJZCA9PSBzanNJZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IERpc3BsYXlPYmplY3RDb250YWluZXI7XG4iLCJpbXBvcnQgRE9NRWxlbWVudCA9IHJlcXVpcmUoJy4vRE9NRWxlbWVudCcpO1xuXG4vKipcbiAqIFRoZSB7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBzaG91bGQgYmUgZXh0ZW5kZWQgYnkgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3MuXG4gKlxuICogQGNsYXNzIFN0YWdlXG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHZpZXdcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKiBAcmVxdWlyZXMgRXh0ZW5kXG4gKiBAcmVxdWlyZXMgRE9NRWxlbWVudFxuICogQHJlcXVpcmVzIGpRdWVyeVxuICogQGV4YW1wbGVcbiAqICAgICAvLyBUaGlzIGV4YW1wbGUgaWxsdXN0cmF0ZXMgaG93IHRvIHNldHVwIHlvdXIgbWFpbiBhcHBsaWNhdGlvbiBvciByb290IGNsYXNzIHdoZW4gZXh0ZW5kaW5nIHRoZSB7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAqICAgICBkZWZpbmUoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIG1vZHVsZSkge1xuICogICAgICAgICAndXNlIHN0cmljdCc7XG4gKlxuICogICAgICAgICB2YXIgRXh0ZW5kID0gcmVxdWlyZSgnc3RydWN0dXJlanMvdXRpbC9FeHRlbmQnKTtcbiAqICAgICAgICAgdmFyIFN0YWdlID0gcmVxdWlyZSgncmVwbGFjZS9wYXRoL1N0YWdlJyk7XG4gKlxuICogICAgICAgICB2YXIgTWFpbkNsYXNzID0gKGZ1bmN0aW9uICgpIHtcbiAqXG4gKiAgICAgICAgIHZhciBfc3VwZXIgPSBFeHRlbmQoTWFpbkNsYXNzLCBTdGFnZSk7XG4gKlxuICogICAgICAgICAgICAgZnVuY3Rpb24gTWFpbkNsYXNzKCkge1xuICogICAgICAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICogICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgIE1haW5DbGFzcy5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuY3JlYXRlLmNhbGwodGhpcyk7XG4gKlxuICogICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIHlvdXIgY2hpbGQgb2JqZWN0cyB0byB0aGlzIHBhcmVudCBjbGFzcy5cbiAqICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICBNYWluQ2xhc3MucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICpcbiAqICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAqICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICBNYWluQ2xhc3MucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAqICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXMgfTtcbiAqXG4gKiAgICAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdXBlci5wcm90b3R5cGUuZW5hYmxlLmNhbGwodGhpcyk7XG4gKiAgICAgICAgICAgICB9XG4gKlxuICogICAgICAgICAgICAgTWFpbkNsYXNzLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICogICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXMgfTtcbiAqXG4gKiAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogICAgICAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmRpc2FibGUuY2FsbCh0aGlzKTtcbiAqICAgICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgICBNYWluQ2xhc3MucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gKlxuICogICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICogICAgICAgICAgICAgfVxuICpcbiAqICAgICAgICAgICAgIHJldHVybiBNYWluQ2xhc3M7XG4gKiAgICAgICAgIH0pKCk7XG4gKlxuICogICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE1haW5DbGFzcztcbiAqICAgICB9KTtcbiAqXG4gKiA8Yj5JbnN0YW50aWF0aW9uIEV4YW1wbGU8L2I+PGJyPlxuICogVGhpcyBleGFtcGxlIGlsbHVzdHJhdGVzIGhvdyB0byBpbnN0YW50aWF0ZSB5b3VyIG1haW4gYXBwbGljYXRpb24gb3Igcm9vdCBjbGFzcy5cbiAqXG4gKiAgICAgIHZhciBhcHAgPSBuZXcgTWFpbkNsYXNzKCk7XG4gKiAgICAgIGFwcC5hcHBlbmRUbygnYm9keScpO1xuICpcbiAqL1xuY2xhc3MgU3RhZ2UgZXh0ZW5kcyBET01FbGVtZW50XG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2VsZWN0ZWQgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBjaGlsZCBlbGVtZW50cyB3aWxsIGJlIGNyZWF0ZWQuIFRoaXMgbWV0aG9kIHN0YXJ0cyB0aGUgbGlmZWN5Y2xlIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgYXBwZW5kVG9cbiAgICAgKiBAcGFyYW0gdHlwZSB7YW55fSBBIHN0cmluZyB2YWx1ZSB3aGVyZSB5b3VyIGFwcGxpY2F0aW9uIHdpbGwgYmUgYXBwZW5kZWQuIFRoaXMgY2FuIGJlIGFuIGVsZW1lbnQgaWQgKCNzb21lLWlkKSwgZWxlbWVudCBjbGFzcyAoLnNvbWUtY2xhc3MpIG9yIGEgZWxlbWVudCB0YWcgKGJvZHkpLlxuICAgICAqIEBwYXJhbSBbZW5hYmxlZD10cnVlXSB7Ym9vbGVhbn0gU2V0cyB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgb2JqZWN0LlxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwdWJsaWMgYXBwZW5kVG8odHlwZTphbnksIGVuYWJsZWQ6Ym9vbGVhbiA9IHRydWUpOmFueVxuICAgIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICh0eXBlIGluc3RhbmNlb2YgalF1ZXJ5KSA/IHR5cGUgOiBqUXVlcnkodHlwZSk7XG5cbiAgICAgICAgdGhpcy5hZGRDbGllbnRTaWRlSWQodGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNDcmVhdGVkID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCA9IFN0YWdlO1xuIiwiaW1wb3J0IEJhc2VPYmplY3QgPSByZXF1aXJlKCcuLi9CYXNlT2JqZWN0Jyk7XG5cbi8qKlxuICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB1c2VkIGFzIHRoZSBiYXNlIGNsYXNzIGZvciB0aGUgY3JlYXRpb24gb2YgRXZlbnQgb2JqZWN0cywgd2hpY2ggYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzIHRvIGV2ZW50IGxpc3RlbmVycyB3aGVuIGFuIGV2ZW50IG9jY3Vycy5cbiAqXG4gKiBUaGUgcHJvcGVydGllcyBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGNhcnJ5IGJhc2ljIGluZm9ybWF0aW9uIGFib3V0IGFuIGV2ZW50LCBzdWNoIGFzIHRoZSBldmVudCdzIHR5cGUgb3Igd2hldGhlciB0aGUgZXZlbnQncyBkZWZhdWx0IGJlaGF2aW9yIGNhbiBiZSBjYW5jZWxlZC5cbiAqXG4gKiBGb3IgbWFueSBldmVudHMsIHN1Y2ggYXMgdGhlIGV2ZW50cyByZXByZXNlbnRlZCBieSB0aGUgRXZlbnQgY2xhc3MgY29uc3RhbnRzLCB0aGlzIGJhc2ljIGluZm9ybWF0aW9uIGlzIHN1ZmZpY2llbnQuIE90aGVyIGV2ZW50cywgaG93ZXZlciwgbWF5IHJlcXVpcmUgbW9yZVxuICogZGV0YWlsZWQgaW5mb3JtYXRpb24uXG4gKiBAY2xhc3MgQmFzZUV2ZW50XG4gKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC4gVGhlIHR5cGUgaXMgY2FzZS1zZW5zaXRpdmUuXG4gKiBAcGFyYW0gW2J1YmJsZXM9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LiBJZiB0aGUgZXZlbnQgY2FuIGJ1YmJsZSwgdGhpcyB2YWx1ZSBpcyB0cnVlOyBvdGhlcndpc2UgaXQgaXMgZmFsc2UuXG4gKiBOb3RlOiBXaXRoIGV2ZW50LWJ1YmJsaW5nIHlvdSBjYW4gbGV0IG9uZSBFdmVudCBzdWJzZXF1ZW50bHkgY2FsbCBvbiBldmVyeSBhbmNlc3RvciAoe3sjY3Jvc3NMaW5rIFwiRXZlbnREaXNwYXRjaGVyL3BhcmVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSlcbiAqIChjb250YWluZXJzIG9mIGNvbnRhaW5lcnMgb2YgZXRjLikgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gdGhhdCBvcmlnaW5hbGx5IGRpc3BhdGNoZWQgdGhlIEV2ZW50LCBhbGwgdGhlIHdheSB1cCB0byB0aGUgc3VyZmFjZSAoe3sjY3Jvc3NMaW5rIFwiU3RhZ2VcIn19e3svY3Jvc3NMaW5rfX0pLiBBbnkgY2xhc3NlcyB0aGF0IGRvIG5vdCBoYXZlIGEgcGFyZW50IGNhbm5vdCBidWJibGUuXG4gKiBAcGFyYW0gW2NhbmNlbGFibGU9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLiBJZiB0aGUgYmVoYXZpb3IgY2FuIGJlIGNhbmNlbGVkLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBVc2UgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICogQHN1Ym1vZHVsZSBldmVudFxuICogQHJlcXVpcmVzIEV4dGVuZFxuICogQHJlcXVpcmVzIEJhc2VPYmplY3RcbiAqIEBjb25zdHJ1Y3RvclxuICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gKiBAZXhhbXBsZVxuICogICAgIC8vIEV4YW1wbGU6IGhvdyB0byBjcmVhdGUgYSBjdXN0b20gZXZlbnQgYnkgZXh0ZW5kaW5nIEJhc2VFdmVudC5cbiAqICAgICB2YXIgRXh0ZW5kID0gcmVxdWlyZSgnc3RydWN0dXJlanMvdXRpbC9FeHRlbmQnKTtcbiAqICAgICB2YXIgQmFzZUV2ZW50ID0gcmVxdWlyZSgnc3RydWN0dXJlanMvZXZlbnQvQmFzZUV2ZW50Jyk7XG4gKlxuICogICAgIHZhciBDb3VudHJ5RXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICpcbiAqICAgICAgICAgIHZhciBfc3VwZXIgPSBFeHRlbmQoQ291bnRyeUV2ZW50LCBCYXNlRXZlbnQpO1xuICpcbiAqICAgICAgICAgIENvdW50cnlFdmVudC5DSEFOR0VfQ09VTlRSWSA9IFwiQ291bnRyeUV2ZW50LmNoYW5nZUNvdW50cnlcIjtcbiAqXG4gKiAgICAgICAgICBmdW5jdGlvbiBDb3VudHJ5RXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSkge1xuICogICAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRhdGEpO1xuICpcbiAqICAgICAgICAgICAgICB0aGlzLmNvdW50cnlOYW1lID0gbnVsbDtcbiAqICAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgICAgcmV0dXJuIENvdW50cnlFdmVudDtcbiAqICAgICAgfSkoKTtcbiAqXG4gKiAgICAgLy8gRXhhbXBsZTogaG93IHRvIHVzZSB0aGUgY3VzdG9tIGV2ZW50LlxuICogICAgIHZhciBldmVudCA9IG5ldyBDb3VudHJ5RXZlbnQoQ291bnRyeUV2ZW50LkNIQU5HRV9DT1VOVFJZKTtcbiAqICAgICBldmVudC5jb3VudHJ5TmFtZSA9ICdDYW5hZGEnO1xuICogICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gKi9cbmNsYXNzIEJhc2VFdmVudCBleHRlbmRzIEJhc2VPYmplY3RcbntcbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LkFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFjdGl2YXRlIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBBQ1RJVkFURVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEFDVElWQVRFOnN0cmluZyA9ICdCYXNlRXZlbnQuYWN0aXZhdGUnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5BRERFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBhZGRlZCBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgQURERURcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBBRERFRDpzdHJpbmcgPSAnQmFzZUV2ZW50LmFkZGVkJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuQURERURfVE9fU1RBR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gYWRkZWRUb1N0YWdlIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBBRERFRF9UT19TVEFHRVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIEFEREVEX1RPX1NUQUdFOnN0cmluZyA9ICdCYXNlRXZlbnQuYWRkZWRUb1N0YWdlJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuQ0FOQ0VMIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2FuY2VsIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBDQU5DRUxcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBDQU5DRUw6c3RyaW5nID0gJ0Jhc2VFdmVudC5jYW5jZWwnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5DSEFOR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjaGFuZ2UgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IENIQU5HRVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENIQU5HRTpzdHJpbmcgPSAnQmFzZUV2ZW50LmNoYW5nZSc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LkNMRUFSIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xlYXIgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IENMRUFSXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQ0xFQVI6c3RyaW5nID0gJ0Jhc2VFdmVudC5jbGVhcic7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LkNMT1NFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xvc2UgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IENMT1NFXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQ0xPU0U6c3RyaW5nID0gJ0Jhc2VFdmVudC5jbG9zZSc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LkNMT1NJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjbG9zaW5nIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBDTE9TSU5HXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgQ0xPU0lORzpzdHJpbmcgPSAnQmFzZUV2ZW50LmNsb3NpbmcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5DT01QTEVURSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNvbXBsZXRlIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBDT01QTEVURVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENPTVBMRVRFOnN0cmluZyA9ICdCYXNlRXZlbnQuY29tcGxldGUnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5DT05ORUNUIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29ubmVjdCBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgQ09OTkVDVFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENPTk5FQ1Q6c3RyaW5nID0gJ0Jhc2VFdmVudC5jb25uZWN0JztcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29weSBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgQ09QWVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIENPUFk6c3RyaW5nID0gJ0Jhc2VFdmVudC5jb3B5JztcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY3V0IGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBDVVRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBDVVQ6c3RyaW5nID0gJ0Jhc2VFdmVudC5jdXQnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5ERUFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZGVhY3RpdmF0ZSBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgREVBQ1RJVkFURVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIERFQUNUSVZBVEU6c3RyaW5nID0gJ0Jhc2VFdmVudC5kZWFjdGl2YXRlJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuRElTUExBWUlORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGRpc3BsYXlpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IERJU1BMQVlJTkdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBESVNQTEFZSU5HOnN0cmluZyA9ICdCYXNlRXZlbnQuZGlzcGxheWluZyc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LkVOVEVSX0ZSQU1FIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGVudGVyRnJhbWUgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IEVOVEVSX0ZSQU1FXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgRU5URVJfRlJBTUU6c3RyaW5nID0gJ0Jhc2VFdmVudC5lbnRlckZyYW1lJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuRVhJVF9GUkFNRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBleGl0RnJhbWUgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IEVYSVRfRlJBTUVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBFWElUX0ZSQU1FOnN0cmluZyA9ICdCYXNlRXZlbnQuZXhpdEZyYW1lJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuRVhJVElORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBleGl0aW5nIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBFWElUSU5HXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgRVhJVElORzpzdHJpbmcgPSAnQmFzZUV2ZW50LmV4aXRpbmcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5GVUxMX1NDUkVFTiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGZ1bGxTY3JlZW4gZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IEZVTExTQ1JFRU5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBGVUxMU0NSRUVOOnN0cmluZyA9ICdCYXNlRXZlbnQuZnVsbFNjcmVlbic7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LklOSVQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gaW5pdCBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgSU5JVFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIElOSVQ6c3RyaW5nID0gJ0Jhc2VFdmVudC5pbml0JztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuTkVUV09SS19DSEFOR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBuZXR3b3JrQ2hhbmdlIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBORVRXT1JLX0NIQU5HRVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE5FVFdPUktfQ0hBTkdFOnN0cmluZyA9ICdCYXNlRXZlbnQubmV0d29ya0NoYW5nZSc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50Lk9QRU4gY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gb3BlbiBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgT1BFTlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIE9QRU46c3RyaW5nID0gJ0Jhc2VFdmVudC5vcGVuJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuUEFTVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBwYXN0ZSBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgUEFTVEVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBQQVNURTpzdHJpbmcgPSAnQmFzZUV2ZW50LnBhc3RlJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuUFJFUEFSSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcHJlcGFyaW5nIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBQUkVQQVJJTkdcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBQUkVQQVJJTkc6c3RyaW5nID0gJ0Jhc2VFdmVudC5wcmVwYXJpbmcnO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5SRU1PVkVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVtb3ZlZCBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZXZlbnQgUkVNT1ZFRFxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFJFTU9WRUQ6c3RyaW5nID0gJ0Jhc2VFdmVudC5yZW1vdmVkJztcblxuICAgIC8qKlxuICAgICAqIFRoZSBCYXNlRXZlbnQuUkVOREVSIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVuZGVyIGV2ZW50IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBldmVudCBSRU5ERVJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBSRU5ERVI6c3RyaW5nID0gJ0Jhc2VFdmVudC5yZW5kZXInO1xuXG4gICAgLyoqXG4gICAgICogVGhlIEJhc2VFdmVudC5SRVNJWkUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSByZXNpemUgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IFJFU0laRVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIFJFU0laRTpzdHJpbmcgPSAnQmFzZUV2ZW50LnJlc2l6ZSc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgQmFzZUV2ZW50LlNFTEVDVEVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgc2VsZWN0ZWQgZXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGV2ZW50IFNFTEVDVEVEXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgU0VMRUNURUQ6c3RyaW5nID0gJ0Jhc2VFdmVudC5zZWxlY3RlZCc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICogQHB1YmxpY1xuICAgICAqIEByZWFkT25seVxuICAgICAqL1xuICAgIHB1YmxpYyB0eXBlOnN0cmluZyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0IHRoYXQgb3JpZ2luYWxseSBkaXNwYXRjaGVkIHRoZSBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgKiBAdHlwZSB7YW55fVxuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKiBAcHVibGljXG4gICAgICogQHJlYWRPbmx5XG4gICAgICovXG4gICAgcHVibGljIHRhcmdldDphbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnRUYXJnZXQgcHJvcGVydHkgYWx3YXlzIHBvaW50cyB0byB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSB0aGF0IHRoZSBldmVudCBpcyBjdXJyZW50bHkgcHJvY2Vzc2luZyAoaS5lLiBidWJibGluZyBhdCkuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgY3VycmVudFRhcmdldFxuICAgICAqIEB0eXBlIHthbnl9XG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgY3VycmVudFRhcmdldDphbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBwYXNzIGFueSB0eXBlIG9mIGRhdGEgd2l0aCB0aGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZGF0YVxuICAgICAqIEB0eXBlIHthbnl9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YTphbnkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgYW4gZXZlbnQgaXMgYSBidWJibGluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBidWJibGVzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGJ1YmJsZXM6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJlaGF2aW9yIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQgY2FuIGJlIHByZXZlbnRlZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBjYW5jZWxhYmxlXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHVibGljIGNhbmNlbGFibGU6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcFByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSB3YXMgY2FsbGVkIG9uIHRoZSBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNQcm9wYWdhdGlvblN0b3BwZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGlmIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSB3YXMgY2FsbGVkIG9uIHRoZSBldmVudCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTpzdHJpbmcsIGJ1YmJsZXM6Ym9vbGVhbiA9IGZhbHNlLCBjYW5jZWxhYmxlOmJvb2xlYW4gPSBmYWxzZSwgZGF0YTphbnkgPSBudWxsKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVzO1xuICAgICAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXZlbnRzIHByb2Nlc3Npbmcgb2YgYW55IGV2ZW50IGxpc3RlbmVycyBpbiBub2RlcyBzdWJzZXF1ZW50IHRvIHRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIGV2ZW50IGZsb3cuXG4gICAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWZmZWN0IGFueSBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZSAoY3VycmVudFRhcmdldCkuIEluIGNvbnRyYXN0LFxuICAgICAqIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgcHJldmVudHMgcHJvY2Vzc2luZ1xuICAgICAqIG9mIGV2ZW50IGxpc3RlbmVycyBpbiBib3RoIHRoZSBjdXJyZW50IG5vZGUgYW5kIHN1YnNlcXVlbnQgbm9kZXMuIEFkZGl0aW9uYWwgY2FsbHMgdG8gdGhpcyBtZXRob2QgaGF2ZSBubyBlZmZlY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHN0b3BQcm9wYWdhdGlvblxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RvcFByb3BhZ2F0aW9uKCk6dm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJldmVudHMgcHJvY2Vzc2luZyBvZiBhbnkgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgYW5kIGFueSBzdWJzZXF1ZW50IG5vZGVzIGluIHRoZSBldmVudCBmbG93LlxuICAgICAqIFRoaXMgbWV0aG9kIHRha2VzIGVmZmVjdCBpbW1lZGlhdGVseSwgYW5kIGl0IGFmZmVjdHMgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUuIEluIGNvbnRyYXN0LFxuICAgICAqIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcFByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgZG9lc24ndCB0YWtlIGVmZmVjdCB1bnRpbFxuICAgICAqIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgZmluaXNoIHByb2Nlc3NpbmcuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk6dm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRHVwbGljYXRlcyBhbiBpbnN0YW5jZSBvZiBhbiBCYXNlRXZlbnQgc3ViY2xhc3MuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zIGEgbmV3IEJhc2VFdmVudCBvYmplY3QgdGhhdCBpcyBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIGluc3RhbmNlIG9mIHRoZSBCYXNlRXZlbnQgb2JqZWN0LlxuICAgICAqXG4gICAgICogVGhlIG5ldyBCYXNlRXZlbnQgb2JqZWN0IGluY2x1ZGVzIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgb3JpZ2luYWwuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHJldHVybnMge0Jhc2VFdmVudH1cbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgdmFyIGNsb25lT2ZFdmVudCA9IGV2ZW50LmNsb25lKCk7XG4gICAgICovXG4gICAgcHVibGljIGNsb25lKCk6QmFzZUV2ZW50XG4gICAge1xuICAgICAgICB2YXIgY2xvbmVkQmFzZU1vZGVsOkJhc2VFdmVudCA9IG5ldyAoPGFueT50aGlzKS5jb25zdHJ1Y3Rvcih0aGlzLnR5cGUsIHRoaXMuYnViYmxlcywgdGhpcy5jYW5jZWxhYmxlLCB0aGlzLmRhdGEpO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsb25lZEJhc2VNb2RlbFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsb25lZEJhc2VNb2RlbDtcbiAgICB9XG5cbn1cblxuZXhwb3J0ID0gQmFzZUV2ZW50OyIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKCcuL0V2ZW50RGlzcGF0Y2hlcicpO1xuaW1wb3J0IEJhc2VFdmVudCA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG5cbi8qKlxuICogRXZlbnRCcm9rZXIgaXMgYSBzaW1wbGUgcHVibGlzaCBhbmQgc3Vic2NyaWJlIHN0YXRpYyBjbGFzcyB0aGF0IHlvdSBjYW4gdXNlIHRvIGZpcmUgYW5kIHJlY2VpdmUgbm90aWZpY2F0aW9ucy5cbiAqIExvb3NlbHkgY291cGxlZCBldmVudCBoYW5kbGluZywgdGhlIHN1YnNjcmliZXIgZG9lcyBub3Qga25vdyB0aGUgcHVibGlzaGVyLiBCb3RoIG9mIHRoZW0gb25seSBuZWVkIHRvIGtub3cgdGhlIGV2ZW50IHR5cGUuXG4gKlxuICogQGNsYXNzIEV2ZW50QnJva2VyXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIGV2ZW50XG4gKiBAcmVxdWlyZXMgRXZlbnREaXNwYXRjaGVyXG4gKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gKiBAc3RhdGljXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqL1xuY2xhc3MgRXZlbnRCcm9rZXJcbntcbiAgICAvKipcbiAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgRXZlbnREaXNwYXRjaGVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBfZXZlbnREaXNwYXRjaGVyXG4gICAgICogQHR5cGUge0V2ZW50RGlzcGF0Y2hlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBfZXZlbnREaXNwYXRjaGVyOkV2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW0V2ZW50QnJva2VyXSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIEV2ZW50QnJva2VyIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9iamVjdCB3aXRoIGFuIEV2ZW50QnJva2VyIG9iamVjdCBzbyB0aGF0IHRoZSBsaXN0ZW5lciByZWNlaXZlcyBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGV2ZW50LiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gd2lsbCByZWNlaXZlIGEge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IG9iamVjdCBvciBjdXN0b20gZXZlbnQgdGhhdCBleHRlbmRzIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuXG4gICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBFdmVudEJyb2tlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiB1c2luZyBhIGNvbnN0YW50IGV2ZW50IHR5cGUuXG4gICAgICogICAgIEV2ZW50QnJva2VyLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gVGhlIGV2ZW50IHBhc3NlZCB0byB0aGUgbWV0aG9kIHdpbGwgYWx3YXlzIGJlIGEgQmFzZUV2ZW50IG9iamVjdC5cbiAgICAgKiAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5faGFuZGxlck1ldGhvZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmRhdGEpO1xuICAgICAqICAgICB9O1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24sIHNjb3BlOmFueSwgcHJpb3JpdHk6bnVtYmVyID0gMCk6dm9pZFxuICAgIHtcbiAgICAgICAgRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvYmplY3Qgb25jZSB3aXRoIGFuIEV2ZW50RGlzcGF0Y2hlciBvYmplY3Qgc28gdGhlIGxpc3RlbmVyIHdpbGwgcmVjZWl2ZSB0aGUgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyT25jZVxuICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgYSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0gb2JqZWN0IG9yIGN1c3RvbSBldmVudCB0aGF0IGV4dGVuZHMgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0gW3ByaW9yaXR5PTBdIHtpbnR9IEluZmx1ZW5jZXMgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBsaXN0ZW5lcnMgYXJlIGNhbGxlZC4gTGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdGllcyBhcmUgY2FsbGVkIGFmdGVyIG9uZXMgd2l0aCBoaWdoZXIgcHJpb3JpdGllcy5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIEV2ZW50QnJva2VyLmFkZEV2ZW50TGlzdGVuZXJPbmNlKCdjaGFuZ2UnLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiB1c2luZyBhIGNvbnN0YW50IGV2ZW50IHR5cGUuXG4gICAgICogICAgIEV2ZW50QnJva2VyLmFkZEV2ZW50TGlzdGVuZXJPbmNlKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIC8vIFRoZSBldmVudCBwYXNzZWQgdG8gdGhlIG1ldGhvZCB3aWxsIGFsd2F5cyBiZSBhIEJhc2VFdmVudCBvYmplY3QuXG4gICAgICogICAgIENsYXNzTmFtZS5wcm90b3R5cGUuX2hhbmRsZXJNZXRob2QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgKiAgICAgfTtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJPbmNlKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgc2NvcGU6YW55LCBwcmlvcml0eTpudW1iZXIgPSAwKTp2b2lkXG4gICAge1xuICAgICAgICBFdmVudEJyb2tlci5fZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXJPbmNlKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzcGVjaWZpZWQgbGlzdGVuZXIgZnJvbSB0aGUgRXZlbnRCcm9rZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIEV2ZW50QnJva2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIEV2ZW50QnJva2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgc2NvcGU6YW55KTp2b2lkXG4gICAge1xuICAgICAgICBFdmVudEJyb2tlci5fZXZlbnREaXNwYXRjaGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHNjb3BlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaGVzIGFuIGV2ZW50IHdpdGhpbiB0aGUgRXZlbnRCcm9rZXIgb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gICAgICogQHBhcmFtIGV2ZW50IHtzdHJpbmd8QmFzZUV2ZW50fSBUaGUgRXZlbnQgb2JqZWN0IG9yIGV2ZW50IHR5cGUgc3RyaW5nIHlvdSB3YW50IHRvIGRpc3BhdGNoLlxuICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBUaGUgb3B0aW9uYWwgZGF0YSB5b3Ugd2FudCB0byBzZW5kIHdpdGggdGhlIGV2ZW50LiBEbyBub3QgdXNlIHRoaXMgcGFyYW1ldGVyIGlmIHlvdSBhcmUgcGFzc2luZyBpbiBhIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBFdmVudEJyb2tlci5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8gRXhhbXBsZTogU2VuZGluZyBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAqICAgICAgRXZlbnRCcm9rZXIuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJywge3NvbWU6ICdkYXRhJ30pO1xuICAgICAqXG4gICAgICogICAgICAvLyBFeGFtcGxlOiBTZW5kaW5nIGEgQmFzZUV2ZW50IG9yIGN1c3RvbSBldmVudCBvYmplY3QuXG4gICAgICogICAgICB2YXIgZXZlbnQgPSBuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5DSEFOR0UpO1xuICAgICAqICAgICAgZXZlbnQuZGF0YSA9IHtzb21lOiAnZGF0YSd9O1xuICAgICAqICAgICAgRXZlbnRCcm9rZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkaXNwYXRjaEV2ZW50KHR5cGU6YW55LCBkYXRhOmFueSA9IG51bGwpOnZvaWRcbiAgICB7XG4gICAgICAgIHZhciBldmVudDphbnkgPSB0eXBlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBldmVudCA9IG5ldyBCYXNlRXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnRhcmdldCA9IEV2ZW50QnJva2VyO1xuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gRXZlbnRCcm9rZXI7XG5cbiAgICAgICAgRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBFdmVudEJyb2tlciBoYXMgYSBzcGVjaWZpYyBldmVudCBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIG1ldGhvZCB0byBjYWxsLlxuICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcHVibGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIEV2ZW50QnJva2VyLmhhc0V2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBoYXNFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgc2NvcGU6YW55KTpib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBzY29wZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgc3RyaW5nIG91dHB1dCBvZiBldmVudCBsaXN0ZW5lcnMgZm9yIGEgZ2l2ZW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRFdmVudExpc3RlbmVyc1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiBAc3RhdGljXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBFdmVudEJyb2tlci5nZXRFdmVudExpc3RlbmVycygpO1xuICAgICAqXG4gICAgICogICAgICAvLyBbQ2xhc3NOYW1lXSBpcyBsaXN0ZW4gZm9yICdCYXNlRXZlbnQuY2hhbmdlJyBldmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldEV2ZW50TGlzdGVuZXJzKCk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5nZXRFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxufVxuXG5leHBvcnQgPSBFdmVudEJyb2tlcjtcbiIsImltcG9ydCBPYmplY3RNYW5hZ2VyID0gcmVxdWlyZSgnLi4vT2JqZWN0TWFuYWdlcicpO1xuaW1wb3J0IEJhc2VFdmVudCA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG5cbi8qKlxuICogRXZlbnREaXNwYXRjaGVyIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY2xhc3NlcyB0aGF0IGRpc3BhdGNoIGV2ZW50cy4gSXQgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICogRXZlbnREaXNwYXRjaGVyIHByb3ZpZGVzIG1ldGhvZHMgZm9yIG1hbmFnaW5nIHByaW9yaXRpemVkIHF1ZXVlcyBvZiBldmVudCBsaXN0ZW5lcnMgYW5kIGRpc3BhdGNoaW5nIGV2ZW50cy5cbiAqXG4gKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXG4gKiBAZXh0ZW5kcyBPYmplY3RNYW5hZ2VyXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIGV2ZW50XG4gKiBAcmVxdWlyZXMgRXh0ZW5kXG4gKiBAcmVxdWlyZXMgT2JqZWN0TWFuYWdlclxuICogQHJlcXVpcmVzIEJhc2VFdmVudFxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBleGFtcGxlXG4gKiAgICAgIC8vIEV4dGVuZGluZyBFdmVudERpc3BhdGNoZXIuIFNlZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGFzIGFuIGV4YW1wbGUgdGhhdCBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlci5cbiAqICAgICAgdmFyIF9zdXBlciA9IEV4dGVuZChDbGFzc0V4dGVuZGluZ0V2ZW50RGlzcGF0Y2hlciwgRXZlbnREaXNwYXRjaGVyKTtcbiAqXG4gKiAgICAgIC8vIEFub3RoZXIgd2F5IHRvIHVzZSB0aGUgRXZlbnREaXNwYXRjaGVyLlxuICogICAgICB2YXIgZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICogICAgICBldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAqICAgICAgZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoJ2NoYW5nZScpO1xuICovXG5jbGFzcyBFdmVudERpc3BhdGNoZXIgZXh0ZW5kcyBPYmplY3RNYW5hZ2VyXG57XG4gICAgLyoqXG4gICAgICogSG9sZHMgYSByZWZlcmVuY2UgdG8gYWRkZWQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IF9saXN0ZW5lcnNcbiAgICAgKiBAdHlwZSB7QXJyYXkuPGFueT59XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfbGlzdGVuZXJzOkFycmF5PGFueT4gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyBhIGNoaWxkIG9iamVjdC4gVXNlcyB0aGUgcGFyZW50IHByb3BlcnR5XG4gICAgICogdG8gc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggdG8gZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XG4gICAgICogbGlzdCBoaWVyYXJjaHkgYW5kIGhlbHBzIGZhY2lsaXRhdGUgZXZlbnQgYnViYmxpbmcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgcGFyZW50XG4gICAgICogQHR5cGUge2FueX1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHVibGljIHBhcmVudDphbnkgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb2JqZWN0IHdpdGggYW4gRXZlbnREaXNwYXRjaGVyIG9iamVjdCBzbyB0aGUgbGlzdGVuZXIgcmVjZWl2ZXMgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBldmVudC4gVGhpcyBmdW5jdGlvbiBtdXN0IGFjY2VwdCBhbiBFdmVudCBvYmplY3QgYXMgaXRzIG9ubHkgcGFyYW1ldGVyIGFuZCBtdXN0IHJldHVybiBub3RoaW5nLCBhcyB0aGlzIGV4YW1wbGUgc2hvd3MuIEBleGFtcGxlIGZ1bmN0aW9uKGV2ZW50OkV2ZW50KTp2b2lkXG4gICAgICogQHBhcmFtIHNjb3BlIHthbnl9IEJpbmRzIHRoZSBzY29wZSB0byBhIHBhcnRpY3VsYXIgb2JqZWN0IChzY29wZSBpcyBiYXNpY2FsbHkgd2hhdCBcInRoaXNcIiByZWZlcnMgdG8gaW4geW91ciBmdW5jdGlvbikuIFRoaXMgY2FuIGJlIHZlcnkgdXNlZnVsIGluIEphdmFTY3JpcHQgYmVjYXVzZSBzY29wZSBpc24ndCBnZW5lcmFsbHkgbWFpbnRhaW5lZC5cbiAgICAgKiBAcGFyYW0gW3ByaW9yaXR5PTBdIHtpbnR9IEluZmx1ZW5jZXMgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBsaXN0ZW5lcnMgYXJlIGNhbGxlZC4gTGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdGllcyBhcmUgY2FsbGVkIGFmdGVyIG9uZXMgd2l0aCBoaWdoZXIgcHJpb3JpdGllcy5cbiAgICAgKiBAcHVibGljXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgKlxuICAgICAqICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5oYW5kbGVyTWV0aG9kID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0ICsgXCIgc2VudCB0aGUgZXZlbnQuXCIpO1xuICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIGV2ZW50LmRhdGEpO1xuICAgICAqICAgICAgfVxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgc2NvcGU6YW55LCBwcmlvcml0eTpudW1iZXIgPSAwKTpFdmVudERpc3BhdGNoZXJcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIGFzc29jaWF0ZWQgdHlwZSB2YWx1ZSB0aGF0IGlzIHBhc3NlZCBpbi5cbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGlmIChsaXN0ID09IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElmIGEgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgZG8gbm90IGV4aXN0IGZvciB0aGUgdHlwZSB2YWx1ZSBwYXNzZWQgaW4gdGhlbiBjcmVhdGUgYSBuZXcgZW1wdHkgYXJyYXkuXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBsaXN0ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4Om51bWJlciA9IDA7XG4gICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIGk6bnVtYmVyID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWkgPiAtMSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci5zY29wZSA9PT0gc2NvcGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNhbWUgY2FsbGJhY2sgYW5kIHNjb3BlIGFyZSBmb3VuZCB0aGVuIHJlbW92ZSBpdCBhbmQgYWRkIHRoZSBjdXJyZW50IG9uZSBiZWxvdy5cbiAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwICYmIGxpc3RlbmVyLnByaW9yaXR5IDwgcHJpb3JpdHkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBsaXN0IGFycmF5IGF0IHRoZSBpbmRleCB2YWx1ZS5cbiAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDAsIHtjYWxsYmFjazogY2FsbGJhY2ssIHNjb3BlOiBzY29wZSwgcHJpb3JpdHk6IHByaW9yaXR5LCBvbmNlOiBmYWxzZX0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvYmplY3Qgb25jZSB3aXRoIGFuIEV2ZW50RGlzcGF0Y2hlciBvYmplY3Qgc28gdGhlIGxpc3RlbmVyIHdpbGwgcmVjZWl2ZSB0aGUgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyT25jZVxuICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoaXMgZnVuY3Rpb24gbXVzdCBhY2NlcHQgYW4gRXZlbnQgb2JqZWN0IGFzIGl0cyBvbmx5IHBhcmFtZXRlciBhbmQgbXVzdCByZXR1cm4gbm90aGluZywgYXMgdGhpcyBleGFtcGxlIHNob3dzLiBAZXhhbXBsZSBmdW5jdGlvbihldmVudDpFdmVudCk6dm9pZFxuICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBCaW5kcyB0aGUgc2NvcGUgdG8gYSBwYXJ0aWN1bGFyIG9iamVjdCAoc2NvcGUgaXMgYmFzaWNhbGx5IHdoYXQgXCJ0aGlzXCIgcmVmZXJzIHRvIGluIHlvdXIgZnVuY3Rpb24pLiBUaGlzIGNhbiBiZSB2ZXJ5IHVzZWZ1bCBpbiBKYXZhU2NyaXB0IGJlY2F1c2Ugc2NvcGUgaXNuJ3QgZ2VuZXJhbGx5IG1haW50YWluZWQuXG4gICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyT25jZShCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLmhhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgICBDbGFzc05hbWUucHJvdG90eXBlLmhhbmRsZXJNZXRob2QgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQgKyBcIiBzZW50IHRoZSBldmVudC5cIik7XG4gICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgZXZlbnQuZGF0YSk7XG4gICAgICogICAgICB9XG4gICAgICovXG4gICAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXJPbmNlKHR5cGU6c3RyaW5nLCBjYWxsYmFjazpGdW5jdGlvbiwgc2NvcGU6YW55LCBwcmlvcml0eTpudW1iZXIgPSAwKTpFdmVudERpc3BhdGNoZXJcbiAgICB7XG4gICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgdGhlIG5vcm1hbCB3YXkuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KTtcblxuICAgICAgICAvLyBHZXQgdGhlIGV2ZW50IGxpc3RlbmVycyB3ZSBqdXN0IGFkZGVkLlxuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdFswXTtcblxuICAgICAgICAvLyBDaGFuZ2UgdGhlIHZhbHVlIHRvIHRydWUgc28gaXQgd2lsbCBiZSByZW1vdmUgYWZ0ZXIgZGlzcGF0Y2hFdmVudCBpcyBjYWxsZWQuXG4gICAgICAgIGxpc3RlbmVyLm9uY2UgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBzcGVjaWZpZWQgbGlzdGVuZXIgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBvYmplY3QgdG8gcmVtb3ZlLlxuICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdCB0byBiZSByZW1vdmVkLlxuICAgICAqIEBoaWRlIFRoaXMgd2FzIGFkZGVkIGJlY2F1c2UgaXQgd2FzIG5lZWRlZCBmb3IgdGhlIHt7I2Nyb3NzTGluayBcIkV2ZW50QnJva2VyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLiBUbyBrZWVwIHRoaW5ncyBjb25zaXN0ZW50IHRoaXMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgKlxuICAgICAqICAgICAgQ2xhc3NOYW1lLnByb3RvdHlwZS5faGFuZGxlck1ldGhvZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAqICAgICAgfTtcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24sIHNjb3BlOmFueSk6RXZlbnREaXNwYXRjaGVyXG4gICAge1xuICAgICAgICAvLyBHZXQgdGhlIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJzIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUgdGhhdCBpcyBwYXNzZWQgaW4uXG4gICAgICAgIHZhciBsaXN0OkFycmF5PGFueT4gPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgIGlmIChsaXN0ICE9PSB2b2lkIDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoLS1pID4gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNhbGxiYWNrIGFuZCBzY29wZSBhcmUgdGhlIHNhbWUgdGhlbiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgICAgICAgICAgICAgIGlmIChsaXN0W2ldLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0W2ldLnNjb3BlID09PSBzY29wZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiA8cD5EaXNwYXRjaGVzIGFuIGV2ZW50IGludG8gdGhlIGV2ZW50IGZsb3cuIFRoZSBldmVudCB0YXJnZXQgaXMgdGhlIEV2ZW50RGlzcGF0Y2hlciBvYmplY3QgdXBvbiB3aGljaCB0aGUgZGlzcGF0Y2hFdmVudCgpIG1ldGhvZCBpcyBjYWxsZWQuPC9wPlxuICAgICAqXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gICAgICogQHBhcmFtIGV2ZW50IHtzdHJpbmd8QmFzZUV2ZW50fSBUaGUgRXZlbnQgb2JqZWN0IG9yIGV2ZW50IHR5cGUgc3RyaW5nIHlvdSB3YW50IHRvIGRpc3BhdGNoLiBZb3UgY2FuIGNyZWF0ZSBjdXN0b20gZXZlbnRzLCB0aGUgb25seSByZXF1aXJlbWVudCBpcyBhbGwgZXZlbnRzIG11c3QgZXh0ZW5kIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF0ge2FueX0gVGhlIG9wdGlvbmFsIGRhdGEgeW91IHdhbnQgdG8gc2VuZCB3aXRoIHRoZSBldmVudC4gRG8gbm90IHVzZSB0aGlzIHBhcmFtZXRlciBpZiB5b3UgYXJlIHBhc3NpbmcgaW4gYSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgKlxuICAgICAqICAgICAgLy8gRXhhbXBsZTogU2VuZGluZyBkYXRhIHdpdGggdGhlIGV2ZW50OlxuICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICpcbiAgICAgKiAgICAgIC8vIEV4YW1wbGU6IFdpdGggYW4gZXZlbnQgb2JqZWN0XG4gICAgICogICAgICAvLyAoZXZlbnQgdHlwZSwgYnViYmxpbmcgc2V0IHRvIHRydWUsIGNhbmNlbGFibGUgc2V0IHRvIHRydWUgYW5kIHBhc3NpbmcgZGF0YSkgOlxuICAgICAqICAgICAgdmFyIGV2ZW50ID0gbmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFLCB0cnVlLCB0cnVlLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICogICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAqXG4gICAgICogICAgICAvLyBIZXJlIGlzIGEgY29tbW9uIGlubGluZSBldmVudCBvYmplY3QgYmVpbmcgZGlzcGF0Y2hlZDpcbiAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5DSEFOR0UpKTtcbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzcGF0Y2hFdmVudCh0eXBlOmFueSwgZGF0YTphbnkgPSBudWxsKTpFdmVudERpc3BhdGNoZXJcbiAgICB7XG4gICAgICAgIHZhciBldmVudCA9IHR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50ID0gbmV3IEJhc2VFdmVudCh0eXBlLCBmYWxzZSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgbnVsbCB0aGVuIHNldCBpdCB0byB0aGUgb2JqZWN0IHRoYXQgZGlzcGF0Y2hlZCB0aGUgZXZlbnQuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gbnVsbClcbiAgICAgICAge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVyIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUuXG4gICAgICAgIHZhciBsaXN0OkFycmF5PGFueT4gPSB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV07XG4gICAgICAgIGlmIChsaXN0ICE9PSB2b2lkIDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBpOm51bWJlciA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyOmFueTtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGJyZWFrIG91dCBvZiB0aGUgd2hpbGUgbG9vcC5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSA9PT0gdHJ1ZSAmJiBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnNjb3BlLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb25jZSB2YWx1ZSBpcyB0cnVlIHdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciByaWdodCBhZnRlciB0aGlzIGNhbGxiYWNrIHdhcyBjYWxsZWQuXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UgPT09IHRydWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQudHlwZSwgbGlzdGVuZXIuY2FsbGJhY2ssIGxpc3RlbmVyLnNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL0Rpc3BhdGNoZXMgdXAgdGhlIGNoYWluIG9mIGNsYXNzZXMgdGhhdCBoYXZlIGEgcGFyZW50LlxuICAgICAgICBpZiAodGhpcy5wYXJlbnQgIT0gbnVsbCAmJiBldmVudC5idWJibGVzID09PSB0cnVlKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc1Byb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGRvbid0IGRpc3BhdGNoIHRoZSBldmVudCBvbiB0aGUgcGFyZW50IG9iamVjdC5cbiAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlID09PSB0cnVlICYmIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID09PSB0cnVlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBc3NpZ24gdGhlIGN1cnJlbnQgb2JqZWN0IHRoYXQgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcgdGhlIGV2ZW50IChpLmUuIGJ1YmJsaW5nIGF0KSBpbiB0aGUgZGlzcGxheSBsaXN0IGhpZXJhcmNoeS5cbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBQYXNzIHRoZSBldmVudCB0byB0aGUgcGFyZW50IChldmVudCBidWJibGluZykuXG4gICAgICAgICAgICB0aGlzLnBhcmVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBzcGVjaWZpYyBldmVudCBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIG1ldGhvZCB0byBjYWxsLlxuICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdGhpcy5oYXNFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuaGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICovXG4gICAgcHVibGljIGhhc0V2ZW50TGlzdGVuZXIodHlwZTpzdHJpbmcsIGNhbGxiYWNrOkZ1bmN0aW9uLCBzY29wZTphbnkpOmJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbdHlwZV0gIT09IHZvaWQgMClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyOmFueTtcbiAgICAgICAgICAgIHZhciBudW1PZkNhbGxiYWNrczpudW1iZXIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbnVtT2ZDYWxsYmFja3M7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXVtpXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnNjb3BlID09PSBzY29wZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBzdHJpbmcgb3V0cHV0IG9mIGV2ZW50IGxpc3RlbmVycyBmb3IgYSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldEV2ZW50TGlzdGVuZXJzXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdGhpcy5nZXRFdmVudExpc3RlbmVycygpO1xuICAgICAqXG4gICAgICogICAgICAvLyBbQ2xhc3NOYW1lXSBpcyBsaXN0ZW5pbmcgZm9yIHRoZSAnQmFzZUV2ZW50LmNoYW5nZScgZXZlbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldEV2ZW50TGlzdGVuZXJzKCk6c3RyaW5nXG4gICAge1xuICAgICAgICB2YXIgc3RyOnN0cmluZyA9ICcnO1xuICAgICAgICB2YXIgbnVtT2ZDYWxsYmFja3M6bnVtYmVyO1xuICAgICAgICB2YXIgbGlzdGVuZXI6YW55O1xuXG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5fbGlzdGVuZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgICBudW1PZkNhbGxiYWNrcyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBudW1PZkNhbGxiYWNrczsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnNjb3BlICYmICh0eXBlb2YgbGlzdGVuZXIuc2NvcGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID09PSAnZnVuY3Rpb24nKSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnWycgKyBsaXN0ZW5lci5zY29wZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICddJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdbVW5rbm93bl0nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN0ciArPSBcIiBpcyBsaXN0ZW4gZm9yICdcIiArIHR5cGUgKyBcIicgZXZlbnQuXFxuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIEJhc2VPYmplY3QuZGVzdHJveVxuICAgICAqL1xuICAgIHB1YmxpYyBkZXN0cm95KCk6dm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgPSBFdmVudERpc3BhdGNoZXI7XG4iLCJpbXBvcnQgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuXG52YXIgJGV2ZW50TGlzdGVuZXIgPSAkO1xuXG4vKipcbiAqIEEgYmluZCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBiaW5kIG1ldGhvZC5cbiAqL1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZClcbntcbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChvVGhpcylcbiAgICB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1IGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgICAgICBmTk9QID0gZnVuY3Rpb24gKClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmQm91bmQgPSBmdW5jdGlvbiAoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QICYmIG9UaGlzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDogb1RoaXMsXG4gICAgICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgICAgIHJldHVybiBmQm91bmQ7XG4gICAgfTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBoYXNoIHN0cmluZyBmcm9tIHRoZSBzdHJpbmcgYmVpbmcgcGFzc2VkIGluLiBJbiB0aGlzIGNhc2UgaXQgaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhc3RlZCBhcyBzdHJpbmcgdmFsdWUuXG4gKlxuICogQHBhcmFtIHN0clxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xudmFyIGhhc2hDb2RlID0gZnVuY3Rpb24gKHN0cilcbntcbiAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICAvLyBodHRwOi8vZXJseWNvZGVyLmNvbS80OS9qYXZhc2NyaXB0LWhhc2gtZnVuY3Rpb25zLXRvLWNvbnZlcnQtc3RyaW5nLWludG8taW50ZWdlci1oYXNoLVxuICAgIHZhciBjaGFyYWN0ZXI7XG4gICAgdmFyIGhhc2ggPSBudWxsO1xuICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuXG4gICAgaWYgKHN0ckxlbmd0aCA9PSAwKSByZXR1cm4gaGFzaDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyTGVuZ3RoOyBpKyspXG4gICAge1xuICAgICAgICBjaGFyYWN0ZXIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcmFjdGVyO1xuICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cblxuICAgIHJldHVybiBTdHJpbmcoTWF0aC5hYnMoaGFzaCkpO1xufTtcblxuLyoqXG4gKiBUaGUgalF1ZXJ5IGFkZEV2ZW50TGlzdGVuZXIgcGx1Z2luXG4gKi9cbiRldmVudExpc3RlbmVyLmZuLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBzY29wZSlcbntcbiAgICB2YXIgX2NhbGxiYWNrO1xuICAgIHZhciBfc2NvcGU7XG4gICAgdmFyIF9oYW5kbGVyO1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aClcbiAgICB7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgX3Njb3BlID0gZGF0YTtcbiAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgIHRoaXMub24odHlwZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIF9jYWxsYmFjayA9IGRhdGE7XG4gICAgICAgICAgICBfc2NvcGUgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgIHRoaXMub24odHlwZSwgc2VsZWN0b3IsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICBfY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIF9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV0gPSBfY2FsbGJhY2suYmluZChfc2NvcGUpO1xuICAgICAgICAgICAgdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgZGF0YSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pRdWVyeSBhZGRFdmVudExpc3RlbmVyIHBsdWdpbiByZXF1aXJlcyBhdCBsZWFzdCAzIGFyZ3VtZW50cy4nKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVGhlIGpRdWVyeSByZW1vdmVFdmVudExpc3RlbmVyIHBsdWdpblxuICovXG4kZXZlbnRMaXN0ZW5lci5mbi5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaywgc2NvcGUpXG57XG4gICAgdmFyIF9jYWxsYmFjaztcbiAgICB2YXIgX3Njb3BlO1xuICAgIHZhciBfaGFuZGxlcjtcblxuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aClcbiAgICB7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgX3Njb3BlID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXTtcbiAgICAgICAgICAgIHRoaXMub2ZmKHR5cGUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBfc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldO1xuICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignalF1ZXJ5IHJlbW92ZUV2ZW50TGlzdGVuZXIgcGx1Z2luIHJlcXVpcmVzIGF0IGxlYXN0IDMgYXJndW1lbnRzLicpXG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cbmV4cG9ydCA9ICRldmVudExpc3RlbmVyO1xuIiwiaW1wb3J0IERpc3BsYXlPYmplY3RDb250YWluZXIgPSByZXF1aXJlKCcuLi9kaXNwbGF5L0Rpc3BsYXlPYmplY3RDb250YWluZXInKTtcbmltcG9ydCBEaXNwbGF5T2JqZWN0ID0gcmVxdWlyZSgnLi4vZGlzcGxheS9EaXNwbGF5T2JqZWN0Jyk7XG5pbXBvcnQgVXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvVXRpbCcpO1xuXG5cbi8qKlxuICogQSBoZWxwZXIgY2xhc3MgdG8gY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlcyBvZiB0aGUgc2FtZSBDb21wb25lbnQgQ2xhc3MgZnJvbSBqUXVlcnkgb2JqZWN0IHRoYXQgaGFzIG9uZSBvciBtb3JlIGVsZW1lbnRzIGluIGl0LlxuICpcbiAqIEBjbGFzcyBDb21wb25lbnRGYWN0b3J5XG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHV0aWxcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICogQHN0YXRpY1xuICovXG5jbGFzcyBDb21wb25lbnRGYWN0b3J5XG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQ29tcG9uZW50RmFjdG9yeV0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBDb21wb25lbnRGYWN0b3J5IGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBqUXVlcnkgb2JqZWN0IHRoYXQgaGFzIG9uZSBvciBtb3JlIGVsZW1lbnRzIGluIGl0IGFuZCBwYXNzZXMgYSBzaW5nbGUgalF1ZXJ5IGVsZW1lbnQgaW50byB0aGUgY29uc3RydWN0b3Igb2YgdGhlIGNsYXNzIHRoYXQgaXMgYWxzbyBiZWluZyBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSAkZWxlbWVudCB7alF1ZXJ5fSBPbmUgb3IgbW9yZSBqUXVlcnkgcmVmZXJlbmNlZCBET00gZWxlbWVudHMuXG4gICAgICogQHBhcmFtIENvbXBvbmVudENsYXNzIHthbnl9IFRoZSBjbGFzcyB0aGF0IHlvdSB3YW50IGluc3RhbnRpYXRlZC5cbiAgICAgKiBAcGFyYW0gW3Njb3BlPW51bGxdIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBUaGlzIHNjb3BlIChwYXJlbnQgb2JqZWN0KSBpcyBuZWVkZWQgdG8gaW5zdGFudGlhdGUgdGhlIGNvbXBvbmVudC92aWV3IHdpdGggdGhlIHVzZSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lci9hZGRDaGlsZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIGEgbGlzdCBvZiBpbnN0YW50aWF0ZWQgY29tcG9uZW50cy92aWV3cyBzbyB5b3UgY2FuIG1hbmFnZSB0aGVtIHdpdGhpbiB0aGUgQ2xhc3MgdGhhdCBjcmVhdGVkIHRoZW0uXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgQ29tcG9uZW50RmFjdG9yeS5jcmVhdGUoJCgnLmpzLWxpc3QnKSwgU29tZUNsYXNzLCB0aGlzKTtcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAoJGVsZW1lbnRzOkpRdWVyeSwgQ29tcG9uZW50Q2xhc3M6YW55LCBzY29wZTpEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gbnVsbCk6QXJyYXk8YW55PlxuICAgIHtcbiAgICAgICAgdmFyIGxpc3Q6QXJyYXk8RGlzcGxheU9iamVjdD4gPSBbXTtcbiAgICAgICAgdmFyIGNvbXBvbmVudDpEaXNwbGF5T2JqZWN0O1xuICAgICAgICB2YXIgJGVsZW1lbnQ6SlF1ZXJ5O1xuICAgICAgICB2YXIgbGVuZ3RoOm51bWJlciA9ICRlbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciB0eXBlczphbnk7XG4gICAgICAgIHZhciBjb21wb25lbnROYW1lOnN0cmluZztcblxuICAgICAgICBmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW5ndGg7IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgJGVsZW1lbnQgPSAkZWxlbWVudHMuZXEoaSk7XG4gICAgICAgICAgICB0eXBlcyA9ICRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVzID09PSB2b2lkIDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgaWYgdGhlcmUgaXMgbm90IGEgJ2RhdGEtc2pzLXR5cGUnIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ2RhdGEtc2pzLXR5cGUnIGF0dHJpYnV0ZSB0aGVuIGdldCB0aGUgdHlwZShzKS5cbiAgICAgICAgICAgICAgICB0eXBlcyA9IHR5cGVzLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IFV0aWwuZ2V0TmFtZShDb21wb25lbnRDbGFzcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IGNyZWF0ZSB0aGUgY29tcG9uZW50IGlmIHRoZSBjb21wb25lbnQgdHlwZSBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAgICAgICAgICAgIGlmICh0eXBlcy5pbmRleE9mKGNvbXBvbmVudE5hbWUpID09PSAtMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGVscGVyIG1ldGhvZCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgX2NyZWF0ZUNvbXBvbmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2NyZWF0ZUNvbXBvbmVudCgkZWxlbWVudDpKUXVlcnksIENvbXBvbmVudENsYXNzOmFueSwgc2NvcGU6RGlzcGxheU9iamVjdENvbnRhaW5lcik6YW55IHtcbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRDbGFzcygkZWxlbWVudCk7XG5cbiAgICAgICAgLy8gSWYgdGhlIGNsYXNzIG9iamVjdCBoYXMgdGhlIHNqc0lkIHByb3BlcnR5IHRoZW4gSSBhbSBhc3N1bWluZyBpdCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgRGlzcGxheU9iamVjdCBjbGFzcy5cbiAgICAgICAgaWYgKHNjb3BlICE9PSBudWxsICYmIGNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgnc2pzSWQnKSA9PT0gdHJ1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgc2NvcGUuYWRkQ2hpbGQoY29tcG9uZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuXG59XG5cbmV4cG9ydCA9IENvbXBvbmVudEZhY3Rvcnk7IiwiLyoqXG4gKiBUaGUgU3RyaW5nVXRpbC4uLlxuICpcbiAqIEBjbGFzcyBTdHJpbmdVdGlsXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHV0aWxcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICogQHN0YXRpY1xuICovXG5jbGFzcyBTdHJpbmdVdGlsXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbU3RyaW5nVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBTdHJpbmdVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZXh0ZW5zaW9uIG5hbWUgb2ZmIHRoZSBzdHJpbmcgYmVpbmcgcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXRFeHRlbnNpb25cbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gd2l0aERvdCB7Ym9vbGVhbn0gSWYgeW91IHdhbnQgdGhlIHBlcmlvZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZXh0ZW5zaW9uIG5hbWUuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBTdHJpbmdVdGlsLmdldEV4dGVuc2lvbignZmlsZS5leGUnKTtcbiAgICAgKiAgICAgIC8vICdleGUnXG4gICAgICpcbiAgICAgKiAgICAgIFN0cmluZ1V0aWwuZ2V0RXh0ZW5zaW9uKCdmaWxlLmV4ZScsIHRydWUpO1xuICAgICAqICAgICAgLy8gJy5leGUnXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRFeHRlbnNpb24oZmlsZW5hbWU6c3RyaW5nLCB3aXRoRG90OmJvb2xlYW4gPSBmYWxzZSk6c3RyaW5nXG4gICAge1xuICAgICAgICB2YXIgbnVtOm51bWJlciA9ICh3aXRoRG90ID09PSB0cnVlKSA/IDAgOiAxO1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUuc2xpY2UoZmlsZW5hbWUubGFzdEluZGV4T2YoJy4nKSArIG51bSwgZmlsZW5hbWUubGVuZ3RoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIHNlbnRlbmNlIGNhc2Ugc3RyaW5nLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b1NlbnRlbmNlXG4gICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBbc2VwYXJhdG9yXSB7c3RyaW5nfSBDYW4gYmUgYW55IHN0cmluZyB5b3Ugd2FudCB0byB1c2UgYXMgYSBzZXBhcmF0b3IuXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBTdHJpbmdVdGlsLnRvU2VudGVuY2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICogICAgICAvLyAnbGl2ZSBkb3duIGJ5IHRoZSByaXZlcidcbiAgICAgKlxuICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICctJyk7XG4gICAgICogICAgICAvLyAnbGl2ZS1kb3duLWJ5LXRoZS1yaXZlcidcbiAgICAgKlxuICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICdfJyk7XG4gICAgICogICAgICAvLyAnbGl2ZV9kb3duX2J5X3RoZV9yaXZlcidcbiAgICAgKlxuICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICcvJyk7XG4gICAgICogICAgICAvLyAnbGl2ZS9kb3duL2J5L3RoZS9yaXZlcidcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvU2VudGVuY2Uoc3RyOnN0cmluZywgc2VwYXJhdG9yOnN0cmluZyA9ICcgJyk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHN0cilcbiAgICAgICAgICAgIC8vIEFkZCBhIHNwYWNlIGFmdGVyIGFueSBkaWdpdHMuXG4gICAgICAgICAgICAucmVwbGFjZSgvKFxcZCkvZywgJyQxICcpXG4gICAgICAgICAgICAvLyBBZGQgYSBzcGFjZSBiZWZvcmUgYW55IHVwcGVyIGNhc2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgIC5yZXBsYWNlKC8oW2Etel0oPz1bQS1aXSkpL2csICckMSAnKVxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBub24td29yZCBjaGFyYWN0ZXJzIGFuZCByZXBsYWNlIHdpdGggYSBzaW5nbGUgc3BhY2UuXG4gICAgICAgICAgICAucmVwbGFjZSgvW15hLXpBLVowLTkgXS9nLCAnICcpXG4gICAgICAgICAgICAvLyBSZXBsYWNlIG11bHRpcGxlIFNwYWNlcyB3aXRoIGEgc2luZ2xlIHNwYWNlLlxuICAgICAgICAgICAgLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKVxuICAgICAgICAgICAgLy8gVHJpbSB3aGl0ZXNwYWNlIGFyb3VuZCB0aGUgc3RyaW5nLlxuICAgICAgICAgICAgLnJlcGxhY2UoL14gfCAkL2csICcnKVxuICAgICAgICAgICAgLy8gTG93ZXIgY2FzZSB0aGUgZW50aXJlIHN0cmluZy5cbiAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAvLyBJZiBhIHNlcGFyYXRvciBpcyBwYXNzZWQgaW4gdGhlbiByZXBsYWNlIHRoZSBzcGFjZSB3aXRoIGl0LlxuICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgc2VwYXJhdG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIGNhbWVsIGNhc2Ugc3RyaW5nLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0NhbWVsQ2FzZVxuICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9DYW1lbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICogICAgICAvLyAnbGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9DYW1lbENhc2Uoc3RyOnN0cmluZyk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b1NlbnRlbmNlKHN0cilcbiAgICAgICAgICAgIC8vIFJlcGxhY2Ugc3BhY2VzIGJldHdlZW4gd29yZHMgd2l0aCBhIHN0cmluZyB1cHBlciBjYXNlZCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICAucmVwbGFjZSgvIChcXHcpL2csIGZ1bmN0aW9uIChfLCAkMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJDEudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgaHlwaGVuIHN0cmluZyB0byBhIHBhc2NhbCBjYXNlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdG9QYXNjYWxDYXNlXG4gICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgU3RyaW5nVXRpbC50b1Bhc2NhbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICogICAgICAvLyAnTGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9QYXNjYWxDYXNlKHN0cjpzdHJpbmcpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwudG9DYW1lbENhc2Uoc3RyKVxuICAgICAgICAgICAgLy8gTWFrZSBmaXJzdCBjaGFyYWN0ZXIgdXBwZXJjYXNlLlxuICAgICAgICAgICAgLnJlcGxhY2UoL15bYS16QS1aXS8sIGZ1bmN0aW9uIChhLCBiLCBjKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgY29uc3RhbnQgY2FzZSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHRvQ29uc3RhbnRDYXNlXG4gICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgU3RyaW5nVXRpbC50b0NvbnN0YW50Q2FzZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiKTtcbiAgICAgKiAgICAgIC8vICdMSVZFX0RPV05fQllfVEhFX1JJVkVSJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdG9Db25zdGFudENhc2Uoc3RyOnN0cmluZyk6c3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b1NlbnRlbmNlKHN0ciwgJ18nKVxuICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHVuaXZlcnNhbGx5IHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBjcmVhdGVVVUlEXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBTdHJpbmdVdGlsLmNyZWF0ZVVVSUQoKTtcbiAgICAgKiAgICAgIC8vICdhOTVkNzEzNC0zMzQyLTQwMDEtYmNlYS1jYzAzNzFiNzBkZWMnXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVVVUlEKCk6c3RyaW5nXG4gICAge1xuICAgICAgICB2YXIgdXVpZCA9ICgneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4JykucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYylcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwO1xuICAgICAgICAgICAgdmFyIHYgPSAoYyA9PSAneCcpID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBxdWVyeVN0cmluZ1RvT2JqZWN0XG4gICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIFt1c2VQYXJzZUZsb2F0PXRydWVdIHtib29sZWFufVxuICAgICAqIEByZXR1cm5zIHtPYmplY3R8TnVsbH1cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBTdHJpbmdVdGlsLnF1ZXJ5U3RyaW5nVG9PYmplY3QoJz9uYW1lPVJvYmVydCZhZ2U9MjMmZ2VuZGVyPW1hbGUnKTtcbiAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAyMywgZ2VuZGVyOiAnbWFsZSd9XG4gICAgICpcbiAgICAgKiAgICAgIFN0cmluZ1V0aWwucXVlcnlTdHJpbmdUb09iamVjdCgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScsIGZhbHNlKTtcbiAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAnMjMnLCBnZW5kZXI6ICdtYWxlJ31cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHF1ZXJ5U3RyaW5nVG9PYmplY3QocXVlcnlTdHJpbmc6c3RyaW5nLCB1c2VQYXJzZUZsb2F0OmJvb2xlYW4gPSB0cnVlKTphbnlcbiAgICB7XG4gICAgICAgIHZhciBwYXJhbXM6YW55ID0ge307XG4gICAgICAgIHZhciB0ZW1wOmFueSA9IG51bGw7XG5cbiAgICAgICAgdmFyIHN0cjpzdHJpbmcgPSBxdWVyeVN0cmluZy5zdWJzdHJpbmcocXVlcnlTdHJpbmcuaW5kZXhPZignPycpICsgMSk7XG5cbiAgICAgICAgaWYgKHN0ciA9PT0gJycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3BsaXQgaW50byBrZXkvdmFsdWUgcGFpcnNcbiAgICAgICAgdmFyIHF1ZXJpZXMgPSBzdHIuc3BsaXQoJyYnKTtcblxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBhcnJheSBvZiBzdHJpbmdzIGludG8gYW4gb2JqZWN0XG4gICAgICAgIHZhciBsZW46bnVtYmVyID0gcXVlcmllcy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRlbXAgPSBxdWVyaWVzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSAodXNlUGFyc2VGbG9hdCA9PT0gdHJ1ZSAmJiBpc05hTihwYXJzZUZsb2F0KHRlbXBbMV0pKSA9PT0gZmFsc2UpID8gcGFyc2VGbG9hdCh0ZW1wWzFdKSA6IHRlbXBbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgd2hpdGVzcGFjZSBmcm9tIHRoZSBzdHJpbmcgcGFzc2VkIGluLlxuICAgICAqXG4gICAgICogQG1ldGhvZCByZW1vdmVBbGxXaGl0ZXNwYWNlXG4gICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdmFyIHN0ciA9ICcgICBhIGIgICAgYyBkIGUgZiBnICc7XG4gICAgICogICAgICBTdHJpbmdVdGlsLnJlbW92ZUFsbFdoaXRlc3BhY2Uoc3RyKTtcbiAgICAgKiAgICAgIC8vICdhYmNkZWZnJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQWxsV2hpdGVzcGFjZShzdHI6c3RyaW5nKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2VcbiAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICB2YXIgc3RyID0gJyAgIGEgYiAgICBjIGQgZSBmIGcgJztcbiAgICAgKiAgICAgIFN0cmluZ1V0aWwucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZShzdHIpO1xuICAgICAqICAgICAgLy8gJ2EgYiAgICBjIGQgZSBmIGcnXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlKHN0cjpzdHJpbmcpOnN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8oXlxccyt8XFxzKyQpL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBtZXRob2QgdHJ1bmNhdGVcbiAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBsZW5ndGgge2ludH1cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFN0cmluZ1V0aWwudHJ1bmNhdGUoJ1JvYmVydCBpcyBjb29sIGFuZCBoZSBsaWtlcyBicnVzY2hldHRhLicsIDE0KSk7XG4gICAgICogICAgICAvLyAnUm9iZXJ0IGlzIGNvb2wuLi4nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0cnVuY2F0ZSh0ZXh0OnN0cmluZywgbGVuZ3RoOm51bWJlcik6c3RyaW5nXG4gICAge1xuICAgICAgICBpZiAodGV4dC5sZW5ndGggPD0gbGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cigwLCBsZW5ndGgpICsgJy4uLic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyBlYWNoIGZvcm1hdCBpdGVtIGluIGEgc3BlY2lmaWVkIHN0cmluZyB3aXRoIHRoZSB0ZXh0IGVxdWl2YWxlbnQgb2YgYSBjb3JyZXNwb25kaW5nIG9iamVjdCdzIHZhbHVlLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBmb3JtYXRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gLi4ucmVzdCB7QXJyYXkuPGFueT59XG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgU3RyaW5nVXRpbC5mb3JtYXQoJ1JvYmVydCBpcyB7MH0uIFZlcnkgezB9IGFuZCB7MX0hJywgJ2Nvb2wnLCAnc21hcnQnKTtcbiAgICAgKiAgICAgIC8vICdSb2JlcnQgaXMgY29vbC4gVmVyeSBjb29sIGFuZCBzbWFydCEnXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmb3JtYXQoc3RyOnN0cmluZywgLi4ucmVzdDpBcnJheTxhbnk+KTpzdHJpbmdcbiAgICB7XG4gICAgICAgIHZhciBsZW5ndGggPSByZXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIHZhbHVlOnN0cmluZyA9IHN0cjtcbiAgICAgICAgZm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKCdcXFxceycgKyBpICsgJ1xcXFx9JywgJ2dtJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVnLCByZXN0W2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGEgdmFsdWUgaW4gdGhlIHF1ZXJ5IHN0cmluZyBieSBpdHMga2V5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHBhcmFtUmVwbGFjZVxuICAgICAqIEBwYXJhbSBxdWVyeVN0cmluZ1xuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHJldHVybnMge3N0cmluZ3x2b2lkfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBTdHJpbmdVdGlsLnBhcmFtUmVwbGFjZSgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScsICdnZW5kZXInLCAnZmVtYWxlJyk7XG4gICAgICogICAgICAvLyAnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9ZmVtYWxlJ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgcGFyYW1SZXBsYWNlKHF1ZXJ5U3RyaW5nLCBuYW1lLCB2YWx1ZSlcbiAgICB7XG4gICAgICAgIC8vIEZpbmQgdGhlIHBhcmFtIHdpdGggcmVnZXhcbiAgICAgICAgLy8gR3JhYiB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZSByZXR1cm5lZCBzdHJpbmcgKHNob3VsZCBiZSA/IG9yICYpXG4gICAgICAgIC8vIFJlcGxhY2Ugb3VyIGhyZWYgc3RyaW5nIHdpdGggb3VyIG5ldyB2YWx1ZSwgcGFzc2luZyBvbiB0aGUgbmFtZSBhbmQgZGVsaW1pdGVyXG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIG5hbWUgKyAnPShbXiYjXSopJyk7XG4gICAgICAgIHZhciBkZWxpbWl0ZXIgPSByZS5leGVjKHF1ZXJ5U3RyaW5nKVswXS5jaGFyQXQoMCk7XG4gICAgICAgIHJldHVybiBxdWVyeVN0cmluZy5yZXBsYWNlKHJlLCBkZWxpbWl0ZXIgKyBuYW1lICsgJz0nICsgdmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0ID0gU3RyaW5nVXRpbDsiLCJpbXBvcnQgU3RyaW5nVXRpbCA9IHJlcXVpcmUoJy4vU3RyaW5nVXRpbCcpO1xuXG4vKipcbiAqIEEgaGVscGVyIGNsYXNzIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50IGFuZCBjb25zaXN0ZW50IHdheSB0byByZW5kZXIgdGVtcGxhdGVzLlxuICpcbiAqIEBjbGFzcyBUZW1wbGF0ZUZhY3RvcnlcbiAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAqIEBzdWJtb2R1bGUgdXRpbFxuICogQHJlcXVpcmVzIFN0cmluZ1V0aWxcbiAqIEByZXF1aXJlcyBIYW5kbGViYXJzXG4gKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAqIEBzdGF0aWNcbiAqL1xuY2xhc3MgVGVtcGxhdGVGYWN0b3J5XG57XG4gICAgLyoqXG4gICAgICogQSBjb25zdGFudCB2YWx1ZSBmb3IgdXNpbmcgVW5kZXJzY29yZSBvciBMb2Rhc2ggdGVtcGxhdGVzLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IFVOREVSU0NPUkVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAZmluYWxcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBVTkRFUlNDT1JFOnN0cmluZyA9ICd1bmRlcnNjb3JlJztcblxuICAgIC8qKlxuICAgICAqIEEgY29uc3RhbnQgdmFsdWUgZm9yIHVzaW5nIEhhbmRsZWJhcnMgdGVtcGxhdGVzLiBUaGlzIGlzIHRoZSBkZWZhdWx0IHRlbXBsYXRlIGVuZ2luZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBIQU5ETEVCQVJTXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQGZpbmFsXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgSEFORExFQkFSUzpzdHJpbmcgPSAnaGFuZGxlYmFycyc7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB0ZW1wbGF0ZSBlbmdpbmUgdHlwZSBmb3IgdGhpcyBUZW1wbGF0ZUZhY3RvcnkgY2xhc3MuIFRoZSBkZWZhdWx0IGlzIFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVFbmdpbmVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlRW5naW5lOnN0cmluZyA9IFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGdsb2JhbCBuYW1lc3BhY2UgZm9yIHByZS1jb21waWxlZCB0ZW1wbGF0ZXMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVOYW1lc3BhY2VcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBkZWZhdWx0ICdKU1QnXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlTmFtZXNwYWNlOnN0cmluZyA9ICdKU1QnO1xuXG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVGVtcGxhdGVGYWN0b3J5XSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIFRlbXBsYXRlRmFjdG9yeSBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSB0ZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlUGF0aCB7YW55fVxuICAgICAqIEBwYXJhbSBbZGF0YT1hbnldXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICBUZW1wbGF0ZUZhY3RvcnkuY3JlYXRlKCd0ZW1wbGF0ZU5hbWUnLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUodGVtcGxhdGVQYXRoOmFueSwgZGF0YTphbnkgPSBudWxsKTpzdHJpbmdcbiAgICB7XG4gICAgICAgIC8vQ2hlY2tzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgdG8gc2VlIGlmIGl0IGlzIGEgJy4nIG9yICcjJy5cbiAgICAgICAgdmFyIHJlZ2V4ID0gL14oWy4jXSkoLispLztcbiAgICAgICAgdmFyIHRlbXBsYXRlOnN0cmluZyA9IG51bGw7XG4gICAgICAgIHZhciBpc0Z1bmN0aW9uVGVtcGxhdGUgPSB0eXBlb2YgdGVtcGxhdGVQYXRoID09PSAnZnVuY3Rpb24nO1xuICAgICAgICB2YXIgaXNDbGFzc09ySWROYW1lOmJvb2xlYW4gPSByZWdleC50ZXN0KHRlbXBsYXRlUGF0aCk7XG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb25UZW1wbGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZVBhdGgoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNDbGFzc09ySWROYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgcG91bmQgc2lnbiBmcm9tIHRoZSBpZCBuYW1lLlxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoID0gdGVtcGxhdGVQYXRoLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIHZhciBodG1sU3RyaW5nOnN0cmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlUGF0aCkuaW5uZXJIVE1MO1xuICAgICAgICAgICAgaHRtbFN0cmluZyA9IFN0cmluZ1V0aWwucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZShodG1sU3RyaW5nKTtcblxuICAgICAgICAgICAgaWYgKFRlbXBsYXRlRmFjdG9yeS50ZW1wbGF0ZUVuZ2luZSA9PSBUZW1wbGF0ZUZhY3RvcnkuVU5ERVJTQ09SRSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBVbmRlcnNjb3JlIFRlbXBsYXRlOlxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZDpGdW5jdGlvbiA9IHdpbmRvd1snXyddLnRlbXBsYXRlKGh0bWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVNZXRob2QoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gSGFuZGxlYmFycyBUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZDpGdW5jdGlvbiA9IEhhbmRsZWJhcnMuY29tcGlsZShodG1sU3RyaW5nKTtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlTWV0aG9kKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlT2JqOk9iamVjdCA9IHdpbmRvd1tUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVOYW1lc3BhY2VdO1xuICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZU9iailcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm5zIG51bGwgYmVjYXVzZSB0aGUgdGVtcGxhdGUgbmFtZXNwYWNlIGlzIG5vdCBmb3VuZC5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlRnVuY3Rpb246RnVuY3Rpb24gPSB0ZW1wbGF0ZU9ialt0ZW1wbGF0ZVBhdGhdO1xuICAgICAgICAgICAgaWYgKHRlbXBsYXRlRnVuY3Rpb24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIHRlbXBsYXRlUGF0aCBnZXRzIGEgZnVuY3Rpb24gc3RvcmFnZSBpbiB0aGUgYXNzb2NpYXRpdmUgYXJyYXkuXG4gICAgICAgICAgICAgICAgLy8gV2UgY2FsbCB0aGUgZnVuY3Rpb24gYnkgcGFzc2luZyBpbiB0aGUgZGF0YSBhcyB0aGUgYXJndW1lbnQuXG4gICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZUZ1bmN0aW9uKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbn1cblxuZXhwb3J0ID0gVGVtcGxhdGVGYWN0b3J5OyIsIi8qKlxuICogQSBVdGlsaXR5IGNsYXNzIHRoYXQgaGFzIHNldmVyYWwgc3RhdGljIG1ldGhvZHMgdG8gYXNzaXN0IGluIGRldmVsb3BtZW50LlxuICpcbiAqIEBjbGFzcyBVdGlsXG4gKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gKiBAc3VibW9kdWxlIHV0aWxcbiAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICogQHN0YXRpY1xuICovXG5jbGFzcyBVdGlsXG57XG4gICAgLyoqXG4gICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGNvdW50IGZvciB0aGUgdW5pcXVlSWQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHByb3BlcnR5IF9pZENvdW50ZXJcbiAgICAgKiBAdHlwZSB7aW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIF9pZENvdW50ZXI6bnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignW1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gSWYgYSBwcmVmaXggaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB0byBpdC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdW5pcXVlSWRcbiAgICAgKiBAcGFyYW0gW3ByZWZpeF0ge3N0cmluZ30gVGhlIHN0cmluZyB2YWx1ZSB1c2VkIGZvciB0aGUgcHJlZml4LlxuICAgICAqIEByZXR1cm5zIHtpbml0fHN0cmluZ30gUmV0dXJucyB0aGUgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdmFyIHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgpO1xuICAgICAqICAgICAgLy8gMVxuICAgICAqXG4gICAgICogICAgICB2YXIgcHJvcGVydHkgPSBVdGlsLnVuaXF1ZUlkKCdwcmVmaXhOYW1lXycpO1xuICAgICAqICAgICAgLy8gcHJlZml4TmFtZV8xXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB1bmlxdWVJZChwcmVmaXg6c3RyaW5nID0gbnVsbCk6YW55XG4gICAge1xuICAgICAgICB2YXIgaWQ6bnVtYmVyID0gKytVdGlsLl9pZENvdW50ZXI7XG5cbiAgICAgICAgaWYgKHByZWZpeCAhPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHByZWZpeCArIGlkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0IG9mIHByb3BlcnRpZXMgZnJvbSBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdFxuICAgICAqIEBwYXJhbSBvYmplY3Qge09iamVjdH0gVGhlIG9iamVjdCB5b3Ugd2FudCB0byByZW1vdmUgcHJvcGVydGllcyBmcm9tLlxuICAgICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBBIHByb3BlcnR5IG5hbWUgb3IgYW4gYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgeW91IHdhbnQgdG8gcmVtb3ZlIGZyb20gdGhlIG9iamVjdC5cbiAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIHRoZSBvYmplY3QgcGFzc2VkIGluIHdpdGhvdXQgdGhlIHJlbW92ZWQgdGhlIHByb3BlcnRpZXMuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdmFyIG9iaiA9IHsgbmFtZTogJ1JvYmVydCcsIGdlbmRlcjogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAqXG4gICAgICogICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmosIFsncGhvbmUnLCAnZ2VuZGVyJ10pO1xuICAgICAqXG4gICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnIH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmplY3Q6YW55LCB2YWx1ZTphbnkpOmFueVxuICAgIHtcbiAgICAgICAgLy8gSWYgcHJvcGVydGllcyBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0IGFuIGFycmF5IG9iamVjdC5cbiAgICAgICAgdmFyIGxpc3Q6YW55ID0gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWUgOiBbdmFsdWVdO1xuXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgb2JqZWN0IHByb3BlcnRpZXMuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBrZXkgaXMgYSBwcm9wZXJ0eSBhbmQgbm90IGZ1bmN0aW9uLlxuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZTphbnkgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgYW4gQXJyYXkuXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIEFycmF5IGFuZCBjYWxsIHRoZSBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCBtZXRob2Qgb24gZWFjaCBvYmplY3QgaW4gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyYXk6QXJyYXk8YW55PiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCBpbiBhcnJheSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChhcnJheVtpbmRleF0sIGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QodmFsdWUsIGxpc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIGxpc3Qgb2YgcHJvcGVydHkgbmFtZS5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGlzdEluZGV4IGluIGxpc3QpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBrZXkocHJvcGVydHkgbmFtZSkgZXF1YWxzIHRoZSBwcm9wZXJ0eSBuYW1lIGluIHRoZSBsaXN0IGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gbGlzdFtsaXN0SW5kZXhdKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgcHJvcGVydHkgZnJvbSB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW5hbWVzIGEgcHJvcGVydHkgbmFtZSBvbiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbmFtZVByb3BlcnR5T25PYmplY3RcbiAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVuYW1lIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgKiBAcGFyYW0gb2xkTmFtZSB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBuZXdOYW1lIHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiByZW5hbWVkIHByb3BlcnRpZXMuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgdmFyIG9iaiA9IHsgbmFtZTogJ1JvYmVydCcsIGdlbmRlcjogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnJlbmFtZVByb3BlcnR5T25PYmplY3Qob2JqLCAnZ2VuZGVyJywgJ3NleCcpO1xuICAgICAqXG4gICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnLCBzZXg6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJlbmFtZVByb3BlcnR5T25PYmplY3Qob2JqZWN0OmFueSwgb2xkTmFtZTpzdHJpbmcsIG5ld05hbWU6c3RyaW5nKTphbnlcbiAgICB7XG4gICAgICAgIC8vIENoZWNrIGZvciB0aGUgb2xkIHByb3BlcnR5IG5hbWUgdG8gYXZvaWQgYSBSZWZlcmVuY2VFcnJvciBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShvbGROYW1lKSlcbiAgICAgICAge1xuICAgICAgICAgICAgb2JqZWN0W25ld05hbWVdID0gb2JqZWN0W29sZE5hbWVdO1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBjbG9uZSBvZiBhbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHBhcmFtIG9iaiB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB0byBjbG9uZS5cbiAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgY2xvbmUgb2JqZWN0IG9mIHRoZSBvbmUgcGFzc2VkIGluLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIHZhciBjbG9uZU9mT2JqZWN0ID0gVXRpbC5jbG9uZShvYmopO1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUob2JqOmFueSk6YW55XG4gICAge1xuXG4gICAgICAgIC8vb3RoZXIgc2NyaXB0czogaHR0cDovL2Rhdmlkd2Fsc2gubmFtZS9qYXZhc2NyaXB0LWNsb25lXG4gICAgICAgIC8vaHR0cDovL29yYW5sb29uZXkuY29tL2Z1bmN0aW9uYWwtamF2YXNjcmlwdC9cbiAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZGVlcC1jb3B5LWphdmFzY3JpcHQvXG5cblxuICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8ICdvYmplY3QnICE9IHR5cGVvZiBvYmopXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgRGF0ZVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGRhdGU6RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUob2JqLmdldFRpbWUoKSk7XG4gICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBBcnJheVxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhcnJheTpBcnJheTxhbnk+ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gVXRpbC5jbG9uZShvYmpbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIE9iamVjdFxuICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgY29weTphbnkgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1V0aWxdIFVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBudW1iZXIgdG8gYSBib29sZWFuLlxuICAgICAqXG4gICAgICogQG1ldGhvZCB0b0Jvb2xlYW5cbiAgICAgKiBAcGFyYW0gc3RyTnVtIHtzdHJpbmd8bnVtYmVyfVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKFwiVFJVRVwiKTtcbiAgICAgKiAgICAgIC8vIHRydWVcbiAgICAgKlxuICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oMCk7XG4gICAgICogICAgICAvLyBmYWxzZVxuICAgICAqXG4gICAgICogICAgICBVdGlsLnRvQm9vbGVhbih1bmRlZmluZWQpO1xuICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRvQm9vbGVhbihzdHJOdW06YW55KTpib29sZWFuXG4gICAge1xuICAgICAgICB2YXIgdmFsdWU6YW55ID0gKHR5cGVvZiBzdHJOdW0gPT09ICdzdHJpbmcnKSA/IHN0ck51bS50b0xvd2VyQ2FzZSgpIDogc3RyTnVtO1xuXG4gICAgICAgIHJldHVybiAodmFsdWUgPiAwIHx8IHZhbHVlID09ICd0cnVlJyB8fCB2YWx1ZSA9PSAneWVzJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TmFtZVxuICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIG9yIG9iamVjdC5cbiAgICAgKiBAc3RhdGljXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIHZhciBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICogICAgICBVdGlsLmdldE5hbWUoc29tZUNsYXNzKTsgICAgICAgICAgICAvLyAnU29tZUNsYXNzJ1xuICAgICAqXG4gICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gVGVzdCgpe30pOyAgICAvLyAnVGVzdCdcbiAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShmdW5jdGlvbiAoKXt9KTsgICAgICAgIC8vICdhbm9ueW1vdXMnXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXROYW1lKGNsYXNzT2JqZWN0OmFueSk6c3RyaW5nXG4gICAge1xuICAgICAgICB2YXIgdHlwZTpzdHJpbmcgPSB0eXBlb2YgY2xhc3NPYmplY3Q7XG4gICAgICAgIHZhciB2YWx1ZTpzdHJpbmc7XG4gICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4OlJlZ0V4cCA9IC9mdW5jdGlvbiAoW15cXChdKykvO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHJlc3VsdHM6UmVnRXhwRXhlY0FycmF5ID0gKDxhbnk+Y2xhc3NPYmplY3QpLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCk7XG4gICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGVsc2UgY29kZSBpcyBtYWlubHkgZm9yIEludGVybmV0IEV4cGxvcmUuXG4gICAgICAgICAgICB2YXIgaXNGdW5jdGlvbjpib29sZWFuID0gKHR5cGUgPT09ICdmdW5jdGlvbicpO1xuICAgICAgICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gZXhwbGFpbiB0aGlzXG4gICAgICAgICAgICB2YXIgbmFtZTphbnkgPSBpc0Z1bmN0aW9uICYmICgoY2xhc3NPYmplY3QubmFtZSAmJiBbJycsIGNsYXNzT2JqZWN0Lm5hbWVdKSB8fCAoPGFueT5jbGFzc09iamVjdCkudG9TdHJpbmcoKS5tYXRjaChmdW5jTmFtZVJlZ2V4KSk7XG5cbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSAmJiBuYW1lWzFdKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuYW1lWzFdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgZGVib3VuY2VkIHZlcnNpb24gb2YgdGhlIHBhc3NlZCBmdW5jdGlvbiB3aGljaCB3aWxsIHBvc3Rwb25lIGl0cyBleGVjdXRpb24gdW50aWwgYWZ0ZXJcbiAgICAgKiB3YWl0IG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSBpdCB3YXMgaW52b2tlZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGVib3VuY2VcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICogQHBhcmFtIHdhaXQge251bWJlcn0gTWlsbGlzZWNvbmRzIHRvIGVsYXBzZWQgYmVmb3JlIGludm9raW5nIHRoZSBjYWxsYmFjay5cbiAgICAgKiBAcGFyYW0gaW1tZWRpYXRlIHtib29sZWFufSBQYXNzIHRydWUgZm9yIHRoZSBpbW1lZGlhdGUgcGFyYW1ldGVyIHRvIGNhdXNlIGRlYm91bmNlIHRvIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZSBsZWFkaW5nIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHdhaXQgaW50ZXJ2YWwuIFVzZWZ1bCBpbiBjaXJjdW1zdGFuY2VzIGxpa2UgcHJldmVudGluZyBhY2NpZGVudGFsIGRvdWJsZS1jbGlja3Mgb24gYSBcInN1Ym1pdFwiIGJ1dHRvbiBmcm9tIGZpcmluZyBhIHNlY29uZCB0aW1lLlxuICAgICAqIEBwYXJhbSBjYWxsYmFja1Njb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICogQHB1YmxpY1xuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgVXRpbC5kZWJvdW5jZSh0aGlzLl9vbkJyZWFrcG9pbnRDaGFuZ2UsIDI1MCwgZmFsc2UsIHRoaXMpO1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGVib3VuY2UoY2FsbGJhY2s6RnVuY3Rpb24sIHdhaXQ6bnVtYmVyLCBpbW1lZGlhdGU6Ym9vbGVhbiwgY2FsbGJhY2tTY29wZTphbnkpOkZ1bmN0aW9uXG4gICAge1xuICAgICAgICB2YXIgdGltZW91dDphbnk7XG4gICAgICAgIHZhciByZXN1bHQ6YW55O1xuXG4gICAgICAgIHZhciBkZWJvdW5jZWQ6YW55ID0gZnVuY3Rpb24gKClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGFyZ3M6YW55ID0gYXJndW1lbnRzO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkKClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1tZWRpYXRlID09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGltZW91dClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpbW1lZGlhdGUgPT09IHRydWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKVxuICAgICAgICB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgICB9XG59XG5cbmV4cG9ydCA9IFV0aWw7Il19
