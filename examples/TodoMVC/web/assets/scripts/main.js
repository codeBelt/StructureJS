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

var _structurejsControllerRouter = require('structurejs/controller/Router');

var _structurejsControllerRouter2 = _interopRequireDefault(_structurejsControllerRouter);

var _structurejsUtilStringUtil = require('structurejs/util/StringUtil');

var _structurejsUtilStringUtil2 = _interopRequireDefault(_structurejsUtilStringUtil);

var _collectionsListItemCollection = require('./collections/ListItemCollection');

var _collectionsListItemCollection2 = _interopRequireDefault(_collectionsListItemCollection);

var _modelsListItemModel = require('./models/ListItemModel');

var _modelsListItemModel2 = _interopRequireDefault(_modelsListItemModel);

var _viewsComponentsListItemComponent = require('./views/components/ListItemComponent');

var _viewsComponentsListItemComponent2 = _interopRequireDefault(_viewsComponentsListItemComponent);

var _viewsFooterView = require('./views/FooterView');

var _viewsFooterView2 = _interopRequireDefault(_viewsFooterView);

var _constantsKey = require('./constants/Key');

var _constantsKey2 = _interopRequireDefault(_constantsKey);

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
        this._listItemCollection = null;
        this._$addTodoInput = null;
        this._$markAllCompleteCheckbox = null;
        this._todoListContainer = null;
        this._$mainView = null;
        this._footerView = null;

        this._onCreateTodo = function (event) {
            var todoText = this._$addTodoInput.val().trim();

            if (event.which === _constantsKey2['default'].ENTER && todoText != '') {
                var baseModel = new _modelsListItemModel2['default']({ text: todoText });
                baseModel.id = _structurejsUtilStringUtil2['default'].createUUID();
                var childItem = new _viewsComponentsListItemComponent2['default'](baseModel);

                this._listItemCollection.add(baseModel);
                this._todoListContainer.addChild(childItem);
                this._$addTodoInput.val('');
            }

            this.layout();
        };

        this._onAllCompleteChange = function (event) {
            var $target = $(event.target);

            var listItemComponent = undefined;
            if ($target.prop("checked") === true) {
                for (var i = 0; i < this._todoListContainer.numChildren; i++) {
                    listItemComponent = this._todoListContainer.getChildAt(i);
                    listItemComponent.setCompleted();
                }
            } else {
                for (var j = 0; j < this._todoListContainer.numChildren; j++) {
                    listItemComponent = this._todoListContainer.getChildAt(j);
                    listItemComponent.setUnCompleted();
                }
            }
        };

        this._onItemRemove = function (event) {
            var listItemComponent = event.target;
            var listItemModel = listItemComponent.model;

            this._listItemCollection.remove(listItemModel);
            this._todoListContainer.removeChild(listItemComponent);

            this.layout();
        };

        this._onItemChange = function (event) {
            this._listItemCollection.save();

            this.layout();
        };

        this._onLoadedItems = function (event) {
            var items = this._listItemCollection.models;
            var length = items.length;

            // Create ListItemComponent view items from the stored ListItemModel  Base Models.
            for (var i = 0; i < length; i++) {
                var childItem = new _viewsComponentsListItemComponent2['default'](items[i]);
                this._todoListContainer.addChild(childItem);
            }

            // When the app loads we need to check if all stored items are all completed or not.
            var isAllCompleted = this._listItemCollection.length === this._listItemCollection.getCompletedCount();
            this._$markAllCompleteCheckbox.prop('checked', isAllCompleted);

            // Setup the router/deeplink handlers
            _structurejsControllerRouter2['default'].add('/active/', this._onActiveHandler.bind(this));
            _structurejsControllerRouter2['default'].add('/completed/', this._onCompletedHandler.bind(this));
            _structurejsControllerRouter2['default'].add('', this._onDefaultHandler.bind(this));
            _structurejsControllerRouter2['default'].start();

            this.layout();
        };

        this._onClearCompleted = function (event) {
            var listItemModel = undefined;
            var listItemComponent = undefined;

            for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemModel = listItemComponent.model;

                if (listItemModel.isComplete === true) {
                    this._todoListContainer.removeChild(listItemComponent);
                    this._listItemCollection.remove(listItemModel);
                }
            }

            this.layout();
        };
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(App, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(App.prototype), 'create', this).call(this);

            this._listItemCollection = new _collectionsListItemCollection2['default']();

            this._$addTodoInput = this.$element.find('.js-addInput');
            this._$markAllCompleteCheckbox = this.$element.find('.js-markAllComplete');
            this._$mainView = this.$element.find('.js-mainView');

            // Take note the "getChild" is a method of the DOMElement class. It will return the first html element from the selector name
            // that is passed in and create a DOMElement view class with that markup so we can use functionality that comes with the DOMElement class.
            this._todoListContainer = this.getChild('.js-todoList');

            this._footerView = new _viewsFooterView2['default'](this.$element.find('.js-footerView'));
            this.addChild(this._footerView);
        }

        /**
         * @overridden DOMElement.enable
         */
    }, {
        key: 'enable',
        value: function enable() {
            if (this.isEnabled === true) {
                return this;
            }

            // Class Events
            this._listItemCollection.addEventListener('loadComplete', this._onLoadedItems, this); //
            this._footerView.addEventListener(_structurejsEventBaseEvent2['default'].CLEAR, this._onClearCompleted, this);
            this.addEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onItemChange, this);
            this.addEventListener(_structurejsEventBaseEvent2['default'].REMOVED, this._onItemRemove, this);

            // DOM Events
            this._$addTodoInput.addEventListener('keypress', this._onCreateTodo, this);
            this._$markAllCompleteCheckbox.addEventListener('change', this._onAllCompleteChange, this);

            // Load and parse the data in the browsers local storage.
            this._listItemCollection.loadStoredItems();

            _get(Object.getPrototypeOf(App.prototype), 'enable', this).call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled === false) {
                return this;
            }

            // Class Events
            this._listItemCollection.removeEventListener('loadComplete', this._onLoadedItems, this); // Example of plan string event.
            this._footerView.removeEventListener(_structurejsEventBaseEvent2['default'].CLEAR, this._onClearCompleted, this);
            this.removeEventListener(_structurejsEventBaseEvent2['default'].CHANGE, this._onItemChange, this);
            this.removeEventListener(_structurejsEventBaseEvent2['default'].REMOVED, this._onItemRemove, this);

            // DOM Events
            this._$addTodoInput.removeEventListener('keypress', this._onCreateTodo, this);
            this._$markAllCompleteCheckbox.removeEventListener('change', this._onAllCompleteChange, this);

            return _get(Object.getPrototypeOf(App.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this._footerView.updateCounts(this._listItemCollection.getCompletedCount(), this._listItemCollection.getRemainingCount());

            if (this._listItemCollection.length > 0) {
                // Take note we are working with the FooterView class jQuery view object "$element" directly.
                // All classes that extend the DOMElement class has a "$element" property which is the main view/markup the class controls.
                // If you wanted to encapsulate this more you could create a show/hide method in the FooterView class to handle it.
                this._footerView.$element.show();

                this._$mainView.show();
            } else {
                this._$mainView.hide();
                this._footerView.$element.hide();
            }
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _get(Object.getPrototypeOf(App.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // EVENT HANDLERS
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onCreateTodo
         * @private
         */
    }, {
        key: '_onActiveHandler',

        /**
         * When the deep link "#/active" tag is triggered this method will hide all items and show only items that are not completed.
         * Also updates the footer nav.
         *
         * @method _onActiveHandler
         * @private
         */
        value: function _onActiveHandler() {
            var listItemComponent = undefined;

            for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.hide();

                if (listItemComponent.isComplete() === false) {
                    listItemComponent.show();
                }
            }

            this._footerView.updateNav('active');

            this.layout();
        }

        /**
         * When the deep link "#/completed" tag is triggered this method will hide all items and show only items that are completed.
         * Also updates the footer nav.
         *
         * @method _onCompletedHandler
         * @private
         */
    }, {
        key: '_onCompletedHandler',
        value: function _onCompletedHandler() {
            var listItemComponent = undefined;

            for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.hide();

                if (listItemComponent.isComplete() === true) {
                    listItemComponent.show();
                }
            }

            this._footerView.updateNav('completed');

            this.layout();
        }

        /**
         *  When the deep link "#/" tag is triggered this method will show all items.
         *  Also updates the footer nav.
         *
         * @method _onDefaultHandler
         * @private
         */
    }, {
        key: '_onDefaultHandler',
        value: function _onDefaultHandler() {
            var listItemComponent = undefined;

            for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.show();
            }

            this._footerView.updateNav('');

            this.layout();
        }
    }]);

    return App;
})(_structurejsDisplayStage2['default']);

exports['default'] = App;
module.exports = exports['default'];

/**
 * @property _listItemCollection
 * @type {ListItemCollection}
 * @private
 */

/**
 * @property _$addTodoInput
 * @type {HTMLInputElement}
 * @private
 */

/**
 * @property _$markAllCompleteCheckbox
 * @type {HTMLInputElement}
 * @private
 */

/**
 * @property _todoListContainer
 * @type {DOMElement}
 * @private
 */

/**
 * @property _$mainView
 * @type {jQuery}
 * @private
 */

/**
 * @property _footerView
 * @type {FooterView}
 * @private
 */

/**
 * TODO: YUIDoc_comment
 *
 * @method _onAllCompleteChange
 * @private
 */

/**
 * TODO: YUIDoc_comment
 *
 * @method _onItemRemove
 * @param event {BaseEvent}
 * @private
 */

/**
 * TODO: YUIDoc_comment
 *
 * @method _onItemChange
 * @param event {BaseEvent}
 * @private
 */

/**
 * TODO: YUIDoc_comment
 *
 * @method _onLoadedItems
 * @param event {BaseEvent}
 * @private
 */

/**
 * This method is called when the BaseEvent.CLEAR event is dispatched from the FooterView.
 *
 * @method _onClearCompleted
 * @param event {BaseEvent}
 * @private
 */

},{"./collections/ListItemCollection":2,"./constants/Key":3,"./models/ListItemModel":5,"./views/FooterView":6,"./views/components/ListItemComponent":7,"structurejs/controller/Router":11,"structurejs/display/Stage":15,"structurejs/event/BaseEvent":16,"structurejs/util/StringUtil":25}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _structurejsModelCollection = require('structurejs/model/Collection');

var _structurejsModelCollection2 = _interopRequireDefault(_structurejsModelCollection);

var _structurejsControllerLocalStorageController = require('structurejs/controller/LocalStorageController');

var _structurejsControllerLocalStorageController2 = _interopRequireDefault(_structurejsControllerLocalStorageController);

var _modelsListItemModel = require('../models/ListItemModel');

var _modelsListItemModel2 = _interopRequireDefault(_modelsListItemModel);

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemCollection
 * @extends Collection
 * @constructor
 **/

var ListItemCollection = (function (_Collection) {
    _inherits(ListItemCollection, _Collection);

    function ListItemCollection() {
        _classCallCheck(this, ListItemCollection);

        _get(Object.getPrototypeOf(ListItemCollection.prototype), 'constructor', this).call(this);
        this._localStorageController = new _structurejsControllerLocalStorageController2['default'](_modelsListItemModel2['default']);
    }

    /**
     * @overridden ListItemCollection.add
     */

    _createClass(ListItemCollection, [{
        key: 'add',
        value: function add(item, silent) {
            _get(Object.getPrototypeOf(ListItemCollection.prototype), 'add', this).call(this, item, silent);

            this.save();
        }

        /**
         * @overridden ListItemCollection.remove
         */
    }, {
        key: 'remove',
        value: function remove(item, silent) {
            _get(Object.getPrototypeOf(ListItemCollection.prototype), 'remove', this).call(this, item, silent);

            this.save();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method loadStoredItems
         * @public
         */
    }, {
        key: 'loadStoredItems',
        value: function loadStoredItems() {
            var items = this._localStorageController.getItem('todos');

            if (items != null) {
                var _length = items.length;
                for (var i = 0; i < _length; i++) {
                    this.add(items[i]);
                }

                this.dispatchEvent('loadComplete');
            }
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method save
         * @public
         */
    }, {
        key: 'save',
        value: function save() {
            this._localStorageController.addItem('todos', this.models);
        }

        /**
         * Filter down the list of all todo items that are finished.
         *
         * @method getCompletedCount
         * @public
         */
    }, {
        key: 'getCompletedCount',
        value: function getCompletedCount() {
            return this.findBy({ isComplete: true }).length;
        }

        /**
         * Filter down the list to only todo items that are still not finished.
         *
         * @method getRemainingCount
         * @public
         */
    }, {
        key: 'getRemainingCount',
        value: function getRemainingCount() {
            return this.findBy({ isComplete: false }).length;
        }
    }]);

    return ListItemCollection;
})(_structurejsModelCollection2['default']);

exports['default'] = ListItemCollection;
module.exports = exports['default'];

/**
 * @property _localStorageController
 * @type {LocalStorageController}
 * @private
 */

},{"../models/ListItemModel":5,"structurejs/controller/LocalStorageController":10,"structurejs/model/Collection":21}],3:[function(require,module,exports){
/**
 * TODO: YUIDoc_comment
 *
 * @class Key
 * @constructor
 **/
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Key = (function () {
    _createClass(Key, null, [{
        key: "BACKSPACE",
        value: 8,
        enumerable: true
    }, {
        key: "TAB",
        value: 9,
        enumerable: true
    }, {
        key: "ENTER",
        value: 13,
        enumerable: true
    }, {
        key: "RETURN",
        value: 13,
        enumerable: true
    }, {
        key: "ESC",
        value: 27,
        enumerable: true
    }, {
        key: "LEFT",
        value: 37,
        enumerable: true
    }, {
        key: "UP",
        value: 38,
        enumerable: true
    }, {
        key: "RIGHT",
        value: 39,
        enumerable: true
    }, {
        key: "DOWN",
        value: 40,
        enumerable: true
    }, {
        key: "DELETE",
        value: 46,
        enumerable: true
    }, {
        key: "HOME",
        value: 36,
        enumerable: true
    }, {
        key: "END",
        value: 35,
        enumerable: true
    }, {
        key: "PAGEUP",
        value: 33,
        enumerable: true
    }, {
        key: "PAGEDOWN",
        value: 34,
        enumerable: true
    }, {
        key: "INSERT",
        value: 45,
        enumerable: true
    }]);

    function Key() {
        _classCallCheck(this, Key);
    }

    return Key;
})();

exports["default"] = Key;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
'use strict';

var App = require('./App');

window.app = new App();
window.app.appendTo('#todoapp'); // Need to specify what area our code has control over.
// The App.js class extends Stage which has the appendTo method.
// Note: On typical website you may want to set it as 'body' do you have control over the whole page.

},{"./App":1}],5:[function(require,module,exports){
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
 * @class ListItemModel
 * @extends BaseModel
 * @constructor
 **/

var ListItemModel = (function (_BaseModel) {
  _inherits(ListItemModel, _BaseModel);

  function ListItemModel(data) {
    _classCallCheck(this, ListItemModel);

    _get(Object.getPrototypeOf(ListItemModel.prototype), 'constructor', this).call(this);

    this.id = null;
    this.text = '';
    this.isComplete = false;
    if (data) {
      this.update(data);
    }
  }

  /**
   * @overridden BaseModel.update
   */

  _createClass(ListItemModel, [{
    key: 'update',
    value: function update(data) {
      _get(Object.getPrototypeOf(ListItemModel.prototype), 'update', this).call(this, data);

      // Override any values after the default super update method has set the values.
    }
  }]);

  return ListItemModel;
})(_structurejsModelBaseModel2['default']);

exports['default'] = ListItemModel;
module.exports = exports['default'];

/**
 * @property id
 * @type {string}
 * @public
 */

/**
 * @property text
 * @type {string}
 * @public
 */

/**
 * @property isComplete
 * @type {boolean}
 * @public
 */

},{"structurejs/model/BaseModel":20}],6:[function(require,module,exports){
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

/**
 * TODO: YUIDoc_comment
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/

var FooterView = (function (_DOMElement) {
  _inherits(FooterView, _DOMElement);

  function FooterView($element) {
    _classCallCheck(this, FooterView);

    _get(Object.getPrototypeOf(FooterView.prototype), 'constructor', this).call(this, $element);
    this._$itemsCompleteText = null;
    this._$itemsRemainingText = null;
    this._$clearCompleteButton = null;
    this._$navLinks = null;
  }

  /**
   * @overridden DOMElement.create
   */

  _createClass(FooterView, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(FooterView.prototype), 'create', this).call(this);

      this._$itemsCompleteText = this.$element.find('.js-itemsComplete');
      this._$itemsRemainingText = this.$element.find('.js-itemsRemaining');
      this._$clearCompleteButton = this.$element.find('.js-clearCompleteButton');
      this._$navLinks = this.$element.find('#filters li a');
    }

    /**
     * @overridden DOMElement.enable
     */
  }, {
    key: 'enable',
    value: function enable() {
      if (this.isEnabled === true) {
        return this;
      }

      this._$clearCompleteButton.addEventListener('click', this._onClear, this);

      _get(Object.getPrototypeOf(FooterView.prototype), 'enable', this).call(this);
    }

    /**
     * @overridden DOMElement.disable
     */
  }, {
    key: 'disable',
    value: function disable() {
      if (this.isEnabled === false) {
        return this;
      }

      this._$clearCompleteButton.removeEventListener('click', this._onClear, this);

      _get(Object.getPrototypeOf(FooterView.prototype), 'disable', this).call(this);
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

      _get(Object.getPrototypeOf(FooterView.prototype), 'destroy', this).call(this);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * This method will update the footer display count for both completed and remaining items.
     *
     * @method updateCounts
     * @public
     */
  }, {
    key: 'updateCounts',
    value: function updateCounts(completedCount, remainingCount) {
      this._$itemsCompleteText.text(completedCount);
      this._$itemsRemainingText.text(remainingCount);
    }

    /**
     * This will remove the "selected" style class on all nav links and then add the
     * "selected" style class what ever matches the passed in string value.
     *
     * @method updateNav
     * @public
     */
  }, {
    key: 'updateNav',
    value: function updateNav(hashName) {
      this._$navLinks.removeClass('selected').filter('[href="#/' + (hashName || '') + '"]').addClass('selected');
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * When the user clicks the "clear completed" button this method will be called and will dispatch an event
     * to tell the parent class that we want to remove all the completed items.
     *
     * @method _onClear
     * @param event {jQueryEventObject}
     * @private
     */
  }, {
    key: '_onClear',
    value: function _onClear(event) {
      // Take note this is not dispatching a BaseEvent object but just the string value constant. The only time you need to dispatch
      // an BaseEvent object or a custom event that extends BaseEvent is when you want to use event bubbling or have custom properties
      // on the event that you want to set.
      this.dispatchEvent(_structurejsEventBaseEvent2['default'].CLEAR);
    }
  }]);

  return FooterView;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = FooterView;
module.exports = exports['default'];

/**
 * @property _$itemsCompleteText
 * @type {jQuery}
 * @private
 */

/**
 * @property _$itemsRemainingText
 * @type {jQuery}
 * @private
 */

/**
 * @property _$clearCompleteButton
 * @type {jQuery}
 * @private
 */

/**
 * @property _$navLinks
 * @type {jQuery}
 * @private
 */

},{"structurejs/display/DOMElement":12,"structurejs/event/BaseEvent":16}],7:[function(require,module,exports){
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

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemComponent
 * @extends DOMElement
 * @constructor
 **/

var ListItemComponent = (function (_DOMElement) {
    _inherits(ListItemComponent, _DOMElement);

    function ListItemComponent(model) {
        _classCallCheck(this, ListItemComponent);

        _get(Object.getPrototypeOf(ListItemComponent.prototype), 'constructor', this).call(this);

        this.model = null;
        this._$itemInput = null;
        this._$itemLabel = null;
        this._$markCompleteCheckbox = null;
        this.model = model;
    }

    /**
     * @overridden DOMElement.create
     */

    _createClass(ListItemComponent, [{
        key: 'create',
        value: function create() {
            _get(Object.getPrototypeOf(ListItemComponent.prototype), 'create', this).call(this, '#listItemTemplate', this.model);

            this._$itemInput = this.$element.find('.js-itemText');
            this._$itemLabel = this.$element.find('.js-editTodo');
            this._$markCompleteCheckbox = this.$element.find('.js-markComplete');
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

            this.$element.addEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
            this.$element.addEventListener('click', '.js-removeTodo', this._onItemRemove, this);
            this.$element.addEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

            this.$element.addEventListener('keydown', this._onEscapeKey, this);
            this.$element.addEventListener('keypress', this._onEnterKey, this);
            this._$itemInput.addEventListener('blur', this._onInputBlur, this);

            _get(Object.getPrototypeOf(ListItemComponent.prototype), 'enable', this).call(this);
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

            this.$element.removeEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
            this.$element.removeEventListener('click', '.js-removeTodo', this._onItemRemove, this);
            this.$element.removeEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

            this.$element.removeEventListener('keydown', this._onEscapeKey, this);
            this.$element.removeEventListener('keypress', this._onEnterKey, this);
            this._$itemInput.removeEventListener('blur', this._onInputBlur, this);

            _get(Object.getPrototypeOf(ListItemComponent.prototype), 'disable', this).call(this);
        }

        /**
         * @overridden DOMElement.layout
         */
    }, {
        key: 'layout',
        value: function layout() {
            this.$element.toggleClass('completed', this.model.isComplete);

            this._$markCompleteCheckbox.prop('checked', this.model.isComplete);
        }

        /**
         * @overridden DOMElement.destroy
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            this.disable();

            // Call destroy on any child objects.
            // This super method will also null out your properties for garbage collection.

            _get(Object.getPrototypeOf(ListItemComponent.prototype), 'destroy', this).call(this);
        }

        //////////////////////////////////////////////////////////////////////////////////
        // HELPER METHOD
        //////////////////////////////////////////////////////////////////////////////////

        /**
         * TODO: YUIDoc_comment
         *
         * @method setCompleted
         * @public
         */
    }, {
        key: 'setCompleted',
        value: function setCompleted() {
            this.model.isComplete = true;

            this.layout();
            this._saveItemText();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method setUnCompleted
         * @public
         */
    }, {
        key: 'setUnCompleted',
        value: function setUnCompleted() {
            this.model.isComplete = false;

            this.layout();
            this._saveItemText();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method isComplete
         * @public
         */
    }, {
        key: 'isComplete',
        value: function isComplete() {
            return this.model.isComplete;
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method hide
         * @public
         */
    }, {
        key: 'hide',
        value: function hide() {
            this.$element.hide();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method show
         * @public
         */
    }, {
        key: 'show',
        value: function show() {
            this.$element.show();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onItemToggleComplete
         * @private
         */
    }, {
        key: '_onItemToggleComplete',
        value: function _onItemToggleComplete(event) {
            var isChecked = $(event.target).prop('checked');

            this.model.isComplete = isChecked;

            this.layout();
            this._saveItemText();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onItemEdit
         * @private
         */
    }, {
        key: '_onItemEdit',
        value: function _onItemEdit(event) {
            this.$element.addClass('editing');

            this._$itemInput.focus();
            this._$itemInput.select();
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onEscapeKey
         * @private
         */
    }, {
        key: '_onEscapeKey',
        value: function _onEscapeKey(event) {
            if (event.which === Key.ESC) {
                this._resetItemText();
            }
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onEscapeKey
         * @private
         */
    }, {
        key: '_onInputBlur',
        value: function _onInputBlur(event) {
            var todoText = this._$itemInput.val().trim();

            if (todoText != '') {
                this.model.text = todoText;
                this._resetItemText();
                this._saveItemText();
            } else {
                this._resetItemText();
            }
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _resetItemText
         * @private
         */
    }, {
        key: '_resetItemText',
        value: function _resetItemText() {
            this.$element.removeClass('editing');

            // We need to reset the hidden input back to the original value.
            this._$itemInput.val(this.model.text);
            this._$itemLabel.text(this.model.text);
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _saveItemText
         * @private
         */
    }, {
        key: '_saveItemText',
        value: function _saveItemText() {
            this.dispatchEvent(new _structurejsEventBaseEvent2['default'](_structurejsEventBaseEvent2['default'].CHANGE, true, true, this.model));
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onItemRemove
         * @private
         */
    }, {
        key: '_onItemRemove',
        value: function _onItemRemove(event) {
            this.dispatchEvent(new _structurejsEventBaseEvent2['default'](_structurejsEventBaseEvent2['default'].REMOVED, true));
        }

        /**
         * TODO: YUIDoc_comment
         *
         * @method _onEnterKey
         * @private
         */
    }, {
        key: '_onEnterKey',
        value: function _onEnterKey(event) {
            var todoText = this._$itemInput.val().trim();

            if (event.which === Key.ENTER) {
                if (todoText != '') {
                    this.model.text = todoText;
                    this._resetItemText();
                    this._saveItemText();
                } else {
                    this._resetItemText();
                }
            }
        }
    }]);

    return ListItemComponent;
})(_structurejsDisplayDOMElement2['default']);

exports['default'] = ListItemComponent;
module.exports = exports['default'];

/**
 * Holds onto the model for this view.
 *
 * @property model
 * @type {ListItemModel}
 * @public
 */

/**
 * @property _$itemInput
 * @type {jQuery}
 * @private
 */

/**
 * @property _$itemLabel
 * @type {jQuery}
 * @private
 */

/**
 * TODO: YUIDoc_comment
 *
 * @property _$markCompleteCheckbox
 * @type {jQuery}
 * @private
 */

},{"structurejs/display/DOMElement":12,"structurejs/event/BaseEvent":16}],8:[function(require,module,exports){
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
         *     let someClass = new SomeClass();
         *     someClass.getQualifiedClassName();
         *
         *     // SomeClass
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
    return BaseObject;
});

},{"./util/Util":27}],9:[function(require,module,exports){
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
    })(BaseObject);
    return ObjectManager;
});

},{"./BaseObject":8}],10:[function(require,module,exports){
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
        define(["require", "exports", '../event/LocalStorageEvent', '../event/EventDispatcher', '../model/BaseModel'], factory);
    }
})(function (require, exports) {
    var LocalStorageEvent = require('../event/LocalStorageEvent');
    var EventDispatcher = require('../event/EventDispatcher');
    var BaseModel = require('../model/BaseModel');
    /**
     * The LocalStorageController...
     *
     * @class LocalStorageController
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule controller
     * @requires Extend
     * @requires EventDispatcher
     * @requires LocalStorageEvent
     * @requires BaseModel
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LocalStorageController = (function (_super) {
        __extends(LocalStorageController, _super);
        function LocalStorageController() {
            _super.call(this);
            /**
             * Current user namespace. The namespace is optional.
             *
             * @property _namespace
             * @type {string}
             * @default defaultNamespace
             * @optional
             * @protected
             */
            this._namespace = 'defaultNamespace';
            /**
             * A reference to window.localStorage for faster access.
             *
             * @property _localStorage
             * @type {Storage}
             * @protected
             */
            this._localStorage = null;
            this._localStorage = window.localStorage;
            window.addEventListener('storage', this._onLocalStorageEvent.bind(this));
        }
        /**
         * Set storage namespace
         *
         * @method setNamespace
         * @param namespace
         * @returns {string}
         */
        LocalStorageController.prototype.setNamespace = function (namespace) {
            this._namespace = namespace;
        };
        /**
         * Get storage namespace
         *
         * @method getNamespace
         * @returns {string}
         */
        LocalStorageController.prototype.getNamespace = function () {
            return this._namespace;
        };
        /**
         * Add a key/value pair to localStorage.
         *
         * @method addItem
         * @param key {string}
         * @param data {Object}
         * @param useNamespace {boolean}
         * @return {boolean}
         */
        LocalStorageController.prototype.addItem = function (key, data, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            if (data instanceof BaseModel) {
                data = data.toJSON();
            }
            data = JSON.stringify(data);
            try {
                this._localStorage.setItem(key, data);
                return true;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * Retrieves the current value associated with the Local Storage key.
         *
         * @method getItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @returns {any}
         */
        LocalStorageController.prototype.getItem = function (key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            var value = this._localStorage.getItem(key);
            if (value) {
                try {
                    value = JSON.parse(value);
                }
                catch (error) {
                    // We are assuming the error is because value being parsed is a plain string with spaces.
                    value = value;
                }
            }
            return value;
        };
        /**
         * Returns all items in local storage as an Object with key and value properties that has a certain namespace.
         *
         * @method getItemsWithNamespace
         * @param namespace {string} The namespace that is used to items. If a namespace is not passed in then the current set namespace will be used.
         * @return {Array}
         */
        LocalStorageController.prototype.getItemsWithNamespace = function (namespace) {
            if (namespace === void 0) { namespace = this._namespace; }
            var list = [];
            var length = this.getLength();
            for (var i_1 = 0; i_1 < length; i_1++) {
                var key = this._localStorage.key(i_1);
                if (key.indexOf(namespace) > -1) {
                    var value = this.getItem(key);
                    var obj = {
                        key: key,
                        value: value
                    };
                    list.push(obj);
                }
            }
            return list;
        };
        /**
         * Returns all items in local storage as an Object with key and value properties.
         *
         * @method getAllItems
         * @return {Array}
         */
        LocalStorageController.prototype.getAllItems = function () {
            var list = [];
            var length = this.getLength();
            for (var i_2 = 0; i_2 < length; i_2++) {
                var key = this._localStorage.key(i_2);
                var value = this.getItem(key);
                var obj = {
                    key: key,
                    value: value
                };
                list.push(obj);
            }
            return list;
        };
        /**
         * Deletes a key/value pair from the Local Storage collection.
         *
         * @method removeItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @return {boolean}
         */
        LocalStorageController.prototype.removeItem = function (key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            try {
                this._localStorage.removeItem(key);
                return true;
            }
            catch (error) {
                return false;
            }
        };
        /**
         * Returns the number of items storage in local storage.
         *
         * @method getLength
         * @returns {number}
         */
        LocalStorageController.prototype.getLength = function () {
            return this._localStorage.length;
        };
        /**
         * Returns the size of the Local Storage.
         *
         * @method getSize
         * @returns {number}
         */
        LocalStorageController.prototype.getSize = function () {
            return encodeURIComponent(JSON.stringify(this._localStorage)).length;
        };
        /**
         * Removes all key/value pairs from the Local Storage area.
         *
         * @method clear
         */
        LocalStorageController.prototype.clear = function () {
            this._localStorage.clear();
        };
        /**
         *
         *
         * @method _onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @protected
         */
        LocalStorageController.prototype._onLocalStorageEvent = function (event) {
            this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
        };
        return LocalStorageController;
    })(EventDispatcher);
    return LocalStorageController;
});

},{"../event/EventDispatcher":17,"../event/LocalStorageEvent":18,"../model/BaseModel":20}],11:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/StringUtil', '../event/RouterEvent', '../model/Route'], factory);
    }
})(function (require, exports) {
    var StringUtil = require('../util/StringUtil');
    var RouterEvent = require('../event/RouterEvent');
    var Route = require('../model/Route');
    /**
     * The **Router** class is a static class allows you to add different route patterns that can be matched to help control your application. Look at the Router.{{#crossLink "Router/add:method"}}{{/crossLink}} method for more details and examples.
     *
     * @class Router
     * @module StructureJS
     * @submodule controller
     * @requires Route
     * @requires RouterEvent
     * @requires StringUtil
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var Router = (function () {
        function Router() {
            throw new Error('[Router] Do not instantiate the Router class because it is a static class.');
        }
        /**
         * The **Router.add** method allows you to listen for route patterns to be matched. When a match is found the callback will be executed passing a {{#crossLink "RouterEvent"}}{{/crossLink}}.
         *
         * @method add
         * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''. See the examples below for more details.
         * @param callback {Function} The function that should be executed when a request matches the routePattern. It will receive a {{#crossLink "RouterEvent"}}{{/crossLink}} object.
         * @param callbackScope {any} The scope of the callback function that should be executed.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener and the function callback below.
         *     Router.add('/games/{gameName}/:level:/', this._method, this);
         *
         *     // The above route listener would match the below url:
         *     // www.site.com/#/games/asteroids/2/
         *
         *     // The Call back receives a RouterEvent object.
         *     _onRouteHandler(routerEvent) {
         *         console.log(routerEvent.params);
         *     }
         *
         * Route Pattern Options:
         * ----------------------
         * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/contact/:name:/', this._method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/contact/
         *     // www.site.com/#/contact/heather/
         *     // www.site.com/#/contact/john/
         *
         *
         * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/product/{productName}/', this._method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/product/shoes/
         *     // www.site.com/#/product/jackets/
         *
         *
         * **\*** The asterisk character means it will match all or part of part the hash url.
         *
         *     Router.add('*', this._method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/anything/
         *     // www.site.com/#/matches/any/hash/url/
         *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
         *
         *
         * **?** The question mark character means it will match a query string for the hash url.
         *
         *     Router.add('?', this._method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/?one=1&two=2&three=3
         *     // www.site.com/#?one=1&two=2&three=3
         *
         *
         * **''** The empty string means it will match when there are no hash url.
         *
         *     Router.add('', this._method, this);
         *     Router.add('/', this._method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/
         *     // www.site.com/#/
         *
         *
         * Other possible combinations but not limited too:
         *
         *     Router.add('/games/{gameName}/:level:/', this._method1, this);
         *     Router.add('/{category}/blog/', this._method2, this);
         *     Router.add('/home/?', this._method3, this);
         *     Router.add('/about/*', this._method4, this);
         *
         */
        Router.add = function (routePattern, callback, callbackScope) {
            Router.enable();
            var route = new Route(routePattern, callback, callbackScope);
            Router._routes.push(route);
        };
        /**
         * The **Router.remove** method will remove one of the added routes.
         *
         * @method remove
         * @param routePattern {string} Must be the same string pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callback {Function} Must be the same function you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callbackScope {any} Must be the same scope off the callback pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener.
         *     Router.add('/games/{gameName}/:level:/', this._method, this);
         *
         *     // Example of removing the same added route listener above.
         *     Router.remove('/games/{gameName}/:level:/', this._method, this);
         */
        Router.remove = function (routePattern, callback, callbackScope) {
            var route;
            // Since we are removing (splice) from routes we need to check the length every iteration.
            for (var i_1 = Router._routes.length - 1; i_1 >= 0; i_1--) {
                route = Router._routes[i_1];
                if (route.routePattern === routePattern && route.callback === callback && route.callbackScope === callbackScope) {
                    Router._routes.splice(i_1, 1);
                }
            }
        };
        /**
         * The **Router.addDefault** method is meant to trigger a callback function if there are no route matches are found.
         *
         * @method addDefault
         * @param callback {Function}
         * @param callbackScope {any}
         * @public
         * @static
         * @example
         *     Router.addDefault(this._noRoutesFoundHandler, this);
         */
        Router.addDefault = function (callback, callbackScope) {
            Router._defaultRoute = new Route('', callback, callbackScope);
        };
        /**
         * The **Router.removeDefault** method will remove the default callback that was added by the **Router.addDefault** method.
         *
         * @method removeDefault
         * @public
         * @static
         * @example
         *     Router.removeDefault();
         */
        Router.removeDefault = function () {
            Router._defaultRoute = null;
        };
        /**
         * Gets the current hash url minus the # or #! symbol(s).
         *
         * @method getHash
         * @public
         * @static
         * @return {string} Returns current hash url minus the # or #! symbol(s).
         * @example
         *     let str = Router.getHash();
         */
        Router.getHash = function () {
            var hash = Router._window.location.hash;
            var strIndex = (hash.substr(0, 2) === '#!') ? 2 : 1;
            return hash.substring(strIndex); // Return everything after # or #!
        };
        /**
         * The **Router.enable** method will allow the Router class to listen for the hashchange event. By default the Router class is enabled.
         *
         * @method enable
         * @public
         * @static
         * @example
         *     Router.enable();
         */
        Router.enable = function () {
            if (Router.isEnabled === true) {
                return;
            }
            if (Router._window.addEventListener) {
                Router._window.addEventListener('hashchange', Router._onHashChange, false);
            }
            else {
                Router._window.attachEvent('onhashchange', Router._onHashChange);
            }
            Router.isEnabled = true;
        };
        /**
         * The **Router.disable** method will stop the Router class from listening for the hashchange event.
         *
         * @method disable
         * @public
         * @static
         * @example
         *     Router.disable();
         */
        Router.disable = function () {
            if (Router.isEnabled === false) {
                return;
            }
            if (Router._window.removeEventListener) {
                Router._window.removeEventListener('hashchange', Router._onHashChange);
            }
            else {
                Router._window.detachEvent('onhashchange', Router._onHashChange);
            }
            Router.isEnabled = false;
        };
        /**
         * The **Router.start** method is meant to trigger or check the hash url on page load.
         * Either you can call this method after you add all your routers or after all data is loaded.
         * It is recommend you only call this once per page or application instantiation.
         *
         * @method start
         * @public
         * @static
         * @example
         *     // Example of adding routes and calling the start method.
         *     Router.add('/games/{gameName}/:level:/', this._method1, this);
         *     Router.add('/{category}/blog/', this._method2, this);
         *
         *     Router.start();
         */
        Router.start = function () {
            setTimeout(Router._onHashChange, 1);
        };
        /**
         * The **Router.navigateTo** method allows you to change the hash url and to trigger a route
         * that matches the string value. The second parameter is **silent** and is **false** by
         * default. This allows you to update the hash url without causing a route callback to be
         * executed.
         *
         * @method navigateTo
         * @param route {String}
         * @param [silent=false] {Boolean}
         * @param [disableHistory=false] {Boolean}
         * @public
         * @static
         * @example
         *     // This will update the hash url and trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/');
         *
         *     // This will update the hash url but will not trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true);
         *
         *     // This will not update the hash url but will trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true, true);
         */
        Router.navigateTo = function (route, silent, disableHistory) {
            if (silent === void 0) { silent = false; }
            if (disableHistory === void 0) { disableHistory = false; }
            if (Router.isEnabled === false) {
                return;
            }
            if (route.charAt(0) === '#') {
                var strIndex = (route.substr(0, 2) === '#!') ? 2 : 1;
                route = route.substring(strIndex);
            }
            // Enforce starting slash
            if (route.charAt(0) !== '/' && Router.forceSlash === true) {
                route = '/' + route;
            }
            if (disableHistory === true) {
                Router._changeRoute(route);
                return;
            }
            if (Router.useDeepLinking === true) {
                if (silent === true) {
                    Router.disable();
                    setTimeout(function () {
                        window.location.hash = route;
                        setTimeout(Router.enable, 1);
                    }, 1);
                }
                else {
                    setTimeout(function () {
                        window.location.hash = route;
                    }, 1);
                }
            }
            else {
                Router._changeRoute(route);
            }
        };
        /**
         * The **Router.clear** will remove all route's and the default route from the Router class.
         *
         * @method clear
         * @public
         * @static
         * @example
         *     Router.clear();
         */
        Router.prototype.clear = function () {
            Router._routes = [];
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };
        /**
         * The **Router.destroy** method will null out all references to other objects in the Router class.
         *
         * @method destroy
         * @public
         * @static
         * @example
         *     Router.destroy();
         */
        Router.prototype.destroy = function () {
            Router._window = null;
            Router._routes = null;
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };
        /**
         * A simple helper method to create a url route from an unlimited number of arguments.
         *
         * @method buildRoute
         * @param ...rest {...rest}
         * @return {string}
         * @public
         * @static
         * @example
         *      let someProperty = 'api/endpoint';
         *
         *      Router.buildRoute(someProperty, 'path', 7);
         *
         *      //Creates 'api/endpoint/path/7'
         */
        Router.buildRoute = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i - 0] = arguments[_i];
            }
            return rest.join('/');
        };
        /**
         * Returns the current router event that was last triggered.
         *
         * @method getCurrentRoute
         * @public
         * @static
         * @example
         *      Router.getCurrentRoute();
         */
        Router.getCurrentRoute = function () {
            return this._currentRoute;
        };
        /**
         * This method will be called if the Window object dispatches a HashChangeEvent.
         * This method will not be called if the Router is disabled.
         *
         * @method _onHashChange
         * @param event {HashChangeEvent}
         * @private
         * @static
         */
        Router._onHashChange = function (event) {
            if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false) {
                return;
            }
            Router._hashChangeEvent = event;
            var hash = Router.getHash();
            Router._changeRoute(hash);
        };
        /**
         * The method is responsible for check if one of the routes matches the string value passed in.
         *
         * @method _changeRoute
         * @param hash {string}
         * @private
         * @static
         */
        Router._changeRoute = function (hash) {
            var route;
            var match;
            var routerEvent = null;
            // Loop through all the route's. Note: we need to check the length every loop in case one was removed.
            for (var i_2 = 0; i_2 < Router._routes.length; i_2++) {
                route = Router._routes[i_2];
                match = route.match(hash);
                // If there is a match.
                if (match !== null) {
                    routerEvent = new RouterEvent();
                    routerEvent.route = match.shift();
                    routerEvent.params = match.slice(0, match.length);
                    routerEvent.routePattern = route.routePattern;
                    routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                    routerEvent.target = Router;
                    routerEvent.currentTarget = Router;
                    // Remove any empty strings in the array due to the :optional: route pattern.
                    // Since we are removing (splice) from params we need to check the length every iteration.
                    for (var j = routerEvent.params.length - 1; j >= 0; j--) {
                        if (routerEvent.params[j] === '') {
                            routerEvent.params.splice(j, 1);
                        }
                    }
                    // If there was a hash change event then set the info we want to send.
                    if (Router._hashChangeEvent != null) {
                        routerEvent.newURL = Router._hashChangeEvent.newURL;
                        routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                    }
                    else {
                        routerEvent.newURL = window.location.href;
                    }
                    // Execute the callback function and pass the route event.
                    route.callback.call(route.callbackScope, routerEvent);
                    // Only trigger the first route and stop checking.
                    if (Router.allowMultipleMatches === false) {
                        break;
                    }
                }
            }
            // If there are no route's matched and there is a default route. Then call that default route.
            if (routerEvent === null && Router._defaultRoute !== null) {
                routerEvent = new RouterEvent();
                routerEvent.route = hash;
                routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                routerEvent.target = Router;
                routerEvent.currentTarget = Router;
                if (Router._hashChangeEvent != null) {
                    routerEvent.newURL = Router._hashChangeEvent.newURL;
                    routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                }
                else {
                    routerEvent.newURL = window.location.href;
                }
                Router._defaultRoute.callback.call(Router._defaultRoute.callbackScope, routerEvent);
            }
            Router._hashChangeEvent = null;
            Router._currentRoute = routerEvent;
        };
        /**
         * A reference to the browser Window Object.
         *
         * @property _window
         * @type {Window}
         * @private
         * @static
         */
        Router._window = window;
        /**
         * A list of the added Route objects.
         *
         * @property _routes
         * @type {Array<Route>}
         * @private
         * @static
         */
        Router._routes = [];
        /**
         * A reference to default route object.
         *
         * @property _defaultRoute
         * @type {Route}
         * @private
         * @static
         */
        Router._defaultRoute = null;
        /**
         * A reference to the hash change event that was sent from the Window Object.
         *
         * @property _hashChangeEvent
         * @type {any}
         * @private
         * @static
         */
        Router._hashChangeEvent = null;
        /**
         * Determines if the Router class is enabled or disabled.
         *
         * @property isEnabled
         * @type {boolean}
         * @readOnly
         * @public
         * @static
         * @example
         *     // Read only.
         *     console.log(Router.isEnabled);
         */
        Router.isEnabled = false;
        /**
         * The **Router.useDeepLinking** property tells the Router class weather it should change the hash url or not.
         * By **default** this property is set to **true**. If you set the property to **false** and using the **Router.navigateTo**
         * method the hash url will not change. This can be useful if you are making an application or game and you don't want the user
         * to know how to jump to other sections directly. See the **Router.{{#crossLink "Router/allowManualDeepLinking:property"}}{{/crossLink}}** to fully change the Router class
         * from relying on the hash url to an internal state controller.
         *
         * @property useDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = true;
         */
        Router.useDeepLinking = true;
        /**
         * The **Router.allowManualDeepLinking** property tells the Router class weather it should check for route matches if the
         * hash url changes in the browser. This property only works if the **Router. {{#crossLink "Router/useDeepLinking:property"}}{{/crossLink}}** is set to **false**.
         * This is useful if want to use your added routes but don't want any external forces trigger your routes.
         *
         * Typically what I do for games is during development/testing I allow the hash url to change the states so testers can jump
         * to sections or levels easily but then when it is ready for production I set the property to **false** so users cannot jump
         * around if they figure out the url schema.
         *
         * @property allowManualDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = false;
         *     Router.allowManualDeepLinking = false;
         */
        Router.allowManualDeepLinking = true;
        /**
         * The **Router.forceSlash** property tells the Router class if the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method is called to
         * make sure the hash url has a forward slash after the **#** character like this **#/**.
         *
         * @property forceSlash
         * @type {boolean}
         * @default false
         * @public
         * @static
         * @example
         *     // To turn on forcing the forward slash
         *     Router.forceSlash = true;
         *
         *     // If forceSlash is set to true it will change the url from #contact/bob/ to #/contact/bob/
         *     // when using the navigateTo method.
         */
        Router.forceSlash = false;
        /**
         * The **Router.allowMultipleMatches** property tells the Router class if it should trigger one or all routes that match a route pattern.
         *
         * @property allowMultipleMatches
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     // Only allow the first route matched to be triggered.
         *     Router.allowMultipleMatches = false;
         */
        Router.allowMultipleMatches = true;
        /**
         * A reference to the current {{#crossLink "RouterEvent"}}{{/crossLink}} that was triggered.
         *
         * @property _currentRoute
         * @type {RouterEvent}
         * @private
         * @static
         */
        Router._currentRoute = null;
        return Router;
    })();
    return Router;
});

},{"../event/RouterEvent":19,"../model/Route":22,"../util/StringUtil":25}],12:[function(require,module,exports){
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
                var html_1 = TemplateFactory.create(type, params);
                if (html_1) {
                    this.$element = jQuery(html_1);
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
                list = ComponentFactory.create(this.$element.find(obj.selector), obj.component, this);
                createdChildren = createdChildren.concat(list);
            }
            return createdChildren;
        };
        return DOMElement;
    })(DisplayObjectContainer);
    return DOMElement;
});

},{"../event/BaseEvent":16,"../plugin/jquery.eventListener":23,"../util/ComponentFactory":24,"../util/TemplateFactory":26,"./DisplayObjectContainer":14}],13:[function(require,module,exports){
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
  })(EventDispatcher);
  return DisplayObject;
});

},{"../event/EventDispatcher":17}],14:[function(require,module,exports){
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
            for (var i_1 = this.numChildren - 1; i_1 >= 0; i_1--) {
                if (this.children[i_1].sjsId == sjsId) {
                    child = this.children[i_1];
                    break;
                }
            }
            return child;
        };
        return DisplayObjectContainer;
    })(DisplayObject);
    return DisplayObjectContainer;
});

},{"./DisplayObject":13}],15:[function(require,module,exports){
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
    })(DOMElement);
    return Stage;
});

},{"./DOMElement":12}],16:[function(require,module,exports){
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
    })(BaseObject);
    return BaseEvent;
});

},{"../BaseObject":8}],17:[function(require,module,exports){
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
                event = new BaseEvent(type, false, true, data);
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
    })(ObjectManager);
    return EventDispatcher;
});

},{"../ObjectManager":9,"./BaseEvent":16}],18:[function(require,module,exports){
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
        define(["require", "exports", './BaseEvent'], factory);
    }
})(function (require, exports) {
    var BaseEvent = require('./BaseEvent');
    /**
     * The LocalStorageEvent ....
     * Note: the event only dispatches in other browser windows and does not show up in the window where you made a change to the local storage.
     *
     * @class LocalStorageEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param nativeEvent {StorageEvent} The native browser event for localStorage.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LocalStorageEvent = (function (_super) {
        __extends(LocalStorageEvent, _super);
        function LocalStorageEvent(type, bubbles, cancelable, nativeEvent) {
            _super.call(this, type, bubbles, cancelable, nativeEvent);
            /**
             * TODO: YUIDoc_comment
             *
             * @property originalEvent
             * @type {any}
             * @public
             */
            this.originalEvent = null;
            if (nativeEvent) {
                this.key = nativeEvent.key;
                this.oldValue = nativeEvent.oldValue;
                this.newValue = nativeEvent.newValue;
                this.url = nativeEvent.url;
            }
            this.originalEvent = nativeEvent;
        }
        /**
         * The storage event is fired on a Document's Window object when a storage area changes.
         *
         * @event STORAGE
         * @type {string}
         * @static
         */
        LocalStorageEvent.STORAGE = 'storage';
        return LocalStorageEvent;
    })(BaseEvent);
    return LocalStorageEvent;
});

},{"./BaseEvent":16}],19:[function(require,module,exports){
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
    define(["require", "exports", './BaseEvent'], factory);
  }
})(function (require, exports) {
  var BaseEvent = require('./BaseEvent');
  /**
   * The RouterEvent is used in the {{#crossLink "Router"}}{{/crossLink}} class and gets passed to the callback in the {{#crossLink "Route"}}{{/crossLink}} class.
   *
   * @class RouterEvent
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
  var RouterEvent = (function (_super) {
    __extends(RouterEvent, _super);
    function RouterEvent(type, bubbles, cancelable, data) {
      if (type === void 0) {
        type = RouterEvent.CHANGE;
      }
      if (bubbles === void 0) {
        bubbles = false;
      }
      if (cancelable === void 0) {
        cancelable = false;
      }
      if (data === void 0) {
        data = null;
      }
      _super.call(this, type, bubbles, cancelable, data);
      /**
       * The route that was matched against {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
       *
       * @property route
       * @type {string}
       * @public
       */
      this.route = null;
      /**
       * The new URL to which the window is navigating.
       *
       * @property newURL
       * @type {string}
       * @public
       */
      this.newURL = null;
      /**
       * The previous URL from which the window was navigated.
       *
       * @property oldURL
       * @type {string}
       * @public
       */
      this.oldURL = null;
      /**
       * The route pattern that matched the {{#crossLink "RouterEvent/route:property"}}{{/crossLink}} property.
       *
       * @property routePattern
       * @type {string}
       * @public
       */
      this.routePattern = null;
      /**
       * An array containing the parameters captured from the Route.{{#crossLink "Route/match:method"}}{{/crossLink}}
       * being called with the {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
       *
       * @property params
       * @type {Array.<string>}
       * @public
       */
      this.params = [];
      /**
       * A query object the represents the query string in the hash url.
       *
       * @property query
       * @type {any}
       * @public
       */
      this.query = null;
    }
    /**
     * The RouterEvent.CHANGE constant defines the value of the type property of an change route event object.
     *
     * @event CHANGE
     * @type {string}
     * @static
     */
    RouterEvent.CHANGE = 'RouterEvent.change';
    return RouterEvent;
  })(BaseEvent);
  return RouterEvent;
});

},{"./BaseEvent":16}],20:[function(require,module,exports){
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
    var BaseObject = require('../BaseObject');
    var Util = require('../util/Util');
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
            var clone = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['sjsId']);
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
    })(BaseObject);
    return BaseModel;
});

},{"../BaseObject":8,"../util/Util":27}],21:[function(require,module,exports){
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
        define(["require", "exports", '../event/EventDispatcher', '../event/BaseEvent', '../util/Util'], factory);
    }
})(function (require, exports) {
    var EventDispatcher = require('../event/EventDispatcher');
    var BaseEvent = require('../event/BaseEvent');
    var Util = require('../util/Util');
    /**
     * The Collection class provides a way for you to manage your models.
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires EventDispatcher
     * @requires BaseEvent
     * @constructor
     * @param baseModelType {BaseModel} Pass a class that extends BaseModel and the data added to the collection will be created as that type.
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     let data = [{ make: 'Tesla', model: 'Model S', year: 2014 }, { make: 'Tesla', model: 'Model X', year: 2016 }];
     *
     *     // Example of adding data to a collection
     *     let collection = new Collection();
     *     collection.add(data);
     *
     *     // Example of adding data to a collection that will create a CarModel model for each data object passed in.
     *     let collection = new Collection(CarModel);
     *     collection.add(data);
     */
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(baseModelType) {
            if (baseModelType === void 0) { baseModelType = null; }
            _super.call(this);
            /**
             * The list of models in the collection.
             *
             * @property models
             * @type {Array.<any>}
             * @readOnly
             */
            this.models = [];
            /**
             * The count of how many models are in the collection.
             *
             * @property length
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
            /**
             * A reference to a BaseModel type that will be used in the collection.
             *
             * @property _modelType
             * @type {any}
             * @protected
             */
            this._modelType = null;
            this._modelType = baseModelType;
        }
        /**
         * Adds model or an array of models to the collection.
         *
         * @method add
         * @param model {Any|Array} Single or an array of models to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.add(model);
         *
         *      collection.add([model, model, model, model]);
         *
         *      collection.add(model, true);
         */
        Collection.prototype.add = function (model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            var len = models.length;
            for (var i_1 = 0; i_1 < len; i_1++) {
                // Only add the model if it does not exist in the the collection.
                if (this.has(models[i_1]) === false) {
                    if (this._modelType !== null && (models[i_1] instanceof this._modelType) === false) {
                        // If the modelType is set and the data is not already a instance of the modelType
                        // then instantiate it and pass the data into the constructor.
                        this.models.push(new this._modelType(models[i_1]));
                    }
                    else {
                        // Pass the data object to the array.
                        this.models.push(models[i_1]);
                    }
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
            return this;
        };
        /**
         * Removes a model or an array of models from the collection.
         *
         * @method remove
         * @param model {Object|Array} Model(s) to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.remove(model);
         *
         *      collection.remove([model, model, model, model]);
         *
         *      collection.remove(model, true);
         */
        Collection.prototype.remove = function (model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            for (var i_2 = models.length - 1; i_2 >= 0; i_2--) {
                // Only remove the model if it exists in the the collection.
                if (this.has(models[i_2]) === true) {
                    this.models.splice(this.indexOf(models[i_2]), 1);
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
            return this;
        };
        /**
         * Checks if a collection has an model.
         *
         * @method has
         * @param model {Object} Item to check
         * @return {boolean}
         * @public
         * @example
         *      collection.has(model);
         */
        Collection.prototype.has = function (model) {
            return this.indexOf(model) > -1;
        };
        /**
         * Returns the array index position of the  Base Model.
         *
         * @method indexOf
         * @param model {Object} get the index of.
         * @return {int}
         * @public
         * @example
         *      collection.indexOf(model);
         */
        Collection.prototype.indexOf = function (model) {
            return this.models.indexOf(model);
        };
        /**
         * Finds an object by an index value.
         *
         * @method get
         * @param index {int} The index integer of the model to get
         * @return {Object} the model
         * @public
         * @example
         *      let model = collection.get(1);
         */
        Collection.prototype.get = function (index) {
            return this.models[index] || null;
        };
        /**
         * Examines each element in a collection, returning an array of all elements that have the given properties.
         * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
         * @method findBy
         * @param arg {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @public
         * @example
         *      // Finds all  Base Model that has 'Robert' in it.
         *      collection.findBy("Robert");
         *      // Finds any  Base Model that has 'Robert' or 'Heater' or 23 in it.
         *      collection.findBy(["Robert", "Heather", 32]);
         *
         *      // Finds all  Base Models that same key and value you are searching for.
         *      collection.findBy({ name: 'apple', organic: false, type: 'fruit' });
         *      collection.findBy([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         */
        Collection.prototype.findBy = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var len = list.length;
            var prop;
            for (var i_3 = 0; i_3 < len; i_3++) {
                prop = list[i_3];
                // Adds found  Base Model to the foundItems array.
                if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                    // If the model is not an object.
                    foundItems = foundItems.concat(this._findPropertyValue(prop));
                }
                else {
                    // If the model is an object.
                    foundItems = foundItems.concat(this._where(prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return Util.unique(foundItems);
        };
        /**
         * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
         *
         * @method _where
         * @param propList {Object|Array}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._where = function (propList) {
            // If properties is not an array then make it an array object.
            var list = (propList instanceof Array) ? propList : [propList];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var hasMatchingProperty = false;
            var doesModelMatch = false;
            var model;
            var obj;
            var key;
            var j;
            for (var i_4 = 0; i_4 < itemsToFindLength; i_4++) {
                obj = list[i_4];
                for (j = 0; j < itemsLength; j++) {
                    hasMatchingProperty = false;
                    doesModelMatch = true;
                    model = this.models[j];
                    for (key in obj) {
                        // Check if the key value is a property.
                        if (obj.hasOwnProperty(key) && model.hasOwnProperty(key)) {
                            hasMatchingProperty = true;
                            if (obj[key] !== model[key]) {
                                doesModelMatch = false;
                                break;
                            }
                        }
                    }
                    if (doesModelMatch === true && hasMatchingProperty === true) {
                        foundItems.push(model);
                    }
                }
            }
            return foundItems;
        };
        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {Array.<any>} Returns a list of found object's.
         * @protected
         */
        Collection.prototype._findPropertyValue = function (arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var propertyValue;
            var value;
            var model;
            var key;
            var j;
            for (var i_5 = 0; i_5 < itemsLength; i_5++) {
                model = this.models[i_5];
                for (key in model) {
                    // Check if the key value is a property.
                    if (model.hasOwnProperty(key)) {
                        propertyValue = model[key];
                        for (j = 0; j < itemsToFindLength; j++) {
                            value = list[j];
                            // If the  Base Model property equals the string value then keep a reference to that  Base Model.
                            if (propertyValue === value) {
                                // Add found  Base Model to the foundItems array.
                                foundItems.push(model);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };
        /**
         * Clears or remove all the models from the collection.
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.clear();
         */
        Collection.prototype.clear = function (silent) {
            if (silent === void 0) { silent = false; }
            this.models = [];
            this.length = 0;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
            }
            return this;
        };
        /**
         * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
         *
         * @method clone
         * @returns {Collection}
         * @public
         * @example
         *     let clone = collection.clone();
         */
        Collection.prototype.clone = function () {
            var clonedBaseModel = new this.constructor(this._modelType);
            clonedBaseModel.add(this.models.slice(0));
            return clonedBaseModel;
        };
        /**
         * Creates a JSON object of the collection.
         *
         * @method toJSON
         * @returns {Array.<any>}
         * @public
         * @example
         *     let arrayOfObjects = collection.toJSON();
         */
        Collection.prototype.toJSON = function () {
            if (this._modelType !== null) {
                var list = [];
                var len = this.length;
                for (var i_6 = 0; i_6 < len; i_6++) {
                    list[i_6] = this.models[i_6].toJSON();
                }
                return list;
            }
            else {
                return Util.clone(this.models);
            }
        };
        /**
         * Creates a JSON string of the collection.
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     let str = collection.toJSONString();
         */
        Collection.prototype.toJSONString = function () {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Objects and calls the {{#crossLink "Collection/add:method"}}{{/crossLink}} method to add the objects to the collection.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @chainable
         * @example
         *      collection.fromJSON(str);
         */
        Collection.prototype.fromJSON = function (json) {
            var parsedData = JSON.parse(json);
            this.add(parsedData);
            return this;
        };
        /**
         * Allows you to sort models that have one or more common properties, specifying the property or properties to use as the sort keys
         *
         * @method sortOn
         * @param propertyName {string}
         * @param [sortAscending=true] {boolean}
         * @public
         * @return {Array<any>} Returns the list of models in the collection.
         * @example
         *      collection.sortOn('name');
         *      collection.sortOn('name', false);
         */
        Collection.prototype.sortOn = function (propertyName, sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }
            if (sortAscending === false) {
                return this.sort(function (a, b) {
                    if (a[propertyName] < b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] > b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
            else {
                return this.sort(function (a, b) {
                    if (a[propertyName] > b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] < b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
        };
        /**
         * Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code
         * point value, according to the string conversion of each element.
         *
         * @method sort
         * @param [sortFunction=null] {Function}
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let sortByDate = function(a, b){
         *          return new Date(a.date) - new Date(b.date)
         *      }
         *
         *      collection.sort(sortByDate);
         */
        Collection.prototype.sort = function (sortFunction) {
            if (sortFunction === void 0) { sortFunction = null; }
            this.models.sort(sortFunction);
            return this.models;
        };
        /**
         * The filter method creates a new array with all elements that pass the test implemented by the provided function.
         *
         * @method filter
         * @param callback {Function} Function to test each element of the array. Invoked with arguments (element, index, array). Return true to keep the element, false otherwise.
         * @param [callbackScope=null] Optional. Value to use as this when executing callback.
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      let isOldEnough = function(model){
         *          return model.age >= 21;
         *      }
         *
         *      let list = collection.filter(isOldEnough);
         */
        Collection.prototype.filter = function (callback, callbackScope) {
            if (callbackScope === void 0) { callbackScope = null; }
            return this.models.filter(callback, callbackScope);
        };
        /**
         * Convenient way to get a list of property values.
         *
         * @method pluck
         * @param propertyName {string} The property name you want the values from.
         * @param [unique=false] {string} Pass in true to remove duplicates.
         * @return {Array.<any>}
         * @public
         * @example
         *      collection.add([{name: 'Robert'}, {name: 'Robert'}, {name: 'Chris'}]);
         *
         *      let list = collection.pluck('name');
         *      // ['Robert', 'Robert', 'Chris']
         *
         *      let list = collection.pluck('name', true);
         *      // ['Robert', 'Chris']
         */
        Collection.prototype.pluck = function (propertyName, unique) {
            if (unique === void 0) { unique = false; }
            var list = [];
            for (var i_7 = 0; i_7 < this.length; i_7++) {
                if (this.models[i_7].hasOwnProperty(propertyName) === true) {
                    list[i_7] = this.models[i_7][propertyName];
                }
            }
            if (unique === true) {
                list = Util.unique(list);
            }
            return list;
        };
        /**
         * Convenient way to group models into categories/groups by a property name.
         *
         * @method groupBy
         * @param propertyName {string} The string value of the property you want to group with.
         * @return {any} Returns an object that is categorized by the property name.
         * @public
         * @example
         *      collection.add([{name: 'Robert', id: 0}, {name: 'Robert', id: 1}, {name: 'Chris', id: 2}]);
         *
         *      let list = collection.groupBy('name');
         *
         *      // {
         *      //    Robert: [{name: 'Robert', id: 0}, {name: 'Robert', id: 1}]
         *      //    Chris: [{name: 'Chris', id: 2}]
         *      // }
         */
        Collection.prototype.groupBy = function (propertyName) {
            var model;
            var groupName;
            var groupList = {};
            // Loop through all the models in this collection.
            for (var i_8 = 0; i_8 < this.length; i_8++) {
                model = this.models[i_8];
                // Get the value from the property name passed in and uses that as the group name.
                groupName = model[propertyName];
                if (groupList[groupName] == null) {
                    groupList[groupName] = [];
                }
                groupList[groupName].push(model);
            }
            return groupList;
        };
        /**
         * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
         *
         * @method reverse
         * @public
         * @return {Array.<any>} Returns the list of models in the collection.
         * @example
         *      collection.reverse();
         */
        Collection.prototype.reverse = function () {
            return this.models.reverse();
        };
        return Collection;
    })(EventDispatcher);
    return Collection;
});

},{"../event/BaseEvent":16,"../event/EventDispatcher":17,"../util/Util":27}],22:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    /**
     * The **Route** class is a model that keeps track of a specific route for the {{#crossLink "Router"}}{{/crossLink}} class.
     *
     * @class Route
     * @module StructureJS
     * @submodule model
     * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ''
     * @param callback {Function} The function that should be executed when a request matches the routePattern.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     // Example of adding a route listener and the function callback below.
     *     let route = new Route('/games/{gameName}/:level:/', this._method, this);
     *
     *     // The above route would match the string below:
     *     route.match('/games/asteroids/2/');
     *
     * Route Pattern Options:
     * ----------------------
     * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
     *
     *     let route = new Route('/contact/:name:/', this._method, this);
     *
     *     // Will match one of the following:
     *     route.match('/contact/');
     *     route.match('/contact/heather/');
     *     route.match('/contact/john/');
     *
     *
     * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
     *
     *     let route = new Route('/product/{productName}/', this._method, this);
     *
     *     // Will match one of the following:
     *     route.match('/product/shoes/');
     *     route.match('/product/jackets/');
     *
     *
     * **\*** The asterisk character means it will match all or part of part the hash url.
     *
     *     let route = new Route('*', this._method, this);
     *
     *     // Will match one of the following:
     *     route.match('/anything/');
     *     route.match('/matches/any/hash/url/');
     *     route.match('/really/it/matches/any/and/all/hash/urls/');
     *
     *
     * **''** The empty string means it will match when there are no hash url.
     *
     *     let route = new Route('', this._method, this);
     *     let route = new Route('/', this._method, this);
     *
     *     // Will match one of the following:
     *     route.match('');
     *     route.match('/');
     *
     *
     * Other possible combinations but not limited too:
     *
     *     let route = new Route('/games/{gameName}/:level:/', this._method1, this);
     *     let route = new Route('/{category}/blog/', this._method2, this);
     *     let route = new Route('/about/*', this._method3, this);
     *
     */
    var Route = (function () {
        function Route(routePattern, callback, scope) {
            /**
             * The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, "". See below for examples.
             *
             * @property routePattern
             * @type String
             * @public
             */
            this.routePattern = '';
            /**
             * The regex representation for the routePattern that was passed into the constructor.
             *
             * @property regex
             * @type RegExp
             * @public
             * @readOnly
             */
            this.regex = null;
            /**
             * The function that should be executed when a request matches the routePattern. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callback
             * @type {Function}
             * @public
             */
            this.callback = null;
            /**
             * The scope of the callback function that should be executed. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callbackScope
             * @type {any}
             * @public
             */
            this.callbackScope = null;
            this.routePattern = routePattern;
            this.regex = this._routePatternToRegexp(routePattern);
            this.callback = callback;
            this.callbackScope = scope;
        }
        /**
         * Converts the routePattern that was passed into the constructor to a regexp object.
         *
         * @method _routePatternToRegexp
         * @param {String} routePattern
         * @returns {RegExp}
         * @protected
         */
        Route.prototype._routePatternToRegexp = function (routePattern) {
            var findFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
            var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons : :
            var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
            var optionalFirstCharSlash = '^/?'; // Allows the first character to be if a forward slash to be optional.
            var optionalLastCharSlash = '/?$'; // Allows the last character to be if a forward slash to be optional.
            // Remove first and last forward slash.
            routePattern = routePattern.replace(findFirstOrLastForwardSlash, '');
            // Convert the wild card * be a regex ?(.*) to select all.
            routePattern = routePattern.replace('*', '?(.*)');
            // Make any :alphanumeric: optional
            routePattern = routePattern.replace(findOptionalColons, '?([^/]*)');
            // Make any {alphanumeric} required
            routePattern = routePattern.replace(findRequiredBrackets, '([^/]+)');
            return new RegExp(optionalFirstCharSlash + routePattern + optionalLastCharSlash, 'i');
        };
        /**
         * Determine if a route matches a routePattern.
         *
         * @method match
         * @param route {String} The route or path to match against the routePattern that was passed into the constructor.
         * @returns {Array.<any>}
         * @example
         *     let route = new Route('/games/{gameName}/:level:/', this.method, this);
         *     console.log( route.match('/games/asteroids/2/') );
         */
        Route.prototype.match = function (route) {
            // Remove the query string before matching against the route pattern.
            var routeWithoutQueryString = route.replace(/\?.*/, '');
            return routeWithoutQueryString.match(this.regex);
        };
        return Route;
    })();
    return Route;
});

},{}],23:[function(require,module,exports){
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
    return $eventListener;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],24:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/Util'], factory);
    }
})(function (require, exports) {
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
    return ComponentFactory;
});

},{"../util/Util":27}],25:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
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
            if (useParseFloat === void 0) { useParseFloat = false; }
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
            if (indicator === void 0) { indicator = '...'; }
            if (text.length <= length) {
                return text;
            }
            else {
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
    return StringUtil;
});

},{}],26:[function(require,module,exports){
'use strict';

(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './StringUtil'], factory);
    }
})(function (require, exports) {
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
                htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);
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
    return TemplateFactory;
});

},{"./StringUtil":25}],27:[function(require,module,exports){
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
    return Util;
});

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy9zY3JpcHRzL0FwcC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3NjcmlwdHMvY29sbGVjdGlvbnMvTGlzdEl0ZW1Db2xsZWN0aW9uLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvc2NyaXB0cy9jb25zdGFudHMvS2V5LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvc2NyaXB0cy9tYWluLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvc2NyaXB0cy9tb2RlbHMvTGlzdEl0ZW1Nb2RlbC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3NjcmlwdHMvdmlld3MvRm9vdGVyVmlldy5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3NjcmlwdHMvdmlld3MvY29tcG9uZW50cy9MaXN0SXRlbUNvbXBvbmVudC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9CYXNlT2JqZWN0LmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL09iamVjdE1hbmFnZXIuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9jb250cm9sbGVyL0xvY2FsU3RvcmFnZUNvbnRyb2xsZXIuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9jb250cm9sbGVyL1JvdXRlci5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL2Rpc3BsYXkvRE9NRWxlbWVudC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9kaXNwbGF5L0Rpc3BsYXlPYmplY3QuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9EaXNwbGF5T2JqZWN0Q29udGFpbmVyLmpzIiwic3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZGlzcGxheS9TdGFnZS5qcyIsInNyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL2V2ZW50L0Jhc2VFdmVudC5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9ldmVudC9FdmVudERpc3BhdGNoZXIuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvTG9jYWxTdG9yYWdlRXZlbnQuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvZXZlbnQvUm91dGVyRXZlbnQuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9tb2RlbC9CYXNlTW9kZWwuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy9tb2RlbC9Db2xsZWN0aW9uLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL21vZGVsL1JvdXRlLmpzIiwiL1VzZXJzL3JvYmVydHNhdmlhbi9TaXRlcy9TdHJ1Y3R1cmVKUy9leGFtcGxlcy9Ub2RvTVZDL3NyYy9hc3NldHMvdmVuZG9yL3N0cnVjdHVyZWpzL2pzL3BsdWdpbi9qcXVlcnkuZXZlbnRMaXN0ZW5lci5qcyIsIi9Vc2Vycy9yb2JlcnRzYXZpYW4vU2l0ZXMvU3RydWN0dXJlSlMvZXhhbXBsZXMvVG9kb01WQy9zcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL0NvbXBvbmVudEZhY3RvcnkuanMiLCJzcmMvYXNzZXRzL3ZlbmRvci9zdHJ1Y3R1cmVqcy9qcy91dGlsL1N0cmluZ1V0aWwuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvdXRpbC9UZW1wbGF0ZUZhY3RvcnkuanMiLCIvVXNlcnMvcm9iZXJ0c2F2aWFuL1NpdGVzL1N0cnVjdHVyZUpTL2V4YW1wbGVzL1RvZG9NVkMvc3JjL2Fzc2V0cy92ZW5kb3Ivc3RydWN0dXJlanMvanMvdXRpbC9VdGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0NBa0IsMkJBQTJCOzs7O3lDQUN2Qiw2QkFBNkI7Ozs7MkNBQ2hDLCtCQUErQjs7Ozt5Q0FDM0IsNkJBQTZCOzs7OzZDQUVyQixr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LFNBQVMsS0FBSyxLQUFLLEVBQUU7QUFDMUIsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsbUJBQU8sSUFBSSxDQUFDO1NBQ2YsQ0FBQztBQUNGLGVBQU8sYUFBYSxDQUFDO0tBQ3hCLENBQUEsQ0FBRSxVQUFVLENBQUMsQ0FBQztBQUNmLFdBQU8sYUFBYSxDQUFDO0NBQ3hCLENBQUMsQ0FBQzs7O0FDekZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3piQSxJQUFJLFNBQVMsR0FBRyxBQUFDLGFBQVEsVUFBSyxTQUFTLElBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFNBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGFBQVMsRUFBRSxHQUFHO0FBQUUsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FBRTtBQUN2QyxLQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQSxBQUFDLENBQUM7Q0FDeEYsQ0FBQztBQUNGLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxZQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEFBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQzlFLE1BQ0ksSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqRCxjQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzlFO0NBQ0osQ0FBQSxDQUFFLFVBQVUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUMzQixRQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNoRCxRQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J2QyxRQUFJLGVBQWUsR0FBRyxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQ3JDLGlCQUFTLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLGlCQUFTLGVBQWUsR0FBRztBQUN2QixrQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7QUFRbEIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7O0FBVXZCLGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNuQixnQkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkQsdUJBQWUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDcEYsZ0JBQUksUUFBUSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQUUsd0JBQVEsR0FBRyxDQUFDLENBQUM7YUFBRTs7QUFFMUMsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsZ0JBQUksSUFBSSxJQUFJLElBQUksRUFBRTs7QUFFZCxvQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2FBQ3JDO0FBQ0QsZ0JBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztBQUNkLGdCQUFJLFFBQVEsQ0FBQztBQUNiLGdCQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3BCLG1CQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2Isd0JBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsb0JBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7O0FBRTVELHdCQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDckIsTUFDSSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUU7QUFDbEQseUJBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNqQjthQUNKOztBQUVELGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUM3RixtQkFBTyxJQUFJLENBQUM7U0FDZixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJGLHVCQUFlLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ3hGLGdCQUFJLFFBQVEsS0FBSyxLQUFLLENBQUMsRUFBRTtBQUFFLHdCQUFRLEdBQUcsQ0FBQyxDQUFDO2FBQUU7O0FBRTFDLGdCQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O0FBRXZELGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXZCLG9CQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNyQixtQkFBTyxJQUFJLENBQUM7U0FDZixDQUFDOzs7Ozs7Ozs7Ozs7OztBQWNGLHVCQUFlLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLFVBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7O0FBRTdFLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLGdCQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtBQUNqQixvQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN0Qix1QkFBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTs7QUFFZix3QkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtBQUM5RCw0QkFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEIsOEJBQU07cUJBQ1Q7aUJBQ0o7YUFDSjtBQUNELG1CQUFPLElBQUksQ0FBQztTQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJGLHVCQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxVQUFVLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDNUQsZ0JBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQUUsb0JBQUksR0FBRyxJQUFJLENBQUM7YUFBRTtBQUNyQyxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLGdCQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUMzQixxQkFBSyxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ2xEOztBQUVELGdCQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO0FBQ3RCLHFCQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN2Qjs7QUFFRCxpQkFBSyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTNCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxnQkFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDakIsb0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDdEIsb0JBQUksUUFBUSxDQUFDO0FBQ2IsdUJBQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7O0FBRWYsd0JBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLDZCQUE2QixLQUFLLElBQUksRUFBRTtBQUMzRSw4QkFBTTtxQkFDVDtBQUNELDRCQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLDRCQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU5Qyx3QkFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtBQUN4Qiw0QkFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQzNFO2lCQUNKO2FBQ0o7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7O0FBRS9DLG9CQUFJLEtBQUssQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7QUFDbEUsMkJBQU8sSUFBSSxDQUFDO2lCQUNmOztBQUVELG9CQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztBQUNELG1CQUFPLElBQUksQ0FBQztTQUNmLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFhRix1QkFBZSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQzFFLGdCQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDbEMsb0JBQUksUUFBUSxDQUFDO0FBQ2Isb0JBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2xELHFCQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQzNDLDRCQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0Qyx3QkFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtBQUM1RCwrQkFBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7YUFDSjtBQUNELG1CQUFPLEtBQUssQ0FBQztTQUNoQixDQUFDOzs7Ozs7Ozs7Ozs7QUFZRix1QkFBZSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsR0FBRyxZQUFZO0FBQ3RELGdCQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixnQkFBSSxjQUFjLENBQUM7QUFDbkIsZ0JBQUksUUFBUSxDQUFDO0FBQ2IsaUJBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUM5Qiw4QkFBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQzlDLHFCQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsY0FBYyxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQzNDLDRCQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0Qyx3QkFBSSxRQUFRLENBQUMsS0FBSyxJQUFLLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsS0FBSyxVQUFVLEFBQUMsRUFBRTtBQUNoRiwyQkFBRyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsR0FBRyxDQUFDO3FCQUM3RCxNQUNJO0FBQ0QsMkJBQUcsSUFBSSxXQUFXLENBQUM7cUJBQ3RCO0FBQ0QsdUJBQUcsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsWUFBWSxDQUFDO2lCQUNuRDthQUNKO0FBQ0QsbUJBQU8sR0FBRyxDQUFDO1NBQ2QsQ0FBQzs7OztBQUlGLHVCQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxZQUFZO0FBQzVDLGdCQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDZixrQkFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDLENBQUM7QUFDRixlQUFPLGVBQWUsQ0FBQztLQUMxQixDQUFBLENBQUUsYUFBYSxDQUFDLENBQUM7QUFDbEIsV0FBTyxlQUFlLENBQUM7Q0FDMUIsQ0FBQyxDQUFDOzs7OztBQzlSSCxJQUFJLFNBQVMsR0FBRyxBQUFDLGFBQVEsVUFBSyxTQUFTLElBQUssVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hELFNBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RELGFBQVMsRUFBRSxHQUFHO0FBQUUsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FBRTtBQUN2QyxLQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQSxBQUFDLENBQUM7Q0FDeEYsQ0FBQztBQUNGLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxZQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEFBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQzlFLE1BQ0ksSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqRCxjQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzFEO0NBQ0osQ0FBQSxDQUFFLFVBQVUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUMzQixRQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0J2QyxRQUFJLGlCQUFpQixHQUFHLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDdkMsaUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyQyxpQkFBUyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUU7QUFDL0Qsa0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7OztBQVExRCxnQkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsZ0JBQUksV0FBVyxFQUFFO0FBQ2Isb0JBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztBQUMzQixvQkFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO0FBQ3JDLG9CQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7QUFDckMsb0JBQUksQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQzthQUM5QjtBQUNELGdCQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztTQUNwQzs7Ozs7Ozs7QUFRRCx5QkFBaUIsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0FBQ3RDLGVBQU8saUJBQWlCLENBQUM7S0FDNUIsQ0FBQSxDQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2QsV0FBTyxpQkFBaUIsQ0FBQztDQUM1QixDQUFDLENBQUM7Ozs7O0FDaEVILElBQUksU0FBUyxHQUFHLEFBQUMsYUFBUSxVQUFLLFNBQVMsSUFBSyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDeEQsT0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEQsV0FBUyxFQUFFLEdBQUc7QUFBRSxRQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztHQUFFO0FBQ3ZDLEdBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFBLEFBQUMsQ0FBQztDQUN4RixDQUFDO0FBQ0YsQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUNoQixNQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ2xFLFFBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQUFBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7R0FDOUUsTUFDSSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2pELFVBQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7R0FDMUQ7Q0FDSixDQUFBLENBQUUsVUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzNCLE1BQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CdkMsTUFBSSxXQUFXLEdBQUcsQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUNqQyxhQUFTLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLGFBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRTtBQUNsRCxVQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtBQUFFLFlBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO09BQUU7QUFDbkQsVUFBSSxPQUFPLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFBRSxlQUFPLEdBQUcsS0FBSyxDQUFDO09BQUU7QUFDNUMsVUFBSSxVQUFVLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFBRSxrQkFBVSxHQUFHLEtBQUssQ0FBQztPQUFFO0FBQ2xELFVBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQUUsWUFBSSxHQUFHLElBQUksQ0FBQztPQUFFO0FBQ3JDLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztBQVFuRCxVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7QUFRbEIsVUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Ozs7Ozs7O0FBUW5CLFVBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzs7Ozs7OztBQVFuQixVQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7O0FBU3pCLFVBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OztBQVFqQixVQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNyQjs7Ozs7Ozs7QUFRRCxlQUFXLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDO0FBQzFDLFdBQU8sV0FBVyxDQUFDO0dBQ3RCLENBQUEsQ0FBRSxTQUFTLENBQUMsQ0FBQztBQUNkLFNBQU8sV0FBVyxDQUFDO0NBQ3RCLENBQUMsQ0FBQzs7O0FDckdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvUkEsQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUNoQixRQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ2xFLFlBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQUFBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDOUUsTUFDSSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2pELGNBQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0Q7Q0FDSixDQUFBLENBQUUsVUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzNCLFFBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWXpDLFFBQUksZUFBZSxHQUFHLENBQUMsWUFBWTtBQUMvQixpQkFBUyxlQUFlLEdBQUc7QUFDdkIsa0JBQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQztTQUNuSDs7Ozs7Ozs7Ozs7OztBQWFELHVCQUFlLENBQUMsTUFBTSxHQUFHLFVBQVUsWUFBWSxFQUFFLElBQUksRUFBRTtBQUNuRCxnQkFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFBRSxvQkFBSSxHQUFHLElBQUksQ0FBQzthQUFFOztBQUVyQyxnQkFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDO0FBQzFCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsZ0JBQUksa0JBQWtCLEdBQUcsT0FBTyxZQUFZLEtBQUssVUFBVSxDQUFDO0FBQzVELGdCQUFJLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQy9DLGdCQUFJLGtCQUFrQixFQUFFO0FBQ3BCLHdCQUFRLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDLE1BQ0ksSUFBSSxlQUFlLEVBQUU7O0FBRXRCLDRCQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QyxvQkFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLENBQUM7QUFDakUsMEJBQVUsR0FBRyxVQUFVLENBQUMsK0JBQStCLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEUsb0JBQUksZUFBZSxDQUFDLGNBQWMsSUFBSSxlQUFlLENBQUMsVUFBVSxFQUFFOztBQUU5RCx3QkFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0RCw0QkFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkMsTUFDSTs7QUFFRCx3QkFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRCw0QkFBUSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7YUFDSixNQUNJO0FBQ0Qsb0JBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM1RCxvQkFBSSxDQUFDLFdBQVcsRUFBRTs7QUFFZCwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7QUFDRCxvQkFBSSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDakQsb0JBQUksZ0JBQWdCLEVBQUU7OztBQUdsQiw0QkFBUSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQzthQUNKO0FBQ0QsbUJBQU8sUUFBUSxDQUFDO1NBQ25CLENBQUM7Ozs7Ozs7Ozs7QUFVRix1QkFBZSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7Ozs7Ozs7Ozs7QUFVMUMsdUJBQWUsQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBVTFDLHVCQUFlLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7Ozs7QUFVNUQsdUJBQWUsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDMUMsZUFBTyxlQUFlLENBQUM7S0FDMUIsQ0FBQSxFQUFHLENBQUM7QUFDTCxXQUFPLGVBQWUsQ0FBQztDQUMxQixDQUFDLENBQUM7Ozs7O0FDeEhILENBQUMsVUFBVSxPQUFPLEVBQUU7QUFDaEIsUUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxZQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEFBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0tBQzlFLE1BQ0ksSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqRCxjQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDM0M7Q0FDSixDQUFBLENBQUUsVUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7Ozs7Ozs7O0FBVTNCLFFBQUksSUFBSSxHQUFHLENBQUMsWUFBWTtBQUNwQixpQkFBUyxJQUFJLEdBQUc7QUFDWixrQkFBTSxJQUFJLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1NBQzdGOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JELFlBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxNQUFNLEVBQUU7QUFDOUIsZ0JBQUksTUFBTSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQUUsc0JBQU0sR0FBRyxJQUFJLENBQUM7YUFBRTtBQUN6QyxnQkFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQzNCLGdCQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7QUFDaEIsdUJBQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQzthQUM5QixNQUNJO0FBQ0QsdUJBQU8sRUFBRSxDQUFDO2FBQ2I7U0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCRixZQUFJLENBQUMsd0JBQXdCLEdBQUcsVUFBVSxNQUFNLEVBQUUsS0FBSyxFQUFFOztBQUVyRCxnQkFBSSxJQUFJLEdBQUcsQUFBQyxLQUFLLFlBQVksS0FBSyxHQUFJLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOztBQUV0RCxpQkFBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7O0FBRXBCLG9CQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDNUIsd0JBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFMUIsd0JBQUksT0FBTyxZQUFZLEtBQUssRUFBRTs7QUFFMUIsNEJBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQztBQUNwQiw2QkFBSyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUU7O0FBRXJCLGdDQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNyRDtxQkFDSixNQUNJLElBQUksT0FBTyxZQUFZLE1BQU0sRUFBRTtBQUNoQyw0QkFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDaEQsTUFDSTs7QUFFRCw2QkFBSyxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7O0FBRXhCLGdDQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7O0FBRXpCLHVDQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDdEI7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtBQUNELG1CQUFPLE1BQU0sQ0FBQztTQUNqQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkYsWUFBSSxDQUFDLHNCQUFzQixHQUFHLFVBQVUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7O0FBRTlELGdCQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDaEMsc0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEMsdUJBQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzFCO0FBQ0QsbUJBQU8sTUFBTSxDQUFDO1NBQ2pCLENBQUM7Ozs7Ozs7Ozs7OztBQVlGLFlBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7Ozs7O0FBS3hCLGdCQUFJLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxJQUFJLE9BQU8sR0FBRyxFQUFFO0FBQ3ZDLHVCQUFPLEdBQUcsQ0FBQzthQUNkOztBQUVELGdCQUFJLEdBQUcsWUFBWSxJQUFJLEVBQUU7QUFDckIsb0JBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsb0JBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDNUIsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7O0FBRUQsZ0JBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtBQUN0QixvQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YscUJBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7QUFDbEQseUJBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQztBQUNELHVCQUFPLEtBQUssQ0FBQzthQUNoQjs7QUFFRCxnQkFBSSxHQUFHLFlBQVksTUFBTSxFQUFFO0FBQ3ZCLG9CQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxxQkFBSyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDbEIsd0JBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMxQiw0QkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQ3RDO2lCQUNKO0FBQ0QsdUJBQU8sSUFBSSxDQUFDO2FBQ2Y7QUFDRCxrQkFBTSxJQUFJLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO1NBQzNFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkYsWUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUMvQixnQkFBSSxLQUFLLEdBQUcsQUFBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztBQUN6RSxtQkFBUSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBRTtTQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUFlRixZQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsV0FBVyxFQUFFO0FBQ2xDLGdCQUFJLElBQUksR0FBRyxPQUFPLFdBQVcsQ0FBQztBQUM5QixnQkFBSSxLQUFLLENBQUM7QUFDVixnQkFBSSxhQUFhLEdBQUcsbUJBQW1CLENBQUM7QUFDeEMsZ0JBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTs7QUFFbkIsb0JBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RFLHFCQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RCLE1BQ0k7O0FBRUQsb0JBQUksVUFBVSxHQUFJLElBQUksS0FBSyxVQUFVLEFBQUMsQ0FBQzs7QUFFdkMsb0JBQUksTUFBTSxHQUFHLFVBQVUsS0FBSyxBQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUEsQUFBQyxDQUFDO0FBQ3pILG9CQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7QUFDdEIseUJBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2hCLE1BQ0ksSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFCLHlCQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNyQixNQUNJO0FBQ0QseUJBQUssR0FBRyxXQUFXLENBQUM7aUJBQ3ZCO2FBQ0o7QUFDRCxtQkFBTyxLQUFLLENBQUM7U0FDaEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZUYsWUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLFFBQVEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRTtBQUNoRSxnQkFBSSxPQUFPLENBQUM7QUFDWixnQkFBSSxNQUFNLENBQUM7QUFDWCxnQkFBSSxTQUFTLEdBQUcsU0FBWixTQUFTLEdBQWU7QUFDeEIsb0JBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztBQUNyQix5QkFBUyxPQUFPLEdBQUc7QUFDZix3QkFBSSxTQUFTLElBQUksS0FBSyxFQUFFO0FBQ3BCLDhCQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ2hEO0FBQ0QsMkJBQU8sR0FBRyxJQUFJLENBQUM7aUJBQ2xCO0FBQ0Qsb0JBQUksT0FBTyxFQUFFO0FBQ1QsZ0NBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDekIsTUFDSSxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFDekIsMEJBQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEQ7QUFDRCx1QkFBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsdUJBQU8sTUFBTSxDQUFDO2FBQ2pCLENBQUM7QUFDRixxQkFBUyxDQUFDLE1BQU0sR0FBRyxZQUFZO0FBQzNCLDRCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDekIsQ0FBQztBQUNGLG1CQUFPLFNBQVMsQ0FBQztTQUNwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkYsWUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLFdBQVcsRUFBRSxTQUFTLEVBQUU7QUFDakQscUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDbEMsc0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0FBQ25FLCtCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzFELENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOLENBQUM7Ozs7Ozs7OztBQVNGLFlBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxJQUFJLEVBQUU7QUFDMUIsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxhQUFhLEVBQUUsWUFBWSxFQUFFO0FBQ2hFLG9CQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDNUMsaUNBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQ3BDO0FBQ0QsdUJBQU8sYUFBYSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxtQkFBTyxVQUFVLENBQUM7U0FDckIsQ0FBQzs7Ozs7Ozs7O0FBU0YsWUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDcEIsZUFBTyxJQUFJLENBQUM7S0FDZixDQUFBLEVBQUcsQ0FBQztBQUNMLFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBTdGFnZSBmcm9tICdzdHJ1Y3R1cmVqcy9kaXNwbGF5L1N0YWdlJztcbmltcG9ydCBCYXNlRXZlbnQgZnJvbSAnc3RydWN0dXJlanMvZXZlbnQvQmFzZUV2ZW50JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnc3RydWN0dXJlanMvY29udHJvbGxlci9Sb3V0ZXInO1xuaW1wb3J0IFN0cmluZ1V0aWwgZnJvbSAnc3RydWN0dXJlanMvdXRpbC9TdHJpbmdVdGlsJztcblxuaW1wb3J0IExpc3RJdGVtQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb25zL0xpc3RJdGVtQ29sbGVjdGlvbic7XG5pbXBvcnQgTGlzdEl0ZW1Nb2RlbCBmcm9tICcuL21vZGVscy9MaXN0SXRlbU1vZGVsJztcbmltcG9ydCBMaXN0SXRlbUNvbXBvbmVudCBmcm9tICcuL3ZpZXdzL2NvbXBvbmVudHMvTGlzdEl0ZW1Db21wb25lbnQnO1xuaW1wb3J0IEZvb3RlclZpZXcgZnJvbSAnLi92aWV3cy9Gb290ZXJWaWV3JztcbmltcG9ydCBLZXkgZnJvbSAnLi9jb25zdGFudHMvS2V5JztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBBcHBcbiAqIEBleHRlbmRzIFN0YWdlXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEFwcCBleHRlbmRzIFN0YWdlIHtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfbGlzdEl0ZW1Db2xsZWN0aW9uXG4gICAgICogQHR5cGUge0xpc3RJdGVtQ29sbGVjdGlvbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9saXN0SXRlbUNvbGxlY3Rpb24gPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF8kYWRkVG9kb0lucHV0XG4gICAgICogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfJGFkZFRvZG9JbnB1dCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgXyRtYXJrQWxsQ29tcGxldGVDaGVja2JveFxuICAgICAqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgXyRtYXJrQWxsQ29tcGxldGVDaGVja2JveCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX3RvZG9MaXN0Q29udGFpbmVyXG4gICAgICogQHR5cGUge0RPTUVsZW1lbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdG9kb0xpc3RDb250YWluZXIgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF8kbWFpblZpZXdcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgXyRtYWluVmlldyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgX2Zvb3RlclZpZXdcbiAgICAgKiBAdHlwZSB7Rm9vdGVyVmlld31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9mb290ZXJWaWV3ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24gPSBuZXcgTGlzdEl0ZW1Db2xsZWN0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5fJGFkZFRvZG9JbnB1dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWFkZElucHV0Jyk7XG4gICAgICAgIHRoaXMuXyRtYXJrQWxsQ29tcGxldGVDaGVja2JveCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLW1hcmtBbGxDb21wbGV0ZScpO1xuICAgICAgICB0aGlzLl8kbWFpblZpZXcgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1tYWluVmlldycpO1xuXG4gICAgICAgIC8vIFRha2Ugbm90ZSB0aGUgXCJnZXRDaGlsZFwiIGlzIGEgbWV0aG9kIG9mIHRoZSBET01FbGVtZW50IGNsYXNzLiBJdCB3aWxsIHJldHVybiB0aGUgZmlyc3QgaHRtbCBlbGVtZW50IGZyb20gdGhlIHNlbGVjdG9yIG5hbWVcbiAgICAgICAgLy8gdGhhdCBpcyBwYXNzZWQgaW4gYW5kIGNyZWF0ZSBhIERPTUVsZW1lbnQgdmlldyBjbGFzcyB3aXRoIHRoYXQgbWFya3VwIHNvIHdlIGNhbiB1c2UgZnVuY3Rpb25hbGl0eSB0aGF0IGNvbWVzIHdpdGggdGhlIERPTUVsZW1lbnQgY2xhc3MuXG4gICAgICAgIHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyID0gdGhpcy5nZXRDaGlsZCgnLmpzLXRvZG9MaXN0Jyk7XG5cbiAgICAgICAgdGhpcy5fZm9vdGVyVmlldyA9IG5ldyBGb290ZXJWaWV3KHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWZvb3RlclZpZXcnKSk7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fZm9vdGVyVmlldyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIC8vIENsYXNzIEV2ZW50c1xuICAgICAgICB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignbG9hZENvbXBsZXRlJywgdGhpcy5fb25Mb2FkZWRJdGVtcywgdGhpcyk7Ly9cbiAgICAgICAgdGhpcy5fZm9vdGVyVmlldy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DTEVBUiwgdGhpcy5fb25DbGVhckNvbXBsZXRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkl0ZW1DaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LlJFTU9WRUQsIHRoaXMuX29uSXRlbVJlbW92ZSwgdGhpcyk7XG5cbiAgICAgICAgLy8gRE9NIEV2ZW50c1xuICAgICAgICB0aGlzLl8kYWRkVG9kb0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5fb25DcmVhdGVUb2RvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fJG1hcmtBbGxDb21wbGV0ZUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX29uQWxsQ29tcGxldGVDaGFuZ2UsIHRoaXMpO1xuXG4gICAgICAgIC8vIExvYWQgYW5kIHBhcnNlIHRoZSBkYXRhIGluIHRoZSBicm93c2VycyBsb2NhbCBzdG9yYWdlLlxuICAgICAgICB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24ubG9hZFN0b3JlZEl0ZW1zKCk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIC8vIENsYXNzIEV2ZW50c1xuICAgICAgICB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZENvbXBsZXRlJywgdGhpcy5fb25Mb2FkZWRJdGVtcywgdGhpcyk7Ly8gRXhhbXBsZSBvZiBwbGFuIHN0cmluZyBldmVudC5cbiAgICAgICAgdGhpcy5fZm9vdGVyVmlldy5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DTEVBUiwgdGhpcy5fb25DbGVhckNvbXBsZXRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9vbkl0ZW1DaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LlJFTU9WRUQsIHRoaXMuX29uSXRlbVJlbW92ZSwgdGhpcyk7XG5cbiAgICAgICAgLy8gRE9NIEV2ZW50c1xuICAgICAgICB0aGlzLl8kYWRkVG9kb0lucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgdGhpcy5fb25DcmVhdGVUb2RvLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fJG1hcmtBbGxDb21wbGV0ZUNoZWNrYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuX29uQWxsQ29tcGxldGVDaGFuZ2UsIHRoaXMpO1xuXG4gICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5sYXlvdXRcbiAgICAgKi9cbiAgICBsYXlvdXQoKSB7XG4gICAgICAgIHRoaXMuX2Zvb3RlclZpZXcudXBkYXRlQ291bnRzKHRoaXMuX2xpc3RJdGVtQ29sbGVjdGlvbi5nZXRDb21wbGV0ZWRDb3VudCgpLCB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24uZ2V0UmVtYWluaW5nQ291bnQoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xpc3RJdGVtQ29sbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyBUYWtlIG5vdGUgd2UgYXJlIHdvcmtpbmcgd2l0aCB0aGUgRm9vdGVyVmlldyBjbGFzcyBqUXVlcnkgdmlldyBvYmplY3QgXCIkZWxlbWVudFwiIGRpcmVjdGx5LlxuICAgICAgICAgICAgLy8gQWxsIGNsYXNzZXMgdGhhdCBleHRlbmQgdGhlIERPTUVsZW1lbnQgY2xhc3MgaGFzIGEgXCIkZWxlbWVudFwiIHByb3BlcnR5IHdoaWNoIGlzIHRoZSBtYWluIHZpZXcvbWFya3VwIHRoZSBjbGFzcyBjb250cm9scy5cbiAgICAgICAgICAgIC8vIElmIHlvdSB3YW50ZWQgdG8gZW5jYXBzdWxhdGUgdGhpcyBtb3JlIHlvdSBjb3VsZCBjcmVhdGUgYSBzaG93L2hpZGUgbWV0aG9kIGluIHRoZSBGb290ZXJWaWV3IGNsYXNzIHRvIGhhbmRsZSBpdC5cbiAgICAgICAgICAgIHRoaXMuX2Zvb3RlclZpZXcuJGVsZW1lbnQuc2hvdygpO1xuXG4gICAgICAgICAgICB0aGlzLl8kbWFpblZpZXcuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fJG1haW5WaWV3LmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2Zvb3RlclZpZXcuJGVsZW1lbnQuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kZXN0cm95XG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgICAgICAgLy8gQ2FsbCBkZXN0cm95IG9uIGFueSBjaGlsZCBvYmplY3RzLlxuICAgICAgICAvLyBUaGlzIHN1cGVyIG1ldGhvZCB3aWxsIGFsc28gbnVsbCBvdXQgeW91ciBwcm9wZXJ0aWVzIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG5cbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFVkVOVCBIQU5ETEVSU1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkNyZWF0ZVRvZG9cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkNyZWF0ZVRvZG8gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBsZXQgdG9kb1RleHQgPSB0aGlzLl8kYWRkVG9kb0lucHV0LnZhbCgpLnRyaW0oKTtcblxuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEtleS5FTlRFUiAmJiB0b2RvVGV4dCAhPSAnJykge1xuICAgICAgICAgICAgbGV0IGJhc2VNb2RlbCA9IG5ldyBMaXN0SXRlbU1vZGVsKHt0ZXh0OiB0b2RvVGV4dH0pO1xuICAgICAgICAgICAgYmFzZU1vZGVsLmlkID0gU3RyaW5nVXRpbC5jcmVhdGVVVUlEKCk7XG4gICAgICAgICAgICBsZXQgY2hpbGRJdGVtID0gbmV3IExpc3RJdGVtQ29tcG9uZW50KGJhc2VNb2RlbCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xpc3RJdGVtQ29sbGVjdGlvbi5hZGQoYmFzZU1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyLmFkZENoaWxkKGNoaWxkSXRlbSk7XG4gICAgICAgICAgICB0aGlzLl8kYWRkVG9kb0lucHV0LnZhbCgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkFsbENvbXBsZXRlQ2hhbmdlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25BbGxDb21wbGV0ZUNoYW5nZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCAkdGFyZ2V0ID0gJChldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGxldCBsaXN0SXRlbUNvbXBvbmVudDtcbiAgICAgICAgaWYgKCR0YXJnZXQucHJvcChcImNoZWNrZWRcIikgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdG9kb0xpc3RDb250YWluZXIubnVtQ2hpbGRyZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtQ29tcG9uZW50ID0gdGhpcy5fdG9kb0xpc3RDb250YWluZXIuZ2V0Q2hpbGRBdChpKTtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbUNvbXBvbmVudC5zZXRDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fdG9kb0xpc3RDb250YWluZXIubnVtQ2hpbGRyZW47IGorKykge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtQ29tcG9uZW50ID0gdGhpcy5fdG9kb0xpc3RDb250YWluZXIuZ2V0Q2hpbGRBdChqKTtcbiAgICAgICAgICAgICAgICBsaXN0SXRlbUNvbXBvbmVudC5zZXRVbkNvbXBsZXRlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX29uSXRlbVJlbW92ZVxuICAgICAqIEBwYXJhbSBldmVudCB7QmFzZUV2ZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uSXRlbVJlbW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCBsaXN0SXRlbUNvbXBvbmVudCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgbGV0IGxpc3RJdGVtTW9kZWwgPSBsaXN0SXRlbUNvbXBvbmVudC5tb2RlbDtcblxuICAgICAgICB0aGlzLl9saXN0SXRlbUNvbGxlY3Rpb24ucmVtb3ZlKGxpc3RJdGVtTW9kZWwpO1xuICAgICAgICB0aGlzLl90b2RvTGlzdENvbnRhaW5lci5yZW1vdmVDaGlsZChsaXN0SXRlbUNvbXBvbmVudCk7XG5cbiAgICAgICAgdGhpcy5sYXlvdXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25JdGVtQ2hhbmdlXG4gICAgICogQHBhcmFtIGV2ZW50IHtCYXNlRXZlbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25JdGVtQ2hhbmdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5fbGlzdEl0ZW1Db2xsZWN0aW9uLnNhdmUoKTtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkxvYWRlZEl0ZW1zXG4gICAgICogQHBhcmFtIGV2ZW50IHtCYXNlRXZlbnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25Mb2FkZWRJdGVtcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuX2xpc3RJdGVtQ29sbGVjdGlvbi5tb2RlbHM7XG4gICAgICAgIGxldCBsZW5ndGggPSBpdGVtcy5sZW5ndGg7XG5cbiAgICAgICAgLy8gQ3JlYXRlIExpc3RJdGVtQ29tcG9uZW50IHZpZXcgaXRlbXMgZnJvbSB0aGUgc3RvcmVkIExpc3RJdGVtTW9kZWwgIEJhc2UgTW9kZWxzLlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGRJdGVtID0gbmV3IExpc3RJdGVtQ29tcG9uZW50KGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyLmFkZENoaWxkKGNoaWxkSXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIHRoZSBhcHAgbG9hZHMgd2UgbmVlZCB0byBjaGVjayBpZiBhbGwgc3RvcmVkIGl0ZW1zIGFyZSBhbGwgY29tcGxldGVkIG9yIG5vdC5cbiAgICAgICAgbGV0IGlzQWxsQ29tcGxldGVkID0gdGhpcy5fbGlzdEl0ZW1Db2xsZWN0aW9uLmxlbmd0aCA9PT0gdGhpcy5fbGlzdEl0ZW1Db2xsZWN0aW9uLmdldENvbXBsZXRlZENvdW50KCk7XG4gICAgICAgIHRoaXMuXyRtYXJrQWxsQ29tcGxldGVDaGVja2JveC5wcm9wKCdjaGVja2VkJywgaXNBbGxDb21wbGV0ZWQpO1xuXG4gICAgICAgIC8vIFNldHVwIHRoZSByb3V0ZXIvZGVlcGxpbmsgaGFuZGxlcnNcbiAgICAgICAgUm91dGVyLmFkZCgnL2FjdGl2ZS8nLCB0aGlzLl9vbkFjdGl2ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIFJvdXRlci5hZGQoJy9jb21wbGV0ZWQvJywgdGhpcy5fb25Db21wbGV0ZWRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICBSb3V0ZXIuYWRkKCcnLCB0aGlzLl9vbkRlZmF1bHRIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICBSb3V0ZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIHRoZSBCYXNlRXZlbnQuQ0xFQVIgZXZlbnQgaXMgZGlzcGF0Y2hlZCBmcm9tIHRoZSBGb290ZXJWaWV3LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25DbGVhckNvbXBsZXRlZFxuICAgICAqIEBwYXJhbSBldmVudCB7QmFzZUV2ZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uQ2xlYXJDb21wbGV0ZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBsZXQgbGlzdEl0ZW1Nb2RlbDtcbiAgICAgICAgbGV0IGxpc3RJdGVtQ29tcG9uZW50O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl90b2RvTGlzdENvbnRhaW5lci5udW1DaGlsZHJlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsaXN0SXRlbUNvbXBvbmVudCA9IHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgICBsaXN0SXRlbU1vZGVsID0gbGlzdEl0ZW1Db21wb25lbnQubW9kZWw7XG5cbiAgICAgICAgICAgIGlmIChsaXN0SXRlbU1vZGVsLmlzQ29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b2RvTGlzdENvbnRhaW5lci5yZW1vdmVDaGlsZChsaXN0SXRlbUNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdEl0ZW1Db2xsZWN0aW9uLnJlbW92ZShsaXN0SXRlbU1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgZGVlcCBsaW5rIFwiIy9hY3RpdmVcIiB0YWcgaXMgdHJpZ2dlcmVkIHRoaXMgbWV0aG9kIHdpbGwgaGlkZSBhbGwgaXRlbXMgYW5kIHNob3cgb25seSBpdGVtcyB0aGF0IGFyZSBub3QgY29tcGxldGVkLlxuICAgICAqIEFsc28gdXBkYXRlcyB0aGUgZm9vdGVyIG5hdi5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgX29uQWN0aXZlSGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uQWN0aXZlSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IGxpc3RJdGVtQ29tcG9uZW50O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLl90b2RvTGlzdENvbnRhaW5lci5udW1DaGlsZHJlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBsaXN0SXRlbUNvbXBvbmVudCA9IHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyLmdldENoaWxkQXQoaSk7XG4gICAgICAgICAgICBsaXN0SXRlbUNvbXBvbmVudC5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChsaXN0SXRlbUNvbXBvbmVudC5pc0NvbXBsZXRlKCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1Db21wb25lbnQuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZm9vdGVyVmlldy51cGRhdGVOYXYoJ2FjdGl2ZScpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB0aGUgZGVlcCBsaW5rIFwiIy9jb21wbGV0ZWRcIiB0YWcgaXMgdHJpZ2dlcmVkIHRoaXMgbWV0aG9kIHdpbGwgaGlkZSBhbGwgaXRlbXMgYW5kIHNob3cgb25seSBpdGVtcyB0aGF0IGFyZSBjb21wbGV0ZWQuXG4gICAgICogQWxzbyB1cGRhdGVzIHRoZSBmb290ZXIgbmF2LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25Db21wbGV0ZWRIYW5kbGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25Db21wbGV0ZWRIYW5kbGVyKCkge1xuICAgICAgICBsZXQgbGlzdEl0ZW1Db21wb25lbnQ7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuX3RvZG9MaXN0Q29udGFpbmVyLm51bUNoaWxkcmVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29tcG9uZW50ID0gdGhpcy5fdG9kb0xpc3RDb250YWluZXIuZ2V0Q2hpbGRBdChpKTtcbiAgICAgICAgICAgIGxpc3RJdGVtQ29tcG9uZW50LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKGxpc3RJdGVtQ29tcG9uZW50LmlzQ29tcGxldGUoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGxpc3RJdGVtQ29tcG9uZW50LnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Zvb3RlclZpZXcudXBkYXRlTmF2KCdjb21wbGV0ZWQnKTtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBXaGVuIHRoZSBkZWVwIGxpbmsgXCIjL1wiIHRhZyBpcyB0cmlnZ2VyZWQgdGhpcyBtZXRob2Qgd2lsbCBzaG93IGFsbCBpdGVtcy5cbiAgICAgKiAgQWxzbyB1cGRhdGVzIHRoZSBmb290ZXIgbmF2LlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25EZWZhdWx0SGFuZGxlclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRGVmYXVsdEhhbmRsZXIoKSB7XG4gICAgICAgIGxldCBsaXN0SXRlbUNvbXBvbmVudDtcblxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5fdG9kb0xpc3RDb250YWluZXIubnVtQ2hpbGRyZW4gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbGlzdEl0ZW1Db21wb25lbnQgPSB0aGlzLl90b2RvTGlzdENvbnRhaW5lci5nZXRDaGlsZEF0KGkpO1xuICAgICAgICAgICAgbGlzdEl0ZW1Db21wb25lbnQuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZm9vdGVyVmlldy51cGRhdGVOYXYoJycpO1xuXG4gICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ3N0cnVjdHVyZWpzL21vZGVsL0NvbGxlY3Rpb24nO1xuaW1wb3J0IExvY2FsU3RvcmFnZUNvbnRyb2xsZXIgZnJvbSAnc3RydWN0dXJlanMvY29udHJvbGxlci9Mb2NhbFN0b3JhZ2VDb250cm9sbGVyJztcblxuaW1wb3J0IExpc3RJdGVtTW9kZWwgZnJvbSAnLi4vbW9kZWxzL0xpc3RJdGVtTW9kZWwnO1xuXG4vKipcbiAqIFRPRE86IFlVSURvY19jb21tZW50XG4gKlxuICogQGNsYXNzIExpc3RJdGVtQ29sbGVjdGlvblxuICogQGV4dGVuZHMgQ29sbGVjdGlvblxuICogQGNvbnN0cnVjdG9yXG4gKiovXG5jbGFzcyBMaXN0SXRlbUNvbGxlY3Rpb24gZXh0ZW5kcyBDb2xsZWN0aW9uIHtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfbG9jYWxTdG9yYWdlQ29udHJvbGxlclxuICAgICAqIEB0eXBlIHtMb2NhbFN0b3JhZ2VDb250cm9sbGVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2xvY2FsU3RvcmFnZUNvbnRyb2xsZXIgPSBuZXcgTG9jYWxTdG9yYWdlQ29udHJvbGxlcihMaXN0SXRlbU1vZGVsKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIExpc3RJdGVtQ29sbGVjdGlvbi5hZGRcbiAgICAgKi9cbiAgICBhZGQoaXRlbSwgc2lsZW50KSB7XG4gICAgICAgIHN1cGVyLmFkZChpdGVtLCBzaWxlbnQpO1xuXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIExpc3RJdGVtQ29sbGVjdGlvbi5yZW1vdmVcbiAgICAgKi9cbiAgICByZW1vdmUoaXRlbSwgc2lsZW50KSB7XG4gICAgICAgIHN1cGVyLnJlbW92ZShpdGVtLCBzaWxlbnQpO1xuXG4gICAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGxvYWRTdG9yZWRJdGVtc1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2FkU3RvcmVkSXRlbXMoKSB7XG4gICAgICAgIGxldCBpdGVtcyA9IHRoaXMuX2xvY2FsU3RvcmFnZUNvbnRyb2xsZXIuZ2V0SXRlbSgndG9kb3MnKTtcblxuICAgICAgICBpZiAoaXRlbXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChpdGVtc1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCgnbG9hZENvbXBsZXRlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzYXZlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNhdmUoKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsU3RvcmFnZUNvbnRyb2xsZXIuYWRkSXRlbSgndG9kb3MnLCB0aGlzLm1vZGVscyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlsdGVyIGRvd24gdGhlIGxpc3Qgb2YgYWxsIHRvZG8gaXRlbXMgdGhhdCBhcmUgZmluaXNoZWQuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGdldENvbXBsZXRlZENvdW50XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldENvbXBsZXRlZENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kQnkoe2lzQ29tcGxldGU6IHRydWV9KS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmlsdGVyIGRvd24gdGhlIGxpc3QgdG8gb25seSB0b2RvIGl0ZW1zIHRoYXQgYXJlIHN0aWxsIG5vdCBmaW5pc2hlZC5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0UmVtYWluaW5nQ291bnRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZ2V0UmVtYWluaW5nQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRCeSh7aXNDb21wbGV0ZTogZmFsc2V9KS5sZW5ndGg7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RJdGVtQ29sbGVjdGlvbjtcbiIsIi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgS2V5XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEtleSB7XG5cbiAgICBzdGF0aWMgQkFDS1NQQUNFID0gODtcbiAgICBzdGF0aWMgVEFCID0gOTtcbiAgICBzdGF0aWMgRU5URVIgPSAxMztcbiAgICBzdGF0aWMgUkVUVVJOID0gMTM7XG4gICAgc3RhdGljIEVTQyA9IDI3O1xuICAgIHN0YXRpYyBMRUZUID0gMzc7XG4gICAgc3RhdGljIFVQID0gMzg7XG4gICAgc3RhdGljIFJJR0hUID0gMzk7XG4gICAgc3RhdGljIERPV04gPSA0MDtcbiAgICBzdGF0aWMgREVMRVRFID0gNDY7XG4gICAgc3RhdGljIEhPTUUgPSAzNjtcbiAgICBzdGF0aWMgRU5EID0gMzU7XG4gICAgc3RhdGljIFBBR0VVUCA9IDMzO1xuICAgIHN0YXRpYyBQQUdFRE9XTiA9IDM0O1xuICAgIHN0YXRpYyBJTlNFUlQgPSA0NTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBLZXk7XG4iLCJsZXQgQXBwID0gcmVxdWlyZSgnLi9BcHAnKTtcblxud2luZG93LmFwcCA9IG5ldyBBcHAoKTtcbndpbmRvdy5hcHAuYXBwZW5kVG8oJyN0b2RvYXBwJyk7Ly8gTmVlZCB0byBzcGVjaWZ5IHdoYXQgYXJlYSBvdXIgY29kZSBoYXMgY29udHJvbCBvdmVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgQXBwLmpzIGNsYXNzIGV4dGVuZHMgU3RhZ2Ugd2hpY2ggaGFzIHRoZSBhcHBlbmRUbyBtZXRob2QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGU6IE9uIHR5cGljYWwgd2Vic2l0ZSB5b3UgbWF5IHdhbnQgdG8gc2V0IGl0IGFzICdib2R5JyBkbyB5b3UgaGF2ZSBjb250cm9sIG92ZXIgdGhlIHdob2xlIHBhZ2UuXG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJ3N0cnVjdHVyZWpzL21vZGVsL0Jhc2VNb2RlbCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgTGlzdEl0ZW1Nb2RlbFxuICogQGV4dGVuZHMgQmFzZU1vZGVsXG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIExpc3RJdGVtTW9kZWwgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IGlkXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaWQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHRleHRcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0ZXh0ID0gJyc7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkgaXNDb21wbGV0ZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBpc0NvbXBsZXRlID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqL1xuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcblxuICAgICAgICAvLyBPdmVycmlkZSBhbnkgdmFsdWVzIGFmdGVyIHRoZSBkZWZhdWx0IHN1cGVyIHVwZGF0ZSBtZXRob2QgaGFzIHNldCB0aGUgdmFsdWVzLlxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMaXN0SXRlbU1vZGVsO1xuIiwiaW1wb3J0IERPTUVsZW1lbnQgZnJvbSAnc3RydWN0dXJlanMvZGlzcGxheS9ET01FbGVtZW50JztcbmltcG9ydCBCYXNlRXZlbnQgZnJvbSAnc3RydWN0dXJlanMvZXZlbnQvQmFzZUV2ZW50JztcblxuLyoqXG4gKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICpcbiAqIEBjbGFzcyBGb290ZXJWaWV3XG4gKiBAZXh0ZW5kcyBET01FbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqKi9cbmNsYXNzIEZvb3RlclZpZXcgZXh0ZW5kcyBET01FbGVtZW50IHtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfJGl0ZW1zQ29tcGxldGVUZXh0XG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF8kaXRlbXNDb21wbGV0ZVRleHQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF8kaXRlbXNSZW1haW5pbmdUZXh0XG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF8kaXRlbXNSZW1haW5pbmdUZXh0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfJGNsZWFyQ29tcGxldGVCdXR0b25cbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgXyRjbGVhckNvbXBsZXRlQnV0dG9uID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfJG5hdkxpbmtzXG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF8kbmF2TGlua3MgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuY3JlYXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBzdXBlci5jcmVhdGUoKTtcblxuICAgICAgICB0aGlzLl8kaXRlbXNDb21wbGV0ZVRleHQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1pdGVtc0NvbXBsZXRlJyk7XG4gICAgICAgIHRoaXMuXyRpdGVtc1JlbWFpbmluZ1RleHQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1pdGVtc1JlbWFpbmluZycpO1xuICAgICAgICB0aGlzLl8kY2xlYXJDb21wbGV0ZUJ1dHRvbiA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLmpzLWNsZWFyQ29tcGxldGVCdXR0b24nKTtcbiAgICAgICAgdGhpcy5fJG5hdkxpbmtzID0gdGhpcy4kZWxlbWVudC5maW5kKCcjZmlsdGVycyBsaSBhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMuXyRjbGVhckNvbXBsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGVhciwgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuXG4gICAgICAgIHRoaXMuXyRjbGVhckNvbXBsZXRlQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fb25DbGVhciwgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQubGF5b3V0XG4gICAgICovXG4gICAgbGF5b3V0KCkge1xuICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQuZGVzdHJveVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuXG4gICAgICAgIC8vIENhbGwgZGVzdHJveSBvbiBhbnkgY2hpbGQgb2JqZWN0cy5cbiAgICAgICAgLy8gVGhpcyBzdXBlciBtZXRob2Qgd2lsbCBhbHNvIG51bGwgb3V0IHlvdXIgcHJvcGVydGllcyBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uLlxuXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gSEVMUEVSIE1FVEhPRFxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHdpbGwgdXBkYXRlIHRoZSBmb290ZXIgZGlzcGxheSBjb3VudCBmb3IgYm90aCBjb21wbGV0ZWQgYW5kIHJlbWFpbmluZyBpdGVtcy5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgdXBkYXRlQ291bnRzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVwZGF0ZUNvdW50cyhjb21wbGV0ZWRDb3VudCwgcmVtYWluaW5nQ291bnQpIHtcbiAgICAgICAgdGhpcy5fJGl0ZW1zQ29tcGxldGVUZXh0LnRleHQoY29tcGxldGVkQ291bnQpO1xuICAgICAgICB0aGlzLl8kaXRlbXNSZW1haW5pbmdUZXh0LnRleHQocmVtYWluaW5nQ291bnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgd2lsbCByZW1vdmUgdGhlIFwic2VsZWN0ZWRcIiBzdHlsZSBjbGFzcyBvbiBhbGwgbmF2IGxpbmtzIGFuZCB0aGVuIGFkZCB0aGVcbiAgICAgKiBcInNlbGVjdGVkXCIgc3R5bGUgY2xhc3Mgd2hhdCBldmVyIG1hdGNoZXMgdGhlIHBhc3NlZCBpbiBzdHJpbmcgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZU5hdlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1cGRhdGVOYXYoaGFzaE5hbWUpIHtcbiAgICAgICAgdGhpcy5fJG5hdkxpbmtzXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgIC5maWx0ZXIoJ1tocmVmPVwiIy8nICsgKGhhc2hOYW1lIHx8ICcnKSArICdcIl0nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBFVkVOVCBIQU5ETEVSU1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8qKlxuICAgICAqIFdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBcImNsZWFyIGNvbXBsZXRlZFwiIGJ1dHRvbiB0aGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhbmQgd2lsbCBkaXNwYXRjaCBhbiBldmVudFxuICAgICAqIHRvIHRlbGwgdGhlIHBhcmVudCBjbGFzcyB0aGF0IHdlIHdhbnQgdG8gcmVtb3ZlIGFsbCB0aGUgY29tcGxldGVkIGl0ZW1zLlxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25DbGVhclxuICAgICAqIEBwYXJhbSBldmVudCB7alF1ZXJ5RXZlbnRPYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25DbGVhcihldmVudCkge1xuICAgICAgICAvLyBUYWtlIG5vdGUgdGhpcyBpcyBub3QgZGlzcGF0Y2hpbmcgYSBCYXNlRXZlbnQgb2JqZWN0IGJ1dCBqdXN0IHRoZSBzdHJpbmcgdmFsdWUgY29uc3RhbnQuIFRoZSBvbmx5IHRpbWUgeW91IG5lZWQgdG8gZGlzcGF0Y2hcbiAgICAgICAgLy8gYW4gQmFzZUV2ZW50IG9iamVjdCBvciBhIGN1c3RvbSBldmVudCB0aGF0IGV4dGVuZHMgQmFzZUV2ZW50IGlzIHdoZW4geW91IHdhbnQgdG8gdXNlIGV2ZW50IGJ1YmJsaW5nIG9yIGhhdmUgY3VzdG9tIHByb3BlcnRpZXNcbiAgICAgICAgLy8gb24gdGhlIGV2ZW50IHRoYXQgeW91IHdhbnQgdG8gc2V0LlxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoQmFzZUV2ZW50LkNMRUFSKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyVmlldztcbiIsImltcG9ydCBET01FbGVtZW50IGZyb20gJ3N0cnVjdHVyZWpzL2Rpc3BsYXkvRE9NRWxlbWVudCc7XG5pbXBvcnQgQmFzZUV2ZW50IGZyb20gJ3N0cnVjdHVyZWpzL2V2ZW50L0Jhc2VFdmVudCc7XG5cbi8qKlxuICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAqXG4gKiBAY2xhc3MgTGlzdEl0ZW1Db21wb25lbnRcbiAqIEBleHRlbmRzIERPTUVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICoqL1xuY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgZXh0ZW5kcyBET01FbGVtZW50IHtcblxuICAgIC8qKlxuICAgICAqIEhvbGRzIG9udG8gdGhlIG1vZGVsIGZvciB0aGlzIHZpZXcuXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgbW9kZWxcbiAgICAgKiBAdHlwZSB7TGlzdEl0ZW1Nb2RlbH1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbW9kZWwgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IF8kaXRlbUlucHV0XG4gICAgICogQHR5cGUge2pRdWVyeX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF8kaXRlbUlucHV0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBfJGl0ZW1MYWJlbFxuICAgICAqIEB0eXBlIHtqUXVlcnl9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfJGl0ZW1MYWJlbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IF8kbWFya0NvbXBsZXRlQ2hlY2tib3hcbiAgICAgKiBAdHlwZSB7alF1ZXJ5fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgXyRtYXJrQ29tcGxldGVDaGVja2JveCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmNyZWF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcbiAgICAgICAgc3VwZXIuY3JlYXRlKCcjbGlzdEl0ZW1UZW1wbGF0ZScsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIHRoaXMuXyRpdGVtSW5wdXQgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5qcy1pdGVtVGV4dCcpO1xuICAgICAgICB0aGlzLl8kaXRlbUxhYmVsID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtZWRpdFRvZG8nKTtcbiAgICAgICAgdGhpcy5fJG1hcmtDb21wbGV0ZUNoZWNrYm94ID0gdGhpcy4kZWxlbWVudC5maW5kKCcuanMtbWFya0NvbXBsZXRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5lbmFibGVcbiAgICAgKi9cbiAgICBlbmFibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgJy5qcy1tYXJrQ29tcGxldGUnLCB0aGlzLl9vbkl0ZW1Ub2dnbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAnLmpzLXJlbW92ZVRvZG8nLCB0aGlzLl9vbkl0ZW1SZW1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgJy5qcy1lZGl0VG9kbycsIHRoaXMuX29uSXRlbUVkaXQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uRXNjYXBlS2V5LCB0aGlzKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX29uRW50ZXJLZXksIHRoaXMpO1xuICAgICAgICB0aGlzLl8kaXRlbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1ciwgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZW5hYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG92ZXJyaWRkZW4gRE9NRWxlbWVudC5kaXNhYmxlXG4gICAgICovXG4gICAgZGlzYWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm47IH1cblxuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgJy5qcy1tYXJrQ29tcGxldGUnLCB0aGlzLl9vbkl0ZW1Ub2dnbGVDb21wbGV0ZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCAnLmpzLXJlbW92ZVRvZG8nLCB0aGlzLl9vbkl0ZW1SZW1vdmUsIHRoaXMpO1xuICAgICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgJy5qcy1lZGl0VG9kbycsIHRoaXMuX29uSXRlbUVkaXQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX29uRXNjYXBlS2V5LCB0aGlzKTtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMuX29uRW50ZXJLZXksIHRoaXMpO1xuICAgICAgICB0aGlzLl8kaXRlbUlucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9vbklucHV0Qmx1ciwgdGhpcyk7XG5cbiAgICAgICAgc3VwZXIuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBvdmVycmlkZGVuIERPTUVsZW1lbnQubGF5b3V0XG4gICAgICovXG4gICAgbGF5b3V0KCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LnRvZ2dsZUNsYXNzKCdjb21wbGV0ZWQnLCB0aGlzLm1vZGVsLmlzQ29tcGxldGUpO1xuXG4gICAgICAgIHRoaXMuXyRtYXJrQ29tcGxldGVDaGVja2JveC5wcm9wKCdjaGVja2VkJywgdGhpcy5tb2RlbC5pc0NvbXBsZXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAb3ZlcnJpZGRlbiBET01FbGVtZW50LmRlc3Ryb3lcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRpc2FibGUoKTtcblxuICAgICAgICAvLyBDYWxsIGRlc3Ryb3kgb24gYW55IGNoaWxkIG9iamVjdHMuXG4gICAgICAgIC8vIFRoaXMgc3VwZXIgbWV0aG9kIHdpbGwgYWxzbyBudWxsIG91dCB5b3VyIHByb3BlcnRpZXMgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cblxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhFTFBFUiBNRVRIT0RcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzZXRDb21wbGV0ZWRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2V0Q29tcGxldGVkKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmlzQ29tcGxldGUgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgIHRoaXMuX3NhdmVJdGVtVGV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldFVuQ29tcGxldGVkXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNldFVuQ29tcGxldGVkKCkge1xuICAgICAgICB0aGlzLm1vZGVsLmlzQ29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB0aGlzLl9zYXZlSXRlbVRleHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBpc0NvbXBsZXRlXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGlzQ29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmlzQ29tcGxldGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgaGlkZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50LmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBzaG93XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQuc2hvdygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkl0ZW1Ub2dnbGVDb21wbGV0ZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uSXRlbVRvZ2dsZUNvbXBsZXRlKGV2ZW50KSB7XG4gICAgICAgIGxldCBpc0NoZWNrZWQgPSAkKGV2ZW50LnRhcmdldCkucHJvcCgnY2hlY2tlZCcpO1xuXG4gICAgICAgIHRoaXMubW9kZWwuaXNDb21wbGV0ZSA9IGlzQ2hlY2tlZDtcblxuICAgICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgICB0aGlzLl9zYXZlSXRlbVRleHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25JdGVtRWRpdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uSXRlbUVkaXQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5hZGRDbGFzcygnZWRpdGluZycpO1xuXG4gICAgICAgIHRoaXMuXyRpdGVtSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5fJGl0ZW1JbnB1dC5zZWxlY3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25Fc2NhcGVLZXlcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkVzY2FwZUtleShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IEtleS5FU0MpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0SXRlbVRleHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkVzY2FwZUtleVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b2RvVGV4dCA9IHRoaXMuXyRpdGVtSW5wdXQudmFsKCkudHJpbSgpO1xuXG4gICAgICAgIGlmICh0b2RvVGV4dCAhPSAnJykge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC50ZXh0ID0gdG9kb1RleHQ7XG4gICAgICAgICAgICB0aGlzLl9yZXNldEl0ZW1UZXh0KCk7XG4gICAgICAgICAgICB0aGlzLl9zYXZlSXRlbVRleHQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0SXRlbVRleHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9yZXNldEl0ZW1UZXh0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVzZXRJdGVtVGV4dCgpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudC5yZW1vdmVDbGFzcygnZWRpdGluZycpO1xuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gcmVzZXQgdGhlIGhpZGRlbiBpbnB1dCBiYWNrIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgICAgdGhpcy5fJGl0ZW1JbnB1dC52YWwodGhpcy5tb2RlbC50ZXh0KTtcbiAgICAgICAgdGhpcy5fJGl0ZW1MYWJlbC50ZXh0KHRoaXMubW9kZWwudGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgKlxuICAgICAqIEBtZXRob2QgX3NhdmVJdGVtVGV4dFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NhdmVJdGVtVGV4dCgpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSwgdHJ1ZSwgdHJ1ZSwgdGhpcy5tb2RlbCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE86IFlVSURvY19jb21tZW50XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIF9vbkl0ZW1SZW1vdmVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkl0ZW1SZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LlJFTU9WRUQsIHRydWUpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAqXG4gICAgICogQG1ldGhvZCBfb25FbnRlcktleVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRW50ZXJLZXkoZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvZG9UZXh0ID0gdGhpcy5fJGl0ZW1JbnB1dC52YWwoKS50cmltKCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBLZXkuRU5URVIpIHtcbiAgICAgICAgICAgIGlmICh0b2RvVGV4dCAhPSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudGV4dCA9IHRvZG9UZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0SXRlbVRleHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYXZlSXRlbVRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRJdGVtVGV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpc3RJdGVtQ29tcG9uZW50O1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vdXRpbC9VdGlsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9qcXVlcnkuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvaGFuZGxlYmFycy5kLnRzJy8+XG4gICAgLy8vPHJlZmVyZW5jZSBwYXRoPSdfZGVjbGFyZS9ncmVlbnNvY2suZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvanF1ZXJ5LmV2ZW50TGlzdGVuZXIuZC50cycvPlxuICAgIC8vLzxyZWZlcmVuY2UgcGF0aD0nX2RlY2xhcmUvbG9nLmQudHMnLz5cbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9VdGlsJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkJhc2VPYmplY3RcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgYW4gYWJzdHJhY3QgY2xhc3MgdGhhdCBwcm92aWRlcyBjb21tb24gcHJvcGVydGllcyBhbmQgZnVuY3Rpb25hbGl0eSBmb3IgYWxsIFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgQmFzZU9iamVjdFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGNvcmVcbiAgICAgKiBAcmVxdWlyZXMgVXRpbFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBCYXNlT2JqZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQmFzZU9iamVjdCgpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHNqc0lkIChTdHJ1Y3R1cmVKUyBJRCkgaXMgYSB1bmlxdWUgaWRlbnRpZmllciBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIG1vc3QgU3RydWN0dXJlSlMgb2JqZWN0cyB1cG9uIGluc3RhbnRpYXRpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHNqc0lkXG4gICAgICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHdyaXRlT25jZVxuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2pzSWQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5zanNJZCA9IFV0aWwudW5pcXVlSWQoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgZnVsbHkgcXVhbGlmaWVkIGNsYXNzIG5hbWUgb2YgYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldFF1YWxpZmllZENsYXNzTmFtZVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjbGFzcyBuYW1lLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgc29tZUNsYXNzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gU29tZUNsYXNzXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5nZXRRdWFsaWZpZWRDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gVXRpbC5nZXROYW1lKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHB1cnBvc2Ugb2YgdGhlIGRlc3Ryb3kgbWV0aG9kIGlzIHRvIG1ha2UgYW4gb2JqZWN0IHJlYWR5IGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uIFRoaXNcbiAgICAgICAgICogc2hvdWxkIGJlIHRob3VnaHQgb2YgYXMgYSBvbmUgd2F5IGZ1bmN0aW9uLiBPbmNlIGRlc3Ryb3kgaXMgY2FsbGVkIG5vIGZ1cnRoZXIgbWV0aG9kcyBzaG91bGQgYmVcbiAgICAgICAgICogY2FsbGVkIG9uIHRoZSBvYmplY3Qgb3IgcHJvcGVydGllcyBhY2Nlc3NlZC4gSXQgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRob3NlIHdobyBpbXBsZW1lbnQgdGhpc1xuICAgICAgICAgKiBmdW5jdGlvbiB0byBzdG9wIGFsbCBydW5uaW5nIFRpbWVycywgYWxsIHJ1bm5pbmcgU291bmRzLCBhbmQgdGFrZSBhbnkgb3RoZXIgc3RlcHMgbmVjZXNzYXJ5IHRvIG1ha2UgYW5cbiAgICAgICAgICogb2JqZWN0IGVsaWdpYmxlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEJ5IGRlZmF1bHQgdGhlIGRlc3Ryb3kgbWV0aG9kIHdpbGwgbnVsbCBvdXQgYWxsIHByb3BlcnRpZXMgb2YgdGhlIGNsYXNzIGF1dG9tYXRpY2FsbHkuIFlvdSBzaG91bGQgY2FsbCBkZXN0cm95XG4gICAgICAgICAqIG9uIG90aGVyIG9iamVjdHMgYmVmb3JlIGNhbGxpbmcgdGhlIHN1cGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICAgICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGVzdHJveSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlT2JqZWN0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQmFzZU9iamVjdDtcbiAgICB9KSgpO1xuICAgIHJldHVybiBCYXNlT2JqZWN0O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0Jhc2VPYmplY3QnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4vQmFzZU9iamVjdCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJPYmplY3RNYW5hZ2VyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgcHJvdmlkZXMgZW5hYmxpbmcgYW5kIGRpc2FibGluZyBmdW5jdGlvbmFsaXR5IGZvciBtb3N0IFN0cnVjdHVyZUpTIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgT2JqZWN0TWFuYWdlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAZXh0ZW5kcyBCYXNlT2JqZWN0XG4gICAgICogQHN1Ym1vZHVsZSBjb3JlXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIE9iamVjdE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoT2JqZWN0TWFuYWdlciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gT2JqZWN0TWFuYWdlcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgaXNFbmFibGVkIHByb3BlcnR5IGlzIHVzZWQgdG8ga2VlcCB0cmFjayBvZiB0aGUgZW5hYmxlZCBzdGF0ZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc0VuYWJsZWRcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGVuYWJsZSBtZXRob2QgaXMgcmVzcG9uc2libGUgZm9yIGVuYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBlbmFibGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBlbmFibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlLmFkZEV2ZW50TGlzdGVuZXIoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5lbmFibGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgcmV0dXJuIHN1cGVyLmVuYWJsZSgpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgT2JqZWN0TWFuYWdlci5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkaXNhYmxlIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgZGlzYWJsaW5nIGV2ZW50IGxpc3RlbmVycyBhbmQvb3IgY2hpbGRyZW4gb2YgdGhlIGNvbnRhaW5pbmcgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNhYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGRpc2FibGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5fY2hpbGRJbnN0YW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuaGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqICAgICAgICAgIHRoaXMuX2NoaWxkSW5zdGFuY2UuZGlzYWJsZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICByZXR1cm4gc3VwZXIuZGlzYWJsZSgpO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIE9iamVjdE1hbmFnZXIucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBPYmplY3RNYW5hZ2VyO1xuICAgIH0pKEJhc2VPYmplY3QpO1xuICAgIHJldHVybiBPYmplY3RNYW5hZ2VyO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9ldmVudC9Mb2NhbFN0b3JhZ2VFdmVudCcsICcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInLCAnLi4vbW9kZWwvQmFzZU1vZGVsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIExvY2FsU3RvcmFnZUV2ZW50ID0gcmVxdWlyZSgnLi4vZXZlbnQvTG9jYWxTdG9yYWdlRXZlbnQnKTtcbiAgICB2YXIgRXZlbnREaXNwYXRjaGVyID0gcmVxdWlyZSgnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJyk7XG4gICAgdmFyIEJhc2VNb2RlbCA9IHJlcXVpcmUoJy4uL21vZGVsL0Jhc2VNb2RlbCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLi4uXG4gICAgICpcbiAgICAgKiBAY2xhc3MgTG9jYWxTdG9yYWdlQ29udHJvbGxlclxuICAgICAqIEBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGNvbnRyb2xsZXJcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEByZXF1aXJlcyBMb2NhbFN0b3JhZ2VFdmVudFxuICAgICAqIEByZXF1aXJlcyBCYXNlTW9kZWxcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKi9cbiAgICB2YXIgTG9jYWxTdG9yYWdlQ29udHJvbGxlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhMb2NhbFN0b3JhZ2VDb250cm9sbGVyLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBMb2NhbFN0b3JhZ2VDb250cm9sbGVyKCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEN1cnJlbnQgdXNlciBuYW1lc3BhY2UuIFRoZSBuYW1lc3BhY2UgaXMgb3B0aW9uYWwuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9uYW1lc3BhY2VcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBkZWZhdWx0TmFtZXNwYWNlXG4gICAgICAgICAgICAgKiBAb3B0aW9uYWxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fbmFtZXNwYWNlID0gJ2RlZmF1bHROYW1lc3BhY2UnO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB3aW5kb3cubG9jYWxTdG9yYWdlIGZvciBmYXN0ZXIgYWNjZXNzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAgKiBAdHlwZSB7U3RvcmFnZX1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdG9yYWdlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuX29uTG9jYWxTdG9yYWdlRXZlbnQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBzdG9yYWdlIG5hbWVzcGFjZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHNldE5hbWVzcGFjZVxuICAgICAgICAgKiBAcGFyYW0gbmFtZXNwYWNlXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5zZXROYW1lc3BhY2UgPSBmdW5jdGlvbiAobmFtZXNwYWNlKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgc3RvcmFnZSBuYW1lc3BhY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXROYW1lc3BhY2VcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIExvY2FsU3RvcmFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldE5hbWVzcGFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgYSBrZXkvdmFsdWUgcGFpciB0byBsb2NhbFN0b3JhZ2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkSXRlbVxuICAgICAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBkYXRhIHtPYmplY3R9XG4gICAgICAgICAqIEBwYXJhbSB1c2VOYW1lc3BhY2Uge2Jvb2xlYW59XG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5hZGRJdGVtID0gZnVuY3Rpb24gKGtleSwgZGF0YSwgdXNlTmFtZXNwYWNlKSB7XG4gICAgICAgICAgICBpZiAodXNlTmFtZXNwYWNlID09PSB2b2lkIDApIHsgdXNlTmFtZXNwYWNlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmICh1c2VOYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmdldE5hbWVzcGFjZSgpICsga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCYXNlTW9kZWwpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS50b0pTT04oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIExvY2FsIFN0b3JhZ2Uga2V5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEl0ZW1cbiAgICAgICAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gW3VzZU5hbWVzcGFjZT1mYWxzZV0ge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICovXG4gICAgICAgIExvY2FsU3RvcmFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiAoa2V5LCB1c2VOYW1lc3BhY2UpIHtcbiAgICAgICAgICAgIGlmICh1c2VOYW1lc3BhY2UgPT09IHZvaWQgMCkgeyB1c2VOYW1lc3BhY2UgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKHVzZU5hbWVzcGFjZSkge1xuICAgICAgICAgICAgICAgIGtleSA9IHRoaXMuZ2V0TmFtZXNwYWNlKCkgKyBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBhc3N1bWluZyB0aGUgZXJyb3IgaXMgYmVjYXVzZSB2YWx1ZSBiZWluZyBwYXJzZWQgaXMgYSBwbGFpbiBzdHJpbmcgd2l0aCBzcGFjZXMuXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyBhbGwgaXRlbXMgaW4gbG9jYWwgc3RvcmFnZSBhcyBhbiBPYmplY3Qgd2l0aCBrZXkgYW5kIHZhbHVlIHByb3BlcnRpZXMgdGhhdCBoYXMgYSBjZXJ0YWluIG5hbWVzcGFjZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRJdGVtc1dpdGhOYW1lc3BhY2VcbiAgICAgICAgICogQHBhcmFtIG5hbWVzcGFjZSB7c3RyaW5nfSBUaGUgbmFtZXNwYWNlIHRoYXQgaXMgdXNlZCB0byBpdGVtcy4gSWYgYSBuYW1lc3BhY2UgaXMgbm90IHBhc3NlZCBpbiB0aGVuIHRoZSBjdXJyZW50IHNldCBuYW1lc3BhY2Ugd2lsbCBiZSB1c2VkLlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIExvY2FsU3RvcmFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldEl0ZW1zV2l0aE5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UpIHtcbiAgICAgICAgICAgIGlmIChuYW1lc3BhY2UgPT09IHZvaWQgMCkgeyBuYW1lc3BhY2UgPSB0aGlzLl9uYW1lc3BhY2U7IH1cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5nZXRMZW5ndGgoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbmd0aDsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5fbG9jYWxTdG9yYWdlLmtleShpXzEpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZihuYW1lc3BhY2UpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYWxsIGl0ZW1zIGluIGxvY2FsIHN0b3JhZ2UgYXMgYW4gT2JqZWN0IHdpdGgga2V5IGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldEFsbEl0ZW1zXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKi9cbiAgICAgICAgTG9jYWxTdG9yYWdlQ29udHJvbGxlci5wcm90b3R5cGUuZ2V0QWxsSXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSAwOyBpXzIgPCBsZW5ndGg7IGlfMisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2xvY2FsU3RvcmFnZS5rZXkoaV8yKTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2gob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGVsZXRlcyBhIGtleS92YWx1ZSBwYWlyIGZyb20gdGhlIExvY2FsIFN0b3JhZ2UgY29sbGVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVJdGVtXG4gICAgICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFt1c2VOYW1lc3BhY2U9ZmFsc2VdIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gKGtleSwgdXNlTmFtZXNwYWNlKSB7XG4gICAgICAgICAgICBpZiAodXNlTmFtZXNwYWNlID09PSB2b2lkIDApIHsgdXNlTmFtZXNwYWNlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmICh1c2VOYW1lc3BhY2UpIHtcbiAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmdldE5hbWVzcGFjZSgpICsga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGl0ZW1zIHN0b3JhZ2UgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRMZW5ndGhcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIExvY2FsU3RvcmFnZUNvbnRyb2xsZXIucHJvdG90eXBlLmdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0b3JhZ2UubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgc2l6ZSBvZiB0aGUgTG9jYWwgU3RvcmFnZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRTaXplXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeSh0aGlzLl9sb2NhbFN0b3JhZ2UpKS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGFsbCBrZXkvdmFsdWUgcGFpcnMgZnJvbSB0aGUgTG9jYWwgU3RvcmFnZSBhcmVhLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VDb250cm9sbGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfb25Mb2NhbFN0b3JhZ2VFdmVudFxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQge1N0b3JhZ2VFdmVudH0gVGhlIG5hdGl2ZSBicm93c2VyIGV2ZW50IGZvciBXZWIgU3RvcmFnZS5cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgTG9jYWxTdG9yYWdlQ29udHJvbGxlci5wcm90b3R5cGUuX29uTG9jYWxTdG9yYWdlRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTG9jYWxTdG9yYWdlRXZlbnQoTG9jYWxTdG9yYWdlRXZlbnQuU1RPUkFHRSwgZmFsc2UsIGZhbHNlLCBldmVudCkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTG9jYWxTdG9yYWdlQ29udHJvbGxlcjtcbiAgICB9KShFdmVudERpc3BhdGNoZXIpO1xuICAgIHJldHVybiBMb2NhbFN0b3JhZ2VDb250cm9sbGVyO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vdXRpbC9TdHJpbmdVdGlsJywgJy4uL2V2ZW50L1JvdXRlckV2ZW50JywgJy4uL21vZGVsL1JvdXRlJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIFN0cmluZ1V0aWwgPSByZXF1aXJlKCcuLi91dGlsL1N0cmluZ1V0aWwnKTtcbiAgICB2YXIgUm91dGVyRXZlbnQgPSByZXF1aXJlKCcuLi9ldmVudC9Sb3V0ZXJFdmVudCcpO1xuICAgIHZhciBSb3V0ZSA9IHJlcXVpcmUoJy4uL21vZGVsL1JvdXRlJyk7XG4gICAgLyoqXG4gICAgICogVGhlICoqUm91dGVyKiogY2xhc3MgaXMgYSBzdGF0aWMgY2xhc3MgYWxsb3dzIHlvdSB0byBhZGQgZGlmZmVyZW50IHJvdXRlIHBhdHRlcm5zIHRoYXQgY2FuIGJlIG1hdGNoZWQgdG8gaGVscCBjb250cm9sIHlvdXIgYXBwbGljYXRpb24uIExvb2sgYXQgdGhlIFJvdXRlci57eyNjcm9zc0xpbmsgXCJSb3V0ZXIvYWRkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgZm9yIG1vcmUgZGV0YWlscyBhbmQgZXhhbXBsZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgUm91dGVyXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgY29udHJvbGxlclxuICAgICAqIEByZXF1aXJlcyBSb3V0ZVxuICAgICAqIEByZXF1aXJlcyBSb3V0ZXJFdmVudFxuICAgICAqIEByZXF1aXJlcyBTdHJpbmdVdGlsXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBSb3V0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBSb3V0ZXIoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tSb3V0ZXJdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgUm91dGVyIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5hZGQqKiBtZXRob2QgYWxsb3dzIHlvdSB0byBsaXN0ZW4gZm9yIHJvdXRlIHBhdHRlcm5zIHRvIGJlIG1hdGNoZWQuIFdoZW4gYSBtYXRjaCBpcyBmb3VuZCB0aGUgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBwYXNzaW5nIGEge3sjY3Jvc3NMaW5rIFwiUm91dGVyRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZVBhdHRlcm4ge3N0cmluZ30gVGhlIHN0cmluZyBwYXR0ZXJuIHlvdSB3YW50IHRvIGhhdmUgbWF0Y2gsIHdoaWNoIGNhbiBiZSBhbnkgb2YgdGhlIGZvbGxvd2luZyBjb21iaW5hdGlvbnMge30sIDo6LCAqLCA/LCAnJy4gU2VlIHRoZSBleGFtcGxlcyBiZWxvdyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiBhIHJlcXVlc3QgbWF0Y2hlcyB0aGUgcm91dGVQYXR0ZXJuLiBJdCB3aWxsIHJlY2VpdmUgYSB7eyNjcm9zc0xpbmsgXCJSb3V0ZXJFdmVudFwifX17ey9jcm9zc0xpbmt9fSBvYmplY3QuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFja1Njb3BlIHthbnl9IFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiBhZGRpbmcgYSByb3V0ZSBsaXN0ZW5lciBhbmQgdGhlIGZ1bmN0aW9uIGNhbGxiYWNrIGJlbG93LlxuICAgICAgICAgKiAgICAgUm91dGVyLmFkZCgnL2dhbWVzL3tnYW1lTmFtZX0vOmxldmVsOi8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gVGhlIGFib3ZlIHJvdXRlIGxpc3RlbmVyIHdvdWxkIG1hdGNoIHRoZSBiZWxvdyB1cmw6XG4gICAgICAgICAqICAgICAvLyB3d3cuc2l0ZS5jb20vIy9nYW1lcy9hc3Rlcm9pZHMvMi9cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFRoZSBDYWxsIGJhY2sgcmVjZWl2ZXMgYSBSb3V0ZXJFdmVudCBvYmplY3QuXG4gICAgICAgICAqICAgICBfb25Sb3V0ZUhhbmRsZXIocm91dGVyRXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICBjb25zb2xlLmxvZyhyb3V0ZXJFdmVudC5wYXJhbXMpO1xuICAgICAgICAgKiAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiBSb3V0ZSBQYXR0ZXJuIE9wdGlvbnM6XG4gICAgICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICogKio6b3B0aW9uYWw6KiogVGhlIHR3byBjb2xvbnMgKio6OioqIG1lYW5zIGEgcGFydCBvZiB0aGUgaGFzaCB1cmwgaXMgb3B0aW9uYWwgZm9yIHRoZSBtYXRjaC4gVGhlIHRleHQgYmV0d2VlbiBjYW4gYmUgYW55dGhpbmcgeW91IHdhbnQgaXQgdG8gYmUuXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkKCcvY29udGFjdC86bmFtZTovJywgdGhpcy5fbWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFdpbGwgbWF0Y2ggb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgICAqICAgICAvLyB3d3cuc2l0ZS5jb20vIy9jb250YWN0L1xuICAgICAgICAgKiAgICAgLy8gd3d3LnNpdGUuY29tLyMvY29udGFjdC9oZWF0aGVyL1xuICAgICAgICAgKiAgICAgLy8gd3d3LnNpdGUuY29tLyMvY29udGFjdC9qb2huL1xuICAgICAgICAgKlxuICAgICAgICAgKlxuICAgICAgICAgKiAqKntyZXF1aXJlZH0qKiBUaGUgdHdvIGN1cmx5IGJyYWNrZXRzICoqe30qKiBtZWFucyBhIHBhcnQgb2YgdGhlIGhhc2ggdXJsIGlzIHJlcXVpcmVkIGZvciB0aGUgbWF0Y2guIFRoZSB0ZXh0IGJldHdlZW4gY2FuIGJlIGFueXRoaW5nIHlvdSB3YW50IGl0IHRvIGJlLlxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgUm91dGVyLmFkZCgnL3Byb2R1Y3Qve3Byb2R1Y3ROYW1lfS8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gV2lsbCBtYXRjaCBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgICogICAgIC8vIHd3dy5zaXRlLmNvbS8jL3Byb2R1Y3Qvc2hvZXMvXG4gICAgICAgICAqICAgICAvLyB3d3cuc2l0ZS5jb20vIy9wcm9kdWN0L2phY2tldHMvXG4gICAgICAgICAqXG4gICAgICAgICAqXG4gICAgICAgICAqICoqXFwqKiogVGhlIGFzdGVyaXNrIGNoYXJhY3RlciBtZWFucyBpdCB3aWxsIG1hdGNoIGFsbCBvciBwYXJ0IG9mIHBhcnQgdGhlIGhhc2ggdXJsLlxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgUm91dGVyLmFkZCgnKicsIHRoaXMuX21ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBXaWxsIG1hdGNoIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgICAgKiAgICAgLy8gd3d3LnNpdGUuY29tLyMvYW55dGhpbmcvXG4gICAgICAgICAqICAgICAvLyB3d3cuc2l0ZS5jb20vIy9tYXRjaGVzL2FueS9oYXNoL3VybC9cbiAgICAgICAgICogICAgIC8vIHd3dy5zaXRlLmNvbS8jL3JlYWxseS9pdC9tYXRjaGVzL2FueS9hbmQvYWxsL2hhc2gvdXJscy9cbiAgICAgICAgICpcbiAgICAgICAgICpcbiAgICAgICAgICogKio/KiogVGhlIHF1ZXN0aW9uIG1hcmsgY2hhcmFjdGVyIG1lYW5zIGl0IHdpbGwgbWF0Y2ggYSBxdWVyeSBzdHJpbmcgZm9yIHRoZSBoYXNoIHVybC5cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIFJvdXRlci5hZGQoJz8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gV2lsbCBtYXRjaCBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgICogICAgIC8vIHd3dy5zaXRlLmNvbS8jLz9vbmU9MSZ0d289MiZ0aHJlZT0zXG4gICAgICAgICAqICAgICAvLyB3d3cuc2l0ZS5jb20vIz9vbmU9MSZ0d289MiZ0aHJlZT0zXG4gICAgICAgICAqXG4gICAgICAgICAqXG4gICAgICAgICAqICoqJycqKiBUaGUgZW1wdHkgc3RyaW5nIG1lYW5zIGl0IHdpbGwgbWF0Y2ggd2hlbiB0aGVyZSBhcmUgbm8gaGFzaCB1cmwuXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkKCcnLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAgICAgKiAgICAgUm91dGVyLmFkZCgnLycsIHRoaXMuX21ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBXaWxsIG1hdGNoIG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgICAgKiAgICAgLy8gd3d3LnNpdGUuY29tL1xuICAgICAgICAgKiAgICAgLy8gd3d3LnNpdGUuY29tLyMvXG4gICAgICAgICAqXG4gICAgICAgICAqXG4gICAgICAgICAqIE90aGVyIHBvc3NpYmxlIGNvbWJpbmF0aW9ucyBidXQgbm90IGxpbWl0ZWQgdG9vOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgUm91dGVyLmFkZCgnL2dhbWVzL3tnYW1lTmFtZX0vOmxldmVsOi8nLCB0aGlzLl9tZXRob2QxLCB0aGlzKTtcbiAgICAgICAgICogICAgIFJvdXRlci5hZGQoJy97Y2F0ZWdvcnl9L2Jsb2cvJywgdGhpcy5fbWV0aG9kMiwgdGhpcyk7XG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkKCcvaG9tZS8/JywgdGhpcy5fbWV0aG9kMywgdGhpcyk7XG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkKCcvYWJvdXQvKicsIHRoaXMuX21ldGhvZDQsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLmFkZCA9IGZ1bmN0aW9uIChyb3V0ZVBhdHRlcm4sIGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgICAgICBSb3V0ZXIuZW5hYmxlKCk7XG4gICAgICAgICAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUocm91dGVQYXR0ZXJuLCBjYWxsYmFjaywgY2FsbGJhY2tTY29wZSk7XG4gICAgICAgICAgICBSb3V0ZXIuX3JvdXRlcy5wdXNoKHJvdXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5yZW1vdmUqKiBtZXRob2Qgd2lsbCByZW1vdmUgb25lIG9mIHRoZSBhZGRlZCByb3V0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlXG4gICAgICAgICAqIEBwYXJhbSByb3V0ZVBhdHRlcm4ge3N0cmluZ30gTXVzdCBiZSB0aGUgc2FtZSBzdHJpbmcgcGF0dGVybiB5b3UgcGFzdGVkIGludG8gdGhlIHt7I2Nyb3NzTGluayBcIlJvdXRlci9hZGQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gTXVzdCBiZSB0aGUgc2FtZSBmdW5jdGlvbiB5b3UgcGFzdGVkIGludG8gdGhlIHt7I2Nyb3NzTGluayBcIlJvdXRlci9hZGQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZC5cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX0gTXVzdCBiZSB0aGUgc2FtZSBzY29wZSBvZmYgdGhlIGNhbGxiYWNrIHBhdHRlcm4geW91IHBhc3RlZCBpbnRvIHRoZSB7eyNjcm9zc0xpbmsgXCJSb3V0ZXIvYWRkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiBhZGRpbmcgYSByb3V0ZSBsaXN0ZW5lci5cbiAgICAgICAgICogICAgIFJvdXRlci5hZGQoJy9nYW1lcy97Z2FtZU5hbWV9LzpsZXZlbDovJywgdGhpcy5fbWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEV4YW1wbGUgb2YgcmVtb3ZpbmcgdGhlIHNhbWUgYWRkZWQgcm91dGUgbGlzdGVuZXIgYWJvdmUuXG4gICAgICAgICAqICAgICBSb3V0ZXIucmVtb3ZlKCcvZ2FtZXMve2dhbWVOYW1lfS86bGV2ZWw6LycsIHRoaXMuX21ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIucmVtb3ZlID0gZnVuY3Rpb24gKHJvdXRlUGF0dGVybiwgY2FsbGJhY2ssIGNhbGxiYWNrU2NvcGUpIHtcbiAgICAgICAgICAgIHZhciByb3V0ZTtcbiAgICAgICAgICAgIC8vIFNpbmNlIHdlIGFyZSByZW1vdmluZyAoc3BsaWNlKSBmcm9tIHJvdXRlcyB3ZSBuZWVkIHRvIGNoZWNrIHRoZSBsZW5ndGggZXZlcnkgaXRlcmF0aW9uLlxuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gUm91dGVyLl9yb3V0ZXMubGVuZ3RoIC0gMTsgaV8xID49IDA7IGlfMS0tKSB7XG4gICAgICAgICAgICAgICAgcm91dGUgPSBSb3V0ZXIuX3JvdXRlc1tpXzFdO1xuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5yb3V0ZVBhdHRlcm4gPT09IHJvdXRlUGF0dGVybiAmJiByb3V0ZS5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgcm91dGUuY2FsbGJhY2tTY29wZSA9PT0gY2FsbGJhY2tTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICBSb3V0ZXIuX3JvdXRlcy5zcGxpY2UoaV8xLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgKipSb3V0ZXIuYWRkRGVmYXVsdCoqIG1ldGhvZCBpcyBtZWFudCB0byB0cmlnZ2VyIGEgY2FsbGJhY2sgZnVuY3Rpb24gaWYgdGhlcmUgYXJlIG5vIHJvdXRlIG1hdGNoZXMgYXJlIGZvdW5kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZERlZmF1bHRcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn1cbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkRGVmYXVsdCh0aGlzLl9ub1JvdXRlc0ZvdW5kSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIuYWRkRGVmYXVsdCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgY2FsbGJhY2tTY29wZSkge1xuICAgICAgICAgICAgUm91dGVyLl9kZWZhdWx0Um91dGUgPSBuZXcgUm91dGUoJycsIGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5yZW1vdmVEZWZhdWx0KiogbWV0aG9kIHdpbGwgcmVtb3ZlIHRoZSBkZWZhdWx0IGNhbGxiYWNrIHRoYXQgd2FzIGFkZGVkIGJ5IHRoZSAqKlJvdXRlci5hZGREZWZhdWx0KiogbWV0aG9kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZURlZmF1bHRcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBSb3V0ZXIucmVtb3ZlRGVmYXVsdCgpO1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLnJlbW92ZURlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSb3V0ZXIuX2RlZmF1bHRSb3V0ZSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBjdXJyZW50IGhhc2ggdXJsIG1pbnVzIHRoZSAjIG9yICMhIHN5bWJvbChzKS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRIYXNoXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFJldHVybnMgY3VycmVudCBoYXNoIHVybCBtaW51cyB0aGUgIyBvciAjISBzeW1ib2wocykuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc3RyID0gUm91dGVyLmdldEhhc2goKTtcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5nZXRIYXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGhhc2ggPSBSb3V0ZXIuX3dpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgICAgICAgICAgdmFyIHN0ckluZGV4ID0gKGhhc2guc3Vic3RyKDAsIDIpID09PSAnIyEnKSA/IDIgOiAxO1xuICAgICAgICAgICAgcmV0dXJuIGhhc2guc3Vic3RyaW5nKHN0ckluZGV4KTsgLy8gUmV0dXJuIGV2ZXJ5dGhpbmcgYWZ0ZXIgIyBvciAjIVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlICoqUm91dGVyLmVuYWJsZSoqIG1ldGhvZCB3aWxsIGFsbG93IHRoZSBSb3V0ZXIgY2xhc3MgdG8gbGlzdGVuIGZvciB0aGUgaGFzaGNoYW5nZSBldmVudC4gQnkgZGVmYXVsdCB0aGUgUm91dGVyIGNsYXNzIGlzIGVuYWJsZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZW5hYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgUm91dGVyLmVuYWJsZSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChSb3V0ZXIuaXNFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFJvdXRlci5fd2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIuX3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgUm91dGVyLl9vbkhhc2hDaGFuZ2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFJvdXRlci5fd2luZG93LmF0dGFjaEV2ZW50KCdvbmhhc2hjaGFuZ2UnLCBSb3V0ZXIuX29uSGFzaENoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSb3V0ZXIuaXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5kaXNhYmxlKiogbWV0aG9kIHdpbGwgc3RvcCB0aGUgUm91dGVyIGNsYXNzIGZyb20gbGlzdGVuaW5nIGZvciB0aGUgaGFzaGNoYW5nZSBldmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNhYmxlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgUm91dGVyLmRpc2FibGUoKTtcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKFJvdXRlci5pc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFJvdXRlci5fd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIuX3dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgUm91dGVyLl9vbkhhc2hDaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgUm91dGVyLl93aW5kb3cuZGV0YWNoRXZlbnQoJ29uaGFzaGNoYW5nZScsIFJvdXRlci5fb25IYXNoQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJvdXRlci5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5zdGFydCoqIG1ldGhvZCBpcyBtZWFudCB0byB0cmlnZ2VyIG9yIGNoZWNrIHRoZSBoYXNoIHVybCBvbiBwYWdlIGxvYWQuXG4gICAgICAgICAqIEVpdGhlciB5b3UgY2FuIGNhbGwgdGhpcyBtZXRob2QgYWZ0ZXIgeW91IGFkZCBhbGwgeW91ciByb3V0ZXJzIG9yIGFmdGVyIGFsbCBkYXRhIGlzIGxvYWRlZC5cbiAgICAgICAgICogSXQgaXMgcmVjb21tZW5kIHlvdSBvbmx5IGNhbGwgdGhpcyBvbmNlIHBlciBwYWdlIG9yIGFwcGxpY2F0aW9uIGluc3RhbnRpYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3RhcnRcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAvLyBFeGFtcGxlIG9mIGFkZGluZyByb3V0ZXMgYW5kIGNhbGxpbmcgdGhlIHN0YXJ0IG1ldGhvZC5cbiAgICAgICAgICogICAgIFJvdXRlci5hZGQoJy9nYW1lcy97Z2FtZU5hbWV9LzpsZXZlbDovJywgdGhpcy5fbWV0aG9kMSwgdGhpcyk7XG4gICAgICAgICAqICAgICBSb3V0ZXIuYWRkKCcve2NhdGVnb3J5fS9ibG9nLycsIHRoaXMuX21ldGhvZDIsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgUm91dGVyLnN0YXJ0KCk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KFJvdXRlci5fb25IYXNoQ2hhbmdlLCAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5uYXZpZ2F0ZVRvKiogbWV0aG9kIGFsbG93cyB5b3UgdG8gY2hhbmdlIHRoZSBoYXNoIHVybCBhbmQgdG8gdHJpZ2dlciBhIHJvdXRlXG4gICAgICAgICAqIHRoYXQgbWF0Y2hlcyB0aGUgc3RyaW5nIHZhbHVlLiBUaGUgc2Vjb25kIHBhcmFtZXRlciBpcyAqKnNpbGVudCoqIGFuZCBpcyAqKmZhbHNlKiogYnlcbiAgICAgICAgICogZGVmYXVsdC4gVGhpcyBhbGxvd3MgeW91IHRvIHVwZGF0ZSB0aGUgaGFzaCB1cmwgd2l0aG91dCBjYXVzaW5nIGEgcm91dGUgY2FsbGJhY2sgdG8gYmVcbiAgICAgICAgICogZXhlY3V0ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgbmF2aWdhdGVUb1xuICAgICAgICAgKiBAcGFyYW0gcm91dGUge1N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFtzaWxlbnQ9ZmFsc2VdIHtCb29sZWFufVxuICAgICAgICAgKiBAcGFyYW0gW2Rpc2FibGVIaXN0b3J5PWZhbHNlXSB7Qm9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAvLyBUaGlzIHdpbGwgdXBkYXRlIHRoZSBoYXNoIHVybCBhbmQgdHJpZ2dlciB0aGUgbWF0Y2hpbmcgcm91dGUuXG4gICAgICAgICAqICAgICBSb3V0ZXIubmF2aWdhdGVUbygnL2dhbWVzL2FzdGVyb2lkcy8yLycpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gVGhpcyB3aWxsIHVwZGF0ZSB0aGUgaGFzaCB1cmwgYnV0IHdpbGwgbm90IHRyaWdnZXIgdGhlIG1hdGNoaW5nIHJvdXRlLlxuICAgICAgICAgKiAgICAgUm91dGVyLm5hdmlnYXRlVG8oJy9nYW1lcy9hc3Rlcm9pZHMvMi8nLCB0cnVlKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFRoaXMgd2lsbCBub3QgdXBkYXRlIHRoZSBoYXNoIHVybCBidXQgd2lsbCB0cmlnZ2VyIHRoZSBtYXRjaGluZyByb3V0ZS5cbiAgICAgICAgICogICAgIFJvdXRlci5uYXZpZ2F0ZVRvKCcvZ2FtZXMvYXN0ZXJvaWRzLzIvJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIubmF2aWdhdGVUbyA9IGZ1bmN0aW9uIChyb3V0ZSwgc2lsZW50LCBkaXNhYmxlSGlzdG9yeSkge1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gdm9pZCAwKSB7IHNpbGVudCA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoZGlzYWJsZUhpc3RvcnkgPT09IHZvaWQgMCkgeyBkaXNhYmxlSGlzdG9yeSA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoUm91dGVyLmlzRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm91dGUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RySW5kZXggPSAocm91dGUuc3Vic3RyKDAsIDIpID09PSAnIyEnKSA/IDIgOiAxO1xuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUuc3Vic3RyaW5nKHN0ckluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVuZm9yY2Ugc3RhcnRpbmcgc2xhc2hcbiAgICAgICAgICAgIGlmIChyb3V0ZS5jaGFyQXQoMCkgIT09ICcvJyAmJiBSb3V0ZXIuZm9yY2VTbGFzaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJvdXRlID0gJy8nICsgcm91dGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlzYWJsZUhpc3RvcnkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIuX2NoYW5nZVJvdXRlKHJvdXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUm91dGVyLnVzZURlZXBMaW5raW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBSb3V0ZXIuZGlzYWJsZSgpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcm91dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFJvdXRlci5lbmFibGUsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSByb3V0ZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgUm91dGVyLl9jaGFuZ2VSb3V0ZShyb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgKipSb3V0ZXIuY2xlYXIqKiB3aWxsIHJlbW92ZSBhbGwgcm91dGUncyBhbmQgdGhlIGRlZmF1bHQgcm91dGUgZnJvbSB0aGUgUm91dGVyIGNsYXNzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgUm91dGVyLmNsZWFyKCk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUm91dGVyLl9yb3V0ZXMgPSBbXTtcbiAgICAgICAgICAgIFJvdXRlci5fZGVmYXVsdFJvdXRlID0gbnVsbDtcbiAgICAgICAgICAgIFJvdXRlci5faGFzaENoYW5nZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5kZXN0cm95KiogbWV0aG9kIHdpbGwgbnVsbCBvdXQgYWxsIHJlZmVyZW5jZXMgdG8gb3RoZXIgb2JqZWN0cyBpbiB0aGUgUm91dGVyIGNsYXNzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlc3Ryb3lcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBSb3V0ZXIuZGVzdHJveSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUm91dGVyLl93aW5kb3cgPSBudWxsO1xuICAgICAgICAgICAgUm91dGVyLl9yb3V0ZXMgPSBudWxsO1xuICAgICAgICAgICAgUm91dGVyLl9kZWZhdWx0Um91dGUgPSBudWxsO1xuICAgICAgICAgICAgUm91dGVyLl9oYXNoQ2hhbmdlRXZlbnQgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBzaW1wbGUgaGVscGVyIG1ldGhvZCB0byBjcmVhdGUgYSB1cmwgcm91dGUgZnJvbSBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIGFyZ3VtZW50cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBidWlsZFJvdXRlXG4gICAgICAgICAqIEBwYXJhbSAuLi5yZXN0IHsuLi5yZXN0fVxuICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzb21lUHJvcGVydHkgPSAnYXBpL2VuZHBvaW50JztcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBSb3V0ZXIuYnVpbGRSb3V0ZShzb21lUHJvcGVydHksICdwYXRoJywgNyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy9DcmVhdGVzICdhcGkvZW5kcG9pbnQvcGF0aC83J1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLmJ1aWxkUm91dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICByZXN0W19pIC0gMF0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3Quam9pbignLycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgY3VycmVudCByb3V0ZXIgZXZlbnQgdGhhdCB3YXMgbGFzdCB0cmlnZ2VyZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q3VycmVudFJvdXRlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFJvdXRlci5nZXRDdXJyZW50Um91dGUoKTtcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5nZXRDdXJyZW50Um91dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFJvdXRlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgaWYgdGhlIFdpbmRvdyBvYmplY3QgZGlzcGF0Y2hlcyBhIEhhc2hDaGFuZ2VFdmVudC5cbiAgICAgICAgICogVGhpcyBtZXRob2Qgd2lsbCBub3QgYmUgY2FsbGVkIGlmIHRoZSBSb3V0ZXIgaXMgZGlzYWJsZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX29uSGFzaENoYW5nZVxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQge0hhc2hDaGFuZ2VFdmVudH1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLl9vbkhhc2hDaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChSb3V0ZXIuYWxsb3dNYW51YWxEZWVwTGlua2luZyA9PT0gZmFsc2UgJiYgUm91dGVyLnVzZURlZXBMaW5raW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJvdXRlci5faGFzaENoYW5nZUV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICB2YXIgaGFzaCA9IFJvdXRlci5nZXRIYXNoKCk7XG4gICAgICAgICAgICBSb3V0ZXIuX2NoYW5nZVJvdXRlKGhhc2gpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG1ldGhvZCBpcyByZXNwb25zaWJsZSBmb3IgY2hlY2sgaWYgb25lIG9mIHRoZSByb3V0ZXMgbWF0Y2hlcyB0aGUgc3RyaW5nIHZhbHVlIHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfY2hhbmdlUm91dGVcbiAgICAgICAgICogQHBhcmFtIGhhc2gge3N0cmluZ31cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLl9jaGFuZ2VSb3V0ZSA9IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgICAgICB2YXIgcm91dGU7XG4gICAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgICB2YXIgcm91dGVyRXZlbnQgPSBudWxsO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgcm91dGUncy4gTm90ZTogd2UgbmVlZCB0byBjaGVjayB0aGUgbGVuZ3RoIGV2ZXJ5IGxvb3AgaW4gY2FzZSBvbmUgd2FzIHJlbW92ZWQuXG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSAwOyBpXzIgPCBSb3V0ZXIuX3JvdXRlcy5sZW5ndGg7IGlfMisrKSB7XG4gICAgICAgICAgICAgICAgcm91dGUgPSBSb3V0ZXIuX3JvdXRlc1tpXzJdO1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcm91dGUubWF0Y2goaGFzaCk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBtYXRjaC5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyRXZlbnQgPSBuZXcgUm91dGVyRXZlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyRXZlbnQucm91dGUgPSBtYXRjaC5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC5wYXJhbXMgPSBtYXRjaC5zbGljZSgwLCBtYXRjaC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC5yb3V0ZVBhdHRlcm4gPSByb3V0ZS5yb3V0ZVBhdHRlcm47XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50LnF1ZXJ5ID0gKGhhc2guaW5kZXhPZignPycpID4gLTEpID8gU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0KGhhc2gpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyRXZlbnQudGFyZ2V0ID0gUm91dGVyO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC5jdXJyZW50VGFyZ2V0ID0gUm91dGVyO1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYW55IGVtcHR5IHN0cmluZ3MgaW4gdGhlIGFycmF5IGR1ZSB0byB0aGUgOm9wdGlvbmFsOiByb3V0ZSBwYXR0ZXJuLlxuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB3ZSBhcmUgcmVtb3ZpbmcgKHNwbGljZSkgZnJvbSBwYXJhbXMgd2UgbmVlZCB0byBjaGVjayB0aGUgbGVuZ3RoIGV2ZXJ5IGl0ZXJhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHJvdXRlckV2ZW50LnBhcmFtcy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdXRlckV2ZW50LnBhcmFtc1tqXSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC5wYXJhbXMuc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIHdhcyBhIGhhc2ggY2hhbmdlIGV2ZW50IHRoZW4gc2V0IHRoZSBpbmZvIHdlIHdhbnQgdG8gc2VuZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFJvdXRlci5faGFzaENoYW5nZUV2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50Lm5ld1VSTCA9IFJvdXRlci5faGFzaENoYW5nZUV2ZW50Lm5ld1VSTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50Lm9sZFVSTCA9IFJvdXRlci5faGFzaENoYW5nZUV2ZW50Lm9sZFVSTDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50Lm5ld1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIEV4ZWN1dGUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBwYXNzIHRoZSByb3V0ZSBldmVudC5cbiAgICAgICAgICAgICAgICAgICAgcm91dGUuY2FsbGJhY2suY2FsbChyb3V0ZS5jYWxsYmFja1Njb3BlLCByb3V0ZXJFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgdHJpZ2dlciB0aGUgZmlyc3Qgcm91dGUgYW5kIHN0b3AgY2hlY2tpbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChSb3V0ZXIuYWxsb3dNdWx0aXBsZU1hdGNoZXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyByb3V0ZSdzIG1hdGNoZWQgYW5kIHRoZXJlIGlzIGEgZGVmYXVsdCByb3V0ZS4gVGhlbiBjYWxsIHRoYXQgZGVmYXVsdCByb3V0ZS5cbiAgICAgICAgICAgIGlmIChyb3V0ZXJFdmVudCA9PT0gbnVsbCAmJiBSb3V0ZXIuX2RlZmF1bHRSb3V0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50ID0gbmV3IFJvdXRlckV2ZW50KCk7XG4gICAgICAgICAgICAgICAgcm91dGVyRXZlbnQucm91dGUgPSBoYXNoO1xuICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50LnF1ZXJ5ID0gKGhhc2guaW5kZXhPZignPycpID4gLTEpID8gU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0KGhhc2gpIDogbnVsbDtcbiAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC50YXJnZXQgPSBSb3V0ZXI7XG4gICAgICAgICAgICAgICAgcm91dGVyRXZlbnQuY3VycmVudFRhcmdldCA9IFJvdXRlcjtcbiAgICAgICAgICAgICAgICBpZiAoUm91dGVyLl9oYXNoQ2hhbmdlRXZlbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZXJFdmVudC5uZXdVUkwgPSBSb3V0ZXIuX2hhc2hDaGFuZ2VFdmVudC5uZXdVUkw7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50Lm9sZFVSTCA9IFJvdXRlci5faGFzaENoYW5nZUV2ZW50Lm9sZFVSTDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlckV2ZW50Lm5ld1VSTCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBSb3V0ZXIuX2RlZmF1bHRSb3V0ZS5jYWxsYmFjay5jYWxsKFJvdXRlci5fZGVmYXVsdFJvdXRlLmNhbGxiYWNrU2NvcGUsIHJvdXRlckV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJvdXRlci5faGFzaENoYW5nZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIFJvdXRlci5fY3VycmVudFJvdXRlID0gcm91dGVyRXZlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYnJvd3NlciBXaW5kb3cgT2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX3dpbmRvd1xuICAgICAgICAgKiBAdHlwZSB7V2luZG93fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIuX3dpbmRvdyA9IHdpbmRvdztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbGlzdCBvZiB0aGUgYWRkZWQgUm91dGUgb2JqZWN0cy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IF9yb3V0ZXNcbiAgICAgICAgICogQHR5cGUge0FycmF5PFJvdXRlPn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLl9yb3V0ZXMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIGRlZmF1bHQgcm91dGUgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2RlZmF1bHRSb3V0ZVxuICAgICAgICAgKiBAdHlwZSB7Um91dGV9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5fZGVmYXVsdFJvdXRlID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBoYXNoIGNoYW5nZSBldmVudCB0aGF0IHdhcyBzZW50IGZyb20gdGhlIFdpbmRvdyBPYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfaGFzaENoYW5nZUV2ZW50XG4gICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5faGFzaENoYW5nZUV2ZW50ID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERldGVybWluZXMgaWYgdGhlIFJvdXRlciBjbGFzcyBpcyBlbmFibGVkIG9yIGRpc2FibGVkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgaXNFbmFibGVkXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAvLyBSZWFkIG9ubHkuXG4gICAgICAgICAqICAgICBjb25zb2xlLmxvZyhSb3V0ZXIuaXNFbmFibGVkKTtcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci51c2VEZWVwTGlua2luZyoqIHByb3BlcnR5IHRlbGxzIHRoZSBSb3V0ZXIgY2xhc3Mgd2VhdGhlciBpdCBzaG91bGQgY2hhbmdlIHRoZSBoYXNoIHVybCBvciBub3QuXG4gICAgICAgICAqIEJ5ICoqZGVmYXVsdCoqIHRoaXMgcHJvcGVydHkgaXMgc2V0IHRvICoqdHJ1ZSoqLiBJZiB5b3Ugc2V0IHRoZSBwcm9wZXJ0eSB0byAqKmZhbHNlKiogYW5kIHVzaW5nIHRoZSAqKlJvdXRlci5uYXZpZ2F0ZVRvKipcbiAgICAgICAgICogbWV0aG9kIHRoZSBoYXNoIHVybCB3aWxsIG5vdCBjaGFuZ2UuIFRoaXMgY2FuIGJlIHVzZWZ1bCBpZiB5b3UgYXJlIG1ha2luZyBhbiBhcHBsaWNhdGlvbiBvciBnYW1lIGFuZCB5b3UgZG9uJ3Qgd2FudCB0aGUgdXNlclxuICAgICAgICAgKiB0byBrbm93IGhvdyB0byBqdW1wIHRvIG90aGVyIHNlY3Rpb25zIGRpcmVjdGx5LiBTZWUgdGhlICoqUm91dGVyLnt7I2Nyb3NzTGluayBcIlJvdXRlci9hbGxvd01hbnVhbERlZXBMaW5raW5nOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319KiogdG8gZnVsbHkgY2hhbmdlIHRoZSBSb3V0ZXIgY2xhc3NcbiAgICAgICAgICogZnJvbSByZWx5aW5nIG9uIHRoZSBoYXNoIHVybCB0byBhbiBpbnRlcm5hbCBzdGF0ZSBjb250cm9sbGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgdXNlRGVlcExpbmtpbmdcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBSb3V0ZXIudXNlRGVlcExpbmtpbmcgPSB0cnVlO1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLnVzZURlZXBMaW5raW5nID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSAqKlJvdXRlci5hbGxvd01hbnVhbERlZXBMaW5raW5nKiogcHJvcGVydHkgdGVsbHMgdGhlIFJvdXRlciBjbGFzcyB3ZWF0aGVyIGl0IHNob3VsZCBjaGVjayBmb3Igcm91dGUgbWF0Y2hlcyBpZiB0aGVcbiAgICAgICAgICogaGFzaCB1cmwgY2hhbmdlcyBpbiB0aGUgYnJvd3Nlci4gVGhpcyBwcm9wZXJ0eSBvbmx5IHdvcmtzIGlmIHRoZSAqKlJvdXRlci4ge3sjY3Jvc3NMaW5rIFwiUm91dGVyL3VzZURlZXBMaW5raW5nOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319KiogaXMgc2V0IHRvICoqZmFsc2UqKi5cbiAgICAgICAgICogVGhpcyBpcyB1c2VmdWwgaWYgd2FudCB0byB1c2UgeW91ciBhZGRlZCByb3V0ZXMgYnV0IGRvbid0IHdhbnQgYW55IGV4dGVybmFsIGZvcmNlcyB0cmlnZ2VyIHlvdXIgcm91dGVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUeXBpY2FsbHkgd2hhdCBJIGRvIGZvciBnYW1lcyBpcyBkdXJpbmcgZGV2ZWxvcG1lbnQvdGVzdGluZyBJIGFsbG93IHRoZSBoYXNoIHVybCB0byBjaGFuZ2UgdGhlIHN0YXRlcyBzbyB0ZXN0ZXJzIGNhbiBqdW1wXG4gICAgICAgICAqIHRvIHNlY3Rpb25zIG9yIGxldmVscyBlYXNpbHkgYnV0IHRoZW4gd2hlbiBpdCBpcyByZWFkeSBmb3IgcHJvZHVjdGlvbiBJIHNldCB0aGUgcHJvcGVydHkgdG8gKipmYWxzZSoqIHNvIHVzZXJzIGNhbm5vdCBqdW1wXG4gICAgICAgICAqIGFyb3VuZCBpZiB0aGV5IGZpZ3VyZSBvdXQgdGhlIHVybCBzY2hlbWEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbGxvd01hbnVhbERlZXBMaW5raW5nXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgUm91dGVyLnVzZURlZXBMaW5raW5nID0gZmFsc2U7XG4gICAgICAgICAqICAgICBSb3V0ZXIuYWxsb3dNYW51YWxEZWVwTGlua2luZyA9IGZhbHNlO1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLmFsbG93TWFudWFsRGVlcExpbmtpbmcgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlICoqUm91dGVyLmZvcmNlU2xhc2gqKiBwcm9wZXJ0eSB0ZWxscyB0aGUgUm91dGVyIGNsYXNzIGlmIHRoZSAqKlJvdXRlci57eyNjcm9zc0xpbmsgXCJSb3V0ZXIvbmF2aWdhdGVUbzptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0qKiBtZXRob2QgaXMgY2FsbGVkIHRvXG4gICAgICAgICAqIG1ha2Ugc3VyZSB0aGUgaGFzaCB1cmwgaGFzIGEgZm9yd2FyZCBzbGFzaCBhZnRlciB0aGUgKiojKiogY2hhcmFjdGVyIGxpa2UgdGhpcyAqKiMvKiouXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBmb3JjZVNsYXNoXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIC8vIFRvIHR1cm4gb24gZm9yY2luZyB0aGUgZm9yd2FyZCBzbGFzaFxuICAgICAgICAgKiAgICAgUm91dGVyLmZvcmNlU2xhc2ggPSB0cnVlO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gSWYgZm9yY2VTbGFzaCBpcyBzZXQgdG8gdHJ1ZSBpdCB3aWxsIGNoYW5nZSB0aGUgdXJsIGZyb20gI2NvbnRhY3QvYm9iLyB0byAjL2NvbnRhY3QvYm9iL1xuICAgICAgICAgKiAgICAgLy8gd2hlbiB1c2luZyB0aGUgbmF2aWdhdGVUbyBtZXRob2QuXG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZXIuZm9yY2VTbGFzaCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlICoqUm91dGVyLmFsbG93TXVsdGlwbGVNYXRjaGVzKiogcHJvcGVydHkgdGVsbHMgdGhlIFJvdXRlciBjbGFzcyBpZiBpdCBzaG91bGQgdHJpZ2dlciBvbmUgb3IgYWxsIHJvdXRlcyB0aGF0IG1hdGNoIGEgcm91dGUgcGF0dGVybi5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IGFsbG93TXVsdGlwbGVNYXRjaGVzXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gT25seSBhbGxvdyB0aGUgZmlyc3Qgcm91dGUgbWF0Y2hlZCB0byBiZSB0cmlnZ2VyZWQuXG4gICAgICAgICAqICAgICBSb3V0ZXIuYWxsb3dNdWx0aXBsZU1hdGNoZXMgPSBmYWxzZTtcbiAgICAgICAgICovXG4gICAgICAgIFJvdXRlci5hbGxvd011bHRpcGxlTWF0Y2hlcyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB7eyNjcm9zc0xpbmsgXCJSb3V0ZXJFdmVudFwifX17ey9jcm9zc0xpbmt9fSB0aGF0IHdhcyB0cmlnZ2VyZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfY3VycmVudFJvdXRlXG4gICAgICAgICAqIEB0eXBlIHtSb3V0ZXJFdmVudH1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyLl9jdXJyZW50Um91dGUgPSBudWxsO1xuICAgICAgICByZXR1cm4gUm91dGVyO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFJvdXRlcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EaXNwbGF5T2JqZWN0Q29udGFpbmVyJywgJy4uL2V2ZW50L0Jhc2VFdmVudCcsICcuLi91dGlsL1RlbXBsYXRlRmFjdG9yeScsICcuLi91dGlsL0NvbXBvbmVudEZhY3RvcnknLCAnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERpc3BsYXlPYmplY3RDb250YWluZXIgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3RDb250YWluZXInKTtcbiAgICB2YXIgQmFzZUV2ZW50ID0gcmVxdWlyZSgnLi4vZXZlbnQvQmFzZUV2ZW50Jyk7XG4gICAgdmFyIFRlbXBsYXRlRmFjdG9yeSA9IHJlcXVpcmUoJy4uL3V0aWwvVGVtcGxhdGVGYWN0b3J5Jyk7XG4gICAgdmFyIENvbXBvbmVudEZhY3RvcnkgPSByZXF1aXJlKCcuLi91dGlsL0NvbXBvbmVudEZhY3RvcnknKTtcbiAgICB2YXIgalF1ZXJ5ID0gcmVxdWlyZSgnLi4vcGx1Z2luL2pxdWVyeS5ldmVudExpc3RlbmVyJyk7XG4gICAgLyoqXG4gICAgICogVGhlIHt7I2Nyb3NzTGluayBcIkRPTUVsZW1lbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdGhlIGJhc2UgdmlldyBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIGludG8gdGhlIEhUTUwgRE9NLlxuICAgICAqXG4gICAgICogQGNsYXNzIERPTUVsZW1lbnRcbiAgICAgKiBAcGFyYW0gdHlwZSBbYW55PW51bGxdIEVpdGhlciBhIGpRdWVyeSBvYmplY3Qgb3IgSmF2YVNjcmlwdCB0ZW1wbGF0ZSBzdHJpbmcgcmVmZXJlbmNlIHlvdSB3YW50IHRvIHVzZSBhcyB0aGUgdmlldy4gQ2hlY2sgb3V0IHRoZSBleGFtcGxlcyBiZWxvdy5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIFthbnk9bnVsbF0gQW55IGRhdGEgeW91IHdvdWxkIGxpa2UgdG8gcGFzcyBpbnRvIHRoZSBqUXVlcnkgZWxlbWVudCBvciB0ZW1wbGF0ZSB0aGF0IGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICogQGV4dGVuZHMgRGlzcGxheU9iamVjdENvbnRhaW5lclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIERpc3BsYXlPYmplY3RDb250YWluZXJcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQHJlcXVpcmVzIFRlbXBsYXRlRmFjdG9yeVxuICAgICAqIEByZXF1aXJlcyBDb21wb25lbnRGYWN0b3J5XG4gICAgICogQHJlcXVpcmVzIGpRdWVyeVxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgIC8vIEV4YW1wbGU6IFVzaW5nIERPTUVsZW1lbnQgd2l0aG91dCBleHRlbmRpbmcgaXQuXG4gICAgICogICAgIGxldCBhTGluayA9IG5ldyBET01FbGVtZW50KCdhJywge3RleHQ6ICdHb29nbGUnLCBocmVmOiAnaHR0cDovL3d3dy5nb29nbGUuY29tJywgJ2NsYXNzJzogJ2V4dGVybmFsTGluayd9KTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZChhTGluayk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IHBhc3NpbmcgaW4gYSBqUXVlcnkgb2JqZWN0LlxuICAgICAqICAgICBsZXQgdmlldyA9IG5ldyBDdXN0b21WaWV3KCQoJy5zZWxlY3RvcicpKTtcbiAgICAgKiAgICAgdGhpcy5hZGRDaGlsZCh2aWV3KTtcbiAgICAgKlxuICAgICAqICAgICAvLyBFeGFtcGxlOiBBIHZpZXcgZXh0ZW5kaW5nIERPTUVsZW1lbnQgd2hpbGUgcGFzc2luZyBpbiBhIGpRdWVyeSBvYmplY3QuXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIoJGVsZW1lbnQpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgeW91ciBjaGlsZCBvYmplY3RzIHRvIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGVuYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSB0cnVlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRW5hYmxlIHRoZSBjaGlsZCBvYmplY3RzIGFuZCBhZGQgYW55IGV2ZW50IGxpc3RlbmVycy5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuZW5hYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGlzYWJsZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkID09PSBmYWxzZSkgeyByZXR1cm4gdGhpczsgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERpc2FibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlbW92ZSBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5kaXNhYmxlKCk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgbGF5b3V0KCkge1xuICAgICAqICAgICAgICAgICAgICAvLyBMYXlvdXQgb3IgdXBkYXRlIHRoZSBjaGlsZCBvYmplY3RzIGluIHRoaXMgcGFyZW50IGNsYXNzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICogICAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIGNoaWxkIG9iamVjdHMgYW5kIHJlZmVyZW5jZXMgaW4gdGhpcyBwYXJlbnQgY2xhc3MgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogQSB2aWV3IGV4dGVuZGluZyBET01FbGVtZW50IHdpdGggYSBwcmVjb21waWxlZCBKYXZhU2NyaXB0IHRlbXBsYXRlIHJlZmVyZW5jZSBwYXNzZWQgaW4uXG4gICAgICogICAgIGNsYXNzIENsYXNzTmFtZSBleHRlbmRzIERPTUVsZW1lbnQge1xuICAgICAqXG4gICAgICogICAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICogICAgICAgICAgICAgIF9zdXBlcigpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICAgICAgIGNyZWF0ZSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuY3JlYXRlKCd0ZW1wbGF0ZXMvaG9tZS9ob21lVGVtcGxhdGUnLCB7ZGF0YTogJ3NvbWUgZGF0YSd9KTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBDcmVhdGUgYW5kIGFkZCB5b3VyIGNoaWxkIG9iamVjdHMgdG8gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZW5hYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXM7IH1cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBkaXNhYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB0aGlzOyB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmRpc2FibGUoKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICBsYXlvdXQoKSB7XG4gICAgICogICAgICAgICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIGNoaWxkIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgKiAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVmZXJlbmNlcyBpbiB0aGlzIHBhcmVudCBjbGFzcyB0byBwcmVwYXJlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24uXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKlxuICAgICAqICAgICB9XG4gICAgICovXG4gICAgdmFyIERPTUVsZW1lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRE9NRWxlbWVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRE9NRWxlbWVudCh0eXBlLCBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHsgdHlwZSA9IG51bGw7IH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMgPT09IHZvaWQgMCkgeyBwYXJhbXMgPSBudWxsOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJhY2tzIG51bWJlciBvZiB0aW1lcyBhbiBlbGVtZW50J3Mgd2lkdGggaGFzIGJlZW4gY2hlY2tlZFxuICAgICAgICAgICAgICogaW4gb3JkZXIgdG8gZGV0ZXJtaW5lIGlmIHRoZSBlbGVtZW50IGhhcyBiZWVuIGFkZGVkXG4gICAgICAgICAgICAgKiB0byB0aGUgRE9NLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjaGVja0NvdW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ291bnQgPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIGNhY2hlZCByZWZlcmVuY2UgdG8gdGhlIERPTSBFbGVtZW50XG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBjYWNoZWQgcmVmZXJlbmNlIHRvIHRoZSBqUXVlcnkgRE9NIGVsZW1lbnRcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgJGVsZW1lbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBhIGpRdWVyeSBvYmplY3Qgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0aGlzIHdpbGwgYmUgc2V0IGFzIHRydWUgYW5kXG4gICAgICAgICAgICAgKiB0aGlzIGNsYXNzIHdpbGwgbm90IHRyeSB0byBhZGQgdGhlIHZpZXcgdG8gdGhlIERPTSBzaW5jZSBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX2lzUmVmZXJlbmNlXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5faXNSZWZlcmVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSG9sZHMgb250byB0aGUgdmFsdWUgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBfdHlwZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fdHlwZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhvbGRzIG9udG8gdGhlIHZhbHVlIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgX3BhcmFtc1xuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gbnVsbDtcbiAgICAgICAgICAgIGlmICh0eXBlIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1JlZmVyZW5jZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3JlYXRlIGZ1bmN0aW9uIGlzIGludGVuZGVkIHRvIHByb3ZpZGUgYSBjb25zaXN0ZW50IHBsYWNlIGZvciB0aGUgY3JlYXRpb24gYW5kIGFkZGluZ1xuICAgICAgICAgKiBvZiBjaGlsZHJlbiB0byB0aGUgdmlldy4gSXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSB2aWV3IGlzIGFkZGVkXG4gICAgICAgICAqIHRvIGFub3RoZXIgRGlzcGxheU9iamVjdENvbnRhaW5lci4gSXQgaXMgY3JpdGljYWwgdGhhdCBhbGwgc3ViY2xhc3NlcyBjYWxsIHRoZSBzdXBlciBmb3IgdGhpcyBmdW5jdGlvbiBpblxuICAgICAgICAgKiB0aGVpciBvdmVycmlkZGVuIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIGdldHMgY2FsbGVkIG9uY2Ugd2hlbiB0aGUgY2hpbGQgdmlldyBpcyBhZGRlZCB0byBhbm90aGVyIHZpZXcuIElmIHRoZSBjaGlsZCB2aWV3IGlzIHJlbW92ZWRcbiAgICAgICAgICogYW5kIGFkZGVkIHRvIGFub3RoZXIgdmlldyB0aGUgY3JlYXRlIG1ldGhvZCB3aWxsIG5vdCBiZSBjYWxsZWQgYWdhaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIFtzdHJpbmc9ZGl2XSBUaGUgSFRNTCB0YWcgeW91IHdhbnQgdG8gY3JlYXRlIG9yIHRoZSBpZC9jbGFzcyBzZWxlY3RvciBvZiB0aGUgdGVtcGxhdGUgb3IgdGhlIHByZS1jb21waWxlZCBwYXRoIHRvIGEgdGVtcGxhdGUuXG4gICAgICAgICAqIEBwYXJhbSBwYXJhbXMgW2FueT1udWxsXSBBbnkgZGF0YSB5b3Ugd291bGQgbGlrZSB0byBwYXNzIGludG8gdGhlIGpRdWVyeSBlbGVtZW50IG9yIHRlbXBsYXRlIHRoYXQgaXMgYmVpbmcgY3JlYXRlZC5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgLy8gRVhBTVBMRSAxOiBCeSBkZWZhdWx0IHlvdXIgdmlldyBjbGFzcyB3aWxsIGJlIGEgZGl2IGVsZW1lbnQ6XG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgICAgICB0aGlzLl9jaGlsZEluc3RhbmNlID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9jaGlsZEluc3RhbmNlKTtcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgMjogQnV0IGxldHMgc2F5IHlvdSB3YW50ZWQgdGhlIHZpZXcgdG8gYmUgYSB1bCBlbGVtZW50OlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJyk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBUaGVuIHlvdSBjb3VsZCBuZXN0IG90aGVyIGVsZW1lbnRzIGluc2lkZSB0aGlzIGJhc2Ugdmlldy9lbGVtZW50LlxuICAgICAgICAgKiAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoJ3VsJywge2lkOiAnbXlJZCcsICdjbGFzcyc6ICdteUNsYXNzIGFub3RoZXJDbGFzcyd9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgbGV0IGxpID0gbmV3IERPTUVsZW1lbnQoJ2xpJywge3RleHQ6ICdSb2JlcnQgaXMgY29vbCd9KTtcbiAgICAgICAgICogICAgICAgICAgdGhpcy5hZGRDaGlsZChsaSk7XG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAvLyBFWEFNUExFIDM6IFNvIHRoYXQncyBjb29sIGJ1dCB3aGF0IGlmIHlvdSB3YW50ZWQgYSBibG9jayBvZiBodG1sIHRvIGJlIHlvdXIgdmlldy4gTGV0J3Mgc2F5IHlvdSBoYWQgdGhlIGJlbG93XG4gICAgICAgICAqICAgICAvLyBpbmxpbmUgSGFuZGxlYmFyIHRlbXBsYXRlIGluIHlvdXIgaHRtbCBmaWxlLlxuICAgICAgICAgKiAgICAgPHNjcmlwdCBpZD1cInRvZG9UZW1wbGF0ZVwiIHR5cGU9XCJ0ZXh0L3RlbXBsYXRlXCI+XG4gICAgICAgICAqICAgICAgICAgIDxkaXYgaWQ9XCJodG1sVGVtcGxhdGVcIiBjbGFzcz1cImpzLXRvZG9cIj5cbiAgICAgICAgICogICAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC13cmFwcGVyXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsaXN0LWlucHV0XCIgcGxhY2Vob2xkZXI9XCJ7eyBkYXRhLnRleHQgfX1cIj5cbiAgICAgICAgICogICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibGlzdC1pdGVtLXN1Ym1pdFwiIHZhbHVlPVwiQWRkXCI+XG4gICAgICAgICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICogICAgICAgICAgPC9kaXY+XG4gICAgICAgICAqICAgICA8L3NjcmlwdD5cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIFlvdSB3b3VsZCBqdXN0IHBhc3MgaW4gdGhlIGlkIG9yIGNsYXNzIHNlbGVjdG9yIG9mIHRoZSB0ZW1wbGF0ZSB3aGljaCBpbiB0aGlzIGNhc2UgaXMgXCIjdG9kb1RlbXBsYXRlXCIuXG4gICAgICAgICAqICAgICAvLyBUaGVyZSBpcyBhIHNlY29uZCBvcHRpb25hbCBhcmd1bWVudCB3aGVyZSB5b3UgY2FuIHBhc3MgZGF0YSBmb3IgdGhlIEhhbmRsZWJhciB0ZW1wbGF0ZSB0byB1c2UuXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgnI3RvZG9UZW1wbGF0ZScsIHsgZGF0YTogdGhpcy52aWV3RGF0YSB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgIC8vIEVYQU1QTEUgNDogT3IgbWF5YmUgeW91J3JlIHVzaW5nIGdydW50LWNvbnRyaWItaGFuZGxlYmFycywgb3Igc2ltaWxhciwgdG8gcHJlY29tcGlsZSBoYnMgdGVtcGxhdGVzXG4gICAgICAgICAqICAgICBjcmVhdGUoKSB7XG4gICAgICAgICAqICAgICAgICAgIHN1cGVyLmNyZWF0ZSgndGVtcGxhdGVzL0hvbWVUZW1wbGF0ZScsIHtkYXRhOiBcInNvbWUgZGF0YVwifSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodHlwZSwgcGFyYW1zKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSAnZGl2JzsgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcyA9PT0gdm9pZCAwKSB7IHBhcmFtcyA9IG51bGw7IH1cbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZGF0YSBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgZmlyc3QgZWxzZSB1c2UgdGhlIGFyZ3VtZW50cyBmcm9tIGNyZWF0ZS5cbiAgICAgICAgICAgIHR5cGUgPSB0aGlzLl90eXBlIHx8IHR5cGU7XG4gICAgICAgICAgICBwYXJhbXMgPSB0aGlzLl9wYXJhbXMgfHwgcGFyYW1zO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcmVhdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBZb3UgY2Fubm90IGNhbGwgdGhlIGNyZWF0ZSBtZXRob2QgbWFudWFsbHkuIEl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgYXV0b21hdGljYWxseSBkdXJpbmcgdGhlIHZpZXcgbGlmZWN5Y2xlIGFuZCBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRlbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHRtbF8xID0gVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZSh0eXBlLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIGlmIChodG1sXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeShodG1sXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeShcIjxcIiArIHR5cGUgKyBcIi8+XCIsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy4kZWxlbWVudFswXTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLiRlbGVtZW50LndpZHRoKCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuJGVsZW1lbnQuaGVpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkXG4gICAgICAgICAqIEBtZXRob2QgYWRkQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRE9NRWxlbWVudCBpbnN0YW5jZSB0byBhZGQgYXMgYSBjaGlsZCBvZiB0aGlzIG9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICogQHJldHVybnMge2FueX0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIHRoaXMuYWRkQ2hpbGQoZG9tRWxlbWVudEluc3RhbmNlKTtcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBZb3UgY2Fubm90IHVzZSB0aGUgYWRkQ2hpbGQgbWV0aG9kIGlmIHRoZSBwYXJlbnQgb2JqZWN0IGlzIG5vdCBhZGRlZCB0byB0aGUgRE9NLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGRDaGlsZC5jYWxsKHRoaXMsIGNoaWxkKTtcbiAgICAgICAgICAgIC8vIElmIGFuIGVtcHR5IGpRdWVyeSBvYmplY3QgaXMgcGFzc2VkIGludG8gdGhlIGNvbnN0cnVjdG9yIHRoZW4gZG9uJ3QgcnVuIHRoZSBjb2RlIGJlbG93LlxuICAgICAgICAgICAgaWYgKGNoaWxkLl9pc1JlZmVyZW5jZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGlsZC5pc0NyZWF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY3JlYXRlKCk7IC8vIFJlbmRlciB0aGUgaXRlbSBiZWZvcmUgYWRkaW5nIHRvIHRoZSBET01cbiAgICAgICAgICAgICAgICBjaGlsZC5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIGNoaWxkIG9iamVjdCBpcyBub3QgYSByZWZlcmVuY2Ugb2YgYSBqUXVlcnkgb2JqZWN0IGluIHRoZSBET00gdGhlbiBhcHBlbmQgaXQuXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuYXBwZW5kKGNoaWxkLiRlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uQWRkZWRUb0RvbShjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZHMgdGhlIHNqc0lkIHRvIHRoZSBET00gZWxlbWVudCBzbyB3ZSBjYW4ga25vdyB3aGF0IHdoYXQgQ2xhc3Mgb2JqZWN0IHRoZSBIVE1MRWxlbWVudCBiZWxvbmdzIHRvby5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfYWRkQ2xpZW50U2lkZUlkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERPTUVsZW1lbnQgaW5zdGFuY2UgdG8gYWRkIHRoZSBzanNJZCB0b28uXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLl9hZGRDbGllbnRTaWRlSWQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScpO1xuICAgICAgICAgICAgdmFyIGlkID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtaWQnKTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZW0gYXJyYXkncyBzbyB0aGUgam9pbiBtZXRob2Qgd2lsbCB3b3JrLlxuICAgICAgICAgICAgICAgIHR5cGUgPSBbY2hpbGQuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCldO1xuICAgICAgICAgICAgICAgIGlkID0gW2NoaWxkLnNqc0lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZW0gc28gd2UgY2FuIHB1c2gvYWRkIHRoZSBuZXcgdmFsdWVzLlxuICAgICAgICAgICAgICAgIHR5cGUgPSB0eXBlLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgaWQgPSBpZC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgIHR5cGUucHVzaChjaGlsZC5nZXRRdWFsaWZpZWRDbGFzc05hbWUoKSk7XG4gICAgICAgICAgICAgICAgaWQucHVzaChjaGlsZC5zanNJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVcGRhdGVkIGxpc3Qgb2YgaWQncyBhbmQgdHlwZXNcbiAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJywgaWQuam9pbignLCcpKTtcbiAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnLCB0eXBlLmpvaW4oJywnKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBzanNJZCBhbmQgY2xhc3MgdHlwZSBmcm9tIHRoZSBIVE1MRWxlbWVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfcmVtb3ZlQ2xpZW50U2lkZUlkXG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RE9NRWxlbWVudH0gVGhlIERPTUVsZW1lbnQgaW5zdGFuY2UgdG8gYWRkIHRoZSBzanNJZCB0b28uXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLl9yZW1vdmVDbGllbnRTaWRlSWQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtdHlwZScpO1xuICAgICAgICAgICAgdmFyIGlkID0gY2hpbGQuJGVsZW1lbnQuYXR0cignZGF0YS1zanMtaWQnKTtcbiAgICAgICAgICAgIC8vIFNwbGl0IHRoZW0gc28gd2UgY2FuIHJlbW92ZSB0aGUgY2hpbGQgc2pzSWQgYW5kIHR5cGUuXG4gICAgICAgICAgICB2YXIgdHlwZUxpc3QgPSB0eXBlLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB2YXIgaWRMaXN0ID0gaWQuc3BsaXQoJywnKS5tYXAoTnVtYmVyKTsgLy8gQ29udmVydCBlYWNoIGl0ZW0gaW50byBhIG51bWJlci5cbiAgICAgICAgICAgIHZhciBpbmRleCA9IGlkTGlzdC5pbmRleE9mKGNoaWxkLnNqc0lkKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpZCBhbmQgdHlwZSBmcm9tIHRoZSBhcnJheS5cbiAgICAgICAgICAgICAgICB0eXBlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGlkTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZWQgbGlzdCBvZiBpZCdzIGFuZCB0eXBlc1xuICAgICAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnLCB0eXBlTGlzdC5qb2luKCcsJykpO1xuICAgICAgICAgICAgICAgIGNoaWxkLiRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJywgaWRMaXN0LmpvaW4oJywnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaWRMaXN0Lmxlbmd0aCA9PT0gMDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhbGxlZCB3aGVuIHRoZSBjaGlsZCBvYmplY3QgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAgICAgICAgICogVGhlIG1ldGhvZCB3aWxsIGNhbGwge3sjY3Jvc3NMaW5rIFwiRE9NRWxlbWVudC9sYXlvdXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IGFuZCBkaXNwYXRjaCB0aGUgQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9vbkFkZGVkVG9Eb21cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuX29uQWRkZWRUb0RvbSA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIGNoaWxkLmNoZWNrQ291bnQrKztcbiAgICAgICAgICAgIGlmIChjaGlsZC4kZWxlbWVudC53aWR0aCgpID09PSAwICYmIGNoaWxkLmNoZWNrQ291bnQgPCA1KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYWRkQ2xpZW50U2lkZUlkKGNoaWxkKTtcbiAgICAgICAgICAgIGNoaWxkLndpZHRoID0gY2hpbGQuJGVsZW1lbnQud2lkdGgoKTtcbiAgICAgICAgICAgIGNoaWxkLmhlaWdodCA9IGNoaWxkLiRlbGVtZW50LmhlaWdodCgpO1xuICAgICAgICAgICAgY2hpbGQuc2V0U2l6ZShjaGlsZC53aWR0aCwgY2hpbGQuaGVpZ2h0KTtcbiAgICAgICAgICAgIGNoaWxkLmVuYWJsZSgpO1xuICAgICAgICAgICAgY2hpbGQubGF5b3V0KCk7XG4gICAgICAgICAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFKSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmFkZENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLiRlbGVtZW50LmNoaWxkcmVuKCk7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgLy8gSWYgYW4gZW1wdHkgalF1ZXJ5IG9iamVjdCBpcyBwYXNzZWQgaW50byB0aGUgY29uc3RydWN0b3IgdGhlbiBkb24ndCBydW4gdGhlIGNvZGUgYmVsb3cuXG4gICAgICAgICAgICBpZiAoY2hpbGQuX2lzUmVmZXJlbmNlID09PSB0cnVlICYmIGNoaWxkLiRlbGVtZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaW5kZXggcGFzc2VkIGluIGlzIGxlc3MgdGhhbiAwIGFuZCBncmVhdGVyIHRoYW4gdGhlIHRvdGFsIG51bWJlciBvZiBjaGlsZHJlbiB0aGVuIHBsYWNlIHRoZSBpdGVtIGF0IHRoZSBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFbHNlIGdldCB0aGUgY2hpbGQgaW4gdGhlIGNoaWxkcmVuIGFycmF5IGJ5IHRoZSBpbmRleCBwYXNzZWQgaW4gYW5kIHBsYWNlIHRoZSBpdGVtIGJlZm9yZSB0aGF0IGNoaWxkLlxuICAgICAgICAgICAgICAgIGlmIChjaGlsZC5pc0NyZWF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmNyZWF0ZSgpOyAvLyBSZW5kZXIgdGhlIGl0ZW0gYmVmb3JlIGFkZGluZyB0byB0aGUgRE9NXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEFkZHMgdGhlIGNoaWxkIGF0IGEgc3BlY2lmaWMgaW5kZXggYnV0IGFsc28gd2lsbCByZW1vdmUgdGhlIGNoaWxkIGZyb20gYW5vdGhlciBwYXJlbnQgb2JqZWN0IGlmIG9uZSBleGlzdHMuXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIGNoaWxkKTtcbiAgICAgICAgICAgICAgICB0aGlzLm51bUNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgICAgICAvLyBBZGRzIHRoZSBjaGlsZCBiZWZvcmUgYW55IGNoaWxkIGFscmVhZHkgYWRkZWQgaW4gdGhlIERPTS5cbiAgICAgICAgICAgICAgICBqUXVlcnkoY2hpbGRyZW4uZ2V0KGluZGV4KSkuYmVmb3JlKGNoaWxkLiRlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkFkZGVkVG9Eb20oY2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnN3YXBDaGlsZHJlblxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkMSwgY2hpbGQyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQxSW5kZXggPSBjaGlsZDEuJGVsZW1lbnQuaW5kZXgoKTtcbiAgICAgICAgICAgIHZhciBjaGlsZDJJbmRleCA9IGNoaWxkMi4kZWxlbWVudC5pbmRleCgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMSwgY2hpbGQySW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMiwgY2hpbGQxSW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAb3ZlcnJpZGRlbiBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLmdldENoaWxkQXRcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBfc3VwZXIucHJvdG90eXBlLmdldENoaWxkQXQuY2FsbCh0aGlzLCBpbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIGEgRE9NRWxlbWVudCBvYmplY3Qgd2l0aCB0aGUgZmlyc3QgZm91bmQgRE9NIGVsZW1lbnQgYnkgdGhlIHBhc3NlZCBpbiBzZWxlY3Rvci5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gc2VsZWN0b3Ige3N0cmluZ30gRE9NIGlkIG5hbWUsIERPTSBjbGFzcyBuYW1lIG9yIGEgRE9NIHRhZyBuYW1lLlxuICAgICAgICAgKiBAcmV0dXJucyB7RE9NRWxlbWVudH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZmlyc3QgbWF0Y2ggZnJvbSB0aGUgc2VsZWN0b3IgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGpRdWVyeUVsZW1lbnQgPSB0aGlzLiRlbGVtZW50LmZpbmQoc2VsZWN0b3IpLmZpcnN0KCk7XG4gICAgICAgICAgICBpZiAoalF1ZXJ5RWxlbWVudC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdbJyArIHRoaXMuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lKCkgKyAnXSBnZXRDaGlsZCgnICsgc2VsZWN0b3IgKyAnKSBDYW5ub3QgZmluZCBET00gJGVsZW1lbnQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgZWxlbWVudCBoYXMgYSBzanNJZCB2YWx1ZSBhbmQgaXMgYSBjaGlsZCBvZiB0aGlzIHBhcmVudCBvYmplY3QuXG4gICAgICAgICAgICB2YXIgc2pzSWQgPSBwYXJzZUludChqUXVlcnlFbGVtZW50LmF0dHIoJ2RhdGEtc2pzLWlkJykpO1xuICAgICAgICAgICAgdmFyIGRvbUVsZW1lbnQgPSB0aGlzLmdldENoaWxkQnlDaWQoc2pzSWQpO1xuICAgICAgICAgICAgLy8gQ3JlYXRlcyBhIERPTUVsZW1lbnQgZnJvbSB0aGUgalF1ZXJ5RWxlbWVudC5cbiAgICAgICAgICAgIGlmIChkb21FbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgRE9NRWxlbWVudCBhbmQgYXNzaWduIHRoZSBqUXVlcnkgZWxlbWVudCB0byBpdC5cbiAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gbmV3IERPTUVsZW1lbnQoKTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0galF1ZXJ5RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZG9tRWxlbWVudC5lbGVtZW50ID0galF1ZXJ5RWxlbWVudFswXTtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50LmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCBpdCBhbHJlYWR5IGV4aXN0cyBhbmQgd2UgYXJlIGp1c3QgZ2V0dGluZyBhIHJlZmVyZW5jZSB0byB0aGUgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hZGRDaGlsZC5jYWxsKHRoaXMsIGRvbUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGFsbCB0aGUgSFRNTCBlbGVtZW50cyBjaGlsZHJlbiBvZiB0aGlzIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZHJlblxuICAgICAgICAgKiBAcGFyYW0gW3NlbGVjdG9yXSB7c3RyaW5nfSBZb3UgY2FuIHBhc3MgaW4gYW55IHR5cGUgb2YgalF1ZXJ5IHNlbGVjdG9yLiBJZiB0aGVyZSBpcyBubyBzZWxlY3RvciBwYXNzZWQgaW4gaXQgd2lsbCBnZXQgYWxsIHRoZSBjaGlsZHJlbiBvZiB0aGlzIHBhcmVudCBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJucyB7QXJyYXkuPERPTUVsZW1lbnQ+fSBSZXR1cm5zIGEgbGlzdCBvZiBET01FbGVtZW50J3MuIEl0IHdpbGwgZ3JhYiBhbGwgY2hpbGRyZW4gSFRNTCBET00gZWxlbWVudHMgb2YgdGhpcyBvYmplY3QgYW5kIHdpbGwgY3JlYXRlIGEgRE9NRWxlbWVudCBmb3IgZWFjaCBET00gY2hpbGQuXG4gICAgICAgICAqIElmIHRoZSAnZGF0YS1zanMtaWQnIHByb3BlcnR5IGV4aXN0cyBpcyBvbiBhbiBIVE1MIGVsZW1lbnQgYSBET01FbGVtZW50IHdpbGwgbm90IGJlIGNyZWF0ZWQgZm9yIHRoYXQgZWxlbWVudCBiZWNhdXNlIGl0IHdpbGwgYmUgYXNzdW1lZCBpdCBhbHJlYWR5IGV4aXN0cyBhcyBhIERPTUVsZW1lbnQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgPT09IHZvaWQgMCkgeyBzZWxlY3RvciA9ICcnOyB9XG4gICAgICAgICAgICAvL1RPRE86IE1ha2Ugc3VyZSB0aGUgaW5kZXggb2YgdGhlIGNoaWxkcmVuIGFkZGVkIGlzIHRoZSBzYW1lIGFzIHRoZSB3aGF0IGlzIGluIHRoZSBhY3R1YWwgRE9NLlxuICAgICAgICAgICAgdmFyICRjaGlsZDtcbiAgICAgICAgICAgIHZhciBkb21FbGVtZW50O1xuICAgICAgICAgICAgdmFyICRsaXN0ID0gdGhpcy4kZWxlbWVudC5jaGlsZHJlbihzZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgbGlzdExlbmd0aCA9ICRsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxpc3RMZW5ndGg7IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgJGNoaWxkID0gJGxpc3QuZXEoaV8xKTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgalF1ZXJ5IGVsZW1lbnQgYWxyZWFkeSBoYXMgc2pzSWQgZGF0YSBwcm9wZXJ0eSB0aGVuIGl0IG11c3QgYmUgYW4gZXhpc3RpbmcgRGlzcGxheU9iamVjdENvbnRhaW5lciAoRE9NRWxlbWVudCkgaW4gdGhlIGNoaWxkcmVuIGFycmF5LlxuICAgICAgICAgICAgICAgIGlmICgkY2hpbGQuYXR0cignZGF0YS1zanMtaWQnKSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBuZXcgRE9NRWxlbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICBkb21FbGVtZW50LiRlbGVtZW50ID0gJGNoaWxkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGllbnRTaWRlSWQoZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuZWxlbWVudCA9ICRjaGlsZC5nZXQoMCk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQuaXNDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkZWQgdG8gdGhlIHN1cGVyIGFkZENoaWxkIG1ldGhvZCBiZWNhdXNlIHdlIGRvbid0IG5lZWQgdG8gYXBwZW5kIHRoZSBlbGVtZW50IHRvIHRoZSBET00uXG4gICAgICAgICAgICAgICAgICAgIC8vIEF0IHRoaXMgcG9pbnQgaXQgYWxyZWFkeSBleGlzdHMgYW5kIHdlIGFyZSBqdXN0IGdldHRpbmcgYSByZWZlcmVuY2UgdG8gdGhlIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmFkZENoaWxkLmNhbGwodGhpcywgZG9tRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW47XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY2hpbGQgb2JqZWN0IGluc3RhbmNlIGZyb20gdGhlIGNoaWxkIGxpc3Qgb2YgdGhlIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqIFRoZSBwYXJlbnQgcHJvcGVydHkgb2YgdGhlIHJlbW92ZWQgY2hpbGQgaXMgc2V0IHRvIG51bGwgYW5kIHRoZSBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgdGhlcmUgYXJlIG5vIG90aGVyIHJlZmVyZW5jZXNcbiAgICAgICAgICogdG8gdGhlIGNoaWxkLiBUaGUgaW5kZXggcG9zaXRpb25zIG9mIGFueSBvYmplY3RzIGFib3ZlIHRoZSBjaGlsZCBpbiB0aGUgcGFyZW50IG9iamVjdCBhcmUgZGVjcmVhc2VkIGJ5IDEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtET01FbGVtZW50fSBUaGUgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZSB0byByZW1vdmUuXG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIChjaGlsZCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdmFyIHJlbW92ZSA9IHRoaXMuX3JlbW92ZUNsaWVudFNpZGVJZChjaGlsZCk7XG4gICAgICAgICAgICBjaGlsZC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAvLyBDaGVja3MgaWYgZGVzdHJveSB3YXMgY2FsbGVkIGJlZm9yZSByZW1vdmVDaGlsZCBzbyBpdCBkb2Vzbid0IGVycm9yLlxuICAgICAgICAgICAgaWYgKHJlbW92ZSA9PT0gdHJ1ZSAmJiBjaGlsZC4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgY2hpbGQuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUucmVtb3ZlQ2hpbGQuY2FsbCh0aGlzLCBjaGlsZCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgdGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGluc3RhbmNlIHRoYXQgZXhpc3RzIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRBdFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjaGlsZCBvYmplY3QuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRBdCA9IGZ1bmN0aW9uIChpbmRleCwgZGVzdHJveSkge1xuICAgICAgICAgICAgaWYgKGRlc3Ryb3kgPT09IHZvaWQgMCkgeyBkZXN0cm95ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmdldENoaWxkQXQoaW5kZXgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhbGwgY2hpbGQgb2JqZWN0IGluc3RhbmNlcyBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkcmVuIGlzIHNldCB0byBudWxsIGFuZCB0aGUgb2JqZWN0cyBhcmUgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgbm8gb3RoZXJcbiAgICAgICAgICogcmVmZXJlbmNlcyB0byB0aGUgY2hpbGRyZW4gZXhpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRyZW5cbiAgICAgICAgICogQHJldHVybnMge0RPTUVsZW1lbnR9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAb3ZlcnJpZGVcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZHJlbiA9IGZ1bmN0aW9uIChkZXN0cm95KSB7XG4gICAgICAgICAgICBpZiAoZGVzdHJveSA9PT0gdm9pZCAwKSB7IGRlc3Ryb3kgPSB0cnVlOyB9XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmNoaWxkcmVuLnBvcCgpLCBkZXN0cm95KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuZW1wdHkoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQG92ZXJyaWRkZW4gRGlzcGxheU9iamVjdENvbnRhaW5lci5kZXN0cm95XG4gICAgICAgICAqL1xuICAgICAgICBET01FbGVtZW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gTm90ZTogd2UgY2FuJ3QganVzdCBjYWxsIGRlc3Ryb3kgdG8gcmVtb3ZlIHRoZSBIVE1MRWxlbWVudCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyIHZpZXdzIG1hbmFnaW5nIHRoZSBzYW1lIEhUTUxFbGVtZW50LlxuICAgICAgICAgICAgLyppZiAodGhpcy4kZWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQudW5iaW5kKCk7XG4gICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgd2F5IHRvIGluc3RhbnRpYXRlIHZpZXcgY2xhc3NlcyBieSBmb3VuZCBodG1sIHNlbGVjdG9ycy5cbiAgICAgICAgICpcbiAgICAgICAgICogRXhhbXBsZTogSXQgd2lsbCBmaW5kIGFsbCBjaGlsZHJlbiBlbGVtZW50cyBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRE9NRWxlbWVudC8kZWxlbWVudDpwcm9wZXJ0eVwifX17ey9jcm9zc0xpbmt9fSBwcm9wZXJ0eSB3aXRoIHRoZSAnanMtc2hhcmVFbWFpbCcgc2VsZWN0b3IuXG4gICAgICAgICAqIElmIGFueSBzZWxlY3RvcnMgYXJlIGZvdW5kIHRoZSBFbWFpbFNoYXJlQ29tcG9uZW50IGNsYXNzIHdpbGwgYmUgaW5zdGFudGlhdGVkIGFuZCBwYXNzIHRoZSBmb3VuZCBqUXVlcnkgZWxlbWVudCBpbnRvIHRoZSBjb250cnVjdG9yLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbXBvbmVudHNcbiAgICAgICAgICogQHBhcmFtIGNvbXBvbmVudExpc3QgKEFycmF5Ljx7IHNlbGVjdG9yOiBzdHJpbmc7IGNvbXBvbmVudDogRE9NRWxlbWVudCB9PlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48RE9NRWxlbWVudD59IFJldHVybnMgYWxsIHRoZSBpdGVtcyBjcmVhdGVkIGZyb20gdGhpcyBjcmVhdGVDb21wb25lbnRzIG1ldGhvZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY3JlYXRlKCkge1xuICAgICAgICAgKiAgICAgICAgICBzdXBlci5jcmVhdGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgdGhpcy5jcmVhdGVDb21wb25lbnRzKFtcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1zaGFyZUVtYWlsJywgY29tcG9uZW50OiBFbWFpbFNoYXJlQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1wYWdpbmF0aW9uJywgY29tcG9uZW50OiBQYWdpbmF0aW9uQ29tcG9uZW50fSxcbiAgICAgICAgICogICAgICAgICAgICAgIHtzZWxlY3RvcjogJy5qcy1jYXJvdXNlbCcsIGNvbXBvbmVudDogQ2Fyb3VzZWxDb21wb25lbnR9XG4gICAgICAgICAqICAgICAgICAgIF0pO1xuICAgICAgICAgKiAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgIERPTUVsZW1lbnQucHJvdG90eXBlLmNyZWF0ZUNvbXBvbmVudHMgPSBmdW5jdGlvbiAoY29tcG9uZW50TGlzdCkge1xuICAgICAgICAgICAgdmFyIGxpc3Q7XG4gICAgICAgICAgICB2YXIgY3JlYXRlZENoaWxkcmVuID0gW107XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29tcG9uZW50TGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8yID0gMDsgaV8yIDwgbGVuZ3RoOyBpXzIrKykge1xuICAgICAgICAgICAgICAgIG9iaiA9IGNvbXBvbmVudExpc3RbaV8yXTtcbiAgICAgICAgICAgICAgICBsaXN0ID0gQ29tcG9uZW50RmFjdG9yeS5jcmVhdGUodGhpcy4kZWxlbWVudC5maW5kKG9iai5zZWxlY3RvciksIG9iai5jb21wb25lbnQsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZWRDaGlsZHJlbiA9IGNyZWF0ZWRDaGlsZHJlbi5jb25jYXQobGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlZENoaWxkcmVuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRE9NRWxlbWVudDtcbiAgICB9KShEaXNwbGF5T2JqZWN0Q29udGFpbmVyKTtcbiAgICByZXR1cm4gRE9NRWxlbWVudDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vZXZlbnQvRXZlbnREaXNwYXRjaGVyJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEV2ZW50RGlzcGF0Y2hlciA9IHJlcXVpcmUoJy4uL2V2ZW50L0V2ZW50RGlzcGF0Y2hlcicpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZSBwbGFjZWQgb24gdGhlIGRpc3BsYXkgbGlzdC5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBEaXNwbGF5T2JqZWN0XG4gICAgICogQGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdmlld1xuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgRXZlbnREaXNwYXRjaGVyXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIERpc3BsYXlPYmplY3QgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRGlzcGxheU9iamVjdCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRGlzcGxheU9iamVjdCgpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgU3RhZ2Ugb2YgdGhlIGRpc3BsYXkgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBzdGFnZVxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zdGFnZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgaW50ZXJmYWNlIHByb3ZpZGVzIHRoZSAyRCByZW5kZXJpbmcgY29udGV4dCBmb3IgdGhlIGRyYXdpbmcgc3VyZmFjZSBvZiBhIGNhbnZhcyBlbGVtZW50LlxuICAgICAgICAgICAgICogVGhpcyBwcm9wZXJ0eSBpcyBvbmx5IHVzZWQgd2l0aCB0aGUgY2FudmFzIHNwZWNpZmljIGRpc3BsYXkgb2JqZWN0cy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY3R4XG4gICAgICAgICAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmN0eCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcHJvcGVydHkgcHJvdmlkaW5nIGFjY2VzcyB0byB0aGUgeCBwb3NpdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgeFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBwcm9wZXJ0eSBwcm92aWRpbmcgYWNjZXNzIHRvIHRoZSB5IHBvc2l0aW9uLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB5XG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIHdpZHRoIG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgaGVpZ2h0IG9mIHRoZSBkaXNwbGF5IG9iamVjdCwgaW4gcGl4ZWxzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBoZWlnaHRcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBwcm9wZXJ0eSBwcm92aWRpbmcgYWNjZXNzIHRvIHRoZSB1bnNjYWxlZFdpZHRoLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB1bnNjYWxlZFdpZHRoXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMTAwXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudW5zY2FsZWRXaWR0aCA9IDEwMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBwcm9wZXJ0eSBwcm92aWRpbmcgYWNjZXNzIHRvIHRoZSB1bnNjYWxlZEhlaWdodC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdW5zY2FsZWRIZWlnaHRcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCAxMDBcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy51bnNjYWxlZEhlaWdodCA9IDEwMDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBob3Jpem9udGFsIHNjYWxlIChwZXJjZW50YWdlKSBvZiB0aGUgb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIHBvaW50LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVhcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc2NhbGVYID0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSB2ZXJ0aWNhbCBzY2FsZSAocGVyY2VudGFnZSkgb2YgYW4gb2JqZWN0IGFzIGFwcGxpZWQgZnJvbSB0aGUgcmVnaXN0cmF0aW9uIHBvaW50IG9mIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHNjYWxlWVxuICAgICAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zY2FsZVkgPSAxO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIHJvdGF0aW9uIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlLCBpbiBkZWdyZWVzLCBmcm9tIGl0cyBvcmlnaW5hbCBvcmllbnRhdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcm90YXRpb25cbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJbmRpY2F0ZXMgdGhlIGFscGhhIHRyYW5zcGFyZW5jeSB2YWx1ZSBvZiB0aGUgb2JqZWN0IHNwZWNpZmllZC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgYWxwaGFcbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgZGlzcGxheSBvYmplY3QgaXMgdmlzaWJsZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdmlzaWJsZVxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFNwZWNpZmllcyB3aGV0aGVyIHRoaXMgb2JqZWN0IHJlY2VpdmVzIG1vdXNlXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG1vdXNlRW5hYmxlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubW91c2VFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgQm9vbGVhbiB2YWx1ZSB0aGF0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBwb2ludGluZyBoYW5kIChoYW5kIGN1cnNvcikgYXBwZWFycyB3aGVuIHRoZSBwb2ludGVyIHJvbGxzIG92ZXIgYSBkaXNwbGF5IG9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdXNlSGFuZEN1cnNvclxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudXNlSGFuZEN1cnNvciA9IGZhbHNlO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgaXNDcmVhdGVkIHByb3BlcnR5IGlzIHVzZWQgdG8ga2VlcCB0cmFjayBpZiBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGlzIERpc3BsYXlPYmplY3QgaXMgY3JlYXRlZC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgaXNDcmVhdGVkXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaXNDcmVhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB0aGUgaW5zdGFuY2UgbmFtZSBvZiB0aGUgRGlzcGxheU9iamVjdC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbmFtZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGNyZWF0ZSBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBwcm92aWRlIGEgY29uc2lzdGVudCBwbGFjZSBmb3IgdGhlIGNyZWF0aW9uIG9yIGluaXRpYWxpemluZyB0aGUgdmlldy5cbiAgICAgICAgICogSXQgd2lsbCBhdXRvbWF0aWNhbGx5IGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSB2aWV3IGlzIGFkZGVkIHRvIGEgRGlzcGxheU9iamVjdENvbnRhaW5lci5cbiAgICAgICAgICogSXQgaXMgY3JpdGljYWwgdGhhdCBhbGwgc3ViY2xhc3NlcyBjYWxsIHRoZSBzdXBlciBmb3IgdGhpcyBmdW5jdGlvbiBpbiB0aGVpciBvdmVycmlkZGVuIG1ldGhvZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEByZXR1cm5zIHtEaXNwbGF5T2JqZWN0fSBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIGl0c2VsZi5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsYXlvdXQgbWV0aG9kIHByb3ZpZGVzIGEgY29tbW9uIGZ1bmN0aW9uIHRvIGhhbmRsZSB1cGRhdGluZyBvYmplY3RzIGluIHRoZSB2aWV3LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGxheW91dFxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2V0U2l6ZSBtZXRob2Qgc2V0cyB0aGUgYm91bmRzIHdpdGhpbiB3aGljaCB0aGUgY29udGFpbmluZyBEaXNwbGF5T2JqZWN0IHdvdWxkIGxpa2UgdGhhdCBjb21wb25lbnQgdG8gbGF5IGl0c2VsZiBvdXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB1bnNjYWxlZFdpZHRoIHtudW1iZXJ9IFRoZSB3aWR0aCB3aXRoaW4gd2hpY2ggdGhlIGNvbXBvbmVudCBzaG91bGQgbGF5IGl0c2VsZiBvdXQuXG4gICAgICAgICAqIEBwYXJhbSB1bnNjYWxlZEhlaWdodCB7bnVtYmVyfSBUaGUgaGVpZ2h0IHdpdGhpbiB3aGljaCB0aGUgY29tcG9uZW50IHNob3VsZCBsYXkgaXRzZWxmIG91dC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3QucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiAodW5zY2FsZWRXaWR0aCwgdW5zY2FsZWRIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMudW5zY2FsZWRXaWR0aCA9IHVuc2NhbGVkV2lkdGg7XG4gICAgICAgICAgICB0aGlzLnVuc2NhbGVkSGVpZ2h0ID0gdW5zY2FsZWRIZWlnaHQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlYWRlclN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jdHguc2F2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBEaXNwbGF5T2JqZWN0LnByb3RvdHlwZS5yZW5kZXJDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdHggPT09IG51bGwgfHwgdGhpcy5hbHBoYSA8PSAwIHx8IHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fcmVhZGVyU3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuY3R4Lmdsb2JhbEFscGhhID0gdGhpcy5hbHBoYTtcbiAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJFbmQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRGlzcGxheU9iamVjdC5wcm90b3R5cGUuX3JlbmRlckVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIERpc3BsYXlPYmplY3Q7XG4gICAgfSkoRXZlbnREaXNwYXRjaGVyKTtcbiAgICByZXR1cm4gRGlzcGxheU9iamVjdDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9EaXNwbGF5T2JqZWN0J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERpc3BsYXlPYmplY3QgPSByZXF1aXJlKCcuL0Rpc3BsYXlPYmplY3QnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBkaXNwbGF5IGxpc3QuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRGlzcGxheU9iamVjdENvbnRhaW5lclxuICAgICAqIEBleHRlbmRzIERpc3BsYXlPYmplY3RcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB2aWV3XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBEaXNwbGF5T2JqZWN0XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIERpc3BsYXlPYmplY3RDb250YWluZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRGlzcGxheU9iamVjdENvbnRhaW5lciwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRGlzcGxheU9iamVjdENvbnRhaW5lcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gb2YgdGhpcyBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG51bUNoaWxkcmVuXG4gICAgICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMubnVtQ2hpbGRyZW4gPSAwO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMgdG8gdGhpcyBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjaGlsZHJlblxuICAgICAgICAgICAgICogQHR5cGUge0FycmF5LjxEaXNwbGF5T2JqZWN0Pn1cbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhlIGNoaWxkcmVuIG9mIHRoZSBvYmplY3QgYXJlIG1vdXNlIGVuYWJsZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG1vdXNlQ2hpbGRyZW5cbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm1vdXNlQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLiBUaGUgY2hpbGQgaXMgYWRkZWQgdG8gdGhlIGZyb250ICh0b3ApIG9mIGFsbCBvdGhlclxuICAgICAgICAgKiBjaGlsZHJlbiBpbiB0aGlzIHBhcmVudCBvYmplY3QgaW5zdGFuY2UuIChUbyBhZGQgYSBjaGlsZCB0byBhIHNwZWNpZmljIGluZGV4IHBvc2l0aW9uLCB1c2UgdGhlIGFkZENoaWxkQXQoKSBtZXRob2QuKVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB5b3UgYWRkIGEgY2hpbGQgb2JqZWN0IHRoYXQgYWxyZWFkeSBoYXMgYSBkaWZmZXJlbnQgcGFyZW50LCB0aGUgb2JqZWN0IGlzIHJlbW92ZWQgZnJvbSB0aGUgY2hpbGRcbiAgICAgICAgICogbGlzdCBvZiB0aGUgb3RoZXIgcGFyZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhZGRDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lciBpbnN0YW5jZS5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICAvL0lmIHRoZSBjaGlsZCBiZWluZyBwYXNzZWQgaW4gYWxyZWFkeSBoYXMgYSBwYXJlbnQgdGhlbiByZW1vdmUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZXJlLlxuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQWRkcyBhIGNoaWxkIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gdGhpcyBEaXNwbGF5T2JqZWN0Q29udGFpbmVyQ29udGFpbmVyIGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgY2hpbGQgaXMgYWRkZWQgYXQgdGhlIGluZGV4IHBvc2l0aW9uIHNwZWNpZmllZC4gQW4gaW5kZXggb2YgMCByZXByZXNlbnRzIHRoZSBiYWNrXG4gICAgICAgICAqIChib3R0b20pIG9mIHRoZSBkaXNwbGF5IGxpc3QgZm9yIHRoaXMgRGlzcGxheU9iamVjdENvbnRhaW5lckNvbnRhaW5lciBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgYWRkQ2hpbGRBdFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIGFkZCBhcyBhIGNoaWxkIG9mIHRoaXMgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgge2ludH0gVGhlIGluZGV4IHBvc2l0aW9uIHRvIHdoaWNoIHRoZSBjaGlsZCBpcyBhZGRlZC4gSWYgeW91IHNwZWNpZnkgYSBjdXJyZW50bHkgb2NjdXBpZWQgaW5kZXggcG9zaXRpb24sIHRoZSBjaGlsZCBvYmplY3QgdGhhdCBleGlzdHMgYXQgdGhhdCBwb3NpdGlvbiBhbmQgYWxsIGhpZ2hlciBwb3NpdGlvbnMgYXJlIG1vdmVkIHVwIG9uZSBwb3NpdGlvbiBpbiB0aGUgY2hpbGQgbGlzdC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmFkZENoaWxkQXQgPSBmdW5jdGlvbiAoY2hpbGQsIGluZGV4KSB7XG4gICAgICAgICAgICAvL0lmIHRoZSBjaGlsZCBiZWluZyBwYXNzZWQgaW4gYWxyZWFkeSBoYXMgYSBwYXJlbnQgdGhlbiByZW1vdmUgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZXJlLlxuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xuICAgICAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGNoaWxkIG9iamVjdCBpbnN0YW5jZSBmcm9tIHRoZSBjaGlsZCBsaXN0IG9mIHRoZSBwYXJlbnQgb2JqZWN0IGluc3RhbmNlLlxuICAgICAgICAgKiBUaGUgcGFyZW50IHByb3BlcnR5IG9mIHRoZSByZW1vdmVkIGNoaWxkIGlzIHNldCB0byBudWxsICwgYW5kIHRoZSBvYmplY3QgaXMgZ2FyYmFnZSBjb2xsZWN0ZWQgaWYgbm8gb3RoZXIgcmVmZXJlbmNlc1xuICAgICAgICAgKiB0byB0aGUgY2hpbGQgZXhpc3QuIFRoZSBpbmRleCBwb3NpdGlvbnMgb2YgYW55IG9iamVjdHMgYWJvdmUgdGhlIGNoaWxkIGluIHRoZSBwYXJlbnQgb2JqZWN0IGFyZSBkZWNyZWFzZWQgYnkgMS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVDaGlsZFxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQge0Rpc3BsYXlPYmplY3R9IFRoZSBEaXNwbGF5T2JqZWN0IGluc3RhbmNlIHRvIHJlbW92ZS5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZXMgdGhlIGNoaWxkIG9iamVjdCBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5udW1DaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhbGwgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZXMgZnJvbSB0aGUgY2hpbGQgbGlzdCBvZiB0aGUgRGlzcGxheU9iamVjdENvbnRhaW5lckNvbnRhaW5lciBpbnN0YW5jZS5cbiAgICAgICAgICogVGhlIHBhcmVudCBwcm9wZXJ0eSBvZiB0aGUgcmVtb3ZlZCBjaGlsZHJlbiBpcyBzZXQgdG8gbnVsbCAsIGFuZCB0aGUgb2JqZWN0cyBhcmUgZ2FyYmFnZSBjb2xsZWN0ZWQgaWZcbiAgICAgICAgICogbm8gb3RoZXIgcmVmZXJlbmNlcyB0byB0aGUgY2hpbGRyZW4gZXhpc3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlQ2hpbGRyZW5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnJlbW92ZUNoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jaGlsZHJlbi5wb3AoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN3YXBzIHR3byBEaXNwbGF5T2JqZWN0J3Mgd2l0aCBlYWNoIG90aGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHN3YXBDaGlsZHJlblxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQxIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBiZSBzd2FwLlxuICAgICAgICAgKiBAcGFyYW0gY2hpbGQyIHtEaXNwbGF5T2JqZWN0fSBUaGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSB0byBiZSBzd2FwLlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdENvbnRhaW5lcn0gUmV0dXJucyBhbiBpbnN0YW5jZSBvZiBpdHNlbGYuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuc3dhcENoaWxkcmVuID0gZnVuY3Rpb24gKGNoaWxkMSwgY2hpbGQyKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQxSW5kZXggPSB0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQxKTtcbiAgICAgICAgICAgIHZhciBjaGlsZDJJbmRleCA9IHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZDIpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMSwgY2hpbGQySW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZEF0KGNoaWxkMiwgY2hpbGQxSW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3dhcHMgY2hpbGQgb2JqZWN0cyBhdCB0aGUgdHdvIHNwZWNpZmllZCBpbmRleCBwb3NpdGlvbnMgaW4gdGhlIGNoaWxkIGxpc3QuIEFsbCBvdGhlciBjaGlsZCBvYmplY3RzIGluIHRoZSBkaXNwbGF5IG9iamVjdCBjb250YWluZXIgcmVtYWluIGluIHRoZSBzYW1lIGluZGV4IHBvc2l0aW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzd2FwQ2hpbGRyZW5BdFxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgxIHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgY2hpbGQgb2JqZWN0LlxuICAgICAgICAgKiBAcGFyYW0gaW5kZXgyIHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIGNoaWxkIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFJldHVybnMgYW4gaW5zdGFuY2Ugb2YgaXRzZWxmLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBjaGFpbmFibGVcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLnN3YXBDaGlsZHJlbkF0ID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXgxIDwgMCB8fCBpbmRleDEgPCAwIHx8IGluZGV4MSA+PSB0aGlzLm51bUNoaWxkcmVuIHx8IGluZGV4MiA+PSB0aGlzLm51bUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignWycgKyB0aGlzLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10gaW5kZXggdmFsdWUocykgY2Fubm90IGJlIG91dCBvZiBib3VuZHMuIGluZGV4MSB2YWx1ZSBpcyAnICsgaW5kZXgxICsgJyBpbmRleDIgdmFsdWUgaXMgJyArIGluZGV4Mik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hpbGQxID0gdGhpcy5nZXRDaGlsZEF0KGluZGV4MSk7XG4gICAgICAgICAgICB2YXIgY2hpbGQyID0gdGhpcy5nZXRDaGlsZEF0KGluZGV4Mik7XG4gICAgICAgICAgICB0aGlzLnN3YXBDaGlsZHJlbihjaGlsZDEsIGNoaWxkMik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgdGhlIGluZGV4IHBvc2l0aW9uIG9mIGEgY2hpbGQgRGlzcGxheU9iamVjdCBpbnN0YW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRDaGlsZEluZGV4XG4gICAgICAgICAqIEBwYXJhbSBjaGlsZCB7RGlzcGxheU9iamVjdH0gVGhlIERpc3BsYXlPYmplY3QgaW5zdGFuY2UgdG8gaWRlbnRpZnkuXG4gICAgICAgICAqIEByZXR1cm5zIHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgZGlzcGxheSBvYmplY3QgdG8gaWRlbnRpZnkuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkSW5kZXggPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgZGlzcGxheSBvYmplY3QgaXMgYSBjaGlsZCBvZiB0aGUgRGlzcGxheU9iamVjdCBpbnN0YW5jZSBvciB0aGUgaW5zdGFuY2UgaXRzZWxmLiBUaGUgc2VhcmNoIGluY2x1ZGVzIHRoZSBlbnRpcmUgZGlzcGxheSBsaXN0IGluY2x1ZGluZyB0aGlzIERpc3BsYXlPYmplY3QgaW5zdGFuY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY29udGFpbnNcbiAgICAgICAgICogQHBhcmFtIGNoaWxkIHtEaXNwbGF5T2JqZWN0fSBUaGUgY2hpbGQgb2JqZWN0IHRvIHRlc3QuXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSAgdHJ1ZSBpZiB0aGUgY2hpbGQgb2JqZWN0IGlzIGEgY2hpbGQgb2YgdGhlIERpc3BsYXlPYmplY3Qgb3IgdGhlIGNvbnRhaW5lciBpdHNlbGY7IG90aGVyd2lzZSBmYWxzZS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpID49IDA7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBjaGlsZCBkaXNwbGF5IG9iamVjdCBpbnN0YW5jZSB0aGF0IGV4aXN0cyBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGdldENoaWxkQXRcbiAgICAgICAgICogQHBhcmFtIGluZGV4IHtpbnR9IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY2hpbGQgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7RGlzcGxheU9iamVjdH0gVGhlIGNoaWxkIGRpc3BsYXkgb2JqZWN0IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggcG9zaXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBEaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5nZXRDaGlsZEF0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltpbmRleF07XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGEgRGlzcGxheU9iamVjdCBieSBpdHMgc2pzSWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0Q2hpbGRCeUNpZFxuICAgICAgICAgKiBAcGFyYW0gc2pzSWQge251bWJlcn1cbiAgICAgICAgICogQHJldHVybnMge0Rpc3BsYXlPYmplY3R8bnVsbH1cbiAgICAgICAgICogQG92ZXJyaWRlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIERpc3BsYXlPYmplY3RDb250YWluZXIucHJvdG90eXBlLmdldENoaWxkQnlDaWQgPSBmdW5jdGlvbiAoc2pzSWQpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG51bGw7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzEgPSB0aGlzLm51bUNoaWxkcmVuIC0gMTsgaV8xID49IDA7IGlfMS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baV8xXS5zanNJZCA9PSBzanNJZCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9IHRoaXMuY2hpbGRyZW5baV8xXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRGlzcGxheU9iamVjdENvbnRhaW5lcjtcbiAgICB9KShEaXNwbGF5T2JqZWN0KTtcbiAgICByZXR1cm4gRGlzcGxheU9iamVjdENvbnRhaW5lcjtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9ET01FbGVtZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIERPTUVsZW1lbnQgPSByZXF1aXJlKCcuL0RPTUVsZW1lbnQnKTtcbiAgICAvKipcbiAgICAgKiBUaGUge3sjY3Jvc3NMaW5rIFwiU3RhZ2VcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3Mgc2hvdWxkIGJlIGV4dGVuZGVkIGJ5IHlvdXIgbWFpbiBhcHBsaWNhdGlvbiBvciByb290IGNsYXNzLlxuICAgICAqXG4gICAgICogQGNsYXNzIFN0YWdlXG4gICAgICogQGV4dGVuZHMgRE9NRWxlbWVudFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHZpZXdcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIERPTUVsZW1lbnRcbiAgICAgKiBAcmVxdWlyZXMgalF1ZXJ5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAgICAgLy8gVGhpcyBleGFtcGxlIGlsbHVzdHJhdGVzIGhvdyB0byBzZXR1cCB5b3VyIG1haW4gYXBwbGljYXRpb24gb3Igcm9vdCBjbGFzcyB3aGVuIGV4dGVuZGluZyB0aGUge3sjY3Jvc3NMaW5rIFwiU3RhZ2VcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuXG4gICAgICogICAgICAgICBjbGFzcyBNYWluQ2xhc3MgZXh0ZW5kcyBTdGFnZSB7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBjcmVhdGUoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIHN1cGVyLmNyZWF0ZSgpO1xuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgYWRkIHlvdXIgY2hpbGQgb2JqZWN0cyB0byB0aGlzIHBhcmVudCBjbGFzcy5cbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBsYXlvdXQoKSB7XG4gICAgICogICAgICAgICAgICAgICAgIC8vIExheW91dCBvciB1cGRhdGUgdGhlIGNoaWxkIG9iamVjdHMgaW4gdGhpcyBwYXJlbnQgY2xhc3MuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgICAgZW5hYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IHRydWUpIHsgcmV0dXJuIHRoaXMgfTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGNoaWxkIG9iamVjdHMgYW5kIGFkZCBhbnkgZXZlbnQgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogICAgICAgICAgICAgICAgIHJldHVybiBzdXBlci5lbmFibGUoKTtcbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBkaXNhYmxlKCkge1xuICAgICAqICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQgPT09IGZhbHNlKSB7IHJldHVybiB0aGlzIH07XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSB0aGUgY2hpbGQgb2JqZWN0cyBhbmQgcmVtb3ZlIGFueSBldmVudCBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmRpc2FibGUoKTtcbiAgICAgKiAgICAgICAgICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICBkZXN0cm95KCkge1xuICAgICAqICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBjaGlsZCBvYmplY3RzIGFuZCByZWZlcmVuY2VzIGluIHRoaXMgcGFyZW50IGNsYXNzIHRvIHByZXBhcmUgZm9yIGdhcmJhZ2UgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgICogICAgICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICB9XG4gICAgICpcbiAgICAgKlxuICAgICAqIDxiPkluc3RhbnRpYXRpb24gRXhhbXBsZTwvYj48YnI+XG4gICAgICogVGhpcyBleGFtcGxlIGlsbHVzdHJhdGVzIGhvdyB0byBpbnN0YW50aWF0ZSB5b3VyIG1haW4gYXBwbGljYXRpb24gb3Igcm9vdCBjbGFzcy5cbiAgICAgKlxuICAgICAqICAgICAgbGV0IGFwcCA9IG5ldyBNYWluQ2xhc3MoKTtcbiAgICAgKiAgICAgIGFwcC5hcHBlbmRUbygnYm9keScpO1xuICAgICAqXG4gICAgICovXG4gICAgdmFyIFN0YWdlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFN0YWdlLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBTdGFnZSgpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgc2VsZWN0ZWQgSFRNTCBlbGVtZW50IHdoZXJlIHRoZSBjaGlsZCBlbGVtZW50cyB3aWxsIGJlIGNyZWF0ZWQuIFRoaXMgbWV0aG9kIHN0YXJ0cyB0aGUgbGlmZWN5Y2xlIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhcHBlbmRUb1xuICAgICAgICAgKiBAcGFyYW0gdHlwZSB7YW55fSBBIHN0cmluZyB2YWx1ZSB3aGVyZSB5b3VyIGFwcGxpY2F0aW9uIHdpbGwgYmUgYXBwZW5kZWQuIFRoaXMgY2FuIGJlIGFuIGVsZW1lbnQgaWQgKCNzb21lLWlkKSwgZWxlbWVudCBjbGFzcyAoLnNvbWUtY2xhc3MpIG9yIGEgZWxlbWVudCB0YWcgKGJvZHkpLlxuICAgICAgICAgKiBAcGFyYW0gW2VuYWJsZWQ9dHJ1ZV0ge2Jvb2xlYW59IFNldHMgdGhlIGVuYWJsZWQgc3RhdGUgb2YgdGhlIG9iamVjdC5cbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgU3RhZ2UucHJvdG90eXBlLmFwcGVuZFRvID0gZnVuY3Rpb24gKHR5cGUsIGVuYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVkID09PSB2b2lkIDApIHsgZW5hYmxlZCA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQgPSAodHlwZSBpbnN0YW5jZW9mIGpRdWVyeSkgPyB0eXBlIDogalF1ZXJ5KHR5cGUpO1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xpZW50U2lkZUlkKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDcmVhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChlbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFN0YWdlO1xuICAgIH0pKERPTUVsZW1lbnQpO1xuICAgIHJldHVybiBTdGFnZTtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vQmFzZU9iamVjdCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlT2JqZWN0ID0gcmVxdWlyZSgnLi4vQmFzZU9iamVjdCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MgaXMgdXNlZCBhcyB0aGUgYmFzZSBjbGFzcyBmb3IgdGhlIGNyZWF0aW9uIG9mIEV2ZW50IG9iamVjdHMsIHdoaWNoIGFyZSBwYXNzZWQgYXMgcGFyYW1ldGVycyB0byBldmVudCBsaXN0ZW5lcnMgd2hlbiBhbiBldmVudCBvY2N1cnMuXG4gICAgICpcbiAgICAgKiBUaGUgcHJvcGVydGllcyBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50XCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIGNhcnJ5IGJhc2ljIGluZm9ybWF0aW9uIGFib3V0IGFuIGV2ZW50LCBzdWNoIGFzIHRoZSBldmVudCdzIHR5cGUgb3Igd2hldGhlciB0aGUgZXZlbnQncyBkZWZhdWx0IGJlaGF2aW9yIGNhbiBiZSBjYW5jZWxlZC5cbiAgICAgKlxuICAgICAqIEZvciBtYW55IGV2ZW50cywgc3VjaCBhcyB0aGUgZXZlbnRzIHJlcHJlc2VudGVkIGJ5IHRoZSBFdmVudCBjbGFzcyBjb25zdGFudHMsIHRoaXMgYmFzaWMgaW5mb3JtYXRpb24gaXMgc3VmZmljaWVudC4gT3RoZXIgZXZlbnRzLCBob3dldmVyLCBtYXkgcmVxdWlyZSBtb3JlXG4gICAgICogZGV0YWlsZWQgaW5mb3JtYXRpb24uXG4gICAgICogQGNsYXNzIEJhc2VFdmVudFxuICAgICAqIEBleHRlbmRzIEJhc2VPYmplY3RcbiAgICAgKiBAcGFyYW0gdHlwZSB7c3RyaW5nfSBUaGUgdHlwZSBvZiBldmVudC4gVGhlIHR5cGUgaXMgY2FzZS1zZW5zaXRpdmUuXG4gICAgICogQHBhcmFtIFtidWJibGVzPWZhbHNlXSB7Ym9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgYW4gZXZlbnQgaXMgYSBidWJibGluZyBldmVudC4gSWYgdGhlIGV2ZW50IGNhbiBidWJibGUsIHRoaXMgdmFsdWUgaXMgdHJ1ZTsgb3RoZXJ3aXNlIGl0IGlzIGZhbHNlLlxuICAgICAqIE5vdGU6IFdpdGggZXZlbnQtYnViYmxpbmcgeW91IGNhbiBsZXQgb25lIEV2ZW50IHN1YnNlcXVlbnRseSBjYWxsIG9uIGV2ZXJ5IGFuY2VzdG9yICh7eyNjcm9zc0xpbmsgXCJFdmVudERpc3BhdGNoZXIvcGFyZW50OnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319KVxuICAgICAqIChjb250YWluZXJzIG9mIGNvbnRhaW5lcnMgb2YgZXRjLikgb2YgdGhlIHt7I2Nyb3NzTGluayBcIkRpc3BsYXlPYmplY3RDb250YWluZXJcIn19e3svY3Jvc3NMaW5rfX0gdGhhdCBvcmlnaW5hbGx5IGRpc3BhdGNoZWQgdGhlIEV2ZW50LCBhbGwgdGhlIHdheSB1cCB0byB0aGUgc3VyZmFjZSAoe3sjY3Jvc3NMaW5rIFwiU3RhZ2VcIn19e3svY3Jvc3NMaW5rfX0pLiBBbnkgY2xhc3NlcyB0aGF0IGRvIG5vdCBoYXZlIGEgcGFyZW50IGNhbm5vdCBidWJibGUuXG4gICAgICogQHBhcmFtIFtjYW5jZWxhYmxlPWZhbHNlXSB7Ym9vbGVhbn0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJlaGF2aW9yIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnQgY2FuIGJlIHByZXZlbnRlZC4gSWYgdGhlIGJlaGF2aW9yIGNhbiBiZSBjYW5jZWxlZCwgdGhpcyB2YWx1ZSBpcyB0cnVlOyBvdGhlcndpc2UgaXQgaXMgZmFsc2UuXG4gICAgICogQHBhcmFtIFtkYXRhPW51bGxdIHthbnl9IFVzZSB0byBwYXNzIGFueSB0eXBlIG9mIGRhdGEgd2l0aCB0aGUgZXZlbnQuXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgZXZlbnRcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEJhc2VPYmplY3RcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAvLyBFeGFtcGxlOiBob3cgdG8gY3JlYXRlIGEgY3VzdG9tIGV2ZW50IGJ5IGV4dGVuZGluZyBCYXNlRXZlbnQuXG4gICAgICpcbiAgICAgKiAgICAgY2xhc3MgQ291bnRyeUV2ZW50IGV4dGVuZHMgQmFzZUV2ZW50IHtcbiAgICAgKlxuICAgICAqICAgICAgICAgIENIQU5HRV9DT1VOVFJZID0gJ0NvdW50cnlFdmVudC5jaGFuZ2VDb3VudHJ5JztcbiAgICAgKlxuICAgICAqICAgICAgICAgIGNvbnN0cnVjdG9yKHR5cGUsIGJ1YmJsZXMgPSBmYWxzZSwgY2FuY2VsYWJsZSA9IGZhbHNlLCBkYXRhID0gbnVsbCkge1xuICAgICAqICAgICAgICAgICAgICBzdXBlcih0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkYXRhKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICB0aGlzLmNvdW50cnlOYW1lID0gbnVsbDtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZTogaG93IHRvIHVzZSB0aGUgY3VzdG9tIGV2ZW50LlxuICAgICAqICAgICBsZXQgZXZlbnQgPSBuZXcgQ291bnRyeUV2ZW50KENvdW50cnlFdmVudC5DSEFOR0VfQ09VTlRSWSk7XG4gICAgICogICAgIGV2ZW50LmNvdW50cnlOYW1lID0gJ0NhbmFkYSc7XG4gICAgICogICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICovXG4gICAgdmFyIEJhc2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhCYXNlRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJhc2VFdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoYnViYmxlcyA9PT0gdm9pZCAwKSB7IGJ1YmJsZXMgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKGNhbmNlbGFibGUgPT09IHZvaWQgMCkgeyBjYW5jZWxhYmxlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdHlwZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0IHRoYXQgb3JpZ2luYWxseSBkaXNwYXRjaGVkIHRoZSBldmVudC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgdGFyZ2V0XG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGN1cnJlbnRUYXJnZXQgcHJvcGVydHkgYWx3YXlzIHBvaW50cyB0byB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSB0aGF0IHRoZSBldmVudCBpcyBjdXJyZW50bHkgcHJvY2Vzc2luZyAoaS5lLiBidWJibGluZyBhdCkuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGN1cnJlbnRUYXJnZXRcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVXNlZCB0byBwYXNzIGFueSB0eXBlIG9mIGRhdGEgd2l0aCB0aGUgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGRhdGFcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIGFuIGV2ZW50IGlzIGEgYnViYmxpbmcgZXZlbnQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGJ1YmJsZXNcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5idWJibGVzID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBiZWhhdmlvciBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50IGNhbiBiZSBwcmV2ZW50ZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGNhbmNlbGFibGVcbiAgICAgICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEluZGljYXRlcyBpZiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50L3N0b3BQcm9wYWdhdGlvbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gd2FzIGNhbGxlZCBvbiB0aGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBpc1Byb3BhZ2F0aW9uU3RvcHBlZFxuICAgICAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIGlmIHRoZSB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnQvc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSB3YXMgY2FsbGVkIG9uIHRoZSBldmVudCBvYmplY3QuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXG4gICAgICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuYnViYmxlcyA9IGJ1YmJsZXM7XG4gICAgICAgICAgICB0aGlzLmNhbmNlbGFibGUgPSBjYW5jZWxhYmxlO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUHJldmVudHMgcHJvY2Vzc2luZyBvZiBhbnkgZXZlbnQgbGlzdGVuZXJzIGluIG5vZGVzIHN1YnNlcXVlbnQgdG8gdGhlIGN1cnJlbnQgbm9kZSBpbiB0aGUgZXZlbnQgZmxvdy5cbiAgICAgICAgICogVGhpcyBtZXRob2QgZG9lcyBub3QgYWZmZWN0IGFueSBldmVudCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgbm9kZSAoY3VycmVudFRhcmdldCkuIEluIGNvbnRyYXN0LFxuICAgICAgICAgKiB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZUV2ZW50L3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kIHByZXZlbnRzIHByb2Nlc3NpbmdcbiAgICAgICAgICogb2YgZXZlbnQgbGlzdGVuZXJzIGluIGJvdGggdGhlIGN1cnJlbnQgbm9kZSBhbmQgc3Vic2VxdWVudCBub2Rlcy4gQWRkaXRpb25hbCBjYWxscyB0byB0aGlzIG1ldGhvZCBoYXZlIG5vIGVmZmVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBzdG9wUHJvcGFnYXRpb25cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQucHJvdG90eXBlLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUHJldmVudHMgcHJvY2Vzc2luZyBvZiBhbnkgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgYW5kIGFueSBzdWJzZXF1ZW50IG5vZGVzIGluIHRoZSBldmVudCBmbG93LlxuICAgICAgICAgKiBUaGlzIG1ldGhvZCB0YWtlcyBlZmZlY3QgaW1tZWRpYXRlbHksIGFuZCBpdCBhZmZlY3RzIGV2ZW50IGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBub2RlLiBJbiBjb250cmFzdCxcbiAgICAgICAgICogdGhlIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudC9zdG9wUHJvcGFnYXRpb246bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IG1ldGhvZCBkb2Vzbid0IHRha2UgZWZmZWN0IHVudGlsXG4gICAgICAgICAqIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIGluIHRoZSBjdXJyZW50IG5vZGUgZmluaXNoIHByb2Nlc3NpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2Qgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEdXBsaWNhdGVzIGFuIGluc3RhbmNlIG9mIGFuIEJhc2VFdmVudCBzdWJjbGFzcy5cbiAgICAgICAgICpcbiAgICAgICAgICogUmV0dXJucyBhIG5ldyBCYXNlRXZlbnQgb2JqZWN0IHRoYXQgaXMgYSBjb3B5IG9mIHRoZSBvcmlnaW5hbCBpbnN0YW5jZSBvZiB0aGUgQmFzZUV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIG5ldyBCYXNlRXZlbnQgb2JqZWN0IGluY2x1ZGVzIGFsbCB0aGUgcHJvcGVydGllcyBvZiB0aGUgb3JpZ2luYWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgICAgICogQHJldHVybnMge0Jhc2VFdmVudH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IGNsb25lT2ZFdmVudCA9IGV2ZW50LmNsb25lKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMudHlwZSwgdGhpcy5idWJibGVzLCB0aGlzLmNhbmNlbGFibGUsIHRoaXMuZGF0YSk7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVkQmFzZU1vZGVsW2tleV0gPSB0aGlzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNsb25lZEJhc2VNb2RlbDtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQUNUSVZBVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gYWN0aXZhdGUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQUNUSVZBVEVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQUNUSVZBVEUgPSAnQmFzZUV2ZW50LmFjdGl2YXRlJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQURERUQgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gYWRkZWQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQURERURcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQURERUQgPSAnQmFzZUV2ZW50LmFkZGVkJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQURERURfVE9fU1RBR0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gYWRkZWRUb1N0YWdlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IEFEREVEX1RPX1NUQUdFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkFEREVEX1RPX1NUQUdFID0gJ0Jhc2VFdmVudC5hZGRlZFRvU3RhZ2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DQU5DRUwgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjYW5jZWwgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0FOQ0VMXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNBTkNFTCA9ICdCYXNlRXZlbnQuY2FuY2VsJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0hBTkdFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2hhbmdlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENIQU5HRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DSEFOR0UgPSAnQmFzZUV2ZW50LmNoYW5nZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNMRUFSIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xlYXIgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ0xFQVJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ0xFQVIgPSAnQmFzZUV2ZW50LmNsZWFyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuQ0xPU0UgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjbG9zZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDTE9TRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DTE9TRSA9ICdCYXNlRXZlbnQuY2xvc2UnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DTE9TSU5HIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY2xvc2luZyBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDTE9TSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNMT1NJTkcgPSAnQmFzZUV2ZW50LmNsb3NpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5DT01QTEVURSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNvbXBsZXRlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENPTVBMRVRFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkNPTVBMRVRFID0gJ0Jhc2VFdmVudC5jb21wbGV0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkNPTk5FQ1QgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBjb25uZWN0IGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENPTk5FQ1RcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuQ09OTkVDVCA9ICdCYXNlRXZlbnQuY29ubmVjdCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGNvcHkgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgQ09QWVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DT1BZID0gJ0Jhc2VFdmVudC5jb3B5JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgY3V0IGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IENVVFxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5DVVQgPSAnQmFzZUV2ZW50LmN1dCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkRFQUNUSVZBVEUgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBkZWFjdGl2YXRlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IERFQUNUSVZBVEVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuREVBQ1RJVkFURSA9ICdCYXNlRXZlbnQuZGVhY3RpdmF0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkRJU1BMQVlJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSBkaXNwbGF5aW5nIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IERJU1BMQVlJTkdcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRElTUExBWUlORyA9ICdCYXNlRXZlbnQuZGlzcGxheWluZyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkVOVEVSX0ZSQU1FIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGVudGVyRnJhbWUgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRU5URVJfRlJBTUVcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuRU5URVJfRlJBTUUgPSAnQmFzZUV2ZW50LmVudGVyRnJhbWUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5FWElUX0ZSQU1FIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGV4aXRGcmFtZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBFWElUX0ZSQU1FXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkVYSVRfRlJBTUUgPSAnQmFzZUV2ZW50LmV4aXRGcmFtZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LkVYSVRJTkcgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gZXhpdGluZyBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBFWElUSU5HXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LkVYSVRJTkcgPSAnQmFzZUV2ZW50LmV4aXRpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5GVUxMX1NDUkVFTiBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIGZ1bGxTY3JlZW4gZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgRlVMTFNDUkVFTlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5GVUxMU0NSRUVOID0gJ0Jhc2VFdmVudC5mdWxsU2NyZWVuJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuSU5JVCBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhbiBpbml0IGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IElOSVRcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuSU5JVCA9ICdCYXNlRXZlbnQuaW5pdCc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50Lk5FVFdPUktfQ0hBTkdFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgbmV0d29ya0NoYW5nZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBORVRXT1JLX0NIQU5HRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5ORVRXT1JLX0NIQU5HRSA9ICdCYXNlRXZlbnQubmV0d29ya0NoYW5nZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50Lk9QRU4gY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYW4gb3BlbiBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBPUEVOXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50Lk9QRU4gPSAnQmFzZUV2ZW50Lm9wZW4nO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5QQVNURSBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHBhc3RlIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFBBU1RFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlBBU1RFID0gJ0Jhc2VFdmVudC5wYXN0ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlBSRVBBUklORyBjb25zdGFudCBkZWZpbmVzIHRoZSB2YWx1ZSBvZiB0aGUgdHlwZSBwcm9wZXJ0eSBvZiBhIHByZXBhcmluZyBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBQUkVQQVJJTkdcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuUFJFUEFSSU5HID0gJ0Jhc2VFdmVudC5wcmVwYXJpbmcnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5SRU1PVkVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVtb3ZlZCBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBSRU1PVkVEXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlJFTU9WRUQgPSAnQmFzZUV2ZW50LnJlbW92ZWQnO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIEJhc2VFdmVudC5SRU5ERVIgY29uc3RhbnQgZGVmaW5lcyB0aGUgdmFsdWUgb2YgdGhlIHR5cGUgcHJvcGVydHkgb2YgYSByZW5kZXIgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgUkVOREVSXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZUV2ZW50LlJFTkRFUiA9ICdCYXNlRXZlbnQucmVuZGVyJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBCYXNlRXZlbnQuUkVTSVpFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgcmVzaXplIGV2ZW50IG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFJFU0laRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VFdmVudC5SRVNJWkUgPSAnQmFzZUV2ZW50LnJlc2l6ZSc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgQmFzZUV2ZW50LlNFTEVDVEVEIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGEgc2VsZWN0ZWQgZXZlbnQgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgU0VMRUNURURcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBCYXNlRXZlbnQuU0VMRUNURUQgPSAnQmFzZUV2ZW50LnNlbGVjdGVkJztcbiAgICAgICAgcmV0dXJuIEJhc2VFdmVudDtcbiAgICB9KShCYXNlT2JqZWN0KTtcbiAgICByZXR1cm4gQmFzZUV2ZW50O1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9PYmplY3RNYW5hZ2VyJywgJy4vQmFzZUV2ZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIE9iamVjdE1hbmFnZXIgPSByZXF1aXJlKCcuLi9PYmplY3RNYW5hZ2VyJyk7XG4gICAgdmFyIEJhc2VFdmVudCA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG4gICAgLyoqXG4gICAgICogRXZlbnREaXNwYXRjaGVyIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY2xhc3NlcyB0aGF0IGRpc3BhdGNoIGV2ZW50cy4gSXQgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzLlxuICAgICAqIEV2ZW50RGlzcGF0Y2hlciBwcm92aWRlcyBtZXRob2RzIGZvciBtYW5hZ2luZyBwcmlvcml0aXplZCBxdWV1ZXMgb2YgZXZlbnQgbGlzdGVuZXJzIGFuZCBkaXNwYXRjaGluZyBldmVudHMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnREaXNwYXRjaGVyXG4gICAgICogQGV4dGVuZHMgT2JqZWN0TWFuYWdlclxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIGV2ZW50XG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBPYmplY3RNYW5hZ2VyXG4gICAgICogQHJlcXVpcmVzIEJhc2VFdmVudFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBleGFtcGxlXG4gICAgICogICAgICAvLyBBbm90aGVyIHdheSB0byB1c2UgdGhlIEV2ZW50RGlzcGF0Y2hlci5cbiAgICAgKiAgICAgIGxldCBldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XG4gICAgICogICAgICBldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICogICAgICBldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hFdmVudCgnY2hhbmdlJyk7XG4gICAgICovXG4gICAgdmFyIEV2ZW50RGlzcGF0Y2hlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhFdmVudERpc3BhdGNoZXIsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50RGlzcGF0Y2hlcigpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBIb2xkcyBhIHJlZmVyZW5jZSB0byBhZGRlZCBsaXN0ZW5lcnMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9saXN0ZW5lcnNcbiAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheS48YW55Pn1cbiAgICAgICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSW5kaWNhdGVzIHRoZSBvYmplY3QgdGhhdCBjb250YWlucyBhIGNoaWxkIG9iamVjdC4gVXNlcyB0aGUgcGFyZW50IHByb3BlcnR5XG4gICAgICAgICAgICAgKiB0byBzcGVjaWZ5IGEgcmVsYXRpdmUgcGF0aCB0byBkaXNwbGF5IG9iamVjdHMgdGhhdCBhcmUgYWJvdmUgdGhlIGN1cnJlbnQgZGlzcGxheSBvYmplY3QgaW4gdGhlIGRpc3BsYXlcbiAgICAgICAgICAgICAqIGxpc3QgaGllcmFyY2h5IGFuZCBoZWxwcyBmYWNpbGl0YXRlIGV2ZW50IGJ1YmJsaW5nLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBwYXJlbnRcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgb2JqZWN0IHdpdGggYW4gRXZlbnREaXNwYXRjaGVyIG9iamVjdCBzbyB0aGUgbGlzdGVuZXIgcmVjZWl2ZXMgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgZXZlbnQuIFRoaXMgZnVuY3Rpb24gbXVzdCBhY2NlcHQgYW4gRXZlbnQgb2JqZWN0IGFzIGl0cyBvbmx5IHBhcmFtZXRlciBhbmQgbXVzdCByZXR1cm4gbm90aGluZywgYXMgdGhpcyBleGFtcGxlIHNob3dzLiBAZXhhbXBsZSBmdW5jdGlvbihldmVudDpFdmVudCk6dm9pZFxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gQmluZHMgdGhlIHNjb3BlIHRvIGEgcGFydGljdWxhciBvYmplY3QgKHNjb3BlIGlzIGJhc2ljYWxseSB3aGF0IFwidGhpc1wiIHJlZmVycyB0byBpbiB5b3VyIGZ1bmN0aW9uKS4gVGhpcyBjYW4gYmUgdmVyeSB1c2VmdWwgaW4gSmF2YVNjcmlwdCBiZWNhdXNlIHNjb3BlIGlzbid0IGdlbmVyYWxseSBtYWludGFpbmVkLlxuICAgICAgICAgKiBAcGFyYW0gW3ByaW9yaXR5PTBdIHtpbnR9IEluZmx1ZW5jZXMgdGhlIG9yZGVyIGluIHdoaWNoIHRoZSBsaXN0ZW5lcnMgYXJlIGNhbGxlZC4gTGlzdGVuZXJzIHdpdGggbG93ZXIgcHJpb3JpdGllcyBhcmUgY2FsbGVkIGFmdGVyIG9uZXMgd2l0aCBoaWdoZXIgcHJpb3JpdGllcy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKEJhc2VFdmVudC5DSEFOR0UsIHRoaXMuX2hhbmRsZXJNZXRob2QsIHRoaXMpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIF9oYW5kbGVyTWV0aG9kKGV2ZW50KSB7XG4gICAgICAgICAqICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCArIFwiIHNlbnQgdGhlIGV2ZW50LlwiKTtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudHlwZSwgZXZlbnQuZGF0YSk7XG4gICAgICAgICAqICAgICAgfVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICAgICAgLy8gR2V0IHRoZSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBieSB0aGUgYXNzb2NpYXRlZCB0eXBlIHZhbHVlIHRoYXQgaXMgcGFzc2VkIGluLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV07XG4gICAgICAgICAgICBpZiAobGlzdCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgYSBsaXN0IG9mIGV2ZW50IGxpc3RlbmVycyBkbyBub3QgZXhpc3QgZm9yIHRoZSB0eXBlIHZhbHVlIHBhc3NlZCBpbiB0aGVuIGNyZWF0ZSBhIG5ldyBlbXB0eSBhcnJheS5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBsaXN0ID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICAgICAgdmFyIGkgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgtLWkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2FtZSBjYWxsYmFjayBhbmQgc2NvcGUgYXJlIGZvdW5kIHRoZW4gcmVtb3ZlIGl0IGFuZCBhZGQgdGhlIGN1cnJlbnQgb25lIGJlbG93LlxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IDAgJiYgbGlzdGVuZXIucHJpb3JpdHkgPCBwcmlvcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGxpc3QgYXJyYXkgYXQgdGhlIGluZGV4IHZhbHVlLlxuICAgICAgICAgICAgbGlzdC5zcGxpY2UoaW5kZXgsIDAsIHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBzY29wZTogc2NvcGUsIHByaW9yaXR5OiBwcmlvcml0eSwgb25jZTogZmFsc2UgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBvYmplY3Qgb25jZSB3aXRoIGFuIEV2ZW50RGlzcGF0Y2hlciBvYmplY3Qgc28gdGhlIGxpc3RlbmVyIHdpbGwgcmVjZWl2ZSB0aGUgbm90aWZpY2F0aW9uIG9mIGFuIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFkZEV2ZW50TGlzdGVuZXJPbmNlXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGV2ZW50LiBUaGlzIGZ1bmN0aW9uIG11c3QgYWNjZXB0IGFuIEV2ZW50IG9iamVjdCBhcyBpdHMgb25seSBwYXJhbWV0ZXIgYW5kIG11c3QgcmV0dXJuIG5vdGhpbmcsIGFzIHRoaXMgZXhhbXBsZSBzaG93cy4gQGV4YW1wbGUgZnVuY3Rpb24oZXZlbnQ6RXZlbnQpOnZvaWRcbiAgICAgICAgICogQHBhcmFtIHNjb3BlIHthbnl9IEJpbmRzIHRoZSBzY29wZSB0byBhIHBhcnRpY3VsYXIgb2JqZWN0IChzY29wZSBpcyBiYXNpY2FsbHkgd2hhdCBcInRoaXNcIiByZWZlcnMgdG8gaW4geW91ciBmdW5jdGlvbikuIFRoaXMgY2FuIGJlIHZlcnkgdXNlZnVsIGluIEphdmFTY3JpcHQgYmVjYXVzZSBzY29wZSBpc24ndCBnZW5lcmFsbHkgbWFpbnRhaW5lZC5cbiAgICAgICAgICogQHBhcmFtIFtwcmlvcml0eT0wXSB7aW50fSBJbmZsdWVuY2VzIHRoZSBvcmRlciBpbiB3aGljaCB0aGUgbGlzdGVuZXJzIGFyZSBjYWxsZWQuIExpc3RlbmVycyB3aXRoIGxvd2VyIHByaW9yaXRpZXMgYXJlIGNhbGxlZCBhZnRlciBvbmVzIHdpdGggaGlnaGVyIHByaW9yaXRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lck9uY2UoQmFzZUV2ZW50LkNIQU5HRSwgdGhpcy5faGFuZGxlck1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgX2hhbmRsZXJNZXRob2QoZXZlbnQpIHtcbiAgICAgICAgICogICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0ICsgXCIgc2VudCB0aGUgZXZlbnQuXCIpO1xuICAgICAgICAgKiAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50eXBlLCBldmVudC5kYXRhKTtcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICBFdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXJPbmNlID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCBzY29wZSwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGlmIChwcmlvcml0eSA9PT0gdm9pZCAwKSB7IHByaW9yaXR5ID0gMDsgfVxuICAgICAgICAgICAgLy8gQWRkIHRoZSBldmVudCBsaXN0ZW5lciB0aGUgbm9ybWFsIHdheS5cbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgc2NvcGUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgZXZlbnQgbGlzdGVuZXJzIHdlIGp1c3QgYWRkZWQuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXTtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RbMF07XG4gICAgICAgICAgICAvLyBDaGFuZ2UgdGhlIHZhbHVlIHRvIHRydWUgc28gaXQgd2lsbCBiZSByZW1vdmUgYWZ0ZXIgZGlzcGF0Y2hFdmVudCBpcyBjYWxsZWQuXG4gICAgICAgICAgICBsaXN0ZW5lci5vbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhIHNwZWNpZmllZCBsaXN0ZW5lciBmcm9tIHRoZSBFdmVudERpc3BhdGNoZXIgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgICAgICogQHBhcmFtIHR5cGUge1N0cmluZ30gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBsaXN0ZW5lciBvYmplY3QgdG8gcmVtb3ZlLlxuICAgICAgICAgKiBAcGFyYW0gc2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBsaXN0ZW5lciBvYmplY3QgdG8gYmUgcmVtb3ZlZC5cbiAgICAgICAgICogQGhpZGUgVGhpcyB3YXMgYWRkZWQgYmVjYXVzZSBpdCB3YXMgbmVlZGVkIGZvciB0aGUge3sjY3Jvc3NMaW5rIFwiRXZlbnRCcm9rZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuIFRvIGtlZXAgdGhpbmdzIGNvbnNpc3RlbnQgdGhpcyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lcnMgYnkgdGhlIGFzc29jaWF0ZWQgdHlwZSB2YWx1ZSB0aGF0IGlzIHBhc3NlZCBpbi5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdO1xuICAgICAgICAgICAgaWYgKGxpc3QgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHZhciBpXzEgPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pXzEgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2FsbGJhY2sgYW5kIHNjb3BlIGFyZSB0aGUgc2FtZSB0aGVuIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0W2lfMV0uY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RbaV8xXS5zY29wZSA9PT0gc2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGlfMSwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogPHA+RGlzcGF0Y2hlcyBhbiBldmVudCBpbnRvIHRoZSBldmVudCBmbG93LiBUaGUgZXZlbnQgdGFyZ2V0IGlzIHRoZSBFdmVudERpc3BhdGNoZXIgb2JqZWN0IHVwb24gd2hpY2ggdGhlIGRpc3BhdGNoRXZlbnQoKSBtZXRob2QgaXMgY2FsbGVkLjwvcD5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gICAgICAgICAqIEBwYXJhbSBldmVudCB7c3RyaW5nfEJhc2VFdmVudH0gVGhlIEV2ZW50IG9iamVjdCBvciBldmVudCB0eXBlIHN0cmluZyB5b3Ugd2FudCB0byBkaXNwYXRjaC4gWW91IGNhbiBjcmVhdGUgY3VzdG9tIGV2ZW50cywgdGhlIG9ubHkgcmVxdWlyZW1lbnQgaXMgYWxsIGV2ZW50cyBtdXN0IGV4dGVuZCB7eyNjcm9zc0xpbmsgXCJCYXNlRXZlbnRcIn19e3svY3Jvc3NMaW5rfX0uXG4gICAgICAgICAqIEBwYXJhbSBbZGF0YT1udWxsXSB7YW55fSBUaGUgb3B0aW9uYWwgZGF0YSB5b3Ugd2FudCB0byBzZW5kIHdpdGggdGhlIGV2ZW50LiBEbyBub3QgdXNlIHRoaXMgcGFyYW1ldGVyIGlmIHlvdSBhcmUgcGFzc2luZyBpbiBhIHt7I2Nyb3NzTGluayBcIkJhc2VFdmVudFwifX17ey9jcm9zc0xpbmt9fS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyBFeGFtcGxlOiBTZW5kaW5nIGRhdGEgd2l0aCB0aGUgZXZlbnQ6XG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjaGFuZ2UnLCB7c29tZTogJ2RhdGEnfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gRXhhbXBsZTogV2l0aCBhbiBldmVudCBvYmplY3RcbiAgICAgICAgICogICAgICAvLyAoZXZlbnQgdHlwZSwgYnViYmxpbmcgc2V0IHRvIHRydWUsIGNhbmNlbGFibGUgc2V0IHRvIHRydWUgYW5kIHBhc3NpbmcgZGF0YSkgOlxuICAgICAgICAgKiAgICAgIGxldCBldmVudCA9IG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSwgdHJ1ZSwgdHJ1ZSwge3NvbWU6ICdkYXRhJ30pO1xuICAgICAgICAgKiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgLy8gSGVyZSBpcyBhIGNvbW1vbiBpbmxpbmUgZXZlbnQgb2JqZWN0IGJlaW5nIGRpc3BhdGNoZWQ6XG4gICAgICAgICAqICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LkNIQU5HRSkpO1xuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBldmVudCA9IHR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEJhc2VFdmVudCh0eXBlLCBmYWxzZSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0YXJnZXQgaXMgbnVsbCB0aGVuIHNldCBpdCB0byB0aGUgb2JqZWN0IHRoYXQgZGlzcGF0Y2hlZCB0aGUgZXZlbnQuXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXNzaWduIHRoZSBjdXJyZW50IG9iamVjdCB0aGF0IGlzIGN1cnJlbnRseSBwcm9jZXNzaW5nIHRoZSBldmVudCAoaS5lLiBldmVudCBidWJibGluZyBhdCkuXG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGhpcztcbiAgICAgICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBldmVudCBsaXN0ZW5lciBieSB0aGUgYXNzb2NpYXRlZCB0eXBlIHZhbHVlLlxuICAgICAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0ZW5lcnNbZXZlbnQudHlwZV07XG4gICAgICAgICAgICBpZiAobGlzdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlfMiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pXzIgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGJyZWFrIG91dCBvZiB0aGUgd2hpbGUgbG9vcC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNhbmNlbGFibGUgPT09IHRydWUgJiYgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdFtpXzJdO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnNjb3BlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvbmNlIHZhbHVlIGlzIHRydWUgd2Ugd2FudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIHJpZ2h0IGFmdGVyIHRoaXMgY2FsbGJhY2sgd2FzIGNhbGxlZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC50eXBlLCBsaXN0ZW5lci5jYWxsYmFjaywgbGlzdGVuZXIuc2NvcGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9EaXNwYXRjaGVzIHVwIHRoZSBjaGFpbiBvZiBjbGFzc2VzIHRoYXQgaGF2ZSBhIHBhcmVudC5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudCAhPSBudWxsICYmIGV2ZW50LmJ1YmJsZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBjYW5jZWxhYmxlIGFuZCBpc1Byb3BhZ2F0aW9uU3RvcHBlZCBhcmUgdHJ1ZSB0aGVuIGRvbid0IGRpc3BhdGNoIHRoZSBldmVudCBvbiB0aGUgcGFyZW50IG9iamVjdC5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY2FuY2VsYWJsZSA9PT0gdHJ1ZSAmJiBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgZXZlbnQgdG8gdGhlIHBhcmVudCAoZXZlbnQgYnViYmxpbmcpLlxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBhbiBvYmplY3QgaGFzIGEgc3BlY2lmaWMgZXZlbnQgbGlzdGVuZXIgYWxyZWFkeSBhZGRlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICAgICAqIEBwYXJhbSB0eXBlIHtTdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSBUaGUgbGlzdGVuZXIgbWV0aG9kIHRvIGNhbGwuXG4gICAgICAgICAqIEBwYXJhbSBzY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGxpc3RlbmVyIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihCYXNlRXZlbnQuQ0hBTkdFLCB0aGlzLl9oYW5kbGVyTWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0ZW5lcnNbdHlwZV0gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgICAgICAgICB2YXIgbnVtT2ZDYWxsYmFja3MgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMyA9IDA7IGlfMyA8IG51bU9mQ2FsbGJhY2tzOyBpXzMrKykge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IHRoaXMuX2xpc3RlbmVyc1t0eXBlXVtpXzNdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGxpc3RlbmVyLnNjb3BlID09PSBzY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZXMgYSBzdHJpbmcgb3V0cHV0IG9mIGV2ZW50IGxpc3RlbmVycyBmb3IgYSBnaXZlbiBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0RXZlbnRMaXN0ZW5lcnNcbiAgICAgICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgdGhpcy5nZXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIFtDbGFzc05hbWVdIGlzIGxpc3RlbmluZyBmb3IgdGhlICdCYXNlRXZlbnQuY2hhbmdlJyBldmVudC5cbiAgICAgICAgICovXG4gICAgICAgIEV2ZW50RGlzcGF0Y2hlci5wcm90b3R5cGUuZ2V0RXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICB2YXIgbnVtT2ZDYWxsYmFja3M7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMuX2xpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIG51bU9mQ2FsbGJhY2tzID0gdGhpcy5fbGlzdGVuZXJzW3R5cGVdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzQgPSAwOyBpXzQgPCBudW1PZkNhbGxiYWNrczsgaV80KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV1baV80XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnNjb3BlICYmICh0eXBlb2YgbGlzdGVuZXIuc2NvcGUuZ2V0UXVhbGlmaWVkQ2xhc3NOYW1lID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdbJyArIGxpc3RlbmVyLnNjb3BlLmdldFF1YWxpZmllZENsYXNzTmFtZSgpICsgJ10nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9ICdbVW5rbm93bl0nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBcIiBpcyBsaXN0ZW4gZm9yICdcIiArIHR5cGUgKyBcIicgZXZlbnQuXFxuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBvdmVycmlkZGVuIEJhc2VPYmplY3QuZGVzdHJveVxuICAgICAgICAgKi9cbiAgICAgICAgRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50RGlzcGF0Y2hlcjtcbiAgICB9KShPYmplY3RNYW5hZ2VyKTtcbiAgICByZXR1cm4gRXZlbnREaXNwYXRjaGVyO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuL0Jhc2VFdmVudCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBCYXNlRXZlbnQgPSByZXF1aXJlKCcuL0Jhc2VFdmVudCcpO1xuICAgIC8qKlxuICAgICAqIFRoZSBMb2NhbFN0b3JhZ2VFdmVudCAuLi4uXG4gICAgICogTm90ZTogdGhlIGV2ZW50IG9ubHkgZGlzcGF0Y2hlcyBpbiBvdGhlciBicm93c2VyIHdpbmRvd3MgYW5kIGRvZXMgbm90IHNob3cgdXAgaW4gdGhlIHdpbmRvdyB3aGVyZSB5b3UgbWFkZSBhIGNoYW5nZSB0byB0aGUgbG9jYWwgc3RvcmFnZS5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBMb2NhbFN0b3JhZ2VFdmVudFxuICAgICAqIEBleHRlbmRzIEJhc2VFdmVudFxuICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LiBUaGUgdHlwZSBpcyBjYXNlLXNlbnNpdGl2ZS5cbiAgICAgKiBAcGFyYW0gW2J1YmJsZXM9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LiBJZiB0aGUgZXZlbnQgY2FuIGJ1YmJsZSwgdGhpcyB2YWx1ZSBpcyB0cnVlOyBvdGhlcndpc2UgaXQgaXMgZmFsc2UuXG4gICAgICogTm90ZTogV2l0aCBldmVudC1idWJibGluZyB5b3UgY2FuIGxldCBvbmUgRXZlbnQgc3Vic2VxdWVudGx5IGNhbGwgb24gZXZlcnkgYW5jZXN0b3IgKHt7I2Nyb3NzTGluayBcIkV2ZW50RGlzcGF0Y2hlci9wYXJlbnQ6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0pXG4gICAgICogKGNvbnRhaW5lcnMgb2YgY29udGFpbmVycyBvZiBldGMuKSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSB0aGF0IG9yaWdpbmFsbHkgZGlzcGF0Y2hlZCB0aGUgRXZlbnQsIGFsbCB0aGUgd2F5IHVwIHRvIHRoZSBzdXJmYWNlICh7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSkuIEFueSBjbGFzc2VzIHRoYXQgZG8gbm90IGhhdmUgYSBwYXJlbnQgY2Fubm90IGJ1YmJsZS5cbiAgICAgKiBAcGFyYW0gW2NhbmNlbGFibGU9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLiBJZiB0aGUgYmVoYXZpb3IgY2FuIGJlIGNhbmNlbGVkLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBAcGFyYW0gbmF0aXZlRXZlbnQge1N0b3JhZ2VFdmVudH0gVGhlIG5hdGl2ZSBicm93c2VyIGV2ZW50IGZvciBsb2NhbFN0b3JhZ2UuXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgZXZlbnRcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEJhc2VFdmVudFxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqL1xuICAgIHZhciBMb2NhbFN0b3JhZ2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhMb2NhbFN0b3JhZ2VFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gTG9jYWxTdG9yYWdlRXZlbnQodHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgbmF0aXZlRXZlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUsIG5hdGl2ZUV2ZW50KTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgb3JpZ2luYWxFdmVudFxuICAgICAgICAgICAgICogQHR5cGUge2FueX1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbEV2ZW50ID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChuYXRpdmVFdmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5ID0gbmF0aXZlRXZlbnQua2V5O1xuICAgICAgICAgICAgICAgIHRoaXMub2xkVmFsdWUgPSBuYXRpdmVFdmVudC5vbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld1ZhbHVlID0gbmF0aXZlRXZlbnQubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cmwgPSBuYXRpdmVFdmVudC51cmw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9yaWdpbmFsRXZlbnQgPSBuYXRpdmVFdmVudDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHN0b3JhZ2UgZXZlbnQgaXMgZmlyZWQgb24gYSBEb2N1bWVudCdzIFdpbmRvdyBvYmplY3Qgd2hlbiBhIHN0b3JhZ2UgYXJlYSBjaGFuZ2VzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgU1RPUkFHRVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBMb2NhbFN0b3JhZ2VFdmVudC5TVE9SQUdFID0gJ3N0b3JhZ2UnO1xuICAgICAgICByZXR1cm4gTG9jYWxTdG9yYWdlRXZlbnQ7XG4gICAgfSkoQmFzZUV2ZW50KTtcbiAgICByZXR1cm4gTG9jYWxTdG9yYWdlRXZlbnQ7XG59KTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJy4vQmFzZUV2ZW50J10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIEJhc2VFdmVudCA9IHJlcXVpcmUoJy4vQmFzZUV2ZW50Jyk7XG4gICAgLyoqXG4gICAgICogVGhlIFJvdXRlckV2ZW50IGlzIHVzZWQgaW4gdGhlIHt7I2Nyb3NzTGluayBcIlJvdXRlclwifX17ey9jcm9zc0xpbmt9fSBjbGFzcyBhbmQgZ2V0cyBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrIGluIHRoZSB7eyNjcm9zc0xpbmsgXCJSb3V0ZVwifX17ey9jcm9zc0xpbmt9fSBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBSb3V0ZXJFdmVudFxuICAgICAqIEBleHRlbmRzIEJhc2VFdmVudFxuICAgICAqIEBwYXJhbSB0eXBlIHtzdHJpbmd9IFRoZSB0eXBlIG9mIGV2ZW50LiBUaGUgdHlwZSBpcyBjYXNlLXNlbnNpdGl2ZS5cbiAgICAgKiBAcGFyYW0gW2J1YmJsZXM9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciBhbiBldmVudCBpcyBhIGJ1YmJsaW5nIGV2ZW50LiBJZiB0aGUgZXZlbnQgY2FuIGJ1YmJsZSwgdGhpcyB2YWx1ZSBpcyB0cnVlOyBvdGhlcndpc2UgaXQgaXMgZmFsc2UuXG4gICAgICogTm90ZTogV2l0aCBldmVudC1idWJibGluZyB5b3UgY2FuIGxldCBvbmUgRXZlbnQgc3Vic2VxdWVudGx5IGNhbGwgb24gZXZlcnkgYW5jZXN0b3IgKHt7I2Nyb3NzTGluayBcIkV2ZW50RGlzcGF0Y2hlci9wYXJlbnQ6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0pXG4gICAgICogKGNvbnRhaW5lcnMgb2YgY29udGFpbmVycyBvZiBldGMuKSBvZiB0aGUge3sjY3Jvc3NMaW5rIFwiRGlzcGxheU9iamVjdENvbnRhaW5lclwifX17ey9jcm9zc0xpbmt9fSB0aGF0IG9yaWdpbmFsbHkgZGlzcGF0Y2hlZCB0aGUgRXZlbnQsIGFsbCB0aGUgd2F5IHVwIHRvIHRoZSBzdXJmYWNlICh7eyNjcm9zc0xpbmsgXCJTdGFnZVwifX17ey9jcm9zc0xpbmt9fSkuIEFueSBjbGFzc2VzIHRoYXQgZG8gbm90IGhhdmUgYSBwYXJlbnQgY2Fubm90IGJ1YmJsZS5cbiAgICAgKiBAcGFyYW0gW2NhbmNlbGFibGU9ZmFsc2VdIHtib29sZWFufSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYmVoYXZpb3IgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudCBjYW4gYmUgcHJldmVudGVkLiBJZiB0aGUgYmVoYXZpb3IgY2FuIGJlIGNhbmNlbGVkLCB0aGlzIHZhbHVlIGlzIHRydWU7IG90aGVyd2lzZSBpdCBpcyBmYWxzZS5cbiAgICAgKiBAcGFyYW0gW2RhdGE9bnVsbF0ge2FueX0gVXNlIHRvIHBhc3MgYW55IHR5cGUgb2YgZGF0YSB3aXRoIHRoZSBldmVudC5cbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBldmVudFxuICAgICAqIEByZXF1aXJlcyBFeHRlbmRcbiAgICAgKiBAcmVxdWlyZXMgQmFzZUV2ZW50XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICovXG4gICAgdmFyIFJvdXRlckV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJvdXRlckV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBSb3V0ZXJFdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkYXRhKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gdm9pZCAwKSB7IHR5cGUgPSBSb3V0ZXJFdmVudC5DSEFOR0U7IH1cbiAgICAgICAgICAgIGlmIChidWJibGVzID09PSB2b2lkIDApIHsgYnViYmxlcyA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoY2FuY2VsYWJsZSA9PT0gdm9pZCAwKSB7IGNhbmNlbGFibGUgPSBmYWxzZTsgfVxuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gbnVsbDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdHlwZSwgYnViYmxlcywgY2FuY2VsYWJsZSwgZGF0YSk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSByb3V0ZSB0aGF0IHdhcyBtYXRjaGVkIGFnYWluc3Qge3sjY3Jvc3NMaW5rIFwiUm91dGVyRXZlbnQvcm91dGVQYXR0ZXJuOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319IHByb3BlcnR5LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSByb3V0ZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yb3V0ZSA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBuZXcgVVJMIHRvIHdoaWNoIHRoZSB3aW5kb3cgaXMgbmF2aWdhdGluZy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbmV3VVJMXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm5ld1VSTCA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBwcmV2aW91cyBVUkwgZnJvbSB3aGljaCB0aGUgd2luZG93IHdhcyBuYXZpZ2F0ZWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IG9sZFVSTFxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5vbGRVUkwgPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgcm91dGUgcGF0dGVybiB0aGF0IG1hdGNoZWQgdGhlIHt7I2Nyb3NzTGluayBcIlJvdXRlckV2ZW50L3JvdXRlOnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua319IHByb3BlcnR5LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSByb3V0ZVBhdHRlcm5cbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucm91dGVQYXR0ZXJuID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcGFyYW1ldGVycyBjYXB0dXJlZCBmcm9tIHRoZSBSb3V0ZS57eyNjcm9zc0xpbmsgXCJSb3V0ZS9tYXRjaDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1cbiAgICAgICAgICAgICAqIGJlaW5nIGNhbGxlZCB3aXRoIHRoZSB7eyNjcm9zc0xpbmsgXCJSb3V0ZXJFdmVudC9yb3V0ZVBhdHRlcm46cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gcHJvcGVydHkuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IHBhcmFtc1xuICAgICAgICAgICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnBhcmFtcyA9IFtdO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBIHF1ZXJ5IG9iamVjdCB0aGUgcmVwcmVzZW50cyB0aGUgcXVlcnkgc3RyaW5nIGluIHRoZSBoYXNoIHVybC5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcXVlcnlcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgUm91dGVyRXZlbnQuQ0hBTkdFIGNvbnN0YW50IGRlZmluZXMgdGhlIHZhbHVlIG9mIHRoZSB0eXBlIHByb3BlcnR5IG9mIGFuIGNoYW5nZSByb3V0ZSBldmVudCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBDSEFOR0VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgUm91dGVyRXZlbnQuQ0hBTkdFID0gJ1JvdXRlckV2ZW50LmNoYW5nZSc7XG4gICAgICAgIHJldHVybiBSb3V0ZXJFdmVudDtcbiAgICB9KShCYXNlRXZlbnQpO1xuICAgIHJldHVybiBSb3V0ZXJFdmVudDtcbn0pO1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi4vQmFzZU9iamVjdCcsICcuLi91dGlsL1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgQmFzZU9iamVjdCA9IHJlcXVpcmUoJy4uL0Jhc2VPYmplY3QnKTtcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvVXRpbCcpO1xuICAgIC8qKlxuICAgICAqICBCYXNlIE1vZGVsIGlzIGEgZGVzaWduIHBhdHRlcm4gdXNlZCB0byB0cmFuc2ZlciBkYXRhIGJldHdlZW4gc29mdHdhcmUgYXBwbGljYXRpb24gc3Vic3lzdGVtcy5cbiAgICAgKlxuICAgICAqIE5vdGU6IElmIHRoZSBkYXRhIGRvZXNuJ3QgbWF0Y2ggdGhlIHByb3BlcnR5IG5hbWVzIHlvdSBjYW4gc2V0IHRoZSB2YWx1ZSBtYW51YWxseSBhZnRlciB1cGRhdGUgc3VwZXIgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAgICAgKiAgQWxzbyBpbiB0aGUgY2xhc3MgeW91IGluaGVyaXQgQmFzZU1vZGVsIGZyb20geW91IGNhbiBvdmVycmlkZSB0aGUgdXBkYXRlIG1ldGhvZCB0byBoYW5kbGUgdGhlIGRhdGEgaG93IHlvdSB3YW50LlxuICAgICAqXG4gICAgICogQGNsYXNzIEJhc2VNb2RlbFxuICAgICAqIEBleHRlbmRzIEJhc2VPYmplY3RcbiAgICAgKiBAcGFyYW0gW2RhdGFdIHthbnl9IFByb3ZpZGUgYSB3YXkgdG8gdXBkYXRlIHRoZSAgQmFzZSBNb2RlbCB1cG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIG1vZGVsXG4gICAgICogQHJlcXVpcmVzIEV4dGVuZFxuICAgICAqIEByZXF1aXJlcyBCYXNlT2JqZWN0XG4gICAgICogQHJlcXVpcmVzIFV0aWxcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gICAgICogICAgICBsZXQgZGF0YSA9IHtcbiAgICAgKiAgICAgICAgICAgICAgbWFrZTogJ1Rlc2xhJyxcbiAgICAgKiAgICAgICAgICAgICAgbW9kZWw6ICdNb2RlbCBTJyxcbiAgICAgKiAgICAgICAgICAgICAgWWVBcjogMjAxNCxcbiAgICAgKiAgICAgICAgICAgICAgZmVhdHVyZToge1xuICAgICAqICAgICAgICAgICAgICAgICAgYWJzOiB0cnVlLFxuICAgICAqICAgICAgICAgICAgICAgICAgYWlyYmFnczogdHJ1ZVxuICAgICAqICAgICAgICAgICAgICB9XG4gICAgICogICAgICB9XG4gICAgICogICAgICBsZXQgY2FyTW9kZWwgPSBuZXcgQ2FyTW9kZWwoZGF0YSk7XG4gICAgICpcbiAgICAgKlxuICAgICAqICAgICAgLy8gRXhhbXBsZSBob3cgdG8gZXh0ZW5kIHRoZSBCYXNlTW9kZWwgY2xhc3MuXG4gICAgICogICAgICBjbGFzcyBDYXJNb2RlbCBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAvLyBZb3UgbmVlZCB0byBoYXZlIHByb3BlcnRpZXMgc28gdGhlIGRhdGEgd2lsbCBnZXQgYXNzaWduZWQuXG4gICAgICogICAgICAgICAgLy8gSWYgbm90IHRoZSBkYXRhIHdpbGwgbm90IGdldCBhc3NpZ25lZCB0byB0aGUgbW9kZWwuXG4gICAgICogICAgICAgICAgbWFrZSA9IG51bGw7XG4gICAgICogICAgICAgICAgbW9kZWwgPSBudWxsO1xuICAgICAqICAgICAgICAgIHllYXIgPSBudWxsO1xuICAgICAqICAgICAgICAgIGFsbFdoZWVsID0gZmFsc2U7IC8vIFNldCBhIGRlZmF1bHQgdmFsdWVcbiAgICAgKlxuICAgICAqICAgICAgICAgIC8vIFlvdSBjYW4gYXNzaWduIEJhc2VNb2RlbCB0byBhIHByb3BlcnR5IHdoaWNoIHdpbGxcbiAgICAgKiAgICAgICAgICAvLyBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQgaXQgYW5kIHBhc3MgdGhlIGRhdGEgdG8gaXQuXG4gICAgICogICAgICAgICAgZmVhdHVyZSA9IEZlYXR1cmVNb2RlbFxuICAgICAqXG4gICAgICogICAgICAgICAgLy8gSWYgeW91IGhhdmUgYW4gYXJyYXkgb2YgZGF0YSBhbmQgd2FudCB0aGVtIGFzc2lnbiB0byBhIEJhc2VNb2RlbC5cbiAgICAgKiAgICAgICAgICBmZWF0dXJlID0gW0ZlYXR1cmVNb2RlbF07XG4gICAgICpcbiAgICAgKiAgICAgICAgICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICpcbiAgICAgKiAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgKiAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRhdGEpO1xuICAgICAqICAgICAgICAgICAgICB9XG4gICAgICogICAgICAgICAgfVxuICAgICAqXG4gICAgICogICAgICAgICAgLy8gQG92ZXJyaWRkZW4gQmFzZU1vZGVsLnVwZGF0ZVxuICAgICAqICAgICAgICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICogICAgICAgICAgICAgIHN1cGVyLnVwZGF0ZShkYXRhKTtcbiAgICAgKlxuICAgICAqICAgICAgICAgICAgICAvLyBJZiB0aGUgZGF0YSBkb2Vzbid0IG1hdGNoIHRoZSBwcm9wZXJ0eSBuYW1lLlxuICAgICAqICAgICAgICAgICAgICAvLyBZb3UgY2FuIHNldCB0aGUgdmFsdWUocykgbWFudWFsbHkgYWZ0ZXIgdGhlIHVwZGF0ZSBzdXBlciBtZXRob2QgaGFzIGJlZW4gY2FsbGVkLlxuICAgICAqICAgICAgICAgICAgICB0aGlzLnllYXIgPSBkYXRhLlllQXI7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfVxuICAgICAqL1xuICAgIHZhciBCYXNlTW9kZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQmFzZU1vZGVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCYXNlTW9kZWwoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvdmlkZSBhIHdheSB0byB1cGRhdGUgdGhlICBCYXNlIE1vZGVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHVwZGF0ZVxuICAgICAgICAgKiBAcGFyYW0gZGF0YSB7YW55fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAvLyBFeGFtcGxlIG9mIHVwZGF0aW5nIHNvbWUgb2YgdGhlIGRhdGE6XG4gICAgICAgICAqICAgICBjYXJNb2RlbC51cGRhdGUoeyB5ZWFyOiAyMDE1LCBhbGxXaGVlbDogdHJ1ZX0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgLy8gT2YgY291cnNlIHlvdSBjYW4gYWxzbyBkbyBpdCB0aGUgZm9sbG93aW5nIHdheTpcbiAgICAgICAgICogICAgIGNhck1vZGVsLnllYXIgPSAyMDE1O1xuICAgICAgICAgKiAgICAgY2FyTW9kZWwuYWxsV2hlZWwgPSBmYWxzZTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eURhdGE7XG4gICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eUtleSBpbiB0aGlzKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBjbGFzcyBoYXMgYSBwcm9wZXJ0eSB0aGF0IG1hdGNoZXMgYSBwcm9wZXJ0eSBvbiB0aGUgZGF0YSBiZWluZyBwYXNzZWQgaW4gdGhlbiBzZXQgaXQuXG4gICAgICAgICAgICAgICAgLy8gQWxzbyBkb24ndCBzZXQgdGhlIHNqc0lkIGRhdGEgdmFsdWUgYmVjYXVzZSBpdCBpcyBhdXRvbWF0aWNhbGx5IHNldCBpbiB0aGUgY29uc3RydWN0b3IgYW5kXG4gICAgICAgICAgICAgICAgLy8gd2UgZG8gd2FudCBpdCB0byBiZSBvdmVycmlkZGVuIHdoZW4gdGhlIGNsb25lIG1ldGhvZCBoYXMgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlLZXkpICYmIHByb3BlcnR5S2V5ICE9PSAnc2pzSWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBkYXRhIHBhc3NlZCBpbiBkb2VzIG5vdCBoYXZlIGEgcHJvcGVydHkgdGhhdCBtYXRjaGVzIGEgcHJvcGVydHkgb24gdGhlICBCYXNlIE1vZGVsIHRoZW5cbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIHRoZSBkZWZhdWx0IHZhbHVlL2RhdGEgdGhhdCB3YXMgYXNzaWduZWQgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAvLyBFbHNlIHVzZSB0aGUgZGF0YSB0aGF0IHdhcyBwYXNzZWQgaW4uXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5RGF0YSA9IChkYXRhW3Byb3BlcnR5S2V5XSA9PT0gdm9pZCAwKSA/IHRoaXNbcHJvcGVydHlLZXldIDogZGF0YVtwcm9wZXJ0eUtleV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGEocHJvcGVydHlLZXksIHByb3BlcnR5RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9zZXREYXRhXG4gICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fc2V0RGF0YSA9IGZ1bmN0aW9uIChrZXksIGRhdGEpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBkYXRhIGlzIGFuIGFycmF5IGFuZCBpZiB0aGUgcHJvcGVydHkgaXRzIGJlaW5nIGFzc2lnbmVkIHRvIGlzIGFuIGFycmF5LlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSAmJiB0aGlzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmICgodGhpc1trZXldWzBdIGluc3RhbmNlb2YgQmFzZU1vZGVsLmNvbnN0cnVjdG9yICYmIGRhdGFbMF0gaW5zdGFuY2VvZiBCYXNlTW9kZWwuY29uc3RydWN0b3IpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFzZU1vZGVsT3JPdGhlciA9ICh0aGlzW2tleV0gaW5zdGFuY2VvZiBBcnJheSkgPyB0aGlzW2tleV1bMF0gOiB0aGlzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBbaV8xXSA9IHRoaXMuX3VwZGF0ZURhdGEoYmFzZU1vZGVsT3JPdGhlciwgZGF0YVtpXzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB0ZW1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdGhpcy5fdXBkYXRlRGF0YSh0aGlzW2tleV0sIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogVE9ETzogWVVJRG9jX2NvbW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfdXBkYXRlRGF0YVxuICAgICAgICAgKiBAcGFyYW0ga2V5VmFsdWVcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS5fdXBkYXRlRGF0YSA9IGZ1bmN0aW9uIChrZXlWYWx1ZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKGtleVZhbHVlIGluc3RhbmNlb2YgQmFzZU1vZGVsLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgbm90IGJlZW4gY3JlYXRlZCB5ZXQuXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBpbnN0YW50aWF0ZSBpdCBhbmQgcGFzcyBpbiB0aGUgZGF0YSB0byB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICAgICAga2V5VmFsdWUgPSBuZXcga2V5VmFsdWUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXlWYWx1ZSBpbnN0YW5jZW9mIEJhc2VNb2RlbCkge1xuICAgICAgICAgICAgICAgIC8vIElmIHByb3BlcnR5IGlzIGFuIGluc3RhbmNlIG9mIGEgQmFzZU1vZGVsIGNsYXNzIGFuZCBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQuXG4gICAgICAgICAgICAgICAgLy8gVGhlbiBjYWxsIHRoZSB1cGRhdGUgbWV0aG9kIGFuZCBwYXNzIGluIHRoZSBkYXRhLlxuICAgICAgICAgICAgICAgIGtleVZhbHVlLnVwZGF0ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEVsc2UganVzdCBhc3NpZ24gdGhlIGRhdGEgdG8gdGhlIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgIGtleVZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBrZXlWYWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBCYXNlIE1vZGVsIGRhdGEgaW50byBhIEpTT04gb2JqZWN0IGFuZCBkZWxldGVzIHRoZSBzanNJZCBwcm9wZXJ0eS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0pTT05cbiAgICAgICAgICogQHJldHVybnMge2FueX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IG9iaiA9IGNhck1vZGVsLnRvSlNPTigpO1xuICAgICAgICAgKi9cbiAgICAgICAgQmFzZU1vZGVsLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY2xvbmUgPSBVdGlsLmNsb25lKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIFV0aWwuZGVsZXRlUHJvcGVydHlGcm9tT2JqZWN0KGNsb25lLCBbJ3Nqc0lkJ10pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSAgQmFzZSBNb2RlbCB0byBhIEpTT04gc3RyaW5nLFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc3RyID0gY2FyTW9kZWwudG9KU09OU3RyaW5nKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlTW9kZWwucHJvdG90eXBlLnRvSlNPTlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBzdHJpbmcganNvbiBkYXRhIGludG8gYW4gT2JqZWN0IGFuZCBjYWxscyB0aGUge3sjY3Jvc3NMaW5rIFwiQmFzZU1vZGVsL3VwZGF0ZTptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWV0aG9kIHdpdGggdGhlIGNvbnZlcnRlZCBPYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZnJvbUpTT05cbiAgICAgICAgICogQHBhcmFtIGpzb24ge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBzdHIgPSAne1wibWFrZVwiOlwiVGVzbGFcIixcIm1vZGVsXCI6XCJNb2RlbCBTXCIsXCJ5ZWFyXCI6MjAxNH0nXG4gICAgICAgICAqICAgICAgbGV0IGNhck1vZGVsID0gbmV3IENhck1vZGVsKCk7XG4gICAgICAgICAqICAgICAgY2FyTW9kZWwuZnJvbUpTT04oc3RyKTtcbiAgICAgICAgICovXG4gICAgICAgIEJhc2VNb2RlbC5wcm90b3R5cGUuZnJvbUpTT04gPSBmdW5jdGlvbiAoanNvbikge1xuICAgICAgICAgICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGpzb24pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUocGFyc2VkRGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIGNsb25lL2NvcHkgb2YgdGhlICBCYXNlIE1vZGVsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICAgICAqIEByZXR1cm5zIHtCYXNlTW9kZWx9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBjbG9uZSA9IGNhck1vZGVsLmNsb25lKCk7XG4gICAgICAgICAqL1xuICAgICAgICBCYXNlTW9kZWwucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIGNsb25lZEJhc2VNb2RlbDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJhc2VNb2RlbDtcbiAgICB9KShCYXNlT2JqZWN0KTtcbiAgICByZXR1cm4gQmFzZU1vZGVsO1xufSk7XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInLCAnLi4vZXZlbnQvQmFzZUV2ZW50JywgJy4uL3V0aWwvVXRpbCddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciBFdmVudERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9ldmVudC9FdmVudERpc3BhdGNoZXInKTtcbiAgICB2YXIgQmFzZUV2ZW50ID0gcmVxdWlyZSgnLi4vZXZlbnQvQmFzZUV2ZW50Jyk7XG4gICAgdmFyIFV0aWwgPSByZXF1aXJlKCcuLi91dGlsL1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBUaGUgQ29sbGVjdGlvbiBjbGFzcyBwcm92aWRlcyBhIHdheSBmb3IgeW91IHRvIG1hbmFnZSB5b3VyIG1vZGVscy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBDb2xsZWN0aW9uXG4gICAgICogQGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgbW9kZWxcbiAgICAgKiBAcmVxdWlyZXMgRXh0ZW5kXG4gICAgICogQHJlcXVpcmVzIEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEByZXF1aXJlcyBCYXNlRXZlbnRcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0gYmFzZU1vZGVsVHlwZSB7QmFzZU1vZGVsfSBQYXNzIGEgY2xhc3MgdGhhdCBleHRlbmRzIEJhc2VNb2RlbCBhbmQgdGhlIGRhdGEgYWRkZWQgdG8gdGhlIGNvbGxlY3Rpb24gd2lsbCBiZSBjcmVhdGVkIGFzIHRoYXQgdHlwZS5cbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICBsZXQgZGF0YSA9IFt7IG1ha2U6ICdUZXNsYScsIG1vZGVsOiAnTW9kZWwgUycsIHllYXI6IDIwMTQgfSwgeyBtYWtlOiAnVGVzbGEnLCBtb2RlbDogJ01vZGVsIFgnLCB5ZWFyOiAyMDE2IH1dO1xuICAgICAqXG4gICAgICogICAgIC8vIEV4YW1wbGUgb2YgYWRkaW5nIGRhdGEgdG8gYSBjb2xsZWN0aW9uXG4gICAgICogICAgIGxldCBjb2xsZWN0aW9uID0gbmV3IENvbGxlY3Rpb24oKTtcbiAgICAgKiAgICAgY29sbGVjdGlvbi5hZGQoZGF0YSk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gRXhhbXBsZSBvZiBhZGRpbmcgZGF0YSB0byBhIGNvbGxlY3Rpb24gdGhhdCB3aWxsIGNyZWF0ZSBhIENhck1vZGVsIG1vZGVsIGZvciBlYWNoIGRhdGEgb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgKiAgICAgbGV0IGNvbGxlY3Rpb24gPSBuZXcgQ29sbGVjdGlvbihDYXJNb2RlbCk7XG4gICAgICogICAgIGNvbGxlY3Rpb24uYWRkKGRhdGEpO1xuICAgICAqL1xuICAgIHZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKENvbGxlY3Rpb24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oYmFzZU1vZGVsVHlwZSkge1xuICAgICAgICAgICAgaWYgKGJhc2VNb2RlbFR5cGUgPT09IHZvaWQgMCkgeyBiYXNlTW9kZWxUeXBlID0gbnVsbDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgbW9kZWxzXG4gICAgICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPGFueT59XG4gICAgICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5tb2RlbHMgPSBbXTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGNvdW50IG9mIGhvdyBtYW55IG1vZGVscyBhcmUgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IGxlbmd0aFxuICAgICAgICAgICAgICogQHR5cGUge2ludH1cbiAgICAgICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEEgcmVmZXJlbmNlIHRvIGEgQmFzZU1vZGVsIHR5cGUgdGhhdCB3aWxsIGJlIHVzZWQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHByb3BlcnR5IF9tb2RlbFR5cGVcbiAgICAgICAgICAgICAqIEB0eXBlIHthbnl9XG4gICAgICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX21vZGVsVHlwZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbFR5cGUgPSBiYXNlTW9kZWxUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIG1vZGVsIG9yIGFuIGFycmF5IG9mIG1vZGVscyB0byB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBhZGRcbiAgICAgICAgICogQHBhcmFtIG1vZGVsIHtBbnl8QXJyYXl9IFNpbmdsZSBvciBhbiBhcnJheSBvZiBtb2RlbHMgdG8gYWRkIHRvIHRoZSBjdXJyZW50IGNvbGxlY3Rpb24uXG4gICAgICAgICAqIEBwYXJhbSBbc2lsZW50PWZhbHNlXSB7Ym9vbGVhbn0gSWYgeW91J2QgbGlrZSB0byBwcmV2ZW50IHRoZSBldmVudCBmcm9tIGJlaW5nIGRpc3BhdGNoZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uYWRkKG1vZGVsKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmFkZChbbW9kZWwsIG1vZGVsLCBtb2RlbCwgbW9kZWxdKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmFkZChtb2RlbCwgdHJ1ZSk7XG4gICAgICAgICAqL1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAobW9kZWwsIHNpbGVudCkge1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gdm9pZCAwKSB7IHNpbGVudCA9IGZhbHNlOyB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgbW9kZWwgcGFzc2VkIGluIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQuXG4gICAgICAgICAgICB2YXIgbW9kZWxzID0gKG1vZGVsIGluc3RhbmNlb2YgQXJyYXkpID8gbW9kZWwgOiBbbW9kZWxdO1xuICAgICAgICAgICAgdmFyIGxlbiA9IG1vZGVscy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCBsZW47IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBhZGQgdGhlIG1vZGVsIGlmIGl0IGRvZXMgbm90IGV4aXN0IGluIHRoZSB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXMobW9kZWxzW2lfMV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW9kZWxUeXBlICE9PSBudWxsICYmIChtb2RlbHNbaV8xXSBpbnN0YW5jZW9mIHRoaXMuX21vZGVsVHlwZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbW9kZWxUeXBlIGlzIHNldCBhbmQgdGhlIGRhdGEgaXMgbm90IGFscmVhZHkgYSBpbnN0YW5jZSBvZiB0aGUgbW9kZWxUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGVuIGluc3RhbnRpYXRlIGl0IGFuZCBwYXNzIHRoZSBkYXRhIGludG8gdGhlIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbHMucHVzaChuZXcgdGhpcy5fbW9kZWxUeXBlKG1vZGVsc1tpXzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBkYXRhIG9iamVjdCB0byB0aGUgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVscy5wdXNoKG1vZGVsc1tpXzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMubW9kZWxzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2lsZW50ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQmFzZUV2ZW50KEJhc2VFdmVudC5BRERFRCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgbW9kZWwgb3IgYW4gYXJyYXkgb2YgbW9kZWxzIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcmVtb3ZlXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCB7T2JqZWN0fEFycmF5fSBNb2RlbChzKSB0byByZW1vdmVcbiAgICAgICAgICogQHBhcmFtIFtzaWxlbnQ9ZmFsc2VdIHtib29sZWFufSBJZiB5b3UnZCBsaWtlIHRvIHByZXZlbnQgdGhlIGV2ZW50IGZyb20gYmVpbmcgZGlzcGF0Y2hlZC5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAY2hhaW5hYmxlXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5yZW1vdmUobW9kZWwpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKFttb2RlbCwgbW9kZWwsIG1vZGVsLCBtb2RlbF0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24ucmVtb3ZlKG1vZGVsLCB0cnVlKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChtb2RlbCwgc2lsZW50KSB7XG4gICAgICAgICAgICBpZiAoc2lsZW50ID09PSB2b2lkIDApIHsgc2lsZW50ID0gZmFsc2U7IH1cbiAgICAgICAgICAgIC8vIElmIHRoZSBtb2RlbCBwYXNzZWQgaW4gaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdC5cbiAgICAgICAgICAgIHZhciBtb2RlbHMgPSAobW9kZWwgaW5zdGFuY2VvZiBBcnJheSkgPyBtb2RlbCA6IFttb2RlbF07XG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSBtb2RlbHMubGVuZ3RoIC0gMTsgaV8yID49IDA7IGlfMi0tKSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSByZW1vdmUgdGhlIG1vZGVsIGlmIGl0IGV4aXN0cyBpbiB0aGUgdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzKG1vZGVsc1tpXzJdKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVscy5zcGxpY2UodGhpcy5pbmRleE9mKG1vZGVsc1tpXzJdKSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5tb2RlbHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzaWxlbnQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBCYXNlRXZlbnQoQmFzZUV2ZW50LlJFTU9WRUQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2tzIGlmIGEgY29sbGVjdGlvbiBoYXMgYW4gbW9kZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgaGFzXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCB7T2JqZWN0fSBJdGVtIHRvIGNoZWNrXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmhhcyhtb2RlbCk7XG4gICAgICAgICAqL1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGV4T2YobW9kZWwpID4gLTE7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHRoZSBhcnJheSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgIEJhc2UgTW9kZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgaW5kZXhPZlxuICAgICAgICAgKiBAcGFyYW0gbW9kZWwge09iamVjdH0gZ2V0IHRoZSBpbmRleCBvZi5cbiAgICAgICAgICogQHJldHVybiB7aW50fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5pbmRleE9mKG1vZGVsKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVscy5pbmRleE9mKG1vZGVsKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbmRzIGFuIG9iamVjdCBieSBhbiBpbmRleCB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXRcbiAgICAgICAgICogQHBhcmFtIGluZGV4IHtpbnR9IFRoZSBpbmRleCBpbnRlZ2VyIG9mIHRoZSBtb2RlbCB0byBnZXRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB0aGUgbW9kZWxcbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBtb2RlbCA9IGNvbGxlY3Rpb24uZ2V0KDEpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFeGFtaW5lcyBlYWNoIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gcHJvcGVydGllcy5cbiAgICAgICAgICogV2hlbiBjaGVja2luZyBwcm9wZXJ0aWVzLCB0aGlzIG1ldGhvZCBwZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudCB0byBlYWNoIG90aGVyLlxuICAgICAgICAgKiBAbWV0aG9kIGZpbmRCeVxuICAgICAgICAgKiBAcGFyYW0gYXJnIHtPYmplY3R8QXJyYXl9XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIGEgbGlzdCBvZiBmb3VuZCBvYmplY3Qncy5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIC8vIEZpbmRzIGFsbCAgQmFzZSBNb2RlbCB0aGF0IGhhcyAnUm9iZXJ0JyBpbiBpdC5cbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLmZpbmRCeShcIlJvYmVydFwiKTtcbiAgICAgICAgICogICAgICAvLyBGaW5kcyBhbnkgIEJhc2UgTW9kZWwgdGhhdCBoYXMgJ1JvYmVydCcgb3IgJ0hlYXRlcicgb3IgMjMgaW4gaXQuXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5maW5kQnkoW1wiUm9iZXJ0XCIsIFwiSGVhdGhlclwiLCAzMl0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIEZpbmRzIGFsbCAgQmFzZSBNb2RlbHMgdGhhdCBzYW1lIGtleSBhbmQgdmFsdWUgeW91IGFyZSBzZWFyY2hpbmcgZm9yLlxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uZmluZEJ5KHsgbmFtZTogJ2FwcGxlJywgb3JnYW5pYzogZmFsc2UsIHR5cGU6ICdmcnVpdCcgfSk7XG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5maW5kQnkoW3sgdHlwZTogJ3ZlZ2V0YWJsZScgfSwgeyBuYW1lOiAnYXBwbGUnLCAnb3JnYW5pYzogZmFsc2UsIHR5cGUnOiAnZnJ1aXQnIH1dKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmRCeSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIC8vIElmIHByb3BlcnRpZXMgaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdCBhbiBhcnJheSBvYmplY3QuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IChhcmcgaW5zdGFuY2VvZiBBcnJheSkgPyBhcmcgOiBbYXJnXTtcbiAgICAgICAgICAgIHZhciBmb3VuZEl0ZW1zID0gW107XG4gICAgICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMyA9IDA7IGlfMyA8IGxlbjsgaV8zKyspIHtcbiAgICAgICAgICAgICAgICBwcm9wID0gbGlzdFtpXzNdO1xuICAgICAgICAgICAgICAgIC8vIEFkZHMgZm91bmQgIEJhc2UgTW9kZWwgdG8gdGhlIGZvdW5kSXRlbXMgYXJyYXkuXG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpIHx8ICh0eXBlb2YgcHJvcCA9PT0gJ251bWJlcicpIHx8ICh0eXBlb2YgcHJvcCA9PT0gJ2Jvb2xlYW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbW9kZWwgaXMgbm90IGFuIG9iamVjdC5cbiAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtcyA9IGZvdW5kSXRlbXMuY29uY2F0KHRoaXMuX2ZpbmRQcm9wZXJ0eVZhbHVlKHByb3ApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBtb2RlbCBpcyBhbiBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSXRlbXMgPSBmb3VuZEl0ZW1zLmNvbmNhdCh0aGlzLl93aGVyZShwcm9wKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUmVtb3ZlcyBhbGwgZHVwbGljYXRlZCBvYmplY3RzIGZvdW5kIGluIHRoZSB0ZW1wIGFycmF5LlxuICAgICAgICAgICAgcmV0dXJuIFV0aWwudW5pcXVlKGZvdW5kSXRlbXMpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9vcHMgdGhyb3VnaCB0aGUgbW9kZWxzIGFycmF5IGFuZCBjcmVhdGVzIGEgbmV3IGFycmF5IG9mIG1vZGVscyB0aGF0IG1hdGNoIGFsbCB0aGUgcHJvcGVydGllcyBvbiB0aGUgb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfd2hlcmVcbiAgICAgICAgICogQHBhcmFtIHByb3BMaXN0IHtPYmplY3R8QXJyYXl9XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIGEgbGlzdCBvZiBmb3VuZCBvYmplY3Qncy5cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuX3doZXJlID0gZnVuY3Rpb24gKHByb3BMaXN0KSB7XG4gICAgICAgICAgICAvLyBJZiBwcm9wZXJ0aWVzIGlzIG5vdCBhbiBhcnJheSB0aGVuIG1ha2UgaXQgYW4gYXJyYXkgb2JqZWN0LlxuICAgICAgICAgICAgdmFyIGxpc3QgPSAocHJvcExpc3QgaW5zdGFuY2VvZiBBcnJheSkgPyBwcm9wTGlzdCA6IFtwcm9wTGlzdF07XG4gICAgICAgICAgICB2YXIgZm91bmRJdGVtcyA9IFtdO1xuICAgICAgICAgICAgdmFyIGl0ZW1zTGVuZ3RoID0gdGhpcy5tb2RlbHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGl0ZW1zVG9GaW5kTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGRvZXNNb2RlbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgICAgICB2YXIgb2JqO1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHZhciBqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV80ID0gMDsgaV80IDwgaXRlbXNUb0ZpbmRMZW5ndGg7IGlfNCsrKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gbGlzdFtpXzRdO1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBpdGVtc0xlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc01hdGNoaW5nUHJvcGVydHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgZG9lc01vZGVsTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IHRoaXMubW9kZWxzW2pdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgdmFsdWUgaXMgYSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSAmJiBtb2RlbC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialtrZXldICE9PSBtb2RlbFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXNNb2RlbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9lc01vZGVsTWF0Y2ggPT09IHRydWUgJiYgaGFzTWF0Y2hpbmdQcm9wZXJ0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtcy5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEl0ZW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogTG9vcHMgdGhyb3VnaCBhbGwgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYW5kIGNoZWNrIHRvIHNlZSBpZiB0aGUgdmFsdWUgbWF0Y2hlcyB0aGUgYXJndW1lbnQgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIF9maW5kUHJvcGVydHlWYWx1ZVxuICAgICAgICAgKiBAcGFyYW0gYXJnIHtTdHJpbmd8TnVtYmVyfEJvb2xlYW4+fVxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn0gUmV0dXJucyBhIGxpc3Qgb2YgZm91bmQgb2JqZWN0J3MuXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLl9maW5kUHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgICAgIC8vIElmIHByb3BlcnRpZXMgaXMgbm90IGFuIGFycmF5IHRoZW4gbWFrZSBpdCBhbiBhcnJheSBvYmplY3QuXG4gICAgICAgICAgICB2YXIgbGlzdCA9IChhcmcgaW5zdGFuY2VvZiBBcnJheSkgPyBhcmcgOiBbYXJnXTtcbiAgICAgICAgICAgIHZhciBmb3VuZEl0ZW1zID0gW107XG4gICAgICAgICAgICB2YXIgaXRlbXNMZW5ndGggPSB0aGlzLm1vZGVscy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgaXRlbXNUb0ZpbmRMZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgdmFyIG1vZGVsO1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIHZhciBqO1xuICAgICAgICAgICAgZm9yICh2YXIgaV81ID0gMDsgaV81IDwgaXRlbXNMZW5ndGg7IGlfNSsrKSB7XG4gICAgICAgICAgICAgICAgbW9kZWwgPSB0aGlzLm1vZGVsc1tpXzVdO1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgdmFsdWUgaXMgYSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWUgPSBtb2RlbFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGl0ZW1zVG9GaW5kTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGxpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlICBCYXNlIE1vZGVsIHByb3BlcnR5IGVxdWFscyB0aGUgc3RyaW5nIHZhbHVlIHRoZW4ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGF0ICBCYXNlIE1vZGVsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eVZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZGQgZm91bmQgIEJhc2UgTW9kZWwgdG8gdGhlIGZvdW5kSXRlbXMgYXJyYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSXRlbXMucHVzaChtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEl0ZW1zO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2xlYXJzIG9yIHJlbW92ZSBhbGwgdGhlIG1vZGVscyBmcm9tIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICAgICAqIEBwYXJhbSBbc2lsZW50PWZhbHNlXSB7Ym9vbGVhbn0gSWYgeW91J2QgbGlrZSB0byBwcmV2ZW50IHRoZSBldmVudCBmcm9tIGJlaW5nIGRpc3BhdGNoZWQuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKHNpbGVudCkge1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gdm9pZCAwKSB7IHNpbGVudCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB0aGlzLm1vZGVscyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgaWYgKHNpbGVudCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEJhc2VFdmVudChCYXNlRXZlbnQuQ0xFQVIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBjb2xsZWN0aW9uIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgcmVmZXJlbmNlIHRvIHRoZSBtb2RlbHMgaW4gdGhlIGNvbGxlY3Rpb24gY2xvbmVkIGZyb20uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgICAgICogQHJldHVybnMge0NvbGxlY3Rpb259XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgIGxldCBjbG9uZSA9IGNvbGxlY3Rpb24uY2xvbmUoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGNsb25lZEJhc2VNb2RlbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMuX21vZGVsVHlwZSk7XG4gICAgICAgICAgICBjbG9uZWRCYXNlTW9kZWwuYWRkKHRoaXMubW9kZWxzLnNsaWNlKDApKTtcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRCYXNlTW9kZWw7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgSlNPTiBvYmplY3Qgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9KU09OXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheS48YW55Pn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IGFycmF5T2ZPYmplY3RzID0gY29sbGVjdGlvbi50b0pTT04oKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb2RlbFR5cGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpXzYgPSAwOyBpXzYgPCBsZW47IGlfNisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaV82XSA9IHRoaXMubW9kZWxzW2lfNl0udG9KU09OKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwuY2xvbmUodGhpcy5tb2RlbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlcyBhIEpTT04gc3RyaW5nIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHRvSlNPTlN0cmluZ1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICBsZXQgc3RyID0gY29sbGVjdGlvbi50b0pTT05TdHJpbmcoKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnRvSlNPTlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRvSlNPTigpKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIHRoZSBzdHJpbmcganNvbiBkYXRhIGludG8gYW4gT2JqZWN0cyBhbmQgY2FsbHMgdGhlIHt7I2Nyb3NzTGluayBcIkNvbGxlY3Rpb24vYWRkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QgdG8gYWRkIHRoZSBvYmplY3RzIHRvIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGZyb21KU09OXG4gICAgICAgICAqIEBwYXJhbSBqc29uIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGNoYWluYWJsZVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uZnJvbUpTT04oc3RyKTtcbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZyb21KU09OID0gZnVuY3Rpb24gKGpzb24pIHtcbiAgICAgICAgICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgICAgICAgIHRoaXMuYWRkKHBhcnNlZERhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBbGxvd3MgeW91IHRvIHNvcnQgbW9kZWxzIHRoYXQgaGF2ZSBvbmUgb3IgbW9yZSBjb21tb24gcHJvcGVydGllcywgc3BlY2lmeWluZyB0aGUgcHJvcGVydHkgb3IgcHJvcGVydGllcyB0byB1c2UgYXMgdGhlIHNvcnQga2V5c1xuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHNvcnRPblxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlOYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBbc29ydEFzY2VuZGluZz10cnVlXSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBjb2xsZWN0aW9uLnNvcnRPbignbmFtZScpO1xuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uc29ydE9uKCduYW1lJywgZmFsc2UpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydE9uID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgc29ydEFzY2VuZGluZykge1xuICAgICAgICAgICAgaWYgKHNvcnRBc2NlbmRpbmcgPT09IHZvaWQgMCkgeyBzb3J0QXNjZW5kaW5nID0gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYgKHNvcnRBc2NlbmRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYVtwcm9wZXJ0eU5hbWVdIDwgYltwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYVtwcm9wZXJ0eU5hbWVdID4gYltwcm9wZXJ0eU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3Byb3BlcnR5TmFtZV0gPiBiW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhW3Byb3BlcnR5TmFtZV0gPCBiW3Byb3BlcnR5TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNwZWNpZmllcyBhIGZ1bmN0aW9uIHRoYXQgZGVmaW5lcyB0aGUgc29ydCBvcmRlci4gSWYgb21pdHRlZCwgdGhlIGFycmF5IGlzIHNvcnRlZCBhY2NvcmRpbmcgdG8gZWFjaCBjaGFyYWN0ZXIncyBVbmljb2RlIGNvZGVcbiAgICAgICAgICogcG9pbnQgdmFsdWUsIGFjY29yZGluZyB0byB0aGUgc3RyaW5nIGNvbnZlcnNpb24gb2YgZWFjaCBlbGVtZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHNvcnRcbiAgICAgICAgICogQHBhcmFtIFtzb3J0RnVuY3Rpb249bnVsbF0ge0Z1bmN0aW9ufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc29ydEJ5RGF0ZSA9IGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICAgKiAgICAgICAgICByZXR1cm4gbmV3IERhdGUoYS5kYXRlKSAtIG5ldyBEYXRlKGIuZGF0ZSlcbiAgICAgICAgICogICAgICB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgY29sbGVjdGlvbi5zb3J0KHNvcnRCeURhdGUpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuc29ydCA9IGZ1bmN0aW9uIChzb3J0RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChzb3J0RnVuY3Rpb24gPT09IHZvaWQgMCkgeyBzb3J0RnVuY3Rpb24gPSBudWxsOyB9XG4gICAgICAgICAgICB0aGlzLm1vZGVscy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHM7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmlsdGVyIG1ldGhvZCBjcmVhdGVzIGEgbmV3IGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIHRoYXQgcGFzcyB0aGUgdGVzdCBpbXBsZW1lbnRlZCBieSB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZmlsdGVyXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IEZ1bmN0aW9uIHRvIHRlc3QgZWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheS4gSW52b2tlZCB3aXRoIGFyZ3VtZW50cyAoZWxlbWVudCwgaW5kZXgsIGFycmF5KS4gUmV0dXJuIHRydWUgdG8ga2VlcCB0aGUgZWxlbWVudCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKiBAcGFyYW0gW2NhbGxiYWNrU2NvcGU9bnVsbF0gT3B0aW9uYWwuIFZhbHVlIHRvIHVzZSBhcyB0aGlzIHdoZW4gZXhlY3V0aW5nIGNhbGxiYWNrLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIHRoZSBsaXN0IG9mIG1vZGVscyBpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgaXNPbGRFbm91Z2ggPSBmdW5jdGlvbihtb2RlbCl7XG4gICAgICAgICAqICAgICAgICAgIHJldHVybiBtb2RlbC5hZ2UgPj0gMjE7XG4gICAgICAgICAqICAgICAgfVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBsaXN0ID0gY29sbGVjdGlvbi5maWx0ZXIoaXNPbGRFbm91Z2gpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tTY29wZSA9PT0gdm9pZCAwKSB7IGNhbGxiYWNrU2NvcGUgPSBudWxsOyB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHMuZmlsdGVyKGNhbGxiYWNrLCBjYWxsYmFja1Njb3BlKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlbmllbnQgd2F5IHRvIGdldCBhIGxpc3Qgb2YgcHJvcGVydHkgdmFsdWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHBsdWNrXG4gICAgICAgICAqIEBwYXJhbSBwcm9wZXJ0eU5hbWUge3N0cmluZ30gVGhlIHByb3BlcnR5IG5hbWUgeW91IHdhbnQgdGhlIHZhbHVlcyBmcm9tLlxuICAgICAgICAgKiBAcGFyYW0gW3VuaXF1ZT1mYWxzZV0ge3N0cmluZ30gUGFzcyBpbiB0cnVlIHRvIHJlbW92ZSBkdXBsaWNhdGVzLlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheS48YW55Pn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uYWRkKFt7bmFtZTogJ1JvYmVydCd9LCB7bmFtZTogJ1JvYmVydCd9LCB7bmFtZTogJ0NocmlzJ31dKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBsZXQgbGlzdCA9IGNvbGxlY3Rpb24ucGx1Y2soJ25hbWUnKTtcbiAgICAgICAgICogICAgICAvLyBbJ1JvYmVydCcsICdSb2JlcnQnLCAnQ2hyaXMnXVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBsaXN0ID0gY29sbGVjdGlvbi5wbHVjaygnbmFtZScsIHRydWUpO1xuICAgICAgICAgKiAgICAgIC8vIFsnUm9iZXJ0JywgJ0NocmlzJ11cbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnBsdWNrID0gZnVuY3Rpb24gKHByb3BlcnR5TmFtZSwgdW5pcXVlKSB7XG4gICAgICAgICAgICBpZiAodW5pcXVlID09PSB2b2lkIDApIHsgdW5pcXVlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpXzcgPSAwOyBpXzcgPCB0aGlzLmxlbmd0aDsgaV83KyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbHNbaV83XS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RbaV83XSA9IHRoaXMubW9kZWxzW2lfN11bcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodW5pcXVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgbGlzdCA9IFV0aWwudW5pcXVlKGxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZW5pZW50IHdheSB0byBncm91cCBtb2RlbHMgaW50byBjYXRlZ29yaWVzL2dyb3VwcyBieSBhIHByb3BlcnR5IG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ3JvdXBCeVxuICAgICAgICAgKiBAcGFyYW0gcHJvcGVydHlOYW1lIHtzdHJpbmd9IFRoZSBzdHJpbmcgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHlvdSB3YW50IHRvIGdyb3VwIHdpdGguXG4gICAgICAgICAqIEByZXR1cm4ge2FueX0gUmV0dXJucyBhbiBvYmplY3QgdGhhdCBpcyBjYXRlZ29yaXplZCBieSB0aGUgcHJvcGVydHkgbmFtZS5cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24uYWRkKFt7bmFtZTogJ1JvYmVydCcsIGlkOiAwfSwge25hbWU6ICdSb2JlcnQnLCBpZDogMX0sIHtuYW1lOiAnQ2hyaXMnLCBpZDogMn1dKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBsZXQgbGlzdCA9IGNvbGxlY3Rpb24uZ3JvdXBCeSgnbmFtZScpO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIHtcbiAgICAgICAgICogICAgICAvLyAgICBSb2JlcnQ6IFt7bmFtZTogJ1JvYmVydCcsIGlkOiAwfSwge25hbWU6ICdSb2JlcnQnLCBpZDogMX1dXG4gICAgICAgICAqICAgICAgLy8gICAgQ2hyaXM6IFt7bmFtZTogJ0NocmlzJywgaWQ6IDJ9XVxuICAgICAgICAgKiAgICAgIC8vIH1cbiAgICAgICAgICovXG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmdyb3VwQnkgPSBmdW5jdGlvbiAocHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICB2YXIgbW9kZWw7XG4gICAgICAgICAgICB2YXIgZ3JvdXBOYW1lO1xuICAgICAgICAgICAgdmFyIGdyb3VwTGlzdCA9IHt9O1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgbW9kZWxzIGluIHRoaXMgY29sbGVjdGlvbi5cbiAgICAgICAgICAgIGZvciAodmFyIGlfOCA9IDA7IGlfOCA8IHRoaXMubGVuZ3RoOyBpXzgrKykge1xuICAgICAgICAgICAgICAgIG1vZGVsID0gdGhpcy5tb2RlbHNbaV84XTtcbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIHByb3BlcnR5IG5hbWUgcGFzc2VkIGluIGFuZCB1c2VzIHRoYXQgYXMgdGhlIGdyb3VwIG5hbWUuXG4gICAgICAgICAgICAgICAgZ3JvdXBOYW1lID0gbW9kZWxbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBMaXN0W2dyb3VwTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBncm91cExpc3RbZ3JvdXBOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBncm91cExpc3RbZ3JvdXBOYW1lXS5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBncm91cExpc3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2VzIHRoZSBvcmRlciBvZiB0aGUgbW9kZWxzIHNvIHRoYXQgdGhlIGxhc3QgbW9kZWwgYmVjb21lcyB0aGUgZmlyc3QgbW9kZWwsIHRoZSBwZW51bHRpbWF0ZSBtb2RlbCBiZWNvbWVzIHRoZSBzZWNvbmQsIGFuZCBzbyBvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZXZlcnNlXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHJldHVybiB7QXJyYXkuPGFueT59IFJldHVybnMgdGhlIGxpc3Qgb2YgbW9kZWxzIGluIHRoZSBjb2xsZWN0aW9uLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGNvbGxlY3Rpb24ucmV2ZXJzZSgpO1xuICAgICAgICAgKi9cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVscy5yZXZlcnNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb2xsZWN0aW9uO1xuICAgIH0pKEV2ZW50RGlzcGF0Y2hlcik7XG4gICAgcmV0dXJuIENvbGxlY3Rpb247XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIC8qKlxuICAgICAqIFRoZSAqKlJvdXRlKiogY2xhc3MgaXMgYSBtb2RlbCB0aGF0IGtlZXBzIHRyYWNrIG9mIGEgc3BlY2lmaWMgcm91dGUgZm9yIHRoZSB7eyNjcm9zc0xpbmsgXCJSb3V0ZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3MuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgUm91dGVcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSBtb2RlbFxuICAgICAqIEBwYXJhbSByb3V0ZVBhdHRlcm4ge3N0cmluZ30gVGhlIHN0cmluZyBwYXR0ZXJuIHlvdSB3YW50IHRvIGhhdmUgbWF0Y2gsIHdoaWNoIGNhbiBiZSBhbnkgb2YgdGhlIGZvbGxvd2luZyBjb21iaW5hdGlvbnMge30sIDo6LCAqLCAnJ1xuICAgICAqIEBwYXJhbSBjYWxsYmFjayB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZCB3aGVuIGEgcmVxdWVzdCBtYXRjaGVzIHRoZSByb3V0ZVBhdHRlcm4uXG4gICAgICogQHBhcmFtIGNhbGxiYWNrU2NvcGUge2FueX0gVGhlIHNjb3BlIG9mIHRoZSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBleGVjdXRlZC5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgICAvLyBFeGFtcGxlIG9mIGFkZGluZyBhIHJvdXRlIGxpc3RlbmVyIGFuZCB0aGUgZnVuY3Rpb24gY2FsbGJhY2sgYmVsb3cuXG4gICAgICogICAgIGxldCByb3V0ZSA9IG5ldyBSb3V0ZSgnL2dhbWVzL3tnYW1lTmFtZX0vOmxldmVsOi8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIC8vIFRoZSBhYm92ZSByb3V0ZSB3b3VsZCBtYXRjaCB0aGUgc3RyaW5nIGJlbG93OlxuICAgICAqICAgICByb3V0ZS5tYXRjaCgnL2dhbWVzL2FzdGVyb2lkcy8yLycpO1xuICAgICAqXG4gICAgICogUm91dGUgUGF0dGVybiBPcHRpb25zOlxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiAqKjpvcHRpb25hbDoqKiBUaGUgdHdvIGNvbG9ucyAqKjo6KiogbWVhbnMgYSBwYXJ0IG9mIHRoZSBoYXNoIHVybCBpcyBvcHRpb25hbCBmb3IgdGhlIG1hdGNoLiBUaGUgdGV4dCBiZXR3ZWVuIGNhbiBiZSBhbnl0aGluZyB5b3Ugd2FudCBpdCB0byBiZS5cbiAgICAgKlxuICAgICAqICAgICBsZXQgcm91dGUgPSBuZXcgUm91dGUoJy9jb250YWN0LzpuYW1lOi8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIC8vIFdpbGwgbWF0Y2ggb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICogICAgIHJvdXRlLm1hdGNoKCcvY29udGFjdC8nKTtcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy9jb250YWN0L2hlYXRoZXIvJyk7XG4gICAgICogICAgIHJvdXRlLm1hdGNoKCcvY29udGFjdC9qb2huLycpO1xuICAgICAqXG4gICAgICpcbiAgICAgKiAqKntyZXF1aXJlZH0qKiBUaGUgdHdvIGN1cmx5IGJyYWNrZXRzICoqe30qKiBtZWFucyBhIHBhcnQgb2YgdGhlIGhhc2ggdXJsIGlzIHJlcXVpcmVkIGZvciB0aGUgbWF0Y2guIFRoZSB0ZXh0IGJldHdlZW4gY2FuIGJlIGFueXRoaW5nIHlvdSB3YW50IGl0IHRvIGJlLlxuICAgICAqXG4gICAgICogICAgIGxldCByb3V0ZSA9IG5ldyBSb3V0ZSgnL3Byb2R1Y3Qve3Byb2R1Y3ROYW1lfS8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIC8vIFdpbGwgbWF0Y2ggb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICogICAgIHJvdXRlLm1hdGNoKCcvcHJvZHVjdC9zaG9lcy8nKTtcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy9wcm9kdWN0L2phY2tldHMvJyk7XG4gICAgICpcbiAgICAgKlxuICAgICAqICoqXFwqKiogVGhlIGFzdGVyaXNrIGNoYXJhY3RlciBtZWFucyBpdCB3aWxsIG1hdGNoIGFsbCBvciBwYXJ0IG9mIHBhcnQgdGhlIGhhc2ggdXJsLlxuICAgICAqXG4gICAgICogICAgIGxldCByb3V0ZSA9IG5ldyBSb3V0ZSgnKicsIHRoaXMuX21ldGhvZCwgdGhpcyk7XG4gICAgICpcbiAgICAgKiAgICAgLy8gV2lsbCBtYXRjaCBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy9hbnl0aGluZy8nKTtcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy9tYXRjaGVzL2FueS9oYXNoL3VybC8nKTtcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy9yZWFsbHkvaXQvbWF0Y2hlcy9hbnkvYW5kL2FsbC9oYXNoL3VybHMvJyk7XG4gICAgICpcbiAgICAgKlxuICAgICAqICoqJycqKiBUaGUgZW1wdHkgc3RyaW5nIG1lYW5zIGl0IHdpbGwgbWF0Y2ggd2hlbiB0aGVyZSBhcmUgbm8gaGFzaCB1cmwuXG4gICAgICpcbiAgICAgKiAgICAgbGV0IHJvdXRlID0gbmV3IFJvdXRlKCcnLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAqICAgICBsZXQgcm91dGUgPSBuZXcgUm91dGUoJy8nLCB0aGlzLl9tZXRob2QsIHRoaXMpO1xuICAgICAqXG4gICAgICogICAgIC8vIFdpbGwgbWF0Y2ggb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAgICogICAgIHJvdXRlLm1hdGNoKCcnKTtcbiAgICAgKiAgICAgcm91dGUubWF0Y2goJy8nKTtcbiAgICAgKlxuICAgICAqXG4gICAgICogT3RoZXIgcG9zc2libGUgY29tYmluYXRpb25zIGJ1dCBub3QgbGltaXRlZCB0b286XG4gICAgICpcbiAgICAgKiAgICAgbGV0IHJvdXRlID0gbmV3IFJvdXRlKCcvZ2FtZXMve2dhbWVOYW1lfS86bGV2ZWw6LycsIHRoaXMuX21ldGhvZDEsIHRoaXMpO1xuICAgICAqICAgICBsZXQgcm91dGUgPSBuZXcgUm91dGUoJy97Y2F0ZWdvcnl9L2Jsb2cvJywgdGhpcy5fbWV0aG9kMiwgdGhpcyk7XG4gICAgICogICAgIGxldCByb3V0ZSA9IG5ldyBSb3V0ZSgnL2Fib3V0LyonLCB0aGlzLl9tZXRob2QzLCB0aGlzKTtcbiAgICAgKlxuICAgICAqL1xuICAgIHZhciBSb3V0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFJvdXRlKHJvdXRlUGF0dGVybiwgY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBzdHJpbmcgcGF0dGVybiB5b3Ugd2FudCB0byBoYXZlIG1hdGNoLCB3aGljaCBjYW4gYmUgYW55IG9mIHRoZSBmb2xsb3dpbmcgY29tYmluYXRpb25zIHt9LCA6OiwgKiwgPywgXCJcIi4gU2VlIGJlbG93IGZvciBleGFtcGxlcy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcm91dGVQYXR0ZXJuXG4gICAgICAgICAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5yb3V0ZVBhdHRlcm4gPSAnJztcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHJlZ2V4IHJlcHJlc2VudGF0aW9uIGZvciB0aGUgcm91dGVQYXR0ZXJuIHRoYXQgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgcmVnZXhcbiAgICAgICAgICAgICAqIEB0eXBlIFJlZ0V4cFxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucmVnZXggPSBudWxsO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQgd2hlbiBhIHJlcXVlc3QgbWF0Y2hlcyB0aGUgcm91dGVQYXR0ZXJuLiBUaGUge3sjY3Jvc3NMaW5rIFwiUm91dGVyXCJ9fXt7L2Nyb3NzTGlua319IGNsYXNzIHdpbGwgYmUgdXNpbmcgdGhpcyBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkgY2FsbGJhY2tcbiAgICAgICAgICAgICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRoZSBzY29wZSBvZiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBzaG91bGQgYmUgZXhlY3V0ZWQuIFRoZSB7eyNjcm9zc0xpbmsgXCJSb3V0ZXJcIn19e3svY3Jvc3NMaW5rfX0gY2xhc3Mgd2lsbCBiZSB1c2luZyB0aGlzIHByb3BlcnR5LlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSBjYWxsYmFja1Njb3BlXG4gICAgICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrU2NvcGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZVBhdHRlcm4gPSByb3V0ZVBhdHRlcm47XG4gICAgICAgICAgICB0aGlzLnJlZ2V4ID0gdGhpcy5fcm91dGVQYXR0ZXJuVG9SZWdleHAocm91dGVQYXR0ZXJuKTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tTY29wZSA9IHNjb3BlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyB0aGUgcm91dGVQYXR0ZXJuIHRoYXQgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3RvciB0byBhIHJlZ2V4cCBvYmplY3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgX3JvdXRlUGF0dGVyblRvUmVnZXhwXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSByb3V0ZVBhdHRlcm5cbiAgICAgICAgICogQHJldHVybnMge1JlZ0V4cH1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgUm91dGUucHJvdG90eXBlLl9yb3V0ZVBhdHRlcm5Ub1JlZ2V4cCA9IGZ1bmN0aW9uIChyb3V0ZVBhdHRlcm4pIHtcbiAgICAgICAgICAgIHZhciBmaW5kRmlyc3RPckxhc3RGb3J3YXJkU2xhc2ggPSBuZXcgUmVnRXhwKCdeXFwvfFxcLyQnLCAnZycpOyAvLyBGaW5kcyBpZiB0aGUgZmlyc3QgY2hhcmFjdGVyIE9SIGlmIHRoZSBsYXN0IGNoYXJhY3RlciBpcyBhIGZvcndhcmQgc2xhc2hcbiAgICAgICAgICAgIHZhciBmaW5kT3B0aW9uYWxDb2xvbnMgPSBuZXcgUmVnRXhwKCc6KFteOl0qKTonLCAnZycpOyAvLyBGaW5kcyB0aGUgY29sb25zIDogOlxuICAgICAgICAgICAgdmFyIGZpbmRSZXF1aXJlZEJyYWNrZXRzID0gbmV3IFJlZ0V4cCgneyhbXn1dKyl9JywgJ2cnKTsgLy8gRmluZHMgdGhlIGJyYWNrZXRzIHsgfVxuICAgICAgICAgICAgdmFyIG9wdGlvbmFsRmlyc3RDaGFyU2xhc2ggPSAnXi8/JzsgLy8gQWxsb3dzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgdG8gYmUgaWYgYSBmb3J3YXJkIHNsYXNoIHRvIGJlIG9wdGlvbmFsLlxuICAgICAgICAgICAgdmFyIG9wdGlvbmFsTGFzdENoYXJTbGFzaCA9ICcvPyQnOyAvLyBBbGxvd3MgdGhlIGxhc3QgY2hhcmFjdGVyIHRvIGJlIGlmIGEgZm9yd2FyZCBzbGFzaCB0byBiZSBvcHRpb25hbC5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBmaXJzdCBhbmQgbGFzdCBmb3J3YXJkIHNsYXNoLlxuICAgICAgICAgICAgcm91dGVQYXR0ZXJuID0gcm91dGVQYXR0ZXJuLnJlcGxhY2UoZmluZEZpcnN0T3JMYXN0Rm9yd2FyZFNsYXNoLCAnJyk7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSB3aWxkIGNhcmQgKiBiZSBhIHJlZ2V4ID8oLiopIHRvIHNlbGVjdCBhbGwuXG4gICAgICAgICAgICByb3V0ZVBhdHRlcm4gPSByb3V0ZVBhdHRlcm4ucmVwbGFjZSgnKicsICc/KC4qKScpO1xuICAgICAgICAgICAgLy8gTWFrZSBhbnkgOmFscGhhbnVtZXJpYzogb3B0aW9uYWxcbiAgICAgICAgICAgIHJvdXRlUGF0dGVybiA9IHJvdXRlUGF0dGVybi5yZXBsYWNlKGZpbmRPcHRpb25hbENvbG9ucywgJz8oW14vXSopJyk7XG4gICAgICAgICAgICAvLyBNYWtlIGFueSB7YWxwaGFudW1lcmljfSByZXF1aXJlZFxuICAgICAgICAgICAgcm91dGVQYXR0ZXJuID0gcm91dGVQYXR0ZXJuLnJlcGxhY2UoZmluZFJlcXVpcmVkQnJhY2tldHMsICcoW14vXSspJyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChvcHRpb25hbEZpcnN0Q2hhclNsYXNoICsgcm91dGVQYXR0ZXJuICsgb3B0aW9uYWxMYXN0Q2hhclNsYXNoLCAnaScpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogRGV0ZXJtaW5lIGlmIGEgcm91dGUgbWF0Y2hlcyBhIHJvdXRlUGF0dGVybi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBtYXRjaFxuICAgICAgICAgKiBAcGFyYW0gcm91dGUge1N0cmluZ30gVGhlIHJvdXRlIG9yIHBhdGggdG8gbWF0Y2ggYWdhaW5zdCB0aGUgcm91dGVQYXR0ZXJuIHRoYXQgd2FzIHBhc3NlZCBpbnRvIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICogQHJldHVybnMge0FycmF5Ljxhbnk+fVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgbGV0IHJvdXRlID0gbmV3IFJvdXRlKCcvZ2FtZXMve2dhbWVOYW1lfS86bGV2ZWw6LycsIHRoaXMubWV0aG9kLCB0aGlzKTtcbiAgICAgICAgICogICAgIGNvbnNvbGUubG9nKCByb3V0ZS5tYXRjaCgnL2dhbWVzL2FzdGVyb2lkcy8yLycpICk7XG4gICAgICAgICAqL1xuICAgICAgICBSb3V0ZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgcXVlcnkgc3RyaW5nIGJlZm9yZSBtYXRjaGluZyBhZ2FpbnN0IHRoZSByb3V0ZSBwYXR0ZXJuLlxuICAgICAgICAgICAgdmFyIHJvdXRlV2l0aG91dFF1ZXJ5U3RyaW5nID0gcm91dGUucmVwbGFjZSgvXFw/LiovLCAnJyk7XG4gICAgICAgICAgICByZXR1cm4gcm91dGVXaXRob3V0UXVlcnlTdHJpbmcubWF0Y2godGhpcy5yZWdleCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSb3V0ZTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBSb3V0ZTtcbn0pO1xuIiwiKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdmFyIHYgPSBmYWN0b3J5KHJlcXVpcmUsIGV4cG9ydHMpOyBpZiAodiAhPT0gdW5kZWZpbmVkKSBtb2R1bGUuZXhwb3J0cyA9IHY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9XG59KShmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIHZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG4gICAgdmFyICRldmVudExpc3RlbmVyID0gJDtcbiAgICAvKipcbiAgICAgKiBBIGJpbmQgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgYmluZCBtZXRob2QuXG4gICAgICovXG4gICAgaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgICAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChvVGhpcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1IGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSwgZlRvQmluZCA9IHRoaXMsIGZOT1AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB9LCBmQm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgICAgIDogb1RoaXMsIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuICAgICAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIGEgaGFzaCBzdHJpbmcgZnJvbSB0aGUgc3RyaW5nIGJlaW5nIHBhc3NlZCBpbi4gSW4gdGhpcyBjYXNlIGl0IGlzIGEgZnVuY3Rpb24gdGhhdCBpcyBjYXN0ZWQgYXMgc3RyaW5nIHZhbHVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHN0clxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgdmFyIGhhc2hDb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgICAgICAgLy8gaHR0cDovL2VybHljb2Rlci5jb20vNDkvamF2YXNjcmlwdC1oYXNoLWZ1bmN0aW9ucy10by1jb252ZXJ0LXN0cmluZy1pbnRvLWludGVnZXItaGFzaC1cbiAgICAgICAgdmFyIGNoYXJhY3RlcjtcbiAgICAgICAgdmFyIGhhc2ggPSBudWxsO1xuICAgICAgICB2YXIgc3RyTGVuZ3RoID0gc3RyLmxlbmd0aDtcbiAgICAgICAgaWYgKHN0ckxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IHN0ckxlbmd0aDsgaV8xKyspIHtcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IHN0ci5jaGFyQ29kZUF0KGlfMSk7XG4gICAgICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyYWN0ZXI7XG4gICAgICAgICAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5hYnMoaGFzaCkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIGpRdWVyeSBhZGRFdmVudExpc3RlbmVyIHBsdWdpblxuICAgICAqL1xuICAgICRldmVudExpc3RlbmVyLmZuLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAodHlwZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrLCBzY29wZSkge1xuICAgICAgICB2YXIgX2NhbGxiYWNrO1xuICAgICAgICB2YXIgX3Njb3BlO1xuICAgICAgICB2YXIgX2hhbmRsZXI7XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gX2NhbGxiYWNrLmJpbmQoX3Njb3BlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKHR5cGUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IF9jYWxsYmFjay5iaW5kKF9zY29wZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIF9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIF9zY29wZSA9IHNjb3BlO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcCA9IF9zY29wZS5faGFuZGxlck1hcCB8fCB7fTtcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IF9jYWxsYmFjay5iaW5kKF9zY29wZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbih0eXBlLCBzZWxlY3RvciwgZGF0YSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2pRdWVyeSBhZGRFdmVudExpc3RlbmVyIHBsdWdpbiByZXF1aXJlcyBhdCBsZWFzdCAzIGFyZ3VtZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBqUXVlcnkgcmVtb3ZlRXZlbnRMaXN0ZW5lciBwbHVnaW5cbiAgICAgKi9cbiAgICAkZXZlbnRMaXN0ZW5lci5mbi5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKHR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgdmFyIF9jYWxsYmFjaztcbiAgICAgICAgdmFyIF9zY29wZTtcbiAgICAgICAgdmFyIF9oYW5kbGVyO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBfY2FsbGJhY2sgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICBfc2NvcGUgPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBfc2NvcGUuX2hhbmRsZXJNYXAgPSBfc2NvcGUuX2hhbmRsZXJNYXAgfHwge307XG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSBfc2NvcGUuX2hhbmRsZXJNYXBbaGFzaENvZGUoX2NhbGxiYWNrKV07XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF9zY29wZS5faGFuZGxlck1hcFtoYXNoQ29kZShfY2FsbGJhY2spXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgX3Njb3BlID0gc2NvcGU7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwID0gX3Njb3BlLl9oYW5kbGVyTWFwIHx8IHt9O1xuICAgICAgICAgICAgICAgIF9oYW5kbGVyID0gX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKHR5cGUsIHNlbGVjdG9yLCBfaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgX3Njb3BlLl9oYW5kbGVyTWFwW2hhc2hDb2RlKF9jYWxsYmFjayldID0gbnVsbDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdqUXVlcnkgcmVtb3ZlRXZlbnRMaXN0ZW5lciBwbHVnaW4gcmVxdWlyZXMgYXQgbGVhc3QgMyBhcmd1bWVudHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gJGV2ZW50TGlzdGVuZXI7XG59KTtcbiIsIihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHZhciB2ID0gZmFjdG9yeShyZXF1aXJlLCBleHBvcnRzKTsgaWYgKHYgIT09IHVuZGVmaW5lZCkgbW9kdWxlLmV4cG9ydHMgPSB2O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsICcuLi91dGlsL1V0aWwnXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICB2YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwvVXRpbCcpO1xuICAgIC8qKlxuICAgICAqIEEgaGVscGVyIGNsYXNzIHRvIGNyZWF0ZSBtdWx0aXBsZSBpbnN0YW5jZXMgb2YgdGhlIHNhbWUgQ29tcG9uZW50IENsYXNzIGZyb20galF1ZXJ5IG9iamVjdCB0aGF0IGhhcyBvbmUgb3IgbW9yZSBlbGVtZW50cyBpbiBpdC5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBDb21wb25lbnRGYWN0b3J5XG4gICAgICogQG1vZHVsZSBTdHJ1Y3R1cmVKU1xuICAgICAqIEBzdWJtb2R1bGUgdXRpbFxuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICB2YXIgQ29tcG9uZW50RmFjdG9yeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbXBvbmVudEZhY3RvcnkoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tDb21wb25lbnRGYWN0b3J5XSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIENvbXBvbmVudEZhY3RvcnkgY2xhc3MgYmVjYXVzZSBpdCBpcyBhIHN0YXRpYyBjbGFzcy4nKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGFrZXMgYSBqUXVlcnkgb2JqZWN0IHRoYXQgaGFzIG9uZSBvciBtb3JlIGVsZW1lbnRzIGluIGl0IGFuZCBwYXNzZXMgYSBzaW5nbGUgalF1ZXJ5IGVsZW1lbnQgaW50byB0aGUgY29uc3RydWN0b3Igb2YgdGhlIGNsYXNzIHRoYXQgaXMgYWxzbyBiZWluZyBwYXNzZWQgaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSAkZWxlbWVudCB7alF1ZXJ5fSBPbmUgb3IgbW9yZSBqUXVlcnkgcmVmZXJlbmNlZCBET00gZWxlbWVudHMuXG4gICAgICAgICAqIEBwYXJhbSBDb21wb25lbnRDbGFzcyB7YW55fSBUaGUgY2xhc3MgdGhhdCB5b3Ugd2FudCBpbnN0YW50aWF0ZWQuXG4gICAgICAgICAqIEBwYXJhbSBbc2NvcGU9bnVsbF0ge0Rpc3BsYXlPYmplY3RDb250YWluZXJ9IFRoaXMgc2NvcGUgKHBhcmVudCBvYmplY3QpIGlzIG5lZWRlZCB0byBpbnN0YW50aWF0ZSB0aGUgY29tcG9uZW50L3ZpZXcgd2l0aCB0aGUgdXNlIG9mIHRoZSB7eyNjcm9zc0xpbmsgXCJEaXNwbGF5T2JqZWN0Q29udGFpbmVyL2FkZENoaWxkOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBtZXRob2QuXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5Ljxhbnk+fSBSZXR1cm5zIGEgbGlzdCBvZiBpbnN0YW50aWF0ZWQgY29tcG9uZW50cy92aWV3cyBzbyB5b3UgY2FuIG1hbmFnZSB0aGVtIHdpdGhpbiB0aGUgQ2xhc3MgdGhhdCBjcmVhdGVkIHRoZW0uXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIENvbXBvbmVudEZhY3RvcnkuY3JlYXRlKCQoJy5qcy1saXN0JyksIFNvbWVDbGFzcywgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uICgkZWxlbWVudHMsIENvbXBvbmVudENsYXNzLCBzY29wZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlID09PSB2b2lkIDApIHsgc2NvcGUgPSBudWxsOyB9XG4gICAgICAgICAgICB2YXIgbGlzdCA9IFtdO1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudDtcbiAgICAgICAgICAgIHZhciAkZWxlbWVudDtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSAkZWxlbWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHR5cGVzO1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudE5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzEgPSAwOyBpXzEgPCBsZW5ndGg7IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQgPSAkZWxlbWVudHMuZXEoaV8xKTtcbiAgICAgICAgICAgICAgICB0eXBlcyA9ICRlbGVtZW50LmF0dHIoJ2RhdGEtc2pzLXR5cGUnKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZXMgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbXBvbmVudCBpZiB0aGVyZSBpcyBub3QgYSAnZGF0YS1zanMtdHlwZScgYXR0cmlidXRlIG9uIHRoZSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRWxzZSBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgJ2RhdGEtc2pzLXR5cGUnIGF0dHJpYnV0ZSB0aGVuIGdldCB0aGUgdHlwZShzKS5cbiAgICAgICAgICAgICAgICAgICAgdHlwZXMgPSB0eXBlcy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lID0gVXRpbC5nZXROYW1lKENvbXBvbmVudENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSBjcmVhdGUgdGhlIGNvbXBvbmVudCBpZiB0aGUgY29tcG9uZW50IHR5cGUgZG9lcyBub3QgYWxyZWFkeSBleGlzdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVzLmluZGV4T2YoY29tcG9uZW50TmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQgPSBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGVscGVyIG1ldGhvZCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBfY3JlYXRlQ29tcG9uZW50XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBDb21wb25lbnRGYWN0b3J5Ll9jcmVhdGVDb21wb25lbnQgPSBmdW5jdGlvbiAoJGVsZW1lbnQsIENvbXBvbmVudENsYXNzLCBzY29wZSkge1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRDbGFzcygkZWxlbWVudCk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgY2xhc3Mgb2JqZWN0IGhhcyB0aGUgc2pzSWQgcHJvcGVydHkgdGhlbiBJIGFtIGFzc3VtaW5nIGl0IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBEaXNwbGF5T2JqZWN0IGNsYXNzLlxuICAgICAgICAgICAgaWYgKHNjb3BlICE9PSBudWxsICYmIGNvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eSgnc2pzSWQnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHNjb3BlLmFkZENoaWxkKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50RmFjdG9yeTtcbiAgICB9KSgpO1xuICAgIHJldHVybiBDb21wb25lbnRGYWN0b3J5O1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgU3RyaW5nVXRpbC4uLlxuICAgICAqXG4gICAgICogQGNsYXNzIFN0cmluZ1V0aWxcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB1dGlsXG4gICAgICogQGF1dGhvciBSb2JlcnQgUy4gKHd3dy5jb2RlQmVsdC5jb20pXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHZhciBTdHJpbmdVdGlsID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU3RyaW5nVXRpbCgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1N0cmluZ1V0aWxdIERvIG5vdCBpbnN0YW50aWF0ZSB0aGUgU3RyaW5nVXRpbCBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIHRoZSBleHRlbnNpb24gbmFtZSBvZmYgdGhlIHN0cmluZyBiZWluZyBwYXNzZWQgaW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZ2V0RXh0ZW5zaW9uXG4gICAgICAgICAqIEBwYXJhbSBmaWxlbmFtZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gd2l0aERvdCB7Ym9vbGVhbn0gSWYgeW91IHdhbnQgdGhlIHBlcmlvZCB0byBiZSBpbmNsdWRlZCBpbiB0aGUgZXh0ZW5zaW9uIG5hbWUuXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwuZ2V0RXh0ZW5zaW9uKCdmaWxlLmV4ZScpO1xuICAgICAgICAgKiAgICAgIC8vICdleGUnXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5nZXRFeHRlbnNpb24oJ2ZpbGUuZXhlJywgdHJ1ZSk7XG4gICAgICAgICAqICAgICAgLy8gJy5leGUnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmdldEV4dGVuc2lvbiA9IGZ1bmN0aW9uIChmaWxlbmFtZSwgd2l0aERvdCkge1xuICAgICAgICAgICAgaWYgKHdpdGhEb3QgPT09IHZvaWQgMCkgeyB3aXRoRG90ID0gZmFsc2U7IH1cbiAgICAgICAgICAgIHZhciBudW0gPSAod2l0aERvdCA9PT0gdHJ1ZSkgPyAwIDogMTtcbiAgICAgICAgICAgIHJldHVybiBmaWxlbmFtZS5zbGljZShmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpICsgbnVtLCBmaWxlbmFtZS5sZW5ndGgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBzZW50ZW5jZSBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b1NlbnRlbmNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIFtzZXBhcmF0b3JdIHtzdHJpbmd9IENhbiBiZSBhbnkgc3RyaW5nIHlvdSB3YW50IHRvIHVzZSBhcyBhIHNlcGFyYXRvci5cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlIGRvd24gYnkgdGhlIHJpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnLScpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlLWRvd24tYnktdGhlLXJpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnXycpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlX2Rvd25fYnlfdGhlX3JpdmVyJ1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9TZW50ZW5jZShcImxpdmVEb3duX2J5LXRoZS5SaXZlclwiLCAnLycpO1xuICAgICAgICAgKiAgICAgIC8vICdsaXZlL2Rvd24vYnkvdGhlL3JpdmVyJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b1NlbnRlbmNlID0gZnVuY3Rpb24gKHN0ciwgc2VwYXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAoc2VwYXJhdG9yID09PSB2b2lkIDApIHsgc2VwYXJhdG9yID0gJyAnOyB9XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKHN0cilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvKFxcZCkvZywgJyQxICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLyhbYS16XSg/PVtBLVpdKSkvZywgJyQxICcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teYS16QS1aMC05IF0vZywgJyAnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csICcgJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXiB8ICQvZywgJycpXG4gICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCBzZXBhcmF0b3IpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYSBjYW1lbCBjYXNlIHN0cmluZy5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0b0NhbWVsQ2FzZVxuICAgICAgICAgKiBAcGFyYW0gc3RyIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwudG9DYW1lbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ2xpdmVEb3duQnlUaGVSaXZlcidcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwudG9DYW1lbENhc2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nVXRpbC50b1NlbnRlbmNlKHN0cilcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvIChcXHcpL2csIGZ1bmN0aW9uIChfLCAkMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkMS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb252ZXJ0cyBhIGh5cGhlbiBzdHJpbmcgdG8gYSBwYXNjYWwgY2FzZSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9QYXNjYWxDYXNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50b1Bhc2NhbENhc2UoXCJsaXZlRG93bl9ieS10aGUuUml2ZXJcIik7XG4gICAgICAgICAqICAgICAgLy8gJ0xpdmVEb3duQnlUaGVSaXZlcidcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwudG9QYXNjYWxDYXNlID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwudG9DYW1lbENhc2Uoc3RyKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eW2EtekEtWl0vLCBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBhLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGEgY29uc3RhbnQgY2FzZSBzdHJpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9Db25zdGFudENhc2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnRvQ29uc3RhbnRDYXNlKFwibGl2ZURvd25fYnktdGhlLlJpdmVyXCIpO1xuICAgICAgICAgKiAgICAgIC8vICdMSVZFX0RPV05fQllfVEhFX1JJVkVSJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50b0NvbnN0YW50Q2FzZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmdVdGlsLnRvU2VudGVuY2Uoc3RyLCAnXycpXG4gICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgdW5pdmVyc2FsbHkgdW5pcXVlIGlkZW50aWZpZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlVVVJRFxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmNyZWF0ZVVVSUQoKTtcbiAgICAgICAgICogICAgICAvLyAnYTk1ZDcxMzQtMzM0Mi00MDAxLWJjZWEtY2MwMzcxYjcwZGVjJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5jcmVhdGVVVUlEID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHV1aWQgPSAoJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcpLnJlcGxhY2UoL1t4eV0vZywgZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDA7XG4gICAgICAgICAgICAgICAgdmFyIHYgPSAoYyA9PSAneCcpID8gciA6IChyICYgMHgzIHwgMHg4KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB1dWlkO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydHMgYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHF1ZXJ5U3RyaW5nVG9PYmplY3RcbiAgICAgICAgICogQHBhcmFtIHF1ZXJ5U3RyaW5nIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBbdXNlUGFyc2VGbG9hdD1mYWxzZV0ge2Jvb2xlYW59IElmIHRydWUgY29udmVydHMgc3RyaW5ncyB0byBudW1iZXJzLlxuICAgICAgICAgKiBAcmV0dXJucyB7T2JqZWN0fE51bGx9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucXVlcnlTdHJpbmdUb09iamVjdCgnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9bWFsZScpO1xuICAgICAgICAgKiAgICAgIC8vIHtuYW1lOiAnUm9iZXJ0JywgYWdlOiAnMjMnLCBnZW5kZXI6ICdtYWxlJ31cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnF1ZXJ5U3RyaW5nVG9PYmplY3QoJz9uYW1lPVJvYmVydCZhZ2U9MjMmZ2VuZGVyPW1hbGUnLCB0cnVlKTtcbiAgICAgICAgICogICAgICAvLyB7bmFtZTogJ1JvYmVydCcsIGFnZTogMjMsIGdlbmRlcjogJ21hbGUnfVxuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5xdWVyeVN0cmluZ1RvT2JqZWN0ID0gZnVuY3Rpb24gKHF1ZXJ5U3RyaW5nLCB1c2VQYXJzZUZsb2F0KSB7XG4gICAgICAgICAgICBpZiAodXNlUGFyc2VGbG9hdCA9PT0gdm9pZCAwKSB7IHVzZVBhcnNlRmxvYXQgPSBmYWxzZTsgfVxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHN0ciA9IHF1ZXJ5U3RyaW5nLnN1YnN0cmluZyhxdWVyeVN0cmluZy5pbmRleE9mKCc/JykgKyAxKTtcbiAgICAgICAgICAgIGlmIChzdHIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTcGxpdCBpbnRvIGtleS92YWx1ZSBwYWlyc1xuICAgICAgICAgICAgdmFyIHF1ZXJpZXMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgdGhlIGFycmF5IG9mIHN0cmluZ3MgaW50byBhbiBvYmplY3RcbiAgICAgICAgICAgIHZhciBsZW4gPSBxdWVyaWVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDA7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICB0ZW1wID0gcXVlcmllc1tpXzFdLnNwbGl0KCc9Jyk7XG4gICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gKHVzZVBhcnNlRmxvYXQgPT09IHRydWUgJiYgaXNOYU4ocGFyc2VGbG9hdCh0ZW1wWzFdKSkgPT09IGZhbHNlKSA/IHBhcnNlRmxvYXQodGVtcFsxXSkgOiB0ZW1wWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBhbGwgd2hpdGVzcGFjZSBmcm9tIHRoZSBzdHJpbmcgcGFzc2VkIGluLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbW92ZUFsbFdoaXRlc3BhY2VcbiAgICAgICAgICogQHBhcmFtIHN0ciB7c3RyaW5nfVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc3RyID0gJyAgIGEgYiAgICBjIGQgZSBmIGcgJztcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLnJlbW92ZUFsbFdoaXRlc3BhY2Uoc3RyKTtcbiAgICAgICAgICogICAgICAvLyAnYWJjZGVmZydcbiAgICAgICAgICovXG4gICAgICAgIFN0cmluZ1V0aWwucmVtb3ZlQWxsV2hpdGVzcGFjZSA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKy9nLCAnJyk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCByZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlXG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgbGV0IHN0ciA9ICcgICBhIGIgICAgYyBkIGUgZiBnICc7XG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC5yZW1vdmVMZWFkaW5nVHJhaWxpbmdXaGl0ZXNwYWNlKHN0cik7XG4gICAgICAgICAqICAgICAgLy8gJ2EgYiAgICBjIGQgZSBmIGcnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLnJlbW92ZUxlYWRpbmdUcmFpbGluZ1doaXRlc3BhY2UgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyheXFxzK3xcXHMrJCkvZywgJycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB0cnVuY2F0ZVxuICAgICAgICAgKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxuICAgICAgICAgKiBAcGFyYW0gbGVuZ3RoIHtpbnR9XG4gICAgICAgICAqIEBwYXJhbSBpbmRpY2F0b3Ige3N0cmluZ31cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSgnUm9iZXJ0IGlzIGNvb2wgYW5kIGhlIGxpa2VzIGJydXNjaGV0dGEuJywgMTQpKTtcbiAgICAgICAgICogICAgICAvLyAnUm9iZXJ0IGlzIGNvb2wuLi4nXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSgnUm9iZXJ0IGlzIGNvb2wgYW5kIGhlIGxpa2VzIGJydXNjaGV0dGEuJywgMTQsICchISEnKSk7XG4gICAgICAgICAqICAgICAgLy8gJ1JvYmVydCBpcyBjb29sISEhJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC50cnVuY2F0ZSA9IGZ1bmN0aW9uICh0ZXh0LCBsZW5ndGgsIGluZGljYXRvcikge1xuICAgICAgICAgICAgaWYgKGluZGljYXRvciA9PT0gdm9pZCAwKSB7IGluZGljYXRvciA9ICcuLi4nOyB9XG4gICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPD0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dC5zdWJzdHIoMCwgbGVuZ3RoKSArIGluZGljYXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlcGxhY2VzIGVhY2ggZm9ybWF0IGl0ZW0gaW4gYSBzcGVjaWZpZWQgc3RyaW5nIHdpdGggdGhlIHRleHQgZXF1aXZhbGVudCBvZiBhIGNvcnJlc3BvbmRpbmcgb2JqZWN0J3MgdmFsdWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZm9ybWF0XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBzdHIge3N0cmluZ31cbiAgICAgICAgICogQHBhcmFtIC4uLnJlc3Qge0FycmF5Ljxhbnk+fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBTdHJpbmdVdGlsLmZvcm1hdCgnUm9iZXJ0IGlzIHswfS4gVmVyeSB7MH0gYW5kIHsxfSEnLCAnY29vbCcsICdzbWFydCcpO1xuICAgICAgICAgKiAgICAgIC8vICdSb2JlcnQgaXMgY29vbC4gVmVyeSBjb29sIGFuZCBzbWFydCEnXG4gICAgICAgICAqL1xuICAgICAgICBTdHJpbmdVdGlsLmZvcm1hdCA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHZhciByZXN0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHJlc3RbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdC5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBzdHI7XG4gICAgICAgICAgICBmb3IgKHZhciBpXzIgPSAwOyBpXzIgPCBsZW5ndGg7IGlfMisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJ1xcXFx7JyArIGlfMiArICdcXFxcfScsICdnbScpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZWcsIHJlc3RbaV8yXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGVzIGEgdmFsdWUgaW4gdGhlIHF1ZXJ5IHN0cmluZyBieSBpdHMga2V5IG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgcGFyYW1SZXBsYWNlXG4gICAgICAgICAqIEBwYXJhbSBxdWVyeVN0cmluZ1xuICAgICAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ3x2b2lkfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIFN0cmluZ1V0aWwucGFyYW1SZXBsYWNlKCc/bmFtZT1Sb2JlcnQmYWdlPTIzJmdlbmRlcj1tYWxlJywgJ2dlbmRlcicsICdmZW1hbGUnKTtcbiAgICAgICAgICogICAgICAvLyAnP25hbWU9Um9iZXJ0JmFnZT0yMyZnZW5kZXI9ZmVtYWxlJ1xuICAgICAgICAgKi9cbiAgICAgICAgU3RyaW5nVXRpbC5wYXJhbVJlcGxhY2UgPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBGaW5kIHRoZSBwYXJhbSB3aXRoIHJlZ2V4XG4gICAgICAgICAgICAvLyBHcmFiIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gdGhlIHJldHVybmVkIHN0cmluZyAoc2hvdWxkIGJlID8gb3IgJilcbiAgICAgICAgICAgIC8vIFJlcGxhY2Ugb3VyIGhyZWYgc3RyaW5nIHdpdGggb3VyIG5ldyB2YWx1ZSwgcGFzc2luZyBvbiB0aGUgbmFtZSBhbmQgZGVsaW1pdGVyXG4gICAgICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKCdbXFxcXD8mXScgKyBuYW1lICsgJz0oW14mI10qKScpO1xuICAgICAgICAgICAgdmFyIGRlbGltaXRlciA9IHJlLmV4ZWMocXVlcnlTdHJpbmcpWzBdLmNoYXJBdCgwKTtcbiAgICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZy5yZXBsYWNlKHJlLCBkZWxpbWl0ZXIgKyBuYW1lICsgJz0nICsgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gU3RyaW5nVXRpbDtcbiAgICB9KSgpO1xuICAgIHJldHVybiBTdHJpbmdVdGlsO1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiLCAnLi9TdHJpbmdVdGlsJ10sIGZhY3RvcnkpO1xuICAgIH1cbn0pKGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgdmFyIFN0cmluZ1V0aWwgPSByZXF1aXJlKCcuL1N0cmluZ1V0aWwnKTtcbiAgICAvKipcbiAgICAgKiBBIGhlbHBlciBjbGFzcyB0byBwcm92aWRlIGEgY29udmVuaWVudCBhbmQgY29uc2lzdGVudCB3YXkgdG8gcmVuZGVyIHRlbXBsYXRlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBUZW1wbGF0ZUZhY3RvcnlcbiAgICAgKiBAbW9kdWxlIFN0cnVjdHVyZUpTXG4gICAgICogQHN1Ym1vZHVsZSB1dGlsXG4gICAgICogQHJlcXVpcmVzIFN0cmluZ1V0aWxcbiAgICAgKiBAcmVxdWlyZXMgSGFuZGxlYmFyc1xuICAgICAqIEBhdXRob3IgUm9iZXJ0IFMuICh3d3cuY29kZUJlbHQuY29tKVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICB2YXIgVGVtcGxhdGVGYWN0b3J5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVGVtcGxhdGVGYWN0b3J5KCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVGVtcGxhdGVGYWN0b3J5XSBEbyBub3QgaW5zdGFudGlhdGUgdGhlIFRlbXBsYXRlRmFjdG9yeSBjbGFzcyBiZWNhdXNlIGl0IGlzIGEgc3RhdGljIGNsYXNzLicpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGVzIGEgdGVtcGxhdGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICAgICAqIEBwYXJhbSB0ZW1wbGF0ZVBhdGgge2FueX1cbiAgICAgICAgICogQHBhcmFtIFtkYXRhPWFueV1cbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqICAgICAgVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZSgndGVtcGxhdGVOYW1lJywge3NvbWU6ICdkYXRhJ30pO1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LmNyZWF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZVBhdGgsIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IG51bGw7IH1cbiAgICAgICAgICAgIC8vQ2hlY2tzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgdG8gc2VlIGlmIGl0IGlzIGEgJy4nIG9yICcjJy5cbiAgICAgICAgICAgIHZhciByZWdleCA9IC9eKFsuI10pKC4rKS87XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb25UZW1wbGF0ZSA9IHR5cGVvZiB0ZW1wbGF0ZVBhdGggPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICB2YXIgaXNDbGFzc09ySWROYW1lID0gcmVnZXgudGVzdCh0ZW1wbGF0ZVBhdGgpO1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb25UZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVQYXRoKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNDbGFzc09ySWROYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHBvdW5kIHNpZ24gZnJvbSB0aGUgaWQgbmFtZS5cbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGggPSB0ZW1wbGF0ZVBhdGguc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIHZhciBodG1sU3RyaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVQYXRoKS5pbm5lckhUTUw7XG4gICAgICAgICAgICAgICAgaHRtbFN0cmluZyA9IFN0cmluZ1V0aWwucmVtb3ZlTGVhZGluZ1RyYWlsaW5nV2hpdGVzcGFjZShodG1sU3RyaW5nKTtcbiAgICAgICAgICAgICAgICBpZiAoVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlRW5naW5lID09IFRlbXBsYXRlRmFjdG9yeS5VTkRFUlNDT1JFKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVuZGVyc2NvcmUgVGVtcGxhdGU6XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU1ldGhvZCA9IHdpbmRvd1snXyddLnRlbXBsYXRlKGh0bWxTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlTWV0aG9kKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlYmFycyBUZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcGxhdGVNZXRob2QgPSBIYW5kbGViYXJzLmNvbXBpbGUoaHRtbFN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVNZXRob2QoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlT2JqID0gd2luZG93W1RlbXBsYXRlRmFjdG9yeS50ZW1wbGF0ZU5hbWVzcGFjZV07XG4gICAgICAgICAgICAgICAgaWYgKCF0ZW1wbGF0ZU9iaikge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm5zIG51bGwgYmVjYXVzZSB0aGUgdGVtcGxhdGUgbmFtZXNwYWNlIGlzIG5vdCBmb3VuZC5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZUZ1bmN0aW9uID0gdGVtcGxhdGVPYmpbdGVtcGxhdGVQYXRoXTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGVGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGVtcGxhdGVQYXRoIGdldHMgYSBmdW5jdGlvbiBzdG9yYWdlIGluIHRoZSBhc3NvY2lhdGl2ZSBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FsbCB0aGUgZnVuY3Rpb24gYnkgcGFzc2luZyBpbiB0aGUgZGF0YSBhcyB0aGUgYXJndW1lbnQuXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGVGdW5jdGlvbihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGNvbnN0YW50IHZhbHVlIGZvciB1c2luZyBVbmRlcnNjb3JlIG9yIExvZGFzaCB0ZW1wbGF0ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBVTkRFUlNDT1JFXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQGZpbmFsXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIFRlbXBsYXRlRmFjdG9yeS5VTkRFUlNDT1JFID0gJ3VuZGVyc2NvcmUnO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBjb25zdGFudCB2YWx1ZSBmb3IgdXNpbmcgSGFuZGxlYmFycyB0ZW1wbGF0ZXMuIFRoaXMgaXMgdGhlIGRlZmF1bHQgdGVtcGxhdGUgZW5naW5lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgSEFORExFQkFSU1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBmaW5hbFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBUZW1wbGF0ZUZhY3RvcnkuSEFORExFQkFSUyA9ICdoYW5kbGViYXJzJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIHRlbXBsYXRlIGVuZ2luZSB0eXBlIGZvciB0aGlzIFRlbXBsYXRlRmFjdG9yeSBjbGFzcy4gVGhlIGRlZmF1bHQgaXMgVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlNcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHRlbXBsYXRlRW5naW5lXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0IFRlbXBsYXRlRmFjdG9yeS5IQU5ETEVCQVJTXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlRW5naW5lID0gVGVtcGxhdGVGYWN0b3J5LkhBTkRMRUJBUlM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZ2xvYmFsIG5hbWVzcGFjZSBmb3IgcHJlLWNvbXBpbGVkIHRlbXBsYXRlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IHRlbXBsYXRlTmFtZXNwYWNlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBkZWZhdWx0ICdKU1QnXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgVGVtcGxhdGVGYWN0b3J5LnRlbXBsYXRlTmFtZXNwYWNlID0gJ0pTVCc7XG4gICAgICAgIHJldHVybiBUZW1wbGF0ZUZhY3Rvcnk7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gVGVtcGxhdGVGYWN0b3J5O1xufSk7XG4iLCIoZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICB2YXIgdiA9IGZhY3RvcnkocmVxdWlyZSwgZXhwb3J0cyk7IGlmICh2ICE9PSB1bmRlZmluZWQpIG1vZHVsZS5leHBvcnRzID0gdjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZmFjdG9yeSk7XG4gICAgfVxufSkoZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICAvKipcbiAgICAgKiBBIFV0aWxpdHkgY2xhc3MgdGhhdCBoYXMgc2V2ZXJhbCBzdGF0aWMgbWV0aG9kcyB0byBhc3Npc3QgaW4gZGV2ZWxvcG1lbnQuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgVXRpbFxuICAgICAqIEBtb2R1bGUgU3RydWN0dXJlSlNcbiAgICAgKiBAc3VibW9kdWxlIHV0aWxcbiAgICAgKiBAYXV0aG9yIFJvYmVydCBTLiAod3d3LmNvZGVCZWx0LmNvbSlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgdmFyIFV0aWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBVdGlsKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVXRpbF0gRG8gbm90IGluc3RhbnRpYXRlIHRoZSBVdGlsIGNsYXNzIGJlY2F1c2UgaXQgaXMgYSBzdGF0aWMgY2xhc3MuJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBJRC4gSWYgYSBwcmVmaXggaXMgcGFzc2VkIGluLCB0aGUgdmFsdWUgd2lsbCBiZSBhcHBlbmRlZCB0byBpdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCB1bmlxdWVJZFxuICAgICAgICAgKiBAcGFyYW0gW3ByZWZpeF0ge3N0cmluZ30gVGhlIHN0cmluZyB2YWx1ZSB1c2VkIGZvciB0aGUgcHJlZml4LlxuICAgICAgICAgKiBAcmV0dXJucyB7aW5pdHxzdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgcHJvcGVydHkgPSBVdGlsLnVuaXF1ZUlkKCk7XG4gICAgICAgICAqICAgICAgLy8gMVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWwudW5pcXVlSWQoJ3ByZWZpeE5hbWVfJyk7XG4gICAgICAgICAqICAgICAgLy8gcHJlZml4TmFtZV8xXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZUlkID0gZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICAgICAgaWYgKHByZWZpeCA9PT0gdm9pZCAwKSB7IHByZWZpeCA9IG51bGw7IH1cbiAgICAgICAgICAgIHZhciBpZCA9ICsrVXRpbC5faWRDb3VudGVyO1xuICAgICAgICAgICAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhwcmVmaXggKyBpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGZyb20gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdFxuICAgICAgICAgKiBAcGFyYW0gb2JqZWN0IHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHdhbnQgdG8gcmVtb3ZlIHByb3BlcnRpZXMgZnJvbS5cbiAgICAgICAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IEEgcHJvcGVydHkgbmFtZSBvciBhbiBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyB5b3Ugd2FudCB0byByZW1vdmUgZnJvbSB0aGUgb2JqZWN0LlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIHRoZSBvYmplY3QgcGFzc2VkIGluIHdpdGhvdXQgdGhlIHJlbW92ZWQgdGhlIHByb3BlcnRpZXMuXG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAgICAgIGxldCBvYmogPSB7IG5hbWU6ICdSb2JlcnQnLCBnZW5kZXI6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICpcbiAgICAgICAgICogICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdChvYmosIFsncGhvbmUnLCAnZ2VuZGVyJ10pO1xuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIC8vIHsgbmFtZTogJ1JvYmVydCcgfVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0LCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gSWYgcHJvcGVydGllcyBpcyBub3QgYW4gYXJyYXkgdGhlbiBtYWtlIGl0IGFuIGFycmF5IG9iamVjdC5cbiAgICAgICAgICAgIHZhciBsaXN0ID0gKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBvYmplY3QgcHJvcGVydGllcy5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5IGlzIGEgcHJvcGVydHkgYW5kIG5vdCBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlXzEgPSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHByb3BlcnR5IGlzIGFuIEFycmF5LlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWVfMSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIEFycmF5IGFuZCBjYWxsIHRoZSBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCBtZXRob2Qgb24gZWFjaCBvYmplY3QgaW4gdGhlIGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFycmF5ID0gdmFsdWVfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4IGluIGFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbC5kZWxldGVQcm9wZXJ0eUZyb21PYmplY3QoYXJyYXlbaW5kZXhdLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZV8xIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVdGlsLmRlbGV0ZVByb3BlcnR5RnJvbU9iamVjdCh2YWx1ZV8xLCBsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbGlzdEluZGV4IGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUga2V5KHByb3BlcnR5IG5hbWUpIGVxdWFscyB0aGUgcHJvcGVydHkgbmFtZSBpbiB0aGUgbGlzdCBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBsaXN0W2xpc3RJbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBwcm9wZXJ0eSBmcm9tIHRoZSBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmVuYW1lcyBhIHByb3BlcnR5IG5hbWUgb24gYW4gb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIHJlbmFtZVByb3BlcnR5T25PYmplY3RcbiAgICAgICAgICogQHBhcmFtIG9iamVjdCB7T2JqZWN0fSBUaGUgb2JqZWN0IHlvdSB3YW50IHRvIHJlbmFtZSBwcm9wZXJ0aWVzIGZyb20uXG4gICAgICAgICAqIEBwYXJhbSBvbGROYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEBwYXJhbSBuZXdOYW1lIHtzdHJpbmd9XG4gICAgICAgICAqIEByZXR1cm5zIHthbnl9IFJldHVybnMgdGhlIG9iamVjdCBwYXNzZWQgaW4gcmVuYW1lZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgb2JqID0geyBuYW1lOiAnUm9iZXJ0JywgZ2VuZGVyOiAnbWFsZScsIHBob25lOiAnNTU1LTU1NS01NTU1JyB9XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5yZW5hbWVQcm9wZXJ0eU9uT2JqZWN0KG9iaiwgJ2dlbmRlcicsICdzZXgnKTtcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAvLyB7IG5hbWU6ICdSb2JlcnQnLCBzZXg6ICdtYWxlJywgcGhvbmU6ICc1NTUtNTU1LTU1NTUnIH1cbiAgICAgICAgICovXG4gICAgICAgIFV0aWwucmVuYW1lUHJvcGVydHlPbk9iamVjdCA9IGZ1bmN0aW9uIChvYmplY3QsIG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciB0aGUgb2xkIHByb3BlcnR5IG5hbWUgdG8gYXZvaWQgYSBSZWZlcmVuY2VFcnJvciBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkob2xkTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBvYmplY3RbbmV3TmFtZV0gPSBvYmplY3Rbb2xkTmFtZV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9iamVjdFtvbGROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYWtlcyBhIGNsb25lIG9mIGFuIG9iamVjdC5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAgICAgKiBAcGFyYW0gb2JqIHtPYmplY3R9IFRoZSBvYmplY3QgeW91IHRvIGNsb25lLlxuICAgICAgICAgKiBAcmV0dXJucyB7YW55fSBSZXR1cm5zIGEgY2xvbmUgb2JqZWN0IG9mIHRoZSBvbmUgcGFzc2VkIGluLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgY2xvbmVPZk9iamVjdCA9IFV0aWwuY2xvbmUob2JqKTtcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAvL290aGVyIHNjcmlwdHM6IGh0dHA6Ly9kYXZpZHdhbHNoLm5hbWUvamF2YXNjcmlwdC1jbG9uZVxuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZnVuY3Rpb25hbC1qYXZhc2NyaXB0L1xuICAgICAgICAgICAgLy9odHRwOi8vb3Jhbmxvb25leS5jb20vZGVlcC1jb3B5LWphdmFzY3JpcHQvXG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIDMgc2ltcGxlIHR5cGVzLCBhbmQgbnVsbCBvciB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmIChudWxsID09IG9iaiB8fCAnb2JqZWN0JyAhPSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEhhbmRsZSBEYXRlXG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICBkYXRlLnNldFRpbWUob2JqLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgQXJyYXlcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGlfMSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGlfMSA8IGxlbjsgaV8xKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlbaV8xXSA9IFV0aWwuY2xvbmUob2JqW2lfMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgT2JqZWN0XG4gICAgICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcHkgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5W2F0dHJdID0gVXRpbC5jbG9uZShvYmpbYXR0cl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW1V0aWxdIFVuYWJsZSB0byBjb3B5IG9iaiEgSXRzIHR5cGUgaXNuJ3Qgc3VwcG9ydGVkLlwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG51bWJlciB0byBhIGJvb2xlYW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdG9Cb29sZWFuXG4gICAgICAgICAqIEBwYXJhbSBzdHJOdW0ge3N0cmluZ3xudW1iZXJ9XG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLnRvQm9vbGVhbihcIlRSVUVcIik7XG4gICAgICAgICAqICAgICAgLy8gdHJ1ZVxuICAgICAgICAgKlxuICAgICAgICAgKiAgICAgIFV0aWwudG9Cb29sZWFuKDApO1xuICAgICAgICAgKiAgICAgIC8vIGZhbHNlXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC50b0Jvb2xlYW4odW5kZWZpbmVkKTtcbiAgICAgICAgICogICAgICAvLyBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgVXRpbC50b0Jvb2xlYW4gPSBmdW5jdGlvbiAoc3RyTnVtKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAodHlwZW9mIHN0ck51bSA9PT0gJ3N0cmluZycpID8gc3RyTnVtLnRvTG93ZXJDYXNlKCkgOiBzdHJOdW07XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlID4gMCB8fCB2YWx1ZSA9PSAndHJ1ZScgfHwgdmFsdWUgPT0gJ3llcycpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgZnVuY3Rpb24vb2JqZWN0IHBhc3NlZCBpbi5cbiAgICAgICAgICpcbiAgICAgICAgICogQG1ldGhvZCBnZXROYW1lXG4gICAgICAgICAqIEBwYXJhbSBjbGFzc09iamVjdCB7YW55fVxuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiBvciBvYmplY3QuXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBsZXQgc29tZUNsYXNzID0gbmV3IFNvbWVDbGFzcygpO1xuICAgICAgICAgKiAgICAgIFV0aWwuZ2V0TmFtZShzb21lQ2xhc3MpOyAgICAgICAgICAgIC8vICdTb21lQ2xhc3MnXG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uIFRlc3QoKXt9KTsgICAgLy8gJ1Rlc3QnXG4gICAgICAgICAqICAgICAgVXRpbC5nZXROYW1lKGZ1bmN0aW9uICgpe30pOyAgICAgICAgLy8gJ2Fub255bW91cydcbiAgICAgICAgICovXG4gICAgICAgIFV0aWwuZ2V0TmFtZSA9IGZ1bmN0aW9uIChjbGFzc09iamVjdCkge1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgY2xhc3NPYmplY3Q7XG4gICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICB2YXIgZnVuY05hbWVSZWdleCA9IC9mdW5jdGlvbiAoW15cXChdKykvO1xuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0cyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0LlxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gY2xhc3NPYmplY3QuY29uc3RydWN0b3IudG9TdHJpbmcoKS5tYXRjaChmdW5jTmFtZVJlZ2V4KTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdHNbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGVsc2UgY29kZSBpcyBtYWlubHkgZm9yIEludGVybmV0IEV4cGxvcmUuXG4gICAgICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSAodHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZmlndXJlIG91dCBob3cgdG8gZXhwbGFpbiB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVfMSA9IGlzRnVuY3Rpb24gJiYgKChjbGFzc09iamVjdC5uYW1lICYmIFsnJywgY2xhc3NPYmplY3QubmFtZV0pIHx8IGNsYXNzT2JqZWN0LnRvU3RyaW5nKCkubWF0Y2goZnVuY05hbWVSZWdleCkpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWVfMSAmJiBuYW1lXzFbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBuYW1lXzFbMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICdhbm9ueW1vdXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZXMgYW5kIHJldHVybnMgYSBuZXcgZGVib3VuY2VkIHZlcnNpb24gb2YgdGhlIHBhc3NlZCBmdW5jdGlvbiB3aGljaCB3aWxsIHBvc3Rwb25lIGl0cyBleGVjdXRpb24gdW50aWwgYWZ0ZXJcbiAgICAgICAgICogd2FpdCBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgaXQgd2FzIGludm9rZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgZGVib3VuY2VcbiAgICAgICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcGFyYW0gd2FpdCB7bnVtYmVyfSBNaWxsaXNlY29uZHMgdG8gZWxhcHNlZCBiZWZvcmUgaW52b2tpbmcgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgKiBAcGFyYW0gaW1tZWRpYXRlIHtib29sZWFufSBQYXNzIHRydWUgZm9yIHRoZSBpbW1lZGlhdGUgcGFyYW1ldGVyIHRvIGNhdXNlIGRlYm91bmNlIHRvIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZSBsZWFkaW5nIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHdhaXQgaW50ZXJ2YWwuIFVzZWZ1bCBpbiBjaXJjdW1zdGFuY2VzIGxpa2UgcHJldmVudGluZyBhY2NpZGVudGFsIGRvdWJsZS1jbGlja3Mgb24gYSBcInN1Ym1pdFwiIGJ1dHRvbiBmcm9tIGZpcmluZyBhIHNlY29uZCB0aW1lLlxuICAgICAgICAgKiBAcGFyYW0gY2FsbGJhY2tTY29wZSB7YW55fSBUaGUgc2NvcGUgb2YgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgc2hvdWxkIGJlIGV4ZWN1dGVkLlxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogICAgICBVdGlsLmRlYm91bmNlKHRoaXMuX29uQnJlYWtwb2ludENoYW5nZSwgMjUwLCBmYWxzZSwgdGhpcyk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmRlYm91bmNlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB3YWl0LCBpbW1lZGlhdGUsIGNhbGxiYWNrU2NvcGUpIHtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHZhciBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltbWVkaWF0ZSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkoY2FsbGJhY2tTY29wZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW1tZWRpYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrU2NvcGUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB3YWl0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBkZWJvdW5jZWQ7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUT0RPOiBZVUlEb2NfY29tbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGFwcGx5TWl4aW5zXG4gICAgICAgICAqIEBwYXJhbSBkZXJpdmVkQ3RvciB7YW55fVxuICAgICAgICAgKiBAcGFyYW0gYmFzZUN0b3JzIHthbnl9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKlxuICAgICAgICAgICAgICAgIGNsYXNzIEZsaWVzIHtcbiAgICAgICAgICAgICAgICAgICAgZmx5KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0lzIGl0IGEgYmlyZD8gSXMgaXQgYSBwbGFuZT8nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBjbGFzcyBDbGltYnMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdNeSBzcGlkZXItc2Vuc2UgaXMgdGluZ2xpbmcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgY2xhc3MgSG9yc2VmbHlXb21hbiBpbXBsZW1lbnRzIENsaW1icywgRmxpZXMge1xuICAgICAgICAgICAgICAgICAgICBjbGltYjogKCkgPT4gdm9pZDtcbiAgICAgICAgICAgICAgICAgICAgZmx5OiAoKSA9PiB2b2lkO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICBVdGlsLmFwcGx5TWl4aW5zKEhvcnNlZmx5V29tYW4sIFtDbGltYnMsIEZsaWVzXSk7XG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLmFwcGx5TWl4aW5zID0gZnVuY3Rpb24gKGRlcml2ZWRDdG9yLCBiYXNlQ3RvcnMpIHtcbiAgICAgICAgICAgIGJhc2VDdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChiYXNlQ3Rvcikge1xuICAgICAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBkZXJpdmVkQ3Rvci5wcm90b3R5cGVbbmFtZV0gPSBiYXNlQ3Rvci5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgYSBuZXcgYXJyYXkgd2l0aCBkdXBsaWNhdGVzIHJlbW92ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBtZXRob2QgdW5pcXVlXG4gICAgICAgICAqIEBwYXJhbSBsaXN0IHtBcnJheS48YW55Pn0gVGhlIGFycmF5IHlvdSB3YW50IHRvIHVzZSB0byBnZW5lcmF0ZSB0aGUgdW5pcXVlIGFycmF5LlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheTxhbnk+fSBSZXR1cm5zIGEgbmV3IGFycmF5IGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLnVuaXF1ZSA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICB2YXIgdW5pcXVlTGlzdCA9IGxpc3QucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZS5pbmRleE9mKGN1cnJlbnRWYWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWUucHVzaChjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgICAgIHJldHVybiB1bmlxdWVMaXN0O1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogS2VlcHMgdHJhY2sgb2YgdGhlIGNvdW50IGZvciB0aGUgdW5pcXVlSWQgbWV0aG9kLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2lkQ291bnRlclxuICAgICAgICAgKiBAdHlwZSB7aW50fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBVdGlsLl9pZENvdW50ZXIgPSAwO1xuICAgICAgICByZXR1cm4gVXRpbDtcbiAgICB9KSgpO1xuICAgIHJldHVybiBVdGlsO1xufSk7XG4iXX0=
