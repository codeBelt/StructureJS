var Extend = require('../../../../../src/util/Extend');
var Collection = require('../../../../../src/model/Collection');
var LocalStorageController = require('../../../../../src/controller/LocalStorageController');
var ListItemVO = require('vo/ListItemVO');

/**
 * YUIDoc_comment
 *
 * @class ListItemCollection
 * @extends Collection
 * @constructor
 **/
var ListItemCollection = (function () {

    var _super = Extend(ListItemCollection, Collection);

    function ListItemCollection() {
        _super.call(this);

        /**
         * @property _localStorageController
         * @type {LocalStorageController}
         * @private
         */
        this._localStorageController = new LocalStorageController();
    }

    /**
     * @overridden ListItemCollection.addItem
     */
    ListItemCollection.prototype.addItem = function (item, silent) {
        _super.prototype.addItem.call(this, item, silent);

        this.save();
    };

    /**
     * @overridden ListItemCollection.removeItem
     */
    ListItemCollection.prototype.removeItem = function (item, silent) {
        _super.prototype.removeItem.call(this, item, silent);

        this.save();
    };

    /**
     * YUIDoc_comment
     *
     * @method loadStoredItems
     * @public
     */
    ListItemCollection.prototype.loadStoredItems = function() {
        var items = this._localStorageController.getItem('todos');

        if (items != null) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.addItem(new ListItemVO(items[i]));
            }

            this.dispatchEvent('loadComplete');
        }
    };

    /**
     * YUIDoc_comment
     *
     * @method save
     * @public
     */
    ListItemCollection.prototype.save = function() {
        this._localStorageController.addItem('todos', this.items);
    };

    /**
     * Filter down the list of all todo items that are finished.
     *
     * @method getCompletedCount
     * @public
     */
    ListItemCollection.prototype.getCompletedCount = function() {
        return this.find({isComplete: true}).length;
    };

    /**
     * Filter down the list to only todo items that are still not finished.
     *
     * @method getRemainingCount
     * @public
     */
    ListItemCollection.prototype.getRemainingCount = function() {
        return this.find({isComplete: false}).length;
    };

    return ListItemCollection;
})();

module.exports = ListItemCollection;