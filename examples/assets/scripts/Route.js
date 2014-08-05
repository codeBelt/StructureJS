define(["require", "exports"], function(require, exports) {
    var Route = (function () {
        function Route(path, callback, scope) {
            // Regexps
            this._regexSlashes = /(^\/+|\/+$)/g;
            this._regexOptionalSlash = /(:|})\/:/g;
            this._regexParam = /\{([^\(}]+)(\((.[^\)]*)\))?\}/g;
            this._regexOptionalParam = /:([^:\(]+)(\((.[^\)]*)\))?:/g;
            /**
            * @type Number
            */
            this.INDEX_NOT_FOUND = -1;
            /**
            * @property name
            * @type String
            */
            this.name = '';
            /**
            * @property path
            * @type String
            */
            this.path = '';
            /**
            * @property patterns
            * @type Object
            */
            this.patterns = {};
            /**
            * @property regex
            * @type RegExp
            */
            this.regex = null;
            /**
            * @property _isActive
            * @type Boolean
            * @default `false`
            * @private
            */
            this._isActive = false;
            /**
            * @property _previousParams
            * @type String
            * @private
            */
            this._previousParams = '';
            /**
            * YUIDoc_comment
            *
            * @property callback
            * @type {Function}
            * @public
            */
            this.callback = null;
            /**
            * YUIDoc_comment
            *
            * @property callbackScope
            * @type {any}
            * @public
            */
            this.callbackScope = null;
            this.regex = this.pathToRegexp(this.path);
            console.log("this.regex", this.regex);
            this.callback = callback;
            this.callbackScope = scope;
            //        this.path.replace(this._regexSlashes, '');
            //
            //        cleanup path by removed quantifiers
            //        this.path = this.path.replace(this._regexParam, '{$1}')
            //            .replace(this._regexOptionalParam, ':$1:');
        }
        /**
        * Convert path to regexp
        *
        * @type Function
        * @param {String} path
        * @returns {RegExp}
        * @private
        */
        Route.prototype.pathToRegexp = function (path) {
            var optionalForwardSlash = new RegExp('(\/)?');
            var findForwardSlashes = new RegExp('\/', 'g');
            var selectFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g');
            var findRequiredBrackets = new RegExp('\{([^}]+)\}', 'g');
            var findOptionalColons = new RegExp(':([^:]*):', 'g');

            path = path.replace(selectFirstOrLastForwardSlash, ''); // Remove first and last forward slash.
            console.log(path);
            path = path.replace(findForwardSlashes, '\\/'); // Escape the forward slashes ( / ) so it will look like "\/" so that it will be used a literal forward slash.
            console.log(path);
            path = path.replace(findOptionalColons, '(\\w*)');
            console.log(path);

            return new RegExp('^/?' + path + '/?$', 'i');
        };

        //    /**
        //     * Publish enter event
        //     *
        //     * @fires Route#EVENT_ENTER
        //     *
        //     * @method enter
        //     * @param {Array} [params]
        //     * @chainable
        //     */
        //    public enter(params) {
        //        var stringParams = JSON.stringify(params);
        //
        //        if (stringParams === this._previousParams) {
        //            return this;
        //        }
        //
        //        this._previousParams = stringParams;
        //        this._isActive = true;
        //
        //        params = params || [];
        //
        //        params.unshift(this.name);
        //
        //        console.log("publish", params);
        //        return this//.publish.apply(this, params);
        //    }
        //
        //    /**
        //     * Publish exit event
        //     *
        //     * @fires Route#EVENT_EXIT
        //     *
        //     * @method exit
        //     * @chainable
        //     */
        //    public exit() {
        //        this._previousParams = null;
        //        this._isActive = false;
        //
        //        console.log("publish", this.name);
        //
        //        return this//.publish(this.EVENT_EXIT, this.name);
        //    }
        /**
        * Determine if route is active
        *
        * @method isActive
        * @returns {Boolean}
        */
        Route.prototype.isActive = function () {
            return this._isActive === true;
        };

        //    /**
        //     * Determine if route matches `path`
        //     *
        //     * @method getParameters
        //     * @param {String} path
        //     * @returns {Array}
        //     */
        //    public getParameters(path) {
        //        var match = this.regex.exec(path);
        //        var params = [];
        //        var length = match && match.length;
        //
        //        for (var i = 1; i < length; ++i) {
        //            params.push(('string' === typeof match[i]) ? decodeURIComponent(match[i]) : match[i]);
        //        }
        //
        //        return params;
        //    }
        /**
        * Determine if route matches `path`
        *
        * @method match
        * @param {String} path
        * @returns {Boolean}
        */
        Route.prototype.match = function (path) {
            return this.regex.test(path);
        };
        return Route;
    })();
    
    return Route;
});
