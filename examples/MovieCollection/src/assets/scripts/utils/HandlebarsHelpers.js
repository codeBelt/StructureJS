define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var Handlebars = require('handlebars');

    /**
     * removeSpaces
     */
    Handlebars.registerHelper('removeSpaces', function(ratings) {
        if (ratings) {
            return ratings.replace(/\s+/g, '');
        } else {
            return ratings;
        }
    });

});
