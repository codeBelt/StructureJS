import Stage from 'structurejs/display/Stage';
import BaseEvent from 'structurejs/event/BaseEvent';
import Router from 'structurejs/controller/Router';
import StringUtil from 'structurejs/util/StringUtil';

import ListItemCollection from './collections/ListItemCollection';
import ListItemModel from './models/ListItemModel';
import ListItemComponent from './views/components/ListItemComponent';
import FooterView from './views/FooterView';
import Key from './constants/Key';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
class App extends Stage {

    /**
     * @property _listItemCollection
     * @type {ListItemCollection}
     * @private
     */
    _listItemCollection = null;

    /**
     * @property _$addTodoInput
     * @type {HTMLInputElement}
     * @private
     */
    _$addTodoInput = null;

    /**
     * @property _$markAllCompleteCheckbox
     * @type {HTMLInputElement}
     * @private
     */
    _$markAllCompleteCheckbox = null;

    /**
     * @property _todoListContainer
     * @type {DOMElement}
     * @private
     */
    _todoListContainer = null;

    /**
     * @property _$mainView
     * @type {jQuery}
     * @private
     */
    _$mainView = null;

    /**
     * @property _footerView
     * @type {FooterView}
     * @private
     */
    _footerView = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._listItemCollection = new ListItemCollection();

        this._$addTodoInput = this.$element.find('.js-addInput');
        this._$markAllCompleteCheckbox = this.$element.find('.js-markAllComplete');
        this._$mainView = this.$element.find('.js-mainView');

        // Take note the "getChild" is a method of the DOMElement class. It will return the first html element from the selector name
        // that is passed in and create a DOMElement view class with that markup so we can use functionality that comes with the DOMElement class.
        this._todoListContainer = this.getChild('.js-todoList');

        this._footerView = new FooterView(this.$element.find('.js-footerView'));
        this.addChild(this._footerView);
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return this; }

        // Class Events
        this._listItemCollection.addEventListener('loadComplete', this._onLoadedItems, this);//
        this._footerView.addEventListener(BaseEvent.CLEAR, this._onClearCompleted, this);
        this.addEventListener(BaseEvent.CHANGE, this._onItemChange, this);
        this.addEventListener(BaseEvent.REMOVED, this._onItemRemove, this);

        // DOM Events
        this._$addTodoInput.addEventListener('keypress', this._onCreateTodo, this);
        this._$markAllCompleteCheckbox.addEventListener('change', this._onAllCompleteChange, this);

        // Load and parse the data in the browsers local storage.
        this._listItemCollection.loadStoredItems();

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return this; }

        // Class Events
        this._listItemCollection.removeEventListener('loadComplete', this._onLoadedItems, this);// Example of plan string event.
        this._footerView.removeEventListener(BaseEvent.CLEAR, this._onClearCompleted, this);
        this.removeEventListener(BaseEvent.CHANGE, this._onItemChange, this);
        this.removeEventListener(BaseEvent.REMOVED, this._onItemRemove, this);

        // DOM Events
        this._$addTodoInput.removeEventListener('keypress', this._onCreateTodo, this);
        this._$markAllCompleteCheckbox.removeEventListener('change', this._onAllCompleteChange, this);

        return super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
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
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
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
    _onCreateTodo = function(event) {
        var todoText = this._$addTodoInput.val().trim();

        if (event.which === Key.ENTER && todoText != '') {
            var baseModel = new ListItemModel({text: todoText});
            baseModel.id = StringUtil.createUUID();
            var childItem = new ListItemComponent(baseModel);

            this._listItemCollection.add(baseModel);
            this._todoListContainer.addChild(childItem);
            this._$addTodoInput.val('');
        }

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAllCompleteChange
     * @private
     */
    _onAllCompleteChange = function(event) {
        var $target = $(event.target);

        var listItemComponent;
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
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemRemove
     * @param event {BaseEvent}
     * @private
     */
    _onItemRemove = function(event) {
        var listItemComponent = event.target;
        var listItemModel = listItemComponent.model;

        this._listItemCollection.remove(listItemModel);
        this._todoListContainer.removeChild(listItemComponent);

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemChange
     * @param event {BaseEvent}
     * @private
     */
    _onItemChange = function(event) {
        this._listItemCollection.save();

        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoadedItems
     * @param event {BaseEvent}
     * @private
     */
    _onLoadedItems = function(event) {
        var items = this._listItemCollection.models;
        var length = items.length;

        // Create ListItemComponent view items from the stored ListItemModel  Base Models.
        for (var i = 0; i < length; i++) {
            var childItem = new ListItemComponent(items[i]);
            this._todoListContainer.addChild(childItem);
        }

        // When the app loads we need to check if all stored items are all completed or not.
        var isAllCompleted = this._listItemCollection.length === this._listItemCollection.getCompletedCount();
        this._$markAllCompleteCheckbox.prop('checked', isAllCompleted);

        // Setup the router/deeplink handlers
        Router.add('/active/', this._onActiveHandler.bind(this));
        Router.add('/completed/', this._onCompletedHandler.bind(this));
        Router.add('', this._onDefaultHandler.bind(this));
        Router.start();

        this.layout();
    }

    /**
     * This method is called when the BaseEvent.CLEAR event is dispatched from the FooterView.
     *
     * @method _onClearCompleted
     * @param event {BaseEvent}
     * @private
     */
    _onClearCompleted = function(event) {
        var listItemModel;
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemModel = listItemComponent.model;

            if (listItemModel.isComplete === true) {
                this._todoListContainer.removeChild(listItemComponent);
                this._listItemCollection.remove(listItemModel);
            }
        }

        this.layout();
    }

    /**
     * When the deep link "#/active" tag is triggered this method will hide all items and show only items that are not completed.
     * Also updates the footer nav.
     *
     * @method _onActiveHandler
     * @private
     */
    _onActiveHandler() {
        var listItemComponent;

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
    _onCompletedHandler() {
        var listItemComponent;

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
    _onDefaultHandler() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.show();
        }

        this._footerView.updateNav('');

        this.layout();
    }

}

export default App;
