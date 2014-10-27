this["JST"] = this["JST"] || {};

this["JST"]["templates/ListItemTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <div class=\"view\">\n        <input class=\"toggle js-markComplete\" type=\"checkbox\">\n        <label class=\"js-editTodo\">"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</label>\n        <button class=\"destroy js-removeTodo\"></button>\n    </div>\n    <input class=\"edit js-itemText\" value=\""
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "\">\n</li>";
},"useData":true});