/**
 * The **Route** class is a model that keeps track of a specific route for the {{#crossLink "Router"}}{{/crossLink}} class.
 *
 * @class Route
 * @module StructureJS
 * @submodule model
 * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ''
 * @param callback {Function} The function that should be executed when a request matches the routePattern.
 * @param callbackScope {any} The scope of the callback function that should be executed.
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example of adding a route listener and the function callback below.
 *     let route = new Route('/games/{gameName}/:level:/', this._method, this);
 *
 *     // The above route would match the string below:
 *     route.match('/games/asteroids/2/');
 *
 * Route Pattern Options:
 * ----------------------
 * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
 *
 *     let route = new Route('/contact/:name:/', this._method, this);
 *
 *     // Will match one of the following:
 *     route.match('/contact/');
 *     route.match('/contact/heather/');
 *     route.match('/contact/john/');
 *
 *
 * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
 *
 *     let route = new Route('/product/{productName}/', this._method, this);
 *
 *     // Will match one of the following:
 *     route.match('/product/shoes/');
 *     route.match('/product/jackets/');
 *
 *
 * **\*** The asterisk character means it will match all or part of part the hash url.
 *
 *     let route = new Route('*', this._method, this);
 *
 *     // Will match one of the following:
 *     route.match('/anything/');
 *     route.match('/matches/any/hash/url/');
 *     route.match('/really/it/matches/any/and/all/hash/urls/');
 *
 *
 * **''** The empty string means it will match when there are no hash url.
 *
 *     let route = new Route('', this._method, this);
 *     let route = new Route('/', this._method, this);
 *
 *     // Will match one of the following:
 *     route.match('');
 *     route.match('/');
 *
 *
 * Other possible combinations but not limited too:
 *
 *     let route = new Route('/games/{gameName}/:level:/', this._method1, this);
 *     let route = new Route('/{category}/blog/', this._method2, this);
 *     let route = new Route('/about/*', this._method3, this);
 *
 */
declare class Route {
    /**
     * The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, "". See below for examples.
     *
     * @property routePattern
     * @type String
     * @public
     */
    routePattern: string;
    /**
     * The regex representation for the routePattern that was passed into the constructor.
     *
     * @property regex
     * @type RegExp
     * @public
     * @readOnly
     */
    regex: RegExp;
    /**
     * The function that should be executed when a request matches the routePattern. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
     *
     * @property callback
     * @type {Function}
     * @public
     */
    callback: Function;
    /**
     * The scope of the callback function that should be executed. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
     *
     * @property callbackScope
     * @type {any}
     * @public
     */
    callbackScope: any;
    constructor(routePattern: string, callback: Function, scope: any);
    /**
     * Converts the routePattern that was passed into the constructor to a regexp object.
     *
     * @method _routePatternToRegexp
     * @param {String} routePattern
     * @returns {RegExp}
     * @protected
     */
    protected _routePatternToRegexp(routePattern: any): RegExp;
    /**
     * Determine if a route matches a routePattern.
     *
     * @method match
     * @param route {String} The route or path to match against the routePattern that was passed into the constructor.
     * @returns {Array.<any>}
     * @example
     *     let route = new Route('/games/{gameName}/:level:/', this.method, this);
     *     console.log( route.match('/games/asteroids/2/') );
     */
    match(route: any): Array<any>;
}
export default Route;
