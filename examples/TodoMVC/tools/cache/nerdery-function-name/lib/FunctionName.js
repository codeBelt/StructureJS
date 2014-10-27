/**
 * Polyfill for named functions.
 * http://stackoverflow.com/a/17056530
 */
(function() {
    'use strict';

    /**
     * Matches a function's name, if any.
     *
     * @type RegExp
     */
    var namePattern = /^\s*function\s*(\S*)\s*\(/;

    /**
     * Test function.
     *
     * @type Function
     */
    function f() {}

    if (!f.name && Object.defineProperty) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function() {
                var name = this.toString().match(namePattern)[1] || '';

                // For better performance only parse once, and then cache the
                // result through a new accessor for repeated access.
                Object.defineProperty(this, 'name', { value: name });

                return name;
            }
        });
    }
}());
