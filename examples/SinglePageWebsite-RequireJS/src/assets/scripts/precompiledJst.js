define(['handlebars'], function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["templates/precompile/login/LoginTemplate"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"wrapperFixed wrapper-primaryImage\">\n    <div class=\"frame\">\n        <div class=\"gapTop-primary smallPanel\">\n            <div class=\"well\">\n                <form novalidate=\"novalidate\" class=\"form-horizontal\">\n                    <h2 class=\"hd hd_3 text-center\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + " 1.0.0</h2>\n                    <div class=\"control-group\">\n                        <input class=\"required\" type=\"email\" placeholder=\"Email\" name=\"emailAddress\" value=\"\">\n                    </div>\n                    <div class=\"control-group\">\n                        <input class=\"required\" type=\"password\" placeholder=\"Password\" name=\"password\" value=\"\">\n                    </div>\n                    <div class=\"control-group\">\n                        <button type=\"submit\" class=\"btn btn-primary js-loginView-loginBtn\">Sign in</button>\n                    </div>\n                    <p><a href=\"#\" class=\"online-only\">Forgot your password?</a></p>\n                </form>\n            </div>\n            <!-- /well -->\n        </div>\n        <!-- /gapTop-primary -->\n    </div>\n    <!-- /frame -->\n</div>\n<!-- /wrapperBackground -->\n";
},"useData":true});

return this["JST"];

});