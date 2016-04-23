import DOMElement from 'structurejs/display/DOMElement';

import PageControlView from './views/PageControlView';
import ListView from './views/ListView';
import ErrorModal from './views/modals/ErrorModal';
import RequestService from './services/RequestService';
import MovieCollection from './collections/MovieCollection';
import MovieModel from './models/MovieModel';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends DOMElement
 * @constructor
 **/
class App extends DOMElement {

    /**
     * @property _pageControls
     * @type {PageControlView}
     * @private
     */
    _pageControls = null;

    /**
     * @property _movieCollection
     * @type {MovieCollection}
     * @private
     */
    _movieCollection = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._pageControls = new PageControlView(this.$element.find('.js-pageControlView'));
        this.addChild(this._pageControls);
        this._pageControls.disable();// Disable right away because by default the view is enabled once passed to the addChild method.

        this._listContainer = new ListView(this.$element.find('.js-listView'));
        this.addChild(this._listContainer);

        //let modal = new ErrorModal();
        //this.addChildAt(modal, 0);

        RequestService.get('assets/data/movies.json')
            .done((data) => this._onMovieRequestComplete(data));
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._pageControls.addEventListener('update', this._onUpdate, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._pageControls.removeEventListener('update', this._onUpdate, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
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
    // HELPER METHOD
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateList
     * @private
     */
    _updateList() {
        let sortType = this._pageControls.sortType;
        let displayLimit = this._pageControls.displayLimit;

        let isAscending = (sortType.indexOf('-asc') > -1) ? true : false;

        let models;
        switch (sortType) {
            case 'critic-desc':
            case 'critic-asc':
                models = this._movieCollection.sortByCriticsScore(isAscending);
                break;
            case 'audience-desc':
            case 'audience-asc':
                models = this._movieCollection.sortByAudienceScore(isAscending);
                break;
            case 'theater-asc':
            case 'theater-desc':
                models = this._movieCollection.sortByTheaterReleaseDate(isAscending);
                break;
            default:
                models = this._movieCollection.models;
        }

        // Slice of the first set of models.
        models = models.slice(0, displayLimit);

        this._listContainer.updateList(models);
    }

    //////////////////////////////////////////////////////////////////////////////////
    // EVENT HANDLERS
    //////////////////////////////////////////////////////////////////////////////////

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onMovieRequestComplete
     * @private
     */
    _onMovieRequestComplete(data) {
        this._movieCollection = new MovieCollection(MovieModel);
        this._movieCollection.add(data.movies);

        this._updateList();

        this._pageControls.enable();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdate
     * @param event {BaseEvent}
     * @private
     */
    _onUpdate(event) {
        this._updateList();
    }

}

export default App;
