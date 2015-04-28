var Extend = require('../../vendor/structurejs/src/util/Extend');
var Collection = require('../../vendor/structurejs/src/model/Collection');
var LocalStorageController = require('../../vendor/structurejs/src/controller/LocalStorageController');
var ListItemVO = require('./vo/ListItemVO');

/**
 * TODO: YUIDoc_comment
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
     * @overridden ListItemCollection.add
     */
    ListItemCollection.prototype.add = function (item, silent) {
        _super.prototype.add.call(this, item, silent);

        this.save();
    };

    /**
     * @overridden ListItemCollection.remove
     */
    ListItemCollection.prototype.remove = function (item, silent) {
        _super.prototype.remove.call(this, item, silent);

        this.save();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method loadStoredItems
     * @public
     */
    ListItemCollection.prototype.loadStoredItems = function() {
        var items = this._localStorageController.getItem('todos');

        if (items != null) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.add(new ListItemVO(items[i]));
            }

            this.dispatchEvent('loadComplete');
        }
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method save
     * @public
     */
    ListItemCollection.prototype.save = function() {
        this._localStorageController.addItem('todos', this.models);
    };

    /**
     * Filter down the list of all todo items that are finished.
     *
     * @method getCompletedCount
     * @public
     */
    ListItemCollection.prototype.getCompletedCount = function() {
        return this.findBy({isComplete: true}).length;
    };

    /**
     * Filter down the list to only todo items that are still not finished.
     *
     * @method getRemainingCount
     * @public
     */
    ListItemCollection.prototype.getRemainingCount = function() {
        return this.findBy({isComplete: false}).length;
    };

    return ListItemCollection;
})();

module.exports = ListItemCollection;