/**
 * YUIDoc_comment
 *
 * @class Route
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 **/
class Route
{
    /**
     * @property path
     * @type String
     */
    public path = '';

    /**
     * @property regex
     * @type RegExp
     */
    public regex:RegExp = null;

    /**
     * YUIDoc_comment
     *
     * @property callback
     * @type {Function}
     * @public
     */
    public callback:Function = null;

    /**
     * YUIDoc_comment
     *
     * @property callbackScope
     * @type {any}
     * @public
     */
    public callbackScope:any = null;

    constructor(path:string, callback:Function, scope:any)
    {
        this.path = path;
        this.regex = this.pathToRegexp(path);
        this.callback = callback;
        this.callbackScope = scope;
    }

    /**
     * Convert path to regexp
     *
     * @type Function
     * @param {String} path
     * @returns {RegExp}
     * @private
     */
    private pathToRegexp(path):RegExp {
        var findFirstOrLastForwardSlash:RegExp = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
        var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons :
        var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }

        // Remove first and last forward slash.
        path = path.replace(findFirstOrLastForwardSlash, '');

        // Convert the wild card * be a regex .* to select all.
        path = path.replace('*', '(.*)');

        // Matches and query strings.
        path = path.replace('?', '(\\?.*)');

        // Make any :alphanumeric: optional
        path = path.replace(findOptionalColons, '?([^/]*)');

        // Make any {alphanumeric} required
        path = path.replace(findRequiredBrackets, '([^/]+)');

        return new RegExp('^/?' + path + '/?$', 'i');
    }

    /**
     * Determine if route matches `path`
     *
     * @method match
     * @param {String} path
     * @returns {Boolean}
     */
    public match(path):any[] {
        return path.match(this.regex);
    }

}
export = Route;
