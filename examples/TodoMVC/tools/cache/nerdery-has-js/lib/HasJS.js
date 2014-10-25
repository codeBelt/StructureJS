'use strict';

var document = global.document;

/**
 * Replaces "no-js" class with "js" on the html element if JavaScript
 * is present. This allows you to style both the JavaScript enhanced
 * and non JavaScript experiences.
 *
 * @class HasJS
 * @static
 */
var HasJS = {
    init: function() {
        var element = document.documentElement;

        element.className = element.className.replace(
            /(^|\s)no-js(\s|$)/g, // find instances of 'no-js'
            '$1js$2'              // replace with 'js'
        );
    }
};

module.exports = HasJS;
