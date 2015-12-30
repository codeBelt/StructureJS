import Collection from 'structurejs/model/Collection';
import LocalStorageController from 'structurejs/controller/LocalStorageController';

import ListItemModel from '../models/ListItemModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemCollection
 * @extends Collection
 * @constructor
 **/
class ListItemCollection extends Collection {

    /**
     * @property _localStorageController
     * @type {LocalStorageController}
     * @private
     */
    _localStorageController = new LocalStorageController(ListItemModel);

    constructor() {
        super();
    }

    /**
     * @overridden ListItemCollection.add
     */
    add(item, silent) {
        super.add(item, silent);

        this.save();
    }

    /**
     * @overridden ListItemCollection.remove
     */
    remove(item, silent) {
        super.remove(item, silent);

        this.save();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method loadStoredItems
     * @public
     */
    loadStoredItems() {
        var items = this._localStorageController.getItem('todos');

        if (items != null) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
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
    save() {
        this._localStorageController.addItem('todos', this.models);
    }

    /**
     * Filter down the list of all todo items that are finished.
     *
     * @method getCompletedCount
     * @public
     */
    getCompletedCount() {
        return this.findBy({isComplete: true}).length;
    }

    /**
     * Filter down the list to only todo items that are still not finished.
     *
     * @method getRemainingCount
     * @public
     */
    getRemainingCount() {
        return this.findBy({isComplete: false}).length;
    }

}

export default ListItemCollection;
