this["JST"] = this["JST"] || {};

this["JST"]["templates/precompile/DeviceButton"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"pad "
    + container.escapeExpression(((helper = (helper = helpers.buttonColor || (depth0 != null ? depth0.buttonColor : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"buttonColor","hash":{},"data":data}) : helper)))
    + "\"></div>";
},"useData":true});