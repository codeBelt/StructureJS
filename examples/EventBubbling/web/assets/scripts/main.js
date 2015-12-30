(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayStage = require('structurejs/display/Stage');

var _structurejsDisplayStage2 = _interopRequireDefault(_structurejsDisplayStage);

var _structurejsEventBaseEvent = require('structurejs/event/BaseEvent');

var _structurejsEventBaseEvent2 = _interopRequireDefault(_structurejsEventBaseEvent);

var _structurejsEventEventBroker = require('structurejs/event/EventBroker');

var _structurejsEventEventBroker2 = _interopRequireDefault(_structurejsEventEventBroker);

var _viewsGrandparentView = require('./views/GrandparentView');

var _viewsGrandparentView2 = _interopRequireDefault(_viewsGrandparentView);

/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/

var EventBubblingApp = (function (_Stage) {
    _inherits(EventBubblingApp, _Stage);

    function EventBubblingApp() {
        _classCallCheck(this, EventBubblingApp);

        _get(Object.getPrototypeOf(EventBubblingApp.prototype), 'constructor', this).call(this);
        this._grandpaView = null;
        this._$clearButton = null;
        this._$stageMessage = null;
    }

    /**
     * @overridden EventBubblingApp.create
     */

    _createClass(EventBubblingApp, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(EventBubblingApp.prototype), 'create', this).call(this);

            this._grandpaView = new _viewsGrandparentView2['default'](this.$element.find('.js-grandparentView'));
            this.addChild(this._grandpaView);

            this._$clearButton = this.$element.find('.js-clearButton');
            this._$stageMessage = this.$element.find('.js-stageMessage');
        }

        /**
         * @overridden Stage.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return;
            }

            this.addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            _structurejsEventEventBroker2['default'].addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onGlobalEvent, this);

            this._$clearButton.addEventListener('click', this._onClearClick, this);

            this._grandpaView.enable();

            _get(Object.getPrototypeOf(EventBubblingApp.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden Stage.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return;
            }

            this.removeEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            this._$clearButton.removeEventListener('click', this._onClearClick, this);

            this._grandpaView.disable();

            _get(Object.getPrototypeOf(EventBubblingApp.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden Stage.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this._$stageMessage.text('');
            this._grandpaView.layout();
        }

        /**
         * @overridden Stage.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this._grandpaView.destroy();

            _get(Object.getPrototypeOf(EventBubblingApp.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

    }, {
        key: '_onClearClick',
        value: function _onClearClick(event) {
            this.layout();
        }
    }, {
        key: '_onBubbled',
        value: function _onBubbled(baseEvent) {
            var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
            text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
            text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

            this._$stageMessage.html(text);
        }
    }, {
        key: '_onGlobalEvent',
        value: function _onGlobalEvent(baseEvent) {
            console.log("Global event dispatched", baseEvent);
        }
    }]);

    return EventBubblingApp;
})(_structurejsDisplayStage2['default']);

exports['default'] = EventBubblingApp;
module.exports = exports['default'];

},{"./views/GrandparentView":4,"structurejs/display/Stage":11,"structurejs/event/BaseEvent":12,"structurejs/event/EventBroker":13}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var app = new _App2['default']();
app.appendTo('body'); // Need to specify what area our code has control over.
// The App.js class extends Stage which has the appendTo method.

},{"./App":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

var _structurejsEventBaseEvent = require('structurejs/event/BaseEvent');

var _structurejsEventBaseEvent2 = _interopRequireDefault(_structurejsEventBaseEvent);

var _structurejsEventEventBroker = require('structurejs/event/EventBroker');

var _structurejsEventEventBroker2 = _interopRequireDefault(_structurejsEventEventBroker);

/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/

var ChildView = (function (_DOMElement) {
    _inherits(ChildView, _DOMElement);

    function ChildView($element) {
        _classCallCheck(this, ChildView);

        _get(Object.getPrototypeOf(ChildView.prototype), 'constructor', this).call(this, $element);
        this._$dispatchButton = null;
        this._$sonMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(ChildView, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(ChildView.prototype), 'create', this).call(this);

            this._$dispatchButton = this.$element.find('.js-dispatchButton');

            this._$sonMessage = this.$element.find('.js-childView-message');

            this._$checkbox = this.$element.find('[type=checkbox]').first();
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) return;

            this._$dispatchButton.addEventListener('click', this._onButtonClick, this);

            _get(Object.getPrototypeOf(ChildView.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) return;

            this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);

            _get(Object.getPrototypeOf(ChildView.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this._$sonMessage.text('');
            this._$checkbox.prop('checked', false);
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {

            _get(Object.getPrototypeOf(ChildView.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

    }, {
        key: '_onButtonClick',
        value: function _onButtonClick(event) {
            event.preventDefault();

            var text = '<strong>' + this.getQualifiedClassName() + '</strong> sent the event.';

            this._$sonMessage.html(text);

            this.dispatchEvent(new _structurejsEventBaseEvent2['default'](_structurejsEventBaseEvent2['default'].CHANGE, true, true));
            _structurejsEventEventBroker2['default'].dispatchEvent(new _structurejsEventBaseEvent2['default'](_structurejsEventBaseEvent2['default'].CHANGE));
        }
    }]);

    return ChildView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = ChildView;
module.exports = exports['default'];

},{"structurejs/display/DOMElement":8,"structurejs/event/BaseEvent":12,"structurejs/event/EventBroker":13}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

var _structurejsEventBaseEvent = require('structurejs/event/BaseEvent');

var _structurejsEventBaseEvent2 = _interopRequireDefault(_structurejsEventBaseEvent);

var _ParentView = require('./ParentView');

var _ParentView2 = _interopRequireDefault(_ParentView);

/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/

var GrandparentView = (function (_DOMElement) {
    _inherits(GrandparentView, _DOMElement);

    function GrandparentView($element) {
        _classCallCheck(this, GrandparentView);

        _get(Object.getPrototypeOf(GrandparentView.prototype), 'constructor', this).call(this, $element);
        this._parentView = null;
        this._$grandparentMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(GrandparentView, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(GrandparentView.prototype), 'create', this).call(this);

            this._parentView = new _ParentView2['default'](this.$element.find('.js-parentView'));
            this.addChild(this._parentView);

            this._$grandparentMessage = this.$element.find('.js-grandparentView-message');

            this._$checkbox = this.$element.find('[type=checkbox]').first();
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return;
            }

            this.addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            this._parentView.enable();

            _get(Object.getPrototypeOf(GrandparentView.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return;
            }

            this.removeEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            this._parentView.disable();

            _get(Object.getPrototypeOf(GrandparentView.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this._$grandparentMessage.text('');
            this._$checkbox.prop('checked', false);
            this._parentView.layout();
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this._parentView.destroy();

            _get(Object.getPrototypeOf(GrandparentView.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

    }, {
        key: '_onBubbled',
        value: function _onBubbled(baseEvent) {
            var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox === true) {
                baseEvent.stopPropagation();
            }

            var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
            text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
            text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

            this._$grandparentMessage.html(text);
        }
    }]);

    return GrandparentView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = GrandparentView;
module.exports = exports['default'];

},{"./ParentView":5,"structurejs/display/DOMElement":8,"structurejs/event/BaseEvent":12}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

var _structurejsEventBaseEvent = require('structurejs/event/BaseEvent');

var _structurejsEventBaseEvent2 = _interopRequireDefault(_structurejsEventBaseEvent);

var _ChildView = require('./ChildView');

var _ChildView2 = _interopRequireDefault(_ChildView);

/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/

var ParentView = (function (_DOMElement) {
    _inherits(ParentView, _DOMElement);

    function ParentView($element) {
        _classCallCheck(this, ParentView);

        _get(Object.getPrototypeOf(ParentView.prototype), 'constructor', this).call(this, $element);
        this._childView = null;
        this._$parentMessage = null;
        this._$checkbox = null;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(ParentView, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(ParentView.prototype), 'create', this).call(this);

            this._childView = new _ChildView2['default'](this.$element.find('.js-childView'));
            this.addChild(this._childView);

            this._$parentMessage = this.$element.find('.js-parentView-message');

            this._$checkbox = this.$element.find('[type=checkbox]').first();
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return;
            }

            this.addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            this._childView.enable();

            _get(Object.getPrototypeOf(ParentView.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return;
            }

            this.removeEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onBubbled, this);

            this._childView.disable();

            _get(Object.getPrototypeOf(ParentView.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this._$parentMessage.text('');
            this._$checkbox.prop('checked', false);
            this._childView.layout();
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this._childView.destroy();

            _get(Object.getPrototypeOf(ParentView.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

    }, {
        key: '_onBubbled',
        value: function _onBubbled(baseEvent) {
            var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');

            if (checkbox === true) {
                baseEvent.stopPropagation();
            }

            var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
            text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
            text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';

            this._$parentMessage.html(text);
        }
    }]);

    return ParentView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = ParentView;
module.exports = exports['default'];

},{"./ChildView":3,"structurejs/display/DOMElement":8,"structurejs/event/BaseEvent":12}],6:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './util/Util'], factory);
    }
})(function (require, exports) {
    ///<reference path='_declare/jquery.d.ts'/>
    ///<reference path='_declare/handlebars.d.ts'/>
    ///<reference path='_declare/greensock.d.ts'/>
    ///<reference path='_declare/jquery.eventListener.d.ts'/>
    ///<reference path='_declare/log.d.ts'/>
    var Util_1 = require('./util/Util');
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
            this.sjsId = Util_1['default'].uniqueId();
        }
        /**
         * Returns the fully qualified class name of an object.
         *
         * @method getQualifiedClassName
         * @returns {string} Returns the class name.
         * @public
         * @example
         *     let someClass = new SomeClass();
         *     someClass.getQualifiedClassName();
         *
         *     // SomeClass
         */
        BaseObject.prototype.getQualifiedClassName = function () {
            return Util_1['default'].getName(this);
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
         *     destroy() {
         *          this.disable();
         *
         *          this._childInstance.destroy();
         *
         *          super.destroy();
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = BaseObject;
});

},{"./util/Util":19}],7:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './BaseObject'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('./BaseObject');
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
         *     enable() {
         *          if (this.isEnabled === true) { return this; }
         *
         *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.enable();
         *
         *          return super.enable();
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
         *      disable() {
         *          if (this.isEnabled === false) { return this; }
         *
         *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *          this._childInstance.disable();
         *
         *          return super.disable();
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
    })(BaseObject_1['default']);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = ObjectManager;
});

},{"./BaseObject":6}],8:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DisplayObjectContainer', '../event/BaseEvent', '../util/TemplateFactory', '../util/ComponentFactory', '../plugin/jquery.eventListener'], factory);
    }
})(function (require, exports) {
    var DisplayObjectContainer_1 = require('./DisplayObjectContainer');
    var BaseEvent_1 = require('../event/BaseEvent');
    var TemplateFactory_1 = require('../util/TemplateFactory');
    var ComponentFactory_1 = require('../util/ComponentFactory');
    var jquery_eventListener_1 = require('../plugin/jquery.eventListener');
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
     *     let aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
     *     this.addChild(aLink);
     *
     *     // Example: A view passing in a jQuery object.
     *     let view = new CustomView($('.selector'));
     *     this.addChild(view);
     *
     *     // Example: A view extending DOMElement while passing in a jQuery object.
     *     class ClassName extends DOMElement {
     *
     *          constructor($element) {
     *              super($element);
     *          }
     *
     *          create() {
     *              super.create();
     *
     *              // Create and add your child objects to this parent class.
     *          }
     *
     *          enable() {
     *              if (this.isEnabled === true) { return this; }
     *
     *              // Enable the child objects and add any event listeners.
     *
     *              return super.enable();
     *          }
     *
     *          disable() {
     *              if (this.isEnabled === false) { return this; }
     *
     *              // Disable the child objects and remove any event listeners.
     *
     *              return super.disable();
     *          }
     *
     *          layout() {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
     *          }
     *
     *          destroy() {
     *              this.disable();
     *
     *              // Destroy the child objects and references in this parent class to prevent memory leaks.
     *
     *              super.destroy();
     *          }
     *
     *     }
     *
     *     // Example: A view extending DOMElement with a precompiled JavaScript template reference passed in.
     *     class ClassName extends DOMElement {
     *
     *          constructor() {
     *              _super();
     *          }
     *
     *          create() {
     *              super.create('templates/home/homeTemplate', {data: 'some data'});
     *
     *              // Create and add your child objects to this parent class.
     *          }
     *
     *          enable() {
     *              if (this.isEnabled === true) { return this; }
     *
     *              // Enable the child objects and add any event listeners.
     *
     *              return super.enable();
     *          }
     *
     *          disable() {
     *              if (this.isEnabled === false) { return this; }
     *
     *              // Disable the child objects and remove any event listeners.
     *
     *              return super.disable();
     *          }
     *
     *          layout() {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
     *          }
     *
     *          destroy() {
     *              this.disable();
     *
     *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
     *
     *              super.destroy();
     *          }
     *
     *     }
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
            if (type instanceof jquery_eventListener_1.default) {
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
         * @returns {any} Returns an instance of itself.
         * @public
         * @chainable
         * @example
         *     // EXAMPLE 1: By default your view class will be a div element:
         *     create() {
         *          super.create();
         *
         *          this._childInstance = new DOMElement();
         *          this.addChild(this._childInstance);
         *     }
         *
         *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
         *     create() {
         *          super.create('ul');
         *     }
         *
         *     // Then you could nest other elements inside this base view/element.
         *     create() {
         *          super.create('ul', {id: 'myId', 'class': 'myClass anotherClass'});
         *
         *          let li = new DOMElement('li', {text: 'Robert is cool'});
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
         *     create() {
         *          super.create('#todoTemplate', { data: this.viewData });
         *
         *     }
         *
         *     // EXAMPLE 4: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
         *     create() {
         *          super.create('templates/HomeTemplate', {data: "some data"});
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
                var html_1 = TemplateFactory_1.default.create(type, params);
                if (html_1) {
                    this.$element = jquery_eventListener_1.default(html_1);
                }
                else {
                    this.$element = jquery_eventListener_1.default("<" + type + "/>", params);
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
         * @returns {any} Returns an instance of itself.
         * @chainable
         * @example
         *     this.addChild(domElementInstance);
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
            this._onAddedToDom(child);
            return this;
        };
        /**
         * Adds the sjsId to the DOM element so we can know what what Class object the HTMLElement belongs too.
         *
         * @method _addClientSideId
         * @param child {DOMElement} The DOMElement instance to add the sjsId too.
         * @protected
         */
        DOMElement.prototype._addClientSideId = function (child) {
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
         * @method _removeClientSideId
         * @param child {DOMElement} The DOMElement instance to add the sjsId too.
         * @protected
         * @return {boolean}
         */
        DOMElement.prototype._removeClientSideId = function (child) {
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
         * @method _onAddedToDom
         * @protected
         */
        DOMElement.prototype._onAddedToDom = function (child) {
            var _this = this;
            child.checkCount++;
            if (child.$element.width() === 0 && child.checkCount < 5) {
                setTimeout(function () {
                    _this._onAddedToDom(child);
                }, 100);
                return;
            }
            this._addClientSideId(child);
            child.width = child.$element.width();
            child.height = child.$element.height();
            child.setSize(child.width, child.height);
            child.enable();
            child.layout();
            child.dispatchEvent(new BaseEvent_1.default(BaseEvent_1.default.ADDED_TO_STAGE));
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
                jquery_eventListener_1.default(children.get(index)).before(child.$element);
                this._onAddedToDom(child);
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
                this._addClientSideId(domElement);
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
            for (var i_1 = 0; i_1 < listLength; i_1++) {
                $child = $list.eq(i_1);
                // If the jQuery element already has sjsId data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
                if ($child.attr('data-sjs-id') === void 0) {
                    domElement = new DOMElement();
                    domElement.$element = $child;
                    this._addClientSideId(domElement);
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
         * @returns {any} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChild = function (child, destroy) {
            if (destroy === void 0) { destroy = true; }
            var remove = this._removeClientSideId(child);
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
         *      create() {
         *          super.create();
         *
         *          this.createComponents([
         *              {selector: '.js-shareEmail', component: EmailShareComponent},
         *              {selector: '.js-pagination', component: PaginationComponent},
         *              {selector: '.js-carousel', component: CarouselComponent}
         *          ]);
         *      }
         */
        DOMElement.prototype.createComponents = function (componentList) {
            var list;
            var createdChildren = [];
            var length = componentList.length;
            var obj;
            for (var i_2 = 0; i_2 < length; i_2++) {
                obj = componentList[i_2];
                list = ComponentFactory_1.default.create(this.$element.find(obj.selector), obj.component, this);
                createdChildren = createdChildren.concat(list);
            }
            return createdChildren;
        };
        return DOMElement;
    })(DisplayObjectContainer_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = DOMElement;
});

},{"../event/BaseEvent":12,"../plugin/jquery.eventListener":15,"../util/ComponentFactory":16,"../util/TemplateFactory":18,"./DisplayObjectContainer":10}],9:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    var v = factory(require, exports);if (v !== undefined) module.exports = v;
  } else if (typeof define === 'function' && define.amd) {
    define(["require", "exports", '../event/EventDispatcher'], factory);
  }
})(function (require, exports) {
  var EventDispatcher_1 = require('../event/EventDispatcher');
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
    DisplayObject.prototype._readerStart = function () {
      this.ctx.save();
    };
    DisplayObject.prototype.renderCanvas = function () {
      if (this.ctx === null || this.alpha <= 0 || this.visible === false) return false;
      this._readerStart();
      this.ctx.globalAlpha = this.alpha;
      this.layout();
      this._renderEnd();
    };
    DisplayObject.prototype._renderEnd = function () {
      this.ctx.restore();
    };
    return DisplayObject;
  })(EventDispatcher_1['default']);
  Object.defineProperty(exports, "__esModule", { value: true });
  exports['default'] = DisplayObject;
});

},{"../event/EventDispatcher":14}],10:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DisplayObject'], factory);
    }
})(function (require, exports) {
    var DisplayObject_1 = require('./DisplayObject');
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
            for (var i_1 = this.numChildren - 1; i_1 >= 0; i_1--) {
                if (this.children[i_1].sjsId == sjsId) {
                    child = this.children[i_1];
                    break;
                }
            }
            return child;
        };
        return DisplayObjectContainer;
    })(DisplayObject_1['default']);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = DisplayObjectContainer;
});

},{"./DisplayObject":9}],11:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './DOMElement'], factory);
    }
})(function (require, exports) {
    var DOMElement_1 = require('./DOMElement');
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
     *         class MainClass extends Stage {
     *
     *             constructor() {
     *                 super();
     *             }
     *
     *             create() {
     *                 super.create();
     *
     *                 // Create and add your child objects to this parent class.
     *             }
     *
     *             layout() {
     *                 // Layout or update the child objects in this parent class.
     *
     *                 return this;
     *             }
     *
     *             enable() {
     *                 if (this.isEnabled === true) { return this };
     *
     *                 // Enable the child objects and add any event listeners.
     *
     *                 return super.enable();
     *             }
     *
     *             disable() {
     *                 if (this.isEnabled === false) { return this };
     *
     *                 // Disable the child objects and remove any event listeners.
     *
     *                 return super.disable();
     *             }
     *
     *             destroy() {
     *                 this.disable();
     *
     *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
     *
     *                 super.destroy();
     *             }
     *
     *         }
     *
     *
     * <b>Instantiation Example</b><br>
     * This example illustrates how to instantiate your main application or root class.
     *
     *      let app = new MainClass();
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
            this._addClientSideId(this);
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
    })(DOMElement_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Stage;
});

},{"./DOMElement":8}],12:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../BaseObject'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('../BaseObject');
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
     *
     *     class CountryEvent extends BaseEvent {
     *
     *          CHANGE_COUNTRY = 'CountryEvent.changeCountry';
     *
     *          constructor(type, bubbles = false, cancelable = false, data = null) {
     *              super(type, bubbles, cancelable, data);
     *
     *              this.countryName = null;
     *          }
     *      }
     *
     *     // Example: how to use the custom event.
     *     let event = new CountryEvent(CountryEvent.CHANGE_COUNTRY);
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
         *     let cloneOfEvent = event.clone();
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
    })(BaseObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BaseEvent;
});

},{"../BaseObject":6}],13:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './EventDispatcher', './BaseEvent'], factory);
    }
})(function (require, exports) {
    var EventDispatcher_1 = require('./EventDispatcher');
    var BaseEvent_1 = require('./BaseEvent');
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
         *     _handlerMethod(event) {
         *          console.log(event.data);
         *     }
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
         *     _handlerMethod(event) {
         *          console.log(event.data);
         *     }
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
         * A way to listen for multiple events.
         *
         * If only listening for one event use {{#crossLink "EventBroker/addEventListener:method"}}{{/crossLink}}.
         *
         * @method waitFor
         * @param eventTypes {Array<string>} A list of event types you are waiting for.
         * @param callback {Function} The callback function that will be triggered when all event types are
         * @param scope {any} The scope of the callback function.
         * @static
         * @public
         * @example
         *     EventBroker.waitFor(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
         *
         *     _handlerMethod(events) {
         *          // An array of the event objects you waited for.
         *     }
         */
        EventBroker.waitFor = function (eventTypes, callback, scope) {
            EventBroker._waitForList.push({
                eventTypes: eventTypes,
                callback: callback,
                callbackScope: scope,
                events: [],
                once: false
            });
        };
        /**
         * A way to listen for multiple events. Once all events all are triggered this listener will be removed.
         *
         * If only listening for one event use {{#crossLink "EventBroker/addEventListenerOnce:method"}}{{/crossLink}}.
         *
         * @method waitForOnce
         * @param eventTypes {Array<string>} A list of event types you are waiting for.
         * @param callback {Function} The callback function that will be triggered when all event types are
         * @param scope {any} The scope of the callback function.
         * @static
         * @public
         * @example
         *     EventBroker.waitForOnce(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
         *
         *     _handlerMethod(events) {
         *          // An array of the event objects you waited for.
         *     }
         */
        EventBroker.waitForOnce = function (eventTypes, callback, scope) {
            EventBroker._waitForList.push({
                eventTypes: eventTypes,
                callback: callback,
                callbackScope: scope,
                events: [],
                once: true
            });
        };
        /**
         * A way to listen for multiple events. Once all events all are triggered it will no longer
         *
         * @method removeWaitFor
         * @param eventTypes {Array<string>} A list of event types you are waiting for.
         * @param callback {Function} The callback function that will be triggered when all event types are
         * @param scope {any} The scope of the callback function.
         * @static
         * @public
         * @example
         *     EventBroker.removeWaitFor(['someEvent', 'anotherEvent', CustomEvent.CHANGE], this._handlerMethod, this);
         */
        EventBroker.removeWaitFor = function (eventTypes, callback, scope) {
            var waitForObject;
            for (var i_1 = EventBroker._waitForList.length - 1; i_1 >= 0; i_1--) {
                waitForObject = EventBroker._waitForList[i_1];
                if (waitForObject.eventTypes.toString() === eventTypes.toString() && waitForObject.callback === callback && waitForObject.callbackScope === scope) {
                    EventBroker._waitForList.splice(i_1, 1);
                }
            }
        };
        /**
         * Dispatches an event within the EventBroker object.
         *
         * @method dispatchEvent
         * @param event {string|BaseEvent} The Event object or event type string you want to dispatch.
         * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
         * @param [scope=null] {any} You can optionally pass in the target of the object that dispatched the global event. Since {{#crossLink "EventBroker"}}{{/crossLink}}
         * @static
         * @public
         * @example
         *      EventBroker.dispatchEvent('change');
         *
         *      // Example: Sending data with the event.
         *      EventBroker.dispatchEvent('change', {some: 'data'});
         *
         *      // Example: Sending a BaseEvent or custom event object.
         *      let event = new BaseEvent(BaseEvent.CHANGE);
         *      event.data = {some: 'data'};
         *      EventBroker.dispatchEvent(event);
         */
        EventBroker.dispatchEvent = function (type, data, scope) {
            if (data === void 0) { data = null; }
            if (scope === void 0) { scope = EventBroker; }
            var event = type;
            if (typeof event === 'string') {
                event = new BaseEvent_1.default(type, false, false, data);
            }
            event.target = scope;
            event.currentTarget = scope;
            EventBroker._eventDispatcher.dispatchEvent(event);
            EventBroker._dispatchWaitFor(event);
        };
        /**
         * Helper method to dispatch events on the waitForObject objects.
         *
         * @method _dispatchWaitFor
         * @static
         * @private
         */
        EventBroker._dispatchWaitFor = function (event) {
            var waitForObject;
            var eventTypeIndex;
            for (var i_2 = EventBroker._waitForList.length - 1; i_2 >= 0; i_2--) {
                waitForObject = EventBroker._waitForList[i_2];
                eventTypeIndex = waitForObject.eventTypes.indexOf(event.type);
                if (eventTypeIndex > -1) {
                    waitForObject.events[eventTypeIndex] = event;
                }
                if (waitForObject.eventTypes.length === Object.keys(waitForObject.events).length) {
                    waitForObject.callback.call(waitForObject.scope, waitForObject.events);
                    waitForObject.events = [];
                    // If the once value is true we want to remove the listener right after this callback was called.
                    if (waitForObject.once === true) {
                        EventBroker._waitForList.splice(i_2, 1);
                    }
                }
            }
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
        EventBroker._eventDispatcher = new EventDispatcher_1.default();
        /**
         * A list of wait for objects.
         *
         * @property _waitForList
         * @type {Array<{eventTypes:Array<string>, callback:Function, callbackScope:any, events:Array<any>, once:boolean}>}
         * @private
         * @static
         */
        EventBroker._waitForList = [];
        return EventBroker;
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = EventBroker;
});

},{"./BaseEvent":12,"./EventDispatcher":14}],14:[function(require,module,exports){
'use strict';

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../ObjectManager', './BaseEvent'], factory);
    }
})(function (require, exports) {
    var ObjectManager_1 = require('../ObjectManager');
    var BaseEvent_1 = require('./BaseEvent');
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
     *      // Another way to use the EventDispatcher.
     *      let eventDispatcher = new EventDispatcher();
     *      eventDispatcher.addEventListener('change', this._handlerMethod, this);
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
         *      this.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *          console.log(event.type, event.data);
         *      }
         */
        EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
            if (priority === void 0) {
                priority = 0;
            }
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
                } else if (index === 0 && listener.priority < priority) {
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
         *      this.addEventListenerOnce(BaseEvent.CHANGE, this._handlerMethod, this);
         *
         *      _handlerMethod(event) {
         *          console.log(event.target + " sent the event.");
         *          console.log(event.type, event.data);
         *      }
         */
        EventDispatcher.prototype.addEventListenerOnce = function (type, callback, scope, priority) {
            if (priority === void 0) {
                priority = 0;
            }
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
         */
        EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
            // Get the list of event listeners by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list !== void 0) {
                var i_1 = list.length;
                while (--i_1 > -1) {
                    // If the callback and scope are the same then remove the event listener.
                    if (list[i_1].callback === callback && list[i_1].scope === scope) {
                        list.splice(i_1, 1);
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
         *      let event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
         *      this.dispatchEvent(event);
         *
         *      // Here is a common inline event object being dispatched:
         *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         */
        EventDispatcher.prototype.dispatchEvent = function (type, data) {
            if (data === void 0) {
                data = null;
            }
            var event = type;
            if (typeof event === 'string') {
                event = new BaseEvent_1['default'](type, false, true, data);
            }
            // If target is null then set it to the object that dispatched the event.
            if (event.target == null) {
                event.target = this;
                event.currentTarget = this;
            }
            // Get the list of event listener by the associated type value.
            var list = this._listeners[event.type];
            if (list !== void 0) {
                var i_2 = list.length;
                var listener;
                while (--i_2 > -1) {
                    // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                    if (event.cancelable === true && event.isImmediatePropagationStopped === true) {
                        break;
                    }
                    listener = list[i_2];
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
                // Assign the current object that is currently processing the event (i.e. event bubbling at).
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
         *      this.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
         */
        EventDispatcher.prototype.hasEventListener = function (type, callback, scope) {
            if (this._listeners[type] !== void 0) {
                var listener;
                var numOfCallbacks = this._listeners[type].length;
                for (var i_3 = 0; i_3 < numOfCallbacks; i_3++) {
                    listener = this._listeners[type][i_3];
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
                for (var i_4 = 0; i_4 < numOfCallbacks; i_4++) {
                    listener = this._listeners[type][i_4];
                    if (listener.scope && typeof listener.scope.getQualifiedClassName === 'function') {
                        str += '[' + listener.scope.getQualifiedClassName() + ']';
                    } else {
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
    })(ObjectManager_1['default']);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = EventDispatcher;
});

},{"../ObjectManager":7,"./BaseEvent":12}],15:[function(require,module,exports){
(function (global){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'jquery'], factory);
    }
})(function (require, exports) {
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
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function fNOP() {},
                fBound = function fBound() {
                return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
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
    var hashCode = function hashCode(str) {
        str = String(str);
        // http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
        var character;
        var hash = null;
        var strLength = str.length;
        if (strLength == 0) return hash;
        for (var i_1 = 0; i_1 < strLength; i_1++) {
            character = str.charCodeAt(i_1);
            hash = (hash << 5) - hash + character;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = $eventListener;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/Util'], factory);
    }
})(function (require, exports) {
    var Util_1 = require('../util/Util');
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
            if (scope === void 0) {
                scope = null;
            }
            var list = [];
            var component;
            var $element;
            var length = $elements.length;
            var types;
            var componentName;
            for (var i_1 = 0; i_1 < length; i_1++) {
                $element = $elements.eq(i_1);
                types = $element.attr('data-sjs-type');
                if (types === void 0) {
                    // Create the component if there is not a 'data-sjs-type' attribute on the element.
                    component = ComponentFactory._createComponent($element, ComponentClass, scope);
                    list.push(component);
                } else {
                    // Else if there is already a 'data-sjs-type' attribute then get the type(s).
                    types = types.split(',');
                    componentName = Util_1['default'].getName(ComponentClass);
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = ComponentFactory;
});

},{"../util/Util":19}],17:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
            if (withDot === void 0) {
                withDot = false;
            }
            var num = withDot === true ? 0 : 1;
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
            if (separator === void 0) {
                separator = ' ';
            }
            return String(str).replace(/(\d)/g, '$1 ').replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s{2,}/g, ' ').replace(/^ | $/g, '').toLowerCase().replace(/\s+/g, separator);
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
            return StringUtil.toSentence(str).replace(/ (\w)/g, function (_, $1) {
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
            return StringUtil.toCamelCase(str).replace(/^[a-zA-Z]/, function (a, b, c) {
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
            return StringUtil.toSentence(str, '_').toUpperCase();
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
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0;
                var v = c == 'x' ? r : r & 0x3 | 0x8;
                return v.toString(16);
            });
            return uuid;
        };
        /**
         * Converts a query string to an object.
         *
         * @method queryStringToObject
         * @param queryString {string}
         * @param [useParseFloat=false] {boolean} If true converts strings to numbers.
         * @returns {Object|Null}
         * @public
         * @static
         * @example
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
         *      // {name: 'Robert', age: '23', gender: 'male'}
         *
         *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', true);
         *      // {name: 'Robert', age: 23, gender: 'male'}
         */
        StringUtil.queryStringToObject = function (queryString, useParseFloat) {
            if (useParseFloat === void 0) {
                useParseFloat = false;
            }
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
            for (var i_1 = 0; i_1 < len; i_1++) {
                temp = queries[i_1].split('=');
                params[temp[0]] = useParseFloat === true && isNaN(parseFloat(temp[1])) === false ? parseFloat(temp[1]) : temp[1];
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
         *      let str = '   a b    c d e f g ';
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
         *      let str = '   a b    c d e f g ';
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
         * @param indicator {string}
         * @returns {string}
         * @public
         * @static
         * @example
         *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
         *      // 'Robert is cool...'
         *
         *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14, '!!!'));
         *      // 'Robert is cool!!!'
         */
        StringUtil.truncate = function (text, length, indicator) {
            if (indicator === void 0) {
                indicator = '...';
            }
            if (text.length <= length) {
                return text;
            } else {
                return text.substr(0, length) + indicator;
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
            for (var i_2 = 0; i_2 < length; i_2++) {
                var reg = new RegExp('\\{' + i_2 + '\\}', 'gm');
                value = value.replace(reg, rest[i_2]);
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = StringUtil;
});

},{}],18:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './StringUtil'], factory);
    }
})(function (require, exports) {
    var StringUtil_1 = require('./StringUtil');
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
            if (data === void 0) {
                data = null;
            }
            //Checks the first character to see if it is a '.' or '#'.
            var regex = /^([.#])(.+)/;
            var template = null;
            var isFunctionTemplate = typeof templatePath === 'function';
            var isClassOrIdName = regex.test(templatePath);
            if (isFunctionTemplate) {
                template = templatePath(data);
            } else if (isClassOrIdName) {
                // Remove pound sign from the id name.
                templatePath = templatePath.substring(1);
                var htmlString = document.getElementById(templatePath).innerHTML;
                htmlString = StringUtil_1['default'].removeLeadingTrailingWhitespace(htmlString);
                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    // Underscore Template:
                    var templateMethod = window['_'].template(htmlString);
                    template = templateMethod(data);
                } else {
                    // Handlebars Template
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            } else {
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = TemplateFactory;
});

},{"./StringUtil":17}],19:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
         *      let property = Util.uniqueId();
         *      // 1
         *
         *      let property = Util.uniqueId('prefixName_');
         *      // prefixName_1
         */
        Util.uniqueId = function (prefix) {
            if (prefix === void 0) {
                prefix = null;
            }
            var id = ++Util._idCounter;
            if (prefix != null) {
                return String(prefix + id);
            } else {
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
         *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
         *
         *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
         *
         *      // { name: 'Robert' }
         */
        Util.deletePropertyFromObject = function (object, value) {
            // If properties is not an array then make it an array object.
            var list = value instanceof Array ? value : [value];
            // Loop through the object properties.
            for (var key in object) {
                // If the key is a property and not function.
                if (object.hasOwnProperty(key)) {
                    var value_1 = object[key];
                    // If the property is an Array.
                    if (value_1 instanceof Array) {
                        // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                        var array = value_1;
                        for (var index in array) {
                            // Recursive function call.
                            Util.deletePropertyFromObject(array[index], list);
                        }
                    } else if (value_1 instanceof Object) {
                        Util.deletePropertyFromObject(value_1, list);
                    } else {
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
         *      let obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
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
         *      let cloneOfObject = Util.clone(obj);
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
                for (var i_1 = 0, len = obj.length; i_1 < len; i_1++) {
                    array[i_1] = Util.clone(obj[i_1]);
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
            var value = typeof strNum === 'string' ? strNum.toLowerCase() : strNum;
            return value > 0 || value == 'true' || value == 'yes';
        };
        /**
         * Returns the name of the function/object passed in.
         *
         * @method getName
         * @param classObject {any}
         * @returns {string} Returns the name of the function or object.
         * @static
         * @example
         *      let someClass = new SomeClass();
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
            } else {
                // This else code is mainly for Internet Explore.
                var isFunction = type === 'function';
                // TODO: figure out how to explain this
                var name_1 = isFunction && (classObject.name && ['', classObject.name] || classObject.toString().match(funcNameRegex));
                if (isFunction === false) {
                    value = type;
                } else if (name_1 && name_1[1]) {
                    value = name_1[1];
                } else {
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
            var debounced = function debounced() {
                var args = arguments;
                function delayed() {
                    if (immediate == false) {
                        result = callback.apply(callbackScope, args);
                    }
                    timeout = null;
                }
                if (timeout) {
                    clearTimeout(timeout);
                } else if (immediate === true) {
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
         * TODO: YUIDoc_comment
         *
         * @method applyMixins
         * @param derivedCtor {any}
         * @param baseCtors {any}
         * @public
         * @static
         * @example
         *
                class Flies {
                    fly() {
                        alert('Is it a bird? Is it a plane?');
                    }
                }
                     class Climbs {
                    climb() {
                        alert('My spider-sense is tingling.');
                    }
                }
                     class HorseflyWoman implements Climbs, Flies {
                    climb: () => void;
                    fly: () => void;
                }
                     Util.applyMixins(HorseflyWoman, [Climbs, Flies]);
         */
        Util.applyMixins = function (derivedCtor, baseCtors) {
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        };
        /**
         * Returns a new array with duplicates removed.
         *
         * @method unique
         * @param list {Array.<any>} The array you want to use to generate the unique array.
         * @return {Array<any>} Returns a new array list of unique items.
         * @protected
         */
        Util.unique = function (list) {
            var uniqueList = list.reduce(function (previousValue, currentValue) {
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []);
            return uniqueList;
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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports['default'] = Util;
});

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL0V2ZW50QnViYmxpbmcvc3JjL2Fzc2V0cy9zY3JpcHRzL0FwcC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvRXZlbnRCdWJibGluZy9zcmMvYXNzZXRzL3NjcmlwdHMvbWFpbi5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvRXZlbnRCdWJibGluZy9zcmMvYXNzZXRzL3NjcmlwdHMvdmlld3MvQ2hpbGRWaWV3LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9FdmVudEJ1YmJsaW5nL3NyYy9hc3NldHMvc2NyaXB0cy92aWV3cy9HcmFuZHBhcmVudFZpZXcuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL0V2ZW50QnViYmxpbmcvc3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXdzL1BhcmVudFZpZXcuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL0V2ZW50QnViYmxpbmcvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvRXZlbnRCdWJibGluZy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9PYmplY3RNYW5hZ2VyLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9ET01FbGVtZW50LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9FdmVudEJ1YmJsaW5nL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL2Rpc3BsYXkvRGlzcGxheU9iamVjdC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvRXZlbnRCdWJibGluZy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L0Rpc3BsYXlPYmplY3RDb250YWluZXIuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L1N0YWdlLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvQmFzZUV2ZW50LmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvRXZlbnRCcm9rZXIuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL0V2ZW50QnViYmxpbmcvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvRXZlbnREaXNwYXRjaGVyLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9FdmVudEJ1YmJsaW5nL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lci5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvRXZlbnRCdWJibGluZy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL0NvbXBvbmVudEZhY3RvcnkuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL0V2ZW50QnViYmxpbmcvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvdXRpbC9TdHJpbmdVdGlsLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9FdmVudEJ1YmJsaW5nL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvVGVtcGxhdGVGYWN0b3J5LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9FdmVudEJ1YmJsaW5nL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNDQWtCLDJCQUEyQjs7Ozt5Q0FDdkIsNkJBQTZCOzs7OzJDQUMzQiwrQkFBK0I7Ozs7b0NBRTNCLHlCQUF5Qjs7Ozs7Ozs7Ozs7O0lBUy9DLGdCQUFnQjtjQUFoQixnQkFBZ0I7O0FBTVAsYUFOVCxnQkFBZ0IsR0FNSjs4QkFOWixnQkFBZ0I7O0FBT2QsbUNBUEYsZ0JBQWdCLDZDQU9OO2FBTFosWUFBWSxHQUFHLElBQUk7YUFDbkIsYUFBYSxHQUFHLElBQUk7YUFDcEIsY0FBYyxHQUFHLElBQUk7S0FJcEI7Ozs7OztpQkFSQyxnQkFBZ0I7O2VBYVosa0JBQUc7QUFDTCx1Q0FkRixnQkFBZ0Isd0NBY0M7O0FBRWYsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsc0NBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUNuRixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRWpDLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDM0QsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNoRTs7Ozs7OztlQUtLLGtCQUFHO0FBQ0wsZ0JBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFBRSx1QkFBTzthQUFFOztBQUV4QyxnQkFBSSxD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdm1CQSxJQUFJLFNBQVMsR0FBRyxBQUFDLGFBQVEsVUFBSyxTQUFTLElBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELE9BQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RE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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUU7QUFDMUIsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxhQUFhLEVBQUUsWUFBWSxFQUFFO0FBQ2hFLG9CQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUMsaUNBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BDO0FBQ0QsdUJBQU8sYUFBYSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxtQkFBTyxVQUFVLENBQUM7U0FDckIsQ0FBQzs7Ozs7Ozs7O0FBU0YsWUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDcEIsZUFBTyxJQUFJLENBQUM7S0FDZixDQUFBLEVBQUcsQ0FBQztBQUNMLFVBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELFdBQU8sV0FBUSxHQUFHLElBQUksQ0FBQztDQUMxQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFN0YWdlIGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvU3RhZ2UnO1xuaW1wb3J0IEJhc2VFdmVudCBmcm9tICdzdHJ1Y3R1cmVqcy9ldmVudC9CYXNlRXZlbnQnO1xuaW1wb3J0IEV2ZW50QnJva2VyIGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L0V2ZW50QnJva2VyJztcblxuaW1wb3J0IEdyYW5kcGFyZW50VmlldyBmcm9tICcuL3ZpZXdzL0dyYW5kcGFyZW50Vmlldyc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgRXZlbnRCdWJibGluZ0FwcFxuICogQGV4dGVuZHMgU3RhZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgRXZlbnRCdWJibGluZ0FwcCBleHRlbmRzIFN0YWdlIHtcblxuICAgIF9ncmFuZHBhVmlldyA9IG51bGw7XG4gICAgXyRjbGVhckJ1dHRvbiA9IG51bGw7XG4gICAgXyRzdGFnZU1lc3NhZ2UgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRXZlbnRCdWJibGluZ0FwcC5jcmVhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuX2dyYW5kcGFWaWV3ID0gbmV3IEdyYW5kcGFyZW50Vmlldyh0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1ncmFuZHBhcmVudFZpZXcnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fZ3JhbmRwYVZpZXcpO1xuXG4gICAgICAgIHRoaXMuXyRjbGVhckJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWNsZWFyQnV0dG9uJyk7XG4gICAgICAgIHRoaXMuXyRzdGFnZU1lc3NhZ2UgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1zdGFnZU1lc3NhZ2UnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBTdGFnZS5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICBFdmVudEJyb2tlci5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX29uR2xvYmFsRXZlbnQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuXyRjbGVhckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xlYXJDbGljaywgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fZ3JhbmRwYVZpZXcuZW5hYmxlKCk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gU3RhZ2UuZGlzYWJsZVxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX29uQnViYmxlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fJGNsZWFyQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGVhckNsaWNrLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9ncmFuZHBhVmlldy5kaXNhYmxlKCk7XG5cbiAgICAgICAgc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIFN0YWdlLmxheW91dFxuICAgICAqL1xuICAgIGxheW91dCgpIHtcbiAgICAgICAgdGhpcy5fJHN0YWdlTWVzc2FnZS50ZXh0KCcnKTtcbiAgICAgICAgdGhpcy5fZ3JhbmRwYVZpZXcubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gU3RhZ2UuZGVzdHJveVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuX2dyYW5kcGFWaWV3LmRlc3Ryb3koKTtcblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEVWRU5UIEhBTkRMRVJTXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgX29uQ2xlYXJDbGljayhldmVudCkge1xuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIF9vbkJ1YmJsZWQoYmFzZUV2ZW50KSB7XG4gICAgICAgIGxldCB0ZXh0ID0gJzxzdHJvbmc+JyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHJlY2V2aWVkIGEgZXZlbnQuPGJyLyA+JztcbiAgICAgICAgdGV4dCArPSAnPHN0cm9uZz4nICsgYmFzZUV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IGxhc3QgdG91Y2hlZCB0aGUgZXZlbnQuPGJyLyA+JztcbiAgICAgICAgdGV4dCArPSAnPHN0cm9uZz4nICsgYmFzZUV2ZW50LnRhcmdldC5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICc8L3N0cm9uZz4gc2VudCB0aGUgZXZlbnQuJztcblxuICAgICAgICB0aGlzLl8kc3RhZ2VNZXNzYWdlLmh0bWwodGV4dCk7XG4gICAgfVxuXG4gICAgX29uR2xvYmFsRXZlbnQoYmFzZUV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2xvYmFsIGV2ZW50IGRpc3BhdGNoZWRcIiwgYmFzZUV2ZW50KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRCdWJibGluZ0FwcDtcbiIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmFwcGVuZFRvKCdib2R5Jyk7ICAgLy8gTmVlZCB0byBzcGVjaWZ5IHdoYXQgYXJlYSBvdXIgY29kZSBoYXMgY29udHJvbCBvdmVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIEFwcC5qcyBjbGFzcyBleHRlbmRzIFN0YWdlIHdoaWNoIGhhcyB0aGUgYXBwZW5kVG8gbWV0aG9kLlxuXG4iLCJpbXBvcnQgRE9NRWxlbWVudCBmcm9tICdzdHJ1Y3R1cmVqcy9kaXNwbGF5L0RPTUVsZW1lbnQnO1xuaW1wb3J0IEJhc2VFdmVudCBmcm9tICdzdHJ1Y3R1cmVqcy9ldmVudC9CYXNlRXZlbnQnO1xuaW1wb3J0IEV2ZW50QnJva2VyIGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L0V2ZW50QnJva2VyJztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBDaGlsZFZpZXdcbiAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgQ2hpbGRWaWV3IGV4dGVuZHMgRE9NRWxlbWVudCB7XG5cbiAgICBfJGRpc3BhdGNoQnV0dG9uID0gbnVsbDtcbiAgICBfJHNvbk1lc3NhZ2UgPSBudWxsO1xuICAgIF8kY2hlY2tib3ggPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLl8kZGlzcGF0Y2hCdXR0b24gPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1kaXNwYXRjaEJ1dHRvbicpO1xuXG4gICAgICAgIHRoaXMuXyRzb25NZXNzYWdlID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtY2hpbGRWaWV3LW1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLl8kY2hlY2tib3ggPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1t0eXBlPWNoZWNrYm94XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuXyRkaXNwYXRjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQnV0dG9uQ2xpY2ssIHRoaXMpO1xuXG4gICAgICAgIHN1cGVyLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGlzYWJsZVxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgICAgICB0aGlzLl8kZGlzcGF0Y2hCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9vbkJ1dHRvbkNsaWNrLCB0aGlzKTtcblxuICAgICAgICBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBsYXlvdXQoKSB7XG4gICAgICAgIHRoaXMuXyRzb25NZXNzYWdlLnRleHQoJycpO1xuICAgICAgICB0aGlzLl8kY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRlc3Ryb3lcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRVZFTlQgSEFORExFUlNcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICBfb25CdXR0b25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCB0ZXh0ID0gJzxzdHJvbmc+JyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHNlbnQgdGhlIGV2ZW50Lic7XG5cbiAgICAgICAgdGhpcy5fJHNvbk1lc3NhZ2UuaHRtbCh0ZXh0KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFLCB0cnVlLCB0cnVlKSk7XG4gICAgICAgIEV2ZW50QnJva2VyLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENoaWxkVmlldztcbiIsImltcG9ydCBET01FbGVtZW50IGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvRE9NRWxlbWVudCc7XG5pbXBvcnQgQmFzZUV2ZW50IGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L0Jhc2VFdmVudCc7XG5cbmltcG9ydCBQYXJlbnRWaWV3IGZyb20gJy4vUGFyZW50Vmlldyc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgR3JhbmRwYXJlbnRWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEdyYW5kcGFyZW50VmlldyBleHRlbmRzIERPTUVsZW1lbnQge1xuXG4gICAgX3BhcmVudFZpZXcgPSBudWxsO1xuICAgIF8kZ3JhbmRwYXJlbnRNZXNzYWdlID0gbnVsbDtcbiAgICBfJGNoZWNrYm94ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmNyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fcGFyZW50VmlldyA9IG5ldyBQYXJlbnRWaWV3KHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXBhcmVudFZpZXcnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fcGFyZW50Vmlldyk7XG5cbiAgICAgICAgdGhpcy5fJGdyYW5kcGFyZW50TWVzc2FnZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWdyYW5kcGFyZW50Vmlldy1tZXNzYWdlJyk7XG5cbiAgICAgICAgdGhpcy5fJGNoZWNrYm94ID0gdGhpcy4kZWxlbWVudC5maW5kKCdbdHlwZT1jaGVja2JveF0nKS5maXJzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZW5hYmxlXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX29uQnViYmxlZCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fcGFyZW50Vmlldy5lbmFibGUoKTtcblxuICAgICAgICBzdXBlci5lbmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRpc2FibGVcbiAgICAgKi9cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkJ1YmJsZWQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3BhcmVudFZpZXcuZGlzYWJsZSgpO1xuXG4gICAgICAgIHN1cGVyLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmxheW91dFxuICAgICAqL1xuICAgIGxheW91dCgpIHtcbiAgICAgICAgdGhpcy5fJGdyYW5kcGFyZW50TWVzc2FnZS50ZXh0KCcnKTtcbiAgICAgICAgdGhpcy5fJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIHRoaXMuX3BhcmVudFZpZXcubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50Vmlldy5kZXN0cm95KCk7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFVkVOVCBIQU5ETEVSU1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIF9vbkJ1YmJsZWQoYmFzZUV2ZW50KSB7XG4gICAgICAgIGxldCBjaGVja2JveCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnW3R5cGU9Y2hlY2tib3hdJykuZmlyc3QoKS5wcm9wKCdjaGVja2VkJyk7XG5cbiAgICAgICAgaWYgKGNoZWNrYm94ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBiYXNlRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGV4dCA9ICc8c3Ryb25nPicgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiByZWNldmllZCBhIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC5jdXJyZW50VGFyZ2V0LmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJzwvc3Ryb25nPiBsYXN0IHRvdWNoZWQgdGhlIGV2ZW50Ljxici8gPic7XG4gICAgICAgIHRleHQgKz0gJzxzdHJvbmc+JyArIGJhc2VFdmVudC50YXJnZXQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHNlbnQgdGhlIGV2ZW50Lic7XG5cbiAgICAgICAgdGhpcy5fJGdyYW5kcGFyZW50TWVzc2FnZS5odG1sKHRleHQpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHcmFuZHBhcmVudFZpZXc7XG4iLCJpbXBvcnQgRE9NRWxlbWVudCBmcm9tICdzdHJ1Y3R1cmVqcy9kaXNwbGF5L0RPTUVsZW1lbnQnO1xuaW1wb3J0IEJhc2VFdmVudCBmcm9tICdzdHJ1Y3R1cmVqcy9ldmVudC9CYXNlRXZlbnQnO1xuXG5pbXBvcnQgQ2hpbGRWaWV3IGZyb20gJy4vQ2hpbGRWaWV3JztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBQYXJlbnRWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIFBhcmVudFZpZXcgZXh0ZW5kcyBET01FbGVtZW50IHtcblxuICAgIF9jaGlsZFZpZXcgPSBudWxsO1xuICAgIF8kcGFyZW50TWVzc2FnZSA9IG51bGw7XG4gICAgXyRjaGVja2JveCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigkZWxlbWVudCkge1xuICAgICAgICBzdXBlcigkZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5jcmVhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuXG4gICAgICAgIHRoaXMuX2NoaWxkVmlldyA9IG5ldyBDaGlsZFZpZXcodGhpcy4kZWxlbWVudC5maW5kKCcuanMtY2hpbGRWaWV3JykpO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2NoaWxkVmlldyk7XG5cbiAgICAgICAgdGhpcy5fJHBhcmVudE1lc3NhZ2UgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1wYXJlbnRWaWV3LW1lc3NhZ2UnKTtcblxuICAgICAgICB0aGlzLl8kY2hlY2tib3ggPSB0aGlzLiRlbGVtZW50LmZpbmQoJ1t0eXBlPWNoZWNrYm94XScpLmZpcnN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9jaGlsZFZpZXcuZW5hYmxlKCk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25CdWJibGVkLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9jaGlsZFZpZXcuZGlzYWJsZSgpO1xuXG4gICAgICAgIHN1cGVyLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmxheW91dFxuICAgICAqL1xuICAgIGxheW91dCgpIHtcbiAgICAgICAgdGhpcy5fJHBhcmVudE1lc3NhZ2UudGV4dCgnJyk7XG4gICAgICAgIHRoaXMuXyRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICB0aGlzLl9jaGlsZFZpZXcubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5fY2hpbGRWaWV3LmRlc3Ryb3koKTtcblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEVWRU5UIEhBTkRMRVJTXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgX29uQnViYmxlZChiYXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IGNoZWNrYm94ID0gdGhpcy4kZWxlbWVudC5maW5kKCdbdHlwZT1jaGVja2JveF0nKS5maXJzdCgpLnByb3AoJ2NoZWNrZWQnKTtcblxuICAgICAgICBpZiAoY2hlY2tib3ggPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJhc2VFdmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0ZXh0ID0gJzxzdHJvbmc+JyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IHJlY2V2aWVkIGEgZXZlbnQuPGJyLyA+JztcbiAgICAgICAgdGV4dCArPSAnPHN0cm9uZz4nICsgYmFzZUV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnPC9zdHJvbmc+IGxhc3QgdG91Y2hlZCB0aGUgZXZlbnQuPGJyLyA+JztcbiAgICAgICAgdGV4dCArPSAnPHN0cm9uZz4nICsgYmFzZUV2ZW50LnRhcmdldC5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICc8L3N0cm9uZz4gc2VudCB0aGUgZXZlbnQuJztcblxuICAgICAgICB0aGlzLl8kcGFyZW50TWVzc2FnZS5odG1sKHRleHQpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQYXJlbnRWaWV3O1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vdXRpbC9VdGlsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9qcXVlcnkuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvaGFuZGxlYmFycy5kLnRzJy8+XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9ncmVlbnNvY2suZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvanF1ZXJ5LmV2ZW50TGlzdGVuZXIuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvbG9nLmQudHMnLz5cbiAgICB2YXIgVXRpbF8xID0gcmVxdWlyZSgnLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiQmFzZU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIGNvbW1vbiBwcm9wZXJ0aWVzIGFuZCBmdW5jdGlvbmFsaXR5IGZvciBhbGwgU3RydWN0dXJlSlMgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBCYXNlT2JqZWN0XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgY29yZVxuICAgICAqIEByZXF1aXJlcyBVdGlsXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIEJhc2VPYmplY3QgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCYXNlT2JqZWN0KCkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgc2pzSWQgKFN0cnVjdHVyZUpTIElEKSBpcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gbW9zdCBTdHJ1Y3R1cmVKUyBvYmplY3RzIHVwb24gaW5zdGFudGlhdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc2pzSWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAd3JpdGVPbmNlXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zanNJZCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNqc0lkID0gVXRpbF8xLmRlZmF1bHQudW5pcXVlSWQoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIGNsYXNzIG5hbWUgb2YgYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFF1YWxpZmllZENsYXNzTmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgc29tZUNsYXNzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gU29tZUNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbF8xLmRlZmF1bHQuZ2V0TmFtZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwdXJwb3NlIG9mIHRoZSBkZXN0cm95IG1ldGhvZCBpcyB0byBtYWtlIGFuIG9iamVjdCByZWFkeSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLiBUaGlzXG4gICAgICAgICAqIHNob3VsZCBiZSB0aG91Z2h0IG9mIGFzIGEgb25lIHdheSBmdW5jdGlvbi4gT25jZSBkZXN0cm95IGlzIGNhbGxlZCBubyBmdXJ0aGVyIG1ldGhvZHMgc2hvdWxkIGJlXG4gICAgICAgICAqIGNhbGxlZCBvbiB0aGUgb2JqZWN0IG9yIHByb3BlcnRpZXMgYWNjZXNzZWQuIEl0IGlzIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0aG9zZSB3aG8gaW1wbGVtZW50IHRoaXNcbiAgICAgICAgICogZnVuY3Rpb24gdG8gc3RvcCBhbGwgcnVubmluZyBUaW1lcnMsIGFsbCBydW5uaW5nIFNvdW5kcywgYW5kIHRha2UgYW55IG90aGVyIHN0ZXBzIG5lY2Vzc2FyeSB0byBtYWtlIGFuXG4gICAgICAgICAqIG9iamVjdCBlbGlnaWJsZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBCeSBkZWZhdWx0IHRoZSBkZXN0cm95IG1ldGhvZCB3aWxsIG51bGwgb3V0IGFsbCBwcm9wZXJ0aWVzIG9mIHRoZSBjbGFzcyBhdXRvbWF0aWNhbGx5LiBZb3Ugc2hvdWxkIGNhbGwgZGVzdHJveVxuICAgICAgICAgKiBvbiBvdGhlciBvYmplY3RzIGJlZm9yZSBjYWxsaW5nIHRoZSBzdXBlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkZXN0cm95XG4gICAgICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJhc2VPYmplY3Q7XG4gICAgfSkoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQmFzZU9iamVjdDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9CYXNlT2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoJy4vQmFzZU9iamVjdCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJPYmplY3RNYW5hZ2VyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBmdW5jdGlvbmFsaXR5IGZvciBtb3N0IFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgT2JqZWN0TWFuYWdlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHN1Ym1vZHVsZSBjb3JlXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIE9iamVjdE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoT2JqZWN0TWFuYWdlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gT2JqZWN0TWFuYWdlcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgaXNFbmFibGVkIHByb3BlcnR5IGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0VuYWJsZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVuYWJsZSBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBlbmFibGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBlbmFibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5lbmFibGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0TWFuYWdlci5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaXNhYmxlIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgZGlzYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNhYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGRpc2FibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuaGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGlzYWJsZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdE1hbmFnZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBPYmplY3RNYW5hZ2VyO1xuICAgIH0pKEJhc2VPYmplY3RfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gT2JqZWN0TWFuYWdlcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EaXNwbGF5T2JqZWN0Q29udGFpbmVyJywgJy4uL2V2ZW50L0Jhc2VFdmVudCcsICcuLi91dGlsL1RlbXBsYXRlRmFjdG9yeScsICcuLi91dGlsL0NvbXBvbmVudEZhY3RvcnknLCAnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERpc3BsYXlPYmplY3RDb250YWluZXJfMSA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdENvbnRhaW5lcicpO1xuICAgIHZhciBCYXNlRXZlbnRfMSA9IHJlcXVpcmUoJy4uL2V2ZW50L0Jhc2VFdmVudCcpO1xuICAgIHZhciBUZW1wbGF0ZUZhY3RvcnlfMSA9IHJlcXVpcmUoJy4uL3V0aWwvVGVtcGxhdGVGYWN0b3J5Jyk7XG4gICAgdmFyIENvbXBvbmVudEZhY3RvcnlfMSA9IHJlcXVpcmUoJy4uL3V0aWwvQ29tcG9uZW50RmFjdG9yeScpO1xuICAgIHZhciBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xID0gcmVxdWlyZSgnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgdmlldyBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIGludG8gdGhlIEhUTUwgRE9NLlxuICAgICAqXG4gICAgICogQGNsYXNzIERPTUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gdHlwZSBbYW55PW51bGxdIEVpdGhlciBhIGpRdWVyeSBvYmplY3Qgb3IgSmF2YVNjcmlwdCB0ZW1wbGF0ZSBzdHJpbmcgcmVmZXJlbmNlIHlvdSB3YW50IHRvIHVzZSBhcyB0aGUgdmlldy4gQ2hlY2sgb3V0IHRoZSBleGFtcGxlcyBiZWxvdy5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICogQGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQHJlcXVpcmVzIFRlbXBsYXRlRmFjdG9yeVxuICAgICAqIEByZXF1aXJlcyBDb21wb25lbnRGYWN0b3J5XG4gICAgICogQHJlcXVpcmVzIGpRdWVyeVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIEV4YW1wbGU6IFVzaW5nIERPTUVsZW1lbnQgd2l0aG91dCBleHRlbmRpbmcgaXQuXG4gICAgICogICAgIGxldCBhTGluayA9IG5ldyBET01FbGVtZW50KCdhJywge3RleHQ6ICdHb29nbGUnLCBocmVmOiAnaHR0cDovL3d3dy5nb29nbGUuY29tJywgJ2NsYXNzJzogJ2V4dGVybmFsTGluayd9KTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZChhTGluayk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IHBhc3NpbmcgaW4gYSBqUXVlcnkgb2JqZWN0LlxuICAgICAqICAgICBsZXQgdmlldyA9IG5ldyBDdXN0b21WaWV3KCQoJy5zZWxlY3RvcicpKTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZCh2aWV3KTtcbiAgICAgKlxuICAgICAqICAgICAvLyBFeGFtcGxlOiBBIHZpZXcgZXh0ZW5kaW5nIERPTUVsZW1lbnQgd2hpbGUgcGFzc2luZyBpbiBhIGpRdWVyeSBvYmplY3QuXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgeW91ciBjaGlsZCBvYmplY3RzIHRvIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlZmVyZW5jZXMgaW4gdGhpcyBwYXJlbnQgY2xhc3MgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IGV4dGVuZGluZyBET01FbGVtZW50IHdpdGggYSBwcmVjb21waWxlZCBKYXZhU2NyaXB0IHRlbXBsYXRlIHJlZmVyZW5jZSBwYXNzZWQgaW4uXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgICAgICAgICAgIF9zdXBlcigpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCd0ZW1wbGF0ZXMvaG9tZS9ob21lVGVtcGxhdGUnLCB7ZGF0YTogJ3NvbWUgZGF0YSd9KTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZW5hYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBkaXNhYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmRpc2FibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBsYXlvdXQoKSB7XG4gICAgICogICAgICAgICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIGNoaWxkIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICovXG4gICAgdmFyIERPTUVsZW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRE9NRWxlbWVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRE9NRWxlbWVudCh0eXBlLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkgeyBwYXJhbXMgPSBudWxsOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJhY2tzIG51bWJlciBvZiB0aW1lcyBhbiBlbGVtZW50J3Mgd2lkdGggaGFzIGJlZW4gY2hlY2tlZFxuICAgICAgICAgICAgICogaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIGFkZGVkXG4gICAgICAgICAgICAgKiB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjaGVja0NvdW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ291bnQgPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIGNhY2hlZCByZWZlcmVuY2UgdG8gdGhlIERPTSBFbGVtZW50XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBjYWNoZWQgcmVmZXJlbmNlIHRvIHRoZSBqUXVlcnkgRE9NIGVsZW1lbnRcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgJGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBhIGpRdWVyeSBvYmplY3Qgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGlzIHdpbGwgYmUgc2V0IGFzIHRydWUgYW5kXG4gICAgICAgICAgICAgKiB0aGlzIGNsYXNzIHdpbGwgbm90IHRyeSB0byBhZGQgdGhlIHZpZXcgdG8gdGhlIERPTSBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX2lzUmVmZXJlbmNlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5faXNSZWZlcmVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSG9sZHMgb250byB0aGUgdmFsdWUgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfdHlwZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhvbGRzIG9udG8gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX3BhcmFtc1xuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0eXBlIGluc3RhbmNlb2YganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3JlYXRlIGZ1bmN0aW9uIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSBjb25zaXN0ZW50IHBsYWNlIGZvciB0aGUgY3JlYXRpb24gYW5kIGFkZGluZ1xuICAgICAgICAgKiBvZiBjaGlsZHJlbiB0byB0aGUgdmlldy4gSXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSB2aWV3IGlzIGFkZGVkXG4gICAgICAgICAqIHRvIGFub3RoZXIgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSXQgaXMgY3JpdGljYWwgdGhhdCBhbGwgc3ViY2xhc3NlcyBjYWxsIHRoZSBzdXBlciBmb3IgdGhpcyBmdW5jdGlvbiBpblxuICAgICAgICAgKiB0aGVpciBvdmVycmlkZGVuIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIG9uY2Ugd2hlbiB0aGUgY2hpbGQgdmlldyBpcyBhZGRlZCB0byBhbm90aGVyIHZpZXcuIElmIHRoZSBjaGlsZCB2aWV3IGlzIHJlbW92ZWRcbiAgICAgICAgICogYW5kIGFkZGVkIHRvIGFub3RoZXIgdmlldyB0aGUgY3JlYXRlIG1ldGhvZCB3aWxsIG5vdCBiZSBjYWxsZWQgYWdhaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIFtzdHJpbmc9ZGl2XSBUaGUgSFRNTCB0YWcgeW91IHdhbnQgdG8gY3JlYXRlIG9yIHRoZSBpZC9jbGFzcyBzZWxlY3RvciBvZiB0aGUgdGVtcGxhdGUgb3IgdGhlIHByZS1jb21waWxlZCBwYXRoIHRvIGEgdGVtcGxhdGUuXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMgW2FueT1udWxsXSBBbnkgZGF0YSB5b3Ugd291bGQgbGlrZSB0byBwYXNzIGludG8gdGhlIGpRdWVyeSBlbGVtZW50IG9yIHRlbXBsYXRlIHRoYXQgaXMgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRVhBTVBMRSAxOiBCeSBkZWZhdWx0IHlvdXIgdmlldyBjbGFzcyB3aWxsIGJlIGEgZGl2IGVsZW1lbnQ6XG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9jaGlsZEluc3RhbmNlKTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgMjogQnV0IGxldHMgc2F5IHlvdSB3YW50ZWQgdGhlIHZpZXcgdG8gYmUgYSB1bCBlbGVtZW50OlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJyk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBUaGVuIHlvdSBjb3VsZCBuZXN0IG90aGVyIGVsZW1lbnRzIGluc2lkZSB0aGlzIGJhc2Ugdmlldy9lbGVtZW50LlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJywge2lkOiAnbXlJZCcsICdjbGFzcyc6ICdteUNsYXNzIGFub3RoZXJDbGFzcyd9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgbGV0IGxpID0gbmV3IERPTUVsZW1lbnQoJ2xpJywge3RleHQ6ICdSb2JlcnQgaXMgY29vbCd9KTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZChsaSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBFWEFNUExFIDM6IFNvIHRoYXQncyBjb29sIGJ1dCB3aGF0IGlmIHlvdSB3YW50ZWQgYSBibG9jayBvZiBodG1sIHRvIGJlIHlvdXIgdmlldy4gTGV0J3Mgc2F5IHlvdSBoYWQgdGhlIGJlbG93XG4gICAgICAgICAqICAgICAvLyBpbmxpbmUgSGFuZGxlYmFyIHRlbXBsYXRlIGluIHlvdXIgaHRtbCBmaWxlLlxuICAgICAgICAgKiAgICAgPHNjcmlwdCBpZD1cInRvZG9UZW1wbGF0ZVwiIHR5cGU9XCJ0ZXh0L3RlbXBsYXRlXCI+XG4gICAgICAgICAqICAgICAgICAgIDxkaXYgaWQ9XCJodG1sVGVtcGxhdGVcIiBjbGFzcz1cImpzLXRvZG9cIj5cbiAgICAgICAgICogICAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCJ7eyBkYXRhLnRleHQgfX1cIj5cbiAgICAgICAgICogICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibGlzdC1pdGVtLXN1Ym1pdFwiIHZhbHVlPVwiQWRkXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICogICAgICAgICAgPC9kaXY+XG4gICAgICAgICAqICAgICA8L3NjcmlwdD5cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFlvdSB3b3VsZCBqdXN0IHBhc3MgaW4gdGhlIGlkIG9yIGNsYXNzIHNlbGVjdG9yIG9mIHRoZSB0ZW1wbGF0ZSB3aGljaCBpbiB0aGlzIGNhc2UgaXMgXCIjdG9kb1RlbXBsYXRlXCIuXG4gICAgICAgICAqICAgICAvLyBUaGVyZSBpcyBhIHNlY29uZCBvcHRpb25hbCBhcmd1bWVudCB3aGVyZSB5b3UgY2FuIHBhc3MgZGF0YSBmb3IgdGhlIEhhbmRsZWJhciB0ZW1wbGF0ZSB0byB1c2UuXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgnI3RvZG9UZW1wbGF0ZScsIHsgZGF0YTogdGhpcy52aWV3RGF0YSB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgNDogT3IgbWF5YmUgeW91J3JlIHVzaW5nIGdydW50LWNvbnRyaWItaGFuZGxlYmFycywgb3Igc2ltaWxhciwgdG8gcHJlY29tcGlsZSBoYnMgdGVtcGxhdGVzXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgndGVtcGxhdGVzL0hvbWVUZW1wbGF0ZScsIHtkYXRhOiBcInNvbWUgZGF0YVwifSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodHlwZSwgcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSAnZGl2JzsgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7IHBhcmFtcyA9IG51bGw7IH1cbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZGF0YSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgZmlyc3QgZWxzZSB1c2UgdGhlIGFyZ3VtZW50cyBmcm9tIGNyZWF0ZS5cbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl90eXBlIHx8IHR5cGU7XG4gICAgICAgICAgICBwYXJhbXMgPSB0aGlzLl9wYXJhbXMgfHwgcGFyYW1zO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcmVhdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBZb3UgY2Fubm90IGNhbGwgdGhlIGNyZWF0ZSBtZXRob2QgbWFudWFsbHkuIEl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgYXV0b21hdGljYWxseSBkdXJpbmcgdGhlIHZpZXcgbGlmZWN5Y2xlIGFuZCBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbF8xID0gVGVtcGxhdGVGYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGUodHlwZSwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICBpZiAoaHRtbF8xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoaHRtbF8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoXCI8XCIgKyB0eXBlICsgXCIvPlwiLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuJGVsZW1lbnRbMF07XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy4kZWxlbWVudC53aWR0aCgpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLiRlbGVtZW50LmhlaWdodCgpO1xuICAgICAgICAgICAgdGhpcy5zZXRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZFxuICAgICAgICAgKiBAbWV0aG9kIGFkZENoaWxkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERPTUVsZW1lbnQgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpcyBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICB0aGlzLmFkZENoaWxkKGRvbUVsZW1lbnRJbnN0YW5jZSk7XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gWW91IGNhbm5vdCB1c2UgdGhlIGFkZENoaWxkIG1ldGhvZCBpZiB0aGUgcGFyZW50IG9iamVjdCBpcyBub3QgYWRkZWQgdG8gdGhlIERPTS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuYWRkQ2hpbGQuY2FsbCh0aGlzLCBjaGlsZCk7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbXB0eSBqUXVlcnkgb2JqZWN0IGlzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGVuIGRvbid0IHJ1biB0aGUgY29kZSBiZWxvdy5cbiAgICAgICAgICAgIGlmIChjaGlsZC5faXNSZWZlcmVuY2UgPT09IHRydWUgJiYgY2hpbGQuJGVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGQuaXNDcmVhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOyAvLyBSZW5kZXIgdGhlIGl0ZW0gYmVmb3JlIGFkZGluZyB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgY2hpbGQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBjaGlsZCBvYmplY3QgaXMgbm90IGEgcmVmZXJlbmNlIG9mIGEgalF1ZXJ5IG9iamVjdCBpbiB0aGUgRE9NIHRoZW4gYXBwZW5kIGl0LlxuICAgICAgICAgICAgaWYgKGNoaWxkLl9pc1JlZmVyZW5jZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LmFwcGVuZChjaGlsZC4kZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIHRoZSBzanNJZCB0byB0aGUgRE9NIGVsZW1lbnQgc28gd2UgY2FuIGtub3cgd2hhdCB3aGF0IENsYXNzIG9iamVjdCB0aGUgSFRNTEVsZW1lbnQgYmVsb25ncyB0b28uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX2FkZENsaWVudFNpZGVJZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCB0aGUgc2pzSWQgdG9vLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5fYWRkQ2xpZW50U2lkZUlkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcbiAgICAgICAgICAgIHZhciBpZCA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJyk7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGVtIGFycmF5J3Mgc28gdGhlIGpvaW4gbWV0aG9kIHdpbGwgd29yay5cbiAgICAgICAgICAgICAgICB0eXBlID0gW2NoaWxkLmdldFF1YWxpZmllZENsYXNzTmFtZSgpXTtcbiAgICAgICAgICAgICAgICBpZCA9IFtjaGlsZC5zanNJZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGVtIHNvIHdlIGNhbiBwdXNoL2FkZCB0aGUgbmV3IHZhbHVlcy5cbiAgICAgICAgICAgICAgICB0eXBlID0gdHlwZS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIGlkID0gaWQuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICB0eXBlLnB1c2goY2hpbGQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkpO1xuICAgICAgICAgICAgICAgIGlkLnB1c2goY2hpbGQuc2pzSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlZCBsaXN0IG9mIGlkJ3MgYW5kIHR5cGVzXG4gICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcsIGlkLmpvaW4oJywnKSk7XG4gICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJywgdHlwZS5qb2luKCcsJykpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyB0aGUgc2pzSWQgYW5kIGNsYXNzIHR5cGUgZnJvbSB0aGUgSFRNTEVsZW1lbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX3JlbW92ZUNsaWVudFNpZGVJZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCB0aGUgc2pzSWQgdG9vLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5fcmVtb3ZlQ2xpZW50U2lkZUlkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcbiAgICAgICAgICAgIHZhciBpZCA9IGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJyk7XG4gICAgICAgICAgICAvLyBTcGxpdCB0aGVtIHNvIHdlIGNhbiByZW1vdmUgdGhlIGNoaWxkIHNqc0lkIGFuZCB0eXBlLlxuICAgICAgICAgICAgdmFyIHR5cGVMaXN0ID0gdHlwZS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgdmFyIGlkTGlzdCA9IGlkLnNwbGl0KCcsJykubWFwKE51bWJlcik7IC8vIENvbnZlcnQgZWFjaCBpdGVtIGludG8gYSBudW1iZXIuXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpZExpc3QuaW5kZXhPZihjaGlsZC5zanNJZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaWQgYW5kIHR5cGUgZnJvbSB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgdHlwZUxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpZExpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGVkIGxpc3Qgb2YgaWQncyBhbmQgdHlwZXNcbiAgICAgICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJywgdHlwZUxpc3Quam9pbignLCcpKTtcbiAgICAgICAgICAgICAgICBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcsIGlkTGlzdC5qb2luKCcsJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGlkTGlzdC5sZW5ndGggPT09IDA7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY2hpbGQgb2JqZWN0IGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAgICAgICAqIFRoZSBtZXRob2Qgd2lsbCBjYWxsIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnQvbGF5b3V0Om1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBhbmQgZGlzcGF0Y2ggdGhlIEJhc2VFdmVudC5BRERFRF9UT19TVEFHRSBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfb25BZGRlZFRvRG9tXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLl9vbkFkZGVkVG9Eb20gPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBjaGlsZC5jaGVja0NvdW50Kys7XG4gICAgICAgICAgICBpZiAoY2hpbGQuJGVsZW1lbnQud2lkdGgoKSA9PT0gMCAmJiBjaGlsZC5jaGVja0NvdW50IDwgNSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FkZENsaWVudFNpZGVJZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC53aWR0aCA9IGNoaWxkLiRlbGVtZW50LndpZHRoKCk7XG4gICAgICAgICAgICBjaGlsZC5oZWlnaHQgPSBjaGlsZC4kZWxlbWVudC5oZWlnaHQoKTtcbiAgICAgICAgICAgIGNoaWxkLnNldFNpemUoY2hpbGQud2lkdGgsIGNoaWxkLmhlaWdodCk7XG4gICAgICAgICAgICBjaGlsZC5lbmFibGUoKTtcbiAgICAgICAgICAgIGNoaWxkLmxheW91dCgpO1xuICAgICAgICAgICAgY2hpbGQuZGlzcGF0Y2hFdmVudChuZXcgQmFzZUV2ZW50XzEuZGVmYXVsdChCYXNlRXZlbnRfMS5kZWZhdWx0LkFEREVEX1RPX1NUQUdFKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCk7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgLy8gSWYgYW4gZW1wdHkgalF1ZXJ5IG9iamVjdCBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgdGhlbiBkb24ndCBydW4gdGhlIGNvZGUgYmVsb3cuXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaW5kZXggcGFzc2VkIGluIGlzIGxlc3MgdGhhbiAwIGFuZCBncmVhdGVyIHRoYW4gdGhlIHRvdGFsIG51bWJlciBvZiBjaGlsZHJlbiB0aGVuIHBsYWNlIHRoZSBpdGVtIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFbHNlIGdldCB0aGUgY2hpbGQgaW4gdGhlIGNoaWxkcmVuIGFycmF5IGJ5IHRoZSBpbmRleCBwYXNzZWQgaW4gYW5kIHBsYWNlIHRoZSBpdGVtIGJlZm9yZSB0aGF0IGNoaWxkLlxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc0NyZWF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOyAvLyBSZW5kZXIgdGhlIGl0ZW0gYmVmb3JlIGFkZGluZyB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEFkZHMgdGhlIGNoaWxkIGF0IGEgc3BlY2lmaWMgaW5kZXggYnV0IGFsc28gd2lsbCByZW1vdmUgdGhlIGNoaWxkIGZyb20gYW5vdGhlciBwYXJlbnQgb2JqZWN0IGlmIG9uZSBleGlzdHMuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgICAgICAvLyBBZGRzIHRoZSBjaGlsZCBiZWZvcmUgYW55IGNoaWxkIGFscmVhZHkgYWRkZWQgaW4gdGhlIERPTS5cbiAgICAgICAgICAgICAgICBqcXVlcnlfZXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoY2hpbGRyZW4uZ2V0KGluZGV4KSkuYmVmb3JlKGNoaWxkLiRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnN3YXBDaGlsZHJlblxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkMSwgY2hpbGQyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQxSW5kZXggPSBjaGlsZDEuJGVsZW1lbnQuaW5kZXgoKTtcbiAgICAgICAgICAgIHZhciBjaGlsZDJJbmRleCA9IGNoaWxkMi4kZWxlbWVudC5pbmRleCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMSwgY2hpbGQySW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMiwgY2hpbGQxSW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmdldENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmdldENoaWxkQXQuY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgRE9NRWxlbWVudCBvYmplY3Qgd2l0aCB0aGUgZmlyc3QgZm91bmQgRE9NIGVsZW1lbnQgYnkgdGhlIHBhc3NlZCBpbiBzZWxlY3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gc2VsZWN0b3Ige3N0cmluZ30gRE9NIGlkIG5hbWUsIERPTSBjbGFzcyBuYW1lIG9yIGEgRE9NIHRhZyBuYW1lLlxuICAgICAgICAgKiBAcmV0dXJucyB7RE9NRWxlbWVudH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3QgbWF0Y2ggZnJvbSB0aGUgc2VsZWN0b3IgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGpRdWVyeUVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LmZpbmQoc2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICAgICBpZiAoalF1ZXJ5RWxlbWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBnZXRDaGlsZCgnICsgc2VsZWN0b3IgKyAnKSBDYW5ub3QgZmluZCBET00gJGVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZWxlbWVudCBoYXMgYSBzanNJZCB2YWx1ZSBhbmQgaXMgYSBjaGlsZCBvZiB0aGlzIHBhcmVudCBvYmplY3QuXG4gICAgICAgICAgICB2YXIgc2pzSWQgPSBwYXJzZUludChqUXVlcnlFbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJykpO1xuICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSB0aGlzLmdldENoaWxkQnlDaWQoc2pzSWQpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlcyBhIERPTUVsZW1lbnQgZnJvbSB0aGUgalF1ZXJ5RWxlbWVudC5cbiAgICAgICAgICAgIGlmIChkb21FbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgRE9NRWxlbWVudCBhbmQgYXNzaWduIHRoZSBqUXVlcnkgZWxlbWVudCB0byBpdC5cbiAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0galF1ZXJ5RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC5lbGVtZW50ID0galF1ZXJ5RWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCBpdCBhbHJlYWR5IGV4aXN0cyBhbmQgd2UgYXJlIGp1c3QgZ2V0dGluZyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGRDaGlsZC5jYWxsKHRoaXMsIGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGFsbCB0aGUgSFRNTCBlbGVtZW50cyBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZHJlblxuICAgICAgICAgKiBAcGFyYW0gW3NlbGVjdG9yXSB7c3RyaW5nfSBZb3UgY2FuIHBhc3MgaW4gYW55IHR5cGUgb2YgalF1ZXJ5IHNlbGVjdG9yLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RvciBwYXNzZWQgaW4gaXQgd2lsbCBnZXQgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIHBhcmVudCBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXkuPERPTUVsZW1lbnQ+fSBSZXR1cm5zIGEgbGlzdCBvZiBET01FbGVtZW50J3MuIEl0IHdpbGwgZ3JhYiBhbGwgY2hpbGRyZW4gSFRNTCBET00gZWxlbWVudHMgb2YgdGhpcyBvYmplY3QgYW5kIHdpbGwgY3JlYXRlIGEgRE9NRWxlbWVudCBmb3IgZWFjaCBET00gY2hpbGQuXG4gICAgICAgICAqIElmIHRoZSAnZGF0YS1zanMtaWQnIHByb3BlcnR5IGV4aXN0cyBpcyBvbiBhbiBIVE1MIGVsZW1lbnQgYSBET01FbGVtZW50IHdpbGwgbm90IGJlIGNyZWF0ZWQgZm9yIHRoYXQgZWxlbWVudCBiZWNhdXNlIGl0IHdpbGwgYmUgYXNzdW1lZCBpdCBhbHJlYWR5IGV4aXN0cyBhcyBhIERPTUVsZW1lbnQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgPT09IHZvaWQgMCkgeyBzZWxlY3RvciA9ICcnOyB9XG4gICAgICAgICAgICAvL1RPRE86IE1ha2Ugc3VyZSB0aGUgaW5kZXggb2YgdGhlIGNoaWxkcmVuIGFkZGVkIGlzIHRoZSBzYW1lIGFzIHRoZSB3aGF0IGlzIGluIHRoZSBhY3R1YWwgRE9NLlxuICAgICAgICAgICAgdmFyICRjaGlsZDtcbiAgICAgICAgICAgIHZhciBkb21FbGVtZW50O1xuICAgICAgICAgICAgdmFyICRsaXN0ID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbihzZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgbGlzdExlbmd0aCA9ICRsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxpc3RMZW5ndGg7IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgJGNoaWxkID0gJGxpc3QuZXEoaV8xKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgalF1ZXJ5IGVsZW1lbnQgYWxyZWFkeSBoYXMgc2pzSWQgZGF0YSBwcm9wZXJ0eSB0aGVuIGl0IG11c3QgYmUgYW4gZXhpc3RpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lciAoRE9NRWxlbWVudCkgaW4gdGhlIGNoaWxkcmVuIGFycmF5LlxuICAgICAgICAgICAgICAgIGlmICgkY2hpbGQuYXR0cignZGF0YS1zanMtaWQnKSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBuZXcgRE9NRWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0gJGNoaWxkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuZWxlbWVudCA9ICRjaGlsZC5nZXQoMCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmFkZENoaWxkLmNhbGwodGhpcywgZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY2hpbGQgb2JqZWN0IGluc3RhbmNlIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIG51bGwgYW5kIHRoZSBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgdGhlcmUgYXJlIG5vIG90aGVyIHJlZmVyZW5jZXNcbiAgICAgICAgICogdG8gdGhlIGNoaWxkLiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdmFyIHJlbW92ZSA9IHRoaXMuX3JlbW92ZUNsaWVudFNpZGVJZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAvLyBDaGVja3MgaWYgZGVzdHJveSB3YXMgY2FsbGVkIGJlZm9yZSByZW1vdmVDaGlsZCBzbyBpdCBkb2Vzbid0IGVycm9yLlxuICAgICAgICAgICAgaWYgKHJlbW92ZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRBdFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhbGwgY2hpbGQgb2JqZWN0IGluc3RhbmNlcyBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byBudWxsIGFuZCB0aGUgb2JqZWN0cyBhcmUgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgbm8gb3RoZXJcbiAgICAgICAgICogcmVmZXJlbmNlcyB0byB0aGUgY2hpbGRyZW4gZXhpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRyZW5cbiAgICAgICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdm9pZCAwKSB7IGRlc3Ryb3kgPSB0cnVlOyB9XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuLnBvcCgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuZW1wdHkoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5kZXN0cm95XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gTm90ZTogd2UgY2FuJ3QganVzdCBjYWxsIGRlc3Ryb3kgdG8gcmVtb3ZlIHRoZSBIVE1MRWxlbWVudCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyIHZpZXdzIG1hbmFnaW5nIHRoZSBzYW1lIEhUTUxFbGVtZW50LlxuICAgICAgICAgICAgLyppZiAodGhpcy4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgd2F5IHRvIGluc3RhbnRpYXRlIHZpZXcgY2xhc3NlcyBieSBmb3VuZCBodG1sIHNlbGVjdG9ycy5cbiAgICAgICAgICpcbiAgICAgICAgICogRXhhbXBsZTogSXQgd2lsbCBmaW5kIGFsbCBjaGlsZHJlbiBlbGVtZW50cyBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRE9NRWxlbWVudC8kZWxlbWVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBwcm9wZXJ0eSB3aXRoIHRoZSAnanMtc2hhcmVFbWFpbCcgc2VsZWN0b3IuXG4gICAgICAgICAqIElmIGFueSBzZWxlY3RvcnMgYXJlIGZvdW5kIHRoZSBFbWFpbFNoYXJlQ29tcG9uZW50IGNsYXNzIHdpbGwgYmUgaW5zdGFudGlhdGVkIGFuZCBwYXNzIHRoZSBmb3VuZCBqUXVlcnkgZWxlbWVudCBpbnRvIHRoZSBjb250cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbXBvbmVudHNcbiAgICAgICAgICogQHBhcmFtIGNvbXBvbmVudExpc3QgKEFycmF5Ljx7IHNlbGVjdG9yOiBzdHJpbmc7IGNvbXBvbmVudDogRE9NRWxlbWVudCB9PlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48RE9NRWxlbWVudD59IFJldHVybnMgYWxsIHRoZSBpdGVtcyBjcmVhdGVkIGZyb20gdGhpcyBjcmVhdGVDb21wb25lbnRzIG1ldGhvZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKFtcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1zaGFyZUVtYWlsJywgY29tcG9uZW50OiBFbWFpbFNoYXJlQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1wYWdpbmF0aW9uJywgY29tcG9uZW50OiBQYWdpbmF0aW9uQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1jYXJvdXNlbCcsIGNvbXBvbmVudDogQ2Fyb3VzZWxDb21wb25lbnR9XG4gICAgICAgICAqICAgICAgICAgIF0pO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoY29tcG9uZW50TGlzdCkge1xuICAgICAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgICAgICB2YXIgY3JlYXRlZENoaWxkcmVuID0gW107XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29tcG9uZW50TGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8yID0gMDsgaV8yIDwgbGVuZ3RoOyBpXzIrKykge1xuICAgICAgICAgICAgICAgIG9iaiA9IGNvbXBvbmVudExpc3RbaV8yXTtcbiAgICAgICAgICAgICAgICBsaXN0ID0gQ29tcG9uZW50RmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlKHRoaXMuJGVsZW1lbnQuZmluZChvYmouc2VsZWN0b3IpLCBvYmouY29tcG9uZW50LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVkQ2hpbGRyZW4gPSBjcmVhdGVkQ2hpbGRyZW4uY29uY2F0KGxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZWRDaGlsZHJlbjtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERPTUVsZW1lbnQ7XG4gICAgfSkoRGlzcGxheU9iamVjdENvbnRhaW5lcl8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBET01FbGVtZW50O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRXZlbnREaXNwYXRjaGVyXzEgPSByZXF1aXJlKCcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRGlzcGxheU9iamVjdFxuICAgICAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBEaXNwbGF5T2JqZWN0ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKERpc3BsYXlPYmplY3QsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIERpc3BsYXlPYmplY3QoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIFN0YWdlIG9mIHRoZSBkaXNwbGF5IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc3RhZ2VcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc3RhZ2UgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIGludGVyZmFjZSBwcm92aWRlcyB0aGUgMkQgcmVuZGVyaW5nIGNvbnRleHQgZm9yIHRoZSBkcmF3aW5nIHN1cmZhY2Ugb2YgYSBjYW52YXMgZWxlbWVudC5cbiAgICAgICAgICAgICAqIFRoaXMgcHJvcGVydHkgaXMgb25seSB1c2VkIHdpdGggdGhlIGNhbnZhcyBzcGVjaWZpYyBkaXNwbGF5IG9iamVjdHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGN0eFxuICAgICAgICAgICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jdHggPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHggcG9zaXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgeSBwb3NpdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgeVxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSB3aWR0aCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiB0aGUgZGlzcGxheSBvYmplY3QsIGluIHBpeGVscy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgdW5zY2FsZWRXaWR0aC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdW5zY2FsZWRXaWR0aFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkV2lkdGggPSAxMDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgdW5zY2FsZWRIZWlnaHQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHVuc2NhbGVkSGVpZ2h0XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMTAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudW5zY2FsZWRIZWlnaHQgPSAxMDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgaG9yaXpvbnRhbCBzY2FsZSAocGVyY2VudGFnZSkgb2YgdGhlIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVYXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnNjYWxlWCA9IDE7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgdmVydGljYWwgc2NhbGUgKHBlcmNlbnRhZ2UpIG9mIGFuIG9iamVjdCBhcyBhcHBsaWVkIGZyb20gdGhlIHJlZ2lzdHJhdGlvbiBwb2ludCBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVlcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2NhbGVZID0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSByb3RhdGlvbiBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSwgaW4gZGVncmVlcywgZnJvbSBpdHMgb3JpZ2luYWwgb3JpZW50YXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBhbHBoYSB0cmFuc3BhcmVuY3kgdmFsdWUgb2YgdGhlIG9iamVjdCBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGFscGhhXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogV2hldGhlciBvciBub3QgdGhlIGRpc3BsYXkgb2JqZWN0IGlzIHZpc2libGUuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHZpc2libGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTcGVjaWZpZXMgd2hldGhlciB0aGlzIG9iamVjdCByZWNlaXZlcyBtb3VzZVxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBtb3VzZUVuYWJsZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm1vdXNlRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIEJvb2xlYW4gdmFsdWUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcG9pbnRpbmcgaGFuZCAoaGFuZCBjdXJzb3IpIGFwcGVhcnMgd2hlbiB0aGUgcG9pbnRlciByb2xscyBvdmVyIGEgZGlzcGxheSBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHVzZUhhbmRDdXJzb3JcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnVzZUhhbmRDdXJzb3IgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGlzQ3JlYXRlZCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgaWYgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhpcyBEaXNwbGF5T2JqZWN0IGlzIGNyZWF0ZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGlzQ3JlYXRlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGluc3RhbmNlIG5hbWUgb2YgdGhlIERpc3BsYXlPYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG5hbWVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjcmVhdGUgZnVuY3Rpb24gaXMgaW50ZW5kZWQgdG8gcHJvdmlkZSBhIGNvbnNpc3RlbnQgcGxhY2UgZm9yIHRoZSBjcmVhdGlvbiBvciBpbml0aWFsaXppbmcgdGhlIHZpZXcuXG4gICAgICAgICAqIEl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBjYWxsZWQgdGhlIGZpcnN0IHRpbWUgdGhhdCB0aGUgdmlldyBpcyBhZGRlZCB0byBhIERpc3BsYXlPYmplY3RDb250YWluZXIuXG4gICAgICAgICAqIEl0IGlzIGNyaXRpY2FsIHRoYXQgYWxsIHN1YmNsYXNzZXMgY2FsbCB0aGUgc3VwZXIgZm9yIHRoaXMgZnVuY3Rpb24gaW4gdGhlaXIgb3ZlcnJpZGRlbiBtZXRob2RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbGF5b3V0IG1ldGhvZCBwcm92aWRlcyBhIGNvbW1vbiBmdW5jdGlvbiB0byBoYW5kbGUgdXBkYXRpbmcgb2JqZWN0cyBpbiB0aGUgdmlldy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBsYXlvdXRcbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLmxheW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNldFNpemUgbWV0aG9kIHNldHMgdGhlIGJvdW5kcyB3aXRoaW4gd2hpY2ggdGhlIGNvbnRhaW5pbmcgRGlzcGxheU9iamVjdCB3b3VsZCBsaWtlIHRoYXQgY29tcG9uZW50IHRvIGxheSBpdHNlbGYgb3V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gdW5zY2FsZWRXaWR0aCB7bnVtYmVyfSBUaGUgd2lkdGggd2l0aGluIHdoaWNoIHRoZSBjb21wb25lbnQgc2hvdWxkIGxheSBpdHNlbGYgb3V0LlxuICAgICAgICAgKiBAcGFyYW0gdW5zY2FsZWRIZWlnaHQge251bWJlcn0gVGhlIGhlaWdodCB3aXRoaW4gd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgbGF5IGl0c2VsZiBvdXQuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gKHVuc2NhbGVkV2lkdGgsIHVuc2NhbGVkSGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkV2lkdGggPSB1bnNjYWxlZFdpZHRoO1xuICAgICAgICAgICAgdGhpcy51bnNjYWxlZEhlaWdodCA9IHVuc2NhbGVkSGVpZ2h0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZWFkZXJTdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnNhdmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUucmVuZGVyQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3R4ID09PSBudWxsIHx8IHRoaXMuYWxwaGEgPD0gMCB8fCB0aGlzLnZpc2libGUgPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3JlYWRlclN0YXJ0KCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5nbG9iYWxBbHBoYSA9IHRoaXMuYWxwaGE7XG4gICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRW5kKCk7XG4gICAgICAgIH07XG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLl9yZW5kZXJFbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEaXNwbGF5T2JqZWN0O1xuICAgIH0pKEV2ZW50RGlzcGF0Y2hlcl8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBEaXNwbGF5T2JqZWN0O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0Rpc3BsYXlPYmplY3QnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRGlzcGxheU9iamVjdF8xID0gcmVxdWlyZSgnLi9EaXNwbGF5T2JqZWN0Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIHBsYWNlZCBvbiB0aGUgZGlzcGxheSBsaXN0LlxuICAgICAqXG4gICAgICogQGNsYXNzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAZXh0ZW5kcyBEaXNwbGF5T2JqZWN0XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdmlld1xuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgRGlzcGxheU9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBEaXNwbGF5T2JqZWN0Q29udGFpbmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKERpc3BsYXlPYmplY3RDb250YWluZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIERpc3BsYXlPYmplY3RDb250YWluZXIoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIG9mIHRoaXMgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBudW1DaGlsZHJlblxuICAgICAgICAgICAgICogQHR5cGUge2ludH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIHRvIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY2hpbGRyZW5cbiAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheS48RGlzcGxheU9iamVjdD59XG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBjaGlsZHJlbiBvZiB0aGUgb2JqZWN0IGFyZSBtb3VzZSBlbmFibGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBtb3VzZUNoaWxkcmVuXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5tb3VzZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS4gVGhlIGNoaWxkIGlzIGFkZGVkIHRvIHRoZSBmcm9udCAodG9wKSBvZiBhbGwgb3RoZXJcbiAgICAgICAgICogY2hpbGRyZW4gaW4gdGhpcyBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLiAoVG8gYWRkIGEgY2hpbGQgdG8gYSBzcGVjaWZpYyBpbmRleCBwb3NpdGlvbiwgdXNlIHRoZSBhZGRDaGlsZEF0KCkgbWV0aG9kLilcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgeW91IGFkZCBhIGNoaWxkIG9iamVjdCB0aGF0IGFscmVhZHkgaGFzIGEgZGlmZmVyZW50IHBhcmVudCwgdGhlIG9iamVjdCBpcyByZW1vdmVkIGZyb20gdGhlIGNoaWxkXG4gICAgICAgICAqIGxpc3Qgb2YgdGhlIG90aGVyIHBhcmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgLy9JZiB0aGUgY2hpbGQgYmVpbmcgcGFzc2VkIGluIGFscmVhZHkgaGFzIGEgcGFyZW50IHRoZW4gcmVtb3ZlIHRoZSByZWZlcmVuY2UgZnJvbSB0aGVyZS5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lckNvbnRhaW5lciBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIGNoaWxkIGlzIGFkZGVkIGF0IHRoZSBpbmRleCBwb3NpdGlvbiBzcGVjaWZpZWQuIEFuIGluZGV4IG9mIDAgcmVwcmVzZW50cyB0aGUgYmFja1xuICAgICAgICAgKiAoYm90dG9tKSBvZiB0aGUgZGlzcGxheSBsaXN0IGZvciB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZENoaWxkQXRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzIG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogQHBhcmFtIGluZGV4IHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiB0byB3aGljaCB0aGUgY2hpbGQgaXMgYWRkZWQuIElmIHlvdSBzcGVjaWZ5IGEgY3VycmVudGx5IG9jY3VwaWVkIGluZGV4IHBvc2l0aW9uLCB0aGUgY2hpbGQgb2JqZWN0IHRoYXQgZXhpc3RzIGF0IHRoYXQgcG9zaXRpb24gYW5kIGFsbCBoaWdoZXIgcG9zaXRpb25zIGFyZSBtb3ZlZCB1cCBvbmUgcG9zaXRpb24gaW4gdGhlIGNoaWxkIGxpc3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuICAgICAgICAgICAgLy9JZiB0aGUgY2hpbGQgYmVpbmcgcGFzc2VkIGluIGFscmVhZHkgaGFzIGEgcGFyZW50IHRoZW4gcmVtb3ZlIHRoZSByZWZlcmVuY2UgZnJvbSB0aGVyZS5cbiAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjaGlsZCBvYmplY3QgaW5zdGFuY2UgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZCBpcyBzZXQgdG8gbnVsbCAsIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyIHJlZmVyZW5jZXNcbiAgICAgICAgICogdG8gdGhlIGNoaWxkIGV4aXN0LiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmVzIHRoZSBjaGlsZCBvYmplY3QgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2VzIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGRyZW4gaXMgc2V0IHRvIG51bGwgLCBhbmQgdGhlIG9iamVjdHMgYXJlIGdhcmJhZ2UgY29sbGVjdGVkIGlmXG4gICAgICAgICAqIG5vIG90aGVyIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkcmVuIGV4aXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkcmVuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY2hpbGRyZW4ucG9wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTd2FwcyB0d28gRGlzcGxheU9iamVjdCdzIHdpdGggZWFjaCBvdGhlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzd2FwQ2hpbGRyZW5cbiAgICAgICAgICogQHBhcmFtIGNoaWxkMSB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYmUgc3dhcC5cbiAgICAgICAgICogQHBhcmFtIGNoaWxkMiB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYmUgc3dhcC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uIChjaGlsZDEsIGNoaWxkMikge1xuICAgICAgICAgICAgdmFyIGNoaWxkMUluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkMSk7XG4gICAgICAgICAgICB2YXIgY2hpbGQySW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQyKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDEsIGNoaWxkMkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDIsIGNoaWxkMUluZGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN3YXBzIGNoaWxkIG9iamVjdHMgYXQgdGhlIHR3byBzcGVjaWZpZWQgaW5kZXggcG9zaXRpb25zIGluIHRoZSBjaGlsZCBsaXN0LiBBbGwgb3RoZXIgY2hpbGQgb2JqZWN0cyBpbiB0aGUgZGlzcGxheSBvYmplY3QgY29udGFpbmVyIHJlbWFpbiBpbiB0aGUgc2FtZSBpbmRleCBwb3NpdGlvbnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3dhcENoaWxkcmVuQXRcbiAgICAgICAgICogQHBhcmFtIGluZGV4MSB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGZpcnN0IGNoaWxkIG9iamVjdC5cbiAgICAgICAgICogQHBhcmFtIGluZGV4MiB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIHNlY29uZCBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zd2FwQ2hpbGRyZW5BdCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgICAgICAgICAgaWYgKGluZGV4MSA8IDAgfHwgaW5kZXgxIDwgMCB8fCBpbmRleDEgPj0gdGhpcy5udW1DaGlsZHJlbiB8fCBpbmRleDIgPj0gdGhpcy5udW1DaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1snICsgdGhpcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICddIGluZGV4IHZhbHVlKHMpIGNhbm5vdCBiZSBvdXQgb2YgYm91bmRzLiBpbmRleDEgdmFsdWUgaXMgJyArIGluZGV4MSArICcgaW5kZXgyIHZhbHVlIGlzICcgKyBpbmRleDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoaWxkMSA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleDEpO1xuICAgICAgICAgICAgdmFyIGNoaWxkMiA9IHRoaXMuZ2V0Q2hpbGRBdChpbmRleDIpO1xuICAgICAgICAgICAgdGhpcy5zd2FwQ2hpbGRyZW4oY2hpbGQxLCBjaGlsZDIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBwb3NpdGlvbiBvZiBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRJbmRleFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGlkZW50aWZ5LlxuICAgICAgICAgKiBAcmV0dXJucyB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IHRvIGlkZW50aWZ5LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEluZGV4ID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIGRpc3BsYXkgb2JqZWN0IGlzIGEgY2hpbGQgb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2Ugb3IgdGhlIGluc3RhbmNlIGl0c2VsZi4gVGhlIHNlYXJjaCBpbmNsdWRlcyB0aGUgZW50aXJlIGRpc3BsYXkgbGlzdCBpbmNsdWRpbmcgdGhpcyBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIGNoaWxkIG9iamVjdCB0byB0ZXN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gIHRydWUgaWYgdGhlIGNoaWxkIG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZSBEaXNwbGF5T2JqZWN0IG9yIHRoZSBjb250YWluZXIgaXRzZWxmOyBvdGhlcndpc2UgZmFsc2UuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSA+PSAwO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgaW5zdGFuY2UgdGhhdCBleGlzdHMgYXQgdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZEF0XG4gICAgICAgICAqIEBwYXJhbSBpbmRleCB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNoaWxkIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhIERpc3BsYXlPYmplY3QgYnkgaXRzIHNqc0lkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENoaWxkQnlDaWRcbiAgICAgICAgICogQHBhcmFtIHNqc0lkIHtudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fG51bGx9XG4gICAgICAgICAqIEBvdmVycmlkZVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEJ5Q2lkID0gZnVuY3Rpb24gKHNqc0lkKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBudWxsO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gdGhpcy5udW1DaGlsZHJlbiAtIDE7IGlfMSA+PSAwOyBpXzEtLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW2lfMV0uc2pzSWQgPT0gc2pzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSB0aGlzLmNoaWxkcmVuW2lfMV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERpc3BsYXlPYmplY3RDb250YWluZXI7XG4gICAgfSkoRGlzcGxheU9iamVjdF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0RPTUVsZW1lbnQnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgRE9NRWxlbWVudF8xID0gcmVxdWlyZSgnLi9ET01FbGVtZW50Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIHNob3VsZCBiZSBleHRlbmRlZCBieSB5b3VyIG1haW4gYXBwbGljYXRpb24gb3Igcm9vdCBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBTdGFnZVxuICAgICAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB2aWV3XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBET01FbGVtZW50XG4gICAgICogQHJlcXVpcmVzIGpRdWVyeVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIFRoaXMgZXhhbXBsZSBpbGx1c3RyYXRlcyBob3cgdG8gc2V0dXAgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3Mgd2hlbiBleHRlbmRpbmcgdGhlIHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICAgICAqICAgICAgICAgY2xhc3MgTWFpbkNsYXNzIGV4dGVuZHMgU3RhZ2Uge1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgY3JlYXRlKCkge1xuICAgICAqICAgICAgICAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzIH07XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpcyB9O1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgfVxuICAgICAqXG4gICAgICpcbiAgICAgKiA8Yj5JbnN0YW50aWF0aW9uIEV4YW1wbGU8L2I+PGJyPlxuICAgICAqIFRoaXMgZXhhbXBsZSBpbGx1c3RyYXRlcyBob3cgdG8gaW5zdGFudGlhdGUgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgIGxldCBhcHAgPSBuZXcgTWFpbkNsYXNzKCk7XG4gICAgICogICAgICBhcHAuYXBwZW5kVG8oJ2JvZHknKTtcbiAgICAgKlxuICAgICAqL1xuICAgIHZhciBTdGFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhTdGFnZSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gU3RhZ2UoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNlbGVjdGVkIEhUTUwgZWxlbWVudCB3aGVyZSB0aGUgY2hpbGQgZWxlbWVudHMgd2lsbCBiZSBjcmVhdGVkLiBUaGlzIG1ldGhvZCBzdGFydHMgdGhlIGxpZmVjeWNsZSBvZiB0aGUgYXBwbGljYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYXBwZW5kVG9cbiAgICAgICAgICogQHBhcmFtIHR5cGUge2FueX0gQSBzdHJpbmcgdmFsdWUgd2hlcmUgeW91ciBhcHBsaWNhdGlvbiB3aWxsIGJlIGFwcGVuZGVkLiBUaGlzIGNhbiBiZSBhbiBlbGVtZW50IGlkICgjc29tZS1pZCksIGVsZW1lbnQgY2xhc3MgKC5zb21lLWNsYXNzKSBvciBhIGVsZW1lbnQgdGFnIChib2R5KS5cbiAgICAgICAgICogQHBhcmFtIFtlbmFibGVkPXRydWVdIHtib29sZWFufSBTZXRzIHRoZSBlbmFibGVkIHN0YXRlIG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIFN0YWdlLnByb3RvdHlwZS5hcHBlbmRUbyA9IGZ1bmN0aW9uICh0eXBlLCBlbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlZCA9PT0gdm9pZCAwKSB7IGVuYWJsZWQgPSB0cnVlOyB9XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gKHR5cGUgaW5zdGFuY2VvZiBqUXVlcnkpID8gdHlwZSA6IGpRdWVyeSh0eXBlKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsaWVudFNpZGVJZCh0aGlzKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdGFnZTtcbiAgICB9KShET01FbGVtZW50XzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFN0YWdlO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9CYXNlT2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEJhc2VPYmplY3RfMSA9IHJlcXVpcmUoJy4uL0Jhc2VPYmplY3QnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHVzZWQgYXMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSBjcmVhdGlvbiBvZiBFdmVudCBvYmplY3RzLCB3aGljaCBhcmUgcGFzc2VkIGFzIHBhcmFtZXRlcnMgdG8gZXZlbnQgbGlzdGVuZXJzIHdoZW4gYW4gZXZlbnQgb2NjdXJzLlxuICAgICAqXG4gICAgICogVGhlIHByb3BlcnRpZXMgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBjYXJyeSBiYXNpYyBpbmZvcm1hdGlvbiBhYm91dCBhbiBldmVudCwgc3VjaCBhcyB0aGUgZXZlbnQncyB0eXBlIG9yIHdoZXRoZXIgdGhlIGV2ZW50J3MgZGVmYXVsdCBiZWhhdmlvciBjYW4gYmUgY2FuY2VsZWQuXG4gICAgICpcbiAgICAgKiBGb3IgbWFueSBldmVudHMsIHN1Y2ggYXMgdGhlIGV2ZW50cyByZXByZXNlbnRlZCBieSB0aGUgRXZlbnQgY2xhc3MgY29uc3RhbnRzLCB0aGlzIGJhc2ljIGluZm9ybWF0aW9uIGlzIHN1ZmZpY2llbnQuIE90aGVyIGV2ZW50cywgaG93ZXZlciwgbWF5IHJlcXVpcmUgbW9yZVxuICAgICAqIGRldGFpbGVkIGluZm9ybWF0aW9uLlxuICAgICAqIEBjbGFzcyBCYXNlRXZlbnRcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuIFRoZSB0eXBlIGlzIGNhc2Utc2Vuc2l0aXZlLlxuICAgICAqIEBwYXJhbSBbYnViYmxlcz1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIGFuIGV2ZW50IGlzIGEgYnViYmxpbmcgZXZlbnQuIElmIHRoZSBldmVudCBjYW4gYnViYmxlLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBOb3RlOiBXaXRoIGV2ZW50LWJ1YmJsaW5nIHlvdSBjYW4gbGV0IG9uZSBFdmVudCBzdWJzZXF1ZW50bHkgY2FsbCBvbiBldmVyeSBhbmNlc3RvciAoe3sjY3Jvc3NMaW5rIFwiRXZlbnREaXNwYXRjaGVyL3BhcmVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSlcbiAgICAgKiAoY29udGFpbmVycyBvZiBjb250YWluZXJzIG9mIGV0Yy4pIG9mIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IHRoYXQgb3JpZ2luYWxseSBkaXNwYXRjaGVkIHRoZSBFdmVudCwgYWxsIHRoZSB3YXkgdXAgdG8gdGhlIHN1cmZhY2UgKHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319KS4gQW55IGNsYXNzZXMgdGhhdCBkbyBub3QgaGF2ZSBhIHBhcmVudCBjYW5ub3QgYnViYmxlLlxuICAgICAqIEBwYXJhbSBbY2FuY2VsYWJsZT1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBiZWhhdmlvciBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50IGNhbiBiZSBwcmV2ZW50ZWQuIElmIHRoZSBiZWhhdmlvciBjYW4gYmUgY2FuY2VsZWQsIHRoaXMgdmFsdWUgaXMgdHJ1ZTsgb3RoZXJ3aXNlIGl0IGlzIGZhbHNlLlxuICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBVc2UgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGV2ZW50XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogaG93IHRvIGNyZWF0ZSBhIGN1c3RvbSBldmVudCBieSBleHRlbmRpbmcgQmFzZUV2ZW50LlxuICAgICAqXG4gICAgICogICAgIGNsYXNzIENvdW50cnlFdmVudCBleHRlbmRzIEJhc2VFdmVudCB7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBDSEFOR0VfQ09VTlRSWSA9ICdDb3VudHJ5RXZlbnQuY2hhbmdlQ291bnRyeSc7XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlLCBidWJibGVzID0gZmFsc2UsIGNhbmNlbGFibGUgPSBmYWxzZSwgZGF0YSA9IG51bGwpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgdGhpcy5jb3VudHJ5TmFtZSA9IG51bGw7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGU6IGhvdyB0byB1c2UgdGhlIGN1c3RvbSBldmVudC5cbiAgICAgKiAgICAgbGV0IGV2ZW50ID0gbmV3IENvdW50cnlFdmVudChDb3VudHJ5RXZlbnQuQ0hBTkdFX0NPVU5UUlkpO1xuICAgICAqICAgICBldmVudC5jb3VudHJ5TmFtZSA9ICdDYW5hZGEnO1xuICAgICAqICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAqL1xuICAgIHZhciBCYXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQmFzZUV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCYXNlRXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGJ1YmJsZXMgPT09IHZvaWQgMCkgeyBidWJibGVzID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmIChjYW5jZWxhYmxlID09PSB2b2lkIDApIHsgY2FuY2VsYWJsZSA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHR5cGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCB0aGF0IG9yaWdpbmFsbHkgZGlzcGF0Y2hlZCB0aGUgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHRhcmdldFxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBjdXJyZW50VGFyZ2V0IHByb3BlcnR5IGFsd2F5cyBwb2ludHMgdG8gdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gdGhhdCB0aGUgZXZlbnQgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcgKGkuZS4gYnViYmxpbmcgYXQpLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50VGFyZ2V0XG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFVzZWQgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBkYXRhXG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBidWJibGVzXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuYnViYmxlcyA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjYW5jZWxhYmxlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY2FuY2VsYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IHdhcyBjYWxsZWQgb24gdGhlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaXNQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50L3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gd2FzIGNhbGxlZCBvbiB0aGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVzO1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gY2FuY2VsYWJsZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXZlbnRzIHByb2Nlc3Npbmcgb2YgYW55IGV2ZW50IGxpc3RlbmVycyBpbiBub2RlcyBzdWJzZXF1ZW50IHRvIHRoZSBjdXJyZW50IG5vZGUgaW4gdGhlIGV2ZW50IGZsb3cuXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGFmZmVjdCBhbnkgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgKGN1cnJlbnRUYXJnZXQpLiBJbiBjb250cmFzdCxcbiAgICAgICAgICogdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCBwcmV2ZW50cyBwcm9jZXNzaW5nXG4gICAgICAgICAqIG9mIGV2ZW50IGxpc3RlbmVycyBpbiBib3RoIHRoZSBjdXJyZW50IG5vZGUgYW5kIHN1YnNlcXVlbnQgbm9kZXMuIEFkZGl0aW9uYWwgY2FsbHMgdG8gdGhpcyBtZXRob2QgaGF2ZSBubyBlZmZlY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3RvcFByb3BhZ2F0aW9uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LnByb3RvdHlwZS5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXZlbnRzIHByb2Nlc3Npbmcgb2YgYW55IGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlIGFuZCBhbnkgc3Vic2VxdWVudCBub2RlcyBpbiB0aGUgZXZlbnQgZmxvdy5cbiAgICAgICAgICogVGhpcyBtZXRob2QgdGFrZXMgZWZmZWN0IGltbWVkaWF0ZWx5LCBhbmQgaXQgYWZmZWN0cyBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZS4gSW4gY29udHJhc3QsXG4gICAgICAgICAqIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcFByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgZG9lc24ndCB0YWtlIGVmZmVjdCB1bnRpbFxuICAgICAgICAgKiBhbGwgdGhlIGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlIGZpbmlzaCBwcm9jZXNzaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvblxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRHVwbGljYXRlcyBhbiBpbnN0YW5jZSBvZiBhbiBCYXNlRXZlbnQgc3ViY2xhc3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgYSBuZXcgQmFzZUV2ZW50IG9iamVjdCB0aGF0IGlzIGEgY29weSBvZiB0aGUgb3JpZ2luYWwgaW5zdGFuY2Ugb2YgdGhlIEJhc2VFdmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBuZXcgQmFzZUV2ZW50IG9iamVjdCBpbmNsdWRlcyBhbGwgdGhlIHByb3BlcnRpZXMgb2YgdGhlIG9yaWdpbmFsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICAgICAqIEByZXR1cm5zIHtCYXNlRXZlbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBjbG9uZU9mRXZlbnQgPSBldmVudC5jbG9uZSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWRCYXNlTW9kZWwgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnR5cGUsIHRoaXMuYnViYmxlcywgdGhpcy5jYW5jZWxhYmxlLCB0aGlzLmRhdGEpO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lZEJhc2VNb2RlbFtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRCYXNlTW9kZWw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFjdGl2YXRlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEFDVElWQVRFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkFDVElWQVRFID0gJ0Jhc2VFdmVudC5hY3RpdmF0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFEREVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFkZGVkIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEFEREVEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkFEREVEID0gJ0Jhc2VFdmVudC5hZGRlZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGFkZGVkVG9TdGFnZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBBRERFRF9UT19TVEFHRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5BRERFRF9UT19TVEFHRSA9ICdCYXNlRXZlbnQuYWRkZWRUb1N0YWdlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0FOQ0VMIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2FuY2VsIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENBTkNFTFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DQU5DRUwgPSAnQmFzZUV2ZW50LmNhbmNlbCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNIQU5HRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNoYW5nZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDSEFOR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0hBTkdFID0gJ0Jhc2VFdmVudC5jaGFuZ2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DTEVBUiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsZWFyIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENMRUFSXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNMRUFSID0gJ0Jhc2VFdmVudC5jbGVhcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNMT1NFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xvc2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0xPU0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0xPU0UgPSAnQmFzZUV2ZW50LmNsb3NlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0xPU0lORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsb3NpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0xPU0lOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DTE9TSU5HID0gJ0Jhc2VFdmVudC5jbG9zaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ09NUExFVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjb21wbGV0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDT01QTEVURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DT01QTEVURSA9ICdCYXNlRXZlbnQuY29tcGxldGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DT05ORUNUIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29ubmVjdCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDT05ORUNUXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNPTk5FQ1QgPSAnQmFzZUV2ZW50LmNvbm5lY3QnO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjb3B5IGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENPUFlcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ09QWSA9ICdCYXNlRXZlbnQuY29weSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGN1dCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDVVRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ1VUID0gJ0Jhc2VFdmVudC5jdXQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ERUFDVElWQVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZGVhY3RpdmF0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBERUFDVElWQVRFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkRFQUNUSVZBVEUgPSAnQmFzZUV2ZW50LmRlYWN0aXZhdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ESVNQTEFZSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZGlzcGxheWluZyBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBESVNQTEFZSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkRJU1BMQVlJTkcgPSAnQmFzZUV2ZW50LmRpc3BsYXlpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5FTlRFUl9GUkFNRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBlbnRlckZyYW1lIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEVOVEVSX0ZSQU1FXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkVOVEVSX0ZSQU1FID0gJ0Jhc2VFdmVudC5lbnRlckZyYW1lJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRVhJVF9GUkFNRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBleGl0RnJhbWUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRVhJVF9GUkFNRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5FWElUX0ZSQU1FID0gJ0Jhc2VFdmVudC5leGl0RnJhbWUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5FWElUSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGV4aXRpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRVhJVElOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5FWElUSU5HID0gJ0Jhc2VFdmVudC5leGl0aW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRlVMTF9TQ1JFRU4gY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBmdWxsU2NyZWVuIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEZVTExTQ1JFRU5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRlVMTFNDUkVFTiA9ICdCYXNlRXZlbnQuZnVsbFNjcmVlbic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LklOSVQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gaW5pdCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBJTklUXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LklOSVQgPSAnQmFzZUV2ZW50LmluaXQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5ORVRXT1JLX0NIQU5HRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIG5ldHdvcmtDaGFuZ2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgTkVUV09SS19DSEFOR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuTkVUV09SS19DSEFOR0UgPSAnQmFzZUV2ZW50Lm5ldHdvcmtDaGFuZ2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5PUEVOIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIG9wZW4gZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgT1BFTlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5PUEVOID0gJ0Jhc2VFdmVudC5vcGVuJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUEFTVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBwYXN0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBQQVNURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5QQVNURSA9ICdCYXNlRXZlbnQucGFzdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5QUkVQQVJJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBwcmVwYXJpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUFJFUEFSSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlBSRVBBUklORyA9ICdCYXNlRXZlbnQucHJlcGFyaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUkVNT1ZFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJlbW92ZWQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUkVNT1ZFRFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5SRU1PVkVEID0gJ0Jhc2VFdmVudC5yZW1vdmVkJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUkVOREVSIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVuZGVyIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFJFTkRFUlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5SRU5ERVIgPSAnQmFzZUV2ZW50LnJlbmRlcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlJFU0laRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJlc2l6ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBSRVNJWkVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUkVTSVpFID0gJ0Jhc2VFdmVudC5yZXNpemUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5TRUxFQ1RFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHNlbGVjdGVkIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFNFTEVDVEVEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlNFTEVDVEVEID0gJ0Jhc2VFdmVudC5zZWxlY3RlZCc7XG4gICAgICAgIHJldHVybiBCYXNlRXZlbnQ7XG4gICAgfSkoQmFzZU9iamVjdF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBCYXNlRXZlbnQ7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0V2ZW50RGlzcGF0Y2hlcicsICcuL0Jhc2VFdmVudCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBFdmVudERpc3BhdGNoZXJfMSA9IHJlcXVpcmUoJy4vRXZlbnREaXNwYXRjaGVyJyk7XG4gICAgdmFyIEJhc2VFdmVudF8xID0gcmVxdWlyZSgnLi9CYXNlRXZlbnQnKTtcbiAgICAvKipcbiAgICAgKiBFdmVudEJyb2tlciBpcyBhIHNpbXBsZSBwdWJsaXNoIGFuZCBzdWJzY3JpYmUgc3RhdGljIGNsYXNzIHRoYXQgeW91IGNhbiB1c2UgdG8gZmlyZSBhbmQgcmVjZWl2ZSBub3RpZmljYXRpb25zLlxuICAgICAqIExvb3NlbHkgY291cGxlZCBldmVudCBoYW5kbGluZywgdGhlIHN1YnNjcmliZXIgZG9lcyBub3Qga25vdyB0aGUgcHVibGlzaGVyLiBCb3RoIG9mIHRoZW0gb25seSBuZWVkIHRvIGtub3cgdGhlIGV2ZW50IHR5cGUuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRCcm9rZXJcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBldmVudFxuICAgICAqIEByZXF1aXJlcyBFdmVudERpc3BhdGNoZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQHN0YXRpY1xuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBFdmVudEJyb2tlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50QnJva2VyKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbRXZlbnRCcm9rZXJdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgRXZlbnRCcm9rZXIgY2xhc3MgYmVjYXVzZSBpdCBpcyBhIHN0YXRpYyBjbGFzcy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9iamVjdCB3aXRoIGFuIEV2ZW50QnJva2VyIG9iamVjdCBzbyB0aGF0IHRoZSBsaXN0ZW5lciByZWNlaXZlcyBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBldmVudC4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSBhIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBvYmplY3Qgb3IgY3VzdG9tIGV2ZW50IHRoYXQgZXh0ZW5kcyB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgRXZlbnRCcm9rZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqICAgICAvLyBFeGFtcGxlIG9mIHVzaW5nIGEgY29uc3RhbnQgZXZlbnQgdHlwZS5cbiAgICAgICAgICogICAgIEV2ZW50QnJva2VyLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBUaGUgZXZlbnQgcGFzc2VkIHRvIHRoZSBtZXRob2Qgd2lsbCBhbHdheXMgYmUgYSBCYXNlRXZlbnQgb2JqZWN0LlxuICAgICAgICAgKiAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQuZGF0YSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEJyb2tlci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICAgICAgRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9iamVjdCBvbmNlIHdpdGggYW4gRXZlbnREaXNwYXRjaGVyIG9iamVjdCBzbyB0aGUgbGlzdGVuZXIgd2lsbCByZWNlaXZlIHRoZSBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lck9uY2VcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgYSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0gb2JqZWN0IG9yIGN1c3RvbSBldmVudCB0aGF0IGV4dGVuZHMgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICAgICAqIEBwYXJhbSBbcHJpb3JpdHk9MF0ge2ludH0gSW5mbHVlbmNlcyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhlIGxpc3RlbmVycyBhcmUgY2FsbGVkLiBMaXN0ZW5lcnMgd2l0aCBsb3dlciBwcmlvcml0aWVzIGFyZSBjYWxsZWQgYWZ0ZXIgb25lcyB3aXRoIGhpZ2hlciBwcmlvcml0aWVzLlxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIEV2ZW50QnJva2VyLmFkZEV2ZW50TGlzdGVuZXJPbmNlKCdjaGFuZ2UnLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICogICAgIC8vIEV4YW1wbGUgb2YgdXNpbmcgYSBjb25zdGFudCBldmVudCB0eXBlLlxuICAgICAgICAgKiAgICAgRXZlbnRCcm9rZXIuYWRkRXZlbnRMaXN0ZW5lck9uY2UoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBUaGUgZXZlbnQgcGFzc2VkIHRvIHRoZSBtZXRob2Qgd2lsbCBhbHdheXMgYmUgYSBCYXNlRXZlbnQgb2JqZWN0LlxuICAgICAgICAgKiAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQuZGF0YSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEJyb2tlci5hZGRFdmVudExpc3RlbmVyT25jZSA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgICAgIEV2ZW50QnJva2VyLl9ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lck9uY2UodHlwZSwgY2FsbGJhY2ssIHNjb3BlLCBwcmlvcml0eSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgc3BlY2lmaWVkIGxpc3RlbmVyIGZyb20gdGhlIEV2ZW50QnJva2VyIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBFdmVudEJyb2tlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIEV2ZW50QnJva2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEJyb2tlci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBzY29wZSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHdheSB0byBsaXN0ZW4gZm9yIG11bHRpcGxlIGV2ZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogSWYgb25seSBsaXN0ZW5pbmcgZm9yIG9uZSBldmVudCB1c2Uge3sjY3Jvc3NMaW5rIFwiRXZlbnRCcm9rZXIvYWRkRXZlbnRMaXN0ZW5lcjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgd2FpdEZvclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRUeXBlcyB7QXJyYXk8c3RyaW5nPn0gQSBsaXN0IG9mIGV2ZW50IHR5cGVzIHlvdSBhcmUgd2FpdGluZyBmb3IuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gYWxsIGV2ZW50IHR5cGVzIGFyZVxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBFdmVudEJyb2tlci53YWl0Rm9yKFsnc29tZUV2ZW50JywgJ2Fub3RoZXJFdmVudCcsIEN1c3RvbUV2ZW50LkNIQU5HRV0sIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnRzKSB7XG4gICAgICAgICAqICAgICAgICAgIC8vIEFuIGFycmF5IG9mIHRoZSBldmVudCBvYmplY3RzIHlvdSB3YWl0ZWQgZm9yLlxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRCcm9rZXIud2FpdEZvciA9IGZ1bmN0aW9uIChldmVudFR5cGVzLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIEV2ZW50QnJva2VyLl93YWl0Rm9yTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBldmVudFR5cGVzOiBldmVudFR5cGVzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBjYWxsYmFja1Njb3BlOiBzY29wZSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIG9uY2U6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgd2F5IHRvIGxpc3RlbiBmb3IgbXVsdGlwbGUgZXZlbnRzLiBPbmNlIGFsbCBldmVudHMgYWxsIGFyZSB0cmlnZ2VyZWQgdGhpcyBsaXN0ZW5lciB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIG9ubHkgbGlzdGVuaW5nIGZvciBvbmUgZXZlbnQgdXNlIHt7I2Nyb3NzTGluayBcIkV2ZW50QnJva2VyL2FkZEV2ZW50TGlzdGVuZXJPbmNlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB3YWl0Rm9yT25jZVxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRUeXBlcyB7QXJyYXk8c3RyaW5nPn0gQSBsaXN0IG9mIGV2ZW50IHR5cGVzIHlvdSBhcmUgd2FpdGluZyBmb3IuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gYWxsIGV2ZW50IHR5cGVzIGFyZVxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBFdmVudEJyb2tlci53YWl0Rm9yT25jZShbJ3NvbWVFdmVudCcsICdhbm90aGVyRXZlbnQnLCBDdXN0b21FdmVudC5DSEFOR0VdLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIF9oYW5kbGVyTWV0aG9kKGV2ZW50cykge1xuICAgICAgICAgKiAgICAgICAgICAvLyBBbiBhcnJheSBvZiB0aGUgZXZlbnQgb2JqZWN0cyB5b3Ugd2FpdGVkIGZvci5cbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50QnJva2VyLndhaXRGb3JPbmNlID0gZnVuY3Rpb24gKGV2ZW50VHlwZXMsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgRXZlbnRCcm9rZXIuX3dhaXRGb3JMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgIGV2ZW50VHlwZXM6IGV2ZW50VHlwZXMsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrU2NvcGU6IHNjb3BlLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHdheSB0byBsaXN0ZW4gZm9yIG11bHRpcGxlIGV2ZW50cy4gT25jZSBhbGwgZXZlbnRzIGFsbCBhcmUgdHJpZ2dlcmVkIGl0IHdpbGwgbm8gbG9uZ2VyXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlV2FpdEZvclxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRUeXBlcyB7QXJyYXk8c3RyaW5nPn0gQSBsaXN0IG9mIGV2ZW50IHR5cGVzIHlvdSBhcmUgd2FpdGluZyBmb3IuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgdHJpZ2dlcmVkIHdoZW4gYWxsIGV2ZW50IHR5cGVzIGFyZVxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBFdmVudEJyb2tlci5yZW1vdmVXYWl0Rm9yKFsnc29tZUV2ZW50JywgJ2Fub3RoZXJFdmVudCcsIEN1c3RvbUV2ZW50LkNIQU5HRV0sIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRCcm9rZXIucmVtb3ZlV2FpdEZvciA9IGZ1bmN0aW9uIChldmVudFR5cGVzLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIHZhciB3YWl0Rm9yT2JqZWN0O1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gRXZlbnRCcm9rZXIuX3dhaXRGb3JMaXN0Lmxlbmd0aCAtIDE7IGlfMSA+PSAwOyBpXzEtLSkge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JPYmplY3QgPSBFdmVudEJyb2tlci5fd2FpdEZvckxpc3RbaV8xXTtcbiAgICAgICAgICAgICAgICBpZiAod2FpdEZvck9iamVjdC5ldmVudFR5cGVzLnRvU3RyaW5nKCkgPT09IGV2ZW50VHlwZXMudG9TdHJpbmcoKSAmJiB3YWl0Rm9yT2JqZWN0LmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiB3YWl0Rm9yT2JqZWN0LmNhbGxiYWNrU2NvcGUgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50QnJva2VyLl93YWl0Rm9yTGlzdC5zcGxpY2UoaV8xLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwYXRjaGVzIGFuIGV2ZW50IHdpdGhpbiB0aGUgRXZlbnRCcm9rZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAgICAgICAgICogQHBhcmFtIGV2ZW50IHtzdHJpbmd8QmFzZUV2ZW50fSBUaGUgRXZlbnQgb2JqZWN0IG9yIGV2ZW50IHR5cGUgc3RyaW5nIHlvdSB3YW50IHRvIGRpc3BhdGNoLlxuICAgICAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF0ge2FueX0gVGhlIG9wdGlvbmFsIGRhdGEgeW91IHdhbnQgdG8gc2VuZCB3aXRoIHRoZSBldmVudC4gRG8gbm90IHVzZSB0aGlzIHBhcmFtZXRlciBpZiB5b3UgYXJlIHBhc3NpbmcgaW4gYSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqIEBwYXJhbSBbc2NvcGU9bnVsbF0ge2FueX0gWW91IGNhbiBvcHRpb25hbGx5IHBhc3MgaW4gdGhlIHRhcmdldCBvZiB0aGUgb2JqZWN0IHRoYXQgZGlzcGF0Y2hlZCB0aGUgZ2xvYmFsIGV2ZW50LiBTaW5jZSB7eyNjcm9zc0xpbmsgXCJFdmVudEJyb2tlclwifX17ey9jcm9zc0xpbmt9fVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBFdmVudEJyb2tlci5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBFeGFtcGxlOiBTZW5kaW5nIGRhdGEgd2l0aCB0aGUgZXZlbnQuXG4gICAgICAgICAqICAgICAgRXZlbnRCcm9rZXIuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJywge3NvbWU6ICdkYXRhJ30pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIEV4YW1wbGU6IFNlbmRpbmcgYSBCYXNlRXZlbnQgb3IgY3VzdG9tIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICogICAgICBsZXQgZXZlbnQgPSBuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5DSEFOR0UpO1xuICAgICAgICAgKiAgICAgIGV2ZW50LmRhdGEgPSB7c29tZTogJ2RhdGEnfTtcbiAgICAgICAgICogICAgICBFdmVudEJyb2tlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50QnJva2VyLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSwgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gRXZlbnRCcm9rZXI7IH1cbiAgICAgICAgICAgIHZhciBldmVudCA9IHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEJhc2VFdmVudF8xLmRlZmF1bHQodHlwZSwgZmFsc2UsIGZhbHNlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IHNjb3BlO1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHNjb3BlO1xuICAgICAgICAgICAgRXZlbnRCcm9rZXIuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIEV2ZW50QnJva2VyLl9kaXNwYXRjaFdhaXRGb3IoZXZlbnQpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGVscGVyIG1ldGhvZCB0byBkaXNwYXRjaCBldmVudHMgb24gdGhlIHdhaXRGb3JPYmplY3Qgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfZGlzcGF0Y2hXYWl0Rm9yXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50QnJva2VyLl9kaXNwYXRjaFdhaXRGb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciB3YWl0Rm9yT2JqZWN0O1xuICAgICAgICAgICAgdmFyIGV2ZW50VHlwZUluZGV4O1xuICAgICAgICAgICAgZm9yICh2YXIgaV8yID0gRXZlbnRCcm9rZXIuX3dhaXRGb3JMaXN0Lmxlbmd0aCAtIDE7IGlfMiA+PSAwOyBpXzItLSkge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JPYmplY3QgPSBFdmVudEJyb2tlci5fd2FpdEZvckxpc3RbaV8yXTtcbiAgICAgICAgICAgICAgICBldmVudFR5cGVJbmRleCA9IHdhaXRGb3JPYmplY3QuZXZlbnRUeXBlcy5pbmRleE9mKGV2ZW50LnR5cGUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGVJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhaXRGb3JPYmplY3QuZXZlbnRzW2V2ZW50VHlwZUluZGV4XSA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAod2FpdEZvck9iamVjdC5ldmVudFR5cGVzLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMod2FpdEZvck9iamVjdC5ldmVudHMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yT2JqZWN0LmNhbGxiYWNrLmNhbGwod2FpdEZvck9iamVjdC5zY29wZSwgd2FpdEZvck9iamVjdC5ldmVudHMpO1xuICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yT2JqZWN0LmV2ZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb25jZSB2YWx1ZSBpcyB0cnVlIHdlIHdhbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciByaWdodCBhZnRlciB0aGlzIGNhbGxiYWNrIHdhcyBjYWxsZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3YWl0Rm9yT2JqZWN0Lm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEV2ZW50QnJva2VyLl93YWl0Rm9yTGlzdC5zcGxpY2UoaV8yLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIEV2ZW50QnJva2VyIGhhcyBhIHNwZWNpZmljIGV2ZW50IGxpc3RlbmVyIGFscmVhZHkgYWRkZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIG1ldGhvZCB0byBjYWxsLlxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBsaXN0ZW5lciBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIEV2ZW50QnJva2VyLmhhc0V2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEJyb2tlci5oYXNFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50QnJva2VyLl9ldmVudERpc3BhdGNoZXIuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgc2NvcGUpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGVzIGEgc3RyaW5nIG91dHB1dCBvZiBldmVudCBsaXN0ZW5lcnMgZm9yIGEgZ2l2ZW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEV2ZW50TGlzdGVuZXJzXG4gICAgICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgRXZlbnRCcm9rZXIuZ2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBbQ2xhc3NOYW1lXSBpcyBsaXN0ZW4gZm9yICdCYXNlRXZlbnQuY2hhbmdlJyBldmVudC5cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50QnJva2VyLmdldEV2ZW50TGlzdGVuZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50QnJva2VyLl9ldmVudERpc3BhdGNoZXIuZ2V0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBFdmVudERpc3BhdGNoZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2V2ZW50RGlzcGF0Y2hlclxuICAgICAgICAgKiBAdHlwZSB7RXZlbnREaXNwYXRjaGVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBFdmVudEJyb2tlci5fZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbGlzdCBvZiB3YWl0IGZvciBvYmplY3RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX3dhaXRGb3JMaXN0XG4gICAgICAgICAqIEB0eXBlIHtBcnJheTx7ZXZlbnRUeXBlczpBcnJheTxzdHJpbmc+LCBjYWxsYmFjazpGdW5jdGlvbiwgY2FsbGJhY2tTY29wZTphbnksIGV2ZW50czpBcnJheTxhbnk+LCBvbmNlOmJvb2xlYW59Pn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnRCcm9rZXIuX3dhaXRGb3JMaXN0ID0gW107XG4gICAgICAgIHJldHVybiBFdmVudEJyb2tlcjtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBFdmVudEJyb2tlcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vT2JqZWN0TWFuYWdlcicsICcuL0Jhc2VFdmVudCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBPYmplY3RNYW5hZ2VyXzEgPSByZXF1aXJlKCcuLi9PYmplY3RNYW5hZ2VyJyk7XG4gICAgdmFyIEJhc2VFdmVudF8xID0gcmVxdWlyZSgnLi9CYXNlRXZlbnQnKTtcbiAgICAvKipcbiAgICAgKiBFdmVudERpc3BhdGNoZXIgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBjbGFzc2VzIHRoYXQgZGlzcGF0Y2ggZXZlbnRzLiBJdCBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuXG4gICAgICogRXZlbnREaXNwYXRjaGVyIHByb3ZpZGVzIG1ldGhvZHMgZm9yIG1hbmFnaW5nIHByaW9yaXRpemVkIHF1ZXVlcyBvZiBldmVudCBsaXN0ZW5lcnMgYW5kIGRpc3BhdGNoaW5nIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudERpc3BhdGNoZXJcbiAgICAgKiBAZXh0ZW5kcyBPYmplY3RNYW5hZ2VyXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgZXZlbnRcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIE9iamVjdE1hbmFnZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgIC8vIEFub3RoZXIgd2F5IHRvIHVzZSB0aGUgRXZlbnREaXNwYXRjaGVyLlxuICAgICAqICAgICAgbGV0IGV2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcbiAgICAgKiAgICAgIGV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgKiAgICAgIGV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgKi9cbiAgICB2YXIgRXZlbnREaXNwYXRjaGVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEV2ZW50RGlzcGF0Y2hlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnREaXNwYXRjaGVyKCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhvbGRzIGEgcmVmZXJlbmNlIHRvIGFkZGVkIGxpc3RlbmVycy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX2xpc3RlbmVyc1xuICAgICAgICAgICAgICogQHR5cGUge0FycmF5Ljxhbnk+fVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgY2hpbGQgb2JqZWN0LiBVc2VzIHRoZSBwYXJlbnQgcHJvcGVydHlcbiAgICAgICAgICAgICAqIHRvIHNwZWNpZnkgYSByZWxhdGl2ZSBwYXRoIHRvIGRpc3BsYXkgb2JqZWN0cyB0aGF0IGFyZSBhYm92ZSB0aGUgY3VycmVudCBkaXNwbGF5IG9iamVjdCBpbiB0aGUgZGlzcGxheVxuICAgICAgICAgICAgICogbGlzdCBoaWVyYXJjaHkgYW5kIGhlbHBzIGZhY2lsaXRhdGUgZXZlbnQgYnViYmxpbmcuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHBhcmVudFxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvYmplY3Qgd2l0aCBhbiBFdmVudERpc3BhdGNoZXIgb2JqZWN0IHNvIHRoZSBsaXN0ZW5lciByZWNlaXZlcyBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBldmVudC4gVGhpcyBmdW5jdGlvbiBtdXN0IGFjY2VwdCBhbiBFdmVudCBvYmplY3QgYXMgaXRzIG9ubHkgcGFyYW1ldGVyIGFuZCBtdXN0IHJldHVybiBub3RoaW5nLCBhcyB0aGlzIGV4YW1wbGUgc2hvd3MuIEBleGFtcGxlIGZ1bmN0aW9uKGV2ZW50OkV2ZW50KTp2b2lkXG4gICAgICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBCaW5kcyB0aGUgc2NvcGUgdG8gYSBwYXJ0aWN1bGFyIG9iamVjdCAoc2NvcGUgaXMgYmFzaWNhbGx5IHdoYXQgXCJ0aGlzXCIgcmVmZXJzIHRvIGluIHlvdXIgZnVuY3Rpb24pLiBUaGlzIGNhbiBiZSB2ZXJ5IHVzZWZ1bCBpbiBKYXZhU2NyaXB0IGJlY2F1c2Ugc2NvcGUgaXNuJ3QgZ2VuZXJhbGx5IG1haW50YWluZWQuXG4gICAgICAgICAqIEBwYXJhbSBbcHJpb3JpdHk9MF0ge2ludH0gSW5mbHVlbmNlcyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhlIGxpc3RlbmVycyBhcmUgY2FsbGVkLiBMaXN0ZW5lcnMgd2l0aCBsb3dlciBwcmlvcml0aWVzIGFyZSBjYWxsZWQgYWZ0ZXIgb25lcyB3aXRoIGhpZ2hlciBwcmlvcml0aWVzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0ICsgXCIgc2VudCB0aGUgZXZlbnQuXCIpO1xuICAgICAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCBldmVudC5kYXRhKTtcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHNjb3BlLCBwcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJzIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUgdGhhdCBpcyBwYXNzZWQgaW4uXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgIGlmIChsaXN0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJzIGRvIG5vdCBleGlzdCBmb3IgdGhlIHR5cGUgdmFsdWUgcGFzc2VkIGluIHRoZW4gY3JlYXRlIGEgbmV3IGVtcHR5IGFycmF5LlxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IGxpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgICAgICB2YXIgaSA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKC0taSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIuc2NvcGUgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzYW1lIGNhbGxiYWNrIGFuZCBzY29wZSBhcmUgZm91bmQgdGhlbiByZW1vdmUgaXQgYW5kIGFkZCB0aGUgY3VycmVudCBvbmUgYmVsb3cuXG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gMCAmJiBsaXN0ZW5lci5wcmlvcml0eSA8IHByaW9yaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaSArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBldmVudCBsaXN0ZW5lciB0byB0aGUgbGlzdCBhcnJheSBhdCB0aGUgaW5kZXggdmFsdWUuXG4gICAgICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMCwgeyBjYWxsYmFjazogY2FsbGJhY2ssIHNjb3BlOiBzY29wZSwgcHJpb3JpdHk6IHByaW9yaXR5LCBvbmNlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9iamVjdCBvbmNlIHdpdGggYW4gRXZlbnREaXNwYXRjaGVyIG9iamVjdCBzbyB0aGUgbGlzdGVuZXIgd2lsbCByZWNlaXZlIHRoZSBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lck9uY2VcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoaXMgZnVuY3Rpb24gbXVzdCBhY2NlcHQgYW4gRXZlbnQgb2JqZWN0IGFzIGl0cyBvbmx5IHBhcmFtZXRlciBhbmQgbXVzdCByZXR1cm4gbm90aGluZywgYXMgdGhpcyBleGFtcGxlIHNob3dzLiBAZXhhbXBsZSBmdW5jdGlvbihldmVudDpFdmVudCk6dm9pZFxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gQmluZHMgdGhlIHNjb3BlIHRvIGEgcGFydGljdWxhciBvYmplY3QgKHNjb3BlIGlzIGJhc2ljYWxseSB3aGF0IFwidGhpc1wiIHJlZmVycyB0byBpbiB5b3VyIGZ1bmN0aW9uKS4gVGhpcyBjYW4gYmUgdmVyeSB1c2VmdWwgaW4gSmF2YVNjcmlwdCBiZWNhdXNlIHNjb3BlIGlzbid0IGdlbmVyYWxseSBtYWludGFpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gW3ByaW9yaXR5PTBdIHtpbnR9IEluZmx1ZW5jZXMgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBsaXN0ZW5lcnMgYXJlIGNhbGxlZC4gTGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdGllcyBhcmUgY2FsbGVkIGFmdGVyIG9uZXMgd2l0aCBoaWdoZXIgcHJpb3JpdGllcy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyT25jZShCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBfaGFuZGxlck1ldGhvZChldmVudCkge1xuICAgICAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQgKyBcIiBzZW50IHRoZSBldmVudC5cIik7XG4gICAgICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lck9uY2UgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHNjb3BlLCBwcmlvcml0eSkge1xuICAgICAgICAgICAgaWYgKHByaW9yaXR5ID09PSB2b2lkIDApIHsgcHJpb3JpdHkgPSAwOyB9XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHRoZSBub3JtYWwgd2F5LlxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBldmVudCBsaXN0ZW5lcnMgd2UganVzdCBhZGRlZC5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdFswXTtcbiAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgdmFsdWUgdG8gdHJ1ZSBzbyBpdCB3aWxsIGJlIHJlbW92ZSBhZnRlciBkaXNwYXRjaEV2ZW50IGlzIGNhbGxlZC5cbiAgICAgICAgICAgIGxpc3RlbmVyLm9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgc3BlY2lmaWVkIGxpc3RlbmVyIGZyb20gdGhlIEV2ZW50RGlzcGF0Y2hlciBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIG9iamVjdCB0byByZW1vdmUuXG4gICAgICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdCB0byBiZSByZW1vdmVkLlxuICAgICAgICAgKiBAaGlkZSBUaGlzIHdhcyBhZGRlZCBiZWNhdXNlIGl0IHdhcyBuZWVkZWQgZm9yIHRoZSB7eyNjcm9zc0xpbmsgXCJFdmVudEJyb2tlclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy4gVG8ga2VlcCB0aGluZ3MgY29uc2lzdGVudCB0aGlzIHBhcmFtZXRlciBpcyByZXF1aXJlZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBieSB0aGUgYXNzb2NpYXRlZCB0eXBlIHZhbHVlIHRoYXQgaXMgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgICAgICBpZiAobGlzdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlfMSA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWlfMSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjYWxsYmFjayBhbmQgc2NvcGUgYXJlIHRoZSBzYW1lIHRoZW4gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lci5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RbaV8xXS5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdFtpXzFdLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaV8xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiA8cD5EaXNwYXRjaGVzIGFuIGV2ZW50IGludG8gdGhlIGV2ZW50IGZsb3cuIFRoZSBldmVudCB0YXJnZXQgaXMgdGhlIEV2ZW50RGlzcGF0Y2hlciBvYmplY3QgdXBvbiB3aGljaCB0aGUgZGlzcGF0Y2hFdmVudCgpIG1ldGhvZCBpcyBjYWxsZWQuPC9wPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAgICAgICAgICogQHBhcmFtIGV2ZW50IHtzdHJpbmd8QmFzZUV2ZW50fSBUaGUgRXZlbnQgb2JqZWN0IG9yIGV2ZW50IHR5cGUgc3RyaW5nIHlvdSB3YW50IHRvIGRpc3BhdGNoLiBZb3UgY2FuIGNyZWF0ZSBjdXN0b20gZXZlbnRzLCB0aGUgb25seSByZXF1aXJlbWVudCBpcyBhbGwgZXZlbnRzIG11c3QgZXh0ZW5kIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgICAgICogQHBhcmFtIFtkYXRhPW51bGxdIHthbnl9IFRoZSBvcHRpb25hbCBkYXRhIHlvdSB3YW50IHRvIHNlbmQgd2l0aCB0aGUgZXZlbnQuIERvIG5vdCB1c2UgdGhpcyBwYXJhbWV0ZXIgaWYgeW91IGFyZSBwYXNzaW5nIGluIGEge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2NoYW5nZScpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIEV4YW1wbGU6IFNlbmRpbmcgZGF0YSB3aXRoIHRoZSBldmVudDpcbiAgICAgICAgICogICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2NoYW5nZScsIHtzb21lOiAnZGF0YSd9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBFeGFtcGxlOiBXaXRoIGFuIGV2ZW50IG9iamVjdFxuICAgICAgICAgKiAgICAgIC8vIChldmVudCB0eXBlLCBidWJibGluZyBzZXQgdG8gdHJ1ZSwgY2FuY2VsYWJsZSBzZXQgdG8gdHJ1ZSBhbmQgcGFzc2luZyBkYXRhKSA6XG4gICAgICAgICAqICAgICAgbGV0IGV2ZW50ID0gbmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFLCB0cnVlLCB0cnVlLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBIZXJlIGlzIGEgY29tbW9uIGlubGluZSBldmVudCBvYmplY3QgYmVpbmcgZGlzcGF0Y2hlZDpcbiAgICAgICAgICogICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0hBTkdFKSk7XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgICAgICAgICAgdmFyIGV2ZW50ID0gdHlwZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgQmFzZUV2ZW50XzEuZGVmYXVsdCh0eXBlLCBmYWxzZSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0YXJnZXQgaXMgbnVsbCB0aGVuIHNldCBpdCB0byB0aGUgb2JqZWN0IHRoYXQgZGlzcGF0Y2hlZCB0aGUgZXZlbnQuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVyIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICAgICAgICAgIGlmIChsaXN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB2YXIgaV8yID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWlfMiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGNhbmNlbGFibGUgYW5kIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIGFyZSB0cnVlIHRoZW4gYnJlYWsgb3V0IG9mIHRoZSB3aGlsZSBsb29wLlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSA9PT0gdHJ1ZSAmJiBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0W2lfMl07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIuc2NvcGUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIG9uY2UgdmFsdWUgaXMgdHJ1ZSB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgcmlnaHQgYWZ0ZXIgdGhpcyBjYWxsYmFjayB3YXMgY2FsbGVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LnR5cGUsIGxpc3RlbmVyLmNhbGxiYWNrLCBsaXN0ZW5lci5zY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rpc3BhdGNoZXMgdXAgdGhlIGNoYWluIG9mIGNsYXNzZXMgdGhhdCBoYXZlIGEgcGFyZW50LlxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwgJiYgZXZlbnQuYnViYmxlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGNhbmNlbGFibGUgYW5kIGlzUHJvcGFnYXRpb25TdG9wcGVkIGFyZSB0cnVlIHRoZW4gZG9uJ3QgZGlzcGF0Y2ggdGhlIGV2ZW50IG9uIHRoZSBwYXJlbnQgb2JqZWN0LlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlID09PSB0cnVlICYmIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gdGhlIGN1cnJlbnQgb2JqZWN0IHRoYXQgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcgdGhlIGV2ZW50IChpLmUuIGV2ZW50IGJ1YmJsaW5nIGF0KS5cbiAgICAgICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBldmVudCB0byB0aGUgcGFyZW50IChldmVudCBidWJibGluZykuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBzcGVjaWZpYyBldmVudCBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGhhc0V2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBtZXRob2QgdG8gY2FsbC5cbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgbGlzdGVuZXIgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5oYXNFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1t0eXBlXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgICAgIHZhciBudW1PZkNhbGxiYWNrcyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaV8zID0gMDsgaV8zIDwgbnVtT2ZDYWxsYmFja3M7IGlfMysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdW2lfM107XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIuc2NvcGUgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBhIHN0cmluZyBvdXRwdXQgb2YgZXZlbnQgbGlzdGVuZXJzIGZvciBhIGdpdmVuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRFdmVudExpc3RlbmVyc1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gW0NsYXNzTmFtZV0gaXMgbGlzdGVuaW5nIGZvciB0aGUgJ0Jhc2VFdmVudC5jaGFuZ2UnIGV2ZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIHZhciBudW1PZkNhbGxiYWNrcztcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbnVtT2ZDYWxsYmFja3MgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfNCA9IDA7IGlfNCA8IG51bU9mQ2FsbGJhY2tzOyBpXzQrKykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXVtpXzRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuc2NvcGUgJiYgKHR5cGVvZiBsaXN0ZW5lci5zY29wZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1snICsgbGlzdGVuZXIuc2NvcGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1tVbmtub3duXSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IFwiIGlzIGxpc3RlbiBmb3IgJ1wiICsgdHlwZSArIFwiJyBldmVudC5cXG5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gQmFzZU9iamVjdC5kZXN0cm95XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnREaXNwYXRjaGVyO1xuICAgIH0pKE9iamVjdE1hbmFnZXJfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnREaXNwYXRjaGVyO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbiAgICB2YXIgJGV2ZW50TGlzdGVuZXIgPSAkO1xuICAgIC8qKlxuICAgICAqIEEgYmluZCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBiaW5kIG1ldGhvZC5cbiAgICAgKi9cbiAgICBpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmVG9CaW5kID0gdGhpcywgZk5PUCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0sIGZCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCAmJiBvVGhpc1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgOiBvVGhpcywgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgICAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG4gICAgICAgICAgICByZXR1cm4gZkJvdW5kO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBoYXNoIHN0cmluZyBmcm9tIHRoZSBzdHJpbmcgYmVpbmcgcGFzc2VkIGluLiBJbiB0aGlzIGNhc2UgaXQgaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhc3RlZCBhcyBzdHJpbmcgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICB2YXIgaGFzaENvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgICAgICAvLyBodHRwOi8vZXJseWNvZGVyLmNvbS80OS9qYXZhc2NyaXB0LWhhc2gtZnVuY3Rpb25zLXRvLWNvbnZlcnQtc3RyaW5nLWludG8taW50ZWdlci1oYXNoLVxuICAgICAgICB2YXIgY2hhcmFjdGVyO1xuICAgICAgICB2YXIgaGFzaCA9IG51bGw7XG4gICAgICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgICAgICBpZiAoc3RyTGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gaGFzaDtcbiAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgc3RyTGVuZ3RoOyBpXzErKykge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gc3RyLmNoYXJDb2RlQXQoaV8xKTtcbiAgICAgICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXJhY3RlcjtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyhNYXRoLmFicyhoYXNoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgalF1ZXJ5IGFkZEV2ZW50TGlzdGVuZXIgcGx1Z2luXG4gICAgICovXG4gICAgJGV2ZW50TGlzdGVuZXIuZm4uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHZhciBfY2FsbGJhY2s7XG4gICAgICAgIHZhciBfc2NvcGU7XG4gICAgICAgIHZhciBfaGFuZGxlcjtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV0gPSBfY2FsbGJhY2suYmluZChfc2NvcGUpO1xuICAgICAgICAgICAgICAgIHRoaXMub24odHlwZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IGRhdGE7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIHNlbGVjdG9yLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIHNlbGVjdG9yLCBkYXRhLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignalF1ZXJ5IGFkZEV2ZW50TGlzdGVuZXIgcGx1Z2luIHJlcXVpcmVzIGF0IGxlYXN0IDMgYXJndW1lbnRzLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGpRdWVyeSByZW1vdmVFdmVudExpc3RlbmVyIHBsdWdpblxuICAgICAqL1xuICAgICRldmVudExpc3RlbmVyLmZuLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgX2NhbGxiYWNrO1xuICAgICAgICB2YXIgX3Njb3BlO1xuICAgICAgICB2YXIgX2hhbmRsZXI7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZih0eXBlLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBfc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV07XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pRdWVyeSByZW1vdmVFdmVudExpc3RlbmVyIHBsdWdpbiByZXF1aXJlcyBhdCBsZWFzdCAzIGFyZ3VtZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSAkZXZlbnRMaXN0ZW5lcjtcbn0pO1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL3V0aWwvVXRpbCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBVdGlsXzEgPSByZXF1aXJlKCcuLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBjbGFzcyB0byBjcmVhdGUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoZSBzYW1lIENvbXBvbmVudCBDbGFzcyBmcm9tIGpRdWVyeSBvYmplY3QgdGhhdCBoYXMgb25lIG9yIG1vcmUgZWxlbWVudHMgaW4gaXQuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgQ29tcG9uZW50RmFjdG9yeVxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIENvbXBvbmVudEZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb21wb25lbnRGYWN0b3J5KCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQ29tcG9uZW50RmFjdG9yeV0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBDb21wb25lbnRGYWN0b3J5IGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRha2VzIGEgalF1ZXJ5IG9iamVjdCB0aGF0IGhhcyBvbmUgb3IgbW9yZSBlbGVtZW50cyBpbiBpdCBhbmQgcGFzc2VzIGEgc2luZ2xlIGpRdWVyeSBlbGVtZW50IGludG8gdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBjbGFzcyB0aGF0IGlzIGFsc28gYmVpbmcgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcGFyYW0gJGVsZW1lbnQge2pRdWVyeX0gT25lIG9yIG1vcmUgalF1ZXJ5IHJlZmVyZW5jZWQgRE9NIGVsZW1lbnRzLlxuICAgICAgICAgKiBAcGFyYW0gQ29tcG9uZW50Q2xhc3Mge2FueX0gVGhlIGNsYXNzIHRoYXQgeW91IHdhbnQgaW5zdGFudGlhdGVkLlxuICAgICAgICAgKiBAcGFyYW0gW3Njb3BlPW51bGxdIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBUaGlzIHNjb3BlIChwYXJlbnQgb2JqZWN0KSBpcyBuZWVkZWQgdG8gaW5zdGFudGlhdGUgdGhlIGNvbXBvbmVudC92aWV3IHdpdGggdGhlIHVzZSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lci9hZGRDaGlsZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn0gUmV0dXJucyBhIGxpc3Qgb2YgaW5zdGFudGlhdGVkIGNvbXBvbmVudHMvdmlld3Mgc28geW91IGNhbiBtYW5hZ2UgdGhlbSB3aXRoaW4gdGhlIENsYXNzIHRoYXQgY3JlYXRlZCB0aGVtLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBDb21wb25lbnRGYWN0b3J5LmNyZWF0ZSgkKCcuanMtbGlzdCcpLCBTb21lQ2xhc3MsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29tcG9uZW50RmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnRzLCBDb21wb25lbnRDbGFzcywgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gbnVsbDsgfVxuICAgICAgICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQ7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0eXBlcztcbiAgICAgICAgICAgIHZhciBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgbGVuZ3RoOyBpXzErKykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJGVsZW1lbnRzLmVxKGlfMSk7XG4gICAgICAgICAgICAgICAgdHlwZXMgPSAkZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgaWYgdGhlcmUgaXMgbm90IGEgJ2RhdGEtc2pzLXR5cGUnIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gQ29tcG9uZW50RmFjdG9yeS5fY3JlYXRlQ29tcG9uZW50KCRlbGVtZW50LCBDb21wb25lbnRDbGFzcywgc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgaWYgdGhlcmUgaXMgYWxyZWFkeSBhICdkYXRhLXNqcy10eXBlJyBhdHRyaWJ1dGUgdGhlbiBnZXQgdGhlIHR5cGUocykuXG4gICAgICAgICAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IFV0aWxfMS5kZWZhdWx0LmdldE5hbWUoQ29tcG9uZW50Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGNyZWF0ZSB0aGUgY29tcG9uZW50IGlmIHRoZSBjb21wb25lbnQgdHlwZSBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihjb21wb25lbnROYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIZWxwZXIgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9jcmVhdGVDb21wb25lbnRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudENsYXNzKCRlbGVtZW50KTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjbGFzcyBvYmplY3QgaGFzIHRoZSBzanNJZCBwcm9wZXJ0eSB0aGVuIEkgYW0gYXNzdW1pbmcgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuXG4gICAgICAgICAgICBpZiAoc2NvcGUgIT09IG51bGwgJiYgY29tcG9uZW50Lmhhc093blByb3BlcnR5KCdzanNJZCcpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuYWRkQ2hpbGQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb21wb25lbnRGYWN0b3J5O1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudEZhY3Rvcnk7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIC8qKlxuICAgICAqIFRoZSBTdHJpbmdVdGlsLi4uXG4gICAgICpcbiAgICAgKiBAY2xhc3MgU3RyaW5nVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFN0cmluZ1V0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBTdHJpbmdVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbU3RyaW5nVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBTdHJpbmdVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGV4dGVuc2lvbiBuYW1lIG9mZiB0aGUgc3RyaW5nIGJlaW5nIHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRFeHRlbnNpb25cbiAgICAgICAgICogQHBhcmFtIGZpbGVuYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSB3aXRoRG90IHtib29sZWFufSBJZiB5b3Ugd2FudCB0aGUgcGVyaW9kIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBleHRlbnNpb24gbmFtZS5cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5nZXRFeHRlbnNpb24oJ2ZpbGUuZXhlJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2V4ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmdldEV4dGVuc2lvbignZmlsZS5leGUnLCB0cnVlKTtcbiAgICAgICAgICogICAgICAvLyAnLmV4ZSdcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwuZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24gKGZpbGVuYW1lLCB3aXRoRG90KSB7XG4gICAgICAgICAgICBpZiAod2l0aERvdCA9PT0gdm9pZCAwKSB7IHdpdGhEb3QgPSBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIG51bSA9ICh3aXRoRG90ID09PSB0cnVlKSA/IDAgOiAxO1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVuYW1lLnNsaWNlKGZpbGVuYW1lLmxhc3RJbmRleE9mKCcuJykgKyBudW0sIGZpbGVuYW1lLmxlbmd0aCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIHNlbnRlbmNlIGNhc2Ugc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU2VudGVuY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gW3NlcGFyYXRvcl0ge3N0cmluZ30gQ2FuIGJlIGFueSBzdHJpbmcgeW91IHdhbnQgdG8gdXNlIGFzIGEgc2VwYXJhdG9yLlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvU2VudGVuY2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUgZG93biBieSB0aGUgcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICctJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUtZG93bi1ieS10aGUtcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICdfJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmVfZG93bl9ieV90aGVfcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICcvJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUvZG93bi9ieS90aGUvcml2ZXInXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRvU2VudGVuY2UgPSBmdW5jdGlvbiAoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSAnICc7IH1cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXFxkKS9nLCAnJDEgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKD89W0EtWl0pKS9nLCAnJDEgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15hLXpBLVowLTkgXS9nLCAnICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eIHwgJC9nLCAnJylcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csIHNlcGFyYXRvcik7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIGNhbWVsIGNhc2Ugc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQ2FtZWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b0NhbWVsQ2FzZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiKTtcbiAgICAgICAgICogICAgICAvLyAnbGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b0NhbWVsQ2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdVdGlsLnRvU2VudGVuY2Uoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gKFxcdykvZywgZnVuY3Rpb24gKF8sICQxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQxLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgaHlwaGVuIHN0cmluZyB0byBhIHBhc2NhbCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b1Bhc2NhbENhc2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvUGFzY2FsQ2FzZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiKTtcbiAgICAgICAgICogICAgICAvLyAnTGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b1Bhc2NhbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b0NhbWVsQ2FzZShzdHIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15bYS16QS1aXS8sIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBjb25zdGFudCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0NvbnN0YW50Q2FzZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9Db25zdGFudENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ0xJVkVfRE9XTl9CWV9USEVfUklWRVInXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRvQ29uc3RhbnRDYXNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwudG9TZW50ZW5jZShzdHIsICdfJylcbiAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSB1bml2ZXJzYWxseSB1bmlxdWUgaWRlbnRpZmllci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVVVUlEXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuY3JlYXRlVVVJRCgpO1xuICAgICAgICAgKiAgICAgIC8vICdhOTVkNzEzNC0zMzQyLTQwMDEtYmNlYS1jYzAzNzFiNzBkZWMnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmNyZWF0ZVVVSUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9ICgneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4JykucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IChjID09ICd4JykgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcXVlcnlTdHJpbmdUb09iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcXVlcnlTdHJpbmcge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFt1c2VQYXJzZUZsb2F0PWZhbHNlXSB7Ym9vbGVhbn0gSWYgdHJ1ZSBjb252ZXJ0cyBzdHJpbmdzIHRvIG51bWJlcnMuXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R8TnVsbH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0KCc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1tYWxlJyk7XG4gICAgICAgICAqICAgICAgLy8ge25hbWU6ICdSb2JlcnQnLCBhZ2U6ICcyMycsIGdlbmRlcjogJ21hbGUnfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucXVlcnlTdHJpbmdUb09iamVjdCgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScsIHRydWUpO1xuICAgICAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAyMywgZ2VuZGVyOiAnbWFsZSd9XG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnF1ZXJ5U3RyaW5nVG9PYmplY3QgPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcsIHVzZVBhcnNlRmxvYXQpIHtcbiAgICAgICAgICAgIGlmICh1c2VQYXJzZUZsb2F0ID09PSB2b2lkIDApIHsgdXNlUGFyc2VGbG9hdCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XG4gICAgICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgc3RyID0gcXVlcnlTdHJpbmcuc3Vic3RyaW5nKHF1ZXJ5U3RyaW5nLmluZGV4T2YoJz8nKSArIDEpO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNwbGl0IGludG8ga2V5L3ZhbHVlIHBhaXJzXG4gICAgICAgICAgICB2YXIgcXVlcmllcyA9IHN0ci5zcGxpdCgnJicpO1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgYXJyYXkgb2Ygc3RyaW5ncyBpbnRvIGFuIG9iamVjdFxuICAgICAgICAgICAgdmFyIGxlbiA9IHF1ZXJpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgbGVuOyBpXzErKykge1xuICAgICAgICAgICAgICAgIHRlbXAgPSBxdWVyaWVzW2lfMV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSAodXNlUGFyc2VGbG9hdCA9PT0gdHJ1ZSAmJiBpc05hTihwYXJzZUZsb2F0KHRlbXBbMV0pKSA9PT0gZmFsc2UpID8gcGFyc2VGbG9hdCh0ZW1wWzFdKSA6IHRlbXBbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGFsbCB3aGl0ZXNwYWNlIGZyb20gdGhlIHN0cmluZyBwYXNzZWQgaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsV2hpdGVzcGFjZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzdHIgPSAnICAgYSBiICAgIGMgZCBlIGYgZyAnO1xuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucmVtb3ZlQWxsV2hpdGVzcGFjZShzdHIpO1xuICAgICAgICAgKiAgICAgIC8vICdhYmNkZWZnJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5yZW1vdmVBbGxXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc3RyID0gJyAgIGEgYiAgICBjIGQgZSBmIGcgJztcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2Uoc3RyKTtcbiAgICAgICAgICogICAgICAvLyAnYSBiICAgIGMgZCBlIGYgZydcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKF5cXHMrfFxccyskKS9nLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRydW5jYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBsZW5ndGgge2ludH1cbiAgICAgICAgICogQHBhcmFtIGluZGljYXRvciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRydW5jYXRlKCdSb2JlcnQgaXMgY29vbCBhbmQgaGUgbGlrZXMgYnJ1c2NoZXR0YS4nLCAxNCkpO1xuICAgICAgICAgKiAgICAgIC8vICdSb2JlcnQgaXMgY29vbC4uLidcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRydW5jYXRlKCdSb2JlcnQgaXMgY29vbCBhbmQgaGUgbGlrZXMgYnJ1c2NoZXR0YS4nLCAxNCwgJyEhIScpKTtcbiAgICAgICAgICogICAgICAvLyAnUm9iZXJ0IGlzIGNvb2whISEnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRydW5jYXRlID0gZnVuY3Rpb24gKHRleHQsIGxlbmd0aCwgaW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9yID09PSB2b2lkIDApIHsgaW5kaWNhdG9yID0gJy4uLic7IH1cbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cigwLCBsZW5ndGgpICsgaW5kaWNhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVwbGFjZXMgZWFjaCBmb3JtYXQgaXRlbSBpbiBhIHNwZWNpZmllZCBzdHJpbmcgd2l0aCB0aGUgdGV4dCBlcXVpdmFsZW50IG9mIGEgY29ycmVzcG9uZGluZyBvYmplY3QncyB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmb3JtYXRcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gLi4ucmVzdCB7QXJyYXkuPGFueT59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuZm9ybWF0KCdSb2JlcnQgaXMgezB9LiBWZXJ5IHswfSBhbmQgezF9IScsICdjb29sJywgJ3NtYXJ0Jyk7XG4gICAgICAgICAqICAgICAgLy8gJ1JvYmVydCBpcyBjb29sLiBWZXJ5IGNvb2wgYW5kIHNtYXJ0ISdcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwuZm9ybWF0ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSByZXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0cjtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMiA9IDA7IGlfMiA8IGxlbmd0aDsgaV8yKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgnXFxcXHsnICsgaV8yICsgJ1xcXFx9JywgJ2dtJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlZywgcmVzdFtpXzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgYSB2YWx1ZSBpbiB0aGUgcXVlcnkgc3RyaW5nIGJ5IGl0cyBrZXkgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBwYXJhbVJlcGxhY2VcbiAgICAgICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHZvaWR9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5wYXJhbVJlcGxhY2UoJz9uYW1lPVJvYmVydCZhZ2U9MjMmZ2VuZGVyPW1hbGUnLCAnZ2VuZGVyJywgJ2ZlbWFsZScpO1xuICAgICAgICAgKiAgICAgIC8vICc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1mZW1hbGUnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnBhcmFtUmVwbGFjZSA9IGZ1bmN0aW9uIChxdWVyeVN0cmluZywgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHBhcmFtIHdpdGggcmVnZXhcbiAgICAgICAgICAgIC8vIEdyYWIgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgcmV0dXJuZWQgc3RyaW5nIChzaG91bGQgYmUgPyBvciAmKVxuICAgICAgICAgICAgLy8gUmVwbGFjZSBvdXIgaHJlZiBzdHJpbmcgd2l0aCBvdXIgbmV3IHZhbHVlLCBwYXNzaW5nIG9uIHRoZSBuYW1lIGFuZCBkZWxpbWl0ZXJcbiAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIG5hbWUgKyAnPShbXiYjXSopJyk7XG4gICAgICAgICAgICB2YXIgZGVsaW1pdGVyID0gcmUuZXhlYyhxdWVyeVN0cmluZylbMF0uY2hhckF0KDApO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nLnJlcGxhY2UocmUsIGRlbGltaXRlciArIG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdVdGlsO1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFN0cmluZ1V0aWw7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL1N0cmluZ1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgU3RyaW5nVXRpbF8xID0gcmVxdWlyZSgnLi9TdHJpbmdVdGlsJyk7XG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgY2xhc3MgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnQgYW5kIGNvbnNpc3RlbnQgd2F5IHRvIHJlbmRlciB0ZW1wbGF0ZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgVGVtcGxhdGVGYWN0b3J5XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdXRpbFxuICAgICAqIEByZXF1aXJlcyBTdHJpbmdVdGlsXG4gICAgICogQHJlcXVpcmVzIEhhbmRsZWJhcnNcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFRlbXBsYXRlRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRlbXBsYXRlRmFjdG9yeSgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RlbXBsYXRlRmFjdG9yeV0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBUZW1wbGF0ZUZhY3RvcnkgY2xhc3MgYmVjYXVzZSBpdCBpcyBhIHN0YXRpYyBjbGFzcy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHRlbXBsYXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcGFyYW0gdGVtcGxhdGVQYXRoIHthbnl9XG4gICAgICAgICAqIEBwYXJhbSBbZGF0YT1hbnldXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUoJ3RlbXBsYXRlTmFtZScsIHtzb21lOiAnZGF0YSd9KTtcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVQYXRoLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XG4gICAgICAgICAgICAvL0NoZWNrcyB0aGUgZmlyc3QgY2hhcmFjdGVyIHRvIHNlZSBpZiBpdCBpcyBhICcuJyBvciAnIycuXG4gICAgICAgICAgICB2YXIgcmVnZXggPSAvXihbLiNdKSguKykvO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uVGVtcGxhdGUgPSB0eXBlb2YgdGVtcGxhdGVQYXRoID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgdmFyIGlzQ2xhc3NPcklkTmFtZSA9IHJlZ2V4LnRlc3QodGVtcGxhdGVQYXRoKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlUGF0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzQ2xhc3NPcklkTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwb3VuZCBzaWduIGZyb20gdGhlIGlkIG5hbWUuXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoID0gdGVtcGxhdGVQYXRoLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbFN0cmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlUGF0aCkuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGh0bWxTdHJpbmcgPSBTdHJpbmdVdGlsXzEuZGVmYXVsdC5yZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlKGh0bWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVFbmdpbmUgPT0gVGVtcGxhdGVGYWN0b3J5LlVOREVSU0NPUkUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5kZXJzY29yZSBUZW1wbGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlTWV0aG9kID0gd2luZG93WydfJ10udGVtcGxhdGUoaHRtbFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVNZXRob2QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGViYXJzIFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZCA9IEhhbmRsZWJhcnMuY29tcGlsZShodG1sU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZU1ldGhvZChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVPYmogPSB3aW5kb3dbVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlTmFtZXNwYWNlXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRlbXBsYXRlT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybnMgbnVsbCBiZWNhdXNlIHRoZSB0ZW1wbGF0ZSBuYW1lc3BhY2UgaXMgbm90IGZvdW5kLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlRnVuY3Rpb24gPSB0ZW1wbGF0ZU9ialt0ZW1wbGF0ZVBhdGhdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0ZW1wbGF0ZVBhdGggZ2V0cyBhIGZ1bmN0aW9uIHN0b3JhZ2UgaW4gdGhlIGFzc29jaWF0aXZlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYWxsIHRoZSBmdW5jdGlvbiBieSBwYXNzaW5nIGluIHRoZSBkYXRhIGFzIHRoZSBhcmd1bWVudC5cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZUZ1bmN0aW9uKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY29uc3RhbnQgdmFsdWUgZm9yIHVzaW5nIFVuZGVyc2NvcmUgb3IgTG9kYXNoIHRlbXBsYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFVOREVSU0NPUkVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZmluYWxcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LlVOREVSU0NPUkUgPSAndW5kZXJzY29yZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNvbnN0YW50IHZhbHVlIGZvciB1c2luZyBIYW5kbGViYXJzIHRlbXBsYXRlcy4gVGhpcyBpcyB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSBlbmdpbmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBIQU5ETEVCQVJTXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGZpbmFsXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTID0gJ2hhbmRsZWJhcnMnO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGVtcGxhdGUgZW5naW5lIHR5cGUgZm9yIHRoaXMgVGVtcGxhdGVGYWN0b3J5IGNsYXNzLiBUaGUgZGVmYXVsdCBpcyBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSU1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVFbmdpbmVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlNcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVFbmdpbmUgPSBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSUztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBnbG9iYWwgbmFtZXNwYWNlIGZvciBwcmUtY29tcGlsZWQgdGVtcGxhdGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVOYW1lc3BhY2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ0pTVCdcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVOYW1lc3BhY2UgPSAnSlNUJztcbiAgICAgICAgcmV0dXJuIFRlbXBsYXRlRmFjdG9yeTtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBUZW1wbGF0ZUZhY3Rvcnk7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIC8qKlxuICAgICAqIEEgVXRpbGl0eSBjbGFzcyB0aGF0IGhhcyBzZXZlcmFsIHN0YXRpYyBtZXRob2RzIHRvIGFzc2lzdCBpbiBkZXZlbG9wbWVudC5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBVdGlsXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdXRpbFxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICB2YXIgVXRpbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFV0aWwoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tVdGlsXSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIFV0aWwgY2xhc3MgYmVjYXVzZSBpdCBpcyBhIHN0YXRpYyBjbGFzcy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBJZiBhIHByZWZpeCBpcyBwYXNzZWQgaW4sIHRoZSB2YWx1ZSB3aWxsIGJlIGFwcGVuZGVkIHRvIGl0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHVuaXF1ZUlkXG4gICAgICAgICAqIEBwYXJhbSBbcHJlZml4XSB7c3RyaW5nfSBUaGUgc3RyaW5nIHZhbHVlIHVzZWQgZm9yIHRoZSBwcmVmaXguXG4gICAgICAgICAqIEByZXR1cm5zIHtpbml0fHN0cmluZ30gUmV0dXJucyB0aGUgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoKTtcbiAgICAgICAgICogICAgICAvLyAxXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbC51bmlxdWVJZCgncHJlZml4TmFtZV8nKTtcbiAgICAgICAgICogICAgICAvLyBwcmVmaXhOYW1lXzFcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwudW5pcXVlSWQgPSBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgICAgICBpZiAocHJlZml4ID09PSB2b2lkIDApIHsgcHJlZml4ID0gbnVsbDsgfVxuICAgICAgICAgICAgdmFyIGlkID0gKytVdGlsLl9pZENvdW50ZXI7XG4gICAgICAgICAgICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKHByZWZpeCArIGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYSBsaXN0IG9mIHByb3BlcnRpZXMgZnJvbSBhbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0XG4gICAgICAgICAqIEBwYXJhbSBvYmplY3Qge09iamVjdH0gVGhlIG9iamVjdCB5b3Ugd2FudCB0byByZW1vdmUgcHJvcGVydGllcyBmcm9tLlxuICAgICAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gQSBwcm9wZXJ0eSBuYW1lIG9yIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIHlvdSB3YW50IHRvIHJlbW92ZSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gd2l0aG91dCB0aGUgcmVtb3ZlZCB0aGUgcHJvcGVydGllcy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgbGV0IG9iaiA9IHsgbmFtZTogJ1JvYmVydCcsIGdlbmRlcjogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFV0aWwuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KG9iaiwgWydwaG9uZScsICdnZW5kZXInXSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8geyBuYW1lOiAnUm9iZXJ0JyB9XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIGxpc3QgPSAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIG9iamVjdCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBrZXkgaXMgYSBwcm9wZXJ0eSBhbmQgbm90IGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWVfMSA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgYW4gQXJyYXkuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZV8xIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgQXJyYXkgYW5kIGNhbGwgdGhlIFV0aWwuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0IG1ldGhvZCBvbiBlYWNoIG9iamVjdCBpbiB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJyYXkgPSB2YWx1ZV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggaW4gYXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gY2FsbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChhcnJheVtpbmRleF0sIGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlXzEgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KHZhbHVlXzEsIGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBsaXN0IG9mIHByb3BlcnR5IG5hbWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBsaXN0SW5kZXggaW4gbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBrZXkocHJvcGVydHkgbmFtZSkgZXF1YWxzIHRoZSBwcm9wZXJ0eSBuYW1lIGluIHRoZSBsaXN0IGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGxpc3RbbGlzdEluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIHByb3BlcnR5IGZyb20gdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW5hbWVzIGEgcHJvcGVydHkgbmFtZSBvbiBhbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVuYW1lUHJvcGVydHlPbk9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVuYW1lIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgICAgICogQHBhcmFtIG9sZE5hbWUge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIG5ld05hbWUge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyB0aGUgb2JqZWN0IHBhc3NlZCBpbiByZW5hbWVkIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLnJlbmFtZVByb3BlcnR5T25PYmplY3Qob2JqLCAnZ2VuZGVyJywgJ3NleCcpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIHsgbmFtZTogJ1JvYmVydCcsIHNleDogJ21hbGUnLCBwaG9uZTogJzU1NS01NTUtNTU1NScgfVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0ID0gZnVuY3Rpb24gKG9iamVjdCwgb2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSBvbGQgcHJvcGVydHkgbmFtZSB0byBhdm9pZCBhIFJlZmVyZW5jZUVycm9yIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShvbGROYW1lKSkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtuZXdOYW1lXSA9IG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W29sZE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1ha2VzIGEgY2xvbmUgb2YgYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICAgICAqIEBwYXJhbSBvYmoge09iamVjdH0gVGhlIG9iamVjdCB5b3UgdG8gY2xvbmUuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYSBjbG9uZSBvYmplY3Qgb2YgdGhlIG9uZSBwYXNzZWQgaW4uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBjbG9uZU9mT2JqZWN0ID0gVXRpbC5jbG9uZShvYmopO1xuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5jbG9uZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIC8vb3RoZXIgc2NyaXB0czogaHR0cDovL2Rhdmlkd2Fsc2gubmFtZS9qYXZhc2NyaXB0LWNsb25lXG4gICAgICAgICAgICAvL2h0dHA6Ly9vcmFubG9vbmV5LmNvbS9mdW5jdGlvbmFsLWphdmFzY3JpcHQvXG4gICAgICAgICAgICAvL2h0dHA6Ly9vcmFubG9vbmV5LmNvbS9kZWVwLWNvcHktamF2YXNjcmlwdC9cbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgMyBzaW1wbGUgdHlwZXMsIGFuZCBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICAgICAgaWYgKG51bGwgPT0gb2JqIHx8ICdvYmplY3QnICE9IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSGFuZGxlIERhdGVcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGRhdGUuc2V0VGltZShvYmouZ2V0VGltZSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBBcnJheVxuICAgICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaV8xIDwgbGVuOyBpXzErKykge1xuICAgICAgICAgICAgICAgICAgICBhcnJheVtpXzFdID0gVXRpbC5jbG9uZShvYmpbaV8xXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBPYmplY3RcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29weSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGF0dHIgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlbYXR0cl0gPSBVdGlsLmNsb25lKG9ialthdHRyXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbVXRpbF0gVW5hYmxlIHRvIGNvcHkgb2JqISBJdHMgdHlwZSBpc24ndCBzdXBwb3J0ZWQuXCIpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgb3IgbnVtYmVyIHRvIGEgYm9vbGVhbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0Jvb2xlYW5cbiAgICAgICAgICogQHBhcmFtIHN0ck51bSB7c3RyaW5nfG51bWJlcn1cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKFwiVFJVRVwiKTtcbiAgICAgICAgICogICAgICAvLyB0cnVlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4oMCk7XG4gICAgICAgICAqICAgICAgLy8gZmFsc2VcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLnRvQm9vbGVhbih1bmRlZmluZWQpO1xuICAgICAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnRvQm9vbGVhbiA9IGZ1bmN0aW9uIChzdHJOdW0pIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICh0eXBlb2Ygc3RyTnVtID09PSAnc3RyaW5nJykgPyBzdHJOdW0udG9Mb3dlckNhc2UoKSA6IHN0ck51bTtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgPiAwIHx8IHZhbHVlID09ICd0cnVlJyB8fCB2YWx1ZSA9PSAneWVzJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbi9vYmplY3QgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldE5hbWVcbiAgICAgICAgICogQHBhcmFtIGNsYXNzT2JqZWN0IHthbnl9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIG9yIG9iamVjdC5cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzb21lQ2xhc3MgPSBuZXcgU29tZUNsYXNzKCk7XG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKHNvbWVDbGFzcyk7ICAgICAgICAgICAgLy8gJ1NvbWVDbGFzcydcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gVGVzdCgpe30pOyAgICAvLyAnVGVzdCdcbiAgICAgICAgICogICAgICBVdGlsLmdldE5hbWUoZnVuY3Rpb24gKCl7fSk7ICAgICAgICAvLyAnYW5vbnltb3VzJ1xuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5nZXROYW1lID0gZnVuY3Rpb24gKGNsYXNzT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBjbGFzc09iamVjdDtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIHZhciBmdW5jTmFtZVJlZ2V4ID0gL2Z1bmN0aW9uIChbXlxcKF0rKS87XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAvLyBHZXRzIHRoZSBuYW1lIG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBjbGFzc09iamVjdC5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKGZ1bmNOYW1lUmVnZXgpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdWx0c1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgZWxzZSBjb2RlIGlzIG1haW5seSBmb3IgSW50ZXJuZXQgRXhwbG9yZS5cbiAgICAgICAgICAgICAgICB2YXIgaXNGdW5jdGlvbiA9ICh0eXBlID09PSAnZnVuY3Rpb24nKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBmaWd1cmUgb3V0IGhvdyB0byBleHBsYWluIHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgbmFtZV8xID0gaXNGdW5jdGlvbiAmJiAoKGNsYXNzT2JqZWN0Lm5hbWUgJiYgWycnLCBjbGFzc09iamVjdC5uYW1lXSkgfHwgY2xhc3NPYmplY3QudG9TdHJpbmcoKS5tYXRjaChmdW5jTmFtZVJlZ2V4KSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobmFtZV8xICYmIG5hbWVfMVsxXSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG5hbWVfMVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJ2Fub255bW91cyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBkZWJvdW5jZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9uIHdoaWNoIHdpbGwgcG9zdHBvbmUgaXRzIGV4ZWN1dGlvbiB1bnRpbCBhZnRlclxuICAgICAgICAgKiB3YWl0IG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSBpdCB3YXMgaW52b2tlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkZWJvdW5jZVxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICAgICAqIEBwYXJhbSB3YWl0IHtudW1iZXJ9IE1pbGxpc2Vjb25kcyB0byBlbGFwc2VkIGJlZm9yZSBpbnZva2luZyB0aGUgY2FsbGJhY2suXG4gICAgICAgICAqIEBwYXJhbSBpbW1lZGlhdGUge2Jvb2xlYW59IFBhc3MgdHJ1ZSBmb3IgdGhlIGltbWVkaWF0ZSBwYXJhbWV0ZXIgdG8gY2F1c2UgZGVib3VuY2UgdG8gdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlIGxlYWRpbmcgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgd2FpdCBpbnRlcnZhbC4gVXNlZnVsIGluIGNpcmN1bXN0YW5jZXMgbGlrZSBwcmV2ZW50aW5nIGFjY2lkZW50YWwgZG91YmxlLWNsaWNrcyBvbiBhIFwic3VibWl0XCIgYnV0dG9uIGZyb20gZmlyaW5nIGEgc2Vjb25kIHRpbWUuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFja1Njb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFV0aWwuZGVib3VuY2UodGhpcy5fb25CcmVha3BvaW50Q2hhbmdlLCAyNTAsIGZhbHNlLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuZGVib3VuY2UgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHdhaXQsIGltbWVkaWF0ZSwgY2FsbGJhY2tTY29wZSkge1xuICAgICAgICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgdmFyIGRlYm91bmNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW1tZWRpYXRlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseShjYWxsYmFja1Njb3BlLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbW1lZGlhdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYXBwbHlNaXhpbnNcbiAgICAgICAgICogQHBhcmFtIGRlcml2ZWRDdG9yIHthbnl9XG4gICAgICAgICAqIEBwYXJhbSBiYXNlQ3RvcnMge2FueX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqXG4gICAgICAgICAgICAgICAgY2xhc3MgRmxpZXMge1xuICAgICAgICAgICAgICAgICAgICBmbHkoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydCgnSXMgaXQgYSBiaXJkPyBJcyBpdCBhIHBsYW5lPycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGNsYXNzIENsaW1icyB7XG4gICAgICAgICAgICAgICAgICAgIGNsaW1iKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ015IHNwaWRlci1zZW5zZSBpcyB0aW5nbGluZy4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBjbGFzcyBIb3JzZWZseVdvbWFuIGltcGxlbWVudHMgQ2xpbWJzLCBGbGllcyB7XG4gICAgICAgICAgICAgICAgICAgIGNsaW1iOiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgICAgICAgICBmbHk6ICgpID0+IHZvaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIFV0aWwuYXBwbHlNaXhpbnMoSG9yc2VmbHlXb21hbiwgW0NsaW1icywgRmxpZXNdKTtcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuYXBwbHlNaXhpbnMgPSBmdW5jdGlvbiAoZGVyaXZlZEN0b3IsIGJhc2VDdG9ycykge1xuICAgICAgICAgICAgYmFzZUN0b3JzLmZvckVhY2goZnVuY3Rpb24gKGJhc2VDdG9yKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZUN0b3IucHJvdG90eXBlKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlcml2ZWRDdG9yLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDdG9yLnByb3RvdHlwZVtuYW1lXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhIG5ldyBhcnJheSB3aXRoIGR1cGxpY2F0ZXMgcmVtb3ZlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmlxdWVcbiAgICAgICAgICogQHBhcmFtIGxpc3Qge0FycmF5Ljxhbnk+fSBUaGUgYXJyYXkgeW91IHdhbnQgdG8gdXNlIHRvIGdlbmVyYXRlIHRoZSB1bmlxdWUgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5PGFueT59IFJldHVybnMgYSBuZXcgYXJyYXkgbGlzdCBvZiB1bmlxdWUgaXRlbXMuXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwudW5pcXVlID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgICAgIHZhciB1bmlxdWVMaXN0ID0gbGlzdC5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c1ZhbHVlLmluZGV4T2YoY3VycmVudFZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZS5wdXNoKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlO1xuICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZUxpc3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgY291bnQgZm9yIHRoZSB1bmlxdWVJZCBtZXRob2QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfaWRDb3VudGVyXG4gICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuX2lkQ291bnRlciA9IDA7XG4gICAgICAgIHJldHVybiBVdGlsO1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFV0aWw7XG59KTtcbiJdfQ==
