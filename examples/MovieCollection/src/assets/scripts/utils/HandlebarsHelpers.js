import NumberUtil from 'structurejs/util/NumberUtil';

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
