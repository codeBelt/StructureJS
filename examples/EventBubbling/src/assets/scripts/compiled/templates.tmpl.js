this["JST"] = this["JST"] || {};

this["JST"]["templates/ContainerTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"container\">\n    <div class=\"container-hd\">\n        <p>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n    <div class=\"container-bd js-panelContent\">\n        <div class=\"splitPair\">\n            <span class=\"message js-message\">Event bubbled by.</span>\n            <input type=\"checkbox\" class=\"splitPair-input\"/>\n        </div>\n    </div>\n</div>";
},"useData":true});