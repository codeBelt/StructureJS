this["JST"] = this["JST"] || {};
this["JST"]["templates/jst/GenericModal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "                    <button type=\"button\" class=\"btn js-modal-reject\">"
    + ((stack1 = ((helper = (helper = helpers.rejectBtn || (depth0 != null ? depth0.rejectBtn : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"rejectBtn","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"modal\">\n    <div class=\"modal-underlay js-modal-underlay\"></div>\n    <div class=\"modal-inner modal-inner_md js-modal-content\">\n        <button type=\"button\" class=\"modal-inner-close js-modal-close\">\n            <span class=\"icon icon_remove\">\n                <svg class=\"icon-inner\">\n                    <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-inner-remove\"></use>\n                </svg>\n            </span>\n        </button>\n        <div class=\"dialog\" tabindex=\"-1\" role=\"alertdialog\" aria-labelledby=\"dialog-hd\" aria-describedby=\"dialog-bd\" aria-live=\"assertive\">\n            <div class=\"dialog-hd\" id=\"dialog-hd\">\n                "
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n            <div class=\"dialog-bd\" id=\"dialog-bd\">\n                "
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n            </div>\n            <div class=\"dialog-ft\">\n                <div class=\"split split_equally\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.rejectBtn : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <button type=\"button\" class=\"btn js-modal-accept\">"
    + ((stack1 = ((helper = (helper = helpers.acceptBtn || (depth0 != null ? depth0.acceptBtn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"acceptBtn","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});