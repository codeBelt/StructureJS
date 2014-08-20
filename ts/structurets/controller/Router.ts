import Route = require("Route");
import RouteEvent = require("../event/RouteEvent");
import StringUtil = require("../util/StringUtil");

/**
 * YUIDoc_comment
 *
 * @class Router
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 * Router.add('/home/', this.onHomeHandler, this);
 * //The above will trigger if the url is: www.site.com#/home/
 * //The first and last forward slashes are option so even this will trigger the route: www.site.com#home
 *
 * Router.start();
 **/
class Router
{
    private static WINDOW:Window = window;
    private static _isEnabled:boolean = false;
    private static _routes:Array<Route> = [];
    private static _defaultRoute:Route = null;
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
     * Allows you to have a default method called if no routes are found.
     *
     * @method addDefault
     * @param callback {Function}
     * @param scope {any}
     * @public static
     */
    public static addDefault(callback:Function, scope:any):void {
        Router._defaultRoute = new Route('', callback, scope);
    }

    /**
     * Remove the default method.
     *
     * @method removeDefault
     * @public static
     */
    public static removeDefault():void {
        Router._defaultRoute = null;
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

        return hash.substring(strIndex); // Return everything after # or #! TODO: make sure I want to do this.
    }

    /**
     * This method allows the Router class to listen for the Window object HashChangeEvent.
     *
     * @method enable
     * @private static
     */
    public static enable():void {
        if (Router._isEnabled === true) return;

        if (Router.WINDOW.addEventListener) {
            Router.WINDOW.addEventListener('hashchange', Router.onHashChange, false);
        } else {
            Router.WINDOW.attachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = true;
    }

    /**
     * This method prevents the Router class from listening for the Window object HashChangeEvent.
     *
     * @method disable
     * @private static
     */
    public static disable():void {
        if (Router._isEnabled === false) return;

        if (Router.WINDOW.removeEventListener) {
            Router.WINDOW.removeEventListener('hashchange', Router.onHashChange);
        } else {
            Router.WINDOW.detachEvent('onhashchange', Router.onHashChange);
        }

        Router._isEnabled = false;
    }

    /**
     * This method should be called if you would like to check the hash url on page load
     * and trigger any routes.
     *
     * @method onHashChange
     * @private static
     */
    public static start():void {
        setTimeout(Router.onHashChange, 1);
    }

    /**
     * Within your code you can call this method to change the
     *
     * @method navigateTo
     * @param path {String}
     * @param [silent=false] {Boolean}
     * @private static
     */
    public static navigateTo(path, silent:boolean = false):void {
        if (Router._isEnabled === false) return;

        if (path.charAt(0) === '#')
        {
            //TODO: make sure we keep the ! character right? I think I want to do that. Need to test.
            var strIndex = (path.substr(0, 2) === '#!') ? 2 : 1;
            path = path.substring(strIndex);
        }

        // Enforce starting slash
        if (path.charAt(0) !== '/' && Router.forceSlash === true)
        {
            path = '/' + path;
        }

        if (Router.useDeepLinking === true)
        {
            if (silent === true)
            {
                Router.disable();
                setTimeout(function () {
                    window.location.hash = path;
                    setTimeout(Router.enable, 1);
                }, 1);
            }
            else
            {
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
     * This method will be called if the Window object dispatches a HashChangeEvent.
     * This method will not be called if the Router is disabled.
     *
     * @method onHashChange
     * @param event {HashChangeEvent}
     * @private static
     */
    private static onHashChange(event):void
    {
        if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false) return;

        Router._hashChangeEvent = event;

        var hash = Router.getHash();

        Router.changeRoute(hash);
    }

    /**
     * The method is responsible for check if one of the routes matches the string value passed in.
     *
     * @method changeRoute
     * @param hash {string}
     * @private static
     */
    private static changeRoute(hash:string):void
    {
        var route:Route;
        var match:any;
        var params:any[];
        var routeLength = Router._routes.length;
        var routerEvent:RouteEvent = null;

        // Loop through all routes and see if there is a match.
        for (var i = 0; i < routeLength; i++)
        {
            route = Router._routes[i];
            match = route.match(hash);

            // If there is a match.
            if (match !== null)
            {
                routerEvent = new RouteEvent();
                routerEvent.route = match.shift();
                routerEvent.data = match.slice(0, match.length);
                routerEvent.path = route.path;
                routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;

                if (Router._hashChangeEvent != null)
                {
                    routerEvent.newURL = Router._hashChangeEvent.newURL;
                    routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                }

                params = match.slice(0, match.length);
                params.push(routerEvent);

                route.callback.apply(route.callbackScope, params);
            }
        }

        // If there are no route's matched and there is a default route. Then call that default route.
        if (routerEvent === null && Router._defaultRoute !== null)
        {
            routerEvent = new RouteEvent();
            routerEvent.route = hash;
            routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;

            if (Router._hashChangeEvent != null)
            {
                routerEvent.newURL = Router._hashChangeEvent.newURL;
                routerEvent.oldURL = Router._hashChangeEvent.oldURL;
            }

            Router._defaultRoute.callback.call(Router._defaultRoute.callbackScope, routerEvent);
        }

        Router._hashChangeEvent = null;
    }


    /**
     * This method will null out all references in the Router class.
     *
     * @method destroy
     * @public
     */
    public destroy():void {
        Router.WINDOW = null;
        Router._routes = null;
        Router._defaultRoute = null;
        Router._hashChangeEvent = null;
    }

}

export = Router;