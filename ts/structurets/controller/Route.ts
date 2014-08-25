/**
 * YUIDoc_comment
 *
 * @class Route
 * @constructor
 * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''
 * @param callback {Function} The function that should be executed when a request matches the routePattern.
 * @param callbackScope {any} The scope of the callback function that should be executed.
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example of adding a route listener and the function callback below.
 *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
 *
 *     // The above route listener would match the below url:
 *     // www.site.com/#/games/asteroids/2/
 *
 *     // Notice the three parameters. This is because we have two patterns above.
 *     // The `{}` means it is required and `::` means it is optional for a route match.
 *     // The third parameter is the routeEvent and that is always last parameter.
 *     ClassName.prototype.onRouteHandler = function (gameName, level, routeEvent) {
     *         // gameName value would be 'asteroids'.
     *         // level value would be 2.
     *         // routeEvent value would be a RouteEvent object.
     *     }
 *
 * Route Pattern Options:
 * ----------------------
 * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
 *
 *     Router.add('/contact/:name:/', this.method, this);
 *
 *     // Will match one of the following:
 *     // www.site.com/#/contact/
 *     // www.site.com/#/contact/heather/
 *     // www.site.com/#/contact/john/
 *
 *
 * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
 *
 *     Router.add('/product/{productName}/', this.method, this);
 *
 *     // Will match one of the following:
 *     // www.site.com/#/product/shoes/
 *     // www.site.com/#/product/jackets/
 *
 *
 * **\*** The asterix character means it will match all or part of part the hash url.
 *
 *     Router.add('*', this.method, this);
 *
 *     // Will match one of the following:
 *     // www.site.com/#/anything/
 *     // www.site.com/#/matches/any/hash/url/
 *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
 *
 *
 * **?** The question mark character means it will match a query string for the hash url. One thing to point out is when a query string is matched it will **NOT** be passed as a parameter to the callback function. It will be converted to an
 *
 *     Router.add('?', this.method, this);
 *
 *     // Will match one of the following:
 *     // www.site.com/#/?one=1&two=2&three=3
 *     // www.site.com/#?one=1&two=2&three=3
 *
 *
 * **''** The empty string means it will match when there are no hash url.
 *
 *     Router.add('', this.method, this);
 *     Router.add('/', this.method, this);
 *
 *     // Will match one of the following:
 *     // www.site.com/
 *     // www.site.com/#/
 *
 *
 * Other possible combinations but not limited too:
 *
 *     Router.add('/games/{gameName}/:level:/', this.method1, this);
 *     Router.add('/{category}/blog/', this.method2, this);
 *     Router.add('/home/?', this.method3, this);
 *     Router.add('/about/*', this.method4, this);
 *
 */
class Route
{
    /**
     * The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''.
     *
     * @property routePattern
     * @type String
     * @public
     */
    public routePattern = '';

    /**
     * The regex representation for the routePattern that was passed into the constructor.
     *
     * @property regex
     * @type RegExp
     * @public
     * @readOnly
     */
    public regex:RegExp = null;

    /**
     * The function that should be executed when a request matches the routePattern.
     *
     * @property callback
     * @type {Function}
     * @public
     */
    public callback:Function = null;

    /**
     * The scope of the callback function that should be executed.
     *
     * @property callbackScope
     * @type {any}
     * @public
     */
    public callbackScope:any = null;

    constructor(routePattern:string, callback:Function, scope:any)
    {
        this.routePattern = routePattern;
        this.regex = this.routePatternToRegexp(routePattern);
        this.callback = callback;
        this.callbackScope = scope;
    }

    /**
     * Converts the routePattern that was passed into the constructor to a regexp object.
     *
     * @method routePatternToRegexp
     * @param {String} routePattern
     * @returns {RegExp}
     * @private
     */
    private routePatternToRegexp(routePattern):RegExp {
        var findFirstOrLastForwardSlash:RegExp = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
        var findOptionalColons:RegExp = new RegExp(':([^:]*):', 'g'); // Finds the colons : :
        var findRequiredBrackets:RegExp = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
        var optionalFirstCharSlash = '^/?';// Allows the first character to be if a forward slash to be optional.
        var optionalLastCharSlash = '/?$';// Allows the last character to be if a forward slash to be optional.

        // Remove first and last forward slash.
        routePattern = routePattern.replace(findFirstOrLastForwardSlash, '');

        // Convert the wild card * be a regex .* to select all.
        routePattern = routePattern.replace('*', '(.*)');

        // Matches and query strings.
        routePattern = routePattern.replace('?', '(\\?.*)');

        // Make any :alphanumeric: optional but not query string
        routePattern = routePattern.replace(findOptionalColons, '?([^/?]*)');

        // Make any {alphanumeric} required but not query string
        routePattern = routePattern.replace(findRequiredBrackets, '([^/?]+)');

        return new RegExp(optionalFirstCharSlash + routePattern + optionalLastCharSlash, 'i');
    }

    /**
     * Determine if route matches routePattern that was passed into the constructor.
     *
     * @method match
     * @param route {String} The route or path to match against the routePattern.
     * @returns {Array}
     * @example
     *     var route = new Route('/games/{gameName}/:level:/', this.method, this);
     *     console.log( route.match(/games/asteroids/2/) );
     */
    public match(route):any[] {
        return route.match(this.regex);
    }

}
export = Route;
