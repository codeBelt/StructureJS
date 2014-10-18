var Extend = require('../vendor/structurejs/src/util/Extend');
var Stage = require('../vendor/structurejs/src/display/Stage');
var BaseEvent = require('../vendor/structurejs/src/event/BaseEvent');
var Router = require('../vendor/structurejs/src/controller/Router');
var StringUtil = require('../vendor/structurejs/src/util/StringUtil');
var ListItemCollection = require('./model/ListItemCollection');
var ListItemComponent = require('./component/ListItemComponent');
var ListItemVO = require('./model/vo/ListItemVO');
var Key = require('./constant/Key');
var FooterView = require('./view/FooterView');

/**
 * YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
var App = (function () {

    var _super = Extend(App, Stage);

    function App() {
        _super.call(this);

        /**
         * @property _listItemCollection
         * @type {ListItemCollection}
         * @private
         */
        this._listItemCollection = null;

        /**
         * @property _$addTodoInput
         * @type {HTMLInputElement}
         * @private
         */
        this._$addTodoInput = null;

        /**
         * @property _$markAllCompleteCheckbox
         * @type {HTMLInputElement}
         * @private
         */
        this._$markAllCompleteCheckbox = null;

        /**
         * @property _todoListContainer
         * @type {DOMElement}
         * @private
         */
        this._todoListContainer = null;

        /**
         * @property _$mainView
         * @type {jQuery}
         * @private
         */
        this._$mainView = null;

        /**
         * @property _footerView
         * @type {FooterView}
         * @private
         */
        this._footerView = null;
    }

    /**
     * @overridden DOMElement.createChildren
     */
    App.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);

        this._listItemCollection = new ListItemCollection();

        this._$addTodoInput = this.$element.find('.js-addInput');
        this._$markAllCompleteCheckbox = this.$element.find('.js-markAllComplete');
        this._$mainView = this.$element.find('.js-mainView');

        // Take note the "getChild" is a method of the DOMElement class. It will return the first html element from the selector name
        // that is passed in and create a DOMElement view class with that markup so we can use functionality that comes with the DOMElement class.
        this._todoListContainer = this.getChild('.js-todoList');

        this._footerView = new FooterView(this.$element.find('.js-footerView'));
        this.addChild(this._footerView);
    };

    /**
     * @overridden DOMElement.layoutChildren
     */
    App.prototype.layoutChildren = function () {

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

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    App.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        // Class Events
        this._listItemCollection.addEventListener('loadComplete', this.onLoadedItems, this);//
        this._footerView.addEventListener(BaseEvent.CLEAR, this.onClearCompleted, this);
        this.addEventListener(BaseEvent.CHANGE, this.onItemChange, this);
        this.addEventListener(BaseEvent.REMOVED, this.onItemRemove, this);

        // DOM Events
        this._$addTodoInput.addEventListener('keypress', this.onCreateTodo, this);
        this._$markAllCompleteCheckbox.addEventListener('change', this.onAllCompleteChange, this);

        // Load and parse the data in the browsers local storage.
        this._listItemCollection.loadStoredItems();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    App.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        // Class Events
        this._listItemCollection.removeEventListener('loadComplete', this.onLoadedItems, this);// Example of plan string event.
        this._footerView.removeEventListener(BaseEvent.CLEAR, this.onClearCompleted, this);
        this.removeEventListener(BaseEvent.CHANGE, this.onItemChange, this);
        this.removeEventListener(BaseEvent.REMOVED, this.onItemRemove, this);

        // DOM Events
        this._$addTodoInput.removeEventListener('keypress', this.onCreateTodo, this);
        this._$markAllCompleteCheckbox.removeEventListener('change', this.onAllCompleteChange, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    App.prototype.destroy = function () {
        this._todoListContainer.destroy();
        this._listItemCollection.destroy();

        _super.prototype.destroy.call(this);
    };

    /**
     * YUIDoc_comment
     *
     * @method onCreateTodo
     * @private
     */
    App.prototype.onCreateTodo = function(event) {
        var todoText = this._$addTodoInput.val().trim();

        if (event.which === Key.ENTER && todoText != '') {
            var valueObject = new ListItemVO({text: todoText});
            valueObject.id = StringUtil.createUUID();
            var childItem = new ListItemComponent(valueObject);

            this._listItemCollection.addItem(valueObject);
            this._todoListContainer.addChild(childItem);
            this._$addTodoInput.val('');
        }

        this.layoutChildren();
    };

    /**
     * YUIDoc_comment
     *
     * @method onAllCompleteChange
     * @private
     */
    App.prototype.onAllCompleteChange = function(event) {
        var $target = $(event.target);

        var listItemComponent;
        if ($target.prop("checked") == true) {
            for (var i = 0; i < this._todoListContainer.numChildren; i++) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.setCompleted();
            }
        } else {
            for (var i = 0; i < this._todoListContainer.numChildren; i++) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.setUnCompleted();
            }
        }
    };

    /**
     * YUIDoc_comment
     *
     * @method onItemRemove
     * @param event {BaseEvent}
     * @private
     */
    App.prototype.onItemRemove = function(event) {
        var listItemComponent = event.target;
        var listItemVO = listItemComponent.vo;

        this._listItemCollection.removeItem(listItemVO);
        this._todoListContainer.removeChild(listItemComponent);

        this.layoutChildren();
    };

    /**
     * YUIDoc_comment
     *
     * @method onItemChange
     * @param event {BaseEvent}
     * @private
     */
    App.prototype.onItemChange = function(event) {
        this._listItemCollection.save();

        this.layoutChildren();
    };

    /**
     * YUIDoc_comment
     *
     * @method onLoadedItems
     * @param event {BaseEvent}
     * @private
     */
    App.prototype.onLoadedItems = function(event) {
        var items = this._listItemCollection.items;
        var length = items.length;

        // Create ListItemComponent view items from the stored ListItemVO value objects.
        for (var i = 0; i < length; i++) {
            var childItem = new ListItemComponent(items[i]);
            this._todoListContainer.addChild(childItem);
        }

        // When the app loads we need to check if all stored items are all completed or not.
        var isAllCompleted = this._listItemCollection.length == this._listItemCollection.getCompletedCount();
        this._$markAllCompleteCheckbox.prop('checked', isAllCompleted);

        // Setup the router/deeplink handlers
        Router.add('/active/', this.onActiveHandler.bind(this));
        Router.add('/completed/', this.onCompletedHandler.bind(this));
        Router.add('', this.onDefaultHandler.bind(this));
        Router.start();

        this.layoutChildren();
    };

    /**
     * This method is called when the BaseEvent.CLEAR event is dispatched from the FooterView.
     *
     * @method onClearCompleted
     * @param event {BaseEvent}
     * @private
     */
    App.prototype.onClearCompleted = function(event) {
        var listItemVO;
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemVO = listItemComponent.vo;

            if (listItemVO.isComplete == true) {
                this._todoListContainer.removeChild(listItemComponent);
                this._listItemCollection.removeItem(listItemVO);
            }
        }

        this.layoutChildren();
    };

    /**
     * When the deep link "#/active" tag is triggered this method will hide all items and show only items that are not completed.
     * Also updates the footer nav.
     *
     * @method onActiveHandler
     * @private
     */
    App.prototype.onActiveHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.hide();

            if (listItemComponent.vo.isComplete == false) {
                listItemComponent.show();
            }
        }

        this._footerView.updateNav('active');

        this.layoutChildren();
    };

    /**
     * When the deep link "#/completed" tag is triggered this method will hide all items and show only items that are completed.
     * Also updates the footer nav.
     *
     * @method onCompletedHandler
     * @private
     */
    App.prototype.onCompletedHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.hide();

            if (listItemComponent.vo.isComplete == true) {
                listItemComponent.show();
            }
        }

        this._footerView.updateNav('completed');

        this.layoutChildren();
    };

    /**
     *  When the deep link "#/" tag is triggered this method will show all items.
     *  Also updates the footer nav.
     *
     * @method onDefaultHandler
     * @private
     */
    App.prototype.onDefaultHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.show();
        }

        this._footerView.updateNav('');

        this.layoutChildren();
    };

    return App;
})();

module.exports = App;