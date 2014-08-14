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
        var findForwardSlashes:RegExp = new RegExp('\/', 'g');// Finds all forward slashes
        var findForwardSlashesReplacer:string = '\\/';
        var findFirstOrLastForwardSlash:RegExp = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
        var findFirstOrLastForwardSlashReplacer:string = '';
        var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons :
        var findOptionalColonsReplacer = '?([^/]*)';
        var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
        var findRequiredBracketsReplacer = '([^/]+)';

        // Remove first and last forward slash.
        path = path.replace(findFirstOrLastForwardSlash, findFirstOrLastForwardSlashReplacer);

        // Convert the wild card * be a regex .* to select all.
        path = path.replace('*', '.*');

        // Matches and query strings.
        path = path.replace('?', '.*');

        // Escape the forward slashes ( / ) so it will look like "\/"
        //path = path.replace(findForwardSlashes, findForwardSlashesReplacer);

        // Make any :alphanumeric: optional
        path = path.replace(findOptionalColons, findOptionalColonsReplacer);

        // Make any {alphanumeric} required
        path = path.replace(findRequiredBrackets, findRequiredBracketsReplacer);

        return new RegExp('^/?' + path + '/?$', 'i');
    }

    /**
     * Determine if route matches `path`
     *
     * @method match
     * @param {String} path
     * @returns {Boolean}
     */
    public match(path) {
        return path.match(this.regex);
    }

}
export = Route;
