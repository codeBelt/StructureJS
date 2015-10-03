/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Handlebars=a.Handlebars||b()}(this,function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return i[a]}function c(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function d(a){return a instanceof h?a.toString():null==a?"":a?(a=""+a,k.test(a)?a.replace(j,b):a):a+""}function e(a){return a||0===a?n(a)&&0===a.length?!0:!1:!0}function f(a,b){return(a?a+".":"")+b}var g={},h=a,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j=/[&<>"'`]/g,k=/[&<>"'`]/;g.extend=c;var l=Object.prototype.toString;g.toString=l;var m=function(a){return"function"==typeof a};m(/x/)&&(m=function(a){return"function"==typeof a&&"[object Function]"===l.call(a)});var m;g.isFunction=m;var n=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===l.call(a):!1};return g.isArray=n,g.escapeExpression=d,g.isEmpty=e,g.appendContextPath=f,g}(a),c=function(){"use strict";function a(a,b){var d;b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new g("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(k(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=q(c.data);g.contextPath=f.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){if(!b)throw new g("Must pass iterator to #each");var c,d,e=b.fn,h=b.inverse,i=0,j="";if(b.data&&b.ids&&(d=f.appendContextPath(b.data.contextPath,b.ids[0])+"."),l(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(k(a))for(var m=a.length;m>i;i++)c&&(c.index=i,c.first=0===i,c.last=i===a.length-1,d&&(c.contextPath=d+i)),j+=e(a[i],{data:c});else for(var n in a)a.hasOwnProperty(n)&&(c&&(c.key=n,c.index=i,c.first=0===i,d&&(c.contextPath=d+n)),j+=e(a[n],{data:c}),i++);return 0===i&&(j=h(this)),j}),a.registerHelper("if",function(a,b){return l(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||f.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){l(a)&&(a=a.call(this));var c=b.fn;if(f.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=q(b.data);d.contextPath=f.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}var e={},f=a,g=b,h="2.0.0";e.VERSION=h;var i=6;e.COMPILER_REVISION=i;var j={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};e.REVISION_CHANGES=j;var k=f.isArray,l=f.isFunction,m=f.toString,n="[object Object]";e.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:o,log:p,registerHelper:function(a,b){if(m.call(a)===n){if(b)throw new g("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){m.call(a)===n?f.extend(this.partials,a):this.partials[a]=b},unregisterPartial:function(a){delete this.partials[a]}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(o.level<=a){var c=o.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};e.logger=o;var p=o.log;e.log=p;var q=function(a){var b=f.extend({},a);return b._parent=a,b};return e.createFrame=q,e}(b,c),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=m;if(b!==c){if(c>b){var d=n[c],e=n[b];throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new l("No environment passed to template");if(!a||!a.main)throw new l("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var c=function(c,d,e,f,g,h,i,j,m){g&&(f=k.extend({},f,g));var n=b.VM.invokePartial.call(this,c,e,f,h,i,j,m);if(null==n&&b.compile){var o={helpers:h,partials:i,data:j,depths:m};i[e]=b.compile(c,{data:void 0!==j,compat:a.compat},b),n=i[e](f,o)}if(null!=n){if(d){for(var p=n.split("\n"),q=0,r=p.length;r>q&&(p[q]||q+1!==r);q++)p[q]=d+p[q];n=p.join("\n")}return n}throw new l("The partial "+e+" could not be compiled when running in runtime-only mode")},d={lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:k.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c){var d=this.programs[a],e=this.fn(a);return b||c?d=f(this,a,e,b,c):d||(d=this.programs[a]=f(this,a,e)),d},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=k.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;e._setup(c),!c.partial&&a.useData&&(f=i(b,f));var g;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(d,b,d.helpers,d.partials,f,g)};return e.isTop=!0,e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(b,c,e){if(a.useDepths&&!e)throw new l("must pass parent depths");return f(d,b,a[b],c,e)},e}function f(a,b,c,d,e){var f=function(b,f){return f=f||{},c.call(a,b,a.helpers,a.partials,f.data||d,e&&[b].concat(e))};return f.program=b,f.depth=e?e.length:0,f}function g(a,b,c,d,e,f,g){var h={partial:!0,helpers:d,partials:e,data:f,depths:g};if(void 0===a)throw new l("The partial "+b+" could not be found");return a instanceof Function?a(c,h):void 0}function h(){return""}function i(a,b){return b&&"root"in b||(b=b?o(b):{},b.root=a),b}var j={},k=a,l=b,m=c.COMPILER_REVISION,n=c.REVISION_CHANGES,o=c.createFrame;return j.checkRevision=d,j.template=e,j.program=f,j.invokePartial=g,j.noop=h,j}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.escapeExpression=j.escapeExpression,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,m["default"]=m,f=m}(d,a,c,b,e);return f});;this["JST"] = this["JST"] || {};

this["JST"]["templates/login/LoginTemplate"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"wrapperFixed wrapper-primaryImage\">\n    <div class=\"frame\">\n        <div class=\"gapTop-primary smallPanel\">\n            <div class=\"well\">\n                <form novalidate=\"novalidate\" class=\"form-horizontal\">\n                    <h2 class=\"hd hd_3 text-center\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n                    <div class=\"control-group\">\n                        <input class=\"required\" type=\"email\" placeholder=\"Email\" name=\"emailAddress\" value=\"\">\n                    </div>\n                    <div class=\"control-group\">\n                        <input class=\"required\" type=\"password\" placeholder=\"Password\" name=\"password\" value=\"\">\n                    </div>\n                    <div class=\"control-group\">\n                        <button type=\"submit\" class=\"btn btn-primary js-loginBtn\">Sign in</button>\n                    </div>\n                    <p><a href=\"#\" class=\"online-only\">Forgot your password?</a></p>\n                </form>\n            </div>\n            <!-- /well -->\n        </div>\n        <!-- /gapTop-primary -->\n    </div>\n    <!-- /frame -->\n</div>\n<!-- /wrapperBackground -->\n";
},"useData":true});;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Stage = require('../vendor/structurejs/ts/display/Stage');
var BaseEvent = require('../vendor/structurejs/ts/event/BaseEvent');
var EventBroker = require('../vendor/structurejs/ts/event/EventBroker');
var GrandparentView = require('./view/GrandparentView');
/**
 * TODO: YUIDoc_comment
 *
 * @class EventBubblingApp
 * @extends Stage
 * @constructor
 **/
var EventBubblingApp = (function (_super) {
    __extends(EventBubblingApp, _super);
    function EventBubblingApp() {
        _super.call(this);
        this._grandpaView = null;
        this._$clearButton = null;
        this._$stageMessage = null;
        this._onGlobalEvent = function (baseEvent) {
            console.log("Global event dispatched", baseEvent);
        };
    }
    /**
     * @overridden EventBubblingApp.create
     */
    EventBubblingApp.prototype.create = function () {
        _super.prototype.create.call(this);
        this._grandpaView = new GrandparentView(this.$element.find('.js-grandParentContent'));
        this.addChild(this._grandpaView);
        this._$clearButton = this.$element.find('.js-clearButton');
        this._$stageMessage = this.$element.find('.js-stageMessage');
    };
    /**
     * @overridden Stage.layout
     */
    EventBubblingApp.prototype.layout = function () {
        this._$stageMessage.text('');
        this._grandpaView.layout();
        return this;
    };
    /**
     * @overridden Stage.enable
     */
    EventBubblingApp.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        EventBroker.addEventListener(BaseEvent.CHANGE, this._onGlobalEvent, this);
        this._$clearButton.addEventListener('click', this._onClearClick, this);
        this._grandpaView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden Stage.disable
     */
    EventBubblingApp.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._$clearButton.removeEventListener('click', this._onClearClick, this);
        this._grandpaView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden Stage.destroy
     */
    EventBubblingApp.prototype.destroy = function () {
        this._grandpaView.destroy();
        _super.prototype.destroy.call(this);
    };
    EventBubblingApp.prototype._onClearClick = function (event) {
        this.layout();
    };
    EventBubblingApp.prototype._onBubbled = function (baseEvent) {
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$stageMessage.html(text);
    };
    return EventBubblingApp;
})(Stage);
module.exports = EventBubblingApp;

},{"../vendor/structurejs/ts/display/Stage":11,"../vendor/structurejs/ts/event/BaseEvent":12,"../vendor/structurejs/ts/event/EventBroker":13,"./view/GrandparentView":4}],2:[function(require,module,exports){
// Imports
var $ = (window.$);
var EventBubblingApp = require('./EventBubblingApp');
$(document).ready(function () {
    var app = new EventBubblingApp();
    app.appendTo('body'); // Need to specify what area our code has control over.
    // The EventBubblingApp.js class extends Stage which has the appendTo method.
    // Note: On typical website you may want to set it as 'body' do you have control over the whole page.
    window['app'] = app;
});

},{"./EventBubblingApp":1}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var EventBroker = require('../../vendor/structurejs/ts/event/EventBroker');
/**
 * TODO: YUIDoc_comment
 *
 * @class ChildView
 * @extends DOMElement
 * @constructor
 **/
var ChildView = (function (_super) {
    __extends(ChildView, _super);
    function ChildView($element) {
        _super.call(this, $element);
        this._$dispatchButton = null;
        this._$sonMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    ChildView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._$dispatchButton = this.$element.find('.js-dispatchButton');
        this._$sonMessage = this.$element.find('.js-childMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    ChildView.prototype.layout = function () {
        this._$sonMessage.text('');
        this._$checkbox.prop('checked', false);
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    ChildView.prototype.enable = function () {
        if (this.isEnabled === true)
            return;
        this._$dispatchButton.addEventListener('click', this._onButtonClick, this);
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    ChildView.prototype.disable = function () {
        if (this.isEnabled === false)
            return;
        this._$dispatchButton.removeEventListener('click', this._onButtonClick, this);
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    ChildView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    ChildView.prototype._onButtonClick = function (event) {
        event.preventDefault();
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> sent the event.';
        this._$sonMessage.html(text);
        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true));
        EventBroker.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
    };
    return ChildView;
})(DOMElement);
module.exports = ChildView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"../../vendor/structurejs/ts/event/EventBroker":13}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var ParentView = require('./ParentView');
/**
 * TODO: YUIDoc_comment
 *
 * @class GrandparentView
 * @extends DOMElement
 * @constructor
 **/
var GrandparentView = (function (_super) {
    __extends(GrandparentView, _super);
    function GrandparentView($element) {
        _super.call(this, $element);
        this._parentView = null;
        this._$grandparentMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    GrandparentView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._parentView = new ParentView(this.$element.find('.js-parentContent'));
        this.addChild(this._parentView);
        this._$grandparentMessage = this.$element.find('.js-grandparentMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    GrandparentView.prototype.layout = function () {
        this._$grandparentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._parentView.layout();
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    GrandparentView.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._parentView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    GrandparentView.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._parentView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    GrandparentView.prototype.destroy = function () {
        this._parentView.destroy();
        _super.prototype.destroy.call(this);
    };
    GrandparentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');
        if (checkbox === true) {
            baseEvent.stopPropagation();
        }
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$grandparentMessage.html(text);
    };
    return GrandparentView;
})(DOMElement);
module.exports = GrandparentView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"./ParentView":5}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DOMElement = require('../../vendor/structurejs/ts/display/DOMElement');
var BaseEvent = require('../../vendor/structurejs/ts/event/BaseEvent');
var ChildView = require('./ChildView');
/**
 * TODO: YUIDoc_comment
 *
 * @class ParentView
 * @extends DOMElement
 * @constructor
 **/
var ParentView = (function (_super) {
    __extends(ParentView, _super);
    function ParentView($element) {
        _super.call(this, $element);
        this._childView = null;
        this._$parentMessage = null;
        this._$checkbox = null;
    }
    /**
     * @overridden DOMElement.create
     */
    ParentView.prototype.create = function () {
        _super.prototype.create.call(this);
        this._childView = new ChildView(this.$element.find('.js-childContent'));
        this.addChild(this._childView);
        this._$parentMessage = this.$element.find('.js-parentMessage');
        this._$checkbox = this.$element.find('[type=checkbox]').first();
    };
    /**
     * @overridden DOMElement.layout
     */
    ParentView.prototype.layout = function () {
        this._$parentMessage.text('');
        this._$checkbox.prop('checked', false);
        this._childView.layout();
        return this;
    };
    /**
     * @overridden DOMElement.enable
     */
    ParentView.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.addEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._childView.enable();
        return _super.prototype.enable.call(this);
    };
    /**
     * @overridden DOMElement.disable
     */
    ParentView.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.removeEventListener(BaseEvent.CHANGE, this._onBubbled, this);
        this._childView.disable();
        return _super.prototype.disable.call(this);
    };
    /**
     * @overridden DOMElement.destroy
     */
    ParentView.prototype.destroy = function () {
        this._childView.destroy();
        _super.prototype.destroy.call(this);
    };
    ParentView.prototype._onBubbled = function (baseEvent) {
        var checkbox = this.$element.find('[type=checkbox]').first().prop('checked');
        if (checkbox === true) {
            baseEvent.stopPropagation();
        }
        var text = '<strong>' + this.getQualifiedClassName() + '</strong> recevied a event.<br/ >';
        text += '<strong>' + baseEvent.currentTarget.getQualifiedClassName() + '</strong> last touched the event.<br/ >';
        text += '<strong>' + baseEvent.target.getQualifiedClassName() + '</strong> sent the event.';
        this._$parentMessage.html(text);
    };
    return ParentView;
})(DOMElement);
module.exports = ParentView;

},{"../../vendor/structurejs/ts/display/DOMElement":8,"../../vendor/structurejs/ts/event/BaseEvent":12,"./ChildView":3}],6:[function(require,module,exports){
///<reference path='_declare/jquery.d.ts'/>
///<reference path='_declare/handlebars.d.ts'/>
///<reference path='_declare/greensock.d.ts'/>
///<reference path='_declare/jquery.eventListener.d.ts'/>
///<reference path='_declare/log.d.ts'/>
'use strict';
/*
 UMD Stuff
 @import ./util/Util as Util
 @export BaseObject
 */
var Util = require('./util/Util');
/**
 * The {{#crossLink "BaseObject"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes.
 *
 * @class BaseObject
 * @module StructureJS
 * @submodule core
 * @requires Util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var BaseObject = (function () {
    function BaseObject() {
        /**
         * The cid (client-side id) is a unique identifier automatically assigned to most StructureJS objects upon instantiation.
         *
         * @property cid
         * @type {int}
         * @default null
         * @writeOnce
         * @readOnly
         * @public
         */
        this.cid = null;
        this.cid = Util.uniqueId();
    }
    /**
     * Returns the fully qualified class name of an object.
     *
     * @method getQualifiedClassName
     * @returns {string} Returns the class name.
     * @public
     * @example
     *     instance.getQualifiedClassName();
     */
    BaseObject.prototype.getQualifiedClassName = function () {
        return Util.getClassName(this);
    };
    /**
     * The purpose of the destroy method is to make an object ready for garbage collection. This
     * should be thought of as a one way function. Once destroy is called no further methods should be
     * called on the object or properties accessed. It is the responsibility of those who implement this
     * function to stop all running Timers, all running Sounds, and take any other steps necessary to make an
     * object eligible for garbage collection.
     *
     * By default the destroy method will null out all properties of the class automatically. You should call destroy
     * on other objects before calling the super.
     *
     * @method destroy
     * @return {void}
     * @public
     * @example
     *     ClassName.prototype.destroy = function() {
     *          this._childInstance.destroy();
     *
     *          _super.prototype.destroy.call(this);
     *     }
     */
    BaseObject.prototype.destroy = function () {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this[key] = null;
            }
        }
    };
    return BaseObject;
})();
module.exports = BaseObject;

},{"./util/Util":19}],7:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ./util/Extend as Extend
 @import ./BaseObject as BaseObject
 @export ObjectManager
 */
var BaseObject = require('./BaseObject');
/**
 * The {{#crossLink "ObjectManager"}}{{/crossLink}} class is an abstract class that provides enabling and disabling functionality for most StructureJS classes.
 *
 * @class ObjectManager
 * @module StructureJS
 * @extends BaseObject
 * @submodule core
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var ObjectManager = (function (_super) {
    __extends(ObjectManager, _super);
    function ObjectManager() {
        _super.call(this);
        /**
         * The isEnabled property is used to keep track of the enabled state of the object.
         *
         * @property isEnabled
         * @type {boolean}
         * @default false
         * @protected
         */
        this.isEnabled = false;
    }
    /**
     * The enable method is responsible for enabling event listeners and/or children of the containing objects.
     *
     * @method enable
     * @public
     * @chainable
     * @example
     *     ClassName.prototype.enable = function() {
     *          if (this.isEnabled === true) { return this; }
     *
     *          this._childInstance.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.enable();
     *
     *          return _super.prototype.enable.call(this);
     *     }
     */
    ObjectManager.prototype.enable = function () {
        if (this.isEnabled === true) {
            return this;
        }
        this.isEnabled = true;
        return this;
    };
    /**
     * The disable method is responsible for disabling event listeners and/or children of the containing objects.
     *
     * @method disable
     * @public
     * @chainable
     * @example
     *      ClassName.prototype.disable = function() {
     *          if (this.isEnabled === false) { return this; }
     *
     *          this._childInstance.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *          this._childInstance.disable();
     *
     *          return _super.prototype.disable.call(this);
     *      }
     */
    ObjectManager.prototype.disable = function () {
        if (this.isEnabled === false) {
            return this;
        }
        this.isEnabled = false;
        return this;
    };
    return ObjectManager;
})(BaseObject);
module.exports = ObjectManager;

},{"./BaseObject":6}],8:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../display/DisplayObjectContainer as DisplayObjectContainer
 @import ../event/BaseEvent as BaseEvent
 @import ../util/TemplateFactory as TemplateFactory
 @import ../util/ComponentFactory as ComponentFactory
 @import ../plugin/jquery.eventListener as jQuery
 @export DOMElement
 */
var DisplayObjectContainer = require('./DisplayObjectContainer');
var BaseEvent = require('../event/BaseEvent');
var TemplateFactory = require('../util/TemplateFactory');
var ComponentFactory = require('../util/ComponentFactory');
var jQuery = require('../plugin/jquery.eventListener');
/**
 * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
 *
 * @class DOMElement
 * @param type [any=null] Either a jQuery object or JavaScript template string reference you want to use as the view. Check out the examples below.
 * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
 * @extends DisplayObjectContainer
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObjectContainer
 * @requires BaseEvent
 * @requires TemplateFactory
 * @requires ComponentFactory
 * @requires jQuery
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: Using DOMElement without extending it.
 *     var aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
 *     this.addChild(aLink);
 *
 *     // Example: A view passing in a jQuery object.
 *     var view = new CustomView($('.selector'));
 *     this.addChild(view);
 *
 *     // Example: A view extending DOMElement while passing in a jQuery object.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName($element) {
 *              _super.call(this, $element);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this);
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prevent memory leaks.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 *
 *     // Example: A view extending DOMElement with a JavaScript template reference passed in.
 *     var Extend = require('structurejs/util/Extend');
 *     var DOMElement = require('structurejs/display/DOMElement');
 *     var HomeTemplate = require('hbs!templates/home/homeTemplate');
 *
 *     var ClassName = (function () {
 *
 *          var _super = Extend(ClassName, DOMElement);
 *
 *          function ClassName() {
 *              _super.call(this);
 *          }
 *
 *          ClassName.prototype.create = function () {
 *              _super.prototype.create.call(this, HomeTemplate, {data: 'some data'});
 *
 *              // Create and add your child objects to this parent class.
 *          };
 *
 *          ClassName.prototype.enable = function () {
 *              if (this.isEnabled === true) { return this; }
 *
 *              // Enable the child objects and add any event listeners.
 *
 *              return _super.prototype.enable.call(this);
 *          };
 *
 *          ClassName.prototype.disable = function () {
 *              if (this.isEnabled === false) { return this; }
 *
 *              // Disable the child objects and remove any event listeners.
 *
 *              return _super.prototype.disable.call(this);
 *          };
 *
 *          ClassName.prototype.layout = function () {
 *              // Layout or update the child objects in this parent class.
 *
 *              return this;
 *          };
 *
 *          ClassName.prototype.destroy = function () {
 *              // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *              _super.prototype.destroy.call(this);
 *          };
 *
 *          return ClassName;
 *     })();
 */
var DOMElement = (function (_super) {
    __extends(DOMElement, _super);
    function DOMElement(type, params) {
        if (type === void 0) { type = null; }
        if (params === void 0) { params = null; }
        _super.call(this);
        /**
         * Tracks number of times an element's width has been checked
         * in order to determine if the element has been added
         * to the DOM.
         *
         * @property checkCount
         * @type {number}
         * @public
         */
        this.checkCount = 0;
        /**
         * A cached reference to the DOM Element
         *
         * @property element
         * @type {HTMLElement}
         * @default null
         * @public
         */
        this.element = null;
        /**
         * A cached reference to the jQuery DOM element
         *
         * @property $element
         * @type {JQuery}
         * @default null
         * @public
         */
        this.$element = null;
        /**
         * If a jQuery object was passed into the constructor this will be set as true and
         * this class will not try to add the view to the DOM since it already exists.
         *
         * @property _isReference
         * @type {boolean}
         * @private
         */
        this._isReference = false;
        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _type
         * @type {string}
         * @default null
         * @private
         */
        this._type = null;
        /**
         * Holds onto the value passed into the constructor.
         *
         * @property _params
         * @type {any}
         * @default null
         * @private
         */
        this._params = null;
        if (type instanceof jQuery) {
            this.$element = type;
            this.element = this.$element[0];
            this._isReference = true;
        }
        else if (type) {
            this._type = type;
            this._params = params;
        }
    }
    /**
     * The create function is intended to provide a consistent place for the creation and adding
     * of children to the view. It will automatically be called the first time that the view is added
     * to another DisplayObjectContainer. It is critical that all subclasses call the super for this function in
     * their overridden methods.
     *
     * This method gets called once when the child view is added to another view. If the child view is removed
     * and added to another view the create method will not be called again.
     *
     * @method create
     * @param type [string=div] The HTML tag you want to create or the id/class selector of the template or the pre-compiled path to a template.
     * @param params [any=null] Any data you would like to pass into the jQuery element or template that is being created.
     * @returns {DOMElement} Returns an instance of itself.
     * @public
     * @chainable
     * @example
     *     // EXAMPLE 1: By default your view class will be a div element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this._childInstance = new DOMElement();
     *          this.addChild(this._childInstance);
     *     }
     *
     *     // EXAMPLE 2: But lets say you wanted the view to be a ul element:
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul');
     *     }
     *
     *     // Then you could nest other elements inside this base view/element.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'ul', {id: 'myId', 'class': 'myClass anotherClass'});
     *
     *          var li = new DOMElement('li', {text: 'Robert is cool'});
     *          this.addChild(li);
     *     }
     *
     *     // EXAMPLE 3: So that's cool but what if you wanted a block of html to be your view. Let's say you had the below
     *     // inline Handlebar template in your html file.
     *     <script id="todoTemplate" type="text/template">
     *          <div id="htmlTemplate" class="js-todo">
     *              <div id="input-wrapper">
     *                  <input type="text" class="list-input" placeholder="{{ data.text }}">
     *                  <input type="button" class="list-item-submit" value="Add">
     *              </div>
     *          </div>
     *     </script>
     *
     *     // You would just pass in the id or class selector of the template which in this case is "#todoTemplate".
     *     // There is a second optional argument where you can pass data for the Handlebar template to use.
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, '#todoTemplate', { data: this.viewData });
     *
     *     }
     *
     *     // EXAMPLE 4: Let's say you wanted to use the Handlebar plugin within RequireJS. You can pass the template into create.
     *     var HomeTemplate = require('hbs!templates/HomeTemplate');
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, HomeTemplate, {data: "some data"});
     *
     *     }
     *
     *     // EXAMPLE 5: Or maybe you're using grunt-contrib-handlebars, or similar, to precompile hbs templates
     *     require('templates'); // templates.js
     *
     *     ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this, 'templates/HomeTemplate', {data: "some data"});
     *
     *     }
     */
    DOMElement.prototype.create = function (type, params) {
        if (type === void 0) { type = 'div'; }
        if (params === void 0) { params = null; }
        // Use the data passed into the constructor first else use the arguments from create.
        type = this._type || type;
        params = this._params || params;
        if (this.isCreated === true) {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot call the create method manually. It is only called once automatically during the view lifecycle and should only be called once.');
        }
        if (this.$element == null) {
            var html = TemplateFactory.create(type, params);
            if (html) {
                this.$element = jQuery(html);
            }
            else {
                this.$element = jQuery("<" + type + "/>", params);
            }
        }
        this.element = this.$element[0];
        this.width = this.$element.width();
        this.height = this.$element.height();
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.addChild
     * @method addChild
     * @param child {DOMElement} The DOMElement instance to add as a child of this object instance.
     * @returns {DOMElement} Returns an instance of itself.
     * @chainable
     * @example
     *     container.addChild(domElementInstance);
     */
    DOMElement.prototype.addChild = function (child) {
        _super.prototype.addChild.call(this, child);
        if (this.$element == null) {
            throw new Error('[' + this.getQualifiedClassName() + '] You cannot use the addChild method if the parent object is not added to the DOM.');
        }
        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0) {
            return this;
        }
        if (child.isCreated === false) {
            child.create(); // Render the item before adding to the DOM
            child.isCreated = true;
        }
        // If the child object is not a reference of a jQuery object in the DOM then append it.
        if (child._isReference === false) {
            this.$element.append(child.$element);
        }
        this.onAddedToDom(child);
        return this;
    };
    /**
     * Adds the cid to the DOM element so we can know what what Class object the element belongs too.
     *
     * @method addClientSideId
     * @param child {DOMElement} The DOMElement instance to add the cid too.
     * @private
     */
    DOMElement.prototype.addClientSideId = function (child) {
        /* TODO: Calling the getChild method there is a chance that multiple DOMElement's have a reference to the same HTMLElement
         * in the DOM causing the cid to be overwritten with a new cid. Probably should handle that.
         */
        child.$element.attr('data-cid', child.cid);
    };
    /**
     * Called when the child object is added to the DOM.
     * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
     *
     * @method onDomAdded
     * @private
     */
    DOMElement.prototype.onAddedToDom = function (child) {
        var _this = this;
        child.checkCount++;
        if (child.$element.width() === 0 && child.checkCount < 5) {
            setTimeout(function () {
                _this.onAddedToDom(child);
            }, 100);
            return;
        }
        this.addClientSideId(child);
        child.width = child.$element.width();
        child.height = child.$element.height();
        child.enable();
        child.layout();
        child.dispatchEvent(new BaseEvent(BaseEvent.ADDED_TO_STAGE));
    };
    /**
     * @overridden DisplayObjectContainer.addChildAt
     */
    DOMElement.prototype.addChildAt = function (child, index) {
        var children = this.$element.children();
        var length = children.length;
        // If an empty jQuery object is passed into the constructor then don't run the code below.
        if (child._isReference === true && child.$element.length === 0) {
            return this;
        }
        // If the index passed in is less than 0 and greater than
        // the total number of children then place the item at the end.
        if (index < 0 || index >= length) {
            this.addChild(child);
        }
        else {
            if (child.isCreated === false) {
                child.create(); // Render the item before adding to the DOM
                child.isCreated = true;
            }
            // Adds the child at a specific index but also will remove the child from another parent object if one exists.
            _super.prototype.addChildAt.call(this, child, index);
            // Adds the child before any child already added in the DOM.
            jQuery(children.get(index)).before(child.$element);
            this.onAddedToDom(child);
        }
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.swapChildren
     */
    DOMElement.prototype.swapChildren = function (child1, child2) {
        var child1Index = child1.$element.index();
        var child2Index = child2.$element.index();
        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.getChildAt
     */
    DOMElement.prototype.getChildAt = function (index) {
        return _super.prototype.getChildAt.call(this, index);
    };
    /**
     * Returns a DOMElement object with the first found DOM element by the passed in selector.
     *
     * @method getChild
     * @param selector {string} DOM id name, DOM class name or a DOM tag name.
     * @returns {DOMElement}
     * @public
     */
    DOMElement.prototype.getChild = function (selector) {
        // Get the first match from the selector passed in.
        var jQueryElement = this.$element.find(selector).first();
        if (jQueryElement.length === 0) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
        }
        // Check to see if the element has a cid value and is a child of this parent object.
        var cid = jQueryElement.data('cid');
        var domElement = this.getChildByCid(cid);
        // Creates a DOMElement from the jQueryElement.
        if (domElement == null) {
            // Create a new DOMElement and assign the jQuery element to it.
            domElement = new DOMElement();
            domElement.$element = jQueryElement;
            domElement.$element.attr('data-cid', domElement.cid);
            domElement.element = jQueryElement[0];
            domElement.isCreated = true;
            // Added to the super addChild method because we don't need to append the element to the DOM.
            // At this point it already exists and we are just getting a reference to the DOM element.
            _super.prototype.addChild.call(this, domElement);
        }
        return domElement;
    };
    /**
     * Gets all the HTML elements children of this object.
     *
     * @method getChildren
     * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children of this parent element.
     * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
     * If the 'data-cid' property exists is on an HTML element a DOMElement will not be created for that element because it will be assumed it already exists as a DOMElement.
     * @public
     */
    DOMElement.prototype.getChildren = function (selector) {
        if (selector === void 0) { selector = ''; }
        //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
        var $child;
        var domElement;
        var $list = this.$element.children(selector);
        var listLength = $list.length;
        for (var i = 0; i < listLength; i++) {
            $child = jQuery($list[i]);
            // If the jQuery element already has cid data property then it must be an existing DisplayObjectContainer (DOMElement) in the children array.
            if (!$child.data('cid')) {
                domElement = new DOMElement();
                domElement.$element = $child;
                domElement.$element.attr('data-cid', domElement.cid);
                domElement.element = $child.get(0);
                domElement.isCreated = true;
                // Added to the super addChild method because we don't need to append the element to the DOM.
                // At this point it already exists and we are just getting a reference to the DOM element.
                _super.prototype.addChild.call(this, domElement);
            }
        }
        return this.children;
    };
    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null and the object is garbage collected if there are no other references
     * to the child. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DOMElement} The DisplayObjectContainer instance to remove.
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChild = function (child, destroy) {
        if (destroy === void 0) { destroy = true; }
        // Checks if destroy was called before removeChild so it doesn't error.
        if (child.$element != null) {
            child.$element.unbind();
            child.$element.remove();
        }
        _super.prototype.removeChild.call(this, child, destroy);
        return this;
    };
    /**
     * Removes the child display object instance that exists at the specified index.
     *
     * @method removeChildAt
     * @param index {int} The index position of the child object.
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChildAt = function (index, destroy) {
        if (destroy === void 0) { destroy = true; }
        this.removeChild(this.getChildAt(index), destroy);
        return this;
    };
    /**
     * Removes all child object instances from the child list of the parent object instance.
     * The parent property of the removed children is set to null and the objects are garbage collected if no other
     * references to the children exist.
     *
     * @method removeChildren
     * @returns {DOMElement} Returns an instance of itself.
     * @override
     * @public
     * @chainable
     */
    DOMElement.prototype.removeChildren = function (destroy) {
        if (destroy === void 0) { destroy = true; }
        _super.prototype.removeChildren.call(this, destroy);
        this.$element.empty();
        return this;
    };
    /**
     * @overridden DisplayObjectContainer.destroy
     */
    DOMElement.prototype.destroy = function () {
        // If the addChild method is never called before the $element is detroyed then it will be null and cause an TypeError.
        if (this.$element != null) {
            this.$element.unbind();
            this.$element.remove();
        }
        _super.prototype.destroy.call(this);
    };
    /**
     * A way to instantiate view classes by found html selectors.
     *
     * Example: It will find all children elements of the {{#crossLink "DOMElement/$element:property"}}{{/crossLink}} property with the 'js-shareEmail' selector.
     * If any selectors are found the EmailShareComponent class will be instantiated and pass the found jQuery element into the contructor.
     *
     * @method createComponents
     * @param componentList (Array.<{ selector: string; componentClass: DisplayObjectContainer }>
     * @return {Array.<DOMElement>} Returns all the items created from this createComponents method.
     * @public
     * @chainable
     * @example
     *      ClassName.prototype.create = function () {
     *          _super.prototype.create.call(this);
     *
     *          this.createComponents([
     *              {selector: '.js-shareEmail', componentClass: EmailShareComponent},
     *              {selector: '.js-pagination', componentClass: PaginationComponent},
     *              {selector: '.js-carousel', componentClass: CarouselComponent}
     *          ]);
     *      };
     */
    DOMElement.prototype.createComponents = function (componentList) {
        var list;
        var createdChildren = [];
        var length = componentList.length;
        var obj;
        for (var i = 0; i < length; i++) {
            obj = componentList[i];
            list = ComponentFactory.create(this.$element.find(obj.selector), obj.componentClass, this);
            createdChildren = createdChildren.concat(list);
        }
        return createdChildren;
    };
    return DOMElement;
})(DisplayObjectContainer);
module.exports = DOMElement;

},{"../event/BaseEvent":12,"../plugin/jquery.eventListener":15,"../util/ComponentFactory":16,"../util/TemplateFactory":18,"./DisplayObjectContainer":10}],9:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../event/EventDispatcher as EventDispatcher
 @export DisplayObject
 */
var EventDispatcher = require('../event/EventDispatcher');
/**
 * The {{#crossLink "DisplayObject"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObject
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires EventDispatcher
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var DisplayObject = (function (_super) {
    __extends(DisplayObject, _super);
    function DisplayObject() {
        _super.call(this);
        /**
         * The Stage of the display object.
         *
         * @property stage
         * @type {any}
         * @public
         */
        this.stage = null;
        /**
         * The CanvasRenderingContext2D interface provides the 2D rendering context for the drawing surface of a canvas element.
         * This property is only used with the canvas specific display objects.
         *
         * @property ctx
         * @type {CanvasRenderingContext2D}
         * @public
         */
        this.ctx = null;
        /**
         * A property providing access to the x position.
         *
         * @property x
         * @type {number}
         * @default 0
         * @public
         */
        this.x = 0;
        /**
         * A property providing access to the y position.
         *
         * @property y
         * @type {number}
         * @default 0
         * @public
         */
        this.y = 0;
        /**
         * Indicates the width of the display object, in pixels.
         *
         * @property width
         * @type {number}
         * @default 0
         * @public
         */
        this.width = 0;
        /**
         * Indicates the height of the display object, in pixels.
         *
         * @property height
         * @type {number}
         * @default 0
         * @public
         */
        this.height = 0;
        /**
         * A property providing access to the unscaledWidth.
         *
         * @property unscaledWidth
         * @type {number}
         * @default 100
         * @public
         */
        this.unscaledWidth = 100;
        /**
         * A property providing access to the unscaledHeight.
         *
         * @property unscaledHeight
         * @type {number}
         * @default 100
         * @public
         */
        this.unscaledHeight = 100;
        /**
         * Indicates the horizontal scale (percentage) of the object as applied from the registration point.
         *
         * @property scaleX
         * @type {number}
         * @public
         */
        this.scaleX = 1;
        /**
         * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
         *
         * @property scaleY
         * @type {number}
         * @public
         */
        this.scaleY = 1;
        /**
         * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation.
         *
         * @property rotation
         * @type {number}
         * @public
         */
        this.rotation = 0;
        /**
         * Indicates the alpha transparency value of the object specified.
         *
         * @property alpha
         * @type {number}
         * @public
         */
        this.alpha = 1;
        /**
         * Whether or not the display object is visible.
         *
         * @property visible
         * @type {boolean}
         * @public
         */
        this.visible = true;
        /**
         * Specifies whether this object receives mouse
         *
         * @property mouseEnabled
         * @type {boolean}
         * @public
         */
        this.mouseEnabled = false;
        /**
         * A Boolean value that indicates whether the pointing hand (hand cursor) appears when the pointer rolls over a display object.
         *
         * @property useHandCursor
         * @type {boolean}
         * @public
         */
        this.useHandCursor = false;
        /**
         * The isCreated property is used to keep track if it is the first time this DisplayObject is created.
         *
         * @property isCreated
         * @type {boolean}
         * @default false
         * @protected
         */
        this.isCreated = false;
        /**
         * Indicates the instance name of the DisplayObject.
         *
         * @property name
         * @type {string}
         * @public
         */
        this.name = null;
    }
    /**
     * The create function is intended to provide a consistent place for the creation or initializing the view.
     * It will automatically be called the first time that the view is added to a DisplayObjectContainer.
     * It is critical that all subclasses call the super for this function in their overridden methods.
     *
     * @method create
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.create = function () {
        this.isCreated = true;
        return this;
    };
    /**
     * The layout method provides a common function to handle updating objects in the view.
     *
     * @method layout
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.layout = function () {
        return this;
    };
    /**
     * The setSize method sets the bounds within which the containing DisplayObject would like that component to lay itself out.
     *
     * @param unscaledWidth {number} The width within which the component should lay itself out.
     * @param unscaledHeight {number} The height within which the component should lay itself out.
     * @returns {DisplayObject} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObject.prototype.setSize = function (unscaledWidth, unscaledHeight) {
        this.unscaledWidth = unscaledWidth;
        this.unscaledHeight = unscaledHeight;
        return this;
    };
    DisplayObject.prototype.readerStart = function () {
        this.ctx.save();
    };
    DisplayObject.prototype.update = function () {
        if (this.ctx === null || this.alpha <= 0 || this.visible === false)
            return false;
        this.readerStart();
        this.ctx.globalAlpha = this.alpha;
        this.layout();
        this.renderEnd();
    };
    DisplayObject.prototype.renderEnd = function () {
        this.ctx.restore();
    };
    return DisplayObject;
})(EventDispatcher);
module.exports = DisplayObject;

},{"../event/EventDispatcher":14}],10:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./DisplayObject as DisplayObject
 @export DisplayObjectContainer
 */
var DisplayObject = require('./DisplayObject');
/**
 * The {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class is the base class for all objects that can be placed on the display list.
 *
 * @class DisplayObjectContainer
 * @extends DisplayObject
 * @module StructureJS
 * @submodule view
 * @requires Extend
 * @requires DisplayObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.call(this);
        /**
         * Returns the number of children of this object.
         *
         * @property numChildren
         * @type {int}
         * @default 0
         * @readOnly
         * @public
         */
        this.numChildren = 0;
        /**
         * A reference to the child DisplayObject instances to this parent object instance.
         *
         * @property children
         * @type {Array}
         * @readOnly
         * @public
         */
        this.children = [];
        /**
         * Determines whether or not the children of the object are mouse enabled.
         *
         * @property mouseChildren
         * @type {boolean}
         * @public
         */
        this.mouseChildren = false;
    }
    /**
     * Adds a child DisplayObject instance to this parent object instance. The child is added to the front (top) of all other
     * children in this parent object instance. (To add a child to a specific index position, use the addChildAt() method.)
     *
     * If you add a child object that already has a different parent, the object is removed from the child
     * list of the other parent object.
     *
     * @method addChild
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this DisplayObjectContainer instance.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.addChild = function (child) {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent) {
            child.parent.removeChild(child, false);
        }
        this.children.push(child);
        this.numChildren = this.children.length;
        child.parent = this;
        return this;
    };
    /**
     * Adds a child DisplayObject instance to this DisplayObjectContainerContainer instance.
     * The child is added at the index position specified. An index of 0 represents the back
     * (bottom) of the display list for this DisplayObjectContainerContainer object.
     *
     * @method addChildAt
     * @param child {DisplayObject} The DisplayObject instance to add as a child of this object instance.
     * @param index {int} The index position to which the child is added. If you specify a currently occupied index position, the child object that exists at that position and all higher positions are moved up one position in the child list.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.addChildAt = function (child, index) {
        //If the child being passed in already has a parent then remove the reference from there.
        if (child.parent) {
            child.parent.removeChild(child, false);
        }
        this.children.splice(index, 0, child);
        this.numChildren = this.children.length;
        child.parent = this;
        return this;
    };
    /**
     * Removes the specified child object instance from the child list of the parent object instance.
     * The parent property of the removed child is set to null , and the object is garbage collected if no other references
     * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
     *
     * @method removeChild
     * @param child {DisplayObject} The DisplayObject instance to remove.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.removeChild = function (child, destroy) {
        var index = this.getChildIndex(child);
        if (index !== -1) {
            // Removes the child object from the parent.
            this.children.splice(index, 1);
        }
        this.numChildren = this.children.length;
        if (destroy === true) {
            child.destroy();
        }
        else {
            child.disable();
        }
        child.parent = null;
        return this;
    };
    /**
     * Removes all child DisplayObject instances from the child list of the DisplayObjectContainerContainer instance.
     * The parent property of the removed children is set to null , and the objects are garbage collected if
     * no other references to the children exist.
     *
     * @method removeChildren
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.removeChildren = function (destroy) {
        while (this.children.length > 0) {
            this.removeChild(this.children.pop(), destroy);
        }
        return this;
    };
    /**
     * Swaps two DisplayObject's with each other.
     *
     * @method swapChildren
     * @param child1 {DisplayObject} The DisplayObject instance to be swap.
     * @param child2 {DisplayObject} The DisplayObject instance to be swap.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.swapChildren = function (child1, child2) {
        var child1Index = this.getChildIndex(child1);
        var child2Index = this.getChildIndex(child2);
        this.addChildAt(child1, child2Index);
        this.addChildAt(child2, child1Index);
    };
    /**
     * Swaps child objects at the two specified index positions in the child list. All other child objects in the display object container remain in the same index positions.
     *
     * @method swapChildrenAt
     * @param index1 {int} The index position of the first child object.
     * @param index2 {int} The index position of the second child object.
     * @returns {DisplayObjectContainer} Returns an instance of itself.
     * @public
     * @chainable
     */
    DisplayObjectContainer.prototype.swapChildrenAt = function (index1, index2) {
        if (index1 < 0 || index1 < 0 || index1 >= this.numChildren || index2 >= this.numChildren) {
            throw new TypeError('[' + this.getQualifiedClassName() + '] index value(s) cannot be out of bounds. index1 value is ' + index1 + ' index2 value is ' + index2);
        }
        var child1 = this.getChildAt(index1);
        var child2 = this.getChildAt(index2);
        this.swapChildren(child1, child2);
        return this;
    };
    /**
     * Returns the index position of a child DisplayObject instance.
     *
     * @method getChildIndex
     * @param child {DisplayObject} The DisplayObject instance to identify.
     * @returns {int} The index position of the child display object to identify.
     * @public
     */
    DisplayObjectContainer.prototype.getChildIndex = function (child) {
        return this.children.indexOf(child);
    };
    /**
     * Determines whether the specified display object is a child of the DisplayObject instance or the instance itself. The search includes the entire display list including this DisplayObject instance.
     *
     * @method contains
     * @param child {DisplayObject} The child object to test.
     * @returns {boolean}  true if the child object is a child of the DisplayObject or the container itself; otherwise false.
     * @public
     */
    DisplayObjectContainer.prototype.contains = function (child) {
        return this.children.indexOf(child) >= 0;
    };
    /**
     * Returns the child display object instance that exists at the specified index.
     *
     * @method getChildAt
     * @param index {int} The index position of the child object.
     * @returns {DisplayObject} The child display object at the specified index position.
     */
    DisplayObjectContainer.prototype.getChildAt = function (index) {
        return this.children[index];
    };
    /**
     * Gets a DisplayObject by its cid.
     *
     * @method getChildByCid
     * @param cid {number}
     * @returns {DisplayObject|null}
     * @override
     * @public
     */
    DisplayObjectContainer.prototype.getChildByCid = function (cid) {
        var child = null;
        for (var i = this.numChildren - 1; i >= 0; i--) {
            if (this.children[i].cid == cid) {
                child = this.children[i];
                break;
            }
        }
        return child;
    };
    return DisplayObjectContainer;
})(DisplayObject);
module.exports = DisplayObjectContainer;

},{"./DisplayObject":9}],11:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ./DOMElement as DOMElement
 @import jquery as jQuery
 @export Stage
 */
var DOMElement = require('./DOMElement');
/**
 * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main application or root class.
 *
 * @class Stage
 * @extends DOMElement
 * @module StructureJS
 * @submodule view
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @requires Extend
 * @requires DOMElement
 * @requires jQuery
 * @example
 *     // This example illustrates how to setup your main application or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
 *     define(function (require, exports, module) {
 *         'use strict';
 *
 *         var Extend = require('structurejs/util/Extend');
 *         var Stage = require('replace/path/Stage');
 *
 *         var MainClass = (function () {
 *
 *         var _super = Extend(MainClass, Stage);
 *
 *             function MainClass() {
 *                 _super.call(this);
 *             }
 *
 *             MainClass.prototype.create = function () {
 *                 _super.prototype.create.call(this);
 *
 *                 // Create and add your child objects to this parent class.
 *             }
 *
 *             MainClass.prototype.layout = function () {
 *                 // Layout or update the child objects in this parent class.
 *
 *                 return this;
 *             }
 *
 *             MainClass.prototype.enable = function () {
 *                 if (this.isEnabled === true) { return this };
 *
 *                 // Enable the child objects and add any event listeners.
 *
 *                 return _super.prototype.enable.call(this);
 *             }
 *
 *             MainClass.prototype.disable = function () {
 *                 if (this.isEnabled === false) { return this };
 *
 *                 // Disable the child objects and remove any event listeners.
 *
 *                 return _super.prototype.disable.call(this);
 *             }
 *
 *             MainClass.prototype.destroy = function () {
 *                 // Destroy the child objects and references in this parent class to prepare for garbage collection.
 *
 *                 _super.prototype.destroy.call(this);
 *             }
 *
 *             return MainClass;
 *         })();
 *
 *         module.exports = MainClass;
 *     });
 *
 * <b>Instantiation Example</b><br>
 * This example illustrates how to instantiate your main application or root class.
 *
 *      var app = new MainClass();
 *      app.appendTo('body');
 *
 */
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        _super.call(this);
    }
    /**
     * The selected HTML element where the child elements will be created. This method starts the lifecycle of the application.
     *
     * @method appendTo
     * @param type {any} A string value where your application will be appended. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
     * @param [enabled=true] {boolean} Sets the enabled state of the object.
     * @chainable
     */
    Stage.prototype.appendTo = function (type, enabled) {
        if (enabled === void 0) { enabled = true; }
        this.$element = (type instanceof jQuery) ? type : jQuery(type);
        this.$element.attr('data-cid', this.cid);
        if (this.isCreated === false) {
            this.create();
            this.isCreated = true;
            if (enabled === false) {
                this.disable();
            }
            else {
                this.enable();
            }
            this.layout();
        }
        return this;
    };
    return Stage;
})(DOMElement);
module.exports = Stage;

},{"./DOMElement":8}],12:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../BaseObject as BaseObject
 @export BaseEvent
 */
var BaseObject = require('../BaseObject');
/**
 * The {{#crossLink "BaseEvent"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.
 *
 * The properties of the {{#crossLink "BaseEvent"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.
 *
 * For many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more
 * detailed information.
 * @class BaseEvent
 * @extends BaseObject
 * @param type {string} The type of event. The type is case-sensitive.
 * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
 * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
 * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
 * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
 * @param [data=null] {any} Use to pass any type of data with the event.
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires BaseObject
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *     // Example: how to create a custom event by extending BaseEvent.
 *     var Extend = require('structurejs/util/Extend');
 *     var BaseEvent = require('structurejs/event/BaseEvent');
 *
 *     var CountryEvent = (function () {
 *
 *          var _super = Extend(CountryEvent, BaseEvent);
 *
 *          CountryEvent.CHANGE_COUNTRY = "CountryEvent.changeCountry";
 *
 *          function CountryEvent(type, bubbles, cancelable, data) {
 *              _super.call(this, type, bubbles, cancelable, data);
 *
 *              this.countryName = null;
 *          }
 *
 *           return CountryEvent;
 *      })();
 *
 *     // Example: how to use the custom event.
 *     var event = new CountryEvent(CountryEvent.CHANGE_COUNTRY);
 *     event.countryName = 'Canada';
 *     this.dispatchEvent(event);
 */
var BaseEvent = (function (_super) {
    __extends(BaseEvent, _super);
    function BaseEvent(type, bubbles, cancelable, data) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (data === void 0) { data = null; }
        _super.call(this);
        /**
         * The type of event.
         *
         * @property type
         * @type {string}
         * @default null
         * @public
         * @readOnly
         */
        this.type = null;
        /**
         * A reference to the object that originally dispatched the event.
         *
         * @property target
         * @type {any}
         * @default null
         * @public
         * @readOnly
         */
        this.target = null;
        /**
         * The currentTarget property always points to the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that the event is currently processing (i.e. bubbling at).
         *
         * @property currentTarget
         * @type {any}
         * @default null
         * @public
         * @readOnly
         */
        this.currentTarget = null;
        /**
         * Used to pass any type of data with the event.
         *
         * @property data
         * @type {any}
         * @public
         * @default null
         */
        this.data = null;
        /**
         * Indicates whether an event is a bubbling event.
         *
         * @property bubbles
         * @type {boolean}
         * @public
         * @default false
         */
        this.bubbles = false;
        /**
         * Indicates whether the behavior associated with the event can be prevented.
         *
         * @property cancelable
         * @type {boolean}
         * @public
         * @default false
         */
        this.cancelable = false;
        /**
         * Indicates if the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} was called on the event object.
         *
         * @property isPropagationStopped
         * @type {boolean}
         * @default false
         * @public
         * @readOnly
         */
        this.isPropagationStopped = false;
        /**
         * Indicates if the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} was called on the event object.
         *
         * @property isImmediatePropagationStopped
         * @type {boolean}
         * @default false
         * @public
         * @readOnly
         */
        this.isImmediatePropagationStopped = false;
        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.data = data;
    }
    /**
     * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow.
     * This method does not affect any event listeners in the current node (currentTarget). In contrast,
     * the {{#crossLink "BaseEvent/stopImmediatePropagation:method"}}{{/crossLink}} method prevents processing
     * of event listeners in both the current node and subsequent nodes. Additional calls to this method have no effect.
     *
     * @method stopPropagation
     * @public
     * @example
     *     event.stopPropagation();
     */
    BaseEvent.prototype.stopPropagation = function () {
        this.isPropagationStopped = true;
    };
    /**
     * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
     * This method takes effect immediately, and it affects event listeners in the current node. In contrast,
     * the {{#crossLink "BaseEvent/stopPropagation:method"}}{{/crossLink}} method doesn't take effect until
     * all the event listeners in the current node finish processing.
     *
     * @method stopImmediatePropagation
     * @public
     * @example
     *     event.stopImmediatePropagation();
     */
    BaseEvent.prototype.stopImmediatePropagation = function () {
        this.stopPropagation();
        this.isImmediatePropagationStopped = true;
    };
    /**
     * Duplicates an instance of an BaseEvent subclass.
     *
     * Returns a new BaseEvent object that is a copy of the original instance of the BaseEvent object.
     *
     * The new BaseEvent object includes all the properties of the original.
     *
     * @method clone
     * @returns {BaseEvent}
     * @public
     * @example
     *     var cloneOfEvent = event.clone();
     */
    BaseEvent.prototype.clone = function () {
        var clonedValueObject = new this.constructor(this.type, this.bubbles, this.cancelable, this.data);
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                clonedValueObject[key] = this[key];
            }
        }
        return clonedValueObject;
    };
    /**
     * The BaseEvent.ACTIVATE constant defines the value of the type property of an activate event object.
     *
     * @event ACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ACTIVATE = 'BaseEvent.activate';
    /**
     * The BaseEvent.ADDED constant defines the value of the type property of an added event object.
     *
     * @event ADDED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED = 'BaseEvent.added';
    /**
     * The BaseEvent.ADDED_TO_STAGE constant defines the value of the type property of an addedToStage event object.
     *
     * @event ADDED_TO_STAGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ADDED_TO_STAGE = 'BaseEvent.addedToStage';
    /**
     * The BaseEvent.CANCEL constant defines the value of the type property of a cancel event object.
     *
     * @event CANCEL
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CANCEL = 'BaseEvent.cancel';
    /**
     * The BaseEvent.CHANGE constant defines the value of the type property of a change event object.
     *
     * @event CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CHANGE = 'BaseEvent.change';
    /**
     * The BaseEvent.CLEAR constant defines the value of the type property of a clear event object.
     *
     * @event CLEAR
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLEAR = 'BaseEvent.clear';
    /**
     * The BaseEvent.CLOSE constant defines the value of the type property of a close event object.
     *
     * @event CLOSE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSE = 'BaseEvent.close';
    /**
     * The BaseEvent.CLOSING constant defines the value of the type property of a closing event object.
     *
     * @event CLOSING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CLOSING = 'BaseEvent.closing';
    /**
     * The BaseEvent.COMPLETE constant defines the value of the type property of a complete event object.
     *
     * @event COMPLETE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COMPLETE = 'BaseEvent.complete';
    /**
     * The BaseEvent.CONNECT constant defines the value of the type property of a connect event object.
     *
     * @event CONNECT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CONNECT = 'BaseEvent.connect';
    /**
     * Defines the value of the type property of a copy event object.
     *
     * @event COPY
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.COPY = 'BaseEvent.copy';
    /**
     * Defines the value of the type property of a cut event object.
     *
     * @event CUT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.CUT = 'BaseEvent.cut';
    /**
     * The BaseEvent.DEACTIVATE constant defines the value of the type property of a deactivate event object.
     *
     * @event DEACTIVATE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DEACTIVATE = 'BaseEvent.deactivate';
    /**
     * The BaseEvent.DISPLAYING constant defines the value of the type property of a displaying event object.
     *
     * @event DISPLAYING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.DISPLAYING = 'BaseEvent.displaying';
    /**
     * The BaseEvent.ENTER_FRAME constant defines the value of the type property of an enterFrame event object.
     *
     * @event ENTER_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.ENTER_FRAME = 'BaseEvent.enterFrame';
    /**
     * The BaseEvent.EXIT_FRAME constant defines the value of the type property of an exitFrame event object.
     *
     * @event EXIT_FRAME
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXIT_FRAME = 'BaseEvent.exitFrame';
    /**
     * The BaseEvent.EXITING constant defines the value of the type property of an exiting event object.
     *
     * @event EXITING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.EXITING = 'BaseEvent.exiting';
    /**
     * The BaseEvent.FULL_SCREEN constant defines the value of the type property of a fullScreen event object.
     *
     * @event FULLSCREEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.FULLSCREEN = 'BaseEvent.fullScreen';
    /**
     * The BaseEvent.INIT constant defines the value of the type property of an init event object.
     *
     * @event INIT
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.INIT = 'BaseEvent.init';
    /**
     * The BaseEvent.NETWORK_CHANGE constant defines the value of the type property of a networkChange event object.
     *
     * @event NETWORK_CHANGE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.NETWORK_CHANGE = 'BaseEvent.networkChange';
    /**
     * The BaseEvent.OPEN constant defines the value of the type property of an open event object.
     *
     * @event OPEN
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.OPEN = 'BaseEvent.open';
    /**
     * The BaseEvent.PASTE constant defines the value of the type property of a paste event object.
     *
     * @event PASTE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PASTE = 'BaseEvent.paste';
    /**
     * The BaseEvent.PREPARING constant defines the value of the type property of a preparing event object.
     *
     * @event PREPARING
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.PREPARING = 'BaseEvent.preparing';
    /**
     * The BaseEvent.REMOVED constant defines the value of the type property of a removed event object.
     *
     * @event REMOVED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.REMOVED = 'BaseEvent.removed';
    /**
     * The BaseEvent.RENDER constant defines the value of the type property of a render event object.
     *
     * @event RENDER
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RENDER = 'BaseEvent.render';
    /**
     * The BaseEvent.RESIZE constant defines the value of the type property of a resize event object.
     *
     * @event RESIZE
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.RESIZE = 'BaseEvent.resize';
    /**
     * The BaseEvent.SELECTED constant defines the value of the type property of a selected event object.
     *
     * @event SELECTED
     * @type {string}
     * @public
     * @static
     */
    BaseEvent.SELECTED = 'BaseEvent.selected';
    return BaseEvent;
})(BaseObject);
module.exports = BaseEvent;

},{"../BaseObject":6}],13:[function(require,module,exports){
'use strict';
/*
 UMD Stuff
 @import ./EventDispatcher as EventDispatcher
 @import ./BaseEvent as BaseEvent
 @export EventBroker
 */
var EventDispatcher = require('./EventDispatcher');
var BaseEvent = require('./BaseEvent');
/**
 * EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications.
 * Loosely coupled event handling, the subscriber does not know the publisher. Both of them only need to know the event type.
 *
 * @class EventBroker
 * @module StructureJS
 * @submodule event
 * @requires EventDispatcher
 * @requires BaseEvent
 * @static
 * @author Robert S. (www.codeBelt.com)
 */
var EventBroker = (function () {
    function EventBroker() {
        throw new Error('[EventBroker] Do not instantiate the EventBroker class because it is a static class.');
    }
    /**
     * Registers an event listener object with an EventBroker object so that the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. The callback function will receive a {{#crossLink "BaseEvent"}}{{/crossLink}} object or custom event that extends the {{#crossLink "BaseEvent"}}{{/crossLink}} class.
     * @param scope {any} The scope of the callback function.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @static
     * @public
     * @example
     *     EventBroker.addEventListener('change', this._handlerMethod, this);
     *     // Example of using a constant event type.
     *     EventBroker.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *     // The event passed to the method will always be a BaseEvent object.
     *     ClassName.prototype._handlerMethod = function (event) {
     *          console.log(event.data);
     *     };
     */
    EventBroker.addEventListener = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        EventBroker._eventDispatcher.addEventListener(type, callback, scope, priority);
    };
    /**
     * Removes a specified listener from the EventBroker object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The callback function to be removed.
     * @param scope {any} The scope of the callback function to be removed.
     * @static
     * @public
     * @example
     *     EventBroker.removeEventListener('change', this._handlerMethod, this);
     *
     *     EventBroker.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    EventBroker.removeEventListener = function (type, callback, scope) {
        EventBroker._eventDispatcher.removeEventListener(type, callback, scope);
    };
    /**
     * Dispatches an event within the EventBroker object.
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @static
     * @public
     * @example
     *      EventBroker.dispatchEvent('change');
     *
     *      // Example: Sending data with the event.
     *      EventBroker.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: Sending a BaseEvent or custom event object.
     *      var event = new BaseEvent(BaseEvent.CHANGE);
     *      event.data = {some: 'data'};
     *      EventBroker.dispatchEvent(event);
     */
    EventBroker.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var event = type;
        if (typeof event === 'string') {
            event = new BaseEvent(type, false, false, data);
        }
        event.target = EventBroker;
        event.currentTarget = EventBroker;
        EventBroker._eventDispatcher.dispatchEvent(event);
    };
    /**
     * Check if EventBroker has a specific event listener already added.
     *
     * @method hasEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener method to call.
     * @param scope {any} The scope of the listener object.
     * @return {boolean}
     * @static
     * @public
     * @example
     *      EventBroker.hasEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     */
    EventBroker.hasEventListener = function (type, callback, scope) {
        return EventBroker._eventDispatcher.hasEventListener(type, callback, scope);
    };
    /**
     * Generates a string output of event listeners for a given object.
     *
     * @method getEventListeners
     * @return {string}
     * @static
     * @public
     * @example
     *      EventBroker.getEventListeners();
     *
     *      // [ClassName] is listen for 'BaseEvent.change' event.
     */
    EventBroker.getEventListeners = function () {
        return EventBroker._eventDispatcher.getEventListeners();
    };
    /**
     * A reference to the EventDispatcher object.
     *
     * @property _eventDispatcher
     * @type {EventDispatcher}
     * @private
     * @static
     */
    EventBroker._eventDispatcher = new EventDispatcher();
    return EventBroker;
})();
module.exports = EventBroker;

},{"./BaseEvent":12,"./EventDispatcher":14}],14:[function(require,module,exports){
'use strict';
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*
 UMD Stuff
 @import ../util/Extend as Extend
 @import ../ObjectManager as ObjectManager
 @import ./BaseEvent as BaseEvent
 @export EventDispatcher
 */
var ObjectManager = require('../ObjectManager');
var BaseEvent = require('./BaseEvent');
/**
 * EventDispatcher is the base class for all classes that dispatch events. It is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
 * EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
 *
 * @class EventDispatcher
 * @extends ObjectManager
 * @module StructureJS
 * @submodule event
 * @requires Extend
 * @requires ObjectManager
 * @requires BaseEvent
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 * @example
 *      // Extending EventDispatcher. See DisplayObjectContainer as an example that extends EventDispatcher.
 *      var _super = Extend(ClassExtendingEventDispatcher, EventDispatcher);
 *
 *      // Another way to use the EventDispatcher.
 *      var eventDispatcher = new EventDispatcher();
 *      eventDispatcher.addEventListener('change', this.handlerMethod, this);
 *      eventDispatcher.dispatchEvent('change');
 */
var EventDispatcher = (function (_super) {
    __extends(EventDispatcher, _super);
    function EventDispatcher() {
        _super.call(this);
        /**
         * Holds a reference to added listeners.
         *
         * @property _listeners
         * @type {Array}
         * @private
         */
        this._listeners = null;
        /**
         * Indicates the object that contains a child object. Uses the parent property
         * to specify a relative path to display objects that are above the current display object in the display
         * list hierarchy and helps facilitate event bubbling.
         *
         * @property parent
         * @type {any}
         * @public
         */
        this.parent = null;
        this._listeners = [];
    }
    /**
     * Registers an event listener object with an EventDispatcher object so the listener receives notification of an event.
     *
     * @method addEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener function that processes the event. This function must accept an Event object as its only parameter and must return nothing, as this example shows. @example function(event:Event):void
     * @param scope {any} Binds the scope to a particular object (scope is basically what "this" refers to in your function). This can be very useful in JavaScript because scope isn't generally maintained.
     * @param [priority=0] {int} Influences the order in which the listeners are called. Listeners with lower priorities are called after ones with higher priorities.
     * @public
     * @chainable
     * @example
     *      this.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     *
     *      ClassName.prototype.handlerMethod = function (event) {
         *          console.log(event.target + " sent the event.");
         *          console.log(event.type, event.data);
         *      }
     */
    EventDispatcher.prototype.addEventListener = function (type, callback, scope, priority) {
        if (priority === void 0) { priority = 0; }
        // Get the list of event listeners by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list == null) {
            // If a list of event listeners do not exist for the type value passed in then create a new empty array.
            this._listeners[type] = list = [];
        }
        var index = 0;
        var listener;
        var i = list.length;
        while (--i > -1) {
            listener = list[i];
            if (listener.callback === callback && listener.scope === scope) {
                // If the same callback and scope are found then remove it and add the current one below.
                list.splice(i, 1);
            }
            else if (index === 0 && listener.priority < priority) {
                index = i + 1;
            }
        }
        // Add the event listener to the list array at the index value.
        list.splice(index, 0, { callback: callback, scope: scope, priority: priority });
        return this;
    };
    /**
     * Removes a specified listener from the EventDispatcher object.
     *
     * @method removeEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener object to remove.
     * @param scope {any} The scope of the listener object to be removed.
     * @hide This was added because it was needed for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
     * @public
     * @chainable
     * @example
     *      this.removeEventListener(BaseEvent.CHANGE, this._handlerMethod, this);
     *
     *      ClassName.prototype._handlerMethod = function (event) {
     *      };
     */
    EventDispatcher.prototype.removeEventListener = function (type, callback, scope) {
        // Get the list of event listeners by the associated type value that is passed in.
        var list = this._listeners[type];
        if (list !== void 0) {
            var i = list.length;
            while (--i > -1) {
                // If the callback and scope are the same then remove the event listener.
                if (list[i].callback === callback && list[i].scope === scope) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    };
    /**
     * <p>Dispatches an event into the event flow. The event target is the EventDispatcher object upon which the dispatchEvent() method is called.</p>
     *
     * @method dispatchEvent
     * @param event {string|BaseEvent} The Event object or event type string you want to dispatch. You can create custom events, the only requirement is all events must extend {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @param [data=null] {any} The optional data you want to send with the event. Do not use this parameter if you are passing in a {{#crossLink "BaseEvent"}}{{/crossLink}}.
     * @public
     * @chainable
     * @example
     *      this.dispatchEvent('change');
     *
     *      // Example: Sending data with the event:
     *      this.dispatchEvent('change', {some: 'data'});
     *
     *      // Example: With an event object
     *      // (event type, bubbling set to true, cancelable set to true and passing data) :
     *      var event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
     *      this.dispatchEvent(event);
     *
     *      // Here is a common inline event object being dispatched:
     *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
     */
    EventDispatcher.prototype.dispatchEvent = function (type, data) {
        if (data === void 0) { data = null; }
        var event = type;
        if (typeof event === 'string') {
            event = new BaseEvent(type, false, true, data);
        }
        // If target is null then set it to the object that dispatched the event.
        if (event.target == null) {
            event.target = this;
            event.currentTarget = this;
        }
        // Get the list of event listener by the associated type value.
        var list = this._listeners[event.type];
        if (list !== void 0) {
            var i = list.length;
            var listener;
            while (--i > -1) {
                // If cancelable and isImmediatePropagationStopped are true then break out of the while loop.
                if (event.cancelable === true && event.isImmediatePropagationStopped === true) {
                    break;
                }
                listener = list[i];
                listener.callback.call(listener.scope, event);
            }
        }
        //Dispatches up the chain of classes that have a parent.
        if (this.parent != null && event.bubbles === true) {
            // If cancelable and isPropagationStopped are true then don't dispatch the event on the parent object.
            if (event.cancelable === true && event.isPropagationStopped === true) {
                return this;
            }
            // Assign the current object that is currently processing the event (i.e. bubbling at) in the display list hierarchy.
            event.currentTarget = this;
            // Pass the event to the parent (event bubbling).
            this.parent.dispatchEvent(event);
        }
        return this;
    };
    /**
     * Check if an object has a specific event listener already added.
     *
     * @method hasEventListener
     * @param type {String} The type of event.
     * @param callback {Function} The listener method to call.
     * @param scope {any} The scope of the listener object.
     * @return {boolean}
     * @public
     * @example
     *      this.hasEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
     */
    EventDispatcher.prototype.hasEventListener = function (type, callback, scope) {
        if (this._listeners[type] !== void 0) {
            var listener;
            var numOfCallbacks = this._listeners[type].length;
            for (var i = 0; i < numOfCallbacks; i++) {
                listener = this._listeners[type][i];
                if (listener.callback === callback && listener.scope === scope) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Generates a string output of event listeners for a given object.
     *
     * @method getEventListeners
     * @return {string}
     * @public
     * @example
     *      this.getEventListeners();
     *
     *      // [ClassName] is listening for the 'BaseEvent.change' event.
     */
    EventDispatcher.prototype.getEventListeners = function () {
        var str = '';
        var numOfCallbacks;
        var listener;
        for (var type in this._listeners) {
            numOfCallbacks = this._listeners[type].length;
            for (var i = 0; i < numOfCallbacks; i++) {
                listener = this._listeners[type][i];
                if (listener.scope && (typeof listener.scope.getQualifiedClassName === 'function')) {
                    str += '[' + listener.scope.getQualifiedClassName() + ']';
                }
                else {
                    str += '[Unknown]';
                }
                str += " is listen for '" + type + "' event.\n";
            }
        }
        return str;
    };
    /**
     * @overridden BaseObject.destroy
     */
    EventDispatcher.prototype.destroy = function () {
        _super.prototype.disable.call(this);
        _super.prototype.destroy.call(this);
    };
    return EventDispatcher;
})(ObjectManager);
module.exports = EventDispatcher;

},{"../ObjectManager":7,"./BaseEvent":12}],15:[function(require,module,exports){
'use strict';
/*
 UMD Stuff
 @import jquery as $
 @export jQuery
 */
var $ = (window.$);
var $eventListener = $;
/**
 * A bind polyfill for browsers that don't support the bind method.
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () {
        }, fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}
/**
 * Generates a hash string from the string being passed in. In this case it is a function that is casted as string value.
 *
 * @param str
 * @returns {String}
 */
var hashCode = function (str) {
    str = String(str);
    // http://erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-
    var character;
    var hash = null;
    var strLength = str.length;
    if (strLength == 0)
        return hash;
    for (var i = 0; i < strLength; i++) {
        character = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return String(Math.abs(hash));
};
/**
 * The jQuery addEventListener plugin
 */
$eventListener.fn.addEventListener = function (type, selector, data, callback, scope) {
    var _callback;
    var _scope;
    var _handler;
    switch (arguments.length) {
        case 3:
            _callback = selector;
            _scope = data;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, _handler);
            break;
        case 4:
            _callback = data;
            _scope = callback;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, selector, _handler);
            break;
        case 5:
            _callback = callback;
            _scope = scope;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)] = _callback.bind(_scope);
            this.on(type, selector, data, _handler);
            break;
        default:
            throw new Error('jQuery addEventListener plugin requires at least 3 arguments.');
    }
    return this;
};
/**
 * The jQuery removeEventListener plugin
 */
$eventListener.fn.removeEventListener = function (type, selector, callback, scope) {
    var _callback;
    var _scope;
    var _handler;
    switch (arguments.length) {
        case 3:
            _callback = selector;
            _scope = callback;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)];
            this.off(type, _handler);
            _scope._handlerMap[hashCode(_callback)] = null;
            break;
        case 4:
            _callback = callback;
            _scope = scope;
            _scope._handlerMap = _scope._handlerMap || {};
            _handler = _scope._handlerMap[hashCode(_callback)];
            this.off(type, selector, _handler);
            _scope._handlerMap[hashCode(_callback)] = null;
            break;
        default:
            throw new Error('jQuery removeEventListener plugin requires at least 3 arguments.');
    }
    return this;
};
module.exports = $eventListener;

},{}],16:[function(require,module,exports){
'use strict';
/**
 * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
 *
 * @class ComponentFactory
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var ComponentFactory = (function () {
    function ComponentFactory() {
        throw new Error('[ComponentFactory] Do not instantiate the ComponentFactory class because it is a static class.');
    }
    /**
     * Takes a jQuery object that has one or more elements in it and passes a single jQuery element into the constructor of the class that is also being passed in.
     *
     * @method create
     * @param $element {jQuery} One or more jQuery referenced DOM elements.
     * @param ComponentClass {any} The class that you want instantiated.
     * @param [scope=null] {DisplayObjectContainer} This scope (parent object) is needed to instantiate the component/view with the use of the {{#crossLink "DisplayObjectContainer/addChild:method"}}{{/crossLink}} method.
     * @return {Array.<any>} Returns a list of instantiated components/views so you can manage them within the Class that created them.
     * @public
     * @static
     * @example
     *      ComponentFactory.create($('.js-list'), SomeClass, this);
     */
    ComponentFactory.create = function ($elements, ComponentClass, scope) {
        if (scope === void 0) { scope = null; }
        var list = [];
        var length = $elements.length;
        for (var i = 0; i < length; i++) {
            var component = new ComponentClass($elements.eq(i));
            // If the class object has the getQualifiedClassName method then I am assuming it is an instance of the DisplayObjectContainer class.
            if (scope !== null && typeof component.getQualifiedClassName === 'function') {
                scope.addChild(component);
            }
            list.push(component);
        }
        return list;
    };
    return ComponentFactory;
})();
module.exports = ComponentFactory;

},{}],17:[function(require,module,exports){
'use strict';
/*
 UMD Stuff
 @export StringUtil
 */
/**
 * The StringUtil...
 *
 * @class StringUtil
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var StringUtil = (function () {
    function StringUtil() {
        throw new Error('[StringUtil] Do not instantiate the StringUtil class because it is a static class.');
    }
    /**
     * Gets the extension name off the string being passed in.
     *
     * @method getExtension
     * @param filename {string}
     * @param withDot {boolean} If you want the period to be included in the extension name.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.getExtension('file.exe');
     *      // 'exe'
     *
     *      StringUtil.getExtension('file.exe', true);
     *      // '.exe'
     */
    StringUtil.getExtension = function (filename, withDot) {
        if (withDot === void 0) { withDot = false; }
        var num = (withDot === true) ? 0 : 1;
        return filename.slice(filename.lastIndexOf('.') + num, filename.length);
    };
    /**
     * Converts a string to a sentence case string.
     *
     * @method toSentence
     * @param str {string}
     * @param [separator] {string} Can be any string you want to use as a separator.
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toSentence("liveDown_by-the.River");
     *      // 'live down by the river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '-');
     *      // 'live-down-by-the-river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '_');
     *      // 'live_down_by_the_river'
     *
     *      StringUtil.toSentence("liveDown_by-the.River", '/');
     *      // 'live/down/by/the/river'
     */
    StringUtil.toSentence = function (str, separator) {
        if (separator === void 0) { separator = ' '; }
        return String(str).replace(/(\d)/g, '$1 ').replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/[^a-zA-Z0-9 ]/g, ' ').replace(/\s{2,}/g, ' ').replace(/^ | $/g, '').toLowerCase().replace(/\s+/g, separator);
    };
    /**
     * Converts a string to a camel case string.
     *
     * @method toCamelCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toCamelCase("liveDown_by-the.River");
     *      // 'liveDownByTheRiver'
     */
    StringUtil.toCamelCase = function (str) {
        return StringUtil.toSentence(str).replace(/ (\w)/g, function (_, $1) {
            return $1.toUpperCase();
        });
    };
    /**
     * Converts a hyphen string to a pascal case string.
     *
     * @method toPascalCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toPascalCase("liveDown_by-the.River");
     *      // 'LiveDownByTheRiver'
     */
    StringUtil.toPascalCase = function (str) {
        return StringUtil.toCamelCase(str).replace(/^[a-zA-Z]/, function (a, b, c) {
            return a.toUpperCase();
        });
    };
    /**
     * Converts a string to a constant case string.
     *
     * @method toConstantCase
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.toConstantCase("liveDown_by-the.River");
     *      // 'LIVE_DOWN_BY_THE_RIVER'
     */
    StringUtil.toConstantCase = function (str) {
        return StringUtil.toSentence(str, '_').toUpperCase();
    };
    /**
     * Creates a universally unique identifier.
     *
     * @method createUUID
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.createUUID();
     *      // 'a95d7134-3342-4001-bcea-cc0371b70dec'
     */
    StringUtil.createUUID = function () {
        var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return uuid;
    };
    /**
     * Converts a query string to an object.
     *
     * @method queryStringToObject
     * @param queryString {string}
     * @param [useParseFloat=true] {boolean}
     * @returns {Object|Null}
     * @public
     * @static
     * @example
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male');
     *      // {name: 'Robert', age: 23, gender: 'male'}
     *
     *      StringUtil.queryStringToObject('?name=Robert&age=23&gender=male', false);
     *      // {name: 'Robert', age: '23', gender: 'male'}
     */
    StringUtil.queryStringToObject = function (queryString, useParseFloat) {
        if (useParseFloat === void 0) { useParseFloat = true; }
        var params = {};
        var temp = null;
        var str = queryString.substring(queryString.indexOf('?') + 1);
        if (str === '') {
            return null;
        }
        // Split into key/value pairs
        var queries = str.split('&');
        // Convert the array of strings into an object
        var len = queries.length;
        for (var i = 0; i < len; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = (useParseFloat === true && isNaN(parseFloat(temp[1])) === false) ? parseFloat(temp[1]) : temp[1];
        }
        return params;
    };
    /**
     * Remove all whitespace from the string passed in.
     *
     * @method removeAllWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      var str = '   a b    c d e f g ';
     *      StringUtil.removeAllWhitespace(str);
     *      // 'abcdefg'
     */
    StringUtil.removeAllWhitespace = function (str) {
        return str.replace(/\s+/g, '');
    };
    /**
     * Remove leading and trailing whitespace.
     *
     * @method removeLeadingTrailingWhitespace
     * @param str {string}
     * @returns {string}
     * @public
     * @static
     * @example
     *      var str = '   a b    c d e f g ';
     *      StringUtil.removeLeadingTrailingWhitespace(str);
     *      // 'a b    c d e f g'
     */
    StringUtil.removeLeadingTrailingWhitespace = function (str) {
        return str.replace(/(^\s+|\s+$)/g, '');
    };
    /**
     *
     * @method truncate
     * @param text {string}
     * @param length {int}
     * @returns {string}
     * @public
     * @static
     * @example
     *      StringUtil.truncate('Robert is cool and he likes bruschetta.', 14));
     *      // 'Robert is cool...'
     */
    StringUtil.truncate = function (text, length) {
        if (text.length <= length) {
            return text;
        }
        else {
            return text.substr(0, length) + '...';
        }
    };
    /**
     * Replaces each format item in a specified string with the text equivalent of a corresponding object's value.
     *
     * @method format
     * @returns {string}
     * @param str {string}
     * @param ...rest {Array}
     * @public
     * @static
     * @example
     *      StringUtil.format('Robert is {0}. Very {0} and {1}!', 'cool', 'smart');
     *      // 'Robert is cool. Very cool and smart!'
     */
    StringUtil.format = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var length = rest.length;
        var value = str;
        for (var i = 0; i < length; i++) {
            var reg = new RegExp('\\{' + i + '\\}', 'gm');
            value = value.replace(reg, rest[i]);
        }
        return value;
    };
    /**
     * Updates a value in the query string by its key name.
     *
     * @method paramReplace
     * @param queryString
     * @param name
     * @param value
     * @returns {string|void}
     * @example
     *      StringUtil.paramReplace('?name=Robert&age=23&gender=male', 'gender', 'female');
     *      // '?name=Robert&age=23&gender=female'
     */
    StringUtil.paramReplace = function (queryString, name, value) {
        // Find the param with regex
        // Grab the first character in the returned string (should be ? or &)
        // Replace our href string with our new value, passing on the name and delimiter
        var re = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var delimiter = re.exec(queryString)[0].charAt(0);
        return queryString.replace(re, delimiter + name + '=' + value);
    };
    return StringUtil;
})();
module.exports = StringUtil;

},{}],18:[function(require,module,exports){
'use strict';
/*
 UMD Stuff
 @import ../util/StringUtil as StringUtil
 @import jquery as jQuery
 @import handlebars as Handlebars
 @export TemplateFactory
 */
var StringUtil = require('./StringUtil');
/**
 * A helper class to provide a convenient and consistent way to render templates.
 *
 * @class TemplateFactory
 * @module StructureJS
 * @submodule util
 * @requires StringUtil
 * @requires Handlebars
 * @requires jQuery
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var TemplateFactory = (function () {
    function TemplateFactory() {
        throw new Error('[TemplateFactory] Do not instantiate the TemplateFactory class because it is a static class.');
    }
    /**
     * Creates a template.
     *
     * @method create
     * @param templatePath {any}
     * @param [data=any]
     * @returns {string}
     * @public
     * @static
     * @example
     *      TemplateFactory.create('templateName', {some: 'data'});
     */
    TemplateFactory.create = function (templatePath, data) {
        if (data === void 0) { data = null; }
        //Checks the first character to see if it is a '.' or '#'.
        var regex = /^([.#])(.+)/;
        var template = null;
        var isFunctionTemplate = typeof templatePath === 'function';
        var isClassOrIdName = regex.test(templatePath);
        if (isFunctionTemplate) {
            template = templatePath(data);
        }
        else if (isClassOrIdName) {
            var htmlString = jQuery(templatePath).html();
            htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);
            if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                // Underscore Template:
                var templateMethod = window['_'].template(htmlString);
                template = templateMethod(data);
            }
            else {
                // Handlebars Template
                var templateMethod = Handlebars.compile(htmlString);
                template = templateMethod(data);
            }
        }
        else {
            var templateObj = window[TemplateFactory.templateNamespace];
            if (!templateObj) {
                // Returns null because the template namespace is not found.
                return null;
            }
            var templateFunction = templateObj[templatePath];
            if (templateFunction) {
                // The templatePath gets a function storage in the associative array.
                // We call the function by passing in the data as the argument.
                template = templateFunction(data);
            }
        }
        return template;
    };
    /**
     * A constant value for using Underscore or Lodash templates.
     *
     * @property UNDERSCORE
     * @type {string}
     * @public
     * @final
     * @static
     */
    TemplateFactory.UNDERSCORE = 'underscore';
    /**
     * A constant value for using Handlebars templates. This is the default template engine.
     *
     * @property HANDLEBARS
     * @type {string}
     * @public
     * @final
     * @static
     */
    TemplateFactory.HANDLEBARS = 'handlebars';
    /**
     * Sets the template engine type for this TemplateFactory class. The default is TemplateFactory.HANDLEBARS
     *
     * @property templateEngine
     * @type {string}
     * @default TemplateFactory.HANDLEBARS
     * @public
     * @static
     */
    TemplateFactory.templateEngine = TemplateFactory.HANDLEBARS;
    /**
     * The global namespace for pre-compiled templates.
     *
     * @property templateNamespace
     * @type {string}
     * @default 'JST'
     * @public
     * @static
     */
    TemplateFactory.templateNamespace = 'JST';
    return TemplateFactory;
})();
module.exports = TemplateFactory;

},{"./StringUtil":17}],19:[function(require,module,exports){
'use strict';
/*
 UMD Stuff
 @export Util
 */
/**
 * A Utility class that has several static methods to assist in development.
 *
 * @class Util
 * @module StructureJS
 * @submodule util
 * @author Robert S. (www.codeBelt.com)
 * @static
 */
var Util = (function () {
    function Util() {
        throw new Error('[Util] Do not instantiate the Util class because it is a static class.');
    }
    /**
     * Generates a unique ID. If a prefix is passed in, the value will be appended to it.
     *
     * @method uniqueId
     * @param [prefix] {string} The string value used for the prefix.
     * @returns {init|string} Returns the unique identifier.
     * @public
     * @static
     * @example
     *      var property = Util.uniqueId();
     *      // 1
     *
     *      var property = Util.uniqueId('prefixName_');
     *      // prefixName_1
     */
    Util.uniqueId = function (prefix) {
        if (prefix === void 0) { prefix = null; }
        var id = ++Util._idCounter;
        if (prefix != null) {
            return String(prefix + id);
        }
        else {
            return id;
        }
    };
    /**
     * Removes a list of properties from an object.
     *
     * @method deletePropertyFromObject
     * @param object {Object} The object you want to remove properties from.
     * @param list {Array} A list of property names you want to remove from the object.
     * @returns {any} Returns the object passed in without the removed the properties.
     * @public
     * @static
     * @example
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.deletePropertyFromObject(obj, ['phone', 'gender']);
     *
     *      // { name: 'Robert' }
     */
    Util.deletePropertyFromObject = function (object, list) {
        for (var key in object) {
            // If the key is a property and not function.
            if (object.hasOwnProperty(key)) {
                var value = object[key];
                // If the property is an Array.
                if (value instanceof Array) {
                    // Loop through the Array and call the Util.deletePropertyFromObject method on each object in the array.
                    var array = value;
                    for (var index in array) {
                        // Recursive function call.
                        Util.deletePropertyFromObject(array[index], list);
                    }
                }
                else if (value instanceof Object) {
                    Util.deletePropertyFromObject(value, list);
                }
                else {
                    for (var listIndex in list) {
                        // If the key(property name) equals the property name in the list array.
                        if (key === list[listIndex]) {
                            // Delete the property from the object.
                            delete object[key];
                        }
                    }
                }
            }
        }
        return object;
    };
    /**
     * Renames a property name on an object.
     *
     * @method renamePropertyOnObject
     * @param object {Object} The object you want to rename properties from.
     * @param oldName {string}
     * @param newName {string}
     * @returns {any} Returns the object passed in renamed properties.
     * @public
     * @static
     * @example
     *      var obj = { name: 'Robert', gender: 'male', phone: '555-555-5555' }
     *
     *      Util.renamePropertyOnObject(obj, 'gender', 'sex');
     *
     *      // { name: 'Robert', sex: 'male', phone: '555-555-5555' }
     */
    Util.renamePropertyOnObject = function (object, oldName, newName) {
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (object.hasOwnProperty(oldName)) {
            object[newName] = object[oldName];
            delete object[oldName];
        }
        return object;
    };
    /**
     * Makes a clone of an object.
     *
     * @method clone
     * @param obj {Object} The object you to clone.
     * @returns {any} Returns a clone object of the one passed in.
     * @public
     * @static
     * @example
     *      var cloneOfObject = Util.clone(obj);
     */
    Util.clone = function (obj) {
        //other scripts: http://davidwalsh.name/javascript-clone
        //http://oranlooney.com/functional-javascript/
        //http://oranlooney.com/deep-copy-javascript/
        // Handle the 3 simple types, and null or undefined
        if (null == obj || 'object' != typeof obj) {
            return obj;
        }
        // Handle Date
        if (obj instanceof Date) {
            var date = new Date();
            date.setTime(obj.getTime());
            return date;
        }
        // Handle Array
        if (obj instanceof Array) {
            var array = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                array[i] = Util.clone(obj[i]);
            }
            return array;
        }
        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) {
                    copy[attr] = Util.clone(obj[attr]);
                }
            }
            return copy;
        }
        throw new Error("[Util] Unable to copy obj! Its type isn't supported.");
    };
    /**
     * Converts a string or number to a boolean.
     *
     * @method toBoolean
     * @param strNum {string|number}
     * @returns {boolean}
     * @public
     * @static
     * @example
     *      Util.toBoolean("TRUE");
     *      // true
     *
     *      Util.toBoolean(0);
     *      // false
     *
     *      Util.toBoolean(undefined);
     *      // false
     */
    Util.toBoolean = function (strNum) {
        var value = (typeof strNum === 'string') ? strNum.toLowerCase() : strNum;
        return (value > 0 || value == 'true' || value == 'yes');
    };
    /**
     * Returns the name of the class object passed in.
     *
     * @method getClassName
     * @param classObject {Object}
     * @returns {string} Returns the name of the class object passed in.
     * @public
     * @static
     * @example
     *      var someClass = new SomeClass();
     *
     *      Util.getClassName(someClass);
     *      // 'SomeClass'
     */
    Util.getClassName = function (classObject) {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(classObject.constructor.toString());
        return (results && results.length > 1) ? results[1] : '';
    };
    /**
     * Creates and returns a new debounced version of the passed function which will postpone its execution until after
     * wait milliseconds have elapsed since the last time it was invoked.
     *
     * @method debounce
     * @param callback {Function} The function that should be executed.
     * @param wait {number} Milliseconds to elapsed before invoking the callback.
     * @param immediate {boolean} Pass true for the immediate parameter to cause debounce to trigger the function on the leading instead of the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks on a "submit" button from firing a second time.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @public
     * @static
     * @example
     *      Util.debounce(this._onBreakpointChange, 250, false, this);
     */
    Util.debounce = function (callback, wait, immediate, callbackScope) {
        var timeout;
        var result;
        var debounced = function () {
            var args = arguments;
            function delayed() {
                if (immediate == false) {
                    result = callback.apply(callbackScope, args);
                }
                timeout = null;
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            else if (immediate === true) {
                result = callback.apply(callbackScope, args);
            }
            timeout = setTimeout(delayed, wait);
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
        };
        return debounced;
    };
    /**
     * Keeps track of the count for the uniqueId method.
     *
     * @property _idCounter
     * @type {int}
     * @private
     * @static
     */
    Util._idCounter = 0;
    return Util;
})();
module.exports = Util;

},{}]},{},[2]);
