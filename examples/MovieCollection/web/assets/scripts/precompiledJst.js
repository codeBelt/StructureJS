this["JST"] = this["JST"] || {};

this["JST"]["templates/precompile/ErrorModal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"modal\">\n    <div class=\"modal-inner\">\n        <div class=\"modal-inner-hd\">\n            <h1 class=\"hdg hdg_2\">"
    + container.escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"error","hash":{},"data":data}) : helper)))
    + "</h1>\n        </div>\n        <div class=\"modal-inner-bd\">\n            <p class=\"text\">There was an error loading the movies, please refresh your page and try again later.</p>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

this["JST"]["templates/precompile/ItemTemplate"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {}, alias4=helpers.helperMissing, alias5="function";

  return "    <li class=\"media media_spaced\">\n        <div class=\"media-img\">\n            <img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.posters : depth0)) != null ? stack1.detailed : stack1), depth0))
    + "\" alt=\""
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n        </div>\n        <div class=\"media-bd\">\n            <div class=\"movie\">\n                <div class=\"movie-hd\">\n                    <h2 class=\"hdg hdg_2\">"
    + alias2(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n                </div>\n                <div class=\"movie-meta\">\n                    <ul class=\"hList hList_spaced\">\n                        <li><span class=\"ratings mix-ratings_"
    + alias2((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsRating : stack1),{"name":"removeSpaces","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsScore : stack1), depth0))
    + " - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsRating : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"ratings mix-ratings_"
    + alias2((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceRating : stack1),{"name":"removeSpaces","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceScore : stack1), depth0))
    + " - "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceRating : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + alias2(((helper = (helper = helpers.mpaaRating || (depth0 != null ? depth0.mpaaRating : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"mpaaRating","hash":{},"data":data}) : helper)))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.releaseDates : depth0)) != null ? stack1.theater : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + alias2((helpers.convertToHHMMSS || (depth0 && depth0.convertToHHMMSS) || alias4).call(alias3,(depth0 != null ? depth0.runtime : depth0),{"name":"convertToHHMMSS","hash":{},"data":data}))
    + "</span></li>\n                    </ul>\n                </div>\n                <div class=\"movie-bd\">\n                    <div class=\"shelf\">\n                        <p class=\"text\">"
    + alias2(((helper = (helper = helpers.synopsis || (depth0 != null ? depth0.synopsis : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"synopsis","hash":{},"data":data}) : helper)))
    + "</p>\n                    </div>\n                    <ul class=\"\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.abridgedCast : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "                            <li><span class=\"text text_2\">"
    + alias1(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"name","hash":{},"data":data}) : helper)))
    + " as "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.characters : depth0)) != null ? stack1["0"] : stack1), depth0))
    + "</span></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});