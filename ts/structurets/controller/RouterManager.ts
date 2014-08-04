import Route = require("Route");

class RouterManager {

    /**
     * Use hash navigation
     *
     * @type Boolean
     * @static
     */
    private USE_HASH = false;

    /**
     * @type window
     * @static
     */
    private WINDOW = window;

    /**
     * @type String
     * @static
     */
    private HASH = '';

    /**
     * @property routes
     * @type Lib.Router.Route[]
     */
    public routes = [];

    /**
     * Route map
     * @property map
     * @type Object
     */
    public map = {};

    /**
     * Current hash
     *
     * @property currentPath
     * @type String
     */
    public currentPath = '';

    constructor() {

    }

    /**
     * Get current hash
     *
     * @function
     * @returns {string}
     * @private
     */
    private _getHash() {
        return this.USE_HASH ? window.location.hash.substring(1) : this.HASH;
    }

    /**
     * @method start
     * @chainable
     */
    public start() {
        if (this.USE_HASH) {
            this.WINDOW.addEventListener('hashchange', this.onRoute, false);
        }

        this._matchRoutes();

        return this;
    }

    /**
     * @method stop
     * @chainable
     */
    public stop() {
        if (this.USE_HASH) {
            this.WINDOW.removeEventListener('hashchange', this.onRoute, false);
        }

        return this;
    }

    /**
     * Create a new route
     *
     * @method createRoute
     * @param {String} name
     * @param {String|RegExp|String[]} path
     * @returns {Lib.Router.Route}
     */
    public createRoute(name, path) {
        if (!this.map.hasOwnProperty(name)) {
            this.map[name] = new Route(path, name);
            this.routes.push(this.map[name]);
//            this.map[name].subscribe('all', this.publish);
        }

        return this.map[name];
    }

    /**
     * Get route by name
     *
     * @method getRoute
     * @param {String} name
     * @returns {Lib.Router.Route|null}
     */
    public getRoute(name) {
        return this.map[name];
    }

    /**
     * Generate URL for route
     *
     * @method generateRoute
     * @param {String} name Route name
     * @param {Object} parameters Route parameters
     * @returns {String}
     */
    public generateRoute(name, parameters) {
        var url = '';

        if (this.map.hasOwnProperty(name)) {
            url = this.map[name].generateRoute(parameters);
        }

        return url;
    }

    /**
     * @method navigateTo
     * @param {String} path
     * @param {Boolean} [silent]
     * @chainable
     */
    public navigateTo(path, silent:boolean = false) {
        if (silent === true) {
            this.currentPath = path;
        }

        if (this.USE_HASH) {
            this.WINDOW.location.hash = path;
        } else {
            this.HASH = path;
            setTimeout(this.onRoute);
        }

        return this;
    }

    /**
     * @method navigateToRoute
     * @param {String} name
     * @param {Object} [parameters]
     * @chainable
     */
    public navigateToRoute(name, parameters) {
        return this.navigateTo(this.generateRoute(name, parameters));
    }

    /**
     * Find matching routes to the current path
     *
     * @method _matchRoutes
     * @private
     * @chainable
     */
    public _matchRoutes() {
        var hash = this._getHash();

        // If hash has not changed, do nothing
        if (hash === this.currentPath) {
            return;
        }

        var exitRoutes = [];
        var enterRoutes = [];

        var i = 0;
        var routes = this.routes;
        var length = routes.length;
        var route;

        for (; i < length; i++) {
            route = routes[i];
console.log("route.match(hash)", route.match(hash), hash);
            if (route.match(hash)) {
                enterRoutes.push(route);
            } else if (route.isActive()) {
                exitRoutes.push(route);
            }
        }

        if (enterRoutes.length) {
            this.currentPath = hash;

            // Exit active routes that are no longer active
            if (exitRoutes.length) {
                for (i = 0; i < exitRoutes.length; i++) {
                    exitRoutes[i].exit();
                }
            }

            // enter matching routes
            for (i = 0; i < enterRoutes.length; i++) {
                enterRoutes[i].enter(enterRoutes[i].getParameters(hash));
            }
        }
    }

    /**
     * @method onRoute
     * @callback
     */
    public onRoute() {
        var _route = this._getHash();
console.log("onRoute", _route);
        // Enforce starting slash
        if (_route[0] !== '/') {
            this.navigateTo('/' + _route);
        } else {
            this._matchRoutes();
        }
    }

}
export = RouterManager;