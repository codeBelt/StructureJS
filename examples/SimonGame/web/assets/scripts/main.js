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

var _structurejsDisplayDOMElement = require('structurejs/display/DOMElement');

var _structurejsDisplayDOMElement2 = _interopRequireDefault(_structurejsDisplayDOMElement);

var _structurejsEventBaseEvent = require('structurejs/event/BaseEvent');

var _structurejsEventBaseEvent2 = _interopRequireDefault(_structurejsEventBaseEvent);

var _structurejsUtilTimer = require('structurejs/util/Timer');

var _structurejsUtilTimer2 = _interopRequireDefault(_structurejsUtilTimer);

var _structurejsEventTimerEvent = require('structurejs/event/TimerEvent');

var _structurejsEventTimerEvent2 = _interopRequireDefault(_structurejsEventTimerEvent);

var _viewsDeviceView = require('./views/DeviceView');

var _viewsDeviceView2 = _interopRequireDefault(_viewsDeviceView);

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/

var App = (function (_Stage) {
    _inherits(App, _Stage);

    function App() {
        _classCallCheck(this, App);

        _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
        this._deviceView = null;
        this._centerDisplay = null;
        this._timer = null;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(App, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(App.prototype), 'create', this).call(this);

            var $device = this.$element.find('.js-simonApp-device');

            this._deviceView = new _viewsDeviceView2['default']($device);
            this.addChild(this._deviceView);
            this._deviceView.disable();

            this._centerDisplay = new _structurejsDisplayDOMElement2['default']('div', { 'class': 'display' });
            this._deviceView.addChild(this._centerDisplay);
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

            this.addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onClickColorBtn, this);

            this._centerDisplay.$element.addEventListener('click', this._onClick, this);

            _get(Object.getPrototypeOf(App.prototype), 'enable', this).call(this);
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

            this.removeEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onClickColorBtn, this);

            this._centerDisplay.$element.removeEventListener('click', this._onClick, this);

            _get(Object.getPrototypeOf(App.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            if (this._deviceView.isEnabled === true) {
                this._centerDisplay.$element.text('Go!');
            } else {
                this._centerDisplay.$element.text('Start!');
            }
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this.disable();

            this._deviceView.destroy();
            this._centerDisplay.destroy();
            this._timer.destroy();

            _get(Object.getPrototypeOf(App.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * Each time the timer ticks this method is called and animates one of the colored buttons.
         *
         * @method _onTimer
         * @param event {TimerEvent}
         * @private
         */
    }, {
        key: '_onTimer',
        value: function _onTimer(event) {
            var timer = event.target;
            var sequenceSteps = this._memoryOrder.length - 1;
            var currentIndex = sequenceSteps - timer.getCurrentCount();
            var showItem = this._memoryOrder[currentIndex];

            this._deviceView.animateButton(showItem);
        }

        /**
         * When the memory sequence completes this method will enable the color buttons and
         * will update the white button text by calling the layout method.
         *
         * @method _onTimerComplete
         * @param event {TimerEvent}
         * @private
         */
    }, {
        key: '_onTimerComplete',
        value: function _onTimerComplete(event) {
            this._timer.destroy();

            this._deviceView.enable();
            this.layout();
        }

        /**
         * For every CHANGE event that is dispatched by the DeviceButton's this method will help keep
         * track of the buttons clicked and then will determine if the user click the colored buttons
         * in the correct sequence.
         *
         * @method _onClickColorBtn
         * @param event {BaseEvent}
         * @private
         */
    }, {
        key: '_onClickColorBtn',
        value: function _onClickColorBtn(event) {
            var gameModel = event.data;
            this._userSequence.push(gameModel.buttonIndex);

            if (this._userSequence.length === this._memoryOrder.length) {
                var isMatch = this._userSequence.toString() === this._memoryOrder.toString();
                if (isMatch) {
                    alert('You did it!');
                } else {
                    alert('Nope, you did not get it.');
                }
                this._userSequence = [];
                this._deviceView.disable();
                this.layout();
            }
        }

        /**
         * When the white center button is clicked this will set the memory sequence and start a timer
         * which will play the sequence for the user to remember.
         *
         * @method _onClick
         * @param event {jQueryEventObject}
         * @private
         */
    }, {
        key: '_onClick',
        value: function _onClick(event) {
            event.preventDefault();

            this._centerDisplay.$element.text('');

            this._memoryOrder = [0, 2, 3, 1, 2, 2];
            this._userSequence = [];

            this._timer = new _structurejsUtilTimer2['default'](1500, this._memoryOrder.length);
            this._timer.addEventListener(_structurejsEventTimerEvent2['default'].TIMER, this._onTimer, this);
            this._timer.addEventListener(_structurejsEventTimerEvent2['default'].TIMER_COMPLETE, this._onTimerComplete, this);
            this._timer.start();
        }
    }]);

    return App;
})(_structurejsDisplayStage2['default']);

exports['default'] = App;
module.exports = exports['default'];

/**
 * A view that contains the color buttons.
 *
 * @property _deviceView
 * @type {DeviceView}
 * @private
 */

/**
 * The white center button for the game to start the game.
 *
 * @property _centerDisplay
 * @type {DOMElement}
 * @private
 */

/**
 * Timer to play the sequence the user needs to remember.
 *
 * @property _timer
 * @type {Timer}
 * @private
 */

},{"./views/DeviceView":4,"structurejs/display/DOMElement":8,"structurejs/display/Stage":11,"structurejs/event/BaseEvent":12,"structurejs/event/TimerEvent":14,"structurejs/util/Timer":20}],2:[function(require,module,exports){
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

var _structurejsModelBaseModel = require('structurejs/model/BaseModel');

var _structurejsModelBaseModel2 = _interopRequireDefault(_structurejsModelBaseModel);

/**
 * TODO: YUIDoc_comment
 *
 * @class GameModel
 * @extends BaseModel
 * @constructor
 **/

var GameModel = (function (_BaseModel) {
    _inherits(GameModel, _BaseModel);

    function GameModel(data) {
        _classCallCheck(this, GameModel);

        _get(Object.getPrototypeOf(GameModel.prototype), 'constructor', this).call(this);

        this.buttonIndex = null;
        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */

    _createClass(GameModel, [{
        key: 'update',
        value: function update(data) {
            _get(Object.getPrototypeOf(GameModel.prototype), 'update', this).call(this, data);

            // Override any values after the default super update method has set the values.
        }
    }]);

    return GameModel;
})(_structurejsModelBaseModel2['default']);

exports['default'] = GameModel;
module.exports = exports['default'];

/**
 * TODO: YUIDoc_comment
 *
 * @property buttonIndex
 * @type {number}
 * @public
 */

},{"structurejs/model/BaseModel":15}],4:[function(require,module,exports){
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

var _componentsDeviceButton = require('./components/DeviceButton');

var _componentsDeviceButton2 = _interopRequireDefault(_componentsDeviceButton);

/**
 * TODO: YUIDoc_comment
 *
 * @class DeviceView
 * @extends DOMElement
 * @constructor
 **/

var DeviceView = (function (_DOMElement) {
  _inherits(DeviceView, _DOMElement);

  function DeviceView($element) {
    _classCallCheck(this, DeviceView);

    _get(Object.getPrototypeOf(DeviceView.prototype), 'constructor', this).call(this, $element);
    this._redButton = null;
    this._greenButton = null;
    this._yellowButton = null;
    this._blueButton = null;
    this._buttonList = null;
  }

  /**
   * @overridden DOMElement.create
   */

  _createClass(DeviceView, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(DeviceView.prototype), 'create', this).call(this);

      this._buttonList = [];

      this._blueButton = new _componentsDeviceButton2['default']('blue', 0);
      this.addChild(this._blueButton);

      this._redButton = new _componentsDeviceButton2['default']('red', 1);
      this.addChildAt(this._redButton, 0); // Example of the addChildAt method.

      this._greenButton = new _componentsDeviceButton2['default']('green', 2);
      this.addChild(this._greenButton);

      this._yellowButton = new _componentsDeviceButton2['default']('yellow', 3);
      this.addChild(this._yellowButton);

      this.swapChildren(this._blueButton, this._greenButton); // Example of the swapChildren method.

      // Hold on to the colored buttons in the same order as there index id.
      this._buttonList.push(this._blueButton);
      this._buttonList.push(this._redButton);
      this._buttonList.push(this._greenButton);
      this._buttonList.push(this._yellowButton);
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

      this._redButton.enable();
      this._greenButton.enable();
      this._blueButton.enable();
      this._yellowButton.enable();

      _get(Object.getPrototypeOf(DeviceView.prototype), 'enable', this).call(this);
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

      this._redButton.disable();
      this._greenButton.disable();
      this._blueButton.disable();
      this._yellowButton.disable();

      _get(Object.getPrototypeOf(DeviceView.prototype), 'disable', this).call(this);
    }

    /**
     * @overridden DOMElement.layout
     */
  }, {
    key: 'layout',
    value: function layout() {}
    // Layout or update the objects in this parent class.

    /**
     * @overridden DOMElement.destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.disable();

      this._redButton.destroy();
      this._greenButton.destroy();
      this._blueButton.destroy();
      this._yellowButton.destroy();

      _get(Object.getPrototypeOf(DeviceView.prototype), 'destroy', this).call(this);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * This method accepts a index position for the _buttonList array and will
     * call the animate method on that button.
     *
     * @method animateButton
     * @param buttonIndex {int}
     * @public
     */
  }, {
    key: 'animateButton',
    value: function animateButton(buttonIndex) {
      var deviceButton = this._buttonList[buttonIndex];
      deviceButton.animate();
    }
  }]);

  return DeviceView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = DeviceView;
module.exports = exports['default'];

/**
 * @property _redButton
 * @type {DeviceButton}
 * @private
 */

/**
 * @property _greenButton
 * @type {DeviceButton}
 * @private
 */

/**
 * @property _yellowButton
 * @type {DeviceButton}
 * @private
 */

/**
 * @property _blueButton
 * @type {DeviceButton}
 * @private
 */

/**
 * A list of the buttons so we can get the correct one by this index
 * number being passed into animateButton method.
 *
 * @property _buttonList
 * @type {DeviceButton[]}
 * @private
 */

},{"./components/DeviceButton":5,"structurejs/display/DOMElement":8}],5:[function(require,module,exports){
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

var _modelsGameModel = require('../../models/GameModel');

var _modelsGameModel2 = _interopRequireDefault(_modelsGameModel);

/**
 * TODO: YUIDoc_comment
 *
 * @class DeviceButton
 * @extends DOMElement
 * @constructor
 **/

var DeviceButton = (function (_DOMElement) {
  _inherits(DeviceButton, _DOMElement);

  function DeviceButton(color, index) {
    _classCallCheck(this, DeviceButton);

    _get(Object.getPrototypeOf(DeviceButton.prototype), 'constructor', this).call(this);

    this._color = null;
    this._indexId = null;
    this._color = color;
    this._indexId = index;
  }

  /**
   * @overridden DOMElement.create
   */

  _createClass(DeviceButton, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(DeviceButton.prototype), 'create', this).call(this, 'templates/precompile/DeviceButton', { buttonColor: this._color });
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

      this.$element.addEventListener('click', this._onClick, this);
      this.$element.css('cursor', 'pointer');

      _get(Object.getPrototypeOf(DeviceButton.prototype), 'enable', this).call(this);
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

      this.$element.removeEventListener('click', this._onClick, this);
      this.$element.css('cursor', 'default');

      _get(Object.getPrototypeOf(DeviceButton.prototype), 'disable', this).call(this);
    }

    /**
     * @overridden DOMElement.layout
     */
  }, {
    key: 'layout',
    value: function layout() {}
    // Layout or update the objects in this parent class.

    /**
     * @overridden DOMElement.destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.disable();

      // Call destroy on any child objects.
      // This super method will also null out your properties for garbage collection.

      _get(Object.getPrototypeOf(DeviceButton.prototype), 'destroy', this).call(this);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * A helper method to trigger the CSS transitions.
     *
     * @method animate
     * @public
     */
  }, {
    key: 'animate',
    value: function animate() {
      var _this = this;

      this.$element.addClass('active');

      setTimeout(function () {
        _this.$element.removeClass('active');
      }, 250);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * On click of the button it will animate itself and dispatch an event so the SimonApp
     * can respond to the CHANGE event. Probably should of create and dispatched a custom event.
     *
     * @method _onClick
     * @param event {jQueryEventObject}
     * @private
     */
  }, {
    key: '_onClick',
    value: function _onClick(event) {
      event.preventDefault();

      this.animate();

      var gameModel = new _modelsGameModel2['default']();
      gameModel.buttonIndex = this._indexId;

      this.dispatchEvent(new _structurejsEventBaseEvent2['default'](_structurejsEventBaseEvent2['default'].CHANGE, true, true, gameModel));
    }
  }]);

  return DeviceButton;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = DeviceButton;
module.exports = exports['default'];

/**
 * @property _color
 * @type {string}
 * @private
 */

/**
 * @property _indexId
 * @type {number}
 * @public
 */

},{"../../models/GameModel":3,"structurejs/display/DOMElement":8,"structurejs/event/BaseEvent":12}],6:[function(require,module,exports){
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

},{"./util/Util":21}],7:[function(require,module,exports){
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

},{"../event/BaseEvent":12,"../plugin/jquery.eventListener":16,"../util/ComponentFactory":17,"../util/TemplateFactory":19,"./DisplayObjectContainer":10}],9:[function(require,module,exports){
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

},{"../event/EventDispatcher":13}],10:[function(require,module,exports){
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
            }
            // Assign the current object that is currently processing the event (i.e. event bubbling at).
            event.currentTarget = this;
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

},{"../ObjectManager":7,"./BaseEvent":12}],14:[function(require,module,exports){
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
        define(["require", "exports", './BaseEvent'], factory);
    }
})(function (require, exports) {
    var BaseEvent_1 = require('./BaseEvent');
    /**
     * The TimerEvent...
     *
     * @class TimerEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param [data=null] {any} Use to pass any type of data with the event.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        function TimerEvent(type, bubbles, cancelable, data) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
        }
        /**
         * Dispatched whenever a Timer object reaches an interval specified according to the Timer.delay property.
         *
         * @event TIMER
         * @type {string}
         * @static
         */
        TimerEvent.TIMER = 'TimerEvent.timer';
        /**
         * Dispatched whenever it has completed the number of requests set by Timer.repeatCount.
         *
         * @event TIMER_COMPLETE
         * @type {string}
         * @static
         */
        TimerEvent.TIMER_COMPLETE = 'TimerEvent.timerComplete';
        return TimerEvent;
    })(BaseEvent_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TimerEvent;
});

},{"./BaseEvent":12}],15:[function(require,module,exports){
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
        define(["require", "exports", '../BaseObject', '../util/Util'], factory);
    }
})(function (require, exports) {
    var BaseObject_1 = require('../BaseObject');
    var Util_1 = require('../util/Util');
    /**
     *  Base Model is a design pattern used to transfer data between software application subsystems.
     *
     * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
     *  Also in the class you inherit BaseModel from you can override the update method to handle the data how you want.
     *
     * @class BaseModel
     * @extends BaseObject
     * @param [data] {any} Provide a way to update the  Base Model upon initialization.
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires BaseObject
     * @requires Util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *      // Example how to extend the BaseModel class.
     *      let data = {
     *              make: 'Tesla',
     *              model: 'Model S',
     *              YeAr: 2014,
     *              feature: {
     *                  abs: true,
     *                  airbags: true
     *              }
     *      }
     *      let carModel = new CarModel(data);
     *
     *
     *      // Example how to extend the BaseModel class.
     *      class CarModel extends BaseModel {
     *
     *          // You need to have properties so the data will get assigned.
     *          // If not the data will not get assigned to the model.
     *          make = null;
     *          model = null;
     *          year = null;
     *          allWheel = false; // Set a default value
     *
     *          // You can assign BaseModel to a property which will
     *          // automatically created it and pass the data to it.
     *          feature = FeatureModel
     *
     *          // If you have an array of data and want them assign to a BaseModel.
     *          feature = [FeatureModel];
     *
     *          constructor(data) {
     *              super();
     *
     *              if (data) {
     *                  this.update(data);
     *              }
     *          }
     *
     *          // @overridden BaseModel.update
     *          update(data) {
     *              super.update(data);
     *
     *              // If the data doesn't match the property name.
     *              // You can set the value(s) manually after the update super method has been called.
     *              this.year = data.YeAr;
     *          }
     *      }
     */
    var BaseModel = (function (_super) {
        __extends(BaseModel, _super);
        function BaseModel() {
            _super.call(this);
        }
        /**
         * Provide a way to update the  Base Model.
         *
         * @method update
         * @param data {any}
         * @public
         * @example
         *     // Example of updating some of the data:
         *     carModel.update({ year: 2015, allWheel: true});
         *
         *     // Of course you can also do it the following way:
         *     carModel.year = 2015;
         *     carModel.allWheel = false;
         */
        BaseModel.prototype.update = function (data) {
            var propertyData;
            for (var propertyKey in this) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the sjsId data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(propertyKey) && propertyKey !== 'sjsId') {
                    // If the data passed in does not have a property that matches a property on the  Base Model then
                    // use the default value/data that was assigned to the property.
                    // Else use the data that was passed in.
                    propertyData = (data[propertyKey] === void 0) ? this[propertyKey] : data[propertyKey];
                    this._setData(propertyKey, propertyData);
                }
            }
            return this;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _setData
         * @param key
         * @param data
         * @protected
         */
        BaseModel.prototype._setData = function (key, data) {
            // If the data is an array and if the property its being assigned to is an array.
            if (data instanceof Array && this[key] instanceof Array) {
                var temp = [];
                var len = data.length;
                if ((this[key][0] instanceof BaseModel.constructor && data[0] instanceof BaseModel.constructor) === false) {
                    var baseModelOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                    for (var i_1 = 0; i_1 < len; i_1++) {
                        temp[i_1] = this._updateData(baseModelOrOther, data[i_1]);
                    }
                }
                this[key] = temp;
            }
            else {
                this[key] = this._updateData(this[key], data);
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateData
         * @param keyValue
         * @param data
         * @protected
         */
        BaseModel.prototype._updateData = function (keyValue, data) {
            if (keyValue instanceof BaseModel.constructor) {
                // If the property is an instance of a BaseModel class and has not been created yet.
                // Then instantiate it and pass in the data to the constructor.
                keyValue = new keyValue(data);
            }
            else if (keyValue instanceof BaseModel) {
                // If property is an instance of a BaseModel class and has already been created.
                // Then call the update method and pass in the data.
                keyValue.update(data);
            }
            else {
                // Else just assign the data to the property.
                keyValue = data;
            }
            return keyValue;
        };
        /**
         * Converts the Base Model data into a JSON object and deletes the sjsId property.
         *
         * @method toJSON
         * @returns {any}
         * @public
         * @example
         *     let obj = carModel.toJSON();
         */
        BaseModel.prototype.toJSON = function () {
            var clone = Util_1.default.clone(this);
            return Util_1.default.deletePropertyFromObject(clone, ['sjsId']);
        };
        /**
         * Converts a  Base Model to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     let str = carModel.toJSONString();
         */
        BaseModel.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Object and calls the {{#crossLink "BaseModel/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      let str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      let carModel = new CarModel();
         *      carModel.fromJSON(str);
         */
        BaseModel.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);
            return this;
        };
        /**
         * Create a clone/copy of the  Base Model.
         *
         * @method clone
         * @returns {BaseModel}
         * @public
         * @example
         *     let clone = carModel.clone();
         */
        BaseModel.prototype.clone = function () {
            var clonedBaseModel = new this.constructor(this);
            return clonedBaseModel;
        };
        return BaseModel;
    })(BaseObject_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = BaseModel;
});

},{"../BaseObject":6,"../util/Util":21}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{"../util/Util":21}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./StringUtil":18}],20:[function(require,module,exports){
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
        define(["require", "exports", '../event/EventDispatcher', '../event/TimerEvent'], factory);
    }
})(function (require, exports) {
    var EventDispatcher_1 = require('../event/EventDispatcher');
    var TimerEvent_1 = require('../event/TimerEvent');
    /**
     * Constructs a new Timer object with the specified delay and repeatCount states.
     *
     * @class Timer
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule util
     * @requires Extend
     * @requires EventDispatcher
     * @requires TimerEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            _super.call(this);
            /**
             * A reference to the setInterval object.
             *
             * @property _timer
             * @type {Function}
             * @protected
             */
            this._timer = null;
            /**
             * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
             *
             * @property currentCount
             * @type {int}
             * @protected
             */
            this._currentCount = 0;
            /**
             * The delay, in milliseconds, between timer events. If you set the delay interval while the timer is running, the timer will restart at the same repeatCount iteration.
             * <strong>Note:</strong> A delay lower than 20 milliseconds is not recommended.
             *
             * @property delay
             * @type {number}
             * @protected
             */
            this._delay = null;
            /**
             * The total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
             *
             * @property repeatCount
             * @type {int}
             * @protected
             */
            this._repeatCount = 0;
            /**
             * The timer's current state; true if the timer is running, otherwise false.
             *
             * @property running
             * @type {boolean}
             * @readOnly
             */
            this.running = false;
            this._delay = delay;
            this._repeatCount = repeatCount;
            this._currentCount = repeatCount;
        }
        /**
         * Returns the total number of times the timer has fired since it started at zero.
         *
         * @method getCurrentCount
         * @returns {number} The total number of times the timer has fired since it started at zero.
         */
        Timer.prototype.getCurrentCount = function () {
            return this._currentCount;
        };
        /**
         * Returns the delay time in milliseconds.
         *
         * @method getDelay
         * @returns {number} Returns the delay time in milliseconds.
         */
        Timer.prototype.getDelay = function () {
            return this._delay;
        };
        /**
         * Sets the delay, in milliseconds, between timer events.
         *
         * @method setDelay
         * @param value {number}
         */
        Timer.prototype.setDelay = function (value) {
            this.stop();
            this._delay = value;
            this.start();
            return this;
        };
        /**
         * Returns the total number of times the timer is set to run.
         *
         * @method getRepeatCount
         * @returns {number} Returns the total number of times the timer is set to run.
         */
        Timer.prototype.getRepeatCount = function () {
            return this._repeatCount;
        };
        /**
         * Set the total number of times the timer is set to run. If the repeat count is set to 0, the timer continues indefinitely. If the repeat count is nonzero, the timer runs the specified number of times. If repeatCount is set to a total that is the same or less then currentCount the timer stops and will not fire again.
         *
         * @method setRepeatCount
         * @param value {number}
         */
        Timer.prototype.setRepeatCount = function (value) {
            this.stop();
            this._repeatCount = value;
            this._currentCount = value;
            this.start();
            return this;
        };
        /**
         * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
         *
         * @method reset
         */
        Timer.prototype.reset = function () {
            this.stop();
            this._currentCount = this._repeatCount;
            return this;
        };
        /**
         * Starts the timer, if it is not already running.
         *
         * @method start
         */
        Timer.prototype.start = function () {
            var _this = this;
            if (this.running) {
                return this;
            }
            this._timer = setInterval(function () {
                _this._decrementCounter();
            }, this._delay);
            this.running = true;
            return this;
        };
        /**
         * Stops the timer.
         *
         * @method stop
         */
        Timer.prototype.stop = function () {
            clearInterval(this._timer);
            this.running = false;
            return this;
        };
        /**
         *
         * @method _decrementCounter
         * @protected
         */
        Timer.prototype._decrementCounter = function () {
            if (this._currentCount > 0) {
                this._currentCount--;
            }
            if (this._delay && this._currentCount > 0 || this._repeatCount === 0) {
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER));
            }
            else {
                this.stop();
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER));
                this.dispatchEvent(new TimerEvent_1.default(TimerEvent_1.default.TIMER_COMPLETE));
            }
        };
        /**
         * @overridden EventDispatcher.destroy
         */
        Timer.prototype.destroy = function () {
            this.stop();
            _super.prototype.destroy.call(this);
        };
        return Timer;
    })(EventDispatcher_1.default);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Timer;
});

},{"../event/EventDispatcher":13,"../event/TimerEvent":14}],21:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1NpbW9uR2FtZS9zcmMvYXNzZXRzL3NjcmlwdHMvQXBwLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9TaW1vbkdhbWUvc3JjL2Fzc2V0cy9zY3JpcHRzL21haW4uanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1NpbW9uR2FtZS9zcmMvYXNzZXRzL3NjcmlwdHMvbW9kZWxzL0dhbWVNb2RlbC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvc2NyaXB0cy92aWV3cy9EZXZpY2VWaWV3LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9TaW1vbkdhbWUvc3JjL2Fzc2V0cy9zY3JpcHRzL3ZpZXdzL2NvbXBvbmVudHMvRGV2aWNlQnV0dG9uLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9TaW1vbkdhbWUvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL09iamVjdE1hbmFnZXIuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L0RPTUVsZW1lbnQuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1NpbW9uR2FtZS9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L0Rpc3BsYXlPYmplY3QuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1NpbW9uR2FtZS9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L0Rpc3BsYXlPYmplY3RDb250YWluZXIuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L1N0YWdlLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvQmFzZUV2ZW50LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9TaW1vbkdhbWUvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvRXZlbnREaXNwYXRjaGVyLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvVGltZXJFdmVudC5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL21vZGVsL0Jhc2VNb2RlbC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lci5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvQ29tcG9uZW50RmFjdG9yeS5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvU3RyaW5nVXRpbC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvVGVtcGxhdGVGYWN0b3J5LmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvdXRpbC9UaW1lci5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvU2ltb25HYW1lL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3V0aWwvVXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNDQWtCLDJCQUEyQjs7Ozs0Q0FDdEIsZ0NBQWdDOzs7O3lDQUNqQyw2QkFBNkI7Ozs7b0NBQ2pDLHdCQUF3Qjs7OzswQ0FDbkIsOEJBQThCOzs7OytCQUU5QixvQkFBb0I7Ozs7Ozs7Ozs7OztJQVNyQyxHQUFHO2NBQUgsR0FBRzs7QUE2Qk0sYUE3QlQsR0FBRyxHQTZCUzs4QkE3QlosR0FBRzs7QUE4QkQsbUNBOUJGLEdBQUcsNkNBOEJPO2FBckJaLFdBQVcsR0FBRyxJQUFJO2FBU2xCLGNBQWMsR0FBRyxJQUFJO2FBU3JCLE1BQU0sR0FBRyxJQUFJO0tBSVo7Ozs7OztpQkEvQkMsR0FBRzs7ZUFvQ0Msa0JBQUc7QUFDTCx1Q0FyQ0YsR0FBRyx3Q0FxQ2M7O0FBRWYsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRXhELGdCQUFJLENBQUMsV0FBVyxHQUFHLGlDQUFlLE9BQU8sQ0FBQyxDQUFDO0FBQzNDLGdCQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNoQyxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFM0IsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsOENBQWUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDbEUsZ0JB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZtQkEsSUFBSSxT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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMxYkEsSUFBSSxTQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN4RCxTQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2hPQSxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQ2hCLFFBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDcE1BLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxZQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEFBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQzlFLE1BQ0ksSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqRCxjQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0M7Q0FDSixDQUFBLENBQUUsVUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7Ozs7Ozs7O0FBVTNCLFFBQUksSUFBSSxHQUFHLENBQUMsWUFBWTtBQUNwQixpQkFBUyxJQUFJLEdBQUc7QUFDWixrQkFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1NBQzdGOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELFlBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxNQUFNLEVBQUU7QUFDOUIsZ0JBQUksTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQUUsc0JBQU0sR0FBRyxJQUFJLENBQUM7YUFBRTtBQUN6QyxnQkFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzNCLGdCQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7QUFDaEIsdUJBQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM5QixNQUNJO0FBQ0QsdUJBQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCRixZQUFJLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVyRCxnQkFBSSxJQUFJLEdBQUcsQUFBQyxLQUFLLFlBQVksS0FBSyxHQUFJLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV0RCxpQkFBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7O0FBRXBCLG9CQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDNUIsd0JBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFMUIsd0JBQUksT0FBTyxZQUFZLEtBQUssRUFBRTs7QUFFMUIsNEJBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUNwQiw2QkFBSyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUU7O0FBRXJCLGdDQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNyRDtxQkFDSixNQUNJLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUNoQyw0QkFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDaEQsTUFDSTs7QUFFRCw2QkFBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7O0FBRXhCLGdDQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBRXpCLHVDQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDdEI7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtBQUNELG1CQUFPLE1BQU0sQ0FBQztTQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkYsWUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRTlELGdCQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDaEMsc0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEMsdUJBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFCO0FBQ0QsbUJBQU8sTUFBTSxDQUFDO1NBQ2pCLENBQUM7Ozs7Ozs7Ozs7OztBQVlGLFlBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7O0FBS3hCLGdCQUFJLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLE9BQU8sR0FBRyxFQUFFO0FBQ3ZDLHVCQUFPLEdBQUcsQ0FBQzthQUNkOztBQUVELGdCQUFJLEdBQUcsWUFBWSxJQUFJLEVBQUU7QUFDckIsb0JBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsb0JBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDNUIsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7O0FBRUQsZ0JBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtBQUN0QixvQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YscUJBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7QUFDbEQseUJBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQztBQUNELHVCQUFPLEtBQUssQ0FBQzthQUNoQjs7QUFFRCxnQkFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO0FBQ3ZCLG9CQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxxQkFBSyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDbEIsd0JBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMxQiw0QkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ3RDO2lCQUNKO0FBQ0QsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxrQkFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQzNFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkYsWUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUMvQixnQkFBSSxLQUFLLEdBQUcsQUFBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztBQUN6RSxtQkFBUSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBRTtTQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFlRixZQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsV0FBVyxFQUFFO0FBQ2xDLGdCQUFJLElBQUksR0FBRyxPQUFPLFdBQVcsQ0FBQztBQUM5QixnQkFBSSxLQUFLLENBQUM7QUFDVixnQkFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUM7QUFDeEMsZ0JBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTs7QUFFbkIsb0JBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RFLHFCQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCLE1BQ0k7O0FBRUQsb0JBQUksVUFBVSxHQUFJLElBQUksS0FBSyxVQUFVLEFBQUMsQ0FBQzs7QUFFdkMsb0JBQUksTUFBTSxHQUFHLFVBQVUsS0FBSyxBQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUEsQUFBQyxDQUFDO0FBQ3pILG9CQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7QUFDdEIseUJBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2hCLE1BQ0ksSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFCLHlCQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixNQUNJO0FBQ0QseUJBQUssR0FBRyxXQUFXLENBQUM7aUJBQ3ZCO2FBQ0o7QUFDRCxtQkFBTyxLQUFLLENBQUM7U0FDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZUYsWUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRTtBQUNoRSxnQkFBSSxPQUFPLENBQUM7QUFDWixnQkFBSSxNQUFNLENBQUM7QUFDWCxnQkFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLEdBQWU7QUFDeEIsb0JBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQix5QkFBUyxPQUFPLEdBQUc7QUFDZix3QkFBSSxTQUFTLElBQUksS0FBSyxFQUFFO0FBQ3BCLDhCQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ2hEO0FBQ0QsMkJBQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2xCO0FBQ0Qsb0JBQUksT0FBTyxFQUFFO0FBQ1QsZ0NBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDekIsTUFDSSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFDekIsMEJBQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEQ7QUFDRCx1QkFBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsdUJBQU8sTUFBTSxDQUFDO2FBQ2pCLENBQUM7QUFDRixxQkFBUyxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzNCLDRCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekIsQ0FBQztBQUNGLG1CQUFPLFNBQVMsQ0FBQztTQUNwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkYsWUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLFdBQVcsRUFBRSxTQUFTLEVBQUU7QUFDakQscUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDbEMsc0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQ25FLCtCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFELENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOLENBQUM7Ozs7Ozs7OztBQVNGLFlBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLEVBQUU7QUFDMUIsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxhQUFhLEVBQUUsWUFBWSxFQUFFO0FBQ2hFLG9CQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUMsaUNBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BDO0FBQ0QsdUJBQU8sYUFBYSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxtQkFBTyxVQUFVLENBQUM7U0FDckIsQ0FBQzs7Ozs7Ozs7O0FBU0YsWUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDcEIsZUFBTyxJQUFJLENBQUM7S0FDZixDQUFBLEVBQUcsQ0FBQztBQUNMLFVBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELFdBQU8sV0FBUSxHQUFHLElBQUksQ0FBQztDQUMxQixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFN0YWdlIGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvU3RhZ2UnO1xuaW1wb3J0IERPTUVsZW1lbnQgZnJvbSAnc3RydWN0dXJlanMvZGlzcGxheS9ET01FbGVtZW50JztcbmltcG9ydCBCYXNlRXZlbnQgZnJvbSAnc3RydWN0dXJlanMvZXZlbnQvQmFzZUV2ZW50JztcbmltcG9ydCBUaW1lciBmcm9tICdzdHJ1Y3R1cmVqcy91dGlsL1RpbWVyJztcbmltcG9ydCBUaW1lckV2ZW50IGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L1RpbWVyRXZlbnQnO1xuXG5pbXBvcnQgRGV2aWNlVmlldyBmcm9tICcuL3ZpZXdzL0RldmljZVZpZXcnO1xuXG4vKipcbiAqIFRPRE86IFlVSURvY19jb21tZW50XG4gKlxuICogQGNsYXNzIEFwcFxuICogQGV4dGVuZHMgU3RhZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgQXBwIGV4dGVuZHMgU3RhZ2Uge1xuXG4gICAgLyoqXG4gICAgICogQSB2aWV3IHRoYXQgY29udGFpbnMgdGhlIGNvbG9yIGJ1dHRvbnMuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgX2RldmljZVZpZXdcbiAgICAgKiBAdHlwZSB7RGV2aWNlVmlld31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXZpY2VWaWV3ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB3aGl0ZSBjZW50ZXIgYnV0dG9uIGZvciB0aGUgZ2FtZSB0byBzdGFydCB0aGUgZ2FtZS5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBfY2VudGVyRGlzcGxheVxuICAgICAqIEB0eXBlIHtET01FbGVtZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NlbnRlckRpc3BsYXkgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogVGltZXIgdG8gcGxheSB0aGUgc2VxdWVuY2UgdGhlIHVzZXIgbmVlZHMgdG8gcmVtZW1iZXIuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgX3RpbWVyXG4gICAgICogQHR5cGUge1RpbWVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RpbWVyID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgICAgICBsZXQgJGRldmljZSA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLXNpbW9uQXBwLWRldmljZScpO1xuXG4gICAgICAgIHRoaXMuX2RldmljZVZpZXcgPSBuZXcgRGV2aWNlVmlldygkZGV2aWNlKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9kZXZpY2VWaWV3KTtcbiAgICAgICAgdGhpcy5fZGV2aWNlVmlldy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdGhpcy5fY2VudGVyRGlzcGxheSA9IG5ldyBET01FbGVtZW50KCdkaXYnLCB7J2NsYXNzJzogJ2Rpc3BsYXknfSk7XG4gICAgICAgIHRoaXMuX2RldmljZVZpZXcuYWRkQ2hpbGQodGhpcy5fY2VudGVyRGlzcGxheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25DbGlja0NvbG9yQnRuLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9jZW50ZXJEaXNwbGF5LiRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljaywgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5fb25DbGlja0NvbG9yQnRuLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9jZW50ZXJEaXNwbGF5LiRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGljaywgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQubGF5b3V0XG4gICAgICovXG4gICAgbGF5b3V0KCkge1xuICAgICAgICBpZiAodGhpcy5fZGV2aWNlVmlldy5pc0VuYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NlbnRlckRpc3BsYXkuJGVsZW1lbnQudGV4dCgnR28hJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jZW50ZXJEaXNwbGF5LiRlbGVtZW50LnRleHQoJ1N0YXJ0IScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdGhpcy5fZGV2aWNlVmlldy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuX2NlbnRlckRpc3BsYXkuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl90aW1lci5kZXN0cm95KCk7XG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFVkVOVCBIQU5ETEVSU1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIEVhY2ggdGltZSB0aGUgdGltZXIgdGlja3MgdGhpcyBtZXRob2QgaXMgY2FsbGVkIGFuZCBhbmltYXRlcyBvbmUgb2YgdGhlIGNvbG9yZWQgYnV0dG9ucy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgX29uVGltZXJcbiAgICAgKiBAcGFyYW0gZXZlbnQge1RpbWVyRXZlbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25UaW1lcihldmVudCkge1xuICAgICAgICBsZXQgdGltZXIgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGxldCBzZXF1ZW5jZVN0ZXBzID0gdGhpcy5fbWVtb3J5T3JkZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IHNlcXVlbmNlU3RlcHMgLSB0aW1lci5nZXRDdXJyZW50Q291bnQoKTtcbiAgICAgICAgbGV0IHNob3dJdGVtID0gdGhpcy5fbWVtb3J5T3JkZXJbY3VycmVudEluZGV4XTtcblxuICAgICAgICB0aGlzLl9kZXZpY2VWaWV3LmFuaW1hdGVCdXR0b24oc2hvd0l0ZW0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIG1lbW9yeSBzZXF1ZW5jZSBjb21wbGV0ZXMgdGhpcyBtZXRob2Qgd2lsbCBlbmFibGUgdGhlIGNvbG9yIGJ1dHRvbnMgYW5kXG4gICAgICogd2lsbCB1cGRhdGUgdGhlIHdoaXRlIGJ1dHRvbiB0ZXh0IGJ5IGNhbGxpbmcgdGhlIGxheW91dCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vblRpbWVyQ29tcGxldGVcbiAgICAgKiBAcGFyYW0gZXZlbnQge1RpbWVyRXZlbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25UaW1lckNvbXBsZXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX3RpbWVyLmRlc3Ryb3koKTtcblxuICAgICAgICB0aGlzLl9kZXZpY2VWaWV3LmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvciBldmVyeSBDSEFOR0UgZXZlbnQgdGhhdCBpcyBkaXNwYXRjaGVkIGJ5IHRoZSBEZXZpY2VCdXR0b24ncyB0aGlzIG1ldGhvZCB3aWxsIGhlbHAga2VlcFxuICAgICAqIHRyYWNrIG9mIHRoZSBidXR0b25zIGNsaWNrZWQgYW5kIHRoZW4gd2lsbCBkZXRlcm1pbmUgaWYgdGhlIHVzZXIgY2xpY2sgdGhlIGNvbG9yZWQgYnV0dG9uc1xuICAgICAqIGluIHRoZSBjb3JyZWN0IHNlcXVlbmNlLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25DbGlja0NvbG9yQnRuXG4gICAgICogQHBhcmFtIGV2ZW50IHtCYXNlRXZlbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25DbGlja0NvbG9yQnRuKGV2ZW50KSB7XG4gICAgICAgIGxldCBnYW1lTW9kZWwgPSBldmVudC5kYXRhO1xuICAgICAgICB0aGlzLl91c2VyU2VxdWVuY2UucHVzaChnYW1lTW9kZWwuYnV0dG9uSW5kZXgpO1xuXG4gICAgICAgIGlmICh0aGlzLl91c2VyU2VxdWVuY2UubGVuZ3RoID09PSB0aGlzLl9tZW1vcnlPcmRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBpc01hdGNoID0gdGhpcy5fdXNlclNlcXVlbmNlLnRvU3RyaW5nKCkgPT09IHRoaXMuX21lbW9yeU9yZGVyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAoaXNNYXRjaCkge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdZb3UgZGlkIGl0IScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnTm9wZSwgeW91IGRpZCBub3QgZ2V0IGl0LicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXNlclNlcXVlbmNlID0gW107XG4gICAgICAgICAgICB0aGlzLl9kZXZpY2VWaWV3LmRpc2FibGUoKTtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHRoZSB3aGl0ZSBjZW50ZXIgYnV0dG9uIGlzIGNsaWNrZWQgdGhpcyB3aWxsIHNldCB0aGUgbWVtb3J5IHNlcXVlbmNlIGFuZCBzdGFydCBhIHRpbWVyXG4gICAgICogd2hpY2ggd2lsbCBwbGF5IHRoZSBzZXF1ZW5jZSBmb3IgdGhlIHVzZXIgdG8gcmVtZW1iZXIuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkNsaWNrXG4gICAgICogQHBhcmFtIGV2ZW50IHtqUXVlcnlFdmVudE9iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fY2VudGVyRGlzcGxheS4kZWxlbWVudC50ZXh0KCcnKTtcblxuICAgICAgICB0aGlzLl9tZW1vcnlPcmRlciA9IFswLDIsMywxLDIsMl07XG4gICAgICAgIHRoaXMuX3VzZXJTZXF1ZW5jZSA9IFtdO1xuXG4gICAgICAgIHRoaXMuX3RpbWVyID0gIG5ldyBUaW1lcigxNTAwLCB0aGlzLl9tZW1vcnlPcmRlci5sZW5ndGgpO1xuICAgICAgICB0aGlzLl90aW1lci5hZGRFdmVudExpc3RlbmVyKFRpbWVyRXZlbnQuVElNRVIsIHRoaXMuX29uVGltZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl90aW1lci5hZGRFdmVudExpc3RlbmVyKFRpbWVyRXZlbnQuVElNRVJfQ09NUExFVEUsIHRoaXMuX29uVGltZXJDb21wbGV0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3RpbWVyLnN0YXJ0KCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xuYXBwLmFwcGVuZFRvKCdib2R5Jyk7ICAgLy8gTmVlZCB0byBzcGVjaWZ5IHdoYXQgYXJlYSBvdXIgY29kZSBoYXMgY29udHJvbCBvdmVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIEFwcC5qcyBjbGFzcyBleHRlbmRzIFN0YWdlIHdoaWNoIGhhcyB0aGUgYXBwZW5kVG8gbWV0aG9kLlxuXG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJ3N0cnVjdHVyZWpzL21vZGVsL0Jhc2VNb2RlbCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgR2FtZU1vZGVsXG4gKiBAZXh0ZW5kcyBCYXNlTW9kZWxcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgR2FtZU1vZGVsIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgYnV0dG9uSW5kZXhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBidXR0b25JbmRleCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqL1xuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcblxuICAgICAgICAvLyBPdmVycmlkZSBhbnkgdmFsdWVzIGFmdGVyIHRoZSBkZWZhdWx0IHN1cGVyIHVwZGF0ZSBtZXRob2QgaGFzIHNldCB0aGUgdmFsdWVzLlxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lTW9kZWw7XG4iLCJpbXBvcnQgRE9NRWxlbWVudCBmcm9tICdzdHJ1Y3R1cmVqcy9kaXNwbGF5L0RPTUVsZW1lbnQnO1xuXG5pbXBvcnQgRGV2aWNlQnV0dG9uIGZyb20gJy4vY29tcG9uZW50cy9EZXZpY2VCdXR0b24nO1xuXG4vKipcbiAqIFRPRE86IFlVSURvY19jb21tZW50XG4gKlxuICogQGNsYXNzIERldmljZVZpZXdcbiAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgRGV2aWNlVmlldyBleHRlbmRzIERPTUVsZW1lbnQge1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF9yZWRCdXR0b25cbiAgICAgKiBAdHlwZSB7RGV2aWNlQnV0dG9ufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlZEJ1dHRvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX2dyZWVuQnV0dG9uXG4gICAgICogQHR5cGUge0RldmljZUJ1dHRvbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9ncmVlbkJ1dHRvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX3llbGxvd0J1dHRvblxuICAgICAqIEB0eXBlIHtEZXZpY2VCdXR0b259XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfeWVsbG93QnV0dG9uID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfYmx1ZUJ1dHRvblxuICAgICAqIEB0eXBlIHtEZXZpY2VCdXR0b259XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfYmx1ZUJ1dHRvbiA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YgdGhlIGJ1dHRvbnMgc28gd2UgY2FuIGdldCB0aGUgY29ycmVjdCBvbmUgYnkgdGhpcyBpbmRleFxuICAgICAqIG51bWJlciBiZWluZyBwYXNzZWQgaW50byBhbmltYXRlQnV0dG9uIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBfYnV0dG9uTGlzdFxuICAgICAqIEB0eXBlIHtEZXZpY2VCdXR0b25bXX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9idXR0b25MaXN0ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCRlbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmNyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgdGhpcy5fYnV0dG9uTGlzdCA9IFtdO1xuXG4gICAgICAgIHRoaXMuX2JsdWVCdXR0b24gPSBuZXcgRGV2aWNlQnV0dG9uKCdibHVlJywgMCk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fYmx1ZUJ1dHRvbik7XG5cbiAgICAgICAgdGhpcy5fcmVkQnV0dG9uID0gbmV3IERldmljZUJ1dHRvbigncmVkJywgMSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGRBdCh0aGlzLl9yZWRCdXR0b24sIDApOy8vIEV4YW1wbGUgb2YgdGhlIGFkZENoaWxkQXQgbWV0aG9kLlxuXG4gICAgICAgIHRoaXMuX2dyZWVuQnV0dG9uID0gbmV3IERldmljZUJ1dHRvbignZ3JlZW4nLCAyKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9ncmVlbkJ1dHRvbik7XG5cbiAgICAgICAgdGhpcy5feWVsbG93QnV0dG9uID0gbmV3IERldmljZUJ1dHRvbigneWVsbG93JywgMyk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5feWVsbG93QnV0dG9uKTtcblxuICAgICAgICB0aGlzLnN3YXBDaGlsZHJlbih0aGlzLl9ibHVlQnV0dG9uLCB0aGlzLl9ncmVlbkJ1dHRvbik7Ly8gRXhhbXBsZSBvZiB0aGUgc3dhcENoaWxkcmVuIG1ldGhvZC5cblxuICAgICAgICAvLyBIb2xkIG9uIHRvIHRoZSBjb2xvcmVkIGJ1dHRvbnMgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlcmUgaW5kZXggaWQuXG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaCh0aGlzLl9ibHVlQnV0dG9uKTtcbiAgICAgICAgdGhpcy5fYnV0dG9uTGlzdC5wdXNoKHRoaXMuX3JlZEJ1dHRvbik7XG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaCh0aGlzLl9ncmVlbkJ1dHRvbik7XG4gICAgICAgIHRoaXMuX2J1dHRvbkxpc3QucHVzaCh0aGlzLl95ZWxsb3dCdXR0b24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZW5hYmxlXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fcmVkQnV0dG9uLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLl9ncmVlbkJ1dHRvbi5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5fYmx1ZUJ1dHRvbi5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5feWVsbG93QnV0dG9uLmVuYWJsZSgpO1xuXG4gICAgICAgIHN1cGVyLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGlzYWJsZVxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy5fcmVkQnV0dG9uLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5fZ3JlZW5CdXR0b24uZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLl9ibHVlQnV0dG9uLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5feWVsbG93QnV0dG9uLmRpc2FibGUoKTtcblxuICAgICAgICBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBsYXlvdXQoKSB7XG4gICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgdGhpcy5fcmVkQnV0dG9uLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fZ3JlZW5CdXR0b24uZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9ibHVlQnV0dG9uLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5feWVsbG93QnV0dG9uLmRlc3Ryb3koKTtcblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhFTFBFUiBNRVRIT0RcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBhY2NlcHRzIGEgaW5kZXggcG9zaXRpb24gZm9yIHRoZSBfYnV0dG9uTGlzdCBhcnJheSBhbmQgd2lsbFxuICAgICAqIGNhbGwgdGhlIGFuaW1hdGUgbWV0aG9kIG9uIHRoYXQgYnV0dG9uLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhbmltYXRlQnV0dG9uXG4gICAgICogQHBhcmFtIGJ1dHRvbkluZGV4IHtpbnR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGFuaW1hdGVCdXR0b24oYnV0dG9uSW5kZXgpIHtcbiAgICAgICAgbGV0IGRldmljZUJ1dHRvbiA9IHRoaXMuX2J1dHRvbkxpc3RbYnV0dG9uSW5kZXhdO1xuICAgICAgICBkZXZpY2VCdXR0b24uYW5pbWF0ZSgpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXZpY2VWaWV3O1xuIiwiaW1wb3J0IERPTUVsZW1lbnQgZnJvbSAnc3RydWN0dXJlanMvZGlzcGxheS9ET01FbGVtZW50JztcbmltcG9ydCBCYXNlRXZlbnQgZnJvbSAnc3RydWN0dXJlanMvZXZlbnQvQmFzZUV2ZW50JztcblxuaW1wb3J0IEdhbWVNb2RlbCBmcm9tICcuLi8uLi9tb2RlbHMvR2FtZU1vZGVsJztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBEZXZpY2VCdXR0b25cbiAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgRGV2aWNlQnV0dG9uIGV4dGVuZHMgRE9NRWxlbWVudCB7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX2NvbG9yXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jb2xvciA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX2luZGV4SWRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBfaW5kZXhJZCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb2xvciwgaW5kZXgpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLl9pbmRleElkID0gaW5kZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5jcmVhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHN1cGVyLmNyZWF0ZSgndGVtcGxhdGVzL3ByZWNvbXBpbGUvRGV2aWNlQnV0dG9uJywge2J1dHRvbkNvbG9yOiB0aGlzLl9jb2xvcn0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZW5hYmxlXG4gICAgICovXG4gICAgZW5hYmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmNzcygnY3Vyc29yJywncG9pbnRlcicpO1xuXG4gICAgICAgIHN1cGVyLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGlzYWJsZVxuICAgICAqL1xuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2xpY2ssIHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmNzcygnY3Vyc29yJywnZGVmYXVsdCcpO1xuXG4gICAgICAgIHN1cGVyLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmxheW91dFxuICAgICAqL1xuICAgIGxheW91dCgpIHtcbiAgICAgICAgLy8gTGF5b3V0IG9yIHVwZGF0ZSB0aGUgb2JqZWN0cyBpbiB0aGlzIHBhcmVudCBjbGFzcy5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRlc3Ryb3lcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgICAvLyBDYWxsIGRlc3Ryb3kgb24gYW55IGNoaWxkIG9iamVjdHMuXG4gICAgICAgIC8vIFRoaXMgc3VwZXIgbWV0aG9kIHdpbGwgYWxzbyBudWxsIG91dCB5b3VyIHByb3BlcnRpZXMgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhFTFBFUiBNRVRIT0RcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBtZXRob2QgdG8gdHJpZ2dlciB0aGUgQ1NTIHRyYW5zaXRpb25zLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBhbmltYXRlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGFuaW1hdGUoKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEVWRU5UIEhBTkRMRVJTXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgLyoqXG4gICAgICogT24gY2xpY2sgb2YgdGhlIGJ1dHRvbiBpdCB3aWxsIGFuaW1hdGUgaXRzZWxmIGFuZCBkaXNwYXRjaCBhbiBldmVudCBzbyB0aGUgU2ltb25BcHBcbiAgICAgKiBjYW4gcmVzcG9uZCB0byB0aGUgQ0hBTkdFIGV2ZW50LiBQcm9iYWJseSBzaG91bGQgb2YgY3JlYXRlIGFuZCBkaXNwYXRjaGVkIGEgY3VzdG9tIGV2ZW50LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25DbGlja1xuICAgICAqIEBwYXJhbSBldmVudCB7alF1ZXJ5RXZlbnRPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25DbGljayhldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSgpO1xuXG4gICAgICAgIGxldCBnYW1lTW9kZWwgPSBuZXcgR2FtZU1vZGVsKCk7XG4gICAgICAgIGdhbWVNb2RlbC5idXR0b25JbmRleCA9IHRoaXMuX2luZGV4SWQ7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSwgdHJ1ZSwgdHJ1ZSwgZ2FtZU1vZGVsKSk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IERldmljZUJ1dHRvbjtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL3V0aWwvVXRpbCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvanF1ZXJ5LmQudHMnLz5cbiAgICAvLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2hhbmRsZWJhcnMuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvZ3JlZW5zb2NrLmQudHMnLz5cbiAgICAvLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2pxdWVyeS5ldmVudExpc3RlbmVyLmQudHMnLz5cbiAgICAvLy88cmVmZXJlbmNlIHBhdGg9J19kZWNsYXJlL2xvZy5kLnRzJy8+XG4gICAgdmFyIFV0aWxfMSA9IHJlcXVpcmUoJy4vdXRpbC9VdGlsJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VPYmplY3RcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgYW4gYWJzdHJhY3QgY2xhc3MgdGhhdCBwcm92aWRlcyBjb21tb24gcHJvcGVydGllcyBhbmQgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgQmFzZU9iamVjdFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGNvcmVcbiAgICAgKiBAcmVxdWlyZXMgVXRpbFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBCYXNlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQmFzZU9iamVjdCgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHNqc0lkIChTdHJ1Y3R1cmVKUyBJRCkgaXMgYSB1bmlxdWUgaWRlbnRpZmllciBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIG1vc3QgU3RydWN0dXJlSlMgb2JqZWN0cyB1cG9uIGluc3RhbnRpYXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHNqc0lkXG4gICAgICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHdyaXRlT25jZVxuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2pzSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zanNJZCA9IFV0aWxfMS5kZWZhdWx0LnVuaXF1ZUlkKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGZ1bGx5IHF1YWxpZmllZCBjbGFzcyBuYW1lIG9mIGFuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRRdWFsaWZpZWRDbGFzc05hbWVcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY2xhc3MgbmFtZS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IHNvbWVDbGFzcyA9IG5ldyBTb21lQ2xhc3MoKTtcbiAgICAgICAgICogICAgIHNvbWVDbGFzcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFNvbWVDbGFzc1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU9iamVjdC5wcm90b3R5cGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFV0aWxfMS5kZWZhdWx0LmdldE5hbWUodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcHVycG9zZSBvZiB0aGUgZGVzdHJveSBtZXRob2QgaXMgdG8gbWFrZSBhbiBvYmplY3QgcmVhZHkgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi4gVGhpc1xuICAgICAgICAgKiBzaG91bGQgYmUgdGhvdWdodCBvZiBhcyBhIG9uZSB3YXkgZnVuY3Rpb24uIE9uY2UgZGVzdHJveSBpcyBjYWxsZWQgbm8gZnVydGhlciBtZXRob2RzIHNob3VsZCBiZVxuICAgICAgICAgKiBjYWxsZWQgb24gdGhlIG9iamVjdCBvciBwcm9wZXJ0aWVzIGFjY2Vzc2VkLiBJdCBpcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGhvc2Ugd2hvIGltcGxlbWVudCB0aGlzXG4gICAgICAgICAqIGZ1bmN0aW9uIHRvIHN0b3AgYWxsIHJ1bm5pbmcgVGltZXJzLCBhbGwgcnVubmluZyBTb3VuZHMsIGFuZCB0YWtlIGFueSBvdGhlciBzdGVwcyBuZWNlc3NhcnkgdG8gbWFrZSBhblxuICAgICAgICAgKiBvYmplY3QgZWxpZ2libGUgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQnkgZGVmYXVsdCB0aGUgZGVzdHJveSBtZXRob2Qgd2lsbCBudWxsIG91dCBhbGwgcHJvcGVydGllcyBvZiB0aGUgY2xhc3MgYXV0b21hdGljYWxseS4gWW91IHNob3VsZCBjYWxsIGRlc3Ryb3lcbiAgICAgICAgICogb24gb3RoZXIgb2JqZWN0cyBiZWZvcmUgY2FsbGluZyB0aGUgc3VwZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAgICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBkZXN0cm95KCkge1xuICAgICAgICAgKiAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIEJhc2VPYmplY3QucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBCYXNlT2JqZWN0O1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IEJhc2VPYmplY3Q7XG59KTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vQmFzZU9iamVjdCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlT2JqZWN0XzEgPSByZXF1aXJlKCcuL0Jhc2VPYmplY3QnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiT2JqZWN0TWFuYWdlclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyBhbiBhYnN0cmFjdCBjbGFzcyB0aGF0IHByb3ZpZGVzIGVuYWJsaW5nIGFuZCBkaXNhYmxpbmcgZnVuY3Rpb25hbGl0eSBmb3IgbW9zdCBTdHJ1Y3R1cmVKUyBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQGNsYXNzIE9iamVjdE1hbmFnZXJcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQGV4dGVuZHMgQmFzZU9iamVjdFxuICAgICAqIEBzdWJtb2R1bGUgY29yZVxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgQmFzZU9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBPYmplY3RNYW5hZ2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKE9iamVjdE1hbmFnZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIE9iamVjdE1hbmFnZXIoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGlzRW5hYmxlZCBwcm9wZXJ0eSBpcyB1c2VkIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaXNFbmFibGVkXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaXNFbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBlbmFibGUgbWV0aG9kIGlzIHJlc3BvbnNpYmxlIGZvciBlbmFibGluZyBldmVudCBsaXN0ZW5lcnMgYW5kL29yIGNoaWxkcmVuIG9mIHRoZSBjb250YWluaW5nIG9iamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZW5hYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgZW5hYmxlKCkge1xuICAgICAgICAgKiAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuaGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZW5hYmxlKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdE1hbmFnZXIucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGlzYWJsZSBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGRpc2FibGluZyBldmVudCBsaXN0ZW5lcnMgYW5kL29yIGNoaWxkcmVuIG9mIHRoZSBjb250YWluaW5nIG9iamVjdHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGlzYWJsZVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBkaXNhYmxlKCkge1xuICAgICAgICAgKiAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLmhhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmRpc2FibGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgcmV0dXJuIHN1cGVyLmRpc2FibGUoKTtcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBPYmplY3RNYW5hZ2VyLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gT2JqZWN0TWFuYWdlcjtcbiAgICB9KShCYXNlT2JqZWN0XzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IE9iamVjdE1hbmFnZXI7XG59KTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vRGlzcGxheU9iamVjdENvbnRhaW5lcicsICcuLi9ldmVudC9CYXNlRXZlbnQnLCAnLi4vdXRpbC9UZW1wbGF0ZUZhY3RvcnknLCAnLi4vdXRpbC9Db21wb25lbnRGYWN0b3J5JywgJy4uL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lciddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXzEgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3RDb250YWluZXInKTtcbiAgICB2YXIgQmFzZUV2ZW50XzEgPSByZXF1aXJlKCcuLi9ldmVudC9CYXNlRXZlbnQnKTtcbiAgICB2YXIgVGVtcGxhdGVGYWN0b3J5XzEgPSByZXF1aXJlKCcuLi91dGlsL1RlbXBsYXRlRmFjdG9yeScpO1xuICAgIHZhciBDb21wb25lbnRGYWN0b3J5XzEgPSByZXF1aXJlKCcuLi91dGlsL0NvbXBvbmVudEZhY3RvcnknKTtcbiAgICB2YXIganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMSA9IHJlcXVpcmUoJy4uL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lcicpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJET01FbGVtZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHRoZSBiYXNlIHZpZXcgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIHBsYWNlZCBpbnRvIHRoZSBIVE1MIERPTS5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBET01FbGVtZW50XG4gICAgICogQHBhcmFtIHR5cGUgW2FueT1udWxsXSBFaXRoZXIgYSBqUXVlcnkgb2JqZWN0IG9yIEphdmFTY3JpcHQgdGVtcGxhdGUgc3RyaW5nIHJlZmVyZW5jZSB5b3Ugd2FudCB0byB1c2UgYXMgdGhlIHZpZXcuIENoZWNrIG91dCB0aGUgZXhhbXBsZXMgYmVsb3cuXG4gICAgICogQHBhcmFtIHBhcmFtcyBbYW55PW51bGxdIEFueSBkYXRhIHlvdSB3b3VsZCBsaWtlIHRvIHBhc3MgaW50byB0aGUgalF1ZXJ5IGVsZW1lbnQgb3IgdGVtcGxhdGUgdGhhdCBpcyBiZWluZyBjcmVhdGVkLlxuICAgICAqIEBleHRlbmRzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB2aWV3XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG4gICAgICogQHJlcXVpcmVzIEJhc2VFdmVudFxuICAgICAqIEByZXF1aXJlcyBUZW1wbGF0ZUZhY3RvcnlcbiAgICAgKiBAcmVxdWlyZXMgQ29tcG9uZW50RmFjdG9yeVxuICAgICAqIEByZXF1aXJlcyBqUXVlcnlcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAvLyBFeGFtcGxlOiBVc2luZyBET01FbGVtZW50IHdpdGhvdXQgZXh0ZW5kaW5nIGl0LlxuICAgICAqICAgICBsZXQgYUxpbmsgPSBuZXcgRE9NRWxlbWVudCgnYScsIHt0ZXh0OiAnR29vZ2xlJywgaHJlZjogJ2h0dHA6Ly93d3cuZ29vZ2xlLmNvbScsICdjbGFzcyc6ICdleHRlcm5hbExpbmsnfSk7XG4gICAgICogICAgIHRoaXMuYWRkQ2hpbGQoYUxpbmspO1xuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGU6IEEgdmlldyBwYXNzaW5nIGluIGEgalF1ZXJ5IG9iamVjdC5cbiAgICAgKiAgICAgbGV0IHZpZXcgPSBuZXcgQ3VzdG9tVmlldygkKCcuc2VsZWN0b3InKSk7XG4gICAgICogICAgIHRoaXMuYWRkQ2hpbGQodmlldyk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IGV4dGVuZGluZyBET01FbGVtZW50IHdoaWxlIHBhc3NpbmcgaW4gYSBqUXVlcnkgb2JqZWN0LlxuICAgICAqICAgICBjbGFzcyBDbGFzc05hbWUgZXh0ZW5kcyBET01FbGVtZW50IHtcbiAgICAgKlxuICAgICAqICAgICAgICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyKCRlbGVtZW50KTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjcmVhdGUoKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIHlvdXIgY2hpbGQgb2JqZWN0cyB0byB0aGlzIHBhcmVudCBjbGFzcy5cbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBlbmFibGUoKSB7XG4gICAgICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIEVuYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgYWRkIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGRpc2FibGUoKSB7XG4gICAgICogICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBEaXNhYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZW1vdmUgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGxheW91dCgpIHtcbiAgICAgKiAgICAgICAgICAgICAgLy8gTGF5b3V0IG9yIHVwZGF0ZSB0aGUgY2hpbGQgb2JqZWN0cyBpbiB0aGlzIHBhcmVudCBjbGFzcy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBkZXN0cm95KCkge1xuICAgICAqICAgICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZWZlcmVuY2VzIGluIHRoaXMgcGFyZW50IGNsYXNzIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgfVxuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGU6IEEgdmlldyBleHRlbmRpbmcgRE9NRWxlbWVudCB3aXRoIGEgcHJlY29tcGlsZWQgSmF2YVNjcmlwdCB0ZW1wbGF0ZSByZWZlcmVuY2UgcGFzc2VkIGluLlxuICAgICAqICAgICBjbGFzcyBDbGFzc05hbWUgZXh0ZW5kcyBET01FbGVtZW50IHtcbiAgICAgKlxuICAgICAqICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAqICAgICAgICAgICAgICBfc3VwZXIoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjcmVhdGUoKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyLmNyZWF0ZSgndGVtcGxhdGVzL2hvbWUvaG9tZVRlbXBsYXRlJywge2RhdGE6ICdzb21lIGRhdGEnfSk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgeW91ciBjaGlsZCBvYmplY3RzIHRvIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlZmVyZW5jZXMgaW4gdGhpcyBwYXJlbnQgY2xhc3MgdG8gcHJlcGFyZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgfVxuICAgICAqL1xuICAgIHZhciBET01FbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKERPTUVsZW1lbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIERPTUVsZW1lbnQodHlwZSwgcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSBudWxsOyB9XG4gICAgICAgICAgICBpZiAocGFyYW1zID09PSB2b2lkIDApIHsgcGFyYW1zID0gbnVsbDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRyYWNrcyBudW1iZXIgb2YgdGltZXMgYW4gZWxlbWVudCdzIHdpZHRoIGhhcyBiZWVuIGNoZWNrZWRcbiAgICAgICAgICAgICAqIGluIG9yZGVyIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBoYXMgYmVlbiBhZGRlZFxuICAgICAgICAgICAgICogdG8gdGhlIERPTS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY2hlY2tDb3VudFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jaGVja0NvdW50ID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBjYWNoZWQgcmVmZXJlbmNlIHRvIHRoZSBET00gRWxlbWVudFxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBlbGVtZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7SFRNTEVsZW1lbnR9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgY2FjaGVkIHJlZmVyZW5jZSB0byB0aGUgalF1ZXJ5IERPTSBlbGVtZW50XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5ICRlbGVtZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgYSBqUXVlcnkgb2JqZWN0IHdhcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgdGhpcyB3aWxsIGJlIHNldCBhcyB0cnVlIGFuZFxuICAgICAgICAgICAgICogdGhpcyBjbGFzcyB3aWxsIG5vdCB0cnkgdG8gYWRkIHRoZSB2aWV3IHRvIHRoZSBET00gc2luY2UgaXQgYWxyZWFkeSBleGlzdHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9pc1JlZmVyZW5jZVxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX2lzUmVmZXJlbmNlID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhvbGRzIG9udG8gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX3R5cGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX3R5cGUgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIb2xkcyBvbnRvIHRoZSB2YWx1ZSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9wYXJhbXNcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IG51bGw7XG4gICAgICAgICAgICBpZiAodHlwZSBpbnN0YW5jZW9mIGpxdWVyeV9ldmVudExpc3RlbmVyXzEuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSB0eXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuJGVsZW1lbnRbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5faXNSZWZlcmVuY2UgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNyZWF0ZSBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBwcm92aWRlIGEgY29uc2lzdGVudCBwbGFjZSBmb3IgdGhlIGNyZWF0aW9uIGFuZCBhZGRpbmdcbiAgICAgICAgICogb2YgY2hpbGRyZW4gdG8gdGhlIHZpZXcuIEl0IHdpbGwgYXV0b21hdGljYWxseSBiZSBjYWxsZWQgdGhlIGZpcnN0IHRpbWUgdGhhdCB0aGUgdmlldyBpcyBhZGRlZFxuICAgICAgICAgKiB0byBhbm90aGVyIERpc3BsYXlPYmplY3RDb250YWluZXIuIEl0IGlzIGNyaXRpY2FsIHRoYXQgYWxsIHN1YmNsYXNzZXMgY2FsbCB0aGUgc3VwZXIgZm9yIHRoaXMgZnVuY3Rpb24gaW5cbiAgICAgICAgICogdGhlaXIgb3ZlcnJpZGRlbiBtZXRob2RzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBnZXRzIGNhbGxlZCBvbmNlIHdoZW4gdGhlIGNoaWxkIHZpZXcgaXMgYWRkZWQgdG8gYW5vdGhlciB2aWV3LiBJZiB0aGUgY2hpbGQgdmlldyBpcyByZW1vdmVkXG4gICAgICAgICAqIGFuZCBhZGRlZCB0byBhbm90aGVyIHZpZXcgdGhlIGNyZWF0ZSBtZXRob2Qgd2lsbCBub3QgYmUgY2FsbGVkIGFnYWluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcGFyYW0gdHlwZSBbc3RyaW5nPWRpdl0gVGhlIEhUTUwgdGFnIHlvdSB3YW50IHRvIGNyZWF0ZSBvciB0aGUgaWQvY2xhc3Mgc2VsZWN0b3Igb2YgdGhlIHRlbXBsYXRlIG9yIHRoZSBwcmUtY29tcGlsZWQgcGF0aCB0byBhIHRlbXBsYXRlLlxuICAgICAgICAgKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgMTogQnkgZGVmYXVsdCB5b3VyIHZpZXcgY2xhc3Mgd2lsbCBiZSBhIGRpdiBlbGVtZW50OlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZSA9IG5ldyBET01FbGVtZW50KCk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fY2hpbGRJbnN0YW5jZSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBFWEFNUExFIDI6IEJ1dCBsZXRzIHNheSB5b3Ugd2FudGVkIHRoZSB2aWV3IHRvIGJlIGEgdWwgZWxlbWVudDpcbiAgICAgICAgICogICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgICogICAgICAgICAgc3VwZXIuY3JlYXRlKCd1bCcpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gVGhlbiB5b3UgY291bGQgbmVzdCBvdGhlciBlbGVtZW50cyBpbnNpZGUgdGhpcyBiYXNlIHZpZXcvZWxlbWVudC5cbiAgICAgICAgICogICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgICogICAgICAgICAgc3VwZXIuY3JlYXRlKCd1bCcsIHtpZDogJ215SWQnLCAnY2xhc3MnOiAnbXlDbGFzcyBhbm90aGVyQ2xhc3MnfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIGxldCBsaSA9IG5ldyBET01FbGVtZW50KCdsaScsIHt0ZXh0OiAnUm9iZXJ0IGlzIGNvb2wnfSk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobGkpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gRVhBTVBMRSAzOiBTbyB0aGF0J3MgY29vbCBidXQgd2hhdCBpZiB5b3Ugd2FudGVkIGEgYmxvY2sgb2YgaHRtbCB0byBiZSB5b3VyIHZpZXcuIExldCdzIHNheSB5b3UgaGFkIHRoZSBiZWxvd1xuICAgICAgICAgKiAgICAgLy8gaW5saW5lIEhhbmRsZWJhciB0ZW1wbGF0ZSBpbiB5b3VyIGh0bWwgZmlsZS5cbiAgICAgICAgICogICAgIDxzY3JpcHQgaWQ9XCJ0b2RvVGVtcGxhdGVcIiB0eXBlPVwidGV4dC90ZW1wbGF0ZVwiPlxuICAgICAgICAgKiAgICAgICAgICA8ZGl2IGlkPVwiaHRtbFRlbXBsYXRlXCIgY2xhc3M9XCJqcy10b2RvXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICA8ZGl2IGlkPVwiaW5wdXQtd3JhcHBlclwiPlxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGlzdC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwie3sgZGF0YS50ZXh0IH19XCI+XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImxpc3QtaXRlbS1zdWJtaXRcIiB2YWx1ZT1cIkFkZFwiPlxuICAgICAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAqICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgKiAgICAgPC9zY3JpcHQ+XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBZb3Ugd291bGQganVzdCBwYXNzIGluIHRoZSBpZCBvciBjbGFzcyBzZWxlY3RvciBvZiB0aGUgdGVtcGxhdGUgd2hpY2ggaW4gdGhpcyBjYXNlIGlzIFwiI3RvZG9UZW1wbGF0ZVwiLlxuICAgICAgICAgKiAgICAgLy8gVGhlcmUgaXMgYSBzZWNvbmQgb3B0aW9uYWwgYXJndW1lbnQgd2hlcmUgeW91IGNhbiBwYXNzIGRhdGEgZm9yIHRoZSBIYW5kbGViYXIgdGVtcGxhdGUgdG8gdXNlLlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJyN0b2RvVGVtcGxhdGUnLCB7IGRhdGE6IHRoaXMudmlld0RhdGEgfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBFWEFNUExFIDQ6IE9yIG1heWJlIHlvdSdyZSB1c2luZyBncnVudC1jb250cmliLWhhbmRsZWJhcnMsIG9yIHNpbWlsYXIsIHRvIHByZWNvbXBpbGUgaGJzIHRlbXBsYXRlc1xuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3RlbXBsYXRlcy9Ib21lVGVtcGxhdGUnLCB7ZGF0YTogXCJzb21lIGRhdGFcIn0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHR5cGUsIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkgeyB0eXBlID0gJ2Rpdic7IH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkgeyBwYXJhbXMgPSBudWxsOyB9XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGRhdGEgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIGZpcnN0IGVsc2UgdXNlIHRoZSBhcmd1bWVudHMgZnJvbSBjcmVhdGUuXG4gICAgICAgICAgICB0eXBlID0gdGhpcy5fdHlwZSB8fCB0eXBlO1xuICAgICAgICAgICAgcGFyYW1zID0gdGhpcy5fcGFyYW1zIHx8IHBhcmFtcztcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQ3JlYXRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gWW91IGNhbm5vdCBjYWxsIHRoZSBjcmVhdGUgbWV0aG9kIG1hbnVhbGx5LiBJdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGF1dG9tYXRpY2FsbHkgZHVyaW5nIHRoZSB2aWV3IGxpZmVjeWNsZSBhbmQgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGh0bWxfMSA9IFRlbXBsYXRlRmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlKHR5cGUsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaWYgKGh0bWxfMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0ganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KGh0bWxfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50ID0ganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KFwiPFwiICsgdHlwZSArIFwiLz5cIiwgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLiRlbGVtZW50WzBdO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuJGVsZW1lbnQud2lkdGgoKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy4kZWxlbWVudC5oZWlnaHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBvdmVycmlkZGVuIERpc3BsYXlPYmplY3RDb250YWluZXIuYWRkQ2hpbGRcbiAgICAgICAgICogQG1ldGhvZCBhZGRDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0RPTUVsZW1lbnR9IFRoZSBET01FbGVtZW50IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXMgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgdGhpcy5hZGRDaGlsZChkb21FbGVtZW50SW5zdGFuY2UpO1xuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1snICsgdGhpcy5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSArICddIFlvdSBjYW5ub3QgdXNlIHRoZSBhZGRDaGlsZCBtZXRob2QgaWYgdGhlIHBhcmVudCBvYmplY3QgaXMgbm90IGFkZGVkIHRvIHRoZSBET00uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmFkZENoaWxkLmNhbGwodGhpcywgY2hpbGQpO1xuICAgICAgICAgICAgLy8gSWYgYW4gZW1wdHkgalF1ZXJ5IG9iamVjdCBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgdGhlbiBkb24ndCBydW4gdGhlIGNvZGUgYmVsb3cuXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoaWxkLmlzQ3JlYXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5jcmVhdGUoKTsgLy8gUmVuZGVyIHRoZSBpdGVtIGJlZm9yZSBhZGRpbmcgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgIGNoaWxkLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgY2hpbGQgb2JqZWN0IGlzIG5vdCBhIHJlZmVyZW5jZSBvZiBhIGpRdWVyeSBvYmplY3QgaW4gdGhlIERPTSB0aGVuIGFwcGVuZCBpdC5cbiAgICAgICAgICAgIGlmIChjaGlsZC5faXNSZWZlcmVuY2UgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5hcHBlbmQoY2hpbGQuJGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyB0aGUgc2pzSWQgdG8gdGhlIERPTSBlbGVtZW50IHNvIHdlIGNhbiBrbm93IHdoYXQgd2hhdCBDbGFzcyBvYmplY3QgdGhlIEhUTUxFbGVtZW50IGJlbG9uZ3MgdG9vLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9hZGRDbGllbnRTaWRlSWRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRE9NRWxlbWVudCBpbnN0YW5jZSB0byBhZGQgdGhlIHNqc0lkIHRvby5cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuX2FkZENsaWVudFNpZGVJZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJyk7XG4gICAgICAgICAgICB2YXIgaWQgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcpO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIC8vIE1ha2UgdGhlbSBhcnJheSdzIHNvIHRoZSBqb2luIG1ldGhvZCB3aWxsIHdvcmsuXG4gICAgICAgICAgICAgICAgdHlwZSA9IFtjaGlsZC5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKV07XG4gICAgICAgICAgICAgICAgaWQgPSBbY2hpbGQuc2pzSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdGhlbSBzbyB3ZSBjYW4gcHVzaC9hZGQgdGhlIG5ldyB2YWx1ZXMuXG4gICAgICAgICAgICAgICAgdHlwZSA9IHR5cGUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICBpZCA9IGlkLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgdHlwZS5wdXNoKGNoaWxkLmdldFF1YWxpZmllZENsYXNzTmFtZSgpKTtcbiAgICAgICAgICAgICAgICBpZC5wdXNoKGNoaWxkLnNqc0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZWQgbGlzdCBvZiBpZCdzIGFuZCB0eXBlc1xuICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtaWQnLCBpZC5qb2luKCcsJykpO1xuICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScsIHR5cGUuam9pbignLCcpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIHNqc0lkIGFuZCBjbGFzcyB0eXBlIGZyb20gdGhlIEhUTUxFbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9yZW1vdmVDbGllbnRTaWRlSWRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRE9NRWxlbWVudCBpbnN0YW5jZSB0byBhZGQgdGhlIHNqc0lkIHRvby5cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuX3JlbW92ZUNsaWVudFNpZGVJZCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJyk7XG4gICAgICAgICAgICB2YXIgaWQgPSBjaGlsZC4kZWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcpO1xuICAgICAgICAgICAgLy8gU3BsaXQgdGhlbSBzbyB3ZSBjYW4gcmVtb3ZlIHRoZSBjaGlsZCBzanNJZCBhbmQgdHlwZS5cbiAgICAgICAgICAgIHZhciB0eXBlTGlzdCA9IHR5cGUuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIHZhciBpZExpc3QgPSBpZC5zcGxpdCgnLCcpLm1hcChOdW1iZXIpOyAvLyBDb252ZXJ0IGVhY2ggaXRlbSBpbnRvIGEgbnVtYmVyLlxuICAgICAgICAgICAgdmFyIGluZGV4ID0gaWRMaXN0LmluZGV4T2YoY2hpbGQuc2pzSWQpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGlkIGFuZCB0eXBlIGZyb20gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgIHR5cGVMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgaWRMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlZCBsaXN0IG9mIGlkJ3MgYW5kIHR5cGVzXG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScsIHR5cGVMaXN0LmpvaW4oJywnKSk7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtaWQnLCBpZExpc3Quam9pbignLCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpZExpc3QubGVuZ3RoID09PSAwO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdGhlIGNoaWxkIG9iamVjdCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgICAgICAgKiBUaGUgbWV0aG9kIHdpbGwgY2FsbCB7eyNjcm9zc0xpbmsgXCJET01FbGVtZW50L2xheW91dDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gYW5kIGRpc3BhdGNoIHRoZSBCYXNlRXZlbnQuQURERURfVE9fU1RBR0UgZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX29uQWRkZWRUb0RvbVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5fb25BZGRlZFRvRG9tID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgY2hpbGQuY2hlY2tDb3VudCsrO1xuICAgICAgICAgICAgaWYgKGNoaWxkLiRlbGVtZW50LndpZHRoKCkgPT09IDAgJiYgY2hpbGQuY2hlY2tDb3VudCA8IDUpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuX29uQWRkZWRUb0RvbShjaGlsZCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQud2lkdGggPSBjaGlsZC4kZWxlbWVudC53aWR0aCgpO1xuICAgICAgICAgICAgY2hpbGQuaGVpZ2h0ID0gY2hpbGQuJGVsZW1lbnQuaGVpZ2h0KCk7XG4gICAgICAgICAgICBjaGlsZC5zZXRTaXplKGNoaWxkLndpZHRoLCBjaGlsZC5oZWlnaHQpO1xuICAgICAgICAgICAgY2hpbGQuZW5hYmxlKCk7XG4gICAgICAgICAgICBjaGlsZC5sYXlvdXQoKTtcbiAgICAgICAgICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudF8xLmRlZmF1bHQoQmFzZUV2ZW50XzEuZGVmYXVsdC5BRERFRF9UT19TVEFHRSkpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5hZGRDaGlsZEF0XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5hZGRDaGlsZEF0ID0gZnVuY3Rpb24gKGNoaWxkLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbigpO1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIC8vIElmIGFuIGVtcHR5IGpRdWVyeSBvYmplY3QgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIHRoZW4gZG9uJ3QgcnVuIHRoZSBjb2RlIGJlbG93LlxuICAgICAgICAgICAgaWYgKGNoaWxkLl9pc1JlZmVyZW5jZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGluZGV4IHBhc3NlZCBpbiBpcyBsZXNzIHRoYW4gMCBhbmQgZ3JlYXRlciB0aGFuIHRoZSB0b3RhbCBudW1iZXIgb2YgY2hpbGRyZW4gdGhlbiBwbGFjZSB0aGUgaXRlbSBhdCB0aGUgZW5kLlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRWxzZSBnZXQgdGhlIGNoaWxkIGluIHRoZSBjaGlsZHJlbiBhcnJheSBieSB0aGUgaW5kZXggcGFzc2VkIGluIGFuZCBwbGFjZSB0aGUgaXRlbSBiZWZvcmUgdGhhdCBjaGlsZC5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNDcmVhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5jcmVhdGUoKTsgLy8gUmVuZGVyIHRoZSBpdGVtIGJlZm9yZSBhZGRpbmcgdG8gdGhlIERPTVxuICAgICAgICAgICAgICAgICAgICBjaGlsZC5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBZGRzIHRoZSBjaGlsZCBhdCBhIHNwZWNpZmljIGluZGV4IGJ1dCBhbHNvIHdpbGwgcmVtb3ZlIHRoZSBjaGlsZCBmcm9tIGFub3RoZXIgcGFyZW50IG9iamVjdCBpZiBvbmUgZXhpc3RzLlxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgLy8gQWRkcyB0aGUgY2hpbGQgYmVmb3JlIGFueSBjaGlsZCBhbHJlYWR5IGFkZGVkIGluIHRoZSBET00uXG4gICAgICAgICAgICAgICAganF1ZXJ5X2V2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KGNoaWxkcmVuLmdldChpbmRleCkpLmJlZm9yZShjaGlsZC4kZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25BZGRlZFRvRG9tKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5zd2FwQ2hpbGRyZW5cbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLnN3YXBDaGlsZHJlbiA9IGZ1bmN0aW9uIChjaGlsZDEsIGNoaWxkMikge1xuICAgICAgICAgICAgdmFyIGNoaWxkMUluZGV4ID0gY2hpbGQxLiRlbGVtZW50LmluZGV4KCk7XG4gICAgICAgICAgICB2YXIgY2hpbGQySW5kZXggPSBjaGlsZDIuJGVsZW1lbnQuaW5kZXgoKTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDEsIGNoaWxkMkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGRBdChjaGlsZDIsIGNoaWxkMUluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5nZXRDaGlsZEF0XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gX3N1cGVyLnByb3RvdHlwZS5nZXRDaGlsZEF0LmNhbGwodGhpcywgaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhIERPTUVsZW1lbnQgb2JqZWN0IHdpdGggdGhlIGZpcnN0IGZvdW5kIERPTSBlbGVtZW50IGJ5IHRoZSBwYXNzZWQgaW4gc2VsZWN0b3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRcbiAgICAgICAgICogQHBhcmFtIHNlbGVjdG9yIHtzdHJpbmd9IERPTSBpZCBuYW1lLCBET00gY2xhc3MgbmFtZSBvciBhIERPTSB0YWcgbmFtZS5cbiAgICAgICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGZpcnN0IG1hdGNoIGZyb20gdGhlIHNlbGVjdG9yIHBhc3NlZCBpbi5cbiAgICAgICAgICAgIHZhciBqUXVlcnlFbGVtZW50ID0gdGhpcy4kZWxlbWVudC5maW5kKHNlbGVjdG9yKS5maXJzdCgpO1xuICAgICAgICAgICAgaWYgKGpRdWVyeUVsZW1lbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gZ2V0Q2hpbGQoJyArIHNlbGVjdG9yICsgJykgQ2Fubm90IGZpbmQgRE9NICRlbGVtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGVsZW1lbnQgaGFzIGEgc2pzSWQgdmFsdWUgYW5kIGlzIGEgY2hpbGQgb2YgdGhpcyBwYXJlbnQgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIHNqc0lkID0gcGFyc2VJbnQoalF1ZXJ5RWxlbWVudC5hdHRyKCdkYXRhLXNqcy1pZCcpKTtcbiAgICAgICAgICAgIHZhciBkb21FbGVtZW50ID0gdGhpcy5nZXRDaGlsZEJ5Q2lkKHNqc0lkKTtcbiAgICAgICAgICAgIC8vIENyZWF0ZXMgYSBET01FbGVtZW50IGZyb20gdGhlIGpRdWVyeUVsZW1lbnQuXG4gICAgICAgICAgICBpZiAoZG9tRWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IERPTUVsZW1lbnQgYW5kIGFzc2lnbiB0aGUgalF1ZXJ5IGVsZW1lbnQgdG8gaXQuXG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudCA9IG5ldyBET01FbGVtZW50KCk7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC4kZWxlbWVudCA9IGpRdWVyeUVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQ2xpZW50U2lkZUlkKGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuZWxlbWVudCA9IGpRdWVyeUVsZW1lbnRbMF07XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIEFkZGVkIHRvIHRoZSBzdXBlciBhZGRDaGlsZCBtZXRob2QgYmVjYXVzZSB3ZSBkb24ndCBuZWVkIHRvIGFwcGVuZCB0aGUgZWxlbWVudCB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuYWRkQ2hpbGQuY2FsbCh0aGlzLCBkb21FbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkb21FbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyBhbGwgdGhlIEhUTUwgZWxlbWVudHMgY2hpbGRyZW4gb2YgdGhpcyBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRyZW5cbiAgICAgICAgICogQHBhcmFtIFtzZWxlY3Rvcl0ge3N0cmluZ30gWW91IGNhbiBwYXNzIGluIGFueSB0eXBlIG9mIGpRdWVyeSBzZWxlY3Rvci4gSWYgdGhlcmUgaXMgbm8gc2VsZWN0b3IgcGFzc2VkIGluIGl0IHdpbGwgZ2V0IGFsbCB0aGUgY2hpbGRyZW4gb2YgdGhpcyBwYXJlbnQgZWxlbWVudC5cbiAgICAgICAgICogQHJldHVybnMge0FycmF5LjxET01FbGVtZW50Pn0gUmV0dXJucyBhIGxpc3Qgb2YgRE9NRWxlbWVudCdzLiBJdCB3aWxsIGdyYWIgYWxsIGNoaWxkcmVuIEhUTUwgRE9NIGVsZW1lbnRzIG9mIHRoaXMgb2JqZWN0IGFuZCB3aWxsIGNyZWF0ZSBhIERPTUVsZW1lbnQgZm9yIGVhY2ggRE9NIGNoaWxkLlxuICAgICAgICAgKiBJZiB0aGUgJ2RhdGEtc2pzLWlkJyBwcm9wZXJ0eSBleGlzdHMgaXMgb24gYW4gSFRNTCBlbGVtZW50IGEgRE9NRWxlbWVudCB3aWxsIG5vdCBiZSBjcmVhdGVkIGZvciB0aGF0IGVsZW1lbnQgYmVjYXVzZSBpdCB3aWxsIGJlIGFzc3VtZWQgaXQgYWxyZWFkeSBleGlzdHMgYXMgYSBET01FbGVtZW50LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yID09PSB2b2lkIDApIHsgc2VsZWN0b3IgPSAnJzsgfVxuICAgICAgICAgICAgLy9UT0RPOiBNYWtlIHN1cmUgdGhlIGluZGV4IG9mIHRoZSBjaGlsZHJlbiBhZGRlZCBpcyB0aGUgc2FtZSBhcyB0aGUgd2hhdCBpcyBpbiB0aGUgYWN0dWFsIERPTS5cbiAgICAgICAgICAgIHZhciAkY2hpbGQ7XG4gICAgICAgICAgICB2YXIgZG9tRWxlbWVudDtcbiAgICAgICAgICAgIHZhciAkbGlzdCA9IHRoaXMuJGVsZW1lbnQuY2hpbGRyZW4oc2VsZWN0b3IpO1xuICAgICAgICAgICAgdmFyIGxpc3RMZW5ndGggPSAkbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCBsaXN0TGVuZ3RoOyBpXzErKykge1xuICAgICAgICAgICAgICAgICRjaGlsZCA9ICRsaXN0LmVxKGlfMSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGpRdWVyeSBlbGVtZW50IGFscmVhZHkgaGFzIHNqc0lkIGRhdGEgcHJvcGVydHkgdGhlbiBpdCBtdXN0IGJlIGFuIGV4aXN0aW5nIERpc3BsYXlPYmplY3RDb250YWluZXIgKERPTUVsZW1lbnQpIGluIHRoZSBjaGlsZHJlbiBhcnJheS5cbiAgICAgICAgICAgICAgICBpZiAoJGNoaWxkLmF0dHIoJ2RhdGEtc2pzLWlkJykgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZG9tRWxlbWVudC4kZWxlbWVudCA9ICRjaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkQ2xpZW50U2lkZUlkKGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50LmVsZW1lbnQgPSAkY2hpbGQuZ2V0KDApO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50LmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZGVkIHRvIHRoZSBzdXBlciBhZGRDaGlsZCBtZXRob2QgYmVjYXVzZSB3ZSBkb24ndCBuZWVkIHRvIGFwcGVuZCB0aGUgZWxlbWVudCB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICAgICAgICAvLyBBdCB0aGlzIHBvaW50IGl0IGFscmVhZHkgZXhpc3RzIGFuZCB3ZSBhcmUganVzdCBnZXR0aW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBET00gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGRDaGlsZC5jYWxsKHRoaXMsIGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGNoaWxkIG9iamVjdCBpbnN0YW5jZSBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0byBudWxsIGFuZCB0aGUgb2JqZWN0IGlzIGdhcmJhZ2UgY29sbGVjdGVkIGlmIHRoZXJlIGFyZSBubyBvdGhlciByZWZlcmVuY2VzXG4gICAgICAgICAqIHRvIHRoZSBjaGlsZC4gVGhlIGluZGV4IHBvc2l0aW9ucyBvZiBhbnkgb2JqZWN0cyBhYm92ZSB0aGUgY2hpbGQgaW4gdGhlIHBhcmVudCBvYmplY3QgYXJlIGRlY3JlYXNlZCBieSAxLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERpc3BsYXlPYmplY3RDb250YWluZXIgaW5zdGFuY2UgdG8gcmVtb3ZlLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQG92ZXJyaWRlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGQsIGRlc3Ryb3kpIHtcbiAgICAgICAgICAgIGlmIChkZXN0cm95ID09PSB2b2lkIDApIHsgZGVzdHJveSA9IHRydWU7IH1cbiAgICAgICAgICAgIHZhciByZW1vdmUgPSB0aGlzLl9yZW1vdmVDbGllbnRTaWRlSWQoY2hpbGQpO1xuICAgICAgICAgICAgY2hpbGQuZGlzYWJsZSgpO1xuICAgICAgICAgICAgLy8gQ2hlY2tzIGlmIGRlc3Ryb3kgd2FzIGNhbGxlZCBiZWZvcmUgcmVtb3ZlQ2hpbGQgc28gaXQgZG9lc24ndCBlcnJvci5cbiAgICAgICAgICAgIGlmIChyZW1vdmUgPT09IHRydWUgJiYgY2hpbGQuJGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LnVuYmluZCgpO1xuICAgICAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkLmNhbGwodGhpcywgY2hpbGQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBpbnN0YW5jZSB0aGF0IGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkQXRcbiAgICAgICAgICogQHBhcmFtIGluZGV4IHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgb2JqZWN0LlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgsIGRlc3Ryb3kpIHtcbiAgICAgICAgICAgIGlmIChkZXN0cm95ID09PSB2b2lkIDApIHsgZGVzdHJveSA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5nZXRDaGlsZEF0KGluZGV4KSwgZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYWxsIGNoaWxkIG9iamVjdCBpbnN0YW5jZXMgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgcGFyZW50IG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZHJlbiBpcyBzZXQgdG8gbnVsbCBhbmQgdGhlIG9iamVjdHMgYXJlIGdhcmJhZ2UgY29sbGVjdGVkIGlmIG5vIG90aGVyXG4gICAgICAgICAqIHJlZmVyZW5jZXMgdG8gdGhlIGNoaWxkcmVuIGV4aXN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkcmVuXG4gICAgICAgICAqIEByZXR1cm5zIHtET01FbGVtZW50fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQG92ZXJyaWRlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jaGlsZHJlbi5wb3AoKSwgZGVzdHJveSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmVtcHR5KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBvdmVycmlkZGVuIERpc3BsYXlPYmplY3RDb250YWluZXIuZGVzdHJveVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHdlIGNhbid0IGp1c3QgY2FsbCBkZXN0cm95IHRvIHJlbW92ZSB0aGUgSFRNTEVsZW1lbnQgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlciB2aWV3cyBtYW5hZ2luZyB0aGUgc2FtZSBIVE1MRWxlbWVudC5cbiAgICAgICAgICAgIC8qaWYgKHRoaXMuJGVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnVuYmluZCgpO1xuICAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHdheSB0byBpbnN0YW50aWF0ZSB2aWV3IGNsYXNzZXMgYnkgZm91bmQgaHRtbCBzZWxlY3RvcnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEV4YW1wbGU6IEl0IHdpbGwgZmluZCBhbGwgY2hpbGRyZW4gZWxlbWVudHMgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnQvJGVsZW1lbnQ6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gcHJvcGVydHkgd2l0aCB0aGUgJ2pzLXNoYXJlRW1haWwnIHNlbGVjdG9yLlxuICAgICAgICAgKiBJZiBhbnkgc2VsZWN0b3JzIGFyZSBmb3VuZCB0aGUgRW1haWxTaGFyZUNvbXBvbmVudCBjbGFzcyB3aWxsIGJlIGluc3RhbnRpYXRlZCBhbmQgcGFzcyB0aGUgZm91bmQgalF1ZXJ5IGVsZW1lbnQgaW50byB0aGUgY29udHJ1Y3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVDb21wb25lbnRzXG4gICAgICAgICAqIEBwYXJhbSBjb21wb25lbnRMaXN0IChBcnJheS48eyBzZWxlY3Rvcjogc3RyaW5nOyBjb21wb25lbnQ6IERPTUVsZW1lbnQgfT5cbiAgICAgICAgICogQHJldHVybiB7QXJyYXkuPERPTUVsZW1lbnQ+fSBSZXR1cm5zIGFsbCB0aGUgaXRlbXMgY3JlYXRlZCBmcm9tIHRoaXMgY3JlYXRlQ29tcG9uZW50cyBtZXRob2QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgICogICAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIHRoaXMuY3JlYXRlQ29tcG9uZW50cyhbXG4gICAgICAgICAqICAgICAgICAgICAgICB7c2VsZWN0b3I6ICcuanMtc2hhcmVFbWFpbCcsIGNvbXBvbmVudDogRW1haWxTaGFyZUNvbXBvbmVudH0sXG4gICAgICAgICAqICAgICAgICAgICAgICB7c2VsZWN0b3I6ICcuanMtcGFnaW5hdGlvbicsIGNvbXBvbmVudDogUGFnaW5hdGlvbkNvbXBvbmVudH0sXG4gICAgICAgICAqICAgICAgICAgICAgICB7c2VsZWN0b3I6ICcuanMtY2Fyb3VzZWwnLCBjb21wb25lbnQ6IENhcm91c2VsQ29tcG9uZW50fVxuICAgICAgICAgKiAgICAgICAgICBdKTtcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5jcmVhdGVDb21wb25lbnRzID0gZnVuY3Rpb24gKGNvbXBvbmVudExpc3QpIHtcbiAgICAgICAgICAgIHZhciBsaXN0O1xuICAgICAgICAgICAgdmFyIGNyZWF0ZWRDaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGNvbXBvbmVudExpc3QubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIG9iajtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMiA9IDA7IGlfMiA8IGxlbmd0aDsgaV8yKyspIHtcbiAgICAgICAgICAgICAgICBvYmogPSBjb21wb25lbnRMaXN0W2lfMl07XG4gICAgICAgICAgICAgICAgbGlzdCA9IENvbXBvbmVudEZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZSh0aGlzLiRlbGVtZW50LmZpbmQob2JqLnNlbGVjdG9yKSwgb2JqLmNvbXBvbmVudCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgY3JlYXRlZENoaWxkcmVuID0gY3JlYXRlZENoaWxkcmVuLmNvbmNhdChsaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVkQ2hpbGRyZW47XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBET01FbGVtZW50O1xuICAgIH0pKERpc3BsYXlPYmplY3RDb250YWluZXJfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gRE9NRWxlbWVudDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEV2ZW50RGlzcGF0Y2hlcl8xID0gcmVxdWlyZSgnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIHBsYWNlZCBvbiB0aGUgZGlzcGxheSBsaXN0LlxuICAgICAqXG4gICAgICogQGNsYXNzIERpc3BsYXlPYmplY3RcbiAgICAgKiBAZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB2aWV3XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBFdmVudERpc3BhdGNoZXJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKi9cbiAgICB2YXIgRGlzcGxheU9iamVjdCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhEaXNwbGF5T2JqZWN0LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBEaXNwbGF5T2JqZWN0KCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBTdGFnZSBvZiB0aGUgZGlzcGxheSBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHN0YWdlXG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWdlID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBpbnRlcmZhY2UgcHJvdmlkZXMgdGhlIDJEIHJlbmRlcmluZyBjb250ZXh0IGZvciB0aGUgZHJhd2luZyBzdXJmYWNlIG9mIGEgY2FudmFzIGVsZW1lbnQuXG4gICAgICAgICAgICAgKiBUaGlzIHByb3BlcnR5IGlzIG9ubHkgdXNlZCB3aXRoIHRoZSBjYW52YXMgc3BlY2lmaWMgZGlzcGxheSBvYmplY3RzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjdHhcbiAgICAgICAgICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY3R4ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBwcm9wZXJ0eSBwcm92aWRpbmcgYWNjZXNzIHRvIHRoZSB4IHBvc2l0aW9uLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB4XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHkgcG9zaXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHlcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgd2lkdGggb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHdpZHRoXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLndpZHRoID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBoZWlnaHQgb2YgdGhlIGRpc3BsYXkgb2JqZWN0LCBpbiBwaXhlbHMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGhlaWdodFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHVuc2NhbGVkV2lkdGguXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHVuc2NhbGVkV2lkdGhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAxMDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy51bnNjYWxlZFdpZHRoID0gMTAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHByb3BlcnR5IHByb3ZpZGluZyBhY2Nlc3MgdG8gdGhlIHVuc2NhbGVkSGVpZ2h0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB1bnNjYWxlZEhlaWdodFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDEwMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkSGVpZ2h0ID0gMTAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGhvcml6b250YWwgc2NhbGUgKHBlcmNlbnRhZ2UpIG9mIHRoZSBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZSByZWdpc3RyYXRpb24gcG9pbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHNjYWxlWFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zY2FsZVggPSAxO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIHZlcnRpY2FsIHNjYWxlIChwZXJjZW50YWdlKSBvZiBhbiBvYmplY3QgYXMgYXBwbGllZCBmcm9tIHRoZSByZWdpc3RyYXRpb24gcG9pbnQgb2YgdGhlIG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVZXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnNjYWxlWSA9IDE7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgcm90YXRpb24gb2YgdGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UsIGluIGRlZ3JlZXMsIGZyb20gaXRzIG9yaWdpbmFsIG9yaWVudGF0aW9uLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSByb3RhdGlvblxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yb3RhdGlvbiA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgYWxwaGEgdHJhbnNwYXJlbmN5IHZhbHVlIG9mIHRoZSBvYmplY3Qgc3BlY2lmaWVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBhbHBoYVxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdoZXRoZXIgb3Igbm90IHRoZSBkaXNwbGF5IG9iamVjdCBpcyB2aXNpYmxlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB2aXNpYmxlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU3BlY2lmaWVzIHdoZXRoZXIgdGhpcyBvYmplY3QgcmVjZWl2ZXMgbW91c2VcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbW91c2VFbmFibGVkXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5tb3VzZUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBCb29sZWFuIHZhbHVlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBvaW50aW5nIGhhbmQgKGhhbmQgY3Vyc29yKSBhcHBlYXJzIHdoZW4gdGhlIHBvaW50ZXIgcm9sbHMgb3ZlciBhIGRpc3BsYXkgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB1c2VIYW5kQ3Vyc29yXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy51c2VIYW5kQ3Vyc29yID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBpc0NyZWF0ZWQgcHJvcGVydHkgaXMgdXNlZCB0byBrZWVwIHRyYWNrIGlmIGl0IGlzIHRoZSBmaXJzdCB0aW1lIHRoaXMgRGlzcGxheU9iamVjdCBpcyBjcmVhdGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0NyZWF0ZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBpbnN0YW5jZSBuYW1lIG9mIHRoZSBEaXNwbGF5T2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBuYW1lXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3JlYXRlIGZ1bmN0aW9uIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSBjb25zaXN0ZW50IHBsYWNlIGZvciB0aGUgY3JlYXRpb24gb3IgaW5pdGlhbGl6aW5nIHRoZSB2aWV3LlxuICAgICAgICAgKiBJdCB3aWxsIGF1dG9tYXRpY2FsbHkgYmUgY2FsbGVkIHRoZSBmaXJzdCB0aW1lIHRoYXQgdGhlIHZpZXcgaXMgYWRkZWQgdG8gYSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLlxuICAgICAgICAgKiBJdCBpcyBjcml0aWNhbCB0aGF0IGFsbCBzdWJjbGFzc2VzIGNhbGwgdGhlIHN1cGVyIGZvciB0aGlzIGZ1bmN0aW9uIGluIHRoZWlyIG92ZXJyaWRkZW4gbWV0aG9kcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxheW91dCBtZXRob2QgcHJvdmlkZXMgYSBjb21tb24gZnVuY3Rpb24gdG8gaGFuZGxlIHVwZGF0aW5nIG9iamVjdHMgaW4gdGhlIHZpZXcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgbGF5b3V0XG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5sYXlvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzZXRTaXplIG1ldGhvZCBzZXRzIHRoZSBib3VuZHMgd2l0aGluIHdoaWNoIHRoZSBjb250YWluaW5nIERpc3BsYXlPYmplY3Qgd291bGQgbGlrZSB0aGF0IGNvbXBvbmVudCB0byBsYXkgaXRzZWxmIG91dC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHVuc2NhbGVkV2lkdGgge251bWJlcn0gVGhlIHdpZHRoIHdpdGhpbiB3aGljaCB0aGUgY29tcG9uZW50IHNob3VsZCBsYXkgaXRzZWxmIG91dC5cbiAgICAgICAgICogQHBhcmFtIHVuc2NhbGVkSGVpZ2h0IHtudW1iZXJ9IFRoZSBoZWlnaHQgd2l0aGluIHdoaWNoIHRoZSBjb21wb25lbnQgc2hvdWxkIGxheSBpdHNlbGYgb3V0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uICh1bnNjYWxlZFdpZHRoLCB1bnNjYWxlZEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy51bnNjYWxlZFdpZHRoID0gdW5zY2FsZWRXaWR0aDtcbiAgICAgICAgICAgIHRoaXMudW5zY2FsZWRIZWlnaHQgPSB1bnNjYWxlZEhlaWdodDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fcmVhZGVyU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5zYXZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLnJlbmRlckNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN0eCA9PT0gbnVsbCB8fCB0aGlzLmFscGhhIDw9IDAgfHwgdGhpcy52aXNpYmxlID09PSBmYWxzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9yZWFkZXJTdGFydCgpO1xuICAgICAgICAgICAgdGhpcy5jdHguZ2xvYmFsQWxwaGEgPSB0aGlzLmFscGhhO1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckVuZCgpO1xuICAgICAgICB9O1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5fcmVuZGVyRW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHgucmVzdG9yZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRGlzcGxheU9iamVjdDtcbiAgICB9KShFdmVudERpc3BhdGNoZXJfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gRGlzcGxheU9iamVjdDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EaXNwbGF5T2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERpc3BsYXlPYmplY3RfMSA9IHJlcXVpcmUoJy4vRGlzcGxheU9iamVjdCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZSBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyXG4gICAgICogQGV4dGVuZHMgRGlzcGxheU9iamVjdFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIERpc3BsYXlPYmplY3RcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKi9cbiAgICB2YXIgRGlzcGxheU9iamVjdENvbnRhaW5lciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhEaXNwbGF5T2JqZWN0Q29udGFpbmVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyKCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbnVtQ2hpbGRyZW5cbiAgICAgICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlcyB0byB0aGlzIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGNoaWxkcmVuXG4gICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPERpc3BsYXlPYmplY3Q+fVxuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY2hpbGRyZW4gb2YgdGhlIG9iamVjdCBhcmUgbW91c2UgZW5hYmxlZC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbW91c2VDaGlsZHJlblxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubW91c2VDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byB0aGlzIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuIFRoZSBjaGlsZCBpcyBhZGRlZCB0byB0aGUgZnJvbnQgKHRvcCkgb2YgYWxsIG90aGVyXG4gICAgICAgICAqIGNoaWxkcmVuIGluIHRoaXMgcGFyZW50IG9iamVjdCBpbnN0YW5jZS4gKFRvIGFkZCBhIGNoaWxkIHRvIGEgc3BlY2lmaWMgaW5kZXggcG9zaXRpb24sIHVzZSB0aGUgYWRkQ2hpbGRBdCgpIG1ldGhvZC4pXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHlvdSBhZGQgYSBjaGlsZCBvYmplY3QgdGhhdCBhbHJlYWR5IGhhcyBhIGRpZmZlcmVudCBwYXJlbnQsIHRoZSBvYmplY3QgaXMgcmVtb3ZlZCBmcm9tIHRoZSBjaGlsZFxuICAgICAgICAgKiBsaXN0IG9mIHRoZSBvdGhlciBwYXJlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZENoaWxkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyIGluc3RhbmNlLlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIC8vSWYgdGhlIGNoaWxkIGJlaW5nIHBhc3NlZCBpbiBhbHJlYWR5IGhhcyBhIHBhcmVudCB0aGVuIHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlcmUuXG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byB0aGlzIERpc3BsYXlPYmplY3RDb250YWluZXJDb250YWluZXIgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBjaGlsZCBpcyBhZGRlZCBhdCB0aGUgaW5kZXggcG9zaXRpb24gc3BlY2lmaWVkLiBBbiBpbmRleCBvZiAwIHJlcHJlc2VudHMgdGhlIGJhY2tcbiAgICAgICAgICogKGJvdHRvbSkgb2YgdGhlIGRpc3BsYXkgbGlzdCBmb3IgdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyQ29udGFpbmVyIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhZGRDaGlsZEF0XG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gYWRkIGFzIGEgY2hpbGQgb2YgdGhpcyBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIEBwYXJhbSBpbmRleCB7aW50fSBUaGUgaW5kZXggcG9zaXRpb24gdG8gd2hpY2ggdGhlIGNoaWxkIGlzIGFkZGVkLiBJZiB5b3Ugc3BlY2lmeSBhIGN1cnJlbnRseSBvY2N1cGllZCBpbmRleCBwb3NpdGlvbiwgdGhlIGNoaWxkIG9iamVjdCB0aGF0IGV4aXN0cyBhdCB0aGF0IHBvc2l0aW9uIGFuZCBhbGwgaGlnaGVyIHBvc2l0aW9ucyBhcmUgbW92ZWQgdXAgb25lIHBvc2l0aW9uIGluIHRoZSBjaGlsZCBsaXN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuYWRkQ2hpbGRBdCA9IGZ1bmN0aW9uIChjaGlsZCwgaW5kZXgpIHtcbiAgICAgICAgICAgIC8vSWYgdGhlIGNoaWxkIGJlaW5nIHBhc3NlZCBpbiBhbHJlYWR5IGhhcyBhIHBhcmVudCB0aGVuIHJlbW92ZSB0aGUgcmVmZXJlbmNlIGZyb20gdGhlcmUuXG4gICAgICAgICAgICBpZiAoY2hpbGQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBjaGlsZCk7XG4gICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY2hpbGQgb2JqZWN0IGluc3RhbmNlIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIG51bGwgLCBhbmQgdGhlIG9iamVjdCBpcyBnYXJiYWdlIGNvbGxlY3RlZCBpZiBubyBvdGhlciByZWZlcmVuY2VzXG4gICAgICAgICAqIHRvIHRoZSBjaGlsZCBleGlzdC4gVGhlIGluZGV4IHBvc2l0aW9ucyBvZiBhbnkgb2JqZWN0cyBhYm92ZSB0aGUgY2hpbGQgaW4gdGhlIHBhcmVudCBvYmplY3QgYXJlIGRlY3JlYXNlZCBieSAxLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gcmVtb3ZlLlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlcyB0aGUgY2hpbGQgb2JqZWN0IGZyb20gdGhlIHBhcmVudC5cbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlcyBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBEaXNwbGF5T2JqZWN0Q29udGFpbmVyQ29udGFpbmVyIGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byBudWxsICwgYW5kIHRoZSBvYmplY3RzIGFyZSBnYXJiYWdlIGNvbGxlY3RlZCBpZlxuICAgICAgICAgKiBubyBvdGhlciByZWZlcmVuY2VzIHRvIHRoZSBjaGlsZHJlbiBleGlzdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVDaGlsZHJlblxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUucmVtb3ZlQ2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuLnBvcCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3dhcHMgdHdvIERpc3BsYXlPYmplY3QncyB3aXRoIGVhY2ggb3RoZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3dhcENoaWxkcmVuXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZDEge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGJlIHN3YXAuXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZDIge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGJlIHN3YXAuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5zd2FwQ2hpbGRyZW4gPSBmdW5jdGlvbiAoY2hpbGQxLCBjaGlsZDIpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZDFJbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDEpO1xuICAgICAgICAgICAgdmFyIGNoaWxkMkluZGV4ID0gdGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkMik7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkQXQoY2hpbGQxLCBjaGlsZDJJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkQXQoY2hpbGQyLCBjaGlsZDFJbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTd2FwcyBjaGlsZCBvYmplY3RzIGF0IHRoZSB0d28gc3BlY2lmaWVkIGluZGV4IHBvc2l0aW9ucyBpbiB0aGUgY2hpbGQgbGlzdC4gQWxsIG90aGVyIGNoaWxkIG9iamVjdHMgaW4gdGhlIGRpc3BsYXkgb2JqZWN0IGNvbnRhaW5lciByZW1haW4gaW4gdGhlIHNhbWUgaW5kZXggcG9zaXRpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHN3YXBDaGlsZHJlbkF0XG4gICAgICAgICAqIEBwYXJhbSBpbmRleDEge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBpbmRleDIge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgY2hpbGQgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc3dhcENoaWxkcmVuQXQgPSBmdW5jdGlvbiAoaW5kZXgxLCBpbmRleDIpIHtcbiAgICAgICAgICAgIGlmIChpbmRleDEgPCAwIHx8IGluZGV4MSA8IDAgfHwgaW5kZXgxID49IHRoaXMubnVtQ2hpbGRyZW4gfHwgaW5kZXgyID49IHRoaXMubnVtQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBpbmRleCB2YWx1ZShzKSBjYW5ub3QgYmUgb3V0IG9mIGJvdW5kcy4gaW5kZXgxIHZhbHVlIGlzICcgKyBpbmRleDEgKyAnIGluZGV4MiB2YWx1ZSBpcyAnICsgaW5kZXgyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjaGlsZDEgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgxKTtcbiAgICAgICAgICAgIHZhciBjaGlsZDIgPSB0aGlzLmdldENoaWxkQXQoaW5kZXgyKTtcbiAgICAgICAgICAgIHRoaXMuc3dhcENoaWxkcmVuKGNoaWxkMSwgY2hpbGQyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgaW5kZXggcG9zaXRpb24gb2YgYSBjaGlsZCBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENoaWxkSW5kZXhcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBpZGVudGlmeS5cbiAgICAgICAgICogQHJldHVybnMge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCB0byBpZGVudGlmeS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRJbmRleCA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBkaXNwbGF5IG9iamVjdCBpcyBhIGNoaWxkIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIG9yIHRoZSBpbnN0YW5jZSBpdHNlbGYuIFRoZSBzZWFyY2ggaW5jbHVkZXMgdGhlIGVudGlyZSBkaXNwbGF5IGxpc3QgaW5jbHVkaW5nIHRoaXMgRGlzcGxheU9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjb250YWluc1xuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBjaGlsZCBvYmplY3QgdG8gdGVzdC5cbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59ICB0cnVlIGlmIHRoZSBjaGlsZCBvYmplY3QgaXMgYSBjaGlsZCBvZiB0aGUgRGlzcGxheU9iamVjdCBvciB0aGUgY29udGFpbmVyIGl0c2VsZjsgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkgPj0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRBdFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fSBUaGUgY2hpbGQgZGlzcGxheSBvYmplY3QgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBwb3NpdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgYSBEaXNwbGF5T2JqZWN0IGJ5IGl0cyBzanNJZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZEJ5Q2lkXG4gICAgICAgICAqIEBwYXJhbSBzanNJZCB7bnVtYmVyfVxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdHxudWxsfVxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZ2V0Q2hpbGRCeUNpZCA9IGZ1bmN0aW9uIChzanNJZCkge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gbnVsbDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IHRoaXMubnVtQ2hpbGRyZW4gLSAxOyBpXzEgPj0gMDsgaV8xLS0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpXzFdLnNqc0lkID09IHNqc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXzFdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyO1xuICAgIH0pKERpc3BsYXlPYmplY3RfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gRGlzcGxheU9iamVjdENvbnRhaW5lcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9ET01FbGVtZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERPTUVsZW1lbnRfMSA9IHJlcXVpcmUoJy4vRE9NRWxlbWVudCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBzaG91bGQgYmUgZXh0ZW5kZWQgYnkgeW91ciBtYWluIGFwcGxpY2F0aW9uIG9yIHJvb3QgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgU3RhZ2VcbiAgICAgKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdmlld1xuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgRE9NRWxlbWVudFxuICAgICAqIEByZXF1aXJlcyBqUXVlcnlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAvLyBUaGlzIGV4YW1wbGUgaWxsdXN0cmF0ZXMgaG93IHRvIHNldHVwIHlvdXIgbWFpbiBhcHBsaWNhdGlvbiBvciByb290IGNsYXNzIHdoZW4gZXh0ZW5kaW5nIHRoZSB7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAgICAgKiAgICAgICAgIGNsYXNzIE1haW5DbGFzcyBleHRlbmRzIFN0YWdlIHtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAqICAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgeW91ciBjaGlsZCBvYmplY3RzIHRvIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGxheW91dCgpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gTGF5b3V0IG9yIHVwZGF0ZSB0aGUgY2hpbGQgb2JqZWN0cyBpbiB0aGlzIHBhcmVudCBjbGFzcy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBlbmFibGUoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpcyB9O1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIC8vIEVuYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgYWRkIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGRpc2FibGUoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXMgfTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZW1vdmUgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgICAqICAgICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlZmVyZW5jZXMgaW4gdGhpcyBwYXJlbnQgY2xhc3MgdG8gcHJlcGFyZSBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgIH1cbiAgICAgKlxuICAgICAqXG4gICAgICogPGI+SW5zdGFudGlhdGlvbiBFeGFtcGxlPC9iPjxicj5cbiAgICAgKiBUaGlzIGV4YW1wbGUgaWxsdXN0cmF0ZXMgaG93IHRvIGluc3RhbnRpYXRlIHlvdXIgbWFpbiBhcHBsaWNhdGlvbiBvciByb290IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICBsZXQgYXBwID0gbmV3IE1haW5DbGFzcygpO1xuICAgICAqICAgICAgYXBwLmFwcGVuZFRvKCdib2R5Jyk7XG4gICAgICpcbiAgICAgKi9cbiAgICB2YXIgU3RhZ2UgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoU3RhZ2UsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFN0YWdlKCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBzZWxlY3RlZCBIVE1MIGVsZW1lbnQgd2hlcmUgdGhlIGNoaWxkIGVsZW1lbnRzIHdpbGwgYmUgY3JlYXRlZC4gVGhpcyBtZXRob2Qgc3RhcnRzIHRoZSBsaWZlY3ljbGUgb2YgdGhlIGFwcGxpY2F0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFwcGVuZFRvXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHthbnl9IEEgc3RyaW5nIHZhbHVlIHdoZXJlIHlvdXIgYXBwbGljYXRpb24gd2lsbCBiZSBhcHBlbmRlZC4gVGhpcyBjYW4gYmUgYW4gZWxlbWVudCBpZCAoI3NvbWUtaWQpLCBlbGVtZW50IGNsYXNzICguc29tZS1jbGFzcykgb3IgYSBlbGVtZW50IHRhZyAoYm9keSkuXG4gICAgICAgICAqIEBwYXJhbSBbZW5hYmxlZD10cnVlXSB7Ym9vbGVhbn0gU2V0cyB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBTdGFnZS5wcm90b3R5cGUuYXBwZW5kVG8gPSBmdW5jdGlvbiAodHlwZSwgZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQgPT09IHZvaWQgMCkgeyBlbmFibGVkID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9ICh0eXBlIGluc3RhbmNlb2YgalF1ZXJ5KSA/IHR5cGUgOiBqUXVlcnkodHlwZSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQodGhpcyk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0NyZWF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RhZ2U7XG4gICAgfSkoRE9NRWxlbWVudF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBTdGFnZTtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vQmFzZU9iamVjdCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlT2JqZWN0XzEgPSByZXF1aXJlKCcuLi9CYXNlT2JqZWN0Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB1c2VkIGFzIHRoZSBiYXNlIGNsYXNzIGZvciB0aGUgY3JlYXRpb24gb2YgRXZlbnQgb2JqZWN0cywgd2hpY2ggYXJlIHBhc3NlZCBhcyBwYXJhbWV0ZXJzIHRvIGV2ZW50IGxpc3RlbmVycyB3aGVuIGFuIGV2ZW50IG9jY3Vycy5cbiAgICAgKlxuICAgICAqIFRoZSBwcm9wZXJ0aWVzIG9mIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgY2FycnkgYmFzaWMgaW5mb3JtYXRpb24gYWJvdXQgYW4gZXZlbnQsIHN1Y2ggYXMgdGhlIGV2ZW50J3MgdHlwZSBvciB3aGV0aGVyIHRoZSBldmVudCdzIGRlZmF1bHQgYmVoYXZpb3IgY2FuIGJlIGNhbmNlbGVkLlxuICAgICAqXG4gICAgICogRm9yIG1hbnkgZXZlbnRzLCBzdWNoIGFzIHRoZSBldmVudHMgcmVwcmVzZW50ZWQgYnkgdGhlIEV2ZW50IGNsYXNzIGNvbnN0YW50cywgdGhpcyBiYXNpYyBpbmZvcm1hdGlvbiBpcyBzdWZmaWNpZW50LiBPdGhlciBldmVudHMsIGhvd2V2ZXIsIG1heSByZXF1aXJlIG1vcmVcbiAgICAgKiBkZXRhaWxlZCBpbmZvcm1hdGlvbi5cbiAgICAgKiBAY2xhc3MgQmFzZUV2ZW50XG4gICAgICogQGV4dGVuZHMgQmFzZU9iamVjdFxuICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LiBUaGUgdHlwZSBpcyBjYXNlLXNlbnNpdGl2ZS5cbiAgICAgKiBAcGFyYW0gW2J1YmJsZXM9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LiBJZiB0aGUgZXZlbnQgY2FuIGJ1YmJsZSwgdGhpcyB2YWx1ZSBpcyB0cnVlOyBvdGhlcndpc2UgaXQgaXMgZmFsc2UuXG4gICAgICogTm90ZTogV2l0aCBldmVudC1idWJibGluZyB5b3UgY2FuIGxldCBvbmUgRXZlbnQgc3Vic2VxdWVudGx5IGNhbGwgb24gZXZlcnkgYW5jZXN0b3IgKHt7I2Nyb3NzTGluayBcIkV2ZW50RGlzcGF0Y2hlci9wYXJlbnQ6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0pXG4gICAgICogKGNvbnRhaW5lcnMgb2YgY29udGFpbmVycyBvZiBldGMuKSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSB0aGF0IG9yaWdpbmFsbHkgZGlzcGF0Y2hlZCB0aGUgRXZlbnQsIGFsbCB0aGUgd2F5IHVwIHRvIHRoZSBzdXJmYWNlICh7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSkuIEFueSBjbGFzc2VzIHRoYXQgZG8gbm90IGhhdmUgYSBwYXJlbnQgY2Fubm90IGJ1YmJsZS5cbiAgICAgKiBAcGFyYW0gW2NhbmNlbGFibGU9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLiBJZiB0aGUgYmVoYXZpb3IgY2FuIGJlIGNhbmNlbGVkLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF0ge2FueX0gVXNlIHRvIHBhc3MgYW55IHR5cGUgb2YgZGF0YSB3aXRoIHRoZSBldmVudC5cbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBldmVudFxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgQmFzZU9iamVjdFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIEV4YW1wbGU6IGhvdyB0byBjcmVhdGUgYSBjdXN0b20gZXZlbnQgYnkgZXh0ZW5kaW5nIEJhc2VFdmVudC5cbiAgICAgKlxuICAgICAqICAgICBjbGFzcyBDb3VudHJ5RXZlbnQgZXh0ZW5kcyBCYXNlRXZlbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgQ0hBTkdFX0NPVU5UUlkgPSAnQ291bnRyeUV2ZW50LmNoYW5nZUNvdW50cnknO1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IodHlwZSwgYnViYmxlcyA9IGZhbHNlLCBjYW5jZWxhYmxlID0gZmFsc2UsIGRhdGEgPSBudWxsKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyKHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRhdGEpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHRoaXMuY291bnRyeU5hbWUgPSBudWxsO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAvLyBFeGFtcGxlOiBob3cgdG8gdXNlIHRoZSBjdXN0b20gZXZlbnQuXG4gICAgICogICAgIGxldCBldmVudCA9IG5ldyBDb3VudHJ5RXZlbnQoQ291bnRyeUV2ZW50LkNIQU5HRV9DT1VOVFJZKTtcbiAgICAgKiAgICAgZXZlbnQuY291bnRyeU5hbWUgPSAnQ2FuYWRhJztcbiAgICAgKiAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgKi9cbiAgICB2YXIgQmFzZUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEJhc2VFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQmFzZUV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChidWJibGVzID09PSB2b2lkIDApIHsgYnViYmxlcyA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSB7IGNhbmNlbGFibGUgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB0eXBlXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudHlwZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvYmplY3QgdGhhdCBvcmlnaW5hbGx5IGRpc3BhdGNoZWQgdGhlIGV2ZW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgY3VycmVudFRhcmdldCBwcm9wZXJ0eSBhbHdheXMgcG9pbnRzIHRvIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IHRoYXQgdGhlIGV2ZW50IGlzIGN1cnJlbnRseSBwcm9jZXNzaW5nIChpLmUuIGJ1YmJsaW5nIGF0KS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY3VycmVudFRhcmdldFxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBVc2VkIHRvIHBhc3MgYW55IHR5cGUgb2YgZGF0YSB3aXRoIHRoZSBldmVudC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgZGF0YVxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgYW4gZXZlbnQgaXMgYSBidWJibGluZyBldmVudC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYnViYmxlc1xuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmJ1YmJsZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJlaGF2aW9yIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQgY2FuIGJlIHByZXZlbnRlZC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY2FuY2VsYWJsZVxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNhbmNlbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcFByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSB3YXMgY2FsbGVkIG9uIHRoZSBldmVudCBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGlzUHJvcGFnYXRpb25TdG9wcGVkXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IHdhcyBjYWxsZWQgb24gdGhlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgdGhpcy5idWJibGVzID0gYnViYmxlcztcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsYWJsZSA9IGNhbmNlbGFibGU7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcmV2ZW50cyBwcm9jZXNzaW5nIG9mIGFueSBldmVudCBsaXN0ZW5lcnMgaW4gbm9kZXMgc3Vic2VxdWVudCB0byB0aGUgY3VycmVudCBub2RlIGluIHRoZSBldmVudCBmbG93LlxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBhZmZlY3QgYW55IGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlIChjdXJyZW50VGFyZ2V0KS4gSW4gY29udHJhc3QsXG4gICAgICAgICAqIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgcHJldmVudHMgcHJvY2Vzc2luZ1xuICAgICAgICAgKiBvZiBldmVudCBsaXN0ZW5lcnMgaW4gYm90aCB0aGUgY3VycmVudCBub2RlIGFuZCBzdWJzZXF1ZW50IG5vZGVzLiBBZGRpdGlvbmFsIGNhbGxzIHRvIHRoaXMgbWV0aG9kIGhhdmUgbm8gZWZmZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHN0b3BQcm9wYWdhdGlvblxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5wcm90b3R5cGUuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcmV2ZW50cyBwcm9jZXNzaW5nIG9mIGFueSBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZSBhbmQgYW55IHN1YnNlcXVlbnQgbm9kZXMgaW4gdGhlIGV2ZW50IGZsb3cuXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHRha2VzIGVmZmVjdCBpbW1lZGlhdGVseSwgYW5kIGl0IGFmZmVjdHMgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUuIEluIGNvbnRyYXN0LFxuICAgICAgICAgKiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50L3N0b3BQcm9wYWdhdGlvbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kIGRvZXNuJ3QgdGFrZSBlZmZlY3QgdW50aWxcbiAgICAgICAgICogYWxsIHRoZSBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZSBmaW5pc2ggcHJvY2Vzc2luZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIER1cGxpY2F0ZXMgYW4gaW5zdGFuY2Ugb2YgYW4gQmFzZUV2ZW50IHN1YmNsYXNzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIGEgbmV3IEJhc2VFdmVudCBvYmplY3QgdGhhdCBpcyBhIGNvcHkgb2YgdGhlIG9yaWdpbmFsIGluc3RhbmNlIG9mIHRoZSBCYXNlRXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgbmV3IEJhc2VFdmVudCBvYmplY3QgaW5jbHVkZXMgYWxsIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBvcmlnaW5hbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAgICAgKiBAcmV0dXJucyB7QmFzZUV2ZW50fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgY2xvbmVPZkV2ZW50ID0gZXZlbnQuY2xvbmUoKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkQmFzZU1vZGVsID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy50eXBlLCB0aGlzLmJ1YmJsZXMsIHRoaXMuY2FuY2VsYWJsZSwgdGhpcy5kYXRhKTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9uZWRCYXNlTW9kZWxba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkQmFzZU1vZGVsO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5BQ1RJVkFURSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBhY3RpdmF0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBBQ1RJVkFURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5BQ1RJVkFURSA9ICdCYXNlRXZlbnQuYWN0aXZhdGUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5BRERFRCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBhZGRlZCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBBRERFRFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5BRERFRCA9ICdCYXNlRXZlbnQuYWRkZWQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5BRERFRF9UT19TVEFHRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBhZGRlZFRvU3RhZ2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQURERURfVE9fU1RBR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQURERURfVE9fU1RBR0UgPSAnQmFzZUV2ZW50LmFkZGVkVG9TdGFnZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNBTkNFTCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNhbmNlbCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDQU5DRUxcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0FOQ0VMID0gJ0Jhc2VFdmVudC5jYW5jZWwnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DSEFOR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjaGFuZ2UgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0hBTkdFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNIQU5HRSA9ICdCYXNlRXZlbnQuY2hhbmdlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0xFQVIgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjbGVhciBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDTEVBUlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DTEVBUiA9ICdCYXNlRXZlbnQuY2xlYXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DTE9TRSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNsb3NlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENMT1NFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNMT1NFID0gJ0Jhc2VFdmVudC5jbG9zZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNMT1NJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjbG9zaW5nIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENMT1NJTkdcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0xPU0lORyA9ICdCYXNlRXZlbnQuY2xvc2luZyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNPTVBMRVRFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29tcGxldGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ09NUExFVEVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ09NUExFVEUgPSAnQmFzZUV2ZW50LmNvbXBsZXRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ09OTkVDVCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNvbm5lY3QgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ09OTkVDVFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DT05ORUNUID0gJ0Jhc2VFdmVudC5jb25uZWN0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY29weSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDT1BZXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNPUFkgPSAnQmFzZUV2ZW50LmNvcHknO1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjdXQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ1VUXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNVVCA9ICdCYXNlRXZlbnQuY3V0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuREVBQ1RJVkFURSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGRlYWN0aXZhdGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgREVBQ1RJVkFURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5ERUFDVElWQVRFID0gJ0Jhc2VFdmVudC5kZWFjdGl2YXRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRElTUExBWUlORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGRpc3BsYXlpbmcgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRElTUExBWUlOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5ESVNQTEFZSU5HID0gJ0Jhc2VFdmVudC5kaXNwbGF5aW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRU5URVJfRlJBTUUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gZW50ZXJGcmFtZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBFTlRFUl9GUkFNRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5FTlRFUl9GUkFNRSA9ICdCYXNlRXZlbnQuZW50ZXJGcmFtZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkVYSVRfRlJBTUUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gZXhpdEZyYW1lIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEVYSVRfRlJBTUVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRVhJVF9GUkFNRSA9ICdCYXNlRXZlbnQuZXhpdEZyYW1lJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuRVhJVElORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBleGl0aW5nIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEVYSVRJTkdcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRVhJVElORyA9ICdCYXNlRXZlbnQuZXhpdGluZyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkZVTExfU0NSRUVOIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgZnVsbFNjcmVlbiBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBGVUxMU0NSRUVOXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkZVTExTQ1JFRU4gPSAnQmFzZUV2ZW50LmZ1bGxTY3JlZW4nO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5JTklUIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGluaXQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgSU5JVFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5JTklUID0gJ0Jhc2VFdmVudC5pbml0JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuTkVUV09SS19DSEFOR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBuZXR3b3JrQ2hhbmdlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IE5FVFdPUktfQ0hBTkdFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50Lk5FVFdPUktfQ0hBTkdFID0gJ0Jhc2VFdmVudC5uZXR3b3JrQ2hhbmdlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuT1BFTiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBvcGVuIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IE9QRU5cbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuT1BFTiA9ICdCYXNlRXZlbnQub3Blbic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlBBU1RFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcGFzdGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUEFTVEVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUEFTVEUgPSAnQmFzZUV2ZW50LnBhc3RlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUFJFUEFSSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcHJlcGFyaW5nIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFBSRVBBUklOR1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5QUkVQQVJJTkcgPSAnQmFzZUV2ZW50LnByZXBhcmluZyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlJFTU9WRUQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSByZW1vdmVkIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFJFTU9WRURcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUkVNT1ZFRCA9ICdCYXNlRXZlbnQucmVtb3ZlZCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlJFTkRFUiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHJlbmRlciBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBSRU5ERVJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUkVOREVSID0gJ0Jhc2VFdmVudC5yZW5kZXInO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5SRVNJWkUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSByZXNpemUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUkVTSVpFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlJFU0laRSA9ICdCYXNlRXZlbnQucmVzaXplJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuU0VMRUNURUQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBzZWxlY3RlZCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBTRUxFQ1RFRFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5TRUxFQ1RFRCA9ICdCYXNlRXZlbnQuc2VsZWN0ZWQnO1xuICAgICAgICByZXR1cm4gQmFzZUV2ZW50O1xuICAgIH0pKEJhc2VPYmplY3RfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQmFzZUV2ZW50O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9PYmplY3RNYW5hZ2VyJywgJy4vQmFzZUV2ZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIE9iamVjdE1hbmFnZXJfMSA9IHJlcXVpcmUoJy4uL09iamVjdE1hbmFnZXInKTtcbiAgICB2YXIgQmFzZUV2ZW50XzEgPSByZXF1aXJlKCcuL0Jhc2VFdmVudCcpO1xuICAgIC8qKlxuICAgICAqIEV2ZW50RGlzcGF0Y2hlciBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIGNsYXNzZXMgdGhhdCBkaXNwYXRjaCBldmVudHMuIEl0IGlzIHRoZSBiYXNlIGNsYXNzIGZvciB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAgICAgKiBFdmVudERpc3BhdGNoZXIgcHJvdmlkZXMgbWV0aG9kcyBmb3IgbWFuYWdpbmcgcHJpb3JpdGl6ZWQgcXVldWVzIG9mIGV2ZW50IGxpc3RlbmVycyBhbmQgZGlzcGF0Y2hpbmcgZXZlbnRzLlxuICAgICAqXG4gICAgICogQGNsYXNzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBleHRlbmRzIE9iamVjdE1hbmFnZXJcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBldmVudFxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgT2JqZWN0TWFuYWdlclxuICAgICAqIEByZXF1aXJlcyBCYXNlRXZlbnRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgLy8gQW5vdGhlciB3YXkgdG8gdXNlIHRoZSBFdmVudERpc3BhdGNoZXIuXG4gICAgICogICAgICBsZXQgZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xuICAgICAqICAgICAgZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAqICAgICAgZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoJ2NoYW5nZScpO1xuICAgICAqL1xuICAgIHZhciBFdmVudERpc3BhdGNoZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRXZlbnREaXNwYXRjaGVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBFdmVudERpc3BhdGNoZXIoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSG9sZHMgYSByZWZlcmVuY2UgdG8gYWRkZWQgbGlzdGVuZXJzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfbGlzdGVuZXJzXG4gICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPGFueT59XG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgb2JqZWN0IHRoYXQgY29udGFpbnMgYSBjaGlsZCBvYmplY3QuIFVzZXMgdGhlIHBhcmVudCBwcm9wZXJ0eVxuICAgICAgICAgICAgICogdG8gc3BlY2lmeSBhIHJlbGF0aXZlIHBhdGggdG8gZGlzcGxheSBvYmplY3RzIHRoYXQgYXJlIGFib3ZlIHRoZSBjdXJyZW50IGRpc3BsYXkgb2JqZWN0IGluIHRoZSBkaXNwbGF5XG4gICAgICAgICAgICAgKiBsaXN0IGhpZXJhcmNoeSBhbmQgaGVscHMgZmFjaWxpdGF0ZSBldmVudCBidWJibGluZy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcGFyZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIG9iamVjdCB3aXRoIGFuIEV2ZW50RGlzcGF0Y2hlciBvYmplY3Qgc28gdGhlIGxpc3RlbmVyIHJlY2VpdmVzIG5vdGlmaWNhdGlvbiBvZiBhbiBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGV2ZW50LiBUaGlzIGZ1bmN0aW9uIG11c3QgYWNjZXB0IGFuIEV2ZW50IG9iamVjdCBhcyBpdHMgb25seSBwYXJhbWV0ZXIgYW5kIG11c3QgcmV0dXJuIG5vdGhpbmcsIGFzIHRoaXMgZXhhbXBsZSBzaG93cy4gQGV4YW1wbGUgZnVuY3Rpb24oZXZlbnQ6RXZlbnQpOnZvaWRcbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IEJpbmRzIHRoZSBzY29wZSB0byBhIHBhcnRpY3VsYXIgb2JqZWN0IChzY29wZSBpcyBiYXNpY2FsbHkgd2hhdCBcInRoaXNcIiByZWZlcnMgdG8gaW4geW91ciBmdW5jdGlvbikuIFRoaXMgY2FuIGJlIHZlcnkgdXNlZnVsIGluIEphdmFTY3JpcHQgYmVjYXVzZSBzY29wZSBpc24ndCBnZW5lcmFsbHkgbWFpbnRhaW5lZC5cbiAgICAgICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBfaGFuZGxlck1ldGhvZChldmVudCkge1xuICAgICAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQgKyBcIiBzZW50IHRoZSBldmVudC5cIik7XG4gICAgICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnR5cGUsIGV2ZW50LmRhdGEpO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIGFzc29jaWF0ZWQgdHlwZSB2YWx1ZSB0aGF0IGlzIHBhc3NlZCBpbi5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgaWYgKGxpc3QgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGEgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgZG8gbm90IGV4aXN0IGZvciB0aGUgdHlwZSB2YWx1ZSBwYXNzZWQgaW4gdGhlbiBjcmVhdGUgYSBuZXcgZW1wdHkgYXJyYXkuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdID0gbGlzdCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgIHZhciBpID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoLS1pID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0ZW5lci5zY29wZSA9PT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNhbWUgY2FsbGJhY2sgYW5kIHNjb3BlIGFyZSBmb3VuZCB0aGVuIHJlbW92ZSBpdCBhbmQgYWRkIHRoZSBjdXJyZW50IG9uZSBiZWxvdy5cbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSAwICYmIGxpc3RlbmVyLnByaW9yaXR5IDwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBsaXN0IGFycmF5IGF0IHRoZSBpbmRleCB2YWx1ZS5cbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGluZGV4LCAwLCB7IGNhbGxiYWNrOiBjYWxsYmFjaywgc2NvcGU6IHNjb3BlLCBwcmlvcml0eTogcHJpb3JpdHksIG9uY2U6IGZhbHNlIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb2JqZWN0IG9uY2Ugd2l0aCBhbiBFdmVudERpc3BhdGNoZXIgb2JqZWN0IHNvIHRoZSBsaXN0ZW5lciB3aWxsIHJlY2VpdmUgdGhlIG5vdGlmaWNhdGlvbiBvZiBhbiBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhZGRFdmVudExpc3RlbmVyT25jZVxuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7U3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBldmVudC4gVGhpcyBmdW5jdGlvbiBtdXN0IGFjY2VwdCBhbiBFdmVudCBvYmplY3QgYXMgaXRzIG9ubHkgcGFyYW1ldGVyIGFuZCBtdXN0IHJldHVybiBub3RoaW5nLCBhcyB0aGlzIGV4YW1wbGUgc2hvd3MuIEBleGFtcGxlIGZ1bmN0aW9uKGV2ZW50OkV2ZW50KTp2b2lkXG4gICAgICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBCaW5kcyB0aGUgc2NvcGUgdG8gYSBwYXJ0aWN1bGFyIG9iamVjdCAoc2NvcGUgaXMgYmFzaWNhbGx5IHdoYXQgXCJ0aGlzXCIgcmVmZXJzIHRvIGluIHlvdXIgZnVuY3Rpb24pLiBUaGlzIGNhbiBiZSB2ZXJ5IHVzZWZ1bCBpbiBKYXZhU2NyaXB0IGJlY2F1c2Ugc2NvcGUgaXNuJ3QgZ2VuZXJhbGx5IG1haW50YWluZWQuXG4gICAgICAgICAqIEBwYXJhbSBbcHJpb3JpdHk9MF0ge2ludH0gSW5mbHVlbmNlcyB0aGUgb3JkZXIgaW4gd2hpY2ggdGhlIGxpc3RlbmVycyBhcmUgY2FsbGVkLiBMaXN0ZW5lcnMgd2l0aCBsb3dlciBwcmlvcml0aWVzIGFyZSBjYWxsZWQgYWZ0ZXIgb25lcyB3aXRoIGhpZ2hlciBwcmlvcml0aWVzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJPbmNlKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIF9oYW5kbGVyTWV0aG9kKGV2ZW50KSB7XG4gICAgICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCArIFwiIHNlbnQgdGhlIGV2ZW50LlwiKTtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgZXZlbnQuZGF0YSk7XG4gICAgICAgICAqICAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyT25jZSA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KSB7XG4gICAgICAgICAgICBpZiAocHJpb3JpdHkgPT09IHZvaWQgMCkgeyBwcmlvcml0eSA9IDA7IH1cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgdGhlIG5vcm1hbCB3YXkuXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHNjb3BlLCBwcmlvcml0eSk7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGV2ZW50IGxpc3RlbmVycyB3ZSBqdXN0IGFkZGVkLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0WzBdO1xuICAgICAgICAgICAgLy8gQ2hhbmdlIHRoZSB2YWx1ZSB0byB0cnVlIHNvIGl0IHdpbGwgYmUgcmVtb3ZlIGFmdGVyIGRpc3BhdGNoRXZlbnQgaXMgY2FsbGVkLlxuICAgICAgICAgICAgbGlzdGVuZXIub25jZSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYSBzcGVjaWZpZWQgbGlzdGVuZXIgZnJvbSB0aGUgRXZlbnREaXNwYXRjaGVyIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgb2JqZWN0IHRvIHJlbW92ZS5cbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgbGlzdGVuZXIgb2JqZWN0IHRvIGJlIHJlbW92ZWQuXG4gICAgICAgICAqIEBoaWRlIFRoaXMgd2FzIGFkZGVkIGJlY2F1c2UgaXQgd2FzIG5lZWRlZCBmb3IgdGhlIHt7I2Nyb3NzTGluayBcIkV2ZW50QnJva2VyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLiBUbyBrZWVwIHRoaW5ncyBjb25zaXN0ZW50IHRoaXMgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJzIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUgdGhhdCBpcyBwYXNzZWQgaW4uXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgIGlmIChsaXN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB2YXIgaV8xID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKC0taV8xID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNhbGxiYWNrIGFuZCBzY29wZSBhcmUgdGhlIHNhbWUgdGhlbiByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyLlxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXzFdLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBsaXN0W2lfMV0uc2NvcGUgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpXzEsIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIDxwPkRpc3BhdGNoZXMgYW4gZXZlbnQgaW50byB0aGUgZXZlbnQgZmxvdy4gVGhlIGV2ZW50IHRhcmdldCBpcyB0aGUgRXZlbnREaXNwYXRjaGVyIG9iamVjdCB1cG9uIHdoaWNoIHRoZSBkaXNwYXRjaEV2ZW50KCkgbWV0aG9kIGlzIGNhbGxlZC48L3A+XG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGlzcGF0Y2hFdmVudFxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQge3N0cmluZ3xCYXNlRXZlbnR9IFRoZSBFdmVudCBvYmplY3Qgb3IgZXZlbnQgdHlwZSBzdHJpbmcgeW91IHdhbnQgdG8gZGlzcGF0Y2guIFlvdSBjYW4gY3JlYXRlIGN1c3RvbSBldmVudHMsIHRoZSBvbmx5IHJlcXVpcmVtZW50IGlzIGFsbCBldmVudHMgbXVzdCBleHRlbmQge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319LlxuICAgICAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF0ge2FueX0gVGhlIG9wdGlvbmFsIGRhdGEgeW91IHdhbnQgdG8gc2VuZCB3aXRoIHRoZSBldmVudC4gRG8gbm90IHVzZSB0aGlzIHBhcmFtZXRlciBpZiB5b3UgYXJlIHBhc3NpbmcgaW4gYSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gRXhhbXBsZTogU2VuZGluZyBkYXRhIHdpdGggdGhlIGV2ZW50OlxuICAgICAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJywge3NvbWU6ICdkYXRhJ30pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIEV4YW1wbGU6IFdpdGggYW4gZXZlbnQgb2JqZWN0XG4gICAgICAgICAqICAgICAgLy8gKGV2ZW50IHR5cGUsIGJ1YmJsaW5nIHNldCB0byB0cnVlLCBjYW5jZWxhYmxlIHNldCB0byB0cnVlIGFuZCBwYXNzaW5nIGRhdGEpIDpcbiAgICAgICAgICogICAgICBsZXQgZXZlbnQgPSBuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5DSEFOR0UsIHRydWUsIHRydWUsIHtzb21lOiAnZGF0YSd9KTtcbiAgICAgICAgICogICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIEhlcmUgaXMgYSBjb21tb24gaW5saW5lIGV2ZW50IG9iamVjdCBiZWluZyBkaXNwYXRjaGVkOlxuICAgICAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5DSEFOR0UpKTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSB0eXBlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBCYXNlRXZlbnRfMS5kZWZhdWx0KHR5cGUsIGZhbHNlLCB0cnVlLCBkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRhcmdldCBpcyBudWxsIHRoZW4gc2V0IGl0IHRvIHRoZSBvYmplY3QgdGhhdCBkaXNwYXRjaGVkIHRoZSBldmVudC5cbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBc3NpZ24gdGhlIGN1cnJlbnQgb2JqZWN0IHRoYXQgaXMgY3VycmVudGx5IHByb2Nlc3NpbmcgdGhlIGV2ZW50IChpLmUuIGV2ZW50IGJ1YmJsaW5nIGF0KS5cbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVyIGJ5IHRoZSBhc3NvY2lhdGVkIHR5cGUgdmFsdWUuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1tldmVudC50eXBlXTtcbiAgICAgICAgICAgIGlmIChsaXN0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB2YXIgaV8yID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWlfMiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGNhbmNlbGFibGUgYW5kIGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkIGFyZSB0cnVlIHRoZW4gYnJlYWsgb3V0IG9mIHRoZSB3aGlsZSBsb29wLlxuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSA9PT0gdHJ1ZSAmJiBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0W2lfMl07XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIuc2NvcGUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIG9uY2UgdmFsdWUgaXMgdHJ1ZSB3ZSB3YW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgcmlnaHQgYWZ0ZXIgdGhpcyBjYWxsYmFjayB3YXMgY2FsbGVkLlxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LnR5cGUsIGxpc3RlbmVyLmNhbGxiYWNrLCBsaXN0ZW5lci5zY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0Rpc3BhdGNoZXMgdXAgdGhlIGNoYWluIG9mIGNsYXNzZXMgdGhhdCBoYXZlIGEgcGFyZW50LlxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50ICE9IG51bGwgJiYgZXZlbnQuYnViYmxlcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGNhbmNlbGFibGUgYW5kIGlzUHJvcGFnYXRpb25TdG9wcGVkIGFyZSB0cnVlIHRoZW4gZG9uJ3QgZGlzcGF0Y2ggdGhlIGV2ZW50IG9uIHRoZSBwYXJlbnQgb2JqZWN0LlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jYW5jZWxhYmxlID09PSB0cnVlICYmIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBldmVudCB0byB0aGUgcGFyZW50IChldmVudCBidWJibGluZykuXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGFuIG9iamVjdCBoYXMgYSBzcGVjaWZpYyBldmVudCBsaXN0ZW5lciBhbHJlYWR5IGFkZGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGhhc0V2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBtZXRob2QgdG8gY2FsbC5cbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgbGlzdGVuZXIgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5oYXNFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5oYXNFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1t0eXBlXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgICAgIHZhciBudW1PZkNhbGxiYWNrcyA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaV8zID0gMDsgaV8zIDwgbnVtT2ZDYWxsYmFja3M7IGlfMysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdW2lfM107XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgbGlzdGVuZXIuc2NvcGUgPT09IHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBhIHN0cmluZyBvdXRwdXQgb2YgZXZlbnQgbGlzdGVuZXJzIGZvciBhIGdpdmVuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRFdmVudExpc3RlbmVyc1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICB0aGlzLmdldEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gW0NsYXNzTmFtZV0gaXMgbGlzdGVuaW5nIGZvciB0aGUgJ0Jhc2VFdmVudC5jaGFuZ2UnIGV2ZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5nZXRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcbiAgICAgICAgICAgIHZhciBudW1PZkNhbGxiYWNrcztcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbnVtT2ZDYWxsYmFja3MgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfNCA9IDA7IGlfNCA8IG51bU9mQ2FsbGJhY2tzOyBpXzQrKykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXVtpXzRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuc2NvcGUgJiYgKHR5cGVvZiBsaXN0ZW5lci5zY29wZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1snICsgbGlzdGVuZXIuc2NvcGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgKz0gJ1tVbmtub3duXSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RyICs9IFwiIGlzIGxpc3RlbiBmb3IgJ1wiICsgdHlwZSArIFwiJyBldmVudC5cXG5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gQmFzZU9iamVjdC5kZXN0cm95XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnREaXNwYXRjaGVyO1xuICAgIH0pKE9iamVjdE1hbmFnZXJfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnREaXNwYXRjaGVyO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0Jhc2VFdmVudCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlRXZlbnRfMSA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIFRpbWVyRXZlbnQuLi5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBUaW1lckV2ZW50XG4gICAgICogQGV4dGVuZHMgQmFzZUV2ZW50XG4gICAgICogQHBhcmFtIHR5cGUge3N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuIFRoZSB0eXBlIGlzIGNhc2Utc2Vuc2l0aXZlLlxuICAgICAqIEBwYXJhbSBbYnViYmxlcz1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIGFuIGV2ZW50IGlzIGEgYnViYmxpbmcgZXZlbnQuIElmIHRoZSBldmVudCBjYW4gYnViYmxlLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBOb3RlOiBXaXRoIGV2ZW50LWJ1YmJsaW5nIHlvdSBjYW4gbGV0IG9uZSBFdmVudCBzdWJzZXF1ZW50bHkgY2FsbCBvbiBldmVyeSBhbmNlc3RvciAoe3sjY3Jvc3NMaW5rIFwiRXZlbnREaXNwYXRjaGVyL3BhcmVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSlcbiAgICAgKiAoY29udGFpbmVycyBvZiBjb250YWluZXJzIG9mIGV0Yy4pIG9mIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IHRoYXQgb3JpZ2luYWxseSBkaXNwYXRjaGVkIHRoZSBFdmVudCwgYWxsIHRoZSB3YXkgdXAgdG8gdGhlIHN1cmZhY2UgKHt7I2Nyb3NzTGluayBcIlN0YWdlXCJ9fXt7L2Nyb3NzTGlua319KS4gQW55IGNsYXNzZXMgdGhhdCBkbyBub3QgaGF2ZSBhIHBhcmVudCBjYW5ub3QgYnViYmxlLlxuICAgICAqIEBwYXJhbSBbY2FuY2VsYWJsZT1mYWxzZV0ge2Jvb2xlYW59IEluZGljYXRlcyB3aGV0aGVyIHRoZSBiZWhhdmlvciBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50IGNhbiBiZSBwcmV2ZW50ZWQuIElmIHRoZSBiZWhhdmlvciBjYW4gYmUgY2FuY2VsZWQsIHRoaXMgdmFsdWUgaXMgdHJ1ZTsgb3RoZXJ3aXNlIGl0IGlzIGZhbHNlLlxuICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBVc2UgdG8gcGFzcyBhbnkgdHlwZSBvZiBkYXRhIHdpdGggdGhlIGV2ZW50LlxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGV2ZW50XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlRXZlbnRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKi9cbiAgICB2YXIgVGltZXJFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhUaW1lckV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBUaW1lckV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChidWJibGVzID09PSB2b2lkIDApIHsgYnViYmxlcyA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSB7IGNhbmNlbGFibGUgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc3BhdGNoZWQgd2hlbmV2ZXIgYSBUaW1lciBvYmplY3QgcmVhY2hlcyBhbiBpbnRlcnZhbCBzcGVjaWZpZWQgYWNjb3JkaW5nIHRvIHRoZSBUaW1lci5kZWxheSBwcm9wZXJ0eS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFRJTUVSXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFRpbWVyRXZlbnQuVElNRVIgPSAnVGltZXJFdmVudC50aW1lcic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwYXRjaGVkIHdoZW5ldmVyIGl0IGhhcyBjb21wbGV0ZWQgdGhlIG51bWJlciBvZiByZXF1ZXN0cyBzZXQgYnkgVGltZXIucmVwZWF0Q291bnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBUSU1FUl9DT01QTEVURVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUaW1lckV2ZW50LlRJTUVSX0NPTVBMRVRFID0gJ1RpbWVyRXZlbnQudGltZXJDb21wbGV0ZSc7XG4gICAgICAgIHJldHVybiBUaW1lckV2ZW50O1xuICAgIH0pKEJhc2VFdmVudF8xLmRlZmF1bHQpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBUaW1lckV2ZW50O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9CYXNlT2JqZWN0JywgJy4uL3V0aWwvVXRpbCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlT2JqZWN0XzEgPSByZXF1aXJlKCcuLi9CYXNlT2JqZWN0Jyk7XG4gICAgdmFyIFV0aWxfMSA9IHJlcXVpcmUoJy4uL3V0aWwvVXRpbCcpO1xuICAgIC8qKlxuICAgICAqICBCYXNlIE1vZGVsIGlzIGEgZGVzaWduIHBhdHRlcm4gdXNlZCB0byB0cmFuc2ZlciBkYXRhIGJldHdlZW4gc29mdHdhcmUgYXBwbGljYXRpb24gc3Vic3lzdGVtcy5cbiAgICAgKlxuICAgICAqIE5vdGU6IElmIHRoZSBkYXRhIGRvZXNuJ3QgbWF0Y2ggdGhlIHByb3BlcnR5IG5hbWVzIHlvdSBjYW4gc2V0IHRoZSB2YWx1ZSBtYW51YWxseSBhZnRlciB1cGRhdGUgc3VwZXIgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgKiAgQWxzbyBpbiB0aGUgY2xhc3MgeW91IGluaGVyaXQgQmFzZU1vZGVsIGZyb20geW91IGNhbiBvdmVycmlkZSB0aGUgdXBkYXRlIG1ldGhvZCB0byBoYW5kbGUgdGhlIGRhdGEgaG93IHlvdSB3YW50LlxuICAgICAqXG4gICAgICogQGNsYXNzIEJhc2VNb2RlbFxuICAgICAqIEBleHRlbmRzIEJhc2VPYmplY3RcbiAgICAgKiBAcGFyYW0gW2RhdGFdIHthbnl9IFByb3ZpZGUgYSB3YXkgdG8gdXBkYXRlIHRoZSAgQmFzZSBNb2RlbCB1cG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIG1vZGVsXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQHJlcXVpcmVzIFV0aWxcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gICAgICogICAgICBsZXQgZGF0YSA9IHtcbiAgICAgKiAgICAgICAgICAgICAgbWFrZTogJ1Rlc2xhJyxcbiAgICAgKiAgICAgICAgICAgICAgbW9kZWw6ICdNb2RlbCBTJyxcbiAgICAgKiAgICAgICAgICAgICAgWWVBcjogMjAxNCxcbiAgICAgKiAgICAgICAgICAgICAgZmVhdHVyZToge1xuICAgICAqICAgICAgICAgICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAqICAgICAgICAgICAgICAgICAgYWlyYmFnczogdHJ1ZVxuICAgICAqICAgICAgICAgICAgICB9XG4gICAgICogICAgICB9XG4gICAgICogICAgICBsZXQgY2FyTW9kZWwgPSBuZXcgQ2FyTW9kZWwoZGF0YSk7XG4gICAgICpcbiAgICAgKlxuICAgICAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gICAgICogICAgICBjbGFzcyBDYXJNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAvLyBZb3UgbmVlZCB0byBoYXZlIHByb3BlcnRpZXMgc28gdGhlIGRhdGEgd2lsbCBnZXQgYXNzaWduZWQuXG4gICAgICogICAgICAgICAgLy8gSWYgbm90IHRoZSBkYXRhIHdpbGwgbm90IGdldCBhc3NpZ25lZCB0byB0aGUgbW9kZWwuXG4gICAgICogICAgICAgICAgbWFrZSA9IG51bGw7XG4gICAgICogICAgICAgICAgbW9kZWwgPSBudWxsO1xuICAgICAqICAgICAgICAgIHllYXIgPSBudWxsO1xuICAgICAqICAgICAgICAgIGFsbFdoZWVsID0gZmFsc2U7IC8vIFNldCBhIGRlZmF1bHQgdmFsdWVcbiAgICAgKlxuICAgICAqICAgICAgICAgIC8vIFlvdSBjYW4gYXNzaWduIEJhc2VNb2RlbCB0byBhIHByb3BlcnR5IHdoaWNoIHdpbGxcbiAgICAgKiAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQgaXQgYW5kIHBhc3MgdGhlIGRhdGEgdG8gaXQuXG4gICAgICogICAgICAgICAgZmVhdHVyZSA9IEZlYXR1cmVNb2RlbFxuICAgICAqXG4gICAgICogICAgICAgICAgLy8gSWYgeW91IGhhdmUgYW4gYXJyYXkgb2YgZGF0YSBhbmQgd2FudCB0aGVtIGFzc2lnbiB0byBhIEJhc2VNb2RlbC5cbiAgICAgKiAgICAgICAgICBmZWF0dXJlID0gW0ZlYXR1cmVNb2RlbF07XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICAgICAqICAgICAgICAgICAgICB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgLy8gQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqICAgICAgICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lLlxuICAgICAqICAgICAgICAgICAgICAvLyBZb3UgY2FuIHNldCB0aGUgdmFsdWUocykgbWFudWFsbHkgYWZ0ZXIgdGhlIHVwZGF0ZSBzdXBlciBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAqICAgICAgICAgICAgICB0aGlzLnllYXIgPSBkYXRhLlllQXI7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqL1xuICAgIHZhciBCYXNlTW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQmFzZU1vZGVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCYXNlTW9kZWwoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvdmlkZSBhIHdheSB0byB1cGRhdGUgdGhlICBCYXNlIE1vZGVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB7YW55fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAvLyBFeGFtcGxlIG9mIHVwZGF0aW5nIHNvbWUgb2YgdGhlIGRhdGE6XG4gICAgICAgICAqICAgICBjYXJNb2RlbC51cGRhdGUoeyB5ZWFyOiAyMDE1LCBhbGxXaGVlbDogdHJ1ZX0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gT2YgY291cnNlIHlvdSBjYW4gYWxzbyBkbyBpdCB0aGUgZm9sbG93aW5nIHdheTpcbiAgICAgICAgICogICAgIGNhck1vZGVsLnllYXIgPSAyMDE1O1xuICAgICAgICAgKiAgICAgY2FyTW9kZWwuYWxsV2hlZWwgPSBmYWxzZTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eURhdGE7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eUtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBjbGFzcyBoYXMgYSBwcm9wZXJ0eSB0aGF0IG1hdGNoZXMgYSBwcm9wZXJ0eSBvbiB0aGUgZGF0YSBiZWluZyBwYXNzZWQgaW4gdGhlbiBzZXQgaXQuXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBkb24ndCBzZXQgdGhlIHNqc0lkIGRhdGEgdmFsdWUgYmVjYXVzZSBpdCBpcyBhdXRvbWF0aWNhbGx5IHNldCBpbiB0aGUgY29uc3RydWN0b3IgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UgZG8gd2FudCBpdCB0byBiZSBvdmVycmlkZGVuIHdoZW4gdGhlIGNsb25lIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlLZXkpICYmIHByb3BlcnR5S2V5ICE9PSAnc2pzSWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBkYXRhIHBhc3NlZCBpbiBkb2VzIG5vdCBoYXZlIGEgcHJvcGVydHkgdGhhdCBtYXRjaGVzIGEgcHJvcGVydHkgb24gdGhlICBCYXNlIE1vZGVsIHRoZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHZhbHVlL2RhdGEgdGhhdCB3YXMgYXNzaWduZWQgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIHVzZSB0aGUgZGF0YSB0aGF0IHdhcyBwYXNzZWQgaW4uXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5RGF0YSA9IChkYXRhW3Byb3BlcnR5S2V5XSA9PT0gdm9pZCAwKSA/IHRoaXNbcHJvcGVydHlLZXldIDogZGF0YVtwcm9wZXJ0eUtleV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGEocHJvcGVydHlLZXksIHByb3BlcnR5RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9zZXREYXRhXG4gICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fc2V0RGF0YSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkYXRhIGlzIGFuIGFycmF5IGFuZCBpZiB0aGUgcHJvcGVydHkgaXRzIGJlaW5nIGFzc2lnbmVkIHRvIGlzIGFuIGFycmF5LlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmICgodGhpc1trZXldWzBdIGluc3RhbmNlb2YgQmFzZU1vZGVsLmNvbnN0cnVjdG9yICYmIGRhdGFbMF0gaW5zdGFuY2VvZiBCYXNlTW9kZWwuY29uc3RydWN0b3IpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZU1vZGVsT3JPdGhlciA9ICh0aGlzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkgPyB0aGlzW2tleV1bMF0gOiB0aGlzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBbaV8xXSA9IHRoaXMuX3VwZGF0ZURhdGEoYmFzZU1vZGVsT3JPdGhlciwgZGF0YVtpXzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0ZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5fdXBkYXRlRGF0YSh0aGlzW2tleV0sIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfdXBkYXRlRGF0YVxuICAgICAgICAgKiBAcGFyYW0ga2V5VmFsdWVcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fdXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChrZXlWYWx1ZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGtleVZhbHVlIGluc3RhbmNlb2YgQmFzZU1vZGVsLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgbm90IGJlZW4gY3JlYXRlZCB5ZXQuXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBpbnN0YW50aWF0ZSBpdCBhbmQgcGFzcyBpbiB0aGUgZGF0YSB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICAgICAga2V5VmFsdWUgPSBuZXcga2V5VmFsdWUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlWYWx1ZSBpbnN0YW5jZW9mIEJhc2VNb2RlbCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHByb3BlcnR5IGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBjYWxsIHRoZSB1cGRhdGUgbWV0aG9kIGFuZCBwYXNzIGluIHRoZSBkYXRhLlxuICAgICAgICAgICAgICAgIGtleVZhbHVlLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEVsc2UganVzdCBhc3NpZ24gdGhlIGRhdGEgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgIGtleVZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlWYWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBCYXNlIE1vZGVsIGRhdGEgaW50byBhIEpTT04gb2JqZWN0IGFuZCBkZWxldGVzIHRoZSBzanNJZCBwcm9wZXJ0eS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0pTT05cbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IG9iaiA9IGNhck1vZGVsLnRvSlNPTigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBVdGlsXzEuZGVmYXVsdC5jbG9uZSh0aGlzKTtcbiAgICAgICAgICAgIHJldHVybiBVdGlsXzEuZGVmYXVsdC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoY2xvbmUsIFsnc2pzSWQnXSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhICBCYXNlIE1vZGVsIHRvIGEgSlNPTiBzdHJpbmcsXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9KU09OU3RyaW5nXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBzdHIgPSBjYXJNb2RlbC50b0pTT05TdHJpbmcoKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudG9KU09OU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9KU09OKCkpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgdGhlIHN0cmluZyBqc29uIGRhdGEgaW50byBhbiBPYmplY3QgYW5kIGNhbGxzIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlTW9kZWwvdXBkYXRlOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2Qgd2l0aCB0aGUgY29udmVydGVkIE9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmcm9tSlNPTlxuICAgICAgICAgKiBAcGFyYW0ganNvbiB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgbGV0IHN0ciA9ICd7XCJtYWtlXCI6XCJUZXNsYVwiLFwibW9kZWxcIjpcIk1vZGVsIFNcIixcInllYXJcIjoyMDE0fSdcbiAgICAgICAgICogICAgICBsZXQgY2FyTW9kZWwgPSBuZXcgQ2FyTW9kZWwoKTtcbiAgICAgICAgICogICAgICBjYXJNb2RlbC5mcm9tSlNPTihzdHIpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS5mcm9tSlNPTiA9IGZ1bmN0aW9uIChqc29uKSB7XG4gICAgICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoanNvbik7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShwYXJzZWREYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgY2xvbmUvY29weSBvZiB0aGUgIEJhc2UgTW9kZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgICAgICogQHJldHVybnMge0Jhc2VNb2RlbH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IGNsb25lID0gY2FyTW9kZWwuY2xvbmUoKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmVkQmFzZU1vZGVsID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gY2xvbmVkQmFzZU1vZGVsO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQmFzZU1vZGVsO1xuICAgIH0pKEJhc2VPYmplY3RfMS5kZWZhdWx0KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gQmFzZU1vZGVsO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbiAgICB2YXIgJGV2ZW50TGlzdGVuZXIgPSAkO1xuICAgIC8qKlxuICAgICAqIEEgYmluZCBwb2x5ZmlsbCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IHRoZSBiaW5kIG1ldGhvZC5cbiAgICAgKi9cbiAgICBpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYUFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmVG9CaW5kID0gdGhpcywgZk5PUCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIH0sIGZCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZlRvQmluZC5hcHBseSh0aGlzIGluc3RhbmNlb2YgZk5PUCAmJiBvVGhpc1xuICAgICAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICAgICAgOiBvVGhpcywgYUFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmTk9QLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgICAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG4gICAgICAgICAgICByZXR1cm4gZkJvdW5kO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgYSBoYXNoIHN0cmluZyBmcm9tIHRoZSBzdHJpbmcgYmVpbmcgcGFzc2VkIGluLiBJbiB0aGlzIGNhc2UgaXQgaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhc3RlZCBhcyBzdHJpbmcgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc3RyXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICB2YXIgaGFzaENvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIHN0ciA9IFN0cmluZyhzdHIpO1xuICAgICAgICAvLyBodHRwOi8vZXJseWNvZGVyLmNvbS80OS9qYXZhc2NyaXB0LWhhc2gtZnVuY3Rpb25zLXRvLWNvbnZlcnQtc3RyaW5nLWludG8taW50ZWdlci1oYXNoLVxuICAgICAgICB2YXIgY2hhcmFjdGVyO1xuICAgICAgICB2YXIgaGFzaCA9IG51bGw7XG4gICAgICAgIHZhciBzdHJMZW5ndGggPSBzdHIubGVuZ3RoO1xuICAgICAgICBpZiAoc3RyTGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm4gaGFzaDtcbiAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgc3RyTGVuZ3RoOyBpXzErKykge1xuICAgICAgICAgICAgY2hhcmFjdGVyID0gc3RyLmNoYXJDb2RlQXQoaV8xKTtcbiAgICAgICAgICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXJhY3RlcjtcbiAgICAgICAgICAgIGhhc2ggPSBoYXNoICYgaGFzaDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFN0cmluZyhNYXRoLmFicyhoYXNoKSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgalF1ZXJ5IGFkZEV2ZW50TGlzdGVuZXIgcGx1Z2luXG4gICAgICovXG4gICAgJGV2ZW50TGlzdGVuZXIuZm4uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHZhciBfY2FsbGJhY2s7XG4gICAgICAgIHZhciBfc2NvcGU7XG4gICAgICAgIHZhciBfaGFuZGxlcjtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV0gPSBfY2FsbGJhY2suYmluZChfc2NvcGUpO1xuICAgICAgICAgICAgICAgIHRoaXMub24odHlwZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IGRhdGE7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIHNlbGVjdG9yLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIHNlbGVjdG9yLCBkYXRhLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignalF1ZXJ5IGFkZEV2ZW50TGlzdGVuZXIgcGx1Z2luIHJlcXVpcmVzIGF0IGxlYXN0IDMgYXJndW1lbnRzLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGpRdWVyeSByZW1vdmVFdmVudExpc3RlbmVyIHBsdWdpblxuICAgICAqL1xuICAgICRldmVudExpc3RlbmVyLmZuLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgX2NhbGxiYWNrO1xuICAgICAgICB2YXIgX3Njb3BlO1xuICAgICAgICB2YXIgX2hhbmRsZXI7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZih0eXBlLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBfc2NvcGUgPSBzY29wZTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV07XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgc2VsZWN0b3IsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pRdWVyeSByZW1vdmVFdmVudExpc3RlbmVyIHBsdWdpbiByZXF1aXJlcyBhdCBsZWFzdCAzIGFyZ3VtZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSAkZXZlbnRMaXN0ZW5lcjtcbn0pO1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL3V0aWwvVXRpbCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBVdGlsXzEgPSByZXF1aXJlKCcuLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBjbGFzcyB0byBjcmVhdGUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoZSBzYW1lIENvbXBvbmVudCBDbGFzcyBmcm9tIGpRdWVyeSBvYmplY3QgdGhhdCBoYXMgb25lIG9yIG1vcmUgZWxlbWVudHMgaW4gaXQuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgQ29tcG9uZW50RmFjdG9yeVxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIENvbXBvbmVudEZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb21wb25lbnRGYWN0b3J5KCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbQ29tcG9uZW50RmFjdG9yeV0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBDb21wb25lbnRGYWN0b3J5IGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRha2VzIGEgalF1ZXJ5IG9iamVjdCB0aGF0IGhhcyBvbmUgb3IgbW9yZSBlbGVtZW50cyBpbiBpdCBhbmQgcGFzc2VzIGEgc2luZ2xlIGpRdWVyeSBlbGVtZW50IGludG8gdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBjbGFzcyB0aGF0IGlzIGFsc28gYmVpbmcgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcGFyYW0gJGVsZW1lbnQge2pRdWVyeX0gT25lIG9yIG1vcmUgalF1ZXJ5IHJlZmVyZW5jZWQgRE9NIGVsZW1lbnRzLlxuICAgICAgICAgKiBAcGFyYW0gQ29tcG9uZW50Q2xhc3Mge2FueX0gVGhlIGNsYXNzIHRoYXQgeW91IHdhbnQgaW5zdGFudGlhdGVkLlxuICAgICAgICAgKiBAcGFyYW0gW3Njb3BlPW51bGxdIHtEaXNwbGF5T2JqZWN0Q29udGFpbmVyfSBUaGlzIHNjb3BlIChwYXJlbnQgb2JqZWN0KSBpcyBuZWVkZWQgdG8gaW5zdGFudGlhdGUgdGhlIGNvbXBvbmVudC92aWV3IHdpdGggdGhlIHVzZSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lci9hZGRDaGlsZDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kLlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn0gUmV0dXJucyBhIGxpc3Qgb2YgaW5zdGFudGlhdGVkIGNvbXBvbmVudHMvdmlld3Mgc28geW91IGNhbiBtYW5hZ2UgdGhlbSB3aXRoaW4gdGhlIENsYXNzIHRoYXQgY3JlYXRlZCB0aGVtLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBDb21wb25lbnRGYWN0b3J5LmNyZWF0ZSgkKCcuanMtbGlzdCcpLCBTb21lQ2xhc3MsIHRoaXMpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29tcG9uZW50RmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAoJGVsZW1lbnRzLCBDb21wb25lbnRDbGFzcywgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZSA9PT0gdm9pZCAwKSB7IHNjb3BlID0gbnVsbDsgfVxuICAgICAgICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgICAgICAgIHZhciBjb21wb25lbnQ7XG4gICAgICAgICAgICB2YXIgJGVsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gJGVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB0eXBlcztcbiAgICAgICAgICAgIHZhciBjb21wb25lbnROYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgbGVuZ3RoOyBpXzErKykge1xuICAgICAgICAgICAgICAgICRlbGVtZW50ID0gJGVsZW1lbnRzLmVxKGlfMSk7XG4gICAgICAgICAgICAgICAgdHlwZXMgPSAkZWxlbWVudC5hdHRyKCdkYXRhLXNqcy10eXBlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnQgaWYgdGhlcmUgaXMgbm90IGEgJ2RhdGEtc2pzLXR5cGUnIGF0dHJpYnV0ZSBvbiB0aGUgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50ID0gQ29tcG9uZW50RmFjdG9yeS5fY3JlYXRlQ29tcG9uZW50KCRlbGVtZW50LCBDb21wb25lbnRDbGFzcywgc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVsc2UgaWYgdGhlcmUgaXMgYWxyZWFkeSBhICdkYXRhLXNqcy10eXBlJyBhdHRyaWJ1dGUgdGhlbiBnZXQgdGhlIHR5cGUocykuXG4gICAgICAgICAgICAgICAgICAgIHR5cGVzID0gdHlwZXMuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IFV0aWxfMS5kZWZhdWx0LmdldE5hbWUoQ29tcG9uZW50Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGNyZWF0ZSB0aGUgY29tcG9uZW50IGlmIHRoZSBjb21wb25lbnQgdHlwZSBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0LlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihjb21wb25lbnROYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCA9IENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIZWxwZXIgbWV0aG9kIHRvIGNyZWF0ZSB0aGUgY29tcG9uZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9jcmVhdGVDb21wb25lbnRcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIENvbXBvbmVudEZhY3RvcnkuX2NyZWF0ZUNvbXBvbmVudCA9IGZ1bmN0aW9uICgkZWxlbWVudCwgQ29tcG9uZW50Q2xhc3MsIHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gbmV3IENvbXBvbmVudENsYXNzKCRlbGVtZW50KTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBjbGFzcyBvYmplY3QgaGFzIHRoZSBzanNJZCBwcm9wZXJ0eSB0aGVuIEkgYW0gYXNzdW1pbmcgaXQgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIERpc3BsYXlPYmplY3QgY2xhc3MuXG4gICAgICAgICAgICBpZiAoc2NvcGUgIT09IG51bGwgJiYgY29tcG9uZW50Lmhhc093blByb3BlcnR5KCdzanNJZCcpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgc2NvcGUuYWRkQ2hpbGQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb21wb25lbnRGYWN0b3J5O1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudEZhY3Rvcnk7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIC8qKlxuICAgICAqIFRoZSBTdHJpbmdVdGlsLi4uXG4gICAgICpcbiAgICAgKiBAY2xhc3MgU3RyaW5nVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFN0cmluZ1V0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBTdHJpbmdVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbU3RyaW5nVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBTdHJpbmdVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHMgdGhlIGV4dGVuc2lvbiBuYW1lIG9mZiB0aGUgc3RyaW5nIGJlaW5nIHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRFeHRlbnNpb25cbiAgICAgICAgICogQHBhcmFtIGZpbGVuYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSB3aXRoRG90IHtib29sZWFufSBJZiB5b3Ugd2FudCB0aGUgcGVyaW9kIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBleHRlbnNpb24gbmFtZS5cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5nZXRFeHRlbnNpb24oJ2ZpbGUuZXhlJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2V4ZSdcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmdldEV4dGVuc2lvbignZmlsZS5leGUnLCB0cnVlKTtcbiAgICAgICAgICogICAgICAvLyAnLmV4ZSdcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwuZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24gKGZpbGVuYW1lLCB3aXRoRG90KSB7XG4gICAgICAgICAgICBpZiAod2l0aERvdCA9PT0gdm9pZCAwKSB7IHdpdGhEb3QgPSBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIG51bSA9ICh3aXRoRG90ID09PSB0cnVlKSA/IDAgOiAxO1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVuYW1lLnNsaWNlKGZpbGVuYW1lLmxhc3RJbmRleE9mKCcuJykgKyBudW0sIGZpbGVuYW1lLmxlbmd0aCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIHNlbnRlbmNlIGNhc2Ugc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvU2VudGVuY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gW3NlcGFyYXRvcl0ge3N0cmluZ30gQ2FuIGJlIGFueSBzdHJpbmcgeW91IHdhbnQgdG8gdXNlIGFzIGEgc2VwYXJhdG9yLlxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvU2VudGVuY2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUgZG93biBieSB0aGUgcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICctJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUtZG93bi1ieS10aGUtcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICdfJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmVfZG93bl9ieV90aGVfcml2ZXInXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIsICcvJyk7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmUvZG93bi9ieS90aGUvcml2ZXInXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRvU2VudGVuY2UgPSBmdW5jdGlvbiAoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIGlmIChzZXBhcmF0b3IgPT09IHZvaWQgMCkgeyBzZXBhcmF0b3IgPSAnICc7IH1cbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXFxkKS9nLCAnJDEgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFthLXpdKD89W0EtWl0pKS9nLCAnJDEgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15hLXpBLVowLTkgXS9nLCAnICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eIHwgJC9nLCAnJylcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csIHNlcGFyYXRvcik7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhIGNhbWVsIGNhc2Ugc3RyaW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvQ2FtZWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b0NhbWVsQ2FzZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiKTtcbiAgICAgICAgICogICAgICAvLyAnbGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b0NhbWVsQ2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdVdGlsLnRvU2VudGVuY2Uoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8gKFxcdykvZywgZnVuY3Rpb24gKF8sICQxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQxLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgaHlwaGVuIHN0cmluZyB0byBhIHBhc2NhbCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b1Bhc2NhbENhc2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvUGFzY2FsQ2FzZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiKTtcbiAgICAgICAgICogICAgICAvLyAnTGl2ZURvd25CeVRoZVJpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b1Bhc2NhbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b0NhbWVsQ2FzZShzdHIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL15bYS16QS1aXS8sIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBjb25zdGFudCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0NvbnN0YW50Q2FzZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9Db25zdGFudENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ0xJVkVfRE9XTl9CWV9USEVfUklWRVInXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRvQ29uc3RhbnRDYXNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwudG9TZW50ZW5jZShzdHIsICdfJylcbiAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYSB1bml2ZXJzYWxseSB1bmlxdWUgaWRlbnRpZmllci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVVVUlEXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuY3JlYXRlVVVJRCgpO1xuICAgICAgICAgKiAgICAgIC8vICdhOTVkNzEzNC0zMzQyLTQwMDEtYmNlYS1jYzAzNzFiNzBkZWMnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmNyZWF0ZVVVSUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdXVpZCA9ICgneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4JykucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICAgIHZhciByID0gTWF0aC5yYW5kb20oKSAqIDE2IHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IChjID09ICd4JykgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcXVlcnlTdHJpbmdUb09iamVjdFxuICAgICAgICAgKiBAcGFyYW0gcXVlcnlTdHJpbmcge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFt1c2VQYXJzZUZsb2F0PWZhbHNlXSB7Ym9vbGVhbn0gSWYgdHJ1ZSBjb252ZXJ0cyBzdHJpbmdzIHRvIG51bWJlcnMuXG4gICAgICAgICAqIEByZXR1cm5zIHtPYmplY3R8TnVsbH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0KCc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1tYWxlJyk7XG4gICAgICAgICAqICAgICAgLy8ge25hbWU6ICdSb2JlcnQnLCBhZ2U6ICcyMycsIGdlbmRlcjogJ21hbGUnfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucXVlcnlTdHJpbmdUb09iamVjdCgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScsIHRydWUpO1xuICAgICAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAyMywgZ2VuZGVyOiAnbWFsZSd9XG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnF1ZXJ5U3RyaW5nVG9PYmplY3QgPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcsIHVzZVBhcnNlRmxvYXQpIHtcbiAgICAgICAgICAgIGlmICh1c2VQYXJzZUZsb2F0ID09PSB2b2lkIDApIHsgdXNlUGFyc2VGbG9hdCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge307XG4gICAgICAgICAgICB2YXIgdGVtcCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgc3RyID0gcXVlcnlTdHJpbmcuc3Vic3RyaW5nKHF1ZXJ5U3RyaW5nLmluZGV4T2YoJz8nKSArIDEpO1xuICAgICAgICAgICAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNwbGl0IGludG8ga2V5L3ZhbHVlIHBhaXJzXG4gICAgICAgICAgICB2YXIgcXVlcmllcyA9IHN0ci5zcGxpdCgnJicpO1xuICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgYXJyYXkgb2Ygc3RyaW5ncyBpbnRvIGFuIG9iamVjdFxuICAgICAgICAgICAgdmFyIGxlbiA9IHF1ZXJpZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMDsgaV8xIDwgbGVuOyBpXzErKykge1xuICAgICAgICAgICAgICAgIHRlbXAgPSBxdWVyaWVzW2lfMV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSAodXNlUGFyc2VGbG9hdCA9PT0gdHJ1ZSAmJiBpc05hTihwYXJzZUZsb2F0KHRlbXBbMV0pKSA9PT0gZmFsc2UpID8gcGFyc2VGbG9hdCh0ZW1wWzFdKSA6IHRlbXBbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGFsbCB3aGl0ZXNwYWNlIGZyb20gdGhlIHN0cmluZyBwYXNzZWQgaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsV2hpdGVzcGFjZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzdHIgPSAnICAgYSBiICAgIGMgZCBlIGYgZyAnO1xuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucmVtb3ZlQWxsV2hpdGVzcGFjZShzdHIpO1xuICAgICAgICAgKiAgICAgIC8vICdhYmNkZWZnJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5yZW1vdmVBbGxXaGl0ZXNwYWNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMrL2csICcnKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc3RyID0gJyAgIGEgYiAgICBjIGQgZSBmIGcgJztcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2Uoc3RyKTtcbiAgICAgICAgICogICAgICAvLyAnYSBiICAgIGMgZCBlIGYgZydcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvKF5cXHMrfFxccyskKS9nLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRydW5jYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBsZW5ndGgge2ludH1cbiAgICAgICAgICogQHBhcmFtIGluZGljYXRvciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRydW5jYXRlKCdSb2JlcnQgaXMgY29vbCBhbmQgaGUgbGlrZXMgYnJ1c2NoZXR0YS4nLCAxNCkpO1xuICAgICAgICAgKiAgICAgIC8vICdSb2JlcnQgaXMgY29vbC4uLidcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRydW5jYXRlKCdSb2JlcnQgaXMgY29vbCBhbmQgaGUgbGlrZXMgYnJ1c2NoZXR0YS4nLCAxNCwgJyEhIScpKTtcbiAgICAgICAgICogICAgICAvLyAnUm9iZXJ0IGlzIGNvb2whISEnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnRydW5jYXRlID0gZnVuY3Rpb24gKHRleHQsIGxlbmd0aCwgaW5kaWNhdG9yKSB7XG4gICAgICAgICAgICBpZiAoaW5kaWNhdG9yID09PSB2b2lkIDApIHsgaW5kaWNhdG9yID0gJy4uLic7IH1cbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0LnN1YnN0cigwLCBsZW5ndGgpICsgaW5kaWNhdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVwbGFjZXMgZWFjaCBmb3JtYXQgaXRlbSBpbiBhIHNwZWNpZmllZCBzdHJpbmcgd2l0aCB0aGUgdGV4dCBlcXVpdmFsZW50IG9mIGEgY29ycmVzcG9uZGluZyBvYmplY3QncyB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBmb3JtYXRcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gLi4ucmVzdCB7QXJyYXkuPGFueT59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuZm9ybWF0KCdSb2JlcnQgaXMgezB9LiBWZXJ5IHswfSBhbmQgezF9IScsICdjb29sJywgJ3NtYXJ0Jyk7XG4gICAgICAgICAqICAgICAgLy8gJ1JvYmVydCBpcyBjb29sLiBWZXJ5IGNvb2wgYW5kIHNtYXJ0ISdcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwuZm9ybWF0ID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdFtfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSByZXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHN0cjtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMiA9IDA7IGlfMiA8IGxlbmd0aDsgaV8yKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgnXFxcXHsnICsgaV8yICsgJ1xcXFx9JywgJ2dtJyk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlZywgcmVzdFtpXzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFVwZGF0ZXMgYSB2YWx1ZSBpbiB0aGUgcXVlcnkgc3RyaW5nIGJ5IGl0cyBrZXkgbmFtZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBwYXJhbVJlcGxhY2VcbiAgICAgICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nXG4gICAgICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHZvaWR9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5wYXJhbVJlcGxhY2UoJz9uYW1lPVJvYmVydCZhZ2U9MjMmZ2VuZGVyPW1hbGUnLCAnZ2VuZGVyJywgJ2ZlbWFsZScpO1xuICAgICAgICAgKiAgICAgIC8vICc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1mZW1hbGUnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnBhcmFtUmVwbGFjZSA9IGZ1bmN0aW9uIChxdWVyeVN0cmluZywgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEZpbmQgdGhlIHBhcmFtIHdpdGggcmVnZXhcbiAgICAgICAgICAgIC8vIEdyYWIgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiB0aGUgcmV0dXJuZWQgc3RyaW5nIChzaG91bGQgYmUgPyBvciAmKVxuICAgICAgICAgICAgLy8gUmVwbGFjZSBvdXIgaHJlZiBzdHJpbmcgd2l0aCBvdXIgbmV3IHZhbHVlLCBwYXNzaW5nIG9uIHRoZSBuYW1lIGFuZCBkZWxpbWl0ZXJcbiAgICAgICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAoJ1tcXFxcPyZdJyArIG5hbWUgKyAnPShbXiYjXSopJyk7XG4gICAgICAgICAgICB2YXIgZGVsaW1pdGVyID0gcmUuZXhlYyhxdWVyeVN0cmluZylbMF0uY2hhckF0KDApO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nLnJlcGxhY2UocmUsIGRlbGltaXRlciArIG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBTdHJpbmdVdGlsO1xuICAgIH0pKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFN0cmluZ1V0aWw7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL1N0cmluZ1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgU3RyaW5nVXRpbF8xID0gcmVxdWlyZSgnLi9TdHJpbmdVdGlsJyk7XG4gICAgLyoqXG4gICAgICogQSBoZWxwZXIgY2xhc3MgdG8gcHJvdmlkZSBhIGNvbnZlbmllbnQgYW5kIGNvbnNpc3RlbnQgd2F5IHRvIHJlbmRlciB0ZW1wbGF0ZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgVGVtcGxhdGVGYWN0b3J5XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdXRpbFxuICAgICAqIEByZXF1aXJlcyBTdHJpbmdVdGlsXG4gICAgICogQHJlcXVpcmVzIEhhbmRsZWJhcnNcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFRlbXBsYXRlRmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRlbXBsYXRlRmFjdG9yeSgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RlbXBsYXRlRmFjdG9yeV0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBUZW1wbGF0ZUZhY3RvcnkgY2xhc3MgYmVjYXVzZSBpdCBpcyBhIHN0YXRpYyBjbGFzcy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIHRlbXBsYXRlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAgICAgKiBAcGFyYW0gdGVtcGxhdGVQYXRoIHthbnl9XG4gICAgICAgICAqIEBwYXJhbSBbZGF0YT1hbnldXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUoJ3RlbXBsYXRlTmFtZScsIHtzb21lOiAnZGF0YSd9KTtcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5jcmVhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVQYXRoLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PT0gdm9pZCAwKSB7IGRhdGEgPSBudWxsOyB9XG4gICAgICAgICAgICAvL0NoZWNrcyB0aGUgZmlyc3QgY2hhcmFjdGVyIHRvIHNlZSBpZiBpdCBpcyBhICcuJyBvciAnIycuXG4gICAgICAgICAgICB2YXIgcmVnZXggPSAvXihbLiNdKSguKykvO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uVGVtcGxhdGUgPSB0eXBlb2YgdGVtcGxhdGVQYXRoID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgdmFyIGlzQ2xhc3NPcklkTmFtZSA9IHJlZ2V4LnRlc3QodGVtcGxhdGVQYXRoKTtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlUGF0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGlzQ2xhc3NPcklkTmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBwb3VuZCBzaWduIGZyb20gdGhlIGlkIG5hbWUuXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoID0gdGVtcGxhdGVQYXRoLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbFN0cmluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRlbXBsYXRlUGF0aCkuaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGh0bWxTdHJpbmcgPSBTdHJpbmdVdGlsXzEuZGVmYXVsdC5yZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlKGh0bWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgIGlmIChUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVFbmdpbmUgPT0gVGVtcGxhdGVGYWN0b3J5LlVOREVSU0NPUkUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVW5kZXJzY29yZSBUZW1wbGF0ZTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlTWV0aG9kID0gd2luZG93WydfJ10udGVtcGxhdGUoaHRtbFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVNZXRob2QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBIYW5kbGViYXJzIFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZCA9IEhhbmRsZWJhcnMuY29tcGlsZShodG1sU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZU1ldGhvZChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVPYmogPSB3aW5kb3dbVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlTmFtZXNwYWNlXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRlbXBsYXRlT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybnMgbnVsbCBiZWNhdXNlIHRoZSB0ZW1wbGF0ZSBuYW1lc3BhY2UgaXMgbm90IGZvdW5kLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlRnVuY3Rpb24gPSB0ZW1wbGF0ZU9ialt0ZW1wbGF0ZVBhdGhdO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0ZW1wbGF0ZVBhdGggZ2V0cyBhIGZ1bmN0aW9uIHN0b3JhZ2UgaW4gdGhlIGFzc29jaWF0aXZlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYWxsIHRoZSBmdW5jdGlvbiBieSBwYXNzaW5nIGluIHRoZSBkYXRhIGFzIHRoZSBhcmd1bWVudC5cbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZUZ1bmN0aW9uKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgY29uc3RhbnQgdmFsdWUgZm9yIHVzaW5nIFVuZGVyc2NvcmUgb3IgTG9kYXNoIHRlbXBsYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFVOREVSU0NPUkVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZmluYWxcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LlVOREVSU0NPUkUgPSAndW5kZXJzY29yZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNvbnN0YW50IHZhbHVlIGZvciB1c2luZyBIYW5kbGViYXJzIHRlbXBsYXRlcy4gVGhpcyBpcyB0aGUgZGVmYXVsdCB0ZW1wbGF0ZSBlbmdpbmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBIQU5ETEVCQVJTXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGZpbmFsXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTID0gJ2hhbmRsZWJhcnMnO1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgdGVtcGxhdGUgZW5naW5lIHR5cGUgZm9yIHRoaXMgVGVtcGxhdGVGYWN0b3J5IGNsYXNzLiBUaGUgZGVmYXVsdCBpcyBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSU1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVFbmdpbmVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlNcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVFbmdpbmUgPSBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSUztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBnbG9iYWwgbmFtZXNwYWNlIGZvciBwcmUtY29tcGlsZWQgdGVtcGxhdGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgdGVtcGxhdGVOYW1lc3BhY2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQGRlZmF1bHQgJ0pTVCdcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkudGVtcGxhdGVOYW1lc3BhY2UgPSAnSlNUJztcbiAgICAgICAgcmV0dXJuIFRlbXBsYXRlRmFjdG9yeTtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBUZW1wbGF0ZUZhY3Rvcnk7XG59KTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4uL2V2ZW50L0V2ZW50RGlzcGF0Y2hlcicsICcuLi9ldmVudC9UaW1lckV2ZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEV2ZW50RGlzcGF0Y2hlcl8xID0gcmVxdWlyZSgnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJyk7XG4gICAgdmFyIFRpbWVyRXZlbnRfMSA9IHJlcXVpcmUoJy4uL2V2ZW50L1RpbWVyRXZlbnQnKTtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IFRpbWVyIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgZGVsYXkgYW5kIHJlcGVhdENvdW50IHN0YXRlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBUaW1lclxuICAgICAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEByZXF1aXJlcyBUaW1lckV2ZW50XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIFRpbWVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFRpbWVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBUaW1lcihkZWxheSwgcmVwZWF0Q291bnQpIHtcbiAgICAgICAgICAgIGlmIChyZXBlYXRDb3VudCA9PT0gdm9pZCAwKSB7IHJlcGVhdENvdW50ID0gMDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBzZXRJbnRlcnZhbCBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF90aW1lclxuICAgICAgICAgICAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdGhlIHRpbWVyIGhhcyBmaXJlZCBzaW5jZSBpdCBzdGFydGVkIGF0IHplcm8uIElmIHRoZSB0aW1lciBoYXMgYmVlbiByZXNldCwgb25seSB0aGUgZmlyZXMgc2luY2UgdGhlIHJlc2V0IGFyZSBjb3VudGVkLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjdXJyZW50Q291bnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtpbnR9XG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb3VudCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBkZWxheSwgaW4gbWlsbGlzZWNvbmRzLCBiZXR3ZWVuIHRpbWVyIGV2ZW50cy4gSWYgeW91IHNldCB0aGUgZGVsYXkgaW50ZXJ2YWwgd2hpbGUgdGhlIHRpbWVyIGlzIHJ1bm5pbmcsIHRoZSB0aW1lciB3aWxsIHJlc3RhcnQgYXQgdGhlIHNhbWUgcmVwZWF0Q291bnQgaXRlcmF0aW9uLlxuICAgICAgICAgICAgICogPHN0cm9uZz5Ob3RlOjwvc3Ryb25nPiBBIGRlbGF5IGxvd2VyIHRoYW4gMjAgbWlsbGlzZWNvbmRzIGlzIG5vdCByZWNvbW1lbmRlZC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgZGVsYXlcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX2RlbGF5ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgdGltZXIgaXMgc2V0IHRvIHJ1bi4gSWYgdGhlIHJlcGVhdCBjb3VudCBpcyBzZXQgdG8gMCwgdGhlIHRpbWVyIGNvbnRpbnVlcyBpbmRlZmluaXRlbHkuIElmIHRoZSByZXBlYXQgY291bnQgaXMgbm9uemVybywgdGhlIHRpbWVyIHJ1bnMgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgdGltZXMuIElmIHJlcGVhdENvdW50IGlzIHNldCB0byBhIHRvdGFsIHRoYXQgaXMgdGhlIHNhbWUgb3IgbGVzcyB0aGVuIGN1cnJlbnRDb3VudCB0aGUgdGltZXIgc3RvcHMgYW5kIHdpbGwgbm90IGZpcmUgYWdhaW4uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHJlcGVhdENvdW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLl9yZXBlYXRDb3VudCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSB0aW1lcidzIGN1cnJlbnQgc3RhdGU7IHRydWUgaWYgdGhlIHRpbWVyIGlzIHJ1bm5pbmcsIG90aGVyd2lzZSBmYWxzZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcnVubmluZ1xuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kZWxheSA9IGRlbGF5O1xuICAgICAgICAgICAgdGhpcy5fcmVwZWF0Q291bnQgPSByZXBlYXRDb3VudDtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRDb3VudCA9IHJlcGVhdENvdW50O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdGhlIHRpbWVyIGhhcyBmaXJlZCBzaW5jZSBpdCBzdGFydGVkIGF0IHplcm8uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q3VycmVudENvdW50XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdGhlIHRpbWVyIGhhcyBmaXJlZCBzaW5jZSBpdCBzdGFydGVkIGF0IHplcm8uXG4gICAgICAgICAqL1xuICAgICAgICBUaW1lci5wcm90b3R5cGUuZ2V0Q3VycmVudENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRDb3VudDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGRlbGF5IHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldERlbGF5XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGRlbGF5IHRpbWUgaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICAgKi9cbiAgICAgICAgVGltZXIucHJvdG90eXBlLmdldERlbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlbGF5O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgZGVsYXksIGluIG1pbGxpc2Vjb25kcywgYmV0d2VlbiB0aW1lciBldmVudHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc2V0RGVsYXlcbiAgICAgICAgICogQHBhcmFtIHZhbHVlIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBUaW1lci5wcm90b3R5cGUuc2V0RGVsYXkgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5fZGVsYXkgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSB0aW1lciBpcyBzZXQgdG8gcnVuLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFJlcGVhdENvdW50XG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgdGltZXIgaXMgc2V0IHRvIHJ1bi5cbiAgICAgICAgICovXG4gICAgICAgIFRpbWVyLnByb3RvdHlwZS5nZXRSZXBlYXRDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXBlYXRDb3VudDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSB0aW1lciBpcyBzZXQgdG8gcnVuLiBJZiB0aGUgcmVwZWF0IGNvdW50IGlzIHNldCB0byAwLCB0aGUgdGltZXIgY29udGludWVzIGluZGVmaW5pdGVseS4gSWYgdGhlIHJlcGVhdCBjb3VudCBpcyBub256ZXJvLCB0aGUgdGltZXIgcnVucyB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB0aW1lcy4gSWYgcmVwZWF0Q291bnQgaXMgc2V0IHRvIGEgdG90YWwgdGhhdCBpcyB0aGUgc2FtZSBvciBsZXNzIHRoZW4gY3VycmVudENvdW50IHRoZSB0aW1lciBzdG9wcyBhbmQgd2lsbCBub3QgZmlyZSBhZ2Fpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzZXRSZXBlYXRDb3VudFxuICAgICAgICAgKiBAcGFyYW0gdmFsdWUge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIFRpbWVyLnByb3RvdHlwZS5zZXRSZXBlYXRDb3VudCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9yZXBlYXRDb3VudCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudENvdW50ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3BzIHRoZSB0aW1lciwgaWYgaXQgaXMgcnVubmluZywgYW5kIHNldHMgdGhlIGN1cnJlbnRDb3VudCBwcm9wZXJ0eSBiYWNrIHRvIDAsIGxpa2UgdGhlIHJlc2V0IGJ1dHRvbiBvZiBhIHN0b3B3YXRjaC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZXNldFxuICAgICAgICAgKi9cbiAgICAgICAgVGltZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50Q291bnQgPSB0aGlzLl9yZXBlYXRDb3VudDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnRzIHRoZSB0aW1lciwgaWYgaXQgaXMgbm90IGFscmVhZHkgcnVubmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzdGFydFxuICAgICAgICAgKi9cbiAgICAgICAgVGltZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9kZWNyZW1lbnRDb3VudGVyKCk7XG4gICAgICAgICAgICB9LCB0aGlzLl9kZWxheSk7XG4gICAgICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgdGltZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3RvcFxuICAgICAgICAgKi9cbiAgICAgICAgVGltZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3RpbWVyKTtcbiAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9kZWNyZW1lbnRDb3VudGVyXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIFRpbWVyLnByb3RvdHlwZS5fZGVjcmVtZW50Q291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50Q291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VycmVudENvdW50LS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fZGVsYXkgJiYgdGhpcy5fY3VycmVudENvdW50ID4gMCB8fCB0aGlzLl9yZXBlYXRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgVGltZXJFdmVudF8xLmRlZmF1bHQoVGltZXJFdmVudF8xLmRlZmF1bHQuVElNRVIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgVGltZXJFdmVudF8xLmRlZmF1bHQoVGltZXJFdmVudF8xLmRlZmF1bHQuVElNRVIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IFRpbWVyRXZlbnRfMS5kZWZhdWx0KFRpbWVyRXZlbnRfMS5kZWZhdWx0LlRJTUVSX0NPTVBMRVRFKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBFdmVudERpc3BhdGNoZXIuZGVzdHJveVxuICAgICAgICAgKi9cbiAgICAgICAgVGltZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVGltZXI7XG4gICAgfSkoRXZlbnREaXNwYXRjaGVyXzEuZGVmYXVsdCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFRpbWVyO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBBIFV0aWxpdHkgY2xhc3MgdGhhdCBoYXMgc2V2ZXJhbCBzdGF0aWMgbWV0aG9kcyB0byBhc3Npc3QgaW4gZGV2ZWxvcG1lbnQuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gSWYgYSBwcmVmaXggaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB0byBpdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmlxdWVJZFxuICAgICAgICAgKiBAcGFyYW0gW3ByZWZpeF0ge3N0cmluZ30gVGhlIHN0cmluZyB2YWx1ZSB1c2VkIGZvciB0aGUgcHJlZml4LlxuICAgICAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgcHJvcGVydHkgPSBVdGlsLnVuaXF1ZUlkKCk7XG4gICAgICAgICAqICAgICAgLy8gMVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoJ3ByZWZpeE5hbWVfJyk7XG4gICAgICAgICAqICAgICAgLy8gcHJlZml4TmFtZV8xXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZUlkID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICAgICAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhwcmVmaXggKyBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IEEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyB5b3Ugd2FudCB0byByZW1vdmUgZnJvbSB0aGUgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIHRoZSBvYmplY3QgcGFzc2VkIGluIHdpdGhvdXQgdGhlIHJlbW92ZWQgdGhlIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmosIFsncGhvbmUnLCAnZ2VuZGVyJ10pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIHsgbmFtZTogJ1JvYmVydCcgfVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gSWYgcHJvcGVydGllcyBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0IGFuIGFycmF5IG9iamVjdC5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBvYmplY3QgcHJvcGVydGllcy5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5IGlzIGEgcHJvcGVydHkgYW5kIG5vdCBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlXzEgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGFuIEFycmF5LlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVfMSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIEFycmF5IGFuZCBjYWxsIHRoZSBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCBtZXRob2Qgb24gZWFjaCBvYmplY3QgaW4gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gdmFsdWVfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoYXJyYXlbaW5kZXhdLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZV8xIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZV8xLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGlzdEluZGV4IGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5KHByb3BlcnR5IG5hbWUpIGVxdWFscyB0aGUgcHJvcGVydHkgbmFtZSBpbiB0aGUgbGlzdCBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBsaXN0W2xpc3RJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbmFtZVByb3BlcnR5T25PYmplY3RcbiAgICAgICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICAgICAqIEBwYXJhbSBvbGROYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBuZXdOYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgb2JqID0geyBuYW1lOiAnUm9iZXJ0JywgZ2VuZGVyOiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnLCBzZXg6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICovXG4gICAgICAgIFV0aWwucmVuYW1lUHJvcGVydHlPbk9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciB0aGUgb2xkIHByb3BlcnR5IG5hbWUgdG8gYXZvaWQgYSBSZWZlcmVuY2VFcnJvciBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbbmV3TmFtZV0gPSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlcyBhIGNsb25lIG9mIGFuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAgICAgKiBAcGFyYW0gb2JqIHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHRvIGNsb25lLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgY2xvbmUgb2JqZWN0IG9mIHRoZSBvbmUgcGFzc2VkIGluLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZnVuY3Rpb25hbC1qYXZhc2NyaXB0L1xuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZGVlcC1jb3B5LWphdmFzY3JpcHQvXG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChudWxsID09IG9iaiB8fCAnb2JqZWN0JyAhPSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBEYXRlXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFRpbWUob2JqLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgQXJyYXlcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV8xXSA9IFV0aWwuY2xvbmUob2JqW2lfMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgT2JqZWN0XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1V0aWxdIFVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG51bWJlciB0byBhIGJvb2xlYW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9Cb29sZWFuXG4gICAgICAgICAqIEBwYXJhbSBzdHJOdW0ge3N0cmluZ3xudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLnRvQm9vbGVhbihcIlRSVUVcIik7XG4gICAgICAgICAqICAgICAgLy8gdHJ1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKDApO1xuICAgICAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4odW5kZWZpbmVkKTtcbiAgICAgICAgICogICAgICAvLyBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC50b0Jvb2xlYW4gPSBmdW5jdGlvbiAoc3RyTnVtKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAodHlwZW9mIHN0ck51bSA9PT0gJ3N0cmluZycpID8gc3RyTnVtLnRvTG93ZXJDYXNlKCkgOiBzdHJOdW07XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXROYW1lXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiBvciBvYmplY3QuXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShzb21lQ2xhc3MpOyAgICAgICAgICAgIC8vICdTb21lQ2xhc3MnXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uIFRlc3QoKXt9KTsgICAgLy8gJ1Rlc3QnXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uICgpe30pOyAgICAgICAgLy8gJ2Fub255bW91cydcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuZ2V0TmFtZSA9IGZ1bmN0aW9uIChjbGFzc09iamVjdCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgY2xhc3NPYmplY3Q7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvbiAoW15cXChdKykvO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gY2xhc3NPYmplY3QuY29uc3RydWN0b3IudG9TdHJpbmcoKS5tYXRjaChmdW5jTmFtZVJlZ2V4KTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdHNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGVsc2UgY29kZSBpcyBtYWlubHkgZm9yIEludGVybmV0IEV4cGxvcmUuXG4gICAgICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gZXhwbGFpbiB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IGlzRnVuY3Rpb24gJiYgKChjbGFzc09iamVjdC5uYW1lICYmIFsnJywgY2xhc3NPYmplY3QubmFtZV0pIHx8IGNsYXNzT2JqZWN0LnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCkpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBuYW1lXzFbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgZGVib3VuY2VkIHZlcnNpb24gb2YgdGhlIHBhc3NlZCBmdW5jdGlvbiB3aGljaCB3aWxsIHBvc3Rwb25lIGl0cyBleGVjdXRpb24gdW50aWwgYWZ0ZXJcbiAgICAgICAgICogd2FpdCBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgaXQgd2FzIGludm9rZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGVib3VuY2VcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgKiBAcGFyYW0gaW1tZWRpYXRlIHtib29sZWFufSBQYXNzIHRydWUgZm9yIHRoZSBpbW1lZGlhdGUgcGFyYW1ldGVyIHRvIGNhdXNlIGRlYm91bmNlIHRvIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZSBsZWFkaW5nIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHdhaXQgaW50ZXJ2YWwuIFVzZWZ1bCBpbiBjaXJjdW1zdGFuY2VzIGxpa2UgcHJldmVudGluZyBhY2NpZGVudGFsIGRvdWJsZS1jbGlja3Mgb24gYSBcInN1Ym1pdFwiIGJ1dHRvbiBmcm9tIGZpcmluZyBhIHNlY29uZCB0aW1lLlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2tTY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmRlYm91bmNlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB3YWl0LCBpbW1lZGlhdGUsIGNhbGxiYWNrU2NvcGUpIHtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHZhciBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW1tZWRpYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrU2NvcGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB3YWl0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBkZWJvdW5jZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICAgICAqIEBwYXJhbSBkZXJpdmVkQ3RvciB7YW55fVxuICAgICAgICAgKiBAcGFyYW0gYmFzZUN0b3JzIHthbnl9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgICAgICAgIGNsYXNzIEZsaWVzIHtcbiAgICAgICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0lzIGl0IGEgYmlyZD8gSXMgaXQgYSBwbGFuZT8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdNeSBzcGlkZXItc2Vuc2UgaXMgdGluZ2xpbmcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgY2xhc3MgSG9yc2VmbHlXb21hbiBpbXBsZW1lbnRzIENsaW1icywgRmxpZXMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYjogKCkgPT4gdm9pZDtcbiAgICAgICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBVdGlsLmFwcGx5TWl4aW5zKEhvcnNlZmx5V29tYW4sIFtDbGltYnMsIEZsaWVzXSk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgICAgIGJhc2VDdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChiYXNlQ3Rvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdW5pcXVlXG4gICAgICAgICAqIEBwYXJhbSBsaXN0IHtBcnJheS48YW55Pn0gVGhlIGFycmF5IHlvdSB3YW50IHRvIHVzZSB0byBnZW5lcmF0ZSB0aGUgdW5pcXVlIGFycmF5LlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICB2YXIgdW5pcXVlTGlzdCA9IGxpc3QucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmRleE9mKGN1cnJlbnRWYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVMaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGNvdW50IGZvciB0aGUgdW5pcXVlSWQgbWV0aG9kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLl9pZENvdW50ZXIgPSAwO1xuICAgICAgICByZXR1cm4gVXRpbDtcbiAgICB9KSgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBVdGlsO1xufSk7XG4iXX0=
