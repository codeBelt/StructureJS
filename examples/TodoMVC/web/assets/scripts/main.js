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
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Handlebars=a.Handlebars||b()}(this,function(){var a=function(){"use strict";function a(a){this.string=a}var b;return a.prototype.toString=function(){return""+this.string},b=a}(),b=function(a){"use strict";function b(a){return i[a]}function c(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function d(a){return a instanceof h?a.toString():null==a?"":a?(a=""+a,k.test(a)?a.replace(j,b):a):a+""}function e(a){return a||0===a?n(a)&&0===a.length?!0:!1:!0}function f(a,b){return(a?a+".":"")+b}var g={},h=a,i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},j=/[&<>"'`]/g,k=/[&<>"'`]/;g.extend=c;var l=Object.prototype.toString;g.toString=l;var m=function(a){return"function"==typeof a};m(/x/)&&(m=function(a){return"function"==typeof a&&"[object Function]"===l.call(a)});var m;g.isFunction=m;var n=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===l.call(a):!1};return g.isArray=n,g.escapeExpression=d,g.isEmpty=e,g.appendContextPath=f,g}(a),c=function(){"use strict";function a(a,b){var d;b&&b.firstLine&&(d=b.firstLine,a+=" - "+d+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<c.length;f++)this[c[f]]=e[c[f]];d&&(this.lineNumber=d,this.column=b.firstColumn)}var b,c=["description","fileName","lineNumber","message","name","number","stack"];return a.prototype=new Error,b=a}(),d=function(a,b){"use strict";function c(a,b){this.helpers=a||{},this.partials=b||{},d(this)}function d(a){a.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new g("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(k(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=q(c.data);g.contextPath=f.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){if(!b)throw new g("Must pass iterator to #each");var c,d,e=b.fn,h=b.inverse,i=0,j="";if(b.data&&b.ids&&(d=f.appendContextPath(b.data.contextPath,b.ids[0])+"."),l(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(k(a))for(var m=a.length;m>i;i++)c&&(c.index=i,c.first=0===i,c.last=i===a.length-1,d&&(c.contextPath=d+i)),j+=e(a[i],{data:c});else for(var n in a)a.hasOwnProperty(n)&&(c&&(c.key=n,c.index=i,c.first=0===i,d&&(c.contextPath=d+n)),j+=e(a[n],{data:c}),i++);return 0===i&&(j=h(this)),j}),a.registerHelper("if",function(a,b){return l(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||f.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){l(a)&&(a=a.call(this));var c=b.fn;if(f.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=q(b.data);d.contextPath=f.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}var e={},f=a,g=b,h="2.0.0";e.VERSION=h;var i=6;e.COMPILER_REVISION=i;var j={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};e.REVISION_CHANGES=j;var k=f.isArray,l=f.isFunction,m=f.toString,n="[object Object]";e.HandlebarsEnvironment=c,c.prototype={constructor:c,logger:o,log:p,registerHelper:function(a,b){if(m.call(a)===n){if(b)throw new g("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){m.call(a)===n?f.extend(this.partials,a):this.partials[a]=b},unregisterPartial:function(a){delete this.partials[a]}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(o.level<=a){var c=o.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};e.logger=o;var p=o.log;e.log=p;var q=function(a){var b=f.extend({},a);return b._parent=a,b};return e.createFrame=q,e}(b,c),e=function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=m;if(b!==c){if(c>b){var d=n[c],e=n[b];throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new l("No environment passed to template");if(!a||!a.main)throw new l("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var c=function(c,d,e,f,g,h,i,j,m){g&&(f=k.extend({},f,g));var n=b.VM.invokePartial.call(this,c,e,f,h,i,j,m);if(null==n&&b.compile){var o={helpers:h,partials:i,data:j,depths:m};i[e]=b.compile(c,{data:void 0!==j,compat:a.compat},b),n=i[e](f,o)}if(null!=n){if(d){for(var p=n.split("\n"),q=0,r=p.length;r>q&&(p[q]||q+1!==r);q++)p[q]=d+p[q];n=p.join("\n")}return n}throw new l("The partial "+e+" could not be compiled when running in runtime-only mode")},d={lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:k.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c){var d=this.programs[a],e=this.fn(a);return b||c?d=f(this,a,e,b,c):d||(d=this.programs[a]=f(this,a,e)),d},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=k.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;e._setup(c),!c.partial&&a.useData&&(f=i(b,f));var g;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(d,b,d.helpers,d.partials,f,g)};return e.isTop=!0,e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(b,c,e){if(a.useDepths&&!e)throw new l("must pass parent depths");return f(d,b,a[b],c,e)},e}function f(a,b,c,d,e){var f=function(b,f){return f=f||{},c.call(a,b,a.helpers,a.partials,f.data||d,e&&[b].concat(e))};return f.program=b,f.depth=e?e.length:0,f}function g(a,b,c,d,e,f,g){var h={partial:!0,helpers:d,partials:e,data:f,depths:g};if(void 0===a)throw new l("The partial "+b+" could not be found");return a instanceof Function?a(c,h):void 0}function h(){return""}function i(a,b){return b&&"root"in b||(b=b?o(b):{},b.root=a),b}var j={},k=a,l=b,m=c.COMPILER_REVISION,n=c.REVISION_CHANGES,o=c.createFrame;return j.checkRevision=d,j.template=e,j.program=f,j.invokePartial=g,j.noop=h,j}(b,c,d),f=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c,j=d,k=e,l=function(){var a=new g.HandlebarsEnvironment;return j.extend(a,g),a.SafeString=h,a.Exception=i,a.Utils=j,a.escapeExpression=j.escapeExpression,a.VM=k,a.template=function(b){return k.template(b,a)},a},m=l();return m.create=l,m["default"]=m,f=m}(d,a,c,b,e),g=function(a){"use strict";function b(a){a=a||{},this.firstLine=a.first_line,this.firstColumn=a.first_column,this.lastColumn=a.last_column,this.lastLine=a.last_line}var c,d=a,e={ProgramNode:function(a,c,d){b.call(this,d),this.type="program",this.statements=a,this.strip=c},MustacheNode:function(a,c,d,f,g){if(b.call(this,g),this.type="mustache",this.strip=f,null!=d&&d.charAt){var h=d.charAt(3)||d.charAt(2);this.escaped="{"!==h&&"&"!==h}else this.escaped=!!d;this.sexpr=a instanceof e.SexprNode?a:new e.SexprNode(a,c),this.id=this.sexpr.id,this.params=this.sexpr.params,this.hash=this.sexpr.hash,this.eligibleHelper=this.sexpr.eligibleHelper,this.isHelper=this.sexpr.isHelper},SexprNode:function(a,c,d){b.call(this,d),this.type="sexpr",this.hash=c;var e=this.id=a[0],f=this.params=a.slice(1);this.isHelper=!(!f.length&&!c),this.eligibleHelper=this.isHelper||e.isSimple},PartialNode:function(a,c,d,e,f){b.call(this,f),this.type="partial",this.partialName=a,this.context=c,this.hash=d,this.strip=e,this.strip.inlineStandalone=!0},BlockNode:function(a,c,d,e,f){b.call(this,f),this.type="block",this.mustache=a,this.program=c,this.inverse=d,this.strip=e,d&&!c&&(this.isInverse=!0)},RawBlockNode:function(a,c,f,g){if(b.call(this,g),a.sexpr.id.original!==f)throw new d(a.sexpr.id.original+" doesn't match "+f,this);c=new e.ContentNode(c,g),this.type="block",this.mustache=a,this.program=new e.ProgramNode([c],{},g)},ContentNode:function(a,c){b.call(this,c),this.type="content",this.original=this.string=a},HashNode:function(a,c){b.call(this,c),this.type="hash",this.pairs=a},IdNode:function(a,c){b.call(this,c),this.type="ID";for(var e="",f=[],g=0,h="",i=0,j=a.length;j>i;i++){var k=a[i].part;if(e+=(a[i].separator||"")+k,".."===k||"."===k||"this"===k){if(f.length>0)throw new d("Invalid path: "+e,this);".."===k?(g++,h+="../"):this.isScoped=!0}else f.push(k)}this.original=e,this.parts=f,this.string=f.join("."),this.depth=g,this.idName=h+this.string,this.isSimple=1===a.length&&!this.isScoped&&0===g,this.stringModeValue=this.string},PartialNameNode:function(a,c){b.call(this,c),this.type="PARTIAL_NAME",this.name=a.original},DataNode:function(a,c){b.call(this,c),this.type="DATA",this.id=a,this.stringModeValue=a.stringModeValue,this.idName="@"+a.stringModeValue},StringNode:function(a,c){b.call(this,c),this.type="STRING",this.original=this.string=this.stringModeValue=a},NumberNode:function(a,c){b.call(this,c),this.type="NUMBER",this.original=this.number=a,this.stringModeValue=Number(a)},BooleanNode:function(a,c){b.call(this,c),this.type="BOOLEAN",this.bool=a,this.stringModeValue="true"===a},CommentNode:function(a,c){b.call(this,c),this.type="comment",this.comment=a,this.strip={inlineStandalone:!0}}};return c=e}(c),h=function(){"use strict";var a,b=function(){function a(){this.yy={}}var b={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,CONTENT:12,COMMENT:13,openRawBlock:14,END_RAW_BLOCK:15,OPEN_RAW_BLOCK:16,sexpr:17,CLOSE_RAW_BLOCK:18,openBlock:19,block_option0:20,closeBlock:21,openInverse:22,block_option1:23,OPEN_BLOCK:24,CLOSE:25,OPEN_INVERSE:26,inverseAndProgram:27,INVERSE:28,OPEN_ENDBLOCK:29,path:30,OPEN:31,OPEN_UNESCAPED:32,CLOSE_UNESCAPED:33,OPEN_PARTIAL:34,partialName:35,param:36,partial_option0:37,partial_option1:38,sexpr_repetition0:39,sexpr_option0:40,dataName:41,STRING:42,NUMBER:43,BOOLEAN:44,OPEN_SEXPR:45,CLOSE_SEXPR:46,hash:47,hash_repetition_plus0:48,hashSegment:49,ID:50,EQUALS:51,DATA:52,pathSegments:53,SEP:54,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",12:"CONTENT",13:"COMMENT",15:"END_RAW_BLOCK",16:"OPEN_RAW_BLOCK",18:"CLOSE_RAW_BLOCK",24:"OPEN_BLOCK",25:"CLOSE",26:"OPEN_INVERSE",28:"INVERSE",29:"OPEN_ENDBLOCK",31:"OPEN",32:"OPEN_UNESCAPED",33:"CLOSE_UNESCAPED",34:"OPEN_PARTIAL",42:"STRING",43:"NUMBER",44:"BOOLEAN",45:"OPEN_SEXPR",46:"CLOSE_SEXPR",50:"ID",51:"EQUALS",52:"DATA",54:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[10,3],[14,3],[9,4],[9,4],[19,3],[22,3],[27,2],[21,3],[8,3],[8,3],[11,5],[11,4],[17,3],[17,1],[36,1],[36,1],[36,1],[36,1],[36,1],[36,3],[47,1],[49,3],[35,1],[35,1],[35,1],[41,2],[30,1],[53,3],[53,1],[6,0],[6,2],[20,0],[20,1],[23,0],[23,1],[37,0],[37,1],[38,0],[38,1],[39,0],[39,2],[40,0],[40,1],[48,1],[48,2]],performAction:function(a,b,c,d,e,f){var g=f.length-1;switch(e){case 1:return d.prepareProgram(f[g-1].statements,!0),f[g-1];case 2:this.$=new d.ProgramNode(d.prepareProgram(f[g]),{},this._$);break;case 3:this.$=f[g];break;case 4:this.$=f[g];break;case 5:this.$=f[g];break;case 6:this.$=f[g];break;case 7:this.$=new d.ContentNode(f[g],this._$);break;case 8:this.$=new d.CommentNode(f[g],this._$);break;case 9:this.$=new d.RawBlockNode(f[g-2],f[g-1],f[g],this._$);break;case 10:this.$=new d.MustacheNode(f[g-1],null,"","",this._$);break;case 11:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!1,this._$);break;case 12:this.$=d.prepareBlock(f[g-3],f[g-2],f[g-1],f[g],!0,this._$);break;case 13:this.$=new d.MustacheNode(f[g-1],null,f[g-2],d.stripFlags(f[g-2],f[g]),this._$);break;case 14:this.$=new d.MustacheNode(f[g-1],null,f[g-2],d.stripFlags(f[g-2],f[g]),this._$);break;case 15:this.$={strip:d.stripFlags(f[g-1],f[g-1]),program:f[g]};break;case 16:this.$={path:f[g-1],strip:d.stripFlags(f[g-2],f[g])};break;case 17:this.$=new d.MustacheNode(f[g-1],null,f[g-2],d.stripFlags(f[g-2],f[g]),this._$);break;case 18:this.$=new d.MustacheNode(f[g-1],null,f[g-2],d.stripFlags(f[g-2],f[g]),this._$);break;case 19:this.$=new d.PartialNode(f[g-3],f[g-2],f[g-1],d.stripFlags(f[g-4],f[g]),this._$);break;case 20:this.$=new d.PartialNode(f[g-2],void 0,f[g-1],d.stripFlags(f[g-3],f[g]),this._$);break;case 21:this.$=new d.SexprNode([f[g-2]].concat(f[g-1]),f[g],this._$);break;case 22:this.$=new d.SexprNode([f[g]],null,this._$);break;case 23:this.$=f[g];break;case 24:this.$=new d.StringNode(f[g],this._$);break;case 25:this.$=new d.NumberNode(f[g],this._$);break;case 26:this.$=new d.BooleanNode(f[g],this._$);break;case 27:this.$=f[g];break;case 28:f[g-1].isHelper=!0,this.$=f[g-1];break;case 29:this.$=new d.HashNode(f[g],this._$);break;case 30:this.$=[f[g-2],f[g]];break;case 31:this.$=new d.PartialNameNode(f[g],this._$);break;case 32:this.$=new d.PartialNameNode(new d.StringNode(f[g],this._$),this._$);break;case 33:this.$=new d.PartialNameNode(new d.NumberNode(f[g],this._$));break;case 34:this.$=new d.DataNode(f[g],this._$);break;case 35:this.$=new d.IdNode(f[g],this._$);break;case 36:f[g-2].push({part:f[g],separator:f[g-1]}),this.$=f[g-2];break;case 37:this.$=[{part:f[g]}];break;case 38:this.$=[];break;case 39:f[g-1].push(f[g]);break;case 48:this.$=[];break;case 49:f[g-1].push(f[g]);break;case 52:this.$=[f[g]];break;case 53:f[g-1].push(f[g])}},table:[{3:1,4:2,5:[2,38],6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],31:[2,38],32:[2,38],34:[2,38]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:[1,10],13:[1,11],14:16,16:[1,20],19:14,22:15,24:[1,18],26:[1,19],28:[2,2],29:[2,2],31:[1,12],32:[1,13],34:[1,17]},{1:[2,1]},{5:[2,39],12:[2,39],13:[2,39],16:[2,39],24:[2,39],26:[2,39],28:[2,39],29:[2,39],31:[2,39],32:[2,39],34:[2,39]},{5:[2,3],12:[2,3],13:[2,3],16:[2,3],24:[2,3],26:[2,3],28:[2,3],29:[2,3],31:[2,3],32:[2,3],34:[2,3]},{5:[2,4],12:[2,4],13:[2,4],16:[2,4],24:[2,4],26:[2,4],28:[2,4],29:[2,4],31:[2,4],32:[2,4],34:[2,4]},{5:[2,5],12:[2,5],13:[2,5],16:[2,5],24:[2,5],26:[2,5],28:[2,5],29:[2,5],31:[2,5],32:[2,5],34:[2,5]},{5:[2,6],12:[2,6],13:[2,6],16:[2,6],24:[2,6],26:[2,6],28:[2,6],29:[2,6],31:[2,6],32:[2,6],34:[2,6]},{5:[2,7],12:[2,7],13:[2,7],16:[2,7],24:[2,7],26:[2,7],28:[2,7],29:[2,7],31:[2,7],32:[2,7],34:[2,7]},{5:[2,8],12:[2,8],13:[2,8],16:[2,8],24:[2,8],26:[2,8],28:[2,8],29:[2,8],31:[2,8],32:[2,8],34:[2,8]},{17:21,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:27,30:22,41:23,50:[1,26],52:[1,25],53:24},{4:28,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{4:29,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{12:[1,30]},{30:32,35:31,42:[1,33],43:[1,34],50:[1,26],53:24},{17:35,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:36,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:37,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[1,38]},{18:[2,48],25:[2,48],33:[2,48],39:39,42:[2,48],43:[2,48],44:[2,48],45:[2,48],46:[2,48],50:[2,48],52:[2,48]},{18:[2,22],25:[2,22],33:[2,22],46:[2,22]},{18:[2,35],25:[2,35],33:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],46:[2,35],50:[2,35],52:[2,35],54:[1,40]},{30:41,50:[1,26],53:24},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],52:[2,37],54:[2,37]},{33:[1,42]},{20:43,27:44,28:[1,45],29:[2,40]},{23:46,27:47,28:[1,45],29:[2,42]},{15:[1,48]},{25:[2,46],30:51,36:49,38:50,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],47:57,48:58,49:60,50:[1,59],52:[1,25],53:24},{25:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],50:[2,31],52:[2,31]},{25:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],50:[2,32],52:[2,32]},{25:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],50:[2,33],52:[2,33]},{25:[1,61]},{25:[1,62]},{18:[1,63]},{5:[2,17],12:[2,17],13:[2,17],16:[2,17],24:[2,17],26:[2,17],28:[2,17],29:[2,17],31:[2,17],32:[2,17],34:[2,17]},{18:[2,50],25:[2,50],30:51,33:[2,50],36:65,40:64,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],46:[2,50],47:66,48:58,49:60,50:[1,59],52:[1,25],53:24},{50:[1,67]},{18:[2,34],25:[2,34],33:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],46:[2,34],50:[2,34],52:[2,34]},{5:[2,18],12:[2,18],13:[2,18],16:[2,18],24:[2,18],26:[2,18],28:[2,18],29:[2,18],31:[2,18],32:[2,18],34:[2,18]},{21:68,29:[1,69]},{29:[2,41]},{4:70,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{21:71,29:[1,69]},{29:[2,43]},{5:[2,9],12:[2,9],13:[2,9],16:[2,9],24:[2,9],26:[2,9],28:[2,9],29:[2,9],31:[2,9],32:[2,9],34:[2,9]},{25:[2,44],37:72,47:73,48:58,49:60,50:[1,74]},{25:[1,75]},{18:[2,23],25:[2,23],33:[2,23],42:[2,23],43:[2,23],44:[2,23],45:[2,23],46:[2,23],50:[2,23],52:[2,23]},{18:[2,24],25:[2,24],33:[2,24],42:[2,24],43:[2,24],44:[2,24],45:[2,24],46:[2,24],50:[2,24],52:[2,24]},{18:[2,25],25:[2,25],33:[2,25],42:[2,25],43:[2,25],44:[2,25],45:[2,25],46:[2,25],50:[2,25],52:[2,25]},{18:[2,26],25:[2,26],33:[2,26],42:[2,26],43:[2,26],44:[2,26],45:[2,26],46:[2,26],50:[2,26],52:[2,26]},{18:[2,27],25:[2,27],33:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],46:[2,27],50:[2,27],52:[2,27]},{17:76,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[2,47]},{18:[2,29],25:[2,29],33:[2,29],46:[2,29],49:77,50:[1,74]},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],51:[1,78],52:[2,37],54:[2,37]},{18:[2,52],25:[2,52],33:[2,52],46:[2,52],50:[2,52]},{12:[2,13],13:[2,13],16:[2,13],24:[2,13],26:[2,13],28:[2,13],29:[2,13],31:[2,13],32:[2,13],34:[2,13]},{12:[2,14],13:[2,14],16:[2,14],24:[2,14],26:[2,14],28:[2,14],29:[2,14],31:[2,14],32:[2,14],34:[2,14]},{12:[2,10]},{18:[2,21],25:[2,21],33:[2,21],46:[2,21]},{18:[2,49],25:[2,49],33:[2,49],42:[2,49],43:[2,49],44:[2,49],45:[2,49],46:[2,49],50:[2,49],52:[2,49]},{18:[2,51],25:[2,51],33:[2,51],46:[2,51]},{18:[2,36],25:[2,36],33:[2,36],42:[2,36],43:[2,36],44:[2,36],45:[2,36],46:[2,36],50:[2,36],52:[2,36],54:[2,36]},{5:[2,11],12:[2,11],13:[2,11],16:[2,11],24:[2,11],26:[2,11],28:[2,11],29:[2,11],31:[2,11],32:[2,11],34:[2,11]},{30:79,50:[1,26],53:24},{29:[2,15]},{5:[2,12],12:[2,12],13:[2,12],16:[2,12],24:[2,12],26:[2,12],28:[2,12],29:[2,12],31:[2,12],32:[2,12],34:[2,12]},{25:[1,80]},{25:[2,45]},{51:[1,78]},{5:[2,20],12:[2,20],13:[2,20],16:[2,20],24:[2,20],26:[2,20],28:[2,20],29:[2,20],31:[2,20],32:[2,20],34:[2,20]},{46:[1,81]},{18:[2,53],25:[2,53],33:[2,53],46:[2,53],50:[2,53]},{30:51,36:82,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],50:[1,26],52:[1,25],53:24},{25:[1,83]},{5:[2,19],12:[2,19],13:[2,19],16:[2,19],24:[2,19],26:[2,19],28:[2,19],29:[2,19],31:[2,19],32:[2,19],34:[2,19]},{18:[2,28],25:[2,28],33:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],46:[2,28],50:[2,28],52:[2,28]},{18:[2,30],25:[2,30],33:[2,30],46:[2,30],50:[2,30]},{5:[2,16],12:[2,16],13:[2,16],16:[2,16],24:[2,16],26:[2,16],28:[2,16],29:[2,16],31:[2,16],32:[2,16],34:[2,16]}],defaultActions:{4:[2,1],44:[2,41],47:[2,43],57:[2,47],63:[2,10],70:[2,15],73:[2,45]},parseError:function(a){throw new Error(a)},parse:function(a){function b(){var a;return a=c.lexer.lex()||1,"number"!=typeof a&&(a=c.symbols_[a]||a),a}var c=this,d=[0],e=[null],f=[],g=this.table,h="",i=0,j=0,k=0;this.lexer.setInput(a),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,"undefined"==typeof this.lexer.yylloc&&(this.lexer.yylloc={});var l=this.lexer.yylloc;f.push(l);var m=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var n,o,p,q,r,s,t,u,v,w={};;){if(p=d[d.length-1],this.defaultActions[p]?q=this.defaultActions[p]:((null===n||"undefined"==typeof n)&&(n=b()),q=g[p]&&g[p][n]),"undefined"==typeof q||!q.length||!q[0]){var x="";if(!k){v=[];for(s in g[p])this.terminals_[s]&&s>2&&v.push("'"+this.terminals_[s]+"'");x=this.lexer.showPosition?"Parse error on line "+(i+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+v.join(", ")+", got '"+(this.terminals_[n]||n)+"'":"Parse error on line "+(i+1)+": Unexpected "+(1==n?"end of input":"'"+(this.terminals_[n]||n)+"'"),this.parseError(x,{text:this.lexer.match,token:this.terminals_[n]||n,line:this.lexer.yylineno,loc:l,expected:v})}}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+p+", token: "+n);switch(q[0]){case 1:d.push(n),e.push(this.lexer.yytext),f.push(this.lexer.yylloc),d.push(q[1]),n=null,o?(n=o,o=null):(j=this.lexer.yyleng,h=this.lexer.yytext,i=this.lexer.yylineno,l=this.lexer.yylloc,k>0&&k--);break;case 2:if(t=this.productions_[q[1]][1],w.$=e[e.length-t],w._$={first_line:f[f.length-(t||1)].first_line,last_line:f[f.length-1].last_line,first_column:f[f.length-(t||1)].first_column,last_column:f[f.length-1].last_column},m&&(w._$.range=[f[f.length-(t||1)].range[0],f[f.length-1].range[1]]),r=this.performAction.call(w,h,j,i,this.yy,q[1],e,f),"undefined"!=typeof r)return r;t&&(d=d.slice(0,-1*t*2),e=e.slice(0,-1*t),f=f.slice(0,-1*t)),d.push(this.productions_[q[1]][0]),e.push(w.$),f.push(w._$),u=g[d[d.length-2]][d[d.length-1]],d.push(u);break;case 3:return!0}}return!0}},c=function(){var a={EOF:1,parseError:function(a,b){if(!this.yy.parser)throw new Error(a);this.yy.parser.parseError(a,b)},setInput:function(a){return this._input=a,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var a=this._input[0];this.yytext+=a,this.yyleng++,this.offset++,this.match+=a,this.matched+=a;var b=a.match(/(?:\r\n?|\n).*/g);return b?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),a},unput:function(a){var b=a.length,c=a.split(/(?:\r\n?|\n)/g);this._input=a+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-b-1),this.offset-=b;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),c.length-1&&(this.yylineno-=c.length-1);var e=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:c?(c.length===d.length?this.yylloc.first_column:0)+d[d.length-c.length].length-c[0].length:this.yylloc.first_column-b},this.options.ranges&&(this.yylloc.range=[e[0],e[0]+this.yyleng-b]),this},more:function(){return this._more=!0,this},less:function(a){this.unput(this.match.slice(a))},pastInput:function(){var a=this.matched.substr(0,this.matched.length-this.match.length);return(a.length>20?"...":"")+a.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var a=this.match;return a.length<20&&(a+=this._input.substr(0,20-a.length)),(a.substr(0,20)+(a.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var a=this.pastInput(),b=new Array(a.length+1).join("-");return a+this.upcomingInput()+"\n"+b+"^"},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var a,b,c,d,e;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),g=0;g<f.length&&(c=this._input.match(this.rules[f[g]]),!c||b&&!(c[0].length>b[0].length)||(b=c,d=g,this.options.flex));g++);return b?(e=b[0].match(/(?:\r\n?|\n).*/g),e&&(this.yylineno+=e.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:e?e[e.length-1].length-e[e.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+b[0].length},this.yytext+=b[0],this.match+=b[0],this.matches=b,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(b[0].length),this.matched+=b[0],a=this.performAction.call(this,this.yy,this,f[d],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a?a:void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return"undefined"!=typeof a?a:this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(a){this.begin(a)}};return a.options={},a.performAction=function(a,b,c,d){function e(a,c){return b.yytext=b.yytext.substr(a,b.yyleng-c)}switch(c){case 0:if("\\\\"===b.yytext.slice(-2)?(e(0,1),this.begin("mu")):"\\"===b.yytext.slice(-1)?(e(0,1),this.begin("emu")):this.begin("mu"),b.yytext)return 12;break;case 1:return 12;case 2:return this.popState(),12;case 3:return b.yytext=b.yytext.substr(5,b.yyleng-9),this.popState(),15;case 4:return 12;case 5:return e(0,4),this.popState(),13;case 6:return 45;case 7:return 46;case 8:return 16;case 9:return this.popState(),this.begin("raw"),18;case 10:return 34;case 11:return 24;case 12:return 29;case 13:return this.popState(),28;case 14:return this.popState(),28;case 15:return 26;case 16:return 26;case 17:return 32;case 18:return 31;case 19:this.popState(),this.begin("com");break;case 20:return e(3,5),this.popState(),13;case 21:return 31;case 22:return 51;case 23:return 50;case 24:return 50;case 25:return 54;case 26:break;case 27:return this.popState(),33;case 28:return this.popState(),25;case 29:return b.yytext=e(1,2).replace(/\\"/g,'"'),42;case 30:return b.yytext=e(1,2).replace(/\\'/g,"'"),42;case 31:return 52;case 32:return 44;case 33:return 44;case 34:return 43;case 35:return 50;case 36:return b.yytext=e(1,2),50;case 37:return"INVALID";case 38:return 5}},a.rules=[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/],a.conditions={mu:{rules:[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[5],inclusive:!1},raw:{rules:[3,4],inclusive:!1},INITIAL:{rules:[0,1,38],inclusive:!0}},a}();return b.lexer=c,a.prototype=b,b.Parser=a,new a}();return a=b}(),i=function(a){"use strict";function b(a,b){return{left:"~"===a.charAt(2),right:"~"===b.charAt(b.length-3)}}function c(a,b,c,d,i,k){if(a.sexpr.id.original!==d.path.original)throw new j(a.sexpr.id.original+" doesn't match "+d.path.original,a);var l=c&&c.program,m={left:a.strip.left,right:d.strip.right,openStandalone:f(b.statements),closeStandalone:e((l||b).statements)};if(a.strip.right&&g(b.statements,null,!0),l){var n=c.strip;n.left&&h(b.statements,null,!0),n.right&&g(l.statements,null,!0),d.strip.left&&h(l.statements,null,!0),e(b.statements)&&f(l.statements)&&(h(b.statements),g(l.statements))}else d.strip.left&&h(b.statements,null,!0);return i?new this.BlockNode(a,l,b,m,k):new this.BlockNode(a,b,l,m,k)}function d(a,b){for(var c=0,d=a.length;d>c;c++){var i=a[c],j=i.strip;if(j){var k=e(a,c,b,"partial"===i.type),l=f(a,c,b),m=j.openStandalone&&k,n=j.closeStandalone&&l,o=j.inlineStandalone&&k&&l;j.right&&g(a,c,!0),j.left&&h(a,c,!0),o&&(g(a,c),h(a,c)&&"partial"===i.type&&(i.indent=/([ \t]+$)/.exec(a[c-1].original)?RegExp.$1:"")),m&&(g((i.program||i.inverse).statements),h(a,c)),n&&(g(a,c),h((i.inverse||i.program).statements))}}return a}function e(a,b,c){void 0===b&&(b=a.length);var d=a[b-1],e=a[b-2];return d?"content"===d.type?(e||!c?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(d.original):void 0:c}function f(a,b,c){void 0===b&&(b=-1);var d=a[b+1],e=a[b+2];return d?"content"===d.type?(e||!c?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(d.original):void 0:c}function g(a,b,c){var d=a[null==b?0:b+1];if(d&&"content"===d.type&&(c||!d.rightStripped)){var e=d.string;d.string=d.string.replace(c?/^\s+/:/^[ \t]*\r?\n?/,""),d.rightStripped=d.string!==e}}function h(a,b,c){var d=a[null==b?a.length-1:b-1];if(d&&"content"===d.type&&(c||!d.leftStripped)){var e=d.string;return d.string=d.string.replace(c?/\s+$/:/[ \t]+$/,""),d.leftStripped=d.string!==e,d.leftStripped}}var i={},j=a;return i.stripFlags=b,i.prepareBlock=c,i.prepareProgram=d,i}(c),j=function(a,b,c,d){"use strict";function e(a){return a.constructor===h.ProgramNode?a:(g.yy=k,g.parse(a))}var f={},g=a,h=b,i=c,j=d.extend;f.parser=g;var k={};return j(k,i,h),f.parse=e,f}(h,g,i,b),k=function(a,b){"use strict";function c(){}function d(a,b,c){if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new h("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+a);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var d=c.parse(a),e=(new c.Compiler).compile(d,b);return(new c.JavaScriptCompiler).compile(e,b)}function e(a,b,c){function d(){var d=c.parse(a),e=(new c.Compiler).compile(d,b),f=(new c.JavaScriptCompiler).compile(e,b,void 0,!0);return c.template(f)}if(null==a||"string"!=typeof a&&a.constructor!==c.AST.ProgramNode)throw new h("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+a);b=b||{},"data"in b||(b.data=!0),b.compat&&(b.useDepths=!0);var e,f=function(a,b){return e||(e=d()),e.call(this,a,b)};return f._setup=function(a){return e||(e=d()),e._setup(a)},f._child=function(a,b,c){return e||(e=d()),e._child(a,b,c)},f}function f(a,b){if(a===b)return!0;if(i(a)&&i(b)&&a.length===b.length){for(var c=0;c<a.length;c++)if(!f(a[c],b[c]))return!1;return!0}}var g={},h=a,i=b.isArray,j=[].slice;return g.Compiler=c,c.prototype={compiler:c,equals:function(a){var b=this.opcodes.length;if(a.opcodes.length!==b)return!1;for(var c=0;b>c;c++){var d=this.opcodes[c],e=a.opcodes[c];if(d.opcode!==e.opcode||!f(d.args,e.args))return!1}for(b=this.children.length,c=0;b>c;c++)if(!this.children[c].equals(a.children[c]))return!1;return!0},guid:0,compile:function(a,b){this.opcodes=[],this.children=[],this.depths={list:[]},this.options=b,this.stringParams=b.stringParams,this.trackIds=b.trackIds;var c=this.options.knownHelpers;if(this.options.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,"if":!0,unless:!0,"with":!0,log:!0,lookup:!0},c)for(var d in c)this.options.knownHelpers[d]=c[d];return this.accept(a)},accept:function(a){return this[a.type](a)},program:function(a){for(var b=a.statements,c=0,d=b.length;d>c;c++)this.accept(b[c]);return this.isSimple=1===d,this.depths.list=this.depths.list.sort(function(a,b){return a-b}),this},compileProgram:function(a){var b,c=(new this.compiler).compile(a,this.options),d=this.guid++;
this.usePartial=this.usePartial||c.usePartial,this.children[d]=c;for(var e=0,f=c.depths.list.length;f>e;e++)b=c.depths.list[e],2>b||this.addDepth(b-1);return d},block:function(a){var b=a.mustache,c=a.program,d=a.inverse;c&&(c=this.compileProgram(c)),d&&(d=this.compileProgram(d));var e=b.sexpr,f=this.classifySexpr(e);"helper"===f?this.helperSexpr(e,c,d):"simple"===f?(this.simpleSexpr(e),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("blockValue",e.id.original)):(this.ambiguousSexpr(e,c,d),this.opcode("pushProgram",c),this.opcode("pushProgram",d),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},hash:function(a){var b,c,d=a.pairs;for(this.opcode("pushHash"),b=0,c=d.length;c>b;b++)this.pushParam(d[b][1]);for(;b--;)this.opcode("assignToHash",d[b][0]);this.opcode("popHash")},partial:function(a){var b=a.partialName;this.usePartial=!0,a.hash?this.accept(a.hash):this.opcode("push","undefined"),a.context?this.accept(a.context):(this.opcode("getContext",0),this.opcode("pushContext")),this.opcode("invokePartial",b.name,a.indent||""),this.opcode("append")},content:function(a){a.string&&this.opcode("appendContent",a.string)},mustache:function(a){this.sexpr(a.sexpr),a.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},ambiguousSexpr:function(a,b,c){var d=a.id,e=d.parts[0],f=null!=b||null!=c;this.opcode("getContext",d.depth),this.opcode("pushProgram",b),this.opcode("pushProgram",c),this.ID(d),this.opcode("invokeAmbiguous",e,f)},simpleSexpr:function(a){var b=a.id;"DATA"===b.type?this.DATA(b):b.parts.length?this.ID(b):(this.addDepth(b.depth),this.opcode("getContext",b.depth),this.opcode("pushContext")),this.opcode("resolvePossibleLambda")},helperSexpr:function(a,b,c){var d=this.setupFullMustacheParams(a,b,c),e=a.id,f=e.parts[0];if(this.options.knownHelpers[f])this.opcode("invokeKnownHelper",d.length,f);else{if(this.options.knownHelpersOnly)throw new h("You specified knownHelpersOnly, but used the unknown helper "+f,a);e.falsy=!0,this.ID(e),this.opcode("invokeHelper",d.length,e.original,e.isSimple)}},sexpr:function(a){var b=this.classifySexpr(a);"simple"===b?this.simpleSexpr(a):"helper"===b?this.helperSexpr(a):this.ambiguousSexpr(a)},ID:function(a){this.addDepth(a.depth),this.opcode("getContext",a.depth);var b=a.parts[0];b?this.opcode("lookupOnContext",a.parts,a.falsy,a.isScoped):this.opcode("pushContext")},DATA:function(a){this.options.data=!0,this.opcode("lookupData",a.id.depth,a.id.parts)},STRING:function(a){this.opcode("pushString",a.string)},NUMBER:function(a){this.opcode("pushLiteral",a.number)},BOOLEAN:function(a){this.opcode("pushLiteral",a.bool)},comment:function(){},opcode:function(a){this.opcodes.push({opcode:a,args:j.call(arguments,1)})},addDepth:function(a){0!==a&&(this.depths[a]||(this.depths[a]=!0,this.depths.list.push(a)))},classifySexpr:function(a){var b=a.isHelper,c=a.eligibleHelper,d=this.options;if(c&&!b){var e=a.id.parts[0];d.knownHelpers[e]?b=!0:d.knownHelpersOnly&&(c=!1)}return b?"helper":c?"ambiguous":"simple"},pushParams:function(a){for(var b=0,c=a.length;c>b;b++)this.pushParam(a[b])},pushParam:function(a){this.stringParams?(a.depth&&this.addDepth(a.depth),this.opcode("getContext",a.depth||0),this.opcode("pushStringParam",a.stringModeValue,a.type),"sexpr"===a.type&&this.sexpr(a)):(this.trackIds&&this.opcode("pushId",a.type,a.idName||a.stringModeValue),this.accept(a))},setupFullMustacheParams:function(a,b,c){var d=a.params;return this.pushParams(d),this.opcode("pushProgram",b),this.opcode("pushProgram",c),a.hash?this.hash(a.hash):this.opcode("emptyHash"),d}},g.precompile=d,g.compile=e,g}(c,b),l=function(a,b){"use strict";function c(a){this.value=a}function d(){}var e,f=a.COMPILER_REVISION,g=a.REVISION_CHANGES,h=b;d.prototype={nameLookup:function(a,b){return d.isValidJavaScriptVariableName(b)?a+"."+b:a+"['"+b+"']"},depthedLookup:function(a){return this.aliases.lookup="this.lookup",'lookup(depths, "'+a+'")'},compilerInfo:function(){var a=f,b=g[a];return[a,b]},appendToBuffer:function(a){return this.environment.isSimple?"return "+a+";":{appendToBuffer:!0,content:a,toString:function(){return"buffer += "+a+";"}}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(a,b,c,d){this.environment=a,this.options=b,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!d,this.name=this.environment.name,this.isChild=!!c,this.context=c||{programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.compileChildren(a,b),this.useDepths=this.useDepths||a.depths.list.length||this.options.compat;var e,f,g,i=a.opcodes;for(f=0,g=i.length;g>f;f++)e=i[f],this[e.opcode].apply(this,e.args);if(this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new h("Compile completed with content left on stack");var j=this.createFunctionContext(d);if(this.isChild)return j;var k={compiler:this.compilerInfo(),main:j},l=this.context.programs;for(f=0,g=l.length;g>f;f++)l[f]&&(k[f]=l[f]);return this.environment.usePartial&&(k.usePartial=!0),this.options.data&&(k.useData=!0),this.useDepths&&(k.useDepths=!0),this.options.compat&&(k.compat=!0),d||(k.compiler=JSON.stringify(k.compiler),k=this.objectLiteral(k)),k},preamble:function(){this.lastContext=0,this.source=[]},createFunctionContext:function(a){var b="",c=this.stackVars.concat(this.registers.list);c.length>0&&(b+=", "+c.join(", "));for(var d in this.aliases)this.aliases.hasOwnProperty(d)&&(b+=", "+d+"="+this.aliases[d]);var e=["depth0","helpers","partials","data"];this.useDepths&&e.push("depths");var f=this.mergeSource(b);return a?(e.push(f),Function.apply(this,e)):"function("+e.join(",")+") {\n  "+f+"}"},mergeSource:function(a){for(var b,c,d="",e=!this.forceBuffer,f=0,g=this.source.length;g>f;f++){var h=this.source[f];h.appendToBuffer?b=b?b+"\n    + "+h.content:h.content:(b&&(d?d+="buffer += "+b+";\n  ":(c=!0,d=b+";\n  "),b=void 0),d+=h+"\n  ",this.environment.isSimple||(e=!1))}return e?(b||!d)&&(d+="return "+(b||'""')+";\n"):(a+=", buffer = "+(c?"":this.initializeBuffer()),d+=b?"return buffer + "+b+";\n":"return buffer;\n"),a&&(d="var "+a.substring(2)+(c?"":";\n  ")+d),d},blockValue:function(a){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var b=[this.contextName(0)];this.setupParams(a,0,b);var c=this.popStack();b.splice(1,0,c),this.push("blockHelperMissing.call("+b.join(", ")+")")},ambiguousBlockValue:function(){this.aliases.blockHelperMissing="helpers.blockHelperMissing";var a=[this.contextName(0)];this.setupParams("",0,a,!0),this.flushInline();var b=this.topStack();a.splice(1,0,b),this.pushSource("if (!"+this.lastHelper+") { "+b+" = blockHelperMissing.call("+a.join(", ")+"); }")},appendContent:function(a){this.pendingContent&&(a=this.pendingContent+a),this.pendingContent=a},append:function(){this.flushInline();var a=this.popStack();this.pushSource("if ("+a+" != null) { "+this.appendToBuffer(a)+" }"),this.environment.isSimple&&this.pushSource("else { "+this.appendToBuffer("''")+" }")},appendEscaped:function(){this.aliases.escapeExpression="this.escapeExpression",this.pushSource(this.appendToBuffer("escapeExpression("+this.popStack()+")"))},getContext:function(a){this.lastContext=a},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(a,b,c){var d=0,e=a.length;for(c||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(a[d++]));e>d;d++)this.replaceStack(function(c){var e=this.nameLookup(c,a[d],"context");return b?" && "+e:" != null ? "+e+" : "+c})},lookupData:function(a,b){a?this.pushStackLiteral("this.data(data, "+a+")"):this.pushStackLiteral("data");for(var c=b.length,d=0;c>d;d++)this.replaceStack(function(a){return" && "+this.nameLookup(a,b[d],"data")})},resolvePossibleLambda:function(){this.aliases.lambda="this.lambda",this.push("lambda("+this.popStack()+", "+this.contextName(0)+")")},pushStringParam:function(a,b){this.pushContext(),this.pushString(b),"sexpr"!==b&&("string"==typeof a?this.pushString(a):this.pushStackLiteral(a))},emptyHash:function(){this.pushStackLiteral("{}"),this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}"))},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var a=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push("{"+a.ids.join(",")+"}"),this.stringParams&&(this.push("{"+a.contexts.join(",")+"}"),this.push("{"+a.types.join(",")+"}")),this.push("{\n    "+a.values.join(",\n    ")+"\n  }")},pushString:function(a){this.pushStackLiteral(this.quotedString(a))},push:function(a){return this.inlineStack.push(a),a},pushLiteral:function(a){this.pushStackLiteral(a)},pushProgram:function(a){null!=a?this.pushStackLiteral(this.programExpression(a)):this.pushStackLiteral(null)},invokeHelper:function(a,b,c){this.aliases.helperMissing="helpers.helperMissing";var d=this.popStack(),e=this.setupHelper(a,b),f=(c?e.name+" || ":"")+d+" || helperMissing";this.push("(("+f+").call("+e.callParams+"))")},invokeKnownHelper:function(a,b){var c=this.setupHelper(a,b);this.push(c.name+".call("+c.callParams+")")},invokeAmbiguous:function(a,b){this.aliases.functionType='"function"',this.aliases.helperMissing="helpers.helperMissing",this.useRegister("helper");var c=this.popStack();this.emptyHash();var d=this.setupHelper(0,a,b),e=this.lastHelper=this.nameLookup("helpers",a,"helper");this.push("((helper = (helper = "+e+" || "+c+") != null ? helper : helperMissing"+(d.paramsInit?"),("+d.paramsInit:"")+"),(typeof helper === functionType ? helper.call("+d.callParams+") : helper))")},invokePartial:function(a,b){var c=[this.nameLookup("partials",a,"partial"),"'"+b+"'","'"+a+"'",this.popStack(),this.popStack(),"helpers","partials"];this.options.data?c.push("data"):this.options.compat&&c.push("undefined"),this.options.compat&&c.push("depths"),this.push("this.invokePartial("+c.join(", ")+")")},assignToHash:function(a){var b,c,d,e=this.popStack();this.trackIds&&(d=this.popStack()),this.stringParams&&(c=this.popStack(),b=this.popStack());var f=this.hash;b&&f.contexts.push("'"+a+"': "+b),c&&f.types.push("'"+a+"': "+c),d&&f.ids.push("'"+a+"': "+d),f.values.push("'"+a+"': ("+e+")")},pushId:function(a,b){"ID"===a||"DATA"===a?this.pushString(b):"sexpr"===a?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:d,compileChildren:function(a,b){for(var c,d,e=a.children,f=0,g=e.length;g>f;f++){c=e[f],d=new this.compiler;var h=this.matchExistingProgram(c);null==h?(this.context.programs.push(""),h=this.context.programs.length,c.index=h,c.name="program"+h,this.context.programs[h]=d.compile(c,b,this.context,!this.precompile),this.context.environments[h]=c,this.useDepths=this.useDepths||d.useDepths):(c.index=h,c.name="program"+h)}},matchExistingProgram:function(a){for(var b=0,c=this.context.environments.length;c>b;b++){var d=this.context.environments[b];if(d&&d.equals(a))return b}},programExpression:function(a){var b=this.environment.children[a],c=(b.depths.list,this.useDepths),d=[b.index,"data"];return c&&d.push("depths"),"this.program("+d.join(", ")+")"},useRegister:function(a){this.registers[a]||(this.registers[a]=!0,this.registers.list.push(a))},pushStackLiteral:function(a){return this.push(new c(a))},pushSource:function(a){this.pendingContent&&(this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent))),this.pendingContent=void 0),a&&this.source.push(a)},pushStack:function(a){this.flushInline();var b=this.incrStack();return this.pushSource(b+" = "+a+";"),this.compileStack.push(b),b},replaceStack:function(a){{var b,d,e,f="";this.isInline()}if(!this.isInline())throw new h("replaceStack on non-inline");var g=this.popStack(!0);if(g instanceof c)f=b=g.value,e=!0;else{d=!this.stackSlot;var i=d?this.incrStack():this.topStackName();f="("+this.push(i)+" = "+g+")",b=this.topStack()}var j=a.call(this,b);e||this.popStack(),d&&this.stackSlot--,this.push("("+f+j+")")},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var a=this.inlineStack;if(a.length){this.inlineStack=[];for(var b=0,d=a.length;d>b;b++){var e=a[b];e instanceof c?this.compileStack.push(e):this.pushStack(e)}}},isInline:function(){return this.inlineStack.length},popStack:function(a){var b=this.isInline(),d=(b?this.inlineStack:this.compileStack).pop();if(!a&&d instanceof c)return d.value;if(!b){if(!this.stackSlot)throw new h("Invalid stack pop");this.stackSlot--}return d},topStack:function(){var a=this.isInline()?this.inlineStack:this.compileStack,b=a[a.length-1];return b instanceof c?b.value:b},contextName:function(a){return this.useDepths&&a?"depths["+a+"]":"depth"+a},quotedString:function(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(this.quotedString(c)+":"+a[c]);return"{"+b.join(",")+"}"},setupHelper:function(a,b,c){var d=[],e=this.setupParams(b,a,d,c),f=this.nameLookup("helpers",b,"helper");return{params:d,paramsInit:e,name:f,callParams:[this.contextName(0)].concat(d).join(", ")}},setupOptions:function(a,b,c){var d,e,f,g={},h=[],i=[],j=[];g.name=this.quotedString(a),g.hash=this.popStack(),this.trackIds&&(g.hashIds=this.popStack()),this.stringParams&&(g.hashTypes=this.popStack(),g.hashContexts=this.popStack()),e=this.popStack(),f=this.popStack(),(f||e)&&(f||(f="this.noop"),e||(e="this.noop"),g.fn=f,g.inverse=e);for(var k=b;k--;)d=this.popStack(),c[k]=d,this.trackIds&&(j[k]=this.popStack()),this.stringParams&&(i[k]=this.popStack(),h[k]=this.popStack());return this.trackIds&&(g.ids="["+j.join(",")+"]"),this.stringParams&&(g.types="["+i.join(",")+"]",g.contexts="["+h.join(",")+"]"),this.options.data&&(g.data="data"),g},setupParams:function(a,b,c,d){var e=this.objectLiteral(this.setupOptions(a,b,c));return d?(this.useRegister("options"),c.push("options"),"options="+e):(c.push(e),"")}};for(var i="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "),j=d.RESERVED_WORDS={},k=0,l=i.length;l>k;k++)j[i[k]]=!0;return d.isValidJavaScriptVariableName=function(a){return!d.RESERVED_WORDS[a]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(a)},e=d}(d,c),m=function(a,b,c,d,e){"use strict";var f,g=a,h=b,i=c.parser,j=c.parse,k=d.Compiler,l=d.compile,m=d.precompile,n=e,o=g.create,p=function(){var a=o();return a.compile=function(b,c){return l(b,c,a)},a.precompile=function(b,c){return m(b,c,a)},a.AST=h,a.Compiler=k,a.JavaScriptCompiler=n,a.Parser=i,a.parse=j,a};return g=p(),g.create=p,g["default"]=g,f=g}(f,g,j,k,l);return m});;/*
 * THIS FILE HAS BEEN GENERATED BY AN AUTOMATED TOOL.
 * DO NOT MODIFY DIRECTLY. INSTEAD, MODIFY THE APPROPRIATE SOURCE CODE.
 *
 * Grunt-Browserify-Example v1.0.0
 * 
 * Development By: 
 * Build Date: 2015-05-12
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var Extend = require('structurejs/util/Extend');
var Stage = require('structurejs/display/Stage');
var BaseEvent = require('structurejs/event/BaseEvent');
var Router = require('structurejs/controller/Router');
var StringUtil = require('structurejs/util/StringUtil');
var ListItemCollection = require('./model/ListItemCollection');
var ListItemComponent = require('./component/ListItemComponent');
var ListItemVO = require('./model/vo/ListItemVO');
var Key = require('./constant/Key');
var FooterView = require('./view/FooterView');

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends Stage
 * @constructor
 **/
var App = (function () {

    var _super = Extend(App, Stage);

    function App() {
        _super.call(this);

        /**
         * @property _listItemCollection
         * @type {ListItemCollection}
         * @private
         */
        this._listItemCollection = null;

        /**
         * @property _$addTodoInput
         * @type {HTMLInputElement}
         * @private
         */
        this._$addTodoInput = null;

        /**
         * @property _$markAllCompleteCheckbox
         * @type {HTMLInputElement}
         * @private
         */
        this._$markAllCompleteCheckbox = null;

        /**
         * @property _todoListContainer
         * @type {DOMElement}
         * @private
         */
        this._todoListContainer = null;

        /**
         * @property _$mainView
         * @type {jQuery}
         * @private
         */
        this._$mainView = null;

        /**
         * @property _footerView
         * @type {FooterView}
         * @private
         */
        this._footerView = null;
    }

    /**
     * @overridden DOMElement.create
     */
    App.prototype.create = function () {
        _super.prototype.create.call(this);

        this._listItemCollection = new ListItemCollection();

        this._$addTodoInput = this.$element.find('.js-addInput');
        this._$markAllCompleteCheckbox = this.$element.find('.js-markAllComplete');
        this._$mainView = this.$element.find('.js-mainView');

        // Take note the "getChild" is a method of the DOMElement class. It will return the first html element from the selector name
        // that is passed in and create a DOMElement view class with that markup so we can use functionality that comes with the DOMElement class.
        this._todoListContainer = this.getChild('.js-todoList');

        this._footerView = new FooterView(this.$element.find('.js-footerView'));
        this.addChild(this._footerView);
    };

    /**
     * @overridden DOMElement.layout
     */
    App.prototype.layout = function () {

        this._footerView.updateCounts(this._listItemCollection.getCompletedCount(), this._listItemCollection.getRemainingCount());

        if (this._listItemCollection.length > 0) {
            // Take note we are working with the FooterView class jQuery view object "$element" directly.
            // All classes that extend the DOMElement class has a "$element" property which is the main view/markup the class controls.
            // If you wanted to encapsulate this more you could create a show/hide method in the FooterView class to handle it.
            this._footerView.$element.show();

            this._$mainView.show();
        } else {
            this._$mainView.hide();
            this._footerView.$element.hide();
        }

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    App.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        // Class Events
        this._listItemCollection.addEventListener('loadComplete', this._onLoadedItems, this);//
        this._footerView.addEventListener(BaseEvent.CLEAR, this._onClearCompleted, this);
        this.addEventListener(BaseEvent.CHANGE, this._onItemChange, this);
        this.addEventListener(BaseEvent.REMOVED, this._onItemRemove, this);

        // DOM Events
        this._$addTodoInput.addEventListener('keypress', this._onCreateTodo, this);
        this._$markAllCompleteCheckbox.addEventListener('change', this._onAllCompleteChange, this);

        // Load and parse the data in the browsers local storage.
        this._listItemCollection.loadStoredItems();

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    App.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        // Class Events
        this._listItemCollection.removeEventListener('loadComplete', this._onLoadedItems, this);// Example of plan string event.
        this._footerView.removeEventListener(BaseEvent.CLEAR, this._onClearCompleted, this);
        this.removeEventListener(BaseEvent.CHANGE, this._onItemChange, this);
        this.removeEventListener(BaseEvent.REMOVED, this._onItemRemove, this);

        // DOM Events
        this._$addTodoInput.removeEventListener('keypress', this._onCreateTodo, this);
        this._$markAllCompleteCheckbox.removeEventListener('change', this._onAllCompleteChange, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    App.prototype.destroy = function () {
        this._todoListContainer.destroy();
        this._listItemCollection.destroy();

        _super.prototype.destroy.call(this);
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onCreateTodo
     * @private
     */
    App.prototype._onCreateTodo = function(event) {
        var todoText = this._$addTodoInput.val().trim();

        if (event.which === Key.ENTER && todoText != '') {
            var valueObject = new ListItemVO({text: todoText});
            valueObject.id = StringUtil.createUUID();
            var childItem = new ListItemComponent(valueObject);

            this._listItemCollection.add(valueObject);
            this._todoListContainer.addChild(childItem);
            this._$addTodoInput.val('');
        }

        this.layout();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAllCompleteChange
     * @private
     */
    App.prototype._onAllCompleteChange = function(event) {
        var $target = $(event.target);

        var listItemComponent;
        if ($target.prop("checked") === true) {
            for (var i = 0; i < this._todoListContainer.numChildren; i++) {
                listItemComponent = this._todoListContainer.getChildAt(i);
                listItemComponent.setCompleted();
            }
        } else {
            for (var j = 0; j < this._todoListContainer.numChildren; j++) {
                listItemComponent = this._todoListContainer.getChildAt(j);
                listItemComponent.setUnCompleted();
            }
        }
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemRemove
     * @param event {BaseEvent}
     * @private
     */
    App.prototype._onItemRemove = function(event) {
        var listItemComponent = event.target;
        var listItemVO = listItemComponent.vo;

        this._listItemCollection.remove(listItemVO);
        this._todoListContainer.removeChild(listItemComponent);

        this.layout();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemChange
     * @param event {BaseEvent}
     * @private
     */
    App.prototype._onItemChange = function(event) {
        this._listItemCollection.save();

        this.layout();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onLoadedItems
     * @param event {BaseEvent}
     * @private
     */
    App.prototype._onLoadedItems = function(event) {
        var items = this._listItemCollection.models;
        var length = items.length;

        // Create ListItemComponent view items from the stored ListItemVO value objects.
        for (var i = 0; i < length; i++) {
            var childItem = new ListItemComponent(items[i]);
            this._todoListContainer.addChild(childItem);
        }

        // When the app loads we need to check if all stored items are all completed or not.
        var isAllCompleted = this._listItemCollection.length === this._listItemCollection.getCompletedCount();
        this._$markAllCompleteCheckbox.prop('checked', isAllCompleted);

        // Setup the router/deeplink handlers
        Router.add('/active/', this._onActiveHandler.bind(this));
        Router.add('/completed/', this._onCompletedHandler.bind(this));
        Router.add('', this._onDefaultHandler.bind(this));
        Router.start();

        this.layout();
    };

    /**
     * This method is called when the BaseEvent.CLEAR event is dispatched from the FooterView.
     *
     * @method _onClearCompleted
     * @param event {BaseEvent}
     * @private
     */
    App.prototype._onClearCompleted = function(event) {
        var listItemVO;
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemVO = listItemComponent.vo;

            if (listItemVO.isComplete === true) {
                this._todoListContainer.removeChild(listItemComponent);
                this._listItemCollection.remove(listItemVO);
            }
        }

        this.layout();
    };

    /**
     * When the deep link "#/active" tag is triggered this method will hide all items and show only items that are not completed.
     * Also updates the footer nav.
     *
     * @method _onActiveHandler
     * @private
     */
    App.prototype._onActiveHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.hide();

            if (listItemComponent.isComplete() === false) {
                listItemComponent.show();
            }
        }

        this._footerView.updateNav('active');

        this.layout();
    };

    /**
     * When the deep link "#/completed" tag is triggered this method will hide all items and show only items that are completed.
     * Also updates the footer nav.
     *
     * @method _onCompletedHandler
     * @private
     */
    App.prototype._onCompletedHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.hide();

            if (listItemComponent.isComplete() === true) {
                listItemComponent.show();
            }
        }

        this._footerView.updateNav('completed');

        this.layout();
    };

    /**
     *  When the deep link "#/" tag is triggered this method will show all items.
     *  Also updates the footer nav.
     *
     * @method _onDefaultHandler
     * @private
     */
    App.prototype._onDefaultHandler = function() {
        var listItemComponent;

        for (var i = this._todoListContainer.numChildren - 1; i >= 0; i--) {
            listItemComponent = this._todoListContainer.getChildAt(i);
            listItemComponent.show();
        }

        this._footerView.updateNav('');

        this.layout();
    };

    return App;
})();

module.exports = App;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/ListItemComponent":2,"./constant/Key":3,"./model/ListItemCollection":5,"./model/vo/ListItemVO":6,"./view/FooterView":7,"structurejs/controller/Router":11,"structurejs/display/Stage":15,"structurejs/event/BaseEvent":16,"structurejs/util/Extend":25,"structurejs/util/StringUtil":26}],2:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null);
var Extend = require('structurejs/util/Extend');
var DOMElement = require('structurejs/display/DOMElement');
var BaseEvent = require('structurejs/event/BaseEvent');
var Key = require('../constant/Key');

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemComponent
 * @extends DOMElement
 * @constructor
 **/
var ListItemComponent = (function () {

    var _super = Extend(ListItemComponent, DOMElement);

    function ListItemComponent(vo) {
        _super.call(this);

        /**
         * Holds onto the model for this view.
         *
         * @property vo
         * @type {ListItemVO}
         * @public
         */
        this.vo = vo;

        /**
         * @property _$itemInput
         * @type {jQuery}
         * @private
         */
        this._$itemInput = null;

        /**
         * @property _$itemLabel
         * @type {jQuery}
         * @private
         */
        this._$itemLabel = null;

        /**
         * TODO: YUIDoc_comment
         *
         * @property _$markCompleteCheckbox
         * @type {jQuery}
         * @private
         */
        this._$markCompleteCheckbox = null;
    }

    /**
     * @overridden DOMElement.create
     */
    ListItemComponent.prototype.create = function () {
        _super.prototype.create.call(this, '#listItemTemplate', this.vo);

        this._$itemInput = this.$element.find('.js-itemText');
        this._$itemLabel = this.$element.find('.js-editTodo');
        this._$markCompleteCheckbox = this.$element.find('.js-markComplete');
    };

    /**
     * @overridden DOMElement.layout
     */
    ListItemComponent.prototype.layout = function () {
        this.$element.toggleClass('completed', this.vo.isComplete);

        this._$markCompleteCheckbox.prop('checked', this.vo.isComplete);

        return this;
    };

    /**
     * @overridden DOMElement.enable
     */
    ListItemComponent.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this.$element.addEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
        this.$element.addEventListener('click', '.js-removeTodo', this._onItemRemove, this);
        this.$element.addEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

        this.$element.addEventListener('keydown', this._onEscapeKey, this);
        this.$element.addEventListener('keypress', this._onEnterKey, this);
        this._$itemInput.addEventListener('blur', this._onInputBlur, this);

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    ListItemComponent.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this.$element.removeEventListener('click', '.js-markComplete', this._onItemToggleComplete, this);
        this.$element.removeEventListener('click', '.js-removeTodo', this._onItemRemove, this);
        this.$element.removeEventListener('dblclick', '.js-editTodo', this._onItemEdit, this);

        this.$element.removeEventListener('keydown', this._onEscapeKey, this);
        this.$element.removeEventListener('keypress', this._onEnterKey, this);
        this._$itemInput.removeEventListener('blur', this._onInputBlur, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    ListItemComponent.prototype.destroy = function () {
        // Destroy the child objects and references in this parent class to prevent memory leaks.

        _super.prototype.destroy.call(this);
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method setCompleted
     * @public
     */
    ListItemComponent.prototype.setCompleted = function() {
        this.vo.isComplete = true;

        this.layout();
        this._saveItemText();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method setUnCompleted
     * @public
     */
    ListItemComponent.prototype.setUnCompleted = function() {
        this.vo.isComplete = false;

        this.layout();
        this._saveItemText();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method isComplete
     * @public
     */
    ListItemComponent.prototype.isComplete = function() {
        return this.vo.isComplete;
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method hide
     * @public
     */
    ListItemComponent.prototype.hide = function() {
        this.$element.hide();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method show
     * @public
     */
    ListItemComponent.prototype.show = function() {
        this.$element.show();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemToggleComplete
     * @private
     */
    ListItemComponent.prototype._onItemToggleComplete = function(event) {
        var isChecked = $(event.target).prop('checked');

        this.vo.isComplete = isChecked;

        this.layout();
        this._saveItemText();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemEdit
     * @private
     */
    ListItemComponent.prototype._onItemEdit = function(event) {
        this.$element.addClass('editing');

        this._$itemInput.focus();
        this._$itemInput.select();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEscapeKey
     * @private
     */
    ListItemComponent.prototype._onEscapeKey = function(event) {
        if (event.which === Key.ESC) {
            this._resetItemText();
        }
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEscapeKey
     * @private
     */
    ListItemComponent.prototype._onInputBlur = function(event) {
        var todoText = this._$itemInput.val().trim();

        if (todoText != '') {
            this.vo.text = todoText;
            this._resetItemText();
            this._saveItemText();
        } else {
            this._resetItemText();
        }
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _resetItemText
     * @private
     */
    ListItemComponent.prototype._resetItemText = function() {
        this.$element.removeClass('editing');

        // We need to reset the hidden input back to the original value.
        this._$itemInput.val(this.vo.text);
        this._$itemLabel.text(this.vo.text);
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _saveItemText
     * @private
     */
    ListItemComponent.prototype._saveItemText = function() {
        this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE, true, true, this.vo));
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onItemRemove
     * @private
     */
    ListItemComponent.prototype._onItemRemove = function(event) {
        this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED, true));
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onEnterKey
     * @private
     */
    ListItemComponent.prototype._onEnterKey = function(event) {
        var todoText = this._$itemInput.val().trim();

        if (event.which === Key.ENTER) {
            if (todoText != '') {
                this.vo.text = todoText;
                this._resetItemText();
                this._saveItemText();
            } else {
                this._resetItemText();
            }
        }
    };

    return ListItemComponent;
})();

module.exports = ListItemComponent;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constant/Key":3,"structurejs/display/DOMElement":12,"structurejs/event/BaseEvent":16,"structurejs/util/Extend":25}],3:[function(require,module,exports){
/**
 * TODO: YUIDoc_comment
 *
 * @class Key
 * @constructor
 **/
var Key = (function () {

    function Key() {
    }

    Key.BACKSPACE = 8;
    Key.TAB = 9;
    Key.ENTER = 13;
    Key.RETURN = 13;
    Key.ESC = 27;
    Key.LEFT = 37;
    Key.UP = 38;
    Key.RIGHT = 39;
    Key.DOWN = 40;
    Key.DELETE = 46;
    Key.HOME = 36;
    Key.END = 35;
    Key.PAGEUP = 33;
    Key.PAGEDOWN = 34;
    Key.INSERT = 45;

    return Key;
})();

module.exports = Key;
},{}],4:[function(require,module,exports){
var App = require('./App');

window.app = new App();
window.app.appendTo('#todoapp');// Need to specify what area our code has control over.
                                // The App.js class extends Stage which has the appendTo method.
                                // Note: On typical website you may want to set it as 'body' do you have control over the whole page.
},{"./App":1}],5:[function(require,module,exports){
var Extend = require('structurejs/util/Extend');
var Collection = require('structurejs/model/Collection');
var LocalStorageController = require('structurejs/controller/LocalStorageController');
var ListItemVO = require('./vo/ListItemVO');

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemCollection
 * @extends Collection
 * @constructor
 **/
var ListItemCollection = (function () {

    var _super = Extend(ListItemCollection, Collection);

    function ListItemCollection() {
        _super.call(this);

        /**
         * @property _localStorageController
         * @type {LocalStorageController}
         * @private
         */
        this._localStorageController = new LocalStorageController();
    }

    /**
     * @overridden ListItemCollection.add
     */
    ListItemCollection.prototype.add = function (item, silent) {
        _super.prototype.add.call(this, item, silent);

        this.save();
    };

    /**
     * @overridden ListItemCollection.remove
     */
    ListItemCollection.prototype.remove = function (item, silent) {
        _super.prototype.remove.call(this, item, silent);

        this.save();
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method loadStoredItems
     * @public
     */
    ListItemCollection.prototype.loadStoredItems = function() {
        var items = this._localStorageController.getItem('todos');

        if (items != null) {
            var length = items.length;
            for (var i = 0; i < length; i++) {
                this.add(new ListItemVO(items[i]));
            }

            this.dispatchEvent('loadComplete');
        }
    };

    /**
     * TODO: YUIDoc_comment
     *
     * @method save
     * @public
     */
    ListItemCollection.prototype.save = function() {
        this._localStorageController.addItem('todos', this.models);
    };

    /**
     * Filter down the list of all todo items that are finished.
     *
     * @method getCompletedCount
     * @public
     */
    ListItemCollection.prototype.getCompletedCount = function() {
        return this.findBy({isComplete: true}).length;
    };

    /**
     * Filter down the list to only todo items that are still not finished.
     *
     * @method getRemainingCount
     * @public
     */
    ListItemCollection.prototype.getRemainingCount = function() {
        return this.findBy({isComplete: false}).length;
    };

    return ListItemCollection;
})();

module.exports = ListItemCollection;
},{"./vo/ListItemVO":6,"structurejs/controller/LocalStorageController":10,"structurejs/model/Collection":20,"structurejs/util/Extend":25}],6:[function(require,module,exports){
var Extend = require('structurejs/util/Extend');
var ValueObject = require('structurejs/model/ValueObject');

/**
 * TODO: YUIDoc_comment
 *
 * @class ListItemVO
 * @extends ValueObject
 * @constructor
 **/
var ListItemVO = (function () {

    var _super = Extend(ListItemVO, ValueObject);

    function ListItemVO(data) {
        _super.call(this);

        /**
         * @property id
         * @type {string}
         * @public
         */
        this.id = null;

        /**
         * @property text
         * @type {string}
         * @public
         */
        this.text = '';

        /**
         * @property isComplete
         * @type {boolean}
         * @public
         */
        this.isComplete = false;

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ValueObject.update
     */
    ListItemVO.prototype.update = function (data) {
        _super.prototype.update.call(this, data);

        // Override any values after the default super update method has set the values.
    };

    return ListItemVO;
})();

module.exports = ListItemVO;
},{"structurejs/model/ValueObject":22,"structurejs/util/Extend":25}],7:[function(require,module,exports){
var Extend = require('structurejs/util/Extend');
var DOMElement = require('structurejs/display/DOMElement');
var BaseEvent = require('structurejs/event/BaseEvent');

/**
 * This class is responsible for hand the display and interactions for the footer HTML.
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
var FooterView = (function () {

    var _super = Extend(FooterView, DOMElement);

    function FooterView($element) {
        _super.call(this, $element);

        /**
         * @property _$itemsCompleteText
         * @type {jQuery}
         * @private
         */
        this._$itemsCompleteText = null;

        /**
         * @property _$itemsRemainingText
         * @type {jQuery}
         * @private
         */
        this._$itemsRemainingText = null;

        /**
         * @property _$clearCompleteButton
         * @type {jQuery}
         * @private
         */
        this._$clearCompleteButton = null;

        /**
         * @property _$navLinks
         * @type {jQuery}
         * @private
         */
        this._$navLinks = null;
    }

    /**
     * @overridden DOMElement.create
     */
    FooterView.prototype.create = function () {
        _super.prototype.create.call(this);

        this._$itemsCompleteText = this.$element.find('.js-itemsComplete');
        this._$itemsRemainingText = this.$element.find('.js-itemsRemaining');
        this._$clearCompleteButton = this.$element.find('.js-clearCompleteButton');
        this._$navLinks = this.$element.find('#filters li a');
    };

    /**
     * @overridden DOMElement.enable
     */
    FooterView.prototype.enable = function () {
        if (this.isEnabled === true) { return this; }

        this._$clearCompleteButton.addEventListener('click', this._onClear, this);

        return _super.prototype.enable.call(this);
    };

    /**
     * @overridden DOMElement.disable
     */
    FooterView.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }

        this._$clearCompleteButton.removeEventListener('click', this._onClear, this);

        return _super.prototype.disable.call(this);
    };

    /**
     * @overridden DOMElement.destroy
     */
    FooterView.prototype.destroy = function () {
        // Destroy the child objects and references in this parent class to prevent memory leaks.

        _super.prototype.destroy.call(this);
    };

    /**
     * This method will update the footer display count for both completed and remaining items.
     *
     * @method updateCounts
     * @public
     */
    FooterView.prototype.updateCounts = function(completedCount, remainingCount) {
        this._$itemsCompleteText.text(completedCount);
        this._$itemsRemainingText.text(remainingCount);
    };

    /**
     * This will remove the "selected" style class on all nav links and then add the
     * "selected" style class what ever matches the passed in string value.
     *
     * @method updateNav
     * @public
     */
    FooterView.prototype.updateNav = function(hashName) {
        this._$navLinks.removeClass('selected')
            .filter('[href="#/' + (hashName || '') + '"]')
            .addClass('selected');
    };

    /**
     * When the user clicks the "clear completed" button this method will be called and will dispatch an event
     * to tell the parent class that we want to remove all the completed items.
     *
     * @method _onClear
     * @param event {jQueryEventObject}
     * @private
     */
    FooterView.prototype._onClear = function(event) {
        // Take note this is not dispatching a BaseEvent object but just the string value constant. The only time you need to dispatch
        // an BaseEvent object or a custom event that extends BaseEvent is when you want to use event bubbling or have custom properties
        // on the event that you want to set.
        this.dispatchEvent(BaseEvent.CLEAR);
    };

    return FooterView;
})();

module.exports = FooterView;
},{"structurejs/display/DOMElement":12,"structurejs/event/BaseEvent":16,"structurejs/util/Extend":25}],8:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('./util/Util'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.BaseObject = factory(root.StructureJS.Util);
    }
}(this, function(Util) {
    'use strict';

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
    var BaseObject = (function() {

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
        BaseObject.prototype.getQualifiedClassName = function() {
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
        BaseObject.prototype.destroy = function() {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    this[key] = null;
                }
            }
        };
        return BaseObject;
    })();

    return BaseObject;
}));

},{"./util/Util":28}],9:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./util/Extend', './BaseObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('./util/Extend'), require('./BaseObject'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.ObjectManager = factory(root.StructureJS.Extend, root.StructureJS.BaseObject);
    }
}(this, function(Extend, BaseObject) {

    'use strict';

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
    var ObjectManager = (function() {

        var _super = Extend(ObjectManager, BaseObject);

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
        ObjectManager.prototype.enable = function() {
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
        ObjectManager.prototype.disable = function() {
            if (this.isEnabled === false) {
                return this;
            }
            this.isEnabled = false;
            return this;
        };
        return ObjectManager;
    })();

    return ObjectManager;
}));

},{"./BaseObject":8,"./util/Extend":25}],10:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/LocalStorageEvent', '../event/EventDispatcher', '../model/ValueObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../event/LocalStorageEvent'), require('../event/EventDispatcher'), require('../model/ValueObject'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.LocalStorageController = factory(root.StructureJS.Extend, root.StructureJS.LocalStorageEvent, root.StructureJS.EventDispatcher, root.StructureJS.ValueObject);
    }
}(this, function(Extend, LocalStorageEvent, EventDispatcher, ValueObject) {

    'use strict';

    /**
     * The LocalStorageController...
     *
     * @class LocalStorageController
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule controller
     * @requires Extend
     * @requires EventDispatcher
     * @requires LocalStorageEvent
     * @requires ValueObject
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LocalStorageController = (function() {

        var _super = Extend(LocalStorageController, EventDispatcher);

        function LocalStorageController() {
            _super.call(this);
            /**
             * Current user namespace. The namespace is optional.
             *
             * @property _namespace
             * @type {string}
             * @default defaultNamespace
             * @optional
             * @private
             */
            this._namespace = 'defaultNamespace';
            /**
             * A reference to window.localStorage for faster access.
             *
             * @property _localStorage
             * @type {Storage}
             * @private
             */
            this._localStorage = null;
            this._localStorage = window.localStorage;
            window.addEventListener('storage', this.onLocalStorageEvent.bind(this));
        }
        /**
         * Set storage namespace
         *
         * @method setNamespace
         * @param namespace
         * @returns {string}
         */
        LocalStorageController.prototype.setNamespace = function(namespace) {
            this._namespace = namespace;
        };
        /**
         * Get storage namespace
         *
         * @method getNamespace
         * @returns {string}
         */
        LocalStorageController.prototype.getNamespace = function() {
            return this._namespace;
        };
        /**
         * Add a key/value pair to localStorage.
         *
         * @method addItem
         * @param key {string}
         * @param data {Object}
         * @param useNamespace {boolean}
         * @return {boolean}
         */
        LocalStorageController.prototype.addItem = function(key, data, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            if (data instanceof ValueObject) {
                data = data.toJSON();
            }
            data = JSON.stringify(data);
            try {
                this._localStorage.setItem(key, data);
                return true;
            } catch (error) {
                return false;
            }
        };
        /**
         * Retrieves the current value associated with the Local Storage key.
         *
         * @method getItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @returns {any}
         */
        LocalStorageController.prototype.getItem = function(key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            var value = this._localStorage.getItem(key);
            if (value) {
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    // We are assuming the error is because value being parsed is a plain string with spaces.
                    value = value;
                }
            }
            return value;
        };
        /**
         * Returns all items in local storage as an Object with key and value properties that has a certain namespace.
         *
         * @method getItemsWithNamespace
         * @param namespace {string} The namespace that is used to items. If a namespace is not passed in then the current set namespace will be used.
         * @return {Array.<Object>}
         */
        LocalStorageController.prototype.getItemsWithNamespace = function(namespace) {
            if (namespace === void 0) { namespace = this._namespace; }
            var list = [];
            var length = this.getLength();
            for (var i = 0; i < length; i++) {
                var key = this._localStorage.key(i);
                if (key.indexOf(namespace) > -1) {
                    var value = this.getItem(key);
                    var obj = {
                        key: key,
                        value: value
                    };
                    list.push(obj);
                }
            }
            return list;
        };
        /**
         * Returns all items in local storage as an Object with key and value properties.
         *
         * @method getAllItems
         * @return {Array.<Object>}
         */
        LocalStorageController.prototype.getAllItems = function() {
            var list = [];
            var length = this.getLength();
            for (var i = 0; i < length; i++) {
                var key = this._localStorage.key(i);
                var value = this.getItem(key);
                var obj = {
                    key: key,
                    value: value
                };
                list.push(obj);
            }
            return list;
        };
        /**
         * Deletes a key/value pair from the Local Storage collection.
         *
         * @method removeItem
         * @param key {string}
         * @param [useNamespace=false] {string}
         * @return {boolean}
         */
        LocalStorageController.prototype.removeItem = function(key, useNamespace) {
            if (useNamespace === void 0) { useNamespace = false; }
            if (useNamespace) {
                key = this.getNamespace() + key;
            }
            try {
                this._localStorage.removeItem(key);
                return true;
            } catch (error) {
                return false;
            }
        };
        /**
         * Returns the number of items storage in local storage.
         *
         * @method getLength
         * @returns {number}
         */
        LocalStorageController.prototype.getLength = function() {
            return this._localStorage.length;
        };
        /**
         * Returns the size of the Local Storage.
         *
         * @method getSize
         * @returns {number}
         */
        LocalStorageController.prototype.getSize = function() {
            return encodeURIComponent(JSON.stringify(this._localStorage)).length;
        };
        /**
         * Removes all key/value pairs from the Local Storage area.
         *
         * @method clear
         */
        LocalStorageController.prototype.clear = function() {
            this._localStorage.clear();
        };
        /**
         * @overridden BaseController.destroy
         */
        LocalStorageController.prototype.destroy = function() {
            _super.prototype.destroy.call(this);
        };
        /**
         *
         *
         * @method onLocalStorageEvent
         * @param event {StorageEvent} The native browser event for Web Storage.
         * @private
         */
        LocalStorageController.prototype.onLocalStorageEvent = function(event) {
            this.dispatchEvent(new LocalStorageEvent(LocalStorageEvent.STORAGE, false, false, event));
        };
        return LocalStorageController;
    })();

    return LocalStorageController;
}));

},{"../event/EventDispatcher":17,"../event/LocalStorageEvent":18,"../model/ValueObject":22,"../util/Extend":25}],11:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/StringUtil', '../event/RouterEvent', '../model/Route'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/StringUtil'), require('../event/RouterEvent'), require('../model/Route'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Router = factory(root.StructureJS.StringUtil, root.StructureJS.RouterEvent, root.StructureJS.Route);
    }
}(this, function(StringUtil, RouterEvent, Route) {

    'use strict';

    /**
     * The **Router** class is a static class allows you to add different route patterns that can be matched to help control your application. Look at the Router.{{#crossLink "Router/add:method"}}{{/crossLink}} method for more details and examples.
     *
     * @class Router
     * @module StructureJS
     * @submodule controller
     * @requires Route
     * @requires RouterEvent
     * @requires StringUtil
     * @static
     * @author Robert S. (www.codeBelt.com)
     */
    var Router = (function() {
        function Router() {
            throw new Error('[Router] Do not instantiate the Router class because it is a static class.');
        }
        /**
         * The **Router.add** method allows you to listen for route patterns to be matched. When a match is found the callback will be executed passing a {{#crossLink "RouterEvent"}}{{/crossLink}}.
         *
         * @method add
         * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, ''. See the examples below for more details.
         * @param callback {Function} The function that should be executed when a request matches the routePattern. It will receive a {{#crossLink "RouterEvent"}}{{/crossLink}} object.
         * @param callbackScope {any} The scope of the callback function that should be executed.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener and the function callback below.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // The above route listener would match the below url:
         *     // www.site.com/#/games/asteroids/2/
         *
         *     // The Call back receives a RouterEvent object.
         *     ClassName.prototype.onRouteHandler = function (routerEvent) {
         *         console.log(routerEvent.params);
         *     }
         *
         * Route Pattern Options:
         * ----------------------
         * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/contact/:name:/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/contact/
         *     // www.site.com/#/contact/heather/
         *     // www.site.com/#/contact/john/
         *
         *
         * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
         *
         *     Router.add('/product/{productName}/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/product/shoes/
         *     // www.site.com/#/product/jackets/
         *
         *
         * **\*** The asterisk character means it will match all or part of part the hash url.
         *
         *     Router.add('*', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/anything/
         *     // www.site.com/#/matches/any/hash/url/
         *     // www.site.com/#/really/it/matches/any/and/all/hash/urls/
         *
         *
         * **?** The question mark character means it will match a query string for the hash url.
         *
         *     Router.add('?', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/#/?one=1&two=2&three=3
         *     // www.site.com/#?one=1&two=2&three=3
         *
         *
         * **''** The empty string means it will match when there are no hash url.
         *
         *     Router.add('', this.method, this);
         *     Router.add('/', this.method, this);
         *
         *     // Will match one of the following:
         *     // www.site.com/
         *     // www.site.com/#/
         *
         *
         * Other possible combinations but not limited too:
         *
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *     Router.add('/home/?', this.method3, this);
         *     Router.add('/about/*', this.method4, this);
         *
         */
        Router.add = function(routePattern, callback, callbackScope) {
            Router.enable();
            var route = new Route(routePattern, callback, callbackScope);
            Router._routes.push(route);
        };
        /**
         * The **Router.remove** method will remove one of the added routes.
         *
         * @method remove
         * @param routePattern {string} Must be the same string pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callback {Function} Must be the same function you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @param callbackScope {any} Must be the same scope off the callback pattern you pasted into the {{#crossLink "Router/add:method"}}{{/crossLink}} method.
         * @public
         * @static
         * @example
         *     // Example of adding a route listener.
         *     Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
         *
         *     // Example of removing the same added route listener above.
         *     Router.remove('/games/{gameName}/:level:/', this.onRouteHandler, this);
         */
        Router.remove = function(routePattern, callback, callbackScope) {
            var route;
            for (var i = Router._routes.length - 1; i >= 0; i--) {
                route = Router._routes[i];
                if (route.routePattern === routePattern && route.callback === callback && route.callbackScope === callbackScope) {
                    Router._routes.splice(i, 1);
                }
            }
        };
        /**
         * The **Router.addDefault** method is meant to trigger a callback function if there are no route matches are found.
         *
         * @method addDefault
         * @param callback {Function}
         * @param callbackScope {any}
         * @public
         * @static
         * @example
         *     Router.addDefault(this.noRoutesFoundHandler, this);
         */
        Router.addDefault = function(callback, callbackScope) {
            Router._defaultRoute = new Route('', callback, callbackScope);
        };
        /**
         * The **Router.removeDefault** method will remove the default callback that was added by the **Router.addDefault** method.
         *
         * @method removeDefault
         * @public
         * @static
         * @example
         *     Router.removeDefault();
         */
        Router.removeDefault = function() {
            Router._defaultRoute = null;
        };
        /**
         * Gets the current hash url minus the # or #! symbol(s).
         *
         * @method getHash
         * @public
         * @static
         * @return {string} Returns current hash url minus the # or #! symbol(s).
         * @example
         *     var str = Router.getHash();
         */
        Router.getHash = function() {
            var hash = Router._window.location.hash;
            var strIndex = (hash.substr(0, 2) === '#!') ? 2 : 1;
            return hash.substring(strIndex); // Return everything after # or #!
        };
        /**
         * The **Router.enable** method will allow the Router class to listen for the hashchange event. By default the Router class is enabled.
         *
         * @method enable
         * @public
         * @static
         * @example
         *     Router.enable();
         */
        Router.enable = function() {
            if (Router.isEnabled === true) {
                return;
            }
            if (Router._window.addEventListener) {
                Router._window.addEventListener('hashchange', Router.onHashChange, false);
            } else {
                Router._window.attachEvent('onhashchange', Router.onHashChange);
            }
            Router.isEnabled = true;
        };
        /**
         * The **Router.disable** method will stop the Router class from listening for the hashchange event.
         *
         * @method disable
         * @public
         * @static
         * @example
         *     Router.disable();
         */
        Router.disable = function() {
            if (Router.isEnabled === false) {
                return;
            }
            if (Router._window.removeEventListener) {
                Router._window.removeEventListener('hashchange', Router.onHashChange);
            } else {
                Router._window.detachEvent('onhashchange', Router.onHashChange);
            }
            Router.isEnabled = false;
        };
        /**
         * The **Router.start** method is meant to trigger or check the hash url on page load.
         * Either you can call this method after you add all your routers or after all data is loaded.
         * It is recommend you only call this once per page or application instantiation.
         *
         * @method start
         * @public
         * @static
         * @example
         *     // Example of adding routes and calling the start method.
         *     Router.add('/games/{gameName}/:level:/', this.method1, this);
         *     Router.add('/{category}/blog/', this.method2, this);
         *
         *     Router.start();
         */
        Router.start = function() {
            setTimeout(Router.onHashChange, 1);
        };
        /**
         * The **Router.navigateTo** method allows you to change the hash url and to trigger a route
         * that matches the string value. The second parameter is **silent** and is **false** by
         * default. This allows you to update the hash url without causing a route callback to be
         * executed.
         *
         * @method navigateTo
         * @param route {String}
         * @param [silent=false] {Boolean}
         * @param [disableHistory=false] {Boolean}
         * @public
         * @static
         * @example
         *     // This will update the hash url and trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/');
         *
         *     // This will update the hash url but will not trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true);
         *
         *     // This will not update the hash url but will trigger the matching route.
         *     Router.navigateTo('/games/asteroids/2/', true, true);
         */
        Router.navigateTo = function(route, silent, disableHistory) {
            if (silent === void 0) { silent = false; }
            if (disableHistory === void 0) { disableHistory = false; }
            if (Router.isEnabled === false) {
                return;
            }
            if (route.charAt(0) === '#') {
                var strIndex = (route.substr(0, 2) === '#!') ? 2 : 1;
                route = route.substring(strIndex);
            }
            // Enforce starting slash
            if (route.charAt(0) !== '/' && Router.forceSlash === true) {
                route = '/' + route;
            }
            if (disableHistory === true) {
                Router.changeRoute(route);
                return;
            }
            if (Router.useDeepLinking === true) {
                if (silent === true) {
                    Router.disable();
                    setTimeout(function() {
                        window.location.hash = route;
                        setTimeout(Router.enable, 1);
                    }, 1);
                } else {
                    setTimeout(function() {
                        window.location.hash = route;
                    }, 1);
                }
            } else {
                Router.changeRoute(route);
            }
        };
        /**
         * The **Router.clear** will remove all route's and the default route from the Router class.
         *
         * @method clear
         * @public
         * @static
         * @example
         *     Router.clear();
         */
        Router.prototype.clear = function() {
            Router._routes = [];
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };
        /**
         * The **Router.destroy** method will null out all references to other objects in the Router class.
         *
         * @method destroy
         * @public
         * @static
         * @example
         *     Router.destroy();
         */
        Router.prototype.destroy = function() {
            Router._window = null;
            Router._routes = null;
            Router._defaultRoute = null;
            Router._hashChangeEvent = null;
        };
        /**
         * This method will be called if the Window object dispatches a HashChangeEvent.
         * This method will not be called if the Router is disabled.
         *
         * @method onHashChange
         * @param event {HashChangeEvent}
         * @private
         * @static
         */
        Router.onHashChange = function(event) {
            if (Router.allowManualDeepLinking === false && Router.useDeepLinking === false) {
                return;
            }
            Router._hashChangeEvent = event;
            var hash = Router.getHash();
            Router.changeRoute(hash);
        };
        /**
         * The method is responsible for check if one of the routes matches the string value passed in.
         *
         * @method changeRoute
         * @param hash {string}
         * @private
         * @static
         */
        Router.changeRoute = function(hash) {
            var route;
            var match;
            var routerEvent = null;
            for (var i = 0; i < Router._routes.length; i++) {
                route = Router._routes[i];
                match = route.match(hash);
                // If there is a match.
                if (match !== null) {
                    routerEvent = new RouterEvent();
                    routerEvent.route = match.shift();
                    routerEvent.params = match.slice(0, match.length);
                    routerEvent.routePattern = route.routePattern;
                    routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                    routerEvent.target = Router;
                    routerEvent.currentTarget = Router;
                    for (var j = routerEvent.params.length - 1; j >= 0; j--) {
                        if (routerEvent.params[j] === '') {
                            routerEvent.params.splice(j, 1);
                        }
                    }
                    // If there was a hash change event then set the info we want to send.
                    if (Router._hashChangeEvent != null) {
                        routerEvent.newURL = Router._hashChangeEvent.newURL;
                        routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                    } else {
                        routerEvent.newURL = window.location.href;
                    }
                    // Execute the callback function and pass the route event.
                    route.callback.call(route.callbackScope, routerEvent);
                    // Only trigger the first route and stop checking.
                    if (Router.allowMultipleMatches === false) {
                        break;
                    }
                }
            }
            // If there are no route's matched and there is a default route. Then call that default route.
            if (routerEvent === null && Router._defaultRoute !== null) {
                routerEvent = new RouterEvent();
                routerEvent.route = hash;
                routerEvent.query = (hash.indexOf('?') > -1) ? StringUtil.queryStringToObject(hash) : null;
                routerEvent.target = Router;
                routerEvent.currentTarget = Router;
                if (Router._hashChangeEvent != null) {
                    routerEvent.newURL = Router._hashChangeEvent.newURL;
                    routerEvent.oldURL = Router._hashChangeEvent.oldURL;
                } else {
                    routerEvent.newURL = window.location.href;
                }
                Router._defaultRoute.callback.call(Router._defaultRoute.callbackScope, routerEvent);
            }
            Router._hashChangeEvent = null;
        };
        /**
         * A reference to the browser Window Object.
         *
         * @property _window
         * @type {Window}
         * @private
         * @static
         */
        Router._window = window;
        /**
         * A list of the added Route objects.
         *
         * @property _routes
         * @type {Array<Route>}
         * @private
         * @static
         */
        Router._routes = [];
        /**
         * A reference to default route object.
         *
         * @property _defaultRoute
         * @type {Route}
         * @private
         * @static
         */
        Router._defaultRoute = null;
        /**
         * A reference to the hash change event that was sent from the Window Object.
         *
         * @property _hashChangeEvent
         * @type {any}
         * @private
         * @static
         */
        Router._hashChangeEvent = null;
        /**
         * Determines if the Router class is enabled or disabled.
         *
         * @property isEnabled
         * @type {boolean}
         * @readOnly
         * @public
         * @static
         * @example
         *     // Read only.
         *     console.log(Router.isEnabled);
         */
        Router.isEnabled = false;
        /**
         * The **Router.useDeepLinking** property tells the Router class weather it should change the hash url or not.
         * By **default** this property is set to **true**. If you set the property to **false** and using the **Router.navigateTo**
         * method the hash url will not change. This can be useful if you are making an application or game and you don't want the user
         * to know how to jump to other sections directly. See the **Router.{{#crossLink "Router/allowManualDeepLinking:property"}}{{/crossLink}}** to fully change the Router class
         * from relying on the hash url to an internal state controller.
         *
         * @property useDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = true;
         */
        Router.useDeepLinking = true;
        /**
         * The **Router.allowManualDeepLinking** property tells the Router class weather it should check for route matches if the
         * hash url changes in the browser. This property only works if the **Router. {{#crossLink "Router/useDeepLinking:property"}}{{/crossLink}}** is set to **false**.
         * This is useful if want to use your added routes but don't want any external forces trigger your routes.
         *
         * Typically what I do for games is during development/testing I allow the hash url to change the states so testers can jump
         * to sections or levels easily but then when it is ready for production I set the property to **false** so users cannot jump
         * around if they figure out the url schema.
         *
         * @property allowManualDeepLinking
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     Router.useDeepLinking = false;
         *     Router.allowManualDeepLinking = false;
         */
        Router.allowManualDeepLinking = true;
        /**
         * The **Router.forceSlash** property tells the Router class if the **Router.{{#crossLink "Router/navigateTo:method"}}{{/crossLink}}** method is called to
         * make sure the hash url has a forward slash after the **#** character like this **#/**.
         *
         * @property forceSlash
         * @type {boolean}
         * @default false
         * @public
         * @static
         * @example
         *     // To turn on forcing the forward slash
         *     Router.forceSlash = true;
         *
         *     // If forceSlash is set to true it will change the url from #contact/bob/ to #/contact/bob/
         *     // when using the navigateTo method.
         */
        Router.forceSlash = false;
        /**
         * The **Router.allowMultipleMatches** property tells the Router class if it should trigger one or all routes that match a route pattern.
         *
         * @property allowMultipleMatches
         * @type {boolean}
         * @default true
         * @public
         * @static
         * @example
         *     // Only allow the first route matched to be triggered.
         *     Router.allowMultipleMatches = false;
         */
        Router.allowMultipleMatches = true;
        return Router;
    })();

    return Router;
}));

},{"../event/RouterEvent":19,"../model/Route":21,"../util/StringUtil":26}],12:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../display/DisplayObjectContainer', '../event/BaseEvent', '../util/TemplateFactory', '../util/ComponentFactory', '../plugin/jquery.eventListener'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../display/DisplayObjectContainer'), require('../event/BaseEvent'), require('../util/TemplateFactory'), require('../util/ComponentFactory'), require('../plugin/jquery.eventListener'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.DOMElement = factory(root.StructureJS.Extend, root.StructureJS.DisplayObjectContainer, root.StructureJS.BaseEvent, root.StructureJS.TemplateFactory, root.StructureJS.ComponentFactory, root.jQuery);
    }
}(this, function(Extend, DisplayObjectContainer, BaseEvent, TemplateFactory, ComponentFactory, jQuery) {

    'use strict';

    /**
     * The {{#crossLink "DOMElement"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM.
     *
     * @class DOMElement
     * @param type [any=null] Either a jQuery object or template you want to use the as the view. Check out the examples below.
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
     *     // Example of using DOMElement with out extending it.
     *     var aLink = new DOMElement('a', {text: 'Google', href: 'http://www.google.com', 'class': 'externalLink'});
     *     this.addChild(aLink);
     *
     *     // Example of a view passing in a jQuery object.
     *     var view = new CustomView($('.selector'));
     *     this.addChild(view);
     *
     *     // Example of a view extending DOMElement when passing in a jQuery object.
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
     *          ClassName.prototype.layout = function () {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
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
     *          ClassName.prototype.destroy = function () {
     *              // Destroy the child objects and references in this parent class to prevent memory leaks.
     *
     *              _super.prototype.destroy.call(this);
     *          };
     *
     *          return ClassName;
     *     })();
     *
     *     // Example of a view extending DOMElement with template passed into create.
     *     var view = new CustomView();
     *     this.addChild(view);
     *
     *     // Example of a view extending DOMElement with template passed into create.
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
     *          ClassName.prototype.layout = function () {
     *              // Layout or update the child objects in this parent class.
     *
     *              return this;
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
     *          ClassName.prototype.destroy = function () {
     *              // Destroy the child objects and references in this parent class to prevent memory leaks.
     *
     *              _super.prototype.destroy.call(this);
     *          };
     *
     *          return ClassName;
     *     })();
     */
    var DOMElement = (function() {

        var _super = Extend(DOMElement, DisplayObjectContainer);

        function DOMElement(type, params) {
            if (type === void 0) { type = null; }
            if (params === void 0) { params = null; }
            _super.call(this);
            /**
             * TODO: YUIDoc_comment
             *
             * @property checkCount
             * @type {number}
             * @public
             */
            this.checkCount = 0;
            /**
             * A cached of the DOM Element.
             *
             * @property element
             * @type {HTMLElement}
             * @default null
             * @public
             */
            this.element = null;
            /**
             * A cached jQuery object for the view's element.
             *
             * @property $element
             * @type {JQuery}
             * @default null
             * @public
             */
            this.$element = null;
            /**
             * If a jQuery object was passed into the constructor this will be set as true and
             * this class will not try add the view to the DOM because it should already exists.
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
            } else if (type) {
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
         * This method gets called only once when the child view is added to another view. If the child view is removed
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
         *     // EXAMPLE 2: But lets say you wanted the view to be a ul element your would do:
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
         *          <div id="htmlTemplatel" class="js-todo">
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
         *     // EXAMPLE 4: One more way. Let's say you wanted to use th Handlebar plugin within RequireJS. You can pass the template into create.
         *     var HomeTemplate = require('hbs!templates/HomeTemplate');
         *
         *     ClassName.prototype.create = function () {
         *          _super.prototype.create.call(this, HomeTemplate, {data: "some data"});
         *
         *     }
         */
        DOMElement.prototype.create = function(type, params) {
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
                } else {
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
        DOMElement.prototype.addChild = function(child) {
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
        DOMElement.prototype.addClientSideId = function(child) {
            // TODO: Calling the getChild method there is a chance that multiple DOMElement have reference to the same DOM HTML element causing the cid to be over written with a new cid. Probably should handle that.
            child.$element.attr('data-cid', child.cid);
        };
        /**
         * Gets called when the child object is added to the DOM.
         * The method will call {{#crossLink "DOMElement/layout:method"}}{{/crossLink}} and dispatch the BaseEvent.ADDED_TO_STAGE event.
         *
         * @method onDomAdded
         * @private
         */
        DOMElement.prototype.onAddedToDom = function(child) {
            var _this = this;
            child.checkCount++;
            if (child.$element.width() === 0 && child.checkCount < 5) {
                setTimeout(function() {
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
        DOMElement.prototype.addChildAt = function(child, index) {
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
            } else {
                if (child.isCreated === false) {
                    child.create(); // Render the item before adding to the DOM
                    child.isCreated = true;
                }
                // Adds the child at a specific index but also will remove the child from another parent object if one exists.
                _super.prototype.addChildAt.call(this, child, index);
                // Adds the child before the a child already in the DOM.
                jQuery(children.get(index)).before(child.$element);
                this.onAddedToDom(child);
            }
            return this;
        };
        /**
         * @overridden DisplayObjectContainer.swapChildren
         */
        DOMElement.prototype.swapChildren = function(child1, child2) {
            var child1Index = child1.$element.index();
            var child2Index = child2.$element.index();
            this.addChildAt(child1, child2Index);
            this.addChildAt(child2, child1Index);
            return this;
        };
        /**
         * @overridden DisplayObjectContainer.getChildAt
         */
        DOMElement.prototype.getChildAt = function(index) {
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
        DOMElement.prototype.getChild = function(selector) {
            // Get the first match from the selector passed in.
            var jQueryElement = this.$element.find(selector).first();
            if (jQueryElement.length === 0) {
                throw new TypeError('[' + this.getQualifiedClassName() + '] getChild(' + selector + ') Cannot find DOM $element');
            }
            // Check to see if there the element already has a cid value and is a child of this parent object.
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
         * @param [selector] {string} You can pass in any type of jQuery selector. If there is no selector passed in it will get all the children this parent element.
         * @returns {Array} Returns a list of DOMElement's. It will grab all children HTML DOM elements of this object and will create a DOMElement for each DOM child.
         * If the 'data-cid' property exists is on an HTML element a DOMElement will not be create for that element because it will be assumed it already exists as a DOMElement.
         * @public
         */
        DOMElement.prototype.getChildren = function(selector) {
            if (selector === void 0) { selector = ''; }
            //TODO: Make sure the index of the children added is the same as the what is in the actual DOM.
            var $child;
            var domElement;
            var $list = this.$element.children(selector);
            var listLength = $list.length;
            for (var i = 0; i < listLength; i++) {
                $child = jQuery($list[i]);
                // If the jQuery element already has cid data property then must be an existing DisplayObjectContainer (DOMElement) in the children array.
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
         * The parent property of the removed child is set to null , and the object is garbage collected if no other references
         * to the child exist. The index positions of any objects above the child in the parent object are decreased by 1.
         *
         * @method removeChild
         * @param child {DOMElement} The DisplayObjectContainer instance to remove.
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChild = function(child, destroy) {
            if (destroy === void 0) { destroy = true; }
            // If destroy was called before removeChild so id doesn't error.
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
        DOMElement.prototype.removeChildAt = function(index, destroy) {
            if (destroy === void 0) { destroy = true; }
            this.removeChild(this.getChildAt(index), destroy);
            return this;
        };
        /**
         * Removes all child object instances from the child list of the parent object instance.
         * The parent property of the removed children is set to null , and the objects are garbage collected if no other
         * references to the children exist.
         *
         * @method removeChildren
         * @returns {DOMElement} Returns an instance of itself.
         * @override
         * @public
         * @chainable
         */
        DOMElement.prototype.removeChildren = function(destroy) {
            if (destroy === void 0) { destroy = true; }
            _super.prototype.removeChildren.call(this, destroy);
            this.$element.empty();
            return this;
        };
        /**
         * @overridden DisplayObjectContainer.destroy
         */
        DOMElement.prototype.destroy = function() {
            // If the addChild method is never called before the destroyed the $element will be null and cause an TypeError.
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
         * If any selectors are found the EmailShareComponent class will be instantiate and pass the found jQuery element into the contructor.
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
        DOMElement.prototype.createComponents = function(componentList) {
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
    })();

    return DOMElement;
}));

},{"../display/DisplayObjectContainer":14,"../event/BaseEvent":16,"../plugin/jquery.eventListener":23,"../util/ComponentFactory":24,"../util/Extend":25,"../util/TemplateFactory":27}],13:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../event/EventDispatcher'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../event/EventDispatcher'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.DisplayObject = factory(root.StructureJS.Extend, root.StructureJS.EventDispatcher);
    }
}(this, function(Extend, EventDispatcher) {

    'use strict';

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
    var DisplayObject = (function() {

        var _super = Extend(DisplayObject, EventDispatcher);

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
        DisplayObject.prototype.create = function() {
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
        DisplayObject.prototype.layout = function() {
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
        DisplayObject.prototype.setSize = function(unscaledWidth, unscaledHeight) {
            this.unscaledWidth = unscaledWidth;
            this.unscaledHeight = unscaledHeight;
            return this;
        };
        DisplayObject.prototype.readerStart = function() {
            this.ctx.save();
        };
        DisplayObject.prototype.update = function() {
            if (this.ctx === null || this.alpha <= 0 || this.visible === false)
                return false;
            this.readerStart();
            this.ctx.globalAlpha = this.alpha;
            this.layout();
            this.renderEnd();
        };
        DisplayObject.prototype.renderEnd = function() {
            this.ctx.restore();
        };
        return DisplayObject;
    })();

    return DisplayObject;
}));

},{"../event/EventDispatcher":17,"../util/Extend":25}],14:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DisplayObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DisplayObject'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.DisplayObjectContainer = factory(root.StructureJS.Extend, root.StructureJS.DisplayObject);
    }
}(this, function(Extend, DisplayObject) {

    'use strict';

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
    var DisplayObjectContainer = (function() {

        var _super = Extend(DisplayObjectContainer, DisplayObject);

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
        DisplayObjectContainer.prototype.addChild = function(child) {
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
        DisplayObjectContainer.prototype.addChildAt = function(child, index) {
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
        DisplayObjectContainer.prototype.removeChild = function(child, destroy) {
            var index = this.getChildIndex(child);
            if (index !== -1) {
                // Removes the child object from the parent.
                this.children.splice(index, 1);
            }
            this.numChildren = this.children.length;
            if (destroy === true) {
                child.destroy();
            } else {
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
        DisplayObjectContainer.prototype.removeChildren = function(destroy) {
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
        DisplayObjectContainer.prototype.swapChildren = function(child1, child2) {
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
        DisplayObjectContainer.prototype.swapChildrenAt = function(index1, index2) {
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
        DisplayObjectContainer.prototype.getChildIndex = function(child) {
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
        DisplayObjectContainer.prototype.contains = function(child) {
            return this.children.indexOf(child) >= 0;
        };
        /**
         * Returns the child display object instance that exists at the specified index.
         *
         * @method getChildAt
         * @param index {int} The index position of the child object.
         * @returns {DisplayObject} The child display object at the specified index position.
         */
        DisplayObjectContainer.prototype.getChildAt = function(index) {
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
        DisplayObjectContainer.prototype.getChildByCid = function(cid) {
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
    })();

    return DisplayObjectContainer;
}));

},{"../util/Extend":25,"./DisplayObject":13}],15:[function(require,module,exports){
(function (global){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './DOMElement', 'jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./DOMElement'), (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Stage = factory(root.StructureJS.Extend, root.StructureJS.DOMElement, root.jQuery);
    }
}(this, function(Extend, DOMElement, jQuery) {

    'use strict';

    /**
     * The {{#crossLink "Stage"}}{{/crossLink}} class should be extended by your main or root class.
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
     *     // This example illustrates how to setup your main or root class when extending the {{#crossLink "Stage"}}{{/crossLink}} class.
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
     *                 // Destroy the child objects and references in this parent class to prevent memory leaks.
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
     * This example illustrates how to instantiation your main or root class.
     *
     *      var app = new MainClass();
     *      app.appendTo('body');
     *
     */
    var Stage = (function() {

        var _super = Extend(Stage, DOMElement);

        function Stage() {
            _super.call(this);
        }
        /**
         * The selected HTML element where all the child elements will be created. This method also starts the lifecycle of the application.
         *
         * @method appendTo
         * @param type {any} A string value that you want the your code appended too. This can be an element id (#some-id), element class (.some-class) or a element tag (body).
         * @param [enabled=true] {boolean} Sets the enabled state of the object.
         * @chainable
         */
        Stage.prototype.appendTo = function(type, enabled) {
            if (enabled === void 0) { enabled = true; }
            this.$element = (type instanceof jQuery) ? type : jQuery(type);
            this.$element.attr('data-cid', this.cid);
            if (this.isCreated === false) {
                this.create();
                this.isCreated = true;
                if (enabled === false) {
                    this.disable();
                } else {
                    this.enable();
                }
                this.layout();
            }
            return this;
        };
        return Stage;
    })();

    return Stage;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/Extend":25,"./DOMElement":12}],16:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../BaseObject'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.BaseEvent = factory(root.StructureJS.Extend, root.StructureJS.BaseObject);
    }
}(this, function(Extend, BaseObject) {

    'use strict';

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
    var BaseEvent = (function() {

        var _super = Extend(BaseEvent, BaseObject);

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
        BaseEvent.prototype.stopPropagation = function() {
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
        BaseEvent.prototype.stopImmediatePropagation = function() {
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
        BaseEvent.prototype.clone = function() {
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
    })();

    return BaseEvent;
}));

},{"../BaseObject":8,"../util/Extend":25}],17:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../ObjectManager', './BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../ObjectManager'), require('./BaseEvent'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.EventDispatcher = factory(root.StructureJS.Extend, root.StructureJS.ObjectManager, root.StructureJS.BaseEvent);
    }
}(this, function(Extend, ObjectManager, BaseEvent) {

    'use strict';

    /**
     * The EventDispatcher class is the base class for all classes that dispatch events and is the base class for the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} class.
     * The EventDispatcher provides methods for managing prioritized queues of event listeners and dispatching events.
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
    var EventDispatcher = (function() {

        var _super = Extend(EventDispatcher, ObjectManager);

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
             * Indicates the object that contains child object. Use the parent property
             * to specify a relative path to display objects that are above the current display object in the display
             * list hierarchy. Helps facilitates event bubbling.
             *
             * @property parent
             * @type {any}
             * @public
             */
            this.parent = null;
            this._listeners = [];
        }
        /**
         * Registers an event listener object with an EventDispatcher object so that the listener receives notification of an event.
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
        EventDispatcher.prototype.addEventListener = function(type, callback, scope, priority) {
            if (priority === void 0) { priority = 0; }
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list == null) {
                // If a list of event listener(s) do not exist for the type value passed in then create a new empty array.
                this._listeners[type] = list = [];
            }
            var index = 0;
            var listener;
            var i = list.length;
            while (--i > -1) {
                listener = list[i];
                if (listener.callback === callback && listener.scope === scope) {
                    // If same callback and scope is found then remove it. Then add the current one below.
                    list.splice(i, 1);
                } else if (index === 0 && listener.priority < priority) {
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
         * @hide This was added because it was need for the {{#crossLink "EventBroker"}}{{/crossLink}} class. To keep things consistent this parameter is required.
         * @public
         * @chainable
         * @example
         *      this.removeEventListener(BaseEvent.CHANGE, this.handlerMethod, this);
         *
         *      ClassName.prototype.handlerMethod = function (event) {
         *      }
         */
        EventDispatcher.prototype.removeEventListener = function(type, callback, scope) {
            // Get the list of event listener(s) by the associated type value that is passed in.
            var list = this._listeners[type];
            if (list !== void 0) {
                var i = list.length;
                while (--i > -1) {
                    // If the callback and the scope are the same then remove the event listener.
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
         *      // Example with sending data with the event:
         *      this.dispatchEvent('change', {some: 'data'});
         *
         *      // Example with an event object
         *      // (event type, bubbling set to true, cancelable set to true and passing data) :
         *      var event = new BaseEvent(BaseEvent.CHANGE, true, true, {some: 'data'});
         *      this.dispatchEvent(event);
         *
         *      // Here is a common inline event object being dispatched:
         *      this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
         */
        EventDispatcher.prototype.dispatchEvent = function(type, data) {
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
            // Get the list of event listener(s) by the associated type value.
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
        EventDispatcher.prototype.hasEventListener = function(type, callback, scope) {
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
         *      // [ClassName] is listen for 'BaseEvent.change' event.
         */
        EventDispatcher.prototype.getEventListeners = function() {
            var str = '';
            var numOfCallbacks;
            var listener;
            for (var type in this._listeners) {
                numOfCallbacks = this._listeners[type].length;
                for (var i = 0; i < numOfCallbacks; i++) {
                    listener = this._listeners[type][i];
                    if (listener.scope && (typeof listener.scope.getQualifiedClassName === 'function')) {
                        str += '[' + listener.scope.getQualifiedClassName() + ']';
                    } else {
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
        EventDispatcher.prototype.destroy = function() {
            _super.prototype.disable.call(this);
            _super.prototype.destroy.call(this);
        };
        return EventDispatcher;
    })();

    return EventDispatcher;
}));

},{"../ObjectManager":9,"../util/Extend":25,"./BaseEvent":16}],18:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./BaseEvent'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.LocalStorageEvent = factory(root.StructureJS.Extend, root.StructureJS.BaseEvent);
    }
}(this, function(Extend, BaseEvent) {

    'use strict';

    /**
     * The LocalStorageEvent ....
     * Note: the event only dispatches in other browser windows and does not show up in the window where you made a change to the local storage.
     *
     * @class LocalStorageEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param nativeEvent {StorageEvent} The native browser event for localStorage.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var LocalStorageEvent = (function() {

        var _super = Extend(LocalStorageEvent, BaseEvent);

        function LocalStorageEvent(type, bubbles, cancelable, nativeEvent) {
            _super.call(this, type, bubbles, cancelable, nativeEvent);
            /**
             * TODO: YUIDoc_comment
             *
             * @property originalEvent
             * @type {any}
             * @public
             */
            this.originalEvent = null;
            if (nativeEvent) {
                this.key = nativeEvent.key;
                this.oldValue = nativeEvent.oldValue;
                this.newValue = nativeEvent.newValue;
                this.url = nativeEvent.url;
            }
            this.originalEvent = nativeEvent;
        }
        /**
         * The storage event is fired on a Document's Window object when a storage area changes.
         *
         * @event STORAGE
         * @type {string}
         * @static
         */
        LocalStorageEvent.STORAGE = 'storage';
        return LocalStorageEvent;
    })();

    return LocalStorageEvent;
}));

},{"../util/Extend":25,"./BaseEvent":16}],19:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', './BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('./BaseEvent'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.RouterEvent = factory(root.StructureJS.Extend, root.StructureJS.BaseEvent);
    }
}(this, function(Extend, BaseEvent) {

    'use strict';

    /**
     * The RouterEvent is used in the {{#crossLink "Router"}}{{/crossLink}} class and gets passed to the callback in the {{#crossLink "Route"}}{{/crossLink}} class.
     *
     * @class RouterEvent
     * @extends BaseEvent
     * @param type {string} The type of event. The type is case-sensitive.
     * @param [bubbles=false] {boolean} Indicates whether an event is a bubbling event. If the event can bubble, this value is true; otherwise it is false.
     * Note: With event-bubbling you can let one Event subsequently call on every ancestor ({{#crossLink "EventDispatcher/parent:property"}}{{/crossLink}})
     * (containers of containers of etc.) of the {{#crossLink "DisplayObjectContainer"}}{{/crossLink}} that originally dispatched the Event, all the way up to the surface ({{#crossLink "Stage"}}{{/crossLink}}). Any classes that do not have a parent cannot bubble.
     * @param [cancelable=false] {boolean} Indicates whether the behavior associated with the event can be prevented. If the behavior can be canceled, this value is true; otherwise it is false.
     * @param [data=null] {any} Use to pass any type of data with the event.
     * @module StructureJS
     * @submodule event
     * @requires Extend
     * @requires BaseEvent
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    var RouterEvent = (function() {

        var _super = Extend(RouterEvent, BaseEvent);

        function RouterEvent(type, bubbles, cancelable, data) {
            if (type === void 0) { type = RouterEvent.CHANGE; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (data === void 0) { data = null; }
            _super.call(this, type, bubbles, cancelable, data);
            /**
             * The route that was matched against {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
             *
             * @property route
             * @type {string}
             * @public
             */
            this.route = null;
            /**
             * The new URL to which the window is navigating.
             *
             * @property newURL
             * @type {string}
             * @public
             */
            this.newURL = null;
            /**
             * The previous URL from which the window was navigated.
             *
             * @property oldURL
             * @type {string}
             * @public
             */
            this.oldURL = null;
            /**
             * The route pattern that matched the {{#crossLink "RouterEvent/route:property"}}{{/crossLink}} property.
             *
             * @property routePattern
             * @type {string}
             * @public
             */
            this.routePattern = null;
            /**
             * An array containing the parameters captured from the Route.{{#crossLink "Route/match:method"}}{{/crossLink}}
             * being called with the {{#crossLink "RouterEvent/routePattern:property"}}{{/crossLink}} property.
             *
             * @property params
             * @type {string}
             * @public
             */
            this.params = [];
            /**
             * A query object the represents the query string in the hash url.
             *
             * @property query
             * @type {any}
             * @public
             */
            this.query = null;
        }
        /**
         * The RouterEvent.CHANGE constant defines the value of the type property of an change route event object.
         *
         * @event CHANGE
         * @type {string}
         * @static
         */
        RouterEvent.CHANGE = 'RouterEvent.change';
        return RouterEvent;
    })();

    return RouterEvent;
}));

},{"../util/Extend":25,"./BaseEvent":16}],20:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../util/Util', '../event/EventDispatcher', '../event/BaseEvent'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../util/Util'), require('../event/EventDispatcher'), require('../event/BaseEvent'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Collection = factory(root.StructureJS.Extend, root.StructureJS.Util, root.StructureJS.EventDispatcher, root.StructureJS.BaseEvent);
    }
}(this, function(Extend, Util, EventDispatcher, BaseEvent) {

    'use strict';

    /**
     * The Collection class provides a way for you to manage your models.
     *
     * @class Collection
     * @extends EventDispatcher
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires EventDispatcher
     * @requires BaseEvent
     * @constructor
     * @param valueObjectType {ValueObject} Pass a class that extends ValueObject and the data added to the collection will be created as that type.
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     var data = [{ make: 'Tesla', model: 'Model S', year: 2014 }, { make: 'Tesla', model: 'Model X', year: 2016 }];
     *
     *     // Example of adding data to a collection
     *     var collection = new Collection();
     *     collection.add(data);
     *
     *     // Example of adding data to a collection that will create a CarVO model for each data object passed in.
     *     var collection = new Collection(CarVO);
     *     collection.add(data);
     */
    var Collection = (function() {

        var _super = Extend(Collection, EventDispatcher);

        function Collection(valueObjectType) {
            if (valueObjectType === void 0) { valueObjectType = null; }
            _super.call(this);
            /**
             * The list of models in the collection.
             *
             * @property models
             * @type {Array}
             * @readOnly
             */
            this.models = [];
            /**
             * The count of how many models are in the collection.
             *
             * @property length
             * @type {int}
             * @default 0
             * @readOnly
             * @public
             */
            this.length = 0;
            /**
             * A reference to a ValueObject that will be used in the collection.
             *
             * @property _modelType
             * @type {ValueObject}
             * @private
             */
            this._modelType = null;
            this._modelType = valueObjectType;
        }
        /**
         * Adds model or an array of models to the collection.
         *
         * @method add
         * @param model {Any|Array} Single or an array of models to add to the current collection.
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.add(vo);
         *      collection.add(vo, true);
         */
        Collection.prototype.add = function(model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            var len = models.length;
            for (var i = 0; i < len; i++) {
                // Only add the model if it does not exist in the the collection.
                if (this.has(models[i]) === false) {
                    if (this._modelType !== null) {
                        // If the modeType is set then instantiate it and pass the data into the constructor.
                        this.models.push(new this._modelType(models[i]));
                    } else {
                        // Pass the data object to the array.
                        this.models.push(models[i]);
                    }
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.ADDED));
            }
            return this;
        };
        /**
         * Removes a model or an array of models from the collection.
         *
         * @method remove
         * @param model {Object|Array} Model(s) to remove
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.remove(vo);
         *
         *      collection.remove(vo, true);
         */
        Collection.prototype.remove = function(model, silent) {
            if (silent === void 0) { silent = false; }
            // If the model passed in is not an array then make it.
            var models = (model instanceof Array) ? model : [model];
            for (var i = models.length - 1; i >= 0; i--) {
                // Only remove the model if it exists in the the collection.
                if (this.has(models[i]) === true) {
                    this.models.splice(this.indexOf(models[i]), 1);
                    this.length = this.models.length;
                }
            }
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.REMOVED));
            }
            return this;
        };
        /**
         * Checks if a collection has an model.
         *
         * @method has
         * @param model {Object} Item to check
         * @return {boolean}
         * @public
         * @example
         *      collection.has(vo);
         */
        Collection.prototype.has = function(model) {
            return this.indexOf(model) > -1;
        };
        /**
         * Returns the array index position of the value object.
         *
         * @method indexOf
         * @param model {Object} get the index of.
         * @return {int}
         * @public
         * @example
         *      collection.indexOf(vo);
         */
        Collection.prototype.indexOf = function(model) {
            return this.models.indexOf(model);
        };
        /**
         * Finds an object by an index value.
         * If the index is out of bounds, the collection will clamp it.
         *
         * @method get
         * @param index {int} The index integer of the model to get
         * @return {Object} model to find
         * @public
         * @example
         *      collection.get(1);
         */
        Collection.prototype.get = function(index) {
            if (index < 0) {
                index = 0;
            }
            if (index >= this.models.length) {
                index = this.models.length - 1;
            }
            // Return the model by the index. It will return null if the array is empty.
            return this.models[index] || null;
        };
        /**
         * Examines each element in a collection, returning an array of all elements that have the given properties.
         * When checking properties, this method performs a deep comparison between values to determine if they are equivalent to each other.
         * @method findBy
         * @param arg {Object|Array}
         * @return {Array} Returns a list of found object's.
         * @public
         * @example
         *      // Finds all value object that has 'Robert' in it.
         *      this._collection.findBy("Robert");
         *      // Finds any value object that has 'Robert' or 'Heater' or 23 in it.
         *      this._collection.findBy(["Robert", "Heather", 32]);
         *
         *      // Finds all value objects that same key and value you are searching for.
         *      this._collection.findBy({ name: 'apple', organic: false, type: 'fruit' });
         *      this._collection.findBy([{ type: 'vegetable' }, { name: 'apple', 'organic: false, type': 'fruit' }]);
         */
        Collection.prototype.findBy = function(arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var len = list.length;
            var prop;
            for (var i = 0; i < len; i++) {
                prop = list[i];
                // Adds found value object to the foundItems array.
                if ((typeof prop === 'string') || (typeof prop === 'number') || (typeof prop === 'boolean')) {
                    // If the model is not an object.
                    foundItems = foundItems.concat(this._findPropertyValue(prop));
                } else {
                    // If the model is an object.
                    foundItems = foundItems.concat(this._where(prop));
                }
            }
            // Removes all duplicated objects found in the temp array.
            return this._unique(foundItems);
        };
        /**
         * Loops through the models array and creates a new array of models that match all the properties on the object passed in.
         *
         * @method _where
         * @param propList {Object|Array}
         * @return {Array} Returns a list of found object's.
         * @private
         */
        Collection.prototype._where = function(propList) {
            // If properties is not an array then make it an array object.
            var list = (propList instanceof Array) ? propList : [propList];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var hasMatchingProperty = false;
            var doesModelMatch = false;
            var model;
            var obj;
            var key;
            var j;
            for (var i = 0; i < itemsToFindLength; i++) {
                obj = list[i];
                for (j = 0; j < itemsLength; j++) {
                    hasMatchingProperty = false;
                    doesModelMatch = true;
                    model = this.models[j];
                    for (key in obj) {
                        // Check if the key value is a property.
                        if (obj.hasOwnProperty(key) && model.hasOwnProperty(key)) {
                            hasMatchingProperty = true;
                            if (obj[key] !== model[key]) {
                                doesModelMatch = false;
                                break;
                            }
                        }
                    }
                    if (doesModelMatch === true && hasMatchingProperty === true) {
                        foundItems.push(model);
                    }
                }
            }
            return foundItems;
        };
        /**
         * Loops through all properties of an object and check to see if the value matches the argument passed in.
         *
         * @method _findPropertyValue
         * @param arg {String|Number|Boolean>}
         * @return {Array} Returns a list of found object's.
         * @private
         */
        Collection.prototype._findPropertyValue = function(arg) {
            // If properties is not an array then make it an array object.
            var list = (arg instanceof Array) ? arg : [arg];
            var foundItems = [];
            var itemsLength = this.models.length;
            var itemsToFindLength = list.length;
            var propertyValue;
            var value;
            var model;
            var key;
            var j;
            for (var i = 0; i < itemsLength; i++) {
                model = this.models[i];
                for (key in model) {
                    // Check if the key value is a property.
                    if (model.hasOwnProperty(key)) {
                        propertyValue = model[key];
                        for (j = 0; j < itemsToFindLength; j++) {
                            value = list[j];
                            // If the value object property equals the string value then keep a reference to that value object.
                            if (propertyValue === value) {
                                // Add found value object to the foundItems array.
                                foundItems.push(model);
                                break;
                            }
                        }
                    }
                }
            }
            return foundItems;
        };
        /**
         * Clears or remove all the models from the collection.
         *
         * @method clear
         * @param [silent=false] {boolean} If you'd like to prevent the event from being dispatched.
         * @public
         * @chainable
         * @example
         *      collection.clear();
         */
        Collection.prototype.clear = function(silent) {
            if (silent === void 0) { silent = false; }
            this.models = [];
            this.length = 0;
            if (silent === false) {
                this.dispatchEvent(new BaseEvent(BaseEvent.CLEAR));
            }
            return this;
        };
        /**
         * Creates and returns a new collection object that contains a reference to the models in the collection cloned from.
         *
         * @method clone
         * @returns {Collection}
         * @public
         * @example
         *     var clone = collection.clone();
         */
        Collection.prototype.clone = function() {
            var clonedValueObject = new this.constructor(this._modelType);
            clonedValueObject.add(this.models.slice(0));
            return clonedValueObject;
        };
        /**
         * Creates a JSON object of the collection.
         *
         * @method toJSON
         * @returns {Array}
         * @public
         * @example
         *     var arrayOfObjects = collection.toJSON();
         */
        Collection.prototype.toJSON = function() {
            if (this._modelType !== null) {
                var list = [];
                var len = this.length;
                for (var i = 0; i < len; i++) {
                    list[i] = this.models[i].toJSON();
                }
                return list;
            } else {
                return Util.clone(this.models);
            }
        };
        /**
         * Creates a JSON string of the collection.
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = collection.toJSONString();
         */
        Collection.prototype.toJSONString = function() {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Objects and calls the {{#crossLink "Collection/add:method"}}{{/crossLink}} method to add the objects to the collection.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @chainable
         * @example
         *      collection.fromJSON(str);
         */
        Collection.prototype.fromJSON = function(json) {
            var parsedData = JSON.parse(json);
            this.add(parsedData);
            return this;
        };
        /**
         * Allows you to sort models that have one or more common properties, specifying the property or properties to use as the sort keys
         *
         * @method sortOn
         * @param propertyName {string}
         * @param [sortAscending=true] {boolean}
         * @public
         * @return {Array} Returns the list of models in the collection.
         * @example
         *      collection.sortOn('name');
         *      collection.sortOn('name', false);
         */
        Collection.prototype.sortOn = function(propertyName, sortAscending) {
            if (sortAscending === void 0) { sortAscending = true; }
            if (sortAscending === false) {
                return this.sort(function(a, b) {
                    if (a[propertyName] < b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] > b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                return this.sort(function(a, b) {
                    if (a[propertyName] > b[propertyName]) {
                        return 1;
                    }
                    if (a[propertyName] < b[propertyName]) {
                        return -1;
                    }
                    return 0;
                });
            }
        };
        /**
         * Specifies a function that defines the sort order. If omitted, the array is sorted according to each character's Unicode code
         * point value, according to the string conversion of each element.
         *
         * @method sort
         * @param [sortFunction=null] {Function}
         * @public
         * @return {Array} Returns the list of models in the collection.
         * @example
         *      var sortByDate = function(a, b){
         *          return new Date(a.date) - new Date(b.date)
         *      }
         *
         *      collection.sort(sortByDate);
         */
        Collection.prototype.sort = function(sortFunction) {
            if (sortFunction === void 0) { sortFunction = null; }
            this.models.sort(sortFunction);
            return this.models;
        };
        /**
         * The filter method creates a new array with all elements that pass the test implemented by the provided function.
         *
         * @method filter
         * @param filterFunction {Function} Function to test each element of the array. Invoked with arguments (element, index, array). Return true to keep the element, false otherwise.
         * @public
         * @return {Array} Returns the list of models in the collection.
         * @example
         *      var isOldEnough = function(model){
         *          return model.age >= 21;
         *      }
         *
         *      var list = collection.filter(isOldEnough);
         */
        Collection.prototype.filter = function(filterFunction) {
            if (filterFunction === void 0) { filterFunction = null; }
            return this.models.filter(filterFunction);
        };
        /**
         * Changes the order of the models so that the last model becomes the first model, the penultimate model becomes the second, and so on.
         *
         * @method reverse
         * @public
         * @return {Array} Returns the list of models in the collection.
         * @example
         *      collection.reverse();
         */
        Collection.prototype.reverse = function() {
            return this.models.reverse();
        };
        /**
         * Returns a new array of models with duplicates removed.
         *
         * @method _unique
         * @param list {Array} The array you want to use to generate the unique array.
         * @return {Array} Returns a new array list of models in the collection with duplicates removed.
         * @private
         */
        Collection.prototype._unique = function(list) {
            var unique = list.reduce(function(previousValue, currentValue) {
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []);
            return unique;
        };
        return Collection;
    })();

    return Collection;
}));

},{"../event/BaseEvent":16,"../event/EventDispatcher":17,"../util/Extend":25,"../util/Util":28}],21:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Route = factory();
    }
}(this, function() {

    'use strict';

    /**
     * The **Route** class is a model that keeps track of a specific route for the {{#crossLink "Router"}}{{/crossLink}} class.
     *
     * @class Route
     * @module StructureJS
     * @submodule model
     * @param routePattern {string} The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ''
     * @param callback {Function} The function that should be executed when a request matches the routePattern.
     * @param callbackScope {any} The scope of the callback function that should be executed.
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     // Example of adding a route listener and the function callback below.
     *     var route = new Route('/games/{gameName}/:level:/', this.onRouteHandler, this);
     *
     *     // The above route would match the string below:
     *     route.match('/games/asteroids/2/');
     *
     * Route Pattern Options:
     * ----------------------
     * **:optional:** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want it to be.
     *
     *     var route = new Route('/contact/:name:/', this.method, this);
     *
     *     // Will match one of the following:
     *     route.match('/contact/');
     *     route.match('/contact/heather/');
     *     route.match('/contact/john/');
     *
     *
     * **{required}** The two curly brackets **{}** means a part of the hash url is required for the match. The text between can be anything you want it to be.
     *
     *     var route = new Route('/product/{productName}/', this.method, this);
     *
     *     // Will match one of the following:
     *     route.match('/product/shoes/');
     *     route.match('/product/jackets/');
     *
     *
     * **\*** The asterisk character means it will match all or part of part the hash url.
     *
     *     var route = new Route('*', this.method, this);
     *
     *     // Will match one of the following:
     *     route.match('/anything/');
     *     route.match('/matches/any/hash/url/');
     *     route.match('/really/it/matches/any/and/all/hash/urls/');
     *
     *
     * **''** The empty string means it will match when there are no hash url.
     *
     *     var route = new Route('', this.method, this);
     *     var route = new Route('/', this.method, this);
     *
     *     // Will match one of the following:
     *     route.match('');
     *     route.match('/');
     *
     *
     * Other possible combinations but not limited too:
     *
     *     var route = new Route('/games/{gameName}/:level:/', this.method1, this);
     *     var route = new Route('/{category}/blog/', this.method2, this);
     *     var route = new Route('/about/*', this.method4, this);
     *
     */
    var Route = (function() {
        function Route(routePattern, callback, scope) {
            /**
             * The string pattern you want to have match, which can be any of the following combinations {}, ::, *, ?, "". See below for examples.
             *
             * @property routePattern
             * @type String
             * @public
             */
            this.routePattern = '';
            /**
             * The regex representation for the routePattern that was passed into the constructor.
             *
             * @property regex
             * @type RegExp
             * @public
             * @readOnly
             */
            this.regex = null;
            /**
             * The function that should be executed when a request matches the routePattern. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callback
             * @type {Function}
             * @public
             */
            this.callback = null;
            /**
             * The scope of the callback function that should be executed. The {{#crossLink "Router"}}{{/crossLink}} class will be using this property.
             *
             * @property callbackScope
             * @type {any}
             * @public
             */
            this.callbackScope = null;
            this.routePattern = routePattern;
            this.regex = this.routePatternToRegexp(routePattern);
            this.callback = callback;
            this.callbackScope = scope;
        }
        /**
         * Converts the routePattern that was passed into the constructor to a regexp object.
         *
         * @method routePatternToRegexp
         * @param {String} routePattern
         * @returns {RegExp}
         * @private
         */
        Route.prototype.routePatternToRegexp = function(routePattern) {
            var findFirstOrLastForwardSlash = new RegExp('^\/|\/$', 'g'); // Finds if the first character OR if the last character is a forward slash
            var findOptionalColons = new RegExp(':([^:]*):', 'g'); // Finds the colons : :
            var findRequiredBrackets = new RegExp('{([^}]+)}', 'g'); // Finds the brackets { }
            var optionalFirstCharSlash = '^/?'; // Allows the first character to be if a forward slash to be optional.
            var optionalLastCharSlash = '/?$'; // Allows the last character to be if a forward slash to be optional.
            // Remove first and last forward slash.
            routePattern = routePattern.replace(findFirstOrLastForwardSlash, '');
            // Convert the wild card * be a regex ?(.*) to select all.
            routePattern = routePattern.replace('*', '?(.*)');
            // Make any :alphanumeric: optional
            routePattern = routePattern.replace(findOptionalColons, '?([^/]*)');
            // Make any {alphanumeric} required
            routePattern = routePattern.replace(findRequiredBrackets, '([^/]+)');
            return new RegExp(optionalFirstCharSlash + routePattern + optionalLastCharSlash, 'i');
        };
        /**
         * Determine if a route matches a routePattern.
         *
         * @method match
         * @param route {String} The route or path to match against the routePattern that was passed into the constructor.
         * @returns {Array}
         * @example
         *     var route = new Route('/games/{gameName}/:level:/', this.method, this);
         *     console.log( route.match('/games/asteroids/2/') );
         */
        Route.prototype.match = function(route) {
            // Remove the query string before matching against the route pattern.
            var routeWithoutQueryString = route.replace(/\?.*/, '');
            return routeWithoutQueryString.match(this.regex);
        };
        return Route;
    })();

    return Route;
}));

},{}],22:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/Extend', '../BaseObject', '../util/Util'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/Extend'), require('../BaseObject'), require('../util/Util'));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.ValueObject = factory(root.StructureJS.Extend, root.StructureJS.BaseObject, root.StructureJS.Util);
    }
}(this, function(Extend, BaseObject, Util) {

    'use strict';

    /**
     * Value Object (VO) is a design pattern used to transfer data between software application subsystems.
     *
     * Note: If the data doesn't match the property names you can set the value manually after update super method has been called.
     *  Also in the class you inherit ValueObject from you can override the update method to handle the data how you want.
     *
     * @class ValueObject
     * @extends BaseObject
     * @param [data] {any} Provide a way to update the value object upon initialization.
     * @module StructureJS
     * @submodule model
     * @requires Extend
     * @requires BaseObject
     * @requires Util
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @example
     *     var data = {
     *          make: 'Tesla',
     *          model: 'Model S',
     *          YeAr: 2014,
     *          feature: {
     *              abs: true,
     *              airbags: true
     *          }
     *     }
     *     var carVO = new CarVO(data);
     *
     *
     *     // Example how to extend the ValueObject class.
     *      var CarVO = (function () {
     *          var _super = Extend(CarVO, ValueObject);
     *          function CarVO(data) {
     *              _super.call(this);
     *
     *              // You need to have properties so the data will get assigned.
     *              // If not the data will not get assigned to the vo.
     *              this.make = null;
     *              this.model = null;
     *              this.year = null;
     *              this.allWheel = false; // Set a default value.
     *
     *              // You can assign a ValueObject to a property which will
     *              // automatically created it and pass the data to it.
     *              this.feature = FeatureVO;
     *
     *              // If you have an array of data and want them assign to a ValueObject.
     *              this.feature = [FeatureVO];
     *
     *              if (data) {
     *                  this.update(data);
     *              }
     *          }
     *
     *          // @overridden ValueObject.update
     *          CarVO.prototype.update = function (data) {
     *              _super.prototype.update.call(this, data);
     *
     *              // If the data doesn't match the property name.
     *             // You can set the value(s) manually after the update super method has been called.
     *              this.year = data.YeAr;
     *          };
     *
     *          return CarVO;
     *      })();
     */
    var ValueObject = (function() {

        var _super = Extend(ValueObject, BaseObject);

        function ValueObject() {
            _super.call(this);
        }
        /**
         * Provide a way to update the value object.
         *
         * @method update
         * @param data {any}
         * @public
         * @example
         *     // Example of updating some of the data:
         *     carVO.update({ year: 2015, allWheel: true});
         *
         *     // Of course you can also do it the following way:
         *     carVO.year = 2015;
         *     carVO.allWheel = false;
         */
        ValueObject.prototype.update = function(data) {
            var propertyData;
            for (var propertyKey in this) {
                // If this class has a property that matches a property on the data being passed in then set it.
                // Also don't set the cid data value because it is automatically set in the constructor and
                // we do want it to be overridden when the clone method has been called.
                if (this.hasOwnProperty(propertyKey) && propertyKey !== 'cid') {
                    // If the data passed in does not have a property that matches a property on the value object then
                    // use the default value/data that was assigned to the property.
                    // Else use the data that was passed in.
                    propertyData = (data[propertyKey] === void 0) ? this[propertyKey] : data[propertyKey];
                    this._setData(propertyKey, propertyData);
                }
            }
            return this;
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _setData
         * @param key
         * @param data
         * @private
         */
        ValueObject.prototype._setData = function(key, data) {
            if (data instanceof Array) {
                var temp = [];
                var len = data.length;
                if ((this[key][0] instanceof ValueObject.constructor && data[0] instanceof ValueObject.constructor) === false) {
                    var valueObjectOrOther = (this[key] instanceof Array) ? this[key][0] : this[key];
                    for (var i = 0; i < len; i++) {
                        temp[i] = this._updateData(valueObjectOrOther, data[i]);
                    }
                }
                this[key] = temp;
            } else {
                this[key] = this._updateData(this[key], data);
            }
        };
        /**
         * TODO: YUIDoc_comment
         *
         * @method _updateData
         * @param keyValue
         * @param data
         * @private
         */
        ValueObject.prototype._updateData = function(keyValue, data) {
            if (keyValue instanceof ValueObject.constructor) {
                // If the property is an instance of a ValueObject class and has not been created yet.
                // Then instantiate it and pass in the data to the constructor.
                keyValue = new keyValue(data);
            } else if (keyValue instanceof ValueObject) {
                // If property is an instance of a ValueObject class and has already been created.
                // Then call the update method and pass in the data.
                keyValue.update(data);
            } else {
                // Else just assign the data to the property.
                keyValue = data;
            }
            return keyValue;
        };
        /**
         * Converts the value object data into a JSON object and deletes the cid property.
         *
         * @method toJSON
         * @returns {ValueObject}
         * @public
         * @example
         *     var obj = carVO.toJSON();
         */
        ValueObject.prototype.toJSON = function() {
            var clone = Util.clone(this);
            return Util.deletePropertyFromObject(clone, ['cid']);
        };
        /**
         * Converts a value object to a JSON string,
         *
         * @method toJSONString
         * @returns {string}
         * @public
         * @example
         *     var str = carVO.toJSONString();
         */
        ValueObject.prototype.toJSONString = function() {
            return JSON.stringify(this.toJSON());
        };
        /**
         * Converts the string json data into an Object and calls the {{#crossLink "ValueObject/update:method"}}{{/crossLink}} method with the converted Object.
         *
         * @method fromJSON
         * @param json {string}
         * @public
         * @example
         *      var str = '{"make":"Tesla","model":"Model S","year":2014}'
         *      var carVO = new CarVO();
         *      carVO.fromJSON(str);
         */
        ValueObject.prototype.fromJSON = function(json) {
            var parsedData = JSON.parse(json);
            this.update(parsedData);
            return this;
        };
        /**
         * Create a clone/copy of the value object.
         *
         * @method clone
         * @returns {ValueObject}
         * @public
         * @example
         *     var clone = carVO.clone();
         */
        ValueObject.prototype.clone = function() {
            var clonedValueObject = new this.constructor(this);
            return clonedValueObject;
        };
        return ValueObject;
    })();

    return ValueObject;
}));

},{"../BaseObject":8,"../util/Extend":25,"../util/Util":28}],23:[function(require,module,exports){
(function (global){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory((typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null));
    } else {
        /*jshint sub:true */
        factory(root.jQuery);
    }
}(this, function($) {

    'use strict';

    var $eventListener = $;
    /**
     * A bind polyfill for browsers that don't support the bind method.
     */
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
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
    var hashCode = function(str) {
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
    $eventListener.fn.addEventListener = function(type, selector, data, callback, scope) {
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
    $eventListener.fn.removeEventListener = function(type, selector, callback, scope) {
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

    return $eventListener;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.ComponentFactory = factory();
    }
}(this, function() {

    'use strict';
    /**
     * A helper class to create multiple instances of the same Component Class from jQuery object that has one or more elements in it.
     *
     * @class ComponentFactory
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var ComponentFactory = (function() {

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
        ComponentFactory.create = function($elements, ComponentClass, scope) {
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

    return ComponentFactory;
}));

},{}],25:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Extend = factory();
    }
}(this, function() {
    'use strict';

    /**
     * A helper method to extend classes.
     *
     * @class Extend
     * @module StructureJS
     * @submodule util
     * @param inheritorClass
     * @param baseClass
     * @returns {*}
     * @constructor
     * @example
     *     var AnotherClass = (function () {
     *
     *         var _super = Extend(AnotherClass, BaseClass);
     *
     *         function AnotherClass() {
     *             _super.call(this);
     *         }
     *
     *         return AnotherClass;
     *     })();
     */
    var Extend = function(inheritorClass, baseClass) {
        for (var p in baseClass) {
            if (baseClass.hasOwnProperty(p)) {
                // Add any static properties from the baseClass to the inheritorClass.
                inheritorClass[p] = baseClass[p];
            }
        }

        // Creates an anonymous Class and sets the constructor as the inheritorClass.
        function __() {
            this.constructor = inheritorClass;
        }

        // Sets the anonymous Class prototype to the baseClass prototype.
        __.prototype = baseClass.prototype;

        // Sets the inheritorClass prototype as the baseClass and sets the constructor as the inheritorClass.
        inheritorClass.prototype = new __();

        return baseClass;
    };

    return Extend;
}));

},{}],26:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.StringUtil = factory();
    }
}(this, function() {

    'use strict';

    /**
     * The StringUtil...
     *
     * @class StringUtil
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var StringUtil = (function() {

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
        StringUtil.getExtension = function(filename, withDot) {
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
        StringUtil.toSentence = function(str, separator) {
            if (separator === void 0) { separator = ' '; }
            return String(str)
                // Add a space after any digits.
                .replace(/(\d)/g, '$1 ')
                // Add a space before any upper case characters.
                .replace(/([a-z](?=[A-Z]))/g, '$1 ')
                // Remove all non-word characters and replace with a single space.
                .replace(/[^a-zA-Z0-9 ]/g, ' ')
                // Replace multiple Spaces with a single space.
                .replace(/\s{2,}/g, ' ')
                // Trim whitespace around the string.
                .replace(/^ | $/g, '')
                // Lower case the entire string.
                .toLowerCase()
                // If a separator is passed in then replace the space with it.
                .replace(/\s+/g, separator);
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
        StringUtil.toCamelCase = function(str) {
            return StringUtil.toSentence(str)
                // Replace spaces between words with a string upper cased character.
                .replace(/ (\w)/g, function(_, $1) {
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
        StringUtil.toPascalCase = function(str) {
            return StringUtil.toCamelCase(str)
                // Make first character uppercase.
                .replace(/^[a-zA-Z]/, function(a, b, c) {
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
        StringUtil.toConstantCase = function(str) {
            return StringUtil.toSentence(str, '_')
                .toUpperCase();
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
        StringUtil.createUUID = function() {
            var uuid = ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function(c) {
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
        StringUtil.queryStringToObject = function(queryString, useParseFloat) {
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
        StringUtil.removeAllWhitespace = function(str) {
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
        StringUtil.removeLeadingTrailingWhitespace = function(str) {
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
        StringUtil.truncate = function(text, length) {
            if (text.length <= length) {
                return text;
            } else {
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
        StringUtil.format = function(str) {
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
        StringUtil.paramReplace = function(queryString, name, value) {
            // Find the param with regex
            // Grab the first character in the returned string (should be ? or &)
            // Replace our href string with our new value, passing on the name and delimiter
            var re = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var delimiter = re.exec(queryString)[0].charAt(0);
            return queryString.replace(re, delimiter + name + '=' + value);
        };
        return StringUtil;
    })();

    return StringUtil;
}));

},{}],27:[function(require,module,exports){
(function (global){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../util/StringUtil', 'jquery', 'handlebars'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('../util/StringUtil'), (typeof window !== "undefined" ? window.$ : typeof global !== "undefined" ? global.$ : null), (typeof window !== "undefined" ? window.Handlebars : typeof global !== "undefined" ? global.Handlebars : null));
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.TemplateFactory = factory(root.StructureJS.StringUtil, root.jQuery, root.Handlebars);
    }
}(this, function(StringUtil, jQuery, Handlebars) {

    'use strict';

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
    var TemplateFactory = (function() {

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
        TemplateFactory.create = function(templatePath, data) {
            if (data === void 0) { data = null; }
            //Checks the first character to see if it is a '.' or '#'.
            var regex = /^([.#])(.+)/;
            var template = null;
            var isFunctionTemplate = typeof templatePath === 'function';
            var isClassOrIdName = regex.test(templatePath);
            if (isFunctionTemplate) {
                template = templatePath(data);
            } else if (isClassOrIdName) {
                var htmlString = jQuery(templatePath).html();
                htmlString = StringUtil.removeLeadingTrailingWhitespace(htmlString);
                if (TemplateFactory.templateEngine == TemplateFactory.UNDERSCORE) {
                    // Underscore Template:
                    var templateMethod = window['_'].template(htmlString);
                    template = templateMethod(data);
                } else {
                    // Handlebars Template
                    var templateMethod = Handlebars.compile(htmlString);
                    template = templateMethod(data);
                }
            } else {
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

    return TemplateFactory;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/StringUtil":26}],28:[function(require,module,exports){
/**
 * UMD (Universal Module Definition) wrapper.
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        /*jshint sub:true */
        root.StructureJS = root.StructureJS || {};
        root.StructureJS.Util = factory();
    }
}(this, function() {

    'use strict';

    /**
     * A Utility class that has several static methods to assist in development.
     *
     * @class Util
     * @module StructureJS
     * @submodule util
     * @author Robert S. (www.codeBelt.com)
     * @static
     */
    var Util = (function() {

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
        Util.uniqueId = function(prefix) {
            if (prefix === void 0) { prefix = null; }
            var id = ++Util._idCounter;
            if (prefix != null) {
                return String(prefix + id);
            } else {
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
        Util.deletePropertyFromObject = function(object, list) {
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
                    } else if (value instanceof Object) {
                        Util.deletePropertyFromObject(value, list);
                    } else {
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
        Util.renamePropertyOnObject = function(object, oldName, newName) {
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
        Util.clone = function(obj) {
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
        Util.toBoolean = function(strNum) {
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
        Util.getClassName = function(classObject) {
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
        Util.debounce = function(callback, wait, immediate, callbackScope) {
            var timeout;
            var result;
            var debounced = function() {
                var args = arguments;

                function delayed() {
                    if (immediate == false) {
                        result = callback.apply(callbackScope, args);
                    }
                    timeout = null;
                }
                if (timeout) {
                    clearTimeout(timeout);
                } else if (immediate === true) {
                    result = callback.apply(callbackScope, args);
                }
                timeout = setTimeout(delayed, wait);
                return result;
            };
            debounced.cancel = function() {
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

    return Util;
}));

},{}]},{},[4]);
