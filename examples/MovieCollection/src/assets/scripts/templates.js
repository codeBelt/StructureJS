define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["templates/ItemTemplate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "    <li class=\"media media_spaced\">\n        <div class=\"media-img\">\n            <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.posters : depth0)) != null ? stack1.detailed : stack1), depth0))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\"/>\n        </div>\n        <div class=\"media-bd\">\n            <div class=\"movie\">\n                <div class=\"movie-hd\">\n                    <h2 class=\"hdg hdg_2\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n                </div>\n                <div class=\"movie-meta\">\n                    <ul class=\"hList hList_spaced\">\n                        <li><span class=\"ratings mix-ratings_"
    + escapeExpression(((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsRating : stack1), {"name":"removeSpaces","hash":{},"data":data})))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsScore : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.criticsRating : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"ratings mix-ratings_"
    + escapeExpression(((helpers.removeSpaces || (depth0 && depth0.removeSpaces) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceRating : stack1), {"name":"removeSpaces","hash":{},"data":data})))
    + "\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceScore : stack1), depth0))
    + " - "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.ratings : depth0)) != null ? stack1.audienceRating : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + escapeExpression(((helper = (helper = helpers.mpaaRating || (depth0 != null ? depth0.mpaaRating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"mpaaRating","hash":{},"data":data}) : helper)))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.releaseDates : depth0)) != null ? stack1.theater : stack1), depth0))
    + "</span></li>\n                        <li><span class=\"text text_label\">"
    + escapeExpression(((helpers.convertToHHMMSS || (depth0 && depth0.convertToHHMMSS) || helperMissing).call(depth0, (depth0 != null ? depth0.runtime : depth0), {"name":"convertToHHMMSS","hash":{},"data":data})))
    + "</span></li>\n                    </ul>\n                </div>\n                <div class=\"movie-bd\">\n                    <div class=\"shelf\">\n                        <p class=\"text\">"
    + escapeExpression(((helper = (helper = helpers.synopsis || (depth0 != null ? depth0.synopsis : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"synopsis","hash":{},"data":data}) : helper)))
    + "</p>\n                    </div>\n                    <ul class=\"\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.abridgedCast : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </ul>\n                </div>\n            </div>\n        </div>\n    </li>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "                            <li><span class=\"text text_2\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " as "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.characters : depth0)) != null ? stack1['0'] : stack1), depth0))
    + "</span></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["JST"]["templates/ModalTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"modal\">\n    <div class=\"modal-inner\">\n        <div class=\"modal-inner-hd\">\n            <h1 class=\"hdg hdg_2\">"
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "</h1>\n        </div>\n        <div class=\"modal-inner-bd\">\n            <p class=\"text\">There was an error loading the movies, please refresh your page and try again later.</p>\n        </div>\n    </div>\n</div>\n";
},"useData":true});

return this["JST"];

});