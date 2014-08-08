class Route
{
    // Regexps
    private _regexSlashes:RegExp = /(^\/+|\/+$)/g;
    private _regexOptionalSlash:RegExp = /(:|})\/:/g;
    private _regexParam:RegExp = /\{([^\(}]+)(\((.[^\)]*)\))?\}/g;
    private _regexOptionalParam:RegExp = /:([^:\(]+)(\((.[^\)]*)\))?:/g;

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
     * @property _isActive
     * @type Boolean
     * @default `false`
     * @private
     */
    private _isActive = false;

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
        var findForwardSlashes = new RegExp('\/', 'g');// Finds all forward slashes
        var selectFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
        var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
        var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons :

        // Remove first and last forward slash.
        path = path.replace(selectFirstOrLastForwardSlash, '');

        // Escape the forward slashes ( / ) so it will look like "\/"
        path = path.replace(findForwardSlashes, '\\/');

        // Make any :alphanumeric: optional
        path = path.replace(findOptionalColons,'([^/]*)');

        // Make any {alphanumeric} optional
        path = path.replace(findRequiredBrackets,'([^/]+)');

        // Convert the wild card * be a regex .* to trigger on all route changes.
        path = path.replace('*','.*');

        return new RegExp('^/?' + path + '/?$', 'i');
    }

    /**
     * Determine if route is active
     *
     * @method isActive
     * @returns {Boolean}
     */
    public isActive() {
        return this._isActive === true;
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
