import Stage from 'structurejs/display/Stage';
import NetworkMonitor from 'structurejs/net/NetworkMonitor';
import NetworkMonitorEvent from 'structurejs/event/NetworkMonitorEvent';

import ViewController from './controllers/ViewController';
import HomeView from './views/pages/HomeView';
import AboutView from './views/pages/AboutView';
import ContactView from './views/pages/ContactView';
import MenuView from './views/pages/MenuView';
import ServiceView from './views/pages/ServiceView';
import HeaderView from './views/HeaderView';
import FooterView from './views/FooterView';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
class App extends Stage {

    /**
     * @property _headerView
     * @type {HeaderView}
     * @private
     */
    _headerView = null;

    /**
     * @property _footerView
     * @type {FooterView}
     * @private
     */
    _footerView = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _viewController
     * @type {ViewController}
     * @private
     */
    _viewController = null;

    constructor() {
        super();
    }

    /**
     * @overridden Stage.create
     */
    create() {
        super.create();

        this._headerView = new HeaderView(this.$element.find('.js-headerView'));
        this.addChild(this._headerView);

        this._footerView = new FooterView(this.$element.find('.js-footerView'));
        this.addChild(this._footerView);

        let pageContainer = this.getChild('.js-pageContainer');

        this._viewController = new ViewController(pageContainer);
        this._viewController.setRoute('', HomeView);
        this._viewController.setRoute('/menu/', MenuView);
        this._viewController.setRoute('/about/', AboutView);
        this._viewController.setRoute('/services/', ServiceView);
        this._viewController.setRoute('/contact/', ContactView);
        this._viewController.start();
    }

    /**
     * @overridden Stage.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        NetworkMonitor.addEventListener(NetworkMonitorEvent.STATUS, this._onNetworkChange, this);

        return super.enable();
    }

    /**
     * @overridden Stage.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        NetworkMonitor.removeEventListener(NetworkMonitorEvent.STATUS, this._onNetworkChange, this);

        return super.disable();
    }

    /**
     * @overridden Stage.layout
     */
    layout() {
        // Layout or update the objects in this parent class.

        return this;
    }

    /**
     * @overridden Stage.destroy
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
     * @method _onNetworkChange
     * @param event {NetworkMonitorEvent}
     * @private
     */
    _onNetworkChange(event) {
        console.log("NetworkMonitorEvent.STATUS", event.status);
    }

}

export default App;
