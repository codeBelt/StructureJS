define(function (require, exports, module) { // jshint ignore:line
    'use strict';

    var NumberUtil = require('structurejs/util/NumberUtil');
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

    /**
     * convertToHHMMSS
     */
    Handlebars.registerHelper('convertToHHMMSS', function(minutes) {
        if (minutes) {
            return  NumberUtil.convertToHHMMSS(minutes);
        } else {
            return minutes;
        }
    });

});
