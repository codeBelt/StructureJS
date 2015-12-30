import EventDispatcher from 'structurejs/event/EventDispatcher';
import Router from 'structurejs/controller/Router';

/**
 * TODO: YUIDoc_comment
 *
 * @class ViewController
 * @extends EventDispatcher
 * @param view {TransitionView}
 * @constructor
 **/
class ViewController extends EventDispatcher {

    /**
     * YUIDoc_comment
     *
     * @property _view
     * @type {DOMElement}
     * @protected
     */
    _view = null;

    /**
     * YUIDoc_comment
     *
     * @property _currentView
     * @type {any}
     * @protected
     */
    _currentView = null;

    /**
     * YUIDoc_comment
     *
     * @property _viewDictionary
     * @type {Array.<DOMElement>}
     * @protected
     */
    _viewDictionary = {};

    constructor(view) {
        super();

        this._view = view;
    }

    /**
     * YUIDoc_comment
     *
     * @method setRoute
     * @public
     */
    setRoute(routePattern, classObject) {
        this._viewDictionary[routePattern] = classObject;

        Router.add(routePattern, this._onRouteChange, this);
    }

    /**
     * YUIDoc_comment
     *
     * @method navigateTo
     * @public
     */
    navigateTo(routePattern) {
        Router.navigateTo(routePattern);
    }

    /**
     * YUIDoc_comment
     *
     * @method start
     * @public
     */
    start() {
        Router.start();
    }

    /**
     * YUIDoc_comment
     *
     * @method _onRouteChange
     * @param routerEvent {RouterEvent}
     * @privates
     */
    _onRouteChange(routerEvent) {
        let ClassObject = this._viewDictionary[routerEvent.routePattern];

        if ((this._currentView instanceof ClassObject) === false) {

            if (this._currentView != null) {
                this._view.removeChild(this._currentView);
            }

            this._currentView = new ClassObject(routerEvent);
            this._view.addChild(this._currentView);
        }

        //this._currentView.update(routerEvent);
    }

}

export default ViewController;
