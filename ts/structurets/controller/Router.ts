import Route = require("Route");
import RouteEvent = require("../event/RouteEvent");

class Router
{
    private static WINDOW:Window = window;
    private static _isEnabled:boolean = false;
    private static _routes:Array<Route> = [];
    private static _hashChangeEvent:any = null;
    private static forceSlash:boolean = true;
    private static useDeepLinking:boolean = true;
    private static allowManualDeepLinking:boolean = true;

    constructor()
    {
    }

    /**
     * YUIDoc_comment
     *
     * @method add
     * @public static
     */
    public static add(path:string, callback:Function, scope:any):void {
        Router.enable();

        var route:Route = new Route(path, callback, scope);

        Router._routes.push(route);
    }

    /**
     * YUIDoc_comment
     *
     * @method remove
     * @public static
     */
    public static remove(path:string, callback:Function, scope:any):void {
        var route:Route;

        for (var i = Router._routes.length - 1; i >= 0; i--)
        {
            route = Router._routes[i];
            if (route.path === path && route.callback === callback && route.callbackScope === scope)
            {
                Router._routes.splice(i, 1);
            }
        }
    }

    /**
     * Gets the hash url minus the # or #! symbol(s).
     * @example
     * //
     *
     * @method getHash
     * @public static
     * @return {string}
     */
    public static getHash():string {
        var hash:string = Router.WINDOW.location.hash;
        var strIndex:number = (hash.substr(0, 2) === '#!') ? 2 : 1;

        return hash.substring(strIndex); // Return everything after # or #!
    }

    public static enable() {
        if (Router._isEnabled === true) return;

        if (Router.WINDOW.addEventListener) {
            Router.WINDOW.addEventListener('hashchange', Router.onHashChange, false);
        } else {
            Router.WINDOW.attachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = true;
    }

    public static disable() {
        if (Router._isEnabled === false) return;

        if (Router.WINDOW.removeEventListener) {
            Router.WINDOW.removeEventListener('hashchange', Router.onHashChange);
        } else {
            Router.WINDOW.detachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = false;
    }

    public static start() {
        setTimeout(Router.onHashChange, 1);
    }
    /**
     * @method navigateTo
     * @param {String} path
     * @param {Boolean} [silent]
     * @chainable
     */
    public static navigateTo(path, silent:boolean = false) {
        if (Router._isEnabled === false) return;

        if (path.charAt(0) === '#') {
            var strIndex = (path.substr(0, 2) === '#!') ? 2 : 1;
            path = path.substring(strIndex);
        }

        // Enforce starting slash
        if (path.charAt(0) !== '/' && Router.forceSlash === true) {
            path = '/' + path;
        }

        if (Router.useDeepLinking === true)
        {
            if (silent === true) {
                Router.disable();
                setTimeout(function () {
                    window.location.hash = path;
                    setTimeout(Router.enable, 1);
                }, 1);
            } else {
                setTimeout(function () {
                    window.location.hash = path;
                }, 1);
            }
        }
        else
        {
            Router.changeRoute(path);
        }
    }


    /**
     * YUIDoc_comment
     *
     * @method onHashChange
     * @param event {HashChangeEvent}
     * @private static
     */
    private static onHashChange(event):void {
        if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false) return;

        Router._hashChangeEvent = event;

        var hash = Router.getHash();

        Router.changeRoute(hash);
    }

    private static changeRoute(hash:string) {
        var routeLength = Router._routes.length;
        var route;
        var match;

        for (var i = 0; i < routeLength; i++) {
            route = Router._routes[i];
            match = route.match(hash);

            if (match !== null) {
                var routerEvent = new RouteEvent();
                routerEvent.route = match.shift();
                routerEvent.data = match.slice(0, match.length);
                routerEvent.path = route.path;

                if (Router._hashChangeEvent != null) {
                    routerEvent.newURL = Router._hashChangeEvent.newURL;
                    routerEvent.oldURL = Router._hashChangeEvent.oldURL;

                    Router._hashChangeEvent = null;
                }

                var params = match.slice(0, match.length);
                params.push(routerEvent);

                route.callback.apply(route.callbackScope, params);
            }
        }
    }

}

export = Router;