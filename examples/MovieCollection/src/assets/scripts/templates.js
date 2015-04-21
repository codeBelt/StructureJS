define(['handlebars'], function (Handlebars) {

    this["JST"] = this["JST"] || {};

    this["JST"]["templates/ItemTemplate"] = Handlebars.template({
        "compiler": [6, ">= 2.0.0-beta.1"], "main": function (depth0, helpers, partials, data) {
            var helper, functionType = "function", helperMissing = helpers.helperMissing, escapeExpression = this.escapeExpression;
            return "<li class=\"media media_spaced\">\n    <div class=\"media-img\">\n        <img src=\""
                + escapeExpression(((helper = (helper = helpers.imgUrl || (depth0 != null ? depth0.imgUrl : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "imgUrl",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "\" alt=\""
                + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "title",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "\" />\n    </div>\n    <div class=\"media-bd\">\n        <div class=\"movie\">\n            <div class=\"movie-hd\">\n                <h2 class=\"hdg hdg_2\">"
                + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "title",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</h2>\n            </div>\n            <div class=\"movie-meta\">\n                <ul class=\"hList hList_spaced\">\n                    <li><span class=\"ratings mix-ratings_"
                + escapeExpression(((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || helperMissing).call(depth0, (depth0 != null ? depth0.criticsRating : depth0), {
                    "name": "removeSpaces",
                    "hash": {},
                    "data": data
                })))
                + "\">"
                + escapeExpression(((helper = (helper = helpers.criticsScore || (depth0 != null ? depth0.criticsScore : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "criticsScore",
                    "hash": {},
                    "data": data
                }) : helper)))
                + " - "
                + escapeExpression(((helper = (helper = helpers.criticsRating || (depth0 != null ? depth0.criticsRating : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "criticsRating",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</span></li>\n                    <li><span class=\"ratings mix-ratings_"
                + escapeExpression(((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || helperMissing).call(depth0, (depth0 != null ? depth0.audienceRating : depth0), {
                    "name": "removeSpaces",
                    "hash": {},
                    "data": data
                })))
                + "\">"
                + escapeExpression(((helper = (helper = helpers.audienceScore || (depth0 != null ? depth0.audienceScore : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "audienceScore",
                    "hash": {},
                    "data": data
                }) : helper)))
                + " - "
                + escapeExpression(((helper = (helper = helpers.audienceRating || (depth0 != null ? depth0.audienceRating : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "audienceRating",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</span></li>\n                    <li><span class=\"text text_label\">"
                + escapeExpression(((helper = (helper = helpers.mpaaRating || (depth0 != null ? depth0.mpaaRating : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "mpaaRating",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</span></li>\n                    <li><span class=\"text text_label\">"
                + escapeExpression(((helper = (helper = helpers.releaseDate || (depth0 != null ? depth0.releaseDate : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "releaseDate",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</span></li>\n                    <li><span class=\"text text_label\">"
                + escapeExpression(((helper = (helper = helpers.runtime || (depth0 != null ? depth0.runtime : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "runtime",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</span></li>\n                </ul>\n            </div>\n            <div class=\"movie-bd\">\n                <p class=\"text\">"
                + escapeExpression(((helper = (helper = helpers.synopsis || (depth0 != null ? depth0.synopsis : depth0)) != null ? helper : helperMissing), (typeof helper === functionType ? helper.call(depth0, {
                    "name": "synopsis",
                    "hash": {},
                    "data": data
                }) : helper)))
                + "</p>\n            </div>\n        </div>\n    </div>\n</li>\n";
        }, "useData": true
    });

    return this["JST"];

});
