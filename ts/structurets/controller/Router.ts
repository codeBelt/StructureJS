import Route = require("Route");

class Router
{
    private static WINDOW:Window = window;
    private static _isEnabled:boolean = false;
    private static _routes:Array<Route> = [];
    constructor()
    {
        Router.enable();
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

        console.log("home", route);
        console.log("about/{name}", Router.getHash());
        //http://collectiveidea.com/blog/archives/2012/01/25/standalone-javascript-routing/
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

        console.log("enable");
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

    /**
     * YUIDoc_comment
     *
     * @method onHashChange
     * @param event {HashChangeEvent}
     * @private static
     */
    private static onHashChange(event):void {
        console.log("onhashchange", arguments);
    }

    /**
     * Find matching routes to the current path
     *
     * @method _matchRoutes
     * @private
     * @chainable
     */
    public matchRoutes() {
        var hash = Router.getHash();
        var routeLength:number = Router._routes.length;

//        // If hash has not changed, do nothing
//        if (hash === this.currentPath) {
//            return;
//        }
//
//        var exitRoutes = [];
//        var enterRoutes = [];
//
//        var i = 0;
//        var routes = this.routes;
//        var length = routes.length;
//        var route;
//
//        for (; i < length; i++) {
//            route = routes[i];
//            console.log("route.match(hash)", route.match(hash), hash);
//            if (route.match(hash)) {
//                enterRoutes.push(route);
//            } else if (route.isActive()) {
//                exitRoutes.push(route);
//            }
//        }
//
//        if (enterRoutes.length) {
//            this.currentPath = hash;
//
//            // Exit active routes that are no longer active
//            if (exitRoutes.length) {
//                for (i = 0; i < exitRoutes.length; i++) {
//                    exitRoutes[i].exit();
//                }
//            }
//
//            // enter matching routes
//            for (i = 0; i < enterRoutes.length; i++) {
//                enterRoutes[i].enter(enterRoutes[i].getParameters(hash));
//            }
//        }
    }

}
export = Router;