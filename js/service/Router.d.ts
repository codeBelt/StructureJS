import RouterEvent from '../event/RouterEvent';
/**
 * The **Router** class is a static class allows you to add different route patterns that can be matched to help control your application. Look at the Router.{{#crossLink "Router/add:method"}}{{/crossLink}} method for more details and examples.
 *
 * @class Router
 * @module StructureJS
 * @submodule controller
 * @requires Route
 * @requires RouterEvent
 * @requires StringUtil
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
declare class Router {
    /**
     * A reference to the browser Window Object.
     *
     * @property _window
     * @type {Window}
     * @private
     * @static
     */
    private static _window;
    /**
     * A list of the added Route objects.
     *
     * @property _routes
     * @type {Array<Route>}
     * @private
     * @static
     */
    private static _routes;
    /**
     * TODO: YUIDoc_comment
     *
     * @property _validators
     * @type {Array<Function>}
     * @private
     * @static
     */
    private static _validators;
    /**
     * TODO: YUIDoc_comment
     *
     * @property _validatorFunc
     * @type {Function}
     * @private
     * @static
     */
    private static _validatorFunc;
    /**
     * A reference to default route object.
     *
     * @property _defaultRoute
     * @type {Route}
     * @private
     * @static
     */
    private static _defaultRoute;
    /**
     * A reference to the hash change event that was sent from the Window Object.
     *
     * @property _hashChangeEvent
     * @type {any}
     * @private
     * @static
     */
    private static _hashChangeEvent;
    /**
     * A reference to the current {{#crossLink "RouterEvent"}}{{/crossLink}} that was triggered.
     *
     * @property _currentRoute
     * @type {RouterEvent}
     * @private
     * @static
     */
    private static _currentRoute;
    /**
     * A reference to the last state object this {{#crossLink "Router"}}{{/crossLink}} creates when this
     * using the HTML5 History API.
     *
     * @property _lastHistoryState
     * @type {RouterEvent}
     * @private
     * @static
     */
    private static _lastHistoryState;
    /**
     * Determines if the {{#crossLink "Router"}}{{/crossLink}} should use hash or history routing.
     *
     * @property forceHashRouting
     * @type {boolean}
     * @default false
     * @public
     * @static
     * @example
     *     Router.forceHashRouting = true;
     */
    static forceHashRouting: boolean;
    /**
     * Determines if the Router class is enabled or disabled.
     *
     * @property isEnabled
     * @type {boolean}
     * @readOnly
     * @public
     * @static
     * @example
     *     // Read only.
     *     console.log(Router.isEnabled);
     */
    static isEnabled: boolean;
    /**
     * The **Router.useDeepLinking** property tells the Router class weather it should change the hash url or not.
     * By **default** this property is set to **true**. If you set the property to **false** and using the **Router.navigateTo**
     * method the hash url will not change. This can be useful if you are making an application or game and you don't want the user
     * to know how to jump to other sections directly. See the **Router.{{#crossLink "Router/allowManualDeepLinking:property"}}{{/crossLink}}** to fully change the Router class
     * from relying on the hash url to an internal state service.
     *
     * @property useDeepLinking
     * @type {boolean}
     * @default true
     * @public
     * @static
     * @example
     *     Router.useDeepLinking = true;
     */
    static useDeepLinking: boolean;
    /**
     * The **Router.allowManualDeepLinking** property tells the Router class weather it should check for route matches if the
     * hash url changes in the browser. This property only works if the **Router. {{#crossLink "Router/useDeepLinking:property"}}{{/crossLink}}** is set to **false**.
     * This is useful if want to use your added routes but don't want any external forces trigger your routes.
     *
     * Typically what I do for games is during development/testing I allow the hash url to change the states so testers can jump
     * to sections or levels easily but then when it is ready for production I set the property to **false** so users cannot jump
     * around if they figure out the url schema.
     *
     * @property allowManualDeepLinking
     * @type {boolean}
     * @default true
     * @public
     * @static
     * @example
     *     Router.useDeepLinking = false;
     *     Router.allowManualDeepLinking = false;
     */
    static allowManualDeepLinking: boolean;
    /**
     * The **Router.forceSlash** property tells the Router class if the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method is called to
     * make sure the hash url has a forward slash after the **#** character like this **#/**.
     *
     * @property forceSlash
     * @type {boolean}
     * @default false
     * @public
     * @static
     * @example
     *     // To turn on forcing the forward slash
     *     Router.forceSlash = true;
     *
     *     // If forceSlash is set to true it will change the url from #contact/bob/ to #/contact/bob/
     *     // when using the navigateTo method.
     */
    static forceSlash: boolean;
    /**
     * The **Router.allowMultipleMatches** property tells the Router class if it should trigger one or all routes that match a route pattern.
     *
     * @property allowMultipleMatches
     * @type {boolean}
     * @default true
     * @public
     * @static
     * @example
     *     // Only allow the first route matched to be triggered.
     *     Router.allowMultipleMatches = false;
     */
    static allowMultipleMatches: boolean;
    constructor();
    /**
     * The **Router.add** method allows you to listen for route patterns to be matched. When a match is found the callback will be executed passing a {{#crossLink "RouterEvent"}}{{/crossLink}}.
     *
     * @method add
     * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''. See the examples below for more details.
     * @param callback {Function} The function that should be executed when a request matches the routePattern. It will receive a {{#crossLink "RouterEvent"}}{{/crossLink}} object.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @public
     * @static
     * @example
     *     // Example of adding a route listener and the function callback below.
     *     Router.add('/games/{gameName}/:level:/', this._method, this);
     *
     *     // The above route listener would match the below url:
     *     // www.site.com/#/games/asteroids/2/
     *
     *     // The Call back receives a RouterEvent object.
     *     _onRouteHandler(routerEvent) {
     *         console.log(routerEvent.params);
     *     }
     *
     * Route Pattern Options:
     * ----------------------
     * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
     *
     *     Router.add('/contact/:name:/', this._method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/contact/
     *     // www.site.com/#/contact/heather/
     *     // www.site.com/#/contact/john/
     *
     *
     * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
     *
     *     Router.add('/product/{productName}/', this._method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/product/shoes/
     *     // www.site.com/#/product/jackets/
     *
     *
     * **\*** The asterisk character means it will match all or part of part the hash url.
     *
     *     Router.add('*', this._method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/anything/
     *     // www.site.com/#/matches/any/hash/url/
     *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
     *
     *
     * **?** The question mark character means it will match a query string for the hash url.
     *
     *     Router.add('?', this._method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/#/?one=1&two=2&three=3
     *     // www.site.com/#?one=1&two=2&three=3
     *
     *
     * **''** The empty string means it will match when there are no hash url.
     *
     *     Router.add('', this._method, this);
     *     Router.add('/', this._method, this);
     *
     *     // Will match one of the following:
     *     // www.site.com/
     *     // www.site.com/#/
     *
     *
     * Other possible combinations but not limited too:
     *
     *     Router.add('/games/{gameName}/:level:/', this._method1, this);
     *     Router.add('/{category}/blog/', this._method2, this);
     *     Router.add('/home/?', this._method3, this);
     *     Router.add('/about/*', this._method4, this);
     *
     */
    static add(routePattern: string, callback: Function, callbackScope: any): void;
    /**
     * The **Router.remove** method will remove one of the added routes.
     *
     * @method remove
     * @param routePattern {string} Must be the same string pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
     * @param callback {Function} Must be the same function you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
     * @param callbackScope {any} Must be the same scope off the callback pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
     * @public
     * @static
     * @example
     *     // Example of adding a route listener.
     *     Router.add('/games/{gameName}/:level:/', this._method, this);
     *
     *     // Example of removing the same added route listener above.
     *     Router.remove('/games/{gameName}/:level:/', this._method, this);
     */
    static remove(routePattern: string, callback: Function, callbackScope: any): void;
    /**
     * The **Router.addDefault** method is meant to trigger a callback function if there are no route matches are found.
     *
     * @method addDefault
     * @param callback {Function}
     * @param callbackScope {any}
     * @public
     * @static
     * @example
     *     Router.addDefault(this._noRoutesFoundHandler, this);
     */
    static addDefault(callback: Function, callbackScope: any): void;
    /**
     * The **Router.removeDefault** method will remove the default callback that was added by the **Router.addDefault** method.
     *
     * @method removeDefault
     * @public
     * @static
     * @example
     *     Router.removeDefault();
     */
    static removeDefault(): void;
    /**
     * Gets the current hash url minus the # or #! symbol(s).
     *
     * @method getHash
     * @public
     * @static
     * @return {string} Returns current hash url minus the # or #! symbol(s).
     * @example
     *     let str = Router.getHash();
     */
    static getHash(): string;
    /**
     * The **Router.enable** method will allow the Router class to listen for the hashchange event. By default the Router class is enabled.
     *
     * @method enable
     * @public
     * @static
     * @example
     *     Router.enable();
     */
    static enable(): void;
    /**
     * The **Router.disable** method will stop the Router class from listening for the hashchange event.
     *
     * @method disable
     * @public
     * @static
     * @example
     *     Router.disable();
     */
    static disable(): void;
    /**
     * The **Router.start** method is meant to trigger or check the hash url on page load.
     * Either you can call this method after you add all your routers or after all data is loaded.
     * It is recommend you only call this once per page or application instantiation.
     *
     * @method start
     * @public
     * @static
     * @example
     *     // Example of adding routes and calling the start method.
     *     Router.add('/games/{gameName}/:level:/', this._method1, this);
     *     Router.add('/{category}/blog/', this._method2, this);
     *
     *     Router.start();
     */
    static start(): void;
    /**
     * The **Router.navigateTo** method allows you to change the hash url and to trigger a route
     * that matches the string value. The second parameter is **silent** and is **false** by
     * default. This allows you to update the hash url without causing a route callback to be
     * executed.
     *
     * @method navigateTo
     * @param route {String}
     * @param [silent=false] {Boolean}
     * @param [disableHistory=false] {Boolean}
     * @public
     * @static
     * @example
     *     // This will update the hash url and trigger the matching route.
     *     Router.navigateTo('/games/asteroids/2/');
     *
     *     // This will update the hash url but will not trigger the matching route.
     *     Router.navigateTo('/games/asteroids/2/', true);
     *
     *     // This will not update the hash url but will trigger the matching route.
     *     Router.navigateTo('/games/asteroids/2/', true, true);
     */
    static navigateTo(route: any, silent?: boolean, disableHistory?: boolean): void;
    /**
     * The **Router.clear** will remove all route's and the default route from the Router class.
     *
     * @method clear
     * @public
     * @static
     * @example
     *     Router.clear();
     */
    clear(): void;
    /**
     * The **Router.destroy** method will null out all references to other objects in the Router class.
     *
     * @method destroy
     * @public
     * @static
     * @example
     *     Router.destroy();
     */
    destroy(): void;
    /**
     * A simple helper method to create a url route from an unlimited number of arguments.
     *
     * @method buildRoute
     * @param ...rest {...rest}
     * @return {string}
     * @public
     * @static
     * @example
     *      const someProperty = 'api/endpoint';
     *      const queryObject = {type: 'car', name: encodeURIComponent('Telsa Motors')};
     *
     *      Router.buildRoute(someProperty, 'path', 7, queryObject);
     *
     *      //Creates 'api/endpoint/path/7?type=car&name=Telsa%20Motors'
     */
    static buildRoute(...rest: any[]): string;
    /**
     * Returns the current router event that was last triggered.
     *
     * @method getCurrentRoute
     * @public
     * @static
     * @example
     *      Router.getCurrentRoute();
     */
    static getCurrentRoute(): RouterEvent;
    /**
     * TODO: YUIDoc_comment
     *
     * @method validate
     * @param func {Function} The function you wanted called if the validation failed.
     * @public
     * @static
     * @example
     *         Router.validate((routerEvent, next) => {
     *              const allowRouteChange = this._someMethodCheck();
     *
     *              if (allowRouteChange == false) {
     *                  next(() => {
     *                      // Do something here.
     *                      // For example you can call Router.navigateTo to change the route.
     *                  });
     *              } else {
     *                  next();
     *              }
     *         });
     */
    static validate(func: Function): void;
    /**
     * This method will be called if the Window object dispatches a HashChangeEvent.
     * This method will not be called if the Router is disabled.
     *
     * @method _onHashChange
     * @param event {HashChangeEvent}
     * @private
     * @static
     */
    private static _onHashChange(event);
    /**
     * This method will be called if the Window object dispatches a popstate event.
     * This method will not be called if the Router is disabled.
     *
     * @method _onHistoryChange
     * @param event {HashChangeEvent}
     * @private
     * @static
     */
    private static _onHistoryChange(event);
    /**
     * The method is responsible for check if one of the routes matches the string value passed in.
     *
     * @method _changeRoute
     * @param hash {string}
     * @private
     * @static
     */
    private static _changeRoute(hash);
    /**
     * TODO: YUIDoc_comment
     *
     * @method _allowRouteChange
     * @private
     * @static
     */
    private static _allowRouteChange(routerEvent);
}
export default Router;
